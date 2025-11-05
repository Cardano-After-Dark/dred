import { CapoHeliosBundle } from '@donecollectively/stellar-contracts';
import { makeSource } from '@helios-lang/compiler-utils';

const NodeOperatorSettings_hl = makeSource(
  "module NodeOperatorSettings\n\nimport {\n    TODO,\n    REQT,\n    bREQT\n} from StellarHeliosHelpers\n\nstruct NodeOperatorSettingsV1 {\n    expectedHeartbeatInterval: Duration \"ndHbi\"\n    requiredNodeUptime: Real \"ndUpt\" // percentage\n    minValidations: Int \"minVals\"\n\n    minNodeRegistrationFee: Value \"minFee\"\n    minNodeOperatorStake: Value \"minStk\"\n\n    func validate(self) -> Bool {\n        REQT(\"nodeOpSettings: must validate\");\n        bREQT(\"reg fee must be positive\") &&\n        (self.minNodeRegistrationFee.get_lovelace() > 0).trace(\"reg fee ok? \") &&\n        bREQT(\"minStake must be positive\") &&\n        (self.minNodeOperatorStake.get_lovelace() > 0).trace(\"minStake ok? \")\n    }\n}\n\nenum NodeOperatorSettings {\n    V1 { s: NodeOperatorSettingsV1 }\n    // V2 { s: NodeOperatorSettingsV2 }\n\n    func validate(self) -> Bool {\n        self.switch {\n            V1{s} => s.validate()\n            // V2{s} => s.validate(),\n\n            // non-exhaustion is an error; don't use a default case.\n            // _ => error(\"invalid node operator settings\")\n        }\n    }\n}\n\n\nstruct AbstractSettingsForNodeOperator {\n    nodeOpSettings: NodeOperatorSettings \"nOp\"\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/nodeRegistry/NodeOperatorSettings.hl", // source filename
    moduleName:  "NodeOperatorSettings",
});

const NeighborhoodSettings_hl = makeSource(
  "module NeighborhoodSettings\n\nimport {\n    TODO,\n    REQT,\n    bREQT\n} from StellarHeliosHelpers\n\n\nstruct NeighborhoodSettingsV1 {\n    minRegistrationFee: Value \"minRegFee\"\n    minNbhStake: Value \"minStk\"\n\n    func validate(self) -> Bool {\n        REQT(\"nbhSettings: must validate\");\n        bREQT(\"reg fee must be positive\") &&\n        (self.minRegistrationFee.get_lovelace() > 10_000_000).trace(\"reg fee ok? \") &&\n        // bREQT(\"minStake must be > 50 ADA, is \"+ self.minNbhStake.get_lovelace().show()) &&\n        // (self.minNbhStake.get_lovelace() > 40_000_000).trace(\"minStake ok? \") &&\n        true\n    }\n}\n\nenum NeighborhoodSettings {\n    V1 { s: NeighborhoodSettingsV1 }\n    \n    func validate(self) -> Bool {\n        self.switch {\n            V1{s} => s.validate()\n        }\n    }\n}\n\nstruct AbstractSettingsForNeighborhood {\n    NeighborhoodSettings: NeighborhoodSettings \"nbhd\"\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/DredNeighborhood/NeighborhoodSettings.hl", // source filename
    moduleName:  "NeighborhoodSettings",
});

class DredCapoBundle extends CapoHeliosBundle {
  static currentRev = 1n;
  precompiledScriptDetails = this.constructor.precompiledScriptDetails;
  static precompiledScriptDetails = {
    capo: {
      scriptHash: "3719863a52e27b011fae5cfadb50dd421b1d6c790787c2e596caf35a",
      config: this.prototype.parseCapoJSONConfig({
        "mph": {
          "bytes": "3e31141d6b04e772dcb9a9ea7ec9d53e194f7bfcda670b696a57c06e"
        },
        "seedTxn": {
          "bytes": "c90ebc69b7d3c3ba0f748ba8f3b839e9ffc47cf141625f63255fe02ac3a475ea"
        },
        "seedIndex": "1",
        "rootCapoScriptHash": {
          "bytes": "3719863a52e27b011fae5cfadb50dd421b1d6c790787c2e596caf35a"
        }
      }),
      programName: "Capo"
    },
    minter: {
      scriptHash: "3e31141d6b04e772dcb9a9ea7ec9d53e194f7bfcda670b696a57c06e",
      config: this.prototype.parseCapoMinterJSONConfig({
        seedTxn: { "bytes": "c90ebc69b7d3c3ba0f748ba8f3b839e9ffc47cf141625f63255fe02ac3a475ea" },
        seedIndex: "1"
      }),
      programName: "CapoMinter"
    }
  };
  // static isPreconfigured = true;
  scriptParamsSource = "bundle";
  isConcrete = true;
  async loadPrecompiledVariant(variant) {
    if (variant !== "capo") throw new Error(`unknown capo variant: ${variant}`);
    const module = await import('dred-network-registry/contracts-preprod/DredCapo.compiled.hlb');
    return module.precompiled.capo;
  }
  async loadPrecompiledMinterScript() {
    const module = await import('dred-network-registry/contracts-preprod/DredCapo.compiled.hlb');
    return module.precompiled.minter;
  }
  get modules() {
    return [
      ...super.modules
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

export { DredCapoBundle as D, NodeOperatorSettings_hl as N, NeighborhoodSettings_hl as a };
//# sourceMappingURL=DredCapo.hlb.mjs.map
