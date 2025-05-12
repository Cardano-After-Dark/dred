import { makeSource } from '@helios-lang/compiler-utils';

const NodeOperatorSettings_hl = makeSource(
  "module NodeOperatorSettings\n\nstruct NodeOperatorSettings {\n    expectedHeartbeatInterval: Duration \"ndHbi\"\n    requiredNodeUptime: Int \"ndUpt\" // percentage\n\n    minNodeRegistrationFee: Int \"minFee\"\n    minNodeOperatorStake: Value \"minStk\"\n}\n\nstruct AbstractSettingsForNodeOperator {\n    nodeOpSettings: NodeOperatorSettings \"nOp\"\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/nodeRegistry/NodeOperatorSettings.hl", // source filename
    moduleName:  "NodeOperatorSettings",
});

export { NodeOperatorSettings_hl as N };
//# sourceMappingURL=NodeOperatorSettings.mjs.map
