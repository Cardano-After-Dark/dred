import { DredHostDetails } from "../types/DredHostDetails";
import { Discovery } from "../types/Discovery";

const localNbh = "localhost-nbh";
export class DevEnvLocalDiscovery extends Discovery {
    // hosts: DredHostDetails[];
    async getNeighborhoods() {
        return [ localNbh ];
    }
    setupDefaultHosts() {
        return this.reset([{
            serverId: "singleton",
            address: "localhost",
            port: 3029,
            insecure: true,
        }]);
    }
    constructor(nbh?: string) {
        if (nbh) throw new Error(`DevEnvLocalDiscovery always uses `+localNbh)
        super(localNbh);
        return this.setupDefaultHosts();
    }
    toJSON() {
        return { localDevHosts: this.hosts };
    }
    async getHostList() {
        if (!this.hosts) throw new Error(`call setupDefaultHosts()`)
        return this.hosts;
    }
}
