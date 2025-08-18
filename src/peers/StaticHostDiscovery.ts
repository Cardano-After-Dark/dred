// import { readFileSync } from "fs";
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

import type { DredHostDetails } from "../types/DredHosts.js";
import {
    Discovery,
    type GenericDiscoveryOptions,
    type promisedConnectionThresholds,
} from "../types/Discovery.js";
import { StringNacl } from "../util/StringNacl.js";
import type { NbhId } from "../types/ChannelSubscriptions.js";
import { asyncDelay } from "@poshplum/utils";

const localNbh = "localhost-nbh";
interface DevDiscoveryOptions extends GenericDiscoveryOptions {
    hosts?: DredHostDetails[];
}

/**
 * @public
 */
export class StaticHostDiscovery extends Discovery {
    hosts: DredHostDetails[];
    async getNeighborhoods() {
        await asyncDelay(1);
        return [localNbh, this.nbh].filter(Boolean);
    }

    /**
     * overrides the base class to prevent triggering unneeded re-discovery of static hosts
     */
    setNeighborhood(nbh: NbhId) {
        this.nbh = nbh;
        return this;
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
        // Read host and port from environment variables for production deployment
        const host = process.env.DRED_HOST || "127.0.0.1";
        const port = parseInt(process.env.DRED_PORT || "3029");
        
        return [{
            serverId: "singleton",
            address: host,
            port: port,
            insecure: true,            
            // publicKey: this.getPubKeyFromFs(3029),
        }]
    }
    setupDefaultHosts() {
        return this.reset((this.constructor as typeof StaticHostDiscovery).defaultHosts());
    }
    constructor(options: DevDiscoveryOptions) {
        const { neighborhood, hosts } = options;
        super({ neighborhood: localNbh });
        this.hosts = hosts || StaticHostDiscovery.defaultHosts();
    }
    async initHostDiscovery() {
        // Only setup default hosts if no custom hosts were provided
        if (!this.hosts || this.hosts.length === 0) {
            this.setupDefaultHosts();
        }
        // Custom hosts are already set in constructor
    }

    toJSON() {
        return { localDevHosts: this.hosts };
    }
    async getHostList() {
        if (!this.hosts)
            throw new Error(`call setupDefaultHosts() or provide hosts in constructor`);
        await asyncDelay(1);
        return this.hosts;
    }
    async getConnectionThresholds(): promisedConnectionThresholds {
        if (!this.hosts) {
            throw new Error(`no this.hosts`);
        }

        if (this.hosts.length > 2) {
            return { minimal: 2, healthy: 3 };
        }
        if (this.hosts.length > 1) {
            return { minimal: 1, healthy: 2 };
        }
        return { minimal: 1, healthy: 1 };
    }
}
