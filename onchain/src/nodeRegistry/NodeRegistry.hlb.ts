
import { CapoDelegateBundle, DelegatedDataBundle } from "@donecollectively/stellar-contracts"
import NodeRegistryPolicy from "./NodeRegistryPolicy.hl"
import ProtocolSettings from "../settings/ProtocolSettings.hl"
import NodeOperatorSettings from "./NodeOperatorSettings.hl"

import DredCapoBundle from "../DredCapo.hlb.js";
import NodeRegistrationData from "./NodeRegistrationData.hl";
import type { Source } from "@helios-lang/compiler-utils";

export default class NodeRegistryBundle 
extends DelegatedDataBundle.usingCapoBundleClass(DredCapoBundle) {
    specializedDelegateModule = NodeRegistryPolicy;
    requiresGovAuthority = false;

    // includeFromCapoModules(): string[] {
    //     return [ 
    //         "TieredScale",
    //         "ArtistVaultData"
    //     ]
    // }

    // get Xparams() {
    //     return {
    //         rev: 1n,
    //         delegateName: "nodeOpRegistry",
    //         isMintDelegate: false,
    //         isSpendDelegate: false,
    //         isDgDataPolicy: true,
    //     }
    // }


    get modules(): Source[] {
        return [
            ...super.modules,
            NodeRegistrationData,
            NodeOperatorSettings,
            ProtocolSettings
        ];
    }
}

