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
    it("does initial setup", async (context: DredCapo_TC) => {
        const {
            h,
            h: { network, actors, delay, state },
        } = context;
        h.ts("start");
        await h.reusableBootstrap();
        h.ts("ok bootstrapped");

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
            await h.setActor("ned");
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
            await h.setActor("ned");
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

            await h.snapToSecondRegisteredNode();
            const node1 = await h.findFirstNode();

            const controller = await h.registryDgt();

            h.setActor("nellie");
            const node2 = await h.findSecondNode();
            if (!node2?.data) throw new Error("no node found");

            await h.validateNode(node1, {
                txnName: "node2 operator validates node1",
                validatorReg: node2,
            });
        });

        it(
            "can't be done a second time by the same validating operator",
            async (context: DredCapo_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.snapToFirstValidatedNode();
                const controller = await h.registryDgt();
                const node1 = await h.findFirstNode();
                const node2 = await h.findSecondNode();
                if (!node1?.data) throw new Error("no node found");

                await h.setActor("nellie");

                await expect(
                    h.validateNode(node1, {
                        txnName: "node2 operator validates node1 AGAIN",
                        validatorReg: node2,
                    }),
                ).rejects.toThrow(/duplicate validation attempt/);
            },
        );

        it("an operator can't validate their own node", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.snapToSecondRegisteredNode();
            const controller = await h.registryDgt();
            const node1 = await h.findFirstNode();
            if (!node1?.data) throw new Error("no node found");

            // const node2 = await h.findSecondNode();
            // if (!node2?.data) throw new Error("no node found");

            await h.setActor("ned");

            const submitting = h.validateNode(node1, {
                txnName: "validate own node",
                validatorReg: node1,
                expectError: true,
            });

            await expect(submitting).rejects.toThrow(
                /script validation .* can't validate own node/,
            );
        });

        it("an operator can't validate a node that's not in NeedsValidation state", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.snapToFirstActivatedNode();
            await h.setActor("natalia");

            const controller = await h.registryDgt();
            const node1 = await h.findFirstNode();
            if (!node1?.data) throw new Error("no node found");

            await h.setActor("nellie");
            const node2 = await h.findSecondNode();
            if (!node2?.data) throw new Error("no node found");

            const validating = h.validateNode(node1, { submit: true, validatorReg: node2 });

            await expect(validating).rejects.toThrow(/node is not in need of validation/);
        });

        describe("doesn't allow Validation to modify anything but the signatories", () => {
            it("rejects if nodeDetails are modified", async (context: DredCapo_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.snapToSecondRegisteredNode();
                const controller = await h.registryDgt();
                const node1 = await h.findFirstNode();
                if (!node1?.data) throw new Error("no node found");

                const node2 = await h.findSecondNode();
                if (!node2?.data) throw new Error("no node found");

                const realUpdate = controller.mkTxnUpdatingNodeRegistration.bind(controller);
                const mock = vi
                    .spyOn(controller, "mkTxnUpdatingNodeRegistration")
                    .mockImplementation((txnName, item, options, initialTcx) => {
                        const { updatedFields } = options;
                        return realUpdate(
                            txnName,
                            item,
                            {
                                ...options,
                                updatedFields: {
                                    ...updatedFields,
                                    nodeDetails: {
                                        ...item.data!.nodeDetails,
                                        ...updatedFields.nodeDetails,
                                        port: 666,
                                    },
                                },
                            },
                            initialTcx,
                        );
                    });

                const validating = h.validateNode(node1, { 
                    validatorReg: node2,
                    submit: true, 
                    expectError: true 
                });

                await expect(validating).rejects.toThrow(
                    /nodeDetails modified/,
                );
            });

            it("rejects if the memberToken is modified", async (context: DredCapo_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.snapToSecondRegisteredNode();
                const controller = await h.registryDgt();
                const node1 = await h.findFirstNode();
                if (!node1?.data) throw new Error("no node found");

                const node2 = await h.findSecondNode();
                if (!node2?.data) throw new Error("no node found");

                const realUpdate = controller.mkTxnUpdatingNodeRegistration.bind(controller);
                const mock = vi
                    .spyOn(controller, "mkTxnUpdatingNodeRegistration")
                    .mockImplementation((txnName, item, options, initialTcx) => {
                        const { updatedFields } = options;
                        return realUpdate(
                            txnName,
                            item,
                            {
                                ...options,
                                updatedFields: {
                                    ...updatedFields,
                                    memberToken: "new-member-token",
                                },
                            },
                            initialTcx,
                        );
                    });

                await expect(h.validateNode(node1, { 
                    submit: true,
                    validatorReg: node2,
                })).rejects.toThrow(
                    /memberToken modified/,
                );
            });
        });

        it.todo(
            "FUT: can be done for a valid combination of Validating-Operator + Validated-Node + nbh Membership for both",
            async (context: DredCapo_TC) => {},
        );

        it(
            "can't validate without a refInput pointing to the validator's node",
            async (context: DredCapo_TC) => {
                const {
                    h,
                    h: { network, actors, delay, state },
                } = context;

                await h.snapToSecondRegisteredNode();
                const controller = await h.registryDgt();
                const node = await h.findFirstNode();
                if (!node?.data) throw new Error("no node found");

                const validatorReg = await h.findSecondNode();
                if (!validatorReg) throw new Error("validator's node-reg record not found");

                vi.spyOn(controller, "addValidatorRef").mockImplementation((tcx, validatorReg) => tcx)

                const validating = h.validateNode(node, { 
                    validatorReg: validatorReg,
                    submit: true, 
                    expectError: true,
                });

                // should fail if the pubKeyHash isn't found in one of the dredNode-* records in refInputs.
                await expect(validating).rejects.toThrow(/refDD: not found/);
            },
        );
    });

    describe("Activating a node", () => {
        it("with minValidations=1, a node can be activated (only) with its NODE pubkey", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.snapToFirstValidatedNode();
            await h.setActor("nellie");

            const controller = await h.registryDgt();
            const node = await h.findFirstNode();
            const wrongActorActivating = h.activateNode(node, { submit: true, expectError: true });
            await expect(wrongActorActivating).rejects.toThrow(/node must activate itself/);

            await h.setActor("ned");
            const wrongWalletActivating = h.activateNode(node, { submit: true, expectError: true });
            await expect(wrongWalletActivating).rejects.toThrow(/node must activate itself/);

            await h.setActor("node1");
            return h.activateNode(node, { submit: true });
        });

        it("fails if it doesn't move to Active state", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.snapToFirstValidatedNode();
            await h.setActor("nellie");

            const controller = await h.registryDgt();
            const node = await h.findFirstNode();
            if (!node?.data) throw new Error("no node found");

            await h.setActor("node1");
            const realActivate = controller.mkTxnActivatingNode.bind(controller);
            const mock = vi
                .spyOn(controller, "mkTxnActivatingNode")
                .mockImplementation((item, options = { updatedFields: {} }, initialTcx) => {
                    return realActivate(
                        item,
                        {
                            ...options,
                            updatedFields: {
                                ...options.updatedFields,
                                state: { Inactive: {} },
                            },
                        },
                        initialTcx,
                    );
                });

            const activating = h.activateNode(node, { submit: true });

            await expect(activating).rejects.toThrow(/node must switch to Active state/);
        });
        it("fails if its lastHeartbeat is outside the txn's time range", async (context: DredCapo_TC) => {
            const {
                h,
                h: { network, actors, delay, state },
            } = context;

            await h.snapToFirstValidatedNode();
            await h.setActor("nellie");

            const controller = await h.registryDgt();
            const node = await h.findFirstNode();
            if (!node?.data) throw new Error("no node found");

            await h.setActor("node1");
            const realActivate = controller.mkTxnActivatingNode.bind(controller);
            const mock = vi
                .spyOn(controller, "mkTxnActivatingNode")
                .mockImplementation((item, options = { updatedFields: {} }, initialTcx) => {
                    return realActivate(
                        item,
                        {
                            ...options,
                            updatedFields: {
                                ...options.updatedFields,
                                state: { Active: Date.now() - 4_200_000 } // more than 1h ago
                            },
                        },
                        initialTcx,
                    );
                });

            const activating = h.activateNode(node, { submit: true });

            await expect(activating).rejects.toThrow(/wrong heartbeat time/);
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
