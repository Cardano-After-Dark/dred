import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>PendingDelegateActionHelper_4</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#$seeded$Add">$seeded$Add</a>, 
                    <a href="#$seeded$Replace">$seeded$Replace</a>, 
                    <a href="#Remove">Remove</a>, 
                    <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#Add">Add</a>, 
                    <a href="#Add">Add</a>, 
                    <a href="#Replace">Replace</a>, 
                    <a href="#Replace">Replace</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"$seeded$Add"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingDelegateAction.Add\"***,\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n *\n * ## Usage 1. Call the `$seeded$Add({ purpose, idPrefix })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method.\n *\n * @param fields - \\{ purpose: string, idPrefix: string \\}\n */\n"}
{"$seeded$Add: "}{"(fields: {\n        purpose: string;\n        idPrefix: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n        idPrefix: string;\n    }) => "}<a href="#UplcData">{"UplcData"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"$seeded$Replace"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingDelegateAction.Replace\"***,\n *\n * @remarks\n *\n * ### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n *\n * ## Usage 1. Call the `$seeded$Replace({ purpose, idPrefix, replacesDgt })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method.\n *\n * @param fields - \\{ purpose: string, idPrefix: string, replacesDgt: AssetClass | string | [string | MintingPolicyHash | number[], string | number[]] | \\{mph: MintingPolicyHash | string | number[], tokenName: string | number[]\\} \\}\n */\n"}
{"$seeded$Replace: "}{"(fields: {\n        purpose: string;\n        idPrefix: string;\n        replacesDgt: "}<a href="#AssetClass">{"AssetClass"}</a>{" | string | [string | "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | number[], string | number[]] | {\n            mph: "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            tokenName: string | number[];\n        };\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n        idPrefix: string;\n        replacesDgt: "}<a href="#AssetClass">{"AssetClass"}</a>{" | string | [string | "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | number[], string | number[]] | {\n            mph: "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            tokenName: string | number[];\n        };\n    }) => "}<a href="#UplcData">{"UplcData"}</a>{">"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"Remove"}</b></h4>
            <pre>
{"/**\n * (property getter): UplcData for ***\"CapoDelegateHelpers::PendingDelegateAction.Remove\"***\n *\n * @remarks\n *\n * - ***tagOnly*** variant accessor returns an empty ***constrData#1***\n */\n"}
{"get Remove(): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#PendingDelegateAction">{"PendingDelegateAction"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        Add: "}<a href="#PendingDelegateAction$AddLike">{"PendingDelegateAction$AddLike"}</a>{";\n        Remove: "}<a href="#tagOnly">{"tagOnly"}</a>{";\n        Replace: "}<a href="#PendingDelegateAction$ReplaceLike">{"PendingDelegateAction$ReplaceLike"}</a>{";\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"Add"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingDelegateAction.Add\"***, given a transaction-context ***with a seed utxo*** and other field details\n *\n * @remarks\n *\n * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$Add}` for use in a context providing an implicit seed utxo.\n */\n"}
{"Add(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n        idPrefix: string;\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"Add"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingDelegateAction.Add\"*** with raw seed details included in fields.\n */\n"}
{"Add(fields: "}<a href="#PendingDelegateAction$AddLike">{"PendingDelegateAction$AddLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n        idPrefix: string;\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"Replace"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingDelegateAction.Replace\"***, given a transaction-context ***with a seed utxo*** and other field details\n *\n * @remarks\n *\n * See the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$Replace}` for use in a context providing an implicit seed utxo.\n */\n"}
{"Replace(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n        idPrefix: string;\n        replacesDgt: "}<a href="#AssetClass">{"AssetClass"}</a>{" | string | [string | "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | number[], string | number[]] | {\n            mph: "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            tokenName: string | number[];\n        };\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"Replace"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingDelegateAction.Replace\"*** with raw seed details included in fields.\n */\n"}
{"Replace(fields: "}<a href="#PendingDelegateAction$ReplaceLike">{"PendingDelegateAction$ReplaceLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n        idPrefix: string;\n        replacesDgt: "}<a href="#AssetClass">{"AssetClass"}</a>{" | string | [string | "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | number[], string | number[]] | {\n            mph: "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            tokenName: string | number[];\n        };\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    