/** @type { import('@jest/types').Config.InitialOptions } */
/** xxx @xxxtype {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest/presets/js-with-ts-esm",
    restoreMocks: true,
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
    },
    modulePathIgnorePatterns: ["<rootDir>/src/redis/streams/"],
    moduleNameMapper: {
        "^@platform/(.*)": "<rootDir>/platform/server/$1",
        "^src/(.*)": "<rootDir>/src/$1",
        "#crypto": "<rootDir>/node_modules/watsign/src/crypto.node.js",
    },
};
export default config;
