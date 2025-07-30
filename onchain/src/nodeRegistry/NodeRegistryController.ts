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

/**
 * @public
 */
export class NodeRegistryController extends DelegatedDataContract<
    ErgoNodeRegistrationData,
    NodeRegistrationDataLike
> {
    dataBridgeClass = DredNodeRegistryPolicyDataBridge;

    scriptBundle() {
        return NodeRegistryBundle.create();
    }
    idPrefix = "dredNode" as const;

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
            "register dred node"
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

        const nodeReg2 : minimalNodeRegistrationData = {
            ...nodeReg,
            nodeDetails: {
                ...nodeReg.nodeDetails,
                pubKeyHash: makePubKey(nodeReg.nodeDetails.pubKey).hash(),
            },
        };

        // const tcx = await this.capo.mkTxnWithMemberInfo();
        return this.mkTxnCreateRecord(
            {
                activity:
                    this.activity.MintingActivities.$seeded$CreatingRecord,
                data: {
                    ...nodeReg2,
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
            "update node registration"
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

        const pubKey = options.updatedFields.nodeDetails?.pubKey ?? item.data?.nodeDetails.pubKey;
        if (!pubKey) throw new Error("missing required pubKey");

        return super.mkTxnUpdateRecord(txnName, item, {
            // default activity
            activity: this.activity.SpendingActivities.UpdatingRecord(item.data!.id),
            // ..., can be overridden by options
            ...options,
            updatedFields: {
                ...options.updatedFields,
                nodeDetails: {
                    ...item.data!.nodeDetails,
                    ...options.updatedFields.nodeDetails,
                    pubKey: makePubKey(pubKey).toHex(),
                }
            }
        }, tcx2)
    }

    async mkTxnValidatingNode(
        txnName: string,
        item: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>,
        options: Omit<DgDataUpdateOptions<NodeRegistrationDataLike>, "activity" | "updatedFields"> & {
            validatorReg: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>
        },
        initialTcx?: StellarTxnContext<anyState> | undefined
    ): Promise<StellarTxnContext<anyState>> {
        // const { validatorPkh } = options;

        const tcx0 = initialTcx || this.mkTcx(
            "validating dred node"
        );
        const existingNeedsValidation = (item.data?.state as any).NeedsValidation;
        if (!existingNeedsValidation) throw new Error("node is not in need of validation");

        const { validatorReg } = options;        

        const tcx1 = await this.addValidatorRef(tcx0, validatorReg);

        const tcx2 = await this.mkTxnUpdatingNodeRegistration(txnName, item, {
            ...options,
            withMemberToken: false,
            updatedFields: {
                state: {
                    NeedsValidation: [validatorReg.data!.id, ...existingNeedsValidation],
                },
            },
            activity: this.activity.SpendingActivities.ValidatingNode({
                id: item.data!.id,
                validatorId: validatorReg.data!.id,
            }),
        }, tcx1);
        tcx2.addSigners(validatorReg.data!.nodeDetails.pubKeyHash);

        return tcx2;
    }

    addValidatorRef(tcx: StellarTxnContext<anyState>, validatorReg: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>) {
        const foundPkh = validatorReg.data!.nodeDetails.pubKeyHash;
        if (!foundPkh) throw new Error("validator's node-reg record has no pubKeyHash");

        const actorPkh: PubKeyHash = this.wallet.pubKey.hash();
        if (!foundPkh.isEqual(actorPkh)) {
            console.log("validator's node-reg record has a different pubKeyHash");
            console.log("validator's registration -> pkh: ", foundPkh.toString());
            console.log("actorPkh: ", actorPkh.toString());
            throw new Error("validator's node-reg record has a different pubKeyHash");
        }

        return tcx.addRefInput(validatorReg.utxo)
    }

    requirements() {
        return hasReqts({
            // todo
        });
    }
}
