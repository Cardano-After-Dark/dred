import { Discovery, findingDredHosts } from "../types/Discovery";


export class NeighborhoodDiscovery extends Discovery {
    neighborhood: string;
    static forNeighborhood(n: string) {
        return new this(n);
    }
    async getNeighborhoods() {
        return ["cardano-after-dark"]; //!!! todo: use discovery service to find registered neighborhoods
    }
    constructor(s: string) {
        super();
        this.neighborhood = s;
    }
    async getHostList(): findingDredHosts {
        console.warn(`Discovery in neighborhood has no impl yet.  Try DevEnvLocalDiscovery for now`);
        return [];
    }
}
