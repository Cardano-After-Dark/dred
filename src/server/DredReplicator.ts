/**
 * The DredReplicator(Mgr) class handles replication logic for a single Dred Server within a given neighborhood.
 *
 *  DredRepl(homeServer, targetServer)
 *  targetServer. (channel changed)
 *  - added: is this channel in the home server?
 *   - y: client listen also to that channel
 *   - n (no listen) --> create home server channel (req. all DS in nbh shall have same channels)
 *
 *
 * In a DredNetwork, a discovery service provides the list of discoverable servers.
 * Among these, a subset of servers forms a neighborhood (nbh).
 * Servers within the same neighborhood are able to replicate messages to each other.
 *
 * Each neighborhood server has its own DredReplicator instance to manage replication.
 * Specifically, a DredReplicator spawns a RepClient for each other nbh-server.
 * (future impl: new RepClient for a new nbh-server, remove RepClient for a nbh-server leaving the nbh)
 *
 * Each RepClient is responsible for replicating messages (ocid, channel, type, data)
 * from a target server to the home server, provided that:
 *   - The home server has a channel with the same name.
 *   - The message is not a duplicate, identified by the ocid.
 *
 * This class acts as the central coordinator for managing replication within a neighborhood.
 */

import fetch from "cross-fetch";
import { autobind, zonedLogger } from "@poshplum/utils";
import { asyncDelay } from "../util/asyncDelay.js";
import { colors } from "../picocolors/picocolors.js";
import { nanoid } from "../util/nanoid.js";

import { ConnectionManager } from "../client/ConnectionManager.js";
import { DredClient } from "../client/DredClient.js";
import { Discovery } from "../types/Discovery.js";
import { DredServer } from "./DredServer.js";
import { EventEmitter } from "eventemitter3";
import { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";

import type { FullDredMessage } from "../client/DredClient.js";
import type { DredHostDetails } from "../types/DredHosts.js";
import type { ConnectionManagerOptions } from "../types/PeerDiscovery.js";
import type { Logger } from "../types/Logger.js";
import { ReplicationSourceBookmarks } from "./ReplicationSourceBookmarks.js";
import type { DredMessage, ReplicatedMessage } from "../types/ChannelSubscriptions.js";

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

export class DredReplicator {
    logger: Logger;
    private readonly homeServer: DredServer;
    private readonly discovery: Discovery;
    private replicants: Replicant[] = [];
    private initialized: boolean = false;

    isInitialized(): boolean {
        return this.initialized;
    }

    /**
     * Get replicants that are successfully connected/active
     */
    getActiveReplicants(): Replicant[] {
        return this.replicants.filter((replicant) => replicant.isActive());
    }

    log(message: string, ...args: any[]) {
        this.logger.info(message, ...args);
    }
    warn(message: string, ...args: any[]) {
        this.logger.warn(message, ...args);
    }
    progress(message: string, ...args: any[]) {
        this.logger.progress(message, ...args);
    }
    debug(message: string, ...args: any[]) {
        this.logger.debug(message, ...args);
    }

    constructor(homeServer: DredServer, discovery: Discovery) {
        const serverDb = homeServer.redisDb;
        const dbInfo = serverDb ? `/#${serverDb}` : "";
        const name = `${nanoid(4)}${dbInfo}`;

        this.logger = zonedLogger("replicator", {
            color: yellow.start,
            //  levels: {default: "info"},
            loggerId: name,
        });
        this.homeServer = homeServer;
        this.discovery = discovery;

        // this could be an alternative to the map
        //this.homeServer.redis?.duplicate()
    }

    async initialize() {
        if (this.initialized) {
            this.progress(`already initialized`);
            return;
        }
        this.initialized = true;
        this.debug(`initializing`);

        // NOTE: the discovery is already filtering by neighborhood
        const hosts = await this.discovery.getHostList();
        const otherHosts = hosts.filter((host) => host.serverId !== this.homeServer.serverId);
        const readySignals: Promise<void>[] = [];
        // Create all replicants first
        for (const host of otherHosts) {
            // handle replication from a single target server to the home server
            const replicant = new Replicant(this, this.homeServer, host);
            // Store replicant for cleanup
            this.replicants.push(replicant);
            readySignals.push(
                new Promise<any>((resolve) => {
                    replicant.eventEmitter.once("replicator:connected", resolve);
                }),
            );
            try {
                // Start connection loop in background
                replicant.startConnectionLoop();
            } catch (error: any) {
                this.logger.error(`starting connection loop:`, error.stack);
            }
        }
        this.replicantsReady = Promise.all(readySignals);

        // Don't wait for connections to complete - let them retry in background
        this.progress(`initialized with ${this.replicants.length} replicants`);
    }
    replicantsReady: Promise<void[]> | undefined;

    async cleanup() {
        if (!this.initialized) {
            this.warn(`not initialized`);
            return;
        }

        this.debug(`cleanup ${this.replicants.length} replicants`);

        // Clean up all replicants - wait for all but continue on errors
        const results = await Promise.allSettled(
            this.replicants.map((replicant, index) => {
                // this.debug(`cleaning up replicant ${index}`);
                return replicant.cleanup();
            }),
        );

        // Log any failures but don't throw
        results.forEach((result, index) => {
            if (result.status === "rejected") {
                this.warn(`Error cleaning up replicant ${index}: ${result.reason}`);
            }
        });

        this.replicants = [];
        this.initialized = false;
        this.progress(`cleanup complete`);
    }

    // // true when message with this ocid was already processed for this channel
    // public hasProcessedMessage(channelId: string, messageId: string): boolean {
    //     const channelMessages = this.mapChOcid.get(channelId);
    //     return channelMessages ? channelMessages.has(messageId) : false;
    // }

    // // mark message with this ocid as processed for this channel
    // public markMessageAsProcessed(channelId: string, messageId: string): void {
    //     if (!this.mapChOcid.has(channelId)) {
    //         this.mapChOcid.set(channelId, new Set<string>());
    //     }
    //     this.mapChOcid.get(channelId)!.add(messageId);
    // }
}

/**
 * Simple retry state for connection attempts
 */
interface SimpleRetryState {
    lastAttemptTime?: Date;
    nextRetryTime?: Date;
    isRetrying: boolean;
    retryTimer?: NodeJS.Timeout;
}

type ReplicationEvents = {
    "replicator:connected": [replicant: Replicant];
};

/**
 * Replicant is a class that handles replication to a single target server.
 * It is responsible for:
 *  - subscribing to all channels in the target server which are also in the home server
 *  - replicating the messages from the target server to the home server, while preventing duplicates
 *  - listening to the home server for new channels
 */
export class Replicant {
    private replicator: DredReplicator;
    private homeServer: DredServer;
    private targetHost: DredHostDetails;
    private name: string;
    private repClient: DredClient | null;
    private retryState: SimpleRetryState;
    logger: Logger;
    eventEmitter: EventEmitter<ReplicationEvents> = new EventEmitter<ReplicationEvents>();
    log(message: string, ...args: any[]) {
        // Use a simulated "replication" facility with target as loggerId
        // This mimics what Randall wanted: facility 'replication' with target-server-id as loggerId
        this.logger.info(message, ...args);
    }
    warn(message: string, ...args: any[]) {
        // Use a simulated "replication" facility with target as loggerId
        this.logger.warn(message, ...args);
    }
    progress(message: string, ...args: any[]) {
        this.logger.progress(message, ...args);
    }
    debug(message: string, ...args: any[]) {
        this.logger.debug(message, ...args);
    }
    trace(message: string, ...args: any[]) {
        this.logger.trace(message, ...args);
    }

    constructor(replicator: DredReplicator, homeServer: DredServer, targetHost: DredHostDetails) {
        this.replicator = replicator;
        this.homeServer = homeServer;
        this.targetHost = targetHost;
        const serverDb = homeServer.redisDb;
        const dbInfo = serverDb ? `${nanoid(3)}/#${serverDb}-` : "";
        const target = targetHost.serverId.replace(/^dredNode-/, "") || targetHost.address;
        this.name = `${dbInfo}from-${target}`;
        this.logger = zonedLogger("replicant", {
            loggerId: this.name,
            color: blue.start,
        });
        this.repClient = null;
        this.retryState = {
            isRetrying: false,
        };
    }

    /**
     * Get the target host details
     */
    getTargetHost(): DredHostDetails {
        return this.targetHost;
    }

    /**
     * Check if this replicant is active (has a connected client)
     */
    isActive(): boolean {
        // A replicant is considered active if:
        // 1. It has a repClient
        // 2. The repClient's connection manager has active connections
        if (!this.repClient) {
            return false;
        }

        try {
            const connManager = this.repClient.connManager;
            if (!connManager) {
                return false;
            }

            // Check if there are any "active" connections in the connection manager
            // This is the proper way to determine if the client is actually connected
            return this.hasActiveConnections(connManager);
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if the connection manager has any active connections
     */
    private hasActiveConnections(connManager: any): boolean {
        try {
            // Simple approach: if we have a repClient and it was successfully established, consider it active
            if (this.repClient) {
                const clientConnManager = (this.repClient as any).connManager;

                // Check if the client's connection manager has active connections
                if (clientConnManager) {
                    const clientConnStatus = (clientConnManager as any).connStatus;
                    if (clientConnStatus && clientConnStatus.size > 0) {
                        for (const [conn, status] of clientConnStatus.entries()) {
                            const graveyard = (clientConnManager as any).graveyard;
                            if (graveyard && graveyard.has(conn)) {
                                continue; // Skip graveyard connections
                            }
                            if (status === "active") {
                                return true;
                            }
                        }
                    }
                }

                // If we have a repClient that was successfully created and hasn't been cleaned up,
                // and we're not in a retry state, assume it's active
                if (!this.retryState.isRetrying) {
                    return true;
                }
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    /**
     * Start the connection loop with retry logic (non-blocking)
     */
    startConnectionLoop(): void {
        this.logger.progress(`starting connection loop`);

        if (this.repClient !== null) {
            this.warn(`${this.name} already has a client, cleaning up first`);
            // Don't await cleanup - do it asynchronously
            this.cleanup()
                .then(() => {
                    this.attemptConnection();
                })
                .catch((error) => {
                    this.warn(
                        `${this.name} cleanup failed, proceeding with connection attempt: ${error}`,
                    );
                    this.attemptConnection();
                });
        } else {
            // Start the connection attempt asynchronously
            this.attemptConnection();
        }
    }

    /**
     * Attempt to establish connection and set up replication (async, non-blocking)
     */
    private async attemptConnection(): Promise<void> {
        try {
            this.retryState.lastAttemptTime = new Date();

            // Check if target server is available first (with timeout)
            const isAvailable = await this.checkServerAvailability();
            if (!isAvailable) {
                // Error message already logged in checkServerAvailability with semantic format
                throw new Error(`Target server ${this.targetHost.serverId} is not available`);
            }
            const focusedDiscovery = new StaticHostDiscovery({
                hosts: [this.targetHost],
                neighborhood: this.homeServer.nbh,
            });

            // Create client and attempt connection with timeout
            this.repClient = new DredClient({
                ...this.homeServer.clientArgs,
                name: this.name,
                neighborhood: this.homeServer.nbh,
                discovery: focusedDiscovery,
                bookmarkStorage: new ReplicationSourceBookmarks(
                    this.homeServer.serverId,
                    this.targetHost.serverId,
                    this.homeServer.redis!,
                ),
            });

            // Set max listeners to prevent memory leak warnings on various components
            if (this.repClient) {
                const connManager = (this.repClient as any).connManager;
                if (connManager && connManager.setMaxListeners) {
                    connManager.setMaxListeners(20);
                }

                // Also set on the client itself if it supports it
                if ((this.repClient as any).setMaxListeners) {
                    (this.repClient as any).setMaxListeners(20);
                }
            }

            let success = false;
            // Add timeout to the entire DRED client connection process
            const connectionPromise = this.performConnection().then(() => {
                success = true;
            });
            asyncDelay(1000).then(() => {
                // VERY special case - normally we'd just log.
                // show a message, but only if it didn't quickly get connected.
                if (!success) {
                    this.warn("Replicator trying to connect ...");
                }
            });

            const timeoutPromise = new Promise<never>((_, reject) => {
                setTimeout(() => {
                    reject(new Error("DRED client connection timeout after 10 seconds"));
                }, 10000);
            });

            await Promise.race([connectionPromise, timeoutPromise]);

            if (!success) {
                throw new Error("unreachable error");
            } else {
                // Connection successful - reset retry state
                this.resetRetryState();
                this.eventEmitter.emit("replicator:connected", this);

                this.log(`replicating`);
            }
        } catch (error) {
            // Error already logged in checkServerAvailability with semantic format

            // Clean up failed client
            if (this.repClient) {
                try {
                    this.repClient.disconnect();
                } catch (cleanupError) {
                    // Ignore cleanup errors
                }
                this.repClient = null;
            }

            // Schedule retry
            this.scheduleRetry();
        }
    }

    /**
     * Check if the target server is available with a simple HTTP GET /channels
     */
    private async checkServerAvailability(): Promise<boolean> {
        try {
            let secureProtocol = "https";
            if (this.targetHost.insecure) {
                if (process.env.NODE_ENV !== "test") {
                    throw new Error("insecure replication is only allowed in test environment");
                }
                secureProtocol = "http";
            }
            const url = `${secureProtocol}://${this.targetHost.address}:${this.targetHost.port}/channels`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const response = await fetch(url, {
                method: "GET",
                signal: controller.signal,
                headers: {
                    "content-type": "application/json",
                    accept: "application/json",
                    clientId: `${this.name}-REPL`,
                } as HeadersInit,
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                return true;
            } else {
                this.warn(`HTTP error: ${response.status}: ${response.statusText}`);
                this.warn(
                    `can't yet replicate from ${this.targetHost.address}:${this.targetHost.port} - will retry`,
                );
                return false;
            }
        } catch (error: any) {
            this.warn(error.cause.message || error.message);
            this.warn(
                `can't yet replicate from ${this.targetHost.address}:${this.targetHost.port} - will retry`,
            );
            return false;
        }
    }

    /**
     * Perform the actual connection setup (called with timeout)
     */
    private async performConnection(): Promise<void> {
        if (!this.repClient) {
            throw new Error("Client not initialized");
        }

        await this.repClient.generateKey();

        // Get channels from both servers and find intersection
        const commonChannels = await this.findCommonChannels();

        // Subscribe to common channels with replication handlers
        await this.subscribeToCommonChannels(commonChannels);
    }

    /**
     * Schedule a retry attempt after the configured interval
     */
    private scheduleRetry(): void {
        if (this.retryState.isRetrying) {
            return;
        }

        const retryIntervalSeconds = parseInt(
            process.env.REPLICATION_RETRY_INTERVAL_SECONDS || "60",
            10,
        );
        // in test env, we'll retry every 6 seconds instead by default.  Sorry this looks obscure.
        const retryIntervalMs =
            retryIntervalSeconds * (process.env.NODE_ENV === "test" ? 100 : 1000);

        this.retryState.isRetrying = true;
        this.retryState.nextRetryTime = new Date(Date.now() + retryIntervalMs);

        this.retryState.retryTimer = setTimeout(() => {
            this.attemptConnection();
        }, retryIntervalMs);
    }

    /**
     * Reset retry state after successful connection
     */
    private resetRetryState(): void {
        if (this.retryState.retryTimer) {
            clearTimeout(this.retryState.retryTimer);
            this.retryState.retryTimer = undefined;
        }

        this.retryState.isRetrying = false;
        this.retryState.nextRetryTime = undefined;
    }

    private async findCommonChannels(): Promise<string[]> {
        // Trigger channel discovery if not already done
        if (!this.repClient!.channels || this.repClient!.channels.length === 0) {
            this.debug(`finding remote channels`);
            this.repClient!.channels = await this.repClient!.connManager.getChannelList();
        }

        // Get channels from target server (via replication client)
        const targetChannels = this.repClient!.channels;
        this.trace(`found channels: ${targetChannels.join(", ")}`);

        // Get channels from home server
        const homeChannels = (await this.homeServer.channelList.keys()) as string[];
        this.trace(`my channels: ${homeChannels.join(", ")}`);

        // Find intersection (channels that exist on both servers)
        const commonChannels = targetChannels.filter(
            (channel) => homeChannels.includes(channel) && !channel.startsWith("_"), // Skip meta channels for now
        );
        
        this.trace(`common channels: ${commonChannels.join(", ")}`);
        this.progress(`${commonChannels.length} common channels`);

        return commonChannels;
    }

    private async subscribeToCommonChannels(channels: string[]): Promise<void> {
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Connection state check
        this.logger.ops(`Connection states:
          - RepClient: ${this.repClient!.currentState}
          - ConnManager: ${this.repClient!.connManager.currentState}
          - Waiting for connection...
          - After wait - RepClient: ${this.repClient!.currentState}, ConnManager: ${this.repClient!.connManager.currentState}`);

        // Subscribe to _chans meta channel to detect new channels
        await this.repClient!.subscribeToChannels({
            '_chans': (message: any) => {
                this.handleChannelEvent(message);
            }
        });

        await this.repClient!.subscribeToChannels({
            type: "mass",
            channels,
            massHandler: this.messageHandler.bind(this),
        });

        this.progress(`subscribed to ${channels.length} channels + _chans meta channel`);
    }

    /**
     * Handle incoming message from target server to this client attached to the home server
     * @param channelId
     * @param message
     * @returns
     */
    private async messageHandler(inboundMessage: FullDredMessage): Promise<void> {
        const { mid, channel, ocid } = inboundMessage;
        try {
            this.trace(`received message`, { channel, mid });
            const messageId = ocid || mid || `${Date.now()}-${Math.random()}`;

            // Skip messages without ocid - they can't be properly deduplicated
            if (!ocid) {
                this.debug(`Skipping message without ocid`, messageId);
                return;
            }

            // CRITICAL: Prevent replication loops

            if (inboundMessage.origSrvId === this.homeServer.serverId) {
                this.debug(`Skipping message originating from here: %s`, messageId);
                return;
            }

            // Check if this message already came from replication (has replication metadata)
            if (inboundMessage.replFrom && inboundMessage.replFrom !== undefined) {
                this.warn(
                    `---- UNEXPECTED: Skipping message: already replicated (from ${inboundMessage.replFrom})`,
                );
                this.warn(
                    `TODO: !!! ensure a ring topology doesn't drop messages due to this policy`,
                );
                return;
            }

            if (!(await this.weHaveChannel(channel, messageId))) {
                this.warn("dropping message for non-existent channel: %o", { channel, messageId });
                this.warn(
                    `TODO: !!! check for a race involving a new channel; ensure we aren't dropping messages`,
                );
                return;
            }

            const {
                msg,
                type,
                "content-type": contentType,
                encryptedMsg,
            } = inboundMessage

            const replicatedMessage: DredMessage & ReplicatedMessage = {
                // type: message.type || "replicated",'
                msg,
                type,
                "content-type": contentType,
                ocid: ocid,
                encryptedMsg,

                replFrom: this.targetHost.serverId,
                replAt: new Date().getTime(),
                origMsgId: messageId,
                origSrvId: this.targetHost.serverId,
            };

            await this.addMessage(channel, mid, replicatedMessage);
        } catch (error: any) {
            this.logger.error(`while replicating channel '${channel}': `, error.stack);
            throw error;
        }
    }

    /**
     * Check if the message should be replicated to the home server
     *
     *
     * @param channelId
     * @param messageId
     * @returns
     */
    private async weHaveChannel(channelId: string, messageId: string): Promise<boolean> {
        // Check if channel still exists on home server
        const channelExists = await this.homeServer.channelList.has(channelId);

        // NOTE: we might have issues here, as we probably need to trigger the getChannelList()
        // if, so, it is better to have a cache of channels and subscribe to the _chans channel
        // to be notified of new channels

        if (!channelExists) {
            this.debug(
                `Channel ${channelId} no longer exists on home server, skipping replication`,
            );
            return false;
        }

        // Check if message already processed not needed anymore, we use deduplication

        return true;
    }

    private async addMessage(channelId: string, mid: string, messageDetails: DredMessage & ReplicatedMessage): Promise<void> {
        try {
            // this.warn(`📤 REPLICATION: Publishing to home server '${this.homeServer.serverId}' in channel '${channelId}' (ocid: ${messageDetails.ocid})`);

            const { ocid } = messageDetails
            // Use the DredServer's deduplication system to prevent duplicate messages
            const result = await this.homeServer.ensureMessageProcessedOnce(
                channelId,
                ocid!,
                messageDetails.msg,
                messageDetails,
            );

            if (result) {
                this.logger.trace(`Message added to local server: ${result}`);
            } else {
                this.debug(`already replicated: ${channelId}/ ${messageDetails.ocid}`);
            }
            this.repClient?.bookmarkStorage.setBookmark(channelId, mid);
        } catch (error) {
            this.logger.error(`while adding to channel ${channelId}: ${error}`);
            throw error;
        }
    }

    /**
     * Handle channel events from _chans meta channel
     */
    private handleChannelEvent(message: any): void {
        try {
            const { type, msg } = message;

            if (type === 'chanCreated') {
                const data = JSON.parse(msg);
                const { channel, options } = data;

                this.log(`📢 Channel creation detected on ${this.targetHost.serverId}: ${channel}`);
                // Handle asynchronously but don't await to avoid blocking
                this.handleChannelAdded(channel, options).catch(error => {
                    this.warn(`Error handling channel addition: ${error}`);
                });
            }
        } catch (error) {
            this.warn(`Error handling channel event: ${error}`);
        }
    }

    /**
     * Handle a new channel being added on the target server
     */
    private async handleChannelAdded(channelName: string, options: any): Promise<void> {
        try {
            // Check if home server already has this channel
            const hasChannel = await this.homeServer.channelList.has(channelName);

            if (hasChannel) {
                this.debug(`Channel ${channelName} already exists on home server`);
                return;
            }

            this.log(`🆕 Creating channel ${channelName} on home server ${this.homeServer.serverId}`);

            // Create channel on home server using the same options
            await this.homeServer.channelList.set(channelName, '1');
            await this.homeServer.setChanOptions(channelName, options);

            // Subscribe to this new channel for message replication
            await this.subscribeToNewChannel(channelName);

            this.log(`✅ Channel ${channelName} replicated and subscribed`);
        } catch (error) {
            this.warn(`Failed to handle channel addition for ${channelName}: ${error}`);
        }
    }

    /**
     * Subscribe to a newly discovered channel using mass handler (compatible with main branch)
     */
    private async subscribeToNewChannel(channelName: string): Promise<void> {
        try {
            this.log(`📥 Subscribing to new channel: ${channelName}`);

            // Subscribe using the mass handler approach (compatible with main branch)
            await this.repClient!.subscribeToChannels({
                type: "mass",
                channels: [channelName],
                massHandler: this.messageHandler.bind(this),
            });

            this.log(`✅ Subscribed to new channel: ${channelName}`);
        } catch (error) {
            this.warn(`Failed to subscribe to new channel ${channelName}: ${error}`);
        }
    }

    /**
     * Clean up replicant resources following ownership pattern.
     * TestServer owns client lifecycle, so we just nullify our reference.
     */
    async cleanup(): Promise<void> {
        this.trace(`cleaning up replicant`);

        // Clear any pending retry timers
        if (this.retryState.retryTimer) {
            clearTimeout(this.retryState.retryTimer);
            this.retryState.retryTimer = undefined;
            this.debug(`cleared retry timer`);
        }

        // Reset retry state
        this.retryState.isRetrying = false;
        this.retryState.nextRetryTime = undefined;

        if (this.repClient) {
            this.repClient.disconnect();

            // Doesn't try to clear subscriptions - DredClient subscription setter is incomplete
            // Just nullify our reference and let testServer handle full client disconnect
            this.repClient = null;
        }

        this.progress(`cleanup complete`);
    }
}
