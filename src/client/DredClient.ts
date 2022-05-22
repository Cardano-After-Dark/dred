import fetch, { Headers } from "@platform/fetch";

interface AddrDetails {
    address: any;
    family: any;
    port: any;
    insecure? : boolean
}
export class DredClient {
    serverAddress: any;
    serverPort: any;
    addrFamily: any;
    insecure?: boolean;
    constructor({ address, family, port, insecure=false }: AddrDetails) {
        this.serverAddress = address;
        this.serverPort = port;
        this.addrFamily = family;

        //!!! make this test-only
        this.insecure = insecure;
    }

    async createChannel(channelName : string) {
        const proto = this.insecure ? "http" : "https";
        let addr = this.serverAddress;
        if (addr == "::") addr = "localhost";

        const url = `${proto}://${addr}:${this.serverPort}/channel/${channelName}`;
        // console.log({ fetching: true, url });
        return fetch(url, {
            method: "POST",
            headers: { accept: "application/json" },
        });
    }
}
