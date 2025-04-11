import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>DelegateActivityHelper</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#$seeded$CreatingDelegatedData">$seeded$CreatingDelegatedData</a>, 
                    <a href="#BurningActivities">BurningActivities</a>, 
                    <a href="#CapoLifecycleActivities">CapoLifecycleActivities</a>, 
                    <a href="#DelegateLifecycleActivities">DelegateLifecycleActivities</a>, 
                    <a href="#MintingActivities">MintingActivities</a>, 
                    <a href="#SpendingActivities">SpendingActivities</a>, 
                    <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#CreatingDelegatedData">CreatingDelegatedData</a>, 
                    <a href="#CreatingDelegatedData">CreatingDelegatedData</a>, 
                    <a href="#DeletingDelegatedData">DeletingDelegatedData</a>, 
                    <a href="#MultipleDelegateActivities">MultipleDelegateActivities</a>, 
                    <a href="#UpdatingDelegatedData">UpdatingDelegatedData</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"$seeded$CreatingDelegatedData"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"MyMintSpendDelegate::DelegateActivity.CreatingDelegatedData\"***,\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n *\n * ## Usage 1. Call the `$seeded$CreatingDelegatedData({ dataType })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method.\n *\n * @param fields - \\{ dataType: string \\}\n */\n"}
{"$seeded$CreatingDelegatedData: "}{"(fields: {\n        dataType: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        dataType: string;\n    }) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"BurningActivities"}</b></h4>
            <pre>
{"/**\n * access to different variants of the ***nested BurningActivity*** type needed for ***DelegateActivity:BurningActivities***.\n */\n"}
{"get BurningActivities(): "}<a href="#BurningActivityHelperNested">{"BurningActivityHelperNested"}</a>{";"}
            </pre>
    
    

        <h4>   readonly <b>{"CapoLifecycleActivities"}</b></h4>
            <pre>
{"/**\n * access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***DelegateActivity:CapoLifecycleActivities***.\n */\n"}
{"get CapoLifecycleActivities(): "}<a href="#CapoLifecycleActivityHelperNested">{"CapoLifecycleActivityHelperNested"}</a>{";"}
            </pre>
    
    

        <h4>   readonly <b>{"DelegateLifecycleActivities"}</b></h4>
            <pre>
{"/**\n * access to different variants of the ***nested DelegateLifecycleActivity*** type needed for ***DelegateActivity:DelegateLifecycleActivities***.\n */\n"}
{"get DelegateLifecycleActivities(): "}<a href="#DelegateLifecycleActivityHelperNested">{"DelegateLifecycleActivityHelperNested"}</a>{";"}
            </pre>
    
    

        <h4>   readonly <b>{"MintingActivities"}</b></h4>
            <pre>
{"/**\n * access to different variants of the ***nested MintingActivity*** type needed for ***DelegateActivity:MintingActivities***.\n */\n"}
{"get MintingActivities(): "}<a href="#MintingActivityHelperNested">{"MintingActivityHelperNested"}</a>{";"}
            </pre>
    
    

        <h4>   readonly <b>{"SpendingActivities"}</b></h4>
            <pre>
{"/**\n * access to different variants of the ***nested SpendingActivity*** type needed for ***DelegateActivity:SpendingActivities***.\n */\n"}
{"get SpendingActivities(): "}<a href="#SpendingActivityHelperNested">{"SpendingActivityHelperNested"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#DelegateActivity">{"DelegateActivity"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        CapoLifecycleActivities: "}<a href="#CapoLifecycleActivityLike">{"CapoLifecycleActivityLike"}</a>{";\n        DelegateLifecycleActivities: "}<a href="#DelegateLifecycleActivityLike">{"DelegateLifecycleActivityLike"}</a>{";\n        SpendingActivities: "}<a href="#SpendingActivityLike">{"SpendingActivityLike"}</a>{";\n        MintingActivities: "}<a href="#MintingActivityLike">{"MintingActivityLike"}</a>{";\n        BurningActivities: "}<a href="#BurningActivityLike">{"BurningActivityLike"}</a>{";\n        CreatingDelegatedData: "}<a href="#DelegateActivity$CreatingDelegatedDataLike">{"DelegateActivity$CreatingDelegatedDataLike"}</a>{";\n        UpdatingDelegatedData: "}<a href="#DelegateActivity$UpdatingDelegatedDataLike">{"DelegateActivity$UpdatingDelegatedDataLike"}</a>{";\n        DeletingDelegatedData: "}<a href="#DelegateActivity$DeletingDelegatedDataLike">{"DelegateActivity$DeletingDelegatedDataLike"}</a>{";\n        MultipleDelegateActivities: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#UplcData">{"UplcData"}</a>{">;\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"CreatingDelegatedData"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"MyMintSpendDelegate::DelegateActivity.CreatingDelegatedData\"***, given a transaction-context ***with a seed utxo*** and other field details\n *\n * @remarks\n *\n * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$CreatingDelegatedData}` for use in a context providing an implicit seed utxo.\n */\n"}
{"CreatingDelegatedData(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        dataType: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"CreatingDelegatedData"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"MyMintSpendDelegate::DelegateActivity.CreatingDelegatedData\"*** with raw seed details included in fields.\n */\n"}
{"CreatingDelegatedData(fields: "}<a href="#DelegateActivity$CreatingDelegatedDataLike">{"DelegateActivity$CreatingDelegatedDataLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        dataType: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DeletingDelegatedData"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"MyMintSpendDelegate::DelegateActivity.DeletingDelegatedData\"***\n *\n * @remarks\n *\n * - ***DelegateActivity$DeletingDelegatedDataLike*** is the same as the expanded field-types.\n */\n"}
{"DeletingDelegatedData(fields: "}<a href="#DelegateActivity$DeletingDelegatedDataLike">{"DelegateActivity$DeletingDelegatedDataLike"}</a>{" | {\n        dataType: string;\n        recId: number[];\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"MultipleDelegateActivities"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"MyMintSpendDelegate::DelegateActivity.MultipleDelegateActivities\"***\n */\n"}
{"MultipleDelegateActivities(activities: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#UplcData">{"UplcData"}</a>{">"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"UpdatingDelegatedData"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"MyMintSpendDelegate::DelegateActivity.UpdatingDelegatedData\"***\n *\n * @remarks\n *\n * - ***DelegateActivity$UpdatingDelegatedDataLike*** is the same as the expanded field-types.\n */\n"}
{"UpdatingDelegatedData(fields: "}<a href="#DelegateActivity$UpdatingDelegatedDataLike">{"DelegateActivity$UpdatingDelegatedDataLike"}</a>{" | {\n        dataType: string;\n        recId: number[];\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    