import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>BatchSubmitController</h2>
                    <ReactMarkdown>
                        {
                            "Gathers and manages submission of a batch of linked transactions\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nInitialized with a pool of named submitters, the batch-submit controller gathers a set of transactions in collaboration with one or more transaction-context (\"tcx\" or StellarTxnContext) objects.\n\nThose tcx's provide the batch controller with a set of tx-descriptions, either describing themselves `{id, description, tcx, ...}` or describing a set of linked `addlTxns`. Each of those linked transactions may itself resolve to a tcx having its own bounded set of `addlTxns`. This leads to an eventually-bounded tree of resolved transactions, each having a short, locally-unique string `id`. The submit controller shepherds those transactions through their path from being known-but-abstract (description-only), to being resolved, then signed as needed and submitted through TxSubmitMgr objects.\n\nThe tx-descriptions added to the batch-controller are exposed for presentation in the UI layer, and each one also contains a notifier object - an event emitter that the UI can use to easily subscribe to changes in the state of each transaction as it makes progress.\n\nIt is expected that the transaction batch will generally be signed as a unit after on-screen review, either with a wallet-specific \"sign multiple\" strategy or using a series of individual tx-signing interactions (i.e. with less-capable wallet interfaces). To achieve this, the batch controller is designed to use a signing-strategy object, which works in the abstract on either individual transactions or the entire batch. When working with wallets having various different mechanisms or APIs for multi-signing (or not having them), the strategy object provides a simple interface to support wallet-specific implementation of the intended result.\n\nFor single-tx-signers, the signing-strategy object is expected to indicate step-wise progress, so the UI can be signalled to incrementally present related details about each tx as appropriate for the dApp's user-interaction model). Full-batch signing strategies SHOULD NOT emit single-tx signing signals.\n\nOnce the signature(s) are collected for any tx, the submit-controller creates txSubmitMgrs for that tx, and it aggregates the net state of each transaction's submission progress. The aggregated information about per-tx progress is included in state updates emitted to subscribers of that transaction's change-notification events, for UI-level presentation purposes.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#_mainnet"><var>_mainnet</var></a>, &nbsp;
                    <a href="#$allTxns"><var>$allTxns</var></a>, &nbsp;
                    <a href="#$registeredTxs"><var>$registeredTxs</var></a>, &nbsp;
                    <a href="#$stateInfoCombined"><var>$stateInfoCombined</var></a>, &nbsp;
                    <a href="#$stateShortSummary"><var>$stateShortSummary</var></a>, &nbsp;
                    <a href="#$txChanges"><var>$txChanges</var></a>, &nbsp;
                    <a href="#$txStates"><var>$txStates</var></a>, &nbsp;
                    <a href="#chainBuilder"><var>chainBuilder</var></a>, &nbsp;
                    <a href="#destroyed"><var>destroyed</var></a>, &nbsp;
                    <a href="#isConfirmationComplete"><var>isConfirmationComplete</var></a>, &nbsp;
                    <a href="#isOpen"><var>isOpen</var></a>, &nbsp;
                    <a href="#nextUpdate"><var>nextUpdate</var></a>, &nbsp;
                    <a href="#setup"><var>setup</var></a>, &nbsp;
                    <a href="#signingStrategy"><var>signingStrategy</var></a>, &nbsp;
                    <a href="#submitOptions"><var>submitOptions</var></a>, &nbsp;
                    <a href="#submitters"><var>submitters</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#$addTxns"><var>$addTxns()</var></a>, &nbsp;
                    <a href="#$addTxns"><var>$addTxns()</var></a>, &nbsp;
                    <a href="#$addTxns"><var>$addTxns()</var></a>, &nbsp;
                    <a href="#$signAndSubmitAll"><var>$signAndSubmitAll()</var></a>, &nbsp;
                    <a href="#$txInfo"><var>$txInfo()</var></a>, &nbsp;
                    <a href="#addTxDescr"><var>addTxDescr()</var></a>, &nbsp;
                    <a href="#changeTxId"><var>changeTxId()</var></a>, &nbsp;
                    <a href="#destroy"><var>destroy()</var></a>, &nbsp;
                    <a href="#isMainnet"><var>isMainnet()</var></a>, &nbsp;
                    <a href="#map"><var>map()</var></a>, &nbsp;
                    <a href="#notDestroyed"><var>notDestroyed()</var></a>, &nbsp;
                    <a href="#reqts"><var>reqts()</var></a>, &nbsp;
                    <a href="#submitToTestnet"><var>submitToTestnet()</var></a>, &nbsp;
                    <a href="#txError"><var>txError()</var></a>, &nbsp;
                    <a href="#txId"><var>txId()</var></a>, &nbsp;
                    <a href="#updateAggregateState"><var>updateAggregateState()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="_mainnet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "_mainnet"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"readonly _mainnet: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$allTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "$allTxns"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get $allTxns(): "}<a href="#TxSubmissionTracker">{"TxSubmissionTracker"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$registeredTxs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$registeredTxs"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$registeredTxs: "}<a href="#AllTxSubmissionStates">{"AllTxSubmissionStates"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$stateInfoCombined"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$stateInfoCombined"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$stateInfoCombined: "}<a href="#aggregatedStateString">{"aggregatedStateString"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$stateShortSummary"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$stateShortSummary"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$stateShortSummary: "}<a href="#stateSummary">{"stateSummary"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$txChanges"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$txChanges"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$txChanges: "}<a href="#EventEmitter">{"EventEmitter"}</a>{"<"}<a href="#TxBatchChangeNotifier">{"TxBatchChangeNotifier"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$txStates"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$txStates"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$txStates: "}<a href="#AllTxSubmissionStates">{"AllTxSubmissionStates"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="chainBuilder"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "chainBuilder"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get chainBuilder(): "}<a href="#TxChainBuilder">{"TxChainBuilder"}</a>{" | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="destroyed"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "destroyed"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"destroyed: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isConfirmationComplete"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isConfirmationComplete"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"isConfirmationComplete: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isOpen"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isOpen"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"isOpen: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="nextUpdate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "nextUpdate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"nextUpdate?: "}<a href="#TimeoutId">{"TimeoutId"}</a>{";"}
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
        <a id="signingStrategy"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "signingStrategy"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"signingStrategy: "}<a href="#WalletSigningStrategy">{"WalletSigningStrategy"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="submitOptions"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "submitOptions"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"submitOptions: "}<a href="#SubmitOptions">{"SubmitOptions"}</a>{" & "}<a href="#TxSubmitCallbacks">{"TxSubmitCallbacks"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="submitters"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "submitters"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"readonly submitters: "}<a href="#namedSubmitters">{"namedSubmitters"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="$addTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$addTxns"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$addTxns(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$addTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$addTxns"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$addTxns(txd: "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, any>"}{"): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$addTxns"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$addTxns"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$addTxns(txds: "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, any>[]"}{"): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$signAndSubmitAll"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$signAndSubmitAll"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "triggers all the transactions in the batch to be signed and submitted.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nWhile the transactions are being signed, the signing-strategy object will emit incremental status updates (the \"signingSingleTx\" event) if it only supports signing one tx at a time. If it supports multiple tx signing, it should emit a single \"signingAll\" event instead.\n\nUI implementations are expected to listen for signingSingleTx events and present a useful summary of the current transation being signed, to ease the user's understanding of the signing process.\n\nIf signing is successful, the batch controller will continue by submitting each transation for submission through each of the submitters configured on the batch controller.\n\nThe controller and individual tx-submission trackers will continue emitting status update events as each tx makes progress. UIs should continue reflecting updated state information to the user.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"$signAndSubmitAll(): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="$txInfo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "$txInfo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"$txInfo(id: "}{"string"}{"): "}<a href="#TxSubmissionTracker">{"TxSubmissionTracker"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addTxDescr"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addTxDescr"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addTxDescr(txd: "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, any>"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="changeTxId"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "changeTxId"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"changeTxId(oldId: "}{"string"}{", newId: "}{"string"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="destroy"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "destroy"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"destroy(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isMainnet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isMainnet"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"isMainnet(): "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="map"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "map"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"map<T>(fn: "}{"((txd: "}<a href="#TxSubmissionTracker">{"TxSubmissionTracker"}</a>{", i: number) => T) | ((txd: "}<a href="#TxSubmissionTracker">{"TxSubmissionTracker"}</a>{") => T)"}{"): "}{"T[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="notDestroyed"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "notDestroyed"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"notDestroyed(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="reqts"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "reqts"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"reqts(): "}{"{\n        \"allows multiple underlying submitters\": {\n            purpose: string;\n            mech: string[];\n        };\n        \"uses the basic hasUtxo() function to check for transaction inclusion\": {\n            purpose: string;\n            mech: string[];\n        };\n        \"accepts multiple txns for persistent async submission\": {\n            purpose: string;\n            mech: string[];\n        };\n        \"is resistant to slot battles and rollbacks\": {\n            purpose: string;\n            mech: string[];\n        };\n        \"has an organized structure for the state of submitting each txn\": {\n            purpose: string;\n            mech: string[];\n        };\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="submitToTestnet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "submitToTestnet"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"submitToTestnet(txd: "}<a href="#TxDescription">{"TxDescription"}</a>{"<any, \"built\">"}{", tracker: "}<a href="#TxSubmissionTracker">{"TxSubmissionTracker"}</a>{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txError"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txError"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txError(txd: "}<a href="#TxDescriptionWithError">{"TxDescriptionWithError"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txId"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txId"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txId(tx: "}<a href="#Tx">{"Tx"}</a>{"): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="updateAggregateState"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "updateAggregateState"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Updates the aggregate state of the tx batch and notifies listeners\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThe aggregate state is a summary of the state of all the tx's in the batch.\n\nIt counts the number of tx's in each state, and emits a `statusUpdate` event to the batch-controller's {@link BatchSubmitController.$txChanges | txChanges} event stream.\n\nThe result is\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"updateAggregateState(): "}{"void"}{";"}
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


        </div>

    );
}
    