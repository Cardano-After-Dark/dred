import {
    DelegatedDataContract,
    hasReqts,
    // use this if you need an off-chain class and not just well-typed data
    // WrappedDgDataContract,
} from "@donecollectively/stellar-contracts";

import ProtocolSettingsBundle from "./ProtocolSettings.hlb.js";
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

export class ProtocolSettingsController extends DelegatedDataContract<
    ProtocolSettings,
    ProtocolSettingsLike
> {
    dataBridgeClass = ProtocolSettingsDataBridge;
    scriptBundle() {
        return ProtocolSettingsBundle.create();
    }
    
    get capo() : DredCapo {
        return super.capo as unknown as DredCapo;
    }

    get delegateName() {
        return "ProtocolSettings";
    }

    get idPrefix() {
        return "set";
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
                expectedHeartbeatInterval: 7 * 24 * 60 * 60 * 1000,
                minNodeOperatorStake: makeValue(20_000n),
                minNodeRegistrationFee: 2_000n,
                requiredNodeUptime: 90n,
            },            
            nbhSettings: {
                minNbhStake: makeValue(20_000n),
                minRegistrationFee: 4_000n               
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
