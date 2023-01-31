import fetch from "cross-fetch";
import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
import type { Response } from "cross-fetch";
import type { ReadableStreamDefaultReadResult } from "node:stream/web";

import { ChannelOptions } from "../types/ChannelOptions";
import { fromPlatformFetchBody } from "../../platform/server/ReadableStream";
import { Subscriber } from "../Subscriber";
import { ndjsonStream } from "./betterJsonStream";
import { StringNacl } from "../util/StringNacl";
import { DredHostDetails } from "../types/DredHostDetails";
import { Discovery } from "../types/Discovery";
import { NeighborhoodDiscovery } from "../peers/NeighborhoodDiscovery";

const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

interface AddrDetails {
    address: any;
    family: any;
    port: any;
    insecure?: boolean;
}

const logging = parseInt(process.env.LOGGING || "");
export class DredClient {
    _log: undefined | Function;
    _warn: undefined | Function;
    // serviceDiscovery: string;
    neighborhoodId: string = "cardano-after-dark";
    neighborhoodContractAddress = "9bef...";
    // neighborhoodServers: Array<{
    //     serverAddress: any;
    //     serverPort: any;
    //     addrFamily: any;
    // }>;
    serverAddress: string;
    serverPort: number;
    addrFamily: string;
    identity?: nacl.SignKeyPair;
    signer?: StringNacl;
    pubKeyString?: string;
    insecure?: boolean;
    subscriptions: Map<string, Array<Subscriber>>;
    constructor({ address, family, port, insecure = false }: AddrDetails) {
        this.log("+client", {
            options: { insecure },
        });
        this.serverAddress = address;
        this.serverPort = port;
        this.addrFamily = family;
        this.subscriptions = new Map();
        //!!! make this test-only
        this.insecure = insecure;
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
        const proto = this.insecure ? "http" : "https";
        let addr = this.serverAddress;
        if (addr == "::") addr = "localhost";

        if (path[0] !== "/") path = `/${path}`;

        const url = `${proto}://${addr}:${this.serverPort}${path}`;
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
        return Promise.reject(bad);
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
            this.log("createChannel at server failed:", err.message || err);
            throw new Error(err.error || err);
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
        let event : undefined | ReadableStreamDefaultReadResult<{value: string, done: boolean}>,
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
