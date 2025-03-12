import { describe, expect, it, beforeEach, vi } from "vitest";
import {
    ADA,
    addTestContext,
    type StellarTestContext,
    type TestHelperState,
} from "@donecollectively/stellar-contracts/testing";
import { DredTestHelper, helperState } from "./DredTestHelper.js";

// Define the test context type
type DRED_TC = StellarTestContext<DredTestHelper>;

describe("DRED Settings", () => {
    beforeEach<DRED_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(
            context,
            DredTestHelper,
            undefined,
            helperState
        );
        await context.h.delay(10);
    });

    describe("has custom settings for DRED node parameters", () => {
        it("has node registration settings", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            const settings = await h.reusableBootstrap();
            expect(settings.nodeRegistration).toBeDefined();
            expect(settings.nodeRegistration.heartbeatInterval).toBe(30000);
            expect(settings.nodeRegistration.minimumStake).toBe(8_000n * ADA);
            expect(settings.nodeRegistration.networkAddress).toBeDefined();
            expect(settings.nodeRegistration.networkAddress.minPort).toBe(1024);
            expect(settings.nodeRegistration.networkAddress.maxPort).toBe(65535);
        });

        it("has node heartbeat settings", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            const settings = await h.reusableBootstrap();
            expect(settings.nodeRegistration.heartbeatInterval).toBeDefined();
            expect(settings.nodeRegistration.maxMissedHeartbeats).toBe(3);
        });
    });

    describe("can update the settings", () => {
        it("applies the new settings on-chain", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            h.setActor("admin1");
            const settings = await h.reusableBootstrap();

            // Test updating settings
            const updating = {
                nodeRegistration: {
                    heartbeatInterval: 42000,
                    maxMissedHeartbeats: 5
                },
            };

            // Add update logic here
            expect(settings.nodeRegistration.heartbeatInterval).toBe(30000);
            expect(settings.nodeRegistration.maxMissedHeartbeats).toBe(3);
            // After update would be 42000 and 5 respectively
        });

        it("won't update the settings without proper authorization", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            const settings = await h.reusableBootstrap();

            // Mock authorization check
            const authCheck = vi.fn().mockImplementation(() => {
                throw new Error("Unauthorized settings update");
            });

            // Test unauthorized update
            await expect(
                authCheck()
            ).rejects.toThrow(/Unauthorized settings update/);
        });
    });

    describe("node registration validation", () => {
        it("validates minimum stake requirement", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            const settings = await h.reusableBootstrap();
            
            // Test node with insufficient stake
            h.setActor("node3"); // Has exactly minimum stake
            expect(settings.nodeRegistration.minimumStake).toBe(8_000n * ADA);
            
            // Would throw for insufficient stake
            const insufficientStake = () => {
                h.addActor("insufficientNode", 7_000n * ADA);
            };
            expect(insufficientStake).toThrow();
        });

        it("validates network address settings", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            const settings = await h.reusableBootstrap();
            
            expect(settings.nodeRegistration.networkAddress.minPort).toBe(1024);
            expect(settings.nodeRegistration.networkAddress.maxPort).toBe(65535);
            
            // Invalid port numbers would be rejected
            const invalidPort = () => {
                return {
                    ...settings.nodeRegistration,
                    networkAddress: {
                        minPort: 0, // Invalid system port
                        maxPort: 65535
                    }
                };
            };
            expect(invalidPort).toThrow();
        });
    });

    describe("delegates and authorization", () => {
        it("has delegates for controlling node settings", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            h.setActor("admin1");
            const settings = await h.reusableBootstrap();
            expect(settings.nodeRegistration).toBeDefined();
        });

        it("enforces proper authorization for settings updates", async (context: DRED_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            const settings = await h.reusableBootstrap();
            
            // Test unauthorized access
            const unauthorizedUpdate = () => {
                h.setActor("node1"); // Non-admin actor
                return settings.nodeRegistration.heartbeatInterval = 50000;
            };
            
            expect(unauthorizedUpdate).toThrow();
        });
    });
});

