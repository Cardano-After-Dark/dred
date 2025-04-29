import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>StellarTxnContext</h2>
                    <ReactMarkdown>
                        {
                            "Transaction-building context for Stellar Contract transactions\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nUses same essential facade as Helios Tx.\n\nAdds a transaction-state container with strong typing of its contents, enabling transaction-building code to use type-sensitive auto-complete and allowing Stellar Contracts library code to require transaction contexts having known states.\n\nRetains reflection capabilities to allow utxo-finding utilities to exclude utxo's already included in the contract.\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#_builtTx"><var>_builtTx</var></a>, &nbsp;
                    <a href="#_txnEndTime"><var>_txnEndTime</var></a>, &nbsp;
                    <a href="#_txnTime"><var>_txnTime</var></a>, &nbsp;
                    <a href="#_validityPeriodSet"><var>_validityPeriodSet</var></a>, &nbsp;
                    <a href="#actorContext"><var>actorContext</var></a>, &nbsp;
                    <a href="#actorWallet"><var>actorWallet</var></a>, &nbsp;
                    <a href="#addlTxns"><var>addlTxns</var></a>, &nbsp;
                    <a href="#allNeededWitnesses"><var>allNeededWitnesses</var></a>, &nbsp;
                    <a href="#alreadyPresent"><var>alreadyPresent</var></a>, &nbsp;
                    <a href="#builtTx"><var>builtTx</var></a>, &nbsp;
                    <a href="#childReservedUtxos"><var>childReservedUtxos</var></a>, &nbsp;
                    <a href="#collateral"><var>collateral</var></a>, &nbsp;
                    <a href="#currentBatch"><var>currentBatch</var></a>, &nbsp;
                    <a href="#depth"><var>depth</var></a>, &nbsp;
                    <a href="#feeLimit"><var>feeLimit</var></a>, &nbsp;
                    <a href="#id"><var>id</var></a>, &nbsp;
                    <a href="#inputs"><var>inputs</var></a>, &nbsp;
                    <a href="#isFacade"><var>isFacade</var></a>, &nbsp;
                    <a href="#logger"><var>logger</var></a>, &nbsp;
                    <a href="#networkParams"><var>networkParams</var></a>, &nbsp;
                    <a href="#otherPartySigners"><var>otherPartySigners</var></a>, &nbsp;
                    <a href="#outputs"><var>outputs</var></a>, &nbsp;
                    <a href="#parentId"><var>parentId</var></a>, &nbsp;
                    <a href="#parentTcx"><var>parentTcx</var></a>, &nbsp;
                    <a href="#setup"><var>setup</var></a>, &nbsp;
                    <a href="#state"><var>state</var></a>, &nbsp;
                    <a href="#txb"><var>txb</var></a>, &nbsp;
                    <a href="#txnEndTime"><var>txnEndTime</var></a>, &nbsp;
                    <a href="#txnName"><var>txnName</var></a>, &nbsp;
                    <a href="#txnTime"><var>txnTime</var></a>, &nbsp;
                    <a href="#txRefInputs"><var>txRefInputs</var></a>, &nbsp;
                    <a href="#uh"><var>uh</var></a>, &nbsp;
                    <a href="#wallet"><var>wallet</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#addCollateral"><var>addCollateral()</var></a>, &nbsp;
                    <a href="#addInput"><var>addInput()</var></a>, &nbsp;
                    <a href="#addOutput"><var>addOutput()</var></a>, &nbsp;
                    <a href="#addRefInput"><var>addRefInput()</var></a>, &nbsp;
                    <a href="#addRefInputs"><var>addRefInputs()</var></a>, &nbsp;
                    <a href="#addScript"><var>addScript()</var></a>, &nbsp;
                    <a href="#addScriptProgram"><var>addScriptProgram()</var></a>, &nbsp;
                    <a href="#addSignature"><var>addSignature()</var></a>, &nbsp;
                    <a href="#addState"><var>addState()</var></a>, &nbsp;
                    <a href="#addUut"><var>addUut()</var></a>, &nbsp;
                    <a href="#assertNumber"><var>assertNumber()</var></a>, &nbsp;
                    <a href="#attachScript"><var>attachScript()</var></a>, &nbsp;
                    <a href="#build"><var>build()</var></a>, &nbsp;
                    <a href="#buildAndQueue"><var>buildAndQueue()</var></a>, &nbsp;
                    <a href="#buildAndQueueAll"><var>buildAndQueueAll()</var></a>, &nbsp;
                    <a href="#dump"><var>dump()</var></a>, &nbsp;
                    <a href="#dump"><var>dump()</var></a>, &nbsp;
                    <a href="#emitCostDetails"><var>emitCostDetails()</var></a>, &nbsp;
                    <a href="#facade"><var>facade()</var></a>, &nbsp;
                    <a href="#findAnySpareUtxos"><var>findAnySpareUtxos()</var></a>, &nbsp;
                    <a href="#findChangeAddr"><var>findChangeAddr()</var></a>, &nbsp;
                    <a href="#finish"><var>finish()</var></a>, &nbsp;
                    <a href="#flush"><var>flush()</var></a>, &nbsp;
                    <a href="#futureDate"><var>futureDate()</var></a>, &nbsp;
                    <a href="#getSeedAttrs"><var>getSeedAttrs()</var></a>, &nbsp;
                    <a href="#getSeedUtxoDetails"><var>getSeedUtxoDetails()</var></a>, &nbsp;
                    <a href="#includeAddlTxn"><var>includeAddlTxn()</var></a>, &nbsp;
                    <a href="#log"><var>log()</var></a>, &nbsp;
                    <a href="#mintTokens"><var>mintTokens()</var></a>, &nbsp;
                    <a href="#noFacade"><var>noFacade()</var></a>, &nbsp;
                    <a href="#queueAddlTxns"><var>queueAddlTxns()</var></a>, &nbsp;
                    <a href="#reservedUtxos"><var>reservedUtxos()</var></a>, &nbsp;
                    <a href="#resolveMultipleTxns"><var>resolveMultipleTxns()</var></a>, &nbsp;
                    <a href="#slotToTime"><var>slotToTime()</var></a>, &nbsp;
                    <a href="#submitAll"><var>submitAll()</var></a>, &nbsp;
                    <a href="#submitTxnChain"><var>submitTxnChain()</var></a>, &nbsp;
                    <a href="#timeToSlot"><var>timeToSlot()</var></a>, &nbsp;
                    <a href="#utxoNotReserved"><var>utxoNotReserved()</var></a>, &nbsp;
                    <a href="#validFor"><var>validFor()</var></a>, &nbsp;
                    <a href="#wasModified"><var>wasModified()</var></a>, &nbsp;
                    <a href="#withAddlTxns"><var>withAddlTxns()</var></a>, &nbsp;
                    <a href="#withName"><var>withName()</var></a>, &nbsp;
                    <a href="#withParent"><var>withParent()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="_builtTx"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_builtTx"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_builtTx?: "}<a href="#Tx">{"Tx"}</a>{" | "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#Tx">{"Tx"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_txnEndTime"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_txnEndTime"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_txnEndTime?: "}<a href="#Date">{"Date"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_txnTime"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_txnTime"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_txnTime?: "}<a href="#Date">{"Date"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_validityPeriodSet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_validityPeriodSet"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_validityPeriodSet: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="actorContext"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "actorContext"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get actorContext(): "}<a href="#ActorContext">{"ActorContext"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="actorWallet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "actorWallet"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get actorWallet(): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addlTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "addlTxns"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"get addlTxns(): "}<a href="#Record">{"Record"}</a>{"<string, "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, \"buildLater!\">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="allNeededWitnesses"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "allNeededWitnesses"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"allNeededWitnesses: "}<a href="#Address">{"Address"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="alreadyPresent"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "alreadyPresent"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"alreadyPresent: "}<a href="#TxNotNeededError">{"TxNotNeededError"}</a>{" | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="builtTx"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "builtTx"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get builtTx(): "}<a href="#Tx">{"Tx"}</a>{" | "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#Tx">{"Tx"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="childReservedUtxos"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "childReservedUtxos"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"childReservedUtxos: "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="collateral"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "collateral"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"collateral?: "}<a href="#TxInput">{"TxInput"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="currentBatch"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "currentBatch"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get currentBatch(): "}<a href="#BatchSubmitController_2">{"BatchSubmitController_2"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="depth"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "depth"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"depth: "}{"number"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="feeLimit"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "feeLimit"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"feeLimit?: "}{"bigint"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="id"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "id"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"id: "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="inputs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "inputs"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"inputs: "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isFacade"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isFacade"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"isFacade: "}{"true | false | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="logger"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "logger"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"logger: "}<a href="#UplcConsoleLogger">{"UplcConsoleLogger"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="networkParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "networkParams"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get networkParams(): "}<a href="#NetworkParams">{"NetworkParams"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="otherPartySigners"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "otherPartySigners"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"otherPartySigners: "}<a href="#PubKeyHash">{"PubKeyHash"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="outputs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "outputs"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"outputs: "}<a href="#TxOutput">{"TxOutput"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="parentId"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "parentId"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"parentId: "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="parentTcx"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "parentTcx"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"parentTcx?: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="setup"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "setup"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"setup: "}<a href="#SetupInfo">{"SetupInfo"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="state"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "state"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"state: "}{"S"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txb"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txb"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txb: "}<a href="#TxBuilder">{"TxBuilder"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnEndTime"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "txnEndTime"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get txnEndTime(): "}<a href="#Date">{"Date"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txnName: "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnTime"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "txnTime"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Identifies the time at which the current transaction is expected to be executed. Use this attribute in any transaction-building code that sets date/time values for the transaction. Honors any futureDate() setting or uses the current time if none has been set.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"get txnTime(): "}<a href="#Date">{"Date"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txRefInputs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txRefInputs"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txRefInputs: "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="uh"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "uh"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get uh(): "}<a href="#UtxoHelper">{"UtxoHelper"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="wallet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "wallet"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get wallet(): "}<a href="#Wallet">{"Wallet"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="addCollateral"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addCollateral"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addCollateral(collateral: "}<a href="#TxInput">{"TxInput"}</a>{"): "}{"this"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addInput"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addInput"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addInput<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<S>"}{">(this: "}{"TCX"}{", input: "}<a href="#TxInput">{"TxInput"}</a>{", r?: "}<a href="#isActivity">{"isActivity"}</a>{"): "}{"TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addOutput"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addOutput"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addOutput<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<S>"}{">(this: "}{"TCX"}{", output: "}<a href="#TxOutput">{"TxOutput"}</a>{"): "}{"TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addRefInput"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addRefInput"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "adds a reference input to the transaction context\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nidempotent version of helios addRefInput()\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"addRefInput<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<S>"}{">(this: "}{"TCX"}{", input: "}<a href="#TxInput">{"TxInput"}</a>{"<any>"}{", refScript?: "}<a href="#UplcProgramV2">{"UplcProgramV2"}</a>{"): "}{"TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addRefInputs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addRefInputs"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"addRefInputs<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<S>"}{">(this: "}{"TCX"}{", ...args: "}<a href="#addRefInputArgs">{"addRefInputArgs"}</a>{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addScript"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "To add a script to the transaction context, use `attachScript`\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"addScript(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addScriptProgram"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addScriptProgram"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds a UPLC program to the transaction context, increasing the transaction size.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nUse the Capo's `txnAttachScriptOrRefScript()` method to use a referenceScript when available. That method uses a fallback approach adding the script to the transaction if needed.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"addScriptProgram(...args: "}<a href="#Parameters">{"Parameters"}</a>{"<"}<a href="#TxBuilder">{"TxBuilder"}</a>{"[\"attachUplcProgram\"]>"}{"): "}{"this"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addSignature"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addSignature"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addSignature(wallet: "}<a href="#Wallet">{"Wallet"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addState"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addState"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addState<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", K extends "}{"string"}{", V>(this: "}{"TCX"}{", key: "}{"K"}{", value: "}{"V"}{"): "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<{\n        [keyName in K]: V;\n    } & "}<a href="#anyState">{"anyState"}</a>{"> & TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addUut"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addUut"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addUut<T extends "}{"string"}{", TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(this: "}{"TCX"}{", uutName: "}<a href="#UutName">{"UutName"}</a>{", ...names: "}{"T[]"}{"): "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<T> & TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="assertNumber"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "assertNumber"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"assertNumber(obj: "}{"any"}{", msg?: "}{"string"}{"): "}{"number"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="attachScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "attachScript"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"attachScript(...args: "}<a href="#Parameters">{"Parameters"}</a>{"<"}<a href="#TxBuilder">{"TxBuilder"}</a>{"[\"attachUplcProgram\"]>"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="build"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "build"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"build(this: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>"}{", { signers, addlTxInfo, beforeValidate, paramsOverride, expectError, }?: "}{"{\n        signers?: "}<a href="#Address">{"Address"}</a>{"[];\n        addlTxInfo?: "}<a href="#Pick">{"Pick"}</a>{"<"}<a href="#TxDescription">{"TxDescription"}</a>{"<any, \"buildLater!\">, \"description\">;\n        beforeValidate?: (tx: "}<a href="#Tx">{"Tx"}</a>{") => "}<a href="#Promise">{"Promise"}</a>{"<any> | any;\n        paramsOverride?: "}<a href="#Partial">{"Partial"}</a>{"<"}<a href="#NetworkParams">{"NetworkParams"}</a>{">;\n        expectError?: boolean;\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#BuiltTcx">{"BuiltTcx"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="buildAndQueue"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "buildAndQueue"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Submits only the current transaction.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nTo also submit additional transactions, use the `submitAll()` method.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"buildAndQueue(this: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>"}{", submitOptions?: "}<a href="#SubmitOptions">{"SubmitOptions"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="buildAndQueueAll"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "buildAndQueueAll"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"buildAndQueueAll(this: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>"}{", options?: "}<a href="#SubmitOptions">{"SubmitOptions"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<boolean | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="dump"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "dump"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"dump(tx?: "}<a href="#Tx">{"Tx"}</a>{"): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="dump"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "dump"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"dump(): "}<a href="#Promise">{"Promise"}</a>{"<string>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="emitCostDetails"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "emitCostDetails"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"emitCostDetails(tx: "}<a href="#Tx">{"Tx"}</a>{", costs: "}{"{\n        total: "}<a href="#Cost">{"Cost"}</a>{";\n        [key: string]: "}<a href="#Cost">{"Cost"}</a>{";\n    }"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="facade"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "facade"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"facade(this: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"): "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<this> & {\n        isFacade: true;\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findAnySpareUtxos"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findAnySpareUtxos"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findAnySpareUtxos(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{"[] | never>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findChangeAddr"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findChangeAddr"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findChangeAddr(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#Address">{"Address"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="finish"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "finish"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"finish(): "}{"this"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="flush"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "flush"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"flush(): "}{"this"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="futureDate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "futureDate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Sets a future date for the transaction to be executed, returning the transaction context. Call this before calling validFor().\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nReturns the txn context. Throws an error if the transaction already has a txnTime set.\n\nThis method does not itself set the txn's validity interval. You MUST combine it with a call to validFor(), to set the txn's validity period. The resulting transaction will be valid from the moment set here until the end of the validity period set by validFor().\n\nThis can be used anytime to construct a transaction valid in the future. This is particularly useful during test scenarios to verify time-sensitive behaviors.\n\nIn the test environment, the network wil normally be advanced to this date before executing the transaction, unless a different execution time is indicated. Use the test helper's `submitTxnWithBlock(txn, {futureDate})` or `advanceNetworkTimeForTx()` methods, or args to use-case-specific functions that those methods.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"futureDate<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<S>"}{">(this: "}{"TCX"}{", date: "}<a href="#Date">{"Date"}</a>{"): "}{"TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSeedAttrs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSeedAttrs"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getSeedAttrs<TCX extends "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">(this: "}{"TCX"}{"): "}<a href="#SeedAttrs">{"SeedAttrs"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSeedUtxoDetails"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSeedUtxoDetails"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getSeedUtxoDetails(this: "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{"): "}<a href="#SeedAttrs">{"SeedAttrs"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="includeAddlTxn"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "includeAddlTxn"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"includeAddlTxn<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{", RETURNS extends "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX>"}{" = "}{"TCX extends "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<any> ? TCX : "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX>"}{">(this: "}{"TCX"}{", txnName: "}{"string"}{", txInfoIn: "}<a href="#Omit">{"Omit"}</a>{"<"}<a href="#TxDescription">{"TxDescription"}</a>{"<any, \"buildLater!\">, \"id\" | \"depth\" | \"parentId\"> & {\n        id?: string;\n    }"}{"): "}{"RETURNS"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="log"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "log"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"log(...msgs: "}{"string[]"}{"): "}{"this"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mintTokens"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mintTokens"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mintTokens(...args: "}<a href="#MintTokensParams">{"MintTokensParams"}</a>{"): "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<S>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="noFacade"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "noFacade"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"noFacade(situation: "}{"string"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="queueAddlTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "queueAddlTxns"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Executes additional transactions indicated by an existing transaction\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nDuring the off-chain txn-creation process, additional transactions may be queued for execution. This method is used to register those transactions, along with any chained transactions THEY may trigger.\n\nThe TxBatcher and batch-controller classes handle wallet-signing and submission of the transactions for execution.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"queueAddlTxns(this: "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<any>"}{", pipelineOptions?: "}<a href="#TxPipelineOptions">{"TxPipelineOptions"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<any[] | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="reservedUtxos"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "reservedUtxos"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"reservedUtxos(): "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="resolveMultipleTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "resolveMultipleTxns"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Resolves a list of tx descriptions to full tcx's, without handing any of their any chained/nested txns.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nif submitEach is provided, each txn will be submitted as it is resolved. If submitEach is not provided, then the network must be capable of tx-chaining use submitTxnChain() to submit a list of txns with chaining\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"resolveMultipleTxns(txns: "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, \"buildLater!\">[]"}{", pipelineOptions?: "}<a href="#TxPipelineOptions">{"TxPipelineOptions"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="slotToTime"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "slotToTime"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Calculates the time (in milliseconds in 01/01/1970) associated with a given slot number.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"slotToTime(slot: "}{"bigint"}{"): "}{"bigint"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="submitAll"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "submitAll"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Submits the current transaction and any additional transactions in the context.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nTo submit only the current transaction, use the `submit()` method.\n\nUses the TxBatcher to create a new batch of transactions. This new batch overlays a TxChainBuilder on the current network-client, using that facade to provide utxos for chained transactions in the batch.\n\nThe signers array can be used to add additional signers to the transaction, and is passed through to the submit() for the current txn only; it is not used for any additional transactions.\n\nThe beforeSubmit, onSubmitted callbacks are used for each additional transaction.\n\nbeforeSubmit can be used to notify the user of the transaction about to be submitted, and can also be used to add additional signers to the transaction or otherwise modify it (by returning the modified transaction).\n\nonSubmitted can be used to notify the user that the transaction has been submitted, or for logging or any other post-submission processing.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"submitAll(this: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>"}{", options?: "}<a href="#SubmitOptions">{"SubmitOptions"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<boolean>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="submitTxnChain"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "submitTxnChain"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"submitTxnChain(options?: "}{"{\n        txns?: "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, \"buildLater!\">[];\n    } & "}<a href="#TxPipelineOptions">{"TxPipelineOptions"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<any[] | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="timeToSlot"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "timeToSlot"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Calculates the slot number associated with a given time.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"timeToSlot(time: "}{"bigint"}{"): "}{"bigint"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="utxoNotReserved"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "utxoNotReserved"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"utxoNotReserved(u: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#TxInput">{"TxInput"}</a>{" | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="validFor"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "validFor"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Sets an on-chain validity period for the transaction, in miilliseconds\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nif futureDate() has been set on the transaction, that date will be used as the starting point for the validity period.\n\nReturns the transaction context for chaining.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"validFor<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<S>"}{">(this: "}{"TCX"}{", durationMs: "}{"number"}{"): "}{"TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="wasModified"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "wasModified"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"wasModified(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="withAddlTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "withAddlTxns"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "augments a transaction context with a type indicator that it has additional transactions to be submitted.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThe optional argument can also be used to include additional transactions to be chained after the current transaction.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"withAddlTxns<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{">(this: "}{"TCX"}{", addlTxns?: "}<a href="#Record">{"Record"}</a>{"<string, "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, \"buildLater!\">>"}{"): "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="withName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "withName"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"withName(name: "}{"string"}{"): "}{"this"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="withParent"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "withParent"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"withParent(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>"}{"): "}{"this"}{";"}
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


            <p>see also: dred-network-registry!TxNotNeededError:class</p>


            <p>see also: dred-network-registry!UplcConsoleLogger:class</p>


            <p>see also: dred-network-registry!addRefInputArgs:type</p>


            <p>see also: dred-network-registry!BuiltTcx:type</p>


            <p>see also: dred-network-registry!SeedAttrs:type</p>


            <p>see also: dred-network-registry!MintTokensParams:type</p>


            <p>see also: dred-network-registry!TxPipelineOptions:type</p>


        </div>

    );
}
    