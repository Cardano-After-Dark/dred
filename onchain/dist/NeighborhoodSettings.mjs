import { makeSource } from '@helios-lang/compiler-utils';

const NeighborhoodSettings_hl = makeSource(
  "module NeighborhoodSettings\n\nimport {\n    TODO,\n    REQT,\n    bREQT\n} from StellarHeliosHelpers\n\n\nstruct NeighborhoodSettings {\n    minRegistrationFee: Int \"minRegFee\"\n    minNbhStake: Value \"minStk\"\n\n    func validate(self) -> Bool {\n        REQT(\"nbhSettings: must validate\");\n        bREQT(\"reg fee must be positive\") &&\n        (self.minRegistrationFee > 0).trace(\"reg fee ok? \") &&\n        bREQT(\"minStake must be > 50 ADA, is \"+ self.minNbhStake.get_lovelace().show()) &&\n        (self.minNbhStake.get_lovelace() > 50_000_000).trace(\"minStake ok? \")\n    }\n}\n\nstruct AbstractSettingsForNeighborhood {\n    NeighborhoodSettings: NeighborhoodSettings \"nbhd\"\n}\n", {
    project: "stellar-tokenomics",
    purpose: "module",
    name:  "src/DredNeighborhood/NeighborhoodSettings.hl", // source filename
    moduleName:  "NeighborhoodSettings",
});

export { NeighborhoodSettings_hl as N };
//# sourceMappingURL=NeighborhoodSettings.mjs.map
