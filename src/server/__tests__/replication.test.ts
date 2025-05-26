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
    
    beforeAll(async () => {
        console.log("Setting up minimal replication test environment...");
        
        // testSetup() creates 3 servers (first, second, third) with Redis backends
        const test = await testSetup();
        const { servers } = test;
        
        console.log(`Found ${servers.length} servers`);
        
        if (servers.length < 2) {
            throw new Error("Need at least 2 servers for replication test");
        }
        
        // Assign first two servers
        dred1 = servers[0];
        dred2 = servers[1];
        
        console.log(`dred1: ${dred1.serverId}`);
        console.log(`dred2: ${dred2.serverId}`);
        
        // Create clients connected to each server
        console.log("Creating client c1 connected to dred1...");
        c1 = dred1.mkClient(dred1.serverId);
        
        console.log("Creating client c2 connected to dred2...");
        c2 = dred2.mkClient(dred2.serverId);
        
        // Allow time for connections to be established
        console.log("Waiting for setup to complete...");
        await asyncDelay(1000);
        
        console.log("Minimal setup complete!");
    });

    fit("environment setup verification", async () => {
        console.log("Verifying minimal environment setup...");
        
        // Verify server instances are initialized
        expect(dred1).toBeDefined();
        expect(dred2).toBeDefined();
        expect(dred1.serverId).toBe("first");
        expect(dred2.serverId).toBe("second");
        
        // Verify client instances are initialized
        expect(c1).toBeDefined();
        expect(c2).toBeDefined();
        
        // Verify distinct instances
        expect(dred1).not.toBe(dred2);
        expect(c1).not.toBe(c2);
        
        console.log("Environment setup verification passed!");
        console.log("Summary:");
        console.log(`   - dred1: ${dred1.serverId}`);
        console.log(`   - dred2: ${dred2.serverId}`);
        console.log(`   - c1: connected to dred1`);
        console.log(`   - c2: connected to dred2`);
    });

    afterAll(async () => {
        // Give system time to properly close connections and prevent cleanup errors
        await asyncDelay(100);
    });
}); 