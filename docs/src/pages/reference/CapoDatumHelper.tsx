import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>CapoDatumHelper</h2>
                    <ReactMarkdown>
                        {
                            "Helper class for generating InlineTxOutputDatum for variants of the ***CapoDatum*** enum type.\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#ScriptReference"><var>ScriptReference</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#CharterData"><var>CharterData()</var></a>, &nbsp;
                    <a href="#DelegatedData"><var>DelegatedData()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="ScriptReference"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "ScriptReference"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): InlineTxOutputDatum for ***\"CapoHelpers::CapoDatum.ScriptReference\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#1***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get ScriptReference(): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="CharterData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "CharterData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates InlineTxOutputDatum for ***\"CapoHelpers::CapoDatum.CharterData\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***CapoDatum$CharterDataLike*** is the same as the expanded field-types.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"CharterData(fields: "}<a href="#CapoDatum$CharterDataLike">{"CapoDatum$CharterDataLike"}</a>{" | {\n        spendDelegateLink: "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{";\n        spendInvariants: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{">;\n        otherNamedDelegates: "}<a href="#Map">{"Map"}</a>{"<string, "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{">;\n        mintDelegateLink: "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{";\n        mintInvariants: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{">;\n        govAuthorityLink: "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{";\n        manifest: "}<a href="#Map">{"Map"}</a>{"<string, "}<a href="#CapoManifestEntryLike">{"CapoManifestEntryLike"}</a>{">;\n        pendingChanges: "}<a href="#Array">{"Array"}</a>{"<"}<a href="#PendingCharterChangeLike">{"PendingCharterChangeLike"}</a>{">;\n    }"}{"): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="DelegatedData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "DelegatedData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates InlineTxOutputDatum for ***\"CapoHelpers::CapoDatum.DelegatedData\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***CapoDatum$DelegatedDataLike*** is the same as the expanded field-types.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"DelegatedData(fields: "}<a href="#CapoDatum$DelegatedDataLike">{"CapoDatum$DelegatedDataLike"}</a>{" | {\n        data: "}<a href="#Map">{"Map"}</a>{"<string, "}<a href="#UplcData">{"UplcData"}</a>{">;\n        version: "}<a href="#IntLike">{"IntLike"}</a>{";\n        otherDetails: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{"): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
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


        </div>

    );
}
    