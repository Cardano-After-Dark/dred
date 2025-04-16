import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>Capo</h2>
                    <ReactMarkdown>
                        {
                            "Base class for leader contracts, with predefined roles for cooperating/delegated policies\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nA Capo contract provides a central contract address that can act as a treasury or data registry; it can mint tokens using its connected minting-policy, and it can delegate policies to other contract scripts. Capo contract can use these capabilities in custom ways for strong flexibility.\n\n### Defining Delegates Any Capo contract can define delegateRoles() to establish custom collaborating scripts; these are used for separating granular responsbilities for different functional purposes within your (on-chain and off-chain) application; this approach enables delegates to use any one of multiple strategies with different functional logic to serve in any given role, thus providing flexibility and extensibility.\n\nCapo provides roles for govAuthority and mintDelegate, and methods to facilitate the lifecycle of charter creation & update. Define a delegateRoles data structure using the standalone helper function of that name, use its type in your `extends Capo<...>` clause, and return that delegate map from the `delegateRoles()` method in your subclass.\n\nYou may wish to use the `basicRoles()` helper function to easily access any of the default mint/ spend/ authority delegate definitions, and the defineRole() method to make additional roles for your application's data types.\n\n### The Delegation Pattern and UUTs\n\nThe delegation pattern uses UUTs, which are non-fungible / ***unique utility tokens***. This is equivalent to a \"thread token\" - a provable source of self-authority or legitimacy for contract UTxOs. Without the UUT, a contract UTxO is just a piece of untrusted data; with the UUT, it can be blessed with proactive policy enforcement during creation.\n\nArchitecturally, UUTs provide a simple and unique handle for the Capo to use as a **required transaction element** in key operational activities (like updating the charter details); so that the delegate holding the UUT is entrusted to approved the UUT's inclusion in a transaction, with all the policy-enforcement implicated on the other end of the delegation.\n\nUUTs can be used to form a positive linkage between the Capo (which should normally retain a reference to that UUT) and any delegate; that delegate is most commonly another contract script also referenced within the roles() definition.\n\n* **Example: Multisig authority delegation** - a Capo contract would get much more complicated if it contained multisig logic. Instead, the governance authority for the Capo can be delegated to a standalone multi-sig contract, which can contain all (and only) the multi-sig logic. Separating the responsibilities makes each part simpler, easing the process of ensuring each part is doing its job :pray:\n\n### UUTs and Delegated Data\n\nUUTs can also be used as a form of uniqueness for data stored in the Capo's UTxOs (i.e. a record id). The UTxO only lasts until it is spent, but the UUT's identity can continue along with any value and connected data.\n\nPolicy delegates provide on-chain delegation of authority for the Capo's data, while being upgradable to support the evolving needs of the application. Delegated datums store data of various types at the Capo's address, while delegate policies, each at its own address are invoked to enforce creation and update rules for each type of data.\n\n\n"
        }</ReactMarkdown>
      
            <p>
                <b>Static / class properties: </b>
                            <a href="#currentRev"><var>currentRev</var></a>, &nbsp;
                    <a href="#defaultParams"><var>defaultParams</var></a>
          </p>
            <p>
                <b>Static / class methods: </b>
                                <a href="#bootstrapWith"><var>bootstrapWith()</var></a>, &nbsp;
                    <a href="#currentConfig"><var>currentConfig()</var></a>
            </p>
            <p>
                <b>Instance properties: </b>
                                <a href="#_delegateCache"><var>_delegateCache</var></a>, &nbsp;
                    <a href="#_delegateRoles"><var>_delegateRoles</var></a>, &nbsp;
                    <a href="#activity"><var>activity</var></a>, &nbsp;
                    <a href="#autoSetup"><var>autoSetup</var></a>, &nbsp;
                    <a href="#bootstrapping"><var>bootstrapping</var></a>, &nbsp;
                    <a href="#canPartialConfig"><var>canPartialConfig</var></a>, &nbsp;
                    <a href="#charterTokenAsValue"><var>charterTokenAsValue</var></a>, &nbsp;
                    <a href="#charterTokenPredicate"><var>charterTokenPredicate</var></a>, &nbsp;
                    <a href="#dataBridgeClass"><var>dataBridgeClass</var></a>, &nbsp;
                    <a href="#delegateRoles"><var>delegateRoles</var></a>, &nbsp;
                    <a href="#didDryRun"><var>didDryRun</var></a>, &nbsp;
                    <a href="#isChartered"><var>isChartered</var></a>, &nbsp;
                    <a href="#minter"><var>minter</var></a>, &nbsp;
                    <a href="#minterClass"><var>minterClass</var></a>, &nbsp;
                    <a href="#mintingPolicyHash"><var>mintingPolicyHash</var></a>, &nbsp;
                    <a href="#mkDatum"><var>mkDatum</var></a>, &nbsp;
                    <a href="#mph"><var>mph</var></a>, &nbsp;
                    <a href="#needsCoreDelegateUpdates"><var>needsCoreDelegateUpdates</var></a>, &nbsp;
                    <a href="#newReadDatum"><var>newReadDatum</var></a>, &nbsp;
                    <a href="#offchain"><var>offchain</var></a>, &nbsp;
                    <a href="#onchain"><var>onchain</var></a>, &nbsp;
                    <a href="#scriptActivitiesName"><var>scriptActivitiesName</var></a>, &nbsp;
                    <a href="#scriptDatumName"><var>scriptDatumName</var></a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#activitySpendingDelegatedDatum"><var>activitySpendingDelegatedDatum()</var></a>, &nbsp;
                    <a href="#activityUpdatingCharter"><var>activityUpdatingCharter()</var></a>, &nbsp;
                    <a href="#activityUsingAuthority"><var>activityUsingAuthority()</var></a>, &nbsp;
                    <a href="#addressAuthorityConfig"><var>addressAuthorityConfig()</var></a>, &nbsp;
                    <a href="#addSeedUtxo"><var>addSeedUtxo()</var></a>, &nbsp;
                    <a href="#addStrellaWithConfig"><var>addStrellaWithConfig()</var></a>, &nbsp;
                    <a href="#addTxnBootstrappingSettings"><var>addTxnBootstrappingSettings()</var></a>, &nbsp;
                    <a href="#basicDelegateRoles"><var>basicDelegateRoles()</var></a>, &nbsp;
                    <a href="#canFindCharterUtxo"><var>canFindCharterUtxo()</var></a>, &nbsp;
                    <a href="#commitPendingChangesIfNeeded"><var>commitPendingChangesIfNeeded()</var></a>, &nbsp;
                    <a href="#connectDelegateWithOnchainRDLink"><var>connectDelegateWithOnchainRDLink()</var></a>, &nbsp;
                    <a href="#connectMintingScript"><var>connectMintingScript()</var></a>, &nbsp;
                    <a href="#extractDelegateLinkDetails"><var>extractDelegateLinkDetails()</var></a>, &nbsp;
                    <a href="#findActorUut"><var>findActorUut()</var></a>, &nbsp;
                    <a href="#findCapoUtxos"><var>findCapoUtxos()</var></a>, &nbsp;
                    <a href="#findCharterData"><var>findCharterData()</var></a>, &nbsp;
                    <a href="#findCharterData"><var>findCharterData()</var></a>, &nbsp;
                    <a href="#findDelegatedDataUtxos"><var>findDelegatedDataUtxos()</var></a>, &nbsp;
                    <a href="#findGovDelegate"><var>findGovDelegate()</var></a>, &nbsp;
                    <a href="#findPendingChange"><var>findPendingChange()</var></a>, &nbsp;
                    <a href="#findRefScriptUtxo"><var>findRefScriptUtxo()</var></a>, &nbsp;
                    <a href="#findScriptReferences"><var>findScriptReferences()</var></a>, &nbsp;
                    <a href="#findSettingsInfo"><var>findSettingsInfo()</var></a>, &nbsp;
                    <a href="#getBundle"><var>getBundle()</var></a>, &nbsp;
                    <a href="#getDelegateRoles"><var>getDelegateRoles()</var></a>, &nbsp;
                    <a href="#getDgDataController"><var>getDgDataController()</var></a>, &nbsp;
                    <a href="#getGovDelegate"><var>getGovDelegate()</var></a>, &nbsp;
                    <a href="#getMintDelegate"><var>getMintDelegate()</var></a>, &nbsp;
                    <a href="#getMinterParams"><var>getMinterParams()</var></a>, &nbsp;
                    <a href="#getNamedDelegate"><var>getNamedDelegate()</var></a>, &nbsp;
                    <a href="#getNamedDelegates"><var>getNamedDelegates()</var></a>, &nbsp;
                    <a href="#getOtherNamedDelegate"><var>getOtherNamedDelegate()</var></a>, &nbsp;
                    <a href="#getSettingsController"><var>getSettingsController()</var></a>, &nbsp;
                    <a href="#getSpendDelegate"><var>getSpendDelegate()</var></a>, &nbsp;
                    <a href="#hasPolicyInManifest"><var>hasPolicyInManifest()</var></a>, &nbsp;
                    <a href="#init"><var>init()</var></a>, &nbsp;
                    <a href="#initDelegateRoles"><var>initDelegateRoles()</var></a>, &nbsp;
                    <a href="#mkAdditionalTxnsForCharter"><var>mkAdditionalTxnsForCharter()</var></a>, &nbsp;
                    <a href="#mkDatumScriptReference"><var>mkDatumScriptReference()</var></a>, &nbsp;
                    <a href="#mkDelegatePredicate"><var>mkDelegatePredicate()</var></a>, &nbsp;
                    <a href="#mkImpliedDelegationDetails"><var>mkImpliedDelegationDetails()</var></a>, &nbsp;
                    <a href="#mkOnchainRelativeDelegateLink"><var>mkOnchainRelativeDelegateLink()</var></a>, &nbsp;
                    <a href="#mkRefScriptTxn"><var>mkRefScriptTxn()</var></a>, &nbsp;
                    <a href="#mkTxnAddingMintInvariant"><var>mkTxnAddingMintInvariant()</var></a>, &nbsp;
                    <a href="#mkTxnAddingNamedDelegate"><var>mkTxnAddingNamedDelegate()</var></a>, &nbsp;
                    <a href="#mkTxnAddingSpendInvariant"><var>mkTxnAddingSpendInvariant()</var></a>, &nbsp;
                    <a href="#mkTxnAddManifestEntry"><var>mkTxnAddManifestEntry()</var></a>, &nbsp;
                    <a href="#mkTxnCommittingPendingChanges"><var>mkTxnCommittingPendingChanges()</var></a>, &nbsp;
                    <a href="#mkTxnInstallingPolicyDelegate"><var>mkTxnInstallingPolicyDelegate()</var></a>, &nbsp;
                    <a href="#mkTxnInstallPolicyDelegate"><var>mkTxnInstallPolicyDelegate()</var></a>, &nbsp;
                    <a href="#mkTxnMintCharterToken"><var>mkTxnMintCharterToken()</var></a>, &nbsp;
                    <a href="#mkTxnQueuingDelegateChange"><var>mkTxnQueuingDelegateChange()</var></a>, &nbsp;
                    <a href="#mkTxnUpdateCharter"><var>mkTxnUpdateCharter()</var></a>, &nbsp;
                    <a href="#mkTxnUpdatingMintDelegate"><var>mkTxnUpdatingMintDelegate()</var></a>, &nbsp;
                    <a href="#mkTxnUpdatingSpendDelegate"><var>mkTxnUpdatingSpendDelegate()</var></a>, &nbsp;
                    <a href="#mkTxnUpgradeIfNeeded"><var>mkTxnUpgradeIfNeeded()</var></a>, &nbsp;
                    <a href="#mkValuesBurningDelegateUut"><var>mkValuesBurningDelegateUut()</var></a>, &nbsp;
                    <a href="#mustFindCharterUtxo"><var>mustFindCharterUtxo()</var></a>, &nbsp;
                    <a href="#mustGetDelegate"><var>mustGetDelegate()</var></a>, &nbsp;
                    <a href="#offchainLink"><var>offchainLink()</var></a>, &nbsp;
                    <a href="#parseDelegateLinksInCharter"><var>parseDelegateLinksInCharter()</var></a>, &nbsp;
                    <a href="#parseDgtConfig"><var>parseDgtConfig()</var></a>, &nbsp;
                    <a href="#requirements"><var>requirements()</var></a>, &nbsp;
                    <a href="#scriptBundle"><var>scriptBundle()</var></a>, &nbsp;
                    <a href="#serializeDgtConfig"><var>serializeDgtConfig()</var></a>, &nbsp;
                    <a href="#showDelegateLink"><var>showDelegateLink()</var></a>, &nbsp;
                    <a href="#singleItem"><var>singleItem()</var></a>, &nbsp;
                    <a href="#tcxWithCharterData"><var>tcxWithCharterData()</var></a>, &nbsp;
                    <a href="#tcxWithCharterRef"><var>tcxWithCharterRef()</var></a>, &nbsp;
                    <a href="#tcxWithSettingsRef"><var>tcxWithSettingsRef()</var></a>, &nbsp;
                    <a href="#tempMkDelegateLinkForQueuingDgtChange"><var>tempMkDelegateLinkForQueuingDgtChange()</var></a>, &nbsp;
                    <a href="#tokenAsValue"><var>tokenAsValue()</var></a>, &nbsp;
                    <a href="#tvCharter"><var>tvCharter()</var></a>, &nbsp;
                    <a href="#tvForDelegate"><var>tvForDelegate()</var></a>, &nbsp;
                    <a href="#txnAddCharterRef"><var>txnAddCharterRef()</var></a>, &nbsp;
                    <a href="#txnAddGovAuthority"><var>txnAddGovAuthority()</var></a>, &nbsp;
                    <a href="#txnAddGovAuthorityTokenRef"><var>txnAddGovAuthorityTokenRef()</var></a>, &nbsp;
                    <a href="#txnAddNamedDelegateAuthority"><var>txnAddNamedDelegateAuthority()</var></a>, &nbsp;
                    <a href="#txnAttachScriptOrRefScript"><var>txnAttachScriptOrRefScript()</var></a>, &nbsp;
                    <a href="#txnCreateConfiguredDelegate"><var>txnCreateConfiguredDelegate()</var></a>, &nbsp;
                    <a href="#txnCreateOffchainDelegateLink"><var>txnCreateOffchainDelegateLink()</var></a>, &nbsp;
                    <a href="#txnKeepCharterToken"><var>txnKeepCharterToken()</var></a>, &nbsp;
                    <a href="#txnMintingUuts"><var>txnMintingUuts()</var></a>, &nbsp;
                    <a href="#txnMkAddlRefScriptTxn"><var>txnMkAddlRefScriptTxn()</var></a>, &nbsp;
                    <a href="#txnMustGetSeedUtxo"><var>txnMustGetSeedUtxo()</var></a>, &nbsp;
                    <a href="#txnMustUseCharterUtxo"><var>txnMustUseCharterUtxo()</var></a>, &nbsp;
                    <a href="#txnMustUseCharterUtxo"><var>txnMustUseCharterUtxo()</var></a>, &nbsp;
                    <a href="#txnMustUseSpendDelegate"><var>txnMustUseSpendDelegate()</var></a>, &nbsp;
                    <a href="#txnUpdateCharterUtxo"><var>txnUpdateCharterUtxo()</var></a>, &nbsp;
                    <a href="#txnWillMintUuts"><var>txnWillMintUuts()</var></a>, &nbsp;
                    <a href="#uutsValue"><var>uutsValue()</var></a>, &nbsp;
                    <a href="#uutsValue"><var>uutsValue()</var></a>, &nbsp;
                    <a href="#uutsValue"><var>uutsValue()</var></a>, &nbsp;
                    <a href="#verifyConfigs"><var>verifyConfigs()</var></a>, &nbsp;
                    <a href="#verifyCoreDelegates"><var>verifyCoreDelegates()</var></a>
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
{"static get defaultParams(): "}{"{\n        rev: bigint;\n    }"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Static / class methods</h3>
    <div className="prose">
        <a id="bootstrapWith"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "bootstrapWith"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static bootstrapWith(args: "}<a href="#StellarSetupDetails">{"StellarSetupDetails"}</a>{"<"}<a href="#CapoConfig">{"CapoConfig"}</a>{">"}{"): "}{"any"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="currentConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>static    {
              "currentConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"static currentConfig(): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance properties</h3>
    <div className="prose">
        <a id="_delegateCache"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_delegateCache"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_delegateCache: "}{"{\n        [roleName: string]: {\n            [delegateLink: string]: {\n                delegate: "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{";\n            };\n        };\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="_delegateRoles"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "_delegateRoles"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"_delegateRoles: "}<a href="#basicDelegateMap">{"basicDelegateMap"}</a>{"<any> & "}<a href="#IF_ISANY">{"IF_ISANY"}</a>{"<"}<a href="#ReturnType">{"ReturnType"}</a>{"<SELF[\"initDelegateRoles\"]>, "}<a href="#basicDelegateRoles">{"basicDelegateRoles"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activity"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "activity"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Accessor for generating activity-data (\"redeemer\") values for use in transactions.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis object contains named accessors for generating activity-data values for each activity type defined in the contract's on-chain scripts.\n\nMost activity types on the Capo are used implicitly by the other methods on the Capo, so you may seldom need to use this object directly.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"get activity(): "}<a href="#mustFindActivityType">{"mustFindActivityType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="autoSetup"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "autoSetup"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Enable auto-setup for delegates in the Capo contract.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis is a flag that can be set to true to enable auto-setup for delegates in the Capo contract. It is currently false by default, meaning that the Capo contract will not automatically setup any delegates.\n\nWe'll change that to true real soon now.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"autoSetup: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="bootstrapping"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "bootstrapping"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Reveals any bootstrapping details that may be present during initial creation of the Capo contract, for use during and immediately after charter-creation.\n\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"bootstrapping?: "}{"{\n        [key in \"govAuthority\" | \"mintDelegate\" | \"spendDelegate\"]: "}<a href="#ConfiguredDelegate">{"ConfiguredDelegate"}</a>{"<any>;\n    }"}{";"}
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
        <a id="charterTokenAsValue"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "charterTokenAsValue"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get charterTokenAsValue(): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="charterTokenPredicate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "charterTokenPredicate"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get charterTokenPredicate(): "}<a href="#tokenPredicate">{"tokenPredicate"}</a>{"<any>"}{";"}
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
{"dataBridgeClass: "}{"typeof "}<a href="#CapoDataBridge">{"CapoDataBridge"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="delegateRoles"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "delegateRoles"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get delegateRoles(): "}<a href="#basicDelegateMap">{"basicDelegateMap"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="didDryRun"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "didDryRun"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "helper for test environment, allowing an abortive initial charter-creation, without most of the costs, but enabling named-delegate scripts to be compiled/validated much earlier in the test lifecycle. The real charter process can then continue without duplicating any of the dry-run setup costs.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"didDryRun: "}{"{\n        minter: "}<a href="#CapoMinter">{"CapoMinter"}</a>{";\n        seedUtxo: "}<a href="#TxInput">{"TxInput"}</a>{";\n        configIn: "}<a href="#CapoConfig">{"CapoConfig"}</a>{";\n        args: "}<a href="#MinimalCharterDataArgs">{"MinimalCharterDataArgs"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="isChartered"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "isChartered"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"isChartered: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="minter"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "minter"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"minter: "}<a href="#CapoMinter">{"CapoMinter"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="minterClass"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "minterClass"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get minterClass(): "}<a href="#stellarSubclass">{"stellarSubclass"}</a>{"<"}<a href="#CapoMinter">{"CapoMinter"}</a>{">"}{";"}
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
{"get mintingPolicyHash(): "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "mkDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get mkDatum(): "}<a href="#mustFindDatumType">{"mustFindDatumType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mph"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "mph"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get mph(): "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="needsCoreDelegateUpdates"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "needsCoreDelegateUpdates"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"needsCoreDelegateUpdates: "}{"boolean"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="newReadDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "newReadDatum"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get newReadDatum(): "}<a href="#mustFindReadDatumType">{"mustFindReadDatumType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="offchain"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "offchain"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get offchain(): "}<a href="#mustFindConcreteContractBridgeType">{"mustFindConcreteContractBridgeType"}</a>{"<this>[\"reader\"]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="onchain"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "onchain"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get onchain(): "}<a href="#mustFindConcreteContractBridgeType">{"mustFindConcreteContractBridgeType"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="scriptActivitiesName"></a>

            <div>
        <h4 style={{display: "inline-block"}}>   readonly {
              "scriptActivitiesName"}&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


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
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"get scriptDatumName(): "}{"string"}{";"}
            </code></pre>
    
    </div>
    


    <h3>Instance methods</h3>
        <div className="prose">
        <a id="activitySpendingDelegatedDatum"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activitySpendingDelegatedDatum"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"activitySpendingDelegatedDatum(): "}{"{\n        redeemer: "}<a href="#UplcData">{"UplcData"}</a>{";\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityUpdatingCharter"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityUpdatingCharter"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"activityUpdatingCharter(): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="activityUsingAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "activityUsingAuthority"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"activityUsingAuthority(): "}<a href="#isActivity">{"isActivity"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addressAuthorityConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addressAuthorityConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addressAuthorityConfig(): "}<a href="#DelegateConfigDetails">{"DelegateConfigDetails"}</a>{"<"}<a href="#AuthorityPolicy">{"AuthorityPolicy"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addSeedUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addSeedUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nadds a seed utxo to a transaction-context,\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"addSeedUtxo<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx?: "}{"TCX"}{", seedUtxo?: "}<a href="#TxInput">{"TxInput"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addStrellaWithConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addStrellaWithConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"addStrellaWithConfig<SC extends "}<a href="#StellarContract">{"StellarContract"}</a>{"<any>"}{">(TargetClass: "}<a href="#stellarSubclass">{"stellarSubclass"}</a>{"<SC>"}{", config: "}{"SC extends "}<a href="#StellarContract">{"StellarContract"}</a>{"<infer iCT> ? iCT : never"}{", programBundle?: "}<a href="#DeployedProgramBundle">{"DeployedProgramBundle"}</a>{", previousOnchainScript?: "}{"{\n        validatorHash: number[];\n        uplcProgram: "}<a href="#anyUplcProgram">{"anyUplcProgram"}</a>{";\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<SC>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="addTxnBootstrappingSettings"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "addTxnBootstrappingSettings"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"addTxnBootstrappingSettings<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(this: "}{"SELF"}{", tcx: "}{"TCX"}{", charterData: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX>>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="basicDelegateRoles"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "basicDelegateRoles"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"basicDelegateRoles(): "}<a href="#basicDelegateMap">{"basicDelegateMap"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="canFindCharterUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "canFindCharterUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"canFindCharterUtxo(capoUtxos: "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{" | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="commitPendingChangesIfNeeded"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "commitPendingChangesIfNeeded"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"commitPendingChangesIfNeeded(this: "}{"SELF"}{", tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">, "}<a href="#anyState">{"anyState"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="connectDelegateWithOnchainRDLink"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "connectDelegateWithOnchainRDLink"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"connectDelegateWithOnchainRDLink<RN extends "}{"string & keyof SELF[\"_delegateRoles\"]"}{", DT extends "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{" = "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{">(role: "}{"RN"}{", delegateLink: "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<DT>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="connectMintingScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "connectMintingScript"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"connectMintingScript(params: "}<a href="#SeedTxnScriptParams">{"SeedTxnScriptParams"}</a>{", programBundle?: "}<a href="#DeployedProgramBundle">{"DeployedProgramBundle"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#CapoMinter">{"CapoMinter"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="extractDelegateLinkDetails"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "extractDelegateLinkDetails"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "extracts the key details of a delegate link, given a delegate configuration.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis is valid only during the setup phase of creating a delegate, and does not encode the config entry.\n\nuse mkRelativeDelegateLink() to encode the config entry, and use this.parseDgtConfig() to decode it.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"extractDelegateLinkDetails<CT extends "}<a href="#ConfiguredDelegate">{"ConfiguredDelegate"}</a>{"<DT> | "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{", DT extends "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{" | never"}{" = "}{"CT extends "}<a href="#ConfiguredDelegate">{"ConfiguredDelegate"}</a>{"<infer D> ? D : never"}{">(configured: "}{"CT"}{"): "}{"CT extends "}<a href="#ConfiguredDelegate">{"ConfiguredDelegate"}</a>{"<any> ? CT & "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{" : "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findActorUut"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findActorUut"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findActorUut(uutPrefix: "}{"string"}{", mph?: "}<a href="#MintingPolicyHash">{"MintingPolicyHash"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundUut">{"FoundUut"}</a>{" | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findCapoUtxos"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findCapoUtxos"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findCapoUtxos(option?: "}<a href="#Required">{"Required"}</a>{"<"}<a href="#Pick">{"Pick"}</a>{"<"}<a href="#UtxoSearchScope">{"UtxoSearchScope"}</a>{", \"dumpDetail\">>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{"[]>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findCharterData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findCharterData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"findCharterData(currentCharterUtxo?: "}<a href="#TxInput">{"TxInput"}</a>{", options?: "}{"{\n        optional: false;\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#CharterData">{"CharterData"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findCharterData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findCharterData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "@private\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"findCharterData(currentCharterUtxo: "}<a href="#TxInput">{"TxInput"}</a>{" | undefined"}{", options: "}{"{\n        optional: true;\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#CharterData">{"CharterData"}</a>{" | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findDelegatedDataUtxos"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findDelegatedDataUtxos"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Queries a chain-index to find utxos having a specific type of delegated datum\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nOptionally filters records by `id`, `type` and/or `predicate`\n\nThe `predicate` function, if provided, can implement any logic suitable for a specific case of data-finding.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"findDelegatedDataUtxos<const T extends "}{"undefined | (string & keyof SELF[\"_delegateRoles\"])"}{", RAW_DATUM_TYPE extends "}{"T extends string ? "}<a href="#AnyDataTemplate">{"AnyDataTemplate"}</a>{"<T, any> : never"}{", PARSED_DATUM_TYPE>(this: "}{"SELF"}{", { type, id, predicate, query, charterData, capoUtxos, }: "}{"{\n        type?: T;\n        id?: string | number[] | "}<a href="#UutName">{"UutName"}</a>{";\n        predicate?: "}<a href="#DelegatedDataPredicate">{"DelegatedDataPredicate"}</a>{"<RAW_DATUM_TYPE>;\n        query?: never;\n        charterData?: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<RAW_DATUM_TYPE, PARSED_DATUM_TYPE>[]>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findGovDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findGovDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findGovDelegate(charterData?: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findPendingChange"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findPendingChange"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "mockable helper for finding a pending change in the charter, to make it easier to test\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"findPendingChange(charterData: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{", changingThisRole: "}{"(pc: "}<a href="#ErgoPendingCharterChange_2">{"ErgoPendingCharterChange_2"}</a>{") => boolean"}{"): "}<a href="#Partial">{"Partial"}</a>{"<{\n        delegateChange: "}<a href="#ErgoPendingDelegateChange_3">{"ErgoPendingDelegateChange_3"}</a>{";\n        otherManifestChange: "}<a href="#PendingCharterChange$Ergo$otherManifestChange_3">{"PendingCharterChange$Ergo$otherManifestChange_3"}</a>{";\n    }> | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findRefScriptUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findRefScriptUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findRefScriptUtxo(expectedVh: "}{"number[]"}{", capoUtxos: "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{" | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findScriptReferences"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findScriptReferences"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "finds UTXOs in the capo that are of tnhe ReferenceScript variety of its datum\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"findScriptReferences(capoUtxos: "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{"[]>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="findSettingsInfo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "findSettingsInfo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"findSettingsInfo<T extends "}{"boolean"}{" = "}{"false"}{">(this: "}{"SELF"}{", options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n        optional?: T;\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<T extends false ? "}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<any, any> : "}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<any, any> | undefined>"}{";"}
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
{"getBundle(): "}<a href="#CapoHeliosBundle">{"CapoHeliosBundle"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getDelegateRoles"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getDelegateRoles"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "USE THE `delegateRoles` GETTER INSTEAD\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n- this no-op method is a convenience for Stellar Contracts maintainers and intuitive developers using autocomplete. - Including it enables an entry in VSCode \"Outline\" view, which doesn't include the delegateRoles getter : /\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"getDelegateRoles(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getDgDataController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getDgDataController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds the delegated-data controller for a given typeName.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nREQUIRES that the Capo manifest contains an installed DgDataPolicy and that the off-chain Capo delegateMap provides an off-chain controller for that typeName.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"getDgDataController<RN extends "}{"string & keyof SELF[\"_delegateRoles\"]"}{">(this: "}{"SELF"}{", roleName: "}{"RN"}{", options?: "}<a href="#FindableViaCharterData">{"FindableViaCharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<undefined | "}<a href="#DelegatedDataContract">{"DelegatedDataContract"}</a>{"<any, any>>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getGovDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getGovDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getGovDelegate(charterData?: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getMintDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getMintDelegate(charterData?: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#BasicMintDelegate">{"BasicMintDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getMinterParams"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getMinterParams"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "provides minter-targeted params extracted from the input configuration\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nextracts the seed-txn details that are key to parameterizing the minter contract\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"getMinterParams(): "}{"{\n        seedTxn: "}<a href="#TxId">{"TxId"}</a>{";\n        seedIndex: bigint;\n    }"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getNamedDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getNamedDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"getNamedDelegate(): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getNamedDelegates"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getNamedDelegates"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getNamedDelegates(charterData?: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<{\n        [k: string]: "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{";\n    }>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getOtherNamedDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getOtherNamedDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds a contract's named delegate, given the expected delegateName.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"getOtherNamedDelegate(delegateName: "}{"string"}{", charterData?: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSettingsController"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSettingsController"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getSettingsController(this: "}{"SELF"}{", options: "}<a href="#FindableViaCharterData">{"FindableViaCharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#DelegatedDataContract">{"DelegatedDataContract"}</a>{"<any, any> | undefined>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="getSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "getSpendDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"getSpendDelegate(charterData?: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#BasicMintDelegate">{"BasicMintDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="hasPolicyInManifest"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "hasPolicyInManifest"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Looks up a policy in the manifest, returning the policy name and the manifest entry if found.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nReturns a pair of [ policyName, manifestEntry ] if found. Returns undefined if the policy is not found.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"hasPolicyInManifest<const RoLabel extends "}{"string & keyof SELF[\"delegateRoles\"]"}{">(policyName: "}{"RoLabel"}{", charterData: "}<a href="#CapoDatum$Ergo$CharterData">{"CapoDatum$Ergo$CharterData"}</a>{"): "}{"[string, "}<a href="#ErgoCapoManifestEntry_2">{"ErgoCapoManifestEntry_2"}</a>{"] | undefined"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="init"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "init"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"init(args: "}<a href="#StellarSetupDetails">{"StellarSetupDetails"}</a>{"<"}<a href="#CapoConfig">{"CapoConfig"}</a>{" & {\n        featureFlags?: "}<a href="#Partial">{"Partial"}</a>{"<featureFlags>;\n    }>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<this>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="initDelegateRoles"></a>

            <div>
        <h4 style={{display: "inline-block"}}>  abstract  {
              "initDelegateRoles"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"abstract initDelegateRoles(): "}<a href="#basicDelegateMap">{"basicDelegateMap"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkAdditionalTxnsForCharter"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkAdditionalTxnsForCharter"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates any additional transactions needed during charter creation\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThis method is a hook for subclasses to add extra transactions during the charter creation process. It is called during the creation of the charter transaction.\n\nThe Capo has a {@link Capo.bootstrapping | `bootstrapping`} property that can be referenced as needed during extra transaction creation.\n\nThe provided transaction context has state.charterData in case it's needed.\n\nThis method should use {@link StellarTxnContext.includeAddlTxn} to add transactions to the context.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkAdditionalTxnsForCharter<TCX extends "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<any>>"}{">(tcx: "}{"TCX"}{", options: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX>>"}{";"}
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
{"mkDatumScriptReference(): "}<a href="#InlineTxOutputDatum">{"InlineTxOutputDatum"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkDelegatePredicate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkDelegatePredicate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkDelegatePredicate(dgtLink: "}<a href="#ErgoRelativeDelegateLink">{"ErgoRelativeDelegateLink"}</a>{"): "}<a href="#tokenPredicate">{"tokenPredicate"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkImpliedDelegationDetails"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkImpliedDelegationDetails"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkImpliedDelegationDetails(uut: "}<a href="#UutName">{"UutName"}</a>{"): "}<a href="#DelegationDetail">{"DelegationDetail"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkOnchainRelativeDelegateLink"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkOnchainRelativeDelegateLink"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "extracts the key details for creating an on-chain delegate link, given a setup-phase configuration for that delegate.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"mkOnchainRelativeDelegateLink<CT extends "}<a href="#ConfiguredDelegate">{"ConfiguredDelegate"}</a>{"<any>"}{">(configured: "}{"CT"}{"): "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkRefScriptTxn"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkRefScriptTxn"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkRefScriptTxn(script: "}<a href="#anyUplcProgram">{"anyUplcProgram"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnAddingMintInvariant"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnAddingMintInvariant"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkTxnAddingMintInvariant<THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{", TCX extends "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" = "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">(this: "}{"THIS"}{", delegateInfo: "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnAddingNamedDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnAddingNamedDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds or replaces a named delegate in the Capo contract\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nRegisters a new delegate, keyed by its name. The delegate may replace another\n\nOther contract scripts can reference named delegates through the contract's charter, requiring their presence in a transaction - thus delegating some portion of validation responsibility to the other script\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkTxnAddingNamedDelegate<DT extends "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{", thisType extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{", const delegateName extends "}{"string"}{", TCX extends "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" = "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">(this: "}{"thisType"}{", delegateName: "}{"delegateName"}{", options: "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{" & "}<a href="#NamedPolicyCreationOptions">{"NamedPolicyCreationOptions"}</a>{"<thisType, DT>"}{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX & "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" & "}<a href="#hasNamedDelegate">{"hasNamedDelegate"}</a>{"<DT, delegateName>>>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnAddingSpendInvariant"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnAddingSpendInvariant"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkTxnAddingSpendInvariant<THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{", const SN extends "}{"string & keyof THIS[\"delegateRoles\"][\"spendDelegate\"][\"variants\"]"}{", TCX extends "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" = "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">(this: "}{"THIS"}{", delegateInfo: "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasUutContext">{"hasUutContext"}</a>{"<\"spendDelegate\" | \"spendDgt\"> & TCX & "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnAddManifestEntry"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnAddManifestEntry"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds a new entry to the Capo's manifest\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nUse mkTxnQueueingDelegateChange for changing DgDataPolicy entries.\n\nThe type exclusions here mean this CURRENTLY works only with the NamedTokenRef variety of manifest entry, but that's just pragmatic because the other types don't yet have an implementation. Other types can be eligible for adding to this API or to a different call.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkTxnAddManifestEntry<THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{", TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{" = "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{">(this: "}{"THIS"}{", key: "}{"string"}{", utxo: "}<a href="#FoundDatumUtxo">{"FoundDatumUtxo"}</a>{"<any, any>"}{", entry: "}<a href="#ManifestEntryTokenRef">{"ManifestEntryTokenRef"}</a>{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnCommittingPendingChanges"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnCommittingPendingChanges"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkTxnCommittingPendingChanges<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnInstallingPolicyDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnInstallingPolicyDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Helper for installing a named policy delegate\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nCreates a transaction for adding a delegate-data-policy to the Capo.\n\nThe designated role name refers to the a key in the Capo's delegateRoles list - typically the full `typename` of a delegated-data-policy.\n\nThe idPrefix refers to the short prefix used for UUT id's for this data-type.\n\nAn addlTxn for ref-script creation is included.\n\nAn addlTxn for committing pending changes is NOT included, leaving pendingChange queued in the Capo's charter. Use mkTxnInstallPolicyDelegate to also ***commit*** pending changes.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkTxnInstallingPolicyDelegate<const RoLabel extends "}{"string & keyof SELF[\"delegateRoles\"]"}{", THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{">(this: "}{"THIS"}{", options: "}<a href="#InstallPolicyDgtOptions">{"InstallPolicyDgtOptions"}</a>{"<THIS, RoLabel>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{"> & "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" & "}<a href="#hasNamedDelegate">{"hasNamedDelegate"}</a>{"<"}<a href="#StellarDelegate">{"StellarDelegate"}</a>{", RoLabel, \"dgData\">> & "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<RoLabel | \"dgDataPolicy\">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnInstallPolicyDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnInstallPolicyDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Helper for installing a named policy delegate\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nCreates a transaction for adding a delegate-data-policy to the Capo, using the same logic as mkTxnInstallingPolicyDelegate.\n\nIn addition, it also commits the pending changes to the Capo's charter.\n\nUse mkTxnInstallingPolicyDelegate to queue a pending change without committing it (useful for tests, or when multiple policies can be queued and installed at once).\n\nNote that deploying multiple policies at once is currently disabled, to help prevent resource-exhaustion attacks.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkTxnInstallPolicyDelegate<const RoLabel extends "}{"string & keyof SELF[\"delegateRoles\"]"}{", THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{">(this: "}{"THIS"}{", options: "}<a href="#InstallPolicyDgtOptions">{"InstallPolicyDgtOptions"}</a>{"<THIS, RoLabel>"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">, "}<a href="#anyState">{"anyState"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnMintCharterToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnMintCharterToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Initiates a seeding transaction, creating a new Capo contract of this type\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThe returned transaction context has `state.bootstrappedConfig` for capturing the details for reproducing the contract's settings and on-chain address, and state.charterData\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkTxnMintCharterToken<TCX extends "}{"undefined | "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{", TCX2 extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{" = "}<a href="#hasBootstrappedCapoConfig">{"hasBootstrappedCapoConfig"}</a>{" & (TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<infer TCXT> ? "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<TCXT> : unknown)"}{", TCX3 = "}{"TCX2 & "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX2> & "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#charterDataState">{"charterDataState"}</a>{"> & "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<\"govAuthority\" | \"capoGov\" | \"mintDelegate\" | \"mintDgt\" | \"setting\">"}{">(this: "}{"SELF"}{", charterDataArgs: "}<a href="#MinimalCharterDataArgs">{"MinimalCharterDataArgs"}</a>{", existingTcx?: "}{"TCX"}{", dryRun?: "}{"\"DRY_RUN\""}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX3 & "}<a href="#Awaited">{"Awaited"}</a>{"<"}<a href="#hasUutContext">{"hasUutContext"}</a>{"<\"spendDelegate\" | \"govAuthority\" | \"mintDelegate\" | \"capoGov\" | \"mintDgt\" | \"spendDgt\"> & TCX2 & "}<a href="#hasBootstrappedCapoConfig">{"hasBootstrappedCapoConfig"}</a>{" & "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" & "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#charterDataState">{"charterDataState"}</a>{">>>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnQueuingDelegateChange"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnQueuingDelegateChange"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkTxnQueuingDelegateChange<DT extends "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{", THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{", const RoLabel extends "}{"string & keyof SELF[\"delegateRoles\"]"}{", OPTIONS extends "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{", TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{" = "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{">(this: "}{"THIS"}{", change: "}{"\"Add\" | \"Replace\""}{", options: "}{"{\n        policyName: RoLabel;\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        idPrefix: string;\n        dgtOptions?: OPTIONS;\n    }"}{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX & "}<a href="#hasNamedDelegate">{"hasNamedDelegate"}</a>{"<DT, RoLabel, \"dgData\">> & "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<RoLabel | \"dgDataPolicy\">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnUpdateCharter"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnUpdateCharter"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkTxnUpdateCharter<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(args: "}<a href="#CharterDataLike">{"CharterDataLike"}</a>{", activity?: "}<a href="#isActivity">{"isActivity"}</a>{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnUpdatingMintDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnUpdatingMintDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Installs a new Minting delegate to the Capo contract\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nUpdates the policy by which minting under the contract's minting policy is allowed.\n\nThis supports the evolution of logic for token-minting. Note that updating the minting policy can't modify or interfere with constraints enforced by any existing mintInvariants.\n\nNormally, the existing minting delegate is signalled to be Retiring its delegation token, burning it as part of the update transaction and cleaning things up. The minUtxo from the old delegation UUT will be recycled for use in the new delegate.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mkTxnUpdatingMintDelegate<THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{", TCX extends "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" = "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">(this: "}{"THIS"}{", delegateInfo: "}<a href="#MinimalDelegateUpdateLink">{"MinimalDelegateUpdateLink"}</a>{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<\"mintDelegate\" | \"mintDgt\"> & "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnUpdatingSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnUpdatingSpendDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkTxnUpdatingSpendDelegate<THIS extends "}<a href="#Capo">{"Capo"}</a>{"<any>"}{", TCX extends "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{" = "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{">(this: "}{"THIS"}{", delegateInfo: "}<a href="#MinimalDelegateUpdateLink">{"MinimalDelegateUpdateLink"}</a>{", tcx?: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkTxnUpgradeIfNeeded"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkTxnUpgradeIfNeeded"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkTxnUpgradeIfNeeded(this: "}{"SELF"}{", charterData?: "}<a href="#CharterData">{"CharterData"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<"}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">, "}<a href="#anyState">{"anyState"}</a>{"> & {\n        isFacade: true;\n    }>>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mkValuesBurningDelegateUut"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mkValuesBurningDelegateUut"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mkValuesBurningDelegateUut(current: "}<a href="#ErgoRelativeDelegateLink">{"ErgoRelativeDelegateLink"}</a>{"): "}<a href="#valuesEntry_2">{"valuesEntry_2"}</a>{"[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mustFindCharterUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mustFindCharterUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"mustFindCharterUtxo(capoUtxos?: "}<a href="#TxInput">{"TxInput"}</a>{"[]"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="mustGetDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "mustGetDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Given a role name and configuration details, finds and creates the class for the delegate in that role.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nUses the deployedDetails from the Capo's bundle for the compiled on-chain script, if available.\n\nIf the indicated script role is not deployed as a singleton, the deployedName is required, and matched against those instances of the script seen in the bundle's deployedDetails.\n\nIf the script role has no deployedDetails, the configuredDelegate details are used to compile the script for on-chain use, after which the resulting details should be used to update the bundle's deployedDetails. Normally this should be done during the build of a new version of the package, resulting in a bundle having \"deployedDetails\" for a script that is actually created on-chain after the package is installed.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"mustGetDelegate<T extends "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{">(scriptRole: "}{"string"}{", configuredDelegate: "}<a href="#PreconfiguredDelegate">{"PreconfiguredDelegate"}</a>{"<T>"}{", deployedName?: "}{"string"}{"): "}<a href="#Promise">{"Promise"}</a>{"<T>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="offchainLink"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "offchainLink"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "parses details in a delegate-link\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"offchainLink<T extends "}<a href="#MinimalDelegateLink">{"MinimalDelegateLink"}</a>{" | "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{" | "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{">(link: "}{"T"}{"): "}{"T"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="parseDelegateLinksInCharter"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "parseDelegateLinksInCharter"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"parseDelegateLinksInCharter(charterData: "}<a href="#CharterData">{"CharterData"}</a>{"): "}{"void"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="parseDgtConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "parseDgtConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"parseDgtConfig(inLink: // | MinimalDelegateLink\n    "}<a href="#ErgoRelativeDelegateLink">{"ErgoRelativeDelegateLink"}</a>{" | "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{"): "}<a href="#Partial">{"Partial"}</a>{"<"}<a href="#capoDelegateConfig">{"capoDelegateConfig"}</a>{">"}{";"}
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
{"requirements(): "}<a href="#ReqtsMap_2">{"ReqtsMap_2"}</a>{"<\"is a base class for leader/Capo pattern\" | \"can create unique utility tokens\" | \"supports the Delegation pattern using roles and strategy-variants\" | \"supports well-typed role declarations and strategy-adding\" | \"supports just-in-time strategy-selection using txnCreateDelegateLink()\" | \"given a configured delegate-link, it can create a ready-to-use Stellar subclass with all the right settings\" | \"supports concrete resolution of existing role delegates\" | \"Each role uses a RoleVariants structure which can accept new variants\" | \"provides a Strategy type for binding a contract to a strategy-variant name\" | \"can locate UUTs in the user's wallet\" | \"positively governs all administrative actions\" | \"has a unique, permanent charter token\" | \"has a unique, permanent treasury address\" | \"the charter token is always kept in the contract\" | \"the charter details can be updated by authority of the capoGov-* token\" | \"can mint other tokens, on the authority of the charter's registered mintDgt- token\" | \"can handle large transactions with reference scripts\" | \"has a singleton minting policy\" | \"can update the minting delegate in the charter data\" | \"can update the spending delegate in the charter data\" | \"can add invariant minting delegates to the charter data\" | \"can add invariant spending delegates to the charter data\" | \"supports an abstract Settings structure stored in the contact\" | \"added and updated delegates always validate the present configuration data\" | \"can commit new delegates\" | \"supports storing new types of datum not pre-defined in the Capo's on-chain script\" | \"the charter has a namedDelegates structure for semantic delegate links\" | \"CreatingDelegatedDatum: creates a UTxO with any custom datum\" | \"UpdatingDelegatedDatum: checks that a custom data element can be updated\", never>"}{";"}
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
        <a id="serializeDgtConfig"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "serializeDgtConfig"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"serializeDgtConfig(config: "}<a href="#Partial">{"Partial"}</a>{"<"}<a href="#capoDelegateConfig">{"capoDelegateConfig"}</a>{">"}{"): "}{"number[]"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="showDelegateLink"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "showDelegateLink"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"showDelegateLink(delegateLink: "}<a href="#RelativeDelegateLinkLike">{"RelativeDelegateLinkLike"}</a>{"): "}{"string"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="singleItem"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "singleItem"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Returns a single item from a list, throwing an error if it has multiple items\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"singleItem<T>(xs: "}<a href="#Array">{"Array"}</a>{"<T>"}{"): "}{"T"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tcxWithCharterData"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tcxWithCharterData"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tcxWithCharterData<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(this: "}{"SELF"}{", tcx: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#charterDataState">{"charterDataState"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tcxWithCharterRef"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tcxWithCharterRef"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Ensures the transaction context has a reference to the charter token\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nAccepts a transaction context that may already have a charter reference. Returns a typed tcx with hasCharterRef type.\n\nThe transaction is typed with the presence of the charter reference (found in tcx.state.charterRef).\n\nIf the charter reference is already present in the transaction context, the transaction will not be modified.\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"tcxWithCharterRef<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasCharterRef">{"hasCharterRef"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tcxWithSettingsRef"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tcxWithSettingsRef"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tcxWithSettingsRef<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(this: "}{"SELF"}{", tcx: "}{"TCX"}{", { charterData, capoUtxos, }: "}{"{\n        charterData: "}<a href="#CharterData">{"CharterData"}</a>{";\n        capoUtxos: "}<a href="#TxInput">{"TxInput"}</a>{"[];\n    }"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasSettingsRef">{"hasSettingsRef"}</a>{"<any, any>>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tempMkDelegateLinkForQueuingDgtChange"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tempMkDelegateLinkForQueuingDgtChange"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tempMkDelegateLinkForQueuingDgtChange(seedUtxo: "}<a href="#TxInput">{"TxInput"}</a>{", mintDgtActivity: "}<a href="#SomeDgtActivityHelper">{"SomeDgtActivityHelper"}</a>{", purpose: "}{"string"}{", policyName: "}{"string"}{", idPrefix: "}{"string"}{", options: "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<{\n        delegateClass: "}<a href="#stellarSubclass">{"stellarSubclass"}</a>{"<"}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{">;\n        delegate: "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{";\n        roleName: string;\n        fullCapoDgtConfig: "}<a href="#Partial">{"Partial"}</a>{"<"}<a href="#CapoConfig">{"CapoConfig"}</a>{"> & "}<a href="#capoDelegateConfig">{"capoDelegateConfig"}</a>{";\n    } & "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{" & "}<a href="#Required">{"Required"}</a>{"<"}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tokenAsValue"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tokenAsValue"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tokenAsValue(tokenName: "}{"string | number[] | "}<a href="#UutName">{"UutName"}</a>{", count?: "}{"bigint"}{"): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tvCharter"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tvCharter"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tvCharter(): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="tvForDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "tvForDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"tvForDelegate(dgtLink: "}<a href="#ErgoRelativeDelegateLink">{"ErgoRelativeDelegateLink"}</a>{"): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnAddCharterRef"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnAddCharterRef"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"txnAddCharterRef<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasCharterRef">{"hasCharterRef"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnAddGovAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnAddGovAuthority"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txnAddGovAuthority<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasGovAuthority">{"hasGovAuthority"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnAddGovAuthorityTokenRef"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnAddGovAuthorityTokenRef"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "adds the charter-token, along with its gov-authority UUT, to a transaction context\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nUses txnAddGovAuthority() to locate the govAuthority delegate and txnGrantAuthority() to add its authority token to a transaction.\n\nThe charter-token is included as a reference input.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnAddGovAuthorityTokenRef<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnAddNamedDelegateAuthority"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnAddNamedDelegateAuthority"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txnAddNamedDelegateAuthority<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", delegateName: "}{"string"}{", delegate: "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{", activity: "}<a href="#isActivity">{"isActivity"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnAttachScriptOrRefScript"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnAttachScriptOrRefScript"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Attach the given script by reference to a transaction\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nIf the given script is found in the Capo's known list of reference scripts, it is used to attach the refScript to the transaction context. Otherwise, the script's bytes are added directly to the transaction.\n\nThe indicated script is expected to be found in one of the Capo's refScript utxos. Otherwise, a missing-refScript warning is emitted, and the program is added directly to the transaction. If this makes the transaction too big, the console warning will be followed by a thrown error during the transaction's wallet-submission sequence.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnAttachScriptOrRefScript<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", program?: "}<a href="#anyUplcProgram">{"anyUplcProgram"}</a>{" | undefined"}{", useRefScript?: "}{"boolean"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnCreateConfiguredDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnCreateConfiguredDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Generates and returns a complete set of delegate settings, given a delegation role and strategy-selection details.\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nMaps the indicated delegation role to specific UUT details from the provided transaction-context to provide the resulting settings. The transaction context isn't modified.\n\nBehaves exactly like (and provides the core implementation of) {@link Capo.txnCreateOffchainDelegateLink | txnCreateDelegateLink()}, returning additional `roleName` and `delegateClass`, to conform with the DelegateSettings type.\n\n### Overriding the Delegate Type The configuration is typed for a contract-based delegate by default. If you need a more general StellarDelegate type (for AuthorityPolicy, for example), you can override the type-parameters (if you are finding that you need to specify a more specific contract-based delegate type, please let us know, as our expectation is that the general type for a contract-based delegate should already provide all the necessary type information for all kinds of contract-based delegate subclasses).\n\nSee txnCreateDelegateLink for further details.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnCreateConfiguredDelegate<RN extends "}{"string & keyof SELF[\"_delegateRoles\"]"}{", DT extends "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{" = "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{">(tcx: "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<RN>"}{", role: "}{"RN"}{", delegateInfo: "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#ConfiguredDelegate">{"ConfiguredDelegate"}</a>{"<DT>>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnCreateOffchainDelegateLink"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnCreateOffchainDelegateLink"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates a new delegate link, given a delegation role and and strategy-selection details\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nCombines partal and implied configuration settings, validating the resulting configuration.\n\nIt expects the transaction-context to have a UUT whose name (or a UUT roleName) matching the indicated `roleName`. Use {@link Capo.txnWillMintUuts | txnWillMintUuts()} or {@link Capo.txnMintingUuts | txnMintingUuts()} to construct a transaction having that and a compliant txn-type.\n\nThe resulting delegate-linking details can be used with this.mkRelativeDelegateLink() to encode it as an on-chain RelativeLinkLink in the Capo's charter.\n\nThe delegate-link is by default a contract-based delegate. If that's not what you want, you can the type-parameters to override it to a more general StellarDelegate type (NOTE: if you find you're needing to specify a more specific contract-based delegate type, please let us know, as our expectation is that the general type for a contract-based delegate should already provide all the necessary type information for all kinds of contract-based delegate subclasses).\n\nTo get a full DelegateSettings object, use txnCreateDelegateSettings() instead.\n\n@reqt throws DelegateConfigNeeded with an `errors` entry ... if there are any problems in validating the net configuration settings.  @reqt EXPECTS the `tcx` to be minting a UUT for the delegation, ... whose UutName can be found in `tcx.state.uuts[roleName]`  @reqt combines base settings from the selected delegate class's `defaultParams` ... adding the delegateRoles()[roleName] configuration for the selected roleName, ... along with any explicit `config` from the provided `delegateInfo` ... and automatically applies a `uut` setting. ... The later properties in this sequence take precedence.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnCreateOffchainDelegateLink<RN extends "}{"string & keyof SELF[\"_delegateRoles\"]"}{", DT extends "}<a href="#StellarDelegate">{"StellarDelegate"}</a>{" = "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{">(tcx: "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<RN>"}{", role: "}{"RN"}{", delegateInfo: "}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#ConfiguredDelegate">{"ConfiguredDelegate"}</a>{"<DT> & "}<a href="#Required">{"Required"}</a>{"<"}<a href="#OffchainPartialDelegateLink">{"OffchainPartialDelegateLink"}</a>{">>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnKeepCharterToken"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnKeepCharterToken"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txnKeepCharterToken<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", datum: "}<a href="#TxOutputDatum">{"TxOutputDatum"}</a>{"): "}{"TCX"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMintingUuts"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMintingUuts"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds UUT minting to a transaction\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nConstructs UUTs with the indicated purposes, and adds them to the contract state. This is a useful generic capability to support any application-specific purpose.\n\nThe provided transaction context must have a seedUtxo - use {@link StellarContract.tcxWithSeedUtxo | tcxWithSeedUtxo()} to add one from the current user's wallet. The seed utxo is consumed, so it can never be used again; its value will be returned to the user wallet. All the uuts named in the uutPurposes argument will be minted from the same seedUtxo, and will share the same suffix, because it is derived from the seedUtxo's outputId.\n\nMany cases of UUT minting are covered by the delegation pattern, where this method is used implicitly.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnMintingUuts<const purposes extends "}{"string"}{", existingTcx extends "}<a href="#hasSeedUtxo">{"hasSeedUtxo"}</a>{", const RM extends "}<a href="#Record">{"Record"}</a>{"<ROLES, purposes>"}{", const ROLES extends "}{"keyof RM & string"}{" = "}{"string & keyof RM"}{">(initialTcx: "}{"existingTcx"}{", uutPurposes: "}{"purposes[]"}{", options: "}<a href="#NormalDelegateSetup">{"NormalDelegateSetup"}</a>{" | "}<a href="#DelegateSetupWithoutMintDelegate">{"DelegateSetupWithoutMintDelegate"}</a>{", roles?: "}{"RM"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasUutContext">{"hasUutContext"}</a>{"<ROLES | purposes> & existingTcx>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMkAddlRefScriptTxn"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMkAddlRefScriptTxn"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Creates an additional reference-script-creation txn\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nCreates a txn for reference-script creation, and adds it to the current transaction context to also be submitted.\n\nThe reference script is stored in the Capo contract with a special Datum, and it can be used in future transactions to save space and fees.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnMkAddlRefScriptTxn<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{"<"}<a href="#anyState">{"anyState"}</a>{">"}{", RETURNS extends "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX>"}{" = "}{"TCX extends "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<any> ? TCX : "}<a href="#hasAddlTxns">{"hasAddlTxns"}</a>{"<TCX>"}{">(tcx: "}{"TCX"}{", scriptName: "}{"string"}{", script: "}<a href="#anyUplcProgram">{"anyUplcProgram"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<RETURNS>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMustGetSeedUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMustGetSeedUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Finds a sufficient-sized utxo for seeding one or more named tokens\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nFor allocating a charter token (/its minter), one or more UUTs, or other token name(s) to be minted, this function calculates the size of minUtxo needed for all the needed tokens, assuming they'll each be stored in separate utxos. It then finds and returns a UTxO from the current actor's wallet. The utxo is NOT implicitly added to the transaction (use tcx.addInput() to add it).\n\nWhen the transaction context already has some utxo's being consumed, they're not eligible for selection.\n\nIf the transaction doesn't store the new tokens in separate utxos, any spare lovelace are returned as change in the transaction.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnMustGetSeedUtxo(tcx: "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", purpose: "}{"string"}{", tokenNames: "}{"string[]"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#TxInput">{"TxInput"}</a>{" | never>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMustUseCharterUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMustUseCharterUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "finds and spends the Capo's charter utxo, typically for updating its CharterData datum.\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"txnMustUseCharterUtxo<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", redeemer: "}<a href="#isActivity">{"isActivity"}</a>{", newCharterData?: "}<a href="#CharterDataLike">{"CharterDataLike"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMustUseCharterUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMustUseCharterUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"txnMustUseCharterUtxo<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", useReferenceInput: "}{"\"refInput\" | true"}{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnMustUseSpendDelegate"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnMustUseSpendDelegate"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txnMustUseSpendDelegate<TCX extends "}<a href="#hasCharterRef">{"hasCharterRef"}</a>{">(tcx: "}{"TCX"}{", spendDelegate: "}<a href="#ContractBasedDelegate">{"ContractBasedDelegate"}</a>{", activity: "}<a href="#isActivity">{"isActivity"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<TCX & "}<a href="#hasSpendDelegate">{"hasSpendDelegate"}</a>{">"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnUpdateCharterUtxo"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnUpdateCharterUtxo"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"txnUpdateCharterUtxo<TCX extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{">(tcx: "}{"TCX"}{", redeemer: "}<a href="#isActivity">{"isActivity"}</a>{", newDatum: "}<a href="#CharterDataLike">{"CharterDataLike"}</a>{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{" | never>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="txnWillMintUuts"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "txnWillMintUuts"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Adds UUT types to the transaction context\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nadds tcx.state.uut entries for each purpose.\n\nalso adds a second uut entry for each role-name found in the roles map, corresponding to the uut entry for its purpose.\n\nNOTE: this method doesn't add a minting instruction to the transaction, so that all the minting/burning needed for the txn can (because it must) be done in one minting instruction.\n\nIf the uuts being minted are the only minting/burning needed in the transaction, then you can use {@link Capo.txnMintingUuts | txnMintingUuts()} instead of this method.\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"txnWillMintUuts<const purposes extends "}{"string"}{", existingTcx extends "}<a href="#StellarTxnContext">{"StellarTxnContext"}</a>{", const RM extends "}<a href="#Record">{"Record"}</a>{"<ROLES, purposes>"}{", const ROLES extends "}{"string & keyof RM"}{" = "}{"string & keyof RM"}{">(tcx: "}{"existingTcx"}{", uutPurposes: "}{"purposes[]"}{", { usingSeedUtxo }: "}<a href="#UutCreationAttrsWithSeed">{"UutCreationAttrsWithSeed"}</a>{", roles?: "}{"RM"}{"): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#hasUutContext">{"hasUutContext"}</a>{"<ROLES | purposes> & existingTcx>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="uutsValue"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "uutsValue"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "returns a value representing the provided UUT(s)\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nThe inputs can be of a few forms - see the overload variants\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"uutsValue(uutMap: "}<a href="#uutPurposeMap">{"uutPurposeMap"}</a>{"<any>"}{"): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="uutsValue"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "uutsValue"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "from all the uuts in the transaction context\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"uutsValue(tcx: "}<a href="#hasUutContext">{"hasUutContext"}</a>{"<any>"}{"): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="uutsValue"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "uutsValue"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "from a single uut name or byte array\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        
            <pre><code lang="typescript">
{"uutsValue(uutName: "}<a href="#UutName">{"UutName"}</a>{" | number[]"}{"): "}<a href="#Value">{"Value"}</a>{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="verifyConfigs"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "verifyConfigs"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                ""
            }
        </ReactMarkdown>
    </div>


            <pre><code lang="typescript">
{"verifyConfigs(): "}<a href="#Promise">{"Promise"}</a>{"<any>"}{";"}
            </code></pre>
    
    </div>
    

<div className="prose">
        <a id="verifyCoreDelegates"></a>

            <div>
        <h4 style={{display: "inline-block"}}>    {
              "verifyCoreDelegates"}()&nbsp;&nbsp;</h4>
        <ReactMarkdown>
            {
                "Performs a validation of all critical delegate connections\n\n"
            }
        </ReactMarkdown>
    </div>

<p></p>

        <ReactMarkdown> {
            "\n\nChecks that each delegate connection is correct and that the underlying scripts for those delegates have not been modified in unplanned ways.\n\nEvery Capo subclass that adds new delegate types SHOULD implement this method, performing any checks needed to verify the scripts underlying those delegate-types. It should return `Promise.all([ super(), ...myOwnChecks])`.\n\n\n"
        }</ReactMarkdown>
            <pre><code lang="typescript">
{"verifyCoreDelegates(): "}<a href="#Promise">{"Promise"}</a>{"<void>"}{";"}
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


        </div>

    );
}
    