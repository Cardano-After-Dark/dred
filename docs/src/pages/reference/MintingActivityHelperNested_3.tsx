import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>MintingActivityHelperNested_3</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#$seeded$CreatingRecord">$seeded$CreatingRecord</a>, 
                    <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#CreatingRecord">CreatingRecord</a>
        </p>



    <h3>Instance properties</h3>
            <h4>   readonly <b>{"$seeded$CreatingRecord"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"NeighborhoodPolicy::MintingActivity.CreatingRecord\"***\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function. ## Usage Access the activity-creator as a getter: `$seeded$CreatingRecord`\n *\n * Use the resulting activity-creator in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity, ...})` method. ## Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n */\n"}
{"get $seeded$CreatingRecord(): "}{"import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(thingWithSeed: "}<a href="#hasSeed">{"hasSeed"}</a>{" | "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<{\n        CreatingRecord: "}<a href="#TxOutputId">{"TxOutputId"}</a>{";\n    }, "}<a href="#Partial">{"Partial"}</a>{"<{\n        CreatingRecord: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"CreatingRecord"}</b></h4>
            <pre>
{"/**\n * generates isActivity/redeemer wrapper with UplcData for ***\"NeighborhoodPolicy::MintingActivity.CreatingRecord\"***, given a transaction-context (or direct arg) with a ***seed utxo***\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. - to get a transaction context having the seed needed for this argument, see the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass. - or see the {@link hasSeed} type for other ways to feed it with a TxOutputId. - in a context providing an implicit seed utxo, use the `$seeded$CreatingRecord}` variant of this activity instead\n *\n * ## Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n */\n"}
{"CreatingRecord(thingWithSeed: "}<a href="#hasSeed">{"hasSeed"}</a>{" | "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    