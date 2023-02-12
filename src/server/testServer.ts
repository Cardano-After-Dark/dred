//@ts-expect-error
import { expect, jest, test } from "@jest/globals";

import { Express } from "express";
import { Server } from "http";
import supertest from "supertest";
import Redis from "ioredis";
import { AddressInfo } from "net";

import { createServer, DredServer } from "./DredServer";
import { DredClient } from "../client/DredClient";
import { asyncDelay } from "../util/asyncDelay";
import { DevEnvLocalDiscovery } from "../peers/DevEnvLocalDiscovery";
import { DredHostDetails } from "../types/DredHostDetails";

if (process.env.JEST_TIMEOUT) {
    console.log("using jest timeout override", process.env.JEST_TIMEOUT);
    jest.setTimeout(parseInt(process.env.JEST_TIMEOUT));
}


let app: Express;
let listener: Server; // http.Server from node interfaces
let servers: DredServer[] = [];
let server: DredServer; // a single server that tests can push stuff through by default
let clientCleanupList: Array<DredClient> = [];

afterAll(async () => {
    debugger
    for (const s of servers) {
        debugger
        await  s.close();
    }
});

afterEach(async () => {
    for (const client of clientCleanupList) {
        client.disconnect();
    }
    clientCleanupList = [];

    const redis = server?.redis;
    if (redis) {
        await asyncDelay(150); // avoid race with existing channel-subscriptions?
        await asyncDelay(150); // avoid race with existing channel-subscriptions?
        await redis.flushdb();
    }
    // const stream = redis.scanStream();
    // stream.on("data", (resultKeys) => {

    // });
});

export async function testSetup() {
    const hosts: DredHostDetails[] = [
        {serverId: "primary", address: "localhost", port: "3032", insecure: true },
        {serverId: "second", address: "localhost", port: "3033", insecure: true}
    ]
    for (const server of hosts) {
        //! creates a separate discovery agent for each server; each one uses the same full list of hosts.
        const discovery = new DevEnvLocalDiscovery().reset(hosts);
        const s = await createServer({discovery}, server.serverId);
        await s.listen();
        servers.push(s)
    }
    server = server || servers[0]
    app = app || server.api
    // server = server || (await createServer({ insecure: true }));
    // app = app || server.api;

    const realMkClient = server.mkClient.bind(server);
    jest.spyOn(server, "mkClient").mockImplementation(function (...args) {
        const client = realMkClient();
        clientCleanupList.push(client);
        return client;
    });

    const info = server.myServerInfo;
    if (info === null) throw new Error(`server is not listening`);
    if ("string" === typeof info)
        throw new Error(`Unix socket not supported currently`);

    const agent = supertest.agent(app);
    const client = server.mkClient(); //new DredClient({ ...addr, insecure: true });
    await client.generateKey();
    return { agent, app, server, client, servers };
}
