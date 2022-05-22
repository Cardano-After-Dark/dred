import fetch from "cross-fetch";
import { ndjsonStream } from "./betterJsonStream";

interface AddrDetails {
    address: any;
    family: any;
    port: any;
    insecure?: boolean;
}
export class DredClient {
    serverAddress: any;
    serverPort: any;
    addrFamily: any;
    insecure?: boolean;
    constructor({ address, family, port, insecure = false }: AddrDetails) {
        this.serverAddress = address;
        this.serverPort = port;
        this.addrFamily = family;

        //!!! make this test-only
        this.insecure = insecure;
    }

    async fetch(path, options) {
        const proto = this.insecure ? "http" : "https";
        let addr = this.serverAddress;
        if (addr == "::") addr = "localhost";

        if (path[0] !== "/") path = `/${path}`;

        const url = `${proto}://${addr}:${this.serverPort}${path}`;
        const result = await fetch(url, options);
        if (result.ok) return result.json();
        const bad = await result
            .json()
            .catch(() => new Error(`${result.status} ${result.statusText}`));
        return Promise.reject(bad);
    }

    async createChannel(channelName: string) {
        // console.log({ fetching: true, url });
        try {
            return await this.fetch(`/channel/${channelName}`, {
                method: "POST",
                headers: { accept: "application/json" },
            });
        } catch (err) {
            console.log("um", err.message || err);
            throw new Error(err.error || err);
        }
    }
}
