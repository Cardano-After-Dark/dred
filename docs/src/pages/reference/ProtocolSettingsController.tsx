import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>ProtocolSettingsController</h2>
                    <ReactMarkdown>
                        {
                            "\n"
                        }
                    </ReactMarkdown>

            <p></p>

        
      
            <p>
                <b>Instance properties: </b>
                                <a href="#capo"><var>capo</var></a>, &nbsp;
                    <a href="#dataBridgeClass"><var>dataBridgeClass</var></a>, &nbsp;
                    <a href="#delegateName"><var>delegateName</var></a>, &nbsp;
                    <a href="#idPrefix"><var>idPrefix</var></a>, &nbsp;
                    <a href="#recordTypeName"><var>recordTypeName</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#exampleData"><var>exampleData()</var></a>, &nbsp;
                    <a href="#initialSettingsData"><var>initialSettingsData()</var></a>, &nbsp;
                    <a href="#requirements"><var>requirements()</var></a>, &nbsp;
                    <a href="#scriptBundle"><var>scriptBundle()</var></a>
        </p>



    <h3>Instance properties</h3>
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
{"get capo(): "}<a href="#DredCapo">{"DredCapo"}</a>{";"}
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
{"dataBridgeClass: "}{"typeof "}<a href="#ProtocolSettingsDataBridge">{"ProtocolSettingsDataBridge"}</a>{";"}
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
        <a id="idPrefix"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "idPrefix"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get idPrefix(): "}{"\"set\""}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="recordTypeName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "recordTypeName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get recordTypeName(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="exampleData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "exampleData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"exampleData(): "}<a href="#minimalProtocolSettings">{"minimalProtocolSettings"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="initialSettingsData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "initialSettingsData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "creates settings data with minting-policy hashes prepared for each membership tier\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"initialSettingsData(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#minimalProtocolSettings">{"minimalProtocolSettings"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="requirements"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "requirements"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"requirements(): "}{"import(\"@donecollectively/stellar-contracts\")."}<a href="#ReqtsMap">{"ReqtsMap"}</a>{"<never, never>"}{";"}
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
{"scriptBundle(): "}{"any"}{";"}
            </code></pre>
    
    </div>
    


<h3>Types referenced</h3>
            <p>see also: dred-network-registry!~DredCapoFeatures:type</p>


            <p>see also: @donecollectively/stellar-contracts!FoundDatumUtxo:type</p>


            ?? unknown type: <a href="doc/ErgoNeighborhoodData">ErgoNeighborhoodData</a> = dred-network-registry!ErgoNeighborhoodData:type<br/>


            <p>see also: @donecollectively/stellar-contracts!CharterData:type</p>


            <p>see also: dred-network-registry!~ErgoNodeRegistrationData_2:type</p>


            ?? unknown type: <a href="doc/ErgoProtocolSettings">ErgoProtocolSettings</a> = dred-network-registry!ErgoProtocolSettings:type<br/>


            <p>see also: dred-network-registry!~ProtocolSettings:interface</p>


            <p>see also: dred-network-registry!~CapoDatum$Ergo$CharterData:type</p>


            <p>see also: stellar-tokenomics!STokMintDelegate:class</p>



        <div>
            <div>
            <h4>MyMintSpendDelegate</h4>
                <ReactMarkdown>
                {
                    "\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            <p>see also: @donecollectively/stellar-contracts!DelegatedDataContract:class</p>


            ?? unknown type: <a href="doc/ErgoNeighborhoodData">ErgoNeighborhoodData</a> = dred-network-registry!ErgoNeighborhoodData:type<br/>


            <p>see also: dred-network-registry!~NeighborhoodDataLike:interface</p>



        <div>
            <div>
            <h4>NeighborhoodController</h4>
                <ReactMarkdown>
                {
                    "\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            ?? unknown type: <a href="doc/ErgoNodeRegistrationData">ErgoNodeRegistrationData</a> = dred-network-registry!ErgoNodeRegistrationData:type<br/>


            <p>see also: dred-network-registry!~NodeRegistrationDataLike:interface</p>



        <div>
            <div>
            <h4>NodeRegistryController</h4>
                <ReactMarkdown>
                {
                    "\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            <p>see also: dred-network-registry!~ProtocolSettingsLike:interface</p>



        <div>
            <div>
            <h4>ProtocolSettingsController</h4>
                <ReactMarkdown>
                {
                    "\n"
                }
                </ReactMarkdown>
            </div>

            <p></p>

        
        </div>
    

            <p>see also: dred-network-registry!~minimalProtocolSettings:type</p>


            <p>see also: @donecollectively/stellar-contracts!ReqtsMap:type</p>


            <p>see also: @donecollectively/stellar-contracts!CapoHeliosBundle:class</p>


            <p>see also: @donecollectively/stellar-contracts!StellarTxnContext:class</p>


            <p>see also: @donecollectively/stellar-contracts!hasCharterRef:type</p>


            <p>see also: @donecollectively/stellar-contracts!hasGovAuthority:type</p>


            <p>see also: dred-network-registry!~MyMintSpendDelegateDataBridge:class</p>


            <p>see also: @donecollectively/stellar-contracts!CapoDelegateBundle:class</p>


            <p>see also: stellar-tokenomics!StellarTokenomicsCapo:class</p>



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
    

            <p>see also: dred-network-registry!~NeighborhoodPolicyDataBridge:class</p>


            ?? unknown type: <a href="doc/minimalNeighborhoodData">minimalNeighborhoodData</a> = dred-network-registry!minimalNeighborhoodData:type<br/>


            ?? unknown type: <a href="doc/minimalNeighborhoodData">minimalNeighborhoodData</a> = dred-network-registry!minimalNeighborhoodData:type<br/>


            <p>see also: @donecollectively/stellar-contracts!hasUutContext:type</p>


            <p>see also: @donecollectively/stellar-contracts!anyState:interface</p>


            <p>see also: stellar-tokenomics!hasMemberToken:type</p>


            <p>see also: @donecollectively/stellar-contracts!hasSeedUtxo:type</p>


            ?? unknown type: <a href="doc/ErgoNeighborhoodData">ErgoNeighborhoodData</a> = dred-network-registry!ErgoNeighborhoodData:type<br/>


            ?? unknown type: <a href="doc/NeighborhoodData">NeighborhoodData</a> = dred-network-registry!NeighborhoodData:interface<br/>


            <p>see also: @donecollectively/stellar-contracts!DgDataUpdateOptions:type</p>


            <p>see also: dred-network-registry!~DredNodeRegistryPolicyDataBridge:class</p>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/ErgoNodeRegistrationData">ErgoNodeRegistrationData</a> = dred-network-registry!ErgoNodeRegistrationData:type<br/>


            ?? unknown type: <a href="doc/minimalNodeRegistrationData">minimalNodeRegistrationData</a> = dred-network-registry!minimalNodeRegistrationData:type<br/>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/ErgoNodeRegistrationData">ErgoNodeRegistrationData</a> = dred-network-registry!ErgoNodeRegistrationData:type<br/>


            ?? unknown type: <a href="doc/minimalNodeRegistrationData">minimalNodeRegistrationData</a> = dred-network-registry!minimalNodeRegistrationData:type<br/>


            <p>see also: @donecollectively/stellar-contracts!hasSettingsRef:type</p>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/ErgoNodeRegistrationData">ErgoNodeRegistrationData</a> = dred-network-registry!ErgoNodeRegistrationData:type<br/>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/ErgoNodeRegistrationData">ErgoNodeRegistrationData</a> = dred-network-registry!ErgoNodeRegistrationData:type<br/>


            ?? unknown type: <a href="doc/NodeRegistrationData">NodeRegistrationData</a> = dred-network-registry!NodeRegistrationData:interface<br/>


            ?? unknown type: <a href="doc/ErgoNodeRegistrationData">ErgoNodeRegistrationData</a> = dred-network-registry!ErgoNodeRegistrationData:type<br/>


            <p>see also: dred-network-registry!~ProtocolSettingsPolicyDataBridge:class</p>


        </div>

    );
}
    