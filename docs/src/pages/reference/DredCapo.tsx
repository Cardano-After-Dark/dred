import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>DredCapo</h2>
                    <ReactMarkdown>
                        {
                            "\n"
                        }
                    </ReactMarkdown>

            <p></p>

        
      
            <p>
                <b>Instance properties: </b>
                                <a href="#autoSetup"><var>autoSetup</var></a>, &nbsp;
                    <a href="#defaultFeatureFlags"><var>defaultFeatureFlags</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#findNbhRegistryEntries"><var>findNbhRegistryEntries()</var></a>, &nbsp;
                    <a href="#findNodeOpEntries"><var>findNodeOpEntries()</var></a>, &nbsp;
                    <a href="#findSettingsInfo"><var>findSettingsInfo()</var></a>, &nbsp;
                    <a href="#getMintDelegate"><var>getMintDelegate()</var></a>, &nbsp;
                    <a href="#getNbhRegistryController"><var>getNbhRegistryController()</var></a>, &nbsp;
                    <a href="#getNodeRegistryController"><var>getNodeRegistryController()</var></a>, &nbsp;
                    <a href="#getSettingsController"><var>getSettingsController()</var></a>, &nbsp;
                    <a href="#getSpendDelegate"><var>getSpendDelegate()</var></a>, &nbsp;
                    <a href="#mkInitialSettings"><var>mkInitialSettings()</var></a>, &nbsp;
                    <a href="#requirements"><var>requirements()</var></a>, &nbsp;
                    <a href="#scriptBundle"><var>scriptBundle()</var></a>, &nbsp;
                    <a href="#todoAddNamedDelegates"><var>todoAddNamedDelegates()</var></a>, &nbsp;
                    <a href="#txnMintingFungibleTokens"><var>txnMintingFungibleTokens()</var></a>
        </p>



    <h3>Instance properties</h3>
    <div className="prose">
        <a id="autoSetup"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "autoSetup"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"autoSetup: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="defaultFeatureFlags"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "defaultFeatureFlags"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get defaultFeatureFlags(): "}<a href="#DredCapoFeatures">{"DredCapoFeatures"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="findNbhRegistryEntries"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findNbhRegistryEntries"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds all the neighborhood-registration records\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"findNbhRegistryEntries(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<"}<a href="#ErgoNeighborhoodData">{"ErgoNeighborhoodData"}</a>{", unknown>[]>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findNodeOpEntries"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findNodeOpEntries"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds all the node-registration records\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis is a convenience method for finding all the node-registration records. It is equivalent to calling `findDelegatedDataUtxos` with the type `\"DredNode\"`.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"findNodeOpEntries(options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<"}<a href="#ErgoNodeRegistrationData">{"ErgoNodeRegistrationData"}</a>{", unknown>[]>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findSettingsInfo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findSettingsInfo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "locates the current settings for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"findSettingsInfo(options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<"}<a href="#ErgoProtocolSettings">{"ErgoProtocolSettings"}</a>{", "}<a href="#ProtocolSettings">{"ProtocolSettings"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getMintDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the mint delegate for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getMintDelegate(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#MyMintSpendDelegate">{"MyMintSpendDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getNbhRegistryController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getNbhRegistryController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the neighborhood registry controller for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getNbhRegistryController(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#NeighborhoodController">{"NeighborhoodController"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getNodeRegistryController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getNodeRegistryController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the node registry controller for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getNodeRegistryController(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#NodeRegistryController">{"NodeRegistryController"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSettingsController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSettingsController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the settings controller for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getSettingsController(options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        optional?: true;\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#ProtocolSettingsController">{"ProtocolSettingsController"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSpendDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds and instantiates the spend delegate for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getSpendDelegate(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#MyMintSpendDelegate">{"MyMintSpendDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkInitialSettings"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkInitialSettings"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates the initial settings for the capo\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"mkInitialSettings(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#minimalProtocolSettings">{"minimalProtocolSettings"}</a>{">"}{";"}
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
{"requirements(): "}{"import(\"@donecollectively/stellar-contracts\")."}<a href="#ReqtsMap">{"ReqtsMap"}</a>{"<\"Provides a single entry point dApps can use to get tokenomics for their project\" | \"Uses the Capo (leader) to gather tokenomics-related contracts together\" | \"Defines a tokenomics minting delegate\" | \"Has a settings data structure where tokenomics plugins can store protocol parameters\" | \"issues 'membership card' tokens to participants\" | \"Can upgrade the Settings data\" | \"the settings data can be updated to have new details if backward compatible\" | \"Can find membership card tokens for participants\" | \"has custom settings for protocol parameters\" | \"can update the settings\" | \"Provides a Node Operator registry, in which node operators can maintain their node registrations\", \"Provides a single entry point dApps can use to get tokenomics for their project\" | \"Uses the Capo (leader) to gather tokenomics-related contracts together\" | \"Defines a tokenomics minting delegate\" | \"Has a settings data structure where tokenomics plugins can store protocol parameters\" | \"issues 'membership card' tokens to participants\" | \"Can upgrade the Settings data\" | \"the settings data can be updated to have new details if backward compatible\" | \"Can find membership card tokens for participants\"> & import(\"@donecollectively/stellar-contracts\")."}<a href="#ReqtsMap">{"ReqtsMap"}</a>{"<\"Provides a single entry point dApps can use to get tokenomics for their project\" | \"Uses the Capo (leader) to gather tokenomics-related contracts together\" | \"Defines a tokenomics minting delegate\" | \"Has a settings data structure where tokenomics plugins can store protocol parameters\" | \"issues 'membership card' tokens to participants\" | \"Can upgrade the Settings data\" | \"the settings data can be updated to have new details if backward compatible\" | \"Can find membership card tokens for participants\", never>"}{";"}
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
{"scriptBundle(): "}<a href="#CapoHeliosBundle">{"CapoHeliosBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="todoAddNamedDelegates"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "todoAddNamedDelegates"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"todoAddNamedDelegates(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMintingFungibleTokens"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMintingFungibleTokens"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Mints fungible tokens under the Capo's minting policy\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"txnMintingFungibleTokens<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", tokenName: "}{"string | number[]"}{", tokenCount: "}{"bigint"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & import(\"@donecollectively/stellar-contracts\")."}<a href="#hasCharterRef">{"hasCharterRef"}</a>{" & import(\"@donecollectively/stellar-contracts\")."}<a href="#hasGovAuthority">{"hasGovAuthority"}</a>{">"}{";"}
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
    