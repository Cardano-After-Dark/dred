// Discovery tests for real VPS servers
// Location: src/server/__tests__/discovery.test.ts

import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { DredClient } from "../../client/DredClient.js";
import { StaticHostDiscovery } from "../../peers/StaticHostDiscovery.js";
import { zonedLogger } from "@poshplum/utils";
import { colors } from "../../picocolors/picocolors.js";

const { cyan } = colors;

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

const testLogger = zonedLogger("discovery-test", {
    loggerId: "disc-test",
    color: cyan.start,
});

describe("Cross-Server Discovery", () => {
    let usClient: DredClient;
    let ukClient: DredClient;

    beforeAll(async () => {
        // Create discovery instance with real server configuration
        const discovery = new StaticHostDiscovery({
            hosts: DISCOVERY_CONFIG.servers,
            neighborhood: DISCOVERY_CONFIG.neighborhood
        });

        // Create clients for each server
        usClient = new DredClient({
            neighborhood: DISCOVERY_CONFIG.neighborhood,
            discovery: discovery,
            waitFor: "minimal",
            name: "us-test-client"
        });

        ukClient = new DredClient({
            neighborhood: DISCOVERY_CONFIG.neighborhood,
            discovery: discovery,
            waitFor: "minimal", 
            name: "uk-test-client"
        });

        await usClient.generateKey();
        await ukClient.generateKey();
    });

    afterAll(async () => {
        await usClient?.close();
        await ukClient?.close();
    });

    describe("Server Discovery", () => {
        it("should discover both US and UK servers", async () => {
            const hosts = await usClient.discovery.getHostList();
            
            expect(hosts).toHaveLength(2);
            
            const serverIds = hosts.map(h => h.serverId);
            expect(serverIds).toContain("US");
            expect(serverIds).toContain("UK");
            
            testLogger.info("✅ Discovered servers:", serverIds);
        });

        it("should identify correct server addresses", async () => {
            const hosts = await usClient.discovery.getHostList();
            
            const usServer = hosts.find(h => h.serverId === "US");
            const ukServer = hosts.find(h => h.serverId === "UK");
            
            expect(usServer).toBeDefined();
            expect(ukServer).toBeDefined();
            expect(usServer!.address).toBeTruthy();
            expect(ukServer!.address).toBeTruthy();
            expect(usServer!.port).toBe(3029);
            expect(ukServer!.port).toBe(3029);
            
            testLogger.info("✅ Server addresses:", {
                US: `${usServer!.address}:${usServer!.port}`,
                UK: `${ukServer!.address}:${ukServer!.port}`
            });
        });
    });

    describe("Server Connectivity", () => {
        it("should connect to US server and get channel list", async () => {
            // Force client to connect to US server specifically
            const usDiscovery = new StaticHostDiscovery({
                hosts: [DISCOVERY_CONFIG.servers.find(s => s.serverId === "US")!],
                neighborhood: DISCOVERY_CONFIG.neighborhood
            });
            
            const usOnlyClient = new DredClient({
                neighborhood: DISCOVERY_CONFIG.neighborhood,
                discovery: usDiscovery,
                waitFor: "minimal",
                name: "us-only-test"
            });
            
            await usOnlyClient.generateKey();
            
            try {
                // Wait for client to be ready and get channels
                await usOnlyClient.once("hasChannels");
                const channels = usOnlyClient.channels;
                
                expect(channels).toBeDefined();
                expect(Array.isArray(channels)).toBe(true);
                expect(channels.length).toBeGreaterThan(0);
                expect(channels).toContain("news");
                
                testLogger.info("✅ US server channels:", channels);
            } finally {
                await usOnlyClient.close();
            }
        });

        it("should connect to UK server and get channel list", async () => {
            // Force client to connect to UK server specifically
            const ukDiscovery = new StaticHostDiscovery({
                hosts: [DISCOVERY_CONFIG.servers.find(s => s.serverId === "UK")!],
                neighborhood: DISCOVERY_CONFIG.neighborhood
            });
            
            const ukOnlyClient = new DredClient({
                neighborhood: DISCOVERY_CONFIG.neighborhood,
                discovery: ukDiscovery,
                waitFor: "minimal",
                name: "uk-only-test"
            });
            
            await ukOnlyClient.generateKey();
            
            try {
                // Wait for client to be ready and get channels
                await ukOnlyClient.once("hasChannels");
                const channels = ukOnlyClient.channels;
                
                expect(channels).toBeDefined();
                expect(Array.isArray(channels)).toBe(true);
                expect(channels.length).toBeGreaterThan(0);
                expect(channels).toContain("news");
                
                testLogger.info("✅ UK server channels:", channels);
            } finally {
                await ukOnlyClient.close();
            }
        });
    });

    describe("Admin API Discovery", () => {
        it("should get discovery status from US server", async () => {
            const usServer = DISCOVERY_CONFIG.servers.find(s => s.serverId === "US")!;
            const proto = usServer.insecure ? "http" : "https";
            const url = `${proto}://${usServer.address}:${usServer.port}/admin/discovery/status`;
            
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });
            
            expect(response.ok).toBe(true);
            
            const status = await response.json();
            expect(status.neighborhood).toBe(DISCOVERY_CONFIG.neighborhood);
            expect(status.hostsCount).toBeGreaterThan(0);
            expect(status.myServerId).toBe("US");
            
            testLogger.info("✅ US server discovery status:", status);
        });

        it("should get discovery status from UK server", async () => {
            const ukServer = DISCOVERY_CONFIG.servers.find(s => s.serverId === "UK")!;
            const proto = ukServer.insecure ? "http" : "https";
            const url = `${proto}://${ukServer.address}:${ukServer.port}/admin/discovery/status`;
            
            const response = await fetch(url, {
                headers: { 'Accept': 'application/json' }
            });
            
            expect(response.ok).toBe(true);
            
            const status = await response.json();
            expect(status.neighborhood).toBe(DISCOVERY_CONFIG.neighborhood);
            expect(status.hostsCount).toBeGreaterThan(0);
            expect(status.myServerId).toBe("UK");
            
            testLogger.info("✅ UK server discovery status:", status);
        });
    });
}); 