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

describe("HostConnection retry-loop recovery", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });

    function makeRetryConn(settings: Partial<any> = {}) {
        return new HostConnection({
            host: {
                serverId: "test-peer",
                address: "127.0.0.1",
                port: 8080,
                insecure: true,
            },
            subscriptions: [],
            settings: { retryBaseIntervalMs: 100, retryMaxIntervalMs: 100, ...settings },
            clientid: "test-client",
        });
    }

    it("transient HTTP error (502) does NOT emit 'failed' — HC retries via its own state machine", async () => {
        // Pre-fix bug: HostConnection.fetch() emitted "failed" on every non-OK
        // HTTP response. CM's onConnectionObsolete listener responded by
        // graveyarding the conn permanently, so a later successful retry
        // moved it to "active" but it was still skipped by checkConnectionState
        // (graveyard.has === true) → CM transitioned to terminal "disconnected".

        vi.stubGlobal(
            "fetch",
            vi.fn(() => {
                // Simulate a 502 response — what nginx returns while a
                // backend (jake-dred) is rebooting.
                return Promise.resolve(
                    new Response(JSON.stringify({ error: "bad gateway" }), {
                        status: 502,
                        statusText: "Bad Gateway",
                        headers: { "content-type": "application/json" },
                    }),
                );
            }),
        );

        const conn = new HostConnection({
            host: { serverId: "test-peer", address: "127.0.0.1", port: 8080, insecure: true },
            subscriptions: [],
            settings: { retryBaseIntervalMs: 100, retryMaxIntervalMs: 100, maxRetries: 0 },
            clientid: "test-client",
        });

        const failedEvents: any[] = [];
        conn.events.on("failed", (e) => failedEvents.push(e));

        // wait until HC reaches the 'failed' state (the only path that should
        // legitimately emit 'failed'). With maxRetries: 0, the first retry
        // attempt exceeds the budget and HC transitions to 'failed'.
        await new Promise<void>((resolve, reject) => {
            const t = setTimeout(() => reject(new Error(`stuck in ${conn.currentState}`)), 3000);
            const tick = setInterval(() => {
                if (conn.currentState === "failed") {
                    clearInterval(tick);
                    clearTimeout(t);
                    resolve();
                }
            }, 20);
        });

        // The 502 itself should NOT have emitted "failed" — only the terminal
        // onEntry[failed] does. So failedEvents.length === 1, fired AFTER HC
        // entered the 'failed' state, not on every retry's 502.
        expect(conn.currentState).toBe("failed");
        expect(failedEvents.length).toBe(1);
    });

    it("connect-attempt timeout fires within the configured window (signal composition works)", async () => {
        // Verifies that AbortSignal.any([userSignal, timeoutCtl.signal])
        // is wired correctly: the fetch receives a composite signal that
        // aborts when EITHER fires. Without this wiring, undici's 2-minute
        // default applies — exactly what made jake's reboot recovery glacial.
        //
        // Only capture the first attempt's timestamps — subsequent retries
        // would overwrite them.
        let firstFetchAt: number | undefined;
        let firstAbortAt: number | undefined;
        let call = 0;
        vi.stubGlobal(
            "fetch",
            vi.fn((_url: string, opts: any) => {
                const myCall = ++call;
                if (myCall === 1) firstFetchAt = Date.now();
                return new Promise((_res, rej) => {
                    opts.signal?.addEventListener("abort", () => {
                        if (myCall === 1 && firstAbortAt === undefined) {
                            firstAbortAt = Date.now();
                        }
                        const err: any = new Error("aborted by signal");
                        err.name = "AbortError";
                        rej(err);
                    });
                });
            }),
        );

        const timeoutMs = 120;
        new HostConnection({
            host: { serverId: "test-peer", address: "127.0.0.1", port: 8080, insecure: true },
            subscriptions: [],
            settings: {
                retryBaseIntervalMs: 50,
                retryMaxIntervalMs: 50,
                connectAttemptTimeoutMs: timeoutMs,
            },
            clientid: "test-client",
        });

        // give the timeout time to fire
        await new Promise((r) => setTimeout(r, timeoutMs + 80));

        expect(firstFetchAt).toBeDefined();
        expect(firstAbortAt).toBeDefined();
        const elapsed = (firstAbortAt as number) - (firstFetchAt as number);
        // should fire within ~timeoutMs (some scheduling slack)
        expect(elapsed).toBeGreaterThanOrEqual(timeoutMs - 30);
        expect(elapsed).toBeLessThan(timeoutMs + 80);
    });

    it("connect-attempt timeout is DISARMED after headers received — does NOT kill a live stream", async () => {
        // The regression we hit in production: AbortSignal.timeout(N) stayed
        // armed for the entire fetch lifetime including streaming body read,
        // so the established stream got torn down N ms after connecting.
        // After the fix, the timeout is one-shot — cleared when headers
        // arrive, leaving only the user-abort signal active.
        let abortFired = false;
        vi.stubGlobal(
            "fetch",
            vi.fn((_url: string, opts: any) => {
                opts.signal?.addEventListener("abort", () => {
                    abortFired = true;
                });
                // succeed immediately with a stream that never closes
                const body = new ReadableStream({ start() {} });
                return Promise.resolve(
                    new Response(body, {
                        status: 200,
                        headers: { "content-type": "application/json" },
                    }),
                );
            }),
        );

        const timeoutMs = 100;
        const conn = new HostConnection({
            host: { serverId: "test-peer", address: "127.0.0.1", port: 8080, insecure: true },
            subscriptions: [],
            settings: { connectAttemptTimeoutMs: timeoutMs, retryBaseIntervalMs: 50 },
            clientid: "test-client",
        });
        await new Promise<void>((resolve) => {
            conn.events.on("connected", () => resolve());
        });

        // wait well past the would-have-been timeout
        await new Promise((r) => setTimeout(r, timeoutMs * 3));

        // timeout should have been disarmed in the .then on success; if it
        // were still armed, it would have fired abortHandler and abort would
        // have been reported.
        expect(abortFired).toBe(false);
        expect(conn.currentState).toBe("connected");
    });

    it("timeout-driven abort is classified as retryable — state goes through 'retrying'", async () => {
        // When the timeout fires, .catch should distinguish it from a
        // user-abort by inspecting timeoutCtl.signal.aborted, reject the
        // connect promise so onEntry[connecting] transitions to retrying.
        let callNumber = 0;
        vi.stubGlobal(
            "fetch",
            vi.fn((_url: string, opts: any) => {
                callNumber += 1;
                if (callNumber === 1) {
                    return new Promise((_res, rej) => {
                        opts.signal?.addEventListener("abort", () => {
                            const err: any = new Error("aborted");
                            err.name = "AbortError";
                            rej(err);
                        });
                    });
                }
                // 2nd attempt: succeed
                const body = new ReadableStream({ start() {} });
                return Promise.resolve(
                    new Response(body, { status: 200, headers: { "content-type": "application/json" } }),
                );
            }),
        );

        const conn = new HostConnection({
            host: { serverId: "test-peer", address: "127.0.0.1", port: 8080, insecure: true },
            subscriptions: [],
            settings: {
                retryBaseIntervalMs: 30,
                retryMaxIntervalMs: 30,
                connectAttemptTimeoutMs: 80,
            },
            clientid: "test-client",
        });

        const statesSeen: string[] = [];
        const interval = setInterval(() => {
            if (statesSeen[statesSeen.length - 1] !== conn.currentState) {
                statesSeen.push(conn.currentState as string);
            }
        }, 10);
        await new Promise<void>((resolve, reject) => {
            const t = setTimeout(
                () => reject(new Error(`stuck in ${conn.currentState}, history=${statesSeen.join(",")}`)),
                3000,
            );
            conn.events.on("connected", () => {
                clearInterval(interval);
                clearTimeout(t);
                resolve();
            });
        });

        // We should have transitioned through retrying (not aborted) after
        // the timeout fired on the first hung attempt.
        expect(statesSeen).toContain("retrying");
        expect(statesSeen).not.toContain("aborted");
        expect(conn.currentState).toBe("connected");
    });

    it("connectAttemptTimeoutMs=0 disables the timeout (preserves prior behavior)", async () => {
        let abortFired = false;
        vi.stubGlobal(
            "fetch",
            vi.fn((_url: string, opts: any) => {
                return new Promise(() => {
                    opts.signal?.addEventListener("abort", () => {
                        abortFired = true;
                    });
                });
            }),
        );

        new HostConnection({
            host: { serverId: "test-peer", address: "127.0.0.1", port: 8080, insecure: true },
            subscriptions: [],
            settings: { connectAttemptTimeoutMs: 0, retryBaseIntervalMs: 50 },
            clientid: "test-client",
        });

        await new Promise((r) => setTimeout(r, 200));
        expect(abortFired).toBe(false);
    });

    it("retries after a failing fetch and reaches 'connected' once fetch succeeds (real-timer pass)", async () => {
        let callNumber = 0;
        // First call: synchronous rejection (mimics undici fast-fail like ECONNREFUSED).
        // Second call: synchronous resolve with a minimal Response stand-in. The conn
        // calls monitorSubscriptions() which reads the body; we hand it a stream that
        // never yields, so monitorSubscriptions loops on reader.read() forever (fine
        // — we only care that the state machine got to "connected").
        vi.stubGlobal(
            "fetch",
            vi.fn(() => {
                callNumber += 1;
                if (callNumber === 1) {
                    const err = new TypeError("fetch failed");
                    (err as any).cause = { code: "ECONNREFUSED", syscall: "connect" };
                    return Promise.reject(err);
                }
                // never-ending stream so monitorSubscriptions stays alive
                const body = new ReadableStream({
                    start() {
                        /* never enqueue, never close */
                    },
                });
                const response = new Response(body, {
                    status: 200,
                    headers: { "content-type": "application/json" },
                });
                return Promise.resolve(response);
            }),
        );

        const conn = makeRetryConn();
        // wait until state reaches "connected" or test times out
        await new Promise<void>((resolve, reject) => {
            const t = setTimeout(() => reject(new Error(`stuck in ${conn.currentState}`)), 3000);
            conn.events.on("connected", () => {
                clearTimeout(t);
                resolve();
            });
        });

        expect(conn.currentState).toBe("connected");
        expect(callNumber).toBeGreaterThanOrEqual(2); // initial + at least one retry
        expect(conn.attempts).toBeGreaterThanOrEqual(1);
    });
});
