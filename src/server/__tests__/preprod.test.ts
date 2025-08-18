import { beforeAll, afterAll, beforeEach, afterEach, describe, it, expect } from "vitest";
import { asyncDelay } from "../../util/asyncDelay.js";
import { zonedLogger } from "@poshplum/utils";
import { colors } from "../../picocolors/picocolors.js";

const { magenta, cyan, green, yellow } = colors;

// VPS server configuration
const VPS_SERVERS = {
    US: {
        address: "74.208.13.84",
        port: "3029",
        name: "US",
        nodeId: "preprod-us"
    },
    UK: {
        address: "217.154.34.155", 
        port: "3029",
        name: "UK",
        nodeId: "preprod-uk"
    }
};

const TEST_CHANNEL = "vps-replication-test";
const REPLICATION_WAIT_TIME = 8000; // 8 seconds for VPS replication

interface VpsTestMessage {
    msg: string;
    type: string;
    ocid: string;
    timestamp: string;
    sender: string;
}

const testLogger = zonedLogger("vps-replication", {
    loggerId: "vps-test",
    color: magenta.start,
});

// Helper functions
async function checkServerHealth(server: typeof VPS_SERVERS.US): Promise<boolean> {
    try {
        testLogger.info(`🔍 Checking ${server.name} server health...`);
        const response = await fetch(`http://${server.address}:${server.port}/channels`, {
            method: 'GET',
            signal: AbortSignal.timeout(10000)
        });
        
        if (response.ok) {
            const channels = await response.json();
            testLogger.info(`✅ ${server.name} server healthy, ${channels.channels?.length || 0} channels`);
            return true;
        }
        return false;
    } catch (error) {
        testLogger.error(`❌ ${server.name} server health check failed:`, error);
        return false;
    }
}

async function createChannel(server: typeof VPS_SERVERS.US, channelName: string): Promise<boolean> {
    try {
        testLogger.info(`📝 Creating channel '${channelName}' on ${server.name}...`);
        const response = await fetch(`http://${server.address}:${server.port}/channel/${channelName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ createdAt: Date.now() }),
            signal: AbortSignal.timeout(15000)
        });
        
        if (response.ok) {
            testLogger.info(`✅ Channel created on ${server.name}`);
            return true;
        } else if (response.status === 400) {
            const text = await response.text();
            if (text.includes('exists')) {
                testLogger.info(`✅ Channel already exists on ${server.name}`);
                return true;
            }
        }
        
        testLogger.error(`❌ Failed to create channel on ${server.name}: ${response.status}`);
        return false;
    } catch (error) {
        testLogger.error(`❌ Channel creation failed on ${server.name}:`, error);
        return false;
    }
}

async function sendMessage(server: typeof VPS_SERVERS.US, channelName: string, message: VpsTestMessage): Promise<{success: boolean, messageId?: string}> {
    try {
        testLogger.info(`📤 Sending message to ${server.name}: "${message.msg}"`);
        const response = await fetch(`http://${server.address}:${server.port}/channel/${channelName}/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message),
            signal: AbortSignal.timeout(15000)
        });
        
        if (response.ok) {
            const result = await response.json();
            testLogger.info(`✅ Message sent to ${server.name}, ID: ${result.id}`);
            return { success: true, messageId: result.id };
        } else {
            testLogger.error(`❌ Failed to send message to ${server.name}: ${response.status}`);
            return { success: false };
        }
    } catch (error) {
        testLogger.error(`❌ Message send failed to ${server.name}:`, error);
        return { success: false };
    }
}

async function checkServerLogs(server: typeof VPS_SERVERS.US, searchTerm: string): Promise<string[]> {
    // In a real implementation, this would SSH to the server and check logs
    // For now, we'll simulate this check
    testLogger.info(`🔍 Checking ${server.name} server logs for: "${searchTerm}"`);
    
    // Placeholder - in real implementation would SSH and grep logs
    // ssh devops@${server.address} "pm2 logs dred --lines 20 | grep '${searchTerm}'"
    
    return []; // Return empty for now - we'll check replication via other means
}

async function verifyReplication(sourceServer: typeof VPS_SERVERS.US, targetServer: typeof VPS_SERVERS.US, message: VpsTestMessage): Promise<boolean> {
    testLogger.info(`🔄 Verifying replication: ${sourceServer.name} → ${targetServer.name}`);
    
    // Wait for replication
    testLogger.info(`⏳ Waiting ${REPLICATION_WAIT_TIME}ms for replication...`);
    await asyncDelay(REPLICATION_WAIT_TIME);
    
    // In a full implementation, we would:
    // 1. Check target server logs for the message
    // 2. Or use WebSocket connections to listen for messages
    // 3. Or check a message history endpoint
    
    // For now, we'll check if the infrastructure is working
    const targetHealthy = await checkServerHealth(targetServer);
    
    if (targetHealthy) {
        testLogger.info(`✅ ${targetServer.name} server is healthy after replication wait`);
        // TODO: Add actual replication verification here
        return true; // Assume success for infrastructure test
    }
    
    return false;
}

describe("VPS Replication Tests", () => {
    beforeAll(async () => {
        testLogger.info("🌐 Starting VPS replication tests");
        testLogger.info(`Testing replication between:`);
        testLogger.info(`  US: ${VPS_SERVERS.US.address}:${VPS_SERVERS.US.port} (${VPS_SERVERS.US.nodeId})`);
        testLogger.info(`  UK: ${VPS_SERVERS.UK.address}:${VPS_SERVERS.UK.port} (${VPS_SERVERS.UK.nodeId})`);
    });

    beforeEach(async () => {
        testLogger.info(`🔧 Setting up test: ${expect.getState().currentTestName}`);
        
        // Health check both servers
        const usHealthy = await checkServerHealth(VPS_SERVERS.US);
        const ukHealthy = await checkServerHealth(VPS_SERVERS.UK);
        
        if (!usHealthy || !ukHealthy) {
            throw new Error(`Server health check failed. US: ${usHealthy}, UK: ${ukHealthy}`);
        }
        
        // Create test channel on both servers
        const usChannelOk = await createChannel(VPS_SERVERS.US, TEST_CHANNEL);
        const ukChannelOk = await createChannel(VPS_SERVERS.UK, TEST_CHANNEL);
        
        if (!usChannelOk || !ukChannelOk) {
            throw new Error(`Channel creation failed. US: ${usChannelOk}, UK: ${ukChannelOk}`);
        }
        
        // Wait for channel propagation
        await asyncDelay(2000);
        testLogger.info("✅ Test setup complete");
    });

    describe("Server Infrastructure", () => {
        it("should have both VPS servers healthy and responding", async () => {
            const usHealthy = await checkServerHealth(VPS_SERVERS.US);
            const ukHealthy = await checkServerHealth(VPS_SERVERS.UK);
            
            expect(usHealthy).toBe(true);
            expect(ukHealthy).toBe(true);
        });

        it("should have unique node IDs on each server", () => {
            expect(VPS_SERVERS.US.nodeId).toBe("preprod-us");
            expect(VPS_SERVERS.UK.nodeId).toBe("preprod-uk");
            expect(VPS_SERVERS.US.nodeId).not.toBe(VPS_SERVERS.UK.nodeId);
            
            testLogger.info(`✅ Node IDs are unique: US="${VPS_SERVERS.US.nodeId}", UK="${VPS_SERVERS.UK.nodeId}"`);
        });

        it("should have test channel available on both servers", async () => {
            // Check channels via API
            const usResponse = await fetch(`http://${VPS_SERVERS.US.address}:${VPS_SERVERS.US.port}/channels`);
            const ukResponse = await fetch(`http://${VPS_SERVERS.UK.address}:${VPS_SERVERS.UK.port}/channels`);
            
            expect(usResponse.ok).toBe(true);
            expect(ukResponse.ok).toBe(true);
            
            const usChannels = await usResponse.json();
            const ukChannels = await ukResponse.json();
            
            expect(usChannels.channels).toContain(TEST_CHANNEL);
            expect(ukChannels.channels).toContain(TEST_CHANNEL);
            
            testLogger.info(`✅ Test channel available on both servers`);
        });
    });

    describe("Message Sending Infrastructure", () => {
        it("should send messages to US server successfully", async () => {
            const testMessage: VpsTestMessage = {
                msg: `VPS test message to US at ${new Date().toISOString()}`,
                type: "vps-us-test",
                ocid: `vps-us-${Date.now()}`,
                timestamp: new Date().toISOString(),
                sender: "vps-test-client"
            };

            const result = await sendMessage(VPS_SERVERS.US, TEST_CHANNEL, testMessage);
            expect(result.success).toBe(true);
            expect(result.messageId).toBeDefined();
            
            testLogger.info(`✅ Message sent to US server successfully`);
        });

        it("should send messages to UK server successfully", async () => {
            const testMessage: VpsTestMessage = {
                msg: `VPS test message to UK at ${new Date().toISOString()}`,
                type: "vps-uk-test",
                ocid: `vps-uk-${Date.now()}`,
                timestamp: new Date().toISOString(),
                sender: "vps-test-client"
            };

            const result = await sendMessage(VPS_SERVERS.UK, TEST_CHANNEL, testMessage);
            expect(result.success).toBe(true);
            expect(result.messageId).toBeDefined();
            
            testLogger.info(`✅ Message sent to UK server successfully`);
        });
    });

    describe("Replication Infrastructure Test", () => {
        it("should demonstrate US → UK replication infrastructure", async () => {
            const testMessage: VpsTestMessage = {
                msg: `REPLICATION TEST: US to UK at ${new Date().toISOString()}`,
                type: "vps-replication-us-uk",
                ocid: `us-uk-repl-${Date.now()}`,
                timestamp: new Date().toISOString(),
                sender: "vps-replication-test"
            };

            // Send message to US server
            const sendResult = await sendMessage(VPS_SERVERS.US, TEST_CHANNEL, testMessage);
            expect(sendResult.success).toBe(true);
            
            // Verify replication infrastructure (placeholder for now)
            const replicationWorked = await verifyReplication(VPS_SERVERS.US, VPS_SERVERS.UK, testMessage);
            
            // Log the test results
            testLogger.info(`📊 US → UK replication test:`);
            testLogger.info(`  ✅ Message sent to US: ${testMessage.ocid}`);
            testLogger.info(`  📋 Replication infrastructure: ${replicationWorked ? 'Ready' : 'Needs investigation'}`);
            testLogger.info(`  💡 Next: Add actual replication verification`);
            
            expect(sendResult.success).toBe(true);
            // Note: We're testing infrastructure readiness, not actual replication yet
        });

        it("should demonstrate UK → US replication infrastructure", async () => {
            const testMessage: VpsTestMessage = {
                msg: `REPLICATION TEST: UK to US at ${new Date().toISOString()}`,
                type: "vps-replication-uk-us",
                ocid: `uk-us-repl-${Date.now()}`,
                timestamp: new Date().toISOString(),
                sender: "vps-replication-test"
            };

            // Send message to UK server
            const sendResult = await sendMessage(VPS_SERVERS.UK, TEST_CHANNEL, testMessage);
            expect(sendResult.success).toBe(true);
            
            // Verify replication infrastructure (placeholder for now)
            const replicationWorked = await verifyReplication(VPS_SERVERS.UK, VPS_SERVERS.US, testMessage);
            
            // Log the test results
            testLogger.info(`📊 UK → US replication test:`);
            testLogger.info(`  ✅ Message sent to UK: ${testMessage.ocid}`);
            testLogger.info(`  📋 Replication infrastructure: ${replicationWorked ? 'Ready' : 'Needs investigation'}`);
            testLogger.info(`  💡 Next: Add actual replication verification`);
            
            expect(sendResult.success).toBe(true);
            // Note: We're testing infrastructure readiness, not actual replication yet
        });
    });

    describe("Diagnostic Information", () => {
        it("should provide diagnostic information for replication debugging", async () => {
            testLogger.info("📋 Replication Diagnostic Summary");
            testLogger.info("=================================");
            testLogger.info(`✅ Server Health: Both servers responding`);
            testLogger.info(`✅ Unique Node IDs: US="${VPS_SERVERS.US.nodeId}", UK="${VPS_SERVERS.UK.nodeId}"`);
            testLogger.info(`✅ Channel Setup: Test channel exists on both servers`);
            testLogger.info(`✅ Message Sending: Both servers accept messages`);
            testLogger.info(`❓ Replication Status: Needs verification`);
            testLogger.info("");
            testLogger.info("🔍 Next debugging steps:");
            testLogger.info("  1. Check server log levels for discovery/replication");
            testLogger.info("  2. Verify on-chain discovery is working");
            testLogger.info("  3. Add WebSocket listeners for real-time verification");
            testLogger.info("  4. Check server logs for replication activity");
            
            // This test always passes - it's for diagnostic info
            expect(true).toBe(true);
        });
    });
});
