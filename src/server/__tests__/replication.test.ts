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

        // Simple message collectors
        let c1Messages: any[];
        let c2Messages: any[];

        // Neighborhood for connecting clients
        const neighborhoodId = "test-neighborhood";

        // channel for testing
        const channelName = "test-channel";

        const logStep = (message: string) => {
            console.log(message);
        };

        const logInfo = async () => {
            logStep(" == Logging server info ==");
            
            for (const server of [dred1, dred2]) {
                logStep(await server.logInfo());
            }

            logStep(" ==Logging client info == ");

            for (const client of [c1, c2]) {
                logStep(client.logInfo());
            }
        }

        beforeAll(async () => {
            logStep("beforeAll: setting up test environment");
            test = await testSetup();//neighborhoodId);
            dred1 = test.servers[0];
            dred2 = test.servers[1];
        });
        
        beforeEach(async () => {
            await asyncDelay(100);
            logStep("beforeEach: resetting redis and channels");
            
            logStep(`Adding one client per dred server...`);
            c1 = await dred1.mkClientAndGenerateKey("first");
            c2 = await dred2.mkClientAndGenerateKey("second");

            
            logStep(`Setting neighborhood ${neighborhoodId} for both clients...`);
            c1.setNeighborhood(neighborhoodId);
            c2.setNeighborhood(neighborhoodId);
            
            logStep(`Creating channel ${channelName} on both servers...`);
            await c1.createChannel(channelName);//c1 is connected to dred1
            await c2.createChannel(channelName);//c2 is connected to dred2

            // CRITICAL: Refresh channel lists after creating new channels - Should this be done in the createChannel() method?
            // Refresh channel lists after creating new channels
            logStep(`Refreshing channel lists to include ${channelName}...`);
            c1.channels = await c1.connManager.getChannelList();
            c2.channels = await c2.connManager.getChannelList();

            c1Messages = [];
            c2Messages = [];
            
            // Subscribe clients to the created channel - using the working pattern
            logStep(`Subscribing clients to ${channelName}...`);
            
            // Use the subscription map pattern from messages.test.ts
            await c1.subscribeToChannels({
                [channelName]: (msg) => { 
                    console.log("c1 received:", msg); 
                    c1Messages.push(msg);
                }
            });
            await c2.subscribeToChannels({
                [channelName]: (msg) => { 
                    console.log("c2 received:", msg); 
                    c2Messages.push(msg);
                }
            });
            
            // Add delay to allow subscriptions to settle
            await asyncDelay(100);

            await logInfo();

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
            expect(c1.channels).toContainEqual(channelName);
            expect(c2.channels).toContainEqual(channelName);

        });

        it("messaging setup", async () => {
            logStep("check messaging setup");

            // post message directly to server
            const testMessage = {
                msg: "Hello from test!",
                type: "greeting",
                ocid: "test-001"
            };
            
            // posting message directly to server
            const response = await test.agent
                .post(`/channel/${channelName}/message`)
                .send(testMessage)
                .expect(200);

            logStep(`Message posted, response: ${JSON.stringify(response.body)}`);
    
            await asyncDelay(500);

            logStep(`c1Messages count: ${c1Messages.length}`);
            logStep(`c2Messages count: ${c2Messages.length}`);

            expect(c1Messages.length).toBe(1);
            expect(c1Messages[0].type).toBe("greeting");
            expect(c2Messages.length).toBe(0); // c2 should not receive the message since it's on a different server

        });


        it("replication setup", async () => {

            logStep(" >>>>>>> replication initialization");

            for(const server of [dred1, dred2]) {
                // explicitly invoke replication setup
                await server.setupReplication();
            }

            logStep(" <<<<<<<< replication initialization complete");


            logStep("check replication setup");

            // Send a second message through c1 client
            logStep("Sending second message through c1 client...");
            const clientMessage = {
                msg: "Hello from c1 client!",
                type: "client-greeting"
                // ocid will be auto-generated by the client if not provided
            };
            
            // assuming I waited enough for the replication to be set up
            // and all the channels exist on both servers

            const clientResponse = await c1.postMessage(channelName, clientMessage);
            logStep(` >>>>>>>>>>> Client message posted, response: ${JSON.stringify(clientResponse)}`);

            await asyncDelay(2000);

            // I should see the following on the LOGs:
            // 1. 1st message arrive to 1st server
            // 2. 2nd server repAgent should be listening to 1st server 
            // 3. first message arrives to 2nd Agent 
            // 4. first message arrives to 2nd Server
            // 5. 2nd client receives the message 

            // THIS SUCCEEDS WHEN REPLICATION IS IMPLEMENTED
            expect(c2Messages.length).toBe(1); // c2 should receive the message in case of replication

            // Future tests can check more cases, e.g.
            // - non existing ch on server2 -> replicated from server1 to server2
            // ..


            await asyncDelay(2000);

            // logStep(`After client message - c1Messages count: ${c1Messages.length}`);
            // logStep(`After client message - c2Messages count: ${c2Messages.length}`);

            // // Verify c1 received the message it sent (since it's subscribed to the channel)
            // expect(c1Messages.length).toBe(0); // Should have 0 messages
            // // THIS SUCCEEDS WHEN REPLICATION IS IMPLEMENTED
            // expect(c2Messages.length).toBe(1); // c2 should receive the message in case of replication

        });
});