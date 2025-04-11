import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>dgd_DataSrcHelper_2</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#Unk">Unk</a>, 
                    <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#Both">Both</a>, 
                    <a href="#Input">Input</a>, 
                    <a href="#Output">Output</a>
        </p>



    <h3>Instance properties</h3>
            <h4>   readonly <b>{"Unk"}</b></h4>
            <pre>
{"/**\n * (property getter): UplcData for ***\"CapoHelpers::dgd_DataSrc.Unk\"***\n *\n * @remarks\n *\n * - ***tagOnly*** variant accessor returns an empty ***constrData#0***\n */\n"}
{"get Unk(): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#dgd_DataSrc">{"dgd_DataSrc"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        Unk: "}<a href="#tagOnly">{"tagOnly"}</a>{";\n        Input: "}<a href="#TxInput">{"TxInput"}</a>{";\n        Output: "}<a href="#TxOutput">{"TxOutput"}</a>{";\n        Both: "}<a href="#dgd_DataSrc$BothLike">{"dgd_DataSrc$BothLike"}</a>{";\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"Both"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoHelpers::dgd_DataSrc.Both\"***\n *\n * @remarks\n *\n * - ***dgd_DataSrc$BothLike*** is the same as the expanded field-types.\n */\n"}
{"Both(fields: "}<a href="#dgd_DataSrc$BothLike">{"dgd_DataSrc$BothLike"}</a>{" | {\n        utxo: "}<a href="#TxInput">{"TxInput"}</a>{";\n        txo: "}<a href="#TxOutput">{"TxOutput"}</a>{";\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"Input"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoHelpers::dgd_DataSrc.Input\"***\n */\n"}
{"Input(utxo: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"Output"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoHelpers::dgd_DataSrc.Output\"***\n */\n"}
{"Output(txo: "}<a href="#TxOutput">{"TxOutput"}</a>{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    