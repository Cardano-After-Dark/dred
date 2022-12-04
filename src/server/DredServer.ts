import express, { Express, RequestHandler, Response } from "express";
import bodyParser from "body-parser";
// var bodyParser = require("body-parser");

import { Server } from "http";
import Redis from "ioredis";
import { DredClient } from "../client";
import { RedisSet } from "../redis/RedisSet";
//@ts-ignore
import { RedisChannels } from "@hearit-io/redis-channels";
import { Subscriber } from "../Subscriber";
import { JSONValueAdapter, RedisHash, ValueAdapter } from "src/redis/RedisHash";
import { ChannelOptions } from "src/types/ChannelOptions";

import { StringNacl } from "src/util/StringNacl";

const logging = parseInt(process.env.LOGGING || "0");

const redis = new Redis();
export interface ExpressWithRedis extends Express {
    redis: null | typeof Redis;
}

const peers = new Set<DredClient>();
function setupRedis() {
    return redis;
}

const optionsSerializer: ValueAdapter<ChannelOptions> = {
    toRedis(v: ChannelOptions) {
        if ("member" !== v.approveJoins) v.approveJoins = "owner";

        return JSONValueAdapter.toRedis(v);
    },
    fromRedis(v: string) {
        const g = JSONValueAdapter.fromRedis(v) as any;
        const opts = { ...g } as ChannelOptions;
        opts.createdAt = new Date(g.createdAt);
        g.expiresAt && (opts.expiresAt = new Date(g.expiresAt));
        return opts;
    },
};
export class DredServer {
    api: Express;
    redis: Redis;
    channelConn: RedisChannels;
    listener: null | Server; // http.Server from node types
    channelList: RedisSet;
    channelOptions: RedisHash<string, object>;
    producers: Map<string, any>;
    subscribers: Map<string, Set<Subscriber>>;
    options: Object;
    verifier: StringNacl;
    constructor(options = {}) {
        this.log("+server with", { options });
        this.api = express();
        this.redis = this.setupRedis();
        this.listener = null;
        this.verifier = new StringNacl();

        this.channelList = new RedisSet(redis, "channels");
        this.channelOptions = new RedisHash(
            redis,
            "channelOptions",
            optionsSerializer
        );
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
        await this.channelConn.cleanup();
        await this.channelConn.this?.redis?.quit();
        this.channelConn.this?.redis?.disconnect();
        await this.redis.quit();
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

    log(...args: any[]) {
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
        this.api.post("/channel/:channelId/join", (...args) => {
            this.joinInChannel(...args);
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
        const options: ChannelOptions = req.body;
        const found = await this.channelList.has(channelId);
        if (found) {
            res.status(400).json({ error: "channel already exists" });
            return next();
        }
        let {
            encrypted,
            owner,
            members = [],
            allowJoining,
            approveJoins,
            memberLimit,
            expiresAt,
            messageLifetime,
            signature,
        } = options;

        expiresAt = expiresAt ? new Date(expiresAt) : undefined;
        const now = new Date();
        if (expiresAt && now > expiresAt) {
            res.status(422).json({
                error: "channel expiresAt is already in the past",
            });
            return next();
        }

        // this.log("chan create");
        if (encrypted) {
            if (!owner) {
                res.status(400).json({
                    error: "missing required 'owner' setting for an encrypted channel",
                });
                return next();
            }
            if (!signature) {
                res.status(400).json({
                    error: "missing signature; use the result of sign(channelName)",
                });
                return next();
            }
            const verified = await this.verifier.verifySig(
                channelId,
                signature,
                owner
            );
            if (!verified) {
                res.status(400).json({
                    error: "bad signature; use the result of sign(channelName)",
                });
                return next();
            }
        }
        //! it doesn't allow any extraneous JSON keys to leak through the options during channel-creation
        //   note: have a use-case for storing more details with the channel options?  Let's discuss.
        const opts: ChannelOptions = {
            encrypted,
            owner,
            members,
            allowJoining,
            approveJoins,
            memberLimit,
            expiresAt,
            messageLifetime,
            signature,
            createdAt: new Date(),
        };

        await this.setChanOptions(channelId, opts);
        await this.channelList.add(channelId);
        await this.channelCreated(channelId, opts);
        res.json({
            id: channelId,
            status: "created",
            ...opts,
        });
        next();
    };
    async channelCreated(channelId, opts) {
        //! it allows specific subclass of dred server to be notified of channel-creation
    }

    async getChanOptions(channelName: string): Promise<ChannelOptions> {
        const obj = await this.channelOptions.get(channelName);
        return obj as ChannelOptions;
    }
    async setChanOptions(
        channelName: string,
        options: ChannelOptions
    ): Promise<void> {
        await this.channelOptions.set(channelName, options);
    }

    joinInChannel: RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        const { myId, member, signature } = req.body;
        const found = await this.channelList.has(channelId);

        const now = new Date();

        if (!found) {
            res.status(400).json({ error: "invalid channel" });
            return next();
        }
        //! the channel must be encrypted (non-encrypted channels are open by definition)
        const opts = await this.getChanOptions(channelId);
        if (opts.expiresAt && now > opts.expiresAt) {
            this.log(
                `expiration '${opts.expiresAt.getTime() % 100000}, now '${
                    now.getTime() % 100000
                }`
            );
            res.status(422).json({
                error: "this channel's expiresAt is already past",
            });
            return next();
        }
        if (!opts.encrypted) {
            res.status(400).json({
                error: "/channel/:id/join is not needed for non-encrypted channels",
            });
            return next();
        }
        if (!signature) {
            res.status(400).json({
                error: "missing required 'signature' field in body",
            });
            return next();
        }

        let approvedVerifier;
        if (opts.owner == myId) {
            this.log("owner-approved join");
            approvedVerifier = myId;
        } else if (
            "member" == opts.approveJoins &&
            (opts.members || []).includes(myId)
        ) {
            this.log("member-approved join");
            approvedVerifier = myId;
        } else if (opts.allowJoining) {
            this.log("self-join");
            approvedVerifier = myId;
        }
        if (!approvedVerifier) {
            console.log("unauthorized");

            res.status(403).json({
                error: "unauthorized",
            });
            return next();
        }
        let verified, error;
        try {
            verified = await this.verifier.verifySig(
                member,
                signature,
                approvedVerifier
            );
            if (!verified) error = "verify failed";
        } catch (e: any) {
            error = e.message;
        }
        if (!verified) {
            res.status(400).json({
                error: `bad signature: ${error}`,
            });
            return next();
        }

        //! trying to join an expired channel produces an error
        //! the owner can join someone by pubKey, even if the memberLimit is reached
        //! non-owners cannot exceed the memberLimit (if configured)
        //! a non-member can join themself if allowJoining is true
        //! a member can join someone by pubKey if approveJoins: member

        opts.members = opts.members || [];
        opts.members.push(member);
        await this.setChanOptions(channelId, opts);

        //! if allowed, it returns a success indicator
        res.json({
            status: "joined",
        });
        next();
    };

    async mkChannelProducer(channelId: any) {
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
            subs?.delete(subscriber);
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
            //NOTE: during tests, this can fail due to race with flushdb() : (
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
