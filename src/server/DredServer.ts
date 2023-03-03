//@ts-check

import { Redis, RedisOptions } from "ioredis";
import { Server } from "http";
import express from "express";
import type { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";

//@ts-ignore
import { RedisChannels } from "../redis/streams";

import { DredClient, DredClientArgs } from "../client/DredClient.js";
import { RedisSet } from "../redis/RedisSet.js";
import { Subscriber } from "../Subscriber.js";
import {
    JSONValueAdapter,
    RedisHash,
    StringValueAdapter,
    ValueAdapter,
} from "../redis/RedisHash.js";
import { ChannelOptions } from "../types/ChannelOptions.js";
import { StringNacl } from "../util/StringNacl.js";
import { Discovery } from "../types/Discovery.js";
import { DredHostDetails } from "../types/DredHosts.js";
import { ChanId, ChannelSubs, NbhId } from "../types/ChannelSubscriptions.js";
import { autobind } from "@poshplum/utils";

const logging = parseInt(process.env.LOGGING || "0");
export interface ExpressWithRedis extends express.Application {
    redis: null | typeof Redis;
}

type ListenerSubscriptionList = ChannelSubscriber[];

export type ChannelSubscriber = {
    channel: ChanId;
    stream: streamHandle;
};
type changeFeedUpdater = (...messages: rStreamMsg[]) => void;
type consumerErrorNotifier = (channel: ChanId, e: Error) => void;
type rStreamMsg = (rMsgRaw | rMsgParsed) & {
    id: string;
    channel: ChanId;
    data: string;
    [key: string]: string | undefined;
};

type streamHandle = {
    team: any; //!!! todo: enhance these types
    consumer: any;
};

const peers = new Set<DredClient>();

const optionsSerializer: ValueAdapter<ChannelOptions> = {
    toRedis(v: ChannelOptions) {
        if ("member" !== v.approveJoins && "open" !== v.approveJoins) v.approveJoins = "owner";

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

//!!! todo: augment to support a list of nbh's, with req details for nbh selection
//    - start by using nbh prefix in redis keys.

export class DredServer {
    api: express.Application;
    discovery: Discovery;
    redis: Redis;
    channelConn: RedisChannels;
    listener: null | Server; // http.Server from node types
    args: DredClientArgs & { api?: express.Application };
    channelList: RedisHash<string, string>;
    channelOptions: RedisHash<string, ChannelOptions>;
    producers: Map<string, any>;
    subscribers: Map<string, Set<Subscriber>>;
    clientArgs: DredClientArgs;
    verifier: StringNacl;
    serverId: string;
    myServerInfo?: DredHostDetails;
    get nbh() {
        return this.args.neighborhood;
    }

    setupExpressHandlers() {
        this.api.use((req, res, next) => {
            this.log(`-> ${req.method} ${req.originalUrl}`);
            next();
        });
        this.api.use(cors<Request>());

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
        this.api.get("/channels", (...args) => {
            this.getChannels(...args);
        });
        this.api.get("/channels/subscribe", (...args) => {
            //! it allows clients to subscribe to many channels and receive notification about updates in any of them
            // this.subscribeToChannel(...args);
        });
        this.api.options("/channels/listen", (...args) => {
            //! it approves any allowed cross-origin requests.  These can be limited by domain name
            //  or other attributes of the cross-origin OPTIONS request.
        });
        this.api.post("/channels/listen", (...args) => {
            //! it allows clients to subscribe to many channels and receive notification about updates in any of them
            this.listenOnChannels(...args);
        });
        this.api.use(this.resultLogger);
    }


    constructor(clientArgs: DredClientArgs & { api?: express.Application }, serverId: string) {
        this.args = clientArgs;
        this.serverId = serverId;
        this.discovery = DredClient.resolveDiscovery(clientArgs);
        // const t= express()
        this.log(`+server '${serverId}'`, JSON.stringify(this.discovery, null, 2));
        this.api = this.createExpressServer();
        // const t= express();

        const redisUrl = process.env.REDIS_URL;
        this.redis = this.setupRedis(redisUrl);
        this.listener = null;
        this.verifier = new StringNacl(undefined, this);

        this.channelList = new RedisHash<string, string>(
            this.redis,
            "channels",
            StringValueAdapter
        );
        this.channelOptions = new RedisHash(this.redis, "channelOptions", optionsSerializer);
        this.producers = new Map();
        this.subscribers = new Map();

        //!!! todo: allows the application name to override 'dred' setting in channel names created in Redis
        this.channelConn = new RedisChannels({
            application: `${this.nbh}::`,
            redis: {
                url: redisUrl,
            },
        });
        this.ensureDefaultChannels();
        this.channelConn._log.error = console.error.bind(console);
        this.clientArgs = clientArgs;

        this.setupExpressHandlers();
    }

    setupRedis(url) {
        if (this.redis) throw new Error(`redis connection is already set up`);
        // redis.subscribe(...).on("message", (event) => {
        //     for (const peer of peers) {
        //         peer.addEvent(event)
        //     }
        // })

        //!!! todo: use configured Redis connection details
        console.log(`REDIS_URL ${url}`);
        const options: RedisOptions = {
            // keyPrefix: `${this.nbh}::`  //!!! todo vet this technique.
        };
        if (url) {
            return new Redis(url, options);
        } else {
            return new Redis(options);
        }
    }

    //! it has a mockable function for starting the express server
    createExpressServer(): express.Application {
        return this.args.api || express();
    }

    private setupPending?: Promise<any>;
    //!!! todo: once for each nbh
    ensureDefaultChannels() {
        this.setupPending = new Promise(async (res) => {
            await this.doChannelSetup("_chans");
            await this.doChannelSetup("_auth");
            await this.doChannelSetup("news");
            await this.doChannelSetup("discussion");
            this.setupPending = undefined;
            res(true);
        });
    }
    
    async doChannelSetup(channel: ChanId) {
        const chan = await this.channelList.has(channel);
        if (!chan) {
            await this.channelList.set(channel, "1");
        }
        const streams = this.channelConn;
        const stream = await streams.use(channel);

        //!!! revisit this with a more specific plan : )
        await streams.produce(stream, { type: "genesis" });

        const chans = await streams.use("_chans");
        //!!! revisit this with a more specific plan : )
        await streams.produce(chans, {
            type: "chanCreated",
            channel,
        });
    }

    //
    async listen() {
        await this.setupPending;

        const myInfo = (this.myServerInfo =
            this.myServerInfo || (await this.discovery.myServerInfo(this.serverId)));
        if (!myInfo) throw new Error(`can't identify my own info`);
        const { port, address } = myInfo;
        this.listener = this.api.listen(port, address);
        console.warn(`server '${this.serverId}' listening at ${address}:${port}`);
        return this.listener;
        // express
        //       listen(port: number, hostname: string, backlog: number, callback?: () => void): http.Server;
        //       listen(port: number, hostname: string, callback?: () => void): http.Server;
    }

    async close() {
        this.cancelSubscribers();
        await this.channelConn.cleanup().catch(warning("channelConn.cleanup()"));
        await this.channelConn.this?.redis?.quit().catch(warning("channelConn.redis.quit()"));
        this.channelConn.this?.redis?.disconnect();
        await this.redis.quit().catch(warning("redis.quit()"));
        this.listener?.close();

        function warning(activityName) {
            return (e) => {
                console.warn(`during close: error in ${activityName}:\n\t`, e.message || e);
            };
        }
    }
    async listenDetails() {

    }

    get address() {
        const { listener } = this;
        if (!listener) throw new Error(`not yet listening`);

        const addr = listener.address();
        throw new Error(`is this needed?`);

        if (addr === null) throw new Error(`server is not listening`);
        if ("string" === typeof addr) throw new Error(`Unix socket not supported currently`);

        return addr;
    }
    mkClient(): DredClient {
        return new DredClient(this.clientArgs);
    }

    log(...args: any[]) {
        logging && console.log(...args);
    }
    warn(...args: any[]) {
        logging && console.warn(...args);
    }


    resultLogger: express.RequestHandler = (req, res, next) => {
         this.log(`<- ${res.statusCode} ${req.method} ${req.originalUrl || req.url}`);
    }
    getChannels: express.RequestHandler = async (req, res, next) => {
        const found: string[] = (await this.channelList.keys()) as string[];
        const channels = found.filter((x) => x[0] !== "_");
        res.status(200).json({ channels });
    };
    createChannel: express.RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        const options: ChannelOptions = req.body;
        const found = await this.channelList.has(channelId);
        if (found) {
            res.status(400).json({ error: "channel already exists" });
            return next();
        }

        let {
            channelId: invalidChanId,
            encrypted,
            owner,
            members = [],
            requests = [],
            allowJoining,
            approveJoins,
            memberLimit,
            expiresAt,
            messageLifetime,
            signature,
        } = options;

        if (invalidChanId) {
            res.status(422).json({
                error: "body.channelId is invalid; use params.channelId instead.",
            });
            return next();
        }

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
            const verified = await this.verifier.verifySig(channelId, signature, owner);
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
            channelId,
            encrypted,
            owner,
            members,
            requests,
            allowJoining,
            approveJoins,
            memberLimit,
            expiresAt,
            messageLifetime,
            signature,
            createdAt: new Date(),
        };

        await this.setChanOptions(channelId, opts);
        await this.channelList.set(channelId, "1");
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

        //!!!!!! emit channel-created event
    }

    async getChanOptions(channelName: string): Promise<ChannelOptions> {
        const obj = await this.channelOptions.get(channelName);
        return obj as ChannelOptions;
    }
    async setChanOptions(channelName: string, options: ChannelOptions): Promise<void> {
        await this.channelOptions.set(channelName, options);
    }

    joinInChannel: express.RequestHandler = async (req, res, next) => {
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

        //! trying to join an expired channel produces an error
        if (opts.expiresAt && now > opts.expiresAt) {
            this.log(
                `expiration '${opts.expiresAt.getTime() % 100000}, now '${now.getTime() % 100000}`
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
        opts.members = opts.members || [];
        opts.requests = opts.requests || [];

        //! non-owners cannot exceed the memberLimit (if configured)
        let overMemberLimit = opts.memberLimit && opts.members.length >= opts.memberLimit;

        let requestOnly = false;
        let approvedVerifier;
        if (opts.owner == myId) {
            //! the owner can join someone by pubKey, even if the memberLimit is reached
            overMemberLimit = false;
            approvedVerifier = myId;

            this.log("owner-approved join");
        } else if ("member" == opts.approveJoins && (opts.members || []).includes(myId)) {
            //! a member can join someone by pubKey if approveJoins: member
            this.log("member-approved join");
            approvedVerifier = myId;
        } else if (opts.allowJoining) {
            //! a non-member can join themself if allowJoining is true and approveJoins is "open"
            if (member !== myId) {
                res.status(400).json({
                    error: "can't invite others",
                });
                return next();
            }

            //! non-member joins are requests unless approveJoins = "open"
            if ("open" !== opts.approveJoins) {
                requestOnly = true;
                opts.requests.push(myId);
                approvedVerifier = myId;
                //!!! todo: join requests, when not open, are simple messages in the channel,
                //!    which clients can read, prompting members or owner to issue an approval.
            } else {
                this.log("self-join");
                approvedVerifier = myId;
            }
        }
        if (!approvedVerifier && !requestOnly) {
            this.warn("unauthorized");

            res.status(403).json({
                error: "unauthorized",
            });
            return next();
        }

        if (opts.members.includes(member)) overMemberLimit = false;
        if (overMemberLimit) {
            this.warn("over channel memberLimit");

            res.status(403).json({
                error: "channel is full",
            });
            return next();
        }

        let verified, error;
        try {
            verified = await this.verifier.verifySig(member, signature, approvedVerifier);
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

        if (requestOnly) {
            opts.requests.push(myId);
        } else {
            opts.members.push(member);
        }
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

    postMessageInChannel: express.RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        const found = await this.channelList.has(channelId);
        if (!found) {
            res.status(404).json({ 
                error: "channel not found",
            });
            return next();
        }
        const message = req.body;

        console.log("postMessage", message);
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

    listenOnChannels: express.RequestHandler = async (req, res, next) => {
        let cancelled = false;
        const subscriptions: ChannelSubs = req.body;

        console.warn("listening for", subscriptions);
        //!!! todo: it validates authorization as appropriate for each requested channel

        const sendUpdate : changeFeedUpdater = (...messages) => {
            // if (json.event !== "keepalive") debugger
            for (const json of messages) {
                const update = JSON.stringify(json);
                res.write(update + "\n");
                // debug("update: ", update)
            }
            (res as any)._flush(); //! flushes writes through compression middleware
        }
        const myStreamListeners : ListenerSubscriptionList = [];

        const cleanup = () => {
            //!!!! clean up all the internal subscriptions
            for (const mySub of myStreamListeners) {
                const {channel, stream} = mySub
                this.channelConn.unsubscribe(stream);
            }
            next();
        };
        res.on("close", cleanup)

        const cancel = () => {
            cancelled = true;
            cleanup();
            next()
        };

        const notifyConsumeError: consumerErrorNotifier = (channel, consumeError) => {
            if (!cancelled) {
                sendUpdate({
                    event: "error:consumer",
                    message: "internal stream consumer failed",
                    reason: consumeError.message,
                    channel,
                });
                this.log("consume error; TODO: reconnect/retry", consumeError);
                cleanup();
                next();
            }
        };

        let anySuccesses = 0;
        let warnings: any[] = [];
        for (const sub of subscriptions) {
            const { channel } = sub.options;
            const found = await this.channelList.has(channel);
            if (!found) {
                //! sends a warning note but do not fail unless there are no valid subscriptions
                warnings.push({
                    //!!!!! review & craft the shape of this for consistency
                    event: "warning",
                    channel,
                    message: "invalid or expired channel",
                });
            }

            const subscriber = await this.listenOneChannel(channel, sendUpdate, notifyConsumeError);
            if (subscriber) anySuccesses += 1;
        }
        if (!anySuccesses) {
            res.status(404).json({ error: "no valid subscriptions in request" });
            return cancel();
        } else if (warnings.length) {
            sendUpdate.apply(this, warnings);
        }
    };
    }

    async listenOneChannel(
        channel,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier
    ) {
        //! it leverages the redis-streams module's cache of per-channel connections
        const stream = await this.channelConn.use(channel);
        await this.channelConn.subscribe(stream);

        //! it spawns asynchronous monitoring in each channel
        this.monitorChannelChanges(stream, channel, sendUpdate, notifyConsumerError);
        return stream;
    }

    private async monitorChannelChanges(
        stream: streamHandle,
        channel: ChanId,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier
    ) {
        try {
            for await (const events of this.channelConn.consume(
                stream,
                "all",
                10,
                this.subscribeTimeout
            )) {
                for (const e of events) {
                    const { id: mid, cid, data, ...meta } = e;
                    this.log(`server: ${channel} <- event ${mid}: `, e.data);
                    const parsed = JSON.parse(data);
                    sendUpdate({
                        mid,
                        channel,
                        nbh: this.nbh,
                        msg: parsed,
                        cid,
                        ...meta,
                    });
                }
            }
        } catch (consumeError) {
            notifyConsumerError(channel, consumeError as Error);
        }
    }
}

export async function createServer(options: DredClientArgs, serverId: string) {
    const server = new DredServer(options, serverId);
    const { api, redis } = server;
    api.set("redis", redis);

    api.use(express.json({}));
    const messagesInChannel = new RedisSet(redis);

    return server;
}
