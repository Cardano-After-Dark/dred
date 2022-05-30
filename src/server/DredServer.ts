import express, { Express, RequestHandler } from "express";
var bodyParser = require("body-parser");

import { Server } from "http";
import Redis from "ioredis";
import { DredClient } from "../client";
import { RedisSet } from "../redis/RedisSet";

import { RedisChannels } from "@hearit-io/redis-channels";
import { Subscriber } from "../Subscriber";

const logging = parseInt(process.env.LOGGING);

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
    channelConn: RedisChannels;
    listener: null | Server; // http.Server from node types
    channelList: RedisSet;
    producers: Map<string, any>;
    subscribers: Map<string, Set<Subscriber>>;
    options: Object;
    constructor(options = {}) {
        this.log("+server with", { options });
        this.api = express();
        this.redis = this.setupRedis();
        this.listener = null;

        this.channelList = new RedisSet(redis, "channels");
        this.producers = new Map();
        this.subscribers = new Map();

        this.channelConn = new RedisChannels();
        this.channelConn._log.error = console.error.bind(console);
        this.options = options;

        this.setupExpressHandlers();
    }
    listen(...args: any[]) {
        return (this.listener = this.api.listen(...args));
    }
    async close() {
        this.cancelSubscribers();
        this.redis?.disconnect();
        this.listener?.close();
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

    log(...args) {
        logging && console.log(...args);
    }

    setupExpressHandlers() {
        this.api.use((req, res, next) => {
            this.log(`-> ${req.method} ${req.originalUrl}`);
            next();
        });
        this.api.use(bodyParser.json());

        //! it allows handlers to be mocked
        this.api.post("/channel/:channelId", (...args) => {
            this.createChannel(...args);
        });
        this.api.post("/channel/:channelId/message", (...args) => {
            this.postMessageInChannel(...args);
        });
        this.api.get("/channel/:channelId/subscribe", (...args) => {
            this.subscribeToChannel(...args);
        });
    }

    createChannel: RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        const found = await this.channelList.has(channelId);
        if (found) {
            res.status(400).json({ error: "channel already exists" });
            return next();
        }
        // this.log("chan create");
        await this.channelList.add(channelId);
        res.json({
            id: channelId,
            status: "created",
        });
        next();
    };

    async mkChannelProducer(channelId) {
        let producer = this.producers.get(channelId);
        if (producer) return producer;

        producer = await this.channelConn.use(channelId);
        this.producers.set(channelId, producer);

        return producer;
    }

    postMessageInChannel: RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        const found = await this.channelList.has(channelId);
        if (!found) {
            res.status(404).json({ error: "channel not found" });
            return next();
        }
        const message = req.body;

        this.log("server: postMessage", message);
        const tunnelProducer = await this.mkChannelProducer(channelId);
        await this.channelConn.produce(tunnelProducer, JSON.stringify(message));

        res.json({ status: "created" });
        next();
    };

    cancelSubscribers() {
        for (const [chan, subscribers] of this.subscribers) {
            for (const sub of subscribers) {
                sub.cancel();
            }
        }
    }
    get subscribeTimeout() {
        return 10000;
    }
    subscribeToChannel: RequestHandler = async (req, res, next) => {
        let cancelled = false;

        function sendUpdate(json: Object) {
            // if (json.event !== "keepalive") debugger
            const update = JSON.stringify(json);
            // debug("update: ", update)
            res.write(update + "\n");

            (res as any)._flush(); // writes through compression middleware
        }

        const { channelId } = req.params;
        const found = await this.channelList.has(channelId);
        if (!found) {
            res.status(404).json({ error: "channel not found" });
            return next();
        }
        const tunnel = await this.channelConn.use(channelId);
        await this.channelConn.subscribe(tunnel);

        const cleanup = () => {
            subs.delete(subscriber);
            this.channelConn.unsubscribe(tunnel);
            next();
        };
        const cancel = () => {
            cancelled = true;
            cleanup();
        };
        const subscriber: Subscriber = {
            notify: sendUpdate,
            cancel,
        };

        let subs = this.subscribers.get(channelId);
        if (!subs) {
            this.subscribers.set(channelId, (subs = new Set()));
        }
        subs.add(subscriber);
        res.on("close", cleanup);

        try {
            for await (const events of this.channelConn.consume(
                tunnel,
                "all",
                10,
                this.subscribeTimeout
            )) {
                for (const e of events) {
                    const { id, data } = e;
                    this.log(`server: ${channelId} <- event ${id}: `, e.data);
                    const parsed = JSON.parse(data);
                    sendUpdate(parsed);
                }
            }
        } catch (consumeError) {
            if (!cancelled) {
                this.log("consume error; TODO: reconnect/retry", consumeError);
            }
        }
    };
}

export async function createServer({ ...options }) {
    const server = new DredServer(options);
    const { api, redis } = server;
    api.set("redis", redis);

    api.use(express.json({}));
    const messagesInChannel = new RedisSet(redis);

    return server;
}
