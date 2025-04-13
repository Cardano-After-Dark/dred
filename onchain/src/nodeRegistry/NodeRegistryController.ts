import { makeTxOutput, makeValue, type Value } from "@helios-lang/ledger";
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
import type { ErgoNodeRegistrationData, NodeRegistrationData, NodeRegistrationDataLike } from "./NodeRegistry.typeInfo.js";
import DredNodeRegistryPolicyDataBridge from "./NodeRegistry.bridge.js";

export type PartialPartialData<T extends AnyDataTemplate<any, any>> = Partial<{
    [K in keyof T]: T[K] extends Array<any>
        ? T[K]
        : T[K] extends Record<any, any>
        ? Partial<T[K]>
        : T[K];
}>;

export type minimalNodeRegistrationData = minimalData<ErgoNodeRegistrationData>;

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
        return "NodeRegistryDgt";
    }

    get recordTypeName() {
        return "DredNode";
    }

    exampleData(): minimalNodeRegistrationData {
        return {       
            // id: textToBytes("dredNode-1234"),
            // type: "dredNode",

            // status: "active",
            lastHeartbeat: 0,
            memberToken: "member-1234",
            nodeAddress: "1.2.4.3.example.com",
            nodePort: 13337n,

            // bad data, but good enough for being a lame example.  
            // It should be a valid Ed25519 public key, expressed as a numeric array
            nodePublicKey: textToBytes("0x1234567890abcdef"),
        };
    }

    get capo() : DredCapo {
        return super.capo as unknown as DredCapo;
    }

    async mkTxnRegisteringNode(
        this: NodeRegistryController,
        nodeReg: minimalNodeRegistrationData,
        // initialVaultStake: bigint
    ) {
        const mintDelegate = await this.capo.getMintDelegate();

        // const tcx = await this.capo.mkTxnWithMemberInfo();
        return this.mkTxnCreateRecord(
            {
                activity:
                    this.activity.MintingActivities.$seeded$CreatingRecord,
                data: {
                    ...nodeReg,
                    // memberToken: tcx.state.memberToken.name,
                },
                // addedUtxoValue: makeValue(initialVaultStake),
            },
            // tcx
        );
    }

    async mkTxnUpdatingNodeRegistration( 
        txnName: string, 
        item: FoundDatumUtxo<NodeRegistrationData, any>, 
        options: DgDataUpdateOptions<
            NodeRegistrationDataLike
        >, 
        tcx?: StellarTxnContext<anyState> | undefined
    ): Promise<StellarTxnContext<anyState>> {
        return super.mkTxnUpdateRecord(txnName, item, options, tcx)
    }

    requirements() {
        return hasReqts({
            // todo
        });
    }
}
