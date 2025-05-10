import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import externals from "rollup-plugin-node-externals";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import packageJson from "./package.json" assert { type: "json" };
const name = packageJson.main.replace(/\.js$/, "");

const serverBundledModules = [
    // "@platform/fetch.ts",
     "@platform/ReadableStream"
];
const forcedServerExternals = [];

// import { join } from "path";
// import alias from "@rollup/plugin-alias";
// console.warn({modulePaths})
const serverBundle = (config) => ({
    input: "src/server/index.ts",
    ...config,
    external: (id) => {
        if (serverBundledModules.includes(id)) return false;
        if (forcedServerExternals.includes(id)) return true;
        // console.warn("---ext detect ---", id)

        return !/^[./]/.test(id);
    },
});

const esbuildConfig = esbuild({
    // All options are optional
    // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
    // exclude: /node_modules/, // default
    sourceMap: true, // default
    minify: process.env.NODE_ENV === "production",
    target: "es2020", // default, or 'es20XX', 'esnext'
    // jsx: 'transform', // default, or 'preserve'
    // jsxFactory: 'React.createElement',
    // jsxFragment: 'React.Fragment',
    // Like @rollup/plugin-replace
    define: {
        __VERSION__: JSON.stringify(packageJson.version),
    },
    tsconfig: "tsconfig.json",
    // Add extra loaders
    loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        //   '.json': 'json',
        // Enable JSX in .js files too
        //   '.js': 'jsx',
    },
});

// console.log(JSON.stringify(browserRollupConfig, null, 2))
export default [
    serverBundle({
        input: "bin/dredServer",
        plugins: [
            externals(),
            resolve({
                extensions: [".mjs", ".js", ".json", ".ts"],
            }),
            alias({
                entries: [
                    { find: '@platform/ReadableStream', replacement: './platform/server/ReadableStream.ts' },
                ],
            }),
            esbuildConfig,
        ],
        output: [{ file: `dist/dredServer.mjs`, format: "es", sourcemap: true }],
    }),

    serverBundle({
        plugins: [
            externals(),
            resolve({
                extensions: [".mjs", ".js", ".json", ".ts"],
            }),
            alias({
                entries: [
                    { find: '@platform/ReadableStream', replacement: './platform/server/ReadableStream.ts' },
                ],
            }),
            esbuildConfig,
        ],
        output: [
            {
                file: `${name}.js`,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: "es",
                sourcemap: true,
            },
        ],
    }),
    // serverBundle({
    //     plugins: [
    //         dts({
    //             tsconfig: "tsconfig.json",
    //         }),
    //     ],
    //     output: {
    //         file: `${name}.d.ts`,
    //         format: "es",
    //     },
    // }),
];
