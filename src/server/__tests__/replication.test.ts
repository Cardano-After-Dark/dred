import { beforeAll, afterAll, beforeEach, afterEach, describe, it, vi, expect } from "vitest";
import request, { SuperTestWithHost, Test } from "supertest";
import { Express } from "express";

import { testSetup } from "../testServer.js";
import { DredClient } from "../../client/DredClient.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";
import { zonedLogger } from "@poshplum/utils";
import { colors } from "../../picocolors/picocolors.js";
import { inspect } from 'util';

const { magenta } = colors;

// Test configuration
const CHANNEL_NAME = "test-channel";
const REPLICATION_TIMEOUT = 2000;
const SETUP_DELAY = 100;

interface TestMessage {
    msg: string;
    type: string;
    ocid?: string;
    details?: {
        replicatedFrom?: string;
    };
}

class MessageCollector {
    private messages: TestMessage[] = [];

    getHandler(clientName: string) {
        return (msg: TestMessage) => {
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
}

// Helper to wait for expected message count
async function waitForMessages(collector: MessageCollector, expectedCount: number, timeout = REPLICATION_TIMEOUT): Promise<void> {
    const startTime = Date.now();
    while (collector.count < expectedCount && Date.now() - startTime < timeout) {
        await asyncDelay(50);
    }
}

describe("Message Replication", () => {
    let test: {
        agent: SuperTestWithHost<Test>;
        app?: Express;
        server: DredServer;
        client: DredClient;
        servers: DredServer[];
    };

    let dred1: DredServer;
    let dred2: DredServer;
    let dred3: DredServer;
    let c1: DredClient;
    let c2: DredClient;
    let c3: DredClient;

    // Message collectors for each client
    let c1Messages: MessageCollector;
    let c2Messages: MessageCollector;
    let c3Messages: MessageCollector;

    const testLogger = zonedLogger("test", {
        loggerId: "t-rep",
        color: magenta.start,
    });

    beforeAll(async () => {
        test = await testSetup();
        dred1 = test.servers[0];
        dred2 = test.servers[1];
        dred3 = test.servers[2];
    });

    beforeEach(async () => {
        await asyncDelay(SETUP_DELAY);

        // Create clients
        c1 = dred1.mkClient("first");
        await c1.generateKey();

        c2 = dred2.mkClient("second");
        await c2.generateKey();

        c3 = dred3.mkClient("third");
        await c3.generateKey();

        // Create channels on all servers
        await c1.createChannel(CHANNEL_NAME);
        await c2.createChannel(CHANNEL_NAME);
        await c3.createChannel(CHANNEL_NAME);

        // Refresh channel lists
        c1.channels = await c1.connManager.getChannelList();
        c2.channels = await c2.connManager.getChannelList();
        c3.channels = await c3.connManager.getChannelList();

        // Initialize message collectors
        c1Messages = new MessageCollector();
        c2Messages = new MessageCollector();
        c3Messages = new MessageCollector();

        // Subscribe to channels
        await c1.subscribeToChannels({
            [CHANNEL_NAME]: c1Messages.getHandler("c1")
        });
        await c2.subscribeToChannels({
            [CHANNEL_NAME]: c2Messages.getHandler("c2")
        });
        await c3.subscribeToChannels({
            [CHANNEL_NAME]: c3Messages.getHandler("c3")
        });

        await asyncDelay(SETUP_DELAY);
    });

    afterEach(async () => {
        // Clean up message collectors
        c1Messages?.clear();
        c2Messages?.clear();
        c3Messages?.clear();
        
        // Note: Client cleanup handled by test framework
    });

    afterAll(async () => {
        await asyncDelay(SETUP_DELAY);
    });

    describe("Setup Validation", () => {
        it("should have properly configured servers and clients", async () => {
            expect(dred1).toBeDefined();
            expect(dred2).toBeDefined();
            expect(dred3).toBeDefined();
            expect(dred1.serverId).toBe("first");
            expect(dred2.serverId).toBe("second");
            expect(dred3.serverId).toBe("third");
            expect(dred1).not.toBe(dred2);
            expect(dred2).not.toBe(dred3);
            expect(dred1).not.toBe(dred3);

            expect(c1).toBeDefined();
            expect(c2).toBeDefined();
            expect(c3).toBeDefined();
            expect(c1).not.toBe(c2);
            expect(c2).not.toBe(c3);
            expect(c1).not.toBe(c3);

            expect(c1.channels).toContain(CHANNEL_NAME);
            expect(c2.channels).toContain(CHANNEL_NAME);
            expect(c3.channels).toContain(CHANNEL_NAME);
        });
    });

    describe("Basic Messaging", () => {
        it("should deliver messages within the same server", async () => {
            const testMessage = {
                msg: "Hello from test!",
                type: "greeting",
                ocid: "test-001"
            };

            const response = await test.agent
                .post(`/channel/${CHANNEL_NAME}/message`)
                .send(testMessage)
                .expect(200);

            await waitForMessages(c1Messages, 1, 500);

            expect(c1Messages.count).toBe(1);
            expect(c1Messages.latest.type).toBe("greeting");
            expect(c2Messages.count).toBe(0); // Different server, no replication yet
            expect(c3Messages.count).toBe(0); // Different server, no replication yet
        });
    });

    describe("Cross-Server Replication", () => {
        it("should replicate messages between all three servers", async () => {
            // Setup replication on all servers
            for (const server of [dred1, dred2, dred3]) {
                await server.setupReplication();
            }

            const clientMessage: TestMessage = {
                msg: "Hello from c1 client!",
                type: "client-greeting"
            };

            const clientResponse = await c1.postMessage(CHANNEL_NAME, clientMessage);
            testLogger.warn(`📤 CLIENT c1 sent: ${clientMessage.msg}`);

            // Wait for replication to both other servers
            await waitForMessages(c2Messages, 1);
            await waitForMessages(c3Messages, 1);

            // Verify replication: c2 and c3 should receive the replicated message
            expect(c2Messages.count).toBe(1);
            expect(c2Messages.latest).toMatchObject({
                msg: "Hello from c1 client!",
                type: "client-greeting"
            });

            expect(c3Messages.count).toBe(1);
            expect(c3Messages.latest).toMatchObject({
                msg: "Hello from c1 client!",
                type: "client-greeting"
            });

            // Verify anti-loop: c1 should not receive its own message back
            expect(c1Messages.count).toBe(0);
        });

        it("should replicate from any server to all others", async () => {
            // Setup replication on all servers
            for (const server of [dred1, dred2, dred3]) {
                await server.setupReplication();
            }

            const messageFromServer2: TestMessage = {
                msg: "Message from server 2!",
                type: "server2-message"
            };

            // Send message from c2 (connected to dred2)
            await c2.postMessage(CHANNEL_NAME, messageFromServer2);
            testLogger.warn(`📤 CLIENT c2 sent: ${messageFromServer2.msg}`);

            // Wait for replication to the other servers
            await waitForMessages(c1Messages, 1);
            await waitForMessages(c3Messages, 1);

            // Verify c1 and c3 received the message from c2
            expect(c1Messages.count).toBe(1);
            expect(c1Messages.latest).toMatchObject({
                msg: "Message from server 2!",
                type: "server2-message"
            });

            expect(c3Messages.count).toBe(1);
            expect(c3Messages.latest).toMatchObject({
                msg: "Message from server 2!",
                type: "server2-message"
            });

            // Verify anti-loop: c2 should not receive its own message back
            expect(c2Messages.count).toBe(0);
        });
    });
});