//@ts-check

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
    bgBlueBright,
    bold,
    black,
} = colors;

import { Redis, RedisOptions } from "ioredis";
import { get, Server } from "http";
import express from "express";
import type { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";

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
import {
    ChanId,
    SubscriptionList,
    NbhId,
    ChannelSubOptions,
} from "../types/ChannelSubscriptions.js";
import { autobind } from "@poshplum/utils";
import { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";
import { zonedLogger } from "@poshplum/utils";

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
type rChannelError = {
    channel: string;
    type: "error";
    message: string;
    reason: string;
};

type rHeartbeatMessage = {
    type: "heartbeat" | "heartbeat-info";
    timerInterval?: number;
};

type rStreamMsg =
    | rHeartbeatMessage
    | rChannelError
    | {
          //(rMsgRaw | rMsgParsed) &
          id: string;
          channel: ChanId;
          type: string;
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

type DredServerArgs = DredClientArgs & {
    api?: express.Application;
    serverDb?: number;
};

//!!! todo: augment to support a list of nbh's, with req details for nbh selection
//    - start by using nbh prefix in redis keys.

let clientIndex = 1;

export class DredServer {
    api: express.Application;
    discovery: Discovery;
    redisUrl: string;
    redisDb: number;
    redis?: Redis;
    channelConn: RedisChannels;
    listener: null | Server; // http.Server from node types
    args: DredServerArgs;
    channelList!: RedisHash<string, string>;
    channelOptions!: RedisHash<string, ChannelOptions>;
    producers: Map<string, any>;
    subscribers: Map<string, Set<Subscriber>>;
    clientArgs: DredServerArgs;
    verifier: StringNacl;
    serverId: string;
    myServerInfo?: DredHostDetails;
    logger: ReturnType<typeof zonedLogger>;

    resetting = false;
    get nbh() {
        return this.args.neighborhood;
    }

    setupExpressHandlers() {
        this.api.use(compression());
        this.api.use((req, res, next) => {
            res.locals.startTime = new Date().getTime();

            this.log(`-> ${req.method} ${req.originalUrl}`);
            next();
        });

        //!!! todo: 61pk3h0 it applies a more explicit Access-Control-Allow-Origin policy,
        //    ... checking credentials and/or domain name as part of its CORS check,
        //    ... according to its configuration & setup

        this.api.use(cors<Request>());

        this.api.use(bodyParser.json({ limit: "1mb" }));

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
            //! it approves any allowed CORS / cross-origin requests.  These can be limited by domain name
            //  or other attributes of the cross-origin OPTIONS request.
        });
        this.api.post("/channels/listen", (...args) => {
            //! it allows clients to subscribe to many channels and receive notification about updates in any of them
            this.listenOnChannels(...args);
        });
        this.api.use(this.resultLogger);
    }

    constructor(args: DredServerArgs, serverId: string, redisDb: number) {
        this.args = args;
        debugger;
        const loggerName = `dred‹${serverId}›`;
        this.logger = zonedLogger(loggerName, {
            serverId,
            levels: {
                [loggerName]: logging ? "info" : "warn",
                _message: `(env LOGGING=${logging})`,
            },
        });

        this.serverId = serverId;
        this.discovery = DredClient.resolveDiscovery(args);
        // const t= express()
        this.log(`+server '${serverId}'`, this.discovery, null, 2);
        this.api = this.createExpressServer();
        // const t= express();

        const redisUrl = (this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379");

        this.listener = null;
        this.verifier = new StringNacl(undefined, this);
        this.producers = new Map();
        this.subscribers = new Map();
        this.redisDb = redisDb || 0;
        this.setupRedis(redisUrl);
        // this.channelConn._log.error = console.error.bind(console);
        this.clientArgs = args;

        this.setupExpressHandlers();
    }

    setupRedis(url: string | undefined) {
        if (this.redis) throw new Error(`redis connection is already set up`);
        // redis.subscribe(...).on("message", (event) => {
        //     for (const peer of peers) {
        //         peer.addEvent(event)
        //     }
        // })

        //!!! todo: use configured Redis connection details
        this.log(`Setting up Redis connection: ${url || "default"}, db: ${this.redisDb}`);
        // console.log(`REDIS_URL ${url}`);
        const options: RedisOptions = {
            db: this.redisDb,

            // keyPrefix: `${this.nbh}::`  //!!! todo vet this technique.
        };
        if (url) {
            this.redis = new Redis(url, options);
        } else {
            this.redis = new Redis(options);
        }

        this.channelList = new RedisHash<string, string>(
            this.redis,
            "channels",
            StringValueAdapter
        );
        this.channelOptions = new RedisHash(this.redis, "channelOptions", optionsSerializer);

        //!!! todo: allows the application name to override 'dred' setting in channel names created in Redis
        this.channelConn = new RedisChannels({
            application: `${this.nbh}::`,
            redis: {
                url: url,
                db: this.redisDb,
            },
        });
        this.channelConn._log = this.logger;
        this.ensureDefaultChannels();
    }

    //! it has a mockable function for starting the express server
    createExpressServer(): express.Application {
        return this.args.api || express();
    }

    async pendingSetup() {
        return this.setupPending;
    }
    private setupPending?: Promise<any>;
    //!!! todo: once for each nbh
    ensureDefaultChannels() {
        if (this.setupPending) return this.setupPending;

        return (this.setupPending = new Promise(async (res) => {
            await this.doChannelSetup("_chans");
            await this.doChannelSetup("_auth");
            await this.doChannelSetup("news");
            await this.doChannelSetup("discussion");
            this.setupPending = undefined;
            res(true);
        }));
    }

    async doChannelSetup(channel: ChanId, options: Partial<ChannelOptions> = {}) {
        // debugger
        const chan = await this.channelList.has(channel);
        if (!chan) {
            await this.channelList.set(channel, "1");
        }
        const streams = this.channelConn;
        if (!streams) {
            if (this.resetting) {
                this.logger.warn("ignoring continuing channel setup for %s while racing with a subsequent reset!")
                return 
            } else {
                this.logger.error(
                    "??? how can this happen?? streams undefined, can't use(%s) for producing",
                    channel
                );
                throw new Error(`streams undefined, can't use(${channel}) for producing`);
            }
        }
        const stream = await streams.use(channel);

        //!!! revisit this with a more specific plan : )
        await streams.produce(stream, "first event in this channel", { type: "channel:genesis" });
        const o = { channelId: channel, ...options };
        this.channelCreated(channel, o);
    }

    //
    async listen() {
        await this.setupPending;

        const myInfo = (this.myServerInfo =
            this.myServerInfo || (await this.discovery.myServerInfo(this.serverId)));
        if (!myInfo) throw new Error(`can't identify my own info`);
        const { port, address } = myInfo;
        this.listener = this.api.listen(port, address);
        this.log(`server '${this.serverId}' listening at ${address}:${port}`);
        return this.listener;
        // express
        //       listen(port: number, hostname: string, backlog: number, callback?: () => void): http.Server;
        //       listen(port: number, hostname: string, callback?: () => void): http.Server;
    }

    async reset(reconnect?: boolean, finalCleanup?: (r?: Redis) => any) {
        await this.channelConn.cleanup().catch(warning.bind(this, "channelConn.cleanup()"));
        // await this.channelConn.this?.redis?.quit().catch(warning.bind(this,"channelConn.redis.quit()"));
        // this.channelConn?.redis?.disconnect();
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
            return this.setupPending
        }
        function warning(this: DredServer, activityName) {
            return (e) => {
                this.warn(`during close: error in ${activityName}:\n\t`, e.message || e);
            };
        }
    }

    async close() {
        this.cancelSubscribers();
        this.reset(false);
        this.listener?.close();
    }
    async listenDetails() {}

    get address() {
        const { listener } = this;
        if (!listener) throw new Error(`not yet listening`);

        const addr = listener.address();
        throw new Error(`is this needed?`);

        if (addr === null) throw new Error(`server is not listening`);
        if ("string" === typeof addr) throw new Error(`Unix socket not supported currently`);

        return addr;
    }

    mkClient(serverSelection: string, clientArgs: Partial<DredClientArgs> = {}): DredClient {
        const discovery: Discovery = clientArgs.discovery ?? this.clientArgs.discovery;
        if (!discovery) throw new Error("discovery is required");
        const oneHost = discovery.hosts!.find((h) => h.serverId === serverSelection);
        if (!oneHost) {
            this.logger.error(`server ${serverSelection} not found in discovery`, discovery);
            throw new Error(`server ${serverSelection} not found in discovery`);
        }
        const singleDiscovery = new StaticHostDiscovery({
            hosts: [oneHost],
        });

        return new DredClient({
            name: `${serverSelection || ""}-${clientIndex++}`,
            ...this.clientArgs,
            ...clientArgs,
            discovery: singleDiscovery,
        });
    }

    log(a1: string, ...args: any[]) {
        this.logger.info(a1, ...args);
        // logging && console.log(...args);
    }
    warn(a1: string, ...args: any[]) {
        this.logger.warn(a1, ...args);
        // logging && console.warn(...args);
    }

    resultLogger: express.RequestHandler = (req, res, next) => {
        const now = new Date().getTime();
        const elapsed = now - res.locals.startTime;

        this.log(`<- ${res.statusCode} ${req.method} ${req.originalUrl || req.url} ${elapsed}ms`);
    };
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
            this.warn(`Channel creation failed: ${channelId} already exists`);
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

    async channelCreated(channel, options: ChannelOptions) {
        //! it allows specific subclass of dred server to be notified of channel-creation
        const streams = this.channelConn;
        const chans = await streams.use("_chans");

        this.log("channelCreated", channel, options);
        //! it emits a channel-created event in the _chans meta-channel.
        //   applications with interest in such things can subscribe to that
        //   channel to get the news
        await streams.produce(chans, "a channel was created", {
            type: "chanCreated",
            channel,
            options: JSON.stringify(options),
        });
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
            this.warn(`Join failed: Channel ${channelId} not found`);
            res.status(400).json({ error: "invalid channel" });
            return next();
        }
        //! the channel must be encrypted (non-encrypted channels are open by definition)
        const opts = await this.getChanOptions(channelId);

        //! trying to join an expired channel produces an error
        if (opts.expiresAt && now > opts.expiresAt) {
            this.warn(`Join failed: Channel ${channelId} is expired`);
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
            this.warn(`Join failed: Channel ${channelId} is full`);

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
            this.warn(`Join failed: Signature verification failed - ${error}`);
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
        return this.channelConn.use(channelId);
    }

    postMessageInChannel: express.RequestHandler = async (req, res, next) => {
        const { channelId } = req.params;
        this.log("postMessageInChannel", channelId);
        const found = await this.channelList.has(channelId);
        if (!found) {
            res.status(404).json({
                error: "channel not found",
            });
            return next();
        }
        const message = req.body;

        //!!! todo y0w9cvr: it refuses to post plain-text messages into encrypted channels
        //     see also todo zfnsmq8

        this.log("server: postMessage", message);
        const tunnelProducer = await this.mkChannelProducer(channelId);
        const { msg, _type, _data, ...moreDetails } = message;

        //! it extracts and SILENTLY ignores reserved keys _type, _data in client-provided event details.
        // if (_type) console.warn("ignoring reserved key '_type' in client-provided message");
        // if (_data) console.warn("ignoring reserved key '_data' in client-provided message");

        if ("string" !== typeof msg) {
            res.status(422).json({
                error: "message must be a string, not a JSON object",
            });
            return next();
        }
        if (!msg) {
            res.status(422).json({
                error: "missing required 'msg' attribute for posting message in channel",
            });
        } else if (!moreDetails.ocid) {
            res.status(422).json({
                error: "missing required 'ocid' attribute for posting message in channel",
            });
        } else if (!moreDetails.type) {
            res.status(422).json({
                error: "missing required 'type' attribute for posting message in channel",
            });
        } else {
            const id = await this.channelConn.produce(tunnelProducer, msg, moreDetails);
            res.json({ id, status: "created" });
        }
        next();
    };

    cancelSubscribers() {
        let count = 0;
        for (const [chan, subscribers] of this.subscribers) {
            for (const sub of subscribers) {
                sub.cancel();
                count++;
            }
        }
        this.warn(`Cancelled ${count} channel subscribers`);
    }

    get subscribeTimeout() {
        return 10000;
    }

    listenOnChannels: express.RequestHandler = async (req, res, next) => {
        let cancelled = false;
        const subscriptions: SubscriptionList = req.body;
        res.contentType("application/ndjson");
        res.useChunkedEncodingByDefault = false;
        // res.setHeader("x-hi", "there");
        this.log("listening for", subscriptions);
        //!!! todo: it validates authorization as appropriate for each requested channel

        const sendUpdate: changeFeedUpdater = (...messages) => {
            // if (json.event !== "keepalive") debugger
            for (const json of messages) {
                const update = JSON.stringify(json);
                res.write(update + "\n");
                // debug("update: ", update)
            }
            (res as any).flush(); //! flushes writes through compression middleware
        };
        const myStreamListeners: ListenerSubscriptionList = [];
        const timerInterval = 7000;
        //! it sends heartbeat signals every so often to clients
        //!!! todo: heartbeat interval can be configured
        const timer = setInterval(() => {
            this.log("server: client <- heartbeat");
            sendUpdate({ type: "heartbeat" });
        }, timerInterval);
        timer.unref(); //! the heartbeat-timer never blocks the process from exiting when it's otherwise done

        //! it tells clients how frequently they should expect a heartbeat
        sendUpdate({ type: "heartbeat-info", timerInterval });

        const cleanup = () => {
            //! it cleans up all the internal subscriptions
            for (const mySub of myStreamListeners) {
                const { channel, stream } = mySub;
                this.channelConn.unsubscribe(stream);
            }
            clearInterval(timer);
        };
        res.on("close", cleanup);

        const cancel = () => {
            cancelled = true;
            res.end();
            cleanup();
            next();
        };

        const notifyConsumeError: consumerErrorNotifier = (channel, consumeError) => {
            if (!cancelled) {
                sendUpdate({
                    channel,
                    type: "error",
                    message: "internal stream consumer failed",
                    reason: consumeError.message,
                });
                this.logger.error(`${channel} consume error; TODO: reconnect/retry`, consumeError);
                cleanup();
                next();
            }
        };

        let anySuccesses = 0;
        let warnings: any[] = [];
        for (const sub of subscriptions) {
            const { channel } = sub;
            const found = await this.channelList.has(channel);
            if (!found) {
                //! sends a warning note but does not fail unless there are no valid subscriptions
                warnings.push({
                    //!!! todo: review & craft the shape of this for consistency with other warnings that may be necessary to send to clients
                    channel,
                    type: "warning",
                    message: "invalid or expired channel",
                });
            }

            const subscriber = await this.listenOneChannel(sub, sendUpdate, notifyConsumeError);
            myStreamListeners.push({ channel, stream: subscriber });
            if (subscriber) anySuccesses += 1;
        }
        if (!anySuccesses) {
            res.status(404).json({ error: "no valid subscriptions in request" });
            return cancel();
        } else if (warnings.length) {
            sendUpdate.apply(this, warnings);
        }
    };

    async listenToNeighborhood() {
        //!!! todo: it connects with a DredClient for each neighborhood host
        //!!! todo: it subscribes to all channels in the neighborhood
        //   ...and replicates messages seen in those channels,
        //   ... along with our own confirmation of the events
        //!!! todo: it keeps a recency list of messages seen from other servers,
        //     and replicates confirmations instead of full messages in that case.
    }

    async listenOneChannel(
        sub: ChannelSubOptions,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier
    ) {
        //! it leverages the redis-streams module's cache of per-channel connections
        const channelStream = await this.channelConn.use(sub.channel);
        await this.channelConn.subscribe(channelStream);

        //! it spawns asynchronous monitoring in each channel
        this.monitorChannelChanges(channelStream, sub, sendUpdate, notifyConsumerError);
        return channelStream;
    }

    private async monitorChannelChanges(
        channelStream: streamHandle,
        sub: ChannelSubOptions,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier
    ) {
        try {
            for await (const events of this.channelConn.consume(
                channelStream,
                "all",
                10,
                this.subscribeTimeout
            )) {
                for (const e of events) {
                    const { id: mid, ocid, type, data, ...meta } = e;
                    this.log(
                        bgBlueBright(black(bold(`    <- ocid ${ocid} in ${sub.channel}: `))),
                        e.data.length,
                        "bytes"
                    );
                    debugger;
                    // const parsed = JSON.parse(data);
                    //!!! todo: apply filters from the subscription
                    sendUpdate({
                        mid,
                        channel: sub.channel,
                        type,
                        nbh: this.nbh,
                        msg: data,
                        ocid,
                        ...meta,
                    });
                }
            }
        } catch (consumeError) {
            notifyConsumerError(sub.channel, consumeError as Error);
        }
    }
}

export async function createServer(options: DredServerArgs, serverId: string, serverDb: number) {
    const server = new DredServer(options, serverId, serverDb);
    const { api, redis } = server;
    api.set("redis", redis);

    api.use(express.json({}));
    const messagesInChannel = new RedisSet(redis);

    return server;
}
