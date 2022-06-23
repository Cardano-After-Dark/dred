import "module-alias/register";
import { createServer } from "./src/server";

// const concurrency = 50;
// const pendingTasks = new Set<Promise<any>>();

init();
async function init() {
    const port = process.env.PORT || 3000;
    const server = await createServer({ port: port });
    server.listen(port);

    console.log(`Dred server listening on port ${port}`);
}
