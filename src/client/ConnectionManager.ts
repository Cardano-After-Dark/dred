import { autobind, StateMachine } from "@poshplum/utils";
import { EventEmitter } from "eventemitter3";

import { Discovery } from "../types/Discovery.js";
import {
    ChanId,
    SubscriptionListenerMap,
    NbhId,
    ChannelSubscriptionListener,
    DredChannelMessage,
    SubscriptionList,
} from "../types/ChannelSubscriptions.js";
import { DredHostDetails, connnectionSettings } from "../types/DredHosts.js";
import { devMessage, DredError, DredEvent } from "../types/DredEvents.js";

import { ConnectionEvent, HostConnection } from "./HostConnection.js";

import {
    ConnectionState,
    ConnectionThresholds,
    ConnectionManagerOptions,
    PromisedHostDetails,
    ThresholdChoice,
} from "../types/PeerDiscovery.js";
import { asyncDelay } from "../util/asyncDelay.js";
import { fetcher } from "./fetcher.js";
import { DredMessage } from "./DredClient.js";


// | "pending"
// | "discovering"
// | "connecting"
// | "disconnected"
// | "underconnected"
// | "minimally connected"
// | "connected"
// | "refreshing";

type ManagerEvents = {
    hasNeighborhood: [DredEvent];
    needsNeighborhood: [DredEvent];
    connecting: [DredEvent];
    "connect:minimal": [DredEvent];
    connected: [DredEvent];
    disconnecting: [DredEvent];
    disconnected: [DredEvent];

    //! todo: move these to an aggregator capability in Client or separate class
    "channel:added": [DredEvent & { nbh: NbhId; channel: ChanId }];
    "channel:removed": [DredEvent & { nbh: NbhId; channel: ChanId }];
    message: [DredChannelMessage];
};

type connStatus = "active" | "pending" | "disconnected" | "obsolete";
type healthStatus = "unhealthy" | "partial" | "healthy";

type cm = ConnectionManager;
const connectionManagerStates = {
    logLevel: "info",
    discoveringNbh: {
        default: true,
        async onEntry(this: cm) {
            //! it moves directly to host discovery if there is already a nbh
            if (this.discovery.hasNeighborhood()) {
                return this.transition("setupPending");
            } else {
                this.events.emit("needsNeighborhood", {
                    message: "select a neighborhood",
                    // recommendation: "",
                    [devMessage]: [
                        "choose a default neighborhood if that fits your application's needs, ",
                        "and/or give the user a default or choice based on neighborhood discovery.",
                        "Set a default neighborhood with the new DredClient{{neighborhood}) option",
                        "...or, use ‹clientObject›.discovery.setNeighborhood(nbhId)",
                    ]
                });
            }
        },
        setupPending: "pendingSetup",
    },
    pendingSetup: {
        async onEntry(this: cm) {
            if (this.hosts?.length && this.channelSubs?.size)
                return this.transition("readyToConnect");


        },
        updatedHostList: { nextState: "pendingSetup", reEntry: true },
        hasSubscriptions: { nextState: "pendingSetup", reEntry: true },
        readyToConnect: "connecting",
    },
    replacingSubs: {
        // equivalent to connecting, except:
        //   * quieter (no separate "connecting" event)
        partial: "degraded",
        sufficient: "healthy",
    },
    connecting: {
        onEntry(this: cm) {
            this.events.emit("connecting", {
                message: "establishing connections to neighborhood hosts",
                [devMessage]: [
                    `The connection manager is starting to connect to hosts.`,
                    `Update users with the info and monitor other events for further progress`,
                ],
            });
            this.connectToHosts();
        },
        updatedHostList: {
            nextState: "connecting",
            reEntry: true,
        },
        partial: "partiallyConnected",
        replaceSubs: "replacingSubs",
    },
    partiallyConnected: {
        onEntry(this: cm) {
            this.emitPartialConnectEventIfNeeded();
        },
        // "connectedOne": "addedConnection",
        sufficient: "healthy",
        partial: "partiallyConnected",
    },
    healthy: {
        onEntry(this: cm) {
            //@ts-expect-error - until state-machine provides us an indicator of previous state
            if (this.previousState) throw new Error("hurray, we can change this next line");
            const previousState = this.currentState as string;

            //! it notifies interested clients when the connection count has become sufficient.
            if (["disconnected", "degraded"].includes(previousState)) {
                this.events.emit("connected", {
                    message: "restored neighborhood connectivity",
                    //! it helps clients clear any warnings that may have been present
                    //  for security / realtime applications
                    altMessageSecurity: "",
                    altMessageRealtime: "",
                    [devMessage]: "consider displaying the message briefly, to reassure the user",
                });
            } else {
                this.events.emit("connected", {
                    message: "connected to neighborhood",
                    //!!! todo? include a count of connected hosts, here or in another spot
                    //   ... even if that's only for dApp developer transparency and we guide them
                    //   to avoid creating unnecessary complication by default in their UX

                    //! it helps clients clear any warnings that may have been present
                    //  for security / realtime applications
                    altMessageSecurity: "",
                    altMessageRealtime: "",
                    [devMessage]: "consider displaying the message briefly, to reassure the user",
                });
            }
        },
        sufficient: {
            //! it can withstand being transitioned (back) to sufficient any time the active
            //  connection-count changes, without triggering extraneous events
            nextState: "healthy",
            reEntry: false,
        },
        partial: "degraded",
        updatedHostList: "connecting",
    },
    degraded: {
        onEntry(this: cm) {
            this.events.emit("connect:minimal", {
                message: "...trying to improve neighborhood connectivity",
                altMessageRealtime: "messages may be delayed",
                altMessageSecurity:
                    "for improved security, please hold while connectivity is restored",
                [devMessage]: [
                    `The connection manager still has some connections to neighborhood hosts,`,
                    ` ... but fewer than preferred for redundancy, security, and tolerance to further faults.`,
                    `Realtime or security-critical applications may consider using one of the altMessages and/or 'message'.`,
                    `The connection manager will retry and add connections to other neighborhood hosts if possible,`,
                    ` ... to re-achieve a healthy level of connectivity; it will issue a 'connected' event at that time`,
                ],
            });
        },
        sufficient: "sufficient",
        updatedHostList: "connecting",
    },
    disconnecting: {
        onEntry(this: cm) {
            this.events.emit("disconnecting", {
                message: "disconnecting from neighborhood hosts",
                [devMessage]: [`disconnecting on request (probably from client object)`],
            });
            this.disconnect();
        },
        disconnected: "disconnected",
    },
    disconnected: {
        onEntry(this: cm) {
            //!!!! todo check prior state and tune the message for conditions.

            this.events.emit("disconnected", {
                message: "we're having trouble maintaining neighborhood connectivity",
                recommendation: "check your network connection and/or have patience",
                altMessageRealtime: "you may experience messaging delays",
                altMessageSecurity: "wait for resolution before continuing",
                [devMessage]: [
                    "tbd"
                ]
            });
        },
        reconnect: "connecting",
    },
};

export class ConnectionManager extends StateMachine.withDefinition(
    connectionManagerStates,
    "connection-manager"
) {
    state: ConnectionState = "pending";
    discovery: Discovery;
    hosts?: DredHostDetails[];
    events = new EventEmitter<ManagerEvents>();
    waitFor: ThresholdChoice;

    getThresholds(): Promise<ConnectionThresholds> {
        return this.discovery.getConnectionThresholds();
    }
    //! it keeps a current list of target event-subscriptions
    channelSubs?: SubscriptionListenerMap;

    //! it remembers the last set of subscriptions, while the next set is being established.
    lastChannelSubs?: SubscriptionListenerMap;

    //! it is initialized with connection settings used for tuning behavior of outgoing connections
    connectionSettings: connnectionSettings;

    //! it can map from the host object to a best-known Connection object for that host.
    private hostToConn = new Map<DredHostDetails, HostConnection>();

    //! it keeps notes on the status of every connection it knows about, and can count the connections in each state
    private connStatus = new Map<HostConnection, connStatus>();

    //! it keeps a graveyard of connections that can drop out of the set anytime they're garbage-collected,
    //  for connections that are known to be obsolete / replaced by newer versions, but which might still get / emit
    //  some events while they wrap up their operations.
    private graveyard = new WeakSet<HostConnection>();

    private partialConnectNotification?: Promise<any>;

    private _status!: string; // assigned by state-machine
    //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
    set currentState(v: string) {
        this._status = v;
    }
    //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
    get currentState() {
        return this._status;
    }
    channels?: ChanId[];

    constructor(options: ConnectionManagerOptions) {
        super({
            contextLabel: "connection-manager",
            currentState: "discoveringNbh",
            logFacility: "connection-manager:state",
            contextObject: null,
        });
        // //@ts-expect-error used before assignment (assigned by state-machine)
        // this._status = this._status || "";

        this.connectionSettings = HostConnection.settingsWithDefaults(options.connectionSettings);
        this.discovery = options.discovery;
        this.discovery.events.on("hosts:updated", this.setHostList);
        this.waitFor = options.waitFor;
        this.transition("default");
    }

    @autobind
    async setHostList({ hosts }: { hosts: DredHostDetails[] }) {
        if (this.hosts) {
            this.retireObsoleteConnections(hosts);
        }
        this.hosts = hosts;
        this.transition("updatedHostList");
    }

    retireObsoleteConnections(hosts: DredHostDetails[]) {
        //!!!!! todo implement retireObsoleteConnections
    }

    async getChannelList(): Promise<ChanId[]> {
        if (this.channels) return this.channels;
        //!!!!! ensure that channels are always fresh (watch host connections for updates in '_chans' stream)
        if (!this.hosts) throw new Error(`no hosts discovered yet`);

        const channels = new Set<string>();
        let hostNumber = 1;
        let responses = 0;
        let completed = false;
        let errors : Error[] = [];
        for (const host of this.hosts as DredHostDetails[]) {
            if (hostNumber > 2) await asyncDelay(100 * Math.pow(1.27, hostNumber));

            try {
                const {channels:foundChans} = await fetcher("/channels", {
                    host,
                })
                for (const chan of foundChans) {
                    if (!channels.has(chan)) {
                        //!!!!! todo: do this for channels found in the neighborhood's _chans channel later
                        this.events.emit("channel:added", {
                            nbh: this.discovery.nbh,
                            channel: chan,
                            message: "new channel discovered",
                            [devMessage]: [
                                "ensure this channel makes it into the state of the client & application",
                            ],
                        });
                    }
                    channels.add(chan);
                }
                return (this.channels = [...channels]);
            } catch(e) {
                console.warn(`host ${host.address}:${host.port}: fetching /channels failed: `, e)
            }
        }
        return []
    }

    // async getPeers(): PromisedPeers<T> {
    //     if (this.peerCache) return this.peerCache;
    //     return (this.peerCache = await this.discovery.getHostList());
    // }
    // async _discover(): PromisedPeers<T> {
    //     this.state = "discovering";
    //     return this.discoverPeers();
    // }
    disconnect() {
        //!!!!! todo: actually disconnect from the hosts.
        for (const [host, connection] of this.hostToConn.entries()) {
            connection.disconnect("due to connection manager disconnect()");
            this.moveConnTo(connection, "obsolete");
        }
        this.transition("disconnected");
    }

    async setSubscriptions(subs: SubscriptionListenerMap) {
        if (this.channelSubs) return this.replaceSubscriptions(subs);

        this.channelSubs = subs;
        if (!this.hosts) {
            await new Promise((resolve) => this.discovery.events.once("hosts:ready", resolve));
        }
        this.connectToHosts();
        return subs
    }

    async replaceSubscriptions(subs: SubscriptionListenerMap) {
        this.lastChannelSubs = this.channelSubs;
        this.channelSubs = subs;

        const promises: Promise<any>[] = [];
        for (const host of this.hostToConn.keys()) {
            promises.push(this.replaceHostConnection(host));
        }
        // these promises will resolve within settings.connectionWaitTime,
        // although IF enough of the connections haven't gotten started yet, then
        // the connection manager will change to
        Promise.all(promises).then( () => {
            this.lastChannelSubs = undefined;
        })
        return subs;
    }

    connectToHosts() {
        //! it EXPECTS to be called after the state machine has already done discovery
        if (!this.hosts) throw new Error(`no hosts; discovery not complete?`);

        //! it EXPECTS to have subscription settings before connecting
        if (!this.channelSubs) throw new Error(`no channel subscriptions yet.`);

        for (const h of this.hosts) {
            //!!!!! todo recycle existing connections matching current channelSubs
            this.connectTo(h)

        }
    }

    connectTo(host: DredHostDetails) {
        if (!this.channelSubs)
            throw new Error( // makes typescript happy
                `missing channelSubs; should already have a reasonable default value`
            );
            
        const subscriptions : SubscriptionList = [];
        for (const sub of Object.values(this.channelSubs)) {
            subscriptions.push(sub.options)
        }
        const conn = new HostConnection(host, subscriptions, this.connectionSettings);
        conn.events.on("connected", this.healthyConnection);

        conn.events.on("disconnected", this.cleanupConnection);
        conn.events.on("replacedBy", this.cleanupConnection);
        conn.events.on("failed", this.cleanupConnection);

        conn.events.on("message", this.notifySubscribers);

        //!!! todo log at warning level
        // conn.events.on("warning", this.notifySubscribers);

        this.hostToConn.set(host, conn);
        this.moveConnTo(conn, "pending");
        return conn;
    }

    logger!: any;
    @autobind
    healthyConnection(event: ConnectionEvent) {
        const { connection, message: msg } = event;
        //! it records the active state of the connection
        this.moveConnTo(connection, "active");
        this.logger.info({ summary: `connection to ${connection.host.address}` }, "healthy");

        //! it does NOT need to trigger event 'replacedBy', because replaceHostConnection() takes that responsibility

        this.checkConnectionState();
    }

    @autobind
    cleanupConnection(event: ConnectionEvent | DredError) {
        const { connection, message } = event;
        console.log("cleanup: ", connection.host.address, message);

        this.moveConnTo(connection, "disconnected");
        this.graveyard.add(connection);
    }

    @autobind
    notifySubscribers(event: ConnectionEvent & DredChannelMessage & DredMessage) {
        const { mid: msgId, connection, message: message, details, neighborhood, channel } = event;
        if (!this.channelSubs) {
            console.log("no listeners to hear about:", event);
            return;
        }

        for (const [chan, sub] of Object.entries(this.channelSubs)) {
            //!!!!! move to ChannelSubscription
            if (chan === channel) {
                const { recentMsgs: seen } = sub;
                if (!seen.has(msgId)) {
                    seen.add(msgId);
                    sub.listener(event);
                    // sub.events.emit("channel:message", event);
                }
            }
        }
    }

    async replaceHostConnection(host: DredHostDetails): Promise<HostConnection> {
        const replacingConn = this.hostToConn.get(host);

        const replacement = this.connectTo(host);
        //! it starts a replacement connection and hopes to complete the new connection quickly.
        return new Promise<HostConnection>((resolve, reject) => {
            let timeout: boolean;
            replacement.events.once("connected", ({ connection }) => {
                const oldConnection = replacingConn;
                //! if it completes quickly, the original connection is seamlessly replaced in the active-connections list
                oldConnection?.replacedBy(replacement);
                //! if the connection didn't connect promptly and was moved to pending, it's made active when connected
                this.moveConnFromTo(replacement, "pending", "active");
                //! it moves the old connection
                oldConnection && this.moveConnTo(oldConnection, "obsolete");
                oldConnection && this.graveyard.add(oldConnection);

                if (!timeout) {
                    timeout = false;
                    resolve(replacement);
                }
            });
            //! if the new connection doesn't connect promptly, it...
            //   * moves the old connection to obsolete
            //   * adds the pending connection to pending
            //   * triggers replacedBy event on the prior connection
            //   * has a clear outlet/codepath for completing the resolution of the new connection (same as for any connection)
            asyncDelay(this.connectionSettings.connectionWaitTimeMs).then(() => {
                this.moveConnTo(replacement, "pending");
                const oldConnection = replacingConn;
                oldConnection && this.moveConnTo(oldConnection, "obsolete");
                if (timeout !== false) {
                    timeout = true;
                    resolve(replacement);
                }
            });
        });
    }

    connected(connection: HostConnection, event: DredEvent) {
        const status = this.connStatus.get(connection);
        if (status == "obsolete") return;
        this.moveConnTo(connection, "active");

        const obsoleteConn = this.hostToConn.get(connection.host);
        if (obsoleteConn) {
            this.moveConnTo(obsoleteConn, "obsolete");
        }
        this.hostToConn.set(connection.host, connection);
    }

    //! it sets the status of a connection to a target state, only if the current state matches the indicated "from" state.
    private moveConnFromTo(connection: HostConnection, from: connStatus, target: connStatus) {
        const current = this.connStatus.get(connection);
        if (from === current) this.connStatus.set(connection, target);
    }

    //! it moves the connection to a target state
    private moveConnTo(connection: HostConnection, state: connStatus) {
        this.connStatus.set(connection, state);
    }

    //! it emits a "connect:minimal" event after a brief delay, only if it's still
    //  partially-connected after other connections have had their chance
    //  and it didn't make it to a well-connected state.
    async emitPartialConnectEventIfNeeded() {
        if (this.partialConnectNotification) return;

        const unhappy: ConnectionState[] = ["degraded", "minimally connected"];

        const pcn = (this.partialConnectNotification = asyncDelay(
            this.connectionSettings.connectionWaitTimeMs
        ));
        await pcn;

        if (unhappy.includes(this.state) && pcn === this.partialConnectNotification) {
            this.partialConnectNotification = undefined;
            this.events.emit("connect:minimal", {
                message: "partially connected to neighborhood",
                altMessageRealtime: `message delays are possible`,
                [devMessage]: [
                    `There are a minimal number of connections to neighborhood hosts,`,
                    ` ... but not as many as would be preferred for best operations.`,
                    `Connection manager will work to restore connectivity.  Look for the 'connected' event`,
                    ` ... to indicate restored health.`,
                    `For security-centric applications, the minimal number of connections should`,
                    ` ... already guard security outcomes, so this event does not imply a loss of security`,
                ],
            });
        }
    }

    async checkConnectionState(): Promise<healthStatus> {
        //! it checks all the peers for connection health
        const thresholds = await this.getThresholds();
        let healthyConnectionCount = 0;

        for (const [conn, status] of this.connStatus.entries()) {
            if (this.graveyard.has(conn)) continue;

            if (status === "active") healthyConnectionCount += 1;
        }

        if (healthyConnectionCount >= thresholds.healthy) {
            return this.transition("sufficient");
        }

        if (healthyConnectionCount > thresholds.minimal) {
            return this.transition("partial");
        }
        return this.transition("unhealthy");
    }

    async freshenPeers(): PromisedHostDetails {
        this.state = "refreshing";
        const newCache = await this.discovery.getHostList();
        if (newCache === this.hosts) {
            throw new Error(
                `discoverPeers returned the existing perCache; it must return a new Peer list`
            );
        }
        let i = 0;
        for (let newPeer of newCache) {
            const match = this.hosts?.find((cachedPeer) => this.areSamePeer(newPeer, cachedPeer));
            if (match) {
                newPeer = newCache[i] = match;
            }
            //!!!! todo: consider whether forcing the host-connection to reset is of any value,
            //     given it has its own retry logic
            // if (!newPeer.isConnected || newPeer.isConnecting) {
            //     await newPeer.abortConnection();
            //     await newPeer.connect();
            // }
        }
        //!!! it counts good connections and keeps health-state accurate
        //    in its state-machine - so this probably isn't needed
        // await this.checkConnectionState(newCache)
        return (this.hosts = newCache);
    }

    newState(cs: ConnectionState) {
        this.state = cs;

        //!!! add eventListener and notify those listeners.
        // this.notify(cs);
    }

    // async connectToPeers(): PromisedHostDetails {
    //     const promises: Array<Promise<Peer<T>>> = [];
    //     const connectedPeers: DredHostDetails[];
    //     const peers = this.freshenPeers();
    //     const thrs = await this.getThresholds();

    //     let startTime = new Date().getTime(),
    //         resolver: Function,
    //         rejecter: Function,
    //         resolved: Boolean,
    //         rejected: Boolean,
    //         seenErrors: Error[],
    //         successCount = 0,
    //         rejectCount = 0;

    //     function resolveMe(result) {
    //         if (resolved || rejected) return;
    //         resolved = true;
    //         resolver(result);
    //     }
    //     function rejectMe(error) {
    //         if (resolved || rejected) return;
    //         rejected = true;
    //         rejecter(error);
    //     }

    //     const checkPartialSuccess = () => {
    //         //! it resolves immediately when enough successes have accumulated,
    //         //   compared to the requested 'waitFor' threshold.
    //         if (connectedPeers.length > thrs.minimal) {
    //             //! During initial connection sequence, it notifies listeners as soon as
    //             //  it has established some connectivity, for progress reporting to end-user.
    //             this.optionalTransition("partial");
    //         }
    //         if (connectedPeers.length >= thrs[this.waitFor]) {
    //             console.log("connected to peers", connectedPeers.length);

    //             resolveMe(peers);
    //         }

    //         //! it throws an error if it can't connect to enough peers
    //         if (peers.length - rejectCount < thrs.minimal) {
    //             console.error("Error connecting to enough peers");
    //             if (successCount) {
    //                 this.newState("underconnected");
    //                 const msg = `Connected to only ${successCount} peers, out of ${thrs.minimal} needed for convergence`;
    //                 console.error(msg);
    //                 //!!! todo: consider: in development, we should fake a cycle through all possible states
    //                 rejectMe(
    //                     new Error(msg, {
    //                         cause: {
    //                             partial: true,
    //                             "?developer?": {
    //                                 note: "more peers can connect later, and any reconnecting peers may result in a later improvement",
    //                                 guidance:
    //                                     "don't let the user think everything is fine and dandy!  Not having enough connectivity for convergence means YOU DON'T KNOW THE STATE OF THE CHANNEL!",
    //                             },
    //                             seenErrors,
    //                             recommendation:
    //                                 "Warn the user with this error.message, and use a read-only UI until decentralization score improves",
    //                             suggestion:
    //                                 "consider rendering any locally-cached data if possible and use a read-only or offline state in your user-experience",
    //                         },
    //                     })
    //                 );
    //             } else if (this.state == "connecting") {
    //                 const msg = `Not connected to any peers`;
    //                 console.error(msg);
    //                 this.newState("disconnected");
    //             }
    //             //!!! todo: make the following details available under this.getMoreInfo
    //             //     and this.developerGuidance
    //             const msg = `Can't connect to any peers. ${thrs.minimal} are needed for convergence`;
    //             console.error(msg);
    //             rejectMe(
    //                 new Error(msg, {
    //                     cause: {
    //                         partial: false,
    //                         note: "Reconnecting peers may result in a later improvement",
    //                         guidance:
    //                             //!!! guides developer to use reconnect() or its final and correct name
    //                             " wait for retries to succeed, or use reconnect()",
    //                         seenErrors,
    //                         recommendation:
    //                             "Emit this error.message into your UI, and keep monitoring for continuing state changes",
    //                         suggestion:
    //                             "consider rendering any locally-cached data if possible and use a read-only or offline state",
    //                     },
    //                 })
    //             );
    //         }

    //         const now = new Date().getTime();
    //         //@ts-expect-error - remove the fallback and/or adjust the code to get same result
    //         //   out of the state machine
    //         if (now - startTime > this.connectionSettings.connectionWaitTimeMs || 5000) {
    //             //! resolves successfully if it can connect to at least the minimal number of peers
    //             //   after waiting for the timeout, even if waitFor: "healthy" is specified.
    //             if (successCount > thrs.minimal) {
    //                 resolveMe(peers);
    //             }
    //         }
    //     };

    //     const myPromise = new Promise((res, rej) => {
    //         (resolver = res), (rejecter = rej);
    //     }) as PromisedHostDetails;
    //     for (const p of peers) {
    //         let retries = 0;
    //         let myLastError: Error;
    //         const pp = this.tryOneConnection(p).then(
    //             () => {
    //                 console.log("connected to peer", p);
    //                 if (resolved) return;

    //                 successCount += 1;
    //                 connectedPeers.push(p);
    //                 checkPartialSuccess();
    //             },
    //             (error) => {
    //                 rejectCount += 1;
    //                 seenErrors.push(error);
    //                 myLastError = error;
    //                 checkPartialSuccess();

    //                 //! retries any failed connections
    //                 this.tryOneConnection(p).then(
    //                     (success) => {
    //                         console.log("CM: success after retry on peer", p);
    //                         //! todo: write the real code for this:
    //                         //   seenErrors.deleteAt(myLastError):
    //                         rejectCount -= 1;
    //                         successCount += 1;
    //                         checkPartialSuccess();
    //                     },
    //                     (failure) => {
    //                         console.log("CM: giving up after one retry on peer", p);
    //                         //! for now, it retries each connection only once.
    //                         //!!! todo: use exponential retry (exponents of 1.27 starting at ~500ms)
    //                     }
    //                 );
    //             }
    //         );
    //         promises.push(pp as any);
    //     }

    //     return myPromise;
    // }
    areSamePeer(p1: DredHostDetails, p2: DredHostDetails) {
        return (
            p1.address == p2.address &&
            p1.port == p2.port &&
            p1.serverId == p2.serverId &&
            p1.publicKey == p2.publicKey
        );
    }
}
