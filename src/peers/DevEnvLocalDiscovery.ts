// import { readFileSync } from "fs";
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

import { DredHostDetails } from "../types/DredHosts.js";
import { Discovery, GenericDiscoveryOptions, promisedConnectionThresholds } from "../types/Discovery.js";
import { StringNacl } from "../util/StringNacl.js";
import { NbhId } from "../types/ChannelSubscriptions.js";
import { asyncDelay } from "@poshplum/utils";


const localNbh = "localhost-nbh";
interface DevDiscoveryOptions extends GenericDiscoveryOptions {
    hosts?: DredHostDetails[], 
}

export class DevEnvLocalDiscovery extends Discovery {
    // hosts: DredHostDetails[];
    async getNeighborhoods() {
        await asyncDelay(1);
        return [ localNbh ];
    }

    // getPubKeyFromFs(port:number): string { //Uint8Array
    //     const pubKeyFile = `config/keys/server.port-${port}.pub`;
    //     const privateKeyFile = `config/keys/server.port-${port}.sec`;
    //     try {
    //         const pubKey = readFileSync(pubKeyFile);
    //         const key64 = pubKey.toString().trim();
    //         console.log(`server ${port} pubkey:`, key64);
    //         return key64;
    //         // return decodeBase64(key64)
    //     } catch (e) {
    //         console.error(`No pubkey found for server  in`, pubKeyFile);

    //         StringNacl.newKeyPair().then(key => {
    //             console.log("\nTo create a new key for this local dev server:\n",
    //                 `add '${encodeBase64(key.publicKey)}' to ${pubKeyFile}\n`,
    //                 `add '${encodeBase64(key.secretKey)}' to ${privateKeyFile}\n`,
    //             );
    //             throw new Error(`missing required local key configuration for local dev server`)
    //         })
    //         return "no pubkey"
    //     }
    // }
    static defaultHosts() : DredHostDetails[] {
        return [{
            serverId: "singleton",
            address: "127.0.0.1",
            // address: "50.25.233.241",
            port: 3029,
            insecure: true,            
            // publicKey: this.getPubKeyFromFs(3029),
        }]
    }
    setupDefaultHosts() {
        return this.reset((this.constructor as typeof DevEnvLocalDiscovery).defaultHosts());
    }
    constructor(options : DevDiscoveryOptions) {
    const {
        neighborhood, hosts
    } = options;
        if (neighborhood) throw new Error(`DevEnvLocalDiscovery always uses `+localNbh)        
        if (!hosts) hosts
        super({ neighborhood: localNbh });
    }
    async initHostDiscovery() {
        this.setupDefaultHosts();
    }

    toJSON() {
        return { localDevHosts: this.hosts };
    }
    async getHostList() {
        if (!this.hosts) throw new Error(`call setupDefaultHosts()`);
        await asyncDelay(1);
        return this.hosts;
    }
    async getConnectionThresholds() : promisedConnectionThresholds {
        if (!this.hosts) { throw new Error(`no this.hosts`) }

        if (this.hosts.length > 2) {
            return {minimal:2, healthy: 3}
        }
        if (this.hosts.length > 1) {
            return {minimal:1, healthy: 2}
        }
        return {minimal: 1, healthy: 1}
    }
}
