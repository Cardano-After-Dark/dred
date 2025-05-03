// This is a template file - EJS syntax is used
import { makeTxOutput, makeValue, type Value } from "@helios-lang/ledger";
import {
    Activity,
    DelegatedDataContract,
    hasReqts,
    StellarTxnContext,
} from "@donecollectively/stellar-contracts";
import type {
    FoundDatumUtxo,
    AnyDataTemplate,
    hasSeed,
    hasSettingsRef,
    minimalData,
} from "@donecollectively/stellar-contracts";

import NeighborhoodBundle from "./Neighborhood.hlb.js";
import type { DredCapo } from "../DredCapo.js";
import type { ErgoNeighborhoodData, NeighborhoodDataLike } from "./Neighborhood.typeInfo.js";
import NeighborhoodPolicyDataBridge from "./Neighborhood.bridge.js";

export type PartialPartialData<T extends AnyDataTemplate<any, any>> = Partial<{
    [K in keyof T]: T[K] extends Array<any>
        ? T[K]
        : T[K] extends Record<any, any>
        ? Partial<T[K]>
        : T[K];
}>;

export type minimalNeighborhoodData = minimalData<ErgoNeighborhoodData>;

export type partialMinimalData<T extends AnyDataTemplate<any, any>> =
    PartialPartialData<minimalData<T>>;

export class NeighborhoodController extends DelegatedDataContract<
    ErgoNeighborhoodData,
    NeighborhoodDataLike
> {
    dataBridgeClass = NeighborhoodPolicyDataBridge;

    scriptBundle() {
        return NeighborhoodBundle.create();
    }
    idPrefix = "nbhd";

    get delegateName() {
        return "nbhRegistry";
    }

    get recordTypeName() {
        return "dredNbh";
    }

    exampleData(): minimalNeighborhoodData {
        return {
            // id: "nbhd-0000000000",
            // type: "dredNbh",
            memberToken: "member-owner",
            name: "Default Neighborhood",
            description: "A default neighborhood for Dred services",

            appInfo: {
                url: "https://dred.com",
                revenueModel: [
                    {
                        TransactionBased: {
                            chargeTo: {
                                EndUser: {}
                            },
                            minTxFee: makeValue(42_000_000n),
                            maxTxFee: undefined
                        }
                    }
                ]
            },
            opsInfo: {
                minNodes: 3n,
                maxNodes: 13n,
                minNodeOperatorStake: makeValue(42_000_000n),
                minUptime: 90n,
            }
        };
    }

    get capo() : DredCapo {
        return super.capo as unknown as DredCapo;
    }

    async mkTxnRegisteringNode(
        this: NeighborhoodController,
        nodeReg: minimalNeighborhoodData,
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

    requirements() {
        return hasReqts({
            // todo
        });
    }
}
