#!/usr/bin/env node
/**
 * Simple DRED client to test message replication
 * 
 * This script:
 * 1. Connects to the REMOTE DRED server (de.pp.node-01.dred.network:443)
 * 2. Sends a test message to the 'news' channel
 * 3. The message should be replicated FROM remote TO your local server
 * 4. Check local server logs for replication messages
 * 
 * Usage: node scripts/test-replication-client.js
 */

import { DredClient, StaticHostDiscovery } from "../src/client/dist/dred-client-nodejs.mjs";
import { zonedLogger } from "@poshplum/utils";

async function testReplication() {
    // Create logger following guidelines: unique loggerId, no ANSI codes in messages
    const logger = zonedLogger("test-client", {
        loggerId: "replication-test",
        color: "\x1b[36m" // cyan color for logger itself, not messages
    });
    
    logger.info("Starting replication test client", {
        target: "de.pp.node-01.dred.network:443",
        channel: "news",
        neighborhood: "dred-dev"
    });
    
    try {
        // Create client connecting to REMOTE server
        const client = new DredClient({
            discovery: new StaticHostDiscovery({
                hosts: [{ 
                    address: "de.pp.node-01.dred.network", 
                    port: 443, 
                    serverId: "dredNode-170647b99511" // Remote server ID from your logs
                }]
            }),
            neighborhood: "dred-dev", // Your neighborhood from logs
            waitFor: "ready" // Wait for client to be ready
        });

        logger.info("Creating DRED client for remote server", {
            host: "de.pp.node-01.dred.network",
            port: 443,
            serverId: "dredNode-170647b99511"
        });
        
        // Generate key for the client (required before use)
        await client.generateKey();
        
        logger.info("Client key generated, waiting for ready state", {
            currentState: client.state
        });

        // Wait for client to reach ready state
        let attempts = 0;
        const maxAttempts = 30; // 30 seconds max
        while (client.state !== "ready" && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
            logger.info("Waiting for client ready state", {
                currentState: client.state,
                attempt: attempts,
                maxAttempts: maxAttempts
            });
        }

        if (client.state !== "ready") {
            throw new Error(`Client failed to reach ready state after ${maxAttempts} seconds. Current state: ${client.state}`);
        }

        logger.info("Client is ready", {
            state: client.state,
            channels: client.channels || []
        });

        // Generate test message with structured data
        const testId = Math.random().toString(36).substr(2, 9);
        const testMessage = {
            type: "replication-test",
            msg: JSON.stringify({
                content: "Hello from replication test!",
                timestamp: new Date().toISOString(),
                testId: testId
            })
        };

        logger.info("Sending test message to remote server", {
            channel: "news",
            messageType: testMessage.type,
            testId: testId,
            timestamp: new Date().toISOString()
        });
        
        await client.postMessage("news", testMessage);
        
        logger.info("Message sent to remote server successfully", {
            channel: "news",
            testId: testId,
            expectedReplication: "Check local server logs for replication from dredNode-170647b99511"
        });
        
        // Wait a moment before closing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        logger.info("Test completed, disconnecting", {
            testId: testId,
            duration: "~3 seconds"
        });
        
    } catch (error) {
        logger.error("Test failed", {
            error: error.message,
            errorType: error.name,
            stack: error.stack,
            phase: "replication-test"
        });
        process.exit(1);
    }
    
    process.exit(0);
}

// Handle graceful shutdown - use structured logging
const shutdownLogger = zonedLogger("test-client", {
    loggerId: "shutdown"
});

process.on('SIGINT', () => {
    shutdownLogger.info("Test interrupted by user", {
        signal: "SIGINT",
        reason: "user_interrupt"
    });
    process.exit(0);
});

process.on('SIGTERM', () => {
    shutdownLogger.info("Test terminated", {
        signal: "SIGTERM",
        reason: "system_termination"
    });
    process.exit(0);
});

// Run the test - use structured logging for unhandled errors
const errorLogger = zonedLogger("test-client", {
    loggerId: "unhandled-error"
});

testReplication().catch(error => {
    errorLogger.fatal("Unhandled error in test execution", {
        error: error.message,
        errorType: error.name,
        stack: error.stack,
        phase: "test-execution"
    });
    process.exit(1);
});
