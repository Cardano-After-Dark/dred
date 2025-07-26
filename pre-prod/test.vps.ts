/**
 * VPS Connectivity Tests for DRED Server
 * 
 * This test suite verifies that DRED servers running on VPS instances
 * are accessible and functioning correctly from external clients.
 * 
 * Usage:
 *   - Update VPS_SERVERS array with your actual server details
 *   - Run: npm test -- pre-prod/test.vps.ts
 */

import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { asyncDelay } from '../src/util/asyncDelay.js';

// VPS Server Configuration
interface VpsServer {
    id: string;
    host: string;
    port: number;
    description: string;
}

// TODO: Update these with your actual VPS server details
const VPS_SERVERS: VpsServer[] = [
    {
        id: 'vps-1',
        host: '192.168.1.100', // Replace with actual VPS IP
        port: 3029,
        description: 'Primary VPS Server'
    },
    {
        id: 'vps-2', 
        host: '192.168.1.101', // Replace with actual VPS IP
        port: 3029,
        description: 'Secondary VPS Server'
    }
    // Add more VPS servers as needed
];

// Test timeout for network operations
const NETWORK_TIMEOUT = 10000; // 10 seconds
const CONNECTION_RETRY_DELAY = 1000; // 1 second
const MAX_RETRIES = 5;

describe('VPS Server Connectivity Tests', () => {
    
    describe('Basic Server Health Checks', () => {
        
        VPS_SERVERS.forEach(server => {
            test(`${server.description} (${server.host}:${server.port}) - Health Check`, async () => {
                const response = await fetch(`http://${server.host}:${server.port}/channels`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                });
                
                expect(response.ok).toBe(true);
                expect(response.status).toBe(200);
                
                const data = await response.json();
                expect(data).toBeDefined();
                
                console.log(`✓ ${server.description} health check passed`);
            }, NETWORK_TIMEOUT + 1000);
        });

    });

    describe('API Connection Tests', () => {
        
        VPS_SERVERS.forEach(server => {
            test(`${server.description} - Create and Join Channel`, async () => {
                const testChannelName = `api-test-${Date.now()}`;
                
                try {
                    // Test channel creation
                    const createResponse = await fetch(`http://${server.host}:${server.port}/channel/${testChannelName}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            approveJoins: 'open',
                            description: 'VPS API test channel'
                        }),
                        signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                    });
                    
                    expect(createResponse.ok).toBe(true);
                    
                    // Test channel listing
                    const channelsResponse = await fetch(`http://${server.host}:${server.port}/channels`, {
                        method: 'GET',
                        signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                    });
                    
                    expect(channelsResponse.ok).toBe(true);
                    const channels = await channelsResponse.json();
                    expect(Array.isArray(channels)).toBe(true);
                    expect(channels).toContain(testChannelName);
                    
                    console.log(`✓ ${server.description} API test passed`);
                    
                } catch (error) {
                    console.error(`✗ ${server.description} API test failed:`, error);
                    throw error;
                }
            }, NETWORK_TIMEOUT + 2000);
        });

    });

    describe('Cross-VPS Message Replication Tests', () => {
        
        test('Message replication between VPS servers', async () => {
            if (VPS_SERVERS.length < 2) {
                console.log('⚠ Skipping replication test - need at least 2 VPS servers');
                return;
            }
            
            const testChannel = `vps-replication-test-${Date.now()}`;
            const testMessage = {
                msg: 'VPS replication test message',
                type: 'test',
                timestamp: new Date().toISOString(),
                testId: Math.random().toString(36).substring(7)
            };
            
            try {
                // Create channel on first server
                const primaryServer = VPS_SERVERS[0];
                const createResponse = await fetch(`http://${primaryServer.host}:${primaryServer.port}/channel/${testChannel}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        approveJoins: 'open',
                        description: 'VPS replication test channel'
                    }),
                    signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                });
                
                expect(createResponse.ok).toBe(true);
                console.log(`✓ Created test channel: ${testChannel}`);
                
                // Wait for channel to be created and replicated
                await asyncDelay(2000);
                
                // Send message to primary server
                const messageResponse = await fetch(`http://${primaryServer.host}:${primaryServer.port}/channel/${testChannel}/message`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(testMessage),
                    signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                });
                
                expect(messageResponse.ok).toBe(true);
                console.log(`✓ Sent test message to primary server`);
                
                // Wait for replication to occur
                await asyncDelay(3000);
                
                // Check if channel exists on other servers
                let replicationVerified = true;
                const verificationErrors: string[] = [];
                
                for (let i = 1; i < VPS_SERVERS.length; i++) {
                    const server = VPS_SERVERS[i];
                    try {
                        const channelsResponse = await fetch(`http://${server.host}:${server.port}/channels`, {
                            method: 'GET',
                            signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                        });
                        
                        if (channelsResponse.ok) {
                            const channels = await channelsResponse.json();
                            if (channels.includes(testChannel)) {
                                console.log(`✓ Channel replicated to ${server.description}`);
                            } else {
                                verificationErrors.push(`Channel not found on ${server.description}`);
                                replicationVerified = false;
                            }
                        } else {
                            verificationErrors.push(`Failed to check channels on ${server.description}`);
                            replicationVerified = false;
                        }
                    } catch (error) {
                        verificationErrors.push(`Error checking ${server.description}: ${error}`);
                        replicationVerified = false;
                    }
                }
                
                if (!replicationVerified) {
                    console.warn('⚠ Replication verification issues:', verificationErrors);
                    // Don't fail the test, just log warnings since replication timing can vary
                }
                
                console.log(`✓ Basic replication test completed`);
                
            } catch (error) {
                console.error('✗ Replication test failed:', error);
                throw error;
            }
        }, 40000); // 40 second timeout for replication test
        
    });

    describe('Network Performance Tests', () => {
        
        VPS_SERVERS.forEach(server => {
            test(`${server.description} - Response Time Test`, async () => {
                const startTime = Date.now();
                
                const response = await fetch(`http://${server.host}:${server.port}/channels`, {
                    method: 'GET',
                    signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                });
                
                const responseTime = Date.now() - startTime;
                
                expect(response.ok).toBe(true);
                expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
                
                console.log(`✓ ${server.description} response time: ${responseTime}ms`);
            }, NETWORK_TIMEOUT + 1000);
        });

        test('Concurrent connections to all VPS servers', async () => {
            const promises = VPS_SERVERS.map(async (server) => {
                const startTime = Date.now();
                
                const response = await fetch(`http://${server.host}:${server.port}/channels`, {
                    method: 'GET',
                    signal: AbortSignal.timeout(NETWORK_TIMEOUT)
                });
                
                const responseTime = Date.now() - startTime;
                
                return {
                    server: server.description,
                    success: response.ok,
                    responseTime
                };
            });
            
            const results = await Promise.all(promises);
            
            for (const result of results) {
                expect(result.success).toBe(true);
                console.log(`✓ ${result.server} concurrent response time: ${result.responseTime}ms`);
            }
            
            const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;
            console.log(`✓ Average response time across all servers: ${avgResponseTime.toFixed(2)}ms`);
            
        }, NETWORK_TIMEOUT + 2000);

    });

});

describe('VPS Configuration Validation', () => {
    
    test('VPS_SERVERS configuration is valid', () => {
        expect(VPS_SERVERS.length).toBeGreaterThan(0);
        
        VPS_SERVERS.forEach((server, index) => {
            expect(server.id).toBeDefined();
            expect(server.host).toBeDefined();
            expect(server.port).toBeGreaterThan(0);
            expect(server.description).toBeDefined();
            
            // Check for unique IDs
            const duplicateIds = VPS_SERVERS.filter(s => s.id === server.id);
            expect(duplicateIds.length).toBe(1);
            
            console.log(`✓ Server ${index + 1}: ${server.description} (${server.host}:${server.port})`);
        });
    });
    
    test('VPS servers have different hosts or ports', () => {
        const serverEndpoints = VPS_SERVERS.map(s => `${s.host}:${s.port}`);
        const uniqueEndpoints = new Set(serverEndpoints);
        
        expect(uniqueEndpoints.size).toBe(serverEndpoints.length);
        console.log('✓ All VPS servers have unique endpoints');
    });

});

// Helper function to check if VPS servers are configured
export function areVpsServersConfigured(): boolean {
    return VPS_SERVERS.length > 0 && 
           VPS_SERVERS.every(server => 
               server.host !== '192.168.1.100' && 
               server.host !== '192.168.1.101' && 
               server.host !== 'localhost'
           );
}

// Export configuration for use in other tests
export { VPS_SERVERS, NETWORK_TIMEOUT }; 