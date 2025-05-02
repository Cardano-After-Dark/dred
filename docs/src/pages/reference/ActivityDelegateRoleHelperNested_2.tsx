import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>ActivityDelegateRoleHelperNested_2</h2>
                    <ReactMarkdown>
                        {
                            "Helper class for generating UplcData for variants of the ***DelegateRole*** enum type.\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nthis class is not intended to be used directly. Its methods are available through automatic accesors in the parent struct, contract-datum- or contract-activity-bridges.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#BothMintAndSpendDgt"><var>BothMintAndSpendDgt</var></a>, &nbsp;
                    <a href="#HandledByCapoOnly"><var>HandledByCapoOnly</var></a>, &nbsp;
                    <a href="#MintDgt"><var>MintDgt</var></a>, &nbsp;
                    <a href="#MintInvariant"><var>MintInvariant</var></a>, &nbsp;
                    <a href="#SpendDgt"><var>SpendDgt</var></a>, &nbsp;
                    <a href="#SpendInvariant"><var>SpendInvariant</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#DgDataPolicy"><var>DgDataPolicy()</var></a>, &nbsp;
                    <a href="#OtherNamedDgt"><var>OtherNamedDgt()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="BothMintAndSpendDgt"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "BothMintAndSpendDgt"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::DelegateRole.BothMintAndSpendDgt\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#6***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get BothMintAndSpendDgt(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="HandledByCapoOnly"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "HandledByCapoOnly"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::DelegateRole.HandledByCapoOnly\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#7***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get HandledByCapoOnly(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="MintDgt"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "MintDgt"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::DelegateRole.MintDgt\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#0***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get MintDgt(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="MintInvariant"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "MintInvariant"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::DelegateRole.MintInvariant\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#2***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get MintInvariant(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="SpendDgt"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "SpendDgt"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::DelegateRole.SpendDgt\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#1***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get SpendDgt(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="SpendInvariant"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "SpendInvariant"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "(property getter): UplcData for ***\"CapoDelegateHelpers::DelegateRole.SpendInvariant\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- ***tagOnly*** variant accessor returns an empty ***constrData#3***\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get SpendInvariant(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="DgDataPolicy"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "DgDataPolicy"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::DelegateRole.DgDataPolicy\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n#### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"DgDataPolicy(name: "}{"string"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="OtherNamedDgt"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "OtherNamedDgt"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "generates isActivity/redeemer wrapper with UplcData for ***\"CapoDelegateHelpers::DelegateRole.OtherNamedDgt\"***\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n#### Nested activity: this is connected to a nested-activity wrapper, so the details are piped through the parent's uplc-encoder, producing a single uplc object with a complete wrapper for this inner activity detail.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"OtherNamedDgt(name: "}{"string"}{"): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    


<h3>Types referenced</h3>
            <p>see also: dred-network-registry!isActivity:type</p>


        </div>

    );
}
    