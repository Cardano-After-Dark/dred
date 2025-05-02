import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>CapoHeliosBundle</h2>
                    <ReactMarkdown>
                        {
                            "A set of Helios scripts that are used to define a Capo contract.\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis class is intended to be extended to provide a specific Capo contract.\n\nYou can inherit & augment `get sharedModules()` to make additional helios modules available for use in related contract scripts. Other bundles can include these modules only by naming them in their own `includeFromCapoModules()` method.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#isCapoBundle"><var>isCapoBundle</var></a>, &nbsp;
                    <a href="#isPreconfigured"><var>isPreconfigured</var></a>
          </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#bridgeClassName"><var>bridgeClassName</var></a>, &nbsp;
                    <a href="#capoBundle"><var>capoBundle</var></a>, &nbsp;
                    <a href="#configuredScriptDetails"><var>configuredScriptDetails</var></a>, &nbsp;
                    <a href="#datumTypeName"><var>datumTypeName</var></a>, &nbsp;
                    <a href="#hasAnyVariant"><var>hasAnyVariant</var></a>, &nbsp;
                    <a href="#isPrecompiled"><var>isPrecompiled</var></a>, &nbsp;
                    <a href="#main"><var>main</var></a>, &nbsp;
                    <a href="#modules"><var>modules</var></a>, &nbsp;
                    <a href="#params"><var>params</var></a>, &nbsp;
                    <a href="#preConfigured"><var>preConfigured</var></a>, &nbsp;
                    <a href="#requiresGovAuthority"><var>requiresGovAuthority</var></a>, &nbsp;
                    <a href="#scriptConfigs"><var>scriptConfigs</var></a>, &nbsp;
                    <a href="#scriptParamsSource"><var>scriptParamsSource</var></a>, &nbsp;
                    <a href="#sharedModules"><var>sharedModules</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#getEffectiveModuleList"><var>getEffectiveModuleList()</var></a>, &nbsp;
                    <a href="#getPreCompiledBundle"><var>getPreCompiledBundle()</var></a>, &nbsp;
                    <a href="#getPreconfiguredUplcParams"><var>getPreconfiguredUplcParams()</var></a>, &nbsp;
                    <a href="#init"><var>init()</var></a>, &nbsp;
                    <a href="#parseCapoJSONConfig"><var>parseCapoJSONConfig()</var></a>, &nbsp;
                    <a href="#parseCapoMinterJSONConfig"><var>parseCapoMinterJSONConfig()</var></a>
        </p>

    <h3>Static / class properties</h3>
    <div className="prose">
        <a id="isCapoBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "isCapoBundle"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static isCapoBundle: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isPreconfigured"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "isPreconfigured"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static isPreconfigured: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="bridgeClassName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "bridgeClassName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get bridgeClassName(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="capoBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "capoBundle"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"capoBundle: "}{"this"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="configuredScriptDetails"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "configuredScriptDetails"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"configuredScriptDetails?: "}<a href="#DeployedScriptDetails">{"DeployedScriptDetails"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="datumTypeName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "datumTypeName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"datumTypeName: "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="hasAnyVariant"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "hasAnyVariant"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get hasAnyVariant(): "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isPrecompiled"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "isPrecompiled"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get isPrecompiled(): "}{"boolean"}{";"}
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
{"get params(): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="preConfigured"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "preConfigured"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"preConfigured: "}<a href="#CapoDeployedDetails">{"CapoDeployedDetails"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="requiresGovAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "requiresGovAuthority"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"requiresGovAuthority: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptConfigs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "scriptConfigs"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get scriptConfigs(): "}{"void"}{";"}
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
{"scriptParamsSource: "}{"\"config\""}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="sharedModules"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "sharedModules"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "indicates a list of modules available for inclusion in Capo-connected scripts\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nSubclasses can implement this method to provide additional modules shareable to various Capo-connected scripts; those scripts need to include the modules by name in their `includeFromCapoModules()` method.\n\nSee the\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get sharedModules(): "}<a href="#Source">{"Source"}</a>{"[]"}{";"}
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
                "returns only the modules needed for the Capo contract\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\noverrides the base class's logic that references a connected Capo bundle - that policy is not needed here because this IS the Capo bundle.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"getEffectiveModuleList(): "}<a href="#Source">{"Source"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getPreCompiledBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getPreCompiledBundle"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getPreCompiledBundle(variant: "}{"string"}{"): "}<a href="#DeployedProgramBundle_2">{"DeployedProgramBundle_2"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getPreconfiguredUplcParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getPreconfiguredUplcParams"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getPreconfiguredUplcParams(variantName: "}{"string"}{"): "}<a href="#UplcRecord">{"UplcRecord"}</a>{"<any> | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="init"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "init"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"init(setupDetails: "}<a href="#StellarBundleSetupDetails">{"StellarBundleSetupDetails"}</a>{"<any>"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="parseCapoJSONConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "parseCapoJSONConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"parseCapoJSONConfig(config: "}{"any"}{"): "}<a href="#CapoConfig_2">{"CapoConfig_2"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="parseCapoMinterJSONConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "parseCapoMinterJSONConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"parseCapoMinterJSONConfig(config: "}{"any"}{"): "}{"{\n        seedTxn: "}<a href="#TxId">{"TxId"}</a>{";\n        seedIndex: bigint;\n    }"}{";"}
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


            <p>see also: dred-network-registry!DeployedScriptDetails:type</p>


            <p>see also: dred-network-registry!CapoDeployedDetails:type</p>


            <p>see also: dred-network-registry!StellarBundleSetupDetails:type</p>


        </div>

    );
}
    