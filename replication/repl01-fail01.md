# fail 01

```bash
pnpm install && pnpm build
LOGGING=1 pnpm test src/server/__tests__/messages.test.ts
```

Here is the test failing at the current stage


```bash
Found '/Users/psuzzi/projects/cad/dred/.nvmrc' with version <20>
Now using node v20.19.1 (npm v10.8.2)

  ✓ Docker container dred_redis is running

{ __dirname: '/Users/psuzzi/projects/cad/dred' }

 RUN  v3.1.2 /Users/psuzzi/projects/cad/dred

zonedLogger: default log levels: {"1":"info","defaultLevel":"warn"}
{"level":40,"time":1747174291853,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"default=info at     at zonedLogger (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+utils@0.8.2/node_modules/@poshplum/utils/src/zonedLogger.js:744:20)\n    at /Users/psuzzi/projects/cad/dred/src/server/testServer.ts:56:18\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at VitestExecutor.runModule (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:354:3)\n    at VitestExecutor.directRequest (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:333:3)\n    at VitestExecutor.cachedRequest (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:168:11)\n    at VitestExecutor.dependencyRequest (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:216:10)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts
NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1

stdout | src/server/__tests__/messages.test.ts
isColorSupported true

{"level":40,"time":1747174291858,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹first›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291858,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"+server 'first' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747174291858,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174291861,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up message replication for server first","v":1}
{"level":30,"time":1747174291871,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Found 2 other hosts for replication","v":1}
{"level":40,"time":1747174291872,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹second-1›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291881,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291882,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291900,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Replication: setup for peer server second complete","v":1}
{"level":40,"time":1747174291900,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹third-2›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291900,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291901,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291902,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Replication: setup for peer server third complete","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291903,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174291903,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174291908,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291908,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174291908,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291908,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
stderr | src/server/__tests__/messages.test.ts > channel messages
fetch error; see debugger -  TypeError: fetch failed
    at node:internal/deps/undici/undici:12625:11
    at ZoneDelegate.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:359:26)
    at Zone.run (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:147:43)
    at /Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:863:34
    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)
    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)
    at drainMicroTaskQueue (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:569:35)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  cause: Error: connect ECONNREFUSED ::1:53033
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1555:16) {
    errno: -61,
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '::1',
    port: 53033
  }
}

stdout | src/server/__tests__/messages.test.ts > channel messages
cleanup:  localhost [second at localhost] connection failure

stdout | src/server/__tests__/messages.test.ts > channel messages
cleanup:  localhost [third at localhost] connection failure

stderr | src/server/__tests__/messages.test.ts > channel messages
fetch error; see debugger -  TypeError: fetch failed
    at node:internal/deps/undici/undici:12625:11
    at ZoneDelegate.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:359:26)
    at Zone.run (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:147:43)
    at /Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:863:34
    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)
    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)
    at drainMicroTaskQueue (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:569:35)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  cause: Error: connect ECONNREFUSED ::1:53034
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1555:16) {
    errno: -61,
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '::1',
    port: 53034
  }
}

{"level":30,"time":1747174291918,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174291919,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174291920,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174291921,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174291924,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server 'first' listening at localhost:53032","v":1}
{"level":40,"time":1747174291924,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹second›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291924,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"+server 'second' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747174291924,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174291925,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up message replication for server second","v":1}
{"level":30,"time":1747174291925,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Found 2 other hosts for replication","v":1}
{"level":40,"time":1747174291925,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-3›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291925,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291926,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291927,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Replication: setup for peer server first complete","v":1}
{"level":40,"time":1747174291927,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹third-4›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291927,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291928,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291928,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Replication: setup for peer server third complete","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291929,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174291929,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174291929,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291930,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174291930,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291930,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174291942,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747174291948,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"*\"}]","v":1}
stderr | src/server/__tests__/messages.test.ts > channel messages
fetch error; see debugger -  TypeError: fetch failed
    at node:internal/deps/undici/undici:12625:11
    at ZoneDelegate.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:359:26)
    at Zone.run (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:147:43)
    at /Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:863:34
    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)
    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)
    at drainMicroTaskQueue (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:569:35)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  cause: Error: connect ECONNREFUSED ::1:53034
      at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1555:16) {
    errno: -61,
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '::1',
    port: 53034
  }
}

stdout | src/server/__tests__/messages.test.ts > channel messages
cleanup:  localhost [third at localhost] connection failure

{"level":30,"time":1747174291959,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174291964,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174291967,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174291969,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174291970,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server 'second' listening at localhost:53033","v":1}
{"level":40,"time":1747174291970,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹third›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291970,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"+server 'third' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747174291970,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174291971,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up message replication for server third","v":1}
{"level":30,"time":1747174291971,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Found 2 other hosts for replication","v":1}
{"level":40,"time":1747174291971,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-5›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291971,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291972,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291973,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: setup for peer server first complete","v":1}
{"level":40,"time":1747174291973,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹second-6›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291973,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291973,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174291974,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: setup for peer server second complete","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291974,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174291974,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174291976,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291976,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174291976,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291976,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174291979,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747174291980,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"*\"}]","v":1}
{"level":30,"time":1747174291981,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747174291981,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"*\"}]","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
warning from host first : {
  channel: '*',
  type: 'warning',
  message: 'invalid or expired channel'
}

{"level":30,"time":1747174291986,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174291988,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174291989,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174291990,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174291991,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"server 'third' listening at localhost:53034","v":1}
{"level":40,"time":1747174291992,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-7›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291992,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174291992,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291994,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174291996,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":40,"time":1747174291996,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > does not post messages to a non-existing channel
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174291997,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > does not post messages to a non-existing channel
warning from host second : {
  channel: '*',
  type: 'warning',
  message: 'invalid or expired channel'
}

stdout | src/server/__tests__/messages.test.ts > channel messages > does not post messages to a non-existing channel
warning from host first : {
  channel: '*',
  type: 'warning',
  message: 'invalid or expired channel'
}

{"level":30,"time":1747174298949,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747174298980,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747174298982,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":50,"time":1747174301992,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174301993,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174301993,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 10051ms","v":1}
{"level":50,"time":1747174301994,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}","v":1}
{"level":50,"time":1747174301994,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}}","v":1}
{"level":30,"time":1747174305981,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747174305982,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":50,"time":1747174312094,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174312094,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"* consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174312096,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Replication: received message on channel * from peer first","v":1}
{"level":40,"time":1747174312096,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Replication: Failed to replicate message to channel *: TypeError: producer.add is not a function","v":1}
{"level":30,"time":1747174312982,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747174312983,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747174319982,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747174319983,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":50,"time":1747174322106,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174322107,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174322107,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 30126ms","v":1}
{"level":50,"time":1747174322108,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Unsubscribe error: {}","v":1}
{"level":50,"time":1747174322108,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Unsubscribe error: {}","v":1}
{"level":50,"time":1747174322108,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Unsubscribe error: {}","v":1}
{"level":30,"time":1747174322122,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174322129,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322130,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322130,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid undefined in _auth: \u001b[22m\u001b[39m\u001b[49m 27 bytes","v":1}
{"level":30,"time":1747174322131,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322132,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322132,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":50,"time":1747174322210,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}","v":1}
{"level":50,"time":1747174322210,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}}","v":1}
{"level":30,"time":1747174322210,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"<- 200 POST /channels/listen 30231ms","v":1}
{"level":50,"time":1747174322210,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|*\"]}}","v":1}
{"level":50,"time":1747174322210,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"* consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|*\"]}}}","v":1}
{"level":30,"time":1747174322211,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: received message on channel * from peer second","v":1}
{"level":40,"time":1747174322211,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: Failed to replicate message to channel *: TypeError: producer.add is not a function","v":1}
{"level":30,"time":1747174322215,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174322217,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322218,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322219,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322220,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322220,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174322221,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174322225,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322226,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322227,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322227,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322240,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/bogus/message","v":1}
{"level":30,"time":1747174322240,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel bogus","v":1}
{"level":30,"time":1747174322243,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 404 POST /channel/bogus/message 3ms","v":1}
{"level":30,"time":1747174322245,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":40,"time":1747174322246,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174322246,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"disconnected","context":["🗜️connection-manager @pendingSetup transition disconnected⦡ disconnected"],"summary":"connection-manager @pendingSetup  ➜ disconnected","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174322399,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174322401,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174322406,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322407,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322407,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid undefined in _auth: \u001b[22m\u001b[39m\u001b[49m 27 bytes","v":1}
{"level":30,"time":1747174322408,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322409,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322409,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174322409,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174322409,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322410,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322410,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid undefined in _auth: \u001b[22m\u001b[39m\u001b[49m 27 bytes","v":1}
{"level":30,"time":1747174322411,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322411,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322563,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174322564,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174322573,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322579,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322581,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322582,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322582,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174322582,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174322583,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322584,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322584,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322585,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322735,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174322738,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174322747,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322748,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322748,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322749,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322750,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174322750,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174322750,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174322750,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322752,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322752,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174322752,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322753,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322754,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322755,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322755,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid undefined in _auth: \u001b[22m\u001b[39m\u001b[49m 27 bytes","v":1}
{"level":30,"time":1747174322756,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322758,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322758,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174322759,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174322762,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322763,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322764,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322765,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322765,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174322766,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174322769,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322770,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322771,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322772,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322773,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/fooChannel","v":1}
{"level":30,"time":1747174322774,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated fooChannel {\"channelId\":\"fooChannel\",\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T22:12:02.773Z\"}","v":1}
{"level":30,"time":1747174322775,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/fooChannel 2ms","v":1}
{"level":30,"time":1747174322776,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/fooChannel/message","v":1}
{"level":30,"time":1747174322777,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel fooChannel","v":1}
{"level":30,"time":1747174322777,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"hiya\",\"ocid\":\"42-1234\",\"type\":\"greeting\",\"sourceServer\":\"first\"}","v":1}
{"level":30,"time":1747174322778,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/fooChannel/message 2ms","v":1}
{"level":30,"time":1747174322779,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747174322935,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174322937,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174322946,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322948,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid undefined in _auth: \u001b[22m\u001b[39m\u001b[49m 27 bytes","v":1}
{"level":30,"time":1747174322950,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322952,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322953,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174322953,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174322953,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174322954,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174322954,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174322955,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid undefined in _auth: \u001b[22m\u001b[39m\u001b[49m 27 bytes","v":1}
{"level":30,"time":1747174322955,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174322956,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174323108,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174323112,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174323120,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174323121,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174323121,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174323122,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174323122,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174323122,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174323123,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174323124,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174323124,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174323125,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174323275,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174323276,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174323284,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174323285,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174323286,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174323287,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174323287,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174323287,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174323288,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174323288,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174323289,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174323289,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174323290,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174323291,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174323292,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174323293,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174323293,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid undefined in _auth: \u001b[22m\u001b[39m\u001b[49m 27 bytes","v":1}
{"level":30,"time":1747174323294,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174323295,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174323295,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174323296,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174323302,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174323303,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174323303,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174323304,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174323305,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174323306,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174323309,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174323310,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174323311,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174323312,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":40,"time":1747174323312,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-8›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174323312,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174323313,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > notifies subscribers when messages are sent in a channel
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174323314,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174323315,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > notifies subscribers when messages are sent in a channel
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174323315,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174323316,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/foo","v":1}
{"level":30,"time":1747174323317,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated foo {\"channelId\":\"foo\",\"encrypted\":false,\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T22:12:03.317Z\"}","v":1}
{"level":30,"time":1747174323318,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/foo 2ms","v":1}
{"level":30,"time":1747174323321,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747174323321,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"foo\"}]","v":1}
{"level":30,"time":1747174323522,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/foo/message","v":1}
{"level":30,"time":1747174323522,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel foo","v":1}
{"level":30,"time":1747174323524,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\"}\",\"type\":\"greeting\",\"ocid\":\"21-aaaa\",\"sourceServer\":\"first\"}","v":1}
{"level":30,"time":1747174323525,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 21-aaaa in foo: \u001b[22m\u001b[39m\u001b[49m 17 bytes","v":1}
{"level":30,"time":1747174323525,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/foo/message 3ms","v":1}
{"level":30,"time":1747174323526,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/foo/message","v":1}
{"level":30,"time":1747174323527,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel foo","v":1}
{"level":30,"time":1747174323527,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\"}\",\"type\":\"greeting\",\"ocid\":\"21-bbbb\",\"sourceServer\":\"first\"}","v":1}
{"level":30,"time":1747174323528,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/foo/message 2ms","v":1}
{"level":30,"time":1747174323528,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 21-bbbb in foo: \u001b[22m\u001b[39m\u001b[49m 17 bytes","v":1}
{"level":30,"time":1747174323560,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747174330322,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":50,"time":1747174332209,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|*\"]}}","v":1}
{"level":50,"time":1747174332209,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"* consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|*\"]}}}","v":1}
{"level":30,"time":1747174332210,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: received message on channel * from peer first","v":1}
{"level":40,"time":1747174332210,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: Failed to replicate message to channel *: TypeError: producer.add is not a function","v":1}
stderr | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > notifies subscribers when messages are sent in a channel
Unhandled Promise rejection: Connection is closed. ; Zone: <root> ; Task: null ; Value: Error: Connection is closed.
    at Redis.sendCommand (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/index.js:636:24)
    at Redis.xdel (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/commander.js:122:25)
    at RedisChannels.consume (/Users/psuzzi/projects/cad/dred/src/redis/streams/channels.js:685:65)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at DredServer.monitorChannelChanges (/Users/psuzzi/projects/cad/dred/src/server/DredServer.ts:849:30) Error: Connection is closed.
    at Redis.sendCommand (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/index.js:636:24)
    at Redis.xdel (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/commander.js:122:25)
    at RedisChannels.consume (/Users/psuzzi/projects/cad/dred/src/redis/streams/channels.js:685:65)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at DredServer.monitorChannelChanges (/Users/psuzzi/projects/cad/dred/src/server/DredServer.ts:849:30)

{"level":50,"time":1747174332213,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174332213,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":50,"time":1747174332214,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174332214,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174332214,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 8893ms","v":1}
{"level":30,"time":1747174332219,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174332220,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174332223,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332224,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332225,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332226,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332226,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174332227,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174332227,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332228,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332229,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332230,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332384,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174332385,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174332391,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332393,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332394,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332395,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332395,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174332395,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174332396,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332397,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332398,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332399,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332552,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174332553,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174332561,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332562,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332563,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332564,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332565,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174332565,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174332565,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174332566,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332566,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174332567,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332568,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332569,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332570,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332571,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332572,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332573,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332573,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174332574,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174332579,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332580,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332581,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332583,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332583,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174332584,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174332591,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332595,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332652,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332660,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":40,"time":1747174332661,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-9›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174332662,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174332665,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > continues consuming events from redis after a first batch
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174332673,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174332678,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174332679,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > continues consuming events from redis after a first batch
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174332681,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/keepgoing","v":1}
{"level":30,"time":1747174332685,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated keepgoing {\"channelId\":\"keepgoing\",\"encrypted\":false,\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T22:12:12.683Z\"}","v":1}
{"level":30,"time":1747174332687,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/keepgoing 6ms","v":1}
{"level":30,"time":1747174332691,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747174332692,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"keepgoing\"}]","v":1}
{"level":30,"time":1747174332708,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"client-‹first-7›","context":[],"color":"\u001b[35m","msg":"posting message  {\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"type\":\"greeting\"}","v":1}
{"level":30,"time":1747174332711,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/keepgoing/message","v":1}
{"level":30,"time":1747174332717,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel keepgoing","v":1}
{"level":30,"time":1747174332720,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"type\":\"greeting\",\"ocid\":\"4y3mq7ne9dc1\",\"sourceServer\":\"first\"}","v":1}
{"level":30,"time":1747174332720,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/keepgoing/message 9ms","v":1}
{"level":30,"time":1747174332721,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 4y3mq7ne9dc1 in keepgoing: \u001b[22m\u001b[39m\u001b[49m 42 bytes","v":1}
{"level":30,"time":1747174332721,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"client-‹first-7›","context":[],"color":"\u001b[35m","msg":"chan msg {\"message\":\"msg received in chan\",\"mid\":\"1747174332719-0\",\"ocid\":\"4y3mq7ne9dc1\",\"type\":\"greeting\",\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"channel\":\"keepgoing\",\"details\":{\"sourceServer\":\"first\"},\"ts\":\"2025-05-13T22:12:12.721Z\"}","v":1}
{"level":30,"time":1747174332745,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/keepgoing/message","v":1}
{"level":30,"time":1747174332745,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel keepgoing","v":1}
{"level":30,"time":1747174332747,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"type\":\"greeting\",\"ocid\":\"42-4321\",\"sourceServer\":\"first\"}","v":1}
{"level":30,"time":1747174332748,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/keepgoing/message 3ms","v":1}
{"level":30,"time":1747174332749,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 42-4321 in keepgoing: \u001b[22m\u001b[39m\u001b[49m 42 bytes","v":1}
{"level":30,"time":1747174332750,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"client-‹first-7›","context":[],"color":"\u001b[35m","msg":"chan msg {\"message\":\"msg received in chan\",\"mid\":\"1747174332747-0\",\"ocid\":\"42-4321\",\"type\":\"greeting\",\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"channel\":\"keepgoing\",\"details\":{\"sourceServer\":\"first\"},\"ts\":\"2025-05-13T22:12:12.750Z\"}","v":1}
{"level":30,"time":1747174332772,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":50,"time":1747174332930,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174332930,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174332930,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 239ms","v":1}
{"level":30,"time":1747174332932,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174332933,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174332937,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332938,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332939,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332941,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174332941,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174332941,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174332941,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174332942,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174332943,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174332944,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174333123,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174333124,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174333133,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174333135,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174333137,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174333138,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174333138,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174333138,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174333139,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174333139,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174333140,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174333141,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174333299,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174333301,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174333481,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174333487,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174333489,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174333492,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174333492,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174333492,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":50,"time":1747174333495,"env":"test","pid":92035,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Produce error: Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)","v":1}
 ✓ src/server/__tests__/messages.test.ts (4 tests) 41637ms
   ✓ channel messages > does not post messages to a non-existing channel  30755ms
   ✓ channel messages > non-encrypted > posts messages to an existing channel  538ms
   ✓ channel messages > non-encrypted > subscriptions:  > notifies subscribers when messages are sent in a channel  9277ms
   ✓ channel messages > non-encrypted > subscriptions:  > continues consuming events from redis after a first batch  928ms
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 4 unhandled errors during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Can not unsubscribe for consumer : d56a0b38bdf142eead57848afd80f983
 ❯ RedisChannels.unsubscribe src/redis/streams/channels.js:440:19
    438|                 throw error;
    439|             }
    440|             throw new RedisChannelsError(
       |                   ^
    441|                 "Can not unsubscribe for consumer : " + tunnel[tun.CONSUMER],
    442|                 error
 ❯ processTicksAndRejections node:internal/process/task_queues:95:5

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Serialized Error: { error: { stack: 'Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)', message: 'Connection is closed.', constructor: 'Function<Error>', name: 'Error', toString: 'Function<toString>' } }
This error originated in "src/server/__tests__/messages.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
The latest test that might've caused the error is "does not post messages to a non-existing channel". It might mean one of the following:
- The error was thrown, while Vitest was running this test.
- If the error occurred after the test had been completed, this was the last documented test before it was thrown.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Can not unsubscribe for consumer : 06406c8ade6448929145f4bd2f181cc9
 ❯ RedisChannels.unsubscribe src/redis/streams/channels.js:440:19
    438|                 throw error;
    439|             }
    440|             throw new RedisChannelsError(
       |                   ^
    441|                 "Can not unsubscribe for consumer : " + tunnel[tun.CONSUMER],
    442|                 error
 ❯ processTicksAndRejections node:internal/process/task_queues:95:5

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Serialized Error: { error: { stack: 'Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)', message: 'Connection is closed.', constructor: 'Function<Error>', name: 'Error', toString: 'Function<toString>' } }
This error originated in "src/server/__tests__/messages.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
The latest test that might've caused the error is "does not post messages to a non-existing channel". It might mean one of the following:
- The error was thrown, while Vitest was running this test.
- If the error occurred after the test had been completed, this was the last documented test before it was thrown.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Can not unsubscribe for consumer : 2a20971797f7427ab1db183c429d70db
 ❯ RedisChannels.unsubscribe src/redis/streams/channels.js:440:19
    438|                 throw error;
    439|             }
    440|             throw new RedisChannelsError(
       |                   ^
    441|                 "Can not unsubscribe for consumer : " + tunnel[tun.CONSUMER],
    442|                 error
 ❯ processTicksAndRejections node:internal/process/task_queues:95:5

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Serialized Error: { error: { stack: 'Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)', message: 'Connection is closed.', constructor: 'Function<Error>', name: 'Error', toString: 'Function<toString>' } }
This error originated in "src/server/__tests__/messages.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
The latest test that might've caused the error is "does not post messages to a non-existing channel". It might mean one of the following:
- The error was thrown, while Vitest was running this test.
- If the error occurred after the test had been completed, this was the last documented test before it was thrown.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Can not produce in the tunnel: [object Object]
 ❯ RedisChannels.produce src/redis/streams/channels.js:493:19
    491|             this._log.error("Produce error:", error.stack || error.message || JSON.stringify(error));
    492|             debugger
    493|             throw new RedisChannelsError(
       |                   ^
    494|                 "Can not produce in the tunnel: " + tunnel,
    495|                 error
 ❯ processTicksAndRejections node:internal/process/task_queues:95:5
 ❯ DredServer.doChannelSetup src/server/DredServer.ts:315:9
 ❯ src/server/DredServer.ts:284:13

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Serialized Error: { error: { stack: 'Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)', message: 'Connection is closed.', constructor: 'Function<Error>', name: 'Error', toString: 'Function<toString>' } }
This error originated in "src/server/__tests__/messages.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  1 passed (1)
      Tests  4 passed (4)
     Errors  4 errors
   Start at  00:11:31
   Duration  42.30s (transform 147ms, setup 0ms, collect 465ms, tests 41.64s, environment 0ms, prepare 44ms)

 ELIFECYCLE  Test failed. See above for more details.
~/projects/cad/dred feature/message-duplication *22 >                                                                                                                   44s
```

## Previous status

The error is present also before my change, tested as follows

```bash 
git rev-parse cd5e193^
106f793387f63c7c8103f0106b7c3c43171b7897
# revert to
git checkout 106f793387f63c7c8103f0106b7c3c43171b7897
pnpm install && pnpm build
LOGGING=1 pnpm test src/server/__tests__/messages.test.ts
```

Ok, let's check if there is the same failure also before my own changes. I will adopt this approach

```
git checkout 106f793387f63c7c8103f0106b7c3c43171b7897
pnpm install && pnpm build
LOGGING=1 pnpm test src/server/__tests__/messages.test.ts
```

```bash
Found '/Users/psuzzi/projects/cad/dred/.nvmrc' with version <20>
Now using node v20.19.1 (npm v10.8.2)

  ✓ Docker container dred_redis is running

{ __dirname: '/Users/psuzzi/projects/cad/dred' }

 RUN  v3.1.2 /Users/psuzzi/projects/cad/dred

zonedLogger: default log levels: {"1":"info","defaultLevel":"warn"}
{"level":40,"time":1747174817564,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"default=info at     at zonedLogger (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+utils@0.8.2/node_modules/@poshplum/utils/src/zonedLogger.js:744:20)\n    at /Users/psuzzi/projects/cad/dred/src/server/testServer.ts:56:18\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at VitestExecutor.runModule (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:354:3)\n    at VitestExecutor.directRequest (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:333:3)\n    at VitestExecutor.cachedRequest (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:168:11)\n    at VitestExecutor.dependencyRequest (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:216:10)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts
NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1

stdout | src/server/__tests__/messages.test.ts
isColorSupported true

{"level":40,"time":1747174817568,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹first›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174817568,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"+server 'first' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747174817568,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174817592,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817594,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817595,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817596,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817598,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server 'first' listening at localhost:53032","v":1}
{"level":40,"time":1747174817599,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹second›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174817599,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"+server 'second' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747174817599,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174817603,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817603,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817604,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817604,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817606,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server 'second' listening at localhost:53033","v":1}
{"level":40,"time":1747174817606,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹third›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174817606,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"+server 'third' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747174817606,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174817611,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817612,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817613,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817614,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817614,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"server 'third' listening at localhost:53034","v":1}
{"level":40,"time":1747174817615,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-1›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174817624,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174817625,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174817627,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174817629,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":40,"time":1747174817630,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > does not post messages to a non-existing channel
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174817630,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174817632,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174817636,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817637,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817638,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817639,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817639,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174817640,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174817643,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817644,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817645,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817646,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817646,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174817647,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174817649,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817650,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817651,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817651,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817658,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/bogus/message","v":1}
{"level":30,"time":1747174817658,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel bogus","v":1}
{"level":30,"time":1747174817661,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 404 POST /channel/bogus/message 3ms","v":1}
{"level":30,"time":1747174817664,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":40,"time":1747174817664,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747174817664,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"disconnected","context":["🗜️connection-manager @pendingSetup transition disconnected⦡ disconnected"],"summary":"connection-manager @pendingSetup  ➜ disconnected","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174817817,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174817819,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174817824,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817826,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817827,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817829,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817829,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174817829,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174817830,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817831,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817832,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817833,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817981,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174817982,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174817986,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817987,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817989,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817990,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174817990,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174817990,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174817990,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174817991,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174817992,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174817993,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818143,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174818145,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174818153,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818156,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818158,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818159,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818159,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174818160,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174818161,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174818164,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818165,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174818167,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818168,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818170,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818172,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818173,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818175,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818176,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818176,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174818178,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174818182,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818183,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818184,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818185,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818186,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174818187,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174818191,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818192,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818193,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818195,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818196,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/fooChannel","v":1}
{"level":30,"time":1747174818198,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated fooChannel {\"channelId\":\"fooChannel\",\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T22:20:18.197Z\"}","v":1}
{"level":30,"time":1747174818199,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/fooChannel 3ms","v":1}
{"level":30,"time":1747174818203,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/fooChannel/message","v":1}
{"level":30,"time":1747174818213,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel fooChannel","v":1}
{"level":30,"time":1747174818213,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"hiya\",\"ocid\":\"42-1234\",\"type\":\"greeting\"}","v":1}
{"level":30,"time":1747174818214,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/fooChannel/message 11ms","v":1}
{"level":30,"time":1747174818216,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747174818369,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174818372,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174818381,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818383,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818385,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818388,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818388,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174818388,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174818389,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818390,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818391,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818392,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818542,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174818544,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174818551,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818553,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818554,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818557,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818558,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174818558,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174818559,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818560,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818562,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818564,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818714,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174818716,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174818727,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818729,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818731,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818732,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818732,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174818732,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174818733,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174818735,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818736,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174818737,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818739,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818741,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818742,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818744,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818746,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818748,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818748,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174818750,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174818757,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818758,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818760,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818761,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174818761,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174818763,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174818767,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174818769,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174818770,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174818772,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":40,"time":1747174818773,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-2›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174818774,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174818774,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > notifies subscribers when messages are sent in a channel
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174818776,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174818779,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > notifies subscribers when messages are sent in a channel
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174818780,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174818781,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/foo","v":1}
{"level":30,"time":1747174818783,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated foo {\"channelId\":\"foo\",\"encrypted\":false,\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T22:20:18.782Z\"}","v":1}
{"level":30,"time":1747174818784,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/foo 3ms","v":1}
{"level":30,"time":1747174818810,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747174818810,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"foo\"}]","v":1}
{"level":30,"time":1747174819005,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/foo/message","v":1}
{"level":30,"time":1747174819005,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel foo","v":1}
{"level":30,"time":1747174819007,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\"}\",\"type\":\"greeting\",\"ocid\":\"21-aaaa\"}","v":1}
{"level":30,"time":1747174819009,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 21-aaaa in foo: \u001b[22m\u001b[39m\u001b[49m 17 bytes","v":1}
{"level":30,"time":1747174819009,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/foo/message 4ms","v":1}
{"level":30,"time":1747174819012,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/foo/message","v":1}
{"level":30,"time":1747174819012,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel foo","v":1}
{"level":30,"time":1747174819013,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\"}\",\"type\":\"greeting\",\"ocid\":\"21-bbbb\"}","v":1}
{"level":30,"time":1747174819014,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 21-bbbb in foo: \u001b[22m\u001b[39m\u001b[49m 17 bytes","v":1}
{"level":30,"time":1747174819014,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/foo/message 2ms","v":1}
{"level":30,"time":1747174819037,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747174825813,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":50,"time":1747174828889,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174828889,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174828890,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 10080ms","v":1}
{"level":50,"time":1747174828892,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174828892,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174828894,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174828895,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174828900,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174828902,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174828903,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174828905,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174828905,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174828905,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174828906,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174828907,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174828908,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174828909,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829061,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174829063,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174829073,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829074,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829076,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829078,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829078,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174829078,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174829079,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829080,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829081,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829082,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829233,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174829238,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174829248,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829250,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829252,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829254,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829254,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174829254,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174829255,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174829256,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829257,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174829258,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829259,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829261,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829262,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829264,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829266,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829267,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829268,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174829270,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174829274,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829276,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829277,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829279,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829279,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747174829281,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174829286,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829287,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829289,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829291,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":40,"time":1747174829292,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-3›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174829293,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747174829294,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > continues consuming events from redis after a first batch
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174829296,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747174829300,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/server/__tests__/messages.test.ts > channel messages > non-encrypted > subscriptions:  > continues consuming events from redis after a first batch
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747174829300,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747174829302,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/keepgoing","v":1}
{"level":30,"time":1747174829304,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated keepgoing {\"channelId\":\"keepgoing\",\"encrypted\":false,\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T22:20:29.303Z\"}","v":1}
{"level":30,"time":1747174829305,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/keepgoing 3ms","v":1}
{"level":30,"time":1747174829309,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747174829310,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"keepgoing\"}]","v":1}
{"level":30,"time":1747174829327,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"client-‹first-1›","context":[],"color":"\u001b[35m","msg":"posting message  {\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"type\":\"greeting\"}","v":1}
{"level":30,"time":1747174829332,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/keepgoing/message","v":1}
{"level":30,"time":1747174829332,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel keepgoing","v":1}
{"level":30,"time":1747174829333,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"type\":\"greeting\",\"ocid\":\"69tt8zjefqee\"}","v":1}
{"level":30,"time":1747174829334,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 69tt8zjefqee in keepgoing: \u001b[22m\u001b[39m\u001b[49m 42 bytes","v":1}
{"level":30,"time":1747174829334,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/keepgoing/message 2ms","v":1}
{"level":30,"time":1747174829335,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"client-‹first-1›","context":[],"color":"\u001b[35m","msg":"chan msg {\"message\":\"msg received in chan\",\"mid\":\"1747174829333-0\",\"ocid\":\"69tt8zjefqee\",\"type\":\"greeting\",\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"channel\":\"keepgoing\",\"details\":{},\"ts\":\"2025-05-13T22:20:29.335Z\"}","v":1}
{"level":30,"time":1747174829359,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/keepgoing/message","v":1}
{"level":30,"time":1747174829359,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"postMessageInChannel keepgoing","v":1}
{"level":30,"time":1747174829366,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: postMessage {\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"type\":\"greeting\",\"ocid\":\"42-4321\"}","v":1}
{"level":30,"time":1747174829367,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"\u001b[104m\u001b[30m\u001b[1m    <- ocid 42-4321 in keepgoing: \u001b[22m\u001b[39m\u001b[49m 42 bytes","v":1}
{"level":30,"time":1747174829368,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/keepgoing/message 9ms","v":1}
{"level":30,"time":1747174829368,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"client-‹first-1›","context":[],"color":"\u001b[35m","msg":"chan msg {\"message\":\"msg received in chan\",\"mid\":\"1747174829366-0\",\"ocid\":\"42-4321\",\"type\":\"greeting\",\"msg\":\"{\\\"hello\\\":\\\"world\\\",\\\"keepConsuming\\\":\\\"please\\\"}\",\"channel\":\"keepgoing\",\"details\":{},\"ts\":\"2025-05-13T22:20:29.368Z\"}","v":1}
{"level":30,"time":1747174829391,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":50,"time":1747174829717,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174829718,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174829719,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 410ms","v":1}
{"level":50,"time":1747174829721,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747174829721,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747174829724,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174829725,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747174829733,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829735,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829737,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829738,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829738,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174829738,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174829739,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829740,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829741,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829742,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829891,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174829893,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747174829901,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829903,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829904,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829905,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174829905,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174829905,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747174829906,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174829907,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174829908,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174829909,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174830060,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747174830061,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747174830069,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747174830071,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747174830073,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747174830075,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747174830075,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747174830075,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
 ✓ src/server/__tests__/messages.test.ts (4 tests) 12510ms
   ✓ channel messages > does not post messages to a non-existing channel  532ms
   ✓ channel messages > non-encrypted > posts messages to an existing channel  572ms
   ✓ channel messages > non-encrypted > subscriptions:  > notifies subscribers when messages are sent in a channel  10522ms
   ✓ channel messages > non-encrypted > subscriptions:  > continues consuming events from redis after a first batch  821ms
{"level":50,"time":1747174830080,"env":"test","pid":94666,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Produce error: Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)","v":1}
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Can not produce in the tunnel: [object Object]
 ❯ RedisChannels.produce src/redis/streams/channels.js:493:19
    491|             this._log.error("Produce error:", error.stack || error.message || JSON.stringify(error));
    492|             debugger
    493|             throw new RedisChannelsError(
       |                   ^
    494|                 "Can not produce in the tunnel: " + tunnel,
    495|                 error
 ❯ processTicksAndRejections node:internal/process/task_queues:95:5
 ❯ DredServer.doChannelSetup src/server/DredServer.ts:313:9
 ❯ src/server/DredServer.ts:282:13

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Serialized Error: { error: { stack: 'Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)', message: 'Connection is closed.', constructor: 'Function<Error>', name: 'Error', toString: 'Function<toString>' } }
This error originated in "src/server/__tests__/messages.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  1 passed (1)
      Tests  4 passed (4)
     Errors  1 error
   Start at  00:20:16
   Duration  13.13s (transform 135ms, setup 0ms, collect 427ms, tests 12.51s, environment 0ms, prepare 38ms)

 ELIFECYCLE  Test failed. See above for more details.
~/projects/cad/dred @106f7933 *22 >                                                                                                                                     15s
```