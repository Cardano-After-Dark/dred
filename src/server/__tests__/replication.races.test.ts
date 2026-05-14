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
 *   - `${serverId}:ensure:hasAdd`               between knownMessages.has() and add()
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
            const p1 = gate.pause(`${dred2.serverId}:ensure:hasAdd`);
            const p2 = gate.pause(`${dred2.serverId}:ensure:hasAdd`);

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
                `gate arrivals on ${dred2.serverId}:ensure:hasAdd — bothArrived=${bothArrived}`,
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
});
