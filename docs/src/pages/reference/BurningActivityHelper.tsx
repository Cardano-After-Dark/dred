import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>BurningActivityHelper</h2>
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
                    <a href="#_placeholder1BA"><var>_placeholder1BA()</var></a>
        </p>




    <h3>Instance methods</h3>
        <div className="prose">
        <a id="_placeholder1BA"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_placeholder1BA"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates UplcData for ***\"UnspecializedDelegate::BurningActivity._placeholder1BA\"***\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"_placeholder1BA(recId: "}{"number[]"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
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
    