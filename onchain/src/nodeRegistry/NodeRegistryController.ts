import { makeDummyPubKey, makePubKey, makeTxOutput, makeValue, type PubKeyHash, type Value } from "@helios-lang/ledger";
import {
    Activity,
    DelegatedDataContract,
    hasReqts,
    StellarTxnContext,
    textToBytes,
} from "@donecollectively/stellar-contracts";
import type {
    FoundDatumUtxo,
    AnyDataTemplate,
    hasSeed,
    hasSettingsRef,
    minimalData,
    anyState,
    DgDataUpdateOptions,
} from "@donecollectively/stellar-contracts";

import NodeRegistryBundle from "./NodeRegistry.hlb.js";
import type { DredCapo } from "../DredCapo.js";
import type { ErgoNodeRegistrationData, NodeRegistrationData, NodeRegistrationDataLike, minimalNodeRegistrationData } from "./NodeRegistry.typeInfo.js";
import DredNodeRegistryPolicyDataBridge from "./NodeRegistry.bridge.js";

export type PartialPartialData<T extends AnyDataTemplate<any, any>> = Partial<{
    [K in keyof T]: T[K] extends Array<any>
        ? T[K]
        : T[K] extends Record<any, any>
        ? Partial<T[K]>
        : T[K];
}>;

// export type minimalNodeRegistrationData = minimalData<ErgoNodeRegistrationData>;

export type partialMinimalData<T extends AnyDataTemplate<any, any>> =
    PartialPartialData<minimalData<T>>;

export class NodeRegistryController extends DelegatedDataContract<
    ErgoNodeRegistrationData,
    NodeRegistrationDataLike
> {
    dataBridgeClass = DredNodeRegistryPolicyDataBridge;

    scriptBundle() {
        return NodeRegistryBundle.create();
    }
    idPrefix = "dredNode";

    get delegateName() {
        return "nodeRegistry";
    }

    get recordTypeName() {
        return "DredNode";
    }

    exampleData(): minimalNodeRegistrationData {
        const nodePublicKey = makeDummyPubKey();
        const pubKeyHash = nodePublicKey.hash();

        return {       
            // id: textToBytes("dredNode-1234"),
            // type: "dredNode",

            memberToken: "member-1234",
            nodeDetails: {
                address: "1.2.4.3.example.com",
                port: 13337n,
                pubKey: nodePublicKey,
                pubKeyHash
            },
            state: { NeedsValidation: [] },
        };
    }

    get capo() : DredCapo {
        return super.capo as unknown as DredCapo;
    }

    async mkTxnRegisteringNode(
        this: NodeRegistryController,
        nodeReg: minimalNodeRegistrationData,
        // initialVaultStake: bigint,
        initialTcx?: StellarTxnContext
    ) {
        const mintDelegate = await this.capo.getMintDelegate();
        const {capo} = this
        const tcx0 = initialTcx || this.mkTcx(
            "registering dred node"
        );

        const tcx1 = await capo.mkTxnWithMemberInfo(undefined, tcx0);
        
        const capoUtxos = await capo.findCapoUtxos();
        const charterData = await capo.findCharterData(undefined, {
            capoUtxos,
            optional: false,
        });
        const tcx2 = await capo.tcxWithSettingsRef(tcx1, {
            capoUtxos,
            charterData,
        });


        // const tcx = await this.capo.mkTxnWithMemberInfo();
        return this.mkTxnCreateRecord(
            {
                activity:
                    this.activity.MintingActivities.$seeded$CreatingRecord,
                data: {
                    ...nodeReg,
                    memberToken: tcx2.state.memberToken.name,
                },
                // addedUtxoValue: makeValue(initialVaultStake),
            },
            tcx2
        ).then((tcx) => tcx)
    }

    async mkTxnActivatingNode(
        item: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>,
        options: Omit<DgDataUpdateOptions<NodeRegistrationDataLike>, "activity"> & {
            activity?: DgDataUpdateOptions<NodeRegistrationDataLike>["activity"]
        }={updatedFields: {}},
        initialTcx?: StellarTxnContext<anyState> | undefined
    ) {
        const tcx0 = initialTcx || this.mkTcx(
            "activating dred node"
        );
        tcx0.addSigners(this.actorContext.wallet.pubKey.hash());

        if (!item.data) {
            debugger
            throw new Error("node not found");
        }
        return this.mkTxnUpdatingNodeRegistration("activating dred node", item, {
            ...options,
            withMemberToken: false,
            activity: this.activity.SpendingActivities.ActivatingNode(item.data!.id),
            updatedFields: {
                state: { Active: tcx0.txnTime.getTime() } ,
                ...options.updatedFields,
            }
        }, tcx0)
    }

    async mkTxnUpdatingNodeRegistration( 
        txnName: string, 
        item: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>, 
        options: Omit<DgDataUpdateOptions<
            NodeRegistrationDataLike
        >, "activity"> & {
            activity?: DgDataUpdateOptions<NodeRegistrationDataLike>["activity"],
            withMemberToken?: boolean,
        }, 
        initialTcx?: StellarTxnContext<anyState> | undefined
    ): Promise<StellarTxnContext<anyState>> {
        const tcx0 = initialTcx || this.mkTcx(
            "registering dred node"
        );
        const withMemberToken = options.withMemberToken ?? true;
        const tcx1 = withMemberToken ? await this.capo.mkTxnWithMemberInfo(undefined, tcx0) : tcx0;

        const capoUtxos = await this.capo.findCapoUtxos();
        const tcx2 = await this.capo.tcxWithSettingsRef(tcx1, {
            capoUtxos: capoUtxos,
            charterData: await this.capo.findCharterData(undefined, {
                capoUtxos,
                optional: false,
            }),
        })

        return super.mkTxnUpdateRecord(txnName, item, {
            // default activity
            activity: this.activity.SpendingActivities.UpdatingRecord(item.data!.id),
            // ..., can be overridden by options
            ...options,
        }, tcx2)
    }

    async mkTxnValidatingNode(
        txnName: string,
        item: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>,
        options: Omit<DgDataUpdateOptions<NodeRegistrationDataLike>, "activity" | "updatedFields"> & {
            validatorPkh: PubKeyHash
        },
        initialTcx?: StellarTxnContext<anyState> | undefined
    ): Promise<StellarTxnContext<anyState>> {
        const { validatorPkh } = options;
        const tcx0 = initialTcx || this.mkTcx(
            "validating dred node"
        );
        const existingNeedsValidation = (item.data?.state as any).NeedsValidation;
        if (!existingNeedsValidation) throw new Error("node is not in need of validation");

        const tcx1 = await this.mkTxnUpdatingNodeRegistration(txnName, item, {
            ...options,
            withMemberToken: false,
            updatedFields: {
                state: {
                    NeedsValidation: [validatorPkh, ...existingNeedsValidation],
                },
            },
            activity: this.activity.SpendingActivities.ValidatingNode({
                id: item.data!.id,
                validatorPkh,
            }),
        }, tcx0);
        tcx1.addSigners(validatorPkh);

        return tcx1;
    }

    requirements() {
        return hasReqts({
            // todo
        });
    }
}
