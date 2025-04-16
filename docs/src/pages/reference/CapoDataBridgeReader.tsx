import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>CapoDataBridgeReader</h2>
                    <ReactMarkdown>
                        {
                            ""
                        }
                    </ReactMarkdown>

            
      
            <p>
                <b>Instance properties: </b>
                                <a href="#bridge"><var>bridge</var></a>, &nbsp;
                    <a href="#datum"><var>datum</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#AnyData"><var>AnyData()</var></a>, &nbsp;
                    <a href="#CapoActivity"><var>CapoActivity()</var></a>, &nbsp;
                    <a href="#CapoDatum"><var>CapoDatum()</var></a>, &nbsp;
                    <a href="#CapoLifecycleActivity"><var>CapoLifecycleActivity()</var></a>, &nbsp;
                    <a href="#CapoManifestEntry"><var>CapoManifestEntry()</var></a>, &nbsp;
                    <a href="#DelegateRole"><var>DelegateRole()</var></a>, &nbsp;
                    <a href="#ManifestActivity"><var>ManifestActivity()</var></a>, &nbsp;
                    <a href="#ManifestEntryType"><var>ManifestEntryType()</var></a>, &nbsp;
                    <a href="#PendingCharterChange"><var>PendingCharterChange()</var></a>, &nbsp;
                    <a href="#PendingDelegateAction"><var>PendingDelegateAction()</var></a>, &nbsp;
                    <a href="#PendingDelegateChange"><var>PendingDelegateChange()</var></a>, &nbsp;
                    <a href="#RelativeDelegateLink"><var>RelativeDelegateLink()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="bridge"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "bridge"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"bridge: "}<a href="#CapoDataBridge">{"CapoDataBridge"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="datum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "datum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"datum: "}{"(d: "}<a href="#UplcData">{"UplcData"}</a>{") => "}<a href="#Partial">{"Partial"}</a>{"<{\n        CharterData: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{";\n        ScriptReference: "}<a href="#tagOnly">{"tagOnly"}</a>{";\n        DelegatedData: "}<a href="#CapoDatum$Ergo$DelegatedData">{"CapoDatum$Ergo$DelegatedData"}</a>{";\n    }>"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="AnyData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "AnyData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **AnyData*** struct type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"AnyData(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#AnyData">{"AnyData"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="CapoActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CapoActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **CapoActivity*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"CapoActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoCapoActivity">{"ErgoCapoActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="CapoDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CapoDatum"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **CapoDatum*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"CapoDatum(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoCapoDatum">{"ErgoCapoDatum"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="CapoLifecycleActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CapoLifecycleActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **CapoLifecycleActivity*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"CapoLifecycleActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoCapoLifecycleActivity">{"ErgoCapoLifecycleActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="CapoManifestEntry"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CapoManifestEntry"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **CapoManifestEntry*** struct type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"CapoManifestEntry(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#CapoManifestEntry">{"CapoManifestEntry"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="DelegateRole"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "DelegateRole"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **DelegateRole*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"DelegateRole(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoDelegateRole">{"ErgoDelegateRole"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="ManifestActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "ManifestActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **ManifestActivity*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"ManifestActivity(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoManifestActivity">{"ErgoManifestActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="ManifestEntryType"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "ManifestEntryType"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **ManifestEntryType*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"ManifestEntryType(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoManifestEntryType">{"ErgoManifestEntryType"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="PendingCharterChange"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "PendingCharterChange"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **PendingCharterChange*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"PendingCharterChange(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoPendingCharterChange">{"ErgoPendingCharterChange"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="PendingDelegateAction"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "PendingDelegateAction"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **PendingDelegateAction*** enum type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the enum type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"PendingDelegateAction(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#ErgoPendingDelegateAction">{"ErgoPendingDelegateAction"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="PendingDelegateChange"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "PendingDelegateChange"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **PendingDelegateChange*** struct type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"PendingDelegateChange(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#PendingDelegateChange">{"PendingDelegateChange"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="RelativeDelegateLink"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "RelativeDelegateLink"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "reads UplcData *known to fit the **RelativeDelegateLink*** struct type, for the Capo script. #### Standard WARNING\n\nThis is a low-level data-reader for use in ***advanced development scenarios***.\n\nUsed correctly with data that matches the type, this reader returns strongly-typed data - your code using these types will be safe.\n\nOn the other hand, reading non-matching data will not give you a valid result. It may throw an error, or it may throw no error, but return a value that causes some error later on in your code, when you try to use it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"RelativeDelegateLink(d: "}<a href="#UplcData">{"UplcData"}</a>{"): "}<a href="#RelativeDelegateLink">{"RelativeDelegateLink"}</a>{";"}
            </code></pre>
    
    </div>
    


<h3>Types referenced</h3>
            <p>see also: dred-network-registry!isActivity:type</p>


            <p>see also: dred-network-registry!GenericDelegateBridgeClass:type</p>


            <p>see also: dred-network-registry!hasSeed:type</p>


            <p>see also: dred-network-registry!UnspecializedDgtBundle:class</p>


            <p>see also: dred-network-registry!StellarTxnContext:class</p>


            <p>see also: dred-network-registry!TxSubmissionTracker:class</p>


            <p>see also: dred-network-registry!AllTxSubmissionStates:interface</p>


            <p>see also: dred-network-registry!aggregatedStateString:type</p>


            <p>see also: dred-network-registry!stateSummary:type</p>


            <p>see also: dred-network-registry!EventEmitter</p>


            <p>see also: dred-network-registry!TxBatchChangeNotifier:type</p>


            <p>see also: dred-network-registry!TimeoutId:type</p>


            <p>see also: dred-network-registry!SetupInfo:type</p>


            <p>see also: dred-network-registry!WalletSigningStrategy:class</p>


            <p>see also: dred-network-registry!SubmitOptions:type</p>


            <p>see also: dred-network-registry!TxSubmitCallbacks:type</p>


            <p>see also: dred-network-registry!namedSubmitters:type</p>


            <p>see also: dred-network-registry!TxDescription:type</p>


            <p>see also: dred-network-registry!TxDescriptionWithError:type</p>


            <p>see also: dred-network-registry!StellarSetupDetails:type</p>


            <p>see also: dred-network-registry!CapoConfig:type</p>


            <p>see also: dred-network-registry!StellarDelegate:class</p>


            <p>see also: dred-network-registry!basicDelegateMap:type</p>


            <p>see also: dred-network-registry!IF_ISANY:type</p>


            <p>see also: dred-network-registry!basicDelegateRoles:type</p>


            <p>see also: dred-network-registry!mustFindActivityType:type</p>


            <p>see also: dred-network-registry!ConfiguredDelegate:type</p>


            <p>see also: dred-network-registry!tokenPredicate:type</p>


            <p>see also: dred-network-registry!CapoDataBridge:class</p>


            <p>see also: dred-network-registry!CapoMinter:class</p>


            <p>see also: dred-network-registry!MinimalCharterDataArgs:interface</p>


            <p>see also: dred-network-registry!stellarSubclass:type</p>


            <p>see also: dred-network-registry!mustFindDatumType:type</p>


            <p>see also: dred-network-registry!mustFindReadDatumType:type</p>


            <p>see also: dred-network-registry!mustFindConcreteContractBridgeType:type</p>


            <p>see also: dred-network-registry!DelegateConfigDetails:interface</p>


            <p>see also: dred-network-registry!AuthorityPolicy:class</p>


            <p>see also: dred-network-registry!hasSeedUtxo:type</p>


            <p>see also: dred-network-registry!StellarContract:class</p>


            <p>see also: dred-network-registry!DeployedProgramBundle:type</p>


            <p>see also: dred-network-registry!anyUplcProgram:type</p>


            <p>see also: dred-network-registry!CharterData:type</p>


            <p>see also: dred-network-registry!hasAddlTxns:type</p>


            <p>see also: dred-network-registry!anyState:interface</p>


            <p>see also: dred-network-registry!ContractBasedDelegate:class</p>


            <p>see also: dred-network-registry!RelativeDelegateLinkLike_2:interface</p>


            <p>see also: dred-network-registry!SeedTxnScriptParams:type</p>


            <p>see also: dred-network-registry!OffchainPartialDelegateLink:type</p>


            <p>see also: dred-network-registry!FoundUut:type</p>


            <p>see also: dred-network-registry!UtxoSearchScope:type</p>


            <p>see also: dred-network-registry!AnyDataTemplate:type</p>


            <p>see also: dred-network-registry!UutName:class</p>


            <p>see also: dred-network-registry!DelegatedDataPredicate:type</p>


            <p>see also: dred-network-registry!FoundDatumUtxo:type</p>


            <p>see also: dred-network-registry!CapoDatum$Ergo$CharterData_2:type</p>


            <p>see also: dred-network-registry!ErgoPendingCharterChange_2_2:type</p>


            <p>see also: dred-network-registry!CapoHeliosBundle:class</p>


            <p>see also: dred-network-registry!FindableViaCharterData:type</p>


            <p>see also: dred-network-registry!DelegatedDataContract:class</p>


            <p>see also: dred-network-registry!BasicMintDelegate:class</p>


            <p>see also: dred-network-registry!ErgoRelativeDelegateLink_2:type</p>


            <p>see also: dred-network-registry!DelegationDetail_3:type</p>


            <p>see also: dred-network-registry!Capo:class</p>


            <p>see also: dred-network-registry!NamedPolicyCreationOptions:type</p>


            <p>see also: dred-network-registry!hasNamedDelegate:type</p>


            <p>see also: dred-network-registry!hasUutContext:type</p>


            <p>see also: dred-network-registry!ManifestEntryTokenRef:type</p>


            <p>see also: dred-network-registry!InstallPolicyDgtOptions:type</p>


            <p>see also: dred-network-registry!hasBootstrappedCapoConfig:type</p>


            <p>see also: dred-network-registry!charterDataState:type</p>


            <p>see also: dred-network-registry!CharterDataLike:type</p>


            <p>see also: dred-network-registry!MinimalDelegateUpdateLink:type</p>


            <p>see also: dred-network-registry!PreconfiguredDelegate:type</p>


            <p>see also: dred-network-registry!MinimalDelegateLink:type</p>


            <p>see also: dred-network-registry!capoDelegateConfig:type</p>


            <p>see also: dred-network-registry!hasCharterRef:type</p>


            <p>see also: dred-network-registry!hasSettingsRef:type</p>


            <p>see also: dred-network-registry!SomeDgtActivityHelper:type</p>


            <p>see also: dred-network-registry!hasGovAuthority:type</p>


            <p>see also: dred-network-registry!NormalDelegateSetup:type</p>


            <p>see also: dred-network-registry!DelegateSetupWithoutMintDelegate:type</p>


            <p>see also: dred-network-registry!hasSpendDelegate:type</p>


            <p>see also: dred-network-registry!UutCreationAttrsWithSeed:type</p>


            <p>see also: dred-network-registry!uutPurposeMap:type</p>


            <p>see also: dred-network-registry!CapoLifecycleActivityHelperNested:class</p>


            <p>see also: dred-network-registry!CapoActivityHelper:class</p>


            <p>see also: dred-network-registry!CapoDatumHelper:class</p>


            <p>see also: dred-network-registry!ErgoCapoDatum:type</p>


            <p>see also: dred-network-registry!CapoDataBridgeReader:class</p>


            <p>see also: dred-network-registry!DelegateRoleHelper:class</p>


            <p>see also: dred-network-registry!ManifestEntryTypeHelper:class</p>


            <p>see also: dred-network-registry!PendingDelegateActionHelper:class</p>


            <p>see also: dred-network-registry!ManifestActivityHelper:class</p>


            <p>see also: dred-network-registry!PendingCharterChangeHelper:class</p>


            <p>see also: dred-network-registry!CapoLifecycleActivityHelper:class</p>


            <p>see also: dred-network-registry!CapoManifestEntryLike_2:interface</p>


            <p>see also: dred-network-registry!ManifestEntryTypeLike_2:type</p>


            <p>see also: dred-network-registry!PendingDelegateChangeLike_2:interface</p>


            <p>see also: dred-network-registry!PendingDelegateActionLike_2:type</p>


            <p>see also: dred-network-registry!DelegateRoleLike_2:type</p>


            <p>see also: dred-network-registry!AnyDataLike_2:interface</p>


            <p>see also: dred-network-registry!AnyData_2:interface</p>


            <p>see also: dred-network-registry!CapoManifestEntry_2:interface</p>


            <p>see also: dred-network-registry!PendingDelegateChange_2:interface</p>


            <p>see also: dred-network-registry!RelativeDelegateLink_2:interface</p>


            <p>see also: dred-network-registry!tagOnly:type</p>


            <p>see also: dred-network-registry!CapoDatum$Ergo$DelegatedData:type</p>


            <p>see also: dred-network-registry!ErgoCapoActivity:type</p>


            <p>see also: dred-network-registry!ErgoCapoLifecycleActivity_2:type</p>


            <p>see also: dred-network-registry!ErgoDelegateRole_2:type</p>


            <p>see also: dred-network-registry!ErgoManifestActivity_2:type</p>


            <p>see also: dred-network-registry!ErgoManifestEntryType_2:type</p>


            <p>see also: dred-network-registry!ErgoPendingCharterChange_2:type</p>


            <p>see also: dred-network-registry!ErgoPendingDelegateAction_2:type</p>


        </div>

    );
}
    