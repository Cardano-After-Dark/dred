import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>BurningActivityHelperNested_3</h2>
                    <ReactMarkdown>
                        {
                            "Helper class for generating UplcData for variants of the ***BurningActivity*** enum type.\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
      
         <p>
            <b>Instance methods: </b>
                    <a href="#DeletingRecord"><var>DeletingRecord()</var></a>
        </p>




    <h3>Instance methods</h3>
        <div className="prose">
        <a id="DeletingRecord"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "DeletingRecord"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"DredNodeRegistryPolicy::BurningActivity.DeletingRecord\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n#### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"DeletingRecord(id: "}{"number[]"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
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
    