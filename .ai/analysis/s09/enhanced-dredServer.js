import dotenv from 'dotenv/config'

import { NeighborhoodDiscovery } from "../src/peers/NeighborhoodDiscovery.js";
import { StaticHostDiscovery } from "../src/peers/StaticHostDiscovery.js"
import { createServer } from "../src/server/DredServer.js";
import { asyncDelay } from "../src/util/asyncDelay.js";
import path from 'node:path';

//!!!! todo: read config from a JSON file 

// Add timeout helper
function withTimeout(promise, ms, operation) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`${operation} timed out after ${ms}ms`)), ms)
        )
    ]);
}

init();
async function init(
    nbh = process.env.NEIGHBORHOOD || "dred-dev",
    serverAddress = process.env.SERVER_IP || "0.0.0.0",
    serverPort = process.env.DRED_PORT || "3029"
) {
    console.log("🚀 Starting DRED server initialization...");
    console.log("Dred nbh", nbh);
    console.log("Dred serverAddress", serverAddress);
    console.log("Dred serverPort", serverPort);
    
    try {
        // Step 1: Discovery initialization with timeout
        console.log("📡 Step 1: Initializing NeighborhoodDiscovery...");
        const discovery = await withTimeout(
            NeighborhoodDiscovery.forNeighborhood(nbh),
            30000, // 30 second timeout
            "NeighborhoodDiscovery.forNeighborhood"
        );
        console.log("✅ NeighborhoodDiscovery initialized");

        // Step 2: Wait for hosts ready with timeout
        console.log("📡 Step 2: Waiting for hosts discovery...");
        await withTimeout(
            new Promise((resolve) => {
                discovery.events.once("hosts:ready", resolve)            
            }),
            60000, // 60 second timeout  
            "hosts:ready event"
        );
        console.log("✅ Hosts discovery completed");

        // Step 3: Host matching
        console.log("🔍 Step 3: Finding matching host...");
        const hosts = discovery.hosts;
        console.log(`📋 Found ${hosts?.length || 0} total hosts:`, 
            hosts?.map(h => `${h.address}:${h.port} (${h.serverId})`));
        
        const matchingHost = hosts?.find(host => 
            host.address === serverAddress && parseInt(host.port) === parseInt(serverPort)
        );

        if (!matchingHost) {
            const availableHosts = hosts?.map(h => `${h.address}:${h.port} (${h.serverId})`).join(', ') || 'none';
            throw new Error(`No host found matching server address ${serverAddress}:${serverPort}. Available hosts: ${availableHosts}`);
        }
        
        console.log("✅ Found matching host:", matchingHost);

        // Step 4: Server creation with timeout
        console.log("🏗️  Step 4: Creating DRED server...");
        const server = await withTimeout(
            createServer({ 
                discovery,
                neighborhood: nbh || "dred-dev",
                waitFor: "minimal", // bootstrap problem fix
            }, matchingHost.serverId, 0),
            120000, // 2 minute timeout for server creation
            "createServer"
        );
        console.log("✅ DRED server created successfully");

        // Step 5: Server listening with timeout
        console.log("🎧 Step 5: Starting server listener...");
        const { port, address } = matchingHost;
        await withTimeout(
            server.listen(),
            30000, // 30 second timeout for listen
            "server.listen"
        );
        
        console.log(`🎉 DRED server successfully started!`);
        console.log(`🌐 Server listening on ${address}:${port}`);
        console.log(`🆔 Server ID: ${matchingHost.serverId}`);
        
    } catch (error) {
        console.error("❌ DRED server startup failed:");
        console.error("Error:", error.message);
        console.error("Stack:", error.stack);
        
        // Exit with error code
        process.exit(1);
    }
}

// Handle process signals
process.on('SIGINT', () => {
    console.log('📴 Received SIGINT, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('📴 Received SIGTERM, shutting down gracefully...');
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
