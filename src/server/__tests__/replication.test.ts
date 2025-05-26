import { beforeAll, describe, it, expect } from "vitest";
import request, { SuperTestWithHost, Test } from "supertest";

import { testSetup } from "../testServer.js";
import { DredClient } from "../../client/DredClient.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";

// Use fit (it.only) to run only this test during development
const fit = it.only;

describe("minimal replication setup", () => {
    // Server instances: dred1 and dred2 represent the two server instances
    // that will be used to test message replication between servers
    let dred1: DredServer;
    let dred2: DredServer;
    
    // Client instances: c1 connects to dred1, c2 connects to dred2
    // These represent external clients that will send/receive messages
    let c1: DredClient;
    let c2: DredClient;
    
    beforeAll(async () => {
        console.log("Setting up minimal replication test environment...");
        
        // Initialize the test environment with multiple servers
        // testSetup() creates 3 servers (first, second, third) with Redis backends
        const test = await testSetup();
        const { servers } = test;
        
        console.log(`Found ${servers.length} servers`);
        
        // Ensure we have at least 2 servers for replication testing
        // We need minimum 2 servers to test message replication between them
        if (servers.length < 2) {
            throw new Error("Need at least 2 servers for replication test");
        }
        
        // Assign the first two servers from the test setup
        // dred1 = "first" server, dred2 = "second" server
        dred1 = servers[0];
        dred2 = servers[1];
        
        console.log(`dred1: ${dred1.serverId}`);
        console.log(`dred2: ${dred2.serverId}`);
        
        // Create client connections to each server
        // c1 connects to dred1 (first server)
        // c2 connects to dred2 (second server)
        // Note: mkClient() creates a client that connects to the specified server
        console.log("Creating client c1 connected to dred1...");
        c1 = dred1.mkClient(dred1.serverId);
        
        console.log("Creating client c2 connected to dred2...");
        c2 = dred2.mkClient(dred2.serverId);
        
        // Allow time for all connections to be established
        // This ensures servers and clients are fully initialized before testing
        console.log("Waiting for setup to complete...");
        await asyncDelay(1000);
        
        console.log("Minimal setup complete!");
    });

    fit("environment setup verification", async () => {
        console.log("Verifying minimal environment setup...");
        
        // Verify that both server instances are properly initialized
        expect(dred1).toBeDefined();
        expect(dred2).toBeDefined();
        
        // Verify server IDs match expected values from testSetup()
        expect(dred1.serverId).toBe("first");
        expect(dred2.serverId).toBe("second");
        
        // Verify that both client instances are properly initialized
        expect(c1).toBeDefined();
        expect(c2).toBeDefined();
        
        // Verify that we have distinct server instances (not the same object)
        expect(dred1).not.toBe(dred2);
        
        // Verify that we have distinct client instances (not the same object)
        expect(c1).not.toBe(c2);
        
        console.log("Environment setup verification passed!");
        console.log("Summary:");
        console.log(`   - dred1: ${dred1.serverId}`);
        console.log(`   - dred2: ${dred2.serverId}`);
        console.log(`   - c1: connected to dred1`);
        console.log(`   - c2: connected to dred2`);
    });
}); 