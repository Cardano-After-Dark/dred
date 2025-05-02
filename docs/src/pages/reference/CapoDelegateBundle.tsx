import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>CapoDelegateBundle</h2>
                    <ReactMarkdown>
                        {
                            "for any Capo delegate; combines the BasicDelegate with a concrete specialization\n\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        
      
            <p>
                <b>Static / class methods: </b>
                                <a href="#usingCapoBundleClass"><var>usingCapoBundleClass()</var></a>
            </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#capoBundle"><var>capoBundle</var></a>, &nbsp;
                    <a href="#isConcrete"><var>isConcrete</var></a>, &nbsp;
                    <a href="#main"><var>main</var></a>, &nbsp;
                    <a href="#moduleName"><var>moduleName</var></a>, &nbsp;
                    <a href="#modules"><var>modules</var></a>, &nbsp;
                    <a href="#params"><var>params</var></a>, &nbsp;
                    <a href="#rev"><var>rev</var></a>, &nbsp;
                    <a href="#scriptParamsSource"><var>scriptParamsSource</var></a>, &nbsp;
                    <a href="#specializedDelegateModule"><var>specializedDelegateModule</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#getEffectiveModuleList"><var>getEffectiveModuleList()</var></a>, &nbsp;
                    <a href="#mkDelegateWrapper"><var>mkDelegateWrapper()</var></a>
        </p>


    <h3>Static / class methods</h3>
    <div className="prose">
        <a id="usingCapoBundleClass"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "usingCapoBundleClass"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates a CapoDelegateBundle subclass based on a specific CapoHeliosBundle class\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"static usingCapoBundleClass<THIS extends "}{"typeof "}<a href="#CapoDelegateBundle">{"CapoDelegateBundle"}</a>{", CB extends "}<a href="#CapoBundleClass">{"CapoBundleClass"}</a>{">(this: "}{"THIS"}{", c: "}{"CB"}{"): "}<a href="#ConcreteCapoDelegateBundle">{"ConcreteCapoDelegateBundle"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance properties</h3>
    <div className="prose">
        <a id="capoBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "capoBundle"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "when set to true, the controller class will include the Capo's gov authority in the transaction, to ease transaction setup.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nIf you set this to false, a delegated-data script will not require governance authority for its transactions, and you will need to explicitly enforce any user-level permissions needed for authorizing delegated-data transactions.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"capoBundle: "}<a href="#CapoHeliosBundle">{"CapoHeliosBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isConcrete"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isConcrete"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"isConcrete: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="main"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "main"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get main(): "}<a href="#Source">{"Source"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="moduleName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "moduleName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get moduleName(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="modules"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "modules"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get modules(): "}<a href="#Source">{"Source"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="params"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "params"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get params(): "}{"{\n        rev: bigint;\n        delegateName: string;\n        isMintDelegate: boolean;\n        isSpendDelegate: boolean;\n        isDgDataPolicy: boolean;\n        requiresGovAuthority: boolean;\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="rev"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "rev"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get rev(): "}{"bigint"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptParamsSource"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "scriptParamsSource"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"scriptParamsSource: "}{"\"bundle\" | \"config\""}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="specializedDelegateModule"></a>

            <div>
        <h4 style={{display: "inline-block"}}>  abstract  {
              "specializedDelegateModule"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"abstract specializedDelegateModule: "}<a href="#Source">{"Source"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="getEffectiveModuleList"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getEffectiveModuleList"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getEffectiveModuleList(): "}<a href="#Source">{"Source"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDelegateWrapper"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkDelegateWrapper"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkDelegateWrapper(moduleName: "}{"any"}{"): "}<a href="#Source">{"Source"}</a>{";"}
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


            <p>see also: dred-network-registry!CapoDatum$CharterDataLike_2:interface</p>


            <p>see also: dred-network-registry!PendingCharterChangeLike_2:type</p>


            <p>see also: dred-network-registry!CapoDatum$DelegatedDataLike:interface</p>


            <p>see also: dred-network-registry!CapoDelegateBundle:class</p>


            <p>see also: dred-network-registry!CapoBundleClass:type</p>


            <p>see also: dred-network-registry!ConcreteCapoDelegateBundle:type</p>


        </div>

    );
}
    