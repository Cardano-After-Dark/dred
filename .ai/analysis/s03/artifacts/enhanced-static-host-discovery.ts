// Enhanced StaticHostDiscovery with file-based configuration
// Location: src/peers/StaticHostDiscovery.ts (modifications)

import { readFileSync, existsSync } from "fs";
import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;

import { DredHostDetails } from "../types/DredHosts.js";
import { Discovery, GenericDiscoveryOptions, promisedConnectionThresholds } from "../types/Discovery.js";
import { StringNacl } from "../util/StringNacl.js";
import { NbhId } from "../types/ChannelSubscriptions.js";
import { asyncDelay } from "@poshplum/utils";

const localNbh = "localhost-nbh";

interface DevDiscoveryOptions extends GenericDiscoveryOptions {
    hosts?: DredHostDetails[];
    configFile?: string; // NEW: Path to configuration file
}

interface DiscoveryConfig {
    neighborhood: string;
    servers: DredHostDetails[];
}

export class StaticHostDiscovery extends Discovery {
    hosts: DredHostDetails[];
    private configFile?: string; // NEW: Store config file path

    async getNeighborhoods() {
        await asyncDelay(1);
        return [localNbh, this.nbh].filter(Boolean);
    }

    /**
     * overrides the base class to prevent triggering unneeded re-discovery of static hosts
     */
    setNeighborhood(nbh: NbhId) {
        this.nbh = nbh;
        return this;
    }

    // NEW: Load configuration from file
    private loadConfigFromFile(): DiscoveryConfig | null {
        if (!this.configFile) return null;
        
        try {
            if (!existsSync(this.configFile)) {
                this.logger.warn(`Discovery config file not found: ${this.configFile}`);
                return null;
            }

            const configData = readFileSync(this.configFile, 'utf8');
            const config: DiscoveryConfig = JSON.parse(configData);
            
            this.logger.info(`Loaded discovery config from ${this.configFile}: ${config.servers.length} servers`);
            return config;
        } catch (error) {
            this.logger.error(`Failed to load discovery config from ${this.configFile}:`, error);
            return null;
        }
    }

    // NEW: Get configuration file path from environment or parameter
    private static getConfigFilePath(options: DevDiscoveryOptions): string | undefined {
        // Priority: options.configFile > environment variable > undefined
        return options.configFile || process.env.DRED_DISCOVERY_CONFIG;
    }

    static defaultHosts(): DredHostDetails[] {
        // Read host and port from environment variables for production deployment
        const host = process.env.DRED_HOST || "127.0.0.1";
        const port = parseInt(process.env.DRED_PORT || "3029");
        
        return [{
            serverId: "singleton",
            address: host,
            port: port,
            insecure: true,            
        }]
    }

    // ENHANCED: Setup hosts from config file or defaults
    setupDefaultHosts() {
        const config = this.loadConfigFromFile();
        
        if (config) {
            // Use hosts from configuration file
            this.logger.info(`Using ${config.servers.length} hosts from config file`);
            if (config.neighborhood && config.neighborhood !== this.nbh) {
                this.logger.info(`Setting neighborhood from config: ${config.neighborhood}`);
                this.nbh = config.neighborhood;
            }
            return this.reset(config.servers);
        } else {
            // Fall back to default localhost hosts
            this.logger.info(`Using default localhost hosts (no config file)`);
            return this.reset((this.constructor as typeof StaticHostDiscovery).defaultHosts());
        }
    }

    constructor(options: DevDiscoveryOptions) {
        const { neighborhood, hosts } = options;
        super({ neighborhood: neighborhood || localNbh });
        
        // NEW: Store config file path
        this.configFile = StaticHostDiscovery.getConfigFilePath(options);
        
        if (this.configFile) {
            this.logger.info(`StaticHostDiscovery will use config file: ${this.configFile}`);
        }
        
        this.hosts = hosts || []; // Will be loaded in setupDefaultHosts()
    }

    async initHostDiscovery() {
        this.setupDefaultHosts();
    }

    // NEW: Reload configuration from file
    async reloadConfig(): Promise<boolean> {
        if (!this.configFile) {
            this.logger.warn("No config file specified for reload");
            return false;
        }

        const config = this.loadConfigFromFile();
        if (config) {
            this.logger.info(`Reloaded discovery config: ${config.servers.length} servers`);
            this.hosts = config.servers;
            if (config.neighborhood && config.neighborhood !== this.nbh) {
                this.nbh = config.neighborhood;
            }
            return true;
        }
        return false;
    }

    toJSON() {
        return { 
            configFile: this.configFile,
            hosts: this.hosts,
            neighborhood: this.nbh
        };
    }

    async getHostList() {
        if (!this.hosts || this.hosts.length === 0) {
            // Try to load from config if hosts not set
            this.setupDefaultHosts();
        }
        
        if (!this.hosts || this.hosts.length === 0) {
            throw new Error(`No hosts available. Check config file: ${this.configFile}`);
        }
        
        await asyncDelay(1);
        return this.hosts;
    }

    async getConnectionThresholds(): promisedConnectionThresholds {
        if (!this.hosts) { throw new Error(`no this.hosts`) }

        if (this.hosts.length > 2) {
            return {minimal:2, healthy: 3}
        }
        if (this.hosts.length > 1) {
            return {minimal:1, healthy: 2}
        }
        return {minimal: 1, healthy: 1}
    }
} 