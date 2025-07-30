import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>DredCapoProviderRaw</h2>
                    <ReactMarkdown>
                        {
                            "component for providing the DredCapo context to the app\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\ndApps shouldn't need to use this component directly. Instead, use the DredCapoProvider component, and use useCapoDappProvider() and/or dredCapoSignals to access the state of the DredCapo.\n\n\n"
        }</ReactMarkdown>
      
         <p>
            <b>Instance methods: </b>
                    <a href="#getStartedMessage"><var>getStartedMessage()</var></a>
        </p>




    <h3>Instance methods</h3>
        <div className="prose">
        <a id="getStartedMessage"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getStartedMessage"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getStartedMessage(): "}{"string"}{";"}
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


        </div>

    );
}
    