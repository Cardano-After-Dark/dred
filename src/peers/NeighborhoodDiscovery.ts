import { NbhId } from "../types/ChannelSubscriptions.js";
import { ConnectionThresholds, Discovery, findingDredHosts, GenericDiscoveryOptions, promisedConnectionThresholds } from "../types/Discovery.js";

export class NeighborhoodDiscovery extends Discovery {
    neighborhood?: NbhId;
    static forNeighborhood(n: string) {
        return new this({neighborhood: n});
    }
    constructor(options: GenericDiscoveryOptions) {
        const {neighborhood} = options;
        super(options);
        if (neighborhood) this.neighborhood = neighborhood;
    }
    async getNeighborhoods() {
        return ["cardano-after-dark"]; //!!! todo: use discovery service to find registered neighborhoods
    }
    async getHostList(): findingDredHosts {
        console.warn(`Discovery in neighborhood has no impl yet.  Try DevEnvLocalDiscovery for now`);
        return [];
    }

    async getConnectionThresholds() : promisedConnectionThresholds {
        //!!! todo: revisit this, perhaps with neighborhood-specific preferences found in discovery,
        //   or by punting to the application.
    
        return this.clientRedundancyThresholds();
    }
    async serverRedundancyThresholds() : promisedConnectionThresholds {
        if (!this.hosts) { throw new Error(`no this.hosts`) }

        const count = this.hosts.length;
        if (count > 7) {
            return {
                minimal:1+Math.floor(count/2), 
                healthy: Math.ceil(count * 2 / 3)
            }
        }
        if (count > 2) {
            // 3  => need 2, want 3;
            // 4,5  => need 3, want 4;
            // 6, 7 => need  4, want 5;
            const minimal = 1 + Math.floor(count / 2);
            return {
                minimal, 
                healthy: minimal+1
            }
        }
        if (count > 1) {
            return {minimal:1, healthy: 2}
        }
        return {minimal: 1, healthy: 1}
    }
    async clientRedundancyThresholds() : promisedConnectionThresholds{
        //! it provides some reasonable defaults for getting "enough" connectivity
        //  for clients.  
    
        if (!this.hosts) { throw new Error(`no this.hosts`) }

        const count = this.hosts.length;
        if (count > 7) {
            return {
                minimal:3, 
                healthy:4,
            }
        }
        if (count > 3) {
            return {
                minimal: 2,
                healthy: 3
            }
        }
        if (count > 1) {
            return {minimal:1, healthy: 2}
        }
        return {minimal: 1, healthy: 1}
    }

}
