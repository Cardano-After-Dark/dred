import { makeSource } from '@helios-lang/compiler-utils';

const NodeOperatorSettings_hl = makeSource(
  "module NodeOperatorSettings\n\nimport {\n    TODO,\n    REQT,\n    bREQT\n} from StellarHeliosHelpers\n\nstruct NodeOperatorSettings {\n    expectedHeartbeatInterval: Duration \"ndHbi\"\n    requiredNodeUptime: Int \"ndUpt\" // percentage\n\n    minNodeRegistrationFee: Int \"minFee\"\n    minNodeOperatorStake: Value \"minStk\"\n\n    func validate(self) -> Bool {\n        REQT(\"nodeOpSettings: must validate\");\n        bREQT(\"reg fee must be positive\") &&\n        (self.minNodeRegistrationFee > 0).trace(\"reg fee ok? \") &&\n        bREQT(\"minStake must be positive\") &&\n        (self.minNodeOperatorStake.get_lovelace() > 0).trace(\"minStake ok? \")\n    }\n}\n\nstruct AbstractSettingsForNodeOperator {\n    nodeOpSettings: NodeOperatorSettings \"nOp\"\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/nodeRegistry/NodeOperatorSettings.hl", // source filename
    moduleName:  "NodeOperatorSettings",
});

export { NodeOperatorSettings_hl as N };
//# sourceMappingURL=NodeOperatorSettings.mjs.map
