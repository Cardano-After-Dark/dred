import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>StellarContract</h2>
                    <ReactMarkdown>
                        {
                            "Basic wrapper and off-chain facade for interacting with a single Plutus contract script\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis class is normally used only for individual components of a higher-level {@link Capo | Capo or Leader contract}, which act as delegates within its application context. Nonetheless, it is the base class for every Capo as well as simpler contract scripts.\n\nThe StellarContract class serves as an off-chain facade for transaction-building and interfacing to any on-chain contract script. Each StellarContract subclass must define a `contractSource()`, which is currently a Helios-language script, compiled in any Javascript environment to an on-chain executable UPLC or \"plutus core\" form. This enables a static dApp to be self-sovereign, without need for any server (\"application back-end\") environment.\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#defaultParams"><var>defaultParams</var></a>
          </p>
            <p>
                <b>Static / class methods: </b>
                                <a href="#createWith"><var>createWith()</var></a>, &nbsp;
                    <a href="#parseConfig"><var>parseConfig()</var></a>
            </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#_bundle"><var>_bundle</var></a>, &nbsp;
                    <a href="#_cache"><var>_cache</var></a>, &nbsp;
                    <a href="#_compiledScript"><var>_compiledScript</var></a>, &nbsp;
                    <a href="#_dataBridge"><var>_dataBridge</var></a>, &nbsp;
                    <a href="#_utxoHelper"><var>_utxoHelper</var></a>, &nbsp;
                    <a href="#activity"><var>activity</var></a>, &nbsp;
                    <a href="#actorContext"><var>actorContext</var></a>, &nbsp;
                    <a href="#address"><var>address</var></a>, &nbsp;
                    <a href="#canPartialConfig"><var>canPartialConfig</var></a>, &nbsp;
                    <a href="#compiledScript"><var>compiledScript</var></a>, &nbsp;
                    <a href="#configIn"><var>configIn</var></a>, &nbsp;
                    <a href="#dataBridgeClass"><var>dataBridgeClass</var></a>, &nbsp;
                    <a href="#datumType"><var>datumType</var></a>, &nbsp;
                    <a href="#identity"><var>identity</var></a>, &nbsp;
                    <a href="#isConfigured"><var>isConfigured</var></a>, &nbsp;
                    <a href="#isConnected"><var>isConnected</var></a>, &nbsp;
                    <a href="#mintingPolicyHash"><var>mintingPolicyHash</var></a>, &nbsp;
                    <a href="#missingActorError"><var>missingActorError</var></a>, &nbsp;
                    <a href="#network"><var>network</var></a>, &nbsp;
                    <a href="#networkParams"><var>networkParams</var></a>, &nbsp;
                    <a href="#newReadDatum"><var>newReadDatum</var></a>, &nbsp;
                    <a href="#offchain"><var>offchain</var></a>, &nbsp;
                    <a href="#onchain"><var>onchain</var></a>, &nbsp;
                    <a href="#onChainActivitiesType"><var>onChainActivitiesType</var></a>, &nbsp;
                    <a href="#onChainDatumType"><var>onChainDatumType</var></a>, &nbsp;
                    <a href="#onChainTypes"><var>onChainTypes</var></a>, &nbsp;
                    <a href="#optimize"><var>optimize</var></a>, &nbsp;
                    <a href="#partialConfig"><var>partialConfig</var></a>, &nbsp;
                    <a href="#program"><var>program</var></a>, &nbsp;
                    <a href="#reader"><var>reader</var></a>, &nbsp;
                    <a href="#scriptActivitiesName"><var>scriptActivitiesName</var></a>, &nbsp;
                    <a href="#scriptDatumName"><var>scriptDatumName</var></a>, &nbsp;
                    <a href="#setup"><var>setup</var></a>, &nbsp;
                    <a href="#uh"><var>uh</var></a>, &nbsp;
                    <a href="#usesContractScript"><var>usesContractScript</var></a>, &nbsp;
                    <a href="#utxoHelper"><var>utxoHelper</var></a>, &nbsp;
                    <a href="#validatorHash"><var>validatorHash</var></a>, &nbsp;
                    <a href="#wallet"><var>wallet</var></a>, &nbsp;
                    <a href="#walletNetworkCheck"><var>walletNetworkCheck</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#activityRedeemer"><var>activityRedeemer()</var></a>, &nbsp;
                    <a href="#activityVariantToUplc"><var>activityVariantToUplc()</var></a>, &nbsp;
                    <a href="#ADA"><var>ADA()</var></a>, &nbsp;
                    <a href="#asyncCompiledScript"><var>asyncCompiledScript()</var></a>, &nbsp;
                    <a href="#delegateAddrHint"><var>delegateAddrHint()</var></a>, &nbsp;
                    <a href="#delegateReqdAddress"><var>delegateReqdAddress()</var></a>, &nbsp;
                    <a href="#findUutSeedUtxo"><var>findUutSeedUtxo()</var></a>, &nbsp;
                    <a href="#getBundle"><var>getBundle()</var></a>, &nbsp;
                    <a href="#getContractScriptParams"><var>getContractScriptParams()</var></a>, &nbsp;
                    <a href="#getOnchainBridge"><var>getOnchainBridge()</var></a>, &nbsp;
                    <a href="#getSeed"><var>getSeed()</var></a>, &nbsp;
                    <a href="#init"><var>init()</var></a>, &nbsp;
                    <a href="#inlineDatum"><var>inlineDatum()</var></a>, &nbsp;
                    <a href="#isDefinitelyMainnet"><var>isDefinitelyMainnet()</var></a>, &nbsp;
                    <a href="#mkTcx"><var>mkTcx()</var></a>, &nbsp;
                    <a href="#mkTcx"><var>mkTcx()</var></a>, &nbsp;
                    <a href="#mustFindMyUtxo"><var>mustFindMyUtxo()</var></a>, &nbsp;
                    <a href="#mustGetActivity"><var>mustGetActivity()</var></a>, &nbsp;
                    <a href="#mustGetEnumVariant"><var>mustGetEnumVariant()</var></a>, &nbsp;
                    <a href="#mustHaveActivity"><var>mustHaveActivity()</var></a>, &nbsp;
                    <a href="#outputsSentToDatum"><var>outputsSentToDatum()</var></a>, &nbsp;
                    <a href="#paramsToUplc"><var>paramsToUplc()</var></a>, &nbsp;
                    <a href="#prepareBundleWithScriptParams"><var>prepareBundleWithScriptParams()</var></a>, &nbsp;
                    <a href="#scriptBundle"><var>scriptBundle()</var></a>, &nbsp;
                    <a href="#submit"><var>submit()</var></a>, &nbsp;
                    <a href="#tcxWithSeedUtxo"><var>tcxWithSeedUtxo()</var></a>, &nbsp;
                    <a href="#txnKeepValue"><var>txnKeepValue()</var></a>, &nbsp;
                    <a href="#typeToUplc"><var>typeToUplc()</var></a>
        </p>

    <h3>Static / class properties</h3>
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
{"static get defaultParams(): "}{"{}"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Static / class methods</h3>
    <div className="prose">
        <a id="createWith"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "createWith"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Factory function for a configured instance of the contract\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nDue to boring details of initialization order, this factory function is needed for creating a new instance of the contract.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"static createWith<thisType extends "}<a href="#StellarContract">{"StellarContract"}</a>{"<configType>"}{", configType extends "}<a href="#configBase">{"configBase"}</a>{" = "}{"thisType extends "}<a href="#StellarContract">{"StellarContract"}</a>{"<infer iCT> ? iCT : never"}{">(this: "}<a href="#stellarSubclass">{"stellarSubclass"}</a>{"<any>"}{", args: "}<a href="#StellarSetupDetails">{"StellarSetupDetails"}</a>{"<configType>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#StellarContract">{"StellarContract"}</a>{"<configType> & "}<a href="#InstanceType">{"InstanceType"}</a>{"<typeof "}<a href="#this">{"this"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="parseConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "parseConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static parseConfig(rawJsonConfig: "}{"any"}{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance properties</h3>
    <div className="prose">
        <a id="_bundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_bundle"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_bundle: "}<a href="#HeliosScriptBundle">{"HeliosScriptBundle"}</a>{" | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_cache"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_cache"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_cache: "}<a href="#ComputedScriptProperties">{"ComputedScriptProperties"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_compiledScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_compiledScript"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_compiledScript: "}<a href="#anyUplcProgram">{"anyUplcProgram"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_dataBridge"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_dataBridge"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Provides access to the script's defined on-chain types, using a fluent API for type-safe generation of data conforming to on-chain data formats & types.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"_dataBridge?: "}<a href="#ContractDataBridge">{"ContractDataBridge"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_utxoHelper"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_utxoHelper"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_utxoHelper: "}<a href="#UtxoHelper">{"UtxoHelper"}</a>{";"}
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
{"get activity(): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="actorContext"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "actorContext"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"actorContext: "}<a href="#ActorContext">{"ActorContext"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="address"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "address"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get address(): "}<a href="#Address">{"Address"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="canPartialConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "canPartialConfig"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get canPartialConfig(): "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="compiledScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "compiledScript"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get compiledScript(): "}<a href="#anyUplcProgram">{"anyUplcProgram"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="configIn"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "configIn"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"configIn?: "}{"ConfigType"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="dataBridgeClass"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "dataBridgeClass"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "the dataBridgeClass attribute MUST be defined for any bundle having a datum type - this is the bridge class for converting from off-chain data types to on-chain data - it provides convenient, type-safe interfaces for doing that\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nMinters don't have datum, so they don't need to define this attribute. However, note that ***mint delegates*** do in fact have datum types. If you are defining a custom delegate of that kind, you will need to define this attribute.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"dataBridgeClass: "}<a href="#AbstractNew">{"AbstractNew"}</a>{"<"}<a href="#ContractDataBridge">{"ContractDataBridge"}</a>{"> | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="datumType"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "datumType"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get datumType(): "}<a href="#DataType">{"DataType"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="identity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "identity"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get identity(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isConfigured"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "isConfigured"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get isConfigured(): "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isConnected"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "isConnected"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get isConnected(): "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mintingPolicyHash"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "mintingPolicyHash"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get mintingPolicyHash(): "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{" | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="missingActorError"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "missingActorError"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get missingActorError(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="network"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "network"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get network(): "}<a href="#CardanoClient">{"CardanoClient"}</a>{" | "}<a href="#Emulator">{"Emulator"}</a>{" | "}<a href="#TxChainBuilder">{"TxChainBuilder"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="networkParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "networkParams"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"networkParams: "}<a href="#NetworkParams">{"NetworkParams"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="newReadDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "newReadDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Converts UPLC from an on-chain datum object to a typed off-chain datum object.\n\nGiven a **utxo with a datum of the contract's datum type**, this method will convert the UPLC datum to a typed off-chain datum object.\n\n### Standard WARNING\n\nIf the datum's structure is not of the expected type, this method MAY throw an error, or it might return data that can cause problems somewhere else in your code. That won't happen if you're following the guidance above.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"get newReadDatum(): "}<a href="#findReadDatumType">{"findReadDatumType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="offchain"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "offchain"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "The `offchain` object provides access to readers for the on-chain types of this contract script.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nIts nested attributes include all the on-chain types defined in the script, with data-reading helpers for each. This is useful for reading on-chain data in off-chain code.\n\n### Warning: low-level typed-data access!\n\nNote that these readers will work properly with UPLC data known to be of the correct type. If you encounter errors related to these results, it's likely you are using the wrong reader for the data you have in hand.\n\nFor the typical use-case of reading the datum type from a UTxO held in the contract, this is not a problem, and note that the `readDatum` helper provides a shortcut for this most-common use-case.\n\nIf you're not sure what you're doing, it's likely that this is not the right tool for your job.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get offchain(): "}<a href="#possiblyAbstractContractBridgeType">{"possiblyAbstractContractBridgeType"}</a>{"<this>[\"reader\"]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="onchain"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "onchain"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "The `onchain` object provides access to all bridging capabilities for this contract script.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nIts nested attributes include: - `types` - a collection of all the on-chain types defined in the script, with data-creation helpers for each - `activity` - a creation helper for the activities/redeemers defined in the script\n\nScripts that use datum types (not including minters) will also have: - `datum` - a data-creation helper for the datum type of the script - `readDatum` - a data-reading helper for the datum type of the script\n\n### Low-level type access For low-level access (it's likely you don't need to use this) for on-chain types, the `reader` attribute (aka `offchain`) exists: . - `reader` - a collection of data-reading helpers for the on-chain types, given UPLC data known to be of that type\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get onchain(): "}<a href="#possiblyAbstractContractBridgeType">{"possiblyAbstractContractBridgeType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="onChainActivitiesType"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "onChainActivitiesType"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "returns the on-chain type for activities (\"redeemers\")\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nUse mustGetActivityName() instead, to get the type for a specific activity.\n\nreturns the on-chain enum used for spending contract utxos or for different use-cases of minting (in a minting script). the returned type (and its enum variants) are suitable for off-chain txn-creation override `get onChainActivitiesName()` if needed to match your contract script.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get onChainActivitiesType(): "}<a href="#DataType">{"DataType"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="onChainDatumType"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "onChainDatumType"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "The on-chain type for datum\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis getter provides a class, representing the on-chain enum used for attaching data (or data hashes) to contract utxos the returned type (and its enum variants) are suitable for off-chain txn-creation override `get scriptDatumName()` if needed to match your contract script.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get onChainDatumType(): "}<a href="#DataType">{"DataType"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="onChainTypes"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "onChainTypes"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Returns all the types exposed by the contract script\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nPassed directly from Helios; property names match contract's defined type names\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get onChainTypes(): "}<a href="#Program">{"Program"}</a>{"[\"userTypes\"][string]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="optimize"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "optimize"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"optimize: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="partialConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "partialConfig"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"partialConfig?: "}<a href="#Partial">{"Partial"}</a>{"<ConfigType>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="program"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "program"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get program(): "}<a href="#HeliosProgramWithCacheAPI_2">{"HeliosProgramWithCacheAPI_2"}</a>{";"}
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
{"get reader(): "}<a href="#possiblyAbstractContractBridgeType">{"possiblyAbstractContractBridgeType"}</a>{"<this>[\"reader\"]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptActivitiesName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "scriptActivitiesName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "identifies the enum used for activities (redeemers) in the Helios script\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nOverride this if your contract script uses a type name other than Activity.\n\n\n"
        }</ReactMarkdown>
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
                "identifies the enum used for the script Datum\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nOverride this if your contract script uses a type name other than Datum.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get scriptDatumName(): "}{"string"}{";"}
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
        <a id="uh"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "uh"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Provides access to a UtxoHelper instance\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- same as utxoHelper, but with a shorter name\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get uh(): "}<a href="#UtxoHelper">{"UtxoHelper"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="usesContractScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "usesContractScript"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"usesContractScript: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="utxoHelper"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "utxoHelper"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Provides access to a UtxoHelper instance\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"get utxoHelper(): "}<a href="#UtxoHelper">{"UtxoHelper"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="validatorHash"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "validatorHash"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get validatorHash(): "}<a href="#ValidatorHash">{"ValidatorHash"}</a>{"<unknown>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="wallet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "wallet"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "returns the wallet connection used by the current actor\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThrows an error if the strella contract facade has not been initialized with a wallet in settings.actorContext\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get wallet(): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="walletNetworkCheck"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "walletNetworkCheck"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"walletNetworkCheck?: "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#NetworkName">{"NetworkName"}</a>{"> | "}<a href="#NetworkName">{"NetworkName"}</a>{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="activityRedeemer"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityRedeemer"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"activityRedeemer(activityName: "}{"string"}{", data?: "}{"any"}{"): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityVariantToUplc"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityVariantToUplc"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"activityVariantToUplc(activityName: "}{"string"}{", data: "}{"any"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="ADA"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "ADA"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"ADA(n: "}{"bigint | number"}{"): "}{"bigint"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="asyncCompiledScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "asyncCompiledScript"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"asyncCompiledScript(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#UplcProgramV2">{"UplcProgramV2"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="delegateAddrHint"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "delegateAddrHint"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"delegateAddrHint(): "}<a href="#Address">{"Address"}</a>{"[] | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="delegateReqdAddress"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "delegateReqdAddress"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"delegateReqdAddress(): "}{"false | "}<a href="#Address">{"Address"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findUutSeedUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findUutSeedUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findUutSeedUtxo(uutPurposes: "}{"string[]"}{", tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getBundle"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getBundle(): "}<a href="#HeliosScriptBundle">{"HeliosScriptBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getContractScriptParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getContractScriptParams"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Transforms input configuration to contract script params\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nMay filter out any keys from the ConfigType that are not in the contract script's params. Should add any keys that may be needed by the script and not included in the ConfigType (as delegate scripts do with `delegateName`).\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"getContractScriptParams(config: "}{"ConfigType"}{"): "}<a href="#Partial">{"Partial"}</a>{"<ConfigType> & "}<a href="#Required">{"Required"}</a>{"<"}<a href="#Pick">{"Pick"}</a>{"<ConfigType, \"rev\">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getOnchainBridge"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getOnchainBridge"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getOnchainBridge(): "}<a href="#possiblyAbstractContractBridgeType">{"possiblyAbstractContractBridgeType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSeed"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSeed"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getSeed(arg: "}<a href="#hasSeed">{"hasSeed"}</a>{"): "}<a href="#TxOutputId">{"TxOutputId"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="init"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "init"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "performs async initialization, enabling an async factory pattern\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis method is called by the createWith() factory function, and should not be called directly.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"init(args: "}<a href="#StellarSetupDetails">{"StellarSetupDetails"}</a>{"<ConfigType>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="inlineDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "inlineDatum"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"inlineDatum(datumName: "}{"string"}{", data: "}{"any"}{"): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isDefinitelyMainnet"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isDefinitelyMainnet"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "provides a temporary indicator of mainnet-ness, while not requiring the question to be permanently resolved.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nAllows other methods to proceed prior to the final determination of mainnet status.\n\nAny code using this path should avoid caching a negative result. If you need to determine the actual network being used, getBundle().isMainnet, if present, provides the definitive answer. If that attribute is not yet present, then the mainnet status has not yet been materialized.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"isDefinitelyMainnet(): "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTcx"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTcx"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Reuses an existing transaction context, or creates a new one with the given name and the current actor context\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"mkTcx<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{" | undefined"}{", name?: "}{"string"}{"): "}{"TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTcx"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTcx"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates a new transaction context with the current actor context\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"mkTcx(name?: "}{"string"}{"): "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mustFindMyUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mustFindMyUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Locates a UTxO locked in a validator contract address\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThrows an error if no matching UTxO can be found\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mustFindMyUtxo(semanticName: "}{"string"}{", options: "}{"{\n        predicate: "}<a href="#utxoPredicate">{"utxoPredicate"}</a>{";\n        exceptInTcx?: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{";\n        extraErrorHint?: string;\n        utxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mustGetActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mustGetActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nCross-checks the requested name against the available activities in the script. Throws a helpful error if the requested activity name isn't present.'\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mustGetActivity(activityName: "}{"string"}{"): "}<a href="#EnumMemberType">{"EnumMemberType"}</a>{" | null"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mustGetEnumVariant"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mustGetEnumVariant"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mustGetEnumVariant(enumType: "}<a href="#DataType">{"DataType"}</a>{", variantName: "}{"string"}{"): "}<a href="#EnumMemberType">{"EnumMemberType"}</a>{" | null"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mustHaveActivity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mustHaveActivity"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "asserts the presence of the indicated activity name in the on-chain script\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThe activity name is expected to be found in the script's redeemer enum\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mustHaveActivity(activityName: "}{"string"}{"): "}<a href="#EnumMemberType">{"EnumMemberType"}</a>{" | null"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="outputsSentToDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "outputsSentToDatum"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"outputsSentToDatum(datum: "}<a href="#InlineDatum">{"InlineDatum"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="paramsToUplc"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "paramsToUplc"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"paramsToUplc(params: "}<a href="#Record">{"Record"}</a>{"<string, any>"}{"): "}<a href="#UplcRecord_2">{"UplcRecord_2"}</a>{"<ConfigType>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="prepareBundleWithScriptParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "prepareBundleWithScriptParams"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"prepareBundleWithScriptParams(params: "}<a href="#Partial">{"Partial"}</a>{"<ConfigType> & "}<a href="#Required">{"Required"}</a>{"<"}<a href="#Pick">{"Pick"}</a>{"<ConfigType, \"rev\">>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptBundle"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "scriptBundle"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "each StellarContracts subclass needs to provide a scriptBundle class.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nYour script bundle MUST be defined in a separate file using a convention of `‹scriptName›.hlb.ts`, and exported as a default class. It should inherit from HeliosScriptBundle or one of its subclasses. Stellar Contracts processes this file, analyzes the on-chain types defined in your Helios sources, and generates Typescript types and a data-bridging class for your script.\n\nOnce the data-bridge class is generated, you should import it into your contract module and assign it to your `dataBridgeClass` attribute.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"scriptBundle(): "}<a href="#HeliosScriptBundle">{"HeliosScriptBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="submit"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "submit"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"submit(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", { signers, addlTxInfo, }?: "}{"{\n        signers?: "}<a href="#Address">{"Address"}</a>{"[];\n        addlTxInfo?: "}<a href="#Pick">{"Pick"}</a>{"<"}<a href="#TxDescription">{"TxDescription"}</a>{"<any, any>, \"description\">;\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tcxWithSeedUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tcxWithSeedUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds a free seed-utxo from the user wallet, and adds it to the transaction\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nAccepts a transaction context that may already have a seed. Returns a typed tcx with hasSeedUtxo type.\n\nThe seedUtxo will be consumed in the transaction, so it can never be used again; its value will be returned to the user wallet.\n\nThe seedUtxo is needed for UUT minting, and the transaction is typed with the presence of that seed (found in tcx.state.seedUtxo).\n\nIf a seedUtxo is already present in the transaction context, no additional seedUtxo will be added.\n\nIf a seedUtxo is provided as an argument, that utxo must already be present in the transaction inputs; the state will be updated to reference it.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"tcxWithSeedUtxo<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx?: "}{"TCX"}{", seedUtxo?: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnKeepValue"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnKeepValue"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Returns the indicated Value to the contract script\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"txnKeepValue(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", value: "}<a href="#Value">{"Value"}</a>{", datum: "}<a href="#InlineDatum">{"InlineDatum"}</a>{"): "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState_2">{"anyState_2"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="typeToUplc"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "typeToUplc"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"typeToUplc(type: "}<a href="#DataType">{"DataType"}</a>{", data: "}{"any"}{", path?: "}{"string"}{"): "}<a href="#UplcData">{"UplcData"}</a>{";"}
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


        </div>

    );
}
    