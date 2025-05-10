import { join } from "path";

export function twoModulesOut(name) {
    return {
        output: [
            { file: `${name}.js`, format: "cjs", sourcemap: true },
            { file: `${name}.mjs`, format: "es", sourcemap: true },
        ],
    };
}
