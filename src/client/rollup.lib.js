import { join } from "path";

export function platformModulePaths(platform) {
    return { modulePaths: [
        join(process.cwd(), `../../platform/${platform}`)
    ]}
}
