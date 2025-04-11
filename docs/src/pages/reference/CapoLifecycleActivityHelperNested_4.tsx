import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>CapoLifecycleActivityHelperNested_4</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#$seeded$CreatingDelegate">$seeded$CreatingDelegate</a>, 
                    <a href="#$seeded$forcingNewMintDelegate">$seeded$forcingNewMintDelegate</a>, 
                    <a href="#$seeded$forcingNewSpendDelegate">$seeded$forcingNewSpendDelegate</a>, 
                    <a href="#commitPendingChanges">commitPendingChanges</a>, 
                    <a href="#queuePendingChange">queuePendingChange</a>, 
                    <a href="#removePendingChange">removePendingChange</a>, 
                    <a href="#updatingManifest">updatingManifest</a>, 
                    <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#CreatingDelegate">CreatingDelegate</a>, 
                    <a href="#CreatingDelegate">CreatingDelegate</a>, 
                    <a href="#forcingNewMintDelegate">forcingNewMintDelegate</a>, 
                    <a href="#forcingNewMintDelegate">forcingNewMintDelegate</a>, 
                    <a href="#forcingNewSpendDelegate">forcingNewSpendDelegate</a>, 
                    <a href="#forcingNewSpendDelegate">forcingNewSpendDelegate</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"$seeded$CreatingDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate\"***,\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n *\n * ## Usage 1. Call the `$seeded$CreatingDelegate({ purpose })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method. ## Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n *\n * @param fields - \\{ purpose: string \\}\n */\n"}
{"$seeded$CreatingDelegate: "}{"(fields: {\n        purpose: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n    }) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"$seeded$forcingNewMintDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate\"***,\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n *\n * ## Usage 1. Call the `$seeded$forcingNewMintDelegate({ purpose })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method. ## Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n *\n * @param fields - \\{ purpose: string \\}\n */\n"}
{"$seeded$forcingNewMintDelegate: "}{"(fields: {\n        purpose: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n    }) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"$seeded$forcingNewSpendDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate\"***,\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n *\n * ## Usage 1. Call the `$seeded$forcingNewSpendDelegate({ purpose })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method. ## Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n *\n * @param fields - \\{ purpose: string \\}\n */\n"}
{"$seeded$forcingNewSpendDelegate: "}{"(fields: {\n        purpose: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n    }) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"commitPendingChanges"}</b></h4>
            <pre>
{"/**\n * (property getter): UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges\"***\n *\n * @remarks\n *\n * - ***tagOnly*** variant accessor returns an empty ***constrData#3***\n */\n"}
{"get commitPendingChanges(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"queuePendingChange"}</b></h4>
            <pre>
{"/**\n * (property getter): UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange\"***\n *\n * @remarks\n *\n * - ***tagOnly*** variant accessor returns an empty ***constrData#1***\n */\n"}
{"get queuePendingChange(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"removePendingChange"}</b></h4>
            <pre>
{"/**\n * access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.\n */\n"}
{"get removePendingChange(): "}<a href="#ActivityDelegateRoleHelperNested">{"ActivityDelegateRoleHelperNested"}</a>{";"}
            </pre>
    
    

        <h4>   readonly <b>{"updatingManifest"}</b></h4>
            <pre>
{"/**\n * access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.\n */\n"}
{"get updatingManifest(): "}<a href="#ManifestActivityHelperNested">{"ManifestActivityHelperNested"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#CapoLifecycleActivity">{"CapoLifecycleActivity"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        CreatingDelegate: "}<a href="#CapoLifecycleActivity$CreatingDelegateLike">{"CapoLifecycleActivity$CreatingDelegateLike"}</a>{";\n        queuePendingChange: "}<a href="#tagOnly">{"tagOnly"}</a>{";\n        removePendingChange: "}<a href="#DelegateRoleLike">{"DelegateRoleLike"}</a>{";\n        commitPendingChanges: "}<a href="#tagOnly">{"tagOnly"}</a>{";\n        forcingNewSpendDelegate: "}<a href="#CapoLifecycleActivity$forcingNewSpendDelegateLike">{"CapoLifecycleActivity$forcingNewSpendDelegateLike"}</a>{";\n        forcingNewMintDelegate: "}<a href="#CapoLifecycleActivity$forcingNewMintDelegateLike">{"CapoLifecycleActivity$forcingNewMintDelegateLike"}</a>{";\n        updatingManifest: "}<a href="#ManifestActivityLike">{"ManifestActivityLike"}</a>{";\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"CreatingDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate\"***, given a transaction-context ***with a seed utxo*** and other field details\n *\n * @remarks\n *\n * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$CreatingDelegate}` for use in a context providing an implicit seed utxo. ### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n */\n"}
{"CreatingDelegate(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"CreatingDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate\"*** with raw seed details included in fields.\n */\n"}
{"CreatingDelegate(fields: "}<a href="#CapoLifecycleActivity$CreatingDelegateLike">{"CapoLifecycleActivity$CreatingDelegateLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"forcingNewMintDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate\"***, given a transaction-context ***with a seed utxo*** and other field details\n *\n * @remarks\n *\n * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$forcingNewMintDelegate}` for use in a context providing an implicit seed utxo. ### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n */\n"}
{"forcingNewMintDelegate(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"forcingNewMintDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate\"*** with raw seed details included in fields.\n */\n"}
{"forcingNewMintDelegate(fields: "}<a href="#CapoLifecycleActivity$forcingNewMintDelegateLike">{"CapoLifecycleActivity$forcingNewMintDelegateLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"forcingNewSpendDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate\"***, given a transaction-context ***with a seed utxo*** and other field details\n *\n * @remarks\n *\n * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$forcingNewSpendDelegate}` for use in a context providing an implicit seed utxo. ### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n */\n"}
{"forcingNewSpendDelegate(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"forcingNewSpendDelegate"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate\"*** with raw seed details included in fields.\n */\n"}
{"forcingNewSpendDelegate(fields: "}<a href="#CapoLifecycleActivity$forcingNewSpendDelegateLike">{"CapoLifecycleActivity$forcingNewSpendDelegateLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    