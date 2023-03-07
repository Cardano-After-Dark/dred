import { autobind, StateMachine } from "@poshplum/utils";
import { EventEmitter } from "eventemitter3";
import { fromPlatformFetchBody } from "@platform/ReadableStream";

import { connnectionSettings, DredHostDetails } from "../types/DredHosts.js";
// import { asyncDelay } from "../util/asyncDelay.js";
import {
    DredEvent,
    // EventHelpAllowedEvents,
    // eventHelp, DredEmitter, dredEmitter, EventInterface,
    DredEventPlus,
    DredError,
    devMessage,
} from "../types/DredEvents.js";
import { asyncDelay } from "../util/asyncDelay.js";
import { SubscriptionListenerMap, DredChannelMessage, SubscriptionList } from "../types/ChannelSubscriptions";
import { ndjsonStream } from "./betterJsonStream.js";
import { DredMessage } from "./DredClient.js";

type conn = HostConnection;
export interface ConnectionEvent extends DredEvent {
    connection: HostConnection;
}
export interface moreInfo {
    moreInfo?: any;
}

export interface HostConnectionEventTypes {
    warning: [ConnectionEvent & moreInfo];
    failed: [ConnectionEvent & DredError];
    retrying: [ConnectionEvent];
    connected: (
        c: ConnectionEvent & {
            delayTime: number;
            attempts: number;
        }
    ) => void;
    replacedBy: [ConnectionEvent & { replacement: HostConnection }];
    message: [ConnectionEvent & DredChannelMessage & DredMessage];
    disconnected: [ConnectionEvent & DredError];
}

const connectionStates = {
    logLevel: "info",
    connecting: {
        default: true,

        onEntry(this: conn) {
            this.connect().then(this.mkTransition("connected"), (e: any) => {
                this.lastError = e;
                this.transition("retry");
            });
        },
        abort: "aborted",
        retry: "retrying",
        connected: "connected",
    },
    retrying: {
        failed: "failed",
        reconnect: {
            nextState: "connecting",
            effect(this: conn) {
                this.connect();
            },
        },
        abort: "aborted",
        async onEntry(this: conn) {
            this.attempts += 1;
            if (this.attempts > this.settings.maxRetries) return this.transition("failed");
            this.retryLater();
        },
    },
    connected: {
        onEntry(this: conn) {
            const now = new Date();
            this.events.emit("connected", {
                connection: this,
                message: "successful connection to neighborhood host",
                attempts: this.attempts,
                delayTime: this.elapsedTime(),
                [devMessage]: [
                    "The connection is established and will emit 'message' events when received from the host.",
                ],
            });
        },
        abort: "aborted",
        disconnected: {
            nextState: "disconnected",
            predicate(this: conn) {
                return !this.abortController?.signal.aborted;
            },
            effect(this: conn) {
                //!!! todo: put the event trigger more directly in the spot where disconnection is detected (with any error message), plus the transition()
                this.events.emit("disconnected", {
                    message: "server disconnected",
                    connection: this,
                    reason: "... from new location TBD",
                    [devMessage]: [
                        "no action needed; ConnectionManager will retry",
                    ],
                });
            },
        },
    },
    failed: {
        onEntry(this: conn) {
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
                })
            );
        },
    },
    //! aborts (from 'disconnected') and disconnects (from 'aborted') don't change the terminal states.
    disconnected: {
        //! disconnection is terminal; should be freed and garbage collected
        abort: "disconnected",

        onEntry(this: conn) {
            this.stopRetries();
        },
    },
    aborted: {
        //! an aborted connection is terminal; should be freed and garbage collected
        disconnected: "aborted",

        onEntry(this: conn) {
            this.stopRetries();
        },
    },
};

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
export class HostConnection extends StateMachine.withDefinition(
    connectionStates,
    "connection-manager"
) {
    static emitterHelp = connectionEvents;
    events = new EventEmitter<HostConnectionEventTypes, any>();
    abortController?: AbortController;
    host: DredHostDetails;
    settings: connnectionSettings;
    attempts = 0;
    lastError?: any;
    channelSubs: SubscriptionList;
    private stream?: ReturnType<typeof ndjsonStream>;

    private startTime = new Date().getTime();
    private scheduledRetry?: ReturnType<typeof setTimeout>;

    private _status!: string; // assigned by state-machine
    //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
    set currentState(v: string) {
        this._status = v;
    }
    //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
    get currentState() {
        return this._status;
    }

    elapsedTime(this: HostConnection): number {
        const now = new Date();
        return now.getTime() - this.startTime;
    }

    retryLater() {
        const retryInterval = this.nextRetryInterval();
        const { maxRetries } = this.settings;
        //!!! todo: it only emits a warning if this.events.listeners indicates nobody is listening for the 'retrying' event.
        this.events.emit(
            "warning",
            this.mkEvent({
                message: `connection error; will retry in ${Math.floor(
                    retryInterval / 1000
                )} seconds`,
                [devMessage]: "subscribe to 'retrying' to remove this warning.",
                retryCount: this.attempts,
                maxRetries,
            })
        );
        this.scheduledRetry = setTimeout(this.mkTransition("reconnect"), retryInterval);

        this.events.emit(
            "retrying",
            this.mkEvent({
                message: `connection error; will retry in ${Math.floor(
                    retryInterval / 1000
                )} seconds`,
                [devMessage]: [
                    "This host connection got an error or timeout trying to connect, but it will retry on its own.",
                    "Each retry will be delayed a bit longer than the previous one. ",
                ],
                retryCount: this.attempts,
                maxRetries,
            })
        );
    }

    eventWithMessage<T>(m: string, e: T) {
        return {
            message: ``,
            ...e,
        };
    }

    nextRetryInterval(): number {
        return Math.min(
            this.settings.retryBaseIntervalMs * Math.pow(1.27, this.attempts),
            this.settings.retryMaxIntervalMs
        );
    }
    disconnect(reason: string) {
        //!!! todo: cancel any pending stream with ReadableStream.cancel()

        if (this.abortController) this.abortController.abort(`disconnect(): ${reason}`);
        this.stopRetries();
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
    connecting: Promise<any | never>;
    static settingsWithDefaults(
        partialSettings: Partial<connnectionSettings>
    ): connnectionSettings {
        return {
            retryBaseIntervalMs: 1000,
            retryMaxIntervalMs: 30000,
            maxRetries: Infinity,
            connectionWaitTimeMs: 7000,
            ...partialSettings,
        };
    }
    constructor(
        host: DredHostDetails,
        subscriptions: SubscriptionList,
        settings: Partial<connnectionSettings>
    ) {
        super({
            contextLabel: `connection:${host.serverId}`,
            currentState: "default",
            logFacility: "connection:state",
            contextObject: null,
        });
        const settingsWithDefaults: connnectionSettings = {
            retryBaseIntervalMs: 1000,
            retryMaxIntervalMs: 30000,
            maxRetries: Infinity,
            connectionWaitTimeMs: 7000,
            ...settings,
        };
        this.settings = HostConnection.settingsWithDefaults(settings);

        this.events.on("replacedBy", ({}) => {});
        this.host = host;
        this.channelSubs = subscriptions;
        this.connecting = this.connect();
    }

    async connect(): Promise<any | never> {
        this.abortController = new AbortController();
        const { signal } = this.abortController;
        signal.addEventListener("abort", () => {
            this.transition("abort");
        });
        const myself = (this.connecting = new Promise((res, rej) => {
            let aborted = false;
            const channelSubs = {};
            this.fetch(`/channels/listen`, {
                body: JSON.stringify(this.channelSubs, null, 2),
                method: "POST",
                signal,
                headers: { "content-type": "application/json" },
            })
                .then((response: Response) => {
                    if (aborted) return false;
                    if (this.abortController?.signal.aborted) return false;

                    //!!! todo: check to see if we shoudl reject with an empty / non-existent response here
                    if (!response) return false;

                    res(true);
                })
                .catch((e) => {
                    debugger;
                    if (this.isAbortError(e)) {
                        // this.log("abort happened before fetch response headers");
                        aborted = true;
                    } else {
                        console.warn(`fetch error; see debugger - `, e);
                        this.events.emit("failed", this.connectionFailureEvent(e));
                        debugger;
                    }
                });
        }));
    }

    mkEvent<T extends Pick<DredError, "message" | typeof devMessage> & Record<any, any>>(
        args: T
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
        const result = await fetch(url, options);
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

        const detectReadError = (e: Error) => {
            if (this.isAbortError(e)) {
                // this.log("abort detected while reading responses");
                connected = false;
            } else {
                console.warn(`fetch error during read; see debugger - `, e);
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
                    })
                );
                debugger;
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
                    })
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
                const { heartbeatInterval } = value;
                this.heartbeatInterval = heartbeatInterval;
                continue;
            }        
            if ("warning" == value?.type) {
                //!!! todo: consider how & whether integrate this so that the warning becomes actionable
                //     to ConnectionManager or beyond.  See todo c1hxed4 in ConnectionManager around that too.
                console.log("warning from host", this.host.serverId, ":", value)
                debugger
                continue;
            }
            
            // console.log(`client: ${chan} <- event: `, value);
            const { mid, ocid, channel, nbh, type, msg, ...details } = value;
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
                [devMessage]:
                    "normal message notification.  Connection manager should aggregate messages and deduplicate, while notifying clients of the new message.",
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
}
