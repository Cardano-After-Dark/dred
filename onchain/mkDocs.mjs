import fs from "fs";
/**
 * processes the package details  including all its members and nested members,
 * and generates a set of React components for displaying each member on on a separate page.
 */

const pkgDocInfoExample = {
    kind: "Package",
    canonicalReference: "dred-network-registry!",
    docComment: "",
    name: "dred-network-registry",
    preserveMemberOrder: false,
    members: [
        {
            kind: "EntryPoint",
            canonicalReference: "dred-network-registry!",
            name: "",
            preserveMemberOrder: false,
            members: [
                {
                    kind: "TypeAlias",
                    canonicalReference:
                        "dred-network-registry!AbstractSettingsForNodeOperator:type",
                    docComment: "",
                    excerptTokens: [
                        {
                            kind: "Content",
                            text: "export type AbstractSettingsForNodeOperator = ",
                        },
                        {
                            kind: "Content",
                            text: "{\n    nodeOpSettings: ",
                        },
                        {
                            kind: "Reference",
                            text: "NodeOperatorSettings",
                            canonicalReference: "dred-network-registry!NodeOperatorSettings:type",
                        },
                        {
                            kind: "Content",
                            text: ";\n}",
                        },
                        {
                            kind: "Content",
                            text: ";",
                        },
                    ],
                    fileUrlPath: "src/nodeRegistry/NodeRegistry.typeInfo.ts",
                    releaseTag: "Public",
                    name: "AbstractSettingsForNodeOperator",
                    typeTokenRange: {
                        startIndex: 1,
                        endIndex: 4,
                    },
                },
                {
                    kind: "Class",
                    canonicalReference: "dred-network-registry!DredCapo:class",
                    docComment: "/**\n * @public\n */\n",
                    excerptTokens: [
                        {
                            kind: "Content",
                            text: "export declare class DredCapo extends ",
                        },
                        {
                            kind: "Reference",
                            text: "Capo",
                            canonicalReference: "@donecollectively/stellar-contracts!Capo:class",
                        },
                        {
                            kind: "Content",
                            text: "<",
                        },
                        {
                            kind: "Reference",
                            text: "DredCapo",
                            canonicalReference: "dred-network-registry!DredCapo:class",
                        },
                        {
                            kind: "Content",
                            text: ", ",
                        },
                        {
                            kind: "Reference",
                            text: "DredCapoFeatures",
                            canonicalReference: "dred-network-registry!~DredCapoFeatures:type",
                        },
                        {
                            kind: "Content",
                            text: ">",
                        },
                        {
                            kind: "Content",
                            text: " ",
                        },
                    ],
                    fileUrlPath: "src/DredCapo.ts",
                    releaseTag: "Public",
                    isAbstract: false,
                    name: "DredCapo",
                    preserveMemberOrder: false,
                    members: [
                        {
                            kind: "Property",
                            canonicalReference: "dred-network-registry!DredCapo#autoSetup:member",
                            docComment: "",
                            excerptTokens: [
                                {
                                    kind: "Content",
                                    text: "autoSetup: ",
                                },
                                {
                                    kind: "Content",
                                    text: "boolean",
                                },
                                {
                                    kind: "Content",
                                    text: ";",
                                },
                            ],
                            isReadonly: false,
                            isOptional: false,
                            releaseTag: "Public",
                            name: "autoSetup",
                            propertyTypeTokenRange: {
                                startIndex: 1,
                                endIndex: 2,
                            },
                            isStatic: false,
                            isProtected: false,
                            isAbstract: false,
                        },
                        {
                            kind: "Property",
                            canonicalReference:
                                "dred-network-registry!DredCapo#defaultFeatureFlags:member",
                            docComment: "",
                            excerptTokens: [
                                {
                                    kind: "Content",
                                    text: "get defaultFeatureFlags(): ",
                                },
                                {
                                    kind: "Reference",
                                    text: "DredCapoFeatures",
                                    canonicalReference:
                                        "dred-network-registry!~DredCapoFeatures:type",
                                },
                                {
                                    kind: "Content",
                                    text: ";",
                                },
                            ],
                            isReadonly: true,
                            isOptional: false,
                            releaseTag: "Public",
                            name: "defaultFeatureFlags",
                            propertyTypeTokenRange: {
                                startIndex: 1,
                                endIndex: 2,
                            },
                            isStatic: false,
                            isProtected: false,
                            isAbstract: false,
                        },
                        {
                            kind: "Method",
                            canonicalReference:
                                "dred-network-registry!DredCapo#findNbhRegistryEntries:member(1)",
                            docComment: "",
                            excerptTokens: [
                                {
                                    kind: "Content",
                                    text: "findNbhRegistryEntries(): ",
                                },
                                {
                                    kind: "Reference",
                                    text: "Promise",
                                    canonicalReference: "!Promise:interface",
                                },
                                {
                                    kind: "Content",
                                    text: "<",
                                },
                                {
                                    kind: "Reference",
                                    text: "FoundDatumUtxo",
                                    canonicalReference:
                                        "@donecollectively/stellar-contracts!FoundDatumUtxo:type",
                                },
                                {
                                    kind: "Content",
                                    text: '<import("@donecollectively/stellar-contracts").',
                                },
                                {
                                    kind: "Reference",
                                    text: "AnyDataTemplate",
                                    canonicalReference:
                                        "@donecollectively/stellar-contracts!AnyDataTemplate:type",
                                },
                                {
                                    kind: "Content",
                                    text: '<"dredNbh", any>, unknown>[]>',
                                },
                                {
                                    kind: "Content",
                                    text: ";",
                                },
                            ],
                            isStatic: false,
                            returnTypeTokenRange: {
                                startIndex: 1,
                                endIndex: 7,
                            },
                            releaseTag: "Public",
                            isProtected: false,
                            overloadIndex: 1,
                            parameters: [],
                            isOptional: false,
                            isAbstract: false,
                            name: "findNbhRegistryEntries",
                        },
                        {
                            kind: "Method",
                            canonicalReference:
                                "dred-network-registry!DredCapo#findNodeOpVaultEntries:member(1)",
                            docComment: "",
                            excerptTokens: [
                                {
                                    kind: "Content",
                                    text: "findNodeOpVaultEntries(): ",
                                },
                                {
                                    kind: "Reference",
                                    text: "Promise",
                                    canonicalReference: "!Promise:interface",
                                },
                                {
                                    kind: "Content",
                                    text: "<",
                                },
                                {
                                    kind: "Reference",
                                    text: "FoundDatumUtxo",
                                    canonicalReference:
                                        "@donecollectively/stellar-contracts!FoundDatumUtxo:type",
                                },
                                {
                                    kind: "Content",
                                    text: '<import("@donecollectively/stellar-contracts").',
                                },
                                {
                                    kind: "Reference",
                                    text: "AnyDataTemplate",
                                    canonicalReference:
                                        "@donecollectively/stellar-contracts!AnyDataTemplate:type",
                                },
                                {
                                    kind: "Content",
                                    text: '<"dredNode", any>, unknown>[]>',
                                },
                                {
                                    kind: "Content",
                                    text: ";",
                                },
                            ],
                            isStatic: false,
                            returnTypeTokenRange: {
                                startIndex: 1,
                                endIndex: 7,
                            },
                            releaseTag: "Public",
                            isProtected: false,
                            overloadIndex: 1,
                            parameters: [],
                            isOptional: false,
                            isAbstract: false,
                            name: "findNodeOpVaultEntries",
                        },
                        {
                            kind: "Method",
                            canonicalReference:
                                "dred-network-registry!DredCapo#findSettingsInfo:member(1)",
                            docComment: "",
                            excerptTokens: [
                                {
                                    kind: "Content",
                                    text: "findSettingsInfo(options: ",
                                },
                                {
                                    kind: "Content",
                                    text: "{\n        charterData: ",
                                },
                                {
                                    kind: "Reference",
                                    text: "CharterData",
                                    canonicalReference:
                                        "@donecollectively/stellar-contracts!CharterData:type",
                                },
                                {
                                    kind: "Content",
                                    text: ";\n        capoUtxos?: ",
                                },
                                {
                                    kind: "Reference",
                                    text: "TxInput",
                                    canonicalReference: "@helios-lang/ledger!TxInput:type",
                                },
                                {
                                    kind: "Content",
                                    text: "[];\n    }",
                                },
                                {
                                    kind: "Content",
                                    text: "): ",
                                },
                                {
                                    kind: "Reference",
                                    text: "Promise",
                                    canonicalReference: "!Promise:interface",
                                },
                                {
                                    kind: "Content",
                                    text: "<",
                                },
                                {
                                    kind: "Reference",
                                    text: "FoundDatumUtxo",
                                    canonicalReference:
                                        "@donecollectively/stellar-contracts!FoundDatumUtxo:type",
                                },
                                {
                                    kind: "Content",
                                    text: "<",
                                },
                                {
                                    kind: "Reference",
                                    text: "ErgoProtocolSettings",
                                    canonicalReference:
                                        "dred-network-registry!~ErgoProtocolSettings:type",
                                },
                                {
                                    kind: "Content",
                                    text: ", ",
                                },
                                {
                                    kind: "Reference",
                                    text: "ProtocolSettings",
                                    canonicalReference:
                                        "dred-network-registry!~ProtocolSettings:type",
                                },
                                {
                                    kind: "Content",
                                    text: ">>",
                                },
                                {
                                    kind: "Content",
                                    text: ";",
                                },
                            ],
                            isStatic: false,
                            returnTypeTokenRange: {
                                startIndex: 7,
                                endIndex: 15,
                            },
                            releaseTag: "Public",
                            isProtected: false,
                            overloadIndex: 1,
                            parameters: [
                                {
                                    parameterName: "options",
                                    parameterTypeTokenRange: {
                                        startIndex: 1,
                                        endIndex: 6,
                                    },
                                    isOptional: false,
                                },
                            ],
                            isOptional: false,
                            isAbstract: false,
                            name: "findSettingsInfo",
                        },
                    ],
                },
            ],
        },
    ],
};

const pkgDocInfo = JSON.parse(fs.readFileSync("dApp.api.json", "utf8"));

// ingests the package details and indexes all of the members using their canonicalReference
const indexAll = {};
// indexes each member by its 'kind', except skipping 'Property' and 'Method'
const indexByType = {};
const typeIndex = {};

// recursively
const indexMembers = (thing) => {
    const { name, kind, members } = thing;
    console.log(name, kind, members?.length ?? 0, "members");
    if (members)
        for (const item of members) {
            console.log(item.kind, item.name);
            indexAll[item.canonicalReference] = item;
            if (item.kind == "Class" || item.kind == "Package") {
                indexByType[item.kind] = indexByType[item.kind] || {};
                indexByType[item.kind][item.name] = item;
            } else if (item.kind == "TypeAlias" || item.kind == "Interface") {
                typeIndex[item.name] = item;
            }
            const { overloadIndex } = item;
            if (overloadIndex) {
                const alreadyPresent = typeIndex[item.name];
                if (!alreadyPresent) {
                    typeIndex[item.name] = {
                        ...item,
                        overloads: [],
                    };
                } else {
                    alreadyPresent.overloads = alreadyPresent.overloads || [];
                    alreadyPresent.overloads.push(item);
                }
            }

            if (item.members) {
                indexMembers(item);
            }
        }
};
indexMembers(pkgDocInfo);

// creates doc/toc.tsx containing a React <TableOfContents> component
// that file renders a <ul> list of <li> list items for each class, type, interface, etc.

const tocFile = "doc/toc.tsx";
const toc = `
export default function TableOfContents() {
    return (
        <ul>
            ${Object.keys(indexByType).map((kind) => {
                const { name } = indexByType[kind];
                return `<li key=${kind}><a href="doc/${name}">${name}</a></li>`;
            })}
            <li key="types"><a href="doc/types">Types</a></li>
        </ul>
    );
}
`;
fs.writeFileSync(tocFile, toc);

const firstClassMemberTypes = ["Class", "EntryPoint"];
// creates a file in doc/ for each first-class member type, containing a React component
// that documents all members of that type
const typeFiles = {};
firstClassMemberTypes.forEach((kind) => {
    const itemsThisKind = indexByType[kind];
    if (!itemsThisKind) {
        return;
    }
    for (const [key, metadata] of Object.entries(itemsThisKind)) {
        const { name } = metadata;

        const typeFile = `doc/${name}.tsx`;
        if (!metadata.members) {
            debugger;
            return;
        }
        const staticProps = metadata.members.filter(
            (member) => member.isStatic && member.kind == "Property"
        );
        const staticMethods = metadata.members.filter(
            (member) => member.isStatic && member.kind == "Method"
        );
        const instanceProps = metadata.members.filter(
            (member) => !member.isStatic && member.kind == "Property"
        );
        const instanceMethods = metadata.members.filter(
            (member) => !member.isStatic && member.kind == "Method"
        );
        const type = `import React from "react";

export default function DocumentItem() {
    return (
        <div>
            <h2>${name}</h2>
      ${staticProps.length > 0 ? `
            <p>
                <b>Static / class properties: </b>
        ${staticProps
            .map((member) => {
                return `                    <a href="#${member.name}">${member.name}</a>`;
            })
            .join(", \n")}
          </p>` : ""
        }${staticMethods.length > 0 ? `
            <p>
                <b>Static / class methods: </b>
            ${staticMethods
                .map((member) => {
                    return `                    <a href="#${member.name}">${member.name}</a>`;
                })
                .join(", \n")}
            </p>` : ""
    }${instanceProps.length > 0 ? `
            <p>
                <b>Instance properties: </b>
            ${instanceProps
                .map((member) => {
                    return `                    <a href="#${member.name}">${member.name}</a>`;
                })
                .join(", \n")}
            </p>` : ""
}${instanceMethods.length > 0 ? `
         <p>
            <b>Instance methods: </b>\n${instanceMethods
                .map((member) => {
                    return `                    <a href="#${member.name}">${member.name}</a>`;
                })
                .join(", \n")}
        </p>` : ""}
${staticProps.length > 0 ? `
    <h3>Static / class properties</h3>
    ${staticProps.map(mkMemberDoc()).join("\n\n")}
` : ""}
${staticMethods.length > 0 ? `
    <h3>Static / class methods</h3>
    ${staticMethods.map(mkMemberDoc()).join("\n\n")}
` : ""}
${instanceProps.length > 0 ? `
    <h3>Instance properties</h3>
    ${instanceProps.map(mkMemberDoc()).join("\n\n")}
` : ""}
${instanceMethods.length > 0 ? `
    <h3>Instance methods</h3>
        ${instanceMethods.map(mkMemberDoc()).join("\n\n")}
` : ""}
        </div>

    );
}
    `;
        fs.writeFileSync(typeFile, type);
    }
});
function mkMemberDoc(withHeader = true) {
    return (member) => {
        const {
            name,
            docComment,
            excerptTokens,
            isReadonly,
            isOptional,
            releaseTag,
            isProtected,
            isAbstract,
            isStatic,
            propertyTypeTokenRange,
            returnTypeTokenRange,
            overloadIndex,
            parameters,
            overloads,
        } = member;

        const header = withHeader
            ? `        <h4>${isStatic ? "static" : ""} ${isProtected ? "protected" : ""} ${
                  isAbstract ? "abstract" : ""
              } ${isReadonly ? "readonly" : ""} <b>{${JSON.stringify(name)}}</b></h4>`
            : "";
        return `${header}
            <pre>
{${JSON.stringify(docComment)}}
${excerptTokens
        .map((token) => {
            if (token.kind == "Content") {
                return `{${JSON.stringify(token.text)}}`;
            } else if (token.kind == "Reference") {
                return `<a href="#${token.text}">{${JSON.stringify(token.text)}}</a>`;
            }
        })
        .join("")}
            </pre>
    ${
        overloads
            ? `        <h5>Overloads</h5>
    ${overloads.map(mkMemberDoc(false)).join("\n\n")}
    `
            : ""
    }
    `;
    };
}
