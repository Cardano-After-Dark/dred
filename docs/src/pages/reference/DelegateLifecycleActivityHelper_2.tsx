import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>DelegateLifecycleActivityHelper_2</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#$seeded$ReplacingMe">$seeded$ReplacingMe</a>, 
                    <a href="#Retiring">Retiring</a>, 
                    <a href="#ValidatingSettings">ValidatingSettings</a>, 
                    <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#ReplacingMe">ReplacingMe</a>, 
                    <a href="#ReplacingMe">ReplacingMe</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"$seeded$ReplacingMe"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe\"***,\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n *\n * ## Usage 1. Call the `$seeded$ReplacingMe({ purpose })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method.\n *\n * @param fields - \\{ purpose: string \\}\n */\n"}
{"$seeded$ReplacingMe: "}{"(fields: {\n        purpose: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n    }) => "}<a href="#UplcData">{"UplcData"}</a>{">"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"Retiring"}</b></h4>
            <pre>
{"/**\n * (property getter): UplcData for ***\"CapoDelegateHelpers::DelegateLifecycleActivity.Retiring\"***\n *\n * @remarks\n *\n * - ***tagOnly*** variant accessor returns an empty ***constrData#1***\n */\n"}
{"get Retiring(): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>   readonly <b>{"ValidatingSettings"}</b></h4>
            <pre>
{"/**\n * (property getter): UplcData for ***\"CapoDelegateHelpers::DelegateLifecycleActivity.ValidatingSettings\"***\n *\n * @remarks\n *\n * - ***tagOnly*** variant accessor returns an empty ***constrData#2***\n */\n"}
{"get ValidatingSettings(): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#DelegateLifecycleActivity">{"DelegateLifecycleActivity"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        ReplacingMe: "}<a href="#DelegateLifecycleActivity$ReplacingMeLike">{"DelegateLifecycleActivity$ReplacingMeLike"}</a>{";\n        Retiring: "}<a href="#tagOnly">{"tagOnly"}</a>{";\n        ValidatingSettings: "}<a href="#tagOnly">{"tagOnly"}</a>{";\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"ReplacingMe"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe\"***, given a transaction-context ***with a seed utxo*** and other field details\n *\n * @remarks\n *\n * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$ReplacingMe}` for use in a context providing an implicit seed utxo.\n */\n"}
{"ReplacingMe(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ReplacingMe"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::DelegateLifecycleActivity.ReplacingMe\"*** with raw seed details included in fields.\n */\n"}
{"ReplacingMe(fields: "}<a href="#DelegateLifecycleActivity$ReplacingMeLike">{"DelegateLifecycleActivity$ReplacingMeLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    