import { makeSource } from '@helios-lang/compiler-utils';

const ProtocolSettingsData_hl = makeSource(
  "module ProtocolSettingsData\n// import {FPSettings} from FundedPurposeSettings\n\n\nimport {\n    TODO,\n    REQT,\n    bREQT\n} from StellarHeliosHelpers\n\nimport {NodeOperatorSettings} from NodeOperatorSettings\nimport {NeighborhoodSettings} from NeighborhoodSettings\n/* Add imports for other modules here */\n\nstruct ProtocolSettings {\n    id: ByteArray \"@id\"\n    type: String \"tpe\" // \"settings\"\n\n    nodeOpSettings: NodeOperatorSettings \"nOp\"\n    nbhSettings: NeighborhoodSettings \"nbh\"\n\n    /* Add other settings here */\n    // from Stellar Tokenomics Engine\n    // fundedPurposeSettings: FPSettings \"fPurp\"\n\n    func validate(self) -> Bool { \n        REQT(\"protocol settings: must validate nodeOpSettings and nbhSettings\");\n\n        self.nodeOpSettings.validate() &&\n        self.nbhSettings.validate()\n    }\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/settings/ProtocolSettingsData.hl", // source filename
    moduleName:  "ProtocolSettingsData",
});

export { ProtocolSettingsData_hl as P };
//# sourceMappingURL=ProtocolSettingsData.mjs.map
