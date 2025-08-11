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
    type anyState,
    type FoundDatumUtxo,
    type hasSeedUtxo,
    type minimalData,
    type SubmitOptions,
    type UutName,
} from "@donecollectively/stellar-contracts";

// this
import { DredCapo } from "./DredCapo.js";

import { vi } from "vitest";

// import types as needed
import type { hasMemberToken } from "stellar-tokenomics";
import type { 
    minimalNodeRegistrationData, 
    NodeRegistrationData, 
    NodeRegistrationDataLike 
} from "./nodeRegistry/NodeRegistry.typeInfo.js";
import type { 
    ErgoProtocolSettings    
 } from "./settings/ProtocolSettings.typeInfo.js";

export let helperState: TestHelperState<DredCapo> = {
    snapshots: {},
} as any;

export type DredCapo_TC = StellarTestContext<DredCapoTestHelper> & {
    helperState: typeof helperState;
    snapshot(this: DredCapo_TC, snapName: string): void;
    loadSnapshot(this: DredCapo_TC, snapName: string): void;
    reusableBootstrap(this: DredCapo_TC): Promise<DredCapo>;
};

export class DredCapoTestHelper extends DefaultCapoTestHelper.forCapoClass(
    DredCapo
) {
    get stellarClass() {
        return DredCapo;
    }

    get capo(): DredCapo {
        return this.strella
    }

    async setupActors() {
        await super.setupActors();
        this.ts("setupActors");

        // Add messaging nodes
        this.addActor("ned", 10_000n * ADA);
        this.addActor("nellie", 12_000n * ADA);
        this.addActor("natalia", 8_000n * ADA);

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
        if (!member) throw new Error(
            `to mock the member token out of a tx, the member token must first exist.\n`+
            `... use await h.participantSelfRegisters() to create the member token`
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
        await this.bootstrap()
        await this.setActor("ned");
        const tcx = await this.capo.mkTxnMintParticipantToken(
            this.wallet.address
        );

        await this.submitTxnWithBlock(tcx);
    }

    async participantSelfRegisters() {
        await this.bootstrap()

        if (this.actorName == "operator") {
            throw new Error("use h.currentActor = '...', to register with a named participant");
        }
        const { capo, wallet } = this;
        console.log("--------------------------- "+this.relativeTs +" Test helper: Create collaborator token");
        const tcx = await capo.mkTxnMintParticipantToken(
            wallet.address
        );

        return this.submitTxnWithBlock(tcx);
    }

    @CapoTestHelper.hasNamedSnapshot("firstNode", "ned")
    async snapToFirstRegisteredNode() {
        throw new Error("never called");
        this.firstRegisteredNode();
    }

    async firstRegisteredNode() {
        this.setActor("ned");
        await this.snapToFirstMember();
        const controller = await this.registryDgt();
        const node = controller.exampleData();
        return this.createNode(node);
    }

    async createNode(
        node: minimalNodeRegistrationData,
        options: {
            submit?: boolean;
        } = {}
    ) {
        const { submit = true } = options;

        const registryDgt = await this.registryDgt();
        const tcx = await registryDgt.mkTxnRegisteringNode(node)
            // activity: mktSaleDgt.activity.MintingActivities.$seeded$CreatingRecord
        // });

        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx);
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
        const nodes = await registryDgt.findRecords()
        if (nodes.length > 1) {
            throw new Error("expected only one node");
        }
        return nodes[0];
    }

    async updateNode(node: FoundDatumUtxo<NodeRegistrationData, any>, options: {
        submit?: boolean;
        txnName?: string;
        updatedFields?: Partial<minimalData<NodeRegistrationDataLike>>;
    } = {}) {
        const { submit = true, txnName = "test helper node update", updatedFields = {} } = options;
        const registryDgt = await this.registryDgt();
        const tcx = await registryDgt.mkTxnUpdatingNodeRegistration(txnName, node, {
            updatedFields: {
                ...updatedFields,
            },            
        });
        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx);
    }

    async updateSettings(
        settings: FoundDatumUtxo<ErgoProtocolSettings, any>,
        options: {
            submit?: boolean;
            txnName?: string;
            updatedFields: Partial<minimalData<ErgoProtocolSettings>>
        }
    ) {
        const { submit = true, txnName = "test helper settings update", updatedFields = {} } = options;
        const settingsController = await this.capo.getSettingsController({
            charterData: await this.capo.findCharterData(),
        });
        const tcx = settingsController.mkTxnUpdateRecord(txnName, settings, {
            activity: settingsController.activity.SpendingActivities.UpdatingRecord(settings.data!.id),
            updatedFields: {
                ...updatedFields,
            },            
        });
        if (!submit) return tcx;
        return this.submitTxnWithBlock(tcx);
    }
}
