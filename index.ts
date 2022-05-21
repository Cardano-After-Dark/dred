import { createServer } from "./src/server/server";

const concurrency = 50;
const pendingTasks = new Set<Promise<any>>();

init();
async function init() {
  const api = await createServer();
  api.listen(3000);

  console.log("hi");
}

async function asyncDelay(wait: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, wait);
  });
}
