import { makeSource } from '@helios-lang/compiler-utils';

const NodeOperatorSettings_hl = makeSource(
  "module NodeOperatorSettings\n\nimport {\n    TODO,\n    REQT,\n    bREQT\n} from StellarHeliosHelpers\n\nstruct NodeOperatorSettingsV1 {\n    expectedHeartbeatInterval: Duration \"ndHbi\"\n    requiredNodeUptime: Real \"ndUpt\" // percentage\n    minValidations: Int \"minVals\"\n\n    minNodeRegistrationFee: Value \"minFee\"\n    minNodeOperatorStake: Value \"minStk\"\n\n    func validate(self) -> Bool {\n        REQT(\"nodeOpSettings: must validate\");\n        bREQT(\"reg fee must be positive\") &&\n        (self.minNodeRegistrationFee.get_lovelace() > 0).trace(\"reg fee ok? \") &&\n        bREQT(\"minStake must be positive\") &&\n        (self.minNodeOperatorStake.get_lovelace() > 0).trace(\"minStake ok? \")\n    }\n}\n\nenum NodeOperatorSettings {\n    V1 { s: NodeOperatorSettingsV1 }\n    // V2 { s: NodeOperatorSettingsV2 }\n\n    func validate(self) -> Bool {\n        self.switch {\n            V1{s} => s.validate()\n            // V2{s} => s.validate(),\n\n            // non-exhaustion is an error; don't use a default case.\n            // _ => error(\"invalid node operator settings\")\n        }\n    }\n}\n\n\nstruct AbstractSettingsForNodeOperator {\n    nodeOpSettings: NodeOperatorSettings \"nOp\"\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/nodeRegistry/NodeOperatorSettings.hl", // source filename
    moduleName:  "NodeOperatorSettings",
});

export { NodeOperatorSettings_hl as N };
//# sourceMappingURL=NodeOperatorSettings.mjs.map
