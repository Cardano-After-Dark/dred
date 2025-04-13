import fs from "fs";
import { TSDocParser, ParserContext, DocNode, DocComment, DocExcerpt } from "@microsoft/tsdoc";

/**
 * processes the package details  including all its members and nested members,
 * and generates a set of React components for displaying each member on on a separate page.
 */

class Formatter {
    // from https://github.com/microsoft/tsdoc/blob/main/api-demo/src/Formatter.ts

    public static renderDocNode(docNode: DocNode): string {
        let result: string = "";
        if (docNode) {
            if (docNode instanceof DocExcerpt) {
                result += docNode.content.toString();
            }
            for (const childNode of docNode.getChildNodes()) {
                const t = Formatter.renderDocNode(childNode);
                if (t.match(/customize the name/)) {
                    debugger;
                }
                result += t;
            }
        }
        return result;
    }

    public static renderDocNodes(docNodes: ReadonlyArray<DocNode>): string {
        let result: string = "";
        for (const docNode of docNodes) {
            result += Formatter.renderDocNode(docNode);
        }
        return result;
    }
}

const pkgDocInfoExample: TypeInfo = {
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
type ExcerptToken = {
    kind: "Content" | "Reference";
    text: string;
    canonicalReference?: string;
};
type TypeInfo = {
    kind:
        | "Class"
        | "TypeAlias"
        | "Interface"
        | "EntryPoint"
        | "Package"
        | "Property"
        | "Method"
        | "PropertySignature"
        | "MethodSignature";
    name: string;
    canonicalReference: string;
    docComment?: string;
    members?: TypeInfo[];
    isReadonly?: boolean;
    isOptional?: boolean;
    isStatic?: boolean;
    isProtected?: boolean;
    isAbstract?: boolean;
    isOverride?: boolean;
    releaseTag?: "Public" | "Internal" | "Private";
    excerptTokens?: ExcerptToken[];
    fileUrlPath?: string;
    typeTokenRange?: {
        startIndex: number;
        endIndex: number;
    };
    propertyTypeTokenRange?: {
        startIndex: number;
        endIndex: number;
    };
    returnTypeTokenRange?: {
        startIndex: number;
        endIndex: number;
    };
    overloadIndex?: number;
    parameters?: {
        parameterName: string;
        parameterTypeTokenRange: {
            startIndex: number;
            endIndex: number;
        };
        isOptional: boolean;
    }[];
    preserveMemberOrder?: boolean;
    overloads?: TypeInfo[];
};
const pkgDocInfo = JSON.parse(fs.readFileSync("dApp.api.json", "utf8"));

// ingests the package details and indexes all of the members using their canonicalReference
const indexAll = {};
const knownDocs = {};

// indexes each member by its 'kind', except skipping 'Property' and 'Method'
const entryPoints: Record<string, Record<string, TypeInfo>> = {};
const typeIndex: Record<string, TypeInfo> = {};

function parseDocComment(canonicalReference, docComment): ParserContext {
    if (knownDocs[canonicalReference]) {
        return knownDocs[canonicalReference];
    }
    const tsdocParser = new TSDocParser();
    const result = tsdocParser.parseString(docComment);
    knownDocs[canonicalReference] = result;
    return result;
}

// recursively
const indexMembers = (thing) => {
    const { name, kind, members } = thing;
    console.log(name, kind, members?.length ?? 0, "members");
    if (members)
        for (const item of members) {
            console.log(item.kind, item.name);
            indexAll[item.canonicalReference] = item;
            if (item.kind == "Class" || item.kind == "Package") {
                entryPoints[item.kind] = entryPoints[item.kind] || {};
                entryPoints[item.kind][item.canonicalReference] = item;
            } else if (item.kind == "TypeAlias" || item.kind == "Interface") {
                typeIndex[item.canonicalReference] = item;
            }
            const { overloadIndex } = item;
            if (overloadIndex) {
                const alreadyPresent = typeIndex[item.canonicalReference];
                if (!alreadyPresent) {
                    typeIndex[item.canonicalReference] = {
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
            ${Object.keys(entryPoints).map((kind) => {
                Object.values(entryPoints[kind]).map((item) => {
                    const { name } = item;
                    return `<li key=${item.canonicalReference}><a href="doc/${name}">${name}</a></li>`;
                });
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
    const itemsThisKind: Record<string, TypeInfo> = entryPoints[kind];
    if (!itemsThisKind) {
        return;
    }

    const typesOnPage: string[] = [];
    let docsForReferencedTypes: string[] = [];
    function registerUsedType(typeName: string, canonicalReference: string) {
        if (canonicalReference.startsWith("dred-network-registry!")) {
            if (!typesOnPage.includes(canonicalReference)) {
                if (!typeIndex[canonicalReference]) {
                    typesOnPage.push(canonicalReference);
                    docsForReferencedTypes.push(mkDocForType(canonicalReference, registerUsedType));
                } else {
                    docsForReferencedTypes.push(
                        `            ?? unknown type: <a href="doc/${typeName}">${typeName}</a> = ${canonicalReference}<br/>\n`
                    );
                }
            }
        }
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
        const docComponent = `import React from "react";
import ReactMarkdown from 'react-markdown';

export default function DocumentItem() {
    return (
        <div>
            <h2>${name}</h2>
      ${
          staticProps.length > 0
              ? `
            <p>
                <b>Static / class properties: </b>
        ${staticProps
            .map((member) => {
                return `                    <a href="#${member.name}"><var>${member.name}</var></a>`;
            })
            .join(", &nbsp;\n")}
          </p>`
              : ""
      }${
            staticMethods.length > 0
                ? `
            <p>
                <b>Static / class methods: </b>
            ${staticMethods
                .map((member) => {
                    return `                    <a href="#${member.name}"><var>${member.name}()</var></a>`;
                })
                .join(", &nbsp;\n")}
            </p>`
                : ""
        }${
            instanceProps.length > 0
                ? `
            <p>
                <b>Instance properties: </b>
            ${instanceProps
                .map((member) => {
                    return `                    <a href="#${member.name}"><var>${member.name}</var></a>`;
                })
                .join(", &nbsp;\n")}
            </p>`
                : ""
        }${
            instanceMethods.length > 0
                ? `
         <p>
            <b>Instance methods: </b>\n${instanceMethods
                .map((member) => {
                    return `                    <a href="#${member.name}"><var>${member.name}()</var></a>`;
                })
                .join(", &nbsp;\n")}
        </p>`
                : ""
        }
${
    staticProps.length > 0
        ? `
    <h3>Static / class properties</h3>
    ${staticProps.map(mkMemberDoc(registerUsedType)).join("\n\n")}
`
        : ""
}
${
    staticMethods.length > 0
        ? `
    <h3>Static / class methods</h3>
    ${staticMethods.map(mkMemberDoc(registerUsedType)).join("\n\n")}
`
        : ""
}
${
    instanceProps.length > 0
        ? `
    <h3>Instance properties</h3>
    ${instanceProps.map(mkMemberDoc(registerUsedType)).join("\n\n")}
`
        : ""
}
${
    instanceMethods.length > 0
        ? `
    <h3>Instance methods</h3>
        ${instanceMethods.map(mkMemberDoc(registerUsedType)).join("\n\n")}
`
        : ""
}
${
    typesOnPage.length > 0
        ? `
<h3>Types referenced</h3>
${docsForReferencedTypes.join("\n\n")}
`
        : ""
}
        </div>

    );
}
    `;
        fs.writeFileSync(typeFile, docComponent);
    }
});

function mkMemberDoc(
    registerUsedType: (name: string, canonicalReference: string) => void,
    withHeader = true
) {
    return (member: TypeInfo) => {
        const {
            name,
            canonicalReference,
            docComment,
            excerptTokens,
            kind,

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
            ? `        <h5>${isStatic ? "static" : ""} ${isProtected ? "protected" : ""} ${
                  isAbstract ? "abstract" : ""
              } ${isReadonly ? "readonly" : ""} <b>{${JSON.stringify(name)}}</b></h5>`
            : "";
        return `
                <a id="${name}"></a>

        ${header}
            <pre>
${showUnparsedDocComment(canonicalReference, docComment)}
${excerptTokens
    ?.map((token) => {
        if (token.kind == "Content") {
            return `{${JSON.stringify(token.text)}}`;
        } else if (token.kind == "Reference") {
            registerUsedType(token.text, token.canonicalReference!);
            return `<a href="#${token.text}">{${JSON.stringify(token.text)}}</a>`;
        }
    })
    .join("")}
            </pre>
    ${
        overloads
            ? `        <h5>Overloads</h5>
    ${overloads.map(mkMemberDoc(registerUsedType, false)).join("\n\n")}
    `
            : ""
    }
    `;
    };
}

function showUnparsedDocComment(canonicalReference: string, docComment?: string) {
    if (!docComment) {
        return "";
    }
    const parsed = parseDocComment(canonicalReference, docComment);
    return showDocComment(parsed.docComment);
}

function showDocComment(docComment?: DocComment) {
    if (!docComment) {
        return "";
    }
    const remarks = docComment.remarksBlock;
    debugger
    const summary = docComment.summarySection;
    return `
    <h4>Summary</h4>
    <ReactMarkdown>
            {
                ${JSON.stringify(Formatter.renderDocNode(summary))}
            }
    </ReactMarkdown>

        ` + ( remarks
        ? `<ReactMarkdown> {
            ${JSON.stringify(
                Formatter.renderDocNode(remarks!).
                replace(/@remarks/, "")
            )}
        }</ReactMarkdown>`
        : "");
}

function mkDocForType(
    canonicalReference: string,
    registerUsedType: (name: string, canonicalReference: string) => void
) {
    const type = typeIndex[canonicalReference] || entryPoints["Class"][canonicalReference];

    if (!type) {
        // debugger
        return `            <p>see also: ${canonicalReference}</p>\n`;
    }

    type.excerptTokens?.forEach((token) => {
        if (token.kind == "Reference") {
            registerUsedType(token.text, token.canonicalReference!);
        }
    });

    const { docComment, name: typeName, excerptTokens } = type;
    const tsdoc = parseDocComment(canonicalReference, docComment);
    const parsedDoc = tsdoc.docComment;

    if (!type) {
        // debugger
        return `?? unknown type: ${typeName}`;
    }
    return `
        <div>
            <h2>${typeName}</h2>
            ${showDocComment(parsedDoc)}
        </div>
    `;
}
