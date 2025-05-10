// import { expect, jest, test } from "@jest/globals";
// These are now global due to globals: true in vitest.config.ts
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import {zonedLogger} from "@poshplum/utils"

import {colors} from "../picocolors/picocolors.js";
const {
    bgBlackBright,
    blue,
    blueBright,
    green,
    greenBright,
    red,
    redBright,
    yellow,
    yellowBright,
    isColorSupported,
    bgBlack,
    magenta,
} = colors;

import { Express } from "express";
import { Server } from "http";
import supertest from "supertest";
import { Redis } from "ioredis";
import { AddressInfo } from "net";

import { createServer, DredServer } from "./DredServer.js";
import { DredClient } from "../client/DredClient.js";
import { asyncDelay } from "../util/asyncDelay.js";
import { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";
import { DredHostDetails } from "../types/DredHosts.js";

if (process.env.VITEST_TIMEOUT) {
    console.log("using vitest timeout override", process.env.VITEST_TIMEOUT);
    vi.setConfig({ testTimeout: parseInt(process.env.VITEST_TIMEOUT) });
} else if (process.env.JEST_TIMEOUT) {
    // For backward compatibility
    console.log("using jest timeout override", process.env.JEST_TIMEOUT);
    vi.setConfig({ testTimeout: parseInt(process.env.JEST_TIMEOUT) });
}

let app: Express;
let listener: Server; // http.Server from node interfaces
let servers: DredServer[] = [];
let server: DredServer; // a single server that tests can push stuff through by default
let clientCleanupList: Array<DredClient> = [];

const monitor = process.env.REDIS_MONITOR ? new Redis(6379, "localhost", { db: 9 }) : undefined;
if (!monitor) {
    console.log("NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1");
}
zonedLogger("root");

let logger = zonedLogger("redis", {color: blue.start+bgBlack.start});
let testLogger = zonedLogger("test", {color: yellow.start, levels: {default: "info"}});
beforeAll(async () => {
    const startTime = Math.round(Date.now() / 1000);
    console.log("isColorSupported", isColorSupported);
    await monitor?.monitor((err, monitor) => {
        monitor!.on("monitor", (time, args, source, database) => {
            const offset = (time - startTime).toFixed(5);
            const [ip, port] = source.split(":");
            let argsDisplay = "";
            // process args two at a time, adding blue(keys) and green(values) with strings quoted
            for (let i = 0; i < args.length; i += 2) {
                const value =
                    "undefined" == typeof args[i + 1]
                        ? ""
                        : "string" == typeof args[i + 1]
                        ? `"${greenBright(args[i + 1])}"`
                        : greenBright(args[i + 1]);
                argsDisplay += ` ${`${args[i]}`} ${value}`;
            }
            logger.warn(
                `      ` +
                    ` @t=${offset} :${port} -> REDIS #${database}> ${argsDisplay}`
            );
        });
    });
});
beforeEach(async () => {
    for (const s of servers) {
        testLogger.info("beforeEach: flushing redis");
        await s.redis?.flushdb();
        await s.reset();
    }
});

afterEach(async () => {
    testLogger.info("afterEach: clean up clients");
    for (const client of clientCleanupList) {
        client.disconnect();
    }
    clientCleanupList = [];

    for (const server of servers) {
        const redis = server?.redis;
        if (redis) {
            await asyncDelay(150); // avoid race with existing channel-subscriptions?
            await server.reset(true, (redis) => {
                testLogger.info("afterEach: flushing redis");
                return redis?.flushdb()
            });
            // await  server.close();

            testLogger.info("afterEach: restoring default channels");
            server.ensureDefaultChannels();
            testLogger.info("------------------ did reset redis with default channels --------------");
        }
    }
    // const stream = redis.scanStream();
    // stream.on("data", (resultKeys) => {

    // });
});
afterAll(async () => {
    // debugger
    monitor?.disconnect();
    for (const s of servers) {
        // console.log("closing server", s.myServerInfo?.port)
        // s.channelConn.close();
        // await  s.close();
        s.reset(false);
    }
});

export async function testSetup() {
    const hosts: DredHostDetails[] = [
        { serverId: "first", address: "localhost", port: "53032", insecure: true },
        { serverId: "second", address: "localhost", port: "53033", insecure: true },
        { serverId: "third", address: "localhost", port: "53034", insecure: true },
    ];
    let i = 0;
    for (const server of hosts) {
        //! creates a separate discovery agent for each server; each one uses the same full list of hosts.
        const discovery = new StaticHostDiscovery({
            hosts,
        }).reset(hosts);
        i++;
        const s = await createServer(
            {
                discovery,
                waitFor: "minimal",
            },
            server.serverId,
            i
        );

        await s.listen();
        servers.push(s);
    }
    server = server || servers[0];
    app = app || server.api;
    // server = server || (await createServer({ insecure: true }));
    // app = app || server.api;

    const realMkClient = server.mkClient.bind(server);
    vi.spyOn(server, "mkClient").mockImplementation(function (...args) {
        const client = realMkClient(...args);
        clientCleanupList.push(client);
        return client;
    });

    const info = server.myServerInfo;
    if (info === null) throw new Error(`server is not listening`);
    if ("string" === typeof info) throw new Error(`Unix socket not supported currently`);

    const agent = supertest.agent(app);
    const client = server.mkClient("first"); //new DredClient({ ...addr, insecure: true });
    await client.generateKey();
    return { agent, app, server, client, servers };
}
