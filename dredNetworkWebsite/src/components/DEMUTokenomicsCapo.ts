import { DredCapo } from '../../../onchain/src/DredCapo'

export class DEMUTokenomicsCapo extends DredCapo {
    autoSetup = true;

    scriptBundle() {
        return super.scriptBundle();
    }

    async mkInitialSettings() {
        return {
            nodeOpSettings: {
                minHeartbeatInterval: BigInt(72 * 60 * 60 * 1000), // 72 hours in milliseconds
            },
        };
    }
} 