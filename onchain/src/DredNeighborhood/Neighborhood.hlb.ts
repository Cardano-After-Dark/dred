// This is a template file - EJS syntax is used
import { CapoDelegateBundle, DelegatedDataBundle } from "@donecollectively/stellar-contracts"
import NeighborhoodPolicy from "./NeighborhoodPolicy.hl"
import ProtocolSettings from "../settings/ProtocolSettings.hl"
import NeighborhoodSettings from "./NeighborhoodSettings.hl"

import DredCapo from "../DredCapo.hlb.js";
import NeighborhoodData from "./NeighborhoodData.hl";
import type { Source } from "@helios-lang/compiler-utils";

export default class NeighborhoodBundle 
extends DelegatedDataBundle.usingCapoBundleClass(DredCapo) {
    specializedDelegateModule = NeighborhoodPolicy;
    requiresGovAuthority = false;

    // includeFromCapoModules(): string[] {
    //     return [ 
    //         "TieredScale",
    //         "SampleOtherModule"
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
            NeighborhoodData,
            NeighborhoodSettings

            // xxx Don't include ProtocolSettings here.  Instead, use any abstract settings
            // definition instead.
            // ProtocolSettings
        ];
    }
}

