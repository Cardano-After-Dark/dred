import { CapoDelegateBundle, DelegatedDataBundle } from "@donecollectively/stellar-contracts";
import DredCapoBundle from "../DredCapo.hlb.js";
import ProtocolSettingsPolicy from "./ProtocolSettingsPolicy.hl";
import ProtocolSettingsData from "./ProtocolSettingsData.hl";
import NodeOperatorSettings from "../nodeRegistry/NodeOperatorSettings.hl";
import NeighborhoodSettings from "../DredNeighborhood/NeighborhoodSettings.hl";

// import FundedPurposeSettings from "./FundedPurposeSettings.hl";

export  class ProtocolSettingsBundle extends DelegatedDataBundle.usingCapoBundleClass(
    DredCapoBundle
) {
    specializedDelegateModule = ProtocolSettingsPolicy;
    requiresGovAuthority = true;
    
    get modules() {
        return [
            ProtocolSettingsData,
            NodeOperatorSettings,
            NeighborhoodSettings,
            /* Add other modules here */
            // FundedPurposeSettings
        ];
    }
}
export default ProtocolSettingsBundle