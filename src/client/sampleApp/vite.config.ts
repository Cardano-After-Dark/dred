import { resolve } from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact()
    ],
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
