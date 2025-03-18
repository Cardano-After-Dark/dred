import { EventEmitter } from "eventemitter3";
import { NbhId } from "./ChannelSubscriptions.js";
import { devMessage, DredEvent } from "./DredEvents.js";
import { DredHostDetails } from "./DredHosts.js";

export interface discovery {
    getHostList(): Promise<DredHostDetails[]>;
    getNeighborhoods(): Promise<string[]> | never ;
}

export type findingDredHosts = Promise<DredHostDetails[]>;
export interface DiscoveryEvents {
    "hosts:discovering": [DredEvent & {nbh: NbhId}]
    // this is for discovery complete
    "hosts:ready": [DredEvent & {nbh: NbhId, hosts: DredHostDetails[]}]
    "hosts:updated": [DredEvent & {nbh: NbhId, hosts: DredHostDetails[]}]
}
export interface GenericDiscoveryOptions {
    neighborhood?: NbhId
}
export abstract class Discovery implements discovery {
    nbh!: string; // neighborhood
    // check
    hosts?: DredHostDetails[];
    events = new EventEmitter<DiscoveryEvents>();
    //! finds a list of hosts that serve the given neighborhood.
    abstract getHostList() : findingDredHosts;

    //! finds available neighborhoods through its discovery mechanism, if any.  
    //    throws an error if it doesn't implement nbh discovery.
    async getNeighborhoods(): Promise<NbhId[] > | never {
        throw new Error(`this discovery protocol doesn't implement getNeighborhoods().  instantiate it with a predefined neighborhood name instead.`)
    };
    abstract getConnectionThresholds(): Promise<ConnectionThresholds>;

    constructor(options : GenericDiscoveryOptions) {
        const {neighborhood} = options
        if (neighborhood) this.setNeighborhood(neighborhood);

        //! it prevents subclasses from overriding restartHostDiscovery() logic; see initHostDiscovery() instead.
        if (this.restartHostDiscovery !== Discovery.prototype.restartHostDiscovery) {
            throw new Error(`restartHostDiscovery must not be overridden by Discovery subclass `+ this.constructor.name)
        }
    };

    hasNeighborhood() : boolean {
        return !!this.nbh;
    }

    //! it allows concrete subclasses to implement custom behavior during initHostDiscovery()
    async initHostDiscovery() {
        // empty in the base class
        // we can probably initialize discovery but not expect completion (as the ctor is sync)
    }

    protected async restartHostDiscovery() {
        if (!this.nbh) throw new Error(`can't start host discovery without nbh`);

        //!!! todo: it emits a host-discovery-timeout event if hosts can't be discovered promptly.

        await this.initHostDiscovery();
        this.events.emit("hosts:discovering", {
            message: "discovering neighborhood hosts...",
            nbh: this.nbh,
            [devMessage]: "suggested: update user with this status message"
        });
        const hosts = await this.getHostList();
        const e = {
            hosts,
            message: `found ${hosts.length} hosts serving neighborhood`,
            nbh: this.nbh,
            [devMessage]: "suggested: update user with this status message"
        }
        if (!this.hosts) {
            this.events.emit("hosts:ready", e)
        }
        this.hosts = hosts;
        this.events.emit("hosts:updated", e)
    }
    setNeighborhood(nbh : NbhId) {
        this.nbh = nbh;
        this.restartHostDiscovery();
        return this;
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



import { connnectionSettings } from "./DredHosts.js";

export type ConnectionManagerOptions = {
    discovery: Discovery;
    waitFor: ThresholdChoice,
    connectionSettings: connnectionSettings
};

export type ConnectionThresholds = {
    minimal: number;
    healthy: number;
};
export type ThresholdChoice = keyof ConnectionThresholds
export type promisedConnectionThresholds = Promise<ConnectionThresholds>;

export type ConnectionState =
    | "pending"
    | "discovering"
    | "connecting"
    | "disconnected"
    | "underconnected"
    | "minimally connected"
    | "connected"
    | "refreshing";
