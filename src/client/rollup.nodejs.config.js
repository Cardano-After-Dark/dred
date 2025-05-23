import { join } from "path";
import dts from "rollup-plugin-dts";
// import typescript from "rollup-plugin-ts";
import esbuild from 'rollup-plugin-esbuild';
import externals from "rollup-plugin-node-externals";
import resolve from "@rollup/plugin-node-resolve";
import { twoModulesOut } from "../../rollup.lib.js";

import packageJson from "./package.json" assert { type: 'json' };
const name = packageJson.main.replace(/\.js$/, "");
import alias from "@rollup/plugin-alias";

const serverBundledModules = [
    // "@platform/fetch.ts", 
    "@platform/ReadableStream"
];
const forcedServerExternals = [];

// console.warn({modulePaths})
const serverBundle = (config) => ({
    input: "./index.ts",
    ...config,
    external: (id) => {
        if (serverBundledModules.includes(id)) return false;
        if (forcedServerExternals.includes(id)) return true;
        // console.warn("---ext detect ---", id)

        return !/^[./]/.test(id);
    },
});

export default [
    serverBundle({
        plugins: [
            externals(),
            resolve({
                extensions: [".mjs", ".js", ".json", ".ts"],
            }),
            // for rollup-plugin-ts
            // typescript({
            //     transpiler: {
            //         typescriptSyntax: "typescript",
            //         otherSyntax: "swc",
            //         tsconfig: "tsconfig.nodejs.json",
            //     },
            // }),
            alias({
                entries: [
                    { find: '@platform/ReadableStream', replacement: '../../platform/server/ReadableStream.ts' },
                ],
            }),
            esbuild({
                // All options are optional
                // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
                // exclude: /node_modules/, // default
                sourceMap: true, // default
                minify: process.env.NODE_ENV === "production",
                target: "ES2016", // default, or 'es20XX', 'esnext'
                supported: {
                    "async-await": false,
                    "async-generator": false,
                },        
                // jsx: 'transform', // default, or 'preserve'
                // jsxFactory: 'React.createElement',
                // jsxFragment: 'React.Fragment',
                // Like @rollup/plugin-replace
                define: {
                    __VERSION__: JSON.stringify(packageJson.version),
                },
                tsconfig: "tsconfig.nodejs.json", 
                // Add extra loaders
                loaders: {
                    // Add .json files support
                    // require @rollup/plugin-commonjs
                    //   '.json': 'json',
                    // Enable JSX in .js files too
                    //   '.js': 'jsx',
                },
            }),
        ],
        ...twoModulesOut(`${name}-nodejs`),
    }),
    serverBundle({
        plugins: [
            dts({
                tsconfig: "tsconfig.nodejs.json",
            }),
        ],
        output: {
            file: `${name}-nodejs.d.ts`,
            format: "es",
        },
    }),
];
