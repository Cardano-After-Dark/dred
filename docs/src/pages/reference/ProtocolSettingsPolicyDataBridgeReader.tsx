import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>ProtocolSettingsPolicyDataBridgeReader</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#bridge">bridge</a>, 
                    <a href="#datum">datum</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#AnyData">AnyData</a>, 
                    <a href="#BurningActivity">BurningActivity</a>, 
                    <a href="#CapoCtx">CapoCtx</a>, 
                    <a href="#CapoLifecycleActivity">CapoLifecycleActivity</a>, 
                    <a href="#CapoManifestEntry">CapoManifestEntry</a>, 
                    <a href="#cctx_CharterInputType">cctx_CharterInputType</a>, 
                    <a href="#DelegateActivity">DelegateActivity</a>, 
                    <a href="#DelegateDatum">DelegateDatum</a>, 
                    <a href="#DelegateLifecycleActivity">DelegateLifecycleActivity</a>, 
                    <a href="#DelegateRole">DelegateRole</a>, 
                    <a href="#DelegationDetail">DelegationDetail</a>, 
                    <a href="#ManifestActivity">ManifestActivity</a>, 
                    <a href="#ManifestEntryType">ManifestEntryType</a>, 
                    <a href="#MintingActivity">MintingActivity</a>, 
                    <a href="#NeighborhoodSettings">NeighborhoodSettings</a>, 
                    <a href="#NodeOperatorSettings">NodeOperatorSettings</a>, 
                    <a href="#PendingCharterChange">PendingCharterChange</a>, 
                    <a href="#PendingDelegateAction">PendingDelegateAction</a>, 
                    <a href="#PendingDelegateChange">PendingDelegateChange</a>, 
                    <a href="#ProtocolSettings">ProtocolSettings</a>, 
                    <a href="#RelativeDelegateLink">RelativeDelegateLink</a>, 
                    <a href="#SpendingActivity">SpendingActivity</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"bridge"}</b></h4>
            <pre>
{""}
{"bridge: "}<a href="#ProtocolSettingsPolicyDataBridge">{"ProtocolSettingsPolicyDataBridge"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"datum"}</b></h4>
            <pre>
{""}
{"datum: "}{"(d: "}<a href="#UplcData">{"UplcData"}</a>{") => "}<a href="#Partial">{"Partial"}</a>{"<{\n        Cip68RefToken: "}<a href="#DelegateDatum$Ergo$Cip68RefToken">{"DelegateDatum$Ergo$Cip68RefToken"}</a>{";\n        IsDelegation: "}<a href="#ErgoDelegationDetail">{"ErgoDelegationDetail"}</a>{";\n        capoStoredData: "}<a href="#DelegateDatum$Ergo$capoStoredData">{"DelegateDatum$Ergo$capoStoredData"}</a>{";\n    }>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"AnyData"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **AnyData*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"AnyData(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#AnyData">{"AnyData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"BurningActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **BurningActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"BurningActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoBurningActivity">{"ErgoBurningActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"CapoCtx"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **CapoCtx*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"CapoCtx(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#CapoCtx">{"CapoCtx"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"CapoLifecycleActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **CapoLifecycleActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"CapoLifecycleActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoCapoLifecycleActivity">{"ErgoCapoLifecycleActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"CapoManifestEntry"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **CapoManifestEntry*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"CapoManifestEntry(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#CapoManifestEntry">{"CapoManifestEntry"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"cctx_CharterInputType"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **cctx_CharterInputType*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"cctx_CharterInputType(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#Ergocctx_CharterInputType">{"Ergocctx_CharterInputType"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DelegateActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **DelegateActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"DelegateActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoDelegateActivity">{"ErgoDelegateActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DelegateDatum"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **DelegateDatum*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"DelegateDatum(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoDelegateDatum">{"ErgoDelegateDatum"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DelegateLifecycleActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **DelegateLifecycleActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"DelegateLifecycleActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoDelegateLifecycleActivity">{"ErgoDelegateLifecycleActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DelegateRole"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **DelegateRole*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"DelegateRole(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoDelegateRole">{"ErgoDelegateRole"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DelegationDetail"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **DelegationDetail*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"DelegationDetail(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#DelegationDetail">{"DelegationDetail"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ManifestActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **ManifestActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"ManifestActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoManifestActivity">{"ErgoManifestActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ManifestEntryType"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **ManifestEntryType*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"ManifestEntryType(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoManifestEntryType">{"ErgoManifestEntryType"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"MintingActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **MintingActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"MintingActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoMintingActivity">{"ErgoMintingActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"NeighborhoodSettings"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **NeighborhoodSettings*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"NeighborhoodSettings(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#NeighborhoodSettings">{"NeighborhoodSettings"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"NodeOperatorSettings"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **NodeOperatorSettings*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"NodeOperatorSettings(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#NodeOperatorSettings">{"NodeOperatorSettings"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"PendingCharterChange"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **PendingCharterChange*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"PendingCharterChange(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoPendingCharterChange">{"ErgoPendingCharterChange"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"PendingDelegateAction"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **PendingDelegateAction*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"PendingDelegateAction(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoPendingDelegateAction">{"ErgoPendingDelegateAction"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"PendingDelegateChange"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **PendingDelegateChange*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"PendingDelegateChange(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#PendingDelegateChange">{"PendingDelegateChange"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"ProtocolSettings"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **ProtocolSettings*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"ProtocolSettings(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ProtocolSettings">{"ProtocolSettings"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"RelativeDelegateLink"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **RelativeDelegateLink*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"RelativeDelegateLink(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#RelativeDelegateLink">{"RelativeDelegateLink"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"SpendingActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **SpendingActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"SpendingActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoSpendingActivity">{"ErgoSpendingActivity"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    