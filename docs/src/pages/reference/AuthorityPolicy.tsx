import React from "react";
// import ReactMarkdown from 'react-markdown';
// temp:
const ReactMarkdown = React.Fragment;

export default function DocumentItem() {
    return (
        <div>
                <h2>AuthorityPolicy</h2>
                    <ReactMarkdown>
                        {
                            "Generic class as base for pure authorization\n\n"
                        }
                    </ReactMarkdown>

            <p></p>

        <ReactMarkdown> {
            "\n\nThis isn't different from StellarDelegate, but using it as a base class more specific than \"any delegate\" gives useful semantics for Capo's govAuthority role\n\n\n"
        }</ReactMarkdown>
      





<h3>Types referenced</h3>
            <p>see also: dred-network-registry!isActivity:type</p>


        </div>

    );
}
    