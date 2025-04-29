import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>CapoDataBridge</h2>
                    <ReactMarkdown>
                        {
                            "GENERATED data bridge for **Capo** script (defined in class ***CapoHeliosBundle***) main: **src/DefaultCapo.hl**, project: **stellar-contracts**\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis class doesn't need to be used directly. Its methods are available through the ***contract's methods***: - `get mkDatum` - returns the datum-building bridge for the contract's datum type - `get activity` - returns an activity-building bridge for the contract's activity type - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script The advanced methods are not typically needed - mkDatum and activity should normally provide all the type-safe data-encoding needed for the contract. For reading on-chain data, the Capo's `findDelegatedDataUtxos()` method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.\n\n##### customizing the bridge class name Note that you may override `get dataBridgeName() { return \"...\" }` to customize the name of this bridge class\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#isAbstract"><var>isAbstract</var></a>
          </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#activity"><var>activity</var></a>, &nbsp;
                    <a href="#CapoActivity"><var>CapoActivity</var></a>, &nbsp;
                    <a href="#CapoDatum"><var>CapoDatum</var></a>, &nbsp;
                    <a href="#datum"><var>datum</var></a>, &nbsp;
                    <a href="#isAbstract"><var>isAbstract</var></a>, &nbsp;
                    <a href="#readDatum"><var>readDatum</var></a>, &nbsp;
                    <a href="#reader"><var>reader</var></a>, &nbsp;
                    <a href="#types"><var>types</var></a>, &nbsp;
                    <a href="#ᱺᱺAnyDataCast"><var>ᱺᱺAnyDataCast</var></a>, &nbsp;
                    <a href="#ᱺᱺCapoManifestEntryCast"><var>ᱺᱺCapoManifestEntryCast</var></a>, &nbsp;
                    <a href="#ᱺᱺPendingDelegateChangeCast"><var>ᱺᱺPendingDelegateChangeCast</var></a>, &nbsp;
                    <a href="#ᱺᱺRelativeDelegateLinkCast"><var>ᱺᱺRelativeDelegateLinkCast</var></a>
            </p>

    <h3>Static / class properties</h3>
    <div className="prose">
        <a id="isAbstract"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "isAbstract"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static isAbstract: "}{"false"}{";"}
            </code></pre>
    
    </div>
    



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="activity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activity"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates UplcData for the activity type (***CapoActivity***) for the `Capo` script\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"activity: "}<a href="#CapoActivityHelper">{"CapoActivityHelper"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="CapoActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CapoActivity"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"CapoActivity: "}<a href="#CapoActivityHelper">{"CapoActivityHelper"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="CapoDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CapoDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "this is the specific type of datum for the `Capo` script\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"CapoDatum: "}<a href="#CapoDatumHelper">{"CapoDatumHelper"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="datum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "datum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Helper class for generating TxOutputDatum for the ***datum type (CapoDatum)*** for this contract script.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"datum: "}<a href="#CapoDatumHelper">{"CapoDatumHelper"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isAbstract"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isAbstract"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"isAbstract: "}{"false"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="readDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "readDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"readDatum: "}{"(d: "}<a href="#UplcData">{"UplcData"}</a>{") => "}<a href="#ErgoCapoDatum">{"ErgoCapoDatum"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="reader"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "reader"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"reader: "}<a href="#CapoDataBridgeReader">{"CapoDataBridgeReader"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="types"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "types"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "accessors for all the types defined in the `Capo` script\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- these accessors are used to generate UplcData for each type\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"types: "}{"{\n        DelegateRole: "}<a href="#DelegateRoleHelper">{"DelegateRoleHelper"}</a>{";\n        ManifestEntryType: "}<a href="#ManifestEntryTypeHelper">{"ManifestEntryTypeHelper"}</a>{";\n        PendingDelegateAction: "}<a href="#PendingDelegateActionHelper">{"PendingDelegateActionHelper"}</a>{";\n        ManifestActivity: "}<a href="#ManifestActivityHelper">{"ManifestActivityHelper"}</a>{";\n        PendingCharterChange: "}<a href="#PendingCharterChangeHelper">{"PendingCharterChangeHelper"}</a>{";\n        CapoDatum: "}<a href="#CapoDatumHelper">{"CapoDatumHelper"}</a>{";\n        CapoLifecycleActivity: "}<a href="#CapoLifecycleActivityHelper">{"CapoLifecycleActivityHelper"}</a>{";\n        CapoActivity: "}<a href="#CapoActivityHelper">{"CapoActivityHelper"}</a>{";\n        RelativeDelegateLink: (fields: "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{" | {\n            uutName: string;\n            delegateValidatorHash: /*minStructField*/ "}<a href="#ValidatorHash">{"ValidatorHash"}</a>{" | string | number[] | undefined;\n            config: number[];\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        CapoManifestEntry: (fields: "}<a href="#CapoManifestEntryLike">{"CapoManifestEntryLike"}</a>{" | {\n            entryType: "}<a href="#ManifestEntryTypeLike">{"ManifestEntryTypeLike"}</a>{";\n            tokenName: number[];\n            mph: /*minStructField*/ "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | string | number[] | undefined;\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        PendingDelegateChange: (fields: "}<a href="#PendingDelegateChangeLike">{"PendingDelegateChangeLike"}</a>{" | {\n            action: "}<a href="#PendingDelegateActionLike">{"PendingDelegateActionLike"}</a>{";\n            role: "}<a href="#DelegateRoleLike">{"DelegateRoleLike"}</a>{";\n            dgtLink: /*minStructField*/ "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{" | undefined;\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n        AnyData: (fields: "}<a href="#AnyDataLike">{"AnyDataLike"}</a>{" | {\n            id: number[];\n            type: string;\n        }) => "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="ᱺᱺAnyDataCast"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "ᱺᱺAnyDataCast"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "uses unicode U+1c7a - sorts to the end\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"ᱺᱺAnyDataCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#AnyData">{"AnyData"}</a>{", "}<a href="#AnyDataLike">{"AnyDataLike"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="ᱺᱺCapoManifestEntryCast"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "ᱺᱺCapoManifestEntryCast"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "uses unicode U+1c7a - sorts to the end\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"ᱺᱺCapoManifestEntryCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#CapoManifestEntry">{"CapoManifestEntry"}</a>{", "}<a href="#CapoManifestEntryLike">{"CapoManifestEntryLike"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="ᱺᱺPendingDelegateChangeCast"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "ᱺᱺPendingDelegateChangeCast"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "uses unicode U+1c7a - sorts to the end\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"ᱺᱺPendingDelegateChangeCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#PendingDelegateChange">{"PendingDelegateChange"}</a>{", "}<a href="#PendingDelegateChangeLike">{"PendingDelegateChangeLike"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="ᱺᱺRelativeDelegateLinkCast"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "ᱺᱺRelativeDelegateLinkCast"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "uses unicode U+1c7a - sorts to the end\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"ᱺᱺRelativeDelegateLinkCast: "}<a href="#Cast">{"Cast"}</a>{"<"}<a href="#RelativeDelegateLink">{"RelativeDelegateLink"}</a>{", "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{">"}{";"}
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


        </div>

    );
}
    