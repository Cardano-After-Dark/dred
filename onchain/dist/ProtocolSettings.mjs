import { makeSource } from '@helios-lang/compiler-utils';

const ProtocolSettings_hl = makeSource(
  "module ProtocolSettings\n// import {FPSettings} from FundedPurposeSettings\n\n//sample\nimport {NodeOperatorSettings} from NodeOperatorSettings\nimport {NeighborhoodSettings} from NeighborhoodSettings\n/* Add imports for other modules here */\n\nstruct ProtocolSettings {\n    id: ByteArray \"@id\"\n    type: String \"tpe\" // \"set\"\n\n    nodeOpSettings: NodeOperatorSettings \"nOp\"\n    nbhSettings: NeighborhoodSettings \"nbh\"\n    /* Add other settings here */\n    // from Stellar Tokenomics Engine\n    // fundedPurposeSettings: FPSettings \"fPurp\"\n\n    func validate(self) -> Bool { \n        self.nodeOpSettings.validate() &&\n        self.nbhSettings.validate()\n    }\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/settings/ProtocolSettings.hl", // source filename
    moduleName:  "ProtocolSettings",
});

export { ProtocolSettings_hl as P };
//# sourceMappingURL=ProtocolSettings.mjs.map
