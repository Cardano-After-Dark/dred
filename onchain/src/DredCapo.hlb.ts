import {
    mkCapoDeployment,
    mkDelegateDeployment,
    capoConfigurationDetails,
    type CapoDeployedDetails,
    CapoHeliosBundle,
} from "@donecollectively/stellar-contracts";
import NodeOperatorSettings from "./nodeRegistry/NodeOperatorSettings.hl";
import NeighborhoodSettings from "./DredNeighborhood/NeighborhoodSettings.hl";

// recommended NOT to do this, as it can cause unintended side effects (see more below)
// import ProtocolSettings from "./settings/ProtocolSettings.hl";

export default class DredCapoBundle extends CapoHeliosBundle {
    preConfigured = capoConfigurationDetails;

    get modules() {
        // optional
        return [
            ...super.modules,
            // NOTE: Recommended NOT to reference a global notion of record definition for 
            // protocol settings. Instead: make each other module define its own settings area
            // and its abstract "record with my own needed settings", without being subject 
            // to all changes that may arise over time in the concrete & aggregated ProtocolSettings.
            //
            // Any actual dependencies on different areas of protocol settings spanning different 
            // scripts in the contract can be explicitly imported using those abstract definitions, 
            // and then they'll be explicitly subject to compilation changes when the sub-parts
            // of settings definitions are changed.  Of course, the ProtocolSettingsController will
            // require updating when any sub-part of the settings is changed.
            // ProtocolSettings,

            // for features from stellar tokenomics engine;
            // FundedPurposeData,
            // MarketSaleData,
        ];
    }
}
