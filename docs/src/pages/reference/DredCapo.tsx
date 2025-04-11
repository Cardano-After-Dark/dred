import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>DredCapo</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#autoSetup">autoSetup</a>, 
                    <a href="#defaultFeatureFlags">defaultFeatureFlags</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#findNbhRegistryEntries">findNbhRegistryEntries</a>, 
                    <a href="#findNodeOpVaultEntries">findNodeOpVaultEntries</a>, 
                    <a href="#findSettingsInfo">findSettingsInfo</a>, 
                    <a href="#getMintDelegate">getMintDelegate</a>, 
                    <a href="#getNbhRegistryController">getNbhRegistryController</a>, 
                    <a href="#getNodeRegistryController">getNodeRegistryController</a>, 
                    <a href="#getSettingsController">getSettingsController</a>, 
                    <a href="#getSpendDelegate">getSpendDelegate</a>, 
                    <a href="#initDelegateRoles">initDelegateRoles</a>, 
                    <a href="#mkConfigData">mkConfigData</a>, 
                    <a href="#mkInitialSettings">mkInitialSettings</a>, 
                    <a href="#requirements">requirements</a>, 
                    <a href="#scriptBundle">scriptBundle</a>, 
                    <a href="#todoAddNamedDelegates">todoAddNamedDelegates</a>, 
                    <a href="#txnMintingFungibleTokens">txnMintingFungibleTokens</a>
        </p>



    <h3>Instance properties</h3>
            <h4>    <b>{"autoSetup"}</b></h4>
            <pre>
{""}
{"autoSetup: "}{"boolean"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"defaultFeatureFlags"}</b></h4>
            <pre>
{""}
{"get defaultFeatureFlags(): "}<a href="#DredCapoFeatures">{"DredCapoFeatures"}</a>{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"findNbhRegistryEntries"}</b></h4>
            <pre>
{""}
{"findNbhRegistryEntries(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<import(\"@donecollectively/stellar-contracts\")."}<a href="#AnyDataTemplate">{"AnyDataTemplate"}</a>{"<\"dredNbh\", any>, unknown>[]>"}{";"}
            </pre>
    
    

        <h4>    <b>{"findNodeOpVaultEntries"}</b></h4>
            <pre>
{""}
{"findNodeOpVaultEntries(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<import(\"@donecollectively/stellar-contracts\")."}<a href="#AnyDataTemplate">{"AnyDataTemplate"}</a>{"<\"dredNode\", any>, unknown>[]>"}{";"}
            </pre>
    
    

        <h4>    <b>{"findSettingsInfo"}</b></h4>
            <pre>
{""}
{"findSettingsInfo(options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<"}<a href="#ErgoProtocolSettings">{"ErgoProtocolSettings"}</a>{", "}<a href="#ProtocolSettings">{"ProtocolSettings"}</a>{">>"}{";"}
            </pre>
    
    

        <h4>    <b>{"getMintDelegate"}</b></h4>
            <pre>
{""}
{"getMintDelegate(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#MyMintSpendDelegate">{"MyMintSpendDelegate"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"getNbhRegistryController"}</b></h4>
            <pre>
{""}
{"getNbhRegistryController(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#NeighborhoodController">{"NeighborhoodController"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"getNodeRegistryController"}</b></h4>
            <pre>
{""}
{"getNodeRegistryController(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#NodeRegistryController">{"NodeRegistryController"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"getSettingsController"}</b></h4>
            <pre>
{""}
{"getSettingsController(options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        optional?: true;\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#ProtocolSettingsController">{"ProtocolSettingsController"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"getSpendDelegate"}</b></h4>
            <pre>
{""}
{"getSpendDelegate(charterData?: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#MyMintSpendDelegate">{"MyMintSpendDelegate"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"initDelegateRoles"}</b></h4>
            <pre>
{""}
{"initDelegateRoles(): "}{"import(\"@donecollectively/stellar-contracts\")."}<a href="#DelegateMap">{"DelegateMap"}</a>{"<{\n        readonly govAuthority: import(\"@donecollectively/stellar-contracts\")."}<a href="#DelegateSetup">{"DelegateSetup"}</a>{"<\"authority\", import(\"@donecollectively/stellar-contracts\")."}<a href="#StellarDelegate">{"StellarDelegate"}</a>{", any>;\n        readonly spendDelegate: import(\"@donecollectively/stellar-contracts\")."}<a href="#DelegateSetup">{"DelegateSetup"}</a>{"<\"spendDgt\", any, {}>;\n        readonly mintDelegate: import(\"@donecollectively/stellar-contracts\")."}<a href="#DelegateSetup">{"DelegateSetup"}</a>{"<\"mintDgt\", any, {}>;\n        readonly settings: import(\"@donecollectively/stellar-contracts\")."}<a href="#DelegateSetup">{"DelegateSetup"}</a>{"<\"dgDataPolicy\", any, {}>;\n        readonly nodeOpRegistry: import(\"@donecollectively/stellar-contracts\")."}<a href="#DelegateSetup">{"DelegateSetup"}</a>{"<\"dgDataPolicy\", any, {}>;\n        readonly nbhRegistry: import(\"@donecollectively/stellar-contracts\")."}<a href="#DelegateSetup">{"DelegateSetup"}</a>{"<\"dgDataPolicy\", any, {}>;\n    }>"}{";"}
            </pre>
    
    

        <h4>    <b>{"mkConfigData"}</b></h4>
            <pre>
{""}
{"mkConfigData(): "}{"import(\"@helios-lang/uplc\")."}<a href="#MapData">{"MapData"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"mkInitialSettings"}</b></h4>
            <pre>
{""}
{"mkInitialSettings(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#minimalProtocolSettings">{"minimalProtocolSettings"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"requirements"}</b></h4>
            <pre>
{""}
{"requirements(): "}{"any"}{";"}
            </pre>
    
    

        <h4>    <b>{"scriptBundle"}</b></h4>
            <pre>
{""}
{"scriptBundle(): "}<a href="#CapoHeliosBundle">{"CapoHeliosBundle"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"todoAddNamedDelegates"}</b></h4>
            <pre>
{""}
{"todoAddNamedDelegates(): "}{"void"}{";"}
            </pre>
    
    

        <h4>    <b>{"txnMintingFungibleTokens"}</b></h4>
            <pre>
{""}
{"txnMintingFungibleTokens<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", tokenName: "}{"string | number[]"}{", tokenCount: "}{"bigint"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & import(\"@donecollectively/stellar-contracts\")."}<a href="#hasCharterRef">{"hasCharterRef"}</a>{" & import(\"@donecollectively/stellar-contracts\")."}<a href="#hasGovAuthority">{"hasGovAuthority"}</a>{">"}{";"}
            </pre>
    
    

        </div>

    );
}
    