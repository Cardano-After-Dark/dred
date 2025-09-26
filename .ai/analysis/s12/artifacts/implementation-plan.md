# Implementation Plan: Always-On Replication with Retry

## Design Decisions (User Approved)
- **Always-on**: Replication enabled by default
- **Environment override**: `DISABLE_REPLICATION=true` to disable
- **Retry strategy**: 1-minute intervals on failure
- **Test readiness**: Event/message when replication ready

## Implementation Architecture

### 1. DredServer Auto-Replication
```typescript
class DredServer {
    replicationStatus: 'disabled' | 'starting' | 'ready' | 'retrying' = 'disabled';
    private replicationRetryTimer?: NodeJS.Timeout;
    private readonly RETRY_INTERVAL = 60000; // 1 minute
    
    async listen() {
        // ... existing listen logic
        
        // Start auto-replication unless disabled
        if (!this.isReplicationDisabled()) {
            this.startAutoReplication();
        }
        
        return this.myServerInfo;
    }
    
    private isReplicationDisabled(): boolean {
        return process.env.DISABLE_REPLICATION === 'true';
    }
    
    private startAutoReplication() {
        this.replicationStatus = 'starting';
        this.log("Starting auto-replication...");
        this.attemptReplication();
    }
    
    private async attemptReplication() {
        try {
            await asyncDelay(1000); // Network stability
            await this.setupReplication();
            this.replicationStatus = 'ready';
            this.log("✅ Auto-replication ready");
            
            // Emit readiness event for tests
            this.emit('replicationReady', { serverId: this.serverId });
            
        } catch (error) {
            this.warn(`❌ Replication failed: ${error.message}`);
            this.scheduleRetry();
        }
    }
    
    private scheduleRetry() {
        this.replicationStatus = 'retrying';
        this.replicationRetryTimer = setTimeout(() => {
            this.log("🔄 Retrying replication setup...");
            this.attemptReplication();
        }, this.RETRY_INTERVAL);
    }
    
    // Clean up retry timer during shutdown
    async close() {
        if (this.replicationRetryTimer) {
            clearTimeout(this.replicationRetryTimer);
        }
        // ... existing close logic
    }
}
```

### 2. Test Helper for Replication Readiness
```typescript
// In testServer.ts
export async function waitForReplicationReady(
    servers: DredServer[], 
    timeout = 10000
): Promise<void> {
    const promises = servers.map(server => 
        new Promise<void>((resolve, reject) => {
            if (server.replicationStatus === 'ready') {
                resolve();
                return;
            }
            
            const timer = setTimeout(() => {
                reject(new Error(`Replication not ready for ${server.serverId}`));
            }, timeout);
            
            server.once('replicationReady', () => {
                clearTimeout(timer);
                resolve();
            });
        })
    );
    
    await Promise.all(promises);
    testLogger.info("✅ All servers have replication ready");
}
```

### 3. newrep.test.ts Structure
```typescript
describe("Auto-Replication at Startup", () => {
    beforeEach(async () => {
        // Servers start with auto-replication
        // Wait for all replications to be ready
        await waitForReplicationReady([dred1, dred2, dred3]);
        
        // Now safe to create clients and run tests
        // ... client setup
    });
    
    it("should have replication ready immediately after server startup", async () => {
        expect(dred1.replicationStatus).toBe('ready');
        expect(dred2.replicationStatus).toBe('ready'); 
        expect(dred3.replicationStatus).toBe('ready');
    });
    
    it("should replicate messages without manual setupReplication call", async () => {
        // Test message replication works automatically
        // ... test logic
    });
});
```

## Implementation Steps

### Phase 1: Core Auto-Replication
1. Add replication status tracking to DredServer
2. Add auto-replication startup in `listen()` method
3. Add retry mechanism with 1-minute intervals
4. Add environment variable check (`DISABLE_REPLICATION`)

### Phase 2: Event System
1. Make DredServer extend EventEmitter (or add event capability)
2. Emit `replicationReady` event when setup completes
3. Add proper cleanup for retry timers

### Phase 3: Test Infrastructure
1. Add `waitForReplicationReady()` helper to testServer
2. Create newrep.test.ts with auto-replication tests
3. Verify backward compatibility with existing tests

### Phase 4: Production Features
1. Add replication status endpoint (`/api/replication/status`)
2. Add metrics/logging for retry attempts
3. Consider exponential backoff for retries (future enhancement)

## Environment Variables
- `DISABLE_REPLICATION=true` - Disables auto-replication startup
- `REPLICATION_RETRY_INTERVAL=60000` - Retry interval in ms (optional)

## Backward Compatibility
- Existing `setupReplication()` method remains unchanged
- Manual calls to `setupReplication()` are idempotent (safe if already running)
- Existing tests unaffected (they don't rely on auto-replication)
