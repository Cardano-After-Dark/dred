import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>DredCapo</h2>
                    <ReactMarkdown>
                        {
                            "\n"
                        }
                    </ReactMarkdown>

            <p></p>

        
      
            <p>
                <b>Instance properties: </b>
                                <a href="#autoSetup"><var>autoSetup</var></a>, &nbsp;
                    <a href="#defaultFeatureFlags"><var>defaultFeatureFlags</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#findNbhRegistryEntries"><var>findNbhRegistryEntries()</var></a>, &nbsp;
                    <a href="#findNodeOpEntries"><var>findNodeOpEntries()</var></a>, &nbsp;
                    <a href="#findSettingsInfo"><var>findSettingsInfo()</var></a>, &nbsp;
                    <a href="#getMintDelegate"><var>getMintDelegate()</var></a>, &nbsp;
                    <a href="#getNbhRegistryController"><var>getNbhRegistryController()</var></a>, &nbsp;
                    <a href="#getNodeRegistryController"><var>getNodeRegistryController()</var></a>, &nbsp;
                    <a href="#getSettingsController"><var>getSettingsController()</var></a>, &nbsp;
                    <a href="#getSpendDelegate"><var>getSpendDelegate()</var></a>, &nbsp;
                    <a href="#mkConfigData"><var>mkConfigData()</var></a>, &nbsp;
                    <a href="#mkInitialSettings"><var>mkInitialSettings()</var></a>, &nbsp;
                    <a href="#requirements"><var>requirements()</var></a>, &nbsp;
                    <a href="#scriptBundle"><var>scriptBundle()</var></a>, &nbsp;
                    <a href="#todoAddNamedDelegates"><var>todoAddNamedDelegates()</var></a>, &nbsp;
                    <a href="#txnMintingFungibleTokens"><var>txnMintingFungibleTokens()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="autoSetup"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "autoSetup"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"autoSetup: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="defaultFeatureFlags"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "defaultFeatureFlags"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get defaultFeatureFlags(): "}<a href="#DredCapoFeatures">{"DredCapoFeatures"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="findNbhRegistryEntries"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findNbhRegistryEntries"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds all the neighborhood-registration records\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"findNbhRegistryEntries(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<"}<a href="#ErgoNeighborhoodData">{"ErgoNeighborhoodData"}</a>{", unknown>[]>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findNodeOpEntries"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findNodeOpEntries"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds all the node-registration records\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis is a convenience method for finding all the node-registration records. It is equivalent to calling `findDelegatedDataUtxos` with the type `\"dredNode\"`.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"findNodeOpEntries(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<"}<a href="#NodeRegistrationData">{"NodeRegistrationData"}</a>{", unknown>[]>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findSettingsInfo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findSettingsInfo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "locates the current settings for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"findSettingsInfo(options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<"}<a href="#ErgoProtocolSettings">{"ErgoProtocolSettings"}</a>{", "}<a href="#ProtocolSettings">{"ProtocolSettings"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getMintDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the mint delegate for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getMintDelegate(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#MyMintSpendDelegate">{"MyMintSpendDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getNbhRegistryController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getNbhRegistryController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the neighborhood registry controller for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getNbhRegistryController(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#NeighborhoodController">{"NeighborhoodController"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getNodeRegistryController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getNodeRegistryController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the node registry controller for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getNodeRegistryController(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#NodeRegistryController">{"NodeRegistryController"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSettingsController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSettingsController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the settings controller for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getSettingsController(options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        optional?: true;\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#ProtocolSettingsController">{"ProtocolSettingsController"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSpendDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the spend delegate for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getSpendDelegate(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#MyMintSpendDelegate">{"MyMintSpendDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkConfigData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkConfigData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkConfigData(): "}{"import(\"@helios-lang/uplc\")."}<a href="#MapData">{"MapData"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkInitialSettings"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkInitialSettings"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates the initial settings for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"mkInitialSettings(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#minimalProtocolSettings">{"minimalProtocolSettings"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="requirements"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "requirements"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"requirements(): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "scriptBundle"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"scriptBundle(): "}<a href="#CapoHeliosBundle">{"CapoHeliosBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="todoAddNamedDelegates"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "todoAddNamedDelegates"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"todoAddNamedDelegates(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMintingFungibleTokens"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMintingFungibleTokens"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Mints fungible tokens under the Capo's minting policy\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"txnMintingFungibleTokens<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", tokenName: "}{"string | number[]"}{", tokenCount: "}{"bigint"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & import(\"@donecollectively/stellar-contracts\")."}<a href="#hasCharterRef">{"hasCharterRef"}</a>{" & import(\"@donecollectively/stellar-contracts\")."}<a href="#hasGovAuthority">{"hasGovAuthority"}</a>{">"}{";"}
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


            <p>see also: dred-network-registry!SeedActivity:class</p>


            <p>see also: dred-network-registry!DelegateRoleHelperNested_2:class</p>


            <p>see also: dred-network-registry!ManifestActivityHelperNested_2:class</p>


            <p>see also: dred-network-registry!CapoLifecycleActivity$CreatingDelegateLike_2_2:interface</p>


            <p>see also: dred-network-registry!CapoLifecycleActivity$forcingNewMintDelegateLike_2_2:interface</p>


            <p>see also: dred-network-registry!CapoLifecycleActivity$forcingNewSpendDelegateLike_2_2:interface</p>


            <p>see also: dred-network-registry!EnumBridge:class</p>


            <p>see also: dred-network-registry!JustAnEnum_3:type</p>



        <div>
            <div>
            <h4>DelegateRoleHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>ManifestActivityHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$CreatingDelegateLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewMintDelegateLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewSpendDelegateLike_3:interface<br/>



        <div>
            <div>
            <h4>DelegateRoleHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>ManifestActivityHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!CapoLifecycleActivity$CreatingDelegateLike:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!CapoLifecycleActivity$forcingNewMintDelegateLike:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!CapoLifecycleActivity$forcingNewSpendDelegateLike:interface<br/>



        <div>
            <div>
            <h4>DelegateRoleHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>ManifestActivityHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$CreatingDelegateLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewMintDelegateLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewSpendDelegateLike_4:interface<br/>



        <div>
            <div>
            <h4>DelegateRoleHelperNested_6</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>ManifestActivityHelperNested_6</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$CreatingDelegateLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewMintDelegateLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewSpendDelegateLike_5:interface<br/>


            <p>see also: dred-network-registry!DelegateRoleHelperNested:class</p>


            <p>see also: dred-network-registry!ManifestActivityHelperNested:class</p>


            <p>see also: dred-network-registry!CapoLifecycleActivity$CreatingDelegateLike_2:interface</p>


            <p>see also: dred-network-registry!CapoLifecycleActivity$forcingNewMintDelegateLike_2:interface</p>


            <p>see also: dred-network-registry!CapoLifecycleActivity$forcingNewSpendDelegateLike_2:interface</p>


            <p>see also: dred-network-registry!ActivityDelegateRoleHelperNested_2:class</p>



        <div>
            <div>
            <h4>ActivityDelegateRoleHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$CreatingDelegateLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewMintDelegateLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewSpendDelegateLike_3:interface<br/>



        <div>
            <div>
            <h4>ActivityDelegateRoleHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!CapoLifecycleActivity$CreatingDelegateLike:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!CapoLifecycleActivity$forcingNewMintDelegateLike:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!CapoLifecycleActivity$forcingNewSpendDelegateLike:interface<br/>



        <div>
            <div>
            <h4>ActivityDelegateRoleHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$CreatingDelegateLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewMintDelegateLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewSpendDelegateLike_4:interface<br/>



        <div>
            <div>
            <h4>ActivityDelegateRoleHelperNested_6</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/CapoLifecycleActivity$CreatingDelegateLike">CapoLifecycleActivity$CreatingDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$CreatingDelegateLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewMintDelegateLike">CapoLifecycleActivity$forcingNewMintDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewMintDelegateLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoLifecycleActivity$forcingNewSpendDelegateLike">CapoLifecycleActivity$forcingNewSpendDelegateLike</a> = dred-network-registry!~CapoLifecycleActivity$forcingNewSpendDelegateLike_5:interface<br/>


            <p>see also: dred-network-registry!ActivityDelegateRoleHelperNested:class</p>


            <p>see also: dred-network-registry!valuesEntry:type</p>


            <p>see also: dred-network-registry!CapoMinterDataBridge:class</p>


            <p>see also: dred-network-registry!MintCharterActivityArgs:type</p>


            <p>see also: dred-network-registry!MinterActivityHelper:class</p>


            <p>see also: dred-network-registry!CapoMinterDataBridgeReader:class</p>


            <p>see also: dred-network-registry!RelativeDelegateLinkLike_2_2:interface</p>


            <p>see also: dred-network-registry!RelativeDelegateLink_2_2:interface</p>


            <p>see also: dred-network-registry!ErgoMinterActivity:type</p>


            ?? unknown type: <a href="doc/cctx_CharterInputType$InputLike">cctx_CharterInputType$InputLike</a> = dred-network-registry!~cctx_CharterInputType$InputLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!~CapoDatum$CharterDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputType$RefInputLike">cctx_CharterInputType$RefInputLike</a> = dred-network-registry!~cctx_CharterInputType$RefInputLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!~CapoDatum$CharterDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputType$InputLike">cctx_CharterInputType$InputLike</a> = dred-network-registry!cctx_CharterInputType$InputLike:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!CapoDatum$CharterDataLike:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputType$RefInputLike">cctx_CharterInputType$RefInputLike</a> = dred-network-registry!cctx_CharterInputType$RefInputLike:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!CapoDatum$CharterDataLike:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputType$InputLike">cctx_CharterInputType$InputLike</a> = dred-network-registry!~cctx_CharterInputType$InputLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!~CapoDatum$CharterDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputType$RefInputLike">cctx_CharterInputType$RefInputLike</a> = dred-network-registry!~cctx_CharterInputType$RefInputLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!~CapoDatum$CharterDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputType$InputLike">cctx_CharterInputType$InputLike</a> = dred-network-registry!~cctx_CharterInputType$InputLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!~CapoDatum$CharterDataLike_5:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputType$RefInputLike">cctx_CharterInputType$RefInputLike</a> = dred-network-registry!~cctx_CharterInputType$RefInputLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$CharterDataLike">CapoDatum$CharterDataLike</a> = dred-network-registry!~CapoDatum$CharterDataLike_5:interface<br/>


            <p>see also: dred-network-registry!cctx_CharterInputType$InputLike_2:interface</p>


            <p>see also: dred-network-registry!CapoDatum$CharterDataLike_2_2:interface</p>


            <p>see also: dred-network-registry!cctx_CharterInputType$RefInputLike_2:interface</p>


            <p>see also: dred-network-registry!GenericDelegateBridge:type</p>


            <p>see also: dred-network-registry!MintUutActivityArgs:type</p>


            <p>see also: dred-network-registry!DataBridge:class</p>


            <p>see also: dred-network-registry!readsUplcData:type</p>


            <p>see also: dred-network-registry!DataBridgeReaderClass:class</p>


            <p>see also: dred-network-registry!readsUplcTo:type</p>



        <div>
            <div>
            <h4>BurningActivityHelperNested_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>DelegateLifecycleActivityHelperNested_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>MintingActivityHelperNested_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>SpendingActivityHelperNested_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/DelegateActivity$CreatingDelegatedDataLike">DelegateActivity$CreatingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$CreatingDelegatedDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$DeletingDelegatedDataLike">DelegateActivity$DeletingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$DeletingDelegatedDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$UpdatingDelegatedDataLike">DelegateActivity$UpdatingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$UpdatingDelegatedDataLike_3:interface<br/>



        <div>
            <div>
            <h4>BurningActivityHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>DelegateLifecycleActivityHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>MintingActivityHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>SpendingActivityHelperNested_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/DelegateActivity$CreatingDelegatedDataLike">DelegateActivity$CreatingDelegatedDataLike</a> = dred-network-registry!DelegateActivity$CreatingDelegatedDataLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$DeletingDelegatedDataLike">DelegateActivity$DeletingDelegatedDataLike</a> = dred-network-registry!DelegateActivity$DeletingDelegatedDataLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$UpdatingDelegatedDataLike">DelegateActivity$UpdatingDelegatedDataLike</a> = dred-network-registry!DelegateActivity$UpdatingDelegatedDataLike:interface<br/>



        <div>
            <div>
            <h4>BurningActivityHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>DelegateLifecycleActivityHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>MintingActivityHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>SpendingActivityHelperNested_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/DelegateActivity$CreatingDelegatedDataLike">DelegateActivity$CreatingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$CreatingDelegatedDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$DeletingDelegatedDataLike">DelegateActivity$DeletingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$DeletingDelegatedDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$UpdatingDelegatedDataLike">DelegateActivity$UpdatingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$UpdatingDelegatedDataLike_4:interface<br/>



        <div>
            <div>
            <h4>BurningActivityHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelperNested_6</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>DelegateLifecycleActivityHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateLifecycleActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>MintingActivityHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***MintingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>SpendingActivityHelperNested_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***SpendingActivity*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/DelegateActivity$CreatingDelegatedDataLike">DelegateActivity$CreatingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$CreatingDelegatedDataLike_5:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$DeletingDelegatedDataLike">DelegateActivity$DeletingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$DeletingDelegatedDataLike_5:interface<br/>


            ?? unknown type: <a href="doc/DelegateActivity$UpdatingDelegatedDataLike">DelegateActivity$UpdatingDelegatedDataLike</a> = dred-network-registry!~DelegateActivity$UpdatingDelegatedDataLike_5:interface<br/>


            <p>see also: dred-network-registry!BurningActivityHelperNested:class</p>


            <p>see also: dred-network-registry!CapoLifecycleActivityHelperNested_2:class</p>


            <p>see also: dred-network-registry!DelegateLifecycleActivityHelperNested:class</p>


            <p>see also: dred-network-registry!MintingActivityHelperNested:class</p>


            <p>see also: dred-network-registry!SpendingActivityHelperNested:class</p>


            <p>see also: dred-network-registry!DelegateActivity$CreatingDelegatedDataLike_2:interface</p>


            <p>see also: dred-network-registry!DelegateActivity$DeletingDelegatedDataLike_2:interface</p>


            <p>see also: dred-network-registry!DelegateActivity$UpdatingDelegatedDataLike_2:interface</p>


            ?? unknown type: <a href="doc/DelegateDatum$capoStoredDataLike">DelegateDatum$capoStoredDataLike</a> = dred-network-registry!~DelegateDatum$capoStoredDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Cip68RefTokenLike">DelegateDatum$Cip68RefTokenLike</a> = dred-network-registry!~DelegateDatum$Cip68RefTokenLike_3:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$capoStoredDataLike">DelegateDatum$capoStoredDataLike</a> = dred-network-registry!DelegateDatum$capoStoredDataLike:interface<br/>


            ?? unknown type: <a href="doc/NodeRegistrationDataLike">NodeRegistrationDataLike</a> = dred-network-registry!NodeRegistrationDataLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Cip68RefTokenLike">DelegateDatum$Cip68RefTokenLike</a> = dred-network-registry!DelegateDatum$Cip68RefTokenLike:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!AnyDataLike:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!DelegationDetailLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$capoStoredDataLike">DelegateDatum$capoStoredDataLike</a> = dred-network-registry!~DelegateDatum$capoStoredDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodDataLike">NeighborhoodDataLike</a> = dred-network-registry!~NeighborhoodDataLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Cip68RefTokenLike">DelegateDatum$Cip68RefTokenLike</a> = dred-network-registry!~DelegateDatum$Cip68RefTokenLike_4:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$capoStoredDataLike">DelegateDatum$capoStoredDataLike</a> = dred-network-registry!~DelegateDatum$capoStoredDataLike_5:interface<br/>


            ?? unknown type: <a href="doc/ProtocolSettingsLike">ProtocolSettingsLike</a> = dred-network-registry!~ProtocolSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Cip68RefTokenLike">DelegateDatum$Cip68RefTokenLike</a> = dred-network-registry!~DelegateDatum$Cip68RefTokenLike_5:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_5:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_5:interface<br/>


            <p>see also: dred-network-registry!DelegateDatum$capoStoredDataLike_2:interface</p>


            <p>see also: dred-network-registry!AnyDataLike_2_2:interface</p>


            <p>see also: dred-network-registry!DelegateDatum$Cip68RefTokenLike_2:interface</p>


            <p>see also: dred-network-registry!DelegationDetailLike_2:interface</p>


            <p>see also: dred-network-registry!minimalData:type</p>


            <p>see also: dred-network-registry!InlineDatum:type</p>


            <p>see also: dred-network-registry!DgDataCreationOptions:type</p>


            <p>see also: dred-network-registry!DgDataUpdateOptions:type</p>


            <p>see also: dred-network-registry!ReqtsMap_2:type</p>


            <p>see also: dred-network-registry!DelegatedDatumIdPrefix:type</p>


            <p>see also: dred-network-registry!CoreDgDataCreationOptions:type</p>


            <p>see also: dred-network-registry!hasRecId:type</p>


            <p>see also: dred-network-registry!CoreDgDataUpdateOptions:type</p>


            <p>see also: dred-network-registry!seedActivityFunc:type</p>


            <p>see also: dred-network-registry!SeedActivityArg:type</p>


            <p>see also: dred-network-registry!updateActivityFunc:type</p>


            <p>see also: dred-network-registry!UpdateActivityArgs:type</p>


            <p>see also: dred-network-registry!UpdateActivity:class</p>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!~DelegateLifecycleActivity$ReplacingMeLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!DelegateLifecycleActivity$ReplacingMeLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!~DelegateLifecycleActivity$ReplacingMeLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!~DelegateLifecycleActivity$ReplacingMeLike_5:interface<br/>


            <p>see also: dred-network-registry!DelegateLifecycleActivity$ReplacingMeLike_2:interface</p>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!~DelegateLifecycleActivity$ReplacingMeLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!DelegateLifecycleActivity$ReplacingMeLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!~DelegateLifecycleActivity$ReplacingMeLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegateLifecycleActivity$ReplacingMeLike">DelegateLifecycleActivity$ReplacingMeLike</a> = dred-network-registry!~DelegateLifecycleActivity$ReplacingMeLike_5:interface<br/>


            ?? unknown type: <a href="doc/dgd_DataSrc$BothLike">dgd_DataSrc$BothLike</a> = dred-network-registry!~dgd_DataSrc$BothLike_2:interface<br/>


            ?? unknown type: <a href="doc/dgd_DataSrc$BothLike">dgd_DataSrc$BothLike</a> = dred-network-registry!dgd_DataSrc$BothLike:interface<br/>


            ?? unknown type: <a href="doc/DredCapoFeatures">DredCapoFeatures</a> = dred-network-registry!~DredCapoFeatures:type<br/>


            ?? unknown type: <a href="doc/ErgoNeighborhoodData">ErgoNeighborhoodData</a> = dred-network-registry!~ErgoNeighborhoodData_2:type<br/>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!~NodeRegistrationData_2:interface<br/>


            ?? unknown type: <a href="doc/ErgoProtocolSettings">ErgoProtocolSettings</a> = dred-network-registry!~ErgoProtocolSettings:type<br/>


            ?? unknown type: <a href="doc/ProtocolSettings">ProtocolSettings</a> = dred-network-registry!~ProtocolSettings:interface<br/>


            ?? unknown type: <a href="doc/CapoDatum$Ergo$CharterData">CapoDatum$Ergo$CharterData</a> = dred-network-registry!~CapoDatum$Ergo$CharterData_3:type<br/>



        <div>
            <div>
            <h4>MyMintSpendDelegate</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            ?? unknown type: <a href="doc/CapoDatum$Ergo$CharterData">CapoDatum$Ergo$CharterData</a> = dred-network-registry!~CapoDatum$Ergo$CharterData_3:type<br/>


            ?? unknown type: <a href="doc/ErgoNeighborhoodData">ErgoNeighborhoodData</a> = dred-network-registry!~ErgoNeighborhoodData:type<br/>


            ?? unknown type: <a href="doc/NeighborhoodDataLike">NeighborhoodDataLike</a> = dred-network-registry!~NeighborhoodDataLike:interface<br/>



        <div>
            <div>
            <h4>NeighborhoodController</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            ?? unknown type: <a href="doc/CapoDatum$Ergo$CharterData">CapoDatum$Ergo$CharterData</a> = dred-network-registry!~CapoDatum$Ergo$CharterData_3:type<br/>


            ?? unknown type: <a href="doc/ErgoNodeRegistrationData">ErgoNodeRegistrationData</a> = dred-network-registry!ErgoNodeRegistrationData:type<br/>


            ?? unknown type: <a href="doc/NodeRegistrationDataLike">NodeRegistrationDataLike</a> = dred-network-registry!NodeRegistrationDataLike:interface<br/>



        <div>
            <div>
            <h4>NodeRegistryController</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            ?? unknown type: <a href="doc/ProtocolSettings">ProtocolSettings</a> = dred-network-registry!~ProtocolSettings:interface<br/>


            ?? unknown type: <a href="doc/ProtocolSettingsLike">ProtocolSettingsLike</a> = dred-network-registry!~ProtocolSettingsLike:interface<br/>



        <div>
            <div>
            <h4>ProtocolSettingsController</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            ?? unknown type: <a href="doc/CapoDatum$Ergo$CharterData">CapoDatum$Ergo$CharterData</a> = dred-network-registry!~CapoDatum$Ergo$CharterData_3:type<br/>


            ?? unknown type: <a href="doc/minimalProtocolSettings">minimalProtocolSettings</a> = dred-network-registry!~minimalProtocolSettings:type<br/>


        </div>

    );
}
    