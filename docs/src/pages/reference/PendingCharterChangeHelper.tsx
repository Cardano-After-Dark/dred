import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>PendingCharterChangeHelper</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#ᱺᱺcast">ᱺᱺcast</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#delegateChange">delegateChange</a>, 
                    <a href="#otherManifestChange">otherManifestChange</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"ᱺᱺcast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺcast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#PendingCharterChange">{"PendingCharterChange"}</a>{", "}<a href="#Partial">{"Partial"}</a>{"<{\n        delegateChange: "}<a href="#PendingDelegateChangeLike">{"PendingDelegateChangeLike"}</a>{";\n        otherManifestChange: "}<a href="#PendingCharterChange$otherManifestChangeLike">{"PendingCharterChange$otherManifestChangeLike"}</a>{";\n    }>>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"delegateChange"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingCharterChange.delegateChange\"***\n *\n * @remarks\n *\n * - ***PendingDelegateChangeLike*** is the same as the expanded field-type.\n */\n"}
{"delegateChange(change: "}<a href="#PendingDelegateChangeLike">{"PendingDelegateChangeLike"}</a>{" | {\n        action: "}<a href="#PendingDelegateActionLike">{"PendingDelegateActionLike"}</a>{";\n        role: "}<a href="#DelegateRoleLike">{"DelegateRoleLike"}</a>{";\n        dgtLink: /*minStructField*/ "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{" | undefined;\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"otherManifestChange"}</b></h4>
            <pre>
{"/**\n * generates UplcData for ***\"CapoDelegateHelpers::PendingCharterChange.otherManifestChange\"***\n *\n * @remarks\n *\n * - ***PendingCharterChange$otherManifestChangeLike*** is the same as the expanded field-types.\n */\n"}
{"otherManifestChange(fields: "}<a href="#PendingCharterChange$otherManifestChangeLike">{"PendingCharterChange$otherManifestChangeLike"}</a>{" | {\n        activity: "}<a href="#ManifestActivityLike">{"ManifestActivityLike"}</a>{";\n        remainingDelegateValidations: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#DelegateRoleLike">{"DelegateRoleLike"}</a>{">;\n    }"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    