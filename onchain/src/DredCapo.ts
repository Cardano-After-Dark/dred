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
import { NeighborhoodController } from "./DredNeighborhood/NeighborhoodController.js";
import type {
    ErgoNodeRegistrationData,
    NodeRegistrationData,
} from "src/nodeRegistry/NodeRegistry.typeInfo.js";
import type { ErgoNeighborhoodData } from "src/DredNeighborhood/Neighborhood.typeInfo.js";
/* Add imports for each model-specific controller class here */

const currentVersions = {
    nodeReg: "nodeRegPolV1" as const,
    nbhReg: "nbhRegPolV1" as const,
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

type DredCapoFeatures = {
    settings?: boolean;
    nodeOpRegistry?: boolean;
    nbhRegistry?: boolean;
    s3domain?: boolean;
    /* Add other feature-flag definitions here */
};

// export type DredSettings = ErgoProtocolSettings;

/**
 * @public
 */
export class DredCapo extends Capo<DredCapo, DredCapoFeatures> {
    autoSetup = true;
    get defaultFeatureFlags(): DredCapoFeatures {
        return {
            settings: true,
            nodeOpRegistry: true,
            nbhRegistry: true,
            /* Add other feature-flag defaults here */
        };
    }

    scriptBundle(): CapoHeliosBundle {
        return DredCapoBundle.create({
            setup: this.setup,
        });
    }

    /**
     * locates the current settings for the capo
     */
    async findSettingsInfo(options: {
        charterData: CharterData;
        capoUtxos?: TxInput[];
    }): Promise<FoundDatumUtxo<ErgoProtocolSettings, ProtocolSettings>> {
        return super.findSettingsInfo(options) as any;
    }

    /**
     * Finds and instantiates the mint delegate for the capo
     */
    async getMintDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<MyMintSpendDelegate> {
        return super.getMintDelegate(charterData) as any;
    }

    /**
     * Finds and instantiates the spend delegate for the capo
     */
    async getSpendDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<MyMintSpendDelegate> {
        return super.getSpendDelegate(charterData) as any;
    }

    /**
     * Finds and instantiates the node registry controller for the capo
     */
    async getNodeRegistryController(
        charterData?: CapoDatum$Ergo$CharterData
    ): Promise<NodeRegistryController> {
        if (!charterData) {
            charterData = await this.findCharterData();
        }
        return this.getDgDataController("nodeReg", {
            charterData: charterData as CapoDatum$Ergo$CharterData,
        }) as Promise<NodeRegistryController>;
    }

    /**
     * Finds and instantiates the neighborhood registry controller for the capo
     */
    async getNbhRegistryController(
        charterData?: CapoDatum$Ergo$CharterData
    ): Promise<NeighborhoodController> {
        if (!charterData) {
            charterData = await this.findCharterData();
        }
        return this.getDgDataController("nbhRegistry", {
            charterData: charterData as CapoDatum$Ergo$CharterData,
        }) as Promise<NeighborhoodController>;
    }

    /**
     * Finds and instantiates the settings controller for the capo
     */
    async getSettingsController(options: {
        charterData: CharterData;
        optional?: true;
    }): Promise<ProtocolSettingsController> {
        return this.getDgDataController("settings", options) as any;
    }

    /* add other controller-fetching methods here */

    /**
     * Creates the initial settings for the capo
     */
    async mkInitialSettings(): Promise<minimalProtocolSettings> {
        return {
            nodeOpSettings: {
                expectedHeartbeatInterval: BigInt(72 * 60 * 60 * 1000),
                minNodeOperatorStake: makeValue(20000n),
                minNodeRegistrationFee: 10_000_000n,
                requiredNodeUptime: 0.95,
            },
            nbhSettings: {
                minRegistrationFee: 3_000_000_000n,
                minNbhStake: makeValue(50_000_001n),
            },
        };
    }

    /**
     * Finds all the node-registration records
     * @remarks
     * This is a convenience method for finding all the node-registration records.
     * It is equivalent to calling `findDelegatedDataUtxos` with the type `"dredNode"`.
     */
    async findNodeOpEntries() {
        return this.findDelegatedDataUtxos<"dredNode", ErgoNodeRegistrationData, unknown>({
            type: "dredNode",
        });
    }

    /**
     * Finds all the neighborhood-registration records
     */
    async findNbhRegistryEntries() {
        return this.findDelegatedDataUtxos<"dredNbh", ErgoNeighborhoodData, unknown>({
            type: "dredNbh",
        });
    }

    /* add other model-specific finders here */

    /**
     * Initializes the delegate roles for the capo
     * @internal
     */
    initDelegateRoles() {
        const inh = super.basicDelegateRoles();

        const { mintDelegate: parentMD, spendDelegate, govAuthority } = inh;

        const myDelegates = delegateRoles({
            govAuthority,
            spendDelegate: defineRole("spendDgt", MyMintSpendDelegate, {}),
            mintDelegate: defineRole("mintDgt", MyMintSpendDelegate, {}),
            settings: defineRole("dgDataPolicy", ProtocolSettingsController, {}),
            nodeOpRegistry: defineRole("dgDataPolicy", NodeRegistryController, {}),
            // nbhRegistry: defineRole("dgDataPolicy", NeighborhoodController, {}),
            /* Add other delegate roles here */

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

    /**
     * Mints fungible tokens under the Capo's minting policy
     */
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

    // mkConfigData() {
    //     throw new Error(`unused, but a basic example of how to create a MapData object`);
    //     const uplcMap = makeMapData([
    //         [makeByteArrayData(textToBytes("id")), makeByteArrayData(textToBytes("set"))],
    //     ]);
    //     return uplcMap;
    // }

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

    // async mkAdditionalTxnsForCharter<TCX extends hasAddlTxns<StellarTxnContext<any>>>(
    //     this: DredCapo,
    //     tcx: TCX,
    //     options: {
    //         charterData: CharterData;
    //         capoUtxos: TxInput[];
    //     }
    // ) {
    //    // now handled by autoSetup
    //
    //     await this.setupFundedPurpose(tcx, options);
    //     await this.setupMarketSale(tcx, options);
    //     await this.setupNodeRegistry(tcx, options);
    //
    //     return tcx;
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
