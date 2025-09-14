// Improved Test Server Cleanup Sequence
// Location: src/server/testServer.ts

afterEach(async () => {
    testLogger.debug("afterEach: cleaning up");
    
    // PHASE 1: Clean up replication first (these may have their own clients)
    testLogger.debug("afterEach: phase 1 - cleaning up replication");
    for (const server of servers) {
        try {
            testLogger.debug("afterEach: cleaning up replication for server", server.serverId);
            await server.cleanupReplication();
        } catch (error) {
            testLogger.debug(`afterEach: replication cleanup error: ${error}`);
        }
    }
    
    // PHASE 2: Disconnect all clients and wait for disconnection to complete
    testLogger.debug("afterEach: phase 2 - disconnecting clients");
    const allClients = [...clientCleanupList, ...replicatorClientCleanupList];
    
    // Disconnect all clients
    for (const client of allClients) {
        try {
            testLogger.debug(`afterEach: disconnecting client ${client.clientid || 'unknown'}`);
            client.disconnect();
        } catch (error) {
            testLogger.debug(`afterEach: client disconnect error: ${error}`);
        }
    }
    
    // CRITICAL: Wait for all async disconnect operations to complete
    testLogger.debug("afterEach: waiting for disconnect operations to complete");
    await new Promise(resolve => setTimeout(resolve, 100)); // Give time for abort signals to process
    
    // Clear client lists
    clientCleanupList.length = 0;
    replicatorClientCleanupList.length = 0;
    
    // PHASE 3: Now safe to reset servers and flush Redis
    testLogger.debug("afterEach: phase 3 - resetting servers");
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
