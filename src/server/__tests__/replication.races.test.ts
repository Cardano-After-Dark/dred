/**
 * Race-condition test harness for replication.
 *
 * Uses the Gate helper from src/testing/Gate.ts to pause execution at
 * specific chokepoints inside the server/replicator, letting tests force
 * interleavings that single-threaded JS would otherwise serialize.
 *
 * Each scenario installs one or more pauses, lets the system run until
 * production code reaches the gate(s), then releases in a controlled order
 * and observes the resulting state.
 *
 * Production code's chokepoints (all optional-chained via testGate?.waitAt):
 *
 *   - `${serverId}:ensure:beforeAdd`               between knownMessages.has() and add()
 *   - `${serverId}:send:${channel}`             per-event outbound to a subscriber
 *   - `${serverId}:replicant:${target}:inbound` top of replicant messageHandler
 */
import { beforeEach, describe, it, expect } from "vitest";
import type { SuperTestWithHost, Test } from "supertest";
import type { Express } from "express";

import { TestDredServer, testSetup, startReplication, testLogger } from "../testServer.js";
import { DredClient, type FullDredMessage } from "../../client/DredClient.js";
import { asyncDelay } from "../../util/asyncDelay.js";
import { Gate } from "../../testing/Gate.js";

const CHANNEL = "news";

describe("Replication race scenarios", () => {
    let test: {
        agent: SuperTestWithHost<Test>;
        app?: Express;
        server: TestDredServer;
        client: DredClient;
        servers: TestDredServer[];
    };
    let dred1: TestDredServer;
    let dred2: TestDredServer;
    let dred3: TestDredServer;
    let c1: DredClient;
    let c2: DredClient;
    let c3: DredClient;

    beforeEach(async () => {
        test = await testSetup();
        [dred1, dred2, dred3] = test.servers;

        c1 = dred1.mkClient("first");
        c2 = dred2.mkClient("second");
        c3 = dred3.mkClient("third");
        await Promise.all([c1.generateKey(), c2.generateKey(), c3.generateKey()]);

        await startReplication();
    });

    describe("ensureMessageProcessedOnce has/add window", () => {
        it("characterizes behavior when two cross-paths arrive concurrently on the same server", async () => {
            //! Scenario: client posts to dred1. The message propagates to
            //  dred2 via dred2.replicantOfDred1, and to dred3 via
            //  dred3.replicantOfDred1. After dred3 republishes locally,
            //  dred2.replicantOfDred3 brings the same ocid back to dred2.
            //  Both arrivals call dred2.ensureMessageProcessedOnce. We pause
            //  both between has() and add() so the second has() returns false
            //  (because the first hasn't added yet) — exposing whether the
            //  dedup is atomic.
            //
            //  This test characterizes; it does not (yet) assert a target
            //  outcome — the first run tells us whether the race is real.

            const gate = new Gate();
            dred2.testGate = gate;

            //! Pre-install two pauses. The chokepoint produces a FIFO queue
            //  per label, so the first arrival takes p1 and the second p2.
            const p1 = gate.pause(`${dred2.serverId}:ensure:beforeAdd`);
            const p2 = gate.pause(`${dred2.serverId}:ensure:beforeAdd`);

            //! Subscribe c2 to count what actually reaches the client. Same
            //  msgId twice triggers the listener's msgId dedup; same ocid /
            //  different msgIds is delivered twice (current code's behavior).
            const c2Receipts: FullDredMessage[] = [];
            await c2.subscribeToChannels({
                [CHANNEL]: (message) => {
                    c2Receipts.push(message);
                    console.error(
                        `📥 c2 received: ocid=${message.ocid} mid=${message.mid}`,
                    );
                },
            });

            //! Post a single message and wait for both arrivals at the gate.
            const ocid = "race-test-001";
            await c1.postMessage(CHANNEL, {
                msg: "race-test payload",
                type: "race-test",
                ocid,
            });

            //! Wait until both messageHandler→ensureMessageProcessedOnce
            //  calls have hit the gate. If the race only produces one
            //  arrival, p2.arrived would hang — bound it with a timeout.
            const arrivedBoth = Promise.all([p1.arrived, p2.arrived]);
            const timeout = asyncDelay(2000).then(() => "timeout" as const);
            const result = await Promise.race([arrivedBoth, timeout]);
            const bothArrived = result !== "timeout";

            console.error(
                `gate arrivals on ${dred2.serverId}:ensure:beforeAdd — bothArrived=${bothArrived}`,
            );

            //! Release whichever pauses arrived (release is a no-op when not arrived;
            //  here we release both either way to unblock the system).
            p1.release();
            p2.release();

            //! Give the released paths time to call add() and publish.
            await asyncDelay(200);

            //! Inspect what hit the client.
            console.error(
                `c2 received ${c2Receipts.length} message(s) for ocid=${ocid}`,
            );
            for (const m of c2Receipts) {
                console.error(
                    `  - ocid=${m.ocid} mid=${m.mid} replFrom=${(m as any).replFrom}`,
                );
            }

            //! Confirmed via initial run (2026-05-14):
            //   - bothArrived=true: two cross-paths reach dred2.ensureMessageProcessedOnce
            //     and both pass has()=false because the gate freezes them before
            //     either calls add() — non-atomic dedup window.
            //   - c2Receipts.length===2: both paths publish; the listener's
            //     ocid dedup (ChannelSubscriptions.ts:240) is also broken
            //     (recentMsgs only collects msgId; ocid is checked but never
            //     added), so the duplicate reaches the client.
            //
            //  Assertions reflect the desired behavior: exactly-once delivery
            //  per ocid. These will fail until the dedup race + ocid-dedup
            //  bug are fixed.
            expect(bothArrived).toBe(true);
            expect(c2Receipts.length).toBe(1);
            expect(c2Receipts[0].ocid).toBe(ocid);
        });
    });

    describe("staggered inbound (cross-source arrival ordering)", () => {
        it("delivers exactly once when the cross-replication path arrives before the direct path", async () => {
            //! Scenario: c1 posts M to dred1. Both dred2.replicantOfDred1 and
            //  dred3.replicantOfDred1 are subscribed to dred1's stream. We
            //  pause dred2.replicantOfDred1's inbound, so dred3 receives and
            //  publishes M first; dred2.replicantOfDred3 then brings M to
            //  dred2 via the cross-replication path — BEFORE the original
            //  direct path is released. When we finally release dred2's
            //  inbound from dred1, the atomic SADD should see the ocid
            //  already present and drop the duplicate.
            //
            //  This exercises the same code we just made atomic, but via a
            //  different arrival ordering than scenario 1. Both should hold
            //  exactly-once delivery.

            const gate = new Gate();
            dred2.testGate = gate;

            //! Hold dred2's direct-from-first path at the inbound chokepoint.
            const holdDirect = gate.pause(
                `${dred2.serverId}:replicant:${dred1.serverId}:inbound`,
            );

            const c2Receipts: FullDredMessage[] = [];
            await c2.subscribeToChannels({
                [CHANNEL]: (message) => {
                    c2Receipts.push(message);
                    console.error(
                        `📥 c2 (staggered) received: ocid=${message.ocid} mid=${message.mid} replFrom=${(message as any).replFrom}`,
                    );
                },
            });

            const ocid = "race-staggered-001";
            await c1.postMessage(CHANNEL, {
                msg: "staggered payload",
                type: "race-test-staggered",
                ocid,
            });

            //! Wait for the direct path to arrive at the gate so we know the
            //  pause has been consumed by the right call.
            await holdDirect.arrived;

            //! Give the cross-path time to traverse: dred3 receives,
            //  publishes, dred2.replicantOfDred3 picks it up, publishes on
            //  dred2. By the time we release the direct path, dred2's
            //  knownMessages already has the ocid.
            await asyncDelay(200);

            const receiptsBeforeRelease = c2Receipts.length;
            console.error(
                `c2 receipts BEFORE releasing direct path: ${receiptsBeforeRelease}`,
            );

            //! Release the held direct path. Its ensureMessageProcessedOnce
            //  should atomic-SADD, see added===0, and drop.
            holdDirect.release();

            await asyncDelay(200);

            console.error(
                `c2 receipts AFTER releasing direct path: ${c2Receipts.length}`,
            );

            //! Expected outcome: c2 sees the ocid exactly once. The
            //  cross-source arrival path published it; the direct path
            //  arrived later, saw it already known, and dropped.
            expect(c2Receipts.length).toBe(1);
            expect(c2Receipts[0].ocid).toBe(ocid);
            //! And the receipt came BEFORE we released the direct path,
            //  proving the cross-replication route delivered it.
            expect(receiptsBeforeRelease).toBe(1);
        });
    });

    describe("two-message ordering under staggered inbound", () => {
        it("preserves M1-before-M2 order even when both arrive via the cross-replication path", async () => {
            //! Two messages posted in order to dred1, with dred2's direct
            //  inbound held until both should have traversed the cross-path
            //  (via dred3). Verify c2 sees them in order (M1 then M2).
            //
            //  The cross-path delivers via dred3 → dred2.replicantOfDred3.
            //  As long as that single consumer processes events in stream
            //  order, ordering is preserved. The pause on the direct path
            //  ensures cross-path is the actual delivery route here.

            const gate = new Gate();
            dred2.testGate = gate;

            //! Two pauses on the inbound — one per inbound message arrival.
            const holdM1Direct = gate.pause(
                `${dred2.serverId}:replicant:${dred1.serverId}:inbound`,
            );
            const holdM2Direct = gate.pause(
                `${dred2.serverId}:replicant:${dred1.serverId}:inbound`,
            );

            const c2Receipts: FullDredMessage[] = [];
            await c2.subscribeToChannels({
                [CHANNEL]: (message) => {
                    c2Receipts.push(message);
                    console.error(
                        `📥 c2 (ordered) received: ocid=${message.ocid} mid=${message.mid}`,
                    );
                },
            });

            const ocidM1 = "race-ordered-msg1";
            const ocidM2 = "race-ordered-msg2";

            await c1.postMessage(CHANNEL, {
                msg: "first",
                type: "race-test-ordered",
                ocid: ocidM1,
            });
            await c1.postMessage(CHANNEL, {
                msg: "second",
                type: "race-test-ordered",
                ocid: ocidM2,
            });

            //! Wait for both direct-path arrivals to hit their gates.
            await Promise.all([holdM1Direct.arrived, holdM2Direct.arrived]);

            //! Let cross-path complete delivery for both messages.
            await asyncDelay(250);

            console.error(
                `c2 receipts BEFORE releasing direct path: ${c2Receipts.length}, ocids=${c2Receipts.map((r) => r.ocid).join(",")}`,
            );

            //! Both messages should have arrived via cross-path by now.
            expect(c2Receipts.length).toBe(2);
            expect(c2Receipts[0].ocid).toBe(ocidM1);
            expect(c2Receipts[1].ocid).toBe(ocidM2);

            //! Release the direct paths; atomic SADD should drop both.
            holdM1Direct.release();
            holdM2Direct.release();
            await asyncDelay(200);

            //! Still exactly two — no duplicates from the released direct paths.
            expect(c2Receipts.length).toBe(2);
            expect(c2Receipts[0].ocid).toBe(ocidM1);
            expect(c2Receipts[1].ocid).toBe(ocidM2);
        });
    });

    describe("concurrent same-ocid POSTs", () => {
        it("publishes exactly one when two POSTs of the same ocid race at the dedup gate", async () => {
            //! Scenario: two client POSTs of the same ocid arrive at dred1
            //  concurrently. Without atomic SADD, both could pass has()=false
            //  and both publish. With atomic SADD, one wins; the other sees
            //  added===0 and is rejected as a duplicate. We use the beforeAdd
            //  chokepoint to force both POSTs to be paused simultaneously
            //  (proving they're truly concurrent), then release.

            const gate = new Gate();
            dred1.testGate = gate;

            const p1 = gate.pause(`${dred1.serverId}:ensure:beforeAdd`);
            const p2 = gate.pause(`${dred1.serverId}:ensure:beforeAdd`);

            const ocid = "race-concurrent-post";

            //! Use c2 (on dred2) so cross-replication delivers the published
            //  message. Subscribing on c1 (same server as where posts arrive)
            //  was flaky in initial runs — likely a timing artifact of the
            //  subscription setup overlapping with the gated POSTs.
            const c2Receipts: FullDredMessage[] = [];
            await c2.subscribeToChannels({
                [CHANNEL]: (message) => {
                    c2Receipts.push(message);
                    console.error(
                        `📥 c2 (concurrent-post) received: ocid=${message.ocid} mid=${message.mid} msg=${message.msg}`,
                    );
                },
            });

            //! Fire two POSTs in parallel. Each is an independent HTTP
            //  request landing in dred1's postMessageInChannel handler.
            const post1 = c1
                .postMessage(CHANNEL, {
                    ocid,
                    msg: "version-1",
                    type: "race-concurrent",
                })
                .catch((err) => ({ error: err }));
            const post2 = c1
                .postMessage(CHANNEL, {
                    ocid,
                    msg: "version-2",
                    type: "race-concurrent",
                })
                .catch((err) => ({ error: err }));

            //! Wait until both POSTs have reached the dedup gate. This
            //  proves they are concurrent — both past the has-check would-be
            //  point in the previous design.
            await Promise.all([p1.arrived, p2.arrived]);
            console.error(`both POSTs arrived at ${dred1.serverId}:ensure:beforeAdd`);

            //! Release both. Atomic SADD serializes: one wins (added===1)
            //  and publishes, the other (added===0) returns 409.
            p1.release();
            p2.release();

            const [r1, r2] = await Promise.all([post1, post2]);
            console.error(`post1 result: ${JSON.stringify(r1)}`);
            console.error(`post2 result: ${JSON.stringify(r2)}`);

            //! Cross-replication needs time to traverse dred1 → dred2.
            await asyncDelay(300);

            console.error(`c2 received ${c2Receipts.length} message(s):`);
            for (const m of c2Receipts) {
                console.error(`  - ocid=${m.ocid} mid=${m.mid} msg=${m.msg}`);
            }

            //! Exactly one publish reached the subscriber, regardless of
            //  which version "won".
            expect(c2Receipts.length).toBe(1);
            expect(c2Receipts[0].ocid).toBe(ocid);
            //! The published msg is one of the two posted versions.
            expect(["version-1", "version-2"]).toContain(c2Receipts[0].msg);
        });
    });

    describe("channel-existence vs message arrival race", () => {
        //! TODO at DredReplicator.ts:884:
        //   "check for a race involving a new channel; ensure we aren't
        //    dropping messages"
        //
        //  The handler at line 882 logs "dropping message for non-existent
        //  channel" when weHaveChannel returns false. Probe whether this can
        //  happen in practice with the new-channel flow.
        //
        //  Current implementation of Replicant.replicateNewChannel:
        //    1. setChanOptions
        //    2. channelList.set        ← homeServer learns the channel
        //    3. channelCreated         ← _chans-emit on homeServer
        //    4. findCommonChannels
        //    5. subscribeToCommonChannels  ← replicant subscribes to new channel
        //
        //  Since (2) happens before (5), by the time the replicant's
        //  subscription is delivering messages from the new channel,
        //  channelList already has it — so weHaveChannel should be true.
        //
        //  This test characterizes the timing: pause dred2's
        //  replicateNewChannel processing for `new-chan` so dred2 is NOT
        //  subscribed yet. Verify the message dred1 posted is held safely
        //  on dred1's stream and eventually reaches c2 after the pause is
        //  released, with no "dropping" warning.

        it("does not drop the message when channel-creation processing is delayed on the receiver", async () => {
            const newChannel = "new-chan-race";

            const gate = new Gate();
            dred2.testGate = gate;

            //! Pause dred2's processing of the new-channel event, but only
            //  for this specific channel name (the label includes channelName).
            //  dred3's channel-creation flow is unaffected.
            const holdNewChannel = gate.pause(
                `${dred2.serverId}:replicant:${dred1.serverId}:newChannel:${newChannel}`,
            );

            const c2Receipts: FullDredMessage[] = [];
            const c2SubReadyForNewChan: Promise<void>[] = [];

            //! Create the channel on dred1; this triggers _chans propagation.
            await c1.createChannel(newChannel);

            //! Post a message to it immediately.
            const ocid = "race-channel-existence";
            await c1.postMessage(newChannel, {
                msg: "first message on new channel",
                type: "race-channel",
                ocid,
            });

            //! Wait for dred2 to hit the gate (its channelWasAdded handler
            //  fired from the _chans event and is now stuck at the top of
            //  replicateNewChannel for this channel).
            await holdNewChannel.arrived;
            console.error(
                `dred2 hit newChannel gate for ${newChannel} — channelList does NOT yet contain it`,
            );

            //! At this point, dred2 hasn't created the channel locally.
            //  dred3 (no gate) has processed the _chans event and created
            //  new-chan locally. The message is held in dred1's stream;
            //  dred2.replicantOfDred1 hasn't subscribed to new-chan yet.

            //! Subscribe c2 to the new channel now. Behavior expectation:
            //  c2 has the channel via its own client-side discovery once
            //  dred2 has it; until dred2 has it, c2.subscribeToChannels
            //  will pend on creating-or-finding the channel.
            //
            //  Instead of subscribing now (which would deadlock against the
            //  paused channel-creation), release first and subscribe after.

            //! Verify dred2 has not yet emitted any "dropping" warnings.
            //  (We can't easily intercept logger.warn from here without
            //  wiring, so we just observe through the final test result.)

            //! Release. dred2 completes replicateNewChannel: channelList
            //  gets new-chan; replicant subscribes; the queued message
            //  flows in.
            holdNewChannel.release();
            console.error(`released dred2's newChannel gate for ${newChannel}`);

            //! Subscribe c2 AFTER the channel is created locally on dred2.
            await asyncDelay(100);
            await c2.subscribeToChannels({
                [newChannel]: (message) => {
                    c2Receipts.push(message);
                    console.error(
                        `📥 c2 (channel-race) received: ocid=${message.ocid} mid=${message.mid}`,
                    );
                },
            });

            //! Allow time for the message to traverse: dred1 stream →
            //  dred2.replicantOfDred1 → dred2 publishes → c2 receives.
            await asyncDelay(400);

            console.error(`c2 received ${c2Receipts.length} message(s)`);

            //! The message posted before dred2 even knew about the channel
            //  should still reach c2 — no data loss from the delayed
            //  channel-creation processing.
            expect(c2Receipts.length).toBe(1);
            expect(c2Receipts[0].ocid).toBe(ocid);
        });
    });
});
