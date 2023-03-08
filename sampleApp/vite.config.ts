import { resolve } from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import modify from "rollup-plugin-modify";
import path from 'path';


const preactPlugin = preact({
    babel: {
        // this preact+babel setup doesn't use babel.config.js unless it's explicily enabled here.
        plugins: [
            ["@babel/plugin-proposal-decorators", { legacy: true }],
            ["@babel/plugin-proposal-class-properties", { loose: true }],
        ],
    },
});

//!!! patches config plugin so that transitive dependencies on 'react' are resolved
//  to the local folder (and its preact/compat)
// ... instead of trying to resolve them relative to the module  having the react dep.
preactPlugin[0].config = () => ({
    resolve: {
      alias: {
        'react-dom/test-utils': path.resolve(__dirname, './node_modules/preact/test-utils'),
        'react-dom': path.resolve(__dirname, './node_modules/preact/compat'),
        react: path.resolve(__dirname, './node_modules/preact/compat'),
        "@poshplum/utils": "@poshplum/utils/browser", // only because conditions didn't work : (
      }
    }
  });;



// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: "ES2016",        
    },
    esbuild: {
        platform: "browser",
        supported: {
            "async-await": false,
            "async-generator": false,
        },
        target: "ES2016",
        keepNames: true,
        include: /.*\.[tj]sx?$/,
        loader: "tsx",
    },
    plugins: [
        preactPlugin,
        modify({
            find: "module.hot",
            replace: "import.meta.hot",
        }),
        ],
    resolve: {
        conditions: ["browser" ],
        alias: {
            react: '@preact/compat',
            'react-dom': '@preact/compat',
            "@postplum/utils": "@poshplum/utils/browser"
            // 'dred-client': '../dist/dred-client.mjs'
        },
    },
    define: {
        "process.env.LOGGING": JSON.stringify(process.env.LOGGING),

    },        
    server: {
        port: 3030
     }
    // root: "sampleApp/",
    // base: resolve(__dirname, "sampleApp/"),
    // publicDir:  "sampleApp/public",

    // XXX no `vite build` for constructing the lib with vendor lock-in 
    //  see rollup.config.js for that instead.
    // build: {
    //     lib: {
    //         // Could also be a dictionary or array of multiple entry points
    //         entry: {
    //             "dred-client": resolve(__dirname, "index.ts"),
    //             "dred-node-client": resolve(__dirname, "index.ts"),
    //         },
    //         name: "dred-clientViteLibName",  // ??? what effect does this have?
    //         // the proper extensions will be added
    //         fileName(format, entryAlias) {'
    //             return "dred-client",
    //         }
    //         formats: ['es', 'cjs']
    //     },
    //     rollupOptions: {
    //         // make sure to externalize deps that shouldn't be bundled
    //         // into your library
    //         external: ["vue"],
    //     },
    // },
});
