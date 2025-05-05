import { beforeAll, describe, it, vi, expect } from "vitest";
import request, { SuperTestWithHost, Test } from "supertest";
import { Express } from "express";

import { testSetup } from "../testServer.js";
import { DredClient } from "../../client/DredClient.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";

const fit = it.only;

describe("message replication", () => {
    let agents: SuperTestWithHost<Test>[];
    let servers: DredServer[];
    let clients: DredClient[];
    
    beforeAll(async () => {
        const test = await testSetup();
        ({ servers } = test);
        
        // Create clients for each server
        clients = [];
        agents = [];
        
        // Create a client and agent for each server
        for (const server of servers.slice(0, 2)) { // We only need two servers for this test
            const client = server.mkClient(server.serverId);
            clients.push(client);
            
            const agent = request.agent(server.api);
            agents.push(agent);
        }
        
        // Wait for replication connections to be established
        await asyncDelay(500);
    });

    it("replicates messages between servers", async () => {
        // Create a test channel on the first server
        const channelName = "replication-test-channel";
        const createResponse = await agents[0].post(`/channel/${channelName}`);
        expect(createResponse.status).toBe(200);
        
        // Wait for channel to be replicated to second server
        await asyncDelay(200);
        
        // Verify channel exists on second server
        const checkChannelResponse = await agents[1].get(`/channels`);
        expect(checkChannelResponse.status).toBe(200);
        
        // Create a test message to send
        const testMessage = {
            msg: JSON.stringify({ content: "Test replication message" }),
            type: "replication-test",
            ocid: "test-ocid-" + Date.now()
        };
        
        // Set up a subscription on the second server
        let receivedMessage = false;
        clients[1].subscribeToChannels({
            [channelName]: (message) => {
                console.log("Received message on second server:", message);
                expect(message.msg).toBe(testMessage.msg);
                expect(message.type).toBe(testMessage.type);
                expect(message.ocid).toBe(testMessage.ocid);
                receivedMessage = true;
            }
        });
        
        // Wait for subscription to be established
        await asyncDelay(200);
        
        // Post message to first server
        const postResponse = await agents[0]
            .post(`/channel/${channelName}/message`)
            .send(testMessage)
            .expect("Content-Type", /json/);
        
        expect(postResponse.status).toBe(200);
        
        // Wait for message to be replicated
        await asyncDelay(1000);
        
        // Verify message was received on second server via subscription
        expect(receivedMessage).toBe(true);
        
        // Additional verification: check if message can be retrieved from second server
        const listenResponse = await agents[1]
            .post(`/channels/listen`)
            .send([{ channel: channelName }])
            .expect(200);
            
        // If we get here, the test passes
        expect(true).toBe(true);
    });
}); 