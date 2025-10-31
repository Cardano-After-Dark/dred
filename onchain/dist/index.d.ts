import type { Address } from '@helios-lang/ledger';
import { anyState } from '@donecollectively/stellar-contracts';
import type { AssetClass } from '@helios-lang/ledger';
import type { basicDelegateMap } from '@donecollectively/stellar-contracts';
import { bytesToHex } from '@helios-lang/codec-utils';
import { CapoDAppProvider } from '@donecollectively/stellar-contracts/ui';
import type { CapoDappStatus } from '@donecollectively/stellar-contracts/ui';
import type { CardanoClient } from '@helios-lang/tx-utils';
import { Cast } from '@helios-lang/contract-utils';
import type { CharterData } from '@donecollectively/stellar-contracts';
import type { Cip30Wallet } from '@helios-lang/tx-utils';
import { ConcreteCapoDelegateBundle } from '@donecollectively/stellar-contracts';
import { ContractDataBridge } from '@donecollectively/stellar-contracts';
import type { DappUserInfo } from '@donecollectively/stellar-contracts/ui';
import { DataBridgeReaderClass } from '@donecollectively/stellar-contracts';
import { default as default_2 } from './NodeRegistry.hlb.js';
import { DelegatedDataContract } from '@donecollectively/stellar-contracts';
import type { DgDataUpdateOptions } from '@donecollectively/stellar-contracts';
import { DredCapoBundle } from './DredCapo.hlb.js';
import { EnumBridge } from '@donecollectively/stellar-contracts';
import type { EnumTypeMeta } from '@donecollectively/stellar-contracts';
import type { FoundDatumUtxo } from '@donecollectively/stellar-contracts';
import { hasCharterRef } from '@donecollectively/stellar-contracts';
import { hasGovAuthority } from '@donecollectively/stellar-contracts';
import { hasMemberToken } from 'stellar-tokenomics';
import { hasSeed } from '@donecollectively/stellar-contracts';
import { hasSeedUtxo } from '@donecollectively/stellar-contracts';
import type { hasSettingsRef } from '@donecollectively/stellar-contracts';
import { hasUutContext } from '@donecollectively/stellar-contracts';
import { hexToBytes } from '@helios-lang/codec-utils';
import { InlineTxOutputDatum } from '@helios-lang/ledger';
import type { IntersectedEnum } from '@donecollectively/stellar-contracts';
import type { IntLike } from '@helios-lang/codec-utils';
import { isActivity } from '@donecollectively/stellar-contracts';
import { JustAnEnum } from '@donecollectively/stellar-contracts';
import { makeBlockfrostV0Client } from '@helios-lang/tx-utils';
import { makeRandomRootPrivateKey } from '@helios-lang/tx-utils';
import { makeRootPrivateKey } from '@helios-lang/tx-utils';
import { makeSimpleWallet } from '@helios-lang/tx-utils';
import type { minimalData } from '@donecollectively/stellar-contracts';
import type { MintingPolicyHash } from '@helios-lang/ledger';
import { NeighborhoodRegistryBundle } from './NeighborhoodRegistry.hlb.js';
import { ProtocolSettingsBundle } from './ProtocolSettings.hlb.js';
import type { PubKey } from '@helios-lang/ledger';
import type { PubKeyHash } from '@helios-lang/ledger';
import { default as React_2 } from 'react';
import { ReadonlySignal } from '@preact/signals-core';
import { ReqtsMap } from '@donecollectively/stellar-contracts';
import type { ScriptHash } from '@helios-lang/ledger';
import { SeedActivity } from '@donecollectively/stellar-contracts';
import { Signal } from '@preact/signals-core';
import type { singleEnumVariantMeta } from '@donecollectively/stellar-contracts';
import { StellarTokenomicsCapo } from 'stellar-tokenomics';
import { StellarTxnContext } from '@donecollectively/stellar-contracts';
import { STokMintDelegate } from 'stellar-tokenomics';
import { tagOnly } from '@donecollectively/stellar-contracts';
import type { TxDescription } from '@donecollectively/stellar-contracts';
import { TxInput } from '@helios-lang/ledger';
import type { TxOutput } from '@helios-lang/ledger';
import type { TxOutputId } from '@helios-lang/ledger';
import type { UplcData } from '@helios-lang/uplc';
import { UserActionMap } from '@donecollectively/stellar-contracts/ui';
import type { ValidatorHash } from '@helios-lang/ledger';
import type { Value } from '@helios-lang/ledger';

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedData {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedData_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData = AbstractDelegateActivitiesEnum$CreatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData_2 = AbstractDelegateActivitiesEnum$CreatingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData = AbstractDelegateActivitiesEnum$DeletingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData_2 = AbstractDelegateActivitiesEnum$DeletingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData = AbstractDelegateActivitiesEnum$UpdatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData_2 = AbstractDelegateActivitiesEnum$UpdatingDelegatedData_2

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of AbstractDelegateActivitiesEnum$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * AbstractDelegateActivitiesEnum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type AbstractDelegateActivitiesEnum = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }

/**
 * AbstractDelegateActivitiesEnum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type AbstractDelegateActivitiesEnum_2 = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_3    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_3    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***AbstractDelegateActivitiesEnum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class AbstractDelegateActivitiesEnumHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<AbstractDelegateActivitiesEnum, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike_2;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike_2;
        SpendingActivities: UplcData;
        MintingActivities: UplcData;
        BurningActivities: UplcData;
        CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike;
        UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike;
        DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: UplcData;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.SpendingActivities"***
     */
    SpendingActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.MintingActivities"***
     */
    MintingActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.BurningActivities"***
     */
    BurningActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike | {
        seed: TxOutputId | string;
        dataType: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.UpdatingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.DeletingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.OtherActivities"***
     */
    OtherActivities(activity: UplcData): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***AbstractDelegateActivitiesEnum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class AbstractDelegateActivitiesEnumHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<AbstractDelegateActivitiesEnum_2, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike_3;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike_3;
        SpendingActivities: UplcData;
        MintingActivities: UplcData;
        BurningActivities: UplcData;
        CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2;
        UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2;
        DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: UplcData;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.SpendingActivities"***
     */
    SpendingActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.MintingActivities"***
     */
    MintingActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.BurningActivities"***
     */
    BurningActivities(activity: UplcData): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2 | {
        seed: TxOutputId | string;
        dataType: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.UpdatingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2 | {
        dataType: string;
        recId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.DeletingDelegatedData"***
     * @remarks - ***AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2 | {
        dataType: string;
        recId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::AbstractDelegateActivitiesEnum.OtherActivities"***
     */
    OtherActivities(activity: UplcData): UplcData;
}

/**
 * AbstractDelegateActivitiesEnum enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type AbstractDelegateActivitiesEnumLike = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivityLike_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivityLike_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * AbstractDelegateActivitiesEnum enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **10 variant(s)** of the AbstractDelegateActivitiesEnum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `AbstractDelegateActivitiesEnumHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type AbstractDelegateActivitiesEnumLike_2 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivityLike_3    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivityLike_3    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type AbstractDelegateActivitiesEnumMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "AbstractDelegateActivitiesEnum"}, {
    CapoLifecycleActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "CapoLifecycleActivities",
    "Constr#0", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_2   , "noSpecialFlags"
    >,
    DelegateLifecycleActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "DelegateLifecycleActivities",
    "Constr#1", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_2   , "noSpecialFlags"
    >,
    SpendingActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "SpendingActivities",
    "Constr#2", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >,
    MintingActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "MintingActivities",
    "Constr#3", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >,
    BurningActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "BurningActivities",
    "Constr#4", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >,
    CreatingDelegatedData: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "CreatingDelegatedData",
    "Constr#5", 
    "fields", AbstractDelegateActivitiesEnum$CreatingDelegatedData, "isSeededActivity"
    >,
    UpdatingDelegatedData: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "UpdatingDelegatedData",
    "Constr#6", 
    "fields", AbstractDelegateActivitiesEnum$UpdatingDelegatedData, "noSpecialFlags"
    >,
    DeletingDelegatedData: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "DeletingDelegatedData",
    "Constr#7", 
    "fields", AbstractDelegateActivitiesEnum$DeletingDelegatedData, "noSpecialFlags"
    >,
    MultipleDelegateActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "MultipleDelegateActivities",
    "Constr#8", "singletonField", /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>   , "noSpecialFlags"
    >,
    OtherActivities: singleEnumVariantMeta<AbstractDelegateActivitiesEnumMeta, "OtherActivities",
    "Constr#9", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData   , "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of AbstractSettingsForNeighborhood
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAbstractSettingsForNeighborhood instead.
 * @public
 */
declare interface AbstractSettingsForNeighborhood {
    NeighborhoodSettings: /*minStructField*/ NeighborhoodSettings_2
}

/**
 * A strong type for the permissive form of AbstractSettingsForNeighborhood
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractSettingsForNeighborhoodLike {
    NeighborhoodSettings: /*minStructField*/ NeighborhoodSettingsLike
}

/**
 * A strong type for the canonical form of AbstractSettingsForNodeOperator
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAbstractSettingsForNodeOperator instead.
 * @public
 */
declare interface AbstractSettingsForNodeOperator {
    nodeOpSettings: /*minStructField*/ NodeOperatorSettings_2
}

/**
 * A strong type for the permissive form of AbstractSettingsForNodeOperator
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AbstractSettingsForNodeOperatorLike {
    nodeOpSettings: /*minStructField*/ NodeOperatorSettingsLike
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ActivityDelegateRoleHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_2, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DgDataPolicy(name: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    OtherNamedDgt(name: string): isActivity;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ActivityDelegateRoleHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_3, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DgDataPolicy(name: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    OtherNamedDgt(name: string): isActivity;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ActivityDelegateRoleHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_4, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DgDataPolicy(name: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    OtherNamedDgt(name: string): isActivity;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ActivityDelegateRoleHelperNested_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_5, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DgDataPolicy(name: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    OtherNamedDgt(name: string): isActivity;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): {
        redeemer: UplcData;
    };
}

/**
 * A strong type for the canonical form of AnyData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAnyData instead.
 * @public
 */
declare interface AnyData {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the canonical form of AnyData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAnyData instead.
 * @public
 */
declare interface AnyData_2 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the canonical form of AnyData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAnyData instead.
 * @public
 */
declare interface AnyData_3 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the canonical form of AnyData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAnyData instead.
 * @public
 */
declare interface AnyData_4 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of AnyData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AnyDataLike {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of AnyData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AnyDataLike_2 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of AnyData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AnyDataLike_3 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of AnyData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AnyDataLike_4 {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
}

/**
 * A strong type for the canonical form of AppInfoV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoAppInfoV1 instead.
 * @public
 */
declare interface AppInfoV1 {
    url: /*minStructField*/ string
    revenueModel: /*minStructField*/ Array<RevenueModel>
    name: /*minStructField*/ string
    description: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of AppInfoV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface AppInfoV1Like {
    url: /*minStructField*/ string
    revenueModel: /*minStructField*/ Array<RevenueModelLike>
    name: /*minStructField*/ string
    description: /*minStructField*/ string
}

/**
 * BurningActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type BurningActivity = 
| { _placeholder1BA: /* implied wrapper { recId: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * BurningActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type BurningActivity_2 = 
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * BurningActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type BurningActivity_3 = 
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * BurningActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type BurningActivity_4 = 
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        _placeholder1BA: number[];
    }, {
        _placeholder1BA: number[];
    }>;
    /**
     * generates  UplcData for ***"STokMintDelegate::BurningActivity._placeholder1BA"***
     */
    _placeholder1BA(recId: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::BurningActivity.DeletingRecord"***
     */
    DeletingRecord(id: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates  UplcData for ***"NeighborhoodPolicy::BurningActivity.DeletingRecord"***
     */
    DeletingRecord(id: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates  UplcData for ***"ProtocolSettingsPolicy::BurningActivity.DeletingRecord"***
     */
    DeletingRecord(id: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        _placeholder1BA: number[];
    }, {
        _placeholder1BA: number[];
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::BurningActivity._placeholder1BA"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    _placeholder1BA(recId: number[]): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::BurningActivity.DeletingRecord"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DeletingRecord(id: number[]): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::BurningActivity.DeletingRecord"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DeletingRecord(id: number[]): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class BurningActivityHelperNested_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        DeletingRecord: number[];
    }, {
        DeletingRecord: number[];
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::BurningActivity.DeletingRecord"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    DeletingRecord(id: number[]): isActivity;
}

/**
 * BurningActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type BurningActivityLike = IntersectedEnum<
| { _placeholder1BA: /* implied wrapper { recId: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * BurningActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type BurningActivityLike_2 = IntersectedEnum<
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * BurningActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type BurningActivityLike_3 = IntersectedEnum<
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * BurningActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the BurningActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `BurningActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type BurningActivityLike_4 = IntersectedEnum<
| { DeletingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type BurningActivityMeta = EnumTypeMeta<
    {module: "DredNodeRegistryPolicy", enumName: "BurningActivity"}, {
    DeletingRecord: singleEnumVariantMeta<BurningActivityMeta, "DeletingRecord",
    "Constr#0", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >
}
>;

export { bytesToHex }

/**
 * A strong type for the canonical form of CapoCtx
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoCtx instead.
 * @public
 */
declare interface CapoCtx {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ cctx_CharterInputType
}

/**
 * A strong type for the canonical form of CapoCtx
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoCtx instead.
 * @public
 */
declare interface CapoCtx_2 {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ cctx_CharterInputType_2
}

/**
 * A strong type for the canonical form of CapoCtx
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoCtx instead.
 * @public
 */
declare interface CapoCtx_3 {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ cctx_CharterInputType_3
}

/**
 * A strong type for the canonical form of CapoCtx
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoCtx instead.
 * @public
 */
declare interface CapoCtx_4 {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ cctx_CharterInputType_4
}

/**
 * A strong type for the permissive form of CapoCtx
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoCtxLike {
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    charter: /*minStructField*/ cctx_CharterInputTypeLike
}

/**
 * A strong type for the permissive form of CapoCtx
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoCtxLike_2 {
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    charter: /*minStructField*/ cctx_CharterInputTypeLike_2
}

/**
 * A strong type for the permissive form of CapoCtx
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoCtxLike_3 {
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    charter: /*minStructField*/ cctx_CharterInputTypeLike_3
}

/**
 * A strong type for the permissive form of CapoCtx
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoCtxLike_4 {
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    charter: /*minStructField*/ cctx_CharterInputTypeLike_4
}

/**
 * A strong type for the canonical form of CapoDatum$CharterData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoDatum$Ergo$CharterData instead.
 * @public
 */
declare interface CapoDatum$CharterData {
    spendDelegateLink: RelativeDelegateLink_2  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLink_2>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLink_2>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLink_2  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLink_2>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLink_2  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntry>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChange>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoDatum$CharterData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoDatum$Ergo$CharterData instead.
 * @public
 */
declare interface CapoDatum$CharterData_2 {
    spendDelegateLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLink_3>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLink_3>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLink_3>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntry_2>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChange_2>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoDatum$CharterData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoDatum$Ergo$CharterData instead.
 * @public
 */
declare interface CapoDatum$CharterData_3 {
    spendDelegateLink: RelativeDelegateLink_4  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLink_4>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLink_4>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLink_4  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLink_4>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLink_4  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntry_3>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChange_3>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoDatum$CharterData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoDatum$Ergo$CharterData instead.
 * @public
 */
declare interface CapoDatum$CharterData_4 {
    spendDelegateLink: RelativeDelegateLink_5  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLink_5>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLink_5>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLink_5  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLink_5>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLink_5  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntry_4>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChange_4>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoDatum$CharterData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoDatum$CharterDataLike {
    spendDelegateLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLinkLike>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLinkLike>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLinkLike>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntryLike>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChangeLike>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoDatum$CharterData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoDatum$CharterDataLike_2 {
    spendDelegateLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLinkLike_2>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLinkLike_2>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLinkLike_2>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntryLike_2>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChangeLike_2>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoDatum$CharterData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoDatum$CharterDataLike_3 {
    spendDelegateLink: RelativeDelegateLinkLike_3  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLinkLike_3>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLinkLike_3>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLinkLike_3  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLinkLike_3>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLinkLike_3  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntryLike_3>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChangeLike_3>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoDatum$CharterData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoDatum$CharterDataLike_4 {
    spendDelegateLink: RelativeDelegateLinkLike_4  /*minVariantField*/ ,
    spendInvariants: Array<RelativeDelegateLinkLike_4>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, RelativeDelegateLinkLike_4>  /*minVariantField*/ ,
    mintDelegateLink: RelativeDelegateLinkLike_4  /*minVariantField*/ ,
    mintInvariants: Array<RelativeDelegateLinkLike_4>  /*minVariantField*/ ,
    govAuthorityLink: RelativeDelegateLinkLike_4  /*minVariantField*/ ,
    manifest: Map<string, CapoManifestEntryLike_4>  /*minVariantField*/ ,
    pendingChanges: Array<PendingCharterChangeLike_4>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoDatum$Ergo$CharterData = {
    spendDelegateLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoDatum$Ergo$CharterData_2 = {
    spendDelegateLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink_2>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink_2>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink_2>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry_2>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange_2>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoDatum$Ergo$CharterData_3 = {
    spendDelegateLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink_3>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink_3>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink_3>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry_3>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange_3>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoDatum$Ergo$CharterData_4 = {
    spendDelegateLink: ErgoRelativeDelegateLink_4  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink_4>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink_4>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink_4  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink_4>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink_4  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry_4>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange_4>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoDatum$CharterData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoDatum$CharterDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoDatum$Ergo$CharterData_5 = {
    spendDelegateLink: ErgoRelativeDelegateLink_5  /*minVariantField*/ ,
    spendInvariants: Array<ErgoRelativeDelegateLink_5>  /*minVariantField*/ ,
    otherNamedDelegates: Map<string, ErgoRelativeDelegateLink_5>  /*minVariantField*/ ,
    mintDelegateLink: ErgoRelativeDelegateLink_5  /*minVariantField*/ ,
    mintInvariants: Array<ErgoRelativeDelegateLink_5>  /*minVariantField*/ ,
    govAuthorityLink: ErgoRelativeDelegateLink_5  /*minVariantField*/ ,
    manifest: Map<string, ErgoCapoManifestEntry_5>  /*minVariantField*/ ,
    pendingChanges: Array<ErgoPendingCharterChange_5>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$CreatingDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegate {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$CreatingDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegate_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$CreatingDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegate_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$CreatingDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegate_4 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegateLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegateLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegateLike_3 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$CreatingDelegateLike_4 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$CreatingDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$CreatingDelegate = CapoLifecycleActivity$CreatingDelegate

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$CreatingDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$CreatingDelegate_2 = CapoLifecycleActivity$CreatingDelegate_2

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$CreatingDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$CreatingDelegate_3 = CapoLifecycleActivity$CreatingDelegate_3

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$CreatingDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$CreatingDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$CreatingDelegate_4 = CapoLifecycleActivity$CreatingDelegate_4

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewMintDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewMintDelegate = CapoLifecycleActivity$forcingNewMintDelegate

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewMintDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewMintDelegate_2 = CapoLifecycleActivity$forcingNewMintDelegate_2

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewMintDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewMintDelegate_3 = CapoLifecycleActivity$forcingNewMintDelegate_3

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewMintDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewMintDelegate_4 = CapoLifecycleActivity$forcingNewMintDelegate_4

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewSpendDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewSpendDelegate = CapoLifecycleActivity$forcingNewSpendDelegate

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewSpendDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_2 = CapoLifecycleActivity$forcingNewSpendDelegate_2

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewSpendDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_3 = CapoLifecycleActivity$forcingNewSpendDelegate_3

/**
 * An ergonomic, though less strictly-safe form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoLifecycleActivity$forcingNewSpendDelegateLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_4 = CapoLifecycleActivity$forcingNewSpendDelegate_4

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewMintDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegate {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewMintDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegate_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewMintDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegate_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewMintDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegate_4 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegateLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegateLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegateLike_3 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewMintDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewMintDelegateLike_4 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewSpendDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegate {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewSpendDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegate_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewSpendDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegate_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see CapoLifecycleActivity$Ergo$forcingNewSpendDelegate instead.
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegate_4 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegateLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegateLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegateLike_3 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of CapoLifecycleActivity$forcingNewSpendDelegate
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoLifecycleActivity$forcingNewSpendDelegateLike_4 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * CapoLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type CapoLifecycleActivity = 
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegate /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole_2    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegate /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegate /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity    /*minEnumVariant*/ }

/**
 * CapoLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type CapoLifecycleActivity_2 = 
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegate_2 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole_3    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegate_2 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegate_2 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity_2    /*minEnumVariant*/ }

/**
 * CapoLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type CapoLifecycleActivity_3 = 
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegate_3 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole_4    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegate_3 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegate_3 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity_3    /*minEnumVariant*/ }

/**
 * CapoLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type CapoLifecycleActivity_4 = 
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegate_4 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole_5    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegate_4 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegate_4 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity_4    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike;
        updatingManifest: ManifestActivityLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_2, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_2;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_2;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_2;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_2;
        updatingManifest: ManifestActivityLike_2;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_3, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_3;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_3;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_3;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_3;
        updatingManifest: ManifestActivityLike_3;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_4, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_4;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_4;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_4;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_4;
        updatingManifest: ManifestActivityLike_4;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike;
        updatingManifest: ManifestActivityLike;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): {
        redeemer: UplcData;
    };
    /**
     * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
     */
    get removePendingChange(): ActivityDelegateRoleHelperNested;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
     */
    get updatingManifest(): ManifestActivityHelperNested;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_2, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_2;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_2;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_2;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_2;
        updatingManifest: ManifestActivityLike_2;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): {
        redeemer: UplcData;
    };
    /**
     * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
     */
    get removePendingChange(): ActivityDelegateRoleHelperNested_2;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
     */
    get updatingManifest(): ManifestActivityHelperNested_2;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_3, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_3;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_3;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_3;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_3;
        updatingManifest: ManifestActivityLike_3;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): {
        redeemer: UplcData;
    };
    /**
     * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
     */
    get removePendingChange(): ActivityDelegateRoleHelperNested_3;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
     */
    get updatingManifest(): ManifestActivityHelperNested_3;
}

/**
 * Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class CapoLifecycleActivityHelperNested_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<CapoLifecycleActivity_4, Partial<{
        CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_4;
        queuePendingChange: tagOnly;
        removePendingChange: DelegateRoleLike_4;
        commitPendingChanges: tagOnly;
        forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_4;
        forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_4;
        updatingManifest: ManifestActivityLike_4;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    CreatingDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***
     * with raw seed details included in fields.
     */
    CreatingDelegate(fields: CapoLifecycleActivity$CreatingDelegateLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$CreatingDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get queuePendingChange(): {
        redeemer: UplcData;
    };
    /**
     * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.
     */
    get removePendingChange(): ActivityDelegateRoleHelperNested_4;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get commitPendingChanges(): {
        redeemer: UplcData;
    };
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewSpendDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewSpendDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewSpendDelegate(fields: CapoLifecycleActivity$forcingNewSpendDelegateLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewSpendDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewSpendDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$forcingNewMintDelegate}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forcingNewMintDelegate(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***
     * with raw seed details included in fields.
     */
    forcingNewMintDelegate(fields: CapoLifecycleActivity$forcingNewMintDelegateLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$forcingNewMintDelegate({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$forcingNewMintDelegate: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.
     */
    get updatingManifest(): ManifestActivityHelperNested_4;
}

/**
 * CapoLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type CapoLifecycleActivityLike = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRoleLike    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivityLike    /*minEnumVariant*/ }
>

/**
 * CapoLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type CapoLifecycleActivityLike_2 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_2 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRoleLike_2    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_2 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_2 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivityLike_2    /*minEnumVariant*/ }
>

/**
 * CapoLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type CapoLifecycleActivityLike_3 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_3 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRoleLike_3    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_3 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_3 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivityLike_3    /*minEnumVariant*/ }
>

/**
 * CapoLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **7 variant(s)** of the CapoLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `CapoLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type CapoLifecycleActivityLike_4 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$CreatingDelegateLike_4 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRoleLike_4    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$forcingNewSpendDelegateLike_4 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$forcingNewMintDelegateLike_4 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivityLike_4    /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type CapoLifecycleActivityMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "CapoLifecycleActivity"}, {
    CreatingDelegate: singleEnumVariantMeta<CapoLifecycleActivityMeta, "CreatingDelegate",
    "Constr#0", 
    "fields", CapoLifecycleActivity$CreatingDelegate_2, "isSeededActivity"
    >,
    queuePendingChange: singleEnumVariantMeta<CapoLifecycleActivityMeta, "queuePendingChange",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    removePendingChange: singleEnumVariantMeta<CapoLifecycleActivityMeta, "removePendingChange",
    "Constr#2", "singletonField", /* implied wrapper { role: ... } for singleVariantField */ 
    			DelegateRole_3   , "noSpecialFlags"
    >,
    commitPendingChanges: singleEnumVariantMeta<CapoLifecycleActivityMeta, "commitPendingChanges",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    forcingNewSpendDelegate: singleEnumVariantMeta<CapoLifecycleActivityMeta, "forcingNewSpendDelegate",
    "Constr#4", 
    "fields", CapoLifecycleActivity$forcingNewSpendDelegate_2, "isSeededActivity"
    >,
    forcingNewMintDelegate: singleEnumVariantMeta<CapoLifecycleActivityMeta, "forcingNewMintDelegate",
    "Constr#5", 
    "fields", CapoLifecycleActivity$forcingNewMintDelegate_2, "isSeededActivity"
    >,
    updatingManifest: singleEnumVariantMeta<CapoLifecycleActivityMeta, "updatingManifest",
    "Constr#6", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			ManifestActivity_2   , "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of CapoManifestEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoManifestEntry instead.
 * @public
 */
declare interface CapoManifestEntry {
    entryType: /*minStructField*/ ManifestEntryType
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * A strong type for the canonical form of CapoManifestEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoManifestEntry instead.
 * @public
 */
declare interface CapoManifestEntry_2 {
    entryType: /*minStructField*/ ManifestEntryType_2
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * A strong type for the canonical form of CapoManifestEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoManifestEntry instead.
 * @public
 */
declare interface CapoManifestEntry_3 {
    entryType: /*minStructField*/ ManifestEntryType_3
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * A strong type for the canonical form of CapoManifestEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoCapoManifestEntry instead.
 * @public
 */
declare interface CapoManifestEntry_4 {
    entryType: /*minStructField*/ ManifestEntryType_4
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * A strong type for the permissive form of CapoManifestEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoManifestEntryLike {
    entryType: /*minStructField*/ ManifestEntryTypeLike
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined
}

/**
 * A strong type for the permissive form of CapoManifestEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoManifestEntryLike_2 {
    entryType: /*minStructField*/ ManifestEntryTypeLike_2
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined
}

/**
 * A strong type for the permissive form of CapoManifestEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoManifestEntryLike_3 {
    entryType: /*minStructField*/ ManifestEntryTypeLike_3
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined
}

/**
 * A strong type for the permissive form of CapoManifestEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface CapoManifestEntryLike_4 {
    entryType: /*minStructField*/ ManifestEntryTypeLike_4
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$Input
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$InputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$Input = {
    datum: CapoDatum$Ergo$CharterData_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$Input
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$InputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$Input_2 = {
    datum: CapoDatum$Ergo$CharterData_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$Input
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$InputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$Input_3 = {
    datum: CapoDatum$Ergo$CharterData_4  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$Input
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$InputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$Input_4 = {
    datum: CapoDatum$Ergo$CharterData_5  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$RefInput
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$RefInputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$RefInput = {
    datum: CapoDatum$Ergo$CharterData_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$RefInput
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$RefInputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$RefInput_2 = {
    datum: CapoDatum$Ergo$CharterData_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$RefInput
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$RefInputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$RefInput_3 = {
    datum: CapoDatum$Ergo$CharterData_4  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of cctx_CharterInputType$RefInput
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the cctx_CharterInputType$RefInputLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type cctx_CharterInputType$Ergo$RefInput_4 = {
    datum: CapoDatum$Ergo$CharterData_5  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$Input
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$Input instead.
 * @public
 */
declare interface cctx_CharterInputType$Input {
    datum: CapoDatum$CharterData  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$Input
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$Input instead.
 * @public
 */
declare interface cctx_CharterInputType$Input_2 {
    datum: CapoDatum$CharterData_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$Input
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$Input instead.
 * @public
 */
declare interface cctx_CharterInputType$Input_3 {
    datum: CapoDatum$CharterData_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$Input
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$Input instead.
 * @public
 */
declare interface cctx_CharterInputType$Input_4 {
    datum: CapoDatum$CharterData_4  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$Input
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$InputLike {
    datum: CapoDatum$CharterDataLike  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$Input
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$InputLike_2 {
    datum: CapoDatum$CharterDataLike_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$Input
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$InputLike_3 {
    datum: CapoDatum$CharterDataLike_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$Input
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$InputLike_4 {
    datum: CapoDatum$CharterDataLike_4  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$RefInput
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$RefInput instead.
 * @public
 */
declare interface cctx_CharterInputType$RefInput {
    datum: CapoDatum$CharterData  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$RefInput
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$RefInput instead.
 * @public
 */
declare interface cctx_CharterInputType$RefInput_2 {
    datum: CapoDatum$CharterData_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$RefInput
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$RefInput instead.
 * @public
 */
declare interface cctx_CharterInputType$RefInput_3 {
    datum: CapoDatum$CharterData_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of cctx_CharterInputType$RefInput
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see cctx_CharterInputType$Ergo$RefInput instead.
 * @public
 */
declare interface cctx_CharterInputType$RefInput_4 {
    datum: CapoDatum$CharterData_4  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$RefInput
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$RefInputLike {
    datum: CapoDatum$CharterDataLike  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$RefInput
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$RefInputLike_2 {
    datum: CapoDatum$CharterDataLike_2  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$RefInput
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$RefInputLike_3 {
    datum: CapoDatum$CharterDataLike_3  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of cctx_CharterInputType$RefInput
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface cctx_CharterInputType$RefInputLike_4 {
    datum: CapoDatum$CharterDataLike_4  /*minVariantField*/ ,
    utxo: TxInput  /*minVariantField*/ 
}

/**
 * cctx_CharterInputType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type cctx_CharterInputType = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInput /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Input /*minEnumVariant*/ }

/**
 * cctx_CharterInputType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type cctx_CharterInputType_2 = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInput_2 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Input_2 /*minEnumVariant*/ }

/**
 * cctx_CharterInputType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type cctx_CharterInputType_3 = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInput_3 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Input_3 /*minEnumVariant*/ }

/**
 * cctx_CharterInputType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type cctx_CharterInputType_4 = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInput_4 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Input_4 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class cctx_CharterInputTypeHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<cctx_CharterInputType, Partial<{
        Unk: tagOnly;
        RefInput: cctx_CharterInputType$RefInputLike;
        Input: cctx_CharterInputType$InputLike;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::cctx_CharterInputType.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.RefInput"***
     * @remarks - ***cctx_CharterInputType$RefInputLike*** is the same as the expanded field-types.
     */
    RefInput(fields: cctx_CharterInputType$RefInputLike | {
        datum: CapoDatum$CharterDataLike;
        utxo: TxInput;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.Input"***
     * @remarks - ***cctx_CharterInputType$InputLike*** is the same as the expanded field-types.
     */
    Input(fields: cctx_CharterInputType$InputLike | {
        datum: CapoDatum$CharterDataLike;
        utxo: TxInput;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class cctx_CharterInputTypeHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<cctx_CharterInputType_2, Partial<{
        Unk: tagOnly;
        RefInput: cctx_CharterInputType$RefInputLike_2;
        Input: cctx_CharterInputType$InputLike_2;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::cctx_CharterInputType.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.RefInput"***
     * @remarks - ***cctx_CharterInputType$RefInputLike*** is the same as the expanded field-types.
     */
    RefInput(fields: cctx_CharterInputType$RefInputLike_2 | {
        datum: CapoDatum$CharterDataLike_2;
        utxo: TxInput;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.Input"***
     * @remarks - ***cctx_CharterInputType$InputLike*** is the same as the expanded field-types.
     */
    Input(fields: cctx_CharterInputType$InputLike_2 | {
        datum: CapoDatum$CharterDataLike_2;
        utxo: TxInput;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class cctx_CharterInputTypeHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<cctx_CharterInputType_3, Partial<{
        Unk: tagOnly;
        RefInput: cctx_CharterInputType$RefInputLike_3;
        Input: cctx_CharterInputType$InputLike_3;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::cctx_CharterInputType.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.RefInput"***
     * @remarks - ***cctx_CharterInputType$RefInputLike*** is the same as the expanded field-types.
     */
    RefInput(fields: cctx_CharterInputType$RefInputLike_3 | {
        datum: CapoDatum$CharterDataLike_3;
        utxo: TxInput;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.Input"***
     * @remarks - ***cctx_CharterInputType$InputLike*** is the same as the expanded field-types.
     */
    Input(fields: cctx_CharterInputType$InputLike_3 | {
        datum: CapoDatum$CharterDataLike_3;
        utxo: TxInput;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class cctx_CharterInputTypeHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<cctx_CharterInputType_4, Partial<{
        Unk: tagOnly;
        RefInput: cctx_CharterInputType$RefInputLike_4;
        Input: cctx_CharterInputType$InputLike_4;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::cctx_CharterInputType.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.RefInput"***
     * @remarks - ***cctx_CharterInputType$RefInputLike*** is the same as the expanded field-types.
     */
    RefInput(fields: cctx_CharterInputType$RefInputLike_4 | {
        datum: CapoDatum$CharterDataLike_4;
        utxo: TxInput;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::cctx_CharterInputType.Input"***
     * @remarks - ***cctx_CharterInputType$InputLike*** is the same as the expanded field-types.
     */
    Input(fields: cctx_CharterInputType$InputLike_4 | {
        datum: CapoDatum$CharterDataLike_4;
        utxo: TxInput;
    }): UplcData;
}

/**
 * cctx_CharterInputType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type cctx_CharterInputTypeLike = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInputLike /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$InputLike /*minEnumVariant*/ }
>

/**
 * cctx_CharterInputType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type cctx_CharterInputTypeLike_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInputLike_2 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$InputLike_2 /*minEnumVariant*/ }
>

/**
 * cctx_CharterInputType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type cctx_CharterInputTypeLike_3 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInputLike_3 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$InputLike_3 /*minEnumVariant*/ }
>

/**
 * cctx_CharterInputType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the cctx_CharterInputType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `cctx_CharterInputTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type cctx_CharterInputTypeLike_4 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$RefInputLike_4 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$InputLike_4 /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type cctx_CharterInputTypeMeta = EnumTypeMeta<
    {module: "CapoHelpers", enumName: "cctx_CharterInputType"}, {
    Unk: singleEnumVariantMeta<cctx_CharterInputTypeMeta, "Unk",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    RefInput: singleEnumVariantMeta<cctx_CharterInputTypeMeta, "RefInput",
    "Constr#1", 
    "fields", cctx_CharterInputType$RefInput_2, "noSpecialFlags"
    >,
    Input: singleEnumVariantMeta<cctx_CharterInputTypeMeta, "Input",
    "Constr#2", 
    "fields", cctx_CharterInputType$Input_2, "noSpecialFlags"
    >
}
>;

declare const computedSignals: {
    userAddress: ReadonlySignal<Address | undefined>;
    isConnected: ReadonlySignal<boolean>;
    statusMessage: ReadonlySignal<string | undefined>;
    shouldKeepMessage: ReadonlySignal<boolean>;
    messageClearTime: ReadonlySignal<number | undefined>;
    isError: ReadonlySignal<boolean>;
    moreInstructions: ReadonlySignal<string | undefined>;
    nextAction: ReadonlySignal<    {
    key: string;
    label: string;
    trigger: () => void;
    } | undefined>;
    progress: ReadonlySignal<    {
    label: string | undefined;
    percent: number | undefined;
    isActive: boolean;
    } | null>;
    hasFailedTxns: ReadonlySignal<boolean>;
    lastFailedTxn: ReadonlySignal<TxDescription<any, "built">>;
};

declare const coreSignals: {
    network: Signal<CardanoClient | undefined>;
    wallet: Signal<Cip30Wallet | undefined>;
    provider: Signal<CapoDAppProvider<DredCapo, any> | undefined>;
    capo: Signal<DredCapo | undefined>;
    dAppStatus: Signal<CapoDappStatus<any> | undefined>;
    userInfo: Signal<DappUserInfo | undefined>;
    failedTxns: Signal<TxDescription<any, "built">[]>;
    userAddresses: Signal<Address[] | undefined>;
};

/**
 * A strong type for the canonical form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedData {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedData_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedData_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$CreatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedData_4 {
    seed: TxOutputId  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedDataLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedDataLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedDataLike_3 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$CreatingDelegatedDataLike_4 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    dataType: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedData_3 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$DeletingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedData_4 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedDataLike_3 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$DeletingDelegatedDataLike_4 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$CreatingDelegatedData = DelegateActivity$CreatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$CreatingDelegatedData_2 = DelegateActivity$CreatingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$CreatingDelegatedData_3 = DelegateActivity$CreatingDelegatedData_3

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$CreatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$CreatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$CreatingDelegatedData_4 = DelegateActivity$CreatingDelegatedData_4

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$DeletingDelegatedData = DelegateActivity$DeletingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$DeletingDelegatedData_2 = DelegateActivity$DeletingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$DeletingDelegatedData_3 = DelegateActivity$DeletingDelegatedData_3

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$DeletingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$DeletingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$DeletingDelegatedData_4 = DelegateActivity$DeletingDelegatedData_4

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$UpdatingDelegatedData = DelegateActivity$UpdatingDelegatedData

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$UpdatingDelegatedData_2 = DelegateActivity$UpdatingDelegatedData_2

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$UpdatingDelegatedData_3 = DelegateActivity$UpdatingDelegatedData_3

/**
 * An ergonomic, though less strictly-safe form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateActivity$UpdatingDelegatedDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateActivity$Ergo$UpdatingDelegatedData_4 = DelegateActivity$UpdatingDelegatedData_4

/**
 * A strong type for the canonical form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedData {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedData_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedData_3 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateActivity$Ergo$UpdatingDelegatedData instead.
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedData_4 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedDataLike {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedDataLike_2 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedDataLike_3 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateActivity$UpdatingDelegatedData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateActivity$UpdatingDelegatedDataLike_4 {
    dataType: string  /*minVariantField*/ ,
    recId: number[]  /*minVariantField*/ 
}

/**
 * DelegateActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateActivity = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }

/**
 * DelegateActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateActivity_2 = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity_2    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity_2    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity_2    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			OtherActivity    /*minEnumVariant*/ }

/**
 * DelegateActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateActivity_3 = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_3    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_3    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity_3    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity_3    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity_3    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedData_3 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedData_3 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedData_3 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			OtherActivity_2    /*minEnumVariant*/ }

/**
 * DelegateActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateActivity_4 = 
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_4    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_4    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity_4    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity_4    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity_4    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedData_4 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedData_4 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedData_4 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			OtherActivity_3    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateActivityHelper extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateActivity, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike;
        SpendingActivities: SpendingActivityLike;
        MintingActivities: MintingActivityLike;
        BurningActivities: BurningActivityLike;
        CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike;
        UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike;
        DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: UplcData;
    }>>;
    /**
     * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.
     */
    get CapoLifecycleActivities(): CapoLifecycleActivityHelperNested;
    /**
     * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.
     */
    get DelegateLifecycleActivities(): DelegateLifecycleActivityHelperNested;
    /**
     * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.
     */
    get SpendingActivities(): SpendingActivityHelperNested;
    /**
     * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.
     */
    get MintingActivities(): MintingActivityHelperNested;
    /**
     * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.
     */
    get BurningActivities(): BurningActivityHelperNested;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::DelegateActivity.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::DelegateActivity.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: DelegateActivity$CreatingDelegatedDataLike | {
        seed: TxOutputId | string;
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::DelegateActivity.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::DelegateActivity.UpdatingDelegatedData"***
     * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: DelegateActivity$UpdatingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::DelegateActivity.DeletingDelegatedData"***
     * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: DelegateActivity$DeletingDelegatedDataLike | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::DelegateActivity.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::DelegateActivity.OtherActivities"***
     */
    OtherActivities(activity: UplcData): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateActivityHelper_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateActivity_2, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike_2;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike_2;
        SpendingActivities: SpendingActivityLike_2;
        MintingActivities: MintingActivityLike_2;
        BurningActivities: BurningActivityLike_2;
        CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike_2;
        UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike_2;
        DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike_2;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: OtherActivityLike;
    }>>;
    /**
     * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.
     */
    get CapoLifecycleActivities(): CapoLifecycleActivityHelperNested_2;
    /**
     * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.
     */
    get DelegateLifecycleActivities(): DelegateLifecycleActivityHelperNested_2;
    /**
     * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.
     */
    get SpendingActivities(): SpendingActivityHelperNested_2;
    /**
     * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.
     */
    get MintingActivities(): MintingActivityHelperNested_2;
    /**
     * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.
     */
    get BurningActivities(): BurningActivityHelperNested_2;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::DelegateActivity.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::DelegateActivity.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: DelegateActivity$CreatingDelegatedDataLike_2 | {
        seed: TxOutputId | string;
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::DelegateActivity.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::DelegateActivity.UpdatingDelegatedData"***
     * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: DelegateActivity$UpdatingDelegatedDataLike_2 | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::DelegateActivity.DeletingDelegatedData"***
     * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: DelegateActivity$DeletingDelegatedDataLike_2 | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::DelegateActivity.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): isActivity;
    /**
     * access to different variants of the ***nested OtherActivity*** type needed for ***DelegateActivity:OtherActivities***.
     */
    get OtherActivities(): OtherActivityHelperNested;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateActivityHelper_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateActivity_3, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike_3;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike_3;
        SpendingActivities: SpendingActivityLike_3;
        MintingActivities: MintingActivityLike_3;
        BurningActivities: BurningActivityLike_3;
        CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike_3;
        UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike_3;
        DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike_3;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: OtherActivityLike_2;
    }>>;
    /**
     * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.
     */
    get CapoLifecycleActivities(): CapoLifecycleActivityHelperNested_3;
    /**
     * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.
     */
    get DelegateLifecycleActivities(): DelegateLifecycleActivityHelperNested_3;
    /**
     * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.
     */
    get SpendingActivities(): SpendingActivityHelperNested_3;
    /**
     * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.
     */
    get MintingActivities(): MintingActivityHelperNested_3;
    /**
     * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.
     */
    get BurningActivities(): BurningActivityHelperNested_3;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::DelegateActivity.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::DelegateActivity.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: DelegateActivity$CreatingDelegatedDataLike_3 | {
        seed: TxOutputId | string;
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::DelegateActivity.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::DelegateActivity.UpdatingDelegatedData"***
     * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: DelegateActivity$UpdatingDelegatedDataLike_3 | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::DelegateActivity.DeletingDelegatedData"***
     * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: DelegateActivity$DeletingDelegatedDataLike_3 | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::DelegateActivity.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): isActivity;
    /**
     * access to different variants of the ***nested OtherActivity*** type needed for ***DelegateActivity:OtherActivities***.
     */
    get OtherActivities(): OtherActivityHelperNested_2;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateActivityHelper_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateActivity_4, Partial<{
        CapoLifecycleActivities: CapoLifecycleActivityLike_4;
        DelegateLifecycleActivities: DelegateLifecycleActivityLike_4;
        SpendingActivities: SpendingActivityLike_4;
        MintingActivities: MintingActivityLike_4;
        BurningActivities: BurningActivityLike_4;
        CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike_4;
        UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike_4;
        DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike_4;
        MultipleDelegateActivities: Array<UplcData>;
        OtherActivities: OtherActivityLike_3;
    }>>;
    /**
     * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.
     */
    get CapoLifecycleActivities(): CapoLifecycleActivityHelperNested_4;
    /**
     * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.
     */
    get DelegateLifecycleActivities(): DelegateLifecycleActivityHelperNested_4;
    /**
     * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.
     */
    get SpendingActivities(): SpendingActivityHelperNested_4;
    /**
     * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.
     */
    get MintingActivities(): MintingActivityHelperNested_4;
    /**
     * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.
     */
    get BurningActivities(): BurningActivityHelperNested_4;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::DelegateActivity.CreatingDelegatedData"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$CreatingDelegatedData}` for use in a context
     * providing an implicit seed utxo.
     */
    CreatingDelegatedData(value: hasSeed, fields: {
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::DelegateActivity.CreatingDelegatedData"***
     * with raw seed details included in fields.
     */
    CreatingDelegatedData(fields: DelegateActivity$CreatingDelegatedDataLike_4 | {
        seed: TxOutputId | string;
        dataType: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::DelegateActivity.CreatingDelegatedData"***,
     * @param fields - \{ dataType: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$CreatingDelegatedData({ dataType })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$CreatingDelegatedData: (fields: {
        dataType: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    dataType: string;
    }) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::DelegateActivity.UpdatingDelegatedData"***
     * @remarks - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.
     */
    UpdatingDelegatedData(fields: DelegateActivity$UpdatingDelegatedDataLike_4 | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::DelegateActivity.DeletingDelegatedData"***
     * @remarks - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.
     */
    DeletingDelegatedData(fields: DelegateActivity$DeletingDelegatedDataLike_4 | {
        dataType: string;
        recId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::DelegateActivity.MultipleDelegateActivities"***
     */
    MultipleDelegateActivities(activities: Array<UplcData>): isActivity;
    /**
     * access to different variants of the ***nested OtherActivity*** type needed for ***DelegateActivity:OtherActivities***.
     */
    get OtherActivities(): OtherActivityHelperNested_3;
}

/**
 * DelegateActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **10 variant(s)** of the DelegateActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateActivityLike = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivityLike_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivityLike_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivityLike_2    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivityLike_2    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivityLike_2    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$CreatingDelegatedDataLike_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$UpdatingDelegatedDataLike_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$DeletingDelegatedDataLike_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			OtherActivityLike    /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type DelegateActivityMeta = EnumTypeMeta<
    {module: "DredNodeRegistryPolicy", enumName: "DelegateActivity"}, {
    CapoLifecycleActivities: singleEnumVariantMeta<DelegateActivityMeta, "CapoLifecycleActivities",
    "Constr#0", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			CapoLifecycleActivity_2   , "noSpecialFlags"
    >,
    DelegateLifecycleActivities: singleEnumVariantMeta<DelegateActivityMeta, "DelegateLifecycleActivities",
    "Constr#1", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			DelegateLifecycleActivity_2   , "noSpecialFlags"
    >,
    SpendingActivities: singleEnumVariantMeta<DelegateActivityMeta, "SpendingActivities",
    "Constr#2", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			SpendingActivity_2   , "noSpecialFlags"
    >,
    MintingActivities: singleEnumVariantMeta<DelegateActivityMeta, "MintingActivities",
    "Constr#3", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			MintingActivity_2   , "noSpecialFlags"
    >,
    BurningActivities: singleEnumVariantMeta<DelegateActivityMeta, "BurningActivities",
    "Constr#4", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			BurningActivity_2   , "noSpecialFlags"
    >,
    CreatingDelegatedData: singleEnumVariantMeta<DelegateActivityMeta, "CreatingDelegatedData",
    "Constr#5", 
    "fields", DelegateActivity$CreatingDelegatedData_2, "isSeededActivity"
    >,
    UpdatingDelegatedData: singleEnumVariantMeta<DelegateActivityMeta, "UpdatingDelegatedData",
    "Constr#6", 
    "fields", DelegateActivity$UpdatingDelegatedData_2, "noSpecialFlags"
    >,
    DeletingDelegatedData: singleEnumVariantMeta<DelegateActivityMeta, "DeletingDelegatedData",
    "Constr#7", 
    "fields", DelegateActivity$DeletingDelegatedData_2, "noSpecialFlags"
    >,
    MultipleDelegateActivities: singleEnumVariantMeta<DelegateActivityMeta, "MultipleDelegateActivities",
    "Constr#8", "singletonField", /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>   , "noSpecialFlags"
    >,
    OtherActivities: singleEnumVariantMeta<DelegateActivityMeta, "OtherActivities",
    "Constr#9", "singletonField", /* implied wrapper { activity: ... } for singleVariantField */ 
    			OtherActivity   , "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of DelegateDatum$capoStoredData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$capoStoredData instead.
 * @public
 */
declare interface DelegateDatum$capoStoredData {
    data: AnyData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$capoStoredData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$capoStoredData instead.
 * @public
 */
declare interface DelegateDatum$capoStoredData_2 {
    data: NodeRegistrationData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$capoStoredData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$capoStoredData instead.
 * @public
 */
declare interface DelegateDatum$capoStoredData_3 {
    data: NeighborhoodData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$capoStoredData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$capoStoredData instead.
 * @public
 */
declare interface DelegateDatum$capoStoredData_4 {
    data: ProtocolSettings  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$capoStoredData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$capoStoredDataLike {
    data: AnyDataLike  /*minVariantField*/ ,
    version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$capoStoredData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$capoStoredDataLike_2 {
    data: NodeRegistrationDataLike  /*minVariantField*/ ,
    version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$capoStoredData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$capoStoredDataLike_3 {
    data: NeighborhoodDataLike  /*minVariantField*/ ,
    version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$capoStoredData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$capoStoredDataLike_4 {
    data: ProtocolSettingsLike  /*minVariantField*/ ,
    version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$Cip68RefToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$Cip68RefToken instead.
 * @public
 */
declare interface DelegateDatum$Cip68RefToken {
    cip68meta: AnyData  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$Cip68RefToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$Cip68RefToken instead.
 * @public
 */
declare interface DelegateDatum$Cip68RefToken_2 {
    cip68meta: AnyData_2  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$Cip68RefToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$Cip68RefToken instead.
 * @public
 */
declare interface DelegateDatum$Cip68RefToken_3 {
    cip68meta: AnyData_3  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateDatum$Cip68RefToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateDatum$Ergo$Cip68RefToken instead.
 * @public
 */
declare interface DelegateDatum$Cip68RefToken_4 {
    cip68meta: AnyData_4  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$Cip68RefToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$Cip68RefTokenLike {
    cip68meta: AnyDataLike  /*minVariantField*/ ,
    cip68version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$Cip68RefToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$Cip68RefTokenLike_2 {
    cip68meta: AnyDataLike_2  /*minVariantField*/ ,
    cip68version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$Cip68RefToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$Cip68RefTokenLike_3 {
    cip68meta: AnyDataLike_3  /*minVariantField*/ ,
    cip68version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateDatum$Cip68RefToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateDatum$Cip68RefTokenLike_4 {
    cip68meta: AnyDataLike_4  /*minVariantField*/ ,
    cip68version: IntLike  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$capoStoredData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$capoStoredDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$capoStoredData = {
    data: ErgoAnyData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$capoStoredData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$capoStoredDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$capoStoredData_2 = {
    data: ErgoNodeRegistrationData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$capoStoredData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$capoStoredDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$capoStoredData_3 = {
    data: ErgoNeighborhoodData  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$capoStoredData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$capoStoredDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$capoStoredData_4 = {
    data: ErgoProtocolSettings  /*minVariantField*/ ,
    version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$Cip68RefToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$Cip68RefTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$Cip68RefToken = {
    cip68meta: ErgoAnyData  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$Cip68RefToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$Cip68RefTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$Cip68RefToken_2 = {
    cip68meta: ErgoAnyData_2  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$Cip68RefToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$Cip68RefTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$Cip68RefToken_3 = {
    cip68meta: ErgoAnyData_3  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of DelegateDatum$Cip68RefToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateDatum$Cip68RefTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateDatum$Ergo$Cip68RefToken_4 = {
    cip68meta: ErgoAnyData_4  /*minVariantField*/ ,
    cip68version: bigint  /*minVariantField*/ ,
    otherDetails: UplcData  /*minVariantField*/ 
}

/**
 * DelegateDatum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateDatum = 
| { Cip68RefToken: DelegateDatum$Cip68RefToken /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredData /*minEnumVariant*/ }

/**
 * DelegateDatum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateDatum_2 = 
| { Cip68RefToken: DelegateDatum$Cip68RefToken_2 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail_2    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredData_2 /*minEnumVariant*/ }

/**
 * DelegateDatum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateDatum_3 = 
| { Cip68RefToken: DelegateDatum$Cip68RefToken_3 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail_3    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredData_3 /*minEnumVariant*/ }

/**
 * DelegateDatum enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateDatum_4 = 
| { Cip68RefToken: DelegateDatum$Cip68RefToken_4 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail_4    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredData_4 /*minEnumVariant*/ }

/**
 * Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateDatumHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateDatum, Partial<{
        Cip68RefToken: DelegateDatum$Cip68RefTokenLike;
        IsDelegation: DelegationDetailLike;
        capoStoredData: DelegateDatum$capoStoredDataLike;
    }>>;
    /**
     * generates  InlineTxOutputDatum for ***"STokMintDelegate::DelegateDatum.Cip68RefToken"***
     * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
     */
    Cip68RefToken(fields: DelegateDatum$Cip68RefTokenLike | {
        cip68meta: AnyDataLike;
        cip68version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"STokMintDelegate::DelegateDatum.IsDelegation"***
     * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
     */
    IsDelegation(dd: DelegationDetailLike | {
        capoAddr: /*minStructField*/ Address | string;
        mph: /*minStructField*/ MintingPolicyHash | string | number[];
        tn: number[];
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"STokMintDelegate::DelegateDatum.capoStoredData"***
     * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
     */
    capoStoredData(fields: DelegateDatum$capoStoredDataLike | {
        data: AnyDataLike;
        version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
}

/**
 * Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateDatumHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateDatum_2, Partial<{
        Cip68RefToken: DelegateDatum$Cip68RefTokenLike_2;
        IsDelegation: DelegationDetailLike_2;
        capoStoredData: DelegateDatum$capoStoredDataLike_2;
    }>>;
    /**
     * generates  InlineTxOutputDatum for ***"DredNodeRegistryPolicy::DelegateDatum.Cip68RefToken"***
     * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
     */
    Cip68RefToken(fields: DelegateDatum$Cip68RefTokenLike_2 | {
        cip68meta: AnyDataLike_2;
        cip68version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"DredNodeRegistryPolicy::DelegateDatum.IsDelegation"***
     * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
     */
    IsDelegation(dd: DelegationDetailLike_2 | {
        capoAddr: /*minStructField*/ Address | string;
        mph: /*minStructField*/ MintingPolicyHash | string | number[];
        tn: number[];
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"DredNodeRegistryPolicy::DelegateDatum.capoStoredData"***
     * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
     */
    capoStoredData(fields: DelegateDatum$capoStoredDataLike_2 | {
        data: NodeRegistrationDataLike;
        version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
}

/**
 * Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateDatumHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateDatum_3, Partial<{
        Cip68RefToken: DelegateDatum$Cip68RefTokenLike_3;
        IsDelegation: DelegationDetailLike_3;
        capoStoredData: DelegateDatum$capoStoredDataLike_3;
    }>>;
    /**
     * generates  InlineTxOutputDatum for ***"NeighborhoodPolicy::DelegateDatum.Cip68RefToken"***
     * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
     */
    Cip68RefToken(fields: DelegateDatum$Cip68RefTokenLike_3 | {
        cip68meta: AnyDataLike_3;
        cip68version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"NeighborhoodPolicy::DelegateDatum.IsDelegation"***
     * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
     */
    IsDelegation(dd: DelegationDetailLike_3 | {
        capoAddr: /*minStructField*/ Address | string;
        mph: /*minStructField*/ MintingPolicyHash | string | number[];
        tn: number[];
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"NeighborhoodPolicy::DelegateDatum.capoStoredData"***
     * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
     */
    capoStoredData(fields: DelegateDatum$capoStoredDataLike_3 | {
        data: NeighborhoodDataLike;
        version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
}

/**
 * Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateDatumHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateDatum_4, Partial<{
        Cip68RefToken: DelegateDatum$Cip68RefTokenLike_4;
        IsDelegation: DelegationDetailLike_4;
        capoStoredData: DelegateDatum$capoStoredDataLike_4;
    }>>;
    /**
     * generates  InlineTxOutputDatum for ***"ProtocolSettingsPolicy::DelegateDatum.Cip68RefToken"***
     * @remarks - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.
     */
    Cip68RefToken(fields: DelegateDatum$Cip68RefTokenLike_4 | {
        cip68meta: AnyDataLike_4;
        cip68version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"ProtocolSettingsPolicy::DelegateDatum.IsDelegation"***
     * @remarks - ***DelegationDetailLike*** is the same as the expanded field-type.
     */
    IsDelegation(dd: DelegationDetailLike_4 | {
        capoAddr: /*minStructField*/ Address | string;
        mph: /*minStructField*/ MintingPolicyHash | string | number[];
        tn: number[];
    }): InlineTxOutputDatum;
    /**
     * generates  InlineTxOutputDatum for ***"ProtocolSettingsPolicy::DelegateDatum.capoStoredData"***
     * @remarks - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.
     */
    capoStoredData(fields: DelegateDatum$capoStoredDataLike_4 | {
        data: ProtocolSettingsLike;
        version: IntLike;
        otherDetails: UplcData;
    }): InlineTxOutputDatum;
}

/**
 * DelegateDatum enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateDatum enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateDatumHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateDatumLike = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Cip68RefTokenLike_2 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetailLike_2    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$capoStoredDataLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type DelegateDatumMeta = EnumTypeMeta<
    {module: "DredNodeRegistryPolicy", enumName: "DelegateDatum"}, {
    Cip68RefToken: singleEnumVariantMeta<DelegateDatumMeta, "Cip68RefToken",
    "Constr#0", 
    "fields", DelegateDatum$Cip68RefToken_2, "noSpecialFlags"
    >,
    IsDelegation: singleEnumVariantMeta<DelegateDatumMeta, "IsDelegation",
    "Constr#1", "singletonField", /* implied wrapper { dd: ... } for singleVariantField */ 
    			DelegationDetail_2   , "noSpecialFlags"
    >,
    capoStoredData: singleEnumVariantMeta<DelegateDatumMeta, "capoStoredData",
    "Constr#2", 
    "fields", DelegateDatum$capoStoredData_2, "noSpecialFlags"
    >
}
>;

/**
 * An ergonomic, though less strictly-safe form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateLifecycleActivity$ReplacingMeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateLifecycleActivity$Ergo$ReplacingMe = DelegateLifecycleActivity$ReplacingMe

/**
 * An ergonomic, though less strictly-safe form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateLifecycleActivity$ReplacingMeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateLifecycleActivity$Ergo$ReplacingMe_2 = DelegateLifecycleActivity$ReplacingMe_2

/**
 * An ergonomic, though less strictly-safe form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateLifecycleActivity$ReplacingMeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateLifecycleActivity$Ergo$ReplacingMe_3 = DelegateLifecycleActivity$ReplacingMe_3

/**
 * An ergonomic, though less strictly-safe form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegateLifecycleActivity$ReplacingMeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type DelegateLifecycleActivity$Ergo$ReplacingMe_4 = DelegateLifecycleActivity$ReplacingMe_4

/**
 * A strong type for the canonical form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateLifecycleActivity$Ergo$ReplacingMe instead.
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMe {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateLifecycleActivity$Ergo$ReplacingMe instead.
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMe_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateLifecycleActivity$Ergo$ReplacingMe instead.
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMe_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see DelegateLifecycleActivity$Ergo$ReplacingMe instead.
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMe_4 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMeLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMeLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMeLike_3 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of DelegateLifecycleActivity$ReplacingMe
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegateLifecycleActivity$ReplacingMeLike_4 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ 
}

/**
 * DelegateLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateLifecycleActivity = 
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMe /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }

/**
 * DelegateLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateLifecycleActivity_2 = 
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMe_2 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }

/**
 * DelegateLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateLifecycleActivity_3 = 
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMe_3 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }

/**
 * DelegateLifecycleActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateLifecycleActivity_4 = 
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMe_4 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_2, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_2;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_3, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_3;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_4, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_4;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_2, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_2;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_3, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_3;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateLifecycleActivityHelperNested_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateLifecycleActivity_4, Partial<{
        ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_4;
        Retiring: tagOnly;
        ValidatingSettings: tagOnly;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$ReplacingMe}` for use in a context
     * providing an implicit seed utxo.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ReplacingMe(value: hasSeed, fields: {
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***
     * with raw seed details included in fields.
     */
    ReplacingMe(fields: DelegateLifecycleActivity$ReplacingMeLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe"***,
     * @param fields - \{ purpose: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$ReplacingMe({ purpose })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    $seeded$ReplacingMe: (fields: {
        purpose: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    }) => isActivity>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Retiring(): {
        redeemer: UplcData;
    };
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get ValidatingSettings(): {
        redeemer: UplcData;
    };
}

/**
 * DelegateLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateLifecycleActivityLike = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateLifecycleActivityLike_2 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_2 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateLifecycleActivityLike_3 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_3 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateLifecycleActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the DelegateLifecycleActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateLifecycleActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateLifecycleActivityLike_4 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$ReplacingMeLike_4 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type DelegateLifecycleActivityMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "DelegateLifecycleActivity"}, {
    ReplacingMe: singleEnumVariantMeta<DelegateLifecycleActivityMeta, "ReplacingMe",
    "Constr#0", 
    "fields", DelegateLifecycleActivity$ReplacingMe_2, "isSeededActivity"
    >,
    Retiring: singleEnumVariantMeta<DelegateLifecycleActivityMeta, "Retiring",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    ValidatingSettings: singleEnumVariantMeta<DelegateLifecycleActivityMeta, "ValidatingSettings",
    "Constr#2", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateRole = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateRole_2 = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateRole_3 = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateRole_4 = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * DelegateRole enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DelegateRole_5 = 
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateRoleHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_2, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     */
    DgDataPolicy(name: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     */
    OtherNamedDgt(name: string): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateRoleHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_3, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     */
    DgDataPolicy(name: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     */
    OtherNamedDgt(name: string): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateRoleHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_4, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     */
    DgDataPolicy(name: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     */
    OtherNamedDgt(name: string): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DelegateRoleHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DelegateRole_5, Partial<{
        MintDgt: tagOnly;
        SpendDgt: tagOnly;
        MintInvariant: tagOnly;
        SpendInvariant: tagOnly;
        DgDataPolicy: string;
        OtherNamedDgt: string;
        BothMintAndSpendDgt: tagOnly;
        HandledByCapoOnly: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get MintDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get SpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.MintInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#2***
     */
    get MintInvariant(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.SpendInvariant"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get SpendInvariant(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.DgDataPolicy"***
     */
    DgDataPolicy(name: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::DelegateRole.OtherNamedDgt"***
     */
    OtherNamedDgt(name: string): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#6***
     */
    get BothMintAndSpendDgt(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#7***
     */
    get HandledByCapoOnly(): UplcData;
}

/**
 * DelegateRole enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateRoleLike = IntersectedEnum<
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateRole enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateRoleLike_2 = IntersectedEnum<
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateRole enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateRoleLike_3 = IntersectedEnum<
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }
>

/**
 * DelegateRole enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **8 variant(s)** of the DelegateRole enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DelegateRoleHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DelegateRoleLike_4 = IntersectedEnum<
| { MintDgt: tagOnly /*minEnumVariant*/ }
| { SpendDgt: tagOnly /*minEnumVariant*/ }
| { MintInvariant: tagOnly /*minEnumVariant*/ }
| { SpendInvariant: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { OtherNamedDgt: /* implied wrapper { name: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { BothMintAndSpendDgt: tagOnly /*minEnumVariant*/ }
| { HandledByCapoOnly: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type DelegateRoleMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "DelegateRole"}, {
    MintDgt: singleEnumVariantMeta<DelegateRoleMeta, "MintDgt",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    SpendDgt: singleEnumVariantMeta<DelegateRoleMeta, "SpendDgt",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    MintInvariant: singleEnumVariantMeta<DelegateRoleMeta, "MintInvariant",
    "Constr#2", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    SpendInvariant: singleEnumVariantMeta<DelegateRoleMeta, "SpendInvariant",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    DgDataPolicy: singleEnumVariantMeta<DelegateRoleMeta, "DgDataPolicy",
    "Constr#4", "singletonField", /* implied wrapper { name: ... } for singleVariantField */ 
    			string   , "noSpecialFlags"
    >,
    OtherNamedDgt: singleEnumVariantMeta<DelegateRoleMeta, "OtherNamedDgt",
    "Constr#5", "singletonField", /* implied wrapper { name: ... } for singleVariantField */ 
    			string   , "noSpecialFlags"
    >,
    BothMintAndSpendDgt: singleEnumVariantMeta<DelegateRoleMeta, "BothMintAndSpendDgt",
    "Constr#6", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    HandledByCapoOnly: singleEnumVariantMeta<DelegateRoleMeta, "HandledByCapoOnly",
    "Constr#7", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of DelegationDetail
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDelegationDetail instead.
 * @public
 */
declare interface DelegationDetail {
    capoAddr: /*minStructField*/ Address
    mph: /*minStructField*/ MintingPolicyHash
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of DelegationDetail
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDelegationDetail instead.
 * @public
 */
declare interface DelegationDetail_2 {
    capoAddr: /*minStructField*/ Address
    mph: /*minStructField*/ MintingPolicyHash
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of DelegationDetail
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDelegationDetail instead.
 * @public
 */
declare interface DelegationDetail_3 {
    capoAddr: /*minStructField*/ Address
    mph: /*minStructField*/ MintingPolicyHash
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of DelegationDetail
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDelegationDetail instead.
 * @public
 */
declare interface DelegationDetail_4 {
    capoAddr: /*minStructField*/ Address
    mph: /*minStructField*/ MintingPolicyHash
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of DelegationDetail
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegationDetailLike {
    capoAddr: /*minStructField*/ Address | string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of DelegationDetail
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegationDetailLike_2 {
    capoAddr: /*minStructField*/ Address | string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of DelegationDetail
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegationDetailLike_3 {
    capoAddr: /*minStructField*/ Address | string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of DelegationDetail
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DelegationDetailLike_4 {
    capoAddr: /*minStructField*/ Address | string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    tn: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of dgd_DataSrc$Both
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see dgd_DataSrc$Ergo$Both instead.
 * @public
 */
declare interface dgd_DataSrc$Both {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of dgd_DataSrc$Both
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see dgd_DataSrc$Ergo$Both instead.
 * @public
 */
declare interface dgd_DataSrc$Both_2 {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of dgd_DataSrc$Both
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface dgd_DataSrc$BothLike {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of dgd_DataSrc$Both
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface dgd_DataSrc$BothLike_2 {
    utxo: TxInput  /*minVariantField*/ ,
    txo: TxOutput  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of dgd_DataSrc$Both
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the dgd_DataSrc$BothLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type dgd_DataSrc$Ergo$Both = dgd_DataSrc$Both

/**
 * An ergonomic, though less strictly-safe form of dgd_DataSrc$Both
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the dgd_DataSrc$BothLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type dgd_DataSrc$Ergo$Both_2 = dgd_DataSrc$Both_2

/**
 * dgd_DataSrc enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type dgd_DataSrc = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Both /*minEnumVariant*/ }

/**
 * dgd_DataSrc enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type dgd_DataSrc_2 = 
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Both_2 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***dgd_DataSrc*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class dgd_DataSrcHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<dgd_DataSrc, Partial<{
        Unk: tagOnly;
        Input: TxInput;
        Output: TxOutput;
        Both: dgd_DataSrc$BothLike;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::dgd_DataSrc.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Input"***
     */
    Input(utxo: TxInput): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Output"***
     */
    Output(txo: TxOutput): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Both"***
     * @remarks - ***dgd_DataSrc$BothLike*** is the same as the expanded field-types.
     */
    Both(fields: dgd_DataSrc$BothLike | {
        utxo: TxInput;
        txo: TxOutput;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***dgd_DataSrc*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class dgd_DataSrcHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<dgd_DataSrc_2, Partial<{
        Unk: tagOnly;
        Input: TxInput;
        Output: TxOutput;
        Both: dgd_DataSrc$BothLike_2;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::dgd_DataSrc.Unk"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get Unk(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Input"***
     */
    Input(utxo: TxInput): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Output"***
     */
    Output(txo: TxOutput): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::dgd_DataSrc.Both"***
     * @remarks - ***dgd_DataSrc$BothLike*** is the same as the expanded field-types.
     */
    Both(fields: dgd_DataSrc$BothLike_2 | {
        utxo: TxInput;
        txo: TxOutput;
    }): UplcData;
}

/**
 * dgd_DataSrc enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type dgd_DataSrcLike = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$BothLike /*minEnumVariant*/ }
>

/**
 * dgd_DataSrc enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the dgd_DataSrc enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `dgd_DataSrcHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type dgd_DataSrcLike_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$BothLike_2 /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type dgd_DataSrcMeta = EnumTypeMeta<
    {module: "CapoHelpers", enumName: "dgd_DataSrc"}, {
    Unk: singleEnumVariantMeta<dgd_DataSrcMeta, "Unk",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    Input: singleEnumVariantMeta<dgd_DataSrcMeta, "Input",
    "Constr#1", "singletonField", /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput   , "noSpecialFlags"
    >,
    Output: singleEnumVariantMeta<dgd_DataSrcMeta, "Output",
    "Constr#2", "singletonField", /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput   , "noSpecialFlags"
    >,
    Both: singleEnumVariantMeta<dgd_DataSrcMeta, "Both",
    "Constr#3", 
    "fields", dgd_DataSrc$Both, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of DgDataDetails
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDgDataDetails instead.
 * @public
 */
declare interface DgDataDetails {
    dataSrc: /*minStructField*/ dgd_DataSrc
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash
    activity: /*minStructField*/ AbstractDelegateActivitiesEnum | undefined
}

/**
 * A strong type for the canonical form of DgDataDetails
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoDgDataDetails instead.
 * @public
 */
declare interface DgDataDetails_2 {
    dataSrc: /*minStructField*/ dgd_DataSrc_2
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash
    activity: /*minStructField*/ AbstractDelegateActivitiesEnum_2 | undefined
}

/**
 * A strong type for the permissive form of DgDataDetails
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DgDataDetailsLike {
    dataSrc: /*minStructField*/ dgd_DataSrcLike
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike | undefined
}

/**
 * A strong type for the permissive form of DgDataDetails
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface DgDataDetailsLike_2 {
    dataSrc: /*minStructField*/ dgd_DataSrcLike_2
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash | string | number[]
    activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike_2 | undefined
}

/**
 * @public
 */
export declare class DredCapo extends StellarTokenomicsCapo<DredCapo, DredCapoFeatures> {
    autoSetup: boolean;
    get defaultFeatureFlags(): DredCapoFeatures;
    scriptBundleClass(): Promise<DredCapoBundle>;
    /**
     * locates the current settings for the capo
     */
    findSettingsInfo(options: {
        charterData: CharterData;
        capoUtxos?: TxInput[];
    }): Promise<FoundDatumUtxo<ErgoProtocolSettings, ProtocolSettings>>;
    /**
     * Finds and instantiates the mint delegate for the capo
     */
    getMintDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<MyMintSpendDelegate>;
    /**
     * Finds and instantiates the spend delegate for the capo
     */
    getSpendDelegate(charterData?: CapoDatum$Ergo$CharterData): Promise<MyMintSpendDelegate>;
    /**
     * Finds and instantiates the node registry controller for the capo
     */
    getNodeRegistryController(charterData?: CapoDatum$Ergo$CharterData): Promise<NodeRegistryController>;
    /**
     * Finds and instantiates the neighborhood registry controller for the capo
     */
    getNbhRegistryController(charterData?: CapoDatum$Ergo$CharterData): Promise<NeighborhoodController>;
    /**
     * Finds and instantiates the settings controller for the capo
     */
    getSettingsController(options: {
        charterData: CharterData;
        optional?: true;
    }): Promise<ProtocolSettingsController>;
    /**
     * Creates the initial settings for the capo
     */
    mkInitialSettings(): Promise<minimalProtocolSettings>;
    /**
     * Finds all the node-registration records
     * @remarks
     * This is a convenience method for finding all the node-registration records.
     * It is equivalent to calling `findDelegatedDataUtxos` with the type `"DredNode"`.
     */
    findNodeOpEntries(options: {
        charterData: CharterData;
        capoUtxos?: TxInput[];
    }): Promise<FoundDatumUtxo<ErgoNodeRegistrationData_2, unknown>[]>;
    /**
     * Finds all the neighborhood-registration records
     */
    findNbhRegistryEntries(): Promise<FoundDatumUtxo<ErgoNeighborhoodData, unknown>[]>;
    /**
     * Initializes the delegate roles for the capo
     * @internal
     */
    initDelegateRoles(): basicDelegateMap<any>;
    /**
     * Mints fungible tokens under the Capo's minting policy
     */
    txnMintingFungibleTokens<TCX extends StellarTxnContext>(tcx: TCX, tokenName: string | number[], tokenCount: bigint): Promise<TCX & hasCharterRef & hasGovAuthority>;
    todoAddNamedDelegates(): void;
    requirements(): ReqtsMap<"is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated" | "Provides a single entry point dApps can use to get tokenomics for their project" | "Uses the Capo (leader) to gather tokenomics-related contracts together" | "Defines a tokenomics minting delegate" | "Has a settings data structure where tokenomics plugins can store protocol parameters" | "issues 'membership card' tokens to participants" | "Can upgrade the Settings data" | "the settings data can be updated to have new details if backward compatible" | "Can find membership card tokens for participants" | "has custom settings for protocol parameters" | "Provides a Node Operator registry, in which node operators can maintain their node registrations", {
    inheriting: "is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated" | "Provides a single entry point dApps can use to get tokenomics for their project" | "Uses the Capo (leader) to gather tokenomics-related contracts together" | "Defines a tokenomics minting delegate" | "Has a settings data structure where tokenomics plugins can store protocol parameters" | "issues 'membership card' tokens to participants" | "Can upgrade the Settings data" | "the settings data can be updated to have new details if backward compatible" | "Can find membership card tokens for participants";
    }> & ReqtsMap<"is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated" | "Provides a single entry point dApps can use to get tokenomics for their project" | "Uses the Capo (leader) to gather tokenomics-related contracts together" | "Defines a tokenomics minting delegate" | "Has a settings data structure where tokenomics plugins can store protocol parameters" | "issues 'membership card' tokens to participants" | "Can upgrade the Settings data" | "the settings data can be updated to have new details if backward compatible" | "Can find membership card tokens for participants", {
    inheriting: "is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated";
    }> & ReqtsMap<"is a base class for leader/Capo pattern" | "can create unique utility tokens" | "supports the Delegation pattern using roles and strategy-variants" | "supports well-typed role declarations and strategy-adding" | "supports just-in-time strategy-selection using txnCreateDelegateLink()" | "given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings" | "supports concrete resolution of existing role delegates" | "Each role uses a RoleVariants structure which can accept new variants" | "provides a Strategy type for binding a contract to a strategy-variant name" | "can locate UUTs in the user's wallet" | "positively governs all administrative actions" | "has a unique, permanent charter token" | "has a unique, permanent treasury address" | "the charter token is always kept in the contract" | "the charter details can be updated by authority of the capoGov-* token" | "can mint other tokens, on the authority of the charter's registered mintDgt- token" | "can handle large transactions with reference scripts" | "has a singleton minting policy" | "can update the minting delegate in the charter data" | "can update the spending delegate in the charter data" | "can add invariant minting delegates to the charter data" | "can add invariant spending delegates to the charter data" | "supports an abstract Settings structure stored in the contact" | "added and updated delegates always validate the present configuration data" | "can commit new delegates" | "supports storing new types of datum not pre-defined in the Capo's on-chain script" | "the charter has a namedDelegates structure for semantic delegate links" | "CreatingDelegatedDatum: creates a UTxO with any custom datum" | "UpdatingDelegatedDatum: checks that a custom data element can be updated", {
    inheriting: "\u2039empty/base class\u203A";
    }>;
}

declare class DredCapo_2 extends StellarTokenomicsCapo {
    autoSetup = true;
    get defaultFeatureFlags() {
        return {
            settings: true,
            DredNode: true,
            DredNbh: true
            /* Add other feature-flag defaults here */
        };
    }
    async scriptBundleClass() {
        const t = await import('./contracts-preprod/DredCapo.hlb.mjs');
        return t.DredCapoBundle;
    }
    /**
     * locates the current settings for the capo
     */
    async findSettingsInfo(options) {
        return super.findSettingsInfo(options);
    }
    /**
     * Finds and instantiates the mint delegate for the capo
     */
    async getMintDelegate(charterData) {
        return super.getMintDelegate(charterData);
    }
    /**
     * Finds and instantiates the spend delegate for the capo
     */
    async getSpendDelegate(charterData) {
        return super.getSpendDelegate(charterData);
    }
    /**
     * Finds and instantiates the node registry controller for the capo
     */
    async getNodeRegistryController(charterData) {
        if (!charterData) {
            charterData = await this.findCharterData();
        }
        return this.getDgDataController("DredNode", {
            charterData
        });
    }
    /**
     * Finds and instantiates the neighborhood registry controller for the capo
     */
    async getNbhRegistryController(charterData) {
        if (!charterData) {
            charterData = await this.findCharterData();
        }
        return this.getDgDataController("DredNbh", {
            charterData
        });
    }
    /**
     * Finds and instantiates the settings controller for the capo
     */
    async getSettingsController(options) {
        return this.getDgDataController("settings", options);
    }
    /* add other controller-fetching methods here */
    /**
     * Creates the initial settings for the capo
     */
    async mkInitialSettings() {
        return {
            nodeOpSettings: { V1: {
                    expectedHeartbeatInterval: BigInt(72 * 60 * 60 * 1e3),
                    minNodeOperatorStake: makeValue(this.ADA(200n)),
                    minNodeRegistrationFee: makeValue(this.ADA(50n)),
                    requiredNodeUptime: 0.95,
                    minValidations: 1
                } },
            nbhSettings: {
                V1: {
                    minNbhStake: makeValue(this.ADA(5000n)),
                    minRegistrationFee: makeValue(this.ADA(4000n))
                }
            }
        };
    }
    /**
     * Finds all the node-registration records
     * @remarks
     * This is a convenience method for finding all the node-registration records.
     * It is equivalent to calling `findDelegatedDataUtxos` with the type `"DredNode"`.
     */
    async findNodeOpEntries(options) {
        return this.findDelegatedDataUtxos({
            type: "DredNode",
            charterData: options.charterData,
            capoUtxos: options.capoUtxos
        });
    }
    /**
     * Finds all the neighborhood-registration records
     */
    async findNbhRegistryEntries() {
        return this.findDelegatedDataUtxos({
            type: "dredNbh"
        });
    }
    /* add other model-specific finders here */
    /**
     * Initializes the delegate roles for the capo
     * @internal
     */
    initDelegateRoles() {
        const inh = super.basicDelegateRoles();
        const govAuthority = inh.govAuthority;
        const myDelegates = delegateRoles({
            spendDelegate: defineRole("spendDgt", MyMintSpendDelegate, {}),
            mintDelegate: defineRole("mintDgt", MyMintSpendDelegate, {}),
            govAuthority,
            settings: defineRole("dgDataPolicy", ProtocolSettingsController, {}),
            DredNode: defineRole("dgDataPolicy", NodeRegistryController, {}),
            DredNbh: defineRole("dgDataPolicy", NeighborhoodController, {})
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
    async txnMintingFungibleTokens(tcx, tokenName, tokenCount) {
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
                "  ... while leaving its existing client scripts unmodified, "
                ],
                mech: [
                "has an initial discount scale for artists and listeners",
                "has staking-reward settings",
                "provides a 'settings' struct in a module that other contracts import to access parameters"
                ],
                requiresInherited: [
                "Has a settings data structure where tokenomics plugins can store protocol parameters",
                "Can upgrade the Settings data"
                ]
            },
            "Provides a Node Operator registry, in which node operators can maintain their node registrations": {
                purpose: "so node operators can publish their server availability",
                details: ["Node operators can join the network and contribute capacity."],
                mech: [
                "Allows registering a node operator record with the DRED.nodeOperator token",
                "Registers the member-* id with the node registration record"
                ],
                requires: [],
                requiresInherited: [
                "supports the Delegation pattern using roles and strategy-variants"
                ]
            }
        });
    }
}

declare type DredCapoFeatures = {
    settings?: boolean;
    DredNode?: boolean;
    DredNbh?: boolean;
};

/**
 * @public
 */
export declare function DredCapoProvider({ children, bfPreprodKey: propKey, }: DredCapoProviderProps): React_2.JSX.Element;

declare interface DredCapoProviderProps {
    children: React_2.ReactNode;
    bfPreprodKey?: string;
}

/**
 * component for providing the DredCapo context to the app
 * @remarks
 * dApps shouldn't need to use this component directly.  Instead,
 * use the DredCapoProvider component, and use useCapoDappProvider()
 * and/or dredCapoSignals to access the state of the DredCapo.
 * @public
 */
export declare class DredCapoProviderRaw extends CapoDAppProvider<DredCapo_2 & any, UserActionMap<"ourActivity1">> {
    getStartedMessage(): string;
}

/**
 * Signals for state updates in the DredCapo provider
 * @public
 */
export declare const dredCapoSignals: typeof coreSignals & typeof computedSignals;

/**
 * Signal updater functions
 * @public
 */
export declare const dredCapoUpdaters: {
    updateNetwork: (network: any) => void;
    updateWalletHandle: (handle: any) => void;
    updateProvider: (provider: CapoDAppProvider<DredCapo, any> | undefined) => void;
    updateDAppStatus: (status: CapoDappStatus<any>) => void;
    updateUserInfo: (info: any) => void;
    addFailedTxn: (txn: TxDescription<any, "built">) => void;
};

/**
 * GENERATED data bridge for **BasicDelegate** script (defined in class ***NodeRegistryBundle***)
 * main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**
 * @remarks
 * This class doesn't need to be used directly.  Its methods are available through the ***contract's methods***:
 *  - `get mkDatum` - returns the datum-building bridge for the contract's datum type
 *  - `get activity` - returns an activity-building bridge for the contract's activity type
 *  - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types
 *  - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script
 * The advanced methods are not typically needed - mkDatum and activity should normally provide all the
 * type-safe data-encoding needed for the contract.  For reading on-chain data, the Capo's `findDelegatedDataUtxos()`
 * method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.
 *
 * ##### customizing the bridge class name
 * Note that you may override `get bridgeClassName() { return "..." }` to customize the name of this bridge class
 * @public
 */
declare class DredNodeRegistryPolicyDataBridge extends ContractDataBridge {
    static isAbstract: false;
    isAbstract: false;
    /**
     * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)***
     * for this contract script.
     */
    datum: DelegateDatumHelper_2;
    /**
     * this is the specific type of datum for the `BasicDelegate` script
     */
    DelegateDatum: DelegateDatumHelper_2;
    readDatum: (d: UplcData) => ErgoDelegateDatum_2;
    /**
     * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script
     */
    activity: DelegateActivityHelper_2;
    DelegateActivity: DelegateActivityHelper_2;
    reader: DredNodeRegistryPolicyDataBridgeReader;
    /**
     * accessors for all the types defined in the `BasicDelegate` script
     * @remarks - these accessors are used to generate UplcData for each type
     */
    types: {
        /**
         * generates UplcData for the enum type ***DredNodeState*** for the `BasicDelegate` script
         */
        DredNodeState: DredNodeStateHelper;
        /**
         * generates UplcData for the enum type ***DelegateDatum*** for the `BasicDelegate` script
         */
        DelegateDatum: DelegateDatumHelper_2;
        /**
         * generates UplcData for the enum type ***DelegateRole*** for the `BasicDelegate` script
         */
        DelegateRole: DelegateRoleHelper_2;
        /**
         * generates UplcData for the enum type ***ManifestActivity*** for the `BasicDelegate` script
         */
        ManifestActivity: ManifestActivityHelper_2;
        /**
         * generates UplcData for the enum type ***CapoLifecycleActivity*** for the `BasicDelegate` script
         */
        CapoLifecycleActivity: CapoLifecycleActivityHelper_2;
        /**
         * generates UplcData for the enum type ***DelegateLifecycleActivity*** for the `BasicDelegate` script
         */
        DelegateLifecycleActivity: DelegateLifecycleActivityHelper_2;
        /**
         * generates UplcData for the enum type ***SpendingActivity*** for the `BasicDelegate` script
         */
        SpendingActivity: SpendingActivityHelper_2;
        /**
         * generates UplcData for the enum type ***MintingActivity*** for the `BasicDelegate` script
         */
        MintingActivity: MintingActivityHelper_2;
        /**
         * generates UplcData for the enum type ***BurningActivity*** for the `BasicDelegate` script
         */
        BurningActivity: BurningActivityHelper_2;
        /**
         * generates UplcData for the enum type ***OtherActivity*** for the `BasicDelegate` script
         */
        OtherActivity: OtherActivityHelper;
        /**
         * generates UplcData for the enum type ***DelegateActivity*** for the `BasicDelegate` script
         */
        DelegateActivity: DelegateActivityHelper_2;
        /**
         * generates UplcData for the enum type ***PendingDelegateAction*** for the `BasicDelegate` script
         */
        PendingDelegateAction: PendingDelegateActionHelper_2;
        /**
         * generates UplcData for the enum type ***ManifestEntryType*** for the `BasicDelegate` script
         */
        ManifestEntryType: ManifestEntryTypeHelper_2;
        /**
         * generates UplcData for the enum type ***PendingCharterChange*** for the `BasicDelegate` script
         */
        PendingCharterChange: PendingCharterChangeHelper_2;
        /**
         * generates UplcData for the enum type ***cctx_CharterInputType*** for the `BasicDelegate` script
         */
        cctx_CharterInputType: cctx_CharterInputTypeHelper_2;
        /**
         * generates UplcData for the enum type ***NodeOperatorSettings*** for the `BasicDelegate` script
         */
        NodeOperatorSettings: NodeOperatorSettingsHelper;
        /**
         * generates UplcData for the enum type ***dgd_DataSrc*** for the `BasicDelegate` script
         */
        dgd_DataSrc: dgd_DataSrcHelper;
        /**
         * generates UplcData for the enum type ***AbstractDelegateActivitiesEnum*** for the `BasicDelegate` script
         */
        AbstractDelegateActivitiesEnum: AbstractDelegateActivitiesEnumHelper;
        /**
         * generates UplcData for the enum type ***AnyData*** for the `BasicDelegate` script
         */
        AnyData: (fields: AnyDataLike_2 | {
            id: number[];
            type: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DelegationDetail*** for the `BasicDelegate` script
         */
        DelegationDetail: (fields: DelegationDetailLike_2 | {
            capoAddr: /*minStructField*/ Address | string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            tn: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NodeDetailsV1*** for the `BasicDelegate` script
         */
        NodeDetailsV1: (fields: NodeDetailsV1Like | {
            address: string;
            port: IntLike;
            pubKey: /*minStructField*/ PubKey | string | number[];
            pubKeyHash: /*minStructField*/ PubKeyHash | string | number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NodeRegistrationData*** for the `BasicDelegate` script
         */
        NodeRegistrationData: (fields: NodeRegistrationDataLike | {
            id: number[];
            type: string;
            memberToken: string;
            state: DredNodeStateLike;
            nodeDetails: NodeDetailsV1Like;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
         */
        RelativeDelegateLink: (fields: RelativeDelegateLinkLike_2 | {
            uutName: string;
            delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
            config: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***PendingDelegateChange*** for the `BasicDelegate` script
         */
        PendingDelegateChange: (fields: PendingDelegateChangeLike_2 | {
            action: PendingDelegateActionLike_2;
            role: DelegateRoleLike_2;
            dgtLink: /*minStructField*/ RelativeDelegateLinkLike_2 | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoManifestEntry*** for the `BasicDelegate` script
         */
        CapoManifestEntry: (fields: CapoManifestEntryLike_2 | {
            entryType: ManifestEntryTypeLike_2;
            tokenName: number[];
            mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoCtx*** for the `BasicDelegate` script
         */
        CapoCtx: (fields: CapoCtxLike_2 | {
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            charter: cctx_CharterInputTypeLike_2;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NodeOperatorSettingsV1*** for the `BasicDelegate` script
         */
        NodeOperatorSettingsV1: (fields: NodeOperatorSettingsV1Like | {
            expectedHeartbeatInterval: IntLike;
            requiredNodeUptime: number;
            minValidations: IntLike;
            minNodeRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***AbstractSettingsForNodeOperator*** for the `BasicDelegate` script
         */
        AbstractSettingsForNodeOperator: (fields: AbstractSettingsForNodeOperatorLike | {
            nodeOpSettings: NodeOperatorSettingsLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DgDataDetails*** for the `BasicDelegate` script
         */
        DgDataDetails: (fields: DgDataDetailsLike | {
            dataSrc: dgd_DataSrcLike;
            id: number[];
            type: string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike | undefined;
        }) => UplcData;
    };
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAnyDataCast: Cast<AnyData_2, AnyDataLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDelegationDetailCast: Cast<DelegationDetail_2, DelegationDetailLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNodeDetailsV1Cast: Cast<NodeDetailsV1, NodeDetailsV1Like>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNodeRegistrationDataCast: Cast<NodeRegistrationData, NodeRegistrationDataLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink_3, RelativeDelegateLinkLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺPendingDelegateChangeCast: Cast<PendingDelegateChange_2, PendingDelegateChangeLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoManifestEntryCast: Cast<CapoManifestEntry_2, CapoManifestEntryLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoCtxCast: Cast<CapoCtx_2, CapoCtxLike_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNodeOperatorSettingsV1Cast: Cast<NodeOperatorSettingsV1_2, NodeOperatorSettingsV1Like>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAbstractSettingsForNodeOperatorCast: Cast<AbstractSettingsForNodeOperator, AbstractSettingsForNodeOperatorLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDgDataDetailsCast: Cast<DgDataDetails, DgDataDetailsLike>;
}

/**
 * @public
 */
declare class DredNodeRegistryPolicyDataBridgeReader extends DataBridgeReaderClass {
    bridge: DredNodeRegistryPolicyDataBridge;
    constructor(bridge: DredNodeRegistryPolicyDataBridge, isMainnet: boolean);
    /**
     * reads UplcData *known to fit the **DredNodeState*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DredNodeState(d: UplcData): ErgoDredNodeState;
    datum: (d: UplcData) => Partial<{
        Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_2;
        IsDelegation: ErgoDelegationDetail_2;
        capoStoredData: DelegateDatum$Ergo$capoStoredData_2;
    }>;
    /**
     * reads UplcData *known to fit the **DelegateDatum*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateDatum(d: UplcData): ErgoDelegateDatum_2;
    /**
     * reads UplcData *known to fit the **DelegateRole*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateRole(d: UplcData): ErgoDelegateRole_3;
    /**
     * reads UplcData *known to fit the **ManifestActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestActivity(d: UplcData): ErgoManifestActivity_3;
    /**
     * reads UplcData *known to fit the **CapoLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoLifecycleActivity(d: UplcData): ErgoCapoLifecycleActivity_2;
    /**
     * reads UplcData *known to fit the **DelegateLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateLifecycleActivity(d: UplcData): ErgoDelegateLifecycleActivity_2;
    /**
     * reads UplcData *known to fit the **SpendingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    SpendingActivity(d: UplcData): ErgoSpendingActivity_2;
    /**
     * reads UplcData *known to fit the **MintingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    MintingActivity(d: UplcData): ErgoMintingActivity_2;
    /**
     * reads UplcData *known to fit the **BurningActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    BurningActivity(d: UplcData): ErgoBurningActivity_2;
    /**
     * reads UplcData *known to fit the **OtherActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    OtherActivity(d: UplcData): ErgoOtherActivity;
    /**
     * reads UplcData *known to fit the **DelegateActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateActivity(d: UplcData): ErgoDelegateActivity_2;
    /**
     * reads UplcData *known to fit the **PendingDelegateAction*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateAction(d: UplcData): ErgoPendingDelegateAction_3;
    /**
     * reads UplcData *known to fit the **ManifestEntryType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestEntryType(d: UplcData): ErgoManifestEntryType_3;
    /**
     * reads UplcData *known to fit the **PendingCharterChange*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingCharterChange(d: UplcData): ErgoPendingCharterChange_3;
    /**
     * reads UplcData *known to fit the **cctx_CharterInputType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    cctx_CharterInputType(d: UplcData): Ergocctx_CharterInputType_2;
    /**
     * reads UplcData *known to fit the **NodeOperatorSettings*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NodeOperatorSettings(d: UplcData): ErgoNodeOperatorSettings_2;
    /**
     * reads UplcData *known to fit the **dgd_DataSrc*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    dgd_DataSrc(d: UplcData): Ergodgd_DataSrc;
    /**
     * reads UplcData *known to fit the **AbstractDelegateActivitiesEnum*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AbstractDelegateActivitiesEnum(d: UplcData): ErgoAbstractDelegateActivitiesEnum;
    /**
     * reads UplcData *known to fit the **AnyData*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AnyData(d: UplcData): AnyData_2;
    /**
     * reads UplcData *known to fit the **DelegationDetail*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegationDetail(d: UplcData): DelegationDetail_2;
    /**
     * reads UplcData *known to fit the **NodeDetailsV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NodeDetailsV1(d: UplcData): NodeDetailsV1;
    /**
     * reads UplcData *known to fit the **NodeRegistrationData*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NodeRegistrationData(d: UplcData): NodeRegistrationData;
    /**
     * reads UplcData *known to fit the **RelativeDelegateLink*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    RelativeDelegateLink(d: UplcData): RelativeDelegateLink_3;
    /**
     * reads UplcData *known to fit the **PendingDelegateChange*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateChange(d: UplcData): PendingDelegateChange_2;
    /**
     * reads UplcData *known to fit the **CapoManifestEntry*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoManifestEntry(d: UplcData): CapoManifestEntry_2;
    /**
     * reads UplcData *known to fit the **CapoCtx*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoCtx(d: UplcData): CapoCtx_2;
    /**
     * reads UplcData *known to fit the **NodeOperatorSettingsV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NodeOperatorSettingsV1(d: UplcData): NodeOperatorSettingsV1_2;
    /**
     * reads UplcData *known to fit the **AbstractSettingsForNodeOperator*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AbstractSettingsForNodeOperator(d: UplcData): AbstractSettingsForNodeOperator;
    /**
     * reads UplcData *known to fit the **DgDataDetails*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DgDataDetails(d: UplcData): DgDataDetails;
}

/**
 * DredNodeState enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the DredNodeState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DredNodeStateHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DredNodeState = 
| { NeedsValidation: /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>    /*minEnumVariant*/ }
| { Active: /* implied wrapper { lastHeartbeat: ... } for singleVariantField */ 
    			number    /*minEnumVariant*/ }
| { NeedsHeartbeats: /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>    /*minEnumVariant*/ }
| { Inactive: tagOnly /*minEnumVariant*/ }

/**
 * DredNodeState enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **4 variant(s)** of the DredNodeState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DredNodeStateHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type DredNodeState_2 = 
| { NeedsValidation: /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>    /*minEnumVariant*/ }
| { Active: /* implied wrapper { lastHeartbeat: ... } for singleVariantField */ 
    			number    /*minEnumVariant*/ }
| { NeedsHeartbeats: /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>    /*minEnumVariant*/ }
| { Inactive: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***DredNodeState*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class DredNodeStateHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<DredNodeState, Partial<{
        NeedsValidation: Array<number[]>;
        Active: types.TimeLike;
        NeedsHeartbeats: Array<number[]>;
        Inactive: tagOnly;
    }>>;
    /**
     * generates  UplcData for ***"NodeRegistrationData::DredNodeState.NeedsValidation"***
     */
    NeedsValidation(validators: Array<number[]>): UplcData;
    /**
     * generates  UplcData for ***"NodeRegistrationData::DredNodeState.Active"***
     */
    Active(lastHeartbeat: TimeLike_2): UplcData;
    /**
     * generates  UplcData for ***"NodeRegistrationData::DredNodeState.NeedsHeartbeats"***
     */
    NeedsHeartbeats(validators: Array<number[]>): UplcData;
    /**
     * (property getter): UplcData for ***"NodeRegistrationData::DredNodeState.Inactive"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get Inactive(): UplcData;
}

/**
 * DredNodeState enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **4 variant(s)** of the DredNodeState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `DredNodeStateHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type DredNodeStateLike = IntersectedEnum<
| { NeedsValidation: /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>    /*minEnumVariant*/ }
| { Active: /* implied wrapper { lastHeartbeat: ... } for singleVariantField */ 
    			TimeLike    /*minEnumVariant*/ }
| { NeedsHeartbeats: /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>    /*minEnumVariant*/ }
| { Inactive: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type DredNodeStateMeta = EnumTypeMeta<
    {module: "NodeRegistrationData", enumName: "DredNodeState"}, {
    NeedsValidation: singleEnumVariantMeta<DredNodeStateMeta, "NeedsValidation",
    "Constr#0", "singletonField", /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>   , "noSpecialFlags"
    >,
    Active: singleEnumVariantMeta<DredNodeStateMeta, "Active",
    "Constr#1", "singletonField", /* implied wrapper { lastHeartbeat: ... } for singleVariantField */ 
    			number   , "noSpecialFlags"
    >,
    NeedsHeartbeats: singleEnumVariantMeta<DredNodeStateMeta, "NeedsHeartbeats",
    "Constr#2", "singletonField", /* implied wrapper { validators: ... } for singleVariantField */ 
    			Array<number[]>   , "noSpecialFlags"
    >,
    Inactive: singleEnumVariantMeta<DredNodeStateMeta, "Inactive",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoAbstractDelegateActivitiesEnum = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoAbstractDelegateActivitiesEnum_2 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity_3    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity_3    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
| { CreatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of AbstractSettingsForNodeOperator
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AbstractSettingsForNodeOperatorLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAbstractSettingsForNodeOperator = {
    nodeOpSettings: /*minStructField*/ ErgoNodeOperatorSettings_2
}

/**
 * An ergonomic, though less strictly-safe form of AnyData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AnyDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAnyData = AnyData

/**
 * An ergonomic, though less strictly-safe form of AnyData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AnyDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAnyData_2 = AnyData_2

/**
 * An ergonomic, though less strictly-safe form of AnyData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AnyDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAnyData_3 = AnyData_3

/**
 * An ergonomic, though less strictly-safe form of AnyData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AnyDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAnyData_4 = AnyData_4

/**
 * An ergonomic, though less strictly-safe form of AppInfoV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the AppInfoV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoAppInfoV1 = {
    url: /*minStructField*/ string
    revenueModel: /*minStructField*/ Array<ErgoRevenueModel>
    name: /*minStructField*/ string
    description: /*minStructField*/ string
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoBurningActivity = IntersectedEnum<BurningActivity/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoBurningActivity_2 = IntersectedEnum<BurningActivity_2/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoBurningActivity_3 = IntersectedEnum<BurningActivity_3/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoBurningActivity_4 = IntersectedEnum<BurningActivity_4/*like canon enum*/>

/**
 * An ergonomic, though less strictly-safe form of CapoCtx
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoCtxLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoCtx = {
    mph: /*minStructField*/ MintingPolicyHash
    charter: /*minStructField*/ Ergocctx_CharterInputType_2
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoCapoLifecycleActivity = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$Ergo$CreatingDelegate /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			ErgoDelegateRole_2    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$Ergo$forcingNewSpendDelegate /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$Ergo$forcingNewMintDelegate /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoManifestActivity_2    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoCapoLifecycleActivity_2 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$Ergo$CreatingDelegate_2 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			ErgoDelegateRole_3    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_2 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$Ergo$forcingNewMintDelegate_2 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoManifestActivity_3    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoCapoLifecycleActivity_3 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$Ergo$CreatingDelegate_3 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			ErgoDelegateRole_4    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_3 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$Ergo$forcingNewMintDelegate_3 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoManifestActivity_4    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoCapoLifecycleActivity_4 = IntersectedEnum<
| { CreatingDelegate: CapoLifecycleActivity$Ergo$CreatingDelegate_4 /*minEnumVariant*/ }
| { queuePendingChange: tagOnly /*minEnumVariant*/ }
| { removePendingChange: /* implied wrapper { role: ... } for singleVariantField */ 
    			ErgoDelegateRole_5    /*minEnumVariant*/ }
| { commitPendingChanges: tagOnly /*minEnumVariant*/ }
| { forcingNewSpendDelegate: CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_4 /*minEnumVariant*/ }
| { forcingNewMintDelegate: CapoLifecycleActivity$Ergo$forcingNewMintDelegate_4 /*minEnumVariant*/ }
| { updatingManifest: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoManifestActivity_5    /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry = {
    entryType: /*minStructField*/ ErgoManifestEntryType
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry_2 = {
    entryType: /*minStructField*/ ErgoManifestEntryType_2
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry_3 = {
    entryType: /*minStructField*/ ErgoManifestEntryType_3
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry_4 = {
    entryType: /*minStructField*/ ErgoManifestEntryType_4
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * An ergonomic, though less strictly-safe form of CapoManifestEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the CapoManifestEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoCapoManifestEntry_5 = {
    entryType: /*minStructField*/ ErgoManifestEntryType_5
    tokenName: /*minStructField*/ number[]
    mph: /*minStructField*/ MintingPolicyHash | undefined
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergocctx_CharterInputType = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$Ergo$RefInput /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Ergo$Input /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergocctx_CharterInputType_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$Ergo$RefInput_2 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Ergo$Input_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergocctx_CharterInputType_3 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$Ergo$RefInput_3 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Ergo$Input_3 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergocctx_CharterInputType_4 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { RefInput: cctx_CharterInputType$Ergo$RefInput_4 /*minEnumVariant*/ }
| { Input: cctx_CharterInputType$Ergo$Input_4 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateActivity = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoSpendingActivity    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoMintingActivity    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoBurningActivity    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$Ergo$CreatingDelegatedData /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$Ergo$UpdatingDelegatedData /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$Ergo$DeletingDelegatedData /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			UplcData    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateActivity_2 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity_2    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity_2    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoSpendingActivity_2    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoMintingActivity_2    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoBurningActivity_2    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$Ergo$CreatingDelegatedData_2 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$Ergo$UpdatingDelegatedData_2 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$Ergo$DeletingDelegatedData_2 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoOtherActivity    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateActivity_3 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity_3    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity_3    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoSpendingActivity_3    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoMintingActivity_3    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoBurningActivity_3    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$Ergo$CreatingDelegatedData_3 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$Ergo$UpdatingDelegatedData_3 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$Ergo$DeletingDelegatedData_3 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoOtherActivity_2    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateActivity_4 = IntersectedEnum<
| { CapoLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoCapoLifecycleActivity_4    /*minEnumVariant*/ }
| { DelegateLifecycleActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoDelegateLifecycleActivity_4    /*minEnumVariant*/ }
| { SpendingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoSpendingActivity_4    /*minEnumVariant*/ }
| { MintingActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoMintingActivity_4    /*minEnumVariant*/ }
| { BurningActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoBurningActivity_4    /*minEnumVariant*/ }
| { CreatingDelegatedData: DelegateActivity$Ergo$CreatingDelegatedData_4 /*minEnumVariant*/ }
| { UpdatingDelegatedData: DelegateActivity$Ergo$UpdatingDelegatedData_4 /*minEnumVariant*/ }
| { DeletingDelegatedData: DelegateActivity$Ergo$DeletingDelegatedData_4 /*minEnumVariant*/ }
| { MultipleDelegateActivities: /* implied wrapper { activities: ... } for singleVariantField */ 
    			Array<UplcData>    /*minEnumVariant*/ }
| { OtherActivities: /* implied wrapper { activity: ... } for singleVariantField */ 
    			ErgoOtherActivity_3    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateDatum = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			ErgoDelegationDetail    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$Ergo$capoStoredData /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateDatum_2 = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_2 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			ErgoDelegationDetail_2    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$Ergo$capoStoredData_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateDatum_3 = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_3 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			ErgoDelegationDetail_3    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$Ergo$capoStoredData_3 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateDatum_4 = IntersectedEnum<
| { Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_4 /*minEnumVariant*/ }
| { IsDelegation: /* implied wrapper { dd: ... } for singleVariantField */ 
    			ErgoDelegationDetail_4    /*minEnumVariant*/ }
| { capoStoredData: DelegateDatum$Ergo$capoStoredData_4 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateLifecycleActivity = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$Ergo$ReplacingMe /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateLifecycleActivity_2 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$Ergo$ReplacingMe_2 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateLifecycleActivity_3 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$Ergo$ReplacingMe_3 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateLifecycleActivity_4 = IntersectedEnum<
| { ReplacingMe: DelegateLifecycleActivity$Ergo$ReplacingMe_4 /*minEnumVariant*/ }
| { Retiring: tagOnly /*minEnumVariant*/ }
| { ValidatingSettings: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole = IntersectedEnum<DelegateRole/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole_2 = IntersectedEnum<DelegateRole_2/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole_3 = IntersectedEnum<DelegateRole_3/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole_4 = IntersectedEnum<DelegateRole_4/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDelegateRole_5 = IntersectedEnum<DelegateRole_5/*like canon enum*/>

/**
 * An ergonomic, though less strictly-safe form of DelegationDetail
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegationDetailLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDelegationDetail = DelegationDetail

/**
 * An ergonomic, though less strictly-safe form of DelegationDetail
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegationDetailLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDelegationDetail_2 = DelegationDetail_2

/**
 * An ergonomic, though less strictly-safe form of DelegationDetail
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegationDetailLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDelegationDetail_3 = DelegationDetail_3

/**
 * An ergonomic, though less strictly-safe form of DelegationDetail
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DelegationDetailLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDelegationDetail_4 = DelegationDetail_4

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergodgd_DataSrc = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Ergo$Both /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type Ergodgd_DataSrc_2 = IntersectedEnum<
| { Unk: tagOnly /*minEnumVariant*/ }
| { Input: /* implied wrapper { utxo: ... } for singleVariantField */ 
    			TxInput    /*minEnumVariant*/ }
| { Output: /* implied wrapper { txo: ... } for singleVariantField */ 
    			TxOutput    /*minEnumVariant*/ }
| { Both: dgd_DataSrc$Ergo$Both_2 /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of DgDataDetails
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the DgDataDetailsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoDgDataDetails = {
    dataSrc: /*minStructField*/ Ergodgd_DataSrc
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    mph: /*minStructField*/ MintingPolicyHash
    activity: /*minStructField*/ ErgoAbstractDelegateActivitiesEnum | undefined
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDredNodeState = IntersectedEnum<DredNodeState/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoDredNodeState_2 = IntersectedEnum<DredNodeState_2/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoFeeSource = IntersectedEnum<FeeSource/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity_2 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry_2 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry_2 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken_2 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity_3 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry_3 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry_3 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken_3 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken_3 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity_4 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry_4 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry_4 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken_4 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken_4 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestActivity_5 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$Ergo$updatingEntry_5 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$Ergo$addingEntry_5 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$Ergo$forkingThreadToken_5 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$Ergo$burningThreadToken_5 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType_2 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy_2 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads_2 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType_3 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy_3 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads_3 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType_4 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy_4 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads_4 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoManifestEntryType_5 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$Ergo$DgDataPolicy_5 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$Ergo$DelegateThreads_5 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoMintingActivity = IntersectedEnum<MintingActivity/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoMintingActivity_2 = IntersectedEnum<MintingActivity_2/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoMintingActivity_3 = IntersectedEnum<MintingActivity_3/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoMintingActivity_4 = IntersectedEnum<MintingActivity_4/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoNbhDetails = IntersectedEnum<
| { NbhDetailsV1: NbhDetails$Ergo$NbhDetailsV1 /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of NeighborhoodData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NeighborhoodDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoNeighborhoodData = {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    memberToken: /*minStructField*/ string
    details: /*minStructField*/ ErgoNbhDetails
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoNeighborhoodSettings = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			ErgoNeighborhoodSettingsV1    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoNeighborhoodSettings_2 = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			ErgoNeighborhoodSettingsV1_2    /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of NeighborhoodSettingsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NeighborhoodSettingsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNeighborhoodSettingsV1 = NeighborhoodSettingsV1

/**
 * An ergonomic, though less strictly-safe form of NeighborhoodSettingsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NeighborhoodSettingsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNeighborhoodSettingsV1_2 = NeighborhoodSettingsV1_2

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoNeighborhoodState = IntersectedEnum<NeighborhoodState/*like canon enum*/>

/**
 * An ergonomic, though less strictly-safe form of NodeDetailsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NodeDetailsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNodeDetailsV1 = NodeDetailsV1

/**
 * An ergonomic, though less strictly-safe form of NodeDetailsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NodeDetailsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNodeDetailsV1_2 = NodeDetailsV1_2

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoNodeOperatorSettings = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			ErgoNodeOperatorSettingsV1    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoNodeOperatorSettings_2 = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			ErgoNodeOperatorSettingsV1_2    /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of NodeOperatorSettingsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NodeOperatorSettingsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNodeOperatorSettingsV1 = NodeOperatorSettingsV1

/**
 * An ergonomic, though less strictly-safe form of NodeOperatorSettingsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NodeOperatorSettingsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNodeOperatorSettingsV1_2 = NodeOperatorSettingsV1_2

/**
 * An ergonomic, though less strictly-safe form of NodeOpsInfoV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NodeOpsInfoV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNodeOpsInfoV1 = NodeOpsInfoV1

/**
 * An ergonomic, though less strictly-safe form of NodeRegistrationData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NodeRegistrationDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoNodeRegistrationData = {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    memberToken: /*minStructField*/ string
    state: /*minStructField*/ ErgoDredNodeState
    nodeDetails: /*minStructField*/ ErgoNodeDetailsV1
}

/**
 * An ergonomic, though less strictly-safe form of NodeRegistrationData
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NodeRegistrationDataLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoNodeRegistrationData_2 = {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    memberToken: /*minStructField*/ string
    state: /*minStructField*/ ErgoDredNodeState_2
    nodeDetails: /*minStructField*/ ErgoNodeDetailsV1_2
}

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoOtherActivity = IntersectedEnum<OtherActivity/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoOtherActivity_2 = IntersectedEnum<OtherActivity_2/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoOtherActivity_3 = IntersectedEnum<OtherActivity_3/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange_2 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange_2    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange_3 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange_3    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange_3 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange_4 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange_4    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange_4 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingCharterChange_5 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			ErgoPendingDelegateChange_5    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$Ergo$otherManifestChange_5 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction_2 = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add_2 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace_2 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction_3 = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add_3 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace_3 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction_4 = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add_4 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace_4 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoPendingDelegateAction_5 = IntersectedEnum<
| { Add: PendingDelegateAction$Ergo$Add_5 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Ergo$Replace_5 /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange = {
    action: /*minStructField*/ ErgoPendingDelegateAction
    role: /*minStructField*/ ErgoDelegateRole
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink | undefined
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange_2 = {
    action: /*minStructField*/ ErgoPendingDelegateAction_2
    role: /*minStructField*/ ErgoDelegateRole_2
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink_2 | undefined
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange_3 = {
    action: /*minStructField*/ ErgoPendingDelegateAction_3
    role: /*minStructField*/ ErgoDelegateRole_3
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink_3 | undefined
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange_4 = {
    action: /*minStructField*/ ErgoPendingDelegateAction_4
    role: /*minStructField*/ ErgoDelegateRole_4
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink_4 | undefined
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoPendingDelegateChange_5 = {
    action: /*minStructField*/ ErgoPendingDelegateAction_5
    role: /*minStructField*/ ErgoDelegateRole_5
    dgtLink: /*minStructField*/ ErgoRelativeDelegateLink_5 | undefined
}

/**
 * An ergonomic, though less strictly-safe form of ProtocolSettings
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ProtocolSettingsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
export declare type ErgoProtocolSettings = {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    nodeOpSettings: /*minStructField*/ ErgoNodeOperatorSettings
    nbhSettings: /*minStructField*/ ErgoNeighborhoodSettings
}

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink = RelativeDelegateLink

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink_2 = RelativeDelegateLink_2

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink_3 = RelativeDelegateLink_3

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink_4 = RelativeDelegateLink_4

/**
 * An ergonomic, though less strictly-safe form of RelativeDelegateLink
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RelativeDelegateLinkLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoRelativeDelegateLink_5 = RelativeDelegateLink_5

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoRevenueModel = IntersectedEnum<
| { TransactionBasedV1: RevenueModel$Ergo$TransactionBasedV1 /*minEnumVariant*/ }
| { SubscriptionV1: RevenueModel$Ergo$SubscriptionV1 /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoSpendingActivity = IntersectedEnum<SpendingActivity/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoSpendingActivity_2 = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ValidatingNode: SpendingActivity$Ergo$ValidatingNode /*minEnumVariant*/ }
| { ActivatingNode: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ReportingInactiveNode: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { RefutingInactivity: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoSpendingActivity_3 = IntersectedEnum<SpendingActivity_3/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoSpendingActivity_4 = IntersectedEnum<SpendingActivity_4/*like canon enum*/>

/**
 * ergonomic type enabling easy access to values converted from the on-chain form
 * @remarks
 * The data will be expressed in canonical form, and enum variants are merged to a single type with optional fields.
 * Nested enums are also merged in this ergonomic way.
 * @public
 */
declare type ErgoSubscriptionFeeFrequency = IntersectedEnum<SubscriptionFeeFrequency/*like canon enum*/>

/**
 * An ergonomic, though less strictly-safe form of UpdateInfoV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the UpdateInfoV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ErgoUpdateInfoV1 = UpdateInfoV1

/**
 * FeeSource enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the FeeSource enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `FeeSourceHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type FeeSource = 
| { EndUser: tagOnly /*minEnumVariant*/ }
| { SponsorContract: /* implied wrapper { sponsorContract: ... } for singleVariantField */ 
    			ScriptHash    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***FeeSource*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class FeeSourceHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<FeeSource, Partial<{
        EndUser: tagOnly;
        SponsorContract: ScriptHash | string | number[];
    }>>;
    /**
     * (property getter): UplcData for ***"NeighborhoodData::FeeSource.EndUser"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4160***
     */
    get EndUser(): UplcData;
    /**
     * generates  UplcData for ***"NeighborhoodData::FeeSource.SponsorContract"***
     */
    SponsorContract(sponsorContract: ScriptHash | string | number[]): UplcData;
}

/**
 * FeeSource enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the FeeSource enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `FeeSourceHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type FeeSourceLike = IntersectedEnum<
| { EndUser: tagOnly /*minEnumVariant*/ }
| { SponsorContract: /* implied wrapper { sponsorContract: ... } for singleVariantField */ 
    			ScriptHash | string | number[]    /*minEnumVariant*/ }
>

export { hexToBytes }

export { makeBlockfrostV0Client }

export { makeRandomRootPrivateKey }

export { makeRootPrivateKey }

export { makeSimpleWallet }

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
declare interface ManifestActivity$addingEntry {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
declare interface ManifestActivity$addingEntry_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
declare interface ManifestActivity$addingEntry_3 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
declare interface ManifestActivity$addingEntry_4 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$addingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$addingEntry instead.
 * @public
 */
declare interface ManifestActivity$addingEntry_5 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$addingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$addingEntryLike {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$addingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$addingEntryLike_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$addingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$addingEntryLike_3 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$addingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$addingEntryLike_4 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken_2 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken_3 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken_4 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$burningThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$burningThreadToken instead.
 * @public
 */
declare interface ManifestActivity$burningThreadToken_5 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$burningThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$burningThreadTokenLike {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$burningThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$burningThreadTokenLike_2 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$burningThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$burningThreadTokenLike_3 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$burningThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$burningThreadTokenLike_4 {
    key: string  /*minVariantField*/ ,
    burnedThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry = ManifestActivity$addingEntry

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry_2 = ManifestActivity$addingEntry_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry_3 = ManifestActivity$addingEntry_3

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry_4 = ManifestActivity$addingEntry_4

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$addingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$addingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$addingEntry_5 = ManifestActivity$addingEntry_5

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken = ManifestActivity$burningThreadToken

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken_2 = ManifestActivity$burningThreadToken_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken_3 = ManifestActivity$burningThreadToken_3

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken_4 = ManifestActivity$burningThreadToken_4

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$burningThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$burningThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$burningThreadToken_5 = ManifestActivity$burningThreadToken_5

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken = ManifestActivity$forkingThreadToken

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken_2 = ManifestActivity$forkingThreadToken_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken_3 = ManifestActivity$forkingThreadToken_3

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken_4 = ManifestActivity$forkingThreadToken_4

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$forkingThreadToken
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$forkingThreadTokenLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$forkingThreadToken_5 = ManifestActivity$forkingThreadToken_5

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry = ManifestActivity$updatingEntry

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry_2 = ManifestActivity$updatingEntry_2

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry_3 = ManifestActivity$updatingEntry_3

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry_4 = ManifestActivity$updatingEntry_4

/**
 * An ergonomic, though less strictly-safe form of ManifestActivity$updatingEntry
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestActivity$updatingEntryLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestActivity$Ergo$updatingEntry_5 = ManifestActivity$updatingEntry_5

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken_2 {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken_3 {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken_4 {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$forkingThreadToken
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$forkingThreadToken instead.
 * @public
 */
declare interface ManifestActivity$forkingThreadToken_5 {
    key: string  /*minVariantField*/ ,
    newThreadCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$forkingThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$forkingThreadTokenLike {
    key: string  /*minVariantField*/ ,
    newThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$forkingThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$forkingThreadTokenLike_2 {
    key: string  /*minVariantField*/ ,
    newThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$forkingThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$forkingThreadTokenLike_3 {
    key: string  /*minVariantField*/ ,
    newThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$forkingThreadToken
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$forkingThreadTokenLike_4 {
    key: string  /*minVariantField*/ ,
    newThreadCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry_3 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry_4 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestActivity$updatingEntry
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestActivity$Ergo$updatingEntry instead.
 * @public
 */
declare interface ManifestActivity$updatingEntry_5 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$updatingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$updatingEntryLike {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$updatingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$updatingEntryLike_2 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$updatingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$updatingEntryLike_3 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestActivity$updatingEntry
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestActivity$updatingEntryLike_4 {
    key: string  /*minVariantField*/ ,
    tokenName: number[]  /*minVariantField*/ 
}

/**
 * ManifestActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestActivity = 
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntry_2 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntry_2 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadToken_2 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadToken_2 /*minEnumVariant*/ }

/**
 * ManifestActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestActivity_2 = 
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntry_3 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntry_3 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadToken_3 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadToken_3 /*minEnumVariant*/ }

/**
 * ManifestActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestActivity_3 = 
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntry_4 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntry_4 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadToken_4 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadToken_4 /*minEnumVariant*/ }

/**
 * ManifestActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestActivity_4 = 
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntry_5 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntry_5 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadToken_5 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadToken_5 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike;
        addingEntry: ManifestActivity$addingEntryLike;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike;
        burningThreadToken: ManifestActivity$burningThreadTokenLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     */
    retiringEntry(key: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike | {
        key: string;
        newThreadCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike | {
        key: string;
        burnedThreadCount: IntLike;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_2, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_2;
        addingEntry: ManifestActivity$addingEntryLike_2;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_2;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_2;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     */
    retiringEntry(key: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike_2 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike_2 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_2 | {
        key: string;
        newThreadCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_2 | {
        key: string;
        burnedThreadCount: IntLike;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_3, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_3;
        addingEntry: ManifestActivity$addingEntryLike_3;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_3;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_3;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     */
    retiringEntry(key: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike_3 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike_3 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_3 | {
        key: string;
        newThreadCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_3 | {
        key: string;
        burnedThreadCount: IntLike;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_4, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_4;
        addingEntry: ManifestActivity$addingEntryLike_4;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_4;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_4;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     */
    retiringEntry(key: string): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike_4 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike_4 | {
        key: string;
        tokenName: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_4 | {
        key: string;
        newThreadCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_4 | {
        key: string;
        burnedThreadCount: IntLike;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike;
        addingEntry: ManifestActivity$addingEntryLike;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike;
        burningThreadToken: ManifestActivity$burningThreadTokenLike;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    retiringEntry(key: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike | {
        key: string;
        newThreadCount: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike | {
        key: string;
        burnedThreadCount: IntLike;
    }): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_2, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_2;
        addingEntry: ManifestActivity$addingEntryLike_2;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_2;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_2;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    retiringEntry(key: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike_2 | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike_2 | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_2 | {
        key: string;
        newThreadCount: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_2 | {
        key: string;
        burnedThreadCount: IntLike;
    }): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_3, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_3;
        addingEntry: ManifestActivity$addingEntryLike_3;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_3;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_3;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    retiringEntry(key: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike_3 | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike_3 | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_3 | {
        key: string;
        newThreadCount: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_3 | {
        key: string;
        burnedThreadCount: IntLike;
    }): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestActivityHelperNested_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestActivity_4, Partial<{
        retiringEntry: string;
        updatingEntry: ManifestActivity$updatingEntryLike_4;
        addingEntry: ManifestActivity$addingEntryLike_4;
        forkingThreadToken: ManifestActivity$forkingThreadTokenLike_4;
        burningThreadToken: ManifestActivity$burningThreadTokenLike_4;
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.retiringEntry"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    retiringEntry(key: string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.updatingEntry"***
     * @remarks - ***ManifestActivity$updatingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    updatingEntry(fields: ManifestActivity$updatingEntryLike_4 | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.addingEntry"***
     * @remarks - ***ManifestActivity$addingEntryLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    addingEntry(fields: ManifestActivity$addingEntryLike_4 | {
        key: string;
        tokenName: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.forkingThreadToken"***
     * @remarks - ***ManifestActivity$forkingThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    forkingThreadToken(fields: ManifestActivity$forkingThreadTokenLike_4 | {
        key: string;
        newThreadCount: IntLike;
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"CapoDelegateHelpers::ManifestActivity.burningThreadToken"***
     * @remarks - ***ManifestActivity$burningThreadTokenLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    burningThreadToken(fields: ManifestActivity$burningThreadTokenLike_4 | {
        key: string;
        burnedThreadCount: IntLike;
    }): isActivity;
}

/**
 * ManifestActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestActivityLike = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntryLike /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntryLike /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadTokenLike /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadTokenLike /*minEnumVariant*/ }
>

/**
 * ManifestActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestActivityLike_2 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntryLike_2 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntryLike_2 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadTokenLike_2 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadTokenLike_2 /*minEnumVariant*/ }
>

/**
 * ManifestActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestActivityLike_3 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntryLike_3 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntryLike_3 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadTokenLike_3 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadTokenLike_3 /*minEnumVariant*/ }
>

/**
 * ManifestActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestActivityLike_4 = IntersectedEnum<
| { retiringEntry: /* implied wrapper { key: ... } for singleVariantField */ 
    			string    /*minEnumVariant*/ }
| { updatingEntry: ManifestActivity$updatingEntryLike_4 /*minEnumVariant*/ }
| { addingEntry: ManifestActivity$addingEntryLike_4 /*minEnumVariant*/ }
| { forkingThreadToken: ManifestActivity$forkingThreadTokenLike_4 /*minEnumVariant*/ }
| { burningThreadToken: ManifestActivity$burningThreadTokenLike_4 /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type ManifestActivityMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "ManifestActivity"}, {
    retiringEntry: singleEnumVariantMeta<ManifestActivityMeta, "retiringEntry",
    "Constr#0", "singletonField", /* implied wrapper { key: ... } for singleVariantField */ 
    			string   , "noSpecialFlags"
    >,
    updatingEntry: singleEnumVariantMeta<ManifestActivityMeta, "updatingEntry",
    "Constr#1", 
    "fields", ManifestActivity$updatingEntry_3, "noSpecialFlags"
    >,
    addingEntry: singleEnumVariantMeta<ManifestActivityMeta, "addingEntry",
    "Constr#2", 
    "fields", ManifestActivity$addingEntry_3, "noSpecialFlags"
    >,
    forkingThreadToken: singleEnumVariantMeta<ManifestActivityMeta, "forkingThreadToken",
    "Constr#3", 
    "fields", ManifestActivity$forkingThreadToken_3, "noSpecialFlags"
    >,
    burningThreadToken: singleEnumVariantMeta<ManifestActivityMeta, "burningThreadToken",
    "Constr#4", 
    "fields", ManifestActivity$burningThreadToken_3, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of ManifestEntryType$DelegateThreads
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DelegateThreads instead.
 * @public
 */
declare interface ManifestEntryType$DelegateThreads {
    role: DelegateRole_2  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DelegateThreads
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DelegateThreads instead.
 * @public
 */
declare interface ManifestEntryType$DelegateThreads_2 {
    role: DelegateRole_3  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DelegateThreads
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DelegateThreads instead.
 * @public
 */
declare interface ManifestEntryType$DelegateThreads_3 {
    role: DelegateRole_4  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DelegateThreads
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DelegateThreads instead.
 * @public
 */
declare interface ManifestEntryType$DelegateThreads_4 {
    role: DelegateRole_5  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DelegateThreads
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DelegateThreadsLike {
    role: DelegateRoleLike  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DelegateThreads
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DelegateThreadsLike_2 {
    role: DelegateRoleLike_2  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DelegateThreads
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DelegateThreadsLike_3 {
    role: DelegateRoleLike_3  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DelegateThreads
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DelegateThreadsLike_4 {
    role: DelegateRoleLike_4  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DgDataPolicy
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DgDataPolicy instead.
 * @public
 */
declare interface ManifestEntryType$DgDataPolicy {
    policyLink: RelativeDelegateLink_2  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DgDataPolicy
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DgDataPolicy instead.
 * @public
 */
declare interface ManifestEntryType$DgDataPolicy_2 {
    policyLink: RelativeDelegateLink_3  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DgDataPolicy
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DgDataPolicy instead.
 * @public
 */
declare interface ManifestEntryType$DgDataPolicy_3 {
    policyLink: RelativeDelegateLink_4  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of ManifestEntryType$DgDataPolicy
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ManifestEntryType$Ergo$DgDataPolicy instead.
 * @public
 */
declare interface ManifestEntryType$DgDataPolicy_4 {
    policyLink: RelativeDelegateLink_5  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DgDataPolicy
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DgDataPolicyLike {
    policyLink: RelativeDelegateLinkLike  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DgDataPolicy
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DgDataPolicyLike_2 {
    policyLink: RelativeDelegateLinkLike_2  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DgDataPolicy
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DgDataPolicyLike_3 {
    policyLink: RelativeDelegateLinkLike_3  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of ManifestEntryType$DgDataPolicy
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ManifestEntryType$DgDataPolicyLike_4 {
    policyLink: RelativeDelegateLinkLike_4  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: IntLike  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DelegateThreads = {
    role: ErgoDelegateRole  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DelegateThreads_2 = {
    role: ErgoDelegateRole_2  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DelegateThreads_3 = {
    role: ErgoDelegateRole_3  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DelegateThreads_4 = {
    role: ErgoDelegateRole_4  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DelegateThreads
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DelegateThreadsLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DelegateThreads_5 = {
    role: ErgoDelegateRole_5  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy = {
    policyLink: ErgoRelativeDelegateLink  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy_2 = {
    policyLink: ErgoRelativeDelegateLink_2  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy_3 = {
    policyLink: ErgoRelativeDelegateLink_3  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy_4 = {
    policyLink: ErgoRelativeDelegateLink_4  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of ManifestEntryType$DgDataPolicy
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the ManifestEntryType$DgDataPolicyLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type ManifestEntryType$Ergo$DgDataPolicy_5 = {
    policyLink: ErgoRelativeDelegateLink_5  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    refCount: bigint  /*minVariantField*/ 
}

/**
 * ManifestEntryType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestEntryType = 
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicy /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreads /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }

/**
 * ManifestEntryType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestEntryType_2 = 
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicy_2 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreads_2 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }

/**
 * ManifestEntryType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestEntryType_3 = 
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicy_3 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreads_3 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }

/**
 * ManifestEntryType enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type ManifestEntryType_4 = 
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicy_4 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreads_4 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestEntryTypeHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestEntryType, Partial<{
        NamedTokenRef: tagOnly;
        DgDataPolicy: ManifestEntryType$DgDataPolicyLike;
        DelegateThreads: ManifestEntryType$DelegateThreadsLike;
        MerkleMembership: tagOnly;
        MerkleStateRoot: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.NamedTokenRef"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get NamedTokenRef(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DgDataPolicy"***
     * @remarks - ***ManifestEntryType$DgDataPolicyLike*** is the same as the expanded field-types.
     */
    DgDataPolicy(fields: ManifestEntryType$DgDataPolicyLike | {
        policyLink: RelativeDelegateLinkLike;
        idPrefix: string;
        refCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DelegateThreads"***
     * @remarks - ***ManifestEntryType$DelegateThreadsLike*** is the same as the expanded field-types.
     */
    DelegateThreads(fields: ManifestEntryType$DelegateThreadsLike | {
        role: DelegateRoleLike;
        refCount: IntLike;
    }): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleMembership"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get MerkleMembership(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleStateRoot"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4***
     */
    get MerkleStateRoot(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestEntryTypeHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestEntryType_2, Partial<{
        NamedTokenRef: tagOnly;
        DgDataPolicy: ManifestEntryType$DgDataPolicyLike_2;
        DelegateThreads: ManifestEntryType$DelegateThreadsLike_2;
        MerkleMembership: tagOnly;
        MerkleStateRoot: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.NamedTokenRef"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get NamedTokenRef(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DgDataPolicy"***
     * @remarks - ***ManifestEntryType$DgDataPolicyLike*** is the same as the expanded field-types.
     */
    DgDataPolicy(fields: ManifestEntryType$DgDataPolicyLike_2 | {
        policyLink: RelativeDelegateLinkLike_2;
        idPrefix: string;
        refCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DelegateThreads"***
     * @remarks - ***ManifestEntryType$DelegateThreadsLike*** is the same as the expanded field-types.
     */
    DelegateThreads(fields: ManifestEntryType$DelegateThreadsLike_2 | {
        role: DelegateRoleLike_2;
        refCount: IntLike;
    }): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleMembership"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get MerkleMembership(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleStateRoot"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4***
     */
    get MerkleStateRoot(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestEntryTypeHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestEntryType_3, Partial<{
        NamedTokenRef: tagOnly;
        DgDataPolicy: ManifestEntryType$DgDataPolicyLike_3;
        DelegateThreads: ManifestEntryType$DelegateThreadsLike_3;
        MerkleMembership: tagOnly;
        MerkleStateRoot: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.NamedTokenRef"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get NamedTokenRef(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DgDataPolicy"***
     * @remarks - ***ManifestEntryType$DgDataPolicyLike*** is the same as the expanded field-types.
     */
    DgDataPolicy(fields: ManifestEntryType$DgDataPolicyLike_3 | {
        policyLink: RelativeDelegateLinkLike_3;
        idPrefix: string;
        refCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DelegateThreads"***
     * @remarks - ***ManifestEntryType$DelegateThreadsLike*** is the same as the expanded field-types.
     */
    DelegateThreads(fields: ManifestEntryType$DelegateThreadsLike_3 | {
        role: DelegateRoleLike_3;
        refCount: IntLike;
    }): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleMembership"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get MerkleMembership(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleStateRoot"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4***
     */
    get MerkleStateRoot(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class ManifestEntryTypeHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<ManifestEntryType_4, Partial<{
        NamedTokenRef: tagOnly;
        DgDataPolicy: ManifestEntryType$DgDataPolicyLike_4;
        DelegateThreads: ManifestEntryType$DelegateThreadsLike_4;
        MerkleMembership: tagOnly;
        MerkleStateRoot: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.NamedTokenRef"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#0***
     */
    get NamedTokenRef(): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DgDataPolicy"***
     * @remarks - ***ManifestEntryType$DgDataPolicyLike*** is the same as the expanded field-types.
     */
    DgDataPolicy(fields: ManifestEntryType$DgDataPolicyLike_4 | {
        policyLink: RelativeDelegateLinkLike_4;
        idPrefix: string;
        refCount: IntLike;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoHelpers::ManifestEntryType.DelegateThreads"***
     * @remarks - ***ManifestEntryType$DelegateThreadsLike*** is the same as the expanded field-types.
     */
    DelegateThreads(fields: ManifestEntryType$DelegateThreadsLike_4 | {
        role: DelegateRoleLike_4;
        refCount: IntLike;
    }): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleMembership"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#3***
     */
    get MerkleMembership(): UplcData;
    /**
     * (property getter): UplcData for ***"CapoHelpers::ManifestEntryType.MerkleStateRoot"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4***
     */
    get MerkleStateRoot(): UplcData;
}

/**
 * ManifestEntryType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestEntryTypeLike = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicyLike /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreadsLike /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ManifestEntryType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestEntryTypeLike_2 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicyLike_2 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreadsLike_2 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ManifestEntryType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestEntryTypeLike_3 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicyLike_3 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreadsLike_3 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * ManifestEntryType enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the ManifestEntryType enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `ManifestEntryTypeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type ManifestEntryTypeLike_4 = IntersectedEnum<
| { NamedTokenRef: tagOnly /*minEnumVariant*/ }
| { DgDataPolicy: ManifestEntryType$DgDataPolicyLike_4 /*minEnumVariant*/ }
| { DelegateThreads: ManifestEntryType$DelegateThreadsLike_4 /*minEnumVariant*/ }
| { MerkleMembership: tagOnly /*minEnumVariant*/ }
| { MerkleStateRoot: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type ManifestEntryTypeMeta = EnumTypeMeta<
    {module: "CapoHelpers", enumName: "ManifestEntryType"}, {
    NamedTokenRef: singleEnumVariantMeta<ManifestEntryTypeMeta, "NamedTokenRef",
    "Constr#0", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    DgDataPolicy: singleEnumVariantMeta<ManifestEntryTypeMeta, "DgDataPolicy",
    "Constr#1", 
    "fields", ManifestEntryType$DgDataPolicy_2, "noSpecialFlags"
    >,
    DelegateThreads: singleEnumVariantMeta<ManifestEntryTypeMeta, "DelegateThreads",
    "Constr#2", 
    "fields", ManifestEntryType$DelegateThreads_2, "noSpecialFlags"
    >,
    MerkleMembership: singleEnumVariantMeta<ManifestEntryTypeMeta, "MerkleMembership",
    "Constr#3", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    MerkleStateRoot: singleEnumVariantMeta<ManifestEntryTypeMeta, "MerkleStateRoot",
    "Constr#4", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * expresses the essential fields needed for initiating creation of a AnyData
 * @public
 */
declare type minimalAnyData = minimalData<AnyDataLike_2>

/**
 * expresses the essential fields needed for initiating creation of a DgDataDetails
 * @public
 */
declare type minimalDgDataDetails = minimalData<DgDataDetailsLike>

/**
 * expresses the essential fields needed for initiating creation of a NeighborhoodData
 * @public
 */
export declare type minimalNeighborhoodData = minimalData<NeighborhoodDataLike>

/**
 * expresses the essential fields needed for initiating creation of a NodeRegistrationData
 * @public
 */
export declare type minimalNodeRegistrationData = minimalData<NodeRegistrationDataLike>

/**
 * expresses the essential fields needed for initiating creation of a ProtocolSettings
 * @public
 */
declare type minimalProtocolSettings = minimalData<ProtocolSettingsLike>

/**
 * MintingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type MintingActivity = 
| { MintingParticipantToken: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId    /*minEnumVariant*/ }
| { MintingFungibleTokens: /* implied wrapper { tokenName: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * MintingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type MintingActivity_2 = 
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId    /*minEnumVariant*/ }

/**
 * MintingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type MintingActivity_3 = 
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId    /*minEnumVariant*/ }

/**
 * MintingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type MintingActivity_4 = 
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<MintingActivity, Partial<{
        MintingParticipantToken: TxOutputId | string;
        MintingFungibleTokens: number[];
    }>>;
    /**
     * generates  UplcData for ***"STokMintDelegate::MintingActivity.MintingParticipantToken"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$MintingParticipantToken}` variant of this activity instead
     *
     */
    MintingParticipantToken(thingWithSeed: hasSeed | TxOutputId | string): UplcData;
    /**
     * generates  UplcData for ***"STokMintDelegate::MintingActivity.MintingParticipantToken"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$MintingParticipantToken`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     */
    get $seeded$MintingParticipantToken(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => UplcData>;
    /**
     * generates  UplcData for ***"STokMintDelegate::MintingActivity.MintingFungibleTokens"***
     */
    MintingFungibleTokens(tokenName: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::MintingActivity.CreatingRecord"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$CreatingRecord}` variant of this activity instead
     *
     */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): UplcData;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::MintingActivity.CreatingRecord"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     */
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
     * generates  UplcData for ***"NeighborhoodPolicy::MintingActivity.CreatingRecord"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$CreatingRecord}` variant of this activity instead
     *
     */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): UplcData;
    /**
     * generates  UplcData for ***"NeighborhoodPolicy::MintingActivity.CreatingRecord"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     */
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
     * generates  UplcData for ***"ProtocolSettingsPolicy::MintingActivity.CreatingRecord"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$CreatingRecord}` variant of this activity instead
     *
     */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): UplcData;
    /**
     * generates  UplcData for ***"ProtocolSettingsPolicy::MintingActivity.CreatingRecord"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     */
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<MintingActivity, Partial<{
        MintingParticipantToken: TxOutputId | string;
        MintingFungibleTokens: number[];
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::MintingActivity.MintingParticipantToken"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$MintingParticipantToken}` variant of this activity instead
     *
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    MintingParticipantToken(thingWithSeed: hasSeed | TxOutputId | string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::MintingActivity.MintingParticipantToken"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$MintingParticipantToken`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    get $seeded$MintingParticipantToken(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => isActivity>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::MintingActivity.MintingFungibleTokens"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    MintingFungibleTokens(tokenName: number[]): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::MintingActivity.CreatingRecord"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$CreatingRecord}` variant of this activity instead
     *
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::MintingActivity.CreatingRecord"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => isActivity>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::MintingActivity.CreatingRecord"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$CreatingRecord}` variant of this activity instead
     *
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::MintingActivity.CreatingRecord"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => isActivity>;
}

/**
 * Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class MintingActivityHelperNested_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        CreatingRecord: TxOutputId;
    }, {
        CreatingRecord: TxOutputId | string;
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::MintingActivity.CreatingRecord"***,
     * given a transaction-context (or direct arg) with a ***seed utxo***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     *  - to get a transaction context having the seed needed for this argument,
     *    see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass.
     * - or see Stellar Contracts' `hasSeed` type for other ways to feed it with a TxOutputId.
     *  - in a context providing an implicit seed utxo, use
     *    the `$seeded$CreatingRecord}` variant of this activity instead
     *
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    CreatingRecord(thingWithSeed: hasSeed | TxOutputId | string): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::MintingActivity.CreatingRecord"***
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     * #### Usage
     * Access the activity-creator as a getter: `$seeded$CreatingRecord`
     *
     * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's
     * `mkTxnCreateRecord({activity, ...})` method.
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    get $seeded$CreatingRecord(): SeedActivity<(thingWithSeed: hasSeed | TxOutputId | string) => isActivity>;
}

/**
 * MintingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type MintingActivityLike = IntersectedEnum<
| { MintingParticipantToken: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId | string    /*minEnumVariant*/ }
| { MintingFungibleTokens: /* implied wrapper { tokenName: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * MintingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type MintingActivityLike_2 = IntersectedEnum<
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId | string    /*minEnumVariant*/ }
>

/**
 * MintingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type MintingActivityLike_3 = IntersectedEnum<
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId | string    /*minEnumVariant*/ }
>

/**
 * MintingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the MintingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `MintingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type MintingActivityLike_4 = IntersectedEnum<
| { CreatingRecord: /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId | string    /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type MintingActivityMeta = EnumTypeMeta<
    {module: "DredNodeRegistryPolicy", enumName: "MintingActivity"}, {
    CreatingRecord: singleEnumVariantMeta<MintingActivityMeta, "CreatingRecord",
    "Constr#0", "singletonField", /* implied wrapper { seed: ... } for singleVariantField */ 
    			TxOutputId   , "isSeededActivity"
    >
}
>;

/**
 * @public
 */
export declare class MyMintSpendDelegate extends STokMintDelegate {
    get delegateName(): string;
    dataBridgeClass: typeof MyMintSpendDelegateDataBridge;
    scriptBundleClass(): Promise<ConcreteCapoDelegateBundle>;
}

/**
 * GENERATED data bridge for **BasicDelegate** script (defined in class ***DredMintSpendDelegateBundle***)
 * main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**
 * @remarks
 * This class doesn't need to be used directly.  Its methods are available through the ***contract's methods***:
 *  - `get mkDatum` - returns the datum-building bridge for the contract's datum type
 *  - `get activity` - returns an activity-building bridge for the contract's activity type
 *  - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types
 *  - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script
 * The advanced methods are not typically needed - mkDatum and activity should normally provide all the
 * type-safe data-encoding needed for the contract.  For reading on-chain data, the Capo's `findDelegatedDataUtxos()`
 * method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.
 *
 * ##### customizing the bridge class name
 * Note that you may override `get bridgeClassName() { return "..." }` to customize the name of this bridge class
 * @public
 */
declare class MyMintSpendDelegateDataBridge extends ContractDataBridge {
    static isAbstract: false;
    isAbstract: false;
    /**
     * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)***
     * for this contract script.
     */
    datum: DelegateDatumHelper;
    /**
     * this is the specific type of datum for the `BasicDelegate` script
     */
    DelegateDatum: DelegateDatumHelper;
    readDatum: (d: UplcData) => ErgoDelegateDatum;
    /**
     * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script
     */
    activity: DelegateActivityHelper;
    DelegateActivity: DelegateActivityHelper;
    reader: MyMintSpendDelegateDataBridgeReader;
    /**
     * accessors for all the types defined in the `BasicDelegate` script
     * @remarks - these accessors are used to generate UplcData for each type
     */
    types: {
        /**
         * generates UplcData for the enum type ***DelegateDatum*** for the `BasicDelegate` script
         */
        DelegateDatum: DelegateDatumHelper;
        /**
         * generates UplcData for the enum type ***DelegateRole*** for the `BasicDelegate` script
         */
        DelegateRole: DelegateRoleHelper;
        /**
         * generates UplcData for the enum type ***ManifestActivity*** for the `BasicDelegate` script
         */
        ManifestActivity: ManifestActivityHelper;
        /**
         * generates UplcData for the enum type ***CapoLifecycleActivity*** for the `BasicDelegate` script
         */
        CapoLifecycleActivity: CapoLifecycleActivityHelper;
        /**
         * generates UplcData for the enum type ***DelegateLifecycleActivity*** for the `BasicDelegate` script
         */
        DelegateLifecycleActivity: DelegateLifecycleActivityHelper;
        /**
         * generates UplcData for the enum type ***SpendingActivity*** for the `BasicDelegate` script
         */
        SpendingActivity: SpendingActivityHelper;
        /**
         * generates UplcData for the enum type ***MintingActivity*** for the `BasicDelegate` script
         */
        MintingActivity: MintingActivityHelper;
        /**
         * generates UplcData for the enum type ***BurningActivity*** for the `BasicDelegate` script
         */
        BurningActivity: BurningActivityHelper;
        /**
         * generates UplcData for the enum type ***DelegateActivity*** for the `BasicDelegate` script
         */
        DelegateActivity: DelegateActivityHelper;
        /**
         * generates UplcData for the enum type ***PendingDelegateAction*** for the `BasicDelegate` script
         */
        PendingDelegateAction: PendingDelegateActionHelper;
        /**
         * generates UplcData for the enum type ***ManifestEntryType*** for the `BasicDelegate` script
         */
        ManifestEntryType: ManifestEntryTypeHelper;
        /**
         * generates UplcData for the enum type ***PendingCharterChange*** for the `BasicDelegate` script
         */
        PendingCharterChange: PendingCharterChangeHelper;
        /**
         * generates UplcData for the enum type ***cctx_CharterInputType*** for the `BasicDelegate` script
         */
        cctx_CharterInputType: cctx_CharterInputTypeHelper;
        /**
         * generates UplcData for the enum type ***AnyData*** for the `BasicDelegate` script
         */
        AnyData: (fields: AnyDataLike | {
            id: number[];
            type: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DelegationDetail*** for the `BasicDelegate` script
         */
        DelegationDetail: (fields: DelegationDetailLike | {
            capoAddr: /*minStructField*/ Address | string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            tn: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
         */
        RelativeDelegateLink: (fields: RelativeDelegateLinkLike | {
            uutName: string;
            delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
            config: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***PendingDelegateChange*** for the `BasicDelegate` script
         */
        PendingDelegateChange: (fields: PendingDelegateChangeLike | {
            action: PendingDelegateActionLike;
            role: DelegateRoleLike;
            dgtLink: /*minStructField*/ RelativeDelegateLinkLike | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoManifestEntry*** for the `BasicDelegate` script
         */
        CapoManifestEntry: (fields: CapoManifestEntryLike | {
            entryType: ManifestEntryTypeLike;
            tokenName: number[];
            mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoCtx*** for the `BasicDelegate` script
         */
        CapoCtx: (fields: CapoCtxLike | {
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            charter: cctx_CharterInputTypeLike;
        }) => UplcData;
    };
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAnyDataCast: Cast<AnyData, AnyDataLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDelegationDetailCast: Cast<DelegationDetail, DelegationDetailLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink_2, RelativeDelegateLinkLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺPendingDelegateChangeCast: Cast<PendingDelegateChange, PendingDelegateChangeLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoManifestEntryCast: Cast<CapoManifestEntry, CapoManifestEntryLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoCtxCast: Cast<CapoCtx, CapoCtxLike>;
}

/**
 * @public
 */
declare class MyMintSpendDelegateDataBridgeReader extends DataBridgeReaderClass {
    bridge: MyMintSpendDelegateDataBridge;
    constructor(bridge: MyMintSpendDelegateDataBridge, isMainnet: boolean);
    datum: (d: UplcData) => Partial<{
        Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken;
        IsDelegation: ErgoDelegationDetail;
        capoStoredData: DelegateDatum$Ergo$capoStoredData;
    }>;
    /**
     * reads UplcData *known to fit the **DelegateDatum*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateDatum(d: UplcData): ErgoDelegateDatum;
    /**
     * reads UplcData *known to fit the **DelegateRole*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateRole(d: UplcData): ErgoDelegateRole_2;
    /**
     * reads UplcData *known to fit the **ManifestActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestActivity(d: UplcData): ErgoManifestActivity_2;
    /**
     * reads UplcData *known to fit the **CapoLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoLifecycleActivity(d: UplcData): ErgoCapoLifecycleActivity;
    /**
     * reads UplcData *known to fit the **DelegateLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateLifecycleActivity(d: UplcData): ErgoDelegateLifecycleActivity;
    /**
     * reads UplcData *known to fit the **SpendingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    SpendingActivity(d: UplcData): ErgoSpendingActivity;
    /**
     * reads UplcData *known to fit the **MintingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    MintingActivity(d: UplcData): ErgoMintingActivity;
    /**
     * reads UplcData *known to fit the **BurningActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    BurningActivity(d: UplcData): ErgoBurningActivity;
    /**
     * reads UplcData *known to fit the **DelegateActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateActivity(d: UplcData): ErgoDelegateActivity;
    /**
     * reads UplcData *known to fit the **PendingDelegateAction*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateAction(d: UplcData): ErgoPendingDelegateAction_2;
    /**
     * reads UplcData *known to fit the **ManifestEntryType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestEntryType(d: UplcData): ErgoManifestEntryType_2;
    /**
     * reads UplcData *known to fit the **PendingCharterChange*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingCharterChange(d: UplcData): ErgoPendingCharterChange_2;
    /**
     * reads UplcData *known to fit the **cctx_CharterInputType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    cctx_CharterInputType(d: UplcData): Ergocctx_CharterInputType;
    /**
     * reads UplcData *known to fit the **AnyData*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AnyData(d: UplcData): AnyData;
    /**
     * reads UplcData *known to fit the **DelegationDetail*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegationDetail(d: UplcData): DelegationDetail;
    /**
     * reads UplcData *known to fit the **RelativeDelegateLink*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    RelativeDelegateLink(d: UplcData): RelativeDelegateLink_2;
    /**
     * reads UplcData *known to fit the **PendingDelegateChange*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateChange(d: UplcData): PendingDelegateChange;
    /**
     * reads UplcData *known to fit the **CapoManifestEntry*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoManifestEntry(d: UplcData): CapoManifestEntry;
    /**
     * reads UplcData *known to fit the **CapoCtx*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoCtx(d: UplcData): CapoCtx;
}

/**
 * An ergonomic, though less strictly-safe form of NbhDetails$NbhDetailsV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the NbhDetails$NbhDetailsV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type NbhDetails$Ergo$NbhDetailsV1 = {
    state: ErgoNeighborhoodState  /*minVariantField*/ ,
    appInfo: ErgoAppInfoV1  /*minVariantField*/ ,
    opsInfo: ErgoNodeOpsInfoV1  /*minVariantField*/ ,
    updateInfo: ErgoUpdateInfoV1 | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of NbhDetails$NbhDetailsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see NbhDetails$Ergo$NbhDetailsV1 instead.
 * @public
 */
declare interface NbhDetails$NbhDetailsV1 {
    state: NeighborhoodState  /*minVariantField*/ ,
    appInfo: AppInfoV1  /*minVariantField*/ ,
    opsInfo: NodeOpsInfoV1  /*minVariantField*/ ,
    updateInfo: UpdateInfoV1 | undefined  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of NbhDetails$NbhDetailsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NbhDetails$NbhDetailsV1Like {
    state: NeighborhoodStateLike  /*minVariantField*/ ,
    appInfo: AppInfoV1Like  /*minVariantField*/ ,
    opsInfo: NodeOpsInfoV1Like  /*minVariantField*/ ,
    updateInfo: UpdateInfoV1Like | undefined  /*minVariantField*/ 
}

/**
 * NbhDetails enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the NbhDetails enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NbhDetailsHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type NbhDetails = 
| { NbhDetailsV1: NbhDetails$NbhDetailsV1 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***NbhDetails*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class NbhDetailsHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        NbhDetailsV1: NbhDetails$NbhDetailsV1;
    }, {
        NbhDetailsV1: NbhDetails$NbhDetailsV1Like;
    }>;
    /**
     * generates  UplcData for ***"NeighborhoodData::NbhDetails.NbhDetailsV1"***
     * @remarks - ***NbhDetails$NbhDetailsV1Like*** is the same as the expanded field-types.
     */
    NbhDetailsV1(fields: NbhDetails$NbhDetailsV1Like | {
        state: NeighborhoodStateLike;
        appInfo: AppInfoV1Like;
        opsInfo: NodeOpsInfoV1Like;
        updateInfo: {
            name: string;
            description: string;
            url: string;
        } | undefined;
    }): UplcData;
}

/**
 * NbhDetails enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the NbhDetails enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NbhDetailsHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type NbhDetailsLike = IntersectedEnum<
| { NbhDetailsV1: NbhDetails$NbhDetailsV1Like /*minEnumVariant*/ }
>

/**
 * @public
 */
export declare class NeighborhoodController extends DelegatedDataContract<ErgoNeighborhoodData, NeighborhoodDataLike> {
    dataBridgeClass: typeof NeighborhoodPolicyDataBridge;
    scriptBundleClass(): Promise<NeighborhoodRegistryBundle>;
    idPrefix: "nbhd";
    get delegateName(): string;
    get recordTypeName(): string;
    exampleData(): minimalNeighborhoodData;
    get capo(): DredCapo;
    mkTxnRegisteringNeighborhood(this: NeighborhoodController, nbhReg: minimalNeighborhoodData, initialTcx?: StellarTxnContext): Promise<hasUutContext<"recordId" | "nbhd"> & StellarTxnContext<anyState> & hasMemberToken & hasCharterRef & hasSeedUtxo>;
    mkTxnUpdatingNeighborhood(this: NeighborhoodController, txnName: string, nbh: FoundDatumUtxo<ErgoNeighborhoodData | NeighborhoodData>, options: Omit<DgDataUpdateOptions<NeighborhoodDataLike>, "activity"> & {
        activity?: DgDataUpdateOptions<NeighborhoodDataLike>["activity"];
    }, initialTcx?: StellarTxnContext): Promise<StellarTxnContext<anyState> & hasMemberToken>;
    requirements(): ReqtsMap<never, {
    inheriting: "\u2039empty/base class\u203A";
    }>;
}

/**
 * A strong type for the canonical form of NeighborhoodData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNeighborhoodData instead.
 * @public
 */
export declare interface NeighborhoodData {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    memberToken: /*minStructField*/ string
    details: /*minStructField*/ NbhDetails
}

/**
 * A strong type for the permissive form of NeighborhoodData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NeighborhoodDataLike {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    memberToken: /*minStructField*/ string
    details: /*minStructField*/ NbhDetailsLike
}

/**
 * GENERATED data bridge for **BasicDelegate** script (defined in class ***NeighborhoodRegistryBundle***)
 * main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**
 * @remarks
 * This class doesn't need to be used directly.  Its methods are available through the ***contract's methods***:
 *  - `get mkDatum` - returns the datum-building bridge for the contract's datum type
 *  - `get activity` - returns an activity-building bridge for the contract's activity type
 *  - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types
 *  - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script
 * The advanced methods are not typically needed - mkDatum and activity should normally provide all the
 * type-safe data-encoding needed for the contract.  For reading on-chain data, the Capo's `findDelegatedDataUtxos()`
 * method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.
 *
 * ##### customizing the bridge class name
 * Note that you may override `get bridgeClassName() { return "..." }` to customize the name of this bridge class
 * @public
 */
declare class NeighborhoodPolicyDataBridge extends ContractDataBridge {
    static isAbstract: false;
    isAbstract: false;
    /**
     * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)***
     * for this contract script.
     */
    datum: DelegateDatumHelper_3;
    /**
     * this is the specific type of datum for the `BasicDelegate` script
     */
    DelegateDatum: DelegateDatumHelper_3;
    readDatum: (d: UplcData) => ErgoDelegateDatum_3;
    /**
     * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script
     */
    activity: DelegateActivityHelper_3;
    DelegateActivity: DelegateActivityHelper_3;
    reader: NeighborhoodPolicyDataBridgeReader;
    /**
     * accessors for all the types defined in the `BasicDelegate` script
     * @remarks - these accessors are used to generate UplcData for each type
     */
    types: {
        /**
         * generates UplcData for the enum type ***NeighborhoodState*** for the `BasicDelegate` script
         */
        NeighborhoodState: NeighborhoodStateHelper;
        /**
         * generates UplcData for the enum type ***FeeSource*** for the `BasicDelegate` script
         */
        FeeSource: FeeSourceHelper;
        /**
         * generates UplcData for the enum type ***SubscriptionFeeFrequency*** for the `BasicDelegate` script
         */
        SubscriptionFeeFrequency: SubscriptionFeeFrequencyHelper;
        /**
         * generates UplcData for the enum type ***RevenueModel*** for the `BasicDelegate` script
         */
        RevenueModel: RevenueModelHelper;
        /**
         * generates UplcData for the enum type ***NbhDetails*** for the `BasicDelegate` script
         */
        NbhDetails: NbhDetailsHelper;
        /**
         * generates UplcData for the enum type ***DelegateDatum*** for the `BasicDelegate` script
         */
        DelegateDatum: DelegateDatumHelper_3;
        /**
         * generates UplcData for the enum type ***DelegateRole*** for the `BasicDelegate` script
         */
        DelegateRole: DelegateRoleHelper_3;
        /**
         * generates UplcData for the enum type ***ManifestActivity*** for the `BasicDelegate` script
         */
        ManifestActivity: ManifestActivityHelper_3;
        /**
         * generates UplcData for the enum type ***CapoLifecycleActivity*** for the `BasicDelegate` script
         */
        CapoLifecycleActivity: CapoLifecycleActivityHelper_3;
        /**
         * generates UplcData for the enum type ***DelegateLifecycleActivity*** for the `BasicDelegate` script
         */
        DelegateLifecycleActivity: DelegateLifecycleActivityHelper_3;
        /**
         * generates UplcData for the enum type ***SpendingActivity*** for the `BasicDelegate` script
         */
        SpendingActivity: SpendingActivityHelper_3;
        /**
         * generates UplcData for the enum type ***MintingActivity*** for the `BasicDelegate` script
         */
        MintingActivity: MintingActivityHelper_3;
        /**
         * generates UplcData for the enum type ***BurningActivity*** for the `BasicDelegate` script
         */
        BurningActivity: BurningActivityHelper_3;
        /**
         * generates UplcData for the enum type ***OtherActivity*** for the `BasicDelegate` script
         */
        OtherActivity: OtherActivityHelper_2;
        /**
         * generates UplcData for the enum type ***DelegateActivity*** for the `BasicDelegate` script
         */
        DelegateActivity: DelegateActivityHelper_3;
        /**
         * generates UplcData for the enum type ***PendingDelegateAction*** for the `BasicDelegate` script
         */
        PendingDelegateAction: PendingDelegateActionHelper_3;
        /**
         * generates UplcData for the enum type ***ManifestEntryType*** for the `BasicDelegate` script
         */
        ManifestEntryType: ManifestEntryTypeHelper_3;
        /**
         * generates UplcData for the enum type ***PendingCharterChange*** for the `BasicDelegate` script
         */
        PendingCharterChange: PendingCharterChangeHelper_3;
        /**
         * generates UplcData for the enum type ***cctx_CharterInputType*** for the `BasicDelegate` script
         */
        cctx_CharterInputType: cctx_CharterInputTypeHelper_3;
        /**
         * generates UplcData for the enum type ***NeighborhoodSettings*** for the `BasicDelegate` script
         */
        NeighborhoodSettings: NeighborhoodSettingsHelper;
        /**
         * generates UplcData for the enum type ***dgd_DataSrc*** for the `BasicDelegate` script
         */
        dgd_DataSrc: dgd_DataSrcHelper_2;
        /**
         * generates UplcData for the enum type ***AbstractDelegateActivitiesEnum*** for the `BasicDelegate` script
         */
        AbstractDelegateActivitiesEnum: AbstractDelegateActivitiesEnumHelper_2;
        /**
         * generates UplcData for the enum type ***AnyData*** for the `BasicDelegate` script
         */
        AnyData: (fields: AnyDataLike_3 | {
            id: number[];
            type: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DelegationDetail*** for the `BasicDelegate` script
         */
        DelegationDetail: (fields: DelegationDetailLike_3 | {
            capoAddr: /*minStructField*/ Address | string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            tn: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***AppInfoV1*** for the `BasicDelegate` script
         */
        AppInfoV1: (fields: AppInfoV1Like | {
            url: string;
            revenueModel: Array<RevenueModelLike>;
            name: string;
            description: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NodeOpsInfoV1*** for the `BasicDelegate` script
         */
        NodeOpsInfoV1: (fields: NodeOpsInfoV1Like | {
            minNodes: IntLike;
            maxNodes: IntLike;
            minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            minUptime: IntLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***UpdateInfoV1*** for the `BasicDelegate` script
         */
        UpdateInfoV1: (fields: UpdateInfoV1Like | {
            name: string;
            description: string;
            url: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NeighborhoodData*** for the `BasicDelegate` script
         */
        NeighborhoodData: (fields: NeighborhoodDataLike | {
            id: number[];
            type: string;
            memberToken: string;
            details: NbhDetailsLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
         */
        RelativeDelegateLink: (fields: RelativeDelegateLinkLike_3 | {
            uutName: string;
            delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
            config: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***PendingDelegateChange*** for the `BasicDelegate` script
         */
        PendingDelegateChange: (fields: PendingDelegateChangeLike_3 | {
            action: PendingDelegateActionLike_3;
            role: DelegateRoleLike_3;
            dgtLink: /*minStructField*/ RelativeDelegateLinkLike_3 | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoManifestEntry*** for the `BasicDelegate` script
         */
        CapoManifestEntry: (fields: CapoManifestEntryLike_3 | {
            entryType: ManifestEntryTypeLike_3;
            tokenName: number[];
            mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoCtx*** for the `BasicDelegate` script
         */
        CapoCtx: (fields: CapoCtxLike_3 | {
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            charter: cctx_CharterInputTypeLike_3;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NeighborhoodSettingsV1*** for the `BasicDelegate` script
         */
        NeighborhoodSettingsV1: (fields: NeighborhoodSettingsV1Like | {
            minRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            minNbhStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***AbstractSettingsForNeighborhood*** for the `BasicDelegate` script
         */
        AbstractSettingsForNeighborhood: (fields: AbstractSettingsForNeighborhoodLike | {
            NeighborhoodSettings: NeighborhoodSettingsLike;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DgDataDetails*** for the `BasicDelegate` script
         */
        DgDataDetails: (fields: DgDataDetailsLike_2 | {
            dataSrc: dgd_DataSrcLike_2;
            id: number[];
            type: string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            activity: /*minStructField*/ AbstractDelegateActivitiesEnumLike_2 | undefined;
        }) => UplcData;
    };
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAnyDataCast: Cast<AnyData_3, AnyDataLike_3>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDelegationDetailCast: Cast<DelegationDetail_3, DelegationDetailLike_3>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAppInfoV1Cast: Cast<AppInfoV1, AppInfoV1Like>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNodeOpsInfoV1Cast: Cast<NodeOpsInfoV1, NodeOpsInfoV1Like>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺUpdateInfoV1Cast: Cast<UpdateInfoV1, UpdateInfoV1Like>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNeighborhoodDataCast: Cast<NeighborhoodData, NeighborhoodDataLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink_4, RelativeDelegateLinkLike_3>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺPendingDelegateChangeCast: Cast<PendingDelegateChange_3, PendingDelegateChangeLike_3>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoManifestEntryCast: Cast<CapoManifestEntry_3, CapoManifestEntryLike_3>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoCtxCast: Cast<CapoCtx_3, CapoCtxLike_3>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNeighborhoodSettingsV1Cast: Cast<NeighborhoodSettingsV1_2, NeighborhoodSettingsV1Like>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAbstractSettingsForNeighborhoodCast: Cast<AbstractSettingsForNeighborhood, AbstractSettingsForNeighborhoodLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDgDataDetailsCast: Cast<DgDataDetails_2, DgDataDetailsLike_2>;
}

/**
 * @public
 */
declare class NeighborhoodPolicyDataBridgeReader extends DataBridgeReaderClass {
    bridge: NeighborhoodPolicyDataBridge;
    constructor(bridge: NeighborhoodPolicyDataBridge, isMainnet: boolean);
    /**
     * reads UplcData *known to fit the **NeighborhoodState*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NeighborhoodState(d: UplcData): ErgoNeighborhoodState;
    /**
     * reads UplcData *known to fit the **FeeSource*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    FeeSource(d: UplcData): ErgoFeeSource;
    /**
     * reads UplcData *known to fit the **SubscriptionFeeFrequency*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    SubscriptionFeeFrequency(d: UplcData): ErgoSubscriptionFeeFrequency;
    /**
     * reads UplcData *known to fit the **RevenueModel*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    RevenueModel(d: UplcData): ErgoRevenueModel;
    /**
     * reads UplcData *known to fit the **NbhDetails*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NbhDetails(d: UplcData): ErgoNbhDetails;
    datum: (d: UplcData) => Partial<{
        Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_3;
        IsDelegation: ErgoDelegationDetail_3;
        capoStoredData: DelegateDatum$Ergo$capoStoredData_3;
    }>;
    /**
     * reads UplcData *known to fit the **DelegateDatum*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateDatum(d: UplcData): ErgoDelegateDatum_3;
    /**
     * reads UplcData *known to fit the **DelegateRole*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateRole(d: UplcData): ErgoDelegateRole_4;
    /**
     * reads UplcData *known to fit the **ManifestActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestActivity(d: UplcData): ErgoManifestActivity_4;
    /**
     * reads UplcData *known to fit the **CapoLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoLifecycleActivity(d: UplcData): ErgoCapoLifecycleActivity_3;
    /**
     * reads UplcData *known to fit the **DelegateLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateLifecycleActivity(d: UplcData): ErgoDelegateLifecycleActivity_3;
    /**
     * reads UplcData *known to fit the **SpendingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    SpendingActivity(d: UplcData): ErgoSpendingActivity_3;
    /**
     * reads UplcData *known to fit the **MintingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    MintingActivity(d: UplcData): ErgoMintingActivity_3;
    /**
     * reads UplcData *known to fit the **BurningActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    BurningActivity(d: UplcData): ErgoBurningActivity_3;
    /**
     * reads UplcData *known to fit the **OtherActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    OtherActivity(d: UplcData): ErgoOtherActivity_2;
    /**
     * reads UplcData *known to fit the **DelegateActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateActivity(d: UplcData): ErgoDelegateActivity_3;
    /**
     * reads UplcData *known to fit the **PendingDelegateAction*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateAction(d: UplcData): ErgoPendingDelegateAction_4;
    /**
     * reads UplcData *known to fit the **ManifestEntryType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestEntryType(d: UplcData): ErgoManifestEntryType_4;
    /**
     * reads UplcData *known to fit the **PendingCharterChange*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingCharterChange(d: UplcData): ErgoPendingCharterChange_4;
    /**
     * reads UplcData *known to fit the **cctx_CharterInputType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    cctx_CharterInputType(d: UplcData): Ergocctx_CharterInputType_3;
    /**
     * reads UplcData *known to fit the **NeighborhoodSettings*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NeighborhoodSettings(d: UplcData): ErgoNeighborhoodSettings_2;
    /**
     * reads UplcData *known to fit the **dgd_DataSrc*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    dgd_DataSrc(d: UplcData): Ergodgd_DataSrc_2;
    /**
     * reads UplcData *known to fit the **AbstractDelegateActivitiesEnum*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AbstractDelegateActivitiesEnum(d: UplcData): ErgoAbstractDelegateActivitiesEnum_2;
    /**
     * reads UplcData *known to fit the **AnyData*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AnyData(d: UplcData): AnyData_3;
    /**
     * reads UplcData *known to fit the **DelegationDetail*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegationDetail(d: UplcData): DelegationDetail_3;
    /**
     * reads UplcData *known to fit the **AppInfoV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AppInfoV1(d: UplcData): AppInfoV1;
    /**
     * reads UplcData *known to fit the **NodeOpsInfoV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NodeOpsInfoV1(d: UplcData): NodeOpsInfoV1;
    /**
     * reads UplcData *known to fit the **UpdateInfoV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    UpdateInfoV1(d: UplcData): UpdateInfoV1;
    /**
     * reads UplcData *known to fit the **NeighborhoodData*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NeighborhoodData(d: UplcData): NeighborhoodData;
    /**
     * reads UplcData *known to fit the **RelativeDelegateLink*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    RelativeDelegateLink(d: UplcData): RelativeDelegateLink_4;
    /**
     * reads UplcData *known to fit the **PendingDelegateChange*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateChange(d: UplcData): PendingDelegateChange_3;
    /**
     * reads UplcData *known to fit the **CapoManifestEntry*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoManifestEntry(d: UplcData): CapoManifestEntry_3;
    /**
     * reads UplcData *known to fit the **CapoCtx*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoCtx(d: UplcData): CapoCtx_3;
    /**
     * reads UplcData *known to fit the **NeighborhoodSettingsV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NeighborhoodSettingsV1(d: UplcData): NeighborhoodSettingsV1_2;
    /**
     * reads UplcData *known to fit the **AbstractSettingsForNeighborhood*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AbstractSettingsForNeighborhood(d: UplcData): AbstractSettingsForNeighborhood;
    /**
     * reads UplcData *known to fit the **DgDataDetails*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DgDataDetails(d: UplcData): DgDataDetails_2;
}

/**
 * NeighborhoodSettings enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the NeighborhoodSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NeighborhoodSettingsHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type NeighborhoodSettings = 
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NeighborhoodSettingsV1    /*minEnumVariant*/ }

/**
 * NeighborhoodSettings enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the NeighborhoodSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NeighborhoodSettingsHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type NeighborhoodSettings_2 = 
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NeighborhoodSettingsV1_2    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***NeighborhoodSettings*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class NeighborhoodSettingsHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        V1: NeighborhoodSettingsV1_2;
    }, {
        V1: NeighborhoodSettingsV1Like;
    }>;
    /**
     * generates  UplcData for ***"NeighborhoodSettings::NeighborhoodSettings.V1"***
     * @remarks - ***NeighborhoodSettingsV1Like*** is the same as the expanded field-type.
     */
    V1(s: NeighborhoodSettingsV1Like | {
        minRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        minNbhStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***NeighborhoodSettings*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class NeighborhoodSettingsHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        V1: NeighborhoodSettingsV1;
    }, {
        V1: NeighborhoodSettingsV1Like_2;
    }>;
    /**
     * generates  UplcData for ***"NeighborhoodSettings::NeighborhoodSettings.V1"***
     * @remarks - ***NeighborhoodSettingsV1Like*** is the same as the expanded field-type.
     */
    V1(s: NeighborhoodSettingsV1Like_2 | {
        minRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        minNbhStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): UplcData;
}

/**
 * NeighborhoodSettings enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the NeighborhoodSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NeighborhoodSettingsHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type NeighborhoodSettingsLike = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NeighborhoodSettingsV1Like    /*minEnumVariant*/ }
>

/**
 * NeighborhoodSettings enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the NeighborhoodSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NeighborhoodSettingsHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type NeighborhoodSettingsLike_2 = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NeighborhoodSettingsV1Like_2    /*minEnumVariant*/ }
>

/**
 * A strong type for the canonical form of NeighborhoodSettingsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNeighborhoodSettingsV1 instead.
 * @public
 */
declare interface NeighborhoodSettingsV1 {
    minRegistrationFee: /*minStructField*/ Value
    minNbhStake: /*minStructField*/ Value
}

/**
 * A strong type for the canonical form of NeighborhoodSettingsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNeighborhoodSettingsV1 instead.
 * @public
 */
declare interface NeighborhoodSettingsV1_2 {
    minRegistrationFee: /*minStructField*/ Value
    minNbhStake: /*minStructField*/ Value
}

/**
 * A strong type for the permissive form of NeighborhoodSettingsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NeighborhoodSettingsV1Like {
    minRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
    minNbhStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
}

/**
 * A strong type for the permissive form of NeighborhoodSettingsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NeighborhoodSettingsV1Like_2 {
    minRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
    minNbhStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
}

/**
 * NeighborhoodState enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the NeighborhoodState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NeighborhoodStateHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type NeighborhoodState = 
| { Preproduction: tagOnly /*minEnumVariant*/ }
| { Active: tagOnly /*minEnumVariant*/ }
| { UpdatePending: tagOnly /*minEnumVariant*/ }
| { UpdateDisputed: tagOnly /*minEnumVariant*/ }
| { Retired: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***NeighborhoodState*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class NeighborhoodStateHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<NeighborhoodState, Partial<{
        Preproduction: tagOnly;
        Active: tagOnly;
        UpdatePending: tagOnly;
        UpdateDisputed: tagOnly;
        Retired: tagOnly;
    }>>;
    /**
     * (property getter): UplcData for ***"NeighborhoodData::NeighborhoodState.Preproduction"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4180***
     */
    get Preproduction(): UplcData;
    /**
     * (property getter): UplcData for ***"NeighborhoodData::NeighborhoodState.Active"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4181***
     */
    get Active(): UplcData;
    /**
     * (property getter): UplcData for ***"NeighborhoodData::NeighborhoodState.UpdatePending"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4182***
     */
    get UpdatePending(): UplcData;
    /**
     * (property getter): UplcData for ***"NeighborhoodData::NeighborhoodState.UpdateDisputed"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4183***
     */
    get UpdateDisputed(): UplcData;
    /**
     * (property getter): UplcData for ***"NeighborhoodData::NeighborhoodState.Retired"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#4184***
     */
    get Retired(): UplcData;
}

/**
 * NeighborhoodState enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the NeighborhoodState enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NeighborhoodStateHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type NeighborhoodStateLike = IntersectedEnum<
| { Preproduction: tagOnly /*minEnumVariant*/ }
| { Active: tagOnly /*minEnumVariant*/ }
| { UpdatePending: tagOnly /*minEnumVariant*/ }
| { UpdateDisputed: tagOnly /*minEnumVariant*/ }
| { Retired: tagOnly /*minEnumVariant*/ }
>

/**
 * A strong type for the canonical form of NodeDetailsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNodeDetailsV1 instead.
 * @public
 */
declare interface NodeDetailsV1 {
    address: /*minStructField*/ string
    port: /*minStructField*/ bigint
    pubKey: /*minStructField*/ PubKey
    pubKeyHash: /*minStructField*/ PubKeyHash
}

/**
 * A strong type for the canonical form of NodeDetailsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNodeDetailsV1 instead.
 * @public
 */
declare interface NodeDetailsV1_2 {
    address: /*minStructField*/ string
    port: /*minStructField*/ bigint
    pubKey: /*minStructField*/ PubKey
    pubKeyHash: /*minStructField*/ PubKeyHash
}

/**
 * A strong type for the permissive form of NodeDetailsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NodeDetailsV1Like {
    address: /*minStructField*/ string
    port: /*minStructField*/ IntLike
    pubKey: /*minStructField*/ PubKey | string | number[]
    pubKeyHash: /*minStructField*/ PubKeyHash | string | number[]
}

/**
 * NodeOperatorSettings enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the NodeOperatorSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NodeOperatorSettingsHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type NodeOperatorSettings = 
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NodeOperatorSettingsV1    /*minEnumVariant*/ }

/**
 * NodeOperatorSettings enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the NodeOperatorSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NodeOperatorSettingsHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type NodeOperatorSettings_2 = 
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NodeOperatorSettingsV1_2    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***NodeOperatorSettings*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class NodeOperatorSettingsHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        V1: NodeOperatorSettingsV1_2;
    }, {
        V1: NodeOperatorSettingsV1Like;
    }>;
    /**
     * generates  UplcData for ***"NodeOperatorSettings::NodeOperatorSettings.V1"***
     * @remarks - ***NodeOperatorSettingsV1Like*** is the same as the expanded field-type.
     */
    V1(s: NodeOperatorSettingsV1Like | {
        expectedHeartbeatInterval: IntLike;
        requiredNodeUptime: number;
        minValidations: IntLike;
        minNodeRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***NodeOperatorSettings*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class NodeOperatorSettingsHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        V1: NodeOperatorSettingsV1;
    }, {
        V1: NodeOperatorSettingsV1Like_2;
    }>;
    /**
     * generates  UplcData for ***"NodeOperatorSettings::NodeOperatorSettings.V1"***
     * @remarks - ***NodeOperatorSettingsV1Like*** is the same as the expanded field-type.
     */
    V1(s: NodeOperatorSettingsV1Like_2 | {
        expectedHeartbeatInterval: IntLike;
        requiredNodeUptime: number;
        minValidations: IntLike;
        minNodeRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }): UplcData;
}

/**
 * NodeOperatorSettings enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the NodeOperatorSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NodeOperatorSettingsHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type NodeOperatorSettingsLike = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NodeOperatorSettingsV1Like    /*minEnumVariant*/ }
>

/**
 * NodeOperatorSettings enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the NodeOperatorSettings enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `NodeOperatorSettingsHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type NodeOperatorSettingsLike_2 = IntersectedEnum<
| { V1: /* implied wrapper { s: ... } for singleVariantField */ 
    			NodeOperatorSettingsV1Like_2    /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type NodeOperatorSettingsMeta = EnumTypeMeta<
    {module: "NodeOperatorSettings", enumName: "NodeOperatorSettings"}, {
    V1: singleEnumVariantMeta<NodeOperatorSettingsMeta, "V1",
    "Constr#0", "singletonField", /* implied wrapper { s: ... } for singleVariantField */ 
    			NodeOperatorSettingsV1_2   , "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of NodeOperatorSettingsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNodeOperatorSettingsV1 instead.
 * @public
 */
declare interface NodeOperatorSettingsV1 {
    expectedHeartbeatInterval: /*minStructField*/ bigint
    requiredNodeUptime: /*minStructField*/ number
    minValidations: /*minStructField*/ bigint
    minNodeRegistrationFee: /*minStructField*/ Value
    minNodeOperatorStake: /*minStructField*/ Value
}

/**
 * A strong type for the canonical form of NodeOperatorSettingsV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNodeOperatorSettingsV1 instead.
 * @public
 */
declare interface NodeOperatorSettingsV1_2 {
    expectedHeartbeatInterval: /*minStructField*/ bigint
    requiredNodeUptime: /*minStructField*/ number
    minValidations: /*minStructField*/ bigint
    minNodeRegistrationFee: /*minStructField*/ Value
    minNodeOperatorStake: /*minStructField*/ Value
}

/**
 * A strong type for the permissive form of NodeOperatorSettingsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NodeOperatorSettingsV1Like {
    expectedHeartbeatInterval: /*minStructField*/ IntLike
    requiredNodeUptime: /*minStructField*/ number
    minValidations: /*minStructField*/ IntLike
    minNodeRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
    minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
}

/**
 * A strong type for the permissive form of NodeOperatorSettingsV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NodeOperatorSettingsV1Like_2 {
    expectedHeartbeatInterval: /*minStructField*/ IntLike
    requiredNodeUptime: /*minStructField*/ number
    minValidations: /*minStructField*/ IntLike
    minNodeRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
    minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
}

/**
 * A strong type for the canonical form of NodeOpsInfoV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNodeOpsInfoV1 instead.
 * @public
 */
declare interface NodeOpsInfoV1 {
    minNodes: /*minStructField*/ bigint
    maxNodes: /*minStructField*/ bigint
    minNodeOperatorStake: /*minStructField*/ Value
    minUptime: /*minStructField*/ bigint
}

/**
 * A strong type for the permissive form of NodeOpsInfoV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NodeOpsInfoV1Like {
    minNodes: /*minStructField*/ IntLike
    maxNodes: /*minStructField*/ IntLike
    minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]
    minUptime: /*minStructField*/ IntLike
}

/**
 * A strong type for the canonical form of NodeRegistrationData
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoNodeRegistrationData instead.
 * @public
 */
export declare interface NodeRegistrationData {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    memberToken: /*minStructField*/ string
    state: /*minStructField*/ DredNodeState
    nodeDetails: /*minStructField*/ NodeDetailsV1
}

/**
 * A strong type for the permissive form of NodeRegistrationData
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface NodeRegistrationDataLike {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    memberToken: /*minStructField*/ string
    state: /*minStructField*/ DredNodeStateLike
    nodeDetails: /*minStructField*/ NodeDetailsV1Like
}

/**
 * @public
 */
export declare class NodeRegistryController extends DelegatedDataContract<ErgoNodeRegistrationData, NodeRegistrationDataLike> {
    dataBridgeClass: typeof DredNodeRegistryPolicyDataBridge;
    scriptBundleClass(): Promise<default_2>;
    idPrefix: "dredNode";
    get delegateName(): string;
    get recordTypeName(): string;
    exampleData(): minimalNodeRegistrationData;
    get capo(): DredCapo;
    mkTxnRegisteringNode(this: NodeRegistryController, nodeReg: minimalNodeRegistrationData, initialTcx?: StellarTxnContext): Promise<hasUutContext<"recordId" | "dredNode"> & StellarTxnContext<anyState> & hasMemberToken & hasSettingsRef<any, any> & hasCharterRef & hasSeedUtxo>;
    mkTxnActivatingNode(item: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>, options?: Omit<DgDataUpdateOptions<NodeRegistrationDataLike>, "activity"> & {
        activity?: DgDataUpdateOptions<NodeRegistrationDataLike>["activity"];
    }, initialTcx?: StellarTxnContext<anyState> | undefined): Promise<StellarTxnContext<anyState>>;
    mkTxnUpdatingNodeRegistration(txnName: string, item: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>, options: Omit<DgDataUpdateOptions<NodeRegistrationDataLike>, "activity"> & {
        activity?: DgDataUpdateOptions<NodeRegistrationDataLike>["activity"];
        withMemberToken?: boolean;
    }, initialTcx?: StellarTxnContext<anyState> | undefined): Promise<StellarTxnContext<anyState>>;
    mkTxnValidatingNode(txnName: string, item: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>, options: Omit<DgDataUpdateOptions<NodeRegistrationDataLike>, "activity" | "updatedFields"> & {
        validatorReg: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>;
    }, initialTcx?: StellarTxnContext<anyState> | undefined): Promise<StellarTxnContext<anyState>>;
    addValidatorRef(tcx: StellarTxnContext<anyState>, validatorReg: FoundDatumUtxo<NodeRegistrationData | ErgoNodeRegistrationData, any>): StellarTxnContext<anyState>;
    requirements(): ReqtsMap<never, {
    inheriting: "\u2039empty/base class\u203A";
    }>;
}

/**
 * OtherActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the OtherActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `OtherActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type OtherActivity = 
| { Placeholder: tagOnly /*minEnumVariant*/ }

/**
 * OtherActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the OtherActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `OtherActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type OtherActivity_2 = 
| { Placeholder: tagOnly /*minEnumVariant*/ }

/**
 * OtherActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the OtherActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `OtherActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type OtherActivity_3 = 
| { Placeholder: tagOnly /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***OtherActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class OtherActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        Placeholder: tagOnly;
    }, {
        Placeholder: tagOnly;
    }>;
    /**
     * (property getter): UplcData for ***"DredNodeRegistryPolicy::OtherActivity.Placeholder"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#42***
     */
    get Placeholder(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***OtherActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class OtherActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        Placeholder: tagOnly;
    }, {
        Placeholder: tagOnly;
    }>;
    /**
     * (property getter): UplcData for ***"NeighborhoodPolicy::OtherActivity.Placeholder"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#42***
     */
    get Placeholder(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***OtherActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class OtherActivityHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        Placeholder: tagOnly;
    }, {
        Placeholder: tagOnly;
    }>;
    /**
     * (property getter): UplcData for ***"ProtocolSettingsPolicy::OtherActivity.Placeholder"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#42***
     */
    get Placeholder(): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***OtherActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class OtherActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        Placeholder: tagOnly;
    }, {
        Placeholder: tagOnly;
    }>;
    /**
     * (property getter): UplcData for ***"DredNodeRegistryPolicy::OtherActivity.Placeholder"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#42***
     */
    get Placeholder(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***OtherActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class OtherActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        Placeholder: tagOnly;
    }, {
        Placeholder: tagOnly;
    }>;
    /**
     * (property getter): UplcData for ***"NeighborhoodPolicy::OtherActivity.Placeholder"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#42***
     */
    get Placeholder(): {
        redeemer: UplcData;
    };
}

/**
 * Helper class for generating UplcData for variants of the ***OtherActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class OtherActivityHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        Placeholder: tagOnly;
    }, {
        Placeholder: tagOnly;
    }>;
    /**
     * (property getter): UplcData for ***"ProtocolSettingsPolicy::OtherActivity.Placeholder"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#42***
     */
    get Placeholder(): {
        redeemer: UplcData;
    };
}

/**
 * OtherActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the OtherActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `OtherActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type OtherActivityLike = IntersectedEnum<
| { Placeholder: tagOnly /*minEnumVariant*/ }
>

/**
 * OtherActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the OtherActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `OtherActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type OtherActivityLike_2 = IntersectedEnum<
| { Placeholder: tagOnly /*minEnumVariant*/ }
>

/**
 * OtherActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the OtherActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `OtherActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type OtherActivityLike_3 = IntersectedEnum<
| { Placeholder: tagOnly /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type OtherActivityMeta = EnumTypeMeta<
    {module: "DredNodeRegistryPolicy", enumName: "OtherActivity"}, {
    Placeholder: singleEnumVariantMeta<OtherActivityMeta, "Placeholder",
    "Constr#42", "tagOnly", tagOnly, "noSpecialFlags"
    >
}
>;

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingCharterChange$Ergo$otherManifestChange = {
    activity: ErgoManifestActivity  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingCharterChange$Ergo$otherManifestChange_2 = {
    activity: ErgoManifestActivity_2  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole_2>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingCharterChange$Ergo$otherManifestChange_3 = {
    activity: ErgoManifestActivity_3  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole_3>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingCharterChange$Ergo$otherManifestChange_4 = {
    activity: ErgoManifestActivity_4  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole_4>  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingCharterChange$otherManifestChange
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingCharterChange$otherManifestChangeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingCharterChange$Ergo$otherManifestChange_5 = {
    activity: ErgoManifestActivity_5  /*minVariantField*/ ,
    remainingDelegateValidations: Array<ErgoDelegateRole_5>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingCharterChange$otherManifestChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingCharterChange$Ergo$otherManifestChange instead.
 * @public
 */
declare interface PendingCharterChange$otherManifestChange {
    activity: ManifestActivity  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRole_2>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingCharterChange$otherManifestChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingCharterChange$Ergo$otherManifestChange instead.
 * @public
 */
declare interface PendingCharterChange$otherManifestChange_2 {
    activity: ManifestActivity_2  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRole_3>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingCharterChange$otherManifestChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingCharterChange$Ergo$otherManifestChange instead.
 * @public
 */
declare interface PendingCharterChange$otherManifestChange_3 {
    activity: ManifestActivity_3  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRole_4>  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingCharterChange$otherManifestChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingCharterChange$Ergo$otherManifestChange instead.
 * @public
 */
declare interface PendingCharterChange$otherManifestChange_4 {
    activity: ManifestActivity_4  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRole_5>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingCharterChange$otherManifestChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingCharterChange$otherManifestChangeLike {
    activity: ManifestActivityLike  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRoleLike>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingCharterChange$otherManifestChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingCharterChange$otherManifestChangeLike_2 {
    activity: ManifestActivityLike_2  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRoleLike_2>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingCharterChange$otherManifestChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingCharterChange$otherManifestChangeLike_3 {
    activity: ManifestActivityLike_3  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRoleLike_3>  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingCharterChange$otherManifestChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingCharterChange$otherManifestChangeLike_4 {
    activity: ManifestActivityLike_4  /*minVariantField*/ ,
    remainingDelegateValidations: Array<DelegateRoleLike_4>  /*minVariantField*/ 
}

/**
 * PendingCharterChange enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingCharterChange = 
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChange /*minEnumVariant*/ }

/**
 * PendingCharterChange enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingCharterChange_2 = 
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange_2    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChange_2 /*minEnumVariant*/ }

/**
 * PendingCharterChange enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingCharterChange_3 = 
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange_3    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChange_3 /*minEnumVariant*/ }

/**
 * PendingCharterChange enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingCharterChange_4 = 
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange_4    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChange_4 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingCharterChangeHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingCharterChange, Partial<{
        delegateChange: PendingDelegateChangeLike;
        otherManifestChange: PendingCharterChange$otherManifestChangeLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.delegateChange"***
     * @remarks - ***PendingDelegateChangeLike*** is the same as the expanded field-type.
     */
    delegateChange(change: PendingDelegateChangeLike | {
        action: PendingDelegateActionLike;
        role: DelegateRoleLike;
        dgtLink: /*minStructField*/ RelativeDelegateLinkLike | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.otherManifestChange"***
     * @remarks - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.
     */
    otherManifestChange(fields: PendingCharterChange$otherManifestChangeLike | {
        activity: ManifestActivityLike;
        remainingDelegateValidations: Array<DelegateRoleLike>;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingCharterChangeHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingCharterChange_2, Partial<{
        delegateChange: PendingDelegateChangeLike_2;
        otherManifestChange: PendingCharterChange$otherManifestChangeLike_2;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.delegateChange"***
     * @remarks - ***PendingDelegateChangeLike*** is the same as the expanded field-type.
     */
    delegateChange(change: PendingDelegateChangeLike_2 | {
        action: PendingDelegateActionLike_2;
        role: DelegateRoleLike_2;
        dgtLink: /*minStructField*/ RelativeDelegateLinkLike_2 | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.otherManifestChange"***
     * @remarks - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.
     */
    otherManifestChange(fields: PendingCharterChange$otherManifestChangeLike_2 | {
        activity: ManifestActivityLike_2;
        remainingDelegateValidations: Array<DelegateRoleLike_2>;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingCharterChangeHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingCharterChange_3, Partial<{
        delegateChange: PendingDelegateChangeLike_3;
        otherManifestChange: PendingCharterChange$otherManifestChangeLike_3;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.delegateChange"***
     * @remarks - ***PendingDelegateChangeLike*** is the same as the expanded field-type.
     */
    delegateChange(change: PendingDelegateChangeLike_3 | {
        action: PendingDelegateActionLike_3;
        role: DelegateRoleLike_3;
        dgtLink: /*minStructField*/ RelativeDelegateLinkLike_3 | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.otherManifestChange"***
     * @remarks - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.
     */
    otherManifestChange(fields: PendingCharterChange$otherManifestChangeLike_3 | {
        activity: ManifestActivityLike_3;
        remainingDelegateValidations: Array<DelegateRoleLike_3>;
    }): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingCharterChangeHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingCharterChange_4, Partial<{
        delegateChange: PendingDelegateChangeLike_4;
        otherManifestChange: PendingCharterChange$otherManifestChangeLike_4;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.delegateChange"***
     * @remarks - ***PendingDelegateChangeLike*** is the same as the expanded field-type.
     */
    delegateChange(change: PendingDelegateChangeLike_4 | {
        action: PendingDelegateActionLike_4;
        role: DelegateRoleLike_4;
        dgtLink: /*minStructField*/ RelativeDelegateLinkLike_4 | undefined;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingCharterChange.otherManifestChange"***
     * @remarks - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.
     */
    otherManifestChange(fields: PendingCharterChange$otherManifestChangeLike_4 | {
        activity: ManifestActivityLike_4;
        remainingDelegateValidations: Array<DelegateRoleLike_4>;
    }): UplcData;
}

/**
 * PendingCharterChange enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingCharterChangeLike = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChangeLike    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChangeLike /*minEnumVariant*/ }
>

/**
 * PendingCharterChange enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingCharterChangeLike_2 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChangeLike_2    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChangeLike_2 /*minEnumVariant*/ }
>

/**
 * PendingCharterChange enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingCharterChangeLike_3 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChangeLike_3    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChangeLike_3 /*minEnumVariant*/ }
>

/**
 * PendingCharterChange enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the PendingCharterChange enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingCharterChangeHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingCharterChangeLike_4 = IntersectedEnum<
| { delegateChange: /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChangeLike_4    /*minEnumVariant*/ }
| { otherManifestChange: PendingCharterChange$otherManifestChangeLike_4 /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type PendingCharterChangeMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "PendingCharterChange"}, {
    delegateChange: singleEnumVariantMeta<PendingCharterChangeMeta, "delegateChange",
    "Constr#0", "singletonField", /* implied wrapper { change: ... } for singleVariantField */ 
    			PendingDelegateChange_2   , "noSpecialFlags"
    >,
    otherManifestChange: singleEnumVariantMeta<PendingCharterChangeMeta, "otherManifestChange",
    "Constr#1", 
    "fields", PendingCharterChange$otherManifestChange_2, "noSpecialFlags"
    >
}
>;

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add_4 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Add
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Add instead.
 * @public
 */
declare interface PendingDelegateAction$Add_5 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Add
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$AddLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Add
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$AddLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Add
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$AddLike_3 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Add
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$AddLike_4 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add = PendingDelegateAction$Add

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add_2 = PendingDelegateAction$Add_2

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add_3 = PendingDelegateAction$Add_3

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add_4 = PendingDelegateAction$Add_4

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Add
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$AddLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Add_5 = PendingDelegateAction$Add_5

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace = PendingDelegateAction$Replace

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace_2 = PendingDelegateAction$Replace_2

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace_3 = PendingDelegateAction$Replace_3

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace_4 = PendingDelegateAction$Replace_4

/**
 * An ergonomic, though less strictly-safe form of PendingDelegateAction$Replace
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the PendingDelegateAction$ReplaceLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type PendingDelegateAction$Ergo$Replace_5 = PendingDelegateAction$Replace_5

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace_2 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace_3 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace_4 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of PendingDelegateAction$Replace
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see PendingDelegateAction$Ergo$Replace instead.
 * @public
 */
declare interface PendingDelegateAction$Replace_5 {
    seed: TxOutputId  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Replace
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$ReplaceLike {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]}  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Replace
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$ReplaceLike_2 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]}  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Replace
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$ReplaceLike_3 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]}  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of PendingDelegateAction$Replace
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateAction$ReplaceLike_4 {
    seed: TxOutputId | string  /*minVariantField*/ ,
    purpose: string  /*minVariantField*/ ,
    idPrefix: string  /*minVariantField*/ ,
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {mph: MintingPolicyHash | string | number[], tokenName: string | number[]}  /*minVariantField*/ 
}

/**
 * PendingDelegateAction enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingDelegateAction = 
| { Add: PendingDelegateAction$Add_2 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Replace_2 /*minEnumVariant*/ }

/**
 * PendingDelegateAction enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingDelegateAction_2 = 
| { Add: PendingDelegateAction$Add_3 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Replace_3 /*minEnumVariant*/ }

/**
 * PendingDelegateAction enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingDelegateAction_3 = 
| { Add: PendingDelegateAction$Add_4 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Replace_4 /*minEnumVariant*/ }

/**
 * PendingDelegateAction enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type PendingDelegateAction_4 = 
| { Add: PendingDelegateAction$Add_5 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$Replace_5 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingDelegateActionHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingDelegateAction, Partial<{
        Add: PendingDelegateAction$AddLike;
        Remove: tagOnly;
        Replace: PendingDelegateAction$ReplaceLike;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Add}` for use in a context
     * providing an implicit seed utxo.
     */
    Add(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***
     * with raw seed details included in fields.
     */
    Add(fields: PendingDelegateAction$AddLike | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * @param fields - \{ purpose: string, idPrefix: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Add({ purpose, idPrefix })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Add: (fields: {
        purpose: string;
        idPrefix: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Remove"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Remove(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Replace}` for use in a context
     * providing an implicit seed utxo.
     */
    Replace(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***
     * with raw seed details included in fields.
     */
    Replace(fields: PendingDelegateAction$ReplaceLike | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * @param fields - \{ purpose: string, idPrefix: string, replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | \{mph: MintingPolicyHash | string | number[], tokenName: string | number[]\} \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Replace({ purpose, idPrefix, replacesDgt })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Replace: (fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
    mph: MintingPolicyHash | string | number[];
    tokenName: string | number[];
    };
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingDelegateActionHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingDelegateAction_2, Partial<{
        Add: PendingDelegateAction$AddLike_2;
        Remove: tagOnly;
        Replace: PendingDelegateAction$ReplaceLike_2;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Add}` for use in a context
     * providing an implicit seed utxo.
     */
    Add(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***
     * with raw seed details included in fields.
     */
    Add(fields: PendingDelegateAction$AddLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * @param fields - \{ purpose: string, idPrefix: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Add({ purpose, idPrefix })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Add: (fields: {
        purpose: string;
        idPrefix: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Remove"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Remove(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Replace}` for use in a context
     * providing an implicit seed utxo.
     */
    Replace(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***
     * with raw seed details included in fields.
     */
    Replace(fields: PendingDelegateAction$ReplaceLike_2 | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * @param fields - \{ purpose: string, idPrefix: string, replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | \{mph: MintingPolicyHash | string | number[], tokenName: string | number[]\} \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Replace({ purpose, idPrefix, replacesDgt })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Replace: (fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
    mph: MintingPolicyHash | string | number[];
    tokenName: string | number[];
    };
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingDelegateActionHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingDelegateAction_3, Partial<{
        Add: PendingDelegateAction$AddLike_3;
        Remove: tagOnly;
        Replace: PendingDelegateAction$ReplaceLike_3;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Add}` for use in a context
     * providing an implicit seed utxo.
     */
    Add(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***
     * with raw seed details included in fields.
     */
    Add(fields: PendingDelegateAction$AddLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * @param fields - \{ purpose: string, idPrefix: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Add({ purpose, idPrefix })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Add: (fields: {
        purpose: string;
        idPrefix: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Remove"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Remove(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Replace}` for use in a context
     * providing an implicit seed utxo.
     */
    Replace(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***
     * with raw seed details included in fields.
     */
    Replace(fields: PendingDelegateAction$ReplaceLike_3 | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * @param fields - \{ purpose: string, idPrefix: string, replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | \{mph: MintingPolicyHash | string | number[], tokenName: string | number[]\} \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Replace({ purpose, idPrefix, replacesDgt })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Replace: (fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
    mph: MintingPolicyHash | string | number[];
    tokenName: string | number[];
    };
    }) => UplcData>;
}

/**
 * Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class PendingDelegateActionHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<PendingDelegateAction_4, Partial<{
        Add: PendingDelegateAction$AddLike_4;
        Remove: tagOnly;
        Replace: PendingDelegateAction$ReplaceLike_4;
    }>>;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Add}` for use in a context
     * providing an implicit seed utxo.
     */
    Add(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***
     * with raw seed details included in fields.
     */
    Add(fields: PendingDelegateAction$AddLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Add"***,
     * @param fields - \{ purpose: string, idPrefix: string \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Add({ purpose, idPrefix })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Add: (fields: {
        purpose: string;
        idPrefix: string;
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    }) => UplcData>;
    /**
     * (property getter): UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Remove"***
     * @remarks - ***tagOnly*** variant accessor returns an empty ***constrData#1***
     */
    get Remove(): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * given a transaction-context ***with a seed utxo*** and other field details
     * @remarks
     * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass
     * to create a context satisfying `hasSeed`.
     * See `$seeded$Replace}` for use in a context
     * providing an implicit seed utxo.
     */
    Replace(value: hasSeed, fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***
     * with raw seed details included in fields.
     */
    Replace(fields: PendingDelegateAction$ReplaceLike_4 | {
        seed: TxOutputId | string;
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }): UplcData;
    /**
     * generates  UplcData for ***"CapoDelegateHelpers::PendingDelegateAction.Replace"***,
     * @param fields - \{ purpose: string, idPrefix: string, replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | \{mph: MintingPolicyHash | string | number[], tokenName: string | number[]\} \}
     * @remarks
     * ##### Seeded activity
     * This activity  uses the pattern of spending a utxo to provide a uniqueness seed.
     * ##### Activity contains implied seed
     * Creates a SeedActivity based on the provided args, reserving space for a seed to be
     * provided implicitly by a SeedActivity-supporting library function.
     *
     * #### Usage
     *   1. Call the `$seeded$Replace({ purpose, idPrefix, replacesDgt })`
     *       method with the indicated (non-seed) details.
     *   2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's
     *       `mkTxnCreateRecord({activity})` method.
     */
    $seeded$Replace: (fields: {
        purpose: string;
        idPrefix: string;
        replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
            mph: MintingPolicyHash | string | number[];
            tokenName: string | number[];
        };
    }) => SeedActivity<(value: hasSeed, fields: {
    purpose: string;
    idPrefix: string;
    replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | {
    mph: MintingPolicyHash | string | number[];
    tokenName: string | number[];
    };
    }) => UplcData>;
}

/**
 * PendingDelegateAction enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingDelegateActionLike = IntersectedEnum<
| { Add: PendingDelegateAction$AddLike /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$ReplaceLike /*minEnumVariant*/ }
>

/**
 * PendingDelegateAction enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingDelegateActionLike_2 = IntersectedEnum<
| { Add: PendingDelegateAction$AddLike_2 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$ReplaceLike_2 /*minEnumVariant*/ }
>

/**
 * PendingDelegateAction enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingDelegateActionLike_3 = IntersectedEnum<
| { Add: PendingDelegateAction$AddLike_3 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$ReplaceLike_3 /*minEnumVariant*/ }
>

/**
 * PendingDelegateAction enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the PendingDelegateAction enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `PendingDelegateActionHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type PendingDelegateActionLike_4 = IntersectedEnum<
| { Add: PendingDelegateAction$AddLike_4 /*minEnumVariant*/ }
| { Remove: tagOnly /*minEnumVariant*/ }
| { Replace: PendingDelegateAction$ReplaceLike_4 /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type PendingDelegateActionMeta = EnumTypeMeta<
    {module: "CapoDelegateHelpers", enumName: "PendingDelegateAction"}, {
    Add: singleEnumVariantMeta<PendingDelegateActionMeta, "Add",
    "Constr#0", 
    "fields", PendingDelegateAction$Add_3, "isSeededActivity"
    >,
    Remove: singleEnumVariantMeta<PendingDelegateActionMeta, "Remove",
    "Constr#1", "tagOnly", tagOnly, "noSpecialFlags"
    >,
    Replace: singleEnumVariantMeta<PendingDelegateActionMeta, "Replace",
    "Constr#2", 
    "fields", PendingDelegateAction$Replace_3, "isSeededActivity"
    >
}
>;

/**
 * A strong type for the canonical form of PendingDelegateChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoPendingDelegateChange instead.
 * @public
 */
declare interface PendingDelegateChange {
    action: /*minStructField*/ PendingDelegateAction
    role: /*minStructField*/ DelegateRole_2
    dgtLink: /*minStructField*/ RelativeDelegateLink_2 | undefined
}

/**
 * A strong type for the canonical form of PendingDelegateChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoPendingDelegateChange instead.
 * @public
 */
declare interface PendingDelegateChange_2 {
    action: /*minStructField*/ PendingDelegateAction_2
    role: /*minStructField*/ DelegateRole_3
    dgtLink: /*minStructField*/ RelativeDelegateLink_3 | undefined
}

/**
 * A strong type for the canonical form of PendingDelegateChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoPendingDelegateChange instead.
 * @public
 */
declare interface PendingDelegateChange_3 {
    action: /*minStructField*/ PendingDelegateAction_3
    role: /*minStructField*/ DelegateRole_4
    dgtLink: /*minStructField*/ RelativeDelegateLink_4 | undefined
}

/**
 * A strong type for the canonical form of PendingDelegateChange
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoPendingDelegateChange instead.
 * @public
 */
declare interface PendingDelegateChange_4 {
    action: /*minStructField*/ PendingDelegateAction_4
    role: /*minStructField*/ DelegateRole_5
    dgtLink: /*minStructField*/ RelativeDelegateLink_5 | undefined
}

/**
 * A strong type for the permissive form of PendingDelegateChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateChangeLike {
    action: /*minStructField*/ PendingDelegateActionLike
    role: /*minStructField*/ DelegateRoleLike
    dgtLink: /*minStructField*/ RelativeDelegateLinkLike | undefined
}

/**
 * A strong type for the permissive form of PendingDelegateChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateChangeLike_2 {
    action: /*minStructField*/ PendingDelegateActionLike_2
    role: /*minStructField*/ DelegateRoleLike_2
    dgtLink: /*minStructField*/ RelativeDelegateLinkLike_2 | undefined
}

/**
 * A strong type for the permissive form of PendingDelegateChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateChangeLike_3 {
    action: /*minStructField*/ PendingDelegateActionLike_3
    role: /*minStructField*/ DelegateRoleLike_3
    dgtLink: /*minStructField*/ RelativeDelegateLinkLike_3 | undefined
}

/**
 * A strong type for the permissive form of PendingDelegateChange
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface PendingDelegateChangeLike_4 {
    action: /*minStructField*/ PendingDelegateActionLike_4
    role: /*minStructField*/ DelegateRoleLike_4
    dgtLink: /*minStructField*/ RelativeDelegateLinkLike_4 | undefined
}

/**
 * A strong type for the canonical form of ProtocolSettings
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoProtocolSettings instead.
 * @public
 */
declare interface ProtocolSettings {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    nodeOpSettings: /*minStructField*/ NodeOperatorSettings
    nbhSettings: /*minStructField*/ NeighborhoodSettings
}

/**
 * @public
 */
export declare class ProtocolSettingsController extends DelegatedDataContract<ProtocolSettings, ProtocolSettingsLike> {
    dataBridgeClass: typeof ProtocolSettingsPolicyDataBridge;
    scriptBundleClass(): Promise<ProtocolSettingsBundle>;
    get capo(): DredCapo;
    get delegateName(): string;
    get idPrefix(): "set";
    get recordTypeName(): string;
    requirements(): ReqtsMap<never, {
    inheriting: "\u2039empty/base class\u203A";
    }>;
    /**
     * creates settings data with minting-policy hashes prepared for each membership tier
     */
    initialSettingsData(): Promise<minimalProtocolSettings>;
    exampleData(): minimalProtocolSettings;
}

/**
 * A strong type for the permissive form of ProtocolSettings
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface ProtocolSettingsLike {
    id: /*minStructField*/ number[]
    type: /*minStructField*/ string
    nodeOpSettings: /*minStructField*/ NodeOperatorSettingsLike_2
    nbhSettings: /*minStructField*/ NeighborhoodSettingsLike_2
}

/**
 * GENERATED data bridge for **BasicDelegate** script (defined in class ***ProtocolSettingsBundle***)
 * main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**
 * @remarks
 * This class doesn't need to be used directly.  Its methods are available through the ***contract's methods***:
 *  - `get mkDatum` - returns the datum-building bridge for the contract's datum type
 *  - `get activity` - returns an activity-building bridge for the contract's activity type
 *  - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types
 *  - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script
 * The advanced methods are not typically needed - mkDatum and activity should normally provide all the
 * type-safe data-encoding needed for the contract.  For reading on-chain data, the Capo's `findDelegatedDataUtxos()`
 * method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.
 *
 * ##### customizing the bridge class name
 * Note that you may override `get bridgeClassName() { return "..." }` to customize the name of this bridge class
 * @public
 */
declare class ProtocolSettingsPolicyDataBridge extends ContractDataBridge {
    static isAbstract: false;
    isAbstract: false;
    /**
     * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)***
     * for this contract script.
     */
    datum: DelegateDatumHelper_4;
    /**
     * this is the specific type of datum for the `BasicDelegate` script
     */
    DelegateDatum: DelegateDatumHelper_4;
    readDatum: (d: UplcData) => ErgoDelegateDatum_4;
    /**
     * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script
     */
    activity: DelegateActivityHelper_4;
    DelegateActivity: DelegateActivityHelper_4;
    reader: ProtocolSettingsPolicyDataBridgeReader;
    /**
     * accessors for all the types defined in the `BasicDelegate` script
     * @remarks - these accessors are used to generate UplcData for each type
     */
    types: {
        /**
         * generates UplcData for the enum type ***NodeOperatorSettings*** for the `BasicDelegate` script
         */
        NodeOperatorSettings: NodeOperatorSettingsHelper_2;
        /**
         * generates UplcData for the enum type ***NeighborhoodSettings*** for the `BasicDelegate` script
         */
        NeighborhoodSettings: NeighborhoodSettingsHelper_2;
        /**
         * generates UplcData for the enum type ***DelegateDatum*** for the `BasicDelegate` script
         */
        DelegateDatum: DelegateDatumHelper_4;
        /**
         * generates UplcData for the enum type ***DelegateRole*** for the `BasicDelegate` script
         */
        DelegateRole: DelegateRoleHelper_4;
        /**
         * generates UplcData for the enum type ***ManifestActivity*** for the `BasicDelegate` script
         */
        ManifestActivity: ManifestActivityHelper_4;
        /**
         * generates UplcData for the enum type ***CapoLifecycleActivity*** for the `BasicDelegate` script
         */
        CapoLifecycleActivity: CapoLifecycleActivityHelper_4;
        /**
         * generates UplcData for the enum type ***DelegateLifecycleActivity*** for the `BasicDelegate` script
         */
        DelegateLifecycleActivity: DelegateLifecycleActivityHelper_4;
        /**
         * generates UplcData for the enum type ***SpendingActivity*** for the `BasicDelegate` script
         */
        SpendingActivity: SpendingActivityHelper_4;
        /**
         * generates UplcData for the enum type ***MintingActivity*** for the `BasicDelegate` script
         */
        MintingActivity: MintingActivityHelper_4;
        /**
         * generates UplcData for the enum type ***BurningActivity*** for the `BasicDelegate` script
         */
        BurningActivity: BurningActivityHelper_4;
        /**
         * generates UplcData for the enum type ***OtherActivity*** for the `BasicDelegate` script
         */
        OtherActivity: OtherActivityHelper_3;
        /**
         * generates UplcData for the enum type ***DelegateActivity*** for the `BasicDelegate` script
         */
        DelegateActivity: DelegateActivityHelper_4;
        /**
         * generates UplcData for the enum type ***PendingDelegateAction*** for the `BasicDelegate` script
         */
        PendingDelegateAction: PendingDelegateActionHelper_4;
        /**
         * generates UplcData for the enum type ***ManifestEntryType*** for the `BasicDelegate` script
         */
        ManifestEntryType: ManifestEntryTypeHelper_4;
        /**
         * generates UplcData for the enum type ***PendingCharterChange*** for the `BasicDelegate` script
         */
        PendingCharterChange: PendingCharterChangeHelper_4;
        /**
         * generates UplcData for the enum type ***cctx_CharterInputType*** for the `BasicDelegate` script
         */
        cctx_CharterInputType: cctx_CharterInputTypeHelper_4;
        /**
         * generates UplcData for the enum type ***AnyData*** for the `BasicDelegate` script
         */
        AnyData: (fields: AnyDataLike_4 | {
            id: number[];
            type: string;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***DelegationDetail*** for the `BasicDelegate` script
         */
        DelegationDetail: (fields: DelegationDetailLike_4 | {
            capoAddr: /*minStructField*/ Address | string;
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            tn: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NodeOperatorSettingsV1*** for the `BasicDelegate` script
         */
        NodeOperatorSettingsV1: (fields: NodeOperatorSettingsV1Like_2 | {
            expectedHeartbeatInterval: IntLike;
            requiredNodeUptime: number;
            minValidations: IntLike;
            minNodeRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            minNodeOperatorStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***NeighborhoodSettingsV1*** for the `BasicDelegate` script
         */
        NeighborhoodSettingsV1: (fields: NeighborhoodSettingsV1Like_2 | {
            minRegistrationFee: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
            minNbhStake: /*minStructField*/ Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
                mph: MintingPolicyHash | string | number[];
                tokens: {
                    name: number[] | string;
                    qty: IntLike;
                }[];
            }[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***ProtocolSettings*** for the `BasicDelegate` script
         */
        ProtocolSettings: (fields: ProtocolSettingsLike | {
            id: number[];
            type: string;
            nodeOpSettings: NodeOperatorSettingsLike_2;
            nbhSettings: NeighborhoodSettingsLike_2;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***RelativeDelegateLink*** for the `BasicDelegate` script
         */
        RelativeDelegateLink: (fields: RelativeDelegateLinkLike_4 | {
            uutName: string;
            delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined;
            config: number[];
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***PendingDelegateChange*** for the `BasicDelegate` script
         */
        PendingDelegateChange: (fields: PendingDelegateChangeLike_4 | {
            action: PendingDelegateActionLike_4;
            role: DelegateRoleLike_4;
            dgtLink: /*minStructField*/ RelativeDelegateLinkLike_4 | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoManifestEntry*** for the `BasicDelegate` script
         */
        CapoManifestEntry: (fields: CapoManifestEntryLike_4 | {
            entryType: ManifestEntryTypeLike_4;
            tokenName: number[];
            mph: /*minStructField*/ MintingPolicyHash | string | number[] | undefined;
        }) => UplcData;
        /**
         * generates UplcData for the enum type ***CapoCtx*** for the `BasicDelegate` script
         */
        CapoCtx: (fields: CapoCtxLike_4 | {
            mph: /*minStructField*/ MintingPolicyHash | string | number[];
            charter: cctx_CharterInputTypeLike_4;
        }) => UplcData;
    };
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺAnyDataCast: Cast<AnyData_4, AnyDataLike_4>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺDelegationDetailCast: Cast<DelegationDetail_4, DelegationDetailLike_4>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNodeOperatorSettingsV1Cast: Cast<NodeOperatorSettingsV1, NodeOperatorSettingsV1Like_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺNeighborhoodSettingsV1Cast: Cast<NeighborhoodSettingsV1, NeighborhoodSettingsV1Like_2>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺProtocolSettingsCast: Cast<ProtocolSettings, ProtocolSettingsLike>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺRelativeDelegateLinkCast: Cast<RelativeDelegateLink_5, RelativeDelegateLinkLike_4>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺPendingDelegateChangeCast: Cast<PendingDelegateChange_4, PendingDelegateChangeLike_4>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoManifestEntryCast: Cast<CapoManifestEntry_4, CapoManifestEntryLike_4>;
    /**
     * uses unicode U+1c7a - sorts to the end */
    ᱺᱺCapoCtxCast: Cast<CapoCtx_4, CapoCtxLike_4>;
}

/**
 * @public
 */
declare class ProtocolSettingsPolicyDataBridgeReader extends DataBridgeReaderClass {
    bridge: ProtocolSettingsPolicyDataBridge;
    constructor(bridge: ProtocolSettingsPolicyDataBridge, isMainnet: boolean);
    /**
     * reads UplcData *known to fit the **NodeOperatorSettings*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NodeOperatorSettings(d: UplcData): ErgoNodeOperatorSettings;
    /**
     * reads UplcData *known to fit the **NeighborhoodSettings*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NeighborhoodSettings(d: UplcData): ErgoNeighborhoodSettings;
    datum: (d: UplcData) => Partial<{
        Cip68RefToken: DelegateDatum$Ergo$Cip68RefToken_4;
        IsDelegation: ErgoDelegationDetail_4;
        capoStoredData: DelegateDatum$Ergo$capoStoredData_4;
    }>;
    /**
     * reads UplcData *known to fit the **DelegateDatum*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateDatum(d: UplcData): ErgoDelegateDatum_4;
    /**
     * reads UplcData *known to fit the **DelegateRole*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateRole(d: UplcData): ErgoDelegateRole_5;
    /**
     * reads UplcData *known to fit the **ManifestActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestActivity(d: UplcData): ErgoManifestActivity_5;
    /**
     * reads UplcData *known to fit the **CapoLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoLifecycleActivity(d: UplcData): ErgoCapoLifecycleActivity_4;
    /**
     * reads UplcData *known to fit the **DelegateLifecycleActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateLifecycleActivity(d: UplcData): ErgoDelegateLifecycleActivity_4;
    /**
     * reads UplcData *known to fit the **SpendingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    SpendingActivity(d: UplcData): ErgoSpendingActivity_4;
    /**
     * reads UplcData *known to fit the **MintingActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    MintingActivity(d: UplcData): ErgoMintingActivity_4;
    /**
     * reads UplcData *known to fit the **BurningActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    BurningActivity(d: UplcData): ErgoBurningActivity_4;
    /**
     * reads UplcData *known to fit the **OtherActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    OtherActivity(d: UplcData): ErgoOtherActivity_3;
    /**
     * reads UplcData *known to fit the **DelegateActivity*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegateActivity(d: UplcData): ErgoDelegateActivity_4;
    /**
     * reads UplcData *known to fit the **PendingDelegateAction*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateAction(d: UplcData): ErgoPendingDelegateAction_5;
    /**
     * reads UplcData *known to fit the **ManifestEntryType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ManifestEntryType(d: UplcData): ErgoManifestEntryType_5;
    /**
     * reads UplcData *known to fit the **PendingCharterChange*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingCharterChange(d: UplcData): ErgoPendingCharterChange_5;
    /**
     * reads UplcData *known to fit the **cctx_CharterInputType*** enum type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the enum type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    cctx_CharterInputType(d: UplcData): Ergocctx_CharterInputType_4;
    /**
     * reads UplcData *known to fit the **AnyData*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    AnyData(d: UplcData): AnyData_4;
    /**
     * reads UplcData *known to fit the **DelegationDetail*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    DelegationDetail(d: UplcData): DelegationDetail_4;
    /**
     * reads UplcData *known to fit the **NodeOperatorSettingsV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NodeOperatorSettingsV1(d: UplcData): NodeOperatorSettingsV1;
    /**
     * reads UplcData *known to fit the **NeighborhoodSettingsV1*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    NeighborhoodSettingsV1(d: UplcData): NeighborhoodSettingsV1;
    /**
     * reads UplcData *known to fit the **ProtocolSettings*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    ProtocolSettings(d: UplcData): ProtocolSettings;
    /**
     * reads UplcData *known to fit the **RelativeDelegateLink*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    RelativeDelegateLink(d: UplcData): RelativeDelegateLink_5;
    /**
     * reads UplcData *known to fit the **PendingDelegateChange*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    PendingDelegateChange(d: UplcData): PendingDelegateChange_4;
    /**
     * reads UplcData *known to fit the **CapoManifestEntry*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoManifestEntry(d: UplcData): CapoManifestEntry_4;
    /**
     * reads UplcData *known to fit the **CapoCtx*** struct type,
     * for the BasicDelegate script.
     * #### Standard WARNING
     *
     * This is a low-level data-reader for use in ***advanced development scenarios***.
     *
     * Used correctly with data that matches the type, this reader
     * returns strongly-typed data - your code using these types will be safe.
     *
     * On the other hand, reading non-matching data will not give you a valid result.
     * It may throw an error, or it may throw no error, but return a value that
     * causes some error later on in your code, when you try to use it.
     */
    CapoCtx(d: UplcData): CapoCtx_4;
}

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
declare interface RelativeDelegateLink {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
declare interface RelativeDelegateLink_2 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
declare interface RelativeDelegateLink_3 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
declare interface RelativeDelegateLink_4 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the canonical form of RelativeDelegateLink
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoRelativeDelegateLink instead.
 * @public
 */
declare interface RelativeDelegateLink_5 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of RelativeDelegateLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RelativeDelegateLinkLike {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of RelativeDelegateLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RelativeDelegateLinkLike_2 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of RelativeDelegateLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RelativeDelegateLinkLike_3 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined
    config: /*minStructField*/ number[]
}

/**
 * A strong type for the permissive form of RelativeDelegateLink
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RelativeDelegateLinkLike_4 {
    uutName: /*minStructField*/ string
    delegateValidatorHash: /*minStructField*/ ValidatorHash | string | number[] | undefined
    config: /*minStructField*/ number[]
}

/**
 * An ergonomic, though less strictly-safe form of RevenueModel$SubscriptionV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RevenueModel$SubscriptionV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type RevenueModel$Ergo$SubscriptionV1 = {
    subscriptionFee: Array<ErgoSubscriptionFeeFrequency>  /*minVariantField*/ ,
    nodeOpShare: number  /*minVariantField*/ 
}

/**
 * An ergonomic, though less strictly-safe form of RevenueModel$TransactionBasedV1
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the RevenueModel$TransactionBasedV1Like type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type RevenueModel$Ergo$TransactionBasedV1 = {
    minTxFee: Value  /*minVariantField*/ ,
    maxTxFee: Value | undefined  /*minVariantField*/ ,
    chargeTo: ErgoFeeSource  /*minVariantField*/ ,
    nodeOpShare: number  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of RevenueModel$SubscriptionV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see RevenueModel$Ergo$SubscriptionV1 instead.
 * @public
 */
declare interface RevenueModel$SubscriptionV1 {
    subscriptionFee: Array<SubscriptionFeeFrequency>  /*minVariantField*/ ,
    nodeOpShare: number  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of RevenueModel$SubscriptionV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RevenueModel$SubscriptionV1Like {
    subscriptionFee: Array<SubscriptionFeeFrequencyLike>  /*minVariantField*/ ,
    nodeOpShare: number  /*minVariantField*/ 
}

/**
 * A strong type for the canonical form of RevenueModel$TransactionBasedV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see RevenueModel$Ergo$TransactionBasedV1 instead.
 * @public
 */
declare interface RevenueModel$TransactionBasedV1 {
    minTxFee: Value  /*minVariantField*/ ,
    maxTxFee: Value | undefined  /*minVariantField*/ ,
    chargeTo: FeeSource  /*minVariantField*/ ,
    nodeOpShare: number  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of RevenueModel$TransactionBasedV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface RevenueModel$TransactionBasedV1Like {
    minTxFee: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]  /*minVariantField*/ ,
    maxTxFee: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[] | undefined  /*minVariantField*/ ,
    chargeTo: FeeSourceLike  /*minVariantField*/ ,
    nodeOpShare: number  /*minVariantField*/ 
}

/**
 * RevenueModel enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the RevenueModel enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `RevenueModelHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type RevenueModel = 
| { TransactionBasedV1: RevenueModel$TransactionBasedV1 /*minEnumVariant*/ }
| { SubscriptionV1: RevenueModel$SubscriptionV1 /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***RevenueModel*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class RevenueModelHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<RevenueModel, Partial<{
        TransactionBasedV1: RevenueModel$TransactionBasedV1Like;
        SubscriptionV1: RevenueModel$SubscriptionV1Like;
    }>>;
    /**
     * generates  UplcData for ***"NeighborhoodData::RevenueModel.TransactionBasedV1"***
     * @remarks - ***RevenueModel$TransactionBasedV1Like*** is the same as the expanded field-types.
     */
    TransactionBasedV1(fields: RevenueModel$TransactionBasedV1Like | {
        minTxFee: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        maxTxFee: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[] | undefined;
        chargeTo: FeeSourceLike;
        nodeOpShare: number;
    }): UplcData;
    /**
     * generates  UplcData for ***"NeighborhoodData::RevenueModel.SubscriptionV1"***
     * @remarks - ***RevenueModel$SubscriptionV1Like*** is the same as the expanded field-types.
     */
    SubscriptionV1(fields: RevenueModel$SubscriptionV1Like | {
        subscriptionFee: Array<SubscriptionFeeFrequencyLike>;
        nodeOpShare: number;
    }): UplcData;
}

/**
 * RevenueModel enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the RevenueModel enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `RevenueModelHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type RevenueModelLike = IntersectedEnum<
| { TransactionBasedV1: RevenueModel$TransactionBasedV1Like /*minEnumVariant*/ }
| { SubscriptionV1: RevenueModel$SubscriptionV1Like /*minEnumVariant*/ }
>

/**
 * An ergonomic, though less strictly-safe form of SpendingActivity$ValidatingNode
 * @remarks
 * This type can use enums expressed as merged unions of the enum variants.  You might think of this type
 * as being "read-only", in that it's possible to create data with this type that would not be suitable for
 * conversion to on-chain use.  For creating such data, use the SpendingActivity$ValidatingNodeLike type,
 * or the on-chain data-building helpers instead.
 * @public
 */
declare type SpendingActivity$Ergo$ValidatingNode = SpendingActivity$ValidatingNode

/**
 * A strong type for the canonical form of SpendingActivity$ValidatingNode
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see SpendingActivity$Ergo$ValidatingNode instead.
 * @public
 */
declare interface SpendingActivity$ValidatingNode {
    id: number[]  /*minVariantField*/ ,
    validatorId: number[]  /*minVariantField*/ 
}

/**
 * A strong type for the permissive form of SpendingActivity$ValidatingNode
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface SpendingActivity$ValidatingNodeLike {
    id: number[]  /*minVariantField*/ ,
    validatorId: number[]  /*minVariantField*/ 
}

/**
 * SpendingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type SpendingActivity = 
| { _placeholder1SA: /* implied wrapper { recId: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * SpendingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **5 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type SpendingActivity_2 = 
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ValidatingNode: SpendingActivity$ValidatingNode /*minEnumVariant*/ }
| { ActivatingNode: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ReportingInactiveNode: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { RefutingInactivity: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * SpendingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **2 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type SpendingActivity_3 = 
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ActivatingNeighborhood: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * SpendingActivity enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **1 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type SpendingActivity_4 = 
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        _placeholder1SA: number[];
    }, {
        _placeholder1SA: number[];
    }>;
    /**
     * generates  UplcData for ***"STokMintDelegate::SpendingActivity._placeholder1SA"***
     */
    _placeholder1SA(recId: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelper_2 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity_2, Partial<{
        UpdatingRecord: number[];
        ValidatingNode: SpendingActivity$ValidatingNodeLike;
        ActivatingNode: number[];
        ReportingInactiveNode: number[];
        RefutingInactivity: number[];
    }>>;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.UpdatingRecord"***
     */
    UpdatingRecord(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.ValidatingNode"***
     * @remarks - ***SpendingActivity$ValidatingNodeLike*** is the same as the expanded field-types.
     */
    ValidatingNode(fields: SpendingActivity$ValidatingNodeLike | {
        id: number[];
        validatorId: number[];
    }): UplcData;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.ActivatingNode"***
     */
    ActivatingNode(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.ReportingInactiveNode"***
     */
    ReportingInactiveNode(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.RefutingInactivity"***
     */
    RefutingInactivity(id: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelper_3 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity_3, Partial<{
        UpdatingRecord: number[];
        ActivatingNeighborhood: number[];
    }>>;
    /**
     * generates  UplcData for ***"NeighborhoodPolicy::SpendingActivity.UpdatingRecord"***
     */
    UpdatingRecord(id: number[]): UplcData;
    /**
     * generates  UplcData for ***"NeighborhoodPolicy::SpendingActivity.ActivatingNeighborhood"***
     */
    ActivatingNeighborhood(id: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelper_4 extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        UpdatingRecord: number[];
    }, {
        UpdatingRecord: number[];
    }>;
    /**
     * generates  UplcData for ***"ProtocolSettingsPolicy::SpendingActivity.UpdatingRecord"***
     */
    UpdatingRecord(id: number[]): UplcData;
}

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelperNested extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        _placeholder1SA: number[];
    }, {
        _placeholder1SA: number[];
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"STokMintDelegate::SpendingActivity._placeholder1SA"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    _placeholder1SA(recId: number[]): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelperNested_2 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity_2, Partial<{
        UpdatingRecord: number[];
        ValidatingNode: SpendingActivity$ValidatingNodeLike;
        ActivatingNode: number[];
        ReportingInactiveNode: number[];
        RefutingInactivity: number[];
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.UpdatingRecord"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    UpdatingRecord(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.ValidatingNode"***
     * @remarks - ***SpendingActivity$ValidatingNodeLike*** is the same as the expanded field-types.
     * ##### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ValidatingNode(fields: SpendingActivity$ValidatingNodeLike | {
        id: number[];
        validatorId: number[];
    }): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.ActivatingNode"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ActivatingNode(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.ReportingInactiveNode"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ReportingInactiveNode(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"DredNodeRegistryPolicy::SpendingActivity.RefutingInactivity"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    RefutingInactivity(id: number[]): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelperNested_3 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SpendingActivity_3, Partial<{
        UpdatingRecord: number[];
        ActivatingNeighborhood: number[];
    }>>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::SpendingActivity.UpdatingRecord"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    UpdatingRecord(id: number[]): isActivity;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"NeighborhoodPolicy::SpendingActivity.ActivatingNeighborhood"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    ActivatingNeighborhood(id: number[]): isActivity;
}

/**
 * Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SpendingActivityHelperNested_4 extends EnumBridge<isActivity> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<{
        UpdatingRecord: number[];
    }, {
        UpdatingRecord: number[];
    }>;
    /**
     * generates isActivity/redeemer wrapper with UplcData for ***"ProtocolSettingsPolicy::SpendingActivity.UpdatingRecord"***
     * @remarks
     * #### Nested activity:
     * this is connected to a nested-activity wrapper, so the details are piped through
     * the parent's uplc-encoder, producing a single uplc object with
     * a complete wrapper for this inner activity detail.
     */
    UpdatingRecord(id: number[]): isActivity;
}

/**
 * SpendingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type SpendingActivityLike = IntersectedEnum<
| { _placeholder1SA: /* implied wrapper { recId: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * SpendingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **5 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type SpendingActivityLike_2 = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ValidatingNode: SpendingActivity$ValidatingNodeLike /*minEnumVariant*/ }
| { ActivatingNode: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ReportingInactiveNode: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { RefutingInactivity: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * SpendingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **2 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type SpendingActivityLike_3 = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
| { ActivatingNeighborhood: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * SpendingActivity enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **1 variant(s)** of the SpendingActivity enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SpendingActivityHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type SpendingActivityLike_4 = IntersectedEnum<
| { UpdatingRecord: /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]    /*minEnumVariant*/ }
>

/**
 * @internal
 */
declare type SpendingActivityMeta = EnumTypeMeta<
    {module: "DredNodeRegistryPolicy", enumName: "SpendingActivity"}, {
    UpdatingRecord: singleEnumVariantMeta<SpendingActivityMeta, "UpdatingRecord",
    "Constr#0", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >,
    ValidatingNode: singleEnumVariantMeta<SpendingActivityMeta, "ValidatingNode",
    "Constr#1", 
    "fields", SpendingActivity$ValidatingNode, "noSpecialFlags"
    >,
    ActivatingNode: singleEnumVariantMeta<SpendingActivityMeta, "ActivatingNode",
    "Constr#2", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >,
    ReportingInactiveNode: singleEnumVariantMeta<SpendingActivityMeta, "ReportingInactiveNode",
    "Constr#3", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >,
    RefutingInactivity: singleEnumVariantMeta<SpendingActivityMeta, "RefutingInactivity",
    "Constr#4", "singletonField", /* implied wrapper { id: ... } for singleVariantField */ 
    			number[]   , "noSpecialFlags"
    >
}
>;

/**
 * SubscriptionFeeFrequency enum variants
 * 
 * @remarks - expresses the essential raw data structures
 * supporting the **3 variant(s)** of the SubscriptionFeeFrequency enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SubscriptionFeeFrequencyHelper` class
 *     for generating UPLC data for this enum type
 * @public
 */
declare type SubscriptionFeeFrequency = 
| { Epoch: /* implied wrapper { fee: ... } for singleVariantField */ 
    			Value    /*minEnumVariant*/ }
| { Monthly: /* implied wrapper { fee: ... } for singleVariantField */ 
    			Value    /*minEnumVariant*/ }
| { Yearly: /* implied wrapper { fee: ... } for singleVariantField */ 
    			Value    /*minEnumVariant*/ }

/**
 * Helper class for generating UplcData for variants of the ***SubscriptionFeeFrequency*** enum type.
 * @public
 * @remarks
 * this class is not intended to be used directly.  Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges. */
declare class SubscriptionFeeFrequencyHelper extends EnumBridge<JustAnEnum> {
    /**
     * @internal
     *  uses unicode U+1c7a - sorts to the end */
    ᱺᱺcast: Cast<SubscriptionFeeFrequency, Partial<{
        Epoch: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        Monthly: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
        Yearly: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
            mph: MintingPolicyHash | string | number[];
            tokens: {
                name: number[] | string;
                qty: IntLike;
            }[];
        }[];
    }>>;
    /**
     * generates  UplcData for ***"NeighborhoodData::SubscriptionFeeFrequency.Epoch"***
     */
    Epoch(fee: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
        mph: MintingPolicyHash | string | number[];
        tokens: {
            name: number[] | string;
            qty: IntLike;
        }[];
    }[]): UplcData;
    /**
     * generates  UplcData for ***"NeighborhoodData::SubscriptionFeeFrequency.Monthly"***
     */
    Monthly(fee: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
        mph: MintingPolicyHash | string | number[];
        tokens: {
            name: number[] | string;
            qty: IntLike;
        }[];
    }[]): UplcData;
    /**
     * generates  UplcData for ***"NeighborhoodData::SubscriptionFeeFrequency.Yearly"***
     */
    Yearly(fee: Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {
        mph: MintingPolicyHash | string | number[];
        tokens: {
            name: number[] | string;
            qty: IntLike;
        }[];
    }[]): UplcData;
}

/**
 * SubscriptionFeeFrequency enum variants (permissive)
 * 
 * @remarks - expresses the allowable data structure
 * for creating any of the **3 variant(s)** of the SubscriptionFeeFrequency enum type
 * 
 * - **Note**: Stellar Contracts provides a higher-level `SubscriptionFeeFrequencyHelper` class
 *     for generating UPLC data for this enum type
 *
 * #### Permissive Type
 * This is a permissive type that allows additional input data types, which are 
 * converted by convention to the canonical types used in the on-chain context.
 * @public
 */
declare type SubscriptionFeeFrequencyLike = IntersectedEnum<
| { Epoch: /* implied wrapper { fee: ... } for singleVariantField */ 
    			Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]    /*minEnumVariant*/ }
| { Monthly: /* implied wrapper { fee: ... } for singleVariantField */ 
    			Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]    /*minEnumVariant*/ }
| { Yearly: /* implied wrapper { fee: ... } for singleVariantField */ 
    			Value | [MintingPolicyHash | string | number[], [number[] | string, IntLike][]][] | {mph: MintingPolicyHash | string | number[], tokens: {name: number[] | string, qty: IntLike}[]}[]    /*minEnumVariant*/ }
>

/**
 * @public
 */
declare type TimeLike = IntLike;

/**
 * @public
 */
declare type TimeLike_2 = IntLike;

declare namespace types {
    export {
        TimeLike,
        AnyData_2 as AnyData,
        ErgoAnyData_2 as ErgoAnyData,
        AnyDataLike_2 as AnyDataLike,
        minimalAnyData,
        DelegateDatum$Cip68RefToken_2 as DelegateDatum$Cip68RefToken,
        DelegateDatum$Ergo$Cip68RefToken_2 as DelegateDatum$Ergo$Cip68RefToken,
        DelegateDatum$Cip68RefTokenLike_2 as DelegateDatum$Cip68RefTokenLike,
        DelegationDetail_2 as DelegationDetail,
        ErgoDelegationDetail_2 as ErgoDelegationDetail,
        DelegationDetailLike_2 as DelegationDetailLike,
        DredNodeStateMeta,
        DredNodeState,
        ErgoDredNodeState,
        DredNodeStateLike,
        NodeDetailsV1,
        ErgoNodeDetailsV1,
        NodeDetailsV1Like,
        NodeRegistrationData,
        ErgoNodeRegistrationData,
        NodeRegistrationDataLike,
        minimalNodeRegistrationData,
        DelegateDatum$capoStoredData_2 as DelegateDatum$capoStoredData,
        DelegateDatum$Ergo$capoStoredData_2 as DelegateDatum$Ergo$capoStoredData,
        DelegateDatum$capoStoredDataLike_2 as DelegateDatum$capoStoredDataLike,
        DelegateDatumMeta,
        DelegateDatum_2 as DelegateDatum,
        ErgoDelegateDatum_2 as ErgoDelegateDatum,
        DelegateDatumLike,
        CapoLifecycleActivity$CreatingDelegate_2 as CapoLifecycleActivity$CreatingDelegate,
        CapoLifecycleActivity$Ergo$CreatingDelegate_2 as CapoLifecycleActivity$Ergo$CreatingDelegate,
        CapoLifecycleActivity$CreatingDelegateLike_2 as CapoLifecycleActivity$CreatingDelegateLike,
        DelegateRoleMeta,
        DelegateRole_3 as DelegateRole,
        ErgoDelegateRole_3 as ErgoDelegateRole,
        DelegateRoleLike_2 as DelegateRoleLike,
        CapoLifecycleActivity$forcingNewSpendDelegate_2 as CapoLifecycleActivity$forcingNewSpendDelegate,
        CapoLifecycleActivity$Ergo$forcingNewSpendDelegate_2 as CapoLifecycleActivity$Ergo$forcingNewSpendDelegate,
        CapoLifecycleActivity$forcingNewSpendDelegateLike_2 as CapoLifecycleActivity$forcingNewSpendDelegateLike,
        CapoLifecycleActivity$forcingNewMintDelegate_2 as CapoLifecycleActivity$forcingNewMintDelegate,
        CapoLifecycleActivity$Ergo$forcingNewMintDelegate_2 as CapoLifecycleActivity$Ergo$forcingNewMintDelegate,
        CapoLifecycleActivity$forcingNewMintDelegateLike_2 as CapoLifecycleActivity$forcingNewMintDelegateLike,
        ManifestActivity$updatingEntry_3 as ManifestActivity$updatingEntry,
        ManifestActivity$Ergo$updatingEntry_3 as ManifestActivity$Ergo$updatingEntry,
        ManifestActivity$updatingEntryLike_2 as ManifestActivity$updatingEntryLike,
        ManifestActivity$addingEntry_3 as ManifestActivity$addingEntry,
        ManifestActivity$Ergo$addingEntry_3 as ManifestActivity$Ergo$addingEntry,
        ManifestActivity$addingEntryLike_2 as ManifestActivity$addingEntryLike,
        ManifestActivity$forkingThreadToken_3 as ManifestActivity$forkingThreadToken,
        ManifestActivity$Ergo$forkingThreadToken_3 as ManifestActivity$Ergo$forkingThreadToken,
        ManifestActivity$forkingThreadTokenLike_2 as ManifestActivity$forkingThreadTokenLike,
        ManifestActivity$burningThreadToken_3 as ManifestActivity$burningThreadToken,
        ManifestActivity$Ergo$burningThreadToken_3 as ManifestActivity$Ergo$burningThreadToken,
        ManifestActivity$burningThreadTokenLike_2 as ManifestActivity$burningThreadTokenLike,
        ManifestActivityMeta,
        ManifestActivity_2 as ManifestActivity,
        ErgoManifestActivity_3 as ErgoManifestActivity,
        ManifestActivityLike_2 as ManifestActivityLike,
        CapoLifecycleActivityMeta,
        CapoLifecycleActivity_2 as CapoLifecycleActivity,
        ErgoCapoLifecycleActivity_2 as ErgoCapoLifecycleActivity,
        CapoLifecycleActivityLike_2 as CapoLifecycleActivityLike,
        DelegateLifecycleActivity$ReplacingMe_2 as DelegateLifecycleActivity$ReplacingMe,
        DelegateLifecycleActivity$Ergo$ReplacingMe_2 as DelegateLifecycleActivity$Ergo$ReplacingMe,
        DelegateLifecycleActivity$ReplacingMeLike_2 as DelegateLifecycleActivity$ReplacingMeLike,
        DelegateLifecycleActivityMeta,
        DelegateLifecycleActivity_2 as DelegateLifecycleActivity,
        ErgoDelegateLifecycleActivity_2 as ErgoDelegateLifecycleActivity,
        DelegateLifecycleActivityLike_2 as DelegateLifecycleActivityLike,
        SpendingActivity$ValidatingNode,
        SpendingActivity$Ergo$ValidatingNode,
        SpendingActivity$ValidatingNodeLike,
        SpendingActivityMeta,
        SpendingActivity_2 as SpendingActivity,
        ErgoSpendingActivity_2 as ErgoSpendingActivity,
        SpendingActivityLike_2 as SpendingActivityLike,
        MintingActivityMeta,
        MintingActivity_2 as MintingActivity,
        ErgoMintingActivity_2 as ErgoMintingActivity,
        MintingActivityLike_2 as MintingActivityLike,
        BurningActivityMeta,
        BurningActivity_2 as BurningActivity,
        ErgoBurningActivity_2 as ErgoBurningActivity,
        BurningActivityLike_2 as BurningActivityLike,
        DelegateActivity$CreatingDelegatedData_2 as DelegateActivity$CreatingDelegatedData,
        DelegateActivity$Ergo$CreatingDelegatedData_2 as DelegateActivity$Ergo$CreatingDelegatedData,
        DelegateActivity$CreatingDelegatedDataLike_2 as DelegateActivity$CreatingDelegatedDataLike,
        DelegateActivity$UpdatingDelegatedData_2 as DelegateActivity$UpdatingDelegatedData,
        DelegateActivity$Ergo$UpdatingDelegatedData_2 as DelegateActivity$Ergo$UpdatingDelegatedData,
        DelegateActivity$UpdatingDelegatedDataLike_2 as DelegateActivity$UpdatingDelegatedDataLike,
        DelegateActivity$DeletingDelegatedData_2 as DelegateActivity$DeletingDelegatedData,
        DelegateActivity$Ergo$DeletingDelegatedData_2 as DelegateActivity$Ergo$DeletingDelegatedData,
        DelegateActivity$DeletingDelegatedDataLike_2 as DelegateActivity$DeletingDelegatedDataLike,
        OtherActivityMeta,
        OtherActivity,
        ErgoOtherActivity,
        OtherActivityLike,
        DelegateActivityMeta,
        DelegateActivity_2 as DelegateActivity,
        ErgoDelegateActivity_2 as ErgoDelegateActivity,
        DelegateActivityLike,
        PendingDelegateAction$Add_3 as PendingDelegateAction$Add,
        PendingDelegateAction$Ergo$Add_3 as PendingDelegateAction$Ergo$Add,
        PendingDelegateAction$AddLike_2 as PendingDelegateAction$AddLike,
        PendingDelegateAction$Replace_3 as PendingDelegateAction$Replace,
        PendingDelegateAction$Ergo$Replace_3 as PendingDelegateAction$Ergo$Replace,
        PendingDelegateAction$ReplaceLike_2 as PendingDelegateAction$ReplaceLike,
        PendingDelegateActionMeta,
        PendingDelegateAction_2 as PendingDelegateAction,
        ErgoPendingDelegateAction_3 as ErgoPendingDelegateAction,
        PendingDelegateActionLike_2 as PendingDelegateActionLike,
        RelativeDelegateLink_3 as RelativeDelegateLink,
        ErgoRelativeDelegateLink_3 as ErgoRelativeDelegateLink,
        RelativeDelegateLinkLike_2 as RelativeDelegateLinkLike,
        PendingDelegateChange_2 as PendingDelegateChange,
        ErgoPendingDelegateChange_3 as ErgoPendingDelegateChange,
        PendingDelegateChangeLike_2 as PendingDelegateChangeLike,
        ManifestEntryType$DgDataPolicy_2 as ManifestEntryType$DgDataPolicy,
        ManifestEntryType$Ergo$DgDataPolicy_3 as ManifestEntryType$Ergo$DgDataPolicy,
        ManifestEntryType$DgDataPolicyLike_2 as ManifestEntryType$DgDataPolicyLike,
        ManifestEntryType$DelegateThreads_2 as ManifestEntryType$DelegateThreads,
        ManifestEntryType$Ergo$DelegateThreads_3 as ManifestEntryType$Ergo$DelegateThreads,
        ManifestEntryType$DelegateThreadsLike_2 as ManifestEntryType$DelegateThreadsLike,
        ManifestEntryTypeMeta,
        ManifestEntryType_2 as ManifestEntryType,
        ErgoManifestEntryType_3 as ErgoManifestEntryType,
        ManifestEntryTypeLike_2 as ManifestEntryTypeLike,
        CapoManifestEntry_2 as CapoManifestEntry,
        ErgoCapoManifestEntry_3 as ErgoCapoManifestEntry,
        CapoManifestEntryLike_2 as CapoManifestEntryLike,
        PendingCharterChange$otherManifestChange_2 as PendingCharterChange$otherManifestChange,
        PendingCharterChange$Ergo$otherManifestChange_3 as PendingCharterChange$Ergo$otherManifestChange,
        PendingCharterChange$otherManifestChangeLike_2 as PendingCharterChange$otherManifestChangeLike,
        PendingCharterChangeMeta,
        PendingCharterChange_2 as PendingCharterChange,
        ErgoPendingCharterChange_3 as ErgoPendingCharterChange,
        PendingCharterChangeLike_2 as PendingCharterChangeLike,
        CapoDatum$CharterData_2 as CapoDatum$CharterData,
        CapoDatum$Ergo$CharterData_3 as CapoDatum$Ergo$CharterData,
        CapoDatum$CharterDataLike_2 as CapoDatum$CharterDataLike,
        cctx_CharterInputType$RefInput_2 as cctx_CharterInputType$RefInput,
        cctx_CharterInputType$Ergo$RefInput_2 as cctx_CharterInputType$Ergo$RefInput,
        cctx_CharterInputType$RefInputLike_2 as cctx_CharterInputType$RefInputLike,
        cctx_CharterInputType$Input_2 as cctx_CharterInputType$Input,
        cctx_CharterInputType$Ergo$Input_2 as cctx_CharterInputType$Ergo$Input,
        cctx_CharterInputType$InputLike_2 as cctx_CharterInputType$InputLike,
        cctx_CharterInputTypeMeta,
        cctx_CharterInputType_2 as cctx_CharterInputType,
        Ergocctx_CharterInputType_2 as Ergocctx_CharterInputType,
        cctx_CharterInputTypeLike_2 as cctx_CharterInputTypeLike,
        CapoCtx_2 as CapoCtx,
        ErgoCapoCtx,
        CapoCtxLike_2 as CapoCtxLike,
        NodeOperatorSettingsV1_2 as NodeOperatorSettingsV1,
        ErgoNodeOperatorSettingsV1_2 as ErgoNodeOperatorSettingsV1,
        NodeOperatorSettingsV1Like,
        NodeOperatorSettingsMeta,
        NodeOperatorSettings_2 as NodeOperatorSettings,
        ErgoNodeOperatorSettings_2 as ErgoNodeOperatorSettings,
        NodeOperatorSettingsLike,
        AbstractSettingsForNodeOperator,
        ErgoAbstractSettingsForNodeOperator,
        AbstractSettingsForNodeOperatorLike,
        dgd_DataSrc$Both,
        dgd_DataSrc$Ergo$Both,
        dgd_DataSrc$BothLike,
        dgd_DataSrcMeta,
        dgd_DataSrc,
        Ergodgd_DataSrc,
        dgd_DataSrcLike,
        AbstractDelegateActivitiesEnum$CreatingDelegatedData,
        AbstractDelegateActivitiesEnum$Ergo$CreatingDelegatedData,
        AbstractDelegateActivitiesEnum$CreatingDelegatedDataLike,
        AbstractDelegateActivitiesEnum$UpdatingDelegatedData,
        AbstractDelegateActivitiesEnum$Ergo$UpdatingDelegatedData,
        AbstractDelegateActivitiesEnum$UpdatingDelegatedDataLike,
        AbstractDelegateActivitiesEnum$DeletingDelegatedData,
        AbstractDelegateActivitiesEnum$Ergo$DeletingDelegatedData,
        AbstractDelegateActivitiesEnum$DeletingDelegatedDataLike,
        AbstractDelegateActivitiesEnumMeta,
        AbstractDelegateActivitiesEnum,
        ErgoAbstractDelegateActivitiesEnum,
        AbstractDelegateActivitiesEnumLike,
        DgDataDetails,
        ErgoDgDataDetails,
        DgDataDetailsLike,
        minimalDgDataDetails
    }
}

/**
 * A strong type for the canonical form of UpdateInfoV1
 * @remarks
 * Note that any enum fields in this type are expressed as a disjoint union of the enum variants.  Processing
 * enum data conforming to this type can be a bit of a pain.
 * For a more ergonomic, though less strictly-safe form of this type, see ErgoUpdateInfoV1 instead.
 * @public
 */
declare interface UpdateInfoV1 {
    name: /*minStructField*/ string
    description: /*minStructField*/ string
    url: /*minStructField*/ string
}

/**
 * A strong type for the permissive form of UpdateInfoV1
 * @remarks
 * The field types enable implicit conversion from various allowable input types (including the canonical form).
 * @public
 */
declare interface UpdateInfoV1Like {
    name: /*minStructField*/ string
    description: /*minStructField*/ string
    url: /*minStructField*/ string
}

export { }
