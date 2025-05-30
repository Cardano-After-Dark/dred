import {
    describe as descrWithContext,
    expect,
    it as itWithContext,
    beforeEach,
    vi,
    assertType,
    expectTypeOf,
    beforeAll,
} from "vitest";

import {
    addTestContext,
    type TestHelperState,
} from "@donecollectively/stellar-contracts/testing";

import { dumpAny, StellarTxnContext, textToBytes } from "@donecollectively/stellar-contracts";
import { makeValue, makeAssetClass } from "@helios-lang/ledger";
import type { ErgoNodeRegistrationData } from "./NodeRegistry.typeInfo.js";
import { DredCapo } from "../DredCapo.js";
import { DredCapoTestHelper, type DredCapo_TC, helperState } from "../DredCapoTestHelper.js";

const it = itWithContext<DredCapo_TC>;
const fit = it.only;
const xit = it.skip; //!!! todo: update this when vitest can have skip<HeliosTestingContext>
//!!! until then, we need to use if(0) it(...) : (
// ... or something we make up that's nicer

const describe = descrWithContext<DredCapo_TC>;

// Copilot: The requirements for the MarketSale plugin should be drawn from the MarketSaleController.ts file
// ... in the requirements() method, the keys should be used for describe() sections in the tests.
// ... the requirements()'s 'mech' entries should be used for it() blocks.

describe("Dred NodeRegistry", async () => {
    beforeEach<DredCapo_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(
            context,
            DredCapoTestHelper,
            undefined,
            helperState
        );
    });

    describe("It's created with the key details for registering a node", () => {
        it("has expected hostname & other high-level details", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
            h.ts("start");
            await h.reusableBootstrap();
            h.ts("ok bootstrapped");
            await h.snapToFirstRegisteredNode();
            const capo = h.capo;

            const { data: dredNode, utxo } = await h.findFirstNode();
            const controller = await h.registryDgt();
            const exampleData = controller.exampleData();

            expect(dredNode).toBeDefined();
            if (!dredNode) throw new Error("for TS");

            expect(dredNode.nodeAddress).toEqual(exampleData.nodeAddress);
            expect(dredNode.nodePort).toEqual(exampleData.nodePort);
            expect(dredNode.nodePublicKey).toEqual(exampleData.nodePublicKey);

            const {memberToken} = dredNode;
            const tokenMatcher = capo.uh.mkTokenPredicate(memberToken);
            const tokenUtxo = await capo.uh.findActorUtxo("memberToken", tokenMatcher);
            expect(tokenUtxo).toBeDefined();
            expect(
                tokenUtxo!.value.assets.getAssetClassQuantity(
                    makeAssetClass(capo.mph, textToBytes(memberToken))
                )
            ).toEqual(1n);

        });

        it("requires a memberToken to register the node", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            const capo = h.capo;
            await h.participantSelfRegisters();

            const controller = await h.registryDgt();
            await h.mockMemberToken();

            const registering = h.createNode(controller.exampleData())
            await expect(registering).rejects.toThrow(/script validation .* missing member token/);
        });
    });

    describe("Activity:UpdatingRecord allows a node operator to update their registration details", () => {
        it( "can't UpdateRecord without their memberToken", async (context: DredCapo_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.reusableBootstrap();
                await h.snapToFirstRegisteredNode();
                const dredNode = await h.findFirstNode();
                const capo = h.capo;
                const controller = await h.registryDgt();
                h.mockMemberToken();

                const updating  = h.updateNode(dredNode, {
                    txnName: "needs member token",
                    updatedFields: {
                        nodeAddress: "new-address",
                        nodePort: 1234,
                    }
                });

                expect(updating).rejects.toThrow(/script validation .* missing member token/);
            }
        );
    })

    it("Updates the node's registration details with their memberToken", async (context: DredCapo_TC) => {
        const {
            h,
            h: { network, actors, delay, state },
        } = context;

        await h.reusableBootstrap();
        await h.snapToFirstRegisteredNode();
        const dredNode = await h.findFirstNode();
        const capo = h.capo;
        const controller = await h.registryDgt();

        const tcx = await h.updateNode(dredNode, {
            txnName: "update node",
            updatedFields: {
                nodeAddress: "new-address",
                nodePort: 4321,
            }
        });

        const updated = await h.findFirstNode();
        const { data: updatedData } = updated || {};
        expect(updatedData?.nodeAddress).toEqual("new-address");
        expect(updatedData?.nodePort).toEqual(4321n);
    });
});
