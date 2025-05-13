#fail00


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