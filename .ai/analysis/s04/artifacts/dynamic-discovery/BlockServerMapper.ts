/**
 * BlockServerMapper - Blockchain to Server Mapping
 * 
 * This class maps blockchain node registry data to DRED server host details.
 * It provides a bridge between the on-chain node registry and the DRED discovery system.
 * 
 * Implementation Notes:
 * - Uses hardcoded mapping for initial implementation (as requested)
 * - Provides validation and error handling for blockchain data
 * - Supports future enhancement to dynamic mapping
 * - Designed for integration with BlockchainHostDiscovery
 */

// ========================================
// TYPE DEFINITIONS (would be imported in actual implementation)
// ========================================

// From src/types/DredHosts.ts
interface DredHostDetails {
    serverId: string;
    address: string;
    port: number | string;
    insecure?: boolean;
    family?: any;
    publicKey?: string;
}

// Blockchain node data structure (based on DredCapoTestHelper pattern)
interface BlockchainNodeData {
    id: string;
    nodeId?: string;
    networkAddress?: string;
    networkPort?: number;
    publicKey?: string;
    status?: string;
    metadata?: any;
}

// ========================================
// BLOCK SERVER MAPPER IMPLEMENTATION
// ========================================

export class BlockServerMapper {
    /**
     * HARDCODED MAPPING - Initial Implementation
     * 
     * Maps blockchain node IDs to actual server details.
     * This allows us to control which blockchain nodes correspond to which physical servers.
     */
    private static readonly SERVER_MAPPING: Record<string, DredHostDetails> = {
        // Production servers
        "blockchain-node-1": {
            serverId: "prod-server-1",
            address: "dred1.production.com",
            port: 443,
            insecure: false,
            publicKey: "prod1_public_key_placeholder"
        },
        "blockchain-node-2": {
            serverId: "prod-server-2", 
            address: "dred2.production.com",
            port: 443,
            insecure: false,
            publicKey: "prod2_public_key_placeholder"
        },
        "blockchain-node-3": {
            serverId: "prod-server-3",
            address: "dred3.production.com", 
            port: 443,
            insecure: false,
            publicKey: "prod3_public_key_placeholder"
        },

        // Test/staging servers
        "test-node-uk": {
            serverId: "uk-test-server",
            address: "217.154.34.155",
            port: 3029,
            insecure: true // Test server uses HTTP
        },
        "test-node-de": {
            serverId: "de-test-server",
            address: "85.215.215.192",
            port: 3029,
            insecure: true
        },
        "test-node-us": {
            serverId: "us-test-server",
            address: "74.208.13.84",
            port: 3029,
            insecure: true
        },

        // Development servers
        "dev-node-1": {
            serverId: "dev-server-1",
            address: "localhost",
            port: 3001,
            insecure: true
        },
        "dev-node-2": {
            serverId: "dev-server-2",
            address: "localhost",
            port: 3002,
            insecure: true
        },
        "dev-node-3": {
            serverId: "dev-server-3",
            address: "localhost",
            port: 3003,
            insecure: true
        }
    };

    /**
     * MAP BLOCKCHAIN DATA TO HOSTS
     * 
     * Main method to convert blockchain node registry data to DRED host details.
     * Filters out unknown/unmapped nodes and validates the results.
     * 
     * @param blockchainNodes - Array of blockchain node data from registry
     * @returns Array of mapped DRED host details
     */
    static mapBlockchainDataToHosts(blockchainNodes: BlockchainNodeData[]): DredHostDetails[] {
        if (!Array.isArray(blockchainNodes)) {
            console.warn("[BlockServerMapper] Invalid blockchain nodes data - not an array");
            return [];
        }

        const mappedHosts: DredHostDetails[] = [];
        const unmappedNodes: string[] = [];

        for (const node of blockchainNodes) {
            if (!node || typeof node !== 'object') {
                console.warn("[BlockServerMapper] Skipping invalid node data:", node);
                continue;
            }

            const nodeId = node.id || node.nodeId;
            if (!nodeId) {
                console.warn("[BlockServerMapper] Skipping node without ID:", node);
                continue;
            }

            const mappedHost = this.SERVER_MAPPING[nodeId];
            if (mappedHost) {
                // Create a copy with any additional blockchain data
                const hostDetails: DredHostDetails = {
                    ...mappedHost,
                    // Override with blockchain data if available
                    ...(node.networkAddress && { address: node.networkAddress }),
                    ...(node.networkPort && { port: node.networkPort }),
                    ...(node.publicKey && { publicKey: node.publicKey })
                };

                mappedHosts.push(hostDetails);
            } else {
                unmappedNodes.push(nodeId);
            }
        }

        // Log unmapped nodes for debugging
        if (unmappedNodes.length > 0) {
            console.warn(`[BlockServerMapper] Unmapped blockchain nodes: ${unmappedNodes.join(', ')}`);
            console.warn("[BlockServerMapper] Available mappings:", Object.keys(this.SERVER_MAPPING));
        }

        console.log(`[BlockServerMapper] Mapped ${mappedHosts.length}/${blockchainNodes.length} blockchain nodes to hosts`);
        return mappedHosts;
    }

    /**
     * GET AVAILABLE MAPPINGS
     * 
     * Returns the list of blockchain node IDs that have server mappings.
     * Useful for debugging and validation.
     */
    static getAvailableMappings(): string[] {
        return Object.keys(this.SERVER_MAPPING);
    }

    /**
     * HAS MAPPING
     * 
     * Check if a specific blockchain node ID has a server mapping.
     */
    static hasMapping(blockchainNodeId: string): boolean {
        return blockchainNodeId in this.SERVER_MAPPING;
    }

    /**
     * GET MAPPING
     * 
     * Get the server details for a specific blockchain node ID.
     * Returns undefined if no mapping exists.
     */
    static getMapping(blockchainNodeId: string): DredHostDetails | undefined {
        return this.SERVER_MAPPING[blockchainNodeId];
    }

    /**
     * ADD MAPPING
     * 
     * Dynamically add a new blockchain node to server mapping.
     * Useful for testing and development.
     */
    static addMapping(blockchainNodeId: string, hostDetails: DredHostDetails): void {
        this.SERVER_MAPPING[blockchainNodeId] = { ...hostDetails };
        console.log(`[BlockServerMapper] Added mapping: ${blockchainNodeId} -> ${hostDetails.serverId}`);
    }

    /**
     * REMOVE MAPPING
     * 
     * Remove a blockchain node to server mapping.
     */
    static removeMapping(blockchainNodeId: string): boolean {
        if (blockchainNodeId in this.SERVER_MAPPING) {
            delete this.SERVER_MAPPING[blockchainNodeId];
            console.log(`[BlockServerMapper] Removed mapping: ${blockchainNodeId}`);
            return true;
        }
        return false;
    }

    /**
     * VALIDATE BLOCKCHAIN DATA
     * 
     * Validates that blockchain node data has the expected structure.
     * Used for defensive programming and debugging.
     */
    static validateBlockchainData(blockchainNodes: any[]): {
        valid: BlockchainNodeData[];
        invalid: any[];
        errors: string[];
    } {
        const valid: BlockchainNodeData[] = [];
        const invalid: any[] = [];
        const errors: string[] = [];

        for (const [index, node] of blockchainNodes.entries()) {
            if (!node || typeof node !== 'object') {
                invalid.push(node);
                errors.push(`Node ${index}: Not an object`);
                continue;
            }

            const nodeId = node.id || node.nodeId;
            if (!nodeId || typeof nodeId !== 'string') {
                invalid.push(node);
                errors.push(`Node ${index}: Missing or invalid ID`);
                continue;
            }

            // Optional validations
            if (node.networkAddress && typeof node.networkAddress !== 'string') {
                errors.push(`Node ${index}: Invalid networkAddress type`);
            }

            if (node.networkPort && (typeof node.networkPort !== 'number' || node.networkPort <= 0)) {
                errors.push(`Node ${index}: Invalid networkPort`);
            }

            valid.push(node as BlockchainNodeData);
        }

        return { valid, invalid, errors };
    }

    /**
     * FILTER BY STATUS
     * 
     * Filter blockchain nodes by their status (e.g., "active", "inactive").
     * Only returns nodes with the specified status.
     */
    static filterByStatus(blockchainNodes: BlockchainNodeData[], status: string = "active"): BlockchainNodeData[] {
        return blockchainNodes.filter(node => 
            node.status === status || (!node.status && status === "active") // Default to active if no status
        );
    }

    /**
     * GET MAPPING STATISTICS
     * 
     * Provides statistics about the current mapping configuration.
     * Useful for monitoring and debugging.
     */
    static getMappingStatistics(): {
        totalMappings: number;
        productionServers: number;
        testServers: number;
        developmentServers: number;
        secureServers: number;
        insecureServers: number;
    } {
        const mappings = Object.values(this.SERVER_MAPPING);
        
        return {
            totalMappings: mappings.length,
            productionServers: mappings.filter(h => h.serverId.includes("prod")).length,
            testServers: mappings.filter(h => h.serverId.includes("test")).length,
            developmentServers: mappings.filter(h => h.serverId.includes("dev")).length,
            secureServers: mappings.filter(h => !h.insecure).length,
            insecureServers: mappings.filter(h => h.insecure).length
        };
    }

    /**
     * GENERATE EXAMPLE BLOCKCHAIN DATA
     * 
     * Generates example blockchain data for testing purposes.
     * Uses the available mappings to create realistic test data.
     */
    static generateExampleBlockchainData(): BlockchainNodeData[] {
        return Object.keys(this.SERVER_MAPPING).map(nodeId => ({
            id: nodeId,
            nodeId: nodeId,
            status: "active",
            networkAddress: this.SERVER_MAPPING[nodeId].address,
            networkPort: parseInt(String(this.SERVER_MAPPING[nodeId].port)),
            publicKey: this.SERVER_MAPPING[nodeId].publicKey,
            metadata: {
                lastSeen: new Date().toISOString(),
                version: "1.0.0"
            }
        }));
    }
}

// ========================================
// USAGE EXAMPLES
// ========================================

/**
 * Example usage of BlockServerMapper:
 * 
 * ```typescript
 * // Basic usage with blockchain registry data
 * const registryDgt = await capo.getNodeRegistryController();
 * const blockchainNodes = await registryDgt.findRecords();
 * const hosts = BlockServerMapper.mapBlockchainDataToHosts(blockchainNodes);
 * 
 * // Filter by active nodes only
 * const activeNodes = BlockServerMapper.filterByStatus(blockchainNodes, "active");
 * const activeHosts = BlockServerMapper.mapBlockchainDataToHosts(activeNodes);
 * 
 * // Validate blockchain data
 * const validation = BlockServerMapper.validateBlockchainData(blockchainNodes);
 * if (validation.errors.length > 0) {
 *     console.warn("Blockchain data validation errors:", validation.errors);
 * }
 * 
 * // Check available mappings
 * const availableMappings = BlockServerMapper.getAvailableMappings();
 * console.log("Available node mappings:", availableMappings);
 * 
 * // Add custom mapping for testing
 * BlockServerMapper.addMapping("test-node-local", {
 *     serverId: "local-test",
 *     address: "127.0.0.1",
 *     port: 3000,
 *     insecure: true
 * });
 * 
 * // Get mapping statistics
 * const stats = BlockServerMapper.getMappingStatistics();
 * console.log("Mapping statistics:", stats);
 * ```
 */

// ========================================
// EXPORT FOR INTEGRATION
// ========================================

export default BlockServerMapper; 