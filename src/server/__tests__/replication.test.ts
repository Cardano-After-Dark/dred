import { beforeAll, afterAll, describe, it, expect } from "vitest";
import request from "supertest";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";
import { StaticHostDiscovery } from "../../peers/StaticHostDiscovery.js";

/**
 * This test verifies message replication between two Dred servers.
 * 
 * Instead of using the testSetup which creates 3 servers, we'll manually
 * create just 2 servers with minimal configuration for more predictable behavior.
 */
describe("message replication", () => {
    // Create servers directly instead of using testSetup
    const servers: DredServer[] = [];
    
    // Set up two servers with different ports and Redis DBs
    beforeAll(async () => {
        console.log("Setting up replication test with 2 servers");
        
        // Prepare host list for discovery - include port information which is critical
        const hostList = [
            { serverId: "server1", address: "localhost", port: "54032", insecure: true },
            { serverId: "server2", address: "localhost", port: "54033", insecure: true }
        ];
        
        // Create a single shared discovery instance for both servers and clients
        // This helps ensure the host list is consistent across all components
        const discovery = new StaticHostDiscovery({ hosts: hostList });
        
        try {
            // Server 1 
            const server1 = new DredServer(
                { 
                    neighborhood: "cardano-after-dark",
                    waitFor: "any", // Required by DredClientArgs
                    discovery: discovery // Pass discovery during creation
                }, 
                "server1", 
                10 // Use DB 10 for isolation
            );
            // Ensure discovery is set
            server1.discovery = discovery;
            servers.push(server1);
            
            // Server 2
            const server2 = new DredServer(
                { 
                    neighborhood: "cardano-after-dark",
                    waitFor: "any", // Required by DredClientArgs
                    discovery: discovery // Pass discovery during creation
                }, 
                "server2", 
                11 // Use DB 11 for isolation
            );
            // Ensure discovery is set
            server2.discovery = discovery;
            servers.push(server2);
            
            // Start HTTP servers first
            console.log("Starting HTTP servers");
            await Promise.all([
                server1.listen(),
                server2.listen()
            ]);
            
            // Give servers time to start
            await asyncDelay(1000);
            
            // Explicitly verify discovery's host list before replication
            console.log("Verifying discovery host list");
            const hosts = await discovery.getHostList();
            console.log(`Host list has ${hosts.length} entries:`, 
                hosts.map(h => `${h.serverId}@${h.address}:${h.port}`).join(', '));
            
            // Now trigger replication setup with verified discovery
            console.log("Setting up replication between servers");
            await Promise.all([
                server1.setupReplication(),
                server2.setupReplication()
            ]);
            
            // Allow more time for replication setup to complete
            await asyncDelay(3000);
            
            console.log("Servers set up successfully");
        } catch (error) {
            console.error("Failed to set up servers:", error);
            throw error;
        }
    }, 30000);
    
    // Clean up servers after tests
    afterAll(async () => {
        console.log("Cleaning up servers");
        for (const server of servers) {
            await server.close();
        }
    });
    
    it("replicates messages between servers", async () => {
        // Skip test if we don't have enough servers
        if (servers.length < 2) {
            console.warn("Not enough servers available, skipping test");
            return;
        }
        
        // Create test channel on first server
        const channelName = "repl-test-" + Date.now();
        console.log(`Creating channel ${channelName} on server1`);
        
        const createResponse = await request(servers[0].api)
            .post(`/channel/${channelName}`)
            .send({ encrypted: false });
            
        expect(createResponse.status).toBe(200);
        console.log("Channel created successfully");
        
        // Wait for channel to be available on both servers
        await asyncDelay(2000);
        
        // Check if channel exists on server 2
        console.log("Verifying channel exists on server2");
        const channelsResponse = await request(servers[1].api)
            .get('/channels');
            
        expect(channelsResponse.status).toBe(200);
        console.log("Channels on server2:", channelsResponse.body);
        
        // Setup message receipt promise on server 2
        console.log("Setting up message tracking");
        const messageId = "test-msg-" + Date.now();
        let messageReceived = false;
        
        // Create a client for server 2 - passing discovery from the server
        console.log("Creating client with discovery");
        const client2 = servers[1].mkClient(servers[1].serverId, {
            discovery: servers[1].discovery, // Pass the discovery object explicitly
            waitFor: "any" // Required by DredClientArgs
        });
        
        // Listen for messages on server 2
        console.log("Subscribing to channel on server2");
        await client2.subscribeToChannels({
            [channelName]: (message) => {
                console.log(`Received message on server2: ${JSON.stringify(message)}`);
                if (message.ocid === messageId) {
                    messageReceived = true;
                }
            }
        });
        
        // Give subscription time to establish
        await asyncDelay(2000);
        
        // Post a message to server 1
        console.log("Posting message to server1");
        const testMessage = {
            msg: JSON.stringify({ content: "Test replication message" }),
            type: "text",
            ocid: messageId,
            sourceServer: servers[0].serverId // Use the actual server ID
        };
        
        const postResponse = await request(servers[0].api)
            .post(`/channel/${channelName}/message`)
            .send(testMessage);
            
        expect(postResponse.status).toBe(200);
        console.log("Message posted successfully");
        
        // Wait for replication to occur
        console.log("Waiting for message replication...");
        for (let i = 0; i < 10; i++) {
            if (messageReceived) {
                break;
            }
            console.log(`Waiting for message (attempt ${i + 1}/10)...`);
            await asyncDelay(1000); // Increased delay for each check
        }
        
        // Verify message was replicated
        expect(messageReceived).toBe(true);
    }, 30000); // Increased timeout
}); 