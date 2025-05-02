import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>CapoActivityHelper</h2>
                    <ReactMarkdown>
                        {
                            "Helper class for generating UplcData for variants of the ***CapoActivity*** enum type.\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#addingSpendInvariant"><var>addingSpendInvariant</var></a>, &nbsp;
                    <a href="#capoLifecycleActivity"><var>capoLifecycleActivity</var></a>, &nbsp;
                    <a href="#retiringRefScript"><var>retiringRefScript</var></a>, &nbsp;
                    <a href="#spendingDelegatedDatum"><var>spendingDelegatedDatum</var></a>, &nbsp;
                    <a href="#updatingCharter"><var>updatingCharter</var></a>, &nbsp;
                    <a href="#usingAuthority"><var>usingAuthority</var></a>
            </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="addingSpendInvariant"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "addingSpendInvariant"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoHelpers::CapoActivity.addingSpendInvariant\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#3***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get addingSpendInvariant(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="capoLifecycleActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "capoLifecycleActivity"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "access to different variants of the ***nested CapoLifecycleActivity*** type needed for ***CapoActivity:capoLifecycleActivity***.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"get capoLifecycleActivity(): "}<a href="#CapoLifecycleActivityHelperNested">{"CapoLifecycleActivityHelperNested"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="retiringRefScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "retiringRefScript"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoHelpers::CapoActivity.retiringRefScript\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#2***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get retiringRefScript(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="spendingDelegatedDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "spendingDelegatedDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoHelpers::CapoActivity.spendingDelegatedDatum\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#4***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get spendingDelegatedDatum(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="updatingCharter"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "updatingCharter"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoHelpers::CapoActivity.updatingCharter\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#5***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get updatingCharter(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="usingAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "usingAuthority"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoHelpers::CapoActivity.usingAuthority\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#1***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get usingAuthority(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
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


        </div>

    );
}
    