import { makeSource } from '@helios-lang/compiler-utils';

const NeighborhoodSettings_hl = makeSource(
  "module NeighborhoodSettings\n\n\nstruct NeighborhoodSettings {\n    minRegistrationFee: Int \"minRegFee\"\n    minNbhStake: Value \"minStk\"\n}\n\nstruct AbstractSettingsForNeighborhood {\n    NeighborhoodSettings: NeighborhoodSettings \"nbhd\"\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/DredNeighborhood/NeighborhoodSettings.hl", // source filename
    moduleName:  "NeighborhoodSettings",
});

export { NeighborhoodSettings_hl as N };
//# sourceMappingURL=NeighborhoodSettings.mjs.map
