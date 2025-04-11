import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>DelegateDatumHelper_2</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#capoStoredData">capoStoredData</a>, 
                    <a href="#Cip68RefToken">Cip68RefToken</a>, 
                    <a href="#IsDelegation">IsDelegation</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#DelegateDatum">{"DelegateDatum"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        Cip68RefToken: "}<a href="#DelegateDatum$Cip68RefTokenLike">{"DelegateDatum$Cip68RefTokenLike"}</a>{";\n        IsDelegation: "}<a href="#DelegationDetailLike">{"DelegationDetailLike"}</a>{";\n        capoStoredData: "}<a href="#DelegateDatum$capoStoredDataLike">{"DelegateDatum$capoStoredDataLike"}</a>{";\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"capoStoredData"}</b></h4>
            <pre>
{"/**\n * generates InlineTxOutputDatum for ***\"DredNodeRegistryPolicy::DelegateDatum.capoStoredData\"***\n *\n * @remarks\n *\n * - ***DelegateDatum$capoStoredDataLike*** is the same as the expanded field-types.\n */\n"}
{"capoStoredData(fields: "}<a href="#DelegateDatum$capoStoredDataLike">{"DelegateDatum$capoStoredDataLike"}</a>{" | {\n        data: "}<a href="#NodeRegistrationDataLike">{"NodeRegistrationDataLike"}</a>{";\n        version: "}<a href="#IntLike">{"IntLike"}</a>{";\n        otherDetails: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{"): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"Cip68RefToken"}</b></h4>
            <pre>
{"/**\n * generates InlineTxOutputDatum for ***\"DredNodeRegistryPolicy::DelegateDatum.Cip68RefToken\"***\n *\n * @remarks\n *\n * - ***DelegateDatum$Cip68RefTokenLike*** is the same as the expanded field-types.\n */\n"}
{"Cip68RefToken(fields: "}<a href="#DelegateDatum$Cip68RefTokenLike">{"DelegateDatum$Cip68RefTokenLike"}</a>{" | {\n        cip68meta: "}<a href="#AnyDataLike">{"AnyDataLike"}</a>{";\n        cip68version: "}<a href="#IntLike">{"IntLike"}</a>{";\n        otherDetails: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{"): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"IsDelegation"}</b></h4>
            <pre>
{"/**\n * generates InlineTxOutputDatum for ***\"DredNodeRegistryPolicy::DelegateDatum.IsDelegation\"***\n *\n * @remarks\n *\n * - ***DelegationDetailLike*** is the same as the expanded field-type.\n */\n"}
{"IsDelegation(dd: "}<a href="#DelegationDetailLike">{"DelegationDetailLike"}</a>{" | {\n        capoAddr: /*minStructField*/ "}<a href="#Address">{"Address"}</a>{" | string;\n        mph: /*minStructField*/ "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n        tn: number[];\n    }"}{"): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    