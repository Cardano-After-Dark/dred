import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>CapoLifecycleActivityHelperNested_6</h2>
                    <ReactMarkdown>
                        {
                            "Helper class for generating UplcData for variants of the ***CapoLifecycleActivity*** enum type.\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#$seeded$CreatingDelegate"><var>$seeded$CreatingDelegate</var></a>, &nbsp;
                    <a href="#$seeded$forcingNewMintDelegate"><var>$seeded$forcingNewMintDelegate</var></a>, &nbsp;
                    <a href="#$seeded$forcingNewSpendDelegate"><var>$seeded$forcingNewSpendDelegate</var></a>, &nbsp;
                    <a href="#commitPendingChanges"><var>commitPendingChanges</var></a>, &nbsp;
                    <a href="#queuePendingChange"><var>queuePendingChange</var></a>, &nbsp;
                    <a href="#removePendingChange"><var>removePendingChange</var></a>, &nbsp;
                    <a href="#updatingManifest"><var>updatingManifest</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#CreatingDelegate"><var>CreatingDelegate()</var></a>, &nbsp;
                    <a href="#CreatingDelegate"><var>CreatingDelegate()</var></a>, &nbsp;
                    <a href="#forcingNewMintDelegate"><var>forcingNewMintDelegate()</var></a>, &nbsp;
                    <a href="#forcingNewMintDelegate"><var>forcingNewMintDelegate()</var></a>, &nbsp;
                    <a href="#forcingNewSpendDelegate"><var>forcingNewSpendDelegate()</var></a>, &nbsp;
                    <a href="#forcingNewSpendDelegate"><var>forcingNewSpendDelegate()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="$seeded$CreatingDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$seeded$CreatingDelegate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate\"***,\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n##### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ##### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n\n#### Usage 1. Call the `$seeded$CreatingDelegate({ purpose })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method. ##### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"$seeded$CreatingDelegate: "}{"(fields: {\n        purpose: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n    }) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$seeded$forcingNewMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$seeded$forcingNewMintDelegate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate\"***,\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n##### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ##### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n\n#### Usage 1. Call the `$seeded$forcingNewMintDelegate({ purpose })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method. ##### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"$seeded$forcingNewMintDelegate: "}{"(fields: {\n        purpose: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n    }) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$seeded$forcingNewSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$seeded$forcingNewSpendDelegate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate\"***,\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n##### Seeded activity This activity uses the pattern of spending a utxo to provide a uniqueness seed. ##### Activity contains implied seed Creates a SeedActivity based on the provided args, reserving space for a seed to be provided implicitly by a SeedActivity-supporting library function.\n\n#### Usage 1. Call the `$seeded$forcingNewSpendDelegate({ purpose })` method with the indicated (non-seed) details. 2. Use the resulting activity in a seed-providing context, such as the delegated-data-controller's `mkTxnCreateRecord({activity})` method. ##### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"$seeded$forcingNewSpendDelegate: "}{"(fields: {\n        purpose: string;\n    }) => import(\"@donecollectively/stellar-contracts\")."}<a href="#SeedActivity">{"SeedActivity"}</a>{"<(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: {\n        purpose: string;\n    }) => "}<a href="#isActivity">{"isActivity"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="commitPendingChanges"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "commitPendingChanges"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.commitPendingChanges\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#3***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get commitPendingChanges(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="queuePendingChange"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "queuePendingChange"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.queuePendingChange\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#1***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get queuePendingChange(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="removePendingChange"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "removePendingChange"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "access to different variants of the ***nested DelegateRole*** type needed for ***CapoLifecycleActivity:removePendingChange***.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"get removePendingChange(): "}<a href="#ActivityDelegateRoleHelperNested">{"ActivityDelegateRoleHelperNested"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="updatingManifest"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "updatingManifest"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "access to different variants of the ***nested ManifestActivity*** type needed for ***CapoLifecycleActivity:updatingManifest***.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"get updatingManifest(): "}<a href="#ManifestActivityHelperNested">{"ManifestActivityHelperNested"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="CreatingDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CreatingDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate\"***, given a transaction-context ***with a seed utxo*** and other field details\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nSee the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$CreatingDelegate}` for use in a context providing an implicit seed utxo. ##### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"CreatingDelegate(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="CreatingDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CreatingDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.CreatingDelegate\"*** with raw seed details included in fields.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"CreatingDelegate(fields: "}<a href="#CapoLifecycleActivity$CreatingDelegateLike">{"CapoLifecycleActivity$CreatingDelegateLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="forcingNewMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "forcingNewMintDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate\"***, given a transaction-context ***with a seed utxo*** and other field details\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nSee the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$forcingNewMintDelegate}` for use in a context providing an implicit seed utxo. ##### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"forcingNewMintDelegate(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="forcingNewMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "forcingNewMintDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewMintDelegate\"*** with raw seed details included in fields.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"forcingNewMintDelegate(fields: "}<a href="#CapoLifecycleActivity$forcingNewMintDelegateLike">{"CapoLifecycleActivity$forcingNewMintDelegateLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="forcingNewSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "forcingNewSpendDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate\"***, given a transaction-context ***with a seed utxo*** and other field details\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nSee the `tcxWithSeedUtxo()` method in your contract's off-chain StellarContracts subclass to create a context satisfying `hasSeed`. See `$seeded$forcingNewSpendDelegate}` for use in a context providing an implicit seed utxo. ##### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"forcingNewSpendDelegate(value: "}<a href="#hasSeed">{"hasSeed"}</a>{", fields: "}{"{\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="forcingNewSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "forcingNewSpendDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::CapoLifecycleActivity.forcingNewSpendDelegate\"*** with raw seed details included in fields.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"forcingNewSpendDelegate(fields: "}<a href="#CapoLifecycleActivity$forcingNewSpendDelegateLike">{"CapoLifecycleActivity$forcingNewSpendDelegateLike"}</a>{" | {\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{" | string;\n        purpose: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
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


        </div>

    );
}
    