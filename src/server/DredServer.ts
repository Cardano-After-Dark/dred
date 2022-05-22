import express, { Express, RequestHandler } from "express";
import { Server } from "http";
import Redis from "ioredis";
import { DredClient } from "../client";
import { RedisSet } from "../redis/RedisSet";
const redis: Redis.Redis = new Redis();
export interface ExpressWithRedis extends Express {
    redis: null | Redis.Redis;
}

const peers = new Set<DredClient>();
function setupRedis() {
    return redis;
}

export class DredServer {
    api: Express;
    redis: Redis.Redis;
    listener: null | Server; // http.Server from node types
    channelList: RedisSet;
    options: Object;
    constructor(options = {}) {
        this.api = express();
        this.redis = this.setupRedis();
        this.listener = null;

        this.channelList = new RedisSet(redis, "channels");
        this.options = options;

        this.setupExpressHandlers();
    }
    listen(...args: any[]) {
        return (this.listener = this.api.listen(...args));
    }
    get address() {
        const { listener } = this;
        if (null === listener) throw new Error(`not yet listening`);

        const addr = listener.address();
        if (addr === null) throw new Error(`server is not listening`);
        if ("string" === typeof addr)
            throw new Error(`Unix socket not supported currently`);

        return addr;
    }
    setupRedis() {
        // redis.subscribe(...).on("message", (event) => {
        //     for (const peer of peers) {
        //         peer.addEvent(event)
        //     }
        // })
        return redis;
    }
    mkClient({ ...options } = {}): DredClient {
        return new DredClient({ ...this.address, ...options, ...this.options });
    }

    setupExpressHandlers() {
        this.api.use((req, res, next) => {
            process.env.LOGGING &&
                console.log(`-> ${req.method} ${req.originalUrl}`);
            next();
        });

        //! it allows handlers to be mocked
        this.api.post("/channel/:channelId", (...args) => {
            this.createChannel(...args);
        });
        this.api.post("/channel/:channelId/message", (...args) => {
            this.postMessageInChannel(...args);
        });
    }

    createChannel: RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        const found = await this.channelList.has(channelId);
        if (found) {
            res.status(400).json({ error: "channel already exists" });
            return next();
        }
        // console.log("chan create");
        await this.channelList.add(channelId);
        res.json({
            id: channelId,
            status: "created",
        });
        next();
    };

    postMessageInChannel: RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        const found = await this.channelList.has(channelId);
        if (!found) {
            res.status(404).json({ error: "channel not found" });
            return next();
        }

        res.json({ status: "created" });
        next();
    };
}

export async function createServer() {
    const server = new DredServer();
    const { api, redis } = server;
    api.set("redis", redis);

    api.use(express.json({}));
    const messagesInChannel = new RedisSet(redis);

    return server;
}

// import ndjsonStream from "./betterJsonStream";
// res.sendUpdate = function sendUpdate(json) {
//   // if (json.event !== "keepalive") debugger
//   const update = JSON.stringify(json);
//   // debug("update: ", update)
//   res.write(update + "\n");
//   res.flush(); // writes through compression middleware
// };
