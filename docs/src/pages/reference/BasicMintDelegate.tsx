import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>BasicMintDelegate</h2>
                    <ReactMarkdown>
                        {
                            "Serves a delegated minting-policy role for Capo contracts\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nshifts detailed minting policy out of the minter and into the delegate.\n\nBy default, this delegate policy serves also as a spend delegate. To use a separate spend delegate, define `static isMintAndSpendDelegate = false;` in the subclass, define a separate ContractBasedDelegate subclass for the spend delegate, and register it in the Capo contract's `delegateRoles.spendDelegate`.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#currentRev"><var>currentRev</var></a>, &nbsp;
                    <a href="#defaultParams"><var>defaultParams</var></a>, &nbsp;
                    <a href="#isMintAndSpendDelegate"><var>isMintAndSpendDelegate</var></a>, &nbsp;
                    <a href="#isMintDelegate"><var>isMintDelegate</var></a>
          </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#dataBridgeClass"><var>dataBridgeClass</var></a>, &nbsp;
                    <a href="#delegateName"><var>delegateName</var></a>, &nbsp;
                    <a href="#needsGovAuthority"><var>needsGovAuthority</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#activityCreatingDataDelegate"><var>activityCreatingDataDelegate()</var></a>, &nbsp;
                    <a href="#activityCreatingDelegatedData"><var>activityCreatingDelegatedData()</var></a>, &nbsp;
                    <a href="#mkDatumScriptReference"><var>mkDatumScriptReference()</var></a>, &nbsp;
                    <a href="#scriptBundle"><var>scriptBundle()</var></a>, &nbsp;
                    <a href="#txnGrantAuthority"><var>txnGrantAuthority()</var></a>
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
{"static get defaultParams(): "}{"{\n        delegateName: string;\n        isMintDelegate: boolean;\n        isDgDataPolicy: boolean;\n        isSpendDelegate: boolean;\n        requiresGovAuthority: boolean;\n        rev: bigint;\n    }"}{";"}
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
    



    <h3>Instance properties</h3>
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
        <a id="needsGovAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "needsGovAuthority"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get needsGovAuthority(): "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="activityCreatingDataDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityCreatingDataDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "A mint-delegate activity indicating that a delegated-data controller UUT is being created to govern a class of delegated data. ONLY the indicated data-controller UUT must be minted, and is expected to be deposited into the data-controller's policy-script address. Use the {@link DelegatedDataContract} class to create the off-chain data controller and its on-chain policy.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"activityCreatingDataDelegate(seedFrom: "}<a href="#hasSeed">{"hasSeed"}</a>{", uutPurpose: "}{"string"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityCreatingDelegatedData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityCreatingDelegatedData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "A mint-delegate activity indicating that a delegated-data controller will be governing creation of a specific piece of delegated data. No further redeemer details are needed here, but the data-delegate's controller-token may have additional details in ITS redeemer.\n\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"activityCreatingDelegatedData(seedFrom: "}<a href="#hasSeed">{"hasSeed"}</a>{", uutPurpose: "}{"string"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDatumScriptReference"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkDatumScriptReference"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkDatumScriptReference(): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "scriptBundle"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "the scriptBundle for the BasicMintDelegate looks concrete, but it's actually just referencing a generic, unspecialized delegate script that may not provide much value to any specific application.\n\nSubclasses should expect to override this and provide a specialized `get scriptBundle() { return new ‹YourMintDelegateBundle› }`, using a class you derive from CapoDelegateBundle and your own delegate specialization. TODO: a generator to make this easier. Until then, you can copy the UnspecializedDelegate.hl and specialize it.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"scriptBundle(): "}<a href="#UnspecializedDgtBundle">{"UnspecializedDgtBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnGrantAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnGrantAuthority"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txnGrantAuthority<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", redeemer: "}<a href="#isActivity">{"isActivity"}</a>{", skipReturningDelegate?: "}{"\"skipDelegateReturn\""}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    


<h3>Types referenced</h3>
            <p>see also: dred-network-registry!isActivity:type</p>


            <p>see also: dred-network-registry!GenericDelegateBridgeClass:type</p>


            <p>see also: dred-network-registry!hasSeed:type</p>


            <p>see also: dred-network-registry!UnspecializedDgtBundle:class</p>


            <p>see also: dred-network-registry!StellarTxnContext:class</p>


        </div>

    );
}
    