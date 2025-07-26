import { beforeEach, describe as descrWithContext, expect, it as itWithContext, vi } from "vitest";

import { makeValue } from "@helios-lang/ledger";
import {
    ADA,
    addTestContext,
    type StellarTestContext,
    type TestHelperState,
} from "@donecollectively/stellar-contracts/testing";
import type { minimalData } from "@donecollectively/stellar-contracts";

import { DredCapoTestHelper, type DredCapo_TC, helperState } from "./DredCapoTestHelper.js";
import type { ErgoProtocolSettings } from "./settings/ProtocolSettings.typeInfo.js";

const it = itWithContext<DredCapo_TC>;
const fit = it.only;
const xit = it.skip;

const describe = descrWithContext<DredCapo_TC>;

describe("DRED Settings", () => {
    beforeEach<DredCapo_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(context, DredCapoTestHelper, undefined, helperState);
        await context.h.delay(10);
    });

    describe("has custom settings for DRED node parameters", () => {
        it("has node registration settings", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            const capo = h.capo;
            const settings = await capo.findSettingsInfo({
                charterData: await capo.findCharterData(),
            });
            const { nodeOpSettings } = settings.data!;
            expect(nodeOpSettings).toBeDefined();
            expect(nodeOpSettings.V1!.expectedHeartbeatInterval).toBeGreaterThan(300_000);
            expect(nodeOpSettings.V1!.minNodeOperatorStake.lovelace).toBeGreaterThan(40n * ADA);
            expect(nodeOpSettings.V1!.requiredNodeUptime).toBe(0.95);
            expect(nodeOpSettings.V1!.minValidations).toBe(1n);
            expect(nodeOpSettings.V1!.minNodeRegistrationFee.lovelace).toBeGreaterThan(0n);
        });

        it("has neighborhood settings", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            const capo = h.capo;
            const settings = await capo.findSettingsInfo({
                charterData: await capo.findCharterData(),
            });

            const { minNbhStake, minRegistrationFee } = settings.data!.nbhSettings.V1!;

            expect(minNbhStake.lovelace).toBeGreaterThan(0n);
            expect(minRegistrationFee.lovelace).toBeGreaterThan(0n);
        });
    });

    describe("can update the settings", () => {
        it("applies the new settings on-chain", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            // await h.setActor("admin1");
            const capo = h.capo;

            const charterData = await capo.findCharterData();
            const settings = await capo.findSettingsInfo({
                charterData,
            });

            const updatedFields: Partial<minimalData<ErgoProtocolSettings>> = {
                nodeOpSettings: {
                    V1: {
                        expectedHeartbeatInterval: 42000n,
                        minNodeOperatorStake: makeValue(10_000n),
                        minNodeRegistrationFee: makeValue(10_000n),
                        requiredNodeUptime: 0.95,
                        minValidations: 1n,
                    },
                },
                nbhSettings: {
                    V1: {
                        minNbhStake: makeValue(10_000n * ADA),
                        minRegistrationFee: makeValue(1_000n * ADA),
                    },
                },
            };

            await h.updateSettings(settings, {
                updatedFields,
                submit: true,
            });

            const newSettingsUtxo = await capo.findSettingsInfo({
                charterData,
            });
            const { data: newSettings } = newSettingsUtxo;
            if (!newSettings) {
                throw new Error("No new settings found");
            }
            // Add update logic here
            expect(newSettings.nodeOpSettings.V1!.expectedHeartbeatInterval).toBe(42000n);
            expect(newSettings.nodeOpSettings.V1!.minNodeOperatorStake.lovelace).toBe(10_000n);
            expect(newSettings.nodeOpSettings.V1!.minNodeRegistrationFee.lovelace).toBe(10_000n);
            expect(newSettings.nbhSettings.V1!.minNbhStake.lovelace).toBe(10_000n * ADA);
            expect(newSettings.nbhSettings.V1!.minRegistrationFee.lovelace).toBe(1_000n * ADA);
            // After update would be 42000 and 5 respectively
        });

        it("won't update the settings without proper authorization", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            const capo = h.capo;
            const charterData = await capo.findCharterData();
            const settings = await capo.findSettingsInfo({
                charterData,
            });
            const updatedFields: Partial<minimalData<ErgoProtocolSettings>> = {
                nodeOpSettings: {
                    V1: {
                        expectedHeartbeatInterval: 42000n,
                        minNodeOperatorStake: makeValue(10_000n),
                        minNodeRegistrationFee: makeValue(10_000n),
                        requiredNodeUptime: 0.95,
                        minValidations: 1n,
                    },
                },
                nbhSettings: {
                    V1: {
                        minNbhStake: makeValue(10_000n * ADA),
                        minRegistrationFee: makeValue(1_000n * ADA),
                    },
                },
            };
            vi.spyOn(capo, "txnAddGovAuthority").mockImplementation((tcx) => tcx as any);
            const authCheck = h.updateSettings(settings, {
                updatedFields,
                submit: true,
            });

            // Test unauthorized update
            await expect(authCheck).rejects.toThrow(
                /script validation.* missing required input .* dgTkn capoGov/,
            );
        });
    });
});
