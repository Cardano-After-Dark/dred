import {
    ADA,
    CapoTestHelper,
    DefaultCapoTestHelper,
    type StellarTestContext,
    type TestHelperState,
    type TestHelperSubmitOptions,
} from "@donecollectively/stellar-contracts/testing";

import {
    StellarTxnContext,
    textToBytes,
    UutName,
    type anyState,
    type DgDataUpdateOptions,
    type FoundDatumUtxo,
    type hasSeedUtxo,
    type minimalData,
    type SubmitOptions,
} from "@donecollectively/stellar-contracts";

import { DredCapo } from "./DredCapo.js";

import { vi } from "vitest";
import type { hasMemberToken } from "stellar-tokenomics";
import type {
    ErgoNodeRegistrationData,
    minimalNodeRegistrationData,
    NodeRegistrationData,
    NodeRegistrationDataLike,
    SpendingActivity,
} from "./nodeRegistry/NodeRegistry.typeInfo.js";
import type { ErgoProtocolSettings } from "./settings/ProtocolSettings.typeInfo.js";
import type { PubKeyHash } from "@helios-lang/ledger";

type addlState = {
    nodesInSnapshot: {
        firstNodeId: string,
        secondNodeId: string,
    }
}

export let helperState: TestHelperState<DredCapo, addlState> = {
    snapshots: {},
    nodesInSnapshot: {
        firstNodeId: "",
        secondNodeId: "",
    }
} as any;

export type DredCapo_TC = StellarTestContext<DredCapoTestHelper> & {
    helperState: typeof helperState;
    snapshot(this: DredCapo_TC, snapName: string): void;
    loadSnapshot(this: DredCapo_TC, snapName: string): void;
    reusableBootstrap(this: DredCapo_TC): Promise<DredCapo>;
};

export class DredCapoTestHelper extends DefaultCapoTestHelper.forCapoClass(DredCapo, {} as any as addlState) {
    get stellarClass() {
        return DredCapo;
    }

    get capo(): DredCapo {
        return this.strella;
    }

    async setupActors() {
        await super.setupActors();
        this.ts("setupActors");

        // Node operators (people who can register nodes)
        this.addActor("ned", 10_000n * ADA);
        this.addActor("nellie", 12_000n * ADA);
        this.addActor("natalia", 8_000n * ADA);

        // Wallets of actual nodes:
        this.addActor("node1", 500n * ADA);
        this.addActor("node2", 500n * ADA);
        this.addActor("node3", 500n * ADA);

        // Add admin actors
        this.addActor("admin1", 20_000n * ADA);
        this.addActor("admin2", 20_000n * ADA);
    }

    async registryDgt() {
        return this.capo.getNodeRegistryController();
    }

    async nbhDgt() {
        return this.capo.getNbhRegistryController();
    }

    async mockMemberToken() {
        const member = await this.capo.findMemberInfo();
        if (!member)
            throw new Error(
                `to mock the member token out of a tx, the member token must first exist.\n` +
                    `... use await h.participantSelfRegisters() to create the member token`,
            );

        const didGetMemberInfo = vi
            .spyOn(this.capo, "txnAddMemberToken")
            .mockImplementation(async (tcx: StellarTxnContext<anyState>) => {
                //@ts-expect-error jamming in the right attr for the mock function's expected return type
                tcx.state.memberToken = member!.uut;
                return tcx as hasMemberToken & hasSeedUtxo;
            });

        return didGetMemberInfo;
    }

    @CapoTestHelper.hasNamedSnapshot("firstMember", "ned")
    async snapToFirstMember() {
        throw new Error("never called");
        return this.firstMember();
    }

    async firstMember() {
        await this.bootstrap();
        await this.setActor("ned");
        const tcx = await this.capo.mkTxnMintParticipantToken(this.wallet.address);

        await this.submitTxnWithBlock(tcx);
    }

    async participantSelfRegisters() {
        await this.bootstrap();

        if (this.actorName == "operator") {
            throw new Error("use h.currentActor = '...', to register with a named participant");
        }
        const { capo, wallet } = this;
        console.log(
            "--------------------------- " +
                this.relativeTs +
                " Test helper: Create collaborator token",
        );
        const tcx = await capo.mkTxnMintParticipantToken(wallet.address);

        return this.submitTxnWithBlock(tcx);
    }

    @CapoTestHelper.hasNamedSnapshot("firstNodeRegistered", "ned")
    async snapToFirstRegisteredNode() {
        throw new Error("never called");
        this.firstRegisteredNode();
    }

    async firstRegisteredNode() {
        this.setActor("ned");
        await this.snapToFirstMember();
        const controller = await this.registryDgt();
        const node = controller.exampleData();
        return this.createNode(node).then((tcx) => {
            this.helperState!.nodesInSnapshot.firstNodeId = tcx.state.uuts.recordId.toString()
            return tcx;
        });
    }

    @CapoTestHelper.hasNamedSnapshot("secondRegisteredNode", "nellie")
    async snapToSecondRegisteredNode() {
        throw new Error("never called");
        this.secondRegisteredNode();
    }
    get firstNodeId() {
        return this.helperState!.nodesInSnapshot.firstNodeId;
    }
    get secondNodeId() {
        return this.helperState!.nodesInSnapshot.secondNodeId;
    }

    async secondRegisteredNode() {
        await this.bootstrap();
        await this.setActor("ned");
        await this.snapToFirstRegisteredNode();
        await this.setActor("nellie");
        await this.participantSelfRegisters();
        const controller = await this.registryDgt();
        const node = controller.exampleData();

        return this.createNode(node).then((tcx) => {
            this.helperState!.nodesInSnapshot.secondNodeId = tcx.state.uuts.recordId.toString()
            return tcx;
        });
    }


    @CapoTestHelper.hasNamedSnapshot("firstValidatedNode", "ned")
    async snapToFirstValidatedNode() {
        throw new Error("never called");
        this.firstValidatedNode();
    }
    
    async firstValidatedNode() {
        await this.bootstrap();
        await this.snapToSecondRegisteredNode();
        const firstNode = await this.findFirstNode();

        await this.setActor("nellie");
        const controller = await this.registryDgt();
        const secondNode = await this.findSecondNode();

        await this.validateNode(firstNode, { 
            submit: true,
            validatorReg: secondNode,
        }).then((tcx) => {
            // restore the first actor so the snapshot-checker is happy
            this.setActor("ned");
            return tcx;
        }).then(/** retain async stack trace entry*/ x => x);
    }

    async createNode(
        node: minimalNodeRegistrationData,
        options: {
            submit?: boolean;
            // mockPubKey?: PubKeyHash;
            mockMemberToken?: string;
        } = {},
    ) {
        const { submit = true, mockMemberToken } = options;

        if (mockMemberToken) {
            const { capo } = this;
            vi.spyOn(capo, "mkTxnWithMemberInfo").mockImplementation(
                async (skipReturn: any, tcx?: StellarTxnContext<anyState>) => {
                    const tcx2: hasMemberToken & hasSeedUtxo =
                        (tcx as any) || capo.mkTcx("create node with mock member token");
                    tcx2.state.memberToken = new UutName("member", mockMemberToken);
                    return tcx2 as any;
                },
            );
        }

        const registryDgt = await this.registryDgt();
        const pubKey = this.actors[this.nodeActor()].pubKey;
        const pkh = pubKey.hash();
        const tcx = await registryDgt.mkTxnRegisteringNode({
            ...node,
            nodeDetails: {
                ...node.nodeDetails,
                pubKey,
                pubKeyHash: pkh,
            },
        });
        // activity: mktSaleDgt.activity.MintingActivities.$seeded$CreatingRecord
        // });

        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx);
    }

    nodeActor() : string {
        const actorToNode = {
            "ned": "node1",
            "nellie": "node2",
            "natalia": "node3",
        }

        const nodeActor = actorToNode[this.actorName];
        if (!nodeActor) throw new Error(`no node actor found for actor ${this.actorName}`);
        return nodeActor;
    }

    async findNodes(x: string | UutName) {
        const registryDgt = await this.registryDgt();
        const found = await this.capo.findDelegatedDataUtxos({
            type: "dredNode",

            id: x,
        });
        return found[0];
    }

    async findFirstNode() {
        const registryDgt = await this.registryDgt();
        return registryDgt.findRecords({id: this.firstNodeId});
    }

    async findSecondNode() {
        const registryDgt = await this.registryDgt();
        return registryDgt.findRecords({
            id: this.secondNodeId
        });
    }

    async updateNode(
        node: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>,
        options: {
            submit?: boolean;
            expectError?: true;
            txnName?: string;
            updatedFields?: Partial<minimalData<NodeRegistrationDataLike>>;
            activity?: DgDataUpdateOptions<NodeRegistrationDataLike>["activity"];
        } = {},
    ) {
        const registryDgt = await this.registryDgt();
        const {
            submit = true,
            txnName = "test helper node update",
            updatedFields = {},
            expectError,
            activity = registryDgt.activity.SpendingActivities.UpdatingRecord(node.data!.id),
        } = options;

        const tcx = await registryDgt.mkTxnUpdatingNodeRegistration(txnName, node, {
            activity,
            updatedFields: {
                ...updatedFields,
            },
        });
        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx, { expectError });
    }

    async validateNode(
        node: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>,
        options: {
            submit?: boolean;
            expectError?: true;
            txnName?: string;
            validatorReg: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>;
        },
    ) {
        const {
            submit = true,
            expectError,
            txnName = "node validation",
            validatorReg,
        } = options;
        const registryDgt = await this.registryDgt();
        const existingNeedsValidation = (node.data?.state as any).NeedsValidation;
        if (!existingNeedsValidation) throw new Error("node is not in need of validation");

        const nodeActor = this.nodeActor();
        await this.setActor(nodeActor);
        const tcx = await registryDgt.mkTxnValidatingNode(txnName, node, {
            validatorReg,
        });

        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx, { expectError });
    }

    @CapoTestHelper.hasNamedSnapshot("firstActivatedNode", "ned")
    async snapToFirstActivatedNode() {
        throw new Error("never called");
        this.firstActivatedNode();
    }   
    

    async firstActivatedNode() {
        await this.bootstrap();
        await this.snapToFirstValidatedNode();
        await this.setActor("node1");
        const controller = await this.registryDgt();
        const firstNode = await this.findFirstNode();

        return this.activateNode(firstNode, { submit: true }).then(async (tcx) => {
            await this.setActor("ned");
            return tcx;
        });
    }

    async activateNode(
        node: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>, 
        options: { submit?: boolean, expectError?: true } = {},
    ) {
        const { submit = true, expectError } = options;
        const controller = await this.registryDgt();
        const tcx = await controller.mkTxnActivatingNode(node);
        return this.submitTxnWithBlock(tcx, {
            expectError,
        });
    }



    async updateSettings(
        settings: FoundDatumUtxo<ErgoProtocolSettings, any>,
        options: {
            submit?: boolean;
            txnName?: string;
            updatedFields: Partial<minimalData<ErgoProtocolSettings>>;
        },
    ) {
        const {
            submit = true,
            txnName = "test helper settings update",
            updatedFields = {},
        } = options;
        const settingsController = await this.capo.getSettingsController({
            charterData: await this.capo.findCharterData(),
        });
        const tcx = settingsController.mkTxnUpdateRecord(txnName, settings, {
            activity: settingsController.activity.SpendingActivities.UpdatingRecord(
                settings.data!.id,
            ),
            updatedFields: {
                ...updatedFields,
            },
        });
        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx);
    }
}
