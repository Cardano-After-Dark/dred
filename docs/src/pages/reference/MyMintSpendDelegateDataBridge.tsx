import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>MyMintSpendDelegateDataBridge</h2>
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#isAbstract">isAbstract</a>
          </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#activity">activity</a>, 
                    <a href="#datum">datum</a>, 
                    <a href="#DelegateActivity">DelegateActivity</a>, 
                    <a href="#DelegateDatum">DelegateDatum</a>, 
                    <a href="#isAbstract">isAbstract</a>, 
                    <a href="#readDatum">readDatum</a>, 
                    <a href="#reader">reader</a>, 
                    <a href="#types">types</a>, 
                    <a href="#ᱺᱺAnyDataCast">ᱺᱺAnyDataCast</a>, 
                    <a href="#ᱺᱺCapoCtxCast">ᱺᱺCapoCtxCast</a>, 
                    <a href="#ᱺᱺCapoManifestEntryCast">ᱺᱺCapoManifestEntryCast</a>, 
                    <a href="#ᱺᱺDelegationDetailCast">ᱺᱺDelegationDetailCast</a>, 
                    <a href="#ᱺᱺPendingDelegateChangeCast">ᱺᱺPendingDelegateChangeCast</a>, 
                    <a href="#ᱺᱺRelativeDelegateLinkCast">ᱺᱺRelativeDelegateLinkCast</a>
            </p>

    <h3>Static / class properties</h3>
            <h4>static    <b>{"isAbstract"}</b></h4>
            <pre>
{""}
{"static isAbstract: "}{"false"}{";"}
            </pre>
    
    



    <h3>Instance properties</h3>
            <h4>    <b>{"activity"}</b></h4>
            <pre>
{"/**\n * generates UplcData for the activity type (***DelegateActivity***) for the `BasicDelegate` script\n */\n"}
{"activity: "}<a href="#DelegateActivityHelper">{"DelegateActivityHelper"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"datum"}</b></h4>
            <pre>
{"/**\n * Helper class for generating TxOutputDatum for the ***datum type (DelegateDatum)*** for this contract script.\n */\n"}
{"datum: "}<a href="#DelegateDatumHelper">{"DelegateDatumHelper"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DelegateActivity"}</b></h4>
            <pre>
{""}
{"DelegateActivity: "}<a href="#DelegateActivityHelper">{"DelegateActivityHelper"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DelegateDatum"}</b></h4>
            <pre>
{"/**\n * this is the specific type of datum for the `BasicDelegate` script\n */\n"}
{"DelegateDatum: "}<a href="#DelegateDatumHelper">{"DelegateDatumHelper"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"isAbstract"}</b></h4>
            <pre>
{""}
{"isAbstract: "}{"false"}{";"}
            </pre>
    
    

        <h4>    <b>{"readDatum"}</b></h4>
            <pre>
{""}
{"readDatum: "}{"(d: "}<a href="#UplcData">{"UplcData"}</a>{") => "}<a href="#ErgoDelegateDatum">{"ErgoDelegateDatum"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"reader"}</b></h4>
            <pre>
{""}
{"reader: "}<a href="#MyMintSpendDelegateDataBridgeReader">{"MyMintSpendDelegateDataBridgeReader"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"types"}</b></h4>
            <pre>
{"/**\n * accessors for all the types defined in the `BasicDelegate` script\n *\n * @remarks\n *\n * - these accessors are used to generate UplcData for each type\n */\n"}
{"types: "}{"{\n        DelegateDatum: "}<a href="#DelegateDatumHelper">{"DelegateDatumHelper"}</a>{";\n        DelegateRole: "}<a href="#DelegateRoleHelper">{"DelegateRoleHelper"}</a>{";\n        ManifestActivity: "}<a href="#ManifestActivityHelper">{"ManifestActivityHelper"}</a>{";\n        CapoLifecycleActivity: "}<a href="#CapoLifecycleActivityHelper">{"CapoLifecycleActivityHelper"}</a>{";\n        DelegateLifecycleActivity: "}<a href="#DelegateLifecycleActivityHelper">{"DelegateLifecycleActivityHelper"}</a>{";\n        SpendingActivity: "}<a href="#SpendingActivityHelper">{"SpendingActivityHelper"}</a>{";\n        MintingActivity: "}<a href="#MintingActivityHelper">{"MintingActivityHelper"}</a>{";\n        BurningActivity: "}<a href="#BurningActivityHelper">{"BurningActivityHelper"}</a>{";\n        DelegateActivity: "}<a href="#DelegateActivityHelper">{"DelegateActivityHelper"}</a>{";\n        PendingDelegateAction: "}<a href="#PendingDelegateActionHelper">{"PendingDelegateActionHelper"}</a>{";\n        ManifestEntryType: "}<a href="#ManifestEntryTypeHelper">{"ManifestEntryTypeHelper"}</a>{";\n        PendingCharterChange: "}<a href="#PendingCharterChangeHelper">{"PendingCharterChangeHelper"}</a>{";\n        cctx_CharterInputType: "}<a href="#cctx_CharterInputTypeHelper">{"cctx_CharterInputTypeHelper"}</a>{";\n        AnyData: (fields: "}<a href="#AnyDataLike">{"AnyDataLike"}</a>{" | {\n            id: number[];\n            type: string;\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        DelegationDetail: (fields: "}<a href="#DelegationDetailLike">{"DelegationDetailLike"}</a>{" | {\n            capoAddr: /*minStructField*/ "}<a href="#Address">{"Address"}</a>{" | string;\n            mph: /*minStructField*/ "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            tn: number[];\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        RelativeDelegateLink: (fields: "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{" | {\n            uutName: string;\n            delegateValidatorHash: /*minStructField*/ "}<a href="#ValidatorHash">{"ValidatorHash"}</a>{" | string | number[] | undefined;\n            config: number[];\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        PendingDelegateChange: (fields: "}<a href="#PendingDelegateChangeLike">{"PendingDelegateChangeLike"}</a>{" | {\n            action: "}<a href="#PendingDelegateActionLike">{"PendingDelegateActionLike"}</a>{";\n            role: "}<a href="#DelegateRoleLike">{"DelegateRoleLike"}</a>{";\n            dgtLink: /*minStructField*/ "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{" | undefined;\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        CapoManifestEntry: (fields: "}<a href="#CapoManifestEntryLike">{"CapoManifestEntryLike"}</a>{" | {\n            entryType: "}<a href="#ManifestEntryTypeLike">{"ManifestEntryTypeLike"}</a>{";\n            tokenName: number[];\n            mph: /*minStructField*/ "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[] | undefined;\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        CapoCtx: (fields: "}<a href="#CapoCtxLike">{"CapoCtxLike"}</a>{" | {\n            mph: /*minStructField*/ "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[];\n            charter: "}<a href="#cctx_CharterInputTypeLike">{"cctx_CharterInputTypeLike"}</a>{";\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺAnyDataCast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺAnyDataCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#AnyData">{"AnyData"}</a>{", "}<a href="#AnyDataLike">{"AnyDataLike"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺCapoCtxCast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺCapoCtxCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#CapoCtx">{"CapoCtx"}</a>{", "}<a href="#CapoCtxLike">{"CapoCtxLike"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺCapoManifestEntryCast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺCapoManifestEntryCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#CapoManifestEntry">{"CapoManifestEntry"}</a>{", "}<a href="#CapoManifestEntryLike">{"CapoManifestEntryLike"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺDelegationDetailCast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺDelegationDetailCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#DelegationDetail">{"DelegationDetail"}</a>{", "}<a href="#DelegationDetailLike">{"DelegationDetailLike"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺPendingDelegateChangeCast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺPendingDelegateChangeCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#PendingDelegateChange">{"PendingDelegateChange"}</a>{", "}<a href="#PendingDelegateChangeLike">{"PendingDelegateChangeLike"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"ᱺᱺRelativeDelegateLinkCast"}</b></h4>
            <pre>
{"/**\n * uses unicode U+1c7a - sorts to the end\n */\n"}
{"ᱺᱺRelativeDelegateLinkCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#RelativeDelegateLink">{"RelativeDelegateLink"}</a>{", "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{">"}{";"}
            </pre>
    
    


        </div>

    );
}
    