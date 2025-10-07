//@ts-check
import { Server } from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";

import { Redis, type RedisOptions } from "ioredis";
import { nanoid } from "../util/nanoid.js";

import type { Application } from "express";

import { RedisChannels } from "../redis/streams/index.js";

import { colors } from "../picocolors/picocolors.js";
const {
    bgBlack,
    bgBlackBright,
    bgBlue,
    bgBlueBright,
    bgCyanBright,
    bgGreen,
    bgGreenBright,
    bgRed,
    bgRedBright,
    bgYellow,
    bgYellowBright,
    bold,
    dim,
    black,
    blackBright,
    blueBright,
    cyanBright,
    gray,
    greenBright,
    green,
    blue,
    redBright,
    red,
    yellowBright,
    yellow,
    whiteBright,
    white,
    isColorSupported,
} = colors;

import { DredClient, type DredClientArgs } from "../client/DredClient.js";
import { RedisSet } from "../redis/RedisSet.js";
import { type Subscriber } from "../Subscriber.js";
import {
    JSONValueAdapter,
    RedisHash,
    StringValueAdapter,
    type ValueAdapter,
} from "../redis/RedisHash.js";
import { type ChannelOptions } from "../types/ChannelOptions.js";
import { StringNacl } from "../util/StringNacl.js";
import { type Discovery } from "../types/Discovery.js";
import { type DredHostDetails } from "../types/DredHosts.js";
import {
    type ChanId,
    type SubscriptionList,
    type NbhId,
    type ChannelSubConfig,
    defaultMaxDelayMs,
} from "../types/ChannelSubscriptions.js";
import { asyncDelay, autobind } from "@poshplum/utils";
import { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";
import { zonedLogger } from "@poshplum/utils";
import { DredReplicator } from "./DredReplicator.js";
import type { Logger } from "../types/Logger.js";

const logging = parseInt(process.env.LOGGING || "0");
export interface ExpressWithRedis extends express.Application {
    redis: null | typeof Redis;
}

type ListenerSubscriptionList = ChannelSubscriber[];

export type ChannelSubscriber = {
    channel: ChanId;
    stream: streamHandle;
};
type abstractChangeFeedUpdater = (maxLatency: number, ...messages: rStreamMsg[]) => void;
type changeFeedUpdater = (...messages: rStreamMsg[]) => void;
type consumerErrorNotifier = (res: express.Response, channel: ChanId, e: Error) => void;
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

type DredServerArgs = Omit<DredClientArgs, "bookmarkStorage"> & {
    neighborhood: string;
    api?: express.Application;
    serverDb?: number;
    replicate?: boolean;
    serverClass?: typeof DredServer;
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
    logger: Logger

    // Optional replicator, to be initialized only when replication is enabled
    replicator?: DredReplicator;

    // Periodic status logging
    private statusLoggingTimer?: NodeJS.Timeout;

    resetting = false;
    get nbh() {
        return this.args.neighborhood;
    }

    setupExpressHandlers() {
        //! allows clients to avoid compression when the content is known to not benefit from it
        this.api.use(compression({filter(req,res) {
            if (req.headers["x-no-compression"] == "true") return false;
            return compression.filter(req,res);
        }}));

        this.api.use((req, res, next) => {
            if (res.locals?.id) throw new Error("duplicate req processing detected");
            const { clientid = `‹gen›` } = req.headers;
            res.locals.clientid = `${clientid}-${nanoid(4)}`;
            res.locals.startTime = new Date().getTime();
            res.locals.id = nanoid(4);
            this.reqLogger(res).info(`-> ${req.method} ${req.originalUrl} `);
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
            // nothing special to do here, just approve the CORS req

            //! it approves any allowed CORS / cross-origin requests.  These can be limited by domain name
            //  or other attributes of the cross-origin OPTIONS request.
        });
        this.api.post("/channels/listen", (...args) => {
            //! it allows clients to subscribe to many channels and receive notification about updates in any of them
            this.listenOnChannels(...args);
        });

        this.api.get("/admin/replication-status", (...args) => {
            this.adminReplicationStatus(...args);
        });

        this.api.use(this.resultLogger);
    }

    constructor(args: DredServerArgs, serverId: string, redisDb: number) {
        const { replicate = true } = args;
        this.args = { ...args, replicate };
        const loggerName = `dred`;

        this.logger = zonedLogger(loggerName, {
            loggerId: serverId,
            // levels: {
            //     [loggerName]: logging ? "info" : "warn",
            //     _message: `(env LOGGING=${logging})`,
            // },
        });

        this.serverId = serverId;
        this.discovery = DredClient.resolveDiscovery(args);

        // this.log(`+server '${serverId}' with discovery type: ${this.discovery.constructor.name}`);

        this.api = this.createExpressServer();
        const redisUrl = (this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379");

        this.listener = null;
        this.verifier = new StringNacl(undefined, this.logger);
        this.producers = new Map();
        this.subscribers = new Map();
        this.redisDb = redisDb || 0;
        this.setupRedis(redisUrl);

        // to be initialized only when replication is enabled
        // this.replicator = new DredReplicator(this, this.discovery);

        // this.channelConn._log.error = console.error.bind(console);
        this.clientArgs = args;
        this.setupExpressHandlers();
    }

    setupRedis(url: string | undefined) {
        if (this.redis) throw new Error(`redis connection is already set up`);

        this.progress(`Setting up Redis connection: ${url || "default"}, db: ${this.redisDb}`);

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
            StringValueAdapter,
        );
        this.channelOptions = new RedisHash(this.redis, "channelOptions", optionsSerializer);

        const log = zonedLogger("dred-stream", {
            loggerId: this.serverId,
            color: bgBlack.start + white.start,
        });

        this.channelConn = new RedisChannels({
            application: `${this.nbh}::`,
            redis: {
                url: url,
                db: this.redisDb,
            },
            channels: { log },            
        });
        this.progress("connected to redis");
        this.ensureDefaultChannels();
    }

    //! it has a mockable function for starting the express server
    createExpressServer(): express.Application {
        return this.args.api || express();
    }

    async pendingSetup() {
        await this.ensureDefaultChannels();
        return this.setupPending;
    }
    setupPending?: Promise<any>;

    didMakeDefaultChannels = false;
    ensureDefaultChannels() {
        if (this.setupPending) return this.setupPending;

        if (this.didMakeDefaultChannels) {
            throw new Error("default channels already made");
        }
        this.logger.debug("setting up default channels")
        return (this.setupPending = new Promise(async (res) => {
            await this.doChannelSetup("_chans");
            await this.doChannelSetup("_auth");
            await this.doChannelSetup("news");
            await this.doChannelSetup("discussion");

            this.didMakeDefaultChannels = true;
            this.setupPending = undefined;
            this.logger.progress("created default channels");
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
                this.warn(
                    "ignoring continuing channel setup for %s while racing with a subsequent reset!",
                );
                return;
            } else {
                this.logger.error(
                    "??? how can this happen?? streams undefined, can't use(%s) for producing",
                    channel,
                );
                throw new Error(`streams undefined, can't use(${channel}) for producing`);
            }
        }
        const stream = await streams.use(channel);

        //!!! revisit this with a more specific plan : )
        await streams.produce(stream, "first event in this channel", {
            type: "channel:genesis",
            ocid: `${channel}:genesis`,
        });
        const o = { channelId: channel, ...options };
        this.channelCreated(channel, o);
    }

    //
    async listen() {
        await this.setupPending;

        const myInfo = (this.myServerInfo =
            this.myServerInfo || (await this.discovery.myServerInfo(this.serverId))); //
        if (!myInfo) throw new Error(`can't identify my own info`);
        const { port, address } = myInfo;

        this.listener = this.api.listen(Number(port), address);
        this.info(`listening at ${address}:${port}`);

        // Setup replication after all basic server setup is complete
        // at this point, "_chans" and "_auth" channels are already created
        if (this.args.replicate) {
            // Start replication in background, non-blocking
            this.startReplicating();
        } else if (process.env.NODE_ENV == "test") {
            this.debug(`⚠️ replication disabled (via REPLICATION=false)`);
        } else {
            this.warn(`⚠️ replication disabled (via REPLICATION=false)`);
        }

        this.startPeriodicStatusLogging();

        return this.listener;
    }

    /**
     * Known message set.
     */
    get knownMessages(): RedisSet {
        if (!this._knownMessages) {
            // Use a specific key name for the deduplication set instead of abstract
            this._knownMessages = new RedisSet(
                this.redis!,
                `${this.nbh}::knownMessages`,
            );
        }
        return this._knownMessages;
    }
    private _knownMessages?: RedisSet;

    /**
     * Ensure a message is processed only once. Use it to avoid duplicate messages.
     *
     * Always await this method to prevent race conditions and blockings.
     *
     *
     * @param channel channel name
     * @param msgId ocid
     * @param msg message content
     * @param messageDetails optional
     * @returns message id if published, undefined if duplicate
     */
    async ensureMessageProcessedOnce(
        channel: string,
        msgId: string,
        msg: string,
        messageDetails?: any,
    ): Promise<string | undefined> {
        try {
            // composite key to ensure uniqueness across channels
            const deduplicationKey = this.messageKey(channel, msgId);


            // Check if we've already processed this exact message
            const alreadyProcessed = await this.knownMessages.has(deduplicationKey);


            if (alreadyProcessed) {
                this.trace(
                    `skipping duplicate message: ${deduplicationKey}`,
                );
                return undefined; // Signal that message was not posted (duplicate)
            }

            // prevent racing double-post by pre-adding:
            await this.knownMessages.add(deduplicationKey);
            this.trace(
                `+known messages: ${deduplicationKey}`,
            );

            // Actually post the message to the channel
            const publishedMessageId = await this.publishMessageToChannel(
                channel,
                msg,
                messageDetails,
            );

            return publishedMessageId;
        } catch (error: any) {
            // If we fail after marking as processed, we have a problem - log it
            this.warn(`Error in message deduplication for ${channel}:::${msgId}:`, error.stack);
            throw error; // Re-throw so caller can handle appropriately
        }
    }

    messageKey(channel: string, msgId: string) {
        return `${channel}/${msgId}`;
    }

    /**
     * Publish a message directly without dedup.
     * Always await this method to prevent blocking caller and ensure message is published.
     *
     * @returns id of the published message
     */
    async publishMessageToChannel(
        channelId: string,
        msg: string,
        messageDetails: any = {},
    ): Promise<string> {
        try {
            // Get channel producer for this server
            const producer = await this.mkChannelProducer(channelId);

            // Produce the message on the channel with provided details
            const publishedMessageId = await this.channelConn.produce(
                producer,
                msg,
                messageDetails,
            );

            this.trace(`Message published to channel ${channelId}: ${publishedMessageId}`);
            return publishedMessageId;
        } catch (error) {
            this.warn(`Failed to publish message to channel ${channelId}:`, error);
            throw error; // Let caller handle the error
        }
    }

    async clearMessageDeduplicationCache(olderThanMs?: number): Promise<void> {
        // TODO: implement time-based cleanup if needed, useful for testing or reset
    }

    // async ensureMessageProcessedOnce(channel: string, msgId, msg: string) {
    //     // create composite key to avoid duplicates
    //     const key = `${channel}:::${msgId}`;
    //     if (await this.knownMessages.has(key)) {
    //         return;
    //     }
    //     this.knownMessages.add(key)
    //     this.actuallyPost(channel, msg)
    // }

    // async actuallyPost(channelId: string,msg: string, messageDetails: any) {

    //     // Get channel producer for home server
    //     const producer = await this.mkChannelProducer(channelId);

    //     // Produce the replicated message on the home server
    //     const id = await this.channelConn.produce(producer, msg, messageDetails);

    //     return id;
    // }
    // ------------------------------------------------------------

    async setupReplication() {
        if (this.replicator) {
            this.info("skipping extra setupReplication()");
            return; // Idempotent - safe to call multiple times
        }
        this.progress(`replication setup`);
        try {
            // await asyncDelay(1000);// maybe we can just skip this
            // this.warn(`${this.serverId} Creating replicator...`);
            this.replicator = new DredReplicator(this, this.discovery);
            // this.warn(`${this.serverId} Initializing replicator...`);
            await this.replicator.initialize();            
            // this.warn(`${this.serverId} Replication setup complete - replicator exists: ${!!this.replicator}`);
        } catch (error: any) {
            // Cleanup on failure
            this.logger.error(`during replication setup: `, error.stack);
            this.replicator = undefined;
            // this.warn(`${this.serverId} Failed to setup replication - nullified replicator`);
            throw error; // Re-throw if caller needs to handle
        }
    }

    /**
     * Start auto-replication in background immediately
     */
    private startReplicating(): void {
        // this.warn(`🔄 STARTING AUTO-REPLICATION FOR ${this.serverId.toUpperCase()} (BACKGROUND)`);

        // Run in background - don't await, don't block server startup
        this.setupReplication()
            .then(() => {
                this.progress(`✅ Replication setup ok`);
            })
            .catch((error) => {
                this.logger.error(`❌ Replication setup failed (will retry): ${error.message}`);
                this.scheduleReplicationRetry();
            });
    }

    /**
     * Schedule a retry of replication setup after 1 minute
     */
    private scheduleReplicationRetry(): void {
        setTimeout(() => {
            this.warn(`🔄 Retrying replication (waited 1m)`);
            this.startReplicating();
        }, 60000); // 1 minute
    }

    /**
     * Start periodic status logging based on STATUS_INTERVAL_SECONDS environment variable
     * Default: 2 seconds, Range: 1-1000 seconds, 0 or negative = disabled
     */
    private startPeriodicStatusLogging(): void {
        const intervalSeconds = parseInt(process.env.STATUS_INTERVAL_SECONDS || "5");

        if (intervalSeconds <= 0 || intervalSeconds > 1000) {
            this.ops(
                `📊 Periodic status logging disabled (STATUS_INTERVAL_SECONDS=${intervalSeconds})`,
            );
            return;
        }

        const intervalMs = intervalSeconds * 1000;
        this.progress(`📊 periodic status logging every ${intervalSeconds} seconds`);

        this.statusLoggingTimer = setInterval(() => {
            this.statusLogging();
        }, intervalMs);

        // Don't keep the process alive just for status logging
        this.statusLoggingTimer.unref();
    }

    /**
     * Stop periodic status logging
     */
    private stopPeriodicStatusLogging(): void {
        if (this.statusLoggingTimer) {
            clearInterval(this.statusLoggingTimer);
            this.statusLoggingTimer = undefined;
            this.progress(`📊 stopped periodic status logging`);
        }
    }

    /**
     * Check if debug logging is enabled
     */
    private isDebugLoggingEnabled(): boolean {
        return (
            process.env.LOGGING?.includes("debug") ||
            process.env.DEBUG === "1" ||
            process.env.DEBUG === "true"
        );
    }

    /**
     * Logs current server status
     */
    private async statusLogging(): Promise<void> {
        try {
            const uptime = process.uptime();
            const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;

            // Get replication status with details
            let replicationStatus = "DISABLED";
            let activePeers = 0;
            let totalPeers = 0;

            if (this.replicator) {
                totalPeers =
                    this.discovery?.hosts?.filter((h) => h.serverId !== this.serverId).length || 0;
                activePeers = this.replicator.getActiveReplicants
                    ? this.replicator.getActiveReplicants().length
                    : 0;
                replicationStatus = `ENABLED (${activePeers}/${totalPeers})`;
            }

            // Get channel count
            let channelCount = 0;
            try {
                channelCount = await this.channelList.size();
            } catch (error) {
                // Ignore channel errors, keep 0
            }

            // Compact format for regular logging
            this.ops(
                `📊 Uptime: ${uptimeFormatted} | Replication: ${replicationStatus} | Channels: ${channelCount}`,
            );

            // Extended debug format (only when DEBUG logging is enabled)
            if (this.isDebugLoggingEnabled()) {
                await this.logExtendedStatus(activePeers, totalPeers);
            }
        } catch (error) {
            this.warn(`📊 Error logging periodic status: ${error}`);
        }
    }

    /**
     * Log extended status with peer connection details (debug mode only)
     */
    private async logExtendedStatus(activePeers: number, totalPeers: number): Promise<void> {
        try {
            if (!this.replicator || !this.discovery?.hosts) {
                return;
            }

            const allPeers = this.discovery.hosts.filter((h) => h.serverId !== this.serverId);
            const activeReplicants = this.replicator.getActiveReplicants
                ? this.replicator.getActiveReplicants()
                : [];

            // Get connected peers
            const connectedPeers = activeReplicants.map((rep) => {
                const targetHost = rep.getTargetHost();
                return `${targetHost.serverId.slice(-8)}@${targetHost.address}:${targetHost.port}`;
            });

            // Get non-connected peers
            const connectedServerIds = new Set(
                activeReplicants.map((rep) => rep.getTargetHost().serverId),
            );
            const nonConnectedPeers = allPeers
                .filter((h) => !connectedServerIds.has(h.serverId))
                .map((h) => `${h.serverId.slice(-8)}@${h.address}:${h.port}`);

            // Get channel details
            let channels: string[] = [];
            try {
                channels = (await this.channelList.keys()) as string[];
            } catch (error) {
                // Ignore channel errors
            }

            // Single multi-line extended status message
            const extendedStatus = [
                "🔍 EXTENDED STATUS:",
                `   Connected peers (${connectedPeers.length}): [${connectedPeers.join(", ") || "none"}]`,
                `   Non-connected peers (${nonConnectedPeers.length}): [${nonConnectedPeers.join(", ") || "none"}]`,
                `   Channels: [${channels.join(", ") || "none"}]`,
            ].join("\n");

            this.info(extendedStatus);
        } catch (error) {
            this.warn(`🔍 Error logging extended status: ${error}`);
        }
    }

    async cleanupReplication(): Promise<void> {
        this.debug(`cleaning up replicator`);
        if (!this.replicator) {
            this.debug("replication not active; no cleanup needed");
            return; // Idempotent - safe to call multiple times
        }
        try {
            // Add timeout to prevent hanging during cleanup
            await Promise.race([
                this.replicator.cleanup(),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Replication cleanup timeout")), 5000),
                ),
            ]).then(() => {
                this.progress(`cleaned up replicator`);
            });
        } catch (error: any) {
            this.logger.error(`during replication cleanup:`, error.stack);
            // Continue cleanup even if error occurs
        } finally {
            // this.warn(`${this.serverId} Nullifying replicator reference`);
            this.replicator = undefined; // Always nullify, even on error
        }
    }

    async cleanupRedisConnections() {
        return Promise.allSettled([
            this.channelList.cleanup(),
            this.channelOptions.cleanup(),
            this.knownMessages.cleanup(),
        ]).then(() => {
            this._knownMessages = undefined!;
            this.channelList = undefined!;
            this.channelOptions = undefined!;
        })
    }

    async close() {
        this.cancelSubscribers();
        await this.cleanupRedisConnections()
        // Cleanup replication client
        await this.cleanupReplication();

        // Stop periodic status logging
        this.stopPeriodicStatusLogging();

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

    // just use `info`
    // log(a1: string, ...args: any[]) {
    //     this.logger.info(a1, ...args);
    // }
    info(a1: string, ...args: any[]) {
        this.logger.info(a1, ...args);
    }
    warn(a1: string, ...args: any[]) {
        this.logger.warn(a1, ...args);
    }
    progress(a1: string, ...args: any[]) {
        this.logger.progress(a1, ...args);
    }
    ops(a1: string, ...args: any[]) {
        this.logger.ops(a1, ...args);
    }
    debug(a1: string, ...args: any[]) {
        this.logger.debug(a1, ...args);
    }
    trace(a1: string, ...args: any[]) {
        this.logger.trace(a1, ...args);
    }

    async logInfo(): Promise<string> {
        const serverId = this.serverId;

        /**
         * FIXME: we cannot get the neighborhood here,
         * because the neighborhood is set statically,
         * and it does not respond to change.
         *
         * NOTE: we should get correct neighborhood to have proper logInfo
         */
        const neighborhood = this.nbh || "cardano-after-dark";

        // Get server address and port info
        let serverAddress = "unknown";
        let serverPort = "unknown";
        if (this.myServerInfo) {
            serverAddress = this.myServerInfo.address;
            serverPort = this.myServerInfo.port;
        }

        // Get available channels (async)
        let channelsList = "none";
        try {
            // get channel names directly from redis?
            const channels = (await this.channelList.keys()) as string[];
            const publicChannels = channels.filter((ch) => ch[0] !== "_");
            channelsList = publicChannels.join(", ") || "none";
        } catch (error) {
            channelsList = "error retrieving channels";
        }

        // Get discovery hosts info
        let discoveryHosts = "unknown";
        if (this.discovery && this.discovery.hosts) {
            const hosts = this.discovery.hosts.map((h) => `${h.serverId}@${h.address}:${h.port}`);
            discoveryHosts = hosts.join(", ");
        }

        const logMessage = [
            `DredServer - ID, Status : ${serverId}, ${this.listener ? "running" : "stopped"} `,
            `  - Server Address:Port : ${serverAddress}:${serverPort}`,
            `  - Redis URL, DB       : ${this.redisUrl}, ${this.redisDb}`,
            `  - Discovery Hosts     : [${discoveryHosts}]`,
            `  - Neighborhood        : ${neighborhood}`,
            `  - Available Channels  : [${channelsList}]`,
            `  - Active Subscribers  : ${this.subscribers.size}`,
            ``,
        ].join("\n");

        return logMessage;
    }

    resultLogger: express.RequestHandler = (req, res, next) => {
        const now = new Date().getTime();
        const elapsed = now - res.locals.startTime;

        this.reqLogger(res).info(
            `<- ${res.statusCode} ${req.method} ${req.originalUrl || req.url} ${elapsed}ms`,
        );
    };

    reqLogger(res: express.Response) {
        return zonedLogger("dred:req", {
            loggerId: res.locals.id,
            clientid: res.locals.clientid,
            color: bgGreenBright.start + black.start,
        });
    }

    getChannels: express.RequestHandler = async (req, res, next) => {
        const found: string[] = (await this.channelList.keys()) as string[];
        const channels = found.filter((x) => x[0] !== "_");
        res.status(200).json({ channels });
        next();
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

        this.debug("channelCreated", channel, options);
        //! it emits a channel-created event in the _chans meta-channel.
        //   applications with interest in such things can subscribe to that
        //   channel to get the news
        await streams.produce(chans, "a channel was created", {
            type: "chanCreated",
            ocid: nanoid(8),
            msg: JSON.stringify({
                channel,
                options,
            }),
        });

        // Notify replication client about new channel
        // if (this.replicationClient) {
        //     await this.replicationClient.onChannelCreated(channel);
        // }
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
            this.warn(`Join failed: Channel ${channelId} is expired\n`+
                `expiration '${opts.expiresAt.getTime() % 100000}, now '${now.getTime() % 100000}`,
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

            this.info("owner-approved join");
        } else if ("member" == opts.approveJoins && (opts.members || []).includes(myId)) {
            //! a member can join someone by pubKey if approveJoins: member
            this.info("member-approved join");
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
                this.info("self-join");
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
        const found = await this.channelList.has(channelId);
        if (!found) {
            res.status(404).json({
                error: "channel not found",
            });
            return next();
        }
        const message = req.body;
        //! it extracts and SILENTLY ignores reserved keys _type, _data in client-provided event details.
        // if (_type) console.warn("ignoring reserved key '_type' in client-provided message");
        // if (_data) console.warn("ignoring reserved key '_data' in client-provided message");
        const { msg, _type, _data, ...moreDetails } = message;

        let ocid = moreDetails.ocid 
        if (!ocid) {
            ocid = nanoid(6);
            this.trace("generated missing ocid %s for message %o", ocid, message);
            moreDetails.ocid = ocid;
        }
        //todo: include client-id in ocid, preventing a duplicate-id attack.
        //  - requires the client to use a unique client-id, probably based on pubkey/challenge/response
        //  ... otherwise, client id could be spoofed, and a duplicate-id attack would be possible.
        // alt: use one or more "recent ocids" list to prevent observed duplicates.  and/or include
        // a timestamp element in the ocid.

        this.debug("postMessageInChannel", channelId, ocid)
        this.trace("msg %s: %o", ocid, message);

        //!!! todo y0w9cvr: it refuses to post plain-text messages into encrypted channels
        //     see also todo zfnsmq8

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
            // Use deduplication system to prevent replication loops
            const id = await this.ensureMessageProcessedOnce(
                channelId,
                moreDetails.ocid,
                msg,
                moreDetails,
            );
            if (id) {
                res.json({ id, status: "created", ocid: moreDetails.ocid });
            } else {
                // Message was a duplicate (shouldn't happen for original messages, but defensive)
                res.status(409).json({ error: "duplicate message", ocid: moreDetails.ocid });
            }
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
        const reqLogger = this.reqLogger(res);

        reqLogger.progress("listening: %d channels: %s", subscriptions.length, subscriptions.map(s => `${s.channel}^${s.options.bookmark}`).join(", "));
        //!!! todo: it validates authorization as appropriate for each requested channel

        let pendingFlush : ReturnType<typeof setTimeout> | undefined;

        const sendUpdate: abstractChangeFeedUpdater = (maxLatency, ...messages) => {
            // if (json.event !== "keepalive") debugger
            for (const json of messages) {
                const update = JSON.stringify(json);
                res.write(update + "\n");
                reqLogger.trace("    <- ", update);
            }
            if (!maxLatency) {
                (res as any).flush()
            } else if (maxLatency > 0 && !pendingFlush) {
                pendingFlush = setTimeout(() => {
                    (res as any).flush();
                    pendingFlush = undefined;
                }, maxLatency);
            }
        };
        const myStreamListeners: ListenerSubscriptionList = [];
        const timerInterval = 7000;
        //! it sends heartbeat signals every so often to clients
        //!!! todo: heartbeat interval can be configured
        const timer = setInterval(() => {
            reqLogger.trace("   <- heartbeat");
            sendUpdate(0, { type: "heartbeat" });
        }, timerInterval);
        timer.unref(); //! the heartbeat-timer never blocks the process from exiting when it's otherwise done

        const cleanup = () => {
            reqLogger.debug("cleanup");
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

        const notifyConsumeError: consumerErrorNotifier = (res, channel, consumeError) => {
            if (!cancelled) {

                sendUpdate(0,{
                    channel,
                    type: "error",
                    message: "internal stream consumer failed",
                    reason: consumeError.message,
                });
                this.reqLogger(res).error(
                    `${channel} consume error; TODO: reconnect/retry`,
                    consumeError.stack || consumeError.message || consumeError,
                );
                cleanup();
                next();
            }
        };

        let anySuccesses = 0;
        let warnings: any[] = [];
        for (const sub of subscriptions) {
            const { channel, options: {
                maxLatency=defaultMaxDelayMs,
                bookmark,
                filter,
            } } = sub;

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

            // !!! todo: support inbound bookmarks for each channel and "from end" or "from start" cues
            //  - this will allow clients to pick up where they left off, or to start from the beginning
            //    of a channel's history.  "from end" will be the default.
            // for "bookmark" and "from start" options, this can be implemented as a "from end"
            //   subscription that picks up the responsibility after a one-off and temporary
            //  "from then to ‹current›" subscription has flushed its backlog.

            this.trace("  -- listening one: ", sub.channel);
            const subscriber = await this.listenOneChannel(
                res,
                sub,
                sendUpdate.bind(this, maxLatency),
                notifyConsumeError,
            );
            myStreamListeners.push({ channel, stream: subscriber });
            if (subscriber) anySuccesses += 1;
        }
        if (!anySuccesses) {
            res.status(404).json({ error: "no valid subscriptions in request" });
            return cancel();
        } else if (warnings.length) {
            sendUpdate(0, ...warnings);
        }
        reqLogger.debug("  👷listening in %d channels", subscriptions.length);
        reqLogger.trace(`  👷channels: ${subscriptions.map(s => s.channel).join(", ")}`);
        //! it tells clients how frequently they should expect a heartbeat
        sendUpdate(0, { type: "heartbeat-info", timerInterval });
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
        res: express.Response,
        sub: ChannelSubConfig,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier,
    ) {
        const channelInfo = await this.channelConn.use(sub.channel);
        //! todo: for "$" bookmarks, it can tap into an existing stream connection as a listener
        //! todo: for non-$ bookmarks, it can use an ephemeral bookmark-to-now connection 
        //   ... and then convert cleanly to a $ listener, using a technique ensuring no gap,
        //   ... no duplicates, and accurate ordering
        await this.channelConn.subscribe(channelInfo);

        //! it spawns asynchronous monitoring in each channel
        this.monitorChannelChanges(res, channelInfo, sub, sendUpdate, notifyConsumerError);
        return channelInfo;
    }

    private async monitorChannelChanges(
        res: express.Response,
        streamInfo: streamHandle,
        sub: ChannelSubConfig,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier,
    ) {
        const { bookmark="$" } = sub.options
        try {
            for await (const events of this.channelConn.consume(
                streamInfo,
                "all",
                10,
                this.subscribeTimeout,
                bookmark
            )) {
                for (const e of events) {
                    const { id: mid, ocid, type, data, ...meta } = e;
                    this.reqLogger(res).trace(
                        `    <- ocid %s in %s: %d bytes`,
                        ocid,
                        sub.channel,
                        e.data.length,
                    );
                    // eslint-disable-next-line no-debugger
                    // debugger;
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
            notifyConsumerError(res, sub.channel, consumeError as Error);
        }
    }

    adminReplicationStatus: express.RequestHandler = async (req, res, next) => {
        try {
            const isActive = !!this.replicator && this.replicator.isInitialized();
            const replicatorExists = !!this.replicator;

            // Get discovery info
            const discoveryHosts = this.discovery?.hosts || [];
            const myServerId = this.serverId;
            const peerCount = discoveryHosts.filter((h) => h.serverId !== myServerId).length;

            res.json({
                status: "ok",
                replication: {
                    active: isActive,
                    replicatorExists,
                    serverId: myServerId,
                    discoveredPeers: peerCount,
                    discoveryType: this.discovery.constructor.name,
                    hosts: discoveryHosts.map((h) => ({
                        serverId: h.serverId,
                        address: h.address,
                        port: h.port,
                    })),
                },
            });
        } catch (error: any) {
            this.warn("Error getting replication status:", error.message);
            res.status(500).json({
                status: "error",
                message: "Failed to get replication status",
                error: error.message,
            });
        }
        next();
    };
}

export async function createServer(
    options: DredServerArgs,
    serverId: string,
    serverDb: number,
    serverClass?: typeof DredServer
) {
    const SC = serverClass ?? DredServer;
    const server = new SC(options, serverId, serverDb);
    const { api, redis } = server;
    api.set("redis", redis!);

    api.use(express.json({}));
    const messagesInChannel = new RedisSet(redis!);

    return server;
}
