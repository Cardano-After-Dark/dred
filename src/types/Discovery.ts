import { DredHostDetails as DredHostDetails } from "./DredHostDetails";

export interface discovery {
    getHostList(): Promise<DredHostDetails[]>;
    getNeighborhoods(): Promise<string[]>;
}

export type findingDredHosts = Promise<DredHostDetails[]>;

export abstract class Discovery implements discovery {
    nbh?: string; // neighborhood
    hosts?: DredHostDetails[];

    abstract getHostList() : findingDredHosts;
    abstract getNeighborhoods(): Promise<string[]>;
    
    constructor(inNbh? : string) {
        if (inNbh) this.setNeighborhood(inNbh);
    };

    setNeighborhood(n : string) {
        this.nbh = n;
        return this.reset()
    }
    reset(newHosts: DredHostDetails[]=[]) {
        this.hosts = newHosts;
        return this;
    }
    async myServerInfo(serverId: string): Promise<DredHostDetails | undefined> {
        const hosts = await this.getHostList();
        return hosts.find(x => serverId == x.serverId);
    }
}

