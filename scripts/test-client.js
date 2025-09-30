#!/usr/bin/env node
/**
 * Interactive DRED Test Client
 * 
 * A simple, interactive client for testing DRED server connections.
 * Features:
 * - Server selection (DE, US, UK)
 * - Channel discovery and selection
 * - Real-time messaging (send via stdin, receive via subscription)
 * - Connection status display
 * 
 * Usage: node scripts/test-client.js
 */

import { DredClient, StaticHostDiscovery } from "../src/client/dist/dred-client-nodejs.mjs";
import { zonedLogger } from "@poshplum/utils";
import readline from 'readline';

// =============================================================================
// SERVER CONFIGURATIONS
// =============================================================================
const SERVERS = {
    DE: {
        name: "DE (Germany)",
        address: "de.pp.node-01.dred.network",
        port: 443,
        serverId: "dredNode-170647b99511",
        ssl: true
    },
    US: {
        name: "US (United States)", 
        address: "74.208.13.84",
        port: 3029,
        serverId: "dredNode-efb4a5ae1206",
        ssl: false
    },
    UK: {
        name: "UK (United Kingdom)",
        address: "217.154.34.155", 
        port: 3029,
        serverId: "dredNode-10d84498548a",
        ssl: false
    }
};

// =============================================================================
// INTERACTIVE CLIENT CLASS
// =============================================================================
class InteractiveDredClient {
    constructor() {
        this.logger = zonedLogger("test-client", {
            loggerId: "interactive",
            color: "\u001b[36m"
        });
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        this.client = null;
        this.selectedServer = null;
        this.selectedChannel = null;
        this.isConnected = false;
    }

    /**
     * Main entry point - start the interactive session
     */
    async start() {
        console.log("🚀 DRED Interactive Test Client");
        console.log("================================\n");
        
        try {
            // Step 1: Select server
            this.selectedServer = await this.selectServer();
            console.log(`\n✅ Selected: ${this.selectedServer.name}\n`);
            
            // Step 2: Connect to server and discover channels
            const channels = await this.connectAndDiscoverChannels();
            
            // Step 3: Select channel
            this.selectedChannel = await this.selectChannel(channels);
            console.log(`\n✅ Selected channel: ${this.selectedChannel}\n`);
            
            // Step 4: Subscribe to channel and start interactive session
            await this.subscribeAndStartSession();
            
        } catch (error) {
            this.logger.error("Session failed", {
                error: error.message,
                errorType: error.name
            });
            process.exit(1);
        }
    }

    /**
     * Step 1: Let user select which server to connect to
     */
    async selectServer() {
        return new Promise((resolve) => {
            console.log("Available servers:");
            Object.entries(SERVERS).forEach(([key, server]) => {
                const sslMode = server.ssl ? "HTTPS" : "HTTP";
                console.log(`  ${key}: ${server.name} (${server.address}:${server.port} - ${sslMode})`);
            });
            
            this.rl.question('\nSelect server [DE/US/UK]: ', (answer) => {
                const serverKey = answer.toUpperCase();
                if (SERVERS[serverKey]) {
                    resolve(SERVERS[serverKey]);
                } else {
                    console.log("❌ Invalid selection. Please choose DE, US, or UK.");
                    resolve(this.selectServer());
                }
            });
        });
    }

    /**
     * Step 2: Connect to selected server and discover available channels
     */
    async connectAndDiscoverChannels() {
        const server = this.selectedServer;
        const sslMode = server.ssl ? "HTTPS" : "HTTP";
        
        console.log(`🔌 Connecting to ${server.name} (${server.address}:${server.port} via ${sslMode})...`);
        
        // Create DRED client
        this.client = new DredClient({
            discovery: new StaticHostDiscovery({
                hosts: [{
                    address: server.address,
                    port: server.port,
                    serverId: server.serverId,
                    insecure: !server.ssl  // Use HTTP for non-SSL servers
                }]
            }),
            neighborhood: "dred-dev"
        });

        // Generate encryption key
        console.log("🔑 Generating encryption key...");
        await this.client.generateKey();

        // Wait for client to be ready with timeout
        console.log("⏳ Waiting for connection...");
        const timeout = 15; // seconds
        let attempts = 0;
        
        while (this.client.state !== "ready" && attempts < timeout) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            attempts++;
            
            if (attempts % 5 === 0) {
                console.log(`   Still connecting... (${attempts}s/${timeout}s)`);
            }
        }

        if (this.client.state !== "ready") {
            throw new Error(`Failed to connect after ${timeout}s. Current state: ${this.client.state}`);
        }

        console.log("✅ Connected successfully!");
        
        // Get available channels
        const channels = this.client.channels || [];
        if (channels.length === 0) {
            throw new Error("No channels available on server");
        }

        return channels;
    }

    /**
     * Step 3: Let user select which channel to join
     */
    async selectChannel(channels) {
        return new Promise((resolve) => {
            console.log("Available channels:");
            channels.forEach((channel, index) => {
                console.log(`  ${index + 1}: ${channel}`);
            });
            
            this.rl.question('\nSelect channel number: ', (answer) => {
                const channelIndex = parseInt(answer) - 1;
                if (channelIndex >= 0 && channelIndex < channels.length) {
                    resolve(channels[channelIndex]);
                } else {
                    console.log("❌ Invalid selection. Please choose a valid channel number.");
                    resolve(this.selectChannel(channels));
                }
            });
        });
    }

    /**
     * Step 4: Subscribe to channel and start interactive messaging session
     */
    async subscribeAndStartSession() {
        const server = this.selectedServer;
        const sslMode = server.ssl ? "HTTPS" : "HTTP";
        
        // Subscribe to selected channel
        console.log(`📡 Subscribing to channel '${this.selectedChannel}'...`);
        
        this.client.subscribeToChannels({
            [this.selectedChannel]: (message) => {
                this.handleIncomingMessage(message);
            }
        });

        this.isConnected = true;
        
        // Show connection status
        console.log(`\n🎯 Connected: ${server.address}:${server.port} (${sslMode}) > ${this.selectedChannel}`);
        console.log("📝 Type messages and press Enter to send. Type 'quit' to exit.\n");
        
        // Start interactive message loop
        this.startMessageLoop();
    }

    /**
     * Handle incoming messages from the channel
     */
    handleIncomingMessage(message) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`\n📨 [${timestamp}] Received: ${JSON.stringify(message)}`);
        console.log("💬 > "); // Prompt for next message
    }

    /**
     * Interactive message sending loop
     */
    startMessageLoop() {
        const prompt = () => {
            this.rl.question("💬 > ", async (input) => {
                if (input.toLowerCase() === 'quit') {
                    await this.disconnect();
                    return;
                }
                
                if (input.trim()) {
                    await this.sendMessage(input.trim());
                }
                
                prompt(); // Continue loop
            });
        };
        
        prompt();
    }

    /**
     * Send a message to the current channel
     */
    async sendMessage(text) {
        try {
            const message = {
                type: "user-message",
                msg: JSON.stringify({
                    content: text,
                    timestamp: new Date().toISOString(),
                    from: "test-client"
                })
            };

            await this.client.postMessage(this.selectedChannel, message);
            
            const timestamp = new Date().toLocaleTimeString();
            console.log(`📤 [${timestamp}] Sent: ${text}`);
            
        } catch (error) {
            console.log(`❌ Failed to send message: ${error.message}`);
        }
    }

    /**
     * Disconnect and cleanup
     */
    async disconnect() {
        console.log("\n🛑 Disconnecting...");
        
        if (this.client) {
            this.client.disconnect();
        }
        
        this.rl.close();
        console.log("✅ Disconnected. Goodbye!");
        process.exit(0);
    }
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================
async function main() {
    const client = new InteractiveDredClient();
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
        console.log("\n\n🛑 Received Ctrl+C...");
        await client.disconnect();
    });
    
    process.on('SIGTERM', async () => {
        console.log("\n\n🛑 Received termination signal...");
        await client.disconnect();
    });
    
    // Start the interactive session
    await client.start();
}

// Run the client
main().catch(error => {
    console.error("❌ Fatal error:", error.message);
    process.exit(1);
});
