import fetch from "cross-fetch";
import { customAlphabet } from 'nanoid'
import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
import type { Response } from "cross-fetch";

const nanoid = customAlphabet('0123456789abcdefghjkmnpqrstvwxyz', 7);

import EventEmitter from "eventemitter3";
import { asyncDelay, autobind, StateMachine } from "@poshplum/utils";

import { ConnectionManager } from "./ConnectionManager";

import { ChannelOptions } from "../types/ChannelOptions";
import { Subscriber } from "../Subscriber";
import { StringNacl } from "../util/StringNacl";
import { connnectionSettings, DredHostDetails } from "../types/DredHosts";
import { ConnectionThresholds, Discovery } from "../types/Discovery";
import { NeighborhoodDiscovery } from "../peers/NeighborhoodDiscovery";
import { HostConnection } from "./HostConnection";
import { ChanId, SubscriptionListenerMap, ChannelSubscriptionListener, NbhId, DredChannelMessage } from "../types/ChannelSubscriptions";
import { devMessage, DredError, DredEvent } from "../types/DredEvents";

const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

export type DredMessageListener = (dcm: DredChannelMessage & DredMessage) => void;

export type SubscriberMap = {
    [k: ChanId]: DredMessageListener;
};

// export type DredChannelMessage = {
//     channel: ChanId,
//     // event: DredMessage,
// }

export type DredMessage = {
    type: string,
    msg: any,
    "content-type"?: string,
    ocid?: string,
    // [key: string]: string | undefined,
}

export type ClientState = DredEvent & {
    nbh: NbhId;
    channels: ChanId[];
    status: string;
};


interface ClientEvents {
    needsNeighborhood: [
        DredEvent & {
            nbhs: NbhId[];
        }
    ];
    hasChannels: [
        DredEvent & {
            nbh: NbhId;
            channels: ChanId[];
        }
    ];
    needsAuth: [
        DredEvent & {
            tbd: any;
        }
    ];
    "channel:created": [
        DredEvent & {
            nbh: NbhId;
            channel: ChanId;
        }
    ];
    "state:changed": [DredEvent & ClientState];
    "channel:message": [DredChannelMessage],
    error: [DredError];
}

export interface DredClientArgs {
    neighborhood?: NbhId;
    discovery?: Discovery;
    waitFor: keyof ConnectionThresholds;
    name?: string;
    connectionSettings?: Partial<connnectionSettings>;
}
type serverId = string;
type connectionMap = Map<serverId, HostConnection>;
type subscriberMap = Map<string, Array<Subscriber>>;
const nbhChannelList = "_chans";
const nbhAuthInfo = "_auth";

const logging = parseInt(process.env.LOGGING || "");
type dred = DredClient;

//! it runs onEntry() and predicate() hooks always in context
//    of the machine's context-object, which is a DredClient.
const clientStates = {
    // logLevel: "info",
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
                [devMessage]: "Developers: offer these nbhs to a user or pick one by policy",
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
            this.events.emit("hasChannels", {
                nbh: this.neighborhoodId,
                message: "found channel list",
                channels: chans,
                [devMessage]: [
                    `The list of channels is ready to present to users, or has been refreshed.`,
                    `You should reconcile any application-side list of subscribed channels`,
                ],
            });
        },
        hasChannels: "ready",
    },
    ready: {
        async onEntry(this: dred) {
            // this.
        },
    },
};

export class DredClient extends StateMachine.withDefinition(clientStates, "client") {
    args: DredClientArgs;
    events: EventEmitter<ClientEvents> = this.ensureEmitterExists();
    connManager: ConnectionManager;
    channels: ChanId[] = [];
    _log: undefined | Function;
    _warn: undefined | Function;
    neighborhoodId: string = "cardano-after-dark";
    availableNeighborhoods: string[] = [];
    // neighborhoodContractAddress = "9bef...";
    discovery: Discovery;
    identity?: nacl.SignKeyPair;
    signer?: StringNacl;
    pubKeyString?: string;
    insecure?: boolean;
    connections: connectionMap = new Map(); //!!!!! obsolete
    _subscriptions?: SubscriptionListenerMap;
    subscribers: subscriberMap = new Map();
    channelSub?: ChannelSubscriptionListener;
    authSub?: ChannelSubscriptionListener;

    setNeighborhood(n: NbhId) {
        this.neighborhoodId = n;
        asyncDelay(1).then(this.mkTransition("nbhSelected"));
    }

    messageHandler? : DredMessageListener;

    async subscribeToChannels(channels: ChanId[]) : Promise<void>;
    async subscribeToChannels(channel: ChanId) : Promise<void>;
    async subscribeToChannels(smap: SubscriberMap) : Promise<void>;
    async subscribeToChannels(arg: SubscriberMap | ChanId[] | ChanId ) : Promise<void> {
        let smap : SubscriberMap
        if (Array.isArray(arg)) {
            if (!this.messageHandler) {
                throw new Error(`to use subscribeToChannels with an implicit subscriber, set client's messageHandler first`);
            }
            smap = {};
            for (const channel of arg as ChanId[]) {
                smap[channel] = this.messageHandler;
            }
        } else if ("string" === typeof arg) {
            if (!this.messageHandler) {
                throw new Error(`to use subscribeToChannels with an implicit subscriber, set client's messageHandler first`);
            }
            smap = {[arg] : this.messageHandler}
        } else {
            smap = arg;
        }
        this.subscriptions = await this.connManager.setSubscriptions(this.mkChannelSubs(smap));
    }

    onTransition() {
        //! tbd if we need to use this hook, perhaps for persisting the bookmark state of channels
        // debugger
    }

    static resolveDiscovery({ neighborhood, discovery }: DredClientArgs): Discovery {
        if (neighborhood) discovery = new NeighborhoodDiscovery({ neighborhood });
        if (!discovery) throw new Error(`required: 'discovery' object or 'neighborhood' name`);

        return discovery;
    }

    private _status: string;
    //@ts-expect-error -  base class has void as return type.  fix when state machine gets typescript love.
    set currentState(v: string) {
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
            nbh: this.neighborhoodId,
            status: this._status,
            channels: this.channels,
        });
    }

    //! it creates a new subscriptions object
    //! it recycles existing subscriptions 
    mkChannelSubs(
        smap: SubscriberMap
    ) : SubscriptionListenerMap {
        const subs : SubscriptionListenerMap = {}
        subs[nbhChannelList] = this.channelSub = this.getChannelSub(nbhChannelList, this.processChannelsMsg);
        subs[nbhAuthInfo] = this.authSub = this.getChannelSub(nbhAuthInfo, this.processAuthMsg);
        for (const [chan, listener] of Object.entries(smap)) {
            subs[chan] = this.getChannelSub(chan, listener)
        }
        return subs;
    }

    @autobind 
    processChannelsMsg(m : DredChannelMessage) {
        //!!!! TODO
    }

    @autobind
    processAuthMsg(m : DredChannelMessage) {
        //!!!! TODO
    }
    
    //! it unlistens from subscriptions no longer being used
    set subscriptions(replacement : SubscriptionListenerMap) {
        for (const [chan, sub] of Object.entries(this._subscriptions ||{}) )  {
            //!!! todo: match subscription filter settings

            //XXXX if (! replacement.has(chan)) sub.events.removeAllListeners();
        }
        this._subscriptions = replacement;
    }
    get subscriptions() {
        if (!this._subscriptions) return {}; // it creates an empty subscriptions object if not already set
        return this._subscriptions
    }
    private getChannelSub(channel: string, listener: DredMessageListener): ChannelSubscriptionListener {
        const found = this.subscriptions[channel];
        if (found) return found;
        return this.mkChannelSub(channel, listener);
    }
    
    //! it creates new subscriptions and wires them up for notification to client application
    //! it doesn't require client applications to guard for memory / event-listener leakage
    mkChannelSub(channel: string, listener: DredMessageListener ): ChannelSubscriptionListener {
        const sub = new ChannelSubscriptionListener({
            neighborhood: this.neighborhoodId,
            channel,
            listener,
        });
        return sub
    }

    constructor(args: DredClientArgs) {
        super({
            contextLabel: args.name || "dred-client",
            currentState: "default",
            logFacility: "dred-client:state",
            contextObject: null,
        });
        this.events = this.ensureEmitterExists();

        //@ts-expect-error used before assignment (assigned by state-machine)
        this._status = this._status || "";

        this.args = args;
        const discovery = (this.constructor as typeof DredClient).resolveDiscovery(args);
        this.discovery = discovery;
        this.connManager = new ConnectionManager({
            discovery,
            waitFor: this.args.waitFor,
            connectionSettings: this.args.connectionSettings || {},
        });
        this.transition("default");
        //!!! make this test-only
        // this.insecure = insecure;
    }
    private ensureEmitterExists() {
        return (this.events = this.events || new EventEmitter<ClientEvents>());
    }

    get log() {
        return this._log || (this._log = logging ? console.log.bind(console) : () => {});
    }

    get warn() {
        return this._warn || (this._warn = logging ? console.warn.bind(console) : () => {});
    }

    //!!! ??? extract fetch as a library function so any of client, connectionManager
    //      and/or hostConnection can use it

    async fetch(path: string, { parse = true, debug = false, ...options }) {
        //!!!! todo: starts up to two requests from discovered servers
        //!!!! if one of them does not respond within 100ms, it issues
        //   the same req to additional servers

        //!!!! it logs the pending request to an observable queue of
        //    requests and keeps it updated with progress.
        //!!!! it exposes the progress info in a way that is easily consumed
        //    by a React component.

        if (path[0] !== "/") path = `/${path}`;

        let host = (await this.discovery.getHostList())[0];
        const proto = host.insecure ? "http" : "https";
        const shortServer = `${host.address}:${host.port}`;
        const url = `${proto}://${shortServer}${path}`;
        // console.warn(`+fetch`, options.method, shortServer, path)

        const result = await fetch(url, options);
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

        return Promise.reject(err);
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
        options: ChannelOptions = {
            channelId: channelName,
            encrypted: false,
        }
    ) {
        //!!!! it delegates channel-creation to connection manager

        // this.log({ fetching: true, url });
        const {
            encrypted,
            members = [],
            allowJoining,
            memberLimit,
            expiresAt,
            messageLifetime,
        } = options;
        if (encrypted) {
            if (!this.identity || !this.signer) {
                throw new Error(
                    `createChannel: encrypted channel requires a prior call to generateKey()`
                );
            }
            if (!allowJoining && !members.length) {
                throw new Error(
                    `createChannel (encrypted: true): must specify member list and/or allowJoining: true`
                );
            }
            const signature = await this.signString(channelName);
            options.owner = this.pubKeyString;
            options.signature = signature;
        }
        const body = JSON.stringify(options);
        try {
            return await this.fetch(`/channel/${channelName}`, {
                method: "POST",
                body,
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
            });
        } catch (err: any) {
            let e: Error;
            if (err instanceof Error) {
                e = err;
            } else {
                console.warn(err.stack || err.message || JSON.stringify(err, null, 2));
                e = new Error(err.error || err.message || err);
            }
            this.log("createChannel at server failed:", e.stack);
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
            //!!!! it delegates member-adds to connection manager
            return await this.fetch(`/channel/${channelName}/join`, {
                method: "POST",
                // debug: true,
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify({
                    myId: this.pubKeyString,
                    member: memberKeyBase64,
                    signature: await this.signString(memberKeyBase64),
                }),
            });
        } catch (err: any) {
            this.log("join-channel at server failed:", err.message || err);
            throw new Error(err.error || err);
        }
    }

    postEncrypted(channelName: string, plainMessage: DredMessage, msgAttributes: Object) {}

    //!!!! it delegates message-creation to connection manager
    //!!!! it has a way of posting the same unique message to multiple servers and for that message to converge across them all.
    async postMessage(channelName: string, message: DredMessage) {
        const sub = this.subscriptions[channelName];

        this.log("posting message ", message);
        let {type, ocid, msg} = message;
        
        if (!message.ocid) {
            const _ocid = nanoid();
            console.log("(generated ocid)");
            ocid = message.ocid = _ocid;
        }
        console.log({ocid});
        sub.recentMsgs.add(ocid!);


        //! it guards usage for non-typescript users
        if (!(type && msg)) throw new Error(`missing required 'type' and/or 'message'`)

        const result = await this.fetch(`/channel/${channelName}/message`, {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        });
        sub.recentMsgs.delete(ocid!);
        sub.recentMsgs.add(result.id)

        result.ocid = ocid;
        return result
    }

    //! disconnects from neighborhood
    disconnect() {
        this.connManager.disconnect();
    }
}
