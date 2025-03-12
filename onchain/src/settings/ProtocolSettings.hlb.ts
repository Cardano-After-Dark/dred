import { CapoDelegateBundle, DelegatedDataBundle } from "@donecollectively/stellar-contracts";
import DredCapoBundle from "../DredCapo.hlb.js";
import ProtocolSettingsPolicy from "./ProtocolSettingsPolicy.hl";
import ProtocolSettings from "./ProtocolSettings.hl";
import NodeOperatorSettings from "../nodeRegistry/NodeOperatorSettings.hl";
// import FundedPurposeSettings from "./FundedPurposeSettings.hl";

export default class ProtocolSettingsBundle extends DelegatedDataBundle.usingCapoBundleClass(
    DredCapoBundle
) {
    specializedDelegateModule = ProtocolSettingsPolicy;

    get modules() {
        return [
            ProtocolSettings,
            NodeOperatorSettings
            // FundedPurposeSettings
        ];
    }
}
