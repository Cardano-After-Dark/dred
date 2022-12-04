import fetch from "cross-fetch";
import { ChannelOptions } from "src/types/ChannelOptions";
import { fromPlatformFetchBody } from "../../platform/server/ReadableStream";
import { Subscriber } from "../Subscriber";
import { ndjsonStream } from "./betterJsonStream";

import nacl from "tweetnacl";
const { sign } = nacl;
import util from "tweetnacl-util";
import { StringNacl } from "src/util/StringNacl";
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
    serverAddress: any;
    serverPort: any;
    addrFamily: any;
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
    generateKey() {
        const key = (this.identity = sign.keyPair());
        this.pubKeyString = encodeBase64(key.publicKey);
        this.signer = new StringNacl(this.identity);
    }

    signString(s: string): string {
        if (!this.identity || !this.signer)
            throw new Error(
                `DredClient: can't sign() without a prior call to generateKey()`
            );

        return this.signer.sign(s);
    }

    verifySig(s: string, sigBase64: string, keyBase64: string): boolean {
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
            const signature = this.signer.sign(channelName);
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

    async addMemberToChannel(channelName, memberKeyBase64: string) {
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
                    signature: this.signString(memberKeyBase64),
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

    subscribeChannel(chan, notify): Subscriber {
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

        let aborted;
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

    async monitorSubscription(chan, callback, response) {
        if (!response.ok) throw new Error(`failure in subscribe...`);

        const compatResponse = fromPlatformFetchBody(response.body);
        const reader = ndjsonStream(compatResponse).getReader();
        let e,
            connected = true;

        const detectReadError = (e: Error) => {
            if (this.isAbortError(e)) {
                // this.log("abort detected while reading responses");
                connected = false;
            } else {
                this.log(`fetch error during read; see debugger - `, e);
                debugger;
            }
            return false;
        };

        while (connected && (e = await reader.read().catch(detectReadError))) {
            const { value, done } = e;
            this.log(`client: ${chan} <- event: `, value);
            callback(value);
        }
    }
    isAbortError(e: any) {
        return "AbortError" === e.name;
    }
}
