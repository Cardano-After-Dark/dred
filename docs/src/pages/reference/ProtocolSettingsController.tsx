import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>ProtocolSettingsController</h2>
      
            <p>
                <b>Instance properties: </b>
                                <a href="#capo">capo</a>, 
                    <a href="#dataBridgeClass">dataBridgeClass</a>, 
                    <a href="#delegateName">delegateName</a>, 
                    <a href="#idPrefix">idPrefix</a>, 
                    <a href="#recordTypeName">recordTypeName</a>
            </p>
         <p>
            <b>Instance methods: </b>
                    <a href="#exampleData">exampleData</a>, 
                    <a href="#initialSettingsData">initialSettingsData</a>, 
                    <a href="#requirements">requirements</a>, 
                    <a href="#scriptBundle">scriptBundle</a>
        </p>



    <h3>Instance properties</h3>
            <h4>   readonly <b>{"capo"}</b></h4>
            <pre>
{""}
{"get capo(): "}<a href="#DredCapo">{"DredCapo"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"dataBridgeClass"}</b></h4>
            <pre>
{""}
{"dataBridgeClass: "}{"typeof "}<a href="#ProtocolSettingsDataBridge">{"ProtocolSettingsDataBridge"}</a>{";"}
            </pre>
    
    

        <h4>   readonly <b>{"delegateName"}</b></h4>
            <pre>
{""}
{"get delegateName(): "}{"string"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"idPrefix"}</b></h4>
            <pre>
{""}
{"get idPrefix(): "}{"string"}{";"}
            </pre>
    
    

        <h4>   readonly <b>{"recordTypeName"}</b></h4>
            <pre>
{""}
{"get recordTypeName(): "}{"string"}{";"}
            </pre>
    
    


    <h3>Instance methods</h3>
                <h4>    <b>{"exampleData"}</b></h4>
            <pre>
{""}
{"exampleData(): "}<a href="#minimalProtocolSettings">{"minimalProtocolSettings"}</a>{";"}
            </pre>
    
    

        <h4>    <b>{"initialSettingsData"}</b></h4>
            <pre>
{"/**\n * creates settings data with minting-policy hashes prepared for each membership tier\n */\n"}
{"initialSettingsData(): "}<a href="#Promise">{"Promise"}</a>{"<"}<a href="#minimalProtocolSettings">{"minimalProtocolSettings"}</a>{">"}{";"}
            </pre>
    
    

        <h4>    <b>{"requirements"}</b></h4>
            <pre>
{""}
{"requirements(): "}{"import(\"@donecollectively/stellar-contracts\")."}<a href="#ReqtsMap">{"ReqtsMap"}</a>{"<never, never>"}{";"}
            </pre>
    
    

        <h4>    <b>{"scriptBundle"}</b></h4>
            <pre>
{""}
{"scriptBundle(): "}{"any"}{";"}
            </pre>
    
    

        </div>

    );
}
    