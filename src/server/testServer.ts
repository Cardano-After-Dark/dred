import { createServer, DredServer } from "./DredServer";
import { Express } from "express";
import { Server } from "http";
import supertest from "supertest";
import Redis from "ioredis";
import { DredClient } from "../client";
import { AddressInfo } from "net";

let app: Express;
let listener: Server; // http.Server from node interfaces
let server: DredServer;

afterAll(async () => {
    const redis = server.redis
    redis.disconnect();
    listener && listener.close();
});
afterEach(async () => {
    const redis = server?.redis;

    await redis.flushdb();
    // const stream = redis.scanStream();
    // stream.on("data", (resultKeys) => {

    // });
});

export async function testSetup() {
    server = server || (await createServer());
    app = app || server.api;

    listener = server.listen();
    const addr = listener.address();
    if (addr === null) throw new Error(`server is not listening`);
    if ("string" === typeof addr)
        throw new Error(`Unix socket not supported currently`);

    const agent = supertest.agent(listener);
    const client = new DredClient({ ...addr, insecure: true });
    return { agent, app, server, client };
}
