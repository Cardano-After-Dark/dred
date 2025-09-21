//@ts-check
import { get, Server } from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";

import { Redis, type RedisOptions } from "ioredis";
import { nanoid } from "nanoid";
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
    type ChannelSubOptions,
} from "../types/ChannelSubscriptions.js";
import { asyncDelay, autobind } from "@poshplum/utils";
import { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";
import { zonedLogger } from "@poshplum/utils";
import { ReplicationClient } from "./ReplicationClient.js";
import { DredReplicator } from "./DredReplicator.js";

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

type DredServerArgs = DredClientArgs & {
    neighborhood: string;
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
    // replicationClient?: ReplicationClient;

    // Optional replicator, to be initialized only when replication is enabled
    replicator?: DredReplicator;

    // Periodic status logging
    private statusLoggingTimer?: NodeJS.Timeout;

    resetting = false;
    get nbh() {
        return this.args.neighborhood;
    }

    setupExpressHandlers() {
        this.api.use(compression());
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
            //! it approves any allowed CORS / cross-origin requests.  These can be limited by domain name
            //  or other attributes of the cross-origin OPTIONS request.
        });
        this.api.post("/channels/listen", (...args) => {
            //! it allows clients to subscribe to many channels and receive notification about updates in any of them
            this.listenOnChannels(...args);
        });
        
        // Admin endpoints
        this.api.post("/admin/start-replication", (...args) => {
            this.adminStartReplication(...args);
        });
        this.api.get("/admin/replication-status", (...args) => {
            this.adminReplicationStatus(...args);
        });
        
        this.api.use(this.resultLogger);
    }

    constructor(args: DredServerArgs, serverId: string, redisDb: number) {
        this.args = args;
        const loggerName = `dred`;
        
        
        this.logger = zonedLogger(loggerName, {
            // serverId, // causes errors! //
            loggerId: serverId,
            // levels: {
            //     [loggerName]: logging ? "info" : "warn",
            //     _message: `(env LOGGING=${logging})`,
            // },
        });
        this.log(`=== Logger setup complete for ${loggerName} with serverId ${serverId}`);

        this.serverId = serverId;
        this.discovery = DredClient.resolveDiscovery(args);
        this.log(`+server '${serverId}' with discovery type: ${this.discovery.constructor.name}`);

        this.api = this.createExpressServer();
        const redisUrl = (this.redisUrl = process.env.REDIS_URL || "redis://localhost:6379");

        this.listener = null;
        this.verifier = new StringNacl(undefined, this);
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
        
        this.log(`Setting up Redis connection: ${url || "default"}, db: ${this.redisDb}`);
        
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
            color: bgBlack.start + white.start
        });

        this.channelConn = new RedisChannels({
            application: `${this.nbh}::`,
            redis: {
                url: url,
                db: this.redisDb,
            },
            channels: { log: this.logger },
        });
        
        // Temporarily disable auto channel setup to test server startup
        this.log("📦 Redis setup complete, skipping auto channel setup for now");
        // this.ensureDefaultChannels();
    }

    //! it has a mockable function for starting the express server
    createExpressServer(): express.Application {
        return this.args.api || express();
    }

    async pendingSetup() {
        await this.ensureDefaultChannels();
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
                this.logger.warn(
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
            ocid: `${channel}:genesis`
        });
        const o = { channelId: channel, ...options };
        this.channelCreated(channel, o);
    }

    //
    async listen() {
        await this.setupPending;

        const myInfo = (this.myServerInfo =
            this.myServerInfo || (await this.discovery.myServerInfo(this.serverId)));//
        if (!myInfo) throw new Error(`can't identify my own info`);
        const { port, address } = myInfo;
        // docker problem: do we need to listen to 0.0.0.0 instead of the address (which comes from the discovery service)
        // --> myServerInfo should give us the internal address and port, not the external address and port (ssl termination)
        // in test, we don't want to listen to 0.0.0.0 
        this.listener = this.api.listen(Number(port), address);
        this.log(`server '${this.serverId}' listening at ${address}:${port}`);

        // Setup replication after all basic server setup is complete
        // at this point, "_chans" and "_auth" channels are already created
        if (!this.isAutoReplicationDisabled()) {
            this.warn(`🚀 AUTO-REPLICATION ENABLED FOR ${this.serverId.toUpperCase()}`);
            // Start replication in background, non-blocking
            this.startAutoReplication();
        } else {
            this.warn(`⚠️  AUTO-REPLICATION DISABLED FOR ${this.serverId.toUpperCase()} (DISABLE_AUTO_REPLICATION=true)`);
            this.warn(`   Use POST /admin/start-replication to start manually`);
        }

        this.log(`=== Returning listener for ${this.serverId}`);
        
        // Start periodic status logging if enabled
        this.startPeriodicStatusLogging();
        
        return this.listener;
        // express
        //       listen(port: number, hostname: string, backlog: number, callback?: () => void): http.Server;
        //       listen(port: number, hostname: string, callback?: () => void): http.Server;

        
    }


    // ------------------------------------------------------------
    // Solution to avoid duplicate messages (replication)
    // ------------------------------------------------------------

    // knownMessages = new RedisSet(this.redis!.duplicate()); // removed in favor of lazy initialization
    
    /**
     * Known message set. Lazily initialized to avoid undefined errors.
    */
   get knownMessages(): RedisSet {
       if (!this._knownMessages) {
           // Use a specific key name for the deduplication set instead of abstract
           this._knownMessages = new RedisSet(this.redis!.duplicate(), `${this.nbh}::knownMessages`);
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
        messageDetails?: any
    ): Promise<string | undefined> {
        try {
            // composite key to ensure uniqueness across channels
            const deduplicationKey = `${channel}:::${msgId}`;
            
            // DEBUG: Add detailed logging
            this.warn(`🔍 DEDUP CHECK [${this.serverId}] checking: ${deduplicationKey}`);
            
            // Check if we've already processed this exact message
            const alreadyProcessed = await this.knownMessages.has(deduplicationKey);
            
            this.warn(`🔍 DEDUP RESULT [${this.serverId}] ${deduplicationKey} -> already processed: ${alreadyProcessed}`);
            
            if (alreadyProcessed) {
                this.warn(`❌ DEDUP SKIP [${this.serverId}] Duplicate message detected, skipping: ${deduplicationKey}`);
                return undefined; // Signal that message was not posted (duplicate)
            }
            
            // Mark message as being processed (BEFORE actually posting to prevent race conditions)
            await this.knownMessages.add(deduplicationKey);
            this.warn(`✅ DEDUP ADD [${this.serverId}] Added to known messages: ${deduplicationKey}`);
            
            // Actually post the message to the channel
            const publishedMessageId = await this.publishMessageToChannel(channel, msg, messageDetails);
            
            this.warn(`✅ DEDUP PUBLISH [${this.serverId}] Message successfully deduplicated and posted: ${deduplicationKey} -> ${publishedMessageId}`);
            return publishedMessageId;
            
        } catch (error) {
            // If we fail after marking as processed, we have a problem - log it
            this.warn(`Error in message deduplication for ${channel}:::${msgId}:`, error);
            throw error; // Re-throw so caller can handle appropriately
        }
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
        messageDetails: any = {}
    ): Promise<string> {
        try {
            // Get channel producer for this server
            const producer = await this.mkChannelProducer(channelId);
            
            // Produce the message on the channel with provided details
            const publishedMessageId = await this.channelConn.produce(producer, msg, messageDetails);
            
            this.log(`Message published to channel ${channelId}: ${publishedMessageId}`);
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
    
    // when env var is set to true, auto replication is disabled
    private isAutoReplicationDisabled(): boolean {
        return process.env.DISABLE_AUTO_REPLICATION === 'true';
    }

    async setupReplication() {
        if (this.replicator) {
            this.warn("Replication already setup");
            return; // Idempotent - safe to call multiple times
        }
        this.warn(`${this.serverId} Starting replication setup...`);
        try {
            await asyncDelay(1000);// maybe we can just skip this
            this.warn(`${this.serverId} Creating replicator...`);
            this.replicator = new DredReplicator(this, this.discovery);
            this.warn(`${this.serverId} Initializing replicator...`);
            await this.replicator.initialize();
            this.warn(`${this.serverId} Replication setup complete - replicator exists: ${!!this.replicator}`);

            // const hosts = await this.discovery.getHostList();
            // const otherHosts = hosts.filter(host => host.serverId !== this.serverId);

            // if (otherHosts.length === 0) {
            //     this.log("No other hosts found for replication");
            //     return;
            // }

            // for (const host of otherHosts) {
            //     const replicant = new Replicant(this, host);
            //     await replicant.initialize();
            // }

            // this.replicationClient = new ReplicationClient(this);
            // await this.replicationClient.initialize(otherHosts);
            // this.log(`Replication setup complete with ${otherHosts.length} peer servers`);
        } catch (error: any) {
            // Cleanup on failure
            this.warn(`${this.serverId} ERROR during replication setup: ${error}`);
            this.warn(`${this.serverId} ERROR stack:`, error.stack);
            this.replicator = undefined;
            this.warn(`${this.serverId} Failed to setup replication - nullified replicator`);
            throw error; // Re-throw if caller needs to handle
        }
    }

    /**
     * Start auto-replication in background, non-blocking with retry logic
     */
    private startAutoReplication(): void {
        this.warn(`🔄 STARTING AUTO-REPLICATION FOR ${this.serverId.toUpperCase()} (BACKGROUND)`);
        
        // Run in background - don't await, don't block server startup
        this.performAutoReplicationSetup()
            .then(() => {
                this.warn(`✅ AUTO-REPLICATION SUCCESS FOR ${this.serverId.toUpperCase()}`);
                this.warn(`🎯 REPLICATION IS NOW READY FOR ${this.serverId.toUpperCase()}`);
                // TODO: Later we'll emit replication readiness event here
            })
            .catch((error) => {
                this.warn(`❌ AUTO-REPLICATION FAILED FOR ${this.serverId.toUpperCase()}: ${error.message}`);
                this.warn(`🔄 WILL RETRY AUTO-REPLICATION IN 1 MINUTE FOR ${this.serverId.toUpperCase()}`);
                this.scheduleReplicationRetry();
            });
    }

    /**
     * Perform the actual replication setup with detailed logging
     */
    private async performAutoReplicationSetup(): Promise<void> {
        this.warn(`🔧 PERFORMING AUTO-REPLICATION SETUP FOR ${this.serverId.toUpperCase()}`);
        
        try {
            await this.setupReplication();
            this.warn(`🎉 AUTO-REPLICATION SETUP COMPLETED FOR ${this.serverId.toUpperCase()}`);
        } catch (error: any) {
            this.warn(`💥 AUTO-REPLICATION SETUP ERROR FOR ${this.serverId.toUpperCase()}: ${error.message}`);
            throw error; // Re-throw for retry logic
        }
    }

    /**
     * Schedule a retry of replication setup after 1 minute
     */
    private scheduleReplicationRetry(): void {
        this.warn(`⏰ SCHEDULING REPLICATION RETRY FOR ${this.serverId.toUpperCase()} IN 60 SECONDS`);
        
        setTimeout(() => {
            this.warn(`🔄 RETRYING AUTO-REPLICATION FOR ${this.serverId.toUpperCase()} (AFTER 1 MINUTE WAIT)`);
            this.startAutoReplication();
        }, 60000); // 1 minute
    }

    /**
     * Start periodic status logging based on STATUS_INTERVAL_SECONDS environment variable
     * Default: 10 seconds, Range: 1-1000 seconds, 0 or negative = disabled
     */
    private startPeriodicStatusLogging(): void {
        const intervalSeconds = parseInt(process.env.STATUS_INTERVAL_SECONDS || "10");
        
        if (intervalSeconds <= 0 || intervalSeconds > 1000) {
            this.log(`📊 Periodic status logging disabled (STATUS_INTERVAL_SECONDS=${intervalSeconds})`);
            return;
        }

        const intervalMs = intervalSeconds * 1000;
        this.log(`📊 Starting periodic status logging every ${intervalSeconds} seconds`);
        
        this.statusLoggingTimer = setInterval(() => {
            this.logPeriodicStatus();
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
            this.log(`📊 Stopped periodic status logging`);
        }
    }

    /**
     * Log current server status
     */
    private async logPeriodicStatus(): Promise<void> {
        try {
            const now = new Date().toISOString();
            const uptime = process.uptime();
            const uptimeFormatted = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`;
            
            // Get basic server info
            const status = this.listener ? "RUNNING" : "STOPPED";
            const replicationStatus = this.replicator ? "ACTIVE" : "INACTIVE";
            
            // Get discovery info
            const discoveredPeers = this.discovery?.hosts?.length || 0;
            const discoveryType = this.discovery?.constructor.name || "Unknown";
            
            // Get channel count
            let channelCount = 0;
            try {
                const channels = await this.channelList.keys();
                channelCount = channels.length;
            } catch (error) {
                // Ignore channel count errors
            }

            this.log(`📊 [${now}] SERVER STATUS: ${status} | Uptime: ${uptimeFormatted} | Replication: ${replicationStatus} | Peers: ${discoveredPeers} | Channels: ${channelCount} | Discovery: ${discoveryType}`);
            
        } catch (error) {
            this.warn(`📊 Error logging periodic status: ${error}`);
        }
    }

    async cleanupReplication(): Promise<void> {
        this.log(` -- start cleanupReplication ${this.serverId}`);
        if (!this.replicator) {
            debugger;
            this.warn(" === Replication not setup");
            return; // Idempotent - safe to call multiple times
        }
        this.warn(`${this.serverId} Starting replication cleanup...`);
        try {
            // Add timeout to prevent hanging during cleanup
            await Promise.race([
                this.replicator.cleanup(),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error("Replication cleanup timeout")), 5000)
                )
            ]);
            this.warn(`${this.serverId} Replication cleanup complete`);
        } catch (error) {
            this.warn(`${this.serverId} Error during replication cleanup: ${error}`);
            // Continue cleanup even if error occurs
        } finally {
            this.warn(`${this.serverId} Nullifying replicator reference`);
            this.replicator = undefined; // Always nullify, even on error
        }
        this.log(` -- cleanupReplication ${this.serverId} complete`);
    }

    async reset(reconnect?: boolean, finalCleanup?: (r?: Redis) => any) {
        this.log("server: reset()");

        // Cleanup replication client first
        await this.cleanupReplication();

        // Wait for channel cleanup to complete fully
        await this.channelConn.cleanup().catch(warning.bind(this, "channelConn.cleanup()"));
        
        // Small delay to ensure all Redis operations from channel cleanup complete
        await new Promise(resolve => setTimeout(resolve, 10));
        
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
            
            // Restart auto-replication after reset if it was enabled
            if (!this.isAutoReplicationDisabled()) {
                this.warn(`🔄 RESTARTING AUTO-REPLICATION AFTER RESET FOR ${this.serverId.toUpperCase()}`);
                // Wait for setupPending to complete, then start replication
                if (this.setupPending) {
                    this.setupPending.then(() => {
                        this.startAutoReplication();
                    }).catch((error) => {
                        this.warn(`❌ FAILED TO RESTART AUTO-REPLICATION AFTER RESET FOR ${this.serverId.toUpperCase()}: ${error.message}`);
                    });
                } else {
                    // If no setupPending, start immediately
                    this.startAutoReplication();
                }
            } else {
                this.warn(`⚠️  AUTO-REPLICATION REMAINS DISABLED AFTER RESET FOR ${this.serverId.toUpperCase()}`);
            }
            
            return this.setupPending;
        }
        function warning(this: DredServer, activityName) {
            return (e) => {
                this.warn(`during close: error in ${activityName}:\n\t`, e.message || e);
            };
        }
    }

    async close() {
        this.cancelSubscribers();

        // Cleanup replication client
        await this.cleanupReplication();
        
        // Stop periodic status logging
        this.stopPeriodicStatusLogging();

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

    /**
     * Create a DredClient instance, but does not generate a key. 
     * Note: The caller should call generateKey() after creating the client.
     * 
     * @param serverSelection - The server ID to connect to.
     * @param clientArgs - Additional client configuration options.
     * @param serverManaged - Whether the client is managed by the server (affects cleanup).
     * @returns A DredClient instance.
     */
    mkClient(
            serverSelection: string, 
            clientArgs: Partial<DredClientArgs> = {}, 
            serverManaged: boolean = true
    ): DredClient {
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

        // Mark client ownership for cleanup tracking
        (client as any)._serverManaged = serverManaged;
        
        return client;
    }

    log(a1: string, ...args: any[]) {
        this.logger.info(a1, ...args);
    }
    warn(a1: string, ...args: any[]) {
        this.logger.warn(a1, ...args);
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
        return this.logger.child({
            reqId: res.locals.id,
            clientid: res.locals.clientid,
            color: bgGreenBright.start + black.start,
        });
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
            this.warn(`Join failed: Channel ${channelId} is expired`);
            this.log(
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
            // Use deduplication system to prevent replication loops
            const id = await this.ensureMessageProcessedOnce(channelId, moreDetails.ocid, msg, moreDetails);
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

        const notifyConsumeError: consumerErrorNotifier = (res, channel, consumeError) => {
            if (!cancelled) {
                sendUpdate({
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

            this.logger.debug("  -- listening one: ", sub.channel);
            const subscriber = await this.listenOneChannel(
                res,
                sub,
                sendUpdate,
                notifyConsumeError,
            );
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
        res: express.Response,
        sub: ChannelSubOptions,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier,
    ) {
        //! it leverages the redis-streams module's cache of per-channel connections
        const channelStream = await this.channelConn.use(sub.channel);
        await this.channelConn.subscribe(channelStream);

        //! it spawns asynchronous monitoring in each channel
        this.monitorChannelChanges(res, channelStream, sub, sendUpdate, notifyConsumerError);
        return channelStream;
    }

    private async monitorChannelChanges(
        res: express.Response,
        channelStream: streamHandle,
        sub: ChannelSubOptions,
        sendUpdate: changeFeedUpdater,
        notifyConsumerError: consumerErrorNotifier,
    ) {
        try {
            for await (const events of this.channelConn.consume(
                channelStream,
                "all",
                10,
                this.subscribeTimeout,
            )) {
                for (const e of events) {
                    const { id: mid, ocid, type, data, ...meta } = e;
                    this.reqLogger(res).info(
                        bgBlueBright(black(bold(`    <- ocid ${ocid} in ${sub.channel}: `))),
                        e.data.length,
                        "bytes",
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

    // Admin endpoints for replication management
    adminStartReplication: express.RequestHandler = async (req, res, next) => {
        try {
            if (this.replicator) {
                this.warn("Replication already running");
                res.json({ 
                    status: "already_running", 
                    message: "Replication is already active",
                    replicatorExists: true
                });
                return next();
            }

            this.log("Starting replication via admin endpoint...");
            await this.setupReplication();
            
            this.log("Replication started successfully via admin endpoint");
            res.json({ 
                status: "started", 
                message: "Replication started successfully",
                replicatorExists: !!this.replicator
            });
        } catch (error: any) {
            this.warn("Failed to start replication via admin endpoint:", error.message);
            res.status(500).json({ 
                status: "error", 
                message: "Failed to start replication",
                error: error.message
            });
        }
        next();
    };

    adminReplicationStatus: express.RequestHandler = async (req, res, next) => {
        try {
            const isActive = !!this.replicator && this.replicator.isInitialized();
            const replicatorExists = !!this.replicator;
            
            // Get discovery info
            const discoveryHosts = this.discovery?.hosts || [];
            const myServerId = this.serverId;
            const peerCount = discoveryHosts.filter(h => h.serverId !== myServerId).length;
            
            res.json({
                status: "ok",
                replication: {
                    active: isActive,
                    replicatorExists,
                    serverId: myServerId,
                    discoveredPeers: peerCount,
                    discoveryType: this.discovery.constructor.name,
                    hosts: discoveryHosts.map(h => ({ 
                        serverId: h.serverId, 
                        address: h.address, 
                        port: h.port 
                    }))
                }
            });
        } catch (error: any) {
            this.warn("Error getting replication status:", error.message);
            res.status(500).json({ 
                status: "error", 
                message: "Failed to get replication status",
                error: error.message
            });
        }
        next();
    };
}

export async function createServer(options: DredServerArgs, serverId: string, serverDb: number) {
    const server = new DredServer(options, serverId, serverDb);
    const { api, redis } = server;
    api.set("redis", redis!);

    api.use(express.json({}));
    const messagesInChannel = new RedisSet(redis!);

    return server;
}
