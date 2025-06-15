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

import { addTestContext, type TestHelperState } from "@donecollectively/stellar-contracts/testing";

import { dumpAny, StellarTxnContext, textToBytes } from "@donecollectively/stellar-contracts";
import { makeValue, makeAssetClass } from "@helios-lang/ledger";
import type { ErgoNodeRegistrationData } from "./NodeRegistry.typeInfo.js";
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

describe("Dred NodeRegistry", async () => {
    beforeEach<DredCapo_TC>(async (context) => {
        await new Promise((res) => setTimeout(res, 10));
        console.log("\n\n\n\n   ==================== ======================");
        await addTestContext(context, DredCapoTestHelper, undefined, helperState);
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

            expect(dredNode.nodeDetails.address).toEqual(exampleData.nodeDetails.address);
            expect(dredNode.nodeDetails.port).toEqual(exampleData.nodeDetails.port);
            expect(dredNode.nodeDetails.pubKey).toEqual(h.actors.node1.pubKey);
            expect(dredNode.nodeDetails.pubKeyHash).toEqual(h.actors.node1.pubKey.hash());

            const { memberToken } = dredNode;
            const tokenMatcher = capo.uh.mkTokenPredicate(memberToken);
            const tokenUtxo = await capo.uh.findActorUtxo("memberToken", tokenMatcher);
            expect(tokenUtxo).toBeDefined();
            expect(
                tokenUtxo!.value.assets.getAssetClassQuantity(
                    makeAssetClass(capo.mph, textToBytes(memberToken)),
                ),
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

            const registering = h.createNode(controller.exampleData());
            await expect(registering).rejects.toThrow(/script validation .* missing member token/);
        });

        it("is created in Validating state", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.reusableBootstrap();
            await h.participantSelfRegisters();

            const controller = await h.registryDgt();

            await expect(
                h.createNode({
                    ...controller.exampleData(),
                    state: { Active: 0 },
                }),
            ).rejects.toThrow(/state must be NeedsValidation/);

            await h.snapToFirstRegisteredNode();

            const newNode = await h.findFirstNode();
            if (!newNode?.data) throw new Error("no node found");

            expect(newNode.data.state).toEqual({
                NeedsValidation: [],
            });
        });
    });

    describe("Validating the node's registration details", () => {
        it("can be done by another operator", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.snapToFirstRegisteredNode();
            const node1 = await h.findFirstNode();
            if (!node1?.data) throw new Error("no node found");
            const controller = await h.registryDgt();

            h.setActor("nellie");
            await h.participantSelfRegisters();
            const n2tcx = await h.createNode({
                ...controller.exampleData(),
            });

            debugger;
            const node2 = await controller.findRecords({
                id: n2tcx.state.uuts.recordId,
            });
            if (!node2?.data) throw new Error("no node found");

            await h.validateNode(node1, {
                txnName: "node2 operator validates node1",
            });
        });

        it("an operator can't validate their own node", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.snapToFirstRegisteredNode();
            const controller = await h.registryDgt();
            const node = await h.findFirstNode();
            if (!node?.data) throw new Error("no node found");

            const submitting = h.validateNode(node, {
                txnName: "validate own node",
                validatorPkh: h.actors.node1.pubKey.hash(),
                expectError: true,
            });

            await expect(submitting).rejects.toThrow(
                /script validation .* can't validate own node/,
            );
        });

        it.todo("an operator can't validate a node that's not in NeedsValidation state", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
        });

        it.todo("requires a Validating operator to update only the signatories for a NeedsValidation node", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
        });

        it.todo(
            "FUT: can be done for a valid combination of Validating-Operator + Validated-Node + nbh Membership for both",
            async (context: DredCapo_TC) => {},
        );

        it.todo("can't validate without a refInput pointing to the validator's node", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;
           
            // should fail if the pubKeyHash isn't found in one of the dredNode-* records in refInputs.
        });
    });

    describe("Activity:UpdatingRecord allows a node operator to update their registration details", () => {
        it("can't UpdateRecord without their memberToken", async (context: DredCapo_TC) => {
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

            const updating = h.updateNode(dredNode, {
                txnName: "needs member token",
                updatedFields: {
                    nodeDetails: {
                        ...dredNode.data!.nodeDetails,
                        address: "new-address",
                        port: 1234,
                    },
                },
            });

            expect(updating).rejects.toThrow(/script validation .* missing member token/);
        });
    });

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
                nodeDetails: {
                    ...dredNode.data!.nodeDetails,
                    address: "new-address",
                    port: 4321,
                },
            },
        });

        const updated = await h.findFirstNode();
        const { data: updatedData } = updated || {};
        // TODO: the new details are stored in nextNodeDetails instead.
        expect(updatedData?.nodeDetails.address).toEqual("new-address");
        expect(updatedData?.nodeDetails.port).toEqual(4321n);
    });
});
