// Unit tests for ConnectionManager.replaceHostConnection.
//
// Pinning down the contract: the safety timer's only job is to resolve the
// outer promise so callers don't hang. It MUST NOT mutate connStatus. All
// connStatus mutations on a replacement come from HostConnection event
// signals — "connected" (via healthyConnection AND the replacement-listener
// here), "disconnected" / "failed" / "replacedBy" via the listeners wired
// up by connectTo. The previous implementation unconditionally moved the
// replacement back to "pending" connectionWaitTimeMs after creation,
// reverting a successful "active" status if the connection completed
// quickly — producing the live-stream "Non-connected peer with
// cmState=healthy" symptom observed in production.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { EventEmitter } from "eventemitter3";
import { ConnectionManager } from "../ConnectionManager.js";
import type { DredHostDetails } from "../../types/DredHosts.js";

function makeFakeDiscovery() {
    return {
        nbh: "test",
        hosts: [] as DredHostDetails[],
        events: new EventEmitter(),
        async getHostList() {
            return this.hosts;
        },
        async getConnectionThresholds() {
            return { minimal: 1, healthy: 1 };
        },
        hasNeighborhood() {
            return true;
        },
    } as any;
}

function makeFakeBookmarkStorage() {
    return {
        async getBookmark() {
            return "";
        },
        async setBookmark() {
            /* noop */
        },
    } as any;
}

function makeFakeConn(host: DredHostDetails): any {
    const conn: any = {
        host,
        events: new EventEmitter(),
        replacedBy(other: any) {
            conn.events.emit("replacedBy", {
                connection: conn,
                replacement: other,
                message: "replaced",
            });
        },
        disconnect() {
            /* noop */
        },
        currentState: "connecting",
    };
    return conn;
}

function makeCM() {
    return new ConnectionManager({
        clientid: "test-client",
        discovery: makeFakeDiscovery(),
        waitFor: "minimal",
        connectionSettings: {
            retryBaseIntervalMs: 50,
            retryMaxIntervalMs: 50,
            connectionWaitTimeMs: 1000,
            maxRetries: 0,
        },
        bookmarkStorage: makeFakeBookmarkStorage(),
    });
}

describe("ConnectionManager.replaceHostConnection", () => {
    let cm: ConnectionManager;
    let host: DredHostDetails;
    let oldConn: any;
    let newConn: any;

    beforeEach(() => {
        cm = makeCM();

        //! Bypass state-machine entanglements: checkConnectionState fires
        //  transition("sufficient") which is only valid from
        //  reconnecting/connecting/etc.  We're testing connStatus mutations
        //  in isolation, not state-machine wiring.
        vi.spyOn(cm as any, "checkConnectionState").mockResolvedValue(undefined);

        host = {
            serverId: "test-peer",
            address: "127.0.0.1",
            port: 8080,
            insecure: true,
        };

        //! Pre-populate hostToConn with an "old" conn in "dropped" status —
        //  i.e. the scenario where reconnecting.onEntry has decided to
        //  replace this peer's dropped connection.
        oldConn = makeFakeConn(host);
        (cm as any).hostToConn.set(host, oldConn);
        (cm as any).moveConnTo(oldConn, "dropped");

        //! Stub connectTo to return a controllable fake replacement that
        //  emits events when we tell it to.  Mimics the real connectTo's
        //  side effects (event-listener wiring, hostToConn.set, moveConnTo
        //  to "pending").
        newConn = makeFakeConn(host);
        vi.spyOn(cm as any, "connectTo").mockImplementation((h: any) => {
            newConn.events.once("connected", (cm as any).healthyConnection);
            newConn.events.once("disconnected", (cm as any).onConnectionDropped);
            newConn.events.once("replacedBy", (cm as any).onConnectionObsolete);
            newConn.events.once("failed", (cm as any).onConnectionObsolete);
            (cm as any).hostToConn.set(h, newConn);
            (cm as any).moveConnTo(newConn, "pending");
            return newConn;
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("fast-connect: safety timer firing later does NOT revert replacement from 'active' to 'pending'", async () => {
        vi.useFakeTimers();

        const promise = cm.replaceHostConnection(host);

        // After connectTo, replacement is "pending"
        expect((cm as any).connStatus.get(newConn)).toBe("pending");

        // Emit "connected" synchronously — listeners fire:
        //   healthyConnection -> moveConnTo(newConn, "active")
        //   replaceHostConnection's inline -> moveConnTo(oldConn, "obsolete") + graveyard.add(oldConn)
        newConn.events.emit("connected", {
            connection: newConn,
            message: "connected",
            attempts: 0,
            delayTime: 0,
        });

        expect((cm as any).connStatus.get(newConn)).toBe("active");
        expect((cm as any).connStatus.get(oldConn)).toBe("obsolete");
        expect((cm as any).graveyard.has(oldConn)).toBe(true);

        // Advance past safety timer
        await vi.advanceTimersByTimeAsync(1500);

        //! REGRESSION CHECK: previously the safety timer ran
        //  moveConnTo(replacement, "pending") here, reverting the success.
        //  Replacement MUST still be "active" after the timer fires.
        expect((cm as any).connStatus.get(newConn)).toBe("active");
        expect((cm as any).connStatus.get(oldConn)).toBe("obsolete");

        await promise;
    });

    it("slow-connect: safety timer fires before 'connected'; timer does NOT mutate connStatus", async () => {
        vi.useFakeTimers();

        const promise = cm.replaceHostConnection(host);

        expect((cm as any).connStatus.get(newConn)).toBe("pending");
        expect((cm as any).connStatus.get(oldConn)).toBe("dropped");

        // Advance past safety timer WITHOUT emitting "connected".
        await vi.advanceTimersByTimeAsync(1500);

        //! Replacement stays "pending" — HostConnection's retry loop is
        //  still in play, no event signal has changed its status yet.
        expect((cm as any).connStatus.get(newConn)).toBe("pending");
        //! Old conn stays "dropped" — the safety timer must not touch it
        //  either; obsolete-transition is the success listener's job.
        expect((cm as any).connStatus.get(oldConn)).toBe("dropped");

        // Promise resolved so callers don't hang.
        await expect(promise).resolves.toBe(newConn);
    });

    it("late connect: 'connected' arrives AFTER safety timer fired; healthyConnection still moves to 'active'", async () => {
        vi.useFakeTimers();

        const promise = cm.replaceHostConnection(host);

        // Safety timer fires first.
        await vi.advanceTimersByTimeAsync(1500);
        await promise;
        expect((cm as any).connStatus.get(newConn)).toBe("pending");

        // Late "connected" event — listener wasn't disarmed by the timer.
        newConn.events.emit("connected", {
            connection: newConn,
            message: "connected late",
            attempts: 0,
            delayTime: 0,
        });

        //! healthyConnection still moves replacement to "active"; the
        //  inline listener still moves old to "obsolete" + graveyard.
        //  The outer promise stays resolved (the timer's resolve-once
        //  guard prevented double-resolve).
        expect((cm as any).connStatus.get(newConn)).toBe("active");
        expect((cm as any).connStatus.get(oldConn)).toBe("obsolete");
        expect((cm as any).graveyard.has(oldConn)).toBe(true);
    });
});
