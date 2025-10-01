import { beforeAll, afterAll, beforeEach, afterEach, describe, it, vi, expect } from "vitest";
import type { SuperTestWithHost, Test } from "supertest";
import type { Express } from "express";

import { startReplication, TestDredServer, testSetup, testLogger } from "../testServer.js";
import { DredClient, type FullDredMessage } from "../../client/DredClient.js";
import { asyncDelay } from "../../util/asyncDelay.js";
import { colors } from "../../picocolors/picocolors.js";

const { magenta } = colors;

const fit = it.only;

// Test configuration
const CHANNEL_NAME = "news";
const REPLICATION_TIMEOUT = 2000;
const SETUP_DELAY = 100;

interface TestMessage {
    msg: string;
    type: string;
    ocid?: string;
    details?: {
        replFrom?: string;
    };
}

describe("Message Replication", () => {
    let test: {
        agent: SuperTestWithHost<Test>;
        app?: Express;
        server: TestDredServer;
        client: DredClient;
        servers: TestDredServer[];
    };

    let dred1: TestDredServer;
    let dred2: TestDredServer;
    let dred3: TestDredServer;
    let c1: DredClient;
    let c2: DredClient;
    let c3: DredClient;

    // const testLogger = zonedLogger("test", {
    //     loggerId: "repl-test",
    //     color: magenta.start,
    // });

    beforeAll(async () => {
        test = await testSetup();
        dred1 = test.servers[0];
        dred2 = test.servers[1];
        dred3 = test.servers[2];
    });

    beforeEach(async () => {
        // await asyncDelay(SETUP_DELAY);

        // Create clients
        c1 = dred1.mkClient("first");
        c2 = dred2.mkClient("second");
        c3 = dred3.mkClient("third");
        await Promise.all([
            c1.generateKey(),
            c2.generateKey(),
            c3.generateKey(),
        ]);

        await startReplication();
    });

    afterAll(async () => {
        await asyncDelay(SETUP_DELAY);
    });

    describe("Setup Validation", () => {
        it("should have properly configured servers and clients", async () => {
            expect(dred1).toBeDefined();
            expect(dred2).toBeDefined();
            expect(dred3).toBeDefined();
            expect(dred1.serverId).toBe("first");
            expect(dred2.serverId).toBe("second");
            expect(dred3.serverId).toBe("third");
            expect(dred1).not.toBe(dred2);
            expect(dred2).not.toBe(dred3);
            expect(dred1).not.toBe(dred3);

            expect(c1).toBeDefined();
            expect(c2).toBeDefined();
            expect(c3).toBeDefined();
            expect(c1).not.toBe(c2);
            expect(c2).not.toBe(c3);
            expect(c1).not.toBe(c3);

            await c1.subscribeToChannels({})
            await c1.subscribeToChannels({})
            await c1.subscribeToChannels({})
            
            expect(c1.channels).toContain(CHANNEL_NAME);
            expect(c2.channels).toContain(CHANNEL_NAME);
            expect(c3.channels).toContain(CHANNEL_NAME);
        });
    });

    describe("Basic Messaging", () => {
        it("delivers messages within the same server", async () => {
            const testMessage = {
                msg: "Hello from test!",
                type: "greeting",
                ocid: "test-001"
            };

            let success = false;
            await c1.subscribeToChannels({
                [CHANNEL_NAME]: (message: FullDredMessage) => {
                    testLogger.info(`🎉 📥 CLIENT c1 received: ${message.msg}`);
                    expect(message).toMatchObject(testMessage);
                    success = true;
                }
            });
            // Not needed because subscribeToChannels is (now) always fully ready
            // before it returns:
            // testLogger.progress(`⏳ waiting for subscribe to settle`);
            // await asyncDelay(5);
            const response = await test.agent
                .post(`/channel/${CHANNEL_NAME}/message`)
                .send(testMessage)
                .expect(200);

            // not observed to be needed, but /channel/*/message doesn't yet have
            // a pre-response delivery guarantee.  So a little wait is good for now.
            // TODO: adjust ^ and remove this delay
            await asyncDelay(10);
            expect(success).toBe(true);
            testLogger.progress(`🎉  success`);
        });
    });

    describe("Redis Integration", () => {
        // Smoke test: Quick Redis connectivity check to ensure Redis is available before replication tests.
        // For detailed Redis functionality testing, see redis.test.ts
        it("should have working Redis connections for replication", async () => {
            // Verify Redis connections exist
            expect(dred1.redis).toBeDefined();
            expect(dred2.redis).toBeDefined();
            expect(dred3.redis).toBeDefined();
            
            // Simple Redis connectivity test
            const testKey = "replication-redis-test";
            await dred1.redis!.call("SET", testKey, "test-value");
            const result = await dred1.redis!.call("GET", testKey);
            expect(result).toBe("test-value");
            
            // Clean up
            await dred1.redis!.call("DEL", testKey);
        });
    });

    describe("Cross-Server Replication", () => {

        it("should replicate messages between all three servers", async () => {

            const clientMessage: TestMessage = {
                msg: "Hello from c1 client!",
                type: "client-greeting"
            };

            let c2Received = 0;
            let c3Received = 0;
   
            testLogger.info("setting up listeners on each server");

            // CRITICAL: Set up c2 subscription BEFORE sending message
            // The client must be subscribed and ready to receive messages before replication occurs.
            // Without await here, the subscription setup is asynchronous and the client may miss 
            // the replicated message, causing the test to fail intermittently.
            const s2 = c2.subscribeToChannels({
                [CHANNEL_NAME]: (message) => {
                    testLogger.progress(`🎉 📥 CLIENT c2 received: ${message.msg}`);
                    expect(message).toMatchObject(clientMessage);
                    c2Received++;
                }
            });

            const s3 = c3.subscribeToChannels({
                [CHANNEL_NAME]: (message) => {
                    testLogger.progress(`🎉 📥 CLIENT c3 received: ${message.msg}`);
                    expect(message).toMatchObject(clientMessage);
                    c3Received++;
                }
            });
            await Promise.all([s2, s3]);
            testLogger.info("all listeners set up");
            // await asyncDelay(100);
            const clientResponse = await c1.postMessage(CHANNEL_NAME, clientMessage);
            testLogger.info(`📤 CLIENT c1 sent: ${clientMessage.msg}`);

            // Wait for replication to complete
            await asyncDelay(40);
            // if there are multiple deliveries, this would be a bad result.  20ms should give
            // time to detect such a thing.

            expect(c2Received).toBe(1);
            expect(c3Received).toBe(1);
            testLogger.progress(`🎉  success`);
        });

    });
});