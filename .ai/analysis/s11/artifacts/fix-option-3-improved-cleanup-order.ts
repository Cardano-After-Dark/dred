// Fix Option 3: Improved Cleanup Order in testServer.ts
// Location: src/server/testServer.ts afterEach method

afterEach(async () => {
    testLogger.debug("afterEach: cleaning up");
    
    // PHASE 1: Stop all async operations and event listeners FIRST
    testLogger.debug("afterEach: stopping async operations");
    for (const client of [...clientCleanupList, ...replicatorClientCleanupList]) {
        try {
            // If client has a cleanup method, call it first
            if (typeof (client as any).cleanup === 'function') {
                await (client as any).cleanup();
            }
        } catch (error) {
            testLogger.debug(`afterEach: client cleanup error: ${error}`);
        }
    }
    
    // PHASE 2: Clean up replication (this may have its own clients)
    for (const server of servers) {
        try {
            testLogger.debug("afterEach: cleaning up replication for server", server.serverId);
            await server.cleanupReplication();
        } catch (error) {
            testLogger.debug(`afterEach: replication cleanup error: ${error}`);
        }
    }
    
    // PHASE 3: Disconnect clients with proper error handling
    testLogger.debug("afterEach: disconnecting replicator clients");
    for (const client of replicatorClientCleanupList) {
        try {
            // Add small delay to let cleanup complete
            await new Promise(resolve => setTimeout(resolve, 10));
            client.disconnect();
        } catch (error) {
            testLogger.debug(`afterEach: replicator client disconnect error: ${error}`);
        }
    }
    replicatorClientCleanupList = [];
    
    testLogger.debug("afterEach: disconnecting server-managed clients");
    for (const client of clientCleanupList) {
        try {
            // Add small delay to let cleanup complete
            await new Promise(resolve => setTimeout(resolve, 10));
            client.disconnect();
        } catch (error) {
            testLogger.debug(`afterEach: client disconnect error: ${error}`);
        }
    }
    clientCleanupList = [];
    
    // PHASE 4: Allow event loop to process pending operations
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // PHASE 5: Reset servers and flush Redis
    for (const server of servers) {
        const redis = server?.redis;
        if (redis) {
            testLogger.debug("afterEach: resetting server", server.myServerInfo?.port);
            await server.reset(true, (redis) => {
                testLogger.debug("afterEach: flushing redis");
                redis?.flushdb("SYNC");
                testLogger.debug("afterEach: done flushing redis");
            });
        }
    }
    
    testLogger.info("  ---- cleanup done in afterEach");
});
