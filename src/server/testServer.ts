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
    magentaBright
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
import { once } from "events";

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
let replicatorClientCleanupList: Array<DredClient> = [];

const rootLogger = zonedLogger("root");
const monitor = process.env.REDIS_MONITOR ? new Redis(6379, "localhost", { db: 9 }) : undefined;
if (!monitor) {
    console.log("NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1");
}

// export loggers for use in tests
export const redisLogger1 = zonedLogger("redis", {
    color: blueBright.start+bgBlack.start,
    loggerId: "mon1",
});
export const redisLogger2 = zonedLogger("redis", {
    color: greenBright.start+bgBlack.start,
    loggerId: "mon2",
});
export const redisLogger3 = zonedLogger("redis", {
    color: magentaBright.start+bgBlack.start,
    loggerId: "mon3",
});
export const testLogger = zonedLogger("test", {color: yellow.start, levels: {default: "info"}});

beforeAll(async () => {
    const startTime = Math.round(Date.now() / 1000);
    testLogger.info("isColorSupported", isColorSupported);
    await monitor?.monitor((err, monitor) => {
        monitor!.on("monitor", (time, args, source, database) => {
            const now = Date.now()
            const [s, ms6] = time.split(".")
            const ms3 = Math.round(parseInt(ms6.slice(0, 4))/10)
            const didHappenAt = parseInt(s)*1000 + ms3
            const offset = (didHappenAt - now)
            const offsetStr = offset < 0 ? redBright(`${offset}ms `): ""
            const [ip, port] = source.split(":");
            let argsDisplay = ""
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
            const logger = {
                1: redisLogger1,
                2: redisLogger2,
                3: redisLogger3,
            }[parseInt(database)]!.child({time: didHappenAt});
            logger.trace(
                `${offsetStr} :${port}>${argsDisplay}`
            );
        });
    });
});

beforeEach(async () => {
    testLogger.debug("beforeEach: resetting redis and channels");
    for (const server of servers) {
        // this is to raze the state of the redis DB --> predictable state for tests
        await server.redis?.flushdb();
        await server.reset();
        // testLogger.debug("beforeEach: establishing default channels");
        await server.pendingSetup();
        // setTimeout(() => {
        //     server.setupReplication();
        // }, 1000);
        // server.setupReplication();
        // server.listen();
    }
    testLogger.info("  ---- did reset redis with default channels in beforeEach");
    testLogger.info("  -------------------      -----------------    --------------------")


    // probably we need to setup replication once we have confirmation the servers are listening
    for (const server of servers) {
        testLogger.debug(" ==== beforeEach: SETTING UP REPLICATION in TEST for server", server.serverId);
        // COMMENTED OUT FOR NOW TO AVOID THE REPLICATION SETUP ISSUE 
        // await server.setupReplication();
    }

});

afterEach(async () => {
    testLogger.debug("afterEach: cleaning up");
    
    // FIRST: Clean up replication before touching individual clients
    for (const server of servers) {
        try {
            testLogger.debug("afterEach: cleaning up replication for server", server.serverId);
            await server.cleanupReplication();
        } catch (error) {
            testLogger.debug(`afterEach: replication cleanup error: ${error}`);
        }
    }
    
    // SECOND: Clean up replicator-owned clients (they should already be cleaned by replication cleanup)
    testLogger.debug("afterEach: cleaning up replicator clients");
    for (const client of replicatorClientCleanupList) {
        try {
            // Defensive disconnect - these should already be disconnected by replicator cleanup
            client.disconnect();
        } catch (error) {
            testLogger.debug(`afterEach: replicator client disconnect error (likely already disconnected): ${error}`);
        }
    }
    replicatorClientCleanupList = [];
    
    // THIRD: Clean up server-managed clients
    testLogger.debug("afterEach: cleaning up server-managed clients");
    for (const client of clientCleanupList) {
        try {
            // Defensive disconnect - ignore if already disconnected
            client.disconnect();
        } catch (error) {
            testLogger.debug(`afterEach: client disconnect error (likely already disconnected): ${error}`);
        }
    }
    clientCleanupList = [];
    
    // FOURTH: Reset servers (without replication cleanup since we already did it)
    for (const server of servers) {
        const redis = server?.redis;
        if (redis) {
            testLogger.debug("afterEach: resetting server", server.myServerInfo?.port);

            await server.reset(true, (redis) => {
                testLogger.debug("afterEach: flushing redis");
                redis?.flushdb("SYNC")
                testLogger.debug("afterEach: done flushing redis");
            });
            // await  server.close();
        }
    }
    testLogger.info("  ---- cleanup done in afterEach");

    // const stream = redis.scanStream();
    // stream.on("data", (resultKeys) => {

    // });
});
afterAll(async () => {
    // debugger
    monitor?.disconnect();
    for (const server of servers) {
        testLogger.debug("closing server", server.myServerInfo?.port)
        // await  s.close();
        server.reset(false);
    }
});

export async function testSetup() {
    const hosts: DredHostDetails[] = [
        { serverId: "first", address: "localhost", port: "53032", insecure: true },
        { serverId: "second", address: "localhost", port: "53033", insecure: true },
        { serverId: "third", address: "localhost", port: "53034", insecure: true },
    ];
    let i = 0;
    const neighborhood = "dredTestNbh";
    for (const server of hosts) {
        //! creates a separate discovery agent for each server; each one uses the same full list of hosts.
        const discovery = new StaticHostDiscovery({
            hosts,
            neighborhood,
        }).reset(hosts);
        i++;
        const s = await createServer(
            {
                discovery,
                waitFor: "minimal",
                neighborhood: neighborhood,
                // Always preserve StaticHostDiscovery, set neighborhood separately if needed
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

    // Set up client tracking spy for ALL servers (not just the first one)
    for (const s of servers) {
        const realMkClient = s.mkClient.bind(s);
        vi.spyOn(s, "mkClient").mockImplementation(function (...args) {
            const client = realMkClient(...args);
            // Track clients by ownership type
            const isServerManaged = (client as any)._serverManaged !== false;
            if (isServerManaged) {
                clientCleanupList.push(client);
            } else {
                replicatorClientCleanupList.push(client);
            }
            return client;
        });
    }

    const info = server.myServerInfo;
    if (info === null) throw new Error(`server is not listening`);
    if ("string" === typeof info) throw new Error(`Unix socket not supported currently`);

    const agent = supertest.agent(app);
    const client = server.mkClient("first"); //new DredClient({ ...addr, insecure: true });
    await client.generateKey();

    return { agent, app, server, client, servers, testLogger };
}
