// NOTE: This configuration is not used for vite; only for bundling the components into dist/

//@TODO enable preview or disable server
// import serve from "rollup-plugin-serve";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import * as fg from "fast-glob";
import babel from "@rollup/plugin-babel";
// import alias from "@rollup/plugin-alias";

const externals = [
    // "util",
    // "debug",
];
const externalRegexen = externals.map((id) => new RegExp(id));

const notified = {};
function external(id) {
    let t = externalRegexen.find((i) => i.test(id));
    if (!t && !notified[id]) {
        notified[id] = true;
        console.log("including in bundle: ", id);
    }
    return t;
}

module.exports = [
    {
        input: [...components, ...helpers, "./src/scss/app.scss"],
        // external,
        watch: true,
        output: {
            dir: "dist/",
            entryFileNames: "[name].js",
            format: "esm",
        },
        plugins: plugins(),
    },
];

function plugins() {
    return [
        alias({
            entries: [
                // { find: "react", replacement: "preact/compat" },
            ],
        }),
        resolve({
            // extensions: [".js", ".jsx"],
        }),
        babel({
            exclude: "node_modules/**",
        }),
        commonjs({ include: /node_modules/ }),
    ];
}
