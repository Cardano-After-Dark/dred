import {
    describe as descrWithContext,
    expect,
    it as itWithContext,
    beforeEach,
    vi,
    assertType,
    expectTypeOf,
} from "vitest";

import { addTestContext, type TestHelperState } from "@donecollectively/stellar-contracts/testing";

import { dumpAny, StellarTxnContext, textToBytes } from "@donecollectively/stellar-contracts";
import { makeValue, makeAssetClass } from "@helios-lang/ledger";
import type { ErgoNeighborhoodData } from "./NeighborhoodRegistry.typeInfo.js";
import { DredCapo } from "../DredCapo.js";
import { DredCapoTestHelper, type DredCapo_TC, helperState } from "../DredCapoTestHelper.js";
import { expectArray } from "@helios-lang/type-utils";

const it = itWithContext<DredCapo_TC>;
const fit = it.only;
const xit = it.skip; //!!! todo: update this when vitest can have skip<HeliosTestingContext>
//!!! until then, we need to use if(0) it(...) : (
// ... or something we make up that's nicer

const describe = descrWithContext<DredCapo_TC>;

// Copilot: The requirements for the MarketSale plugin should be drawn from the MarketSaleController.ts file
// ... in the requirements() method, the keys should be used for describe() sections in the tests.
// ... the requirements()'s 'mech' entries should be used for it() blocks.

describe("Dred Neighborhood Registry", async () => {
    beforeEach<DredCapo_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(context, DredCapoTestHelper, undefined, helperState);
    });
    it("does initial setup", async (context: DredCapo_TC) => {
        const {
            h,
            h: { network, actors, delay, state },
        } = context;
        h.ts("start");
        await h.reusableBootstrap();
        h.ts("ok bootstrapped");
    });

    describe("It's created with the key details for registering a neighborhood", () => {
        it("has expected hostname & other high-level details", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstRegisteredNeighborhood();
            const capo = h.capo;

            const { data: dredNbh, utxo } = await h.findFirstNeighborhood();
            const controller = await h.nbhRegistryDgt();
            const exampleData = controller.exampleData();

            expect(dredNbh).toBeDefined();
            if (!dredNbh) throw new Error("for TS");

            expect(dredNbh.details.V1.appInfo.name).toEqual(exampleData.details.V1.appInfo.name);
            expect(dredNbh.memberToken).not.toEqual(exampleData.memberToken);

            const { memberToken } = dredNbh;
            const tokenMatcher = capo.uh.mkTokenPredicate(memberToken);
            const tokenUtxo = await capo.uh.findActorUtxo("memberToken", tokenMatcher);
            expect(tokenUtxo).toBeDefined();
            expect(
                tokenUtxo!.value.assets.getAssetClassQuantity(
                    makeAssetClass(capo.mph, textToBytes(memberToken)),
                ),
            ).toEqual(1n);
        });

        it("requires a memberToken to register the neighborhood", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            const capo = h.capo;
            await h.setActor("nbhOwner");
            await h.participantSelfRegisters();

            const controller = await h.nbhRegistryDgt();
            await h.mockMemberToken();

            const registering = h.registerNeighborhood(controller.exampleData());
            await expect(registering).rejects.toThrow(/script validation .* missing member token/);
        });

        it("is created in Preproduction state", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.setActor("nbhOwner");
            await h.participantSelfRegisters();

            const controller = await h.nbhRegistryDgt();
            const exampleData = controller.exampleData();
            const registering = h.registerNeighborhood({
                ...exampleData,
                details: {
                    V1: {
                        ...exampleData.details.V1,
                        state: { Active: {} },
                    },
                },
            });

            await expect(registering).rejects.toThrow(/state must be Preproduction/);

            await h.snapToFirstRegisteredNeighborhood();

            const newNbh = await h.findFirstNeighborhood();
            if (!newNbh?.data) throw new Error("no node found");

            expect(newNbh.data.details.V1.state).toEqual({
                Preproduction: {},
            });
        });
    });
    describe("Switching to Active state", () => {
        it("requires the right memberToken", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.setActor("nbhOwner");
            await h.snapToFirstRegisteredNeighborhood();

            const controller = await h.nbhRegistryDgt();
            const firstNbh = await h.findFirstNeighborhood();

            await h.setActor("ned");
            const reg = await h.participantSelfRegisters();

            await expect(h.activateNeighborhood(firstNbh, { 
                expectError: true,

            })).rejects.toThrow(
                /missing member token/,
            );
            if (!firstNbh?.data) throw new Error("no node found");
            await h.mockMemberToken();

            // can't change the member token
            const activating = h.activateNeighborhood(firstNbh, {
                updatedFields: {
                    memberToken: reg.state.uuts.member.name
                }
            });
            await expect(activating).rejects.toThrow(/missing member token/);
        });

        it("fails if they try to change the member-token name", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
           
            await h.reusableBootstrap();
            await h.snapToFirstRegisteredNeighborhood();

            const controller = await h.nbhRegistryDgt();
            const firstNbh = await h.findFirstNeighborhood();

            await h.setActor("ned");

            const reg = await h.participantSelfRegisters();
        });

        fit("works with the right member token", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.snapToFirstRegisteredNeighborhood();

            const controller = await h.nbhRegistryDgt();
            const firstNbh = await h.findFirstNeighborhood();

            return h.activateNeighborhood(firstNbh);
        });
    });
});
