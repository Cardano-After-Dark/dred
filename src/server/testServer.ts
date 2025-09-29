// import { expect, jest, test } from "@jest/globals";
// These are now global due to globals: true in vitest.config.ts
import { afterAll, afterEach, beforeAll, beforeEach, vi } from "vitest";
import { zonedLogger } from "@poshplum/utils";

import { colors } from "../picocolors/picocolors.js";
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
    magentaBright,
} = colors;

import type { Express } from "express";
import { Server } from "http";
import supertest, { type SuperTestWithHost, type Test } from "supertest";
import { Redis } from "ioredis";
import type { AddressInfo } from "net";
import { asyncDelay } from "../util/asyncDelay.js";

import { createServer, DredServer } from "./DredServer.js";
import { DredClient, type DredClientArgs } from "../client/DredClient.js";

import { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";
import type { DredHostDetails } from "../types/DredHosts.js";

if (process.env.VITEST_TIMEOUT) {
    console.log("using vitest timeout override", process.env.VITEST_TIMEOUT);
    vi.setConfig({ testTimeout: parseInt(process.env.VITEST_TIMEOUT) });
} else if (process.env.JEST_TIMEOUT) {
    throw new Error("use VITEST_TIMEOUT, not JEST_TIMEOUT");
}

export class TestDredServer extends DredServer {
    /**
     * Create a DredClient instance, but does not generate a key.
     * Note: The caller should call generateKey() after creating the client.
     *
     * @param serverSelection - The server ID to connect to.
     * @param clientArgs - Additional client configuration options.
     * @param serverManaged - Whether the client is managed by the server (affects cleanup).
     * @returns A DredClient instance.
     */
    mkClient(serverSelection: string, clientArgs: Partial<DredClientArgs> = {}): DredClient {
        if (process.env.NODE_ENV !== "test") {
            throw new Error("mkClient() is only for use in test environment");
        }

        const discovery = clientArgs.discovery ?? this.clientArgs.discovery;
        if (!discovery) throw new Error("discovery is required");

        const oneHost = discovery.hosts!.find((h) => h.serverId === serverSelection);
        if (!oneHost) {
            this.logger.error(`server ${serverSelection} not found in discovery`, discovery);
            throw new Error(`server ${serverSelection} not found in discovery`);
        }
        const singleDiscovery = new StaticHostDiscovery({
            hosts: [oneHost],
        });

        const client = new DredClient({
            // name: `${serverSelection || ""}-${clientIndex++}`,
            ...this.clientArgs,
            ...clientArgs,
            neighborhood: this.nbh,
            discovery: singleDiscovery,
        });

        return client;
    }

    async close() {
        await super.close();
        this.reset(false);
    }

    async reset(reconnect?: boolean, finalCleanup?: (r?: Redis) => any) {
        if (process.env.NODE_ENV !== "test") {
            throw new Error("reset() is only for use in test environment");
        }
        this.progress("server: reset()");

        // Cleanup replication client first
        await this.cleanupReplication();

        // Wait for channel cleanup to complete fully
        await this.channelConn.cleanup().catch(warning.bind(this, "channelConn.cleanup()"));

        // Small delay to ensure all Redis operations from channel cleanup complete
        await new Promise((resolve) => setTimeout(resolve, 10));

        finalCleanup?.(this.redis);
        this.resetting = true;
        await this.redis?.quit().catch(warning.bind(this, "redis.quit()"));
        this.redis?.removeAllListeners();
        this.channelConn = undefined;
        this.redis = undefined;

        const doReconnect = reconnect ?? true;
        if (doReconnect) {
            this.setupRedis(this.redisUrl);
            this.resetting = false;

            // Restart replication after reset if it was enabled
            if (this.args.replicate) {
                // this.warn(`🔄 Restarting replication after reset`);
                // // Wait for setupPending to complete, then start replication (with delay)
                // if (this.setupPending) {
                //     this.setupPending.then(() => {
                //         this.startReplicating()
                //     }).catch((error) => {
                //         this.warn(`❌ Replication restart failed:${error.message}`);
                //     });
                // } else {
                //     // If no setupPending, start immediately
                //     this.startReplicating();
                // }
            } else {
                // test environment normally restarts replication "manually", right after the reset() calls are all done.
                // this.warn(`⚠️  Replication remains DISABLED after reset`);
            }

            return this.setupPending;
        }
        function warning(this: TestDredServer, activityName) {
            return (e) => {
                this.warn(`during close: error in ${activityName}:\n\t`, e.message || e);
            };
        }
    }
}

let app: Express;
let servers: TestDredServer[] = [];
let server: TestDredServer; // a single server that tests can push stuff through by default
let clientCleanupList: Array<DredClient> = [];
let replicatorClientCleanupList: Array<DredClient> = [];

const rootLogger = zonedLogger("root");
const monitor = process.env.REDIS_MONITOR ? new Redis(6379, "localhost", { db: 9 }) : undefined;
if (!monitor) {
    console.log("NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1");
}

// export loggers for use in tests
export const redisLogger1 = zonedLogger("redis", {
    color: blueBright.start + bgBlack.start,
    loggerId: "mon1",
});
export const redisLogger2 = zonedLogger("redis", {
    color: greenBright.start + bgBlack.start,
    loggerId: "mon2",
});
export const redisLogger3 = zonedLogger("redis", {
    color: magentaBright.start + bgBlack.start,
    loggerId: "mon3",
});
export const testLogger = zonedLogger("test", { color: yellow.start, levels: { default: "info" } });

// Minimal approach: fix Redis cleanup timing issues at the source

beforeAll(async () => {
    testLogger.info("-- beforeAll()");
    await testSetup();
    const startTime = Math.round(Date.now() / 1000);
    // testLogger.info("isColorSupported", isColorSupported);
    await monitor?.monitor((err, monitor) => {
        monitor!.on("monitor", (time, args, source, database) => {
            const now = Date.now();
            const [s, ms6] = time.split(".");
            const ms3 = Math.round(parseInt(ms6.slice(0, 4)) / 10);
            const didHappenAt = parseInt(s) * 1000 + ms3;
            const offset = didHappenAt - now;
            const offsetStr = offset < 0 ? redBright(`${offset}ms `) : "";
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
            const logger = {
                1: redisLogger1,
                2: redisLogger2,
                3: redisLogger3,
            }[parseInt(database)]!.child({ time: didHappenAt });
            logger.trace(`${offsetStr} :${port}>${argsDisplay}`);
        });
    });
    testLogger.info("================== done beforeAll()");
});

beforeEach(async () => {
    // infra running
    testLogger.progress("  --- beforeEach(): resetting redis and channels");

    // 1. STOP replication on all servers first
    testLogger.debug("beforeEach: phase 1 - cleaning up replication");
    for (const server of servers) {
        testLogger.debug("beforeEach: cleaning up replication for server", server.serverId);
        await server.cleanupReplication();
    }

    // 2. RESET Redis and servers (existing logic)
    for (const server of servers) {
        // this is to raze the state of the redis DB --> predictable state for tests
        await server.redis?.flushdb();
        await server.reset();
        // testLogger.debug("beforeEach: establishing default channels");
        await server.pendingSetup();
    }
    testLogger.progress("  --- did reset redis with default channels in beforeEach");

    testLogger.progress("beforeEach() starting replication")
    // XXXXXXXXXXX reset() already does this
    // ?????? or, let reset() only do disconnecting, while this does the reconnecting.
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    
    // 3. RESTART replication on all servers
    for (const server of servers) {
        await server.setupReplication();
    }
    testLogger.progress("----------------------- before test -----------------------");
});

afterEach(async () => {
    testLogger.progress("----------------------- after test ------------------------");

    // 1 Clean up replication first (have their own clients)
    testLogger.debug("afterEach: phase 1 - cleaning up replication");
    for (const server of servers) {
        try {
            testLogger.debug("afterEach: cleaning up replication for server", server.serverId);
            await server.cleanupReplication();
        } catch (error) {
            testLogger.debug(`afterEach: replication cleanup error: ${error}`);
        }
    }

    // 2 Disconnect all clients, wait for disconnection to complete
    testLogger.debug("afterEach: phase 2 - disconnecting clients");
    const allClients = [...clientCleanupList, ...replicatorClientCleanupList];

    // Disconnect all clients
    for (const client of allClients) {
        try {
            testLogger.debug(`afterEach: disconnecting client ${client.clientid || "unknown"}`);
            client.disconnect();
        } catch (error) {
            testLogger.debug(`afterEach: client disconnect error: ${error}`);
        }
    }

    // Brief wait for async disconnect operations to complete
    testLogger.debug("afterEach: waiting for disconnect operations to complete");
    await new Promise((resolve) => setTimeout(resolve, 20));

    // Clear client lists
    clientCleanupList.length = 0;
    replicatorClientCleanupList.length = 0;

    // 3: safe to reset servers and flush Redis
    testLogger.debug("afterEach: phase 3 - resetting servers");
    for (const server of servers) {
        const redis = server?.redis;
        if (redis) {
            testLogger.debug("afterEach: resetting server", server.myServerInfo?.port);

            await server.reset(true, (redis) => {
                testLogger.debug("afterEach: flushing redis");
                redis?.flushdb("SYNC");
                testLogger.debug("afterEach: done flushing redis");
            });
        }
    }

    testLogger.progress("     =========== done: test cleanup/afterEach() =========== ");
});
afterAll(async () => {
    // debugger
    monitor?.disconnect();
    for (const server of servers) {
        testLogger.debug("closing server", server.myServerInfo?.port);
        try {
            await server.reset(false);
        } catch (error) {
            // Expected during test shutdown:
            if (
                error instanceof Error &&
                (error.message?.includes("Connection is closed") ||
                    error.message?.includes("Connection is not established"))
            ) {
                // Suppress known Redis shutdown errors:
                return;
            }
            // Unexpected error - log for debugging
            testLogger.warn(`Unexpected error during server shutdown: ${error}`);
        }
    }
    // Brief delay to ensure all async operations complete before test framework exits
    await new Promise((resolve) => setTimeout(resolve, 20));
});

type SetupDetails = {
    agent: SuperTestWithHost<Test>;
    app?: Express;
    server: TestDredServer;
    client: DredClient;
    servers: TestDredServer[];
    testLogger: ReturnType<typeof zonedLogger>;
}

let setupDetails: SetupDetails | Promise<SetupDetails> | undefined = undefined;

export async function testSetup() {
    if (setupDetails) {
        return setupDetails;
    }
    setupDetails = initializeTestServers();
    return setupDetails.then((details) => {
        setupDetails = details;
        return details;
    });
}

export async function initializeTestServers(): Promise<SetupDetails> {
    const hosts: DredHostDetails[] = [
        { serverId: "first", address: "localhost", port: "53032", insecure: true },
        { serverId: "second", address: "localhost", port: "53033", insecure: true },
        { serverId: "third", address: "localhost", port: "53034", insecure: true },
    ];
    let i = 1;
    const neighborhood = "dredTestNbh";
    for (const server of hosts) {
        //! creates a separate discovery agent for each server; each one uses the same full list of hosts.
        const discovery = new StaticHostDiscovery({
            hosts,
            neighborhood,
        }).reset(hosts);
        const s = await createServer(
            {
                discovery,
                waitFor: "minimal",
                neighborhood: neighborhood,
                replicate: false,
                // Always preserve StaticHostDiscovery, set neighborhood separately if needed
            },
            server.serverId,
            i++,
            TestDredServer
        );

        await s.listen();
        servers.push(s as TestDredServer);
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

            clientCleanupList.push(client);
            return client;
        });
    }

    const info = server.myServerInfo;
    if (info === null) throw new Error(`server is not listening`);
    if ("string" === typeof info) throw new Error(`Unix socket not supported currently`);

    const agent = supertest.agent(app);
    const client = server.mkClient("first"); //new DredClient({ ...addr, insecure: true });
    await client.generateKey();

    testLogger.info("================== initializeTestServers() done");

    return { agent, app, server, client, servers, testLogger };
}
