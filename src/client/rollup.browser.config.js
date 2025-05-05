import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
// import typescript from "rollup-plugin-ts";
import externals from "rollup-plugin-node-externals";

// used for finding modules to bundle, using Node's resolution algo
import resolve from "@rollup/plugin-node-resolve";
import { twoModulesOut } from "../../rollup.lib.js";
import alias from "@rollup/plugin-alias";

import packageJson from "./package.json" assert { type: 'json' };
const name = packageJson.main.replace(/\.js$/, "");

const browserBundledModules = [
    // "@platform/fetch.ts",
    "@platform/ReadableStream",
    "tweetnacl",
    "tweetnacl-util",
    "watsign",
];

const forcedBrowserExternals = [];

//! see rollup.browser.config.js for the browser build
const browserBundle = (config) => ({
    input: "./index.ts",
    ...config,
    external: (id) => {
        if (browserBundledModules.includes(id)) return false;
        if (forcedBrowserExternals.includes(id)) return true;
        // console.warn("---ext detect ---", id)

        return !/^[./]/.test(id);
    },
});

export default [
    browserBundle({
        plugins: [
            externals(),
            resolve({
                browser: true,
                extensions: [".mjs", ".js", ".json", ".ts"],
            }),
            alias({
                entries: [
                    { find: '@platform/ReadableStream', replacement: '../../platform/browser/ReadableStream.ts' },
                ],
            }),
            // for rollup-plugin-ts
            // typescript({
            //     transpiler: {
            //         typescriptSyntax: "typescript",
            //         // otherSyntax: "swc",
            //     },
            //     tsconfig: "./tsconfig.browser.json",
            // }),
            esbuild({
                // All options are optional
                // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
                // exclude: /node_modules/, // default
                sourceMap: true, // default
                minify: process.env.NODE_ENV === "production",
                supported: {
                    "async-await": false,
                        },        
                target: "es2016", // default, or 'es20XX', 'esnext'
                // jsx: 'transform', // default, or 'preserve'
                // jsxFactory: 'React.createElement',
                // jsxFragment: 'React.Fragment',
                // Like @rollup/plugin-replace
                define: {
                    __VERSION__: JSON.stringify(packageJson.version),
                },
                tsconfig: "tsconfig.browser.json", // default
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
        ...twoModulesOut(`${name}`),
    }),

    browserBundle({
        plugins: [
            dts({
                tsconfig: "tsconfig.browser.json",
            }),
        ],
        output: {
            file: `${name}.d.ts`,
            format: "es",
        },
    }),
];
