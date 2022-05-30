/** @type { import('@jest/types').Config.InitialOptions } */
/** xxx @xxxtype {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    restoreMocks: true,
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest"],
    },
    moduleNameMapper: {
        "@platform/(.*)": "<rootDir>/platform/server/$1",
    },
};
export default config;
