// Cross-server replication tests
// Location: src/server/__tests__/cross-server-replication.test.ts

import { beforeAll, afterAll, beforeEach, afterEach, describe, it, expect } from "vitest";
import { DredClient } from "../../client/DredClient.js";
import { StaticHostDiscovery } from "../../peers/StaticHostDiscovery.js";
import { asyncDelay } from "../../util/asyncDelay.js";
import { zonedLogger } from "@poshplum/utils";
import { colors } from "../../picocolors/picocolors.js";
import { nanoid } from "nanoid";

const { green, blue } = colors;

// Configuration for real VPS servers
const DISCOVERY_CONFIG = {
    neighborhood: "production-nbh",
    servers: [
        {
            serverId: "US",
            address: process.env.US_SERVER_IP || "us-server.example.com",
            port: parseInt(process.env.US_SERVER_PORT || "3029"),
            insecure: process.env.NODE_ENV !== "production"
        },
        {
            serverId: "UK", 
            address: process.env.UK_SERVER_IP || "uk-server.example.com",
            port: parseInt(process.env.UK_SERVER_PORT || "3029"),
            insecure: process.env.NODE_ENV !== "production"
        }
    ]
};

const REPLICATION_TIMEOUT = 10000; // 10 seconds for cross-internet replication
const CHANNEL_NAME = "news";

interface TestMessage {
    msg: string;
    type: string;
    ocid: string;
    testId?: string;
}

// Message collector for tracking received messages
class MessageCollector {
    private messages: TestMessage[] = [];
    private logger: ReturnType<typeof zonedLogger>;

    constructor(name: string) {
        this.logger = zonedLogger(`collector-${name}`, {
            loggerId: name,
            color: blue.start,
        });
    }

    getHandler(clientName: string) {
        return (msg: TestMessage) => {
            this.logger.info(`📨 Received message from ${clientName}:`, msg.msg);
            this.messages.push(msg);
        };
    }

    clear() { 
        this.messages = []; 
    }

    get count() { 
        return this.messages.length; 
    }

    get all() { 
        return [...this.messages]; 
    }

    get latest() { 
        return this.messages[this.messages.length - 1]; 
    }

    findByTestId(testId: string): TestMessage | undefined {
        return this.messages.find(m => m.testId === testId);
    }
}

// Helper to wait for specific message
async function waitForMessage(
    collector: MessageCollector, 
    testId: string, 
    timeout = REPLICATION_TIMEOUT
): Promise<TestMessage | null> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const message = collector.findByTestId(testId);
        if (message) return message;
        await asyncDelay(100);
    }
    return null;
}

const testLogger = zonedLogger("cross-replication", {
    loggerId: "cross-rep",
    color: green.start,
});

describe("Cross-Server Replication", () => {
    let usClient: DredClient;
    let ukClient: DredClient;
    let usMessages: MessageCollector;
    let ukMessages: MessageCollector;

    beforeAll(async () => {
        testLogger.info("🚀 Starting cross-server replication tests");
        
        // Create server-specific discovery configurations
        const usDiscovery = new StaticHostDiscovery({
            hosts: [DISCOVERY_CONFIG.servers.find(s => s.serverId === "US")!],
            neighborhood: DISCOVERY_CONFIG.neighborhood
        });
        
        const ukDiscovery = new StaticHostDiscovery({
            hosts: [DISCOVERY_CONFIG.servers.find(s => s.serverId === "UK")!],
            neighborhood: DISCOVERY_CONFIG.neighborhood
        });

        // Create clients
        usClient = new DredClient({
            neighborhood: DISCOVERY_CONFIG.neighborhood,
            discovery: usDiscovery,
            waitFor: "minimal",
            name: "us-replication-client"
        });

        ukClient = new DredClient({
            neighborhood: DISCOVERY_CONFIG.neighborhood,
            discovery: ukDiscovery,
            waitFor: "minimal",
            name: "uk-replication-client"
        });

        await usClient.generateKey();
        await ukClient.generateKey();

        // Wait for clients to be ready
        await usClient.once("hasChannels");
        await ukClient.once("hasChannels");

        testLogger.info("✅ Both clients connected and ready");
    });

    beforeEach(async () => {
        // Initialize message collectors
        usMessages = new MessageCollector("US");
        ukMessages = new MessageCollector("UK");

        // Subscribe to news channel on both servers
        await usClient.subscribeToChannels({
            [CHANNEL_NAME]: usMessages.getHandler("US-client")
        });

        await ukClient.subscribeToChannels({
            [CHANNEL_NAME]: ukMessages.getHandler("UK-client")
        });

        await asyncDelay(500); // Allow subscriptions to establish
        testLogger.info("📡 Subscriptions established for both clients");
    });

    afterEach(async () => {
        usMessages?.clear();
        ukMessages?.clear();
        await asyncDelay(100);
    });

    afterAll(async () => {
        await usClient?.close();
        await ukClient?.close();
        testLogger.info("🔌 Clients disconnected");
    });

    describe("US → UK Replication", () => {
        it("should replicate message from US server to UK server", async () => {
            const testId = `us-to-uk-${nanoid(8)}`;
            const testMessage: TestMessage = {
                msg: `Test message from US server: ${testId}`,
                type: "cross-server-test",
                ocid: `test-${testId}`,
                testId
            };

            testLogger.info("📤 Sending message from US server:", testMessage.msg);

            // Send message to US server
            await usClient.postMessage(CHANNEL_NAME, testMessage);
            
            // US server should NOT receive its own message (anti-loop)
            await asyncDelay(1000);
            expect(usMessages.findByTestId(testId)).toBeUndefined();
            testLogger.info("✅ US server correctly filtered own message (no loop)");

            // UK server should receive the replicated message
            const receivedMessage = await waitForMessage(ukMessages, testId);
            expect(receivedMessage).toBeDefined();
            expect(receivedMessage!.msg).toBe(testMessage.msg);
            expect(receivedMessage!.type).toBe(testMessage.type);
            
            testLogger.info("✅ UK server received replicated message");
        });
    });

    describe("UK → US Replication", () => {
        it("should replicate message from UK server to US server", async () => {
            const testId = `uk-to-us-${nanoid(8)}`;
            const testMessage: TestMessage = {
                msg: `Test message from UK server: ${testId}`,
                type: "cross-server-test",
                ocid: `test-${testId}`,
                testId
            };

            testLogger.info("📤 Sending message from UK server:", testMessage.msg);

            // Send message to UK server
            await ukClient.postMessage(CHANNEL_NAME, testMessage);
            
            // UK server should NOT receive its own message (anti-loop)
            await asyncDelay(1000);
            expect(ukMessages.findByTestId(testId)).toBeUndefined();
            testLogger.info("✅ UK server correctly filtered own message (no loop)");

            // US server should receive the replicated message
            const receivedMessage = await waitForMessage(usMessages, testId);
            expect(receivedMessage).toBeDefined();
            expect(receivedMessage!.msg).toBe(testMessage.msg);
            expect(receivedMessage!.type).toBe(testMessage.type);
            
            testLogger.info("✅ US server received replicated message");
        });
    });

    describe("Bidirectional Replication", () => {
        it("should handle simultaneous messages from both servers", async () => {
            const usTestId = `simultaneous-us-${nanoid(8)}`;
            const ukTestId = `simultaneous-uk-${nanoid(8)}`;
            
            const usMessage: TestMessage = {
                msg: `Simultaneous US message: ${usTestId}`,
                type: "simultaneous-test",
                ocid: `test-${usTestId}`,
                testId: usTestId
            };
            
            const ukMessage: TestMessage = {
                msg: `Simultaneous UK message: ${ukTestId}`,
                type: "simultaneous-test",
                ocid: `test-${ukTestId}`,
                testId: ukTestId
            };

            testLogger.info("📤 Sending simultaneous messages from both servers");

            // Send messages simultaneously
            await Promise.all([
                usClient.postMessage(CHANNEL_NAME, usMessage),
                ukClient.postMessage(CHANNEL_NAME, ukMessage)
            ]);

            // Verify cross-replication
            const ukReceivedUsMessage = await waitForMessage(ukMessages, usTestId);
            const usReceivedUkMessage = await waitForMessage(usMessages, ukTestId);

            expect(ukReceivedUsMessage).toBeDefined();
            expect(usReceivedUkMessage).toBeDefined();
            
            testLogger.info("✅ Both messages successfully replicated bidirectionally");
        });
    });

    describe("Anti-Loop Verification", () => {
        it("should prevent message loops in replication", async () => {
            const testId = `anti-loop-${nanoid(8)}`;
            const testMessage: TestMessage = {
                msg: `Anti-loop test message: ${testId}`,
                type: "anti-loop-test",
                ocid: `test-${testId}`,
                testId
            };

            // Send from US
            await usClient.postMessage(CHANNEL_NAME, testMessage);
            
            // Wait longer to see if any loops occur
            await asyncDelay(3000);
            
            // US should have 0 messages (filtered its own)
            expect(usMessages.findByTestId(testId)).toBeUndefined();
            
            // UK should have exactly 1 message (the replicated one)
            const ukMessages_filtered = ukMessages.all.filter(m => m.testId === testId);
            expect(ukMessages_filtered).toHaveLength(1);
            
            testLogger.info("✅ Anti-loop working: no message multiplication detected");
        });
    });
}); 