import { Discovery, findingDredHosts } from "../types/Discovery";


export class NeighborhoodDiscovery extends Discovery {
    neighborhood: string;
    static forNeighborhood(n: string) {
        return new this(n);
    }
    constructor(s: string) {
        super();
        this.neighborhood = s;
    }
    async getHostList(): findingDredHosts {
        console.warn(`Neighborhood discovery has no impl yet.  Try DevEnvLocalDiscovery for now`);
        return [];
    }
}
