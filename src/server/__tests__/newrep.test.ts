import { beforeAll, afterAll, beforeEach, afterEach, describe, it, vi, expect } from "vitest";
import request, { SuperTestWithHost, Test } from "supertest";
import { Express } from "express";

import { testSetup } from "../testServer.js";
import { DredClient } from "../../client/DredClient.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";
import { zonedLogger } from "@poshplum/utils";
import { colors } from "../../picocolors/picocolors.js";
import { inspect } from 'util';

const { magenta } = colors;

// Test configuration
const CHANNEL_NAME = "news";
const REPLICATION_TIMEOUT = 2000;
const SETUP_DELAY = 100;

describe("Message Replication - NO, THIS IS THE NEW TEST", () => {
    let test: {
        agent: SuperTestWithHost<Test>;
        app?: Express;
        server: DredServer;
        client: DredClient;
        servers: DredServer[];
    };

    let dred1: DredServer;
    let dred2: DredServer;
    let dred3: DredServer;
    let c1: DredClient;
    let c2: DredClient;
    let c3: DredClient;

    // Message collectors for each client
    let c1Messages: MessageCollector;
    let c2Messages: MessageCollector;
    let c3Messages: MessageCollector;

    const testLogger = zonedLogger("test", {
        loggerId: "t-rep",
        color: magenta.start,
    });

    beforeAll(async () => {
        test = await testSetup();
        dred1 = test.servers[0];
        dred2 = test.servers[1];
        dred3 = test.servers[2];
    });

    beforeEach(async () => {
        await asyncDelay(SETUP_DELAY);

        // Create clients
        c1 = dred1.mkClient("first");
        await c1.generateKey();

        c2 = dred2.mkClient("second");
        await c2.generateKey();

        c3 = dred3.mkClient("third");
        await c3.generateKey();

        // // Create channels on all servers
        // await c1.createChannel(CHANNEL_NAME);
        // await c2.createChannel(CHANNEL_NAME);
        // await c3.createChannel(CHANNEL_NAME);

        // // Refresh channel lists
        // c1.channels = await c1.connManager.getChannelList();
        // c2.channels = await c2.connManager.getChannelList();
        // c3.channels = await c3.connManager.getChannelList();

        // // Initialize message collectors
        // c1Messages = new MessageCollector();
        // c2Messages = new MessageCollector();
        // c3Messages = new MessageCollector();

        // // Subscribe to channels
        // await c1.subscribeToChannels({
        //     [CHANNEL_NAME]: c1Messages.getHandler("c1")
        // });
        // await c2.subscribeToChannels({
        //     [CHANNEL_NAME]: c2Messages.getHandler("c2")
        // });
        // await c3.subscribeToChannels({
        //     [CHANNEL_NAME]: c3Messages.getHandler("c3")
        // });

        await asyncDelay(SETUP_DELAY);
    });

    afterEach(async () => {
        // Clean up message collectors
        // c1Messages?.clear();
        // c2Messages?.clear();
        // c3Messages?.clear();
        
        // Note: Client cleanup handled by test framework
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

            expect(c1.channels).toContain(CHANNEL_NAME);
            expect(c2.channels).toContain(CHANNEL_NAME);
            expect(c3.channels).toContain(CHANNEL_NAME);
        });
    });
});