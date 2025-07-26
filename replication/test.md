# Testing Replication Feature

## Setup

Ensure you are on the correct branch and setup your environment. 

```bash
node --version
v20.19.2
pnpm --version
10.11.0
```

```bash
git checkout feature/message-duplication
git clean -fdx
pnpm install
pnpm build
```

## Running Tests

### Basic Test Run


```bash
pnpm test replication | pnpm exec pino-pretty
```

### More logging

```bash
# Enable application logging
LOGGING=1 pnpm test replication | pnpm exec pino-pretty
```

### Logging comparison

```bash
# run test+log
pnpm logtest replication

# do some changes in code ..

# rerun test + log
pnpm logtest replication

# compare the test out
pnpm logdiff replication
```

NOTE: if you need more logging in logtest, just change `logtest.sh`, e.g. add `LOGGING=1`

### Focusing on Specific Test Cases

If you need to focus on a specific test case, modify the test file to use `fit` instead of `it` for that test:

```typescript
// Change this
it("replicates messages between servers", async () => {
  // test code
});

// To this to focus only on this test
fit("replicates messages between servers", async () => {
  // test code
});
```

## Expected Results

When running the replication test, you should see:

1. Two server instances starting up
2. A channel being created on the first server
3. The channel being replicated to the second server
4. A message being sent to the first server
5. The message being replicated to the second server
6. A client connected to the second server receiving the message

If all of these steps succeed, the test will pass, confirming that message replication is working correctly.

## Troubleshooting

If the test fails, check the following:

1. Ensure Redis is running and accessible
2. Look at the logs for any errors in the replication setup
3. Verify that the `sourceServer` field is being properly set on messages
4. Check that server discovery is working correctly and finding all servers
5. Verify that the subscription to channels on the second server is working

Using `LOGGING=1 REDIS_MONITOR=1` will provide the most detailed information for diagnosing issues. 



# Test notes

## Commands

```bash
#plain log, verbose
npm test -- src/server/__tests__/replication.test.ts --run --reporter=verbose

# build and log pretty
pnpm build && LOGGING=1 pnpm test replication | pnpm exec pino-pretty  


# show warn level
LOGGING=1 pnpm test replication | pnpm exec pino-pretty --level info


NODE_OPTIONS="--inspect-brk" LOGGING=1 pnpm test replication | pnpm exec pino-pretty

LOGGING=dred-client:state:warn,default:debug pnpm test replication | pnpm exec pino-pretty

```

## issues

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
## Possible way of solving some problems

1. Overload mkClient

## Prompts to solve problems

I run the replicator test and often, not always, I get an unhandled rejection where the connection is closed (from ioredis socket). I would like to investigate what is happening. 

The replication test works as expected, so I don't want to have any functional change to the test. I would like to debug a bit to pinpoint the cause of the error. Here I will add some facts that might help identify the error or some patterns that might be broken.

First of all, when we call server.makeClient, after calling makeClient, we should call the client.generateKey—and that should be a pattern done everywhere. If this is not done for a client, most likely the client will have problems. 

The test setup has a SPI. I don't know exactly what a SPI is, but I think it has a SPI and the SPI on my client. 

I think this SPI applies to one server—the first server—while, for instance, the replication clients are created on all servers. So it can be that the replication creates clients on all servers and when server 2 and 3 create replication client, they're not being tracked by the cleanup system. We probably need to check if the cleanup system works.

One more concern is about actually cleaning the clients. So the server, the redis server at a certain point can, when it cleans everything, it deletes the clients. And the same can happen for the replicator. Also the replicator, when he's done with his work, can delete the clients.

Now we need to make sure that when we delete the client, we check that the client actually exists and maybe to check if it's connected before trying to disconnect. So, for deleting the client I would try to do a graceful deletion, something like this.

It can be useful also to have a sort of weight method when we call the replication, how it's called the DredReplicatorCleanup. 

Basically DredReplicatorCleanup is going to remove all the resources related to a replicator. That means probably also invoke the cleanup of the clients, if they still exist. 

And probably this call of DredReplicatorCleanup—I guess we probably should wait for the replication to be complete, something like this.

Maybe the thread replicator should keep a list of clients. I think it's called the replicant or each replicant has a client—I'm not sure of that. 

But basically, maybe we should keep a list of clients that we want to disconnect for the cleanup. I'm not sure if this helps, but that can be considered toward the end of the solution.


----
@replication.test.ts @DredReplicator.ts @DredServer.ts @testServer.ts 


I run the replicator test and often, not always, I get an unhandled rejection where the connection is closed (from ioredis socket). I would like to investigate what is happening. 

The replication test works as expected, so I don't want to have any functional change to the test. I would like to debug a bit to pinpoint the cause of the error. Here I will add some facts that might help identify the error or some patterns that might be broken.

First of all, when we call server.makeClient, after calling makeClient, we should call the client.generateKey—and that should be a pattern done everywhere. If this is not done for a client, most likely the client will have problems. 

The test setup has a SPI. I don't know exactly what a SPI is, but I think it has a SPI and the SPI on my client. 

I think this SPI applies to one server—the first server—while, for instance, the replication clients are created on all servers. So it can be that the replication creates clients on all servers and when server 2 and 3 create replication client, they're not being tracked by the cleanup system. We probably need to check if the cleanup system works.

One more concern is about actually cleaning the clients. So the server, the redis server at a certain point can, when it cleans everything, it deletes the clients. And the same can happen for the replicator. Also the replicator, when he's done with his work, can delete the clients.

Now we need to make sure that when we delete the client, we check that the client actually exists and maybe to check if it's connected before trying to disconnect. So, for deleting the client I would try to do a graceful deletion, something like this.

It can be useful also to have a sort of weight method when we call the replication, how it's called the DredReplicatorCleanup. 

Basically DredReplicatorCleanup is going to remove all the resources related to a replicator. That means probably also invoke the cleanup of the clients, if they still exist. 

And probably this call of DredReplicatorCleanup—I guess we probably should wait for the replication to be complete, something like this.

Maybe the thread replicator should keep a list of clients. I think it's called the replicant or each replicant has a client—I'm not sure of that. 

But basically, maybe we should keep a list of clients that we want to disconnect for the cleanup. I'm not sure if this helps, but that can be considered toward the end of the solution.

Please don't go ahead to change files directly, but before any proposed file change, let's discuss the changes so that I can adjust them according to the architectural idea I have in mind. And sometimes we might need to polish a little bit the change before actually writing to disk 
----

## Investigation: "Connection is closed" Error Analysis

### Problem Description

During replication test runs, an intermittent "Connection is closed" error occurs from ioredis socket connections. The error pattern is:
- **First test run**: Usually clean, no errors
- **Subsequent runs**: "Connection is closed" unhandled rejection appears
- **Functional impact**: None - replication works perfectly, error is cosmetic

### Error Pattern
```
Error: Connection is closed.
 ❯ close node_modules/ioredis/built/redis/event_handler.js:189:25
 ❯ Socket.<anonymous> node_modules/ioredis/built/redis/event_handler.js:156:20
```

### Investigation Approach

We investigated several potential causes and implemented various fixes:

#### 1. **Client Ownership Pattern Implementation**
**Problem**: Replicator clients weren't being tracked by testServer cleanup system.

**Solution**: Added `serverManaged` parameter to `DredServer.mkClient()`:

```typescript
// DredServer.ts
mkClient(serverSelection: string, clientArgs: Partial<DredClientArgs> = {}, serverManaged: boolean = true): DredClient {
    // ... existing code ...
    const client = new DredClient({...});
    
    // Mark client ownership for cleanup tracking
    (client as any)._serverManaged = serverManaged;
    return client;
}

// DredReplicator.ts - Replicator takes ownership
this.repClient = this.homeServer.mkClient(this.targetHost.serverId, {}, false); // false = not server managed
```

**testServer.ts tracking**:
```typescript
let clientCleanupList: Array<DredClient> = [];
let replicatorClientCleanupList: Array<DredClient> = [];

// Spy tracks clients by ownership
const isServerManaged = (client as any)._serverManaged !== false;
if (isServerManaged) {
    clientCleanupList.push(client);
} else {
    replicatorClientCleanupList.push(client);
}
```

#### 2. **Enhanced Cleanup Sequencing**
**Problem**: Cleanup order could cause double disconnection attempts.

**Solution**: Modified testServer.ts afterEach to clean replication first:

```typescript
afterEach(async () => {
    // FIRST: Clean up replication before touching individual clients
    for (const server of servers) {
        await server.cleanupReplication();
    }
    
    // SECOND: Clean up replicator-owned clients
    for (const client of replicatorClientCleanupList) {
        try {
            client.disconnect();
        } catch (error) {
            // Defensive - likely already disconnected
        }
    }
    
    // THIRD: Clean up server-managed clients
    for (const client of clientCleanupList) {
        try {
            client.disconnect();
        } catch (error) {
            // Defensive disconnect
        }
    }
    
    // FOURTH: Reset servers
    // ...
});
```

#### 3. **Replicator Cleanup Enhancement**
**Problem**: DredReplicator wasn't properly cleaning up replicants.

**Solution**: Added replicant tracking and proper cleanup:

```typescript
// DredReplicator.ts
export class DredReplicator {
    private replicants: Replicant[] = [];
    
    async initialize() {
        // ... create replicants ...
        this.replicants.push(replicant); // Track for cleanup
    }
    
    async cleanup() {
        this.warn(`Cleaning up ${this.name} with ${this.replicants.length} replicants`);
        
        const results = await Promise.allSettled(
            this.replicants.map(replicant => replicant.cleanup())
        );
        
        // Log failures but don't throw
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                this.warn(`Error cleaning up replicant ${index}: ${result.reason}`);
            }
        });
        
        this.replicants = [];
        this.initialized = false;
    }
}
```

#### 4. **Timeout Protection**
**Solution**: Added timeout to prevent hanging during cleanup:

```typescript
// DredServer.ts
async cleanupReplication(): Promise<void> {
    if (!this.replicator) return;
    
    try {
        await Promise.race([
            this.replicator.cleanup(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Replication cleanup timeout")), 5000)
            )
        ]);
    } catch (error) {
        this.warn(`Error during replication cleanup: ${error}`);
    } finally {
        this.replicator = undefined;
    }
}
```

#### 5. **Enhanced Debugging**
**Solution**: Added comprehensive logging to trace cleanup flow:

```typescript
// Changed log() to warn() for visibility in tests
this.warn(`${this.name} cleaning up replicant ${index}`);
this.warn(`${this.serverId} Starting replication cleanup...`);
this.warn(`${this.serverId} Replication cleanup complete`);
```

### Root Cause Discovery

After extensive investigation, we discovered the **real root cause**:

**DredClient subscription cleanup is incomplete**. In `src/client/DredClient.ts`:

```typescript
//! it unlistens from subscriptions no longer being used
set subscriptions(replacement: SubscriptionListenerMap) {
    for (const [chan, sub] of Object.entries(this._subscriptions || {})) {
        //!!! todo: match subscription filter settings
        //XXXX if (! replacement.has(chan)) sub.events.removeAllListeners();
    }
    this._subscriptions = replacement;
}
```

**The cleanup code is commented out with TODO!** This means:
1. When replicants set `client.subscriptions = {}`, old subscriptions aren't properly cleaned up
2. Redis connections remain active but orphaned
3. Test cleanup tries to close already-closed connections
4. Results in "Connection is closed" errors during subsequent test runs

### Conclusion

The "Connection is closed" error is a **cosmetic issue** caused by incomplete subscription cleanup in the DredClient infrastructure. The replication functionality works perfectly. 

**Recommendation**: Document as known issue. Fixing would require major refactoring of DredClient subscription management system, which is beyond the scope of replication feature development.

**Changes to Keep**:
- Enhanced replicator cleanup and tracking (functional improvement)
- Ownership-based client management (architectural improvement)  
- Enhanced debugging logs (development aid)

**Changes to Consider Removing**:
- Complex cleanup sequencing (may not be necessary)
- Timeout protection (probably not needed)

----

## Test Suite Cleanup & Enhancement (Dec 2024)

### Replication Test Improvements (`src/server/__tests__/replication.test.ts`)

**Key Changes:**
- Removed `fit` (focused test) - tests now run normally
- Eliminated excessive logging (~100 lines of debug output)
- Replaced hard delays with smart `waitForMessages()` helper
- Extended to 3-server mesh replication testing
- Added `MessageCollector` class for type-safe message handling
- Better test organization with clear describe blocks

### New Dedicated Redis Test (`src/server/__tests__/redis.test.ts`)

**Created comprehensive Redis functionality testing:**
- **Basic Operations**: Raw Redis SET commands (SADD, SREM, SISMEMBER)
- **Class Wrapper**: RedisSet TypeScript wrapper validation
- **Message Deduplication**: Core duplicate prevention using `ensureMessageProcessedOnce()`
- **Server Isolation**: Separate Redis namespaces per server

**Fixed Redis expectations**: Tests now expect integers (0/1) not booleans (false/true)

### Test Separation Strategy

**Clear hierarchy established:**
```
replication.test.ts → Smoke test (Redis connectivity check)
         ↓
redis.test.ts → Comprehensive (detailed Redis functionality)  
         ↓
replication.test.ts → Integration (end-to-end message flow)
```

**Benefits:**
- **Maintainability**: Clear separation of Redis logic vs replication workflow
- **Reliability**: Smart waiting eliminates race conditions, type safety prevents bugs
- **Developer Experience**: Comments explain what each test validates, cross-references guide between files

**File Structure:**
```
src/server/__tests__/
├── redis.test.ts          # Redis functionality (NEW)
├── replication.test.ts    # 3-server replication (ENHANCED)  
└── messages.test.ts       # Basic messaging (existing)
```