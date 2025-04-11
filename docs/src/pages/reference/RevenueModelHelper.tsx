import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>RevenueModelHelper</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#Subscription">Subscription</a>, 
                    <a href="#TransactionBased">TransactionBased</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#RevenueModel">{"RevenueModel"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        TransactionBased: "}<a href="#RevenueModel$TransactionBasedLike">{"RevenueModel$TransactionBasedLike"}</a>{";\n        Subscription: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#SubscriptionFeeFrequencyLike">{"SubscriptionFeeFrequencyLike"}</a>{">;\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"Subscription"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"NeighborhoodData::RevenueModel.Subscription\"***\n */\n"}
{"Subscription(subscriptionFee: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#SubscriptionFeeFrequencyLike">{"SubscriptionFeeFrequencyLike"}</a>{">"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"TransactionBased"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"NeighborhoodData::RevenueModel.TransactionBased\"***\n *\n * @remarks\n *\n * - ***RevenueModel$TransactionBasedLike*** is the same as the expanded field-types.\n */\n"}
{"TransactionBased(fields: "}<a href="#RevenueModel$TransactionBasedLike">{"RevenueModel$TransactionBasedLike"}</a>{" | {\n        minTxFee: "}<a href="#Value">{"Value"}</a>{" | ["}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[], [number[] | string, "}<a href="#IntLike">{"IntLike"}</a>{"][]][] | {\n            mph: "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            tokens: {\n                name: number[] | string;\n                qty: "}<a href="#IntLike">{"IntLike"}</a>{";\n            }[];\n        }[];\n        maxTxFee: "}<a href="#Value">{"Value"}</a>{" | ["}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[], [number[] | string, "}<a href="#IntLike">{"IntLike"}</a>{"][]][] | {\n            mph: "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            tokens: {\n                name: number[] | string;\n                qty: "}<a href="#IntLike">{"IntLike"}</a>{";\n            }[];\n        }[] | undefined;\n        chargeTo: "}<a href="#FeeSourceLike">{"FeeSourceLike"}</a>{";\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    