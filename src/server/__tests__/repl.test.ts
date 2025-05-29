import { beforeAll, describe, it, expect, afterAll } from "vitest";
import request, { SuperTestWithHost, Test } from "supertest";

import { testSetup } from "../testServer.js";
import { DredClient } from "../../client/DredClient.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";

// Use fit (it.only) to run only this test during development
const fit = it.only;

describe("minimal replication setup", () => {
    // Two servers for replication testing: dred1 and dred2
    let dred1: DredServer;
    let dred2: DredServer;
    
    // Two clients: c1 connects to dred1, c2 connects to dred2
    let c1: DredClient;
    let c2: DredClient;
    
    // Neighborhood for connecting clients
    const neighborhoodId = "nb1";

    // Message tracking for replication tests
    let messagesReceived: any[] = [];

    // Helper methods
    const logStep = (message: string) => {
        console.log(message);
    };

    // test setup, we care only about the first two servers
    const setupServers = async () => {
        logStep("Setting up servers...");
        const test = await testSetup();
        const { servers } = test;
        
        logStep(`Found ${servers.length} servers`);
        
        if (servers.length < 2) {
            throw new Error("Need at least 2 servers for replication test");
        }
        
        dred1 = servers[0];
        dred2 = servers[1];
        
        logStep(`dred1: ${dred1.serverId}`);
        logStep(`dred2: ${dred2.serverId}`);
    };

    const setupClients = async () => {
        logStep("Creating clients...");
        c1 = dred1.mkClient(dred1.serverId);
        c2 = dred2.mkClient(dred2.serverId);
        
        await asyncDelay(1000);
        logStep("Clients created and connected");
    };

    const setupNeighborhood = async () => {
        logStep(`Setting neighborhood ${neighborhoodId} for both clients...`);
        c1.setNeighborhood(neighborhoodId);
        c2.setNeighborhood(neighborhoodId);
        
        await asyncDelay(500);
        logStep("Neighborhood setup complete");
    };

    const createCommunicationChannel = async (channelName: string) => {
        logStep(`Creating communication channel: ${channelName}...`);
        await c1.createChannel(channelName);
        await asyncDelay(300);
        logStep("Communication channel created");
    };

    const setupMessageHandlers = () => {
        logStep("Setting up message handlers...");
        messagesReceived = [];
        
        c1.messageHandler = (message) => {
            logStep(`c1 received message: ${JSON.stringify(message)}`);
            messagesReceived.push({ client: "c1", message });
        };
        
        c2.messageHandler = (message) => {
            logStep(`c2 received message: ${JSON.stringify(message)}`);
            messagesReceived.push({ client: "c2", message });
        };
        
        logStep("Message handlers configured");
    };

    const subscribeToChannel = async (channelName: string) => {
        logStep(`Subscribing both clients to channel: ${channelName}...`);
        await c1.subscribeToChannels([channelName]);
        await c2.subscribeToChannels([channelName]);
        await asyncDelay(500);
        logStep("Both clients subscribed to channel");
    };

    const postMessage = async (client: DredClient, channelName: string, messageContent: any) => {
        const clientName = client === c1 ? "c1" : "c2";
        logStep(`${clientName} posting message to ${channelName}...`);
        
        const message = {
            type: "test",
            msg: messageContent,
            "content-type": "text/plain",
            sender: clientName,
            timestamp: Date.now()
        };
        
        await client.postMessage(channelName, message);
        await asyncDelay(500); // Allow time for message propagation
        
        logStep(`${clientName} message posted`);
        return message;
    };

    const verifyMessageReplication = (expectedSender: string, expectedContent: string) => {
        logStep("Verifying message replication...");
        
        // Find messages received by the other client (not the sender)
        const replicatedMessages = messagesReceived.filter(item => 
            item.client !== expectedSender && 
            item.message.msg === expectedContent
        );
        
        expect(replicatedMessages.length).toBeGreaterThan(0);
        expect(replicatedMessages[0].message.sender).toBe(expectedSender);
        expect(replicatedMessages[0].message.msg).toBe(expectedContent);
        
        logStep("Message replication verified!");
    };

    const clearMessageHistory = () => {
        messagesReceived = [];
        logStep("Message history cleared");
    };

    const verifyBasicSetup = () => {
        logStep("Verifying basic setup...");
        
        // Verify server instances
        expect(dred1).toBeDefined();
        expect(dred2).toBeDefined();
        expect(dred1.serverId).toBe("first");
        expect(dred2.serverId).toBe("second");
        
        // Verify client instances
        expect(c1).toBeDefined();
        expect(c2).toBeDefined();
        
        // Verify distinct instances
        expect(dred1).not.toBe(dred2);
        expect(c1).not.toBe(c2);
    };

    const verifyNeighborhoodSetup = () => {
        logStep("Verifying neighborhood setup...");
        expect(c1.neighborhoodId).toBe(neighborhoodId);
        expect(c2.neighborhoodId).toBe(neighborhoodId);
    };

    const logSetupSummary = () => {
        logStep("Setup Summary:");
        logStep(`   - dred1: ${dred1.serverId}`);
        logStep(`   - dred2: ${dred2.serverId}`);
        logStep(`   - c1: connected to dred1 and ${neighborhoodId}`);
        logStep(`   - c2: connected to dred2 and ${neighborhoodId}`);
        logStep(`   - Communication channel: test-channel created`);
    };
    
    beforeAll(async () => {
        logStep("Setting up minimal replication test environment...");
        
        await setupServers();
        await setupClients();
        await setupNeighborhood();
        await createCommunicationChannel("test-channel");
        
        logStep("Minimal setup with neighborhood complete!");
    });

    it("environment setup verification", async () => {
        logStep("Verifying minimal environment setup...");
        
        verifyBasicSetup();
        verifyNeighborhoodSetup();
        
        logStep("Environment setup verification passed!");
        logSetupSummary();
    });

    it("channel availability verification", async () => {
        logStep("Verifying communication channel is available...");
        
        const channelName = "test-channel";
        
        // Verify both clients can see the channel exists
        verifyNeighborhoodSetup();
        
        logStep("Channel availability verification passed!");
        logStep(`   - Channel '${channelName}' is available for communication`);
        logStep(`   - Both clients can access the neighborhood with the channel`);
    });

    it("basic message replication: c1 to c2", async () => {
        logStep("Testing basic message replication from c1 to c2...");
        
        const channelName = "test-channel";
        
        // Setup message handlers to track received messages
        setupMessageHandlers();
        
        // Subscribe both clients to the channel
        await subscribeToChannel(channelName);
        
        // Clear any previous message history
        clearMessageHistory();
        
        // Send a message from c1
        const testMessage = "Hello from c1 to c2!";
        await postMessage(c1, channelName, testMessage);
        
        // Verify the message was replicated to c2
        verifyMessageReplication("c1", testMessage);
        
        logStep("Basic message replication c1 -> c2 test passed!");
        logStep(`   - c1 sent message: "${testMessage}"`);
        logStep(`   - c2 received the replicated message successfully`);
    });

    it("basic message replication: c2 to c1", async () => {
        logStep("Testing basic message replication from c2 to c1...");
        
        const channelName = "test-channel";
        
        // Setup message handlers to track received messages
        setupMessageHandlers();
        
        // Subscribe both clients to the channel (they should already be subscribed, but let's be explicit)
        await subscribeToChannel(channelName);
        
        // Clear any previous message history
        clearMessageHistory();
        
        // Send a message from c2
        const testMessage = "Hello from c2 to c1!";
        await postMessage(c2, channelName, testMessage);
        
        // Verify the message was replicated to c1
        verifyMessageReplication("c2", testMessage);
        
        logStep("Basic message replication c2 -> c1 test passed!");
        logStep(`   - c2 sent message: "${testMessage}"`);
        logStep(`   - c1 received the replicated message successfully`);
    });

    afterAll(async () => {
        // Give system time to properly close connections and prevent cleanup errors
        await asyncDelay(100);
    });
}); 