import fetch from "cross-fetch";
import { fromPlatformFetchBody } from "../../platform/server/ReadableStream";
import { ndjsonStream } from "./betterJsonStream";

interface AddrDetails {
    address: any;
    family: any;
    port: any;
    insecure?: boolean;
}

const logging = parseInt(process.env.LOGGING);
export class DredClient {
    _log: undefined | Function;
    serverAddress: any;
    serverPort: any;
    addrFamily: any;
    insecure?: boolean;
    subscriptions: Map<
        string,
        Array<{
            callback: Function;
            cancel: Function;
        }>
    >;
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

    async fetch(path, { parse = true, ...options }) {
        const proto = this.insecure ? "http" : "https";
        let addr = this.serverAddress;
        if (addr == "::") addr = "localhost";

        if (path[0] !== "/") path = `/${path}`;

        const url = `${proto}://${addr}:${this.serverPort}${path}`;
        const result = await fetch(url, options);
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

    async createChannel(channelName: string) {
        // this.log({ fetching: true, url });
        try {
            return await this.fetch(`/channel/${channelName}`, {
                method: "POST",
                headers: { accept: "application/json" },
            });
        } catch (err) {
            this.log("createChannel at server failed:", err.message || err);
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

    subscribeChannel(chan, callback): void {
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

        subs.push({
            cancel,
            callback,
        });

        // everything
        let aborted;
        this.fetch(`/channel/${chan}/subscribe`, {
            parse: false,
            signal: abortSignal,
            headers: { "content-type": "application/json" },
        }).catch((e) => {
            if (this.isAbortError(e)) {
                // this.log("abort happened before fetch response headers");
                aborted = true;
            } else {
                this.log(`fetch error; see debugger - `, e);
                debugger;
            }
        }).then((response) => {
            if (aborted) return false;
            if (!response) return false;

            this.monitorSubscription(chan, callback, response);
        });
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
