import { beforeAll, afterAll, beforeEach, afterEach, describe, it, vi, expect } from "vitest";
import request, { SuperTestWithHost, Test } from "supertest";
import { Express } from "express";

import { testSetup } from "../testServer.js";
import { DredClient } from "../../client/DredClient.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";


const fit = it.only;

describe("minimal replication setup", () => {

        // test object returned by testSetup()
        let test: {
            agent: SuperTestWithHost<Test>;
            app?: any; // Express;
            server: DredServer;
            client: DredClient;
            servers: DredServer[];
        };

        // Two servers for replication testing: dred1 and dred2
        let dred1: DredServer;
        let dred2: DredServer;
        
        // Two clients: c1 connects to dred1, c2 connects to dred2
        let c1: DredClient;
        let c2: DredClient;

        // Neighborhood for connecting clients
        const neighborhoodId = "test-neighborhood";

        // channel for testing
        const channelName = "test-channel";

        const logStep = (message: string) => {
            console.log(message);
        };

        beforeAll(async () => {
            logStep("beforeAll: setting up test environment");
            test = await testSetup();
            dred1 = test.servers[0];
            dred2 = test.servers[1];
        });

        beforeEach(async () => {
            await asyncDelay(100);
            logStep("beforeEach: resetting redis and channels");

            for (const server of [dred1, dred2]) {
                console.log(await server.logInfo());
            }


            logStep(`Adding one client per dred server...`);
            c1 = dred1.mkClient("first");
            c2 = dred2.mkClient("second");

            logStep(`Setting neighborhood ${neighborhoodId} for both clients...`);
            c1.setNeighborhood(neighborhoodId);
            c2.setNeighborhood(neighborhoodId);

            logStep(`Creating channel ${channelName} on both servers...`);
            await c1.createChannel(channelName);//c1 is connected to dred1

            // this will result in error 
            await c2.createChannel(channelName);//c2 is connected to dred2

            for (const client of [c1, c2]) {
                console.log(client.logInfo());
            }
        });

        afterEach(async () => {
            logStep("afterEach: cleaning up clients");
        });

        afterAll(async () => {
            logStep("afterAll: cleaning up test environment");
            await asyncDelay(100);
        });

        it("basic setup", async () => {
            logStep("check basic setup");
    
            expect(dred1).toBeDefined();
            expect(dred2).toBeDefined();
            // expect(dred3).toBeDefined();
            
            expect(dred1.serverId).toBe("first");
            expect(dred2.serverId).toBe("second");
            
            expect(c1).toBeDefined();
            expect(c2).toBeDefined();
            
            expect(dred1).not.toBe(dred2);
            expect(c1).not.toBe(c2);
    
            expect(c1.neighborhoodId).toBe(neighborhoodId);
            expect(c2.neighborhoodId).toBe(neighborhoodId);
    
            // channels should contain "test-channel", "news", "discussion"
            // expect(c1.channels).toContainEqual([channelName]);
            // expect(c2.channels).toContainEqual([channelName]);
    
            await asyncDelay(500);
        });
});