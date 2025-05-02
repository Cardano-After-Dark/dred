import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>StellarDelegate</h2>
                    <ReactMarkdown>
                        {
                            "Base class for modules that can serve as Capo delegates\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nestablishes a base protocol for delegates.\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#currentRev"><var>currentRev</var></a>, &nbsp;
                    <a href="#defaultParams"><var>defaultParams</var></a>
          </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#authorityTokenName"><var>authorityTokenName</var></a>, &nbsp;
                    <a href="#dataBridgeClass"><var>dataBridgeClass</var></a>, &nbsp;
                    <a href="#delegateValidatorHash"><var>delegateValidatorHash</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#DelegateAddsAuthorityToken"><var>DelegateAddsAuthorityToken()</var></a>, &nbsp;
                    <a href="#DelegateMustFindAuthorityToken"><var>DelegateMustFindAuthorityToken()</var></a>, &nbsp;
                    <a href="#delegateRequirements"><var>delegateRequirements()</var></a>, &nbsp;
                    <a href="#DelegateRetiresAuthorityToken"><var>DelegateRetiresAuthorityToken()</var></a>, &nbsp;
                    <a href="#mkAuthorityTokenPredicate"><var>mkAuthorityTokenPredicate()</var></a>, &nbsp;
                    <a href="#tvAuthorityToken"><var>tvAuthorityToken()</var></a>, &nbsp;
                    <a href="#txnGrantAuthority"><var>txnGrantAuthority()</var></a>, &nbsp;
                    <a href="#txnReceiveAuthorityToken"><var>txnReceiveAuthorityToken()</var></a>, &nbsp;
                    <a href="#txnRetireAuthorityToken"><var>txnRetireAuthorityToken()</var></a>
        </p>

    <h3>Static / class properties</h3>
    <div className="prose">
        <a id="currentRev"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "currentRev"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static currentRev: "}{"bigint"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="defaultParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static   readonly {
              "defaultParams"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static get defaultParams(): "}{"{\n        rev: bigint;\n    }"}{";"}
            </code></pre>
    
    </div>
    



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="authorityTokenName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "authorityTokenName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get authorityTokenName(): "}{"number[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="dataBridgeClass"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "dataBridgeClass"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"dataBridgeClass: "}<a href="#AbstractNew">{"AbstractNew"}</a>{"<"}<a href="#ContractDataBridgeWithEnumDatum">{"ContractDataBridgeWithEnumDatum"}</a>{"> | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="delegateValidatorHash"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "delegateValidatorHash"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get delegateValidatorHash(): "}<a href="#ValidatorHash">{"ValidatorHash"}</a>{" | undefined"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="DelegateAddsAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>  abstract  {
              "DelegateAddsAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds the delegate's authority token to a transaction\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nGiven a delegate already configured by a Capo, this method implements transaction-building logic needed to include the UUT into the `tcx`. the `utxo` is discovered by {@link StellarDelegate.DelegateMustFindAuthorityToken | DelegateMustFindAuthorityToken()}\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"abstract DelegateAddsAuthorityToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", uutxo: "}<a href="#TxInput">{"TxInput"}</a>{", redeemer?: "}<a href="#isActivity">{"isActivity"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="DelegateMustFindAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>  abstract  {
              "DelegateMustFindAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds the delegate authority token, normally in the delegate's contract address\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThe default implementation finds the UTxO having the authority token in the delegate's contract address.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"abstract DelegateMustFindAuthorityToken(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", label: "}{"string"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="delegateRequirements"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "delegateRequirements"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Captures requirements as data\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nsee reqts structure\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"delegateRequirements(): "}<a href="#ReqtsMap_3">{"ReqtsMap_3"}</a>{"<\"provides an interface for providing arms-length proof of authority to any other contract\" | \"implementations SHOULD positively govern spend of the UUT\" | \"implementations MUST provide an essential interface for transaction-building\" | \"requires a txnReceiveAuthorityToken(tcx, delegateAddr, fromFoundUtxo?)\" | \"requires a mustFindAuthorityToken(tcx)\" | \"requires a txnGrantAuthority(tcx, delegateAddr, fromFoundUtxo)\" | \"requires txnRetireCred(tcx, fromFoundUtxo)\", never>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="DelegateRetiresAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>  abstract  {
              "DelegateRetiresAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds any important transaction elemements supporting the authority token being retired, closing the delegate contracts' utxo.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nEXPECTS to receive a Utxo having the result of txnMustFindAuthorityToken()\n\nEXPECTS the `burn` instruction to be separately added to the transaction.\n\nThe default implementation uses the conventional `Retiring` activity to spend the token.\n\n@reqt It MUST add the indicated utxo to the transaction as an input\n\n@reqt When backed by a contract: * it should use an activity/redeemer allowing the token to be spent **and NOT returned**. * the contract script SHOULD ensure any other UTXOs it may also hold, related to this delegation, do not become inaccessible as a result.\n\nIt MAY enforce additional requirements and/or block the action.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"abstract DelegateRetiresAuthorityToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", fromFoundUtxo: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkAuthorityTokenPredicate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkAuthorityTokenPredicate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkAuthorityTokenPredicate(): "}<a href="#tokenPredicate_2">{"tokenPredicate_2"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tvAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tvAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tvAuthorityToken(useMinTv?: "}{"boolean"}{"): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnGrantAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnGrantAuthority"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and adds the delegate's authority token to the transaction\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\ncalls the delegate-specific DelegateAddsAuthorityToken() method, with the uut found by DelegateMustFindAuthorityToken().\n\nreturns the token back to the contract using {@link StellarDelegate.txnReceiveAuthorityToken | txnReceiveAuthorityToken()}\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnGrantAuthority<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", redeemer?: "}<a href="#isActivity">{"isActivity"}</a>{", skipReturningDelegate?: "}{"\"skipDelegateReturn\""}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnReceiveAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>  abstract  {
              "txnReceiveAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Standard delegate method for receiving the authority token as a txn output\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\ncreates a UTxO / TxOutput, depositing the indicated token-name into the delegated destination.\n\nEach implemented subclass can use it's own style to match its strategy & mechanism, and is EXPECTED to use tcx.addOutput() to receive the indicated `tokenValue` into the contract or other destination address.\n\nThis method is used both for the original deposit and for returning the token during a grant-of-authority.\n\nImpls should normally preserve the datum from an already-present sourceUtxo, possibly with evolved details.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"abstract txnReceiveAuthorityToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", tokenValue: "}<a href="#Value">{"Value"}</a>{", fromFoundUtxo?: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnRetireAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnRetireAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds the authority token and adds it to the transaction, tagged for retirement\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nDoesn't return the token back to the contract.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnRetireAuthorityToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
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



        <div>
            <div>
            <h4>DelegateActivityHelper_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.\n\n"
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
            <h4>DelegateDatumHelper_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!ErgoDelegateDatum:type<br/>



        <div>
            <div>
            <h4>DredNodeRegistryPolicyDataBridgeReader</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    


        <div>
            <div>
            <h4>DelegateRoleHelper_4</h4>
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
            <h4>ManifestActivityHelper_4</h4>
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
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelper_4</h4>
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
            <h4>DelegateLifecycleActivityHelper_3</h4>
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
            <h4>SpendingActivityHelper_3</h4>
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
    


        <div>
            <div>
            <h4>MintingActivityHelper_3</h4>
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
            <h4>BurningActivityHelper_3</h4>
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
            <h4>PendingDelegateActionHelper_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.\n\n"
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
            <h4>ManifestEntryTypeHelper_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.\n\n"
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
            <h4>PendingCharterChangeHelper_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.\n\n"
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
            <h4>cctx_CharterInputTypeHelper_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.\n\n"
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
            <h4>dgd_DataSrcHelper</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***dgd_DataSrc*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!AnyDataLike:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!DelegationDetailLike:interface<br/>


            ?? unknown type: <a href="doc/NodeRegistrationDataLike">NodeRegistrationDataLike</a> = dred-network-registry!NodeRegistrationDataLike:interface<br/>


            ?? unknown type: <a href="doc/TimeLike">TimeLike</a> = dred-network-registry!~TimeLike_2:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!RelativeDelegateLinkLike:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!PendingDelegateChangeLike:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!PendingDelegateActionLike:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!DelegateRoleLike:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!RelativeDelegateLinkLike:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!CapoManifestEntryLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestEntryTypeLike">ManifestEntryTypeLike</a> = dred-network-registry!ManifestEntryTypeLike:type<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!CapoCtxLike:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputTypeLike">cctx_CharterInputTypeLike</a> = dred-network-registry!cctx_CharterInputTypeLike:type<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettingsLike">NodeOperatorSettingsLike</a> = dred-network-registry!NodeOperatorSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNodeOperatorLike">AbstractSettingsForNodeOperatorLike</a> = dred-network-registry!AbstractSettingsForNodeOperatorLike:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettingsLike">NodeOperatorSettingsLike</a> = dred-network-registry!NodeOperatorSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/DgDataDetailsLike">DgDataDetailsLike</a> = dred-network-registry!DgDataDetailsLike:interface<br/>


            ?? unknown type: <a href="doc/dgd_DataSrcLike">dgd_DataSrcLike</a> = dred-network-registry!dgd_DataSrcLike:type<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNodeOperator">AbstractSettingsForNodeOperator</a> = dred-network-registry!AbstractSettingsForNodeOperator:interface<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNodeOperatorLike">AbstractSettingsForNodeOperatorLike</a> = dred-network-registry!AbstractSettingsForNodeOperatorLike:interface<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!AnyData:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!AnyDataLike:interface<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!CapoCtx:interface<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!CapoCtxLike:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!CapoManifestEntry:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!CapoManifestEntryLike:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!DelegationDetail:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!DelegationDetailLike:interface<br/>


            ?? unknown type: <a href="doc/DgDataDetails">DgDataDetails</a> = dred-network-registry!DgDataDetails:interface<br/>


            ?? unknown type: <a href="doc/DgDataDetailsLike">DgDataDetailsLike</a> = dred-network-registry!DgDataDetailsLike:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettings">NodeOperatorSettings</a> = dred-network-registry!NodeOperatorSettings:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettingsLike">NodeOperatorSettingsLike</a> = dred-network-registry!NodeOperatorSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/NodeRegistrationDataLike">NodeRegistrationDataLike</a> = dred-network-registry!NodeRegistrationDataLike:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!PendingDelegateChange:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!PendingDelegateChangeLike:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!RelativeDelegateLink:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!RelativeDelegateLinkLike:interface<br/>


            <p>see also: dred-network-registry!ContractDataBridge:class</p>



        <div>
            <div>
            <h4>DredNodeRegistryPolicyDataBridge</h4>
                <ReactMarkdown>
                {
                    "GENERATED data bridge for **BasicDelegate** script (defined in class ***NodeRegistryBundle***) main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis class doesn't need to be used directly. Its methods are available through the ***contract's methods***: - `get mkDatum` - returns the datum-building bridge for the contract's datum type - `get activity` - returns an activity-building bridge for the contract's activity type - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script The advanced methods are not typically needed - mkDatum and activity should normally provide all the type-safe data-encoding needed for the contract. For reading on-chain data, the Capo's `findDelegatedDataUtxos()` method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.\n\n##### customizing the bridge class name Note that you may override `get dataBridgeName() { return \"...\" }` to customize the name of this bridge class\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/DelegateDatum$Ergo$Cip68RefToken">DelegateDatum$Ergo$Cip68RefToken</a> = dred-network-registry!DelegateDatum$Ergo$Cip68RefToken:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegationDetail">ErgoDelegationDetail</a> = dred-network-registry!ErgoDelegationDetail:type<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Ergo$capoStoredData">DelegateDatum$Ergo$capoStoredData</a> = dred-network-registry!DelegateDatum$Ergo$capoStoredData:type<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNodeOperator">AbstractSettingsForNodeOperator</a> = dred-network-registry!AbstractSettingsForNodeOperator:interface<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!AnyData:interface<br/>


            ?? unknown type: <a href="doc/ErgoBurningActivity">ErgoBurningActivity</a> = dred-network-registry!ErgoBurningActivity:type<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!CapoCtx:interface<br/>


            ?? unknown type: <a href="doc/ErgoCapoLifecycleActivity">ErgoCapoLifecycleActivity</a> = dred-network-registry!ErgoCapoLifecycleActivity:type<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!CapoManifestEntry:interface<br/>


            ?? unknown type: <a href="doc/Ergocctx_CharterInputType">Ergocctx_CharterInputType</a> = dred-network-registry!Ergocctx_CharterInputType:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateActivity">ErgoDelegateActivity</a> = dred-network-registry!ErgoDelegateActivity:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!ErgoDelegateDatum:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateLifecycleActivity">ErgoDelegateLifecycleActivity</a> = dred-network-registry!ErgoDelegateLifecycleActivity:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateRole">ErgoDelegateRole</a> = dred-network-registry!ErgoDelegateRole:type<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!DelegationDetail:interface<br/>


            ?? unknown type: <a href="doc/Ergodgd_DataSrc">Ergodgd_DataSrc</a> = dred-network-registry!Ergodgd_DataSrc:type<br/>


            ?? unknown type: <a href="doc/DgDataDetails">DgDataDetails</a> = dred-network-registry!DgDataDetails:interface<br/>


            ?? unknown type: <a href="doc/ErgoManifestActivity">ErgoManifestActivity</a> = dred-network-registry!ErgoManifestActivity:type<br/>


            ?? unknown type: <a href="doc/ErgoManifestEntryType">ErgoManifestEntryType</a> = dred-network-registry!ErgoManifestEntryType:type<br/>


            ?? unknown type: <a href="doc/ErgoMintingActivity">ErgoMintingActivity</a> = dred-network-registry!ErgoMintingActivity:type<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettings">NodeOperatorSettings</a> = dred-network-registry!NodeOperatorSettings:interface<br/>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/ErgoPendingCharterChange">ErgoPendingCharterChange</a> = dred-network-registry!ErgoPendingCharterChange:type<br/>


            ?? unknown type: <a href="doc/ErgoPendingDelegateAction">ErgoPendingDelegateAction</a> = dred-network-registry!ErgoPendingDelegateAction:type<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!PendingDelegateChange:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!RelativeDelegateLink:interface<br/>


            ?? unknown type: <a href="doc/ErgoSpendingActivity">ErgoSpendingActivity</a> = dred-network-registry!ErgoSpendingActivity:type<br/>


            <p>see also: dred-network-registry!HeliosProgramCacheEntry:type</p>


            <p>see also: dred-network-registry!CompileOptionsForCachedHeliosProgram:type</p>


            <p>see also: dred-network-registry!anyUplcProgram_2:type</p>


            <p>see also: dred-network-registry!HeliosScriptBundle:class</p>


            <p>see also: dred-network-registry!HeliosBundleClassWithCapo:type</p>


            <p>see also: dred-network-registry!HeliosProgramWithCacheAPI:class</p>


            <p>see also: dred-network-registry!UplcRecord_2:type</p>


            <p>see also: dred-network-registry!RequiredDeployedScriptDetails:type</p>


            <p>see also: dred-network-registry!SetupOrMainnetSignalForBundle:type</p>


            <p>see also: dred-network-registry!HeliosBundleTypes:type</p>


            <p>see also: dred-network-registry!configBase:interface</p>


            <p>see also: dred-network-registry!ManifestActivity$addingEntryLike_2_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivity$burningThreadTokenLike_2_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivity$forkingThreadTokenLike_2_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivity$updatingEntryLike_2_2:interface</p>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!~ManifestActivity$addingEntryLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!~ManifestActivity$burningThreadTokenLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!~ManifestActivity$forkingThreadTokenLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!~ManifestActivity$updatingEntryLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!ManifestActivity$addingEntryLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!ManifestActivity$burningThreadTokenLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!ManifestActivity$forkingThreadTokenLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!ManifestActivity$updatingEntryLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!~ManifestActivity$addingEntryLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!~ManifestActivity$burningThreadTokenLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!~ManifestActivity$forkingThreadTokenLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!~ManifestActivity$updatingEntryLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!~ManifestActivity$addingEntryLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!~ManifestActivity$burningThreadTokenLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!~ManifestActivity$forkingThreadTokenLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!~ManifestActivity$updatingEntryLike_5:interface<br/>


            <p>see also: dred-network-registry!ManifestActivity$addingEntryLike_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivity$burningThreadTokenLike_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivity$forkingThreadTokenLike_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivity$updatingEntryLike_2:interface</p>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!~ManifestActivity$addingEntryLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!~ManifestActivity$burningThreadTokenLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!~ManifestActivity$forkingThreadTokenLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!~ManifestActivity$updatingEntryLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!ManifestActivity$addingEntryLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!ManifestActivity$burningThreadTokenLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!ManifestActivity$forkingThreadTokenLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!ManifestActivity$updatingEntryLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!~ManifestActivity$addingEntryLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!~ManifestActivity$burningThreadTokenLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!~ManifestActivity$forkingThreadTokenLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!~ManifestActivity$updatingEntryLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$addingEntryLike">ManifestActivity$addingEntryLike</a> = dred-network-registry!~ManifestActivity$addingEntryLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$burningThreadTokenLike">ManifestActivity$burningThreadTokenLike</a> = dred-network-registry!~ManifestActivity$burningThreadTokenLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$forkingThreadTokenLike">ManifestActivity$forkingThreadTokenLike</a> = dred-network-registry!~ManifestActivity$forkingThreadTokenLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivity$updatingEntryLike">ManifestActivity$updatingEntryLike</a> = dred-network-registry!~ManifestActivity$updatingEntryLike_5:interface<br/>


            <p>see also: dred-network-registry!ManifestEntryType$DelegateThreadsLike_2_2:interface</p>


            <p>see also: dred-network-registry!DelegateRoleLike_2_2:type</p>


            <p>see also: dred-network-registry!ManifestEntryType$DgDataPolicyLike_2_2:interface</p>


            <p>see also: dred-network-registry!RelativeDelegateLinkLike_3:interface</p>


            ?? unknown type: <a href="doc/ManifestEntryType$DelegateThreadsLike">ManifestEntryType$DelegateThreadsLike</a> = dred-network-registry!~ManifestEntryType$DelegateThreadsLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_3:type<br/>


            ?? unknown type: <a href="doc/ManifestEntryType$DgDataPolicyLike">ManifestEntryType$DgDataPolicyLike</a> = dred-network-registry!~ManifestEntryType$DgDataPolicyLike_3:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestEntryType$DelegateThreadsLike">ManifestEntryType$DelegateThreadsLike</a> = dred-network-registry!ManifestEntryType$DelegateThreadsLike:interface<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!DelegateRoleLike:type<br/>


            ?? unknown type: <a href="doc/ManifestEntryType$DgDataPolicyLike">ManifestEntryType$DgDataPolicyLike</a> = dred-network-registry!ManifestEntryType$DgDataPolicyLike:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!RelativeDelegateLinkLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestEntryType$DelegateThreadsLike">ManifestEntryType$DelegateThreadsLike</a> = dred-network-registry!~ManifestEntryType$DelegateThreadsLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_4:type<br/>


            ?? unknown type: <a href="doc/ManifestEntryType$DgDataPolicyLike">ManifestEntryType$DgDataPolicyLike</a> = dred-network-registry!~ManifestEntryType$DgDataPolicyLike_4:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestEntryType$DelegateThreadsLike">ManifestEntryType$DelegateThreadsLike</a> = dred-network-registry!~ManifestEntryType$DelegateThreadsLike_5:interface<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_5:type<br/>


            ?? unknown type: <a href="doc/ManifestEntryType$DgDataPolicyLike">ManifestEntryType$DgDataPolicyLike</a> = dred-network-registry!~ManifestEntryType$DgDataPolicyLike_5:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_6:interface<br/>


            <p>see also: dred-network-registry!ManifestEntryType$DelegateThreadsLike_2:interface</p>


            <p>see also: dred-network-registry!ManifestEntryType$DgDataPolicyLike_2:interface</p>


            <p>see also: dred-network-registry!MinterActivity$CreatingNewSpendDelegateLike:interface</p>



        <div>
            <div>
            <h4>MyMintSpendDelegateDataBridge</h4>
                <ReactMarkdown>
                {
                    "GENERATED data bridge for **BasicDelegate** script (defined in class ***MyMintSpendDelegateBundle***) main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis class doesn't need to be used directly. Its methods are available through the ***contract's methods***: - `get mkDatum` - returns the datum-building bridge for the contract's datum type - `get activity` - returns an activity-building bridge for the contract's activity type - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script The advanced methods are not typically needed - mkDatum and activity should normally provide all the type-safe data-encoding needed for the contract. For reading on-chain data, the Capo's `findDelegatedDataUtxos()` method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.\n\n##### customizing the bridge class name Note that you may override `get dataBridgeName() { return \"...\" }` to customize the name of this bridge class\n\n\n"
        }</ReactMarkdown>
        </div>
    


        <div>
            <div>
            <h4>DelegateActivityHelper_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.\n\n"
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
            <h4>DelegateDatumHelper_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!~ErgoDelegateDatum_3:type<br/>



        <div>
            <div>
            <h4>MyMintSpendDelegateDataBridgeReader</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    


        <div>
            <div>
            <h4>DelegateRoleHelper_3</h4>
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
            <h4>ManifestActivityHelper_3</h4>
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
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelper_3</h4>
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
            <h4>DelegateLifecycleActivityHelper_2</h4>
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
            <h4>SpendingActivityHelper_2</h4>
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
    


        <div>
            <div>
            <h4>MintingActivityHelper_2</h4>
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
            <h4>BurningActivityHelper_2</h4>
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
            <h4>PendingDelegateActionHelper_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.\n\n"
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
            <h4>ManifestEntryTypeHelper_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.\n\n"
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
            <h4>PendingCharterChangeHelper_3</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.\n\n"
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
            <h4>cctx_CharterInputTypeHelper_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_3:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_4:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_3:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!~PendingDelegateActionLike_3:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_3:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!~CapoManifestEntryLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestEntryTypeLike">ManifestEntryTypeLike</a> = dred-network-registry!~ManifestEntryTypeLike_3:type<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!~CapoCtxLike_3:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputTypeLike">cctx_CharterInputTypeLike</a> = dred-network-registry!~cctx_CharterInputTypeLike_3:type<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!~AnyData_3:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!~CapoCtx_3:interface<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!~CapoCtxLike_3:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!~CapoManifestEntry_3:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!~CapoManifestEntryLike_3:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!~DelegationDetail_4:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_3:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!~PendingDelegateChange_3:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_3:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!~RelativeDelegateLink_5:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Ergo$Cip68RefToken">DelegateDatum$Ergo$Cip68RefToken</a> = dred-network-registry!~DelegateDatum$Ergo$Cip68RefToken_3:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegationDetail">ErgoDelegationDetail</a> = dred-network-registry!~ErgoDelegationDetail_3:type<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Ergo$capoStoredData">DelegateDatum$Ergo$capoStoredData</a> = dred-network-registry!~DelegateDatum$Ergo$capoStoredData_3:type<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!~AnyData_3:interface<br/>


            ?? unknown type: <a href="doc/ErgoBurningActivity">ErgoBurningActivity</a> = dred-network-registry!~ErgoBurningActivity_3:type<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!~CapoCtx_3:interface<br/>


            ?? unknown type: <a href="doc/ErgoCapoLifecycleActivity">ErgoCapoLifecycleActivity</a> = dred-network-registry!~ErgoCapoLifecycleActivity_3:type<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!~CapoManifestEntry_3:interface<br/>


            ?? unknown type: <a href="doc/Ergocctx_CharterInputType">Ergocctx_CharterInputType</a> = dred-network-registry!~Ergocctx_CharterInputType_3:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateActivity">ErgoDelegateActivity</a> = dred-network-registry!~ErgoDelegateActivity_3:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!~ErgoDelegateDatum_3:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateLifecycleActivity">ErgoDelegateLifecycleActivity</a> = dred-network-registry!~ErgoDelegateLifecycleActivity_3:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateRole">ErgoDelegateRole</a> = dred-network-registry!~ErgoDelegateRole_4:type<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!~DelegationDetail_4:interface<br/>


            ?? unknown type: <a href="doc/ErgoManifestActivity">ErgoManifestActivity</a> = dred-network-registry!~ErgoManifestActivity_4:type<br/>


            ?? unknown type: <a href="doc/ErgoManifestEntryType">ErgoManifestEntryType</a> = dred-network-registry!~ErgoManifestEntryType_4:type<br/>


            ?? unknown type: <a href="doc/ErgoMintingActivity">ErgoMintingActivity</a> = dred-network-registry!~ErgoMintingActivity_3:type<br/>


            ?? unknown type: <a href="doc/ErgoPendingCharterChange">ErgoPendingCharterChange</a> = dred-network-registry!~ErgoPendingCharterChange_4:type<br/>


            ?? unknown type: <a href="doc/ErgoPendingDelegateAction">ErgoPendingDelegateAction</a> = dred-network-registry!~ErgoPendingDelegateAction_4:type<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!~PendingDelegateChange_3:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!~RelativeDelegateLink_5:interface<br/>


            ?? unknown type: <a href="doc/ErgoSpendingActivity">ErgoSpendingActivity</a> = dred-network-registry!~ErgoSpendingActivity_3:type<br/>


            ?? unknown type: <a href="doc/DredCapoFeatures">DredCapoFeatures</a> = dred-network-registry!~DredCapoFeatures:type<br/>



        <div>
            <div>
            <h4>DredCapo</h4>
                <ReactMarkdown>
                {
                    "\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    


        <div>
            <div>
            <h4>NeighborhoodPolicyDataBridge</h4>
                <ReactMarkdown>
                {
                    "GENERATED data bridge for **BasicDelegate** script (defined in class ***NeighborhoodBundle***) main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis class doesn't need to be used directly. Its methods are available through the ***contract's methods***: - `get mkDatum` - returns the datum-building bridge for the contract's datum type - `get activity` - returns an activity-building bridge for the contract's activity type - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script The advanced methods are not typically needed - mkDatum and activity should normally provide all the type-safe data-encoding needed for the contract. For reading on-chain data, the Capo's `findDelegatedDataUtxos()` method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.\n\n##### customizing the bridge class name Note that you may override `get dataBridgeName() { return \"...\" }` to customize the name of this bridge class\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/minimalNeighborhoodData">minimalNeighborhoodData</a> = dred-network-registry!~minimalNeighborhoodData:type<br/>


            ?? unknown type: <a href="doc/minimalNeighborhoodData">minimalNeighborhoodData</a> = dred-network-registry!~minimalNeighborhoodData:type<br/>



        <div>
            <div>
            <h4>DelegateActivityHelper_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.\n\n"
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
            <h4>DelegateDatumHelper_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!~ErgoDelegateDatum_4:type<br/>



        <div>
            <div>
            <h4>NeighborhoodPolicyDataBridgeReader</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    


        <div>
            <div>
            <h4>FeeSourceHelper</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***FeeSource*** enum type.\n\n"
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
            <h4>SubscriptionFeeFrequencyHelper</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***SubscriptionFeeFrequency*** enum type.\n\n"
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
            <h4>RevenueModelHelper</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***RevenueModel*** enum type.\n\n"
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
            <h4>DelegateRoleHelper_5</h4>
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
            <h4>ManifestActivityHelper_5</h4>
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
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelper_5</h4>
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
            <h4>DelegateLifecycleActivityHelper_4</h4>
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
            <h4>SpendingActivityHelper_4</h4>
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
    


        <div>
            <div>
            <h4>MintingActivityHelper_4</h4>
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
            <h4>BurningActivityHelper_4</h4>
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
            <h4>PendingDelegateActionHelper_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.\n\n"
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
            <h4>ManifestEntryTypeHelper_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.\n\n"
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
            <h4>PendingCharterChangeHelper_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.\n\n"
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
            <h4>cctx_CharterInputTypeHelper_4</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.\n\n"
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
            <h4>dgd_DataSrcHelper_2</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***dgd_DataSrc*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_4:interface<br/>


            ?? unknown type: <a href="doc/AppInfoLike">AppInfoLike</a> = dred-network-registry!~AppInfoLike:interface<br/>


            ?? unknown type: <a href="doc/RevenueModelLike">RevenueModelLike</a> = dred-network-registry!~RevenueModelLike:type<br/>


            ?? unknown type: <a href="doc/NodeOpsInfoLike">NodeOpsInfoLike</a> = dred-network-registry!~NodeOpsInfoLike:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodDataLike">NeighborhoodDataLike</a> = dred-network-registry!~NeighborhoodDataLike:interface<br/>


            ?? unknown type: <a href="doc/AppInfoLike">AppInfoLike</a> = dred-network-registry!~AppInfoLike:interface<br/>


            ?? unknown type: <a href="doc/NodeOpsInfoLike">NodeOpsInfoLike</a> = dred-network-registry!~NodeOpsInfoLike:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_5:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_4:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!~PendingDelegateActionLike_4:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_4:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!~CapoManifestEntryLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestEntryTypeLike">ManifestEntryTypeLike</a> = dred-network-registry!~ManifestEntryTypeLike_4:type<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!~CapoCtxLike_4:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputTypeLike">cctx_CharterInputTypeLike</a> = dred-network-registry!~cctx_CharterInputTypeLike_4:type<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettingsLike">NeighborhoodSettingsLike</a> = dred-network-registry!~NeighborhoodSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNeighborhoodLike">AbstractSettingsForNeighborhoodLike</a> = dred-network-registry!~AbstractSettingsForNeighborhoodLike:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettingsLike">NeighborhoodSettingsLike</a> = dred-network-registry!~NeighborhoodSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/DgDataDetailsLike">DgDataDetailsLike</a> = dred-network-registry!~DgDataDetailsLike_2:interface<br/>


            ?? unknown type: <a href="doc/dgd_DataSrcLike">dgd_DataSrcLike</a> = dred-network-registry!~dgd_DataSrcLike_2:type<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNeighborhood">AbstractSettingsForNeighborhood</a> = dred-network-registry!~AbstractSettingsForNeighborhood:interface<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNeighborhoodLike">AbstractSettingsForNeighborhoodLike</a> = dred-network-registry!~AbstractSettingsForNeighborhoodLike:interface<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!~AnyData_4:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_4:interface<br/>


            ?? unknown type: <a href="doc/AppInfo">AppInfo</a> = dred-network-registry!~AppInfo:interface<br/>


            ?? unknown type: <a href="doc/AppInfoLike">AppInfoLike</a> = dred-network-registry!~AppInfoLike:interface<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!~CapoCtx_4:interface<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!~CapoCtxLike_4:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!~CapoManifestEntry_4:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!~CapoManifestEntryLike_4:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!~DelegationDetail_5:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_4:interface<br/>


            ?? unknown type: <a href="doc/DgDataDetails">DgDataDetails</a> = dred-network-registry!~DgDataDetails_2:interface<br/>


            ?? unknown type: <a href="doc/DgDataDetailsLike">DgDataDetailsLike</a> = dred-network-registry!~DgDataDetailsLike_2:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodData">NeighborhoodData</a> = dred-network-registry!~NeighborhoodData:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodDataLike">NeighborhoodDataLike</a> = dred-network-registry!~NeighborhoodDataLike:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettings">NeighborhoodSettings</a> = dred-network-registry!~NeighborhoodSettings_2:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettingsLike">NeighborhoodSettingsLike</a> = dred-network-registry!~NeighborhoodSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/NodeOpsInfo">NodeOpsInfo</a> = dred-network-registry!~NodeOpsInfo:interface<br/>


            ?? unknown type: <a href="doc/NodeOpsInfoLike">NodeOpsInfoLike</a> = dred-network-registry!~NodeOpsInfoLike:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!~PendingDelegateChange_4:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_4:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!~RelativeDelegateLink_6:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_5:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Ergo$Cip68RefToken">DelegateDatum$Ergo$Cip68RefToken</a> = dred-network-registry!~DelegateDatum$Ergo$Cip68RefToken_4:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegationDetail">ErgoDelegationDetail</a> = dred-network-registry!~ErgoDelegationDetail_4:type<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Ergo$capoStoredData">DelegateDatum$Ergo$capoStoredData</a> = dred-network-registry!~DelegateDatum$Ergo$capoStoredData_4:type<br/>


            ?? unknown type: <a href="doc/AbstractSettingsForNeighborhood">AbstractSettingsForNeighborhood</a> = dred-network-registry!~AbstractSettingsForNeighborhood:interface<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!~AnyData_4:interface<br/>


            ?? unknown type: <a href="doc/AppInfo">AppInfo</a> = dred-network-registry!~AppInfo:interface<br/>


            ?? unknown type: <a href="doc/ErgoBurningActivity">ErgoBurningActivity</a> = dred-network-registry!~ErgoBurningActivity_4:type<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!~CapoCtx_4:interface<br/>


            ?? unknown type: <a href="doc/ErgoCapoLifecycleActivity">ErgoCapoLifecycleActivity</a> = dred-network-registry!~ErgoCapoLifecycleActivity_4:type<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!~CapoManifestEntry_4:interface<br/>


            ?? unknown type: <a href="doc/Ergocctx_CharterInputType">Ergocctx_CharterInputType</a> = dred-network-registry!~Ergocctx_CharterInputType_4:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateActivity">ErgoDelegateActivity</a> = dred-network-registry!~ErgoDelegateActivity_4:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!~ErgoDelegateDatum_4:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateLifecycleActivity">ErgoDelegateLifecycleActivity</a> = dred-network-registry!~ErgoDelegateLifecycleActivity_4:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateRole">ErgoDelegateRole</a> = dred-network-registry!~ErgoDelegateRole_5:type<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!~DelegationDetail_5:interface<br/>


            ?? unknown type: <a href="doc/Ergodgd_DataSrc">Ergodgd_DataSrc</a> = dred-network-registry!~Ergodgd_DataSrc_2:type<br/>


            ?? unknown type: <a href="doc/DgDataDetails">DgDataDetails</a> = dred-network-registry!~DgDataDetails_2:interface<br/>


            ?? unknown type: <a href="doc/ErgoFeeSource">ErgoFeeSource</a> = dred-network-registry!~ErgoFeeSource:type<br/>


            ?? unknown type: <a href="doc/ErgoManifestActivity">ErgoManifestActivity</a> = dred-network-registry!~ErgoManifestActivity_5:type<br/>


            ?? unknown type: <a href="doc/ErgoManifestEntryType">ErgoManifestEntryType</a> = dred-network-registry!~ErgoManifestEntryType_5:type<br/>


            ?? unknown type: <a href="doc/ErgoMintingActivity">ErgoMintingActivity</a> = dred-network-registry!~ErgoMintingActivity_4:type<br/>


            ?? unknown type: <a href="doc/NeighborhoodData">NeighborhoodData</a> = dred-network-registry!~NeighborhoodData:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettings">NeighborhoodSettings</a> = dred-network-registry!~NeighborhoodSettings_2:interface<br/>


            ?? unknown type: <a href="doc/NodeOpsInfo">NodeOpsInfo</a> = dred-network-registry!~NodeOpsInfo:interface<br/>


            ?? unknown type: <a href="doc/ErgoPendingCharterChange">ErgoPendingCharterChange</a> = dred-network-registry!~ErgoPendingCharterChange_5:type<br/>


            ?? unknown type: <a href="doc/ErgoPendingDelegateAction">ErgoPendingDelegateAction</a> = dred-network-registry!~ErgoPendingDelegateAction_5:type<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!~PendingDelegateChange_4:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!~RelativeDelegateLink_6:interface<br/>


            ?? unknown type: <a href="doc/ErgoRevenueModel">ErgoRevenueModel</a> = dred-network-registry!~ErgoRevenueModel:type<br/>


            ?? unknown type: <a href="doc/ErgoSpendingActivity">ErgoSpendingActivity</a> = dred-network-registry!~ErgoSpendingActivity_4:type<br/>


            ?? unknown type: <a href="doc/ErgoSubscriptionFeeFrequency">ErgoSubscriptionFeeFrequency</a> = dred-network-registry!~ErgoSubscriptionFeeFrequency:type<br/>


            ?? unknown type: <a href="doc/minimalNodeRegistrationData">minimalNodeRegistrationData</a> = dred-network-registry!~minimalNodeRegistrationData_2:type<br/>


            ?? unknown type: <a href="doc/minimalNodeRegistrationData">minimalNodeRegistrationData</a> = dred-network-registry!~minimalNodeRegistrationData_2:type<br/>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/NodeRegistrationDataLike">NodeRegistrationDataLike</a> = dred-network-registry!NodeRegistrationDataLike:interface<br/>


            <p>see also: dred-network-registry!PendingDelegateChangeLike_2_2:interface</p>


            <p>see also: dred-network-registry!PendingDelegateActionLike_2_2:type</p>


            <p>see also: dred-network-registry!PendingCharterChange$otherManifestChangeLike_2_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivityLike_2_2:type</p>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_3:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!~PendingDelegateActionLike_3:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_3:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_4:interface<br/>


            ?? unknown type: <a href="doc/PendingCharterChange$otherManifestChangeLike">PendingCharterChange$otherManifestChangeLike</a> = dred-network-registry!~PendingCharterChange$otherManifestChangeLike_3:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivityLike">ManifestActivityLike</a> = dred-network-registry!~ManifestActivityLike_3:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_3:type<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!PendingDelegateChangeLike:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!PendingDelegateActionLike:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!DelegateRoleLike:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!RelativeDelegateLinkLike:interface<br/>


            ?? unknown type: <a href="doc/PendingCharterChange$otherManifestChangeLike">PendingCharterChange$otherManifestChangeLike</a> = dred-network-registry!PendingCharterChange$otherManifestChangeLike:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivityLike">ManifestActivityLike</a> = dred-network-registry!ManifestActivityLike:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!DelegateRoleLike:type<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_4:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!~PendingDelegateActionLike_4:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_4:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_5:interface<br/>


            ?? unknown type: <a href="doc/PendingCharterChange$otherManifestChangeLike">PendingCharterChange$otherManifestChangeLike</a> = dred-network-registry!~PendingCharterChange$otherManifestChangeLike_4:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivityLike">ManifestActivityLike</a> = dred-network-registry!~ManifestActivityLike_4:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_4:type<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_5:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!~PendingDelegateActionLike_5:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_5:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_6:interface<br/>


            ?? unknown type: <a href="doc/PendingCharterChange$otherManifestChangeLike">PendingCharterChange$otherManifestChangeLike</a> = dred-network-registry!~PendingCharterChange$otherManifestChangeLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestActivityLike">ManifestActivityLike</a> = dred-network-registry!~ManifestActivityLike_5:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_5:type<br/>


            <p>see also: dred-network-registry!PendingCharterChange$otherManifestChangeLike_2:interface</p>


            <p>see also: dred-network-registry!ManifestActivityLike_2:type</p>


            <p>see also: dred-network-registry!PendingDelegateAction$AddLike_2_2:interface</p>


            <p>see also: dred-network-registry!PendingDelegateAction$ReplaceLike_2_2:interface</p>


            ?? unknown type: <a href="doc/PendingDelegateAction$AddLike">PendingDelegateAction$AddLike</a> = dred-network-registry!~PendingDelegateAction$AddLike_3:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateAction$ReplaceLike">PendingDelegateAction$ReplaceLike</a> = dred-network-registry!~PendingDelegateAction$ReplaceLike_3:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateAction$AddLike">PendingDelegateAction$AddLike</a> = dred-network-registry!PendingDelegateAction$AddLike:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateAction$ReplaceLike">PendingDelegateAction$ReplaceLike</a> = dred-network-registry!PendingDelegateAction$ReplaceLike:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateAction$AddLike">PendingDelegateAction$AddLike</a> = dred-network-registry!~PendingDelegateAction$AddLike_4:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateAction$ReplaceLike">PendingDelegateAction$ReplaceLike</a> = dred-network-registry!~PendingDelegateAction$ReplaceLike_4:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateAction$AddLike">PendingDelegateAction$AddLike</a> = dred-network-registry!~PendingDelegateAction$AddLike_5:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateAction$ReplaceLike">PendingDelegateAction$ReplaceLike</a> = dred-network-registry!~PendingDelegateAction$ReplaceLike_5:interface<br/>


            <p>see also: dred-network-registry!PendingDelegateAction$AddLike_2:interface</p>


            <p>see also: dred-network-registry!PendingDelegateAction$ReplaceLike_2:interface</p>



        <div>
            <div>
            <h4>ProtocolSettingsPolicyDataBridge</h4>
                <ReactMarkdown>
                {
                    "GENERATED data bridge for **BasicDelegate** script (defined in class ***ProtocolSettingsBundle***) main: **src/delegation/BasicDelegate.hl**, project: **stellar-contracts**\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis class doesn't need to be used directly. Its methods are available through the ***contract's methods***: - `get mkDatum` - returns the datum-building bridge for the contract's datum type - `get activity` - returns an activity-building bridge for the contract's activity type - `get reader` - (advanced) returns a data-reader bridge for parsing CBOR/UPLC-encoded data of specific types - `get onchain` - (advanced) returns a data-encoding bridge for types defined in the contract's script The advanced methods are not typically needed - mkDatum and activity should normally provide all the type-safe data-encoding needed for the contract. For reading on-chain data, the Capo's `findDelegatedDataUtxos()` method is the normal way to locate and decode on-chain data without needing to explicitly use the data-bridge helper classes.\n\n##### customizing the bridge class name Note that you may override `get dataBridgeName() { return \"...\" }` to customize the name of this bridge class\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/minimalProtocolSettings">minimalProtocolSettings</a> = dred-network-registry!~minimalProtocolSettings:type<br/>


            ?? unknown type: <a href="doc/minimalProtocolSettings">minimalProtocolSettings</a> = dred-network-registry!~minimalProtocolSettings:type<br/>



        <div>
            <div>
            <h4>DelegateActivityHelper_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***DelegateActivity*** enum type.\n\n"
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
            <h4>DelegateDatumHelper_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating InlineTxOutputDatum for variants of the ***DelegateDatum*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!~ErgoDelegateDatum_5:type<br/>



        <div>
            <div>
            <h4>ProtocolSettingsPolicyDataBridgeReader</h4>
                <ReactMarkdown>
                {
                    ""
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    


        <div>
            <div>
            <h4>DelegateRoleHelper_6</h4>
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
            <h4>ManifestActivityHelper_6</h4>
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
    


        <div>
            <div>
            <h4>CapoLifecycleActivityHelper_6</h4>
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
            <h4>DelegateLifecycleActivityHelper_5</h4>
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
            <h4>SpendingActivityHelper_5</h4>
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
    


        <div>
            <div>
            <h4>MintingActivityHelper_5</h4>
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
            <h4>BurningActivityHelper_5</h4>
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
            <h4>PendingDelegateActionHelper_6</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingDelegateAction*** enum type.\n\n"
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
            <h4>ManifestEntryTypeHelper_6</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***ManifestEntryType*** enum type.\n\n"
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
            <h4>PendingCharterChangeHelper_6</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***PendingCharterChange*** enum type.\n\n"
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
            <h4>cctx_CharterInputTypeHelper_5</h4>
                <ReactMarkdown>
                {
                    "Helper class for generating UplcData for variants of the ***cctx_CharterInputType*** enum type.\n\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
        </div>
    

            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_5:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_5:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettingsLike">NodeOperatorSettingsLike</a> = dred-network-registry!~NodeOperatorSettingsLike_2:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettingsLike">NeighborhoodSettingsLike</a> = dred-network-registry!~NeighborhoodSettingsLike_2:interface<br/>


            ?? unknown type: <a href="doc/ProtocolSettingsLike">ProtocolSettingsLike</a> = dred-network-registry!~ProtocolSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettingsLike">NodeOperatorSettingsLike</a> = dred-network-registry!~NodeOperatorSettingsLike_2:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettingsLike">NeighborhoodSettingsLike</a> = dred-network-registry!~NeighborhoodSettingsLike_2:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_6:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_5:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateActionLike">PendingDelegateActionLike</a> = dred-network-registry!~PendingDelegateActionLike_5:type<br/>


            ?? unknown type: <a href="doc/DelegateRoleLike">DelegateRoleLike</a> = dred-network-registry!~DelegateRoleLike_5:type<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_6:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!~CapoManifestEntryLike_5:interface<br/>


            ?? unknown type: <a href="doc/ManifestEntryTypeLike">ManifestEntryTypeLike</a> = dred-network-registry!~ManifestEntryTypeLike_5:type<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!~CapoCtxLike_5:interface<br/>


            ?? unknown type: <a href="doc/cctx_CharterInputTypeLike">cctx_CharterInputTypeLike</a> = dred-network-registry!~cctx_CharterInputTypeLike_5:type<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!~AnyData_5:interface<br/>


            ?? unknown type: <a href="doc/AnyDataLike">AnyDataLike</a> = dred-network-registry!~AnyDataLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!~CapoCtx_5:interface<br/>


            ?? unknown type: <a href="doc/CapoCtxLike">CapoCtxLike</a> = dred-network-registry!~CapoCtxLike_5:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!~CapoManifestEntry_5:interface<br/>


            ?? unknown type: <a href="doc/CapoManifestEntryLike">CapoManifestEntryLike</a> = dred-network-registry!~CapoManifestEntryLike_5:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!~DelegationDetail_6:interface<br/>


            ?? unknown type: <a href="doc/DelegationDetailLike">DelegationDetailLike</a> = dred-network-registry!~DelegationDetailLike_5:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettings">NeighborhoodSettings</a> = dred-network-registry!~NeighborhoodSettings:interface<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettingsLike">NeighborhoodSettingsLike</a> = dred-network-registry!~NeighborhoodSettingsLike_2:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettings">NodeOperatorSettings</a> = dred-network-registry!~NodeOperatorSettings_2:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettingsLike">NodeOperatorSettingsLike</a> = dred-network-registry!~NodeOperatorSettingsLike_2:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!~PendingDelegateChange_5:interface<br/>


            ?? unknown type: <a href="doc/PendingDelegateChangeLike">PendingDelegateChangeLike</a> = dred-network-registry!~PendingDelegateChangeLike_5:interface<br/>


            ?? unknown type: <a href="doc/ProtocolSettings">ProtocolSettings</a> = dred-network-registry!~ProtocolSettings:interface<br/>


            ?? unknown type: <a href="doc/ProtocolSettingsLike">ProtocolSettingsLike</a> = dred-network-registry!~ProtocolSettingsLike:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!~RelativeDelegateLink_7:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLinkLike">RelativeDelegateLinkLike</a> = dred-network-registry!~RelativeDelegateLinkLike_6:interface<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Ergo$Cip68RefToken">DelegateDatum$Ergo$Cip68RefToken</a> = dred-network-registry!~DelegateDatum$Ergo$Cip68RefToken_5:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegationDetail">ErgoDelegationDetail</a> = dred-network-registry!~ErgoDelegationDetail_5:type<br/>


            ?? unknown type: <a href="doc/DelegateDatum$Ergo$capoStoredData">DelegateDatum$Ergo$capoStoredData</a> = dred-network-registry!~DelegateDatum$Ergo$capoStoredData_5:type<br/>


            ?? unknown type: <a href="doc/AnyData">AnyData</a> = dred-network-registry!~AnyData_5:interface<br/>


            ?? unknown type: <a href="doc/ErgoBurningActivity">ErgoBurningActivity</a> = dred-network-registry!~ErgoBurningActivity_5:type<br/>


            ?? unknown type: <a href="doc/CapoCtx">CapoCtx</a> = dred-network-registry!~CapoCtx_5:interface<br/>


            ?? unknown type: <a href="doc/ErgoCapoLifecycleActivity">ErgoCapoLifecycleActivity</a> = dred-network-registry!~ErgoCapoLifecycleActivity_5:type<br/>


            ?? unknown type: <a href="doc/CapoManifestEntry">CapoManifestEntry</a> = dred-network-registry!~CapoManifestEntry_5:interface<br/>


            ?? unknown type: <a href="doc/Ergocctx_CharterInputType">Ergocctx_CharterInputType</a> = dred-network-registry!~Ergocctx_CharterInputType_5:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateActivity">ErgoDelegateActivity</a> = dred-network-registry!~ErgoDelegateActivity_5:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateDatum">ErgoDelegateDatum</a> = dred-network-registry!~ErgoDelegateDatum_5:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateLifecycleActivity">ErgoDelegateLifecycleActivity</a> = dred-network-registry!~ErgoDelegateLifecycleActivity_5:type<br/>


            ?? unknown type: <a href="doc/ErgoDelegateRole">ErgoDelegateRole</a> = dred-network-registry!~ErgoDelegateRole_6:type<br/>


            ?? unknown type: <a href="doc/DelegationDetail">DelegationDetail</a> = dred-network-registry!~DelegationDetail_6:interface<br/>


            ?? unknown type: <a href="doc/ErgoManifestActivity">ErgoManifestActivity</a> = dred-network-registry!~ErgoManifestActivity_6:type<br/>


            ?? unknown type: <a href="doc/ErgoManifestEntryType">ErgoManifestEntryType</a> = dred-network-registry!~ErgoManifestEntryType_6:type<br/>


            ?? unknown type: <a href="doc/ErgoMintingActivity">ErgoMintingActivity</a> = dred-network-registry!~ErgoMintingActivity_5:type<br/>


            ?? unknown type: <a href="doc/NeighborhoodSettings">NeighborhoodSettings</a> = dred-network-registry!~NeighborhoodSettings:interface<br/>


            ?? unknown type: <a href="doc/NodeOperatorSettings">NodeOperatorSettings</a> = dred-network-registry!~NodeOperatorSettings_2:interface<br/>


            ?? unknown type: <a href="doc/ErgoPendingCharterChange">ErgoPendingCharterChange</a> = dred-network-registry!~ErgoPendingCharterChange_6:type<br/>


            ?? unknown type: <a href="doc/ErgoPendingDelegateAction">ErgoPendingDelegateAction</a> = dred-network-registry!~ErgoPendingDelegateAction_6:type<br/>


            ?? unknown type: <a href="doc/PendingDelegateChange">PendingDelegateChange</a> = dred-network-registry!~PendingDelegateChange_5:interface<br/>


            ?? unknown type: <a href="doc/ProtocolSettings">ProtocolSettings</a> = dred-network-registry!~ProtocolSettings:interface<br/>


            ?? unknown type: <a href="doc/RelativeDelegateLink">RelativeDelegateLink</a> = dred-network-registry!~RelativeDelegateLink_7:interface<br/>


            ?? unknown type: <a href="doc/ErgoSpendingActivity">ErgoSpendingActivity</a> = dred-network-registry!~ErgoSpendingActivity_5:type<br/>


            ?? unknown type: <a href="doc/SubscriptionFeeFrequencyLike">SubscriptionFeeFrequencyLike</a> = dred-network-registry!~SubscriptionFeeFrequencyLike:type<br/>


            ?? unknown type: <a href="doc/RevenueModel$TransactionBasedLike">RevenueModel$TransactionBasedLike</a> = dred-network-registry!~RevenueModel$TransactionBasedLike:interface<br/>


            ?? unknown type: <a href="doc/FeeSourceLike">FeeSourceLike</a> = dred-network-registry!~FeeSourceLike:type<br/>


            <p>see also: dred-network-registry!DeferredStateMachineAction:type</p>


            <p>see also: dred-network-registry!StateMachineEmitter:type</p>


            <p>see also: dred-network-registry!StateTransitionTable:type</p>


            <p>see also: dred-network-registry!AnyPromise:type</p>


            <p>see also: dred-network-registry!DeferredState:type</p>


            <p>see also: dred-network-registry!DeferredTransition:type</p>


            <p>see also: dred-network-registry!this:var</p>


            <p>see also: dred-network-registry!ComputedScriptProperties:type</p>


            <p>see also: dred-network-registry!UtxoHelper:class</p>


            <p>see also: dred-network-registry!ActorContext:type</p>


            <p>see also: dred-network-registry!AbstractNew:type</p>


            <p>see also: dred-network-registry!findReadDatumType:type</p>


            <p>see also: dred-network-registry!possiblyAbstractContractBridgeType:type</p>


            <p>see also: dred-network-registry!NetworkName:type</p>


            <p>see also: dred-network-registry!utxoPredicate:type</p>


            <p>see also: dred-network-registry!ContractDataBridgeWithEnumDatum:class</p>


        </div>

    );
}
    