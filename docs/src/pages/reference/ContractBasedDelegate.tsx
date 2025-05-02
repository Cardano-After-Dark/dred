import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>ContractBasedDelegate</h2>
                    <ReactMarkdown>
                        {
                            "Base class for delegates controlled by a smart contract, as opposed to a simple delegate backed by an issued token, whose presence grants delegated authority.\n\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#currentRev"><var>currentRev</var></a>, &nbsp;
                    <a href="#defaultParams"><var>defaultParams</var></a>, &nbsp;
                    <a href="#isDgDataPolicy"><var>isDgDataPolicy</var></a>, &nbsp;
                    <a href="#isMintAndSpendDelegate"><var>isMintAndSpendDelegate</var></a>, &nbsp;
                    <a href="#isMintDelegate"><var>isMintDelegate</var></a>, &nbsp;
                    <a href="#isSpendDelegate"><var>isSpendDelegate</var></a>
          </p>
            <p>
                <b>Static / class methods: </b>
                                <a href="#mkDelegateWithArgs"><var>mkDelegateWithArgs()</var></a>
            </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#_dataBridge"><var>_dataBridge</var></a>, &nbsp;
                    <a href="#activity"><var>activity</var></a>, &nbsp;
                    <a href="#capo"><var>capo</var></a>, &nbsp;
                    <a href="#dataBridgeClass"><var>dataBridgeClass</var></a>, &nbsp;
                    <a href="#delegateName"><var>delegateName</var></a>, &nbsp;
                    <a href="#delegateValidatorHash"><var>delegateValidatorHash</var></a>, &nbsp;
                    <a href="#mkDatum"><var>mkDatum</var></a>, &nbsp;
                    <a href="#newReadDatum"><var>newReadDatum</var></a>, &nbsp;
                    <a href="#offchain"><var>offchain</var></a>, &nbsp;
                    <a href="#onchain"><var>onchain</var></a>, &nbsp;
                    <a href="#reader"><var>reader</var></a>, &nbsp;
                    <a href="#scriptActivitiesName"><var>scriptActivitiesName</var></a>, &nbsp;
                    <a href="#scriptDatumName"><var>scriptDatumName</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#activityDeletingDelegatedData"><var>activityDeletingDelegatedData()</var></a>, &nbsp;
                    <a href="#activityMultipleDelegateActivities"><var>activityMultipleDelegateActivities()</var></a>, &nbsp;
                    <a href="#activityReplacingMe"><var>activityReplacingMe()</var></a>, &nbsp;
                    <a href="#activityRetiring"><var>activityRetiring()</var></a>, &nbsp;
                    <a href="#activityValidatingSettings"><var>activityValidatingSettings()</var></a>, &nbsp;
                    <a href="#DelegateAddsAuthorityToken"><var>DelegateAddsAuthorityToken()</var></a>, &nbsp;
                    <a href="#DelegateMustFindAuthorityToken"><var>DelegateMustFindAuthorityToken()</var></a>, &nbsp;
                    <a href="#DelegateRetiresAuthorityToken"><var>DelegateRetiresAuthorityToken()</var></a>, &nbsp;
                    <a href="#getContractScriptParams"><var>getContractScriptParams()</var></a>, &nbsp;
                    <a href="#mkCapoLifecycleActivity"><var>mkCapoLifecycleActivity()</var></a>, &nbsp;
                    <a href="#mkDatumIsDelegation"><var>mkDatumIsDelegation()</var></a>, &nbsp;
                    <a href="#mkDelegateLifecycleActivity"><var>mkDelegateLifecycleActivity()</var></a>, &nbsp;
                    <a href="#mkDelegationDatum"><var>mkDelegationDatum()</var></a>, &nbsp;
                    <a href="#mkSeededMintingActivity"><var>mkSeededMintingActivity()</var></a>, &nbsp;
                    <a href="#mkSeedlessMintingActivity"><var>mkSeedlessMintingActivity()</var></a>, &nbsp;
                    <a href="#mkSpendingActivity"><var>mkSpendingActivity()</var></a>, &nbsp;
                    <a href="#scriptBundle"><var>scriptBundle()</var></a>, &nbsp;
                    <a href="#tcxWithCharterRef"><var>tcxWithCharterRef()</var></a>, &nbsp;
                    <a href="#txnReceiveAuthorityToken"><var>txnReceiveAuthorityToken()</var></a>
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
{"static get defaultParams(): "}{"{\n        rev: bigint;\n        isMintDelegate: boolean;\n        isSpendDelegate: boolean;\n        isDgDataPolicy: boolean;\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isDgDataPolicy"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "isDgDataPolicy"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static isDgDataPolicy: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isMintAndSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "isMintAndSpendDelegate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static isMintAndSpendDelegate: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "isMintDelegate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static isMintDelegate: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "isSpendDelegate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Configures the matching parameter name in the on-chain script, indicating that this delegate serves the Capo by enforcing policy for spending the Capo's utxos.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nNot used for any mint delegate. Howeever, a mint delegate class can instead provide a true isMintAndSpendDelegate, ... if a single script controls both the mintDgt-* and spendDgt-* tokens/delegation roles for your Capo.\n\nDO NOT enable this attribute for second-level delegates, such as named delegates or delegated-data controllers. The base on-chain delegate script recognizes this conditional role and enforces that its generic delegated-data activities are used only in the context the Capo's main spend delegate, re-delegating to the data-controller which can't use those generic activities, but instead implements its user-facing txns as variants of its SpendingActivities enum.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"static isSpendDelegate: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Static / class methods</h3>
    <div className="prose">
        <a id="mkDelegateWithArgs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "mkDelegateWithArgs"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static mkDelegateWithArgs(a: "}<a href="#capoDelegateConfig">{"capoDelegateConfig"}</a>{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance properties</h3>
    <div className="prose">
        <a id="_dataBridge"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_dataBridge"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_dataBridge: "}<a href="#GenericDelegateBridge">{"GenericDelegateBridge"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "activity"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get activity(): "}<a href="#mustFindActivityType">{"mustFindActivityType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="capo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "capo"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get capo(): "}<a href="#Capo">{"Capo"}</a>{"<any, any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="dataBridgeClass"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "dataBridgeClass"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Each contract-based delegate must define its own dataBridgeClass, but they all use the same essential template for the outer layer of their activity & datum interface.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"dataBridgeClass: "}<a href="#GenericDelegateBridgeClass">{"GenericDelegateBridgeClass"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="delegateName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "delegateName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get delegateName(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="delegateValidatorHash"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "delegateValidatorHash"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "returns the ValidatorHash of the delegate script, if relevant\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nA delegate that doesn't use an on-chain validator should override this method and return undefined.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get delegateValidatorHash(): "}<a href="#ValidatorHash">{"ValidatorHash"}</a>{" | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "mkDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get mkDatum(): "}<a href="#mustFindDatumType">{"mustFindDatumType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="newReadDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "newReadDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get newReadDatum(): "}<a href="#mustFindReadDatumType">{"mustFindReadDatumType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="offchain"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "offchain"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get offchain(): "}<a href="#mustFindConcreteContractBridgeType">{"mustFindConcreteContractBridgeType"}</a>{"<this>[\"reader\"]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="onchain"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "onchain"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get onchain(): "}<a href="#mustFindConcreteContractBridgeType">{"mustFindConcreteContractBridgeType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="reader"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "reader"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get reader(): "}<a href="#mustFindConcreteContractBridgeType">{"mustFindConcreteContractBridgeType"}</a>{"<this>[\"reader\"]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptActivitiesName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "scriptActivitiesName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get scriptActivitiesName(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptDatumName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "scriptDatumName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get scriptDatumName(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="activityDeletingDelegatedData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityDeletingDelegatedData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "A mint-delegate activity indicating that a delegated-data controller will be governing a deletion (burning its UUT) of a specific piece of delegated data. No further redeemer details are needed here, but the data-delegate's controller-token may have additional details in ITS redeemer,\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"activityDeletingDelegatedData(recId: "}{"string | number[]"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityMultipleDelegateActivities"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityMultipleDelegateActivities"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"activityMultipleDelegateActivities(...activities: "}<a href="#isActivity">{"isActivity"}</a>{"[]"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityReplacingMe"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityReplacingMe"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "redeemer for replacing the authority UUT with a new one\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nWhen replacing the delegate, the current UUT will be burned, and a new one will be minted. It can be deposited to any next delegate address.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"activityReplacingMe({ seed, purpose, }: "}<a href="#Omit">{"Omit"}</a>{"<"}<a href="#MintUutActivityArgs">{"MintUutActivityArgs"}</a>{", \"purposes\"> & {\n        purpose: string;\n    }"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityRetiring"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityRetiring"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "redeemer for spending the authority UUT for burning it.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThe Retiring redeemer indicates that the delegate is being removed.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"activityRetiring(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityValidatingSettings"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityValidatingSettings"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"activityValidatingSettings(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="DelegateAddsAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "DelegateAddsAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds the delegate's authority token to a transaction\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nGiven a delegate already configured by a Capo, this method implements transaction-building logic needed to include the UUT into the `tcx`. the `utxo` is discovered by {@link StellarDelegate.DelegateMustFindAuthorityToken | DelegateMustFindAuthorityToken()}\n\nThe off-chain code shouldn't need to check the details; it can simply arrange the details properly and spend the delegate's authority token, using this method.\n\n### Reliance on this delegate\n\nOther contract scripts can rely on the delegate script to have validated its on-chain policy and enforced its own \"return to the delegate script\" logic.\n\n### Enforcing on-chain policy\n\nWhen spending the authority token in this way, the delegate's authority is typically narrowly scoped, and it's expected that the delegate's on-chain script validates that those parts of the transaction detail should be authorized, in accordance with the delegate's core purpose/responsbility - i.e. that the txn does all of what the delegate expects, and none of what it shouldn't do in that department.\n\nThe on-chain code SHOULD typically enforce: * that the token is spent with an application-specific redeemer variant of its MintingActivity or SpendingActivitie.\n\n* that the authority token is returned to the contract with its datum unchanged * that any other tokens it may also hold in the same UTxO do not become inaccessible as a result of the transactions - perhaps by requiring them to be returned together with the authority token.\n\nIt MAY enforce additional requirements as well.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"DelegateAddsAuthorityToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", uutxo: "}<a href="#TxInput">{"TxInput"}</a>{", redeemer: "}<a href="#isActivity">{"isActivity"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="DelegateMustFindAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "DelegateMustFindAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"DelegateMustFindAuthorityToken(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", label: "}{"string"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="DelegateRetiresAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "DelegateRetiresAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"DelegateRetiresAuthorityToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(this: "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{", tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", fromFoundUtxo: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getContractScriptParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getContractScriptParams"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getContractScriptParams(config: "}<a href="#capoDelegateConfig">{"capoDelegateConfig"}</a>{"): "}{"{\n        delegateName: string;\n        rev: bigint;\n        addrHint: "}<a href="#Address">{"Address"}</a>{"[];\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkCapoLifecycleActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkCapoLifecycleActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkCapoLifecycleActivity(capoLifecycleActivityName: "}{"\"CreatingDelegate\" | \"ActivatingDelegate\""}{", { seed, purpose, ...otherArgs }: "}<a href="#Omit">{"Omit"}</a>{"<"}<a href="#MintUutActivityArgs">{"MintUutActivityArgs"}</a>{", \"purposes\"> & {\n        purpose?: string;\n    }"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDatumIsDelegation"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkDatumIsDelegation"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "creates the essential datum for a delegate UTxO\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nEvery delegate is expected to have a two-field 'IsDelegation' variant in the first position of its on-chain Datum type. This helper method constructs a suitable UplcData structure, given appropriate inputs.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkDatumIsDelegation(dd: "}<a href="#DelegationDetail">{"DelegationDetail"}</a>{"): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDelegateLifecycleActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkDelegateLifecycleActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkDelegateLifecycleActivity(delegateActivityName: "}{"\"ReplacingMe\" | \"Retiring\" | \"ValidatingSettings\""}{", args?: "}<a href="#Record">{"Record"}</a>{"<string, any>"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDelegationDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkDelegationDatum"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkDelegationDatum(txin?: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#TxOutputDatum">{"TxOutputDatum"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkSeededMintingActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkSeededMintingActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkSeededMintingActivity(mintingActivityName: "}{"string"}{", args: "}{"{\n        seed: "}<a href="#TxOutputId">{"TxOutputId"}</a>{";\n    } & "}<a href="#Record">{"Record"}</a>{"<string, any>"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkSeedlessMintingActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkSeedlessMintingActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkSeedlessMintingActivity(mintingActivityName: "}{"string"}{", args: "}<a href="#Record">{"Record"}</a>{"<string, any>"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkSpendingActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkSpendingActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates a reedemer for the indicated spending activity name\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"mkSpendingActivity(spendingActivityName: "}{"string"}{", args: "}{"{\n        id: string | number[];\n    } & "}<a href="#Record">{"Record"}</a>{"<string, any>"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
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
{"scriptBundle(): "}<a href="#CapoDelegateBundle">{"CapoDelegateBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tcxWithCharterRef"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tcxWithCharterRef"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tcxWithCharterRef<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{" | "}<a href="#hasCharterRef">{"hasCharterRef"}</a>{">(tcx: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasCharterRef">{"hasCharterRef"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnReceiveAuthorityToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnReceiveAuthorityToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds a mint-delegate-specific authority token to the txn output\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nImplements {@link StellarDelegate.txnReceiveAuthorityToken | txnReceiveAuthorityToken()}.\n\nUses {@link ContractBasedDelegate.mkDelegationDatum | mkDelegationDatum()} to make the inline Datum for the output.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnReceiveAuthorityToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", tokenValue: "}<a href="#Value">{"Value"}</a>{", fromFoundUtxo?: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
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


        </div>

    );
}
    