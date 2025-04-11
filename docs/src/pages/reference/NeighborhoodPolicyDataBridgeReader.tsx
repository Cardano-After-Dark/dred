import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>NeighborhoodPolicyDataBridgeReader</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#bridge">bridge</a>, 
                    <a href="#datum">datum</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#AbstractSettingsForNeighborhood">AbstractSettingsForNeighborhood</a>, 
                    <a href="#AnyData">AnyData</a>, 
                    <a href="#AppInfo">AppInfo</a>, 
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
                    <a href="#dgd_DataSrc">dgd_DataSrc</a>, 
                    <a href="#DgDataDetails">DgDataDetails</a>, 
                    <a href="#FeeSource">FeeSource</a>, 
                    <a href="#ManifestActivity">ManifestActivity</a>, 
                    <a href="#ManifestEntryType">ManifestEntryType</a>, 
                    <a href="#MintingActivity">MintingActivity</a>, 
                    <a href="#NeighborhoodData">NeighborhoodData</a>, 
                    <a href="#NeighborhoodSettings">NeighborhoodSettings</a>, 
                    <a href="#NodeOpsInfo">NodeOpsInfo</a>, 
                    <a href="#PendingCharterChange">PendingCharterChange</a>, 
                    <a href="#PendingDelegateAction">PendingDelegateAction</a>, 
                    <a href="#PendingDelegateChange">PendingDelegateChange</a>, 
                    <a href="#RelativeDelegateLink">RelativeDelegateLink</a>, 
                    <a href="#RevenueModel">RevenueModel</a>, 
                    <a href="#SpendingActivity">SpendingActivity</a>, 
                    <a href="#SubscriptionFeeFrequency">SubscriptionFeeFrequency</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"bridge"}</b></h4>
            <pre>
{""}
{"bridge: "}<a href="#NeighborhoodPolicyDataBridge">{"NeighborhoodPolicyDataBridge"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"datum"}</b></h4>
            <pre>
{""}
{"datum: "}{"(d: "}<a href="#UplcData">{"UplcData"}</a>{") => "}<a href="#Partial">{"Partial"}</a>{"<{\n        Cip68RefToken: "}<a href="#DelegateDatum$Ergo$Cip68RefToken">{"DelegateDatum$Ergo$Cip68RefToken"}</a>{";\n        IsDelegation: "}<a href="#ErgoDelegationDetail">{"ErgoDelegationDetail"}</a>{";\n        capoStoredData: "}<a href="#DelegateDatum$Ergo$capoStoredData">{"DelegateDatum$Ergo$capoStoredData"}</a>{";\n    }>"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"AbstractSettingsForNeighborhood"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **AbstractSettingsForNeighborhood*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"AbstractSettingsForNeighborhood(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#AbstractSettingsForNeighborhood">{"AbstractSettingsForNeighborhood"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"AnyData"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **AnyData*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"AnyData(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#AnyData">{"AnyData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"AppInfo"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **AppInfo*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"AppInfo(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#AppInfo">{"AppInfo"}</a>{";"}
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
    
    

        <h4>    <b>{"dgd_DataSrc"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **dgd_DataSrc*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"dgd_DataSrc(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#Ergodgd_DataSrc">{"Ergodgd_DataSrc"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"DgDataDetails"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **DgDataDetails*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"DgDataDetails(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#DgDataDetails">{"DgDataDetails"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"FeeSource"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **FeeSource*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"FeeSource(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoFeeSource">{"ErgoFeeSource"}</a>{";"}
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
    
    

        <h4>    <b>{"NeighborhoodData"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **NeighborhoodData*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"NeighborhoodData(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#NeighborhoodData">{"NeighborhoodData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"NeighborhoodSettings"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **NeighborhoodSettings*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"NeighborhoodSettings(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#NeighborhoodSettings">{"NeighborhoodSettings"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"NodeOpsInfo"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **NodeOpsInfo*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"NodeOpsInfo(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#NodeOpsInfo">{"NodeOpsInfo"}</a>{";"}
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
    
    

        <h4>    <b>{"RelativeDelegateLink"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **RelativeDelegateLink*** struct type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"RelativeDelegateLink(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#RelativeDelegateLink">{"RelativeDelegateLink"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"RevenueModel"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **RevenueModel*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"RevenueModel(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoRevenueModel">{"ErgoRevenueModel"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"SpendingActivity"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **SpendingActivity*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"SpendingActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoSpendingActivity">{"ErgoSpendingActivity"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"SubscriptionFeeFrequency"}</b></h4>
            <pre>
{"/**\n * reads UplcData *known to fit the **SubscriptionFeeFrequency*** enum type, for the BasicDelegate script. ### Standard WARNING\n *\n * This is a low-level data-reader for use in ***advanced development scenarios***.\n *\n * Used correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n *\n * On the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n */\n"}
{"SubscriptionFeeFrequency(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoSubscriptionFeeFrequency">{"ErgoSubscriptionFeeFrequency"}</a>{";"}
            </pre>
    
    

        </div>

    );
}
    