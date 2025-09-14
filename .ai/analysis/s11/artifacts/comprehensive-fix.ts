// Comprehensive Fix: Combines Options 2 + 3
// This is the recommended approach combining proper listener cleanup with improved cleanup order

// === Part 1: HostConnection.ts changes ===

export class HostConnection extends StateMachine.withDefinition(
    connectionStates,
    "hostconn",
) {
    // ... existing properties ...
    private _abortHandler?: () => void;
    private _destroyed = false;

    async connect(): Promise<any | never> {
        if (this.connecting) return this.connecting;

        this.abortController = new AbortController();
        const { signal } = this.abortController;
        
        // Store bound handler for proper cleanup
        this._abortHandler = () => {
            // Defensive check to prevent race condition errors
            if (!this._destroyed && this && typeof this.transition === 'function') {
                try {
                    this.transition("abort");
                } catch (error) {
                    this.logger?.warn?.('Error during abort transition:', error);
                }
            }
        };
        
        signal.addEventListener("abort", this._abortHandler);
        
        const myself = (this.connecting = new Promise((res, rej) => {
            // ... existing connect logic ...
        }));
        return myself;
    }

    disconnect(reason: string) {
        this._destroyed = true;
        
        // Clean up abort listener BEFORE aborting to prevent race condition
        if (this.abortController && this._abortHandler) {
            try {
                this.abortController.signal.removeEventListener("abort", this._abortHandler);
            } catch (error) {
                // Ignore cleanup errors
            }
            this._abortHandler = undefined;
        }
        
        // Now safe to abort
        if (this.abortController) {
            this.abortController.abort(`disconnect(): ${reason}`);
        }
        
        this.stopRetries();
    }

    // Add explicit cleanup method
    cleanup(): void {
        this._destroyed = true;
        
        if (this._abortHandler && this.abortController) {
            try {
                this.abortController.signal.removeEventListener("abort", this._abortHandler);
            } catch (error) {
                // Ignore cleanup errors
            }
            this._abortHandler = undefined;
        }
        
        this.stopRetries();
    }
}

// === Part 2: ConnectionManager.ts changes ===

export class ConnectionManager extends StateMachine.withDefinition(
    connectionManagerStates,
    "connMgr",
) {
    // ... existing code ...

    disconnect() {
        // Clean up connections with proper lifecycle management
        for (const [host, connection] of this.hostToConn.entries()) {
            try {
                // Call cleanup first if available
                if (typeof (connection as any).cleanup === 'function') {
                    (connection as any).cleanup();
                }
                
                // Then disconnect
                connection.disconnect("due to connection manager disconnect()");
                this.moveConnTo(connection, "obsolete");
            } catch (error) {
                // Log but don't fail the entire cleanup
                console.warn(`Error cleaning up connection to ${host.serverId}:`, error);
            }
        }
    }
}

// === Part 3: DredClient.ts changes ===

export class DredClient extends StateMachine.withDefinition(clientStates, "client") {
    // ... existing code ...

    // Add cleanup method
    cleanup(): void {
        try {
            // Clean up connection manager first
            if (this.connManager && typeof (this.connManager as any).cleanup === 'function') {
                (this.connManager as any).cleanup();
            }
        } catch (error) {
            // Ignore cleanup errors
        }
    }

    disconnect() {
        this.cleanup();
        this.connManager.disconnect();
    }
}

// === Part 4: testServer.ts improved cleanup ===

afterEach(async () => {
    testLogger.debug("afterEach: cleaning up");
    
    // PHASE 1: Explicit cleanup of all clients
    const allClients = [...clientCleanupList, ...replicatorClientCleanupList];
    for (const client of allClients) {
        try {
            if (typeof (client as any).cleanup === 'function') {
                await (client as any).cleanup();
            }
        } catch (error) {
            testLogger.debug(`afterEach: client cleanup error: ${error}`);
        }
    }
    
    // PHASE 2: Clean up replication
    for (const server of servers) {
        try {
            await server.cleanupReplication();
        } catch (error) {
            testLogger.debug(`afterEach: replication cleanup error: ${error}`);
        }
    }
    
    // PHASE 3: Allow event loop to process cleanup
    await new Promise(resolve => setTimeout(resolve, 25));
    
    // PHASE 4: Disconnect clients
    for (const client of allClients) {
        try {
            client.disconnect();
        } catch (error) {
            testLogger.debug(`afterEach: client disconnect error: ${error}`);
        }
    }
    
    // Clear lists
    clientCleanupList = [];
    replicatorClientCleanupList = [];
    
    // PHASE 5: Final event loop processing
    await new Promise(resolve => setTimeout(resolve, 25));
    
    // PHASE 6: Reset servers
    for (const server of servers) {
        const redis = server?.redis;
        if (redis) {
            await server.reset(true, (redis) => {
                redis?.flushdb("SYNC");
            });
        }
    }
    
    testLogger.info("  ---- cleanup done in afterEach");
});
