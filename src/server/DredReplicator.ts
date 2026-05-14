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

import type { eventChannelInfo, FullDredMessage } from "../client/DredClient.js";
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

    /**
     * Get every replicant — active or not. Used by the periodic status
     * logger to attach a substate string (retry attempts, cmState, etc.)
     * to each non-connected peer so "Replication: ENABLED (0/1)" stops
     * being an unexplained binary.
     */
    getAllReplicants(): Replicant[] {
        return [...this.replicants];
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
    //! consecutive failure count — drives exponential backoff and is reset on success
    attempts: number;
    //! when the current failure streak started, for "down for Ys" diagnostics
    firstFailureTime?: Date;
    //! most recent error from a failed attempt, surfaced in describeStatus() so
    //  the periodic OPS line tells you *why* a peer is non-connected.
    lastError?: Error;
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
            attempts: 0,
        };
    }

    /**
     * Get the target host details
     */
    getTargetHost(): DredHostDetails {
        return this.targetHost;
    }

    /** human-readable display name for status output */
    getName(): string {
        return this.name;
    }

    //! Replicant-level resilience: when the underlying client gets wedged
    //  (CM enters terminal "disconnected"), we can't recover at the client
    //  layer.  Dispose the stuck client and re-enter the attempt loop with
    //  exponential backoff.  Idempotent: a second call while teardown is
    //  in flight is a no-op.
    //! Sticky shutdown flag. Set true in cleanup(); never reset. Reconnect-
    //  scheduling paths (scheduleRetry, handleClientStuck, attemptConnection)
    //  must early-return when set. Prevents the .once("disconnected") listener
    //  that fires DURING cleanup's own disconnect call from scheduling a retry
    //  after cleanup has already wound state down — a fresh Replicant instance
    //  is required to replicate again.
    private disposed = false;

    private _handlingStuck = false;
    private handleClientStuck(reason: string): void {
        if (this.disposed) return;
        if (this._handlingStuck) return;
        this._handlingStuck = true;

        this.warn("client stuck — re-attempting: %s", reason);
        this.retryState.lastError = new Error(`client stuck: ${reason}`);

        if (this.repClient) {
            try {
                this.repClient.events.removeAllListeners();
                this.repClient.disconnect();
            } catch (e) {
                /* ignore teardown errors */
            }
            this.repClient = null;
        }

        this._handlingStuck = false;
        this.scheduleRetry();
    }

    /**
     * Human-readable substate string for diagnostic logs.
     *
     * Covers the gap exposed when "Replication: ENABLED (0/1)" appears with
     * no visible reason. Reports: which step the replicant is on (active,
     * retrying, connecting, etc), the underlying ConnectionManager state
     * (the source of truth per hasActiveConnections), the in-flight retry
     * counter + most-recent-error + next-retry ETA when applicable.
     */
    describeStatus(): string {
        const active = this.isActive();
        const cmState = (this.repClient as any)?.connManager?.currentState as
            | string
            | undefined;
        if (active) {
            return `active, cmState=${cmState ?? "‹unknown›"}`;
        }

        const parts: string[] = [];
        if (!this.repClient) {
            parts.push("no client yet");
        } else {
            parts.push(`cmState=${cmState ?? "‹unknown›"}`);
        }
        if (this.retryState.attempts > 0) {
            parts.push(`attempts=${this.retryState.attempts}`);
        }
        if (this.retryState.firstFailureTime) {
            const downSec = (
                (Date.now() - this.retryState.firstFailureTime.getTime()) /
                1000
            ).toFixed(1);
            parts.push(`down=${downSec}s`);
        }
        if (this.retryState.nextRetryTime) {
            const nextInSec = (
                (this.retryState.nextRetryTime.getTime() - Date.now()) /
                1000
            ).toFixed(1);
            parts.push(`nextRetry=+${nextInSec}s`);
        }
        const err = (this.retryState as any).lastError as Error | undefined;
        if (err) {
            parts.push(`lastErr=${err.message || err}`);
        }
        return parts.join(", ");
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
     * Check if the connection manager has any active connections.
     *
     * Two-stage check:
     *   1. Fast-fail on the ConnectionManager's own state — if the CM knows
     *      it's disconnected/disconnecting/reconnecting/connecting, the per-
     *      connection map is either empty or in flux and we should report
     *      inactive.  This is the authoritative health signal: CM owns
     *      replacement of dropped connections, so its state is the source of
     *      truth for whether the client has a stable view of the world.
     *   2. Otherwise, walk the connStatus map and require at least one
     *      non-graveyarded connection in "active" status.
     *
     * Previously this method had a fall-through `if (!isRetrying) return true`
     * that reported active whenever the replicant had successfully connected
     * once — even if every underlying connection had since gone "dropped" or
     * "disconnected".  That fall-through is gone.
     */
    private hasActiveConnections(connManager: any): boolean {
        try {
            const cmState = connManager?.currentState as string | undefined;
            if (
                cmState === "disconnected" ||
                cmState === "disconnecting" ||
                cmState === "reconnecting" ||
                cmState === "connecting" ||
                cmState === "pendingSetup" ||
                cmState === "discoveringNbh"
            ) {
                return false;
            }

            const clientConnStatus = connManager?.connStatus;
            if (!clientConnStatus || clientConnStatus.size === 0) {
                this.logUnexpectedInactive(connManager, cmState, "connStatus is empty");
                return false;
            }

            const graveyard = connManager.graveyard;
            for (const [conn, status] of clientConnStatus.entries()) {
                if (graveyard?.has(conn)) continue;
                if (status === "active") return true;
            }
            this.logUnexpectedInactive(
                connManager,
                cmState,
                "no non-graveyarded connection in 'active' status",
            );
            return false;
        } catch (error: any) {
            this.warn(
                "hasActiveConnections threw: %s",
                error?.stack || error?.message || error,
            );
            return false;
        }
    }

    //! diagnostic: rate-limited log when hasActiveConnections disagrees with
    //  the CM's own state machine. Prevents the "(0/1)" / cmState=healthy
    //  mystery from being silent again. Logs only on transition into the
    //  unexpected condition, not on every poll.
    private _lastUnexpectedInactiveKey: string | undefined;
    private logUnexpectedInactive(
        connManager: any,
        cmState: string | undefined,
        why: string,
    ) {
        if (
            cmState !== "healthy" &&
            cmState !== "partiallyConnected" &&
            cmState !== "degraded" &&
            cmState !== "replacingSubs"
        ) {
            // expected to be inactive — no diagnostic needed
            this._lastUnexpectedInactiveKey = undefined;
            return;
        }
        const connStatus = connManager?.connStatus;
        const graveyard = connManager?.graveyard;
        const entries: string[] = [];
        if (connStatus) {
            for (const [conn, status] of connStatus.entries()) {
                const inGrave = graveyard?.has?.(conn) ? "[graveyard]" : "";
                const hcState = (conn as any)?.currentState ?? "‹?›";
                const host = (conn as any)?.host?.serverId ?? "‹?›";
                entries.push(`${host}: ${status}${inGrave} hc=${hcState}`);
            }
        }
        // throttle: only log on transition to this specific (state, count, reason)
        const key = `${cmState}|${entries.length}|${why}`;
        if (key === this._lastUnexpectedInactiveKey) return;
        this._lastUnexpectedInactiveKey = key;
        this.warn(
            "isActive=false but cmState=%s — %s. connStatus[%d]: { %s }",
            cmState,
            why,
            entries.length,
            entries.join(", ") || "‹empty›",
        );
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
        if (this.disposed) return;
        // todo: audit the downstream code to see how it may already do retry behavior
        // without the need for this layer to fuss with it.  Refactor this code to just make the client
        // and initialize it simply.  Maybe listen to some events it emits if we need to react
        // to something it does.
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
            const homeArgs: any = this.homeServer.clientArgs;
            this.repClient = new DredClient({
                ...homeArgs,
                name: this.name,
                neighborhood: this.homeServer.nbh,
                discovery: focusedDiscovery,
                bookmarkStorage: new ReplicationSourceBookmarks(
                    this.homeServer.serverId,
                    this.targetHost.serverId,
                    this.homeServer.redis!,
                ),
                //! per-attempt timeout + bounded retries so a peer reboot
                //  doesn't waste minutes on a hung fetch.  10s/3 means the
                //  HostConnection gives up after ~40s of futile attempts;
                //  Replicant's own scheduleRetry then takes over with its
                //  exponential backoff to retry from scratch.
                connectionSettings: {
                    ...(homeArgs?.connectionSettings || {}),
                    connectAttemptTimeoutMs: 10_000,
                    maxRetries: 3,
                },
            });

            this.repClient!.events.on("channel:created", this.channelWasAdded, this);
            // !!! todo: add channel:removed handling
            // this.repClient.events.on("channel:removed", (event) => {
            //     this.log(`🎯 Channel removed: ${event.channel}`);
            // });

            // Set max listeners to prevent memory leak warnings on various components
            const connManager = (this.repClient as any).connManager;
            if (connManager && connManager.setMaxListeners) {
                connManager.setMaxListeners(20);
            }
            if ((this.repClient as any).setMaxListeners) {
                (this.repClient as any).setMaxListeners(20);
            }

            //! Resilience: if the CM ever lands in its terminal "disconnected"
            //  state (e.g. via checkConnectionState finding 0 healthy), the
            //  underlying client is stuck — its only exit is connectionDropped,
            //  which requires a live HostConnection to drop.  Replicant takes
            //  over: tear down this repClient and re-enter the attempt loop
            //  with Replicant-level backoff.  Uses .once so we don't re-fire
            //  during the teardown's own disconnect call.
            if (connManager && typeof connManager.events?.once === "function") {
                connManager.events.once("disconnected", () => {
                    this.handleClientStuck("CM entered terminal disconnected state");
                });
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
        } catch (error: any) {
            // record for describeStatus() / periodic OPS diagnostics
            this.retryState.lastError =
                error instanceof Error ? error : new Error(String(error));

            // Clean up failed client
            if (this.repClient) {
                try {
                    this.repClient.events.removeAllListeners();
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
        let url = "<unresolved>";
        try {
            let secureProtocol = "https";
            if (this.targetHost.insecure) {
                if (process.env.NODE_ENV !== "test" && process.env.IS_IN_SECURE_TUNNEL !== "1") {
                    throw new Error("insecure replication requires NODE_ENV=test or IS_IN_SECURE_TUNNEL=1");
                }
                secureProtocol = "http";
            }
            url = `${secureProtocol}://${this.targetHost.address}:${this.targetHost.port}/channels`;
            this.progress(`checkServerAvailability GET ${url} (serverId=${this.targetHost.serverId}, insecure=${!!this.targetHost.insecure})`);
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
            const msg = error?.cause?.message || error?.message || String(error);
            this.warn(`checkServerAvailability failed for ${url}: ${msg}`);
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
     * Schedule a retry attempt with exponential backoff (1.27^attempts, capped).
     *
     * Shape matches HostConnection's mid-stream retry loop so recovery behaves
     * consistently across layers: fast initial attempts for transient failures
     * (peer restarts) with polite backoff for sustained outages.
     */
    private scheduleRetry(): void {
        if (this.disposed) return;
        if (this.retryState.isRetrying) {
            return;
        }

        const testEnv = process.env.NODE_ENV === "test";
        //! in test env the unit is centiseconds (10ms) so tests stay fast
        const unitMs = testEnv ? 10 : 1000;

        const baseSec = parseFloat(process.env.REPLICATION_RETRY_BASE_SECONDS || "1");
        const maxSec = parseFloat(
            process.env.REPLICATION_RETRY_MAX_SECONDS ||
                process.env.REPLICATION_RETRY_INTERVAL_SECONDS ||
                "30",
        );

        this.retryState.attempts += 1;
        if (!this.retryState.firstFailureTime) {
            this.retryState.firstFailureTime = new Date();
        }

        const attempts = this.retryState.attempts;
        const rawMs = baseSec * unitMs * Math.pow(1.27, attempts - 1);
        const retryIntervalMs = Math.min(rawMs, maxSec * unitMs);

        this.retryState.isRetrying = true;
        this.retryState.nextRetryTime = new Date(Date.now() + retryIntervalMs);

        const downForMs = Date.now() - this.retryState.firstFailureTime.getTime();
        this.warn(
            `scheduled retry #${attempts} in ${(retryIntervalMs / unitMs).toFixed(2)}s ` +
                `(down for ${(downForMs / unitMs).toFixed(1)}s, target=${this.targetHost.serverId})`,
        );

        this.retryState.retryTimer = setTimeout(() => {
            //! clear re-entry guard before the attempt so that if it fails again,
            //! scheduleRetry() can schedule retry #N+1 instead of silently no-op'ing
            this.retryState.isRetrying = false;
            this.retryState.retryTimer = undefined;
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

        if (this.retryState.attempts > 0 && this.retryState.firstFailureTime) {
            const downForMs = Date.now() - this.retryState.firstFailureTime.getTime();
            this.progress(
                `recovered after ${this.retryState.attempts} attempt(s) / ${(downForMs / 1000).toFixed(1)}s`,
            );
        }

        this.retryState.isRetrying = false;
        this.retryState.nextRetryTime = undefined;
        this.retryState.attempts = 0;
        this.retryState.firstFailureTime = undefined;
    }

    private async findCommonChannels(
        forceFreshen: "forceFreshen" | false = false,
    ): Promise<string[]> {
        // Trigger channel discovery if not already done
        if (forceFreshen || !this.repClient!.channels || this.repClient!.channels.length === 0) {
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
        // Skip ALL meta channels (those starting with _)
        const commonChannels = targetChannels.filter(
            (channel) => homeChannels.includes(channel) && !channel.startsWith("_"),
        );

        // Note: We do NOT add _chans here. It will be subscribed to separately
        // because DredClient automatically subscribes to _chans with its own handler.
        // We'll override that handler in subscribeToCommonChannels().

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

        this.log(`🎯 Subscribing to ${channels.length} channels`);
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
            //! Race-test chokepoint: tests may pause here to simulate network
            //  delay between A→B delivery and B's first processing step.
            //  Label includes the receiving home and the sending target so
            //  tests can stagger A→B vs A→C independently.
            await this.homeServer.testGate?.waitAt(
                `${this.homeServer.serverId}:replicant:${this.targetHost.serverId}:inbound`,
            );
            this.trace(`received message`, { channel, mid, ocid });
            const messageId = ocid || mid || `${Date.now()}-${Math.random()}`;

            // Skip messages without ocid - they can't be properly deduplicated
            if (!ocid) {
                this.debug(`Skipping message without ocid`, messageId);
                return;
            }

            // Loop prevention:
            //   * If this message originated here, ignore it — we already have it.
            //   * Otherwise, rely on knownMessages dedup inside addMessage()
            //     to catch any further duplicates that arrive via cross-server
            //     paths. This lets ring topologies work (A→B→C→D, no direct
            //     A↔D edge) while still preventing infinite forwarding: every
            //     cycle eventually visits a server that already has the
            //     message, where ensureMessageProcessedOnce drops it.
            if (inboundMessage.origSrvId === this.homeServer.serverId) {
                this.debug(`Skipping message originating from here: %s`, messageId);
                return;
            }

            if (!(await this.weHaveChannel(channel, messageId))) {
                this.warn("dropping message for non-existent channel: %o", { channel, messageId });
                this.warn(
                    `TODO: !!! check for a race involving a new channel; ensure we aren't dropping messages`,
                );
                return;
            }

            const { msg, type, "content-type": contentType, encryptedMsg } = inboundMessage;

            //! preserve the true origin when the message has already hopped: if the inbound
            //! message carries an origSrvId from an upstream hop, keep it. In the 1-hop case
            //! origSrvId would equal replFrom (our target), so omit it — replFrom carries that
            //! information by itself.
            const upstreamOrigin = inboundMessage.origSrvId;
            const carryOrigin =
                upstreamOrigin && upstreamOrigin !== this.targetHost.serverId
                    ? { origSrvId: upstreamOrigin }
                    : {};

            const replicatedMessage: DredMessage & ReplicatedMessage = {
                msg,
                type,
                "content-type": contentType,
                ocid: ocid,
                encryptedMsg,

                replFrom: this.targetHost.serverId,
                replAt: new Date().getTime(),
                ...carryOrigin,
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
        // Check if channel still exists on home server.
        //
        // homeServer.channelList can be disconnected or null'd if the home
        // server is mid-teardown while this replicator callback fires from
        // a still-open subscription. Treat any rejection as "channel not
        // available" so the caller skips the message instead of propagating
        // a TypeError to the EventEmitter that invoked us.
        let channelExists: boolean;
        try {
            channelExists = await this.homeServer.channelList.has(channelId);
        } catch (err: any) {
            this.debug(
                `weHaveChannel: home server state unavailable for ${channelId}; skipping`,
                err?.message || err,
            );
            return false;
        }

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

    private async addMessage(
        channelId: string,
        mid: string,
        messageDetails: DredMessage & ReplicatedMessage,
    ): Promise<void> {
        try {
            const { ocid } = messageDetails;
            // this.warn(`📤 REPLICATION: Publishing to home server '${this.homeServer.serverId}' in channel '${channelId}' (ocid: ${messageDetails.ocid})`);

            // Use the DredServer's deduplication system to prevent duplicate messages
            const result = await this.homeServer.ensureMessageProcessedOnce(
                channelId,
                ocid!,
                messageDetails.msg,
                messageDetails,
            );

            if (result) {
                this.logger.trace(`Message added to local server: ${result} (ocid ${ocid}, channel ${channelId})`);
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
    private channelWasAdded(message: eventChannelInfo): void {
        try {
            const {
                nbh,
                options,
                options: { channelId },
            } = message;

            this.progress(`📢 Channel creation detected: %s`, channelId);

            // Skip meta channels (they start with _)
            if (channelId.startsWith("_")) {
                this.debug(`Skipping meta channel: %s`, channelId);
                return;
            }

            //! dedup is handled inside replicateNewChannel against the home
            //! server's channelList. Do NOT guard here against repClient.channels
            //! (that list is the *target* peer's channels — gating on it would
            //! skip exactly the channels we need to create locally).
            this.replicateNewChannel(channelId, options).catch((error) => {
                this.warn(`Error handling channel addition: ${error}`);
            });
        } catch (error) {
            //eslint-disable-next-line no-debugger
            debugger; 
            this.warn(`Error handling channel event: ${error}`);
        }
    }

    /**
     * Handle a new channel being added on the target server
     */
    private async replicateNewChannel(channelName: string, options: any): Promise<void> {
        try {
            // Check if home server already has this channel
            const hasChannel = await this.homeServer.channelList.has(channelName);

            if (hasChannel) {
                this.debug(`Channel %s already exists on home server`, channelName);
                return;
            }

            this.log(`🆕 Creating channel %s on home server`, channelName);

            //! mirror createChannelHandler ordering: options → list → announce,
            //! so anything reading channelList can already fetch options, and
            //! local _chans subscribers see the same chanCreated shape the
            //! target peer emitted (options object passed through verbatim).
            await this.homeServer.setChanOptions(channelName, options);
            await this.homeServer.channelList.set(channelName, "1");
            await this.homeServer.channelCreated(channelName, options);

            const commonChannels = await this.findCommonChannels("forceFreshen");
            await this.subscribeToCommonChannels(commonChannels);

            this.log(`✅ Channel created; will replicate: %s`, channelName);
        } catch (error: any) {
            this.logger.error(
                `Failed handling new channel '%s': %s`,
                channelName,
                (error as Error).message,
            );
        }
    }

    /**
     * Clean up replicant resources following ownership pattern.
     * TestServer owns client lifecycle, so we just nullify our reference.
     */
    async cleanup(): Promise<void> {
        this.trace(`cleaning up replicant`);
        //! set disposed FIRST so any reconnect path that fires during the
        //  disconnect below (e.g. the .once("disconnected") listener on the
        //  connManager) sees disposed=true and early-returns instead of
        //  scheduling a fresh retry after we've cleared state.
        this.disposed = true;

        // Clear any pending retry timers
        if (this.retryState.retryTimer) {
            clearTimeout(this.retryState.retryTimer);
            this.retryState.retryTimer = undefined;
            this.debug(`cleared retry timer`);
        }

        // Reset retry state
        this.retryState.isRetrying = false;
        this.retryState.nextRetryTime = undefined;
        this.retryState.attempts = 0;
        this.retryState.firstFailureTime = undefined;

        if (this.repClient) {
            this.repClient.events.removeAllListeners();
            this.repClient.disconnect();

            // Doesn't try to clear subscriptions - DredClient subscription setter is incomplete
            // Just nullify our reference and let testServer handle full client disconnect
            this.repClient = null;
        }

        this.progress(`cleanup complete`);
    }
}
