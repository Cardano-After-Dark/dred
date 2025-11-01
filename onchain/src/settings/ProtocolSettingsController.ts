import {
    DelegatedDataBundle,
    DelegatedDataContract,
    hasReqts,
    // use this if you need an off-chain class and not just well-typed data
    // WrappedDgDataContract,
} from "@donecollectively/stellar-contracts";

import type {
    ErgoProtocolSettings,
    minimalProtocolSettings,
    ProtocolSettings,
    ProtocolSettingsLike,
} from "./ProtocolSettings.typeInfo.js";

import ProtocolSettingsDataBridge from "./ProtocolSettings.bridge.js";
import { makeByteArrayData, makeMapData } from "@helios-lang/uplc";
import { encodeUtf8 } from "@helios-lang/codec-utils";
import { DredCapo } from "../DredCapo.js";
import { makeValue } from "@helios-lang/ledger";

/**
 * @public
 */
export class ProtocolSettingsController extends DelegatedDataContract<
    ProtocolSettings,
    ProtocolSettingsLike
> {
    dataBridgeClass = ProtocolSettingsDataBridge;
    async scriptBundleClass() : Promise<typeof DelegatedDataBundle> {
        const module = await import("./ProtocolSettings.hlb.js")
        return module.default
    }
    
    get capo() : DredCapo {
        return super.capo as unknown as DredCapo;
    }

    get delegateName() {
        return "protocolSettings";
    }

    get idPrefix() {
        return "set" as const;
    }

    get recordTypeName() {
        return "settings";
    }

    requirements() {
        return hasReqts({});
    }

    /**
     * creates settings data with minting-policy hashes prepared for each membership tier
     */
    async initialSettingsData(): Promise<minimalProtocolSettings> {
        const settings = this.exampleData();
        
        return settings;
    }

    exampleData(): minimalProtocolSettings {
        const settings: minimalProtocolSettings = {
            nodeOpSettings: {
                V1: {
                    expectedHeartbeatInterval: 7 * 24 * 60 * 60 * 1000,
                    minNodeOperatorStake: makeValue(this.ADA(200n)),
                    minNodeRegistrationFee: makeValue(this.ADA(50n)),
                    requiredNodeUptime: 0.95,
                    minValidations: 1,
                }
            },
            nbhSettings: {
                V1: {
                    minNbhStake: makeValue(this.ADA(5_000n)),
                    minRegistrationFee: makeValue(this.ADA(4_000n))
                }
            },
            /* Add other settings here */
        };
        return settings;
    }

    // sample of making a wrapped-data class when using a WrappedDgDataContract:
    // mkDataWrapper(data: ErgoProtocolSettings) {
    //     return new OffchainSettingsClass(data, this, this.capo as any);
    // }
}
