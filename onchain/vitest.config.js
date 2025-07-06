/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

import { resolve } from "path"
import { defineConfig } from 'vitest/config'

import { 
    heliosRollupLoader, 
    heliosRollupBundler 
} from "@donecollectively/stellar-contracts/rollup-plugins";

export default defineConfig({
    plugins: [
        // string({
        //     // Required to be specified
        //     include: "**/*.hl",
        // }),
        heliosRollupLoader({ 
            project: "stellar-tokenomics",
            // include: [
            //     "**/*.hl",
            //     // "../stellar-contracts/**/*.hl",
            // ]
        }),
        heliosRollupBundler({
            vite: true,
        })
    ],
    resolve: {        
        // conditions: "typescriptNative"
    },

    test: {
        // include: ['tests/new*.test.ts', ],
        reporters: ["verbose"],
        include: [
            "src/**/*.test.ts"
        ],
        // diff: './vitest.diff.ts',

        globals: true,
        sourcemap: true,
        restoreMocks: true,
        testTimeout: 1000000,
        hookTimeout: 780000,
        teardownTimeout: 23000,
        
        // browser: {
        //     enabled: true,
        //     name: 'chrome', // browser name is required
        //   },
    },

    // build: {
    //     target: ["node", "esnext"],
    //     sourcemap: true,
    //     sourcemapIgnoreList: false,

    //     lib: {
    //         // Could also be a dictionary or array of multiple entry points
    //         entry: resolve(__dirname, "lib/index.ts"),
    //         name: "stellar-contracts",
    //         // the proper extensions will be added
    //         fileName: "stellar-contracts",
    //     },
    // },
})
