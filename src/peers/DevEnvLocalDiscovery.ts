import { DredHostDetails } from "../types/DredHostDetails";
import { Discovery } from "../types/Discovery";

export class DevEnvLocalDiscovery extends Discovery {
    hosts: DredHostDetails[];
    constructor(hosts: DredHostDetails[] = []) {
        super();
        const h = [...hosts];
        if (!h.length) {
            h.push({
                serverId: "singleton",
                address: "localhost",
                port: 3029,
                insecure: true,
            });
        }
        this.hosts = h;
    }
    toJSON() {
        return { localDevHosts: this.hosts };
    }
    async getHostList() {
        return this.hosts;
    }
}
