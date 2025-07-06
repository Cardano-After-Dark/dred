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
    DgDataUpdateOptions,
} from "@donecollectively/stellar-contracts";

import NeighborhoodRegistryBundle from "./NeighborhoodRegistry.hlb.js";
import type { DredCapo } from "../DredCapo.js";
import type { ErgoNeighborhoodData, minimalNeighborhoodData, NeighborhoodData, NeighborhoodDataLike } from "./NeighborhoodRegistry.typeInfo.js";
import NeighborhoodPolicyDataBridge from "./NeighborhoodRegistry.bridge.js";

export type PartialPartialData<T extends AnyDataTemplate<any, any>> = Partial<{
    [K in keyof T]: T[K] extends Array<any>
        ? T[K]
        : T[K] extends Record<any, any>
        ? Partial<T[K]>
        : T[K];
}>;

// export type partialMinimalData<T extends AnyDataTemplate<any, any>> =
//     PartialPartialData<minimalData<T>>;

export class NeighborhoodController extends DelegatedDataContract<
    ErgoNeighborhoodData,
    NeighborhoodDataLike
> {
    dataBridgeClass = NeighborhoodPolicyDataBridge;

    scriptBundle() {
        return NeighborhoodRegistryBundle.create();
    }
    idPrefix = "nbhd";

    get delegateName() {
        return "nbhRegistry";
    }

    get recordTypeName() {
        return "DredNbh";
    }

    exampleData(): minimalNeighborhoodData {
        return {
            // id: "nbhd-0000000000",
            // type: "dredNbh",
            memberToken: "member-owner",
            state: {Preproduction: {}},
            appInfo: {
                name: "Default Neighborhood",
                description: "A default neighborhood for Dred services",
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
            updateInfo: undefined,
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

    async mkTxnRegisteringNeighborhood(
        this: NeighborhoodController,
        nbhReg: minimalNeighborhoodData,
        initialTcx?: StellarTxnContext
        // initialVaultStake: bigint
    ) {
        const mintDelegate = await this.capo.getMintDelegate();
        const {capo} = this

        const tcx0 = initialTcx || this.mkTcx(
            "registering dred neighborhood"
        );

        const tcx1 = await capo.mkTxnWithMemberInfo(undefined, tcx0);
        return this.mkTxnCreateRecord(
            {
                activity:
                    this.activity.MintingActivities.$seeded$CreatingRecord,
                data: {
                    ...nbhReg,
                    memberToken: tcx1.state.memberToken.name,
                },
                // addedUtxoValue: makeValue(initialVaultStake),
            },
            tcx1
        );
    }

    async mkTxnUpdatingNeighborhood(
        this: NeighborhoodController,
        txnName: string,
        nbh: FoundDatumUtxo<ErgoNeighborhoodData | NeighborhoodData>,
        options: Omit<DgDataUpdateOptions<
        NeighborhoodDataLike>, "activity"> & {
            activity?: DgDataUpdateOptions<NeighborhoodDataLike>["activity"]
        },
        initialTcx?: StellarTxnContext,
    ) {
        const {
            activity = this.activity.SpendingActivities.UpdatingRecord(nbh.data!.id),
            ...otherOptions
        } = options
        const tcx0 = initialTcx || this.mkTcx(
            "updating dred neighborhood"
        );
        const tcx1 = await this.capo.mkTxnWithMemberInfo(undefined, tcx0);
        
        return this.mkTxnUpdateRecord(
            txnName, nbh,
            {
                activity: activity,
                ...otherOptions
            },
            tcx1
        );
    }

    requirements() {
        return hasReqts({
            // todo
        });
    }
}
