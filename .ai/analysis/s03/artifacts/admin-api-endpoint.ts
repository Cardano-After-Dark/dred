// Admin API endpoint for discovery configuration
// Location: src/server/DredServer.ts (additions to setupExpressHandlers)

// Add these imports at the top of DredServer.ts
import { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";

// Add these methods to DredServer class:

/**
 * Admin API endpoint to reload discovery configuration
 * POST /admin/discovery/reload
 */
reloadDiscoveryConfig: express.RequestHandler = async (req, res, next) => {
    try {
        if (!(this.discovery instanceof StaticHostDiscovery)) {
            res.status(400).json({
                error: "Discovery reload only supported for StaticHostDiscovery"
            });
            return next();
        }

        const success = await this.discovery.reloadConfig();
        if (success) {
            this.log("Discovery configuration reloaded successfully");
            res.json({
                status: "reloaded",
                message: "Discovery configuration reloaded. Server restart recommended for full effect.",
                hosts: this.discovery.hosts
            });
        } else {
            res.status(400).json({
                error: "Failed to reload discovery configuration"
            });
        }
    } catch (error) {
        this.warn("Error reloading discovery config:", error);
        res.status(500).json({
            error: "Internal error reloading discovery configuration"
        });
    }
    next();
};

/**
 * Admin API endpoint to get current discovery status
 * GET /admin/discovery/status
 */
getDiscoveryStatus: express.RequestHandler = async (req, res, next) => {
    try {
        const hosts = await this.discovery.getHostList();
        res.json({
            discoveryType: this.discovery.constructor.name,
            neighborhood: this.discovery.nbh,
            hostsCount: hosts.length,
            hosts: hosts.map(h => ({
                serverId: h.serverId,
                address: h.address,
                port: h.port,
                insecure: h.insecure
            })),
            myServerId: this.serverId,
            myServerInfo: this.myServerInfo
        });
    } catch (error) {
        this.warn("Error getting discovery status:", error);
        res.status(500).json({
            error: "Failed to get discovery status"
        });
    }
    next();
};

// Add these routes in setupExpressHandlers() method:
setupExpressHandlers() {
    // ... existing handlers ...

    // Admin endpoints for discovery management
    this.api.get("/admin/discovery/status", (...args) => {
        this.getDiscoveryStatus(...args);
    });
    
    this.api.post("/admin/discovery/reload", (...args) => {
        this.reloadDiscoveryConfig(...args);
    });

    // ... rest of existing handlers ...
} 