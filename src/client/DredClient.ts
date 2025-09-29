import fetch from "cross-fetch";
import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
import type { Response } from "cross-fetch";

import { colors } from "../picocolors/picocolors.js";
const {
    bgBlackBright,
    blue,
    blueBright,
    green,
    greenBright,
    red,
    redBright,
    yellow,
    yellowBright,
    isColorSupported,
    bgBlack,
    magenta,
} = colors;

import { EventEmitter } from "eventemitter3";
import { asyncDelay, autobind, StateMachine, zonedLogger } from "@poshplum/utils";

import { ConnectionManager } from "./ConnectionManager.js";

import { type ChannelOptions } from "../types/ChannelOptions.js";
import { type Subscriber } from "../Subscriber.js";
import { StringNacl } from "../util/StringNacl.js";
import { type connnectionSettings, type DredHostDetails } from "../types/DredHosts.js";
import { type ConnectionThresholds, type Discovery } from "../types/Discovery.js";
import { NeighborhoodDiscovery } from "../peers/NeighborhoodDiscovery.js";
import { HostConnection } from "./HostConnection.js";
import {
    type ChanId,
    type SubscriptionListenerMap,
    ChannelSubscriptionListener,
    type NbhId,
    type DredChannelMessage,
} from "../types/ChannelSubscriptions.js";
import { devMessage, type DredError, type DredEvent } from "../types/DredEvents.js";
import { nanoid } from "../util/nanoid.js";

const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

/**
 * @public
 */
export type DredMessageListener = (dcm: FullDredMessage) => void;

/**
 * @public
 */
export type SubscriberMap = {
    [k: ChanId]: DredMessageListener;
};

// export type DredChannelMessage = {
//     channel: ChanId,
//     // event: DredMessage,
// }

export type FullDredMessage = ConnectionEvent & DredChannelMessage & DredMessage & {
    encryptedMsg?: string;
};

/**
 * @public
 */
export type DredMessage = {
    type: string;
    msg: string;
    "content-type"?: string;
    ocid?: string;
    // [key: string]: string | undefined,
};

/**
 * @public
 */
export type EncryptedDredMessage = DredMessage & {
    msg: "encrypted";
    encryptedMsg: string;
};

/**
 * @public
 */
export type ClientState = DredEvent & {
    nbh: NbhId;
    channels: ChanId[];
    status: string;
};

/**
 * @public
 */
export type eventHasChannels = DredEvent & {
    nbh: NbhId;
    channels: ChanId[];
};

/**
 * @public
 */
export type eventChannelInfo = DredEvent & {
    nbh: NbhId;
    channel: ChanId;
};

/**
 * Type for event-emitter, with args-types for the listener on each event-name.
 * 
 * The args types are a tuple type, typically indicating a single arg for the event.
 * @public
 */

export interface ClientEvents {
    needsNeighborhood: [DredEvent & { nbhs: NbhId[] }];
    hasChannels: [eventHasChannels];
    needsAuth: [DredEvent & { tbd: any }];
    "channel:created": [eventChannelInfo];
    "channel:removed": [eventChannelInfo];
    "state:changed": [DredEvent & ClientState];
    "channel:message": [DredChannelMessage];
    error: [DredError];
}

/**
 * @public
 */
export interface DredClientArgs {
    waitFor: keyof ConnectionThresholds;
    neighborhood: NbhId;
    discovery?: Discovery;
    name?: string;
    connectionSettings?: Partial<connnectionSettings>;
}
type serverId = string;
// type connectionMap = Map<serverId, HostConnection>;
type subscriberMap = Map<string, Array<Subscriber>>;
const nbhChannelList = "_chans";
const nbhAuthInfo = "_auth";

const logging = parseInt(process.env.LOGGING || "");
type dred = DredClient;

//! it runs onEntry() and predicate() hooks always in context
//    of the machine's context-object, which is a DredClient.
const clientStates = {
    // logLevel: "warn",
    default: {
        //! it automatically advances to next states, when it can make progress
        async onEntry(this: dred) {
            if (this.args.neighborhood) return this.transition("nbhSelected");
            return this.transition("findNbhs");
        },
        findNbhs: "findingNbhs",
        nbhSelected: "discoveringHosts",
    },
    findingNbhs: {
        async onEntry(this: dred) {
            await this.getNeighborhoods();
            const next = await this.transition("needsNbhSelection");
            return;
        },
        needsNbhSelection: "selectingNbh",
    },
    selectingNbh: {
        async onEntry(this: dred) {
            this.events.emit("needsNeighborhood", {
                message: "select a neighborhood",
                [devMessage]:
                    "Developers: offer these nbhs to a user or pick one by policy.  Call client.setNeighborhood(nbhId) to proceed.",
                nbhs: this.availableNeighborhoods,
            });
        },
        nbhSelected: "discoveringHosts",
    },
    discoveringHosts: {
        async onEntry(this: dred) {
            //! it completes the transition WITHOUT waiting for host discovery,
            // ... and it will continue to channel-discovery later, once hosts are discovered.
            {
                this.discovery.getHostList().then(this.mkTransition("haveHostList"));
            }
            return;
        },
        haveHostList: "discoveringChannels",
    },
    discoveringChannels: {
        async onEntry(this: dred) {
            // this.subscribeToChannels({}); //!!! todo initialize with any pre-existing subs provided to client init

            const chans = await this.connManager.getChannelList();
            this.channels = chans;
            await this.transition("hasChannels");
            this.emitHasChannels()
        },
        hasChannels: "ready",
    },
    ready: {
        async onEntry(this: dred) {
            // this.
        },
    },
};

let instanceCount = 1;

/**
 * Creates a new client instance for interacting with a Dred neighborhood.
 * @remarks
 * the client can be initiated with a single message-handler,
 * which is called for all messages received from any channel.
 * set client.messageHandler = ... to use this approach.
 *
 * Alternatively, the client can provide per-channel message-handlers,
 * which are called for messages received from specific channels.
 * Use client.subscribeToChannels(\{[chanId]: handler\}) to set up per-channel handlers.
 * @public
 */
export class DredClient extends StateMachine.withDefinition(clientStates, "client") {
    args: DredClientArgs;
    events: EventEmitter<ClientEvents, any> = this.ensureEmitterExists();
    connManager: ConnectionManager;
    channels: ChanId[] = [];
    neighborhood: string // = "cardano-after-dark";
    availableNeighborhoods: string[] = [];
    // neighborhoodContractAddress = "9bef...";
    discovery: Discovery;
    identity?: nacl.SignKeyPair;
    signer?: StringNacl;
    pubKeyString?: string;
    logger: ReturnType<typeof zonedLogger>;
    insecure?: boolean;
    _subscriptions?: SubscriptionListenerMap;
    subscribers: subscriberMap = new Map();
    channelSub?: ChannelSubscriptionListener;
    authSub?: ChannelSubscriptionListener;
    messageHandler?: DredMessageListener;
    instanceNumber = instanceCount++
    clientid: string;
    constructor(args: DredClientArgs) {
        let { name: clientName, neighborhood } = args;
        const clientid = (clientName || `#${instanceCount}`)+`-${nanoid(5)}`;
        super({
            contextLabel: clientName || "dred-client",
            currentState: "default",
            logFacility: `dred-client:state`,
            contextObject: null,
            logProperties: {
                loggerId: clientid,
            },
        });
        if (!neighborhood) throw new Error("neighborhood is required");
        this.neighborhood = neighborhood 
        this.args = {...args};
        this.events = this.ensureEmitterExists();
        this.clientid = clientid;
        this.logger = zonedLogger(`dred-client`, {
            color: magenta.start,
            loggerId: clientid,
            // levels: {
            //     // [clientName]: logging ? "info" : "warn",
            //     _message: `(env LOGGING=${logging})`,
            // },
        });

        //@ts-expect-error used before assignment (assigned by state-machine)
        this._status = this._status || "default";

        const discovery = (this.constructor as typeof DredClient).resolveDiscovery(args);
        this.discovery = discovery;
        this.connManager = this.mkConnectionManager();
        this.transition("default");
        //!!! make this test-only
        // this.insecure = insecure;
    }

    mkConnectionManager() {
        return new ConnectionManager({
            discovery: this.discovery,
            waitFor: this.args.waitFor,
            connectionSettings: this.args.connectionSettings || {},
            clientid: this.clientid,
        });
    }
    
    private ensureEmitterExists() {
        return (this.events = this.events || new EventEmitter<ClientEvents>());
    }

    
    info(a1: string, ...args: any[]) {
        this.logger.info(a1, ...args);
    }
    warn(a1: string, ...args: any[]) {
        this.logger.warn(a1, ...args);
    }

    logInfo(): string {
        const neighborhood = this.neighborhood;
        const availableNeighborhoods = this.availableNeighborhoods.join(", ") || "none";
        const channels = this.channels.join(", ") || "none";
        const status = this._status || "unknown";

        // Get connected hosts information
        let hostInfo = "unknown";
        if (this.discovery && this.discovery.hosts) {
            const hosts = this.discovery.hosts.map((h) => `${h.address}:${h.port} (${h.serverId})`);
            hostInfo = hosts.join(", ");
        }

        const logMessage = [
            `DredClient ${this.clientid}: ${status}`,
            `  - Current Neighborhood    : ${neighborhood}`,
            `  - Available Neighborhoods : [${availableNeighborhoods}]`,
            `  - Connected Channels      : [${channels}]`,
            `  - Connected Hosts         : ${hostInfo}`,
            `  - Subscriptions Count     : ${Object.keys(this.subscriptions).length}`,
            ``,
        ].join("\n");

        return logMessage;
    }

    setNeighborhood(n: NbhId) {
        this.neighborhood = n;
        asyncDelay(1).then(this.mkTransition("nbhSelected"));
    }

    /**
     * modifies the client's list of channel subscriptions
     * @remarks
     * For a client using a single message-handler, call this method with a single channel-id
     * or a list of channel-ids to subscribe to messages from specific channels.  Throws
     * a runtime error if there is no message-handler set.
     *
     * To use per-channel message-handlers, call this method with a map of channel-ids to
     * listener functions.  In this case, any assigned messageHandler is not used.
     */
    async subscribeToChannels(channels: ChanId[]): Promise<void>;
    async subscribeToChannels(channel: ChanId): Promise<void>;
    async subscribeToChannels(smap: SubscriberMap): Promise<void>;
    async subscribeToChannels(arg: SubscriberMap | ChanId[] | ChanId): Promise<void> {
        let smap: SubscriberMap;
        if (Array.isArray(arg)) {
            if (!this.messageHandler) {
                throw new Error(
                    `to use subscribeToChannels with an implicit subscriber, set client's messageHandler first`,
                );
            }
            smap = {};
            for (const channel of arg as ChanId[]) {
                smap[channel] = this.messageHandler;
            }
        } else if ("string" === typeof arg) {
            if (!this.messageHandler) {
                throw new Error(
                    `to use subscribeToChannels with an implicit subscriber, set client's messageHandler first`,
                );
            }
            smap = { [arg]: this.messageHandler };
        } else {
            smap = arg;
        }
        this.subscriptions = await this.connManager.setSubscriptions(this.mkChannelSubs(smap));
    }

    onTransition() {
        //! tbd if we need to use this hook, perhaps for persisting the bookmark state of channels
        // debugger
    }

    emitHasChannels() {
        this.events.emit("hasChannels", {
            nbh: this.neighborhood,
            message: "found channel list",
            channels: this.channels,
            [devMessage]: [
                `The list of channels is ready to present to users, or has been refreshed.`,
                `You should reconcile any application-side list of subscribed channels`,
            ],
        });
    }
    
    static resolveDiscovery({
        neighborhood,
        discovery,
    }: Pick<DredClientArgs, "neighborhood" | "discovery">): Discovery {
        if (discovery) return discovery;
        if (neighborhood) discovery = new NeighborhoodDiscovery({ neighborhood });
        if (!discovery) throw new Error(`required: 'discovery' object or 'neighborhood' name`);

        return discovery;
    }

    private _status: keyof typeof clientStates;
    //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
    set currentState(v: keyof typeof clientStates) {
        this._status = v;
        this.emitState();
    }
    //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
    get currentState() {
        return this._status;
    }

    @autobind
    emitState() {
        this.ensureEmitterExists();
        this.events.emit("state:changed", {
            message: "client state updated",
            [devMessage]:
                "no need to show this message onscreen; just update channel-list or status as needed",
            nbh: this.neighborhood,
            status: this._status,
            channels: this.channels,
        });
    }

    //! it creates a new subscriptions object
    //! it recycles existing subscriptions
    mkChannelSubs(smap: SubscriberMap): SubscriptionListenerMap {
        const subs: SubscriptionListenerMap = {};
        subs[nbhChannelList] = this.channelSub = this.getChannelSub(
            nbhChannelList,
            this.processChannelsMsg, //! it watches for events relating to channel lifecycle
        );
        subs[nbhAuthInfo] = this.authSub = this.getChannelSub(
            nbhAuthInfo,
            this.processAuthMsg, //! it watches for events relating to authentication lifecycle
        );
        for (const [chan, listener] of Object.entries(smap)) {
            subs[chan] = this.getChannelSub(chan, listener);
        }
        return subs;
    }

    @autobind
    processChannelsMsg(m: DredChannelMessage) {
        //!!! todo: it notifies client listeners about created or removed channels
        //!!! todo: it emits the generic state-updated event with updated channel list
    }

    @autobind
    processAuthMsg(m: DredChannelMessage) {
        //!!! todo: ??? it notifies listeners when authentication is required by one or more neighborhood hosts
        //     more use-case analysis needed for this.
        //!!! todo: it notifies listeners when a requested channel requires authentication not yet established
        //     (possibly this would be a responsibility served in a way more aligned with individual channels instead)
        //!!! todo: notifies listening application of new identities joining the neighborhood {type: "newId", pubKey, handle, certificates}
        //!!! todo: notifies listening application of any certifications added by an identity's owner or neighborhood trustees
        //!!! todo: notifies listening application of any key revocations or decertifications from owner or trustees
    }

    //! it unlistens from subscriptions no longer being used
    set subscriptions(replacement: SubscriptionListenerMap) {
        for (const [chan, sub] of Object.entries(this._subscriptions || {})) {
            //!!! todo: match subscription filter settings
            //XXXX if (! replacement.has(chan)) sub.events.removeAllListeners();
        }
        this._subscriptions = replacement;
    }

    // TODO: replace this with a direct `subscriptions` property
    get subscriptions() {
        if (!this._subscriptions) return {}; // it creates an empty subscriptions object if not already set
        return this._subscriptions;
    }

    private getChannelSub(
        channel: string,
        listener: DredMessageListener,
    ): ChannelSubscriptionListener {
        const found = this.subscriptions[channel];
        if (found) return found;
        return this.mkChannelSub(channel, listener);
    }

    //! it creates new subscriptions and wires them up for notification to client application
    //! it doesn't require client applications to guard for memory / event-listener leakage
    mkChannelSub(channel: string, listener: DredMessageListener): ChannelSubscriptionListener {
        const sub = new ChannelSubscriptionListener({
            neighborhood: this.neighborhood,
            channel,
            listener,
        });
        return sub;
    }

    //!!! todo: extract fetch as a library function so any client and/or connectionManager
    //      can avoiding reliance on any specific host from the neighborhood.
    //     ... starts at least two requests from discovered servers; if a confirmation is not received
    //     ... from neighborhood hosts within a short delay (~200ms),
    //     ... it issues the same req to additional servers,
    //     ... to get a decentralized confirmation of important functionalities
    //    (see also todo zw3w737)

    async fetch(path: string, { parse = true, debug = false, ...options }) {
        //!! todo: it logs the pending request to an observable queue of
        //    requests and keeps it updated with progress.
        //!! todo: it exposes the progress info in a way that is easily consumed
        //    by a React component.

        if (path[0] !== "/") path = `/${path}`;

        let host = (await this.discovery.getHostList())[0];
        const proto = host.insecure ? "http" : "https";
        const shortServer = `${host.address}:${host.port}`;
        const url = `${proto}://${shortServer}${path}`;
        // console.warn(`+fetch`, options.method, shortServer, path)

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
        if (result.ok) {
            if (!parse) return result;

            return result.json();
        }
        const err = await result
            .json()
            .catch(() => new Error(`${result.status} ${result.statusText} for ${path}`));
        //!!! if one of the requests fails, it notifies the PeerConnectionManager
        //     of the problem server

        const { error, message, reason, recommendation, "?developer?": devMsg } = err;
        const m = message || error;
        this.events.emit("error", {
            reason: reason || err,
            message: `host said: ${m}`,
            recommendation: recommendation || "try again or choose a different channel",
            [devMessage]:
                devMsg || "Developers should check whether the request is properly formed",
        });
        throw new Error(error || message || reason);
    }

    /**
     * Promise-based wrapper for waiting for an event to occur
     * @remarks
     * The promise resolves with the event arguments.
     */
    async once<E extends string & keyof ClientEvents>(
        eventName: E,
    ): Promise<
    ClientEvents[E] extends [infer O1, ...infer more]
    ? ClientEvents[E] extends [infer SINGLE]
        ? SINGLE
        : ClientEvents[E]
    : void
    > {
        return new Promise<any>((resolve) => {
            this.events.once(eventName, (...args) => {
                resolve(args);
            });
        });
    }

    async getNeighborhoods() {
        const n = await this.discovery.getNeighborhoods();
        return n;
    }

    async generateKey() {
        if (this.identity) {
            console.warn(`generateKey() already called; no-op duplicate call`);
            return;
        }
        const key = (this.identity = await StringNacl.newKeyPair());
        this.pubKeyString = encodeBase64(key.publicKey);
        this.signer = new StringNacl(this.identity, this);
    }

    async signString(s: string): Promise<string> {
        if (!this.identity || !this.signer)
            throw new Error(`DredClient: can't sign() without a prior call to generateKey()`);

        return this.signer.sign(s);
    }

    async verifySig(s: string, sigBase64: string, keyBase64: string): Promise<boolean> {
        if (!this.signer) {
            throw new Error(`DredClient: no signer; use generateKey() first`);
        }

        return this.signer.verifySig(s, sigBase64, keyBase64);
    }

    async createChannel(
        channelName: string,
        options: Partial<Omit<ChannelOptions, "channelId">> = {
            encrypted: false,
        },
    ) {
        //!!! todo: it delegates channel-creation to connection manager (see also todo zw3w737)

        // this.log({ fetching: true, url });
        const {
            encrypted,
            members = [],
            allowJoining,
            memberLimit,
            expiresAt,
            messageLifetime,
        } = options || {};
        if (encrypted) {
            if (!this.identity || !this.signer) {
                throw new Error(
                    `createChannel: encrypted channel requires a prior call to generateKey()`,
                );
            }
            if (!allowJoining && !members.length) {
                throw new Error(
                    `createChannel (encrypted: true): must specify member list and/or allowJoining: true`,
                );
            }
            const signature = await this.signString(channelName);
            options.owner = this.pubKeyString;
            options.signature = signature;
        }
        const { ...otherBodyAttrs } = options;
        const body = JSON.stringify(otherBodyAttrs);
        try {
            return this.fetch(`/channel/${channelName}`, {
                method: "POST",
                body,
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                    clientid: this.clientid,
                },
            }).then((r) => {
                const { id, status } = r;
                if (status === "created") {
                    if (id !== channelName) {
                        throw new Error(`requested channel ${channelName} but got id ${id}`);
                    }
                    this.logger.info(`created channel ${channelName}`, r);
                    this.channels.push(channelName);
                    this.logger.warn(
                        "todo: consider waiting for a second confirmation of channel creation, if appropriate, from a second server (only if there are multiple servers and active channel subscriptions)",
                    );
                } else {
                    throw new Error(`expected status "created". Response: `, r);
                }
                return r;
            });
        } catch (err: any) {
            let e: Error;
            if (err instanceof Error) {
                e = err;
            } else {
                console.warn(err.stack || err.message || JSON.stringify(err, null, 2));
                e = new Error(err.error || err.message || err);
            }
            this.logger.error("createChannel at server failed:", e.stack);
            throw e;
        }
    }

    async joinChannel(channelName: string) {
        if (!this.pubKeyString) {
            throw new Error(`joinChannel: requires a prior call to generateKey()`);
        }
        return this.addMemberToChannel(channelName, this.pubKeyString);
    }

    async addMemberToChannel(channelName: string, memberKeyBase64: string) {
        if (!this.pubKeyString) {
            throw new Error(`joinChannel: requires a prior call to generateKey()`);
        }
        try {
            //!!! todo: it delegates member-adds to connection manager (see todo zw3w737)
            return await this.fetch(`/channel/${channelName}/join`, {
                method: "POST",
                // debug: true,
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                    clientid: this.clientid,
                },
                body: JSON.stringify({
                    myId: this.pubKeyString,
                    member: memberKeyBase64,
                    signature: await this.signString(memberKeyBase64),
                }),
            });
        } catch (err: any) {
            this.logger.error("join-channel at server failed:", err.message || err);
            throw new Error(err.error || err);
        }
    }

    //!!! todo: it uses the key-agreement protocol to encrypt channel messages
    postEncrypted(channelName: string, plainMessage: EncryptedDredMessage, msgAttributes: Object) {}

    //!!! todo: it delegates message-posting to connection manager.
    //     see also todo zw3w737

    //!!! todo zfnsmq8: it refuses to post plain-text messages into encrypted channels
    //     see also todo y0w9cvr

    async postMessage(channelName: string, oMsg: DredMessage) {
        const sub = this.subscriptions[channelName];

        const message = { ...oMsg };
        this.logger.info("posting message ", message);
        let { type, ocid, msg } = message;

        if ("string" !== typeof msg) {
            throw new Error(`message 'msg' attr must be a string, not a JSON object`);
        }
        if (!message.ocid) {
            const _ocid = nanoid();
            // console.log("(generated ocid)");
            ocid = message.ocid = _ocid;
        }
        // console.log({ ocid });
        if (sub) {
            sub.recentMsgs.add(ocid!);
        }

        //! it guards usage for non-typescript users
        if (!(type && msg)) {
            debugger;
            throw new Error(`missing required 'type' and/or 'message'`);
        }

        const result = await this.fetch(`/channel/${channelName}/message`, {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
                clientid: this.clientid,
            },
        });
        if (sub) {
            sub.recentMsgs.delete(ocid!);
            sub.recentMsgs.add(result.id);
        }

        result.ocid = ocid;
        return result;
    }

    //! disconnects from neighborhood
    disconnect() {
        this.connManager.disconnect();
    }
}
