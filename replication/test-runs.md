# Test notes

## Test commands

```bash
#plain log, verbose
npm test -- src/server/__tests__/replication.test.ts --run --reporter=verbose

# build and log pretty
pnpm build && LOGGING=1 pnpm test replication | pnpm exec pino-pretty  



```

# Test issues

Often, this happens

```
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Unhandled Rejection ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
Error: Connection is closed.
 ❯ close node_modules/ioredis/built/redis/event_handler.js:189:25
 ❯ Socket.<anonymous> node_modules/ioredis/built/redis/event_handler.js:156:20
 ❯ Object.onceWrapper node:events:639:26
 ❯ ZoneDelegate.invokeTask node_modules/zoned-cls/dist/zoned-cls-node.js:389:31
 ❯ Zone.runTask node_modules/zoned-cls/dist/zoned-cls-node.js:174:43
 ❯ ZoneTask.invokeTask node_modules/zoned-cls/dist/zoned-cls-node.js:471:34
 ❯ Socket.ZoneTask.invoke node_modules/zoned-cls/dist/zoned-cls-node.js:460:48
 ❯ Socket.emit node:events:524:28
 ❯ TCP.<anonymous> node:net:343:12

This error originated in "src/server/__tests__/replication.test.ts" test file. It doesn't mean the error was thrown inside the file itself, but while it was running.
The latest test that might've caused the error is "replication setup".
```


## Improvements

cleanup replication after each

DredReplicator
private replicants: Replicant[] = []; // Store replicants for cleanup

initialize{}

```ts
        for (const host of otherHosts) {
            // ...
            this.replicants.push(repClient); // Store for cleanup
        }
```


cleanup{}

``` ts
        // Clean up all replicants - wait for all but continue on errors
        const results = await Promise.allSettled(
            this.replicants.map(replicant => replicant.cleanup())
        );
        
        // Log any failures but don't throw
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                this.warn(`Error cleaning up replicant ${index}: ${result.reason}`);
            }
        });
        
        this.replicants = [];
        this.initialized = false;
        this.log(`${this.name} cleanup complete`);
```

DredServer

cleanupReplication

```ts
    async cleanupReplication(): Promise<void> {
        // ..
        try {
            // Add timeout to prevent hanging during cleanup
            await Promise.race([
                this.replicator.cleanup(),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error("Replication cleanup timeout")), 5000)
                )
            ]);
            // ..
        } // ..
    }
```
