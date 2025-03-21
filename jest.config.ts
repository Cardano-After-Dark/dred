/** xxx @xxxtype { import('@types/jest').Config.InitialOptions } */
/** @type { import('@jest/types').Config.InitialOptions } */

/** xxx @xxxtype {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from "@jest/types";
// import { Config } from "jest";

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest/presets/js-with-ts-esm",
    restoreMocks: true,
    testEnvironment: "node",
    transform: {
        "^.+\\.(t|j)sx?$": ["@swc/jest", {
            "sourceMaps": true,
            "jsc": {
                "parser": {
                    "syntax": "typescript",
                    "decorators": true,
                    "dynamicImport": true
                },
                "transform": {
                    "legacyDecorator": true,
                    "decoratorMetadata": true
                },
                "target": "es2022"
            },
            "module": {
                "type": "es6"
            }
        }]
    },
    modulePathIgnorePatterns: ["<rootDir>/src/redis/streams/"],
    moduleNameMapper: {
        "^@platform/(.*)": "<rootDir>/platform/server/$1",
        "#crypto": "<rootDir>/node_modules/watsign/src/crypto.node.js",
        "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testTimeout: 10000,
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transformIgnorePatterns: [
        "/node_modules/(?!react-is|pretty-format).+\\.js$"
    ],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    }
};
export default config;
