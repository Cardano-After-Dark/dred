import React, { createRef, Component, useState, useCallback } from "react";
import type { ChangeEvent, ChangeEventHandler } from "react";
import { createPortal } from "react-dom";
import link from "next/link.js";
const Link = link.default;
import head from "next/head.js";
const Head = head.default;
import { dumpAny, FoundDatumUtxo } from "@donecollectively/stellar-contracts";
import type { ErgoNodeRegistrationData, minimalNodeRegistrationData } from "dred-network-registry";

type NodeStateFormProps = {
    node?: ErgoNodeRegistrationData;
}
import { signals, updaters } from "@/capoSignals.js";
import { Prose } from "../Prose.jsx";

type propsType = {
    datumUtxo?: FoundDatumUtxo<ErgoNodeRegistrationData>
    create?: boolean;
    refresh: Function;
    onSave: Function;
    onClose: Function;
} //& hasBookMgr;

type stateType = {
    modified: boolean;
    gen: number;
    error?: string;
    submitting?: boolean;
    saveAs?: "suggestion" | "update";
    contentMarkdown: string;    
    pmSteps: string;
    problems: Record<string, string>;
    current: ErgoNodeRegistrationData | minimalNodeRegistrationData;
};

type FieldProps = {
    rec: ErgoNodeRegistrationData | minimalNodeRegistrationData;
    fn: string;
    as?: React.ElementType;
    fwdRef? : React.RefObject<any>;
    bare?: true;
    rows?: number;
    options?: HtmlSelectOptions;
    placeholder?: string;
    label: string;
    defaultValue?: string;
    style?: Record<string, any>;
    tableCellStyle?: Record<string, any>;
    helpText: string;
    index?: number;
    validator?: Function;
    fieldId: string;
    problem?: string;
    onChange: ChangeHandler;
    readonly?: boolean;
};
type eventArg = React.ChangeEvent<HTMLInputElement>
type ChangeHandler = ( event: eventArg ) => void

const testBookPage : minimalNodeRegistrationData = {
    memberToken: "foo-xxx",
    state: { NeedsValidation: [] },
    nodeDetails: {
        address: "1.2.3.4",
        port: 8080,
        pubKey: "x",
        pubKeyHash: "y"
        // name: "testNode"
    }
};

const buttonStyle = {
    padding: "0.75em",
    marginLeft: "0.5em",
    minWidth: "8em",
    // marginTop: '-0.75em',
    // border: '1px solid #0000ff',
    // borderRadius: '0.25em',
    // backgroundColor: '#1e244c',

    border: "1px solid #162ed5",
    borderRadius: "0.5em",
    backgroundColor: "#142281",
};

type HtmlSelectOptions = string[] | Record<string, string>;

type fieldOptions =
    | {
          array?: true;
          bare?: true;
          helpText?: string;
          length?: number;
          placeholder?: string;
          fwdRef? : React.RefObject<any>;
          defaultValue?: string;
          rows?: number;
          style?: Record<string, any>;
          tableCellStyle?: Record<string, any>;
          validator?: Function;
          options?: HtmlSelectOptions;
          type?: "textarea" | "input" | "select" | React.ElementType;
          readonly?: boolean;
      }
    | undefined;

let mountCount = 0;

export class NodeRegEditor extends React.Component<propsType, stateType> {
    form = createRef<HTMLFormElement>();
    i: number;
    constructor(props: propsType) {
        super(props);
        this.i = mountCount += 1;
        this.save = this.save.bind(this);
        this.form = React.createRef();
    }

    get capo() {
        const capo = signals.capo.value;
        if (!capo) throw new Error("no capo");
        return capo
    }
    get provider() {
        const provider = signals.provider.value;
        if (!provider) throw new Error("no provider");
        return provider
    }

    get dAppStatus() {
        const dAppStatus = signals.dAppStatus.value;
        if (!dAppStatus) throw new Error("no dAppStatus");
        return dAppStatus
    }
    get userInfo() {
        const userInfo = signals.userInfo.value;
        if (!userInfo) throw new Error("no userInfo");
        return userInfo
    }

    formBody: React.RefObject<HTMLTableSectionElement> = React.createRef();
    editor: React.RefObject<HTMLDivElement> = React.createRef();
    keepControlsOnscreen = (e: Event) => {
        const currentScroll = window.scrollY;
        const stickyHeader = document.querySelector("header.sticky");
        const headerHeight = stickyHeader?.clientHeight || 0;

        // determine the vertical position of the formBody within the document, not the window
        const formBodyRect = this.formBody.current?.getBoundingClientRect();
        if (!formBodyRect) return;

        // const formBodyLocation = formBodyRect.top;
        // if (formBodyLocation < headerHeight) {
        //     const diff = headerHeight - formBodyLocation;
        //     const targetPosition = currentScroll - diff;
        //     // console.log("-------------------------", {currentScroll, diff, formBodyLocation, headerHeight});
        //     window.scrollTo(0, targetPosition);
        //     const maxHeight = formBodyRect.height + headerHeight;
        //     if (maxHeight > window.innerHeight) {
        //         this.editor.current.style.maxHeight = `${maxHeight}px`
        //     }
        // }
    }

    async componentDidMount() {
        const { datumUtxo } = this.props;
        // console.error(`MOUNTED CredForm ${this.i}`)
        window.addEventListener("scrollend", this.keepControlsOnscreen);
        const current =
            datumUtxo?.data ||
            ({
                ...testBookPage,
            } as minimalNodeRegistrationData);

        await new Promise((res) => {
            this.setState(
                {
                    current,
                    problems: {},
                },
                res as any
            );
        });
        if (this._unmounting) return;

        let tcx: any;
        try {
            const env = process.env.NODE_ENV;
            const minter = await this.capo.getMintDelegate();
        } catch (error: any) {
            console.error(error.stack);
            debugger;
            this.setState({ error: error.message });
        }
    }
    _unmounting?: true;
    componentWillUnmount(): void {
        window.removeEventListener("scrollend", this.keepControlsOnscreen);
        // console.error(`UNMOUNTing PageEditor ${this.i}`)
        // this._unmounting = true;
    }

    onSaveAsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value !== "suggestion" && value !== "update") {
            return this.provider.reportError(
                new Error(`bad value for radio button: ${value}`),
                "saveAs",
                {
                    developerGuidance: "fix this dev error"
                }
            );
        }
        // alert("save as "+value);
        this.setState({ saveAs: value });
    };

    get isAdmin() {
        return this.userInfo.roles?.includes("admin");
    }

    get memberOwnsNode() {
        const { datumUtxo: entry } = this.props;
        const { memberUut} = this.userInfo;
        if (!entry || !memberUut) return false;

        return entry.data?.memberToken == memberUut?.name;
    }

    async save(e: React.SyntheticEvent) {
        const { current: rec, saveAs } = this.state;
        const {
            datumUtxo,
            refresh,
            create,
        } = this.props;
        const {
            updateStatus,
            reportError,
        } = this.provider;

        const { capo, dAppStatus, provider, userInfo } = this;
        const nodeRegistry = await capo.getNodeRegistryController();

        e.preventDefault();
        e.stopPropagation();

        if (!saveAs)
            throw new Error(
                `missing required saveAs setting - default to Suggestion?`
            );

        //! clears "undefined" problems that may have existed temporarily
        const problems = JSON.parse(JSON.stringify(this.state.problems));
        if (Object.keys(problems).length) {
            this.setState({ problems, submitting: true });
            return;
        }

        const form = e.target as HTMLFormElement;
        const updatedNode = this.capture(form);
        const { isAdmin: isEditor, memberOwnsNode: hasDocOwnership } = this;

        try {
            const txnDescription = `${create ? "creation" : "update"} txn`;
            console.log(new Date(), "@0");
            provider.updateStatus(`preparing ${txnDescription}`, { 
                progressBar: true,
                developerGuidance: "display progress to user"
            },
                `//mkTxn ${txnDescription}`
            );
            console.log(new Date(), "@1");
            debugger;
            const tcx = create
                ? await nodeRegistry.mkTxnRegisteringNode(updatedNode)
                : await nodeRegistry.mkTxnUpdatingNodeRegistration("saving update", 
                    datumUtxo!, {
                        updatedFields: updatedNode
                    }
                )
                // : await bookContract.mkTxnSuggestingUpdate({
                //       ...entryForUpdate,
                //       updated: updatedBookEntry,
                //   });
            // alert("ok");
            console.log(new Date(), "@2");
            // console.warn(dumpAny(tcx, capo.networkParams));
            console.log(new Date(), "@3");
            provider.updateStatus(
                `sending the ${txnDescription} to your wallet for approval`,
                {
                    progressBar: true,
                    developerGuidance: "display update to user"
                },
                "// submit book entry to wallet"
            );
            const minDelay = new Promise((res) => setTimeout(res, 2000));

            await nodeRegistry.submit(tcx);
            console.log(new Date(), "@4");

            await minDelay;
            console.log(new Date(), "@5");

            // updateState(`submitting the ${txnDescription} to the network`,);
            refresh().then(async () => {
                provider.updateStatus(
                    `The update will take a few moments before it's confirmed`,
                    {
                        developerGuidance: "display the message so user can have patience"
                    },
                    "//@user: be patient"
                );
                await new Promise((res) => setTimeout(res, 3000));
                provider.updateStatus("", {
                    developerGuidance: "clear patience msg"
                }, "// clear patience msg");
            });
            alert("push next url ?");
            // router.push("/book", "", { shallow: true });
            // this.setState({modified: true})
        } catch (error: any) {
            const messages: string[] = error.message.split("\n");
            // const info = messages.filter(x => x.startsWith("INFO ")).map(x => x.replace(/info \(.*?)\)\s+/, "");
            const errors = messages
                .filter((x) => x.startsWith("ERROR "))
                .map((x) => x.replace(/ERROR \(.*?\)\s+/, ""));
            if (!errors.length) errors.push(error.message || error.stack);

            console.error(error.stack);
            console.log(new Date(), "@6");

            provider.updateStatus(
                "Error in txn: " + errors.join(" - ALSO -"),
                {
                    isError: true,
                    moreInstructions: "Correct this error and try again",
                    developerGuidance: "display error to user"
                },
                "// error submitting txn"
            );
        }
    }

    render() {
        const {
            current: rec,
            modified,
            error,
            submitting,
            saveAs: saveAsState,
            problems,
        } = this.state || {};

        const { provider, capo, dAppStatus, props: { datumUtxo, create, onClose, onSave } } = this;
        const { userInfo: {
            memberUut, roles, wallet, walletAddress, walletHandle
        } } = provider;
        if (!rec) return ""; //wait for didMount
        const showTitle = <>{create ? "Register" : "Updating"} Dred Node</>;
        let sidebarContent;

        const { isAdmin, memberOwnsNode } = this;
        //! when the user has authority to apply changes, use "update" mode by default,
        //   ... but allow them to save it as a suggestion instead.
        //! if they don't have authority, they can only make a suggestion.
        // let saveAs = saveAsState;
        // if (!("saveAs" in (this.state || {}))) {
        //     if (memberUut) {
        //         saveAs = hasAuthority ? "update" : "suggestion";
        //         setTimeout(() => {
        //             // alert("applying " +saveAs);
        //             this.setState({
        //                 saveAs,
        //             });
        //         }, 100);
        //     }
        // }
        //! an editor CAN use direct update, but with "suggestion" by default.
        const canDoDirectUpdate = memberOwnsNode || isAdmin;
        // const isSuggesting = "suggestion" == saveAs;
        // const isUpdating = "update" == saveAs;

        const foundProblems = submitting && Object.keys(problems).length;
        {
            if ("undefined" == typeof window) {
                sidebarContent = <div suppressHydrationWarning />;
            } else {
                const portalTarget = document?.getElementById("sidebar");
                if (!portalTarget) {
                    throw new Error("no sidebar");
                }
                sidebarContent = (
                    <div suppressHydrationWarning>
                        {createPortal(
                            <Prose
                                className="prose-slate"
                                style={{ fontSize: "85%" }}
                            >
                                <p
                                    style={{
                                        fontStyle: "italic",
                                        marginTop: "4em",
                                    }}
                                >
                                    The node registration will be visible on the
                                    blockchain, and available for use by applications.
                                </p>

                                <p
                                    style={{
                                        fontStyle: "italic",
                                        marginTop: "2em",
                                    }}
                                >
                                    Your  member token is required for creating or
                                    updating the registration.
                                </p>
                            </Prose>,
                            portalTarget
                        )}
                    </div>
                );
            }
        }

        const breadcrumbTitle = create ? "create" : "update";
        // const nodeRegData: ErgoNodeRegistrationData | undefined = create
        //     ? undefined
        //     : { ... datumUtxo!.data }
        const creatingEntry = create ? rec : undefined;
        // if (entry && modified) {
        //     // debugger;
        // }
        return (
            <div>
                <Head>
                    <title>{showTitle}</title>
                </Head>
                {sidebarContent}
                <Prose
                    className="prose-slate"
                    style={{
                        marginTop: "-2em",
                        backgroundColor: "#1e244c",
                        borderRadius: "0.5em",
                        padding: "0.75em",
                    }}
                >
                    <div style={{ float: "right", fontSize: "80%" }}>
                        {(modified && (
                            <button
                                style={buttonStyle}
                                type="button"
                                onClick={onClose as any}
                            >
                                Cancel
                            </button>
                        )) || (
                            <button
                                style={buttonStyle}
                                type="button"
                                onClick={onClose as any}
                            >
                                {create ? "Cancel" : "Back"}
                            </button>
                        )}
                    </div>
                    <h1
                        className="font-display text-3xl tracking-tight text-slate-900 dark:text-white -mt-8"
                        style={{
                            marginBottom: "0",
                        }}
                    >
                        {showTitle}
                    </h1>
                    <form
                        ref={this.form}
                        onSubmit={this.save}
                        style={{
                            padding: "0.75em",
                            // fontSize: "91%",
                        }}
                    >
                        <table>
                            <tbody ref={this.formBody}>                                
                                {this.field("Node address or DNS name", "nodeDetails.address", {
                                    placeholder: "Node Name",
                                    helpText: "Your node must have a TLS certificate matching this name",
                                    validator(v: string) {
                                        if (v.length < 8)
                                            return "must be at least 8 characters";
                                    },
                                })}
                                {this.field("Node port", "nodeDetails.port", {
                                    placeholder: "Node Port",
                                    helpText: "Your node must listen with TLS on this port",
                                    validator(v: string) {
                                        if (v.length < 1)
                                            return "must be at least 1 character";
                                        const port = parseInt(v);
                                        if (isNaN(port))
                                            return "must be a number";
                                        if (port < 1 || port > 65535)
                                            return "must be a valid port number";
                                        return "";
                                    },
                                })}
                                {this.field("Node's Public Key", "nodeDetails.pubKey", {
                                    helpText: "Get the pubkey from the node container startup logs",
                                    validator(v: string) {
                                        if (v.length < 1)
                                            return "must be at least 1 character";
                                        if (v.length != 64)
                                            return "must be 64 characters long";
                                        return "";
                                    },
                                })}
                                                                {this.field("Owner", "memberToken", {
                                    helpText: "Your member token is required for creating or updating the registration",
                                    readonly: true,
                                    style: {
                                        color: "#ccc",
                                        opacity: 0.4,
                                    },
                                })}

                                <tr><td className="align-baseline">State</td><td className="align-baseline">
                                {create ? 
                                    <>
                                        <b>Needs Validation</b>: The node will need to be validated by other nodes before it is activated
                                    </>
                                : null}
                                </td></tr>
                                {/* {roles?.includes("editor") &&
                                    this.field("Entry Type", "entryType", {
                                        type: "select",
                                        options: {
                                            pg: "Page",
                                            spg: "Suggested Page",
                                        },
                                    })} */}
                                <tr>
                                    {false &&!create && (
                                        <>
                                            <th className="text-right">
                                                Save as...
                                            </th>
                                            <th className="pl-4 align-baseline text-base">
                                                {/* <label
                                                    htmlFor="save-as-update"
                                                    className={`${
                                                        canDoDirectUpdate
                                                            ? ""
                                                            : "opacity-30"
                                                    } form--radio-label ${
                                                        isUpdating
                                                            ? "font-bold text-[#ccc]"
                                                            : "text-sm"
                                                    }`}
                                                >
                                                    <input
                                                        id="save-as-update"
                                                        name="saveAs"
                                                        type="radio"
                                                        value="update"
                                                        checked={isUpdating}
                                                        onChange={
                                                            this.onSaveAsChange
                                                        }
                                                        disabled={
                                                            !canDoDirectUpdate
                                                        }
                                                    />
                                                    &nbsp;&nbsp;Direct update
                                                </label> */}
                                                {/* &nbsp;&nbsp;&nbsp;&nbsp;
                                                <label
                                                    htmlFor="save-as-suggestion"
                                                    className={`form--radio-label ${
                                                        // isSuggesting
                                                        //     ? "font-bold" :
                                                            "text-sm "
                                                    }`}
                                                >
                                                    <input
                                                        id="save-as-suggestion"
                                                        name="saveAs"
                                                        type="radio"
                                                        value="suggestion"
                                                        checked={isSuggesting}
                                                        onChange={
                                                            this.onSaveAsChange
                                                        }
                                                    />
                                                    &nbsp;&nbsp;Suggestion
                                                </label> */}
                                            </th>
                                        </>
                                    )}
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td style={{ textAlign: "right" }}>
                                        {(modified || !create) && (
                                            <>
                                                <button
                                                    style={buttonStyle}
                                                    type="submit"
                                                >
                                                    {create
                                                        ? "Create"
                                                        : "Save Changes"}
                                                </button>
                                                <div className="ml-4">
                                                    {!!foundProblems && (
                                                        <div className="text-[#f66]">
                                                            Fix {foundProblems}{" "}
                                                            problem(s) before
                                                            proceeding
                                                            <br />
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </td>
                                </tr>
                                {error && (
                                    <tr>
                                        <td></td>
                                        <td>
                                            <div
                                                className="error border rounded relative mb-4"
                                                role="alert"
                                                style={{
                                                    marginBottom: "0.75em",
                                                }}
                                            >
                                                <strong className="font-bold">
                                                    Whoops! &nbsp;&nbsp;
                                                </strong>
                                                <span className="block inline">
                                                    {error}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tfoot>
                        </table>
                    </form>
                </Prose>
            </div>
        );
    }

    field(label: string, fn: string, options?: fieldOptions) {
        const { current: rec, problems, submitting } = this.state;
        const { 
            array, type: as = 'input',  
            bare,
            fwdRef,
            options: selectOptions,
            style,
            validator,
            readonly,
            tableCellStyle,
            rows, helpText, placeholder, defaultValue, 
        } = options || {}; //prettier-ignore

        if (bare) {
            if (label) {
                throw new Error(`Field: a bare field must have an empty label`);
            }
            if (array) {
                throw new Error(`Field: bare and Array are not compatible`);
            }
        }
        if (array && fwdRef) {
            throw new Error(`Field: array and fwdRef are not compatible`);
        }

        // if (fn == "content") debugger;
        if (!array) {
            const fieldId = this.mkFieldId(fn);
            captureProblems.call(this, fieldId, getPathValue(rec, fn));

            const showProblem = submitting
                ? { problem: problems[fieldId] }
                : {};
            return (
                <Field
                    key={fn}
                    {...showProblem}
                    {...{
                        rec,
                        readonly,
                        as,
                        fwdRef,
                        fn,
                        fieldId,
                        label,
                        bare,
                        placeholder,
                        defaultValue,
                        helpText: helpText || "‹!!! no help text›",
                        options: selectOptions,
                        rows,
                        style,
                        tableCellStyle,
                        onChange: validator
                            ? this.mkChangeValidator(fieldId, validator, rec)
                            : this.changed,
                    }}
                />
            );
            // non-array
        } 

        // it's an array
        const items = getPathValue(rec, fn);
        if (!Array.isArray(items)) {
            throw new Error(`Field: ${fn} is not an array`);
        }
        if (!!items.at(-1)) {
            items.push("");
        }

        return (
            <>
                {items.map((oneValue, index: number) => {
                    const fieldId = this.mkFieldId(fn, index);
                    // debugger;
                    captureProblems.call(this, fieldId, oneValue, index);

                    const showProblem = submitting
                        ? { problem: problems[fieldId] }
                        : {};
                    return (
                        <Field
                            key={fieldId}
                            {...showProblem}
                            {...{
                                rec,
                                as,
                                fn,
                                index,
                                fieldId,
                                label,
                                readonly,
                                placeholder,
                                defaultValue,
                                helpText: helpText || "‹!!! no help text›",
                                rows,
                                style,
                                tableCellStyle,
                                onChange: validator
                                    ? this.mkChangeValidator(
                                          fieldId,
                                          validator,
                                          rec,
                                          index
                                      )
                                    : this.changed,
                            }}
                        />
                    );
                })}
            </>
        );

        function captureProblems(this: NodeRegEditor, fieldId: string, rVal : any, fieldIndex?: number) {
            if (validator) {
                const problem = validator(rVal || "", rec, fieldIndex);
                if (problem && !problems[fieldId]) {
                    this.setStateLater((state : stateType) => ({
                        ...state,
                        problems: {
                            ...state.problems,
                            [fieldId]: problem,
                        },
                    }));
                }
            }
        }
    }

    setStateLater(updater: (state: Readonly<stateType>, props:any) => stateType | Pick<stateType, keyof stateType>) {
        setTimeout(() => {
            this.setState(updater);
        }, 1);
    }

    validators: Record<string, ChangeHandler> = {};
    mkChangeValidator(
        fieldId: string,
        validate: Function,
        rec: minimalNodeRegistrationData,
        index?: number
    ): ChangeHandler {
        const v = this.validators[fieldId];
        if (v) return v;
        const changedWithValidation: ChangeHandler = (e: eventArg) => {
            if (validate) {
                //@ts-expect-error with fields on opposite side of union type
                const value = e.prosemirror ?  e.markdownValue : e.target.value;

                const problem = validate(value, rec, index);
                if (this.state.problems[fieldId] !== problem) {
                    this.setStateLater((state : stateType) => {
                        const newState = {
                            ...state,
                            //! clears problems that have been corrected (i.e. [key] => ‹undefined›)
                            //   ... using json-stringifying convention of skipping undef values
                            problems: JSON.parse(
                                JSON.stringify({
                                    ...state.problems,
                                    [fieldId]: problem,
                                })
                            ),
                        };
                        return newState;
                    });
                }
            }
            return this.changed(e);
        };
        return (this.validators[fieldId] = changedWithValidation);
    }

    changed: ChangeHandler = (e) => {
        //! adds an empty item at the end of the list of expectations
        const {
            current: {},
            gen = 0,
        } = this.state;

        const f = this.form.current;

        if (!f) {
            console.error("no form; no capture.");
            return;
        }
        const updatedEntry = this.capture(f);
        // //@ts-expect-error
        // if (updatedEntry.saveAs) {
        //     debugger;
        // }
        this.setState({
            current: updatedEntry,
            modified: true,
            gen: 1 + gen,
        });
    };
    capture(form : HTMLFormElement) {
        const formData = new FormData(form);
        
        const currentForm: minimalNodeRegistrationData = Object.fromEntries(
            [...formData.entries()].map(([k, v]) => {
                //prettier-ignore
                const decoded = 
                    typeof v == "string" ? decodeURIComponent(v)
                        : Array.isArray(v) ? v.map(decodeURIComponent)
                        : v;
                    console.warn("decoding", k, v, "=>", decoded);
                return [k, decoded];
            })
        ) as unknown as minimalNodeRegistrationData;
        const initial = this.props.datumUtxo?.data || {};
        const updatedEntry = {
            ...(this.state?.current || {}),
            ...currentForm,
        };

        return updatedEntry;
    }
    mkFieldId(fn: string, index?: number): string {
        const idx = index || (index === 0 ? 0 : "");
        return `${fn}.${index || ""}`;
    }
}

function getPathValue(rec: ErgoNodeRegistrationData | minimalNodeRegistrationData, path: string) {
    const parts = path.split(".");
    let value = rec;
    for (const part of parts) {
        //@ts-expect-error accessing generic string index
        value = value[part];
    }
    return value;
}


// supports fields at a path in the record
// supports array fields at any path in the record
// does not yet support fields **within** an array of the record
function Field({
    rec,
    fn,
    as: As = "input",
    helpText,
    index,
    placeholder,
    defaultValue,
    rows,
    readonly,
    options,
    label,
    style,
    tableCellStyle,
    fieldId,
    validator,
    bare,
    problem,
    onChange,
}: FieldProps) {
    const rVal = getPathValue(rec, fn);
    let value = rVal;
    if ("undefined" !== typeof index) {
        const arrayVal = rVal;
        if (!Array.isArray(arrayVal)) {
            throw new Error(`Field: ${fn} is not an array`);
        }
        value = arrayVal[index] || (arrayVal[index] = "");
    }

    const isOnlyOrLastRow = !Array.isArray(rVal) || (index ?? 0) + 1 == rVal.length;
    const noBottomBorder = {
        style: { borderBottom: "none" },
    };
    const arrayTableStyle = isOnlyOrLastRow ? {} : noBottomBorder;
    const helpId = fn;
    const errorId = problem ? `problem-${fieldId}` : "";
    const optionsAsKV =
        options && Array.isArray(options)
            ? Object.fromEntries(
                  options.map((s) => {
                      return [s, s];
                  })
              )
            : options;

    const renderedOptions = optionsAsKV
        ? Object.entries(optionsAsKV).map(([k, v]) => {
              return (
                  <option key={k} value={k}>
                      {v}
                  </option>
              );
          })
        : undefined;
    const errorBorder = problem ? { border: "1px solid #f66" } : {};
    // if (fn == "content") debugger;

    const content = (
        <>
            <As
                autoComplete="off"
                className="invalid:border-pink-500"
                style={{
                    width: "100%",
                    color: "#ccc",
                    fontWeight: "bold",
                    padding: "0.4em",
                    background: "#000",
                    ...errorBorder,
                    ...style,
                }}
                id={fieldId}
                readonly={readonly}
                aria-invalid={errorId ? true : false}
                aria-describedby={`${helpId} ${errorId}`}
                rows={rows}
                name={fn}
                onInput={onChange}
                children={renderedOptions}
                {...{
                    rec,
                    placeholder,
                    defaultValue: value || defaultValue,
                }}
            ></As>
            {problem && (
                <div id={errorId} className="text-[#f66]">
                    {problem}
                </div>
            )}
            {isOnlyOrLastRow && helpText && (
                <div
                    id={helpId}
                    style={{
                        marginTop: "0.5em",
                        // fontSize: "91%",
                        fontStyle: "italic",
                    }}
                >
                    {helpText}
                </div>
            )}
        </>
    );
    if (bare) return content;

    return (
        <tr {...arrayTableStyle}>
            <th className={
                `align-baseline ${readonly ? "text-slate-500" : ""}`
            }>{!!index || <label htmlFor={fieldId}> {label}</label>}</th>
            <td style={tableCellStyle || {}}>{content}</td>
        </tr>
    );
}

