// Regression tests for HostConnection.watchdog() flatline-detection.
//
// Pre-fix bug: `currentState` was a getter over a never-assigned `_status`
// field (the StateMachine base writes `$state`, not `_status`). The
// watchdog's guard `if (this.currentState === "connected")` was therefore
// always false; every flatline fell straight through to `abort()` →
// `transition("abort") → "aborted"`, and ConnectionManager never received
// the `disconnected` event that drives replacement.
//
// Secondary bug: `armWatchdog()` had no clear-on-exit path, so a timer
// armed during "connected" could fire later from "disconnected"/"retrying"/etc.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { HostConnection } from "../HostConnection.js";

function makeConn() {
    return new HostConnection({
        host: {
            serverId: "test-peer",
            address: "127.0.0.1",
            port: 8080,
            insecure: true,
        },
        subscriptions: [],
        settings: {},
        clientid: "test-client",
    });
}

describe("HostConnection.watchdog", () => {
    beforeEach(() => {
        //! mock global fetch so constructor's transition("connect") -> connect()
        //  doesn't try to hit the network. The promise hangs forever; we drive
        //  the state machine manually.
        vi.stubGlobal(
            "fetch",
            vi.fn(() => new Promise(() => {})),
        );
    });
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("currentState mirrors $state (the state-machine source of truth)", async () => {
        const conn = makeConn();
        expect(conn.currentState).toBe("connecting");
        expect((conn as any).$state).toBe("connecting");

        await conn.transition("connected");
        expect(conn.currentState).toBe("connected");
        expect((conn as any).$state).toBe("connected");
    });

    it("flatlined watchdog from 'connected' transitions to 'disconnected' AND emits 'disconnected' event", async () => {
        const conn = makeConn();
        await conn.transition("connected");

        const events: string[] = [];
        conn.events.on("disconnected", () => events.push("disconnected"));

        // simulate 3-heartbeat flatline
        conn.lastHeartbeat = Date.now() - 100 * conn.heartbeatInterval;
        conn.watchdog();

        expect(conn.currentState).toBe("disconnected");
        expect(events).toContain("disconnected");
    });

    it("after watchdog-triggered disconnect, the abort handler stays in 'disconnected' (does not rewrite to 'aborted')", async () => {
        const conn = makeConn();
        await conn.transition("connected");

        conn.lastHeartbeat = Date.now() - 100 * conn.heartbeatInterval;
        conn.watchdog();
        // watchdog calls transition("disconnected") then abortController.abort();
        // abortController.abort() synchronously fires the abort handler which
        // calls transition("abort") — from "disconnected" that stays in
        // "disconnected" per transitionTable[disconnected].abort.
        expect(conn.currentState).toBe("disconnected");
        expect((conn as any).abortController?.signal.aborted).toBe(true);
    });

    it("watchdog fired while no longer 'connected' is a no-op (clears stale timer, does not warn or abort)", async () => {
        const conn = makeConn();
        // never reach connected — go connecting → retrying
        await conn.transition("retry");
        expect(conn.currentState).toBe("retrying");

        const events: string[] = [];
        conn.events.on("disconnected", () => events.push("disconnected"));
        const warnSpy = vi.spyOn(conn as any, "warn");

        conn.lastHeartbeat = Date.now() - 100 * conn.heartbeatInterval;
        conn.watchdog();

        expect(conn.currentState).toBe("retrying");
        expect(events).not.toContain("disconnected");
        expect(warnSpy).not.toHaveBeenCalled();
    });

    it("watchdog timer is cleared when state exits 'connected' (no stale fire)", async () => {
        const conn = makeConn();
        await conn.transition("connected");
        // onEntry[connected] armed a timer
        expect((conn as any).heartbeatTimer).toBeDefined();

        await conn.transition("disconnected");
        // onEntry[disconnected] should have called clearWatchdog()
        expect((conn as any).heartbeatTimer).toBeUndefined();
    });

    it("watchdog timer is cleared on transition to 'aborted'", async () => {
        const conn = makeConn();
        await conn.transition("connected");
        expect((conn as any).heartbeatTimer).toBeDefined();

        await conn.transition("abort");
        expect(conn.currentState).toBe("aborted");
        expect((conn as any).heartbeatTimer).toBeUndefined();
    });

    it("disconnect() clears the watchdog timer (no stale fire after external disconnect)", async () => {
        const conn = makeConn();
        await conn.transition("connected");
        expect((conn as any).heartbeatTimer).toBeDefined();

        conn.disconnect("test cleanup");
        expect((conn as any).heartbeatTimer).toBeUndefined();
    });
});
