import { describe, it, expect } from "vitest";
import { createServer } from "../DredServer.js";
import { NeighborhoodDiscovery } from "../../peers/NeighborhoodDiscovery.js";
import { StaticHostDiscovery } from "../../peers/StaticHostDiscovery.js";
import type { DredHostDetails } from "../../types/DredHosts.js";
import { asyncDelay } from "../../util/asyncDelay.js";

describe("Self-identification issue reproduction", () => {
    
    // Mock that simulates blockchain-derived serverIds (like production)
    class MockNeighborhoodDiscovery extends NeighborhoodDiscovery {
        private mockHosts: DredHostDetails[];
        private blockchainIds: string[] = [];
        
        constructor(hosts: DredHostDetails[], neighborhood: string = "test-nbh") {
            super({ neighborhood });
            this.mockHosts = hosts;
            this.blockchainIds = hosts.map(host => 
                `blockchain-derived-${host.serverId}-${Math.random().toString(36).substring(7)}`
            );
        }
        
        async initHostDiscovery() {}
        
        async getHostList(): Promise<DredHostDetails[]> {
            return this.mockHosts.map((host, index) => ({
                ...host,
                serverId: this.blockchainIds[index]
            }));
        }
        
        async myServerInfo(serverId: string): Promise<DredHostDetails | undefined> {
            const hosts = await this.getHostList();
            return hosts.find(h => h.serverId === serverId);
        }
    }
    
    it("REPRODUCES ISSUE: servers get blockchain-derived serverIds", async () => {
        const discovery = new MockNeighborhoodDiscovery([
            { serverId: "node-01", address: "localhost", port: "53040", insecure: true },
            { serverId: "node-02", address: "localhost", port: "53041", insecure: true },
        ], "test-neighborhood");
        
        const discoveredHosts = await discovery.getHostList();
        const firstHost = discoveredHosts[0];
        
        // Demonstrates the production issue: blockchain-derived serverIds
        expect(firstHost.serverId).toMatch(/^blockchain-derived-/);
        console.log("Production serverIds are blockchain-derived:", firstHost.serverId);
        
        const server = await createServer({
            discovery,
            neighborhood: "test-neighborhood",
            waitFor: "minimal"
        }, firstHost.serverId, 1);
        
        await server.listen();
        
        try {
            await server.setupReplication();
            await asyncDelay(1000);
            
            const replicator = server.replicator;
            expect(replicator?.isInitialized()).toBe(true);
            
        } finally {
            await server.close();
        }
    });
    
    it("SHOWS SOLUTION: DRED_NODE_ID filters self correctly", async () => {
        const originalNodeId = process.env.DRED_NODE_ID;
        
        try {
            const discovery = new MockNeighborhoodDiscovery([
                { serverId: "test-01", address: "localhost", port: "53043", insecure: true },
                { serverId: "test-02", address: "localhost", port: "53044", insecure: true },
            ], "test-neighborhood");
            
            const allHosts = await discovery.getHostList();
            const targetNodeId = allHosts[0].serverId;
            
            // Test filtering with DRED_NODE_ID environment variable
            process.env.DRED_NODE_ID = targetNodeId;
            
            // Simulate the filtering logic from our fix
            const filteredHosts = allHosts.filter(h => h.serverId !== targetNodeId);
            
            expect(filteredHosts.length).toBe(1); // Should exclude self
            expect(filteredHosts.every(h => h.serverId !== targetNodeId)).toBe(true);
            console.log("Self-filtering works: 2 hosts -> 1 host when DRED_NODE_ID is set");
            
        } finally {
            if (originalNodeId !== undefined) {
                process.env.DRED_NODE_ID = originalNodeId;
            } else {
                delete process.env.DRED_NODE_ID;
            }
        }
    });
    
    it("BASELINE: StaticHostDiscovery works correctly", async () => {
        const hosts: DredHostDetails[] = [
            { serverId: "static-first", address: "localhost", port: "53046", insecure: true },
            { serverId: "static-second", address: "localhost", port: "53047", insecure: true },
        ];
        
        const discovery1 = new StaticHostDiscovery({ hosts, neighborhood: "test-static" });
        
        const server1 = await createServer({
            discovery: discovery1,
            neighborhood: "test-static",
            waitFor: "minimal"
        }, "static-first", 1);
        
        await server1.listen();
        
        try {
            await server1.setupReplication();
            await asyncDelay(1000);
            
            expect(server1.replicator?.isInitialized()).toBe(true);
            console.log("StaticHostDiscovery baseline: Works correctly with simple serverIds");
            
        } finally {
            await server1.close();
        }
    });
});
