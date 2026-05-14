import { autobind, contextLogger, zonedLogger } from "@poshplum/utils";
import { EventEmitter } from "eventemitter3";
import { fromPlatformFetchBody } from "@platform/ReadableStream.js";

import { type connnectionSettings, type DredHostDetails } from "../types/DredHosts.js";
// import { asyncDelay } from "../util/asyncDelay.js";
import {
    type DredEvent,
    // EventHelpAllowedEvents,
    // eventHelp, DredEmitter, dredEmitter, EventInterface,
    type DredEventPlus,
    type DredError,
    devMessage,
} from "../types/DredEvents.js";

import {
    type FullSubscriptionListenerMap,
    type DredChannelMessage,
    type SubscriptionList,
    type FullChannelsListeners,
    type DredMessage,
} from "../types/ChannelSubscriptions.js";
import { ndjsonStream } from "./betterJsonStream.js";
import { type Logger } from "../types/Logger.js";
import { nanoid } from "../util/nanoid.js";
import { StateMachine as StateMachineNg, type StateTransitionTable } from "../util/stateMachine.js";

type conn = HostConnection;
export interface ConnectionEvent extends DredEvent {
    connection: HostConnection;
}
export interface moreInfo {
    moreInfo?: any;
}

/**
 * @public
 */
type HostConnectionStates =
    | "default"
    | "connecting"
    | "retrying"
    | "connected"
    | "disconnected"
    | "failed"
    | "aborted";

/**
 * @public
 */
type HostConnectionTransitions =
    | "connect"
    | "abort"
    | "retry"
    | "failed"
    | "reconnect"
    | "connected"
    | "disconnected";

/**
 * @public
 */
const noTransitionsExcept = {
    connect: null,
    abort: null,
    retry: null,
    failed: null,
    reconnect: null,
    connected: null,
    disconnected: null,
};

export interface HostConnectionEventTypes {
    warning: [ConnectionEvent & moreInfo];
    failed: [ConnectionEvent & DredError];
    retrying: [ConnectionEvent];
    connected: (
        c: ConnectionEvent & {
            delayTime: number;
            attempts: number;
        },
    ) => void;
    replacedBy: [ConnectionEvent & { replacement: HostConnection }];
    message: [DredMessage & ConnectionEvent & DredChannelMessage ];
    disconnected: [ConnectionEvent & DredError];
}

const connectionEvents = {
    warning:
        "we timed out or encountered a problem connecting, but we'll keep retrying for a while",
    failed:
        "we stopped trying to make this connection work.  Another HostConnection " +
        "to this host might be created by the connection manager, but this connection " +
        "never got started and is dead, dead, dead.",
    connected: "successful connection; monitoring for new events in subscribed channels.",

    message: "message received from a subscribed channel",
    replacedBy: "a new connection (see the 'replacedBy' key) replaced this one.",
    disconnected: "disconnected due to network error or missed heartbeats.",
    aborted: "connection aborted normally by controlling signal",
};
export class HostConnection extends StateMachineNg<
    HostConnectionStates,
    HostConnectionTransitions
> {
    static emitterHelp = connectionEvents;
    events = new EventEmitter<HostConnectionEventTypes, any>();
    abortController?: AbortController;
    host: DredHostDetails;
    settings: connnectionSettings;
    attempts = 0;
    lastError?: any;
    channelSubs: SubscriptionList;
    private stream?: ReturnType<typeof ndjsonStream>;
    private clientid: string;

    private startTime = new Date().getTime();
    private scheduledRetry?: ReturnType<typeof setTimeout>;
    private logger: Logger;
    private _destroyed = false; // Flag to track if connection is being destroyed
    private _disconnecting = false; // Flag to track if disconnection is in progress

    //! mirror $state (the StateMachine base-class field that actually tracks
    //  current state) so external readers and our own watchdog can ask for
    //  currentState without knowing the base class's field name.
    get currentState(): HostConnectionStates {
        return this.$state;
    }

    resetState() {}

    log(message: string, ...args: any[]) {
        this.logger.info(this.logPrefix() + message, ...args);
    }

    error(message: string, ...args: any[]) {
        this.logger.error(message, ...args);
    }
    warn(message: string, ...args: any[]) {
        this.logger.warn(message, ...args);
    }
    info(message: string, ...args: any[]) {
        this.logger.info(message, ...args);
    }
    progress(message: string, ...args: any[]) {
        this.logger.progress(message, ...args);
    }
    debug(message: string, ...args: any[]) {
        this.logger.debug(message, ...args);
    }
    trace(message: string, ...args: any[]) {
        this.logger.trace(message, ...args);
    }

    elapsedTime(this: HostConnection): number {
        const now = new Date();
        return now.getTime() - this.startTime;
    }

    nextRetryInterval(): number {
        return Math.min(
            this.settings.retryBaseIntervalMs * Math.pow(1.27, this.attempts),
            this.settings.retryMaxIntervalMs,
        );
    }

    disconnect(reason: string) {
        // Set disconnecting flag to prevent race conditions
        if (this._disconnecting) {
            this.logger?.debug(
                `disconnect() called but already disconnecting for ${this.host?.serverId || "unknown"}`,
            );
            return;
        }

        this._disconnecting = true;
        this.logger?.debug(
            `disconnect() starting for ${this.host?.serverId || "unknown"}: ${reason}`,
        );

        //!!! todo: cancel any pending stream with ReadableStream.cancel()

        if (this.abortController) this.abortController.abort(`disconnect(): ${reason}`);
        this.stopRetries();
        this.clearWatchdog();

        // Mark as destroyed after disconnect operations
        this._destroyed = true;
    }
    stopRetries() {
        if (this.scheduledRetry) clearTimeout(this.scheduledRetry);

        this.scheduledRetry = undefined;
    }
    async replacedBy(otherConnection: HostConnection) {
        this.events.emit("replacedBy", {
            connection: this,
            replacement: otherConnection,
            message: "this connection was replaced, probably due to new subscription settings",
            [devMessage]: [
                "This is a normal operational condition when changing channel-subscription settings.",
                "Connection manager is expected to move this old connection to the graveyard",
                "... and get rid of any references, listeners, etc on the old connection ...",
                "... to ensure it is properly garbage collected.",
            ],
        });
    }
    connecting: Promise<any | never> | undefined;
    static settingsWithDefaults(
        partialSettings: Partial<connnectionSettings>,
    ): connnectionSettings {
        return {
            retryBaseIntervalMs: 1000,
            retryMaxIntervalMs: 30000,
            maxRetries: Infinity,
            connectionWaitTimeMs: 7000,
            //! 0 disables the per-attempt timeout (falls back to undici's
            //  ~2-minute default).  Replicants override with 10_000.
            connectAttemptTimeoutMs: 0,
            watchChannels: false,
            ...partialSettings,
        };
    }

    get initialState() {
        return "default" as const;
    }

    constructor(options: {
        host: DredHostDetails;
        subscriptions: SubscriptionList;
        settings: Partial<connnectionSettings>;
        clientid: string;
    }) {
        const { host, subscriptions, settings, clientid } = options;

        super();
        this.logger = zonedLogger("hostconn", {
            clientid,
            loggerId: nanoid(4),
            transitionName: undefined,
            addContext: null,
            extra: subscriptions.map(x => x.channel),
        });
        this.settings = HostConnection.settingsWithDefaults(settings);

        this.events.on("replacedBy", ({}) => {});
        this.host = host;
        this.channelSubs = subscriptions;

        this.clientid = clientid;
        this.transition("connect");
    }

    async connect(): Promise<any | never> {
        if (this.connecting) {
            return this.connecting;
        }

        this.abortController = new AbortController();
        const { signal } = this.abortController;
        const abortHandler = () => {
            // Prevent race condition during cleanup
            if (this._disconnecting || this._destroyed) {
                return;
            }

            try {
                this.transition("abort");
            } catch (error) {
                // suppresses extraneous errors during shutdown scenarios
                if (this._disconnecting || this._destroyed) {
                    // Expected during cleanup - suppress silently
                    return;
                }
                // Unexpected error during normal operation - log for debugging
                this.logger.warn(`Unexpected abort transition error: ${error}`);
                // Don't rethrow - prevents unhandled promise rejection in any case
            }
        };

        const channelListeners = this.channelSubs;

        signal.addEventListener("abort", abortHandler);
        const attemptNum = this.attempts + 1;
        const startTime = Date.now();
        const proto = this.host.insecure ? "http" : "https";
        const target = `${proto}://${this.host.address}:${this.host.port}`;

        //! One-shot connect-attempt timeout.
        //
        //  We compose the user-abort signal with a separate timeoutController's
        //  signal.  AbortSignal.any aborts when EITHER fires, so fetch unblocks
        //  at min(user-abort, timeout).
        //
        //  Critical: this signal stays attached to the fetch for its ENTIRE
        //  lifetime — including streaming body read.  A naive
        //  `AbortSignal.timeout(N)` would fire N ms after success too, killing
        //  the live stream (observed: every 10s the established connection died
        //  with `server disconnected`, CM cycled reconnecting↔healthy forever,
        //  graveyard accumulated entries).  Solution: disarm the timer the
        //  moment headers arrive, so post-success only the user-abort path can
        //  trigger the composed signal.
        //
        //  Distinguishing abort cause in .catch matters too: timeout aborts
        //  should be retryable (rej → onEntry[connecting] catches → transition
        //  to retrying → backoff), while user aborts are stop-with-intent
        //  (preserve existing res(false) path).  timeoutCtl.signal.aborted
        //  tells us which signal won.
        const timeoutMs = this.settings.connectAttemptTimeoutMs;
        let timeoutCtl: AbortController | undefined;
        let timeoutTimer: ReturnType<typeof setTimeout> | undefined;
        let fetchSignal: AbortSignal = signal;
        if (timeoutMs > 0) {
            timeoutCtl = new AbortController();
            timeoutTimer = setTimeout(() => {
                timeoutCtl!.abort(new Error(`connect timeout after ${timeoutMs}ms`));
            }, timeoutMs);
            fetchSignal = (AbortSignal as any).any([signal, timeoutCtl.signal]);
        }
        const disarmTimeout = () => {
            if (timeoutTimer !== undefined) {
                clearTimeout(timeoutTimer);
                timeoutTimer = undefined;
            }
        };

        const myself = (this.connecting = new Promise((res, rej) => {
            let aborted = false;
            //! per-attempt diagnostic: name the target, attempt number, and
            //  subscription count so the retry loop is legible from the log.
            this.info(
                "attempt #%d -> %s (server=%s, %d subs, timeout=%s)",
                attemptNum,
                target,
                this.host.serverId,
                channelListeners.length,
                timeoutMs > 0 ? `${timeoutMs}ms` : "none",
            );
            this.logger.trace("channelListeners", channelListeners);

            this.fetch(`/channels/listen`, {
                body: JSON.stringify(this.channelSubs, null, 2),
                method: "POST",
                signal: fetchSignal,
                headers: {
                    "content-type": "application/json",
                    clientid: this.clientid,
                },
            })
                .then((response: Response) => {
                    //! Headers received — disarm the timeout so a slow stream
                    //  (or one that simply lives a long time) doesn't get
                    //  aborted by a stale connect-attempt timer.
                    disarmTimeout();

                    if (aborted) return false;
                    if (this.abortController?.signal.aborted) return false;

                    if (!response) return false;
                    // note: this callback happens only after all events seen in the stream
                    // are processed - which may be a LONG time after the connection is established.

                    const elapsedMs = Date.now() - startTime;
                    this.progress(
                        "attempt #%d -> %s: stream headers in %dms; listening on %d channels",
                        attemptNum,
                        this.host.serverId,
                        elapsedMs,
                        channelListeners.length,
                    );
                    this.logger.debug("channelListeners: ", channelListeners.map(x => x.channel));
                    //!!! todo: check to see if we should reject with an empty / non-existent response here
                    res(true);
                })
                .catch((e) => {
                    //! Disarm first (whatever the failure mode, the timer is
                    //  done doing useful work).
                    disarmTimeout();
                    const elapsedMs = Date.now() - startTime;

                    //! Timeout vs user-abort: if our timeout controller fired
                    //  AND the user didn't separately abort, treat this as a
                    //  retryable connect-attempt failure.  Reject so
                    //  onEntry[connecting]'s catch path transitions to retry.
                    if (
                        timeoutCtl?.signal.aborted &&
                        !signal.aborted &&
                        this.isAbortError(e)
                    ) {
                        const msg = `connect attempt timed out after ${timeoutMs}ms`;
                        this.warn(
                            "attempt #%d -> %s: %s",
                            attemptNum,
                            this.host.serverId,
                            msg,
                        );
                        rej(new Error(msg));
                        return;
                    }

                    if (this.isAbortError(e)) {
                        this.debug(
                            "attempt #%d -> %s: aborted after %dms",
                            attemptNum,
                            this.host.serverId,
                            elapsedMs,
                        );
                        aborted = true;
                        res(false);
                    } else if ((e?.message || e?.toString() )?.match(/connection manager disconnect/)) {
                        this.debug(
                            "attempt #%d -> %s: disconnect requested after %dms",
                            attemptNum,
                            this.host.serverId,
                            elapsedMs,
                        );
                        aborted = true;
                        res(false);
                    } else {
                        //! reject so onEntry[connecting] can transition to "retry" and run the backoff loop.
                        const causeStr = HostConnection.describeFetchError(e);
                        this.warn(
                            "attempt #%d -> %s: failed in %dms — %s",
                            attemptNum,
                            this.host.serverId,
                            elapsedMs,
                            causeStr,
                        );
                        rej(e);
                    }
                });
        }));
        return myself;
    }

    /**
     * Unwrap Node 18+ / undici TypeError("fetch failed") wrappers and surface
     * the underlying cause's `code` / `syscall` / `errno` / `message`. Without
     * this, every connection error logs as the same opaque "fetch failed"
     * string with no way to tell ECONNREFUSED from ETIMEDOUT from EHOSTUNREACH.
     */
    static describeFetchError(e: any): string {
        if (!e) return "‹no error object›";
        const cause: any = e.cause;
        const parts: string[] = [];
        let top: string | undefined;
        if (typeof e === "string") {
            top = e;
        } else if (e.message || e.code) {
            top = e.message || e.code;
        } else if (typeof e === "object") {
            // HTTP error responses parsed from JSON arrive as plain objects.
            // Stringify their key fields (error/status/statusText/etc.) so we
            // don't log "[object Object]" and lose the actionable detail.
            const bits: string[] = [];
            for (const key of ["error", "status", "statusText", "code", "message", "reason"]) {
                if ((e as any)[key] !== undefined) {
                    bits.push(`${key}=${(e as any)[key]}`);
                }
            }
            top = bits.length ? bits.join(", ") : JSON.stringify(e).slice(0, 200);
        }
        if (top) parts.push(top);
        if (cause) {
            const causeBits: string[] = [];
            if (cause.code) causeBits.push(cause.code);
            if (cause.syscall) causeBits.push(`syscall=${cause.syscall}`);
            if (cause.errno !== undefined) causeBits.push(`errno=${cause.errno}`);
            if (cause.address) causeBits.push(`addr=${cause.address}${cause.port ? `:${cause.port}` : ""}`);
            const cm = cause.message;
            if (cm && cm !== top) causeBits.push(cm);
            if (causeBits.length) parts.push(`cause: ${causeBits.join(", ")}`);
        }
        return parts.join(" | ");
    }

    mkEvent<T extends Pick<DredError, "message" | typeof devMessage> & Record<any, any>>(
        args: T,
    ): ConnectionEvent & DredError {
        const { [devMessage]: dm, message, ...moreArgs } = args;
        return {
            connection: this,
            message: `[${this.host.serverId} at ${this.host.address}]: ${message}`,
            reason: this.lastError,
            [devMessage]: dm,
            ...moreArgs,
        };
    }

    connectionFailureEvent(this: HostConnection, e: Error) {
        return {
            connection: this,
            reason: e,
            message: `[${this.host.serverId} at ${this.host.address}] connection failure`,
            recommendation: "check for network connectivity, retry if needed",
            [devMessage]: [
                "developers should check for correctness of the fetch call",
                "Connection manager is expected to monitor for failed connections ...",
                "... and ensure that a suitable replacement is created.  ",
                "Connection manager is expected to detect persistent connection problems ...",
                "... IF the OVERALL health of the neighborhood is affected,",
                "... and to escalate the message/recommendation info to users",
                "For more troubleshooting, check the 'reason' error object, and for deeper inspection,",
                "... there is also a debugging breakpoint available",
            ],
        };
    }

    //! it implements a streaming listener for changes
    async fetch(path: string, { debug = false, ...options }) {
        if (path[0] !== "/") path = `/${path}`;

        const { host } = this;
        const proto = host.insecure ? "http" : "https";
        const shortServer = `${host.address}:${host.port}`;
        const url = `${proto}://${shortServer}${path}`;
        // console.warn(`+fetch`, options.method, shortServer, path)

        options.mode = "cors";
        //!!! todo: it includes cryptographic credentials in the connection for the server
        //    to validate.  See also todo 61pk3h0 in server
        // options.credentials = "include";
        const result = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                "content-type": "application/json",
                accept: "application/json",
                clientid: this.clientid,
            },
        });
        if (debug) debugger;

        //! successful requests are directly resolved to the parsed json ...
        //   ...unless parse:false is provided; this allows the response to be hooked up
        //   to a streaming reader or take other treatment provided by the caller.
        if (result.ok) {
            this.monitorSubscriptions(result);
            return result;
        }

        //! failed requests @request or parsing level cause a rejection.
        // let reason : string | Error;
        const reason = await result.json().catch((r) => {
            return new Error(`${result.status} ${result.statusText} for ${path}`);
        });

        //! intentionally NOT emitting "failed" here.  HC's own state machine
        //  treats transient HTTP errors as retryable (onEntry[connecting]
        //  catches the throw → transition("retry") → backoff → reconnect).
        //  Emitting "failed" externally for every 502 caused CM's
        //  onConnectionObsolete listener to graveyard the conn permanently;
        //  when HC later recovered, healthyConnection moved the conn to
        //  "active" but its graveyard membership made checkConnectionState
        //  count it as 0, transitioning CM to the terminal "disconnected"
        //  state from which the only exit (connectionDropped) requires a
        //  live HC drop that never comes.  "failed" is reserved for HC's
        //  actual failed state (onEntry[failed]), which fires only when
        //  maxRetries is exhausted — that IS terminal and SHOULD graveyard.

        //! throw instead of returning Promise.reject() — the async wrapper handles
        //! the rejection directly; returning a standalone rejected Promise creates
        //! an extra Promise object that Zone.js tracks separately from the
        //! assimilated async return, causing spurious "Unhandled Promise rejection"
        //! reports (and can crash the process under Node's strict rejection mode).
        throw reason;
    }

    async monitorSubscriptions(response: Response) {
        if (!response.ok) throw new Error(`failure in listen...`);

        const compatResponse = fromPlatformFetchBody(response.body);
        this.stream = ndjsonStream(compatResponse);

        const reader = this.stream.getReader();
        let event: undefined | { value?: string; done: boolean },
            connected = true;

        const detectReadError = (e: string | Error) => {
            if (this.isAbortError(e)) {
                // this.log("abort detected while reading responses");
                connected = false;
            } else if (typeof e === "string" && e.match(/connection manager disconnect/)) {
                this.debug("disconnected on command from connection manager");
                this.transition("disconnected");
            } else {
                const causeStr = HostConnection.describeFetchError(e);
                this.warn(
                    "stream read error from %s — %s",
                    this.host.serverId,
                    causeStr,
                );
                this.events.emit(
                    "warning",
                    this.mkEvent({
                        message: `fetch error during read: ${causeStr}`,
                        [devMessage]: [
                            "probably this is caused by a network connection error",
                            " ... or server-side idle timeout, though we'd hope to get a toodleoo first.",
                            "Connection manager can sometimes safely ignore a couple of these,",
                            " ... especially if the user has gone idle",
                            " ... and/or if the app doesn't have special realtime or security requirements.  ",
                            " ... it SHOULD re-establish a healthy connection set when activity resumes",
                        ],
                        reason: e,
                    }),
                );
                this.lastError = e instanceof Error ? e : new Error(String(e));
                connected = false;
                this.transition("disconnected");
            }
            return undefined;
        };

        while (connected) {
            event = await reader.read().catch(detectReadError);
            if (!event) break;
            if (!connected) break;
            const ts = new Date();
            const { value, done } = event as { value: any; done: boolean };
            if (done) {
                this.events.emit(
                    "disconnected",
                    this.mkEvent({
                        message: "server disconnected",
                        [devMessage]:
                            "The server disconnected cleanly, notifying us that it was done. ",
                    }),
                );
                this.transition("disconnected");
                debugger;
                return;
            }
            if ("heartbeat" == value?.type) {
                this.heartbeatReceived();
                continue;
            }
            if ("heartbeat-info" == value?.type) {
                const { timerInterval } = value;
                this.trace("heartbeat-info: expecting heartbeats every %d ms", timerInterval);
                this.heartbeatInterval = timerInterval;
                //! seed lastHeartbeat with the freshly-established stream's clock
                //  and (re)arm the watchdog at the negotiated interval.  Without
                //  this, the watchdog only ever arms after the first real
                //  heartbeat — leaving a window where a stream that establishes
                //  but never delivers a heartbeat is undetectable.
                this.lastHeartbeat = new Date().getTime();
                this.armWatchdog();
                continue;
            }
            if ("warning" == value?.type) {
                //!!! todo: consider how & whether integrate this so that the warning becomes actionable
                //     to ConnectionManager or beyond.  See todo c1hxed4 in ConnectionManager around that too.
                if (process.env.NODE_ENV == "test") {
                    this.logger.debug("warning from host", this.host.serverId, ":", value);
                } else {
                    this.logger.warn("warning from host", this.host.serverId, ":", value);
                }
                continue;
            }

            // console.log(`client: ${chan} <- event: `, value);
            const { mid, ocid, channel, nbh, type, msg, ...details } = value;
            const normalMessage =
                "normal message notification.  Connection manager should aggregate messages and deduplicate, while notifying clients of the new message.";
            const errorMessage =
                "this indicates an internal problem being reflected out to you for any appropriate client-side treatment of the condition";
            const devInfo = "error" === type ? errorMessage : normalMessage;
            this.events.emit("message", {
                connection: this,
                message: "msg received in chan",
                mid,
                ocid,
                type,
                msg,
                channel,
                details,
                neighborhood: nbh,
                ts,
                [devMessage]: devInfo,
            });
        }
    }
    isAbortError(e: any) {
        return "AbortError" === e.name;
    }
    heartbeatInterval: number = 10000;
    lastHeartbeat: number = new Date().getTime();
    private heartbeatTimer?: ReturnType<typeof setTimeout>;

    private armWatchdog() {
        if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
        this.heartbeatTimer = setTimeout(this.watchdog, 3 * this.heartbeatInterval);
        this.heartbeatTimer.unref?.();
    }

    private clearWatchdog() {
        if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
        this.heartbeatTimer = undefined;
    }

    heartbeatReceived() {
        this.lastHeartbeat = new Date().getTime();
        this.armWatchdog();
    }

    @autobind
    watchdog() {
        //! defensive guard: armWatchdog is not cleared on exit from
        //  "connected", so a stale timer can fire while we're elsewhere.
        //  Drop it on the floor and stop re-arming.
        if (this.currentState !== "connected") {
            this.clearWatchdog();
            return;
        }

        const now = new Date().getTime();

        if (this.lastHeartbeat + 3 * this.heartbeatInterval >= now) {
            //! spurious wake (e.g. a heartbeat landed between the timer being
            //  scheduled and this firing).  re-arm and exit quietly.
            this.armWatchdog();
            return;
        }

        const downForMs = now - this.lastHeartbeat;
        this.warn(
            `missed 3 heartbeats from ${this.host.serverId} — host presumed dead (down ${(downForMs / 1000).toFixed(1)}s)`,
        );
        this.lastError = new Error(
            `missed 3 heartbeats from ${this.host.serverId} — host presumed dead`,
        );

        //! Order matters: transition BEFORE abort.  transition("disconnected")
        //  synchronously emits the "disconnected" event that CM's
        //  onConnectionDropped listens for (→ marks dropped → reconnecting
        //  → spawn replacement).  abortController.abort() fires the abort
        //  handler → transition("abort"); from the new "disconnected" state,
        //  transitionTable[disconnected][abort] keeps us in "disconnected".
        //
        //  Reversing the order would defeat the whole flatline-response
        //  pipeline: the abort handler would run transition("abort") from
        //  "connected" first → state "aborted", and the
        //  connected→disconnected onTransition's `signal.aborted` guard
        //  would suppress the event even if we then tried to transition.
        this.transition("disconnected");
        try {
            this.abortController?.abort();
        } catch {
            /* ignore */
        }
    }

    onEntry = {
        [`connecting`]: () => {
            // this.warn("hiya");
            return this.connect().then(
                () => {
                    // debugger
                    this.progress("connect() succeeded");
                    return this.transition("connected");
                },
                (e: any) => {
                    debugger;
                    this.lastError = e;
                    this.warn("connect() failed, retrying", e.stack);
                    return this.transition("retry");
                },
            );
        },
        [`retrying`]: () => {
            this.attempts += 1;
            if (this.attempts > this.settings.maxRetries) {
                return this.transition("failed");
            }
            const retryInterval = this.nextRetryInterval();
            const { maxRetries } = this.settings;

            this.ignoringListenerErrors("retrying", () =>
                this.events.emit(
                    "retrying",
                    this.mkEvent({
                        message: `connection error; will retry in ${Math.floor(
                            retryInterval / 1000,
                        )} seconds`,
                        [devMessage]: [
                            "This host connection got an error or timeout trying to connect, but it will retry on its own.",
                            "Each retry will be delayed a bit longer than the previous one. ",
                        ],
                        retryCount: this.attempts,
                        maxRetries,
                    }),
                ),
            );
            this.$deferredTransition("reconnect", "will retry", retryInterval);
        },
        [`connected`]: () => {
            this.progress("message stream established");
            //! seed the watchdog at connect time so a stream that establishes
            //  but never delivers a heartbeat-info or a heartbeat is still
            //  detectable.  heartbeat-info will (re)arm with the negotiated
            //  interval; until then we use the default heartbeatInterval.
            this.lastHeartbeat = new Date().getTime();
            this.armWatchdog();
            this.ignoringListenerErrors("connected", () => {
                this.events.emit("connected", {
                    connection: this,
                    message: "successful connection to neighborhood host",
                    attempts: this.attempts,
                    delayTime: this.elapsedTime(),
                    [devMessage]: [
                        "The connection is established and will emit 'message' events when received from the host.",
                    ],
                });
            });
        },

        [`failed`]: () => {
            this.ignoringListenerErrors("failed", () =>
                this.events.emit(
                    "failed",
                    this.mkEvent({
                        message: `giving up after persistent connection failure (${this.settings.maxRetries} attempts). `,
                        recommendatIon:
                            "check network connection, use patience, retry.  Do you have another way to connect to the network?",
                        [devMessage]: [
                            `The HostConnection object tried hard to get connected`,
                            `The connection manager is expected to retry, so it may be`,
                            `... better not to make maxRetries larger or to Infinity to keep retrying.`,
                            `See also: the 'retrying' event offered by the host connection.`,
                        ],
                    }),
                ),
            );
        },

        [`disconnected`]: () => {
            this.stopRetries();
            this.clearWatchdog();
        },
        [`aborted`]: () => {
            this.clearWatchdog();
        },
    };

    transitionTable: StateTransitionTable<HostConnectionStates, HostConnectionTransitions> = {
        [`default`]: {
            ...noTransitionsExcept,
            connect: {
                to: "connecting",
            },
        },
        [`connecting`]: {
            ...noTransitionsExcept,
            connected: {
                to: "connected",
            },
            abort: {
                to: "aborted",
            },
            failed: {
                to: "failed",
            },
            retry: {
                to: "retrying",
            },
            disconnected: {
                to: "disconnected",
            },
        },
        [`retrying`]: {
            ...noTransitionsExcept,
            failed: {
                to: "failed",
            },
            reconnect: {
                to: "connecting",
                onTransition: () => {
                    //! clear stale promise so onEntry[connecting] creates a fresh one.
                    //! do NOT call connect() here — its returned promise would be unhandled
                    //! (onEntry attaches .then() to its own call; a duplicate call from
                    //! onTransition wraps the same inner in a second outer whose rejection
                    //! is orphaned, crashing the process on 502s).
                    this.connecting = undefined;
                },
            },
            abort: {
                to: "aborted",
            },
        },
        [`connected`]: {
            ...noTransitionsExcept,
            failed: {
                to: "failed",
            },
            abort: {
                to: "aborted",
            },
            disconnected: {
                to: "disconnected",
                onTransition: () => {
                    if( this.abortController && this.abortController.signal.aborted) {
                        // throw new Error("already aborted");
                        return
                    }
                    this.events.emit("disconnected", {
                        message: "server disconnected",
                        connection: this,
                        reason: "... from new location TBD",
                        [devMessage]: ["no action needed; ConnectionManager will retry"],
                    });
                },
            },
        },
        [`failed`]: {
            ...noTransitionsExcept,
        },
        [`disconnected`]: {
            ...noTransitionsExcept,
            abort: { to: "disconnected" },
        },
        [`aborted`]: {
            ...noTransitionsExcept,
            disconnected: {
                to: "aborted",
            },
        },
    };
}
