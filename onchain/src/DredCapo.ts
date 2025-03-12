import {
    makeMintingPolicyHash,
    makeValue,
    type MintingPolicyHash,
    type MintingPolicyHashLike,
    type TxInput,
} from "@helios-lang/ledger";
import { makeByteArrayData, makeMapData } from "@helios-lang/uplc";
import type {
    CapoHeliosBundle,
    CharterData,
    charterDataState,
    FoundDatumUtxo,
    hasBootstrappedCapoConfig,
} from "@donecollectively/stellar-contracts";
import {
    AuthorityPolicy,
    StellarTxnContext,
    defineRole,
    mergesInheritedReqts,
    txn,
    delegateRoles,
    mkValuesEntry,
    textToBytes,
    type hasAddlTxns,
    type TxDescription,
    type MultiTxnCallback,
    TxNotNeededError,
    Capo,
    hasReqts,
} from "@donecollectively/stellar-contracts";
import { ProtocolSettingsController } from "./settings/ProtocolSettingsController.js";
import DredCapoBundle from "./DredCapo.hlb.js";

import { MyMintSpendDelegate } from "./MyMintSpendDelegate.js";

import type {
    ErgoProtocolSettings,
    minimalProtocolSettings,
    ProtocolSettings,
} from "./settings/ProtocolSettings.typeInfo.js";

// import { FundedPurposeController } from "../FundedPurpose/FundedPurposeController.js";
// import { MarketSaleController } from "../MarketSale/MarketSaleController.js";
import type { CapoDatum$Ergo$CharterData } from "./DredCapo.typeInfo.js";
import { NodeRegistryController } from "./nodeRegistry/NodeRegistryController.js";

const currentVersions = {
    nodeReg: "nodeRegPolV1" as const,
    mktSalePol: "mktSalePolV1" as const,
    fPurpPol: "fPurpPolV1" as const,
    settingPol: "settingPolV1" as const,
};

const useAll = {
    nodeOpReg: true,
    mktSale: false,
    fundedPurpose: false,
};

const setup: typeof useAll = {
    fundedPurpose: false,
    mktSale: false,
    nodeOpReg: true,
};

export type Expand<T> = T extends (...args: infer A) => infer R
    ? (...args: Expand<A>) => Expand<R>
    : T extends infer O
    ? { [K in keyof O]: O[K] }
    : never;

// export type DredSettings = ErgoProtocolSettings;

/**
 * @public
 */
export class DredCapo extends Capo<DredCapo> {
    // ttt : number
    // constructor(...args) {
    //     super(...args)
    //     this.ttt = 1 + instanceCount++
    // }
    scriptBundle(): CapoHeliosBundle {
        return DredCapoBundle.create({
            setup: this.setup,
        });
    }

    // todo: remove this when the base method gives better type
    async findSettingsInfo(options: {
        charterData: CharterData;
        capoUtxos?: TxInput[];
    }): Promise<FoundDatumUtxo<ErgoProtocolSettings, ProtocolSettings>> {
        return super.findSettingsInfo(options) as any;
    }

    async getMintDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<MyMintSpendDelegate> {
        return super.getMintDelegate(charterData) as any;
    }

    async getSpendDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<MyMintSpendDelegate> {
        return super.getSpendDelegate(charterData) as any;
    }

    // for DRED:
    // /**
    //  * @public
    //  */
    // async getNodeRegistryController(
    //     charterData: CharterData
    // ): Promise<NodeRegistryController> {
    //     return this.getDgDataController("nodeReg") as any;
    // }

    async getSettingsController(options: {
        charterData: CharterData;
        optional?: true;
    }): Promise<ProtocolSettingsController> {
        return this.getDgDataController("settings", options) as any;
    }

    async mkInitialSettings(): Promise<minimalProtocolSettings> {
        return {
            nodeOpSettings: {
                minHeartbeatInterval: BigInt(72 * 60 * 60 * 1000),
            },
        };
    }

    async findNodeOpVaultEntries() {
        return this.findDelegatedDataUtxos({
            type: "dredNode",
        });
    }

    initDelegateRoles() {
        const inh = super.basicDelegateRoles();

        const { mintDelegate: parentMD, spendDelegate, govAuthority } = inh;

        const myDelegates = delegateRoles({
            govAuthority,
            spendDelegate: defineRole("spendDgt", MyMintSpendDelegate, {}),
            mintDelegate: defineRole("mintDgt", MyMintSpendDelegate, {}),
            settings: defineRole("dgDataPolicy", ProtocolSettingsController, {}),
            nodeOpRegistry: defineRole(
                "dgDataPolicy",
                NodeRegistryController, {}
            ),

            // optional tokenomics features:
            // mktSale: defineRole(
            //     "dgDataPolicy",
            //     MarketSaleController, {}
            // ),
            // needs to stay disabled until it can have access to TieredScale:
            // fundedPurpose: defineRole(
            //     "dgDataPolicy",
            //     FundedPurposeController,
            //     {}
            // ),

        });
        return myDelegates;
    }


    async txnMintingFungibleTokens<TCX extends StellarTxnContext>(
        tcx: TCX,
        tokenName: string | number[],
        tokenCount: bigint
    ) {
        // todo: allow this by explicit commission of the token,
        //   ... with minting details found in that token-commission

        if (typeof tokenName === "string") {
            tokenName = textToBytes(tokenName);
        }
        const mintDgt = await this.getMintDelegate();
        const tcx2 = await this.tcxWithCharterRef(tcx);
        const tcx2a = await this.txnAddGovAuthority(tcx2);
        const minter = this.minter;

        return minter.txnMintWithDelegateAuthorizing(
            tcx2a,
            [mkValuesEntry(tokenName, tokenCount)],
            mintDgt,
            mintDgt.activity.MintingActivities.MintingFungibleTokens(tokenName)
        );
    }

    mkConfigData() {
        throw new Error(`unused, but a basic example of how to create a MapData object`);
        const uplcMap = makeMapData([
            [makeByteArrayData(textToBytes("id")), makeByteArrayData(textToBytes("set"))],
        ]);
        return uplcMap;
    }

    todoAddNamedDelegates() {
        const delegates = {
            // artistVault: capo.mkOnchainDelegateLink(
            //     d.delegates.artistVault
            // ),
            // listenerVault: capo.mkOnchainDelegateLink(
            //     d.delegates.listenerVault
            // ),
            // nodeOpVault: capo.mkOnchainDelegateLink(
            //     d.delegates.nodeOpVault
            // ),
            // otherActorVault: capo.mkOnchainDelegateLink(
            //     d.delegates.otherActorVault
            // ),
        };
    }

    // get customCapoSettingsModule() {
    //     return TokenomicsSettings.heliosModule;
    // }

    // /**
    //  * inspects the current charter and submits any txns needed to
    //  * create any missing delegate validators
    //  * @remarks
    //  * TODO: determine if there is a place for an essential reusable utility
    //  * like this (following declarations of data delegates), or whether the
    //  * imperative style is really needed as in the mkAdditionalTxnsForCharter impl below
    //  * @public
    //  */
    // async mkTxnsForNeededDelegates() {
    //     const charterData = await this.findCharterData();

    //     const tcx = this.mkTcx("addlTxns") as Awaited<
    //         ReturnType<this["mkTxnMintCharterToken"]>
    //     >;

    //     const withMoreTxns = await this.mkAdditionalTxnsForCharter(tcx, charterData);
    //     return withMoreTxns.queueAddlTxns();
    // }

    async mkAdditionalTxnsForCharter<TCX extends hasAddlTxns<StellarTxnContext<any>>>(
        this: DredCapo,
        tcx: TCX,
        options: {
            charterData: CharterData;
            capoUtxos: TxInput[];
        }
    ) {

        await this.setupFundedPurpose(tcx, options);
        await this.setupMarketSale(tcx, options);
        await this.setupNodeRegistry(tcx, options);

        return tcx;
    }

    async setupFundedPurpose(
        this: DredCapo,
        tcx: StellarTxnContext,
        options: {
            charterData: CharterData;
            capoUtxos: TxInput[];
        }
    ) {
        const { charterData, capoUtxos } = options;

        if (setup.fundedPurpose) {
            const fpDgt = await this.getDgDataController("fundedPurpose", {
                charterData,
                optional: true,
            });
            if (!fpDgt) {
                tcx.includeAddlTxn("fpurpDelegate", {
                    description: "creates funded-purpose policy",
                    moreInfo: "sets up delegate for funded purposes",
                    optional: false,
                    mkTcx: async () => {
                        console.log("BBBBBBBBBBBBBBBBBB 🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞");

                        const mkFpcTxn = await this.mkTxnInstallingPolicyDelegate({
                            policyName: "fundedPurpose",
                            idPrefix: "fPurp",
                            charterData,
                        });
                        console.log("bbbbbbbbbbbbbbbbbb 🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞");
                        console.log(
                            "    --- 🐞🐞🐞 creating funded-purpose policy"
                            // mkFpcTxn.dump()
                        );
                        return mkFpcTxn;
                    },
                });
                // pendingDgtChanges++;
            }
        }
    }

    async setupMarketSale(
        this: DredCapo,
        tcx: StellarTxnContext,
        options: {
            charterData: CharterData;
            capoUtxos: TxInput[];
        }
    ) {
        const { charterData, capoUtxos } = options;
        if (setup.mktSale) {
            const mktSaleDgt = await this.getDgDataController("mktSale", {
                charterData,
                optional: true,
            });
            if (!mktSaleDgt) {
                console.log("3333333333333333333 🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞");
                tcx.includeAddlTxn("make mktSale policy", {
                    description: "creates mktSale policy",
                    moreInfo: "sets up on-chain script for market sales",
                    optional: false,
                    mkTcx: async () => {
                        console.log("CCCCCCCCCCCCCCCCCCCCC 🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞");
                        const charterData = await this.findCharterData();
                        const mkMscTxn = await this.mkTxnInstallingPolicyDelegate({
                            policyName: "mktSale",
                            idPrefix: "mktSale",
                            charterData,
                        });
                        // await this.mkTxnCreateDelegateMarketSalePolicy();
                        console.log(
                            "cccccccccccccccccccccccc 🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞🐞"
                        );

                        console.log(
                            "    --- 🐞🐞🐞 creating market sale policy"
                            // mkMscTxn.dump()
                        );
                        return mkMscTxn;
                    },
                });
            }
        }
    }

    async setupNodeRegistry(
        this: DredCapo,
        tcx: StellarTxnContext,
        options: {
            charterData: CharterData;
            capoUtxos: TxInput[];
        }
    ) {
        const { charterData, capoUtxos } = options;
        if (setup.nodeOpReg) {
            const nodeOpRegistry = await this.getDgDataController("nodeOpReg", {
                charterData,
                optional: true,
            });

            if (!nodeOpRegistry) {
                tcx.includeAddlTxn("make nodeRegistry delegate", {
                    description: "creates nodeRegistry",
                    moreInfo:
                        "sets up registry for node operators to file and maintain their node registrations",
                    optional: false,
                    mkTcx: () =>
                        this.mkTxnInstallingPolicyDelegate({
                            policyName: "nodeRegistry",
                            idPrefix: "dredNode",
                            charterData,
                        }),
                });
            }
        }
    }

    // @txn
    // async mkTxnCreateDelegateMarketSalePolicy<
    //     THIS extends StellarTokenomics<any>,
    //     TCX extends StellarTxnContext = StellarTxnContext
    // >(this: THIS, tcx: TCX = this.mkTcx() as TCX) {
    //     const mintDelegate = await this.getMintDelegate();
    //     const tcx1 = await this.tcxWithSeedUtxo(tcx);
    //     const tcx2 = await this.mkTxnInstallingPolicyDelegate( "mktSalePolicy")

    //     // const tcx2 = await this.mkTxnAddingNamedDelegate(
    //     //     "mktSaleCtrl",
    //     //     {
    //     //         config: {},
    //     //         mintSetup: {
    //     //             mintDelegateActivity:
    //     //                 mintDelegate.activityCreatingDataDelegate(
    //     //                     tcx1,
    //     //                     "mktSaleCtrl"
    //     //                 ),
    //     //         },
    //     //     },
    //     //     tcx1
    //     // );
    //     return tcx2 as TCX & typeof tcx2;
    // }

    // @txn
    // async mkTxnCreateDelegateFundedPurposePolicy<
    //     THIS extends StellarTokenomics<any>,
    //     TCX extends StellarTxnContext = StellarTxnContext
    // >(this: THIS, tcx: TCX = this.mkTcx() as TCX) {
    //     const mintDelegate = await this.getMintDelegate();

    //     const tcx2 = await this.mkTxnInstallingPolicyDelegate( "fPurpPolicy")
    //     //     {
    //     //         // strategyName: "fPurpV1",
    //     //         config: {},
    //     //         mintSetup: {
    //     //             mintDelegateActivity:
    //     //                 mintDelegate.activityCreatingDataDelegate(
    //     //                     tcx1,
    //     //                     "fPurpCtrl"
    //     //                 ),
    //     //         },
    //     //     },
    //     //     tcx1
    //     // );
    //     return tcx2 as TCX & typeof tcx2;
    // }

    requirements() {
        const baseTokenomics = super.requirements();
        return mergesInheritedReqts(baseTokenomics, {
            "has custom settings for protocol parameters": {
                purpose: "sets up particular points of adjustability for operational policies",
                details: [
                    "Arranges details including expiration period for node registrations, ",
                    "  ... so clients and node operator (software) can reference them and make adjustments",
                    "The configuration details can be stored in a separate script. ",
                    "The transaction-builder references the config record in txns needing to access it. ",
                    "On-chain scripts needing to read the config ('client scripts') can find it as a refInput to the txn. ",
                    "By using a CIP-68-style struct, the config's structure can be be upgraded, ",
                    "  ... allowing new scripts needing new configs to get those new configs, ",
                    "  ... while leaving its existing client scripts unmodified, ",
                ],
                mech: [
                    "has an initial discount scale for artists and listeners",
                    "has staking-reward settings",
                    "provides a 'settings' struct in a module that other contracts import to access parameters",
                ],
                requires: ["can update the settings"],
            },

            "can update the settings": {
                purpose: "to allow for future adjustments to protocol parameters",
                details: [
                    "When the settings are updated, the new settings are used in all future transactions referencing settings`",
                ],
                mech: [
                    "applies the new settings on-chain",
                    "won't update the settings without capo govAuthority approval",
                ],
            },

            "Provides a Node Operator registry, in which node operators can maintain their node registrations":
                {
                    purpose: "so node operators can publish their server availability",
                    details: ["Node operators can join the network and contribute capacity."],
                    mech: [
                        "Allows registering a node operator record with the DRED.nodeOperator token",
                        "Registers the member-* id with the node registration record",
                    ],
                    requires: [],
                },
        });
    }
}
