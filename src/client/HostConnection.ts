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
    message: [ConnectionEvent & DredChannelMessage & DredMessage];
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
    private _status!: string; // assigned by state-machine
    private _destroyed = false; // Flag to track if connection is being destroyed
    private _disconnecting = false; // Flag to track if disconnection is in progress

    set currentState(v: string) {
        this._status = v;
    }

    get currentState() {
        return this._status;
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

        // if (channelSubs.length > 1) {
        //     this.logger.warn("connect: channelSubs", channelSubs);
        //     debugger;
        // }
        const channelListeners = this.channelSubs;

        signal.addEventListener("abort", abortHandler);
        const myself = (this.connecting = new Promise((res, rej) => {
            let aborted = false;
            this.logger.debug(`connecting to server ${this.host.serverId}`);
            this.logger.trace("channelListeners", channelListeners);

            this.fetch(`/channels/listen`, {
                body: JSON.stringify(this.channelSubs, null, 2),
                method: "POST",
                signal,
                headers: {
                    "content-type": "application/json",
                    clientid: this.clientid,
                },
            })
                .then((response: Response) => {
                    if (aborted) return false;
                    if (this.abortController?.signal.aborted) return false;

                    if (!response) return false;
                    // note: this callback happens only after all events seen in the stream
                    // are processed - which may be a LONG time after the connection is established.

                    this.logger.progress("connect: listening for %d channels", channelListeners.length );
                    this.logger.debug("channelListeners: ", channelListeners.map(x => x.channel));
                    //!!! todo: check to see if we should reject with an empty / non-existent response here
                    res(true);
                })
                .catch((e) => {
                    if (this.isAbortError(e)) {
                        // this.log("abort happened before fetch response headers");
                        aborted = true;
                    } else if ((e?.message || e?.toString() )?.match(/connection manager disconnect/)) {
                        aborted = true;
                    } else {
                        debugger;
                        this.warn(`fetch error; see debugger: %s`, e.stack || e.message || e);
                        this.events.emit("failed", this.connectionFailureEvent(e));
                    }
                });
        }));
        return myself;
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

        this.events.emit("failed", this.connectionFailureEvent(reason));

        return Promise.reject(reason);
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
                console.warn(`fetch error during read; see debugger - `, e);
                debugger;
                this.events.emit(
                    "warning",
                    this.mkEvent({
                        message: "fetch error during read",
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
    heartbeatReceived() {
        const now = new Date().getTime();
        this.lastHeartbeat = now;
        if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer);
        this.heartbeatTimer = setTimeout(this.watchdog, 3 * this.heartbeatInterval);
        this.heartbeatTimer.unref && this.heartbeatTimer.unref();
    }

    @autobind
    watchdog() {
        const now = new Date().getTime();

        if (this.lastHeartbeat + 1.1 * this.heartbeatInterval < now) {
            console.warn("Missed expected heartbeat from server", this.host.serverId);
        }

        if (this.lastHeartbeat + 3 * this.heartbeatInterval < now) {
            console.error("Missed 3 expected heartbeats from server!!!", this.host.serverId);
            //!!! todo: this.events.emit("dead")
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
                    this.connecting = undefined;
                    this.connect();
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
