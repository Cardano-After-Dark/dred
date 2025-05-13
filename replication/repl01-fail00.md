#fail00


```bash
pnpm install && pnpm build
LOGGING=1 npm test src/client/__tests__/client.test.ts
```

Here is the test failing at the current stage

```bash
Found '/Users/psuzzi/projects/cad/dred/.nvmrc' with version <20>
Now using node v20.19.1 (npm v10.8.2)

  ✓ Docker container dred_redis is running

{ __dirname: '/Users/psuzzi/projects/cad/dred' }

 RUN  v3.1.2 /Users/psuzzi/projects/cad/dred

zonedLogger: default log levels: {"1":"info","defaultLevel":"warn"}
{"level":40,"time":1747173274940,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"default=info at     at zonedLogger (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+utils@0.8.2/node_modules/@poshplum/utils/src/zonedLogger.js:744:20)\n    at /Users/psuzzi/projects/cad/dred/src/server/testServer.ts:56:18\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at VitestExecutor.runModule (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:354:3)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts
NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1

stdout | src/client/__tests__/client.test.ts
isColorSupported true

{"level":40,"time":1747173274946,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹first›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173274946,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"+server 'first' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747173274947,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173274949,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up message replication for server first","v":1}
{"level":30,"time":1747173274962,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Found 2 other hosts for replication","v":1}
{"level":40,"time":1747173274962,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹second-1›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173274971,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173274972,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173274986,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Replication: setup for peer server second complete","v":1}
{"level":40,"time":1747173274987,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹third-2›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173274987,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173274987,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173274989,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Replication: setup for peer server third complete","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173274989,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173274989,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747173274992,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173274992,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747173274992,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173274993,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
stderr | src/client/__tests__/client.test.ts > Dred client
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

stdout | src/client/__tests__/client.test.ts > Dred client
cleanup:  localhost [third at localhost] connection failure

stdout | src/client/__tests__/client.test.ts > Dred client
cleanup:  localhost [second at localhost] connection failure

stderr | src/client/__tests__/client.test.ts > Dred client
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

{"level":30,"time":1747173275012,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173275013,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173275014,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173275015,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173275018,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server 'first' listening at localhost:53032","v":1}
{"level":40,"time":1747173275018,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹second›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173275018,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"+server 'second' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747173275018,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173275019,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up message replication for server second","v":1}
{"level":30,"time":1747173275020,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Found 2 other hosts for replication","v":1}
{"level":40,"time":1747173275020,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-3›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275020,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275020,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173275022,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Replication: setup for peer server first complete","v":1}
{"level":40,"time":1747173275022,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹third-4›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275022,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275022,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173275023,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Replication: setup for peer server third complete","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275023,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173275023,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747173275024,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275024,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747173275025,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275025,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
cleanup:  localhost [third at localhost] connection failure

{"level":30,"time":1747173275031,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747173275037,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"*\"}]","v":1}
stderr | src/client/__tests__/client.test.ts > Dred client
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

{"level":30,"time":1747173275041,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173275044,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173275046,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173275047,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173275048,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server 'second' listening at localhost:53033","v":1}
{"level":40,"time":1747173275048,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹third›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173275048,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"+server 'third' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747173275048,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173275049,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up message replication for server third","v":1}
{"level":30,"time":1747173275049,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Found 2 other hosts for replication","v":1}
{"level":40,"time":1747173275049,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-5›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275050,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275050,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173275051,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: setup for peer server first complete","v":1}
{"level":40,"time":1747173275051,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹second-6›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275051,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275051,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173275052,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: setup for peer server second complete","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275052,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173275052,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747173275054,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275054,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":40,"time":1747173275054,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275054,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173275061,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747173275062,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"*\"}]","v":1}
{"level":30,"time":1747173275062,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channels/listen","v":1}
{"level":30,"time":1747173275062,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"listening for [{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_chans\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"_auth\"},{\"neighborhood\":\"cardano-after-dark\",\"channel\":\"*\"}]","v":1}
{"level":30,"time":1747173275065,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173275067,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
warning from host first : {
  channel: '*',
  type: 'warning',
  message: 'invalid or expired channel'
}

{"level":30,"time":1747173275069,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173275070,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173275071,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"server 'third' listening at localhost:53034","v":1}
{"level":40,"time":1747173275072,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-7›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275072,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173275072,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275073,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173275075,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":40,"time":1747173275076,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client > discovery > can resolveDiscovery
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173275076,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client > discovery > can resolveDiscovery
warning from host second : {
  channel: '*',
  type: 'warning',
  message: 'invalid or expired channel'
}

stdout | src/client/__tests__/client.test.ts > Dred client > discovery > can resolveDiscovery
warning from host first : {
  channel: '*',
  type: 'warning',
  message: 'invalid or expired channel'
}

{"level":30,"time":1747173282038,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747173282063,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server: client <- heartbeat","v":1}
{"level":30,"time":1747173282064,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server: client <- heartbeat","v":1}
{"level":50,"time":1747173285108,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {}","v":1}
{"level":50,"time":1747173285108,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747173285109,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 10078ms","v":1}
{"level":50,"time":1747173285109,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_chans\"]}}","v":1}
{"level":50,"time":1747173285109,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_chans\"]}}}","v":1}
{"level":30,"time":1747173285109,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channels/listen 10047ms","v":1}
{"level":50,"time":1747173285110,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}","v":1}
{"level":50,"time":1747173285110,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}}","v":1}
{"level":50,"time":1747173285112,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}","v":1}
{"level":50,"time":1747173285112,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}}","v":1}
{"level":30,"time":1747173285116,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173285122,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173285124,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173285126,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173285128,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173285128,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173289064,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server: client <- heartbeat","v":1}
{"level":50,"time":1747173295126,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Consume error: {}","v":1}
{"level":50,"time":1747173295127,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"_chans consume error; TODO: reconnect/retry {\"error\":{}}","v":1}
{"level":30,"time":1747173295127,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"<- 200 POST /channels/listen 20066ms","v":1}
{"level":50,"time":1747173295129,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}","v":1}
{"level":50,"time":1747173295129,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"_auth consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|_auth\"]}}}","v":1}
{"level":50,"time":1747173295129,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Consume error: {\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|*\"]}}","v":1}
{"level":50,"time":1747173295130,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"* consume error; TODO: reconnect/retry {\"error\":{\"command\":{\"name\":\"xinfo\",\"args\":[\"STREAM\",\"app-channels-1|*\"]}}}","v":1}
{"level":30,"time":1747173295131,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: received message on channel * from peer second","v":1}
{"level":40,"time":1747173295131,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Replication: Failed to replicate message to channel *: TypeError: producer.add is not a function","v":1}
{"level":30,"time":1747173295134,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173295140,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295142,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295144,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295146,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295146,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173295148,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173295154,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295155,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295157,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295158,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295159,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":40,"time":1747173295162,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173295163,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"disconnected","context":["🗜️connection-manager @pendingSetup transition disconnected⦡ disconnected"],"summary":"connection-manager @pendingSetup  ➜ disconnected","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173295316,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173295317,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173295326,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295328,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295329,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295330,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295330,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173295330,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173295331,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295332,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295332,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295333,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295487,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173295489,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173295501,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295504,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295506,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295507,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295508,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173295508,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173295509,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295510,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295512,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295514,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295664,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173295667,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173295676,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295678,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295679,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295681,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295681,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173295681,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173295682,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173295683,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295685,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173295685,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295687,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295689,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295691,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295693,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295695,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295697,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295697,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173295699,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173295705,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295706,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295707,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295708,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295709,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173295710,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173295715,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295716,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295717,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295718,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295727,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/client1","v":1}
{"level":30,"time":1747173295730,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated client1 {\"channelId\":\"client1\",\"encrypted\":false,\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T21:54:55.729Z\"}","v":1}
{"level":30,"time":1747173295732,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/client1 5ms","v":1}
{"level":30,"time":1747173295736,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747173295890,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173295892,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173295903,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295905,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295907,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295908,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173295909,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173295909,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173295910,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173295911,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173295912,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173295913,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173296063,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173296065,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173301080,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301081,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301082,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301084,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301084,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173301084,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173301085,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301086,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301087,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301087,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301240,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173301241,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173301251,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301253,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301255,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301255,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301256,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173301256,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173301256,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173301257,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301258,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173301258,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301260,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301261,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301262,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301263,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301263,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301264,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301264,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173301266,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173301269,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301270,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301271,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301272,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301272,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173301273,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173301276,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301276,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301277,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301278,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301283,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/client2","v":1}
{"level":30,"time":1747173301284,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 400 POST /channel/client2 1ms","v":1}
{"level":50,"time":1747173301284,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"client-‹first-7›","context":[],"color":"\u001b[35m","msg":"createChannel at server failed: Error: some error\n    at DredClient.fetch (/Users/psuzzi/projects/cad/dred/src/client/DredClient.ts:453:15)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at DredClient.createChannel (/Users/psuzzi/projects/cad/dred/src/client/DredClient.ts:523:20)","v":1}
{"level":30,"time":1747173301285,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747173301437,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173301439,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173301446,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301447,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301448,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301449,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301449,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173301449,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173301450,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301450,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301451,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301452,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301602,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173301604,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173301611,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301612,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301612,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301613,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301613,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173301613,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173301614,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301614,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301615,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301615,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301769,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173301770,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173301777,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301778,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301780,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301781,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301781,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173301781,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173301781,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173301782,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301783,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173301783,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301784,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301785,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301787,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301788,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301789,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301790,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301790,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173301791,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173301795,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301796,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301797,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301798,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301798,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173301799,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173301802,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301803,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301804,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301805,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":40,"time":1747173301806,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-8›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173301807,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173301808,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client > encrypted chan: > requires key creation
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173301809,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173301809,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":40,"time":1747173301811,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client > encrypted chan: > requires key creation
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173301812,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173301962,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173301963,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173301973,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301975,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301977,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301978,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173301978,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173301978,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173301979,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173301980,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173301982,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173301983,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302135,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173302136,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173302150,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302151,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302153,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302155,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302155,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173302155,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173302156,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302158,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302159,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302160,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302308,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173302309,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173302314,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302318,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302319,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302320,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302320,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173302320,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173302321,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173302321,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302322,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173302322,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302323,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302324,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302328,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302330,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302331,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302332,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302332,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173302333,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173302336,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302337,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302338,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302339,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302339,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173302340,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173302344,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302345,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302346,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302346,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302351,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/client1","v":1}
{"level":30,"time":1747173302355,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated client1 {\"channelId\":\"client1\",\"encrypted\":true,\"owner\":\"Y7MHdq8qXsUf0xBeiNWw1HvbHLMdW2tlXJR1SGD0EyE=\",\"members\":[],\"requests\":[],\"allowJoining\":true,\"approveJoins\":\"owner\",\"signature\":\"ojwgLG4iTafy9ROd8179RQgRPEMEiUNZpgdad1jrm2MLuCHKVv02uMo2L7v0zfreToXCkxKXE0dA9Ds/Sa3aCQ==\",\"createdAt\":\"2025-05-13T21:55:02.354Z\"}","v":1}
{"level":30,"time":1747173302356,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/client1 5ms","v":1}
{"level":30,"time":1747173302357,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747173302510,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173302513,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173302524,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302526,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302529,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302537,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302538,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173302538,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173302539,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302540,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302541,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302542,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302699,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173302702,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173302708,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302710,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302712,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302713,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302713,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173302713,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173302714,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302715,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302716,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302717,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302869,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173302871,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173302878,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173302879,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173302881,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173302883,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173302883,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173302883,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":50,"time":1747173302887,"env":"test","pid":86911,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Produce error: Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)","v":1}
 ✓ src/client/__tests__/client.test.ts (11 tests | 6 skipped) 27939ms
   ✓ Dred client > discovery > can resolveDiscovery  20607ms
   ✓ Dred client > unencrypted chan: > createChannel > does createChannel() on server  5573ms
   ✓ Dred client > unencrypted chan: > createChannel > throws any error json returned in a server error  525ms
   ↓ Dred client > unencrypted chan: > subscribeChannel > keeps a list of callbacks for each channel
   ↓ Dred client > unencrypted chan: > subscribeChannel > triggers the subscriber's callback when messages are posted
   ✓ Dred client > encrypted chan: > requires key creation  539ms
   ✓ Dred client > encrypted chan: > after keygen: > createChannel > does createChannel() on server  563ms
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > subscribeChannel > triggers the subscriber's callback when messages are posted
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > postMessage > fails when the channel is encrypted
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > postEncrypted > fails when the channel doesn't have encryption enabled
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > postEncrypted > encodes the provided message as a JSON with an encryption wrapper
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
 ❯ DredServer.doChannelSetup src/server/DredServer.ts:315:9
 ❯ src/server/DredServer.ts:284:13

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Serialized Error: { error: { stack: 'Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)', message: 'Connection is closed.', constructor: 'Function<Error>', name: 'Error', toString: 'Function<toString>' } }
This error originated in "src/client/__tests__/client.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  1 passed (1)
      Tests  5 passed | 1 skipped | 5 todo (11)
     Errors  1 error
   Start at  23:54:34
   Duration  28.67s (transform 160ms, setup 0ms, collect 531ms, tests 27.94s, environment 0ms, prepare 45ms)

 ELIFECYCLE  Test failed. See above for more details.
> git log1
* 075962e add internal doc to track progress                      psuzzi@g.. 4 mi..  (HEAD -> feature/message-duplica..
* cd5e193 feat: initial implementation and minor adjustments      psuzzi@g.. 8 da..                                    
*   106f793 Merge branch 'feature/use-vitest' into feature/merge-.. randall@.. 8 da..  (origin/feature/merge-vitest, fe..
|\  
| * 8efba56 restore `pnpm install` in client build                  randall@.. 8 da..  (origin/feature/use-vitest)       
| * 38b77db temp: fix lockfile after deps removal                   randall@.. 8 da..                                    
| * c32da13 rename empty test for now                               randall@.. 8 da..                                    
| * 4a3b2aa try formatting test log output with pino-pretty         randall@.. 8 da..                                    
| * ab693e2 fix policies in build script                            randall@.. 8 da..                                    
| * 9cfdb42 disable failing tests                                   randall@.. 8 da..                                    
| * b87a2a3 temp: disable deps not yet available                    randall@.. 8 da..                                    %                                                  
~/projects/cad/dred feature/message-duplication *22 !1 > 
```

## Previous status

The error is present also before my change, tested as follows

```bash 
git rev-parse cd5e193^
106f793387f63c7c8103f0106b7c3c43171b7897
# revert to
git checkout 106f793387f63c7c8103f0106b7c3c43171b7897
pnpm install && pnpm build
LOGGING=1 npm test src/client/__tests__/client.test.ts
```


And this is the error message coming from the 


```bash
Found '/Users/psuzzi/projects/cad/dred/.nvmrc' with version <20>
Now using node v20.19.1 (npm v10.8.2)

  ✓ Docker container dred_redis is running

{ __dirname: '/Users/psuzzi/projects/cad/dred' }

 RUN  v3.1.2 /Users/psuzzi/projects/cad/dred

zonedLogger: default log levels: {"1":"info","defaultLevel":"warn"}
{"level":40,"time":1747173671228,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"default=info at     at zonedLogger (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+utils@0.8.2/node_modules/@poshplum/utils/src/zonedLogger.js:744:20)\n    at /Users/psuzzi/projects/cad/dred/src/server/testServer.ts:56:18\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at VitestExecutor.runModule (file:///Users/psuzzi/projects/cad/dred/node_modules/.pnpm/vite-node@3.1.2_@types+node@18.19.87_jiti@2.4.2_lightningcss@1.29.2/node_modules/vite-node/dist/client.mjs:354:3)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts
NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1

stdout | src/client/__tests__/client.test.ts
isColorSupported true

{"level":40,"time":1747173671234,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹first›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173671235,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"+server 'first' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747173671235,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173671255,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671256,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671260,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671261,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671262,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"server 'first' listening at localhost:53032","v":1}
{"level":40,"time":1747173671262,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹second›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173671262,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"+server 'second' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747173671263,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173671269,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671270,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671270,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671271,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671273,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"server 'second' listening at localhost:53033","v":1}
{"level":40,"time":1747173671273,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"dred‹third›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173671273,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"+server 'third' {\"localDevHosts\":[{\"serverId\":\"first\",\"address\":\"localhost\",\"port\":\"53032\",\"insecure\":true},{\"serverId\":\"second\",\"address\":\"localhost\",\"port\":\"53033\",\"insecure\":true},{\"serverId\":\"third\",\"address\":\"localhost\",\"port\":\"53034\",\"insecure\":true}]} null 2","v":1}
{"level":30,"time":1747173671273,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173671276,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671277,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671278,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671278,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671280,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"server 'third' listening at localhost:53034","v":1}
{"level":40,"time":1747173671281,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-1›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173671290,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173671291,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173671293,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173671295,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":40,"time":1747173671296,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client > discovery > can resolveDiscovery
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173671297,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173671303,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173671310,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671312,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671313,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671313,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671314,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173671315,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173671318,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671319,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671320,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671321,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671321,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173671322,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173671325,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671326,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671327,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671328,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671328,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":40,"time":1747173671329,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":30,"time":1747173671329,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"disconnected","context":["🗜️connection-manager @pendingSetup transition disconnected⦡ disconnected"],"summary":"connection-manager @pendingSetup  ➜ disconnected","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173671483,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173671484,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173671490,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671491,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671493,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671494,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671494,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173671494,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173671495,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671495,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671496,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671497,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671654,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173671655,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173671662,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671664,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671666,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671667,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671668,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173671668,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173671669,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671670,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671671,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671673,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671823,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173671825,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173671839,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671842,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671844,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671845,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671846,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173671846,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173671848,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173671849,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671850,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173671851,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671853,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671856,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671859,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671861,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671862,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671863,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671864,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173671865,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173671869,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671870,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671871,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671872,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671872,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173671873,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173671876,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173671877,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173671879,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173671880,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173671890,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/client1","v":1}
{"level":30,"time":1747173671901,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated client1 {\"channelId\":\"client1\",\"encrypted\":false,\"members\":[],\"requests\":[],\"approveJoins\":\"owner\",\"createdAt\":\"2025-05-13T22:01:11.900Z\"}","v":1}
{"level":30,"time":1747173671903,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/client1 13ms","v":1}
{"level":30,"time":1747173671906,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747173672063,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173672069,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173672076,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672078,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672079,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672081,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672081,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173672081,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173672082,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672083,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672085,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672086,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672235,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173672236,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173672241,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672243,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672245,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672247,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672247,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173672247,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173672248,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672249,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672250,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672251,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672405,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173672406,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173672413,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672415,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672418,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672421,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672421,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173672421,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173672422,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173672423,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672425,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173672426,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672430,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672432,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672432,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672434,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672436,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672437,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672437,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173672438,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173672442,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672443,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672444,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672445,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672445,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173672446,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173672449,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672450,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672451,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672452,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672455,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/client2","v":1}
{"level":30,"time":1747173672456,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 400 POST /channel/client2 1ms","v":1}
{"level":50,"time":1747173672457,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"client-‹first-1›","context":[],"color":"\u001b[35m","msg":"createChannel at server failed: Error: some error\n    at DredClient.fetch (/Users/psuzzi/projects/cad/dred/src/client/DredClient.ts:453:15)\n    at processTicksAndRejections (node:internal/process/task_queues:95:5)\n    at DredClient.createChannel (/Users/psuzzi/projects/cad/dred/src/client/DredClient.ts:523:20)","v":1}
{"level":30,"time":1747173672458,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747173672612,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173672615,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173672627,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672629,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672630,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672631,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672631,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173672631,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173672632,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672633,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672634,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672635,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672785,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173672786,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173672792,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672794,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672796,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672797,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672797,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173672797,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173672798,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672799,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672800,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672800,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672955,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173672959,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173672969,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672971,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672973,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672975,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672975,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173672975,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173672976,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173672978,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672979,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173672980,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672982,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672984,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672985,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173672987,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173672989,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173672991,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173672991,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173672993,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173672999,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673001,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673003,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673005,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673005,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173673007,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173673012,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673014,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673019,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673027,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":40,"time":1747173673028,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","context":[],"indent":"        ","summary":"client-‹first-2›=info by (env LOGGING=1)","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173673029,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
{"level":40,"time":1747173673029,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"zonedLogger","transitionName":"default","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()"],"indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client > encrypted chan: > requires key creation
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173673030,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"setupPending","context":["🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh","🗜️ConnectionManager ↝ default-state onEntry onEntry()","🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup"],"summary":"connection-manager @discoveringNbh  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173673030,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":40,"time":1747173673032,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"root","name":"zonedLogger","indent":"        ","summary":"connection-manager:state=info by state-machine: connection-manager definition","msg":"▒▒▒▒ log override ▒▒▒▒","v":1}
stdout | src/client/__tests__/client.test.ts > Dred client > encrypted chan: > requires key creation
    🐞 ConnectionManager: pendingSetup: deferred until channel subscriptions are set

{"level":30,"time":1747173673032,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"connection-manager:state","transitionName":"updatedHostList","context":["🗜️connection-manager @pendingSetup transition updatedHostList⦡ pendingSetup"],"summary":"connection-manager @pendingSetup  ➜ pendingSetup","msg":" ✓ transitioned","v":1}
{"level":30,"time":1747173673184,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173673186,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173673194,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673196,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673198,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673200,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673200,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173673200,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173673201,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673202,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673203,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673204,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673358,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173673360,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173673367,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673370,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673372,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673374,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673374,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173673374,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173673375,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673377,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673378,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673380,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673528,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173673529,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173673533,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673535,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673536,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673537,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673537,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173673537,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173673538,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173673538,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673539,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173673540,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673541,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673542,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673543,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673544,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673545,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673547,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673547,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173673548,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173673554,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673555,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673556,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673557,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673557,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"beforeEach: flushing redis","v":1}
{"level":30,"time":1747173673559,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173673562,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673563,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673564,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673565,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673570,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"-> POST /channel/client1","v":1}
{"level":30,"time":1747173673574,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated client1 {\"channelId\":\"client1\",\"encrypted\":true,\"owner\":\"NrGvi9KtvG1Qp/ZRbZpauJohHyVnfg7iZNb99SOPGzY=\",\"members\":[],\"requests\":[],\"allowJoining\":true,\"approveJoins\":\"owner\",\"signature\":\"WSoxcGi/bAm1OjvgIKFzeKs/HVxk6Kfni5VyaHds6uIM/pXxN3cJc3+/tAESLFL4EdBaenUMdNftgUYFQNXaBQ==\",\"createdAt\":\"2025-05-13T22:01:13.573Z\"}","v":1}
{"level":30,"time":1747173673575,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"<- 200 POST /channel/client1 5ms","v":1}
{"level":30,"time":1747173673576,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: clean up clients","v":1}
{"level":30,"time":1747173673730,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173673731,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"Setting up Redis connection: redis://localhost:6379, db: 1","v":1}
{"level":30,"time":1747173673738,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673740,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673742,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673744,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673744,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173673744,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173673745,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673746,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673746,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673747,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹first›","context":[],"serverId":"first","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673898,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173673900,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"Setting up Redis connection: redis://localhost:6379, db: 2","v":1}
{"level":30,"time":1747173673911,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673913,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673915,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673917,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173673917,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173673917,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
{"level":30,"time":1747173673918,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173673919,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173673920,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173673922,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹second›","context":[],"serverId":"second","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173674069,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: flushing redis","v":1}
{"level":30,"time":1747173674072,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Setting up Redis connection: redis://localhost:6379, db: 3","v":1}
{"level":30,"time":1747173674078,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _chans {\"channelId\":\"_chans\"}","v":1}
{"level":30,"time":1747173674080,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated _auth {\"channelId\":\"_auth\"}","v":1}
{"level":30,"time":1747173674082,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated news {\"channelId\":\"news\"}","v":1}
{"level":30,"time":1747173674083,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"channelCreated discussion {\"channelId\":\"discussion\"}","v":1}
{"level":30,"time":1747173674083,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"afterEach: restoring default channels","v":1}
{"level":30,"time":1747173674083,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"test","context":[],"color":"\u001b[33m","msg":"------------------ did reset redis with default channels --------------","v":1}
 ✓ src/client/__tests__/client.test.ts (11 tests | 6 skipped) 2851ms
   ✓ Dred client > discovery > can resolveDiscovery  552ms
   ✓ Dred client > unencrypted chan: > createChannel > does createChannel() on server  574ms
   ✓ Dred client > unencrypted chan: > createChannel > throws any error json returned in a server error  554ms
   ↓ Dred client > unencrypted chan: > subscribeChannel > keeps a list of callbacks for each channel
   ↓ Dred client > unencrypted chan: > subscribeChannel > triggers the subscriber's callback when messages are posted
   ✓ Dred client > encrypted chan: > requires key creation  562ms
   ✓ Dred client > encrypted chan: > after keygen: > createChannel > does createChannel() on server  546ms
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > subscribeChannel > triggers the subscriber's callback when messages are posted
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > postMessage > fails when the channel is encrypted
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > postEncrypted > fails when the channel doesn't have encryption enabled
   ↓ Dred client > encrypted chan: > after keygen: > createChannel > postEncrypted > encodes the provided message as a JSON with an encryption wrapper
{"level":50,"time":1747173674087,"env":"test","pid":89049,"hostname":"max1p","type":"log","name":"dred‹third›","context":[],"serverId":"third","msg":"Produce error: Error: Connection is closed.\n    at close (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:184:25)\n    at Socket.<anonymous> (/Users/psuzzi/projects/cad/dred/src/redis/streams/node_modules/ioredis/built/redis/event_handler.js:151:20)\n    at Object.onceWrapper (node:events:632:26)\n    at ZoneDelegate.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:389:31)\n    at Zone.runTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:174:43)\n    at ZoneTask.invokeTask (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:471:34)\n    at Socket.ZoneTask.invoke (/Users/psuzzi/projects/cad/dred/node_modules/.pnpm/@poshplum+zoned-cls@https+++codeload.github.com+poshplum+zoned-cls+tar.gz+4d42abe3d5e14c0f34f5704a7bb133630cb665b6/node_modules/@poshplum/zoned-cls/dist/zoned-cls-node.js:460:48)\n    at Socket.emit (node:events:517:28)\n    at TCP.<anonymous> (node:net:350:12)","v":1}
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
This error originated in "src/client/__tests__/client.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  1 passed (1)
      Tests  5 passed | 1 skipped | 5 todo (11)
     Errors  1 error
   Start at  00:01:10
   Duration  3.59s (transform 163ms, setup 0ms, collect 541ms, tests 2.85s, environment 0ms, prepare 48ms)

 ELIFECYCLE  Test failed. See above for more details.
~/projects/cad/dred @106f7933 *22 >                                                                                                                                      5s
```