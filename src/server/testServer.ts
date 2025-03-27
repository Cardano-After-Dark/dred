// import { expect, jest, test } from "@jest/globals";
// These are now global due to globals: true in vitest.config.ts
import { afterAll, afterEach, beforeAll, vi } from "vitest";

import { Express } from "express";
import { Server } from "http";
import supertest from "supertest";
import {Redis} from "ioredis";
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

const monitor = process.env.REDIS_MONITOR ? new Redis(6379, "localhost", {db: 9}) : undefined
if (!monitor) {
    console.log("NOTE: to enable granular monitoring of redis activity, set REDIS_MONITOR=1")
}

beforeAll(async () => {
    const startTime = Math.round((Date.now() / 1000 ))
        await monitor?.monitor( (err, monitor) => {
            monitor!.on("monitor", (time, args, source, database) => {
                const offset = (time - startTime).toFixed(5);
                console.log(` ${offset} ${source} -> REDIS ${database}>`, ...args);
            })
        })
});

afterAll(async () => {
    // debugger
    if (monitor) {
        try {
            await monitor.disconnect();
        } catch (e) {
            console.warn("Error disconnecting Redis monitor:", e);
        }
    }
    
    for (const s of servers) {
        try {
            console.log("closing server", s.myServerInfo?.port);
            await s.close();
            await asyncDelay(200); // Give servers time to close properly
        } catch (e) {
            console.warn("Error closing server:", e);
        }
    }
});

// This function helps ensure that Redis operations are complete
// before proceeding with test cleanup
async function safeRedisOperation(operation: () => Promise<any>, description: string) {
    try {
        const result = await operation();
        return result;
    } catch (e) {
        console.warn(`Error during Redis ${description}:`, e);
        await asyncDelay(100); // Add delay after errors
        return null;
    }
}

afterEach(async () => {
    console.log("afterEach: clean up clients");
    
    // Disconnect all clients first
    for (const client of clientCleanupList) {
        try {
            await client.disconnect();
            await asyncDelay(50); // Small delay between each client disconnect
        } catch (e) {
            console.warn("Error disconnecting client:", e);
        }
    }
    
    // Clear the client list
    clientCleanupList = [];
    
    // Add extra delay to ensure all client connections are fully closed
    await asyncDelay(300);

    // Then handle Redis cleanup for each server
    for (const server of servers) {
        const redis = server?.redis;
        if (redis) {
            try {
                console.log("afterEach: flushing redis");
                
                // Flush the database with a safe wrapper
                await safeRedisOperation(() => redis.flushdb(), "flushdb");
                
                // Add delay after flushing
                await asyncDelay(150);
                
                console.log("afterEach: restoring default channels");
                
                // Restore default channels with a safe wrapper
                await safeRedisOperation(() => server.ensureDefaultChannels(), "ensureDefaultChannels");
                
                console.log("------------------ did reset redis with default channels --------------");
                
                // Final delay to ensure everything is settled
                await asyncDelay(150);
            } catch (e) {
                console.warn("Error during Redis cleanup:", e);
            }
        }
    }
});

export async function testSetup() {
    const hosts: DredHostDetails[] = [
        {serverId: "first", address: "localhost", port: "53032", insecure: true },
        {serverId: "second", address: "localhost", port: "53033", insecure: true},
        {serverId: "third", address: "localhost", port: "53034", insecure: true}
    ]
    let i = 0;
    for (const server of hosts) {
        //! creates a separate discovery agent for each server; each one uses the same full list of hosts.
        const discovery = new StaticHostDiscovery({
            hosts,
        }).reset(hosts);
        i++;
        const s = await createServer({
            discovery, 
            waitFor: "minimal", 
        }, server.serverId, i);

        await s.listen();
        servers.push(s)
    }
    server = server || servers[0]
    app = app || server.api
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
    if ("string" === typeof info)
        throw new Error(`Unix socket not supported currently`);

    const agent = supertest.agent(app);
    const client = server.mkClient("first"); //new DredClient({ ...addr, insecure: true });
    await client.generateKey();
    return { agent, app, server, client, servers };
}
