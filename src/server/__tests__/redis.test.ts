import { beforeAll, afterAll, beforeEach, afterEach, describe, it, expect } from "vitest";
import { testSetup } from "../testServer.js";
import { DredServer } from "../DredServer.js";
import { asyncDelay } from "../../util/asyncDelay.js";

/**
 * Comprehensive Redis Set functionality tests for message deduplication in replication.
 * This is a detailed unit/integration test suite that validates Redis SET commands, the RedisSet wrapper class,
 * and the deduplication logic that prevents duplicate messages during cross-server replication.
 * Also ensures each server maintains isolated Redis namespaces.
 * (For basic Redis connectivity, see the smoke test in replication.test.ts)
 */

// Test configuration
const TEST_CHANNEL = "redis-test-channel";
const TEST_TIMEOUT = 5000;

interface TestMessage {
    msg: string;
    type: string;
    ocid?: string;
}

describe("Redis Set Functionality", () => {
    let test: {
        servers: DredServer[];
    };

    let server: DredServer;

    beforeAll(async () => {
        test = await testSetup();
        server = test.servers[0]; // Use first server for Redis testing
    });

    afterAll(async () => {
        await asyncDelay(100);
    });

    describe("RedisSet Basic Operations", () => {
        // Tests raw Redis SET commands (SISMEMBER, SADD, SREM) to verify Redis connectivity and basic set functionality
        it("should perform basic Redis set operations", async () => {
            const testKey = "test-redis-set";
            const testValue = "test-value-123";
            
            // Test has() on non-existent key
            expect(await server.redis!.call("SISMEMBER", testKey, testValue)).toBe(0);
            
            // Test add()
            const addResult = await server.redis!.call("SADD", testKey, testValue);
            expect(addResult).toBe(1); // 1 means new element added
            
            // Test has() on existing key
            expect(await server.redis!.call("SISMEMBER", testKey, testValue)).toBe(1);
            
            // Test add() duplicate (should return 0)
            const duplicateResult = await server.redis!.call("SADD", testKey, testValue);
            expect(duplicateResult).toBe(0); // 0 means element already existed
            
            // Test delete()
            const deleteResult = await server.redis!.call("SREM", testKey, testValue);
            expect(deleteResult).toBe(1); // 1 means element was removed
            
            // Verify deletion
            expect(await server.redis!.call("SISMEMBER", testKey, testValue)).toBe(0);
            
            // Clean up the test set
            await server.redis!.call("DEL", testKey);
        });
    });

    describe("RedisSet Class Wrapper", () => {
        // Tests the RedisSet TypeScript class wrapper to ensure it properly calls Redis commands and returns correct values
        it("should work through the RedisSet class interface", async () => {
            // Access the knownMessages RedisSet
            const redisSet = server.knownMessages;
            expect(redisSet).toBeDefined();
            
            const testKey = "class-test-key";
            
            // Test has() - should return 0 (not found) initially
            expect(await redisSet.has(testKey)).toBe(0);
            
            // Test add()
            await redisSet.add(testKey);
            
            // Test has() - should return 1 (found) now
            expect(await redisSet.has(testKey)).toBe(1);
            
            // Test delete()
            await redisSet.delete(testKey);
            
            // Test has() - should return 0 (not found) again
            expect(await redisSet.has(testKey)).toBe(0);
        });
    });

    describe("Message Deduplication", () => {
        // Tests that RedisSet correctly prevents duplicate message processing by tracking known message IDs
        it("should prevent duplicate message processing using RedisSet", async () => {
            await server.setupReplication();
            
            const testMessage: TestMessage = {
                msg: "Duplicate prevention test",
                type: "dedup-test",
                ocid: "dedup-test-123"
            };

            // Test the deduplication mechanism
            const compositeKey = `${TEST_CHANNEL}:::${testMessage.ocid}`;
            
            // Verify message not in set initially
            expect(await server.knownMessages.has(compositeKey)).toBe(0);
            
            // Add message to known messages set
            await server.knownMessages.add(compositeKey);
            
            // Verify message is now tracked
            expect(await server.knownMessages.has(compositeKey)).toBe(1);
            
            // Test ensureMessageProcessedOnce - should detect duplicate
            const processResult = await server.ensureMessageProcessedOnce(
                TEST_CHANNEL,
                testMessage.ocid!,
                testMessage.msg
            );
            
            // Should return undefined for duplicate
            expect(processResult).toBeUndefined();
            
            // Clean up
            await server.knownMessages.delete(compositeKey);
            expect(await server.knownMessages.has(compositeKey)).toBe(0);
        });

        // Tests that new messages (not in RedisSet) are processed normally and then added to known messages
        it("should allow first-time message processing", async () => {
            await server.setupReplication();
            
            const testMessage: TestMessage = {
                msg: "First time message",
                type: "first-time-test",
                ocid: "first-time-456"
            };

            const compositeKey = `${TEST_CHANNEL}:::${testMessage.ocid}`;
            
            // Ensure clean state
            await server.knownMessages.delete(compositeKey);
            expect(await server.knownMessages.has(compositeKey)).toBe(0);
            
            // Test ensureMessageProcessedOnce - should process new message
            const processResult = await server.ensureMessageProcessedOnce(
                TEST_CHANNEL,
                testMessage.ocid!,
                testMessage.msg
            );
            
            // Should return message ID for new message
            expect(processResult).toBeDefined();
            expect(typeof processResult).toBe("string");
            
            // Verify message is now in known messages
            expect(await server.knownMessages.has(compositeKey)).toBe(1);
            
            // Clean up
            await server.knownMessages.delete(compositeKey);
        });
    });

    describe("Multi-Server Redis Isolation", () => {
        // Tests that each server has its own isolated Redis namespace, preventing cross-server data leakage
        it("should maintain separate RedisSet instances per server", async () => {
            const server1 = test.servers[0];
            const server2 = test.servers[1];
            
            await server1.setupReplication();
            await server2.setupReplication();
            
            const testKey = "isolation-test-key";
            
            // Add key to server1's known messages
            await server1.knownMessages.add(testKey);
            expect(await server1.knownMessages.has(testKey)).toBe(1);
            
            // Verify server2 doesn't see it (different Redis DB or key space)
            expect(await server2.knownMessages.has(testKey)).toBe(0);
            
            // Clean up
            await server1.knownMessages.delete(testKey);
        });
    });
}); 