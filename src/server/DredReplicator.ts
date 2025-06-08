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
import { DredHostDetails } from "../types/DredHosts.js";

export class DredReplicator{

    private static _logHeader = "[REPLicator]";
    private name: string;
    private readonly homeServer: DredServer;
    private readonly discovery: Discovery;
    private mapChOcid: Map<string, Set<string>> = new Map(); // channelId -> Set<ocid>
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
        console.log(`constructor: [${this.name}]`);
        this.homeServer = homeServer;
        this.discovery = discovery;
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
            const repClient = new Replicant(this.homeServer, host);
            await repClient.initialize();
        }

        this.log(`${this.name} initialized`);
    }

    async cleanup() {
        if(!this.initialized) {
            this.warn(`${this.name} not initialized`);
            return;
        }
        this.log(`Cleaning up ${this.name}`);
    }
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

    constructor(homeServer: DredServer, targetHost: DredHostDetails) {
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
        this.repClient = this.homeServer.mkClient(this.targetHost.serverId);
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

    private async subscribeToCommonChannels(channels: string[]): Promise<void> {
        // Create subscription map with replication handlers
        // Add debug logging to see the neighborhood context
        this.log(`Replication client neighborhood: '${this.repClient!.neighborhoodId}'`);
        this.log(`Replication client current state: '${this.repClient!.currentState}'`);
        
        // eslint-disable-next-line no-debugger
        debugger
        // Use EXACTLY the same pattern as the working test
        const subscriptionMap: Record<string, (msg: any) => void> = {};
        
        for (const channel of channels) {
            subscriptionMap[channel] = async (message) => {
                this.log(`Received message from ${this.targetHost.serverId} in channel ${channel}: ${message.mid || 'no-mid'}`);
                console.log(`[REPL] ${this.targetHost.serverId} -> ${this.homeServer.serverId}:`, message);
                // Handle async processing without blocking - same as working test
                await this.handleIncomingMessage(channel, message).catch(error => {
                    this.warn(`Error handling message: ${error}`);
                });
            };
        }
        
        this.log(`About to subscribe to channels: [${channels.join(', ')}]`);
        
        // Use the exact same call pattern as working clients
        await this.repClient!.subscribeToChannels(subscriptionMap);
        
        this.log(`Successfully subscribed to ${channels.length} channels on target server ${this.targetHost.serverId}`);
    }

    private async handleIncomingMessage(channelId: string, message: any): Promise<void> {
        try {
            // eslint-disable-next-line no-debugger
            debugger
            // this debug statement is triggered when the message is received from the target server

            this.log(`Received message from ${this.targetHost.serverId} in channel ${channelId}: ${message.mid || 'no-mid'}`);
            
            // Extract message details for replication
            const messageId = message.mid || message.id || `${Date.now()}-${Math.random()}`;
            const ocid = message.ocid || `repl-${messageId}`;
            
            // Prevent replication loops
            if (message.replicatedFrom === this.homeServer.serverId) {
                this.log(`Skipping message: originated from home server`);
                return;
            }
            
            // Check if we should replicate this message
            if (!await this.shouldReplicateMessage(channelId, messageId)) {
                return;
            }
            
            // Prepare replicated message
            const replicatedMessage = {
                msg: message.msg || message.data,
                type: message.type || 'replicated',
                ocid: ocid,
                replicatedFrom: this.targetHost.serverId,
                replicatedAt: new Date().toISOString(),
                originalMessageId: messageId
            };
            
            // Replicate to home server
            await this.replicateToHomeServer(channelId, replicatedMessage);
            
            this.log(`Successfully replicated message from ${this.targetHost.serverId} to home server in channel ${channelId}`);
            
        } catch (error) {
            this.warn(`Error handling message from ${this.targetHost.serverId} in channel ${channelId}: ${error}`);
        }
    }

    private async shouldReplicateMessage(channelId: string, messageId: string): Promise<boolean> {
        // Check if channel still exists on home server
        const channelExists = await this.homeServer.channelList.has(channelId);

        // NOTE: we might have issues here, as we probably need to trigger the getChannelList() 
        // if, so, it is better to have a cache of channels and subscribe to the _chans channel
        // to be notified of new channels

        if (!channelExists) {
            this.log(`Channel ${channelId} no longer exists on home server, skipping replication`);
            return false;
        }
        
        // TODO: Add deduplication logic here
        // You might want to track recent message IDs to prevent duplicates
        
        return true;
    }

    private async replicateToHomeServer(channelId: string, messageDetails: any): Promise<void> {
        try {
            // Get channel producer for home server
            const producer = await this.homeServer.mkChannelProducer(channelId);
            
            // Produce the replicated message on the home server
            await this.homeServer.channelConn.produce(producer, messageDetails.msg, messageDetails);
            
        } catch (error) {
            this.warn(`Failed to replicate message to home server channel ${channelId}: ${error}`);
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



    
}