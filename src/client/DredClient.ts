import fetch from "cross-fetch";
import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
import type { Response } from "cross-fetch";

import { ChannelOptions } from "../types/ChannelOptions";
import { fromPlatformFetchBody } from "@platform/ReadableStream";
import { Subscriber } from "../Subscriber";
import { ndjsonStream } from "./betterJsonStream";
import { StringNacl } from "../util/StringNacl";
import { DredHostDetails } from "../types/DredHostDetails";
import { Discovery } from "../types/Discovery";
import { NeighborhoodDiscovery } from "../peers/NeighborhoodDiscovery";

const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

export interface DredClientArgs {
    neighborhood?: string;
    discovery?: Discovery
}

const logging = parseInt(process.env.LOGGING || "");

export class DredClient {
    _log: undefined | Function;
    _warn: undefined | Function;
    // serviceDiscovery: string;
    neighborhoodId: string = "cardano-after-dark";
    // neighborhoodContractAddress = "9bef...";
    discovery:  Discovery;
    identity?: nacl.SignKeyPair;
    signer?: StringNacl;
    pubKeyString?: string;
    insecure?: boolean;
    subscriptions: Map<string, Array<Subscriber>>;

    static resolveDiscovery({ neighborhood, discovery }: DredClientArgs) : Discovery {
        if (neighborhood) discovery = new NeighborhoodDiscovery(neighborhood);
        if (!discovery) throw new Error(`required: 'discovery' object or 'neighborhood' name`);

        return discovery
    }
    constructor(args: DredClientArgs ) {
        const discovery = (this.constructor as typeof DredClient).resolveDiscovery(args)

        this.discovery = discovery;
        // this.serverAddress = address;
        // this.serverPort = port;
        // this.addrFamily = family;
        this.subscriptions = new Map();
        //!!! make this test-only
        // this.insecure = insecure;
    }

    get log() {
        return (
            this._log ||
            (this._log = logging ? console.log.bind(console) : () => {})
        );
    }

    get warn() {
        return (
            this._warn ||
            (this._warn = logging ? console.warn.bind(console) : () => {})
        );
    }

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
        const bad = await result
            .json()
            .catch(
                () =>
                    new Error(
                        `${result.status} ${result.statusText} for ${path}`
                    )
            );
        //!!! if one of the requests fails, it notifies the PeerConnectionManager
        //     of the problem server
         return Promise.reject(bad);
    }

    async getNeighborhoods() {
        return this.discovery.getNeighborhoods()
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
            throw new Error(
                `DredClient: can't sign() without a prior call to generateKey()`
            );

        return this.signer.sign(s);
    }

    async verifySig(
        s: string,
        sigBase64: string,
        keyBase64: string
    ): Promise<boolean> {
        if (!this.signer) {
            throw new Error(`DredClient: no signer; use generateKey() first`);
        }

        return this.signer.verifySig(s, sigBase64, keyBase64);
    }

    async createChannel(
        channelName: string,
        options: ChannelOptions = {
            encrypted: false,
        }
    ) {
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
            let e : Error; if (err instanceof Error ) {
                e = err 
             } else {
                console.warn(err.stack || err.message || JSON.stringify(err, null, 2))
                e = new Error(err.error || err.message || err);
             }
            this.log("createChannel at server failed:", e.stack);
            throw e;
        }
    }

    async joinChannel(channelName: string) {
        if (!this.pubKeyString) {
            throw new Error(
                `joinChannel: requires a prior call to generateKey()`
            );
        }
        return this.addMemberToChannel(channelName, this.pubKeyString);
    }

    async addMemberToChannel(channelName: string, memberKeyBase64: string) {
        if (!this.pubKeyString) {
            throw new Error(
                `joinChannel: requires a prior call to generateKey()`
            );
        }
        try {
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

    
    async postMessage(channelName: string, message: Object) {
        this.log("posting message ", message);
        
        return await this.fetch(`/channel/${channelName}/message`, {
            method: "POST",
            body: JSON.stringify(message),
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
        });
    }

    //! disconnects subscriptions
    disconnect() {
        for (const [chan, subs] of this.subscriptions) {
            for (const sub of subs) {
                sub.cancel();
            }
        }
    }

    subscribeChannel(chan : string, notify: Function): Subscriber {
        let subs = this.subscriptions.get(chan);
        if (!subs) {
            subs = [];
            this.subscriptions.set(chan, subs);
        }
        const abort = new AbortController();
        const { signal: abortSignal } = abort;

        const cancel = () => {
            // connected = false;
            abort.abort();
        };

        const subscription: Subscriber = {
            cancel,
            notify,
        };
        subs.push(subscription);

        let aborted = false;
        this.fetch(`/channel/${chan}/subscribe`, {
            parse: false,
            signal: abortSignal,
            headers: { "content-type": "application/json" },
        })
            .catch((e) => {
                if (this.isAbortError(e)) {
                    // this.log("abort happened before fetch response headers");
                    aborted = true;
                } else {
                    this.log(`fetch error; see debugger - `, e);
                    debugger;
                }
            })
            .then((response) => {
                if (aborted) return false;
                if (!response) return false;

                this.monitorSubscription(chan, notify, response);
            });
        return subscription;
    }

    async monitorSubscription(chan : string, callback : Function, response : Response) {
        if (!response.ok) throw new Error(`failure in subscribe...`);

        const compatResponse = fromPlatformFetchBody(response.body);
        const reader = ndjsonStream(compatResponse).getReader();
        let event : undefined | {value?: string, done: boolean},
            connected = true;

        const detectReadError = (e: Error) => {
            if (this.isAbortError(e)) {
                // this.log("abort detected while reading responses");
                connected = false;
            } else {
                this.log(`fetch error during read; see debugger - `, e);
                debugger;
            }
            return undefined;
        };

        while (connected) {
            event  = await reader.read().catch(detectReadError);
            if (!event) break;
            if (!connected) break;
            
            const { value, done } = event;
            this.log(`client: ${chan} <- event: `, value);
            callback(value);
        }
    }
    isAbortError(e: any) {
        return "AbortError" === e.name;
    }
}
