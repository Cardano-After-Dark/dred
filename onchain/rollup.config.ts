// seems to have a bug that deletes one of the pnpm modules :/
// import { apiExtractor } from "rollup-plugin-api-extractor";
import externals from "rollup-plugin-node-externals";

import esbuild from "rollup-plugin-esbuild";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import execute from "rollup-plugin-shell";
import { type Plugin } from "rollup";

// const packageJson = await import("./package.json", { assert: { type: "json" } });

import { createRequire } from "node:module";
const requireIt = createRequire(import.meta.url);
const packageJson = requireIt("./package.json");

import {
    heliosRollupLoader,
    heliosRollupBundler,
} from "@donecollectively/stellar-contracts/rollup-plugins";

const serverBundledModules: string[] = [
    // "@hyperionbt/helios"
];
const forcedServerExternals: string[] = [];

const notified = {};

type StellarBundlerConfig = {
    input: string | Record<string, string>;
    output: any[];
    prependPlugins?: Plugin[];
    plugins?: Plugin[];
    pluginsAfter?: Plugin[];
    browser?: boolean;
};

// import { join } from "path";
// import alias from "@rollup/plugin-alias";
// console.warn({modulePaths})
const codeBundle = ({
    browser = false,
    prependPlugins = [],
    plugins = [],
    pluginsAfter = [],
    ...config
}: StellarBundlerConfig) => {
    if (!config.input) throw new Error(`missing required entry module 'input'`);

    const target = browser ? "es2023" : "node20";

    const logLevel = process.env.ROLLUP_LOG || "warn";

    return {
        ...config,
        ...(process.env.DEBUG ? { logLevel: "debug" } : { logLevel: logLevel }),

        external: (id) => {
            if (serverBundledModules.includes(id)) {
                if (!notified[id]) {
                    console.warn("    --- bundling module:", id);
                    notified[id] = true;
                }
                return false;
            }
            if (forcedServerExternals.includes(id)) {
                console.warn("    --- dependency on external module:", id);
                return true;
            }

            return !/^[./]/.test(id);
        },
        plugins: [
            ...prependPlugins,
            // externals(),
            heliosRollupLoader({
                project: "stellar-tokenomics",
            }),
            heliosRollupBundler({
                compile: true,
                emitBundled: true,
            }),
            json(),
            resolve({
                // ...platformModulePaths("server"),
                exportConditions: ["dev", browser ? "browser" : null].filter(
                    (x) => !!x
                ) as string[],
                browser: !!browser,
                extensions: [".json", ".ts", ".js", ".tsx", ".jsx"],
            }),
            // sourcemaps(),
            ...plugins,
            esbuild({
                tsconfig: "./tsconfig.json",
                target: [target],
                supported: {
                    "import-assertions": false,
                },
                sourceMap: true,
            }),
            ...pluginsAfter,
            // XXX don't do this - the build script calls THIS rollup, not the other way round.
            // execute({
            //     sync: true,
            //     commands: [
            //         "./scripts/build"
            //     ]
            // }),
        ],
    };
};

export default [
    codeBundle({
        input: {
            index: "./src/index.ts",
        },
        output: [
            {
                entryFileNames: "[name].mjs",
                dir: `dist/`,
                sourcemap: true,
                chunkFileNames: "[name].mjs",
                format: "es",
            },
        ],

        pluginsAfter: [
            execute({
                sync: true,
                commands: [
                    "pnpm exec api-extractor run --local -c api-extractor.json",
                    "echo '   ✅ contract: .d.ts' ; echo ''  ",
                    "echo",
                    "echo -n 'build ready: ' ; date",
                ],
            }),
        ],
    }),
];
