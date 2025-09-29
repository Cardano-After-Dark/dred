#!/usr/bin/env node
/**
 * Simple DRED replication test client
 * 
 * Tests message replication by connecting to a remote DRED server,
 * sending a message, and verifying it gets replicated to the local server.
 * 
 * Usage: node scripts/test-replication-client.js
 */

import { DredClient, StaticHostDiscovery } from "../src/client/dist/dred-client-nodejs.mjs";
import { zonedLogger } from "@poshplum/utils";

// =============================================================================
// CONFIGURATION - Change these variables to test different servers
// =============================================================================

// Server configurations (from preprod/config/ and preprod/servers.conf)
const SERVERS = {
    DE: {
        name: "DE (Germany)",
        address: "de.pp.node-01.dred.network",
        port: 443,
        serverId: "dredNode-170647b99511", // From your server logs
        nodeId: "preprod-de"
    },
    US: {
        name: "US (United States)", 
        address: "74.208.13.84",
        port: 3029,
        serverId: "dredNode-efb4a5ae1206", // Estimated from discovery logs
        nodeId: "preprod-us"
    },
    UK: {
        name: "UK (United Kingdom)",
        address: "217.154.34.155", 
        port: 3029,
        serverId: "dredNode-10d84498548a", // Estimated from discovery logs
        nodeId: "preprod-uk"
    }
};

// =============================================================================
// SELECT TARGET SERVER - Uncomment ONE of these
// =============================================================================

const TARGET_SERVER = SERVERS.DE;  // ✅ Currently working server
// const TARGET_SERVER = SERVERS.US;  // 🔄 Switch to US server
// const TARGET_SERVER = SERVERS.UK;  // 🔄 Switch to UK server

// Test configuration
const TEST_CONFIG = {
    neighborhood: "dred-dev",
    channel: "news", // Channel to send message to
    timeout: 30, // Seconds to wait for client ready
    message: {
        type: "replication-test",
        content: "Hello from replication test!"
    }
};

// =============================================================================
// TEST CLIENT IMPLEMENTATION
// =============================================================================

async function testReplication() {
    const logger = zonedLogger("test-client", {
        loggerId: "replication-test",
        color: "\u001b[36m"
    });
    
    logger.info("Starting replication test", {
        target: `${TARGET_SERVER.name} (${TARGET_SERVER.address}:${TARGET_SERVER.port})`,
        channel: TEST_CONFIG.channel,
        neighborhood: TEST_CONFIG.neighborhood
    });
    
    try {
        // Create client (simpler approach like replication tests)
        const client = new DredClient({
            discovery: new StaticHostDiscovery({
                hosts: [{
                    address: TARGET_SERVER.address,
                    port: TARGET_SERVER.port,
                    serverId: TARGET_SERVER.serverId
                }]
            }),
            neighborhood: TEST_CONFIG.neighborhood
        });

        logger.info("Client created, generating key");
        await client.generateKey();

        // Wait for ready state (simplified)
        logger.info("Waiting for client to be ready", {
            currentState: client.state,
            timeout: `${TEST_CONFIG.timeout}s`
        });

        let attempts = 0;
        while (client.state !== "ready" && attempts < TEST_CONFIG.timeout) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
            
            if (attempts % 5 === 0) { // Log every 5 seconds
                logger.info("Still waiting for ready state", {
                    currentState: client.state,
                    elapsed: `${attempts}s`,
                    remaining: `${TEST_CONFIG.timeout - attempts}s`
                });
            }
        }

        if (client.state !== "ready") {
            throw new Error(`Client failed to reach ready state after ${TEST_CONFIG.timeout}s. Current state: ${client.state}`);
        }

        logger.info("Client ready, sending test message", {
            state: client.state,
            channels: client.channels || [],
            target: `${TARGET_SERVER.name}`
        });

        // Send test message (like replication tests)
        const testId = Math.random().toString(36).substr(2, 9);
        const testMessage = {
            type: TEST_CONFIG.message.type,
            msg: JSON.stringify({
                content: TEST_CONFIG.message.content,
                timestamp: new Date().toISOString(),
                testId: testId,
                source: "test-client",
                target: TARGET_SERVER.name
            })
        };

        logger.info("Sending message to remote server", {
            channel: TEST_CONFIG.channel,
            testId: testId,
            messageType: testMessage.type
        });
        
        const response = await client.postMessage(TEST_CONFIG.channel, testMessage);
        
        logger.info("Message sent successfully", {
            testId: testId,
            response: response,
            expectation: "Check local server logs for replication message"
        });
        
        logger.info("Test completed successfully", {
            server: TARGET_SERVER.name,
            testId: testId,
            instruction: "Look for replication logs in your local DRED server"
        });
        
    } catch (error) {
        logger.error("Test failed", {
            error: error.message,
            errorType: error.name,
            server: TARGET_SERVER.name,
            phase: "replication-test"
        });
        process.exit(1);
    }
    
    process.exit(0);
}

// Graceful shutdown handlers
const shutdownLogger = zonedLogger("test-client", { loggerId: "shutdown" });

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

// Run the test
testReplication().catch(error => {
    const errorLogger = zonedLogger("test-client", { loggerId: "unhandled-error" });
    errorLogger.fatal("Unhandled error in test execution", {
        error: error.message,
        errorType: error.name,
        stack: error.stack,
        phase: "test-execution"
    });
    process.exit(1);
});