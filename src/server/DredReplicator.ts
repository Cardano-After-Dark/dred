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

import { DredClient } from "../client/DredClient.js";
import { Discovery } from "../types/Discovery.js";
import { DredServer } from "./DredServer.js";
import { type DredHostDetails } from "../types/DredHosts.js";
import { zonedLogger } from "@poshplum/utils";

import {colors} from "../picocolors/picocolors.js";
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
    magentaBright
} = colors;

const rlog = zonedLogger("replicator", {
    color: yellow.start, levels: {default: "info"}
});

export class DredReplicator{

    private static _logHeader = "[REPLicator]";
    private name: string;
    private readonly homeServer: DredServer;
    private readonly discovery: Discovery;
    // Track replicants for cleanup
    private replicants: Replicant[] = [];
    private initialized: boolean = false;

    isInitialized(): boolean {
        return this.initialized;
    }

    log(message: string, ...args: any[]) {
        this.homeServer.log(`${DredReplicator._logHeader} ${message}`, ...args);
    }

    warn(message: string, ...args: any[]) {
        this.homeServer.warn(`${DredReplicator._logHeader} ${message}`, ...args);
    }
    
    constructor(homeServer: DredServer, discovery: Discovery) {
        this.name = `DredReplicator-[${homeServer.serverId}]`;
        
        rlog.debug(`DredReplicator constructor: [${this.name}]`);
        this.homeServer = homeServer;
        this.discovery = discovery;

        // this could be an alternative to the map
        //this.homeServer.redis?.duplicate()
    }

    async initialize() {
        if(this.initialized) {
            this.warn(`${this.name} already initialized`);
            return;
        }
        this.initialized = true;
        this.log(`${this.name} initializing`);

        
        // NOTE: the discovery is already filtering by neighborhood
        const hosts = await this.discovery.getHostList();
        const otherHosts = hosts.filter((host) => host.serverId !== this.homeServer.serverId);
        for (const host of otherHosts) {
            // handle replication from a single target server to the home server
            const repClient = new Replicant(this, this.homeServer, host);
            await repClient.initialize();
            // Store replicant for cleanup
            this.replicants.push(repClient);
        }

        this.log(`${this.name} initialized`);
    }

    async cleanup() {
        if(!this.initialized) {
            this.warn(`${this.name} not initialized`);
            return;
        }
        
        this.warn(`Cleaning up ${this.name} with ${this.replicants.length} replicants`);
        
        // Clean up all replicants - wait for all but continue on errors
        const results = await Promise.allSettled(
            this.replicants.map((replicant, index) => {
                this.warn(`${this.name} cleaning up replicant ${index}`);
                return replicant.cleanup();
            })
        );
        
        // Log any failures but don't throw
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                this.warn(`${this.name} Error cleaning up replicant ${index}: ${result.reason}`);
            } else {
                this.warn(`${this.name} Successfully cleaned up replicant ${index}`);
            }
        });
        
        this.replicants = [];
        this.initialized = false;
        this.warn(`${this.name} cleanup complete`);
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
 * Replicant is a class that handles replication to a single target server.
 * It is responsible for:
 *  - subscribing to all channels in the target server which are also in the home server
 *  - replicating the messages from the target server to the home server, while preventing duplicates
 *  - listening to the home server for new channels
 */
export class Replicant{

    private static _logHeader = "[REPLicant]";
    private replicator: DredReplicator;
    private homeServer: DredServer;
    private targetHost: DredHostDetails;
    private name: string;
    private repClient: DredClient | null;

    log(message: string, ...args: any[]) {
        this.homeServer.log(`${Replicant._logHeader} ${message}`, ...args);
    }

    warn(message: string, ...args: any[]) {
        this.homeServer.warn(`${Replicant._logHeader} ${message}`, ...args);
    }

    constructor(replicator: DredReplicator, homeServer: DredServer, targetHost: DredHostDetails) {
        this.replicator = replicator;
        this.homeServer = homeServer;
        this.targetHost = targetHost;
        this.name = `Replicant-[${homeServer.serverId}]-[${targetHost.serverId}]`;
        this.repClient = null;
        this.log(`constructor: ${this.name}`);
    }

    async initialize() {
        this.log(`${this.name} initializing`);
        if(this.repClient !== null) {
            this.warn(`${this.name} already initialized`);
            return;
        }
        
        this.log(`${this.name} starting initialization`);
        
        // creates a new DredClient
        this.repClient = this.homeServer.mkClient(this.targetHost.serverId, {name: `from-${this.homeServer.serverId}-to-${this.targetHost.serverId}`}, false); // false = not server managed
        await this.repClient.generateKey();

        /** FIXME: we cannot set the neighborhood here, yet
         * TODO: when neighborhood fixed, fix this
        // this.log(`${this.name} client created, setting neighborhood to: '${this.homeServer.nbh}'`);
        // Set the same neighborhood as the home server
        //this.repClient.setNeighborhood(this.homeServer.nbh);
        // this.log(`${this.name} neighborhood set, client state: '${this.repClient.currentState}'`);
        */

        // Wait for client to reach ready state and discover channels
        // do not enable this otherwise we will wait forever
        // await this.waitForClientReady();

        this.log(`${this.name} client ready (I guess)`);

        // Get channels from both servers and find intersection
        const commonChannels = await this.findCommonChannels();

        this.log(`${this.name} common channels: ${commonChannels.join(', ')}`);

        // eslint-disable-next-line no-debugger
        //debugger

        // Subscribe to common channels with replication handlers
        await this.subscribeToCommonChannels(commonChannels);

        this.log(`${this.name} initialization complete`);

        // this.targetHost.

        // TODO: subscribe to all channels in the target server which are also in the home server
        // TODO: replicate the messages to the home server
        // TODO: listen to the home server for new channels
        // TODO: replicate the messages to the target server
        

        // TODO: implement initialization logic
        // 1. subscribe to all channels in the target server which are also in the home server
        // 2. replicate the messages to the home server
        // 3. listen to the home server for new channels
        // 4. replicate the messages to the target server
    }

    private async findCommonChannels(): Promise<string[]> {
        // Trigger channel discovery if not already done
        if (!this.repClient!.channels || this.repClient!.channels.length === 0) {
            this.log(`Triggering channel discovery for ${this.targetHost.serverId}`);
            this.repClient!.channels = await this.repClient!.connManager.getChannelList();
        }
        
        // Get channels from target server (via replication client)
        const targetChannels = this.repClient!.channels;
        this.log(`Target server ${this.targetHost.serverId} has channels: [${targetChannels.join(', ')}]`);
        
        // Get channels from home server
        const homeChannels = await this.homeServer.channelList.keys() as string[];
        this.log(`Home server has channels: [${homeChannels.join(', ')}]`);
        
        // Find intersection (channels that exist on both servers)
        const commonChannels = targetChannels.filter(channel => 
            homeChannels.includes(channel) && 
            !channel.startsWith('_') // Skip meta channels for now
        );
        
        return commonChannels;
    }

    private async subscribeToCommonChannels(channels: string[]): Promise<void> {

        
        await new Promise(resolve => setTimeout(resolve, 100));

        // Connection state check
        this.log(`Connection states:
          - RepClient: ${this.repClient!.currentState}
          - ConnManager: ${this.repClient!.connManager.currentState}
          - Waiting for connection...
          - After wait - RepClient: ${this.repClient!.currentState}, ConnManager: ${this.repClient!.connManager.currentState}`);
        
        // Create subscription map with replication handlers
        const subscriptionMap: Record<string, (msg: any) => void> = {};
        
        for (const channel of channels) {
            subscriptionMap[channel] = (message) => {
                this.warn(`📥 REPLICATION: Message detected from ${this.targetHost.serverId} in channel '${channel}' (${message.mid})`);
                const{connection, ...core}=message;
                this.log(`🎯 REPL MESSAGE from ${this.targetHost.serverId}:`, core);
                this.handleIncomingMessage(channel, message);
            };
        }
        
        this.warn(`🔔 REPLICATION: Subscribing to ${channels.length} channels on target server ${this.targetHost.serverId}...`);

        await this.repClient!.subscribeToChannels(subscriptionMap);

        this.warn(`✅ Successfully subscribed to ${channels.length} channels on target server ${this.targetHost.serverId}`);
    }

    /**
     * Handle incoming message from target server to this client attached to the home server
     * @param channelId 
     * @param message 
     * @returns 
     */
    private async handleIncomingMessage(channelId: string, message: any): Promise<void> {
        try {
            // eslint-disable-next-line no-debugger
            debugger

            const sourceId = this.targetHost.serverId;
            
            // Message received from target server 
            this.warn(`📥 REPLICATION: Received message from ${this.targetHost.serverId} -> ${this.homeServer.serverId} in channel '${channelId}' (${message.mid})`);
            
            // Extract message details for replication
            const messageId = message.mid || message.id || `${Date.now()}-${Math.random()}`;
            const ocid = message.ocid;
            
            // Skip messages without ocid - they can't be properly deduplicated
            if (!ocid) {
                this.log(`Skipping message without ocid from ${this.targetHost.serverId} (messageId: ${messageId})`);
                return;
            }

            
            
            // CRITICAL: Prevent replication loops
            // Check if this message already came from replication (has replication metadata)
            if (message.replicatedFrom && message.replicatedFrom !== undefined) {
                this.log(`Skipping message: already replicated (from ${message.replicatedFrom})`);
                return;
            }

            // Check if this message originated from the home server
            if (message.originalServerId === this.homeServer.serverId) {
                this.log(`Skipping message: originated from home server ${this.homeServer.serverId}`);
                return;
            }
            
            // Check if we should replicate this message
            this.log(` >>>>>>>>>>  about to call shouldReplicateMessage: ${channelId} ${messageId}`);
            if (!await this.shouldReplicateMessage(channelId, messageId)) {
                this.log(` >>>>>>>>>>  shouldReplicateMessage returned false`);
                return;
            }

            this.log(` >>>>>>>>>>  shouldReplicateMessage returned true`);

            // Prepare replicated message
            const replicatedMessage = {
                msg: message.msg || message.data,
                type: message.type || 'replicated',
                ocid: ocid,
                replicatedFrom: this.targetHost.serverId,
                replicatedAt: new Date().toISOString(),
                originalMessageId: messageId,
                originalServerId: this.targetHost.serverId,
            };
            
            // Replicate to home server
            await this.replicateToHomeServer(channelId, replicatedMessage);
            
            this.log(`Successfully replicated message from ${this.targetHost.serverId} to home server in channel ${channelId}`);
            
        } catch (error) {
            this.warn(`Error handling message from ${this.targetHost.serverId} in channel ${channelId}: ${error}`);
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
    private async shouldReplicateMessage(channelId: string, messageId: string): Promise<boolean> {
        this.log(` >>>>>>>>>>  shouldReplicateMessage: ${channelId} ${messageId}`);
        
        // Check if channel still exists on home server
        const channelExists = await this.homeServer.channelList.has(channelId);

        this.log(` >>>>>>>>>>  channelExists: ${channelExists} }`);

        // NOTE: we might have issues here, as we probably need to trigger the getChannelList() 
        // if, so, it is better to have a cache of channels and subscribe to the _chans channel
        // to be notified of new channels

        if (!channelExists) {
            this.log(`Channel ${channelId} no longer exists on home server, skipping replication`);
            return false;
        }
        
        // Check if message already processed not needed anymore, we use deduplication
        
        return true;
    }

    private async replicateToHomeServer(channelId: string, messageDetails: any): Promise<void> {
        try {
            this.warn(`📤 REPLICATION: Publishing to home server '${this.homeServer.serverId}' in channel '${channelId}' (ocid: ${messageDetails.ocid})`);
            
            // Use the DredServer's deduplication system to prevent duplicate messages
            const result = await this.homeServer.ensureMessageProcessedOnce(
                channelId,
                messageDetails.ocid,
                messageDetails.msg,
                messageDetails
            );
            
            if (result) {
                this.log(`Message successfully replicated to home server: ${result}`);
            } else {
                this.log(`Message was a duplicate, not replicated: ${messageDetails.ocid}`);
            }
            
        } catch (error) {
            this.warn(`Failed to replicate message to home server channel ${channelId}: ${error}`);
            throw error;
        }
    }

    // Unused, not needed but let's keep it here for now
    // private async waitForClientReady(): Promise<void> {
    //     return new Promise((resolve) => {
    //         if (this.repClient!.currentState === 'ready') {
    //             resolve();
    //             return;
    //         }
            
    //         this.repClient!.events.once('state:changed', (event) => {
    //             if (event.status === 'ready') {
    //                 resolve();
    //             }
    //         });
    //     });
    // }

    /**
     * Clean up replicant resources following ownership pattern.
     * TestServer owns client lifecycle, so we just nullify our reference.
     */
    async cleanup(): Promise<void> {
        this.warn(`${this.name} cleaning up`);
        
        if (this.repClient) {
            
            // TODO: check if the client is connected before trying to disconnect
            // this.repClient.disconnect();

            this.warn(`${this.name} nullifying client reference (testServer will also try to disconnect clients)`);
            // Don't try to clear subscriptions - DredClient subscription setter is incomplete
            // Just nullify our reference and let testServer handle full client disconnect
            this.repClient = null;
            this.warn(`${this.name} client reference nullified`);
        }
        
        this.warn(`${this.name} cleanup complete`);
    }
}