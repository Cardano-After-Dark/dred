import { createServer, DredServer } from "./DredServer";
import { Express } from "express";
import { Server } from "http";
import supertest from "supertest";
import Redis from "ioredis";
import { DredClient } from "../client";
import { AddressInfo } from "net";
import { asyncDelay } from "src/util/asyncDelay";

let app: Express;
let listener: Server; // http.Server from node interfaces
let server: DredServer;
let clientCleanupList: Array<DredClient> = [];

afterAll(async () => {
    server && (await server.close());
});

afterEach(async () => {
    for (const client of clientCleanupList) {
        client.disconnect();
    }
    clientCleanupList = [];

    const redis = server?.redis;
    await asyncDelay(150); // avoid race with existing channel-subscriptions?
    await asyncDelay(150); // avoid race with existing channel-subscriptions?
    await redis.flushdb();
    // const stream = redis.scanStream();
    // stream.on("data", (resultKeys) => {

    // });
});

export async function testSetup() {
    if (process.env.JEST_TIMEOUT) {
        jest.setTimeout(parseInt(process.env.JEST_TIMEOUT));
    }
    server = server || (await createServer({ insecure: true }));
    app = app || server.api;

    const realMkClient = server.mkClient.bind(server);
    jest.spyOn(server, "mkClient").mockImplementation(function (...args) {
        const client = realMkClient(...args);
        clientCleanupList.push(client);
        return client;
    });

    listener = server.listen();
    const addr = listener.address();
    if (addr === null) throw new Error(`server is not listening`);
    if ("string" === typeof addr)
        throw new Error(`Unix socket not supported currently`);

    const agent = supertest.agent(listener);
    const client = server.mkClient(); //new DredClient({ ...addr, insecure: true });
    return { agent, app, server, client };
}
