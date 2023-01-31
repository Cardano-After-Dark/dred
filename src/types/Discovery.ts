import { DredHostDetails as DredHostDetails } from "./DredHostDetails";

export interface discovery {
    getHostList(): Promise<DredHostDetails[]>;
}

export type findingDredHosts = Promise<DredHostDetails[]>;

export abstract class Discovery implements discovery {
    abstract getHostList() : findingDredHosts;

    async myServerInfo(serverId: string): Promise<DredHostDetails | undefined> {
        const hosts = await this.getHostList();
        return hosts.find(x => serverId == x.serverId);
    }
}

