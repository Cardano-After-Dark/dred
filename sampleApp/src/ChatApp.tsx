//@ts-expect-error
import React from "react";
import PropTypes, { InferProps } from "prop-types";

import util from "tweetnacl-util";
const { encodeUTF8, decodeUTF8, encodeBase64, decodeBase64 } = util;
import { withStateMachine, State, ErrorTrigger } from "@poshplum/poshplum";
import { autobind, asyncDelay } from "@poshplum/utils";

import { DredClient, ClientState } from "dred-client";
import { DevEnvLocalDiscovery } from "dred-client";

const codec = 'audio/webm; codecs="vorbis"';
import { Component } from "preact";
import type { ChanId, NbhId, DredEvent } from "dred-client";

type myProps = {};
type MyState = {
    gen: number;
    audioInputDevices: any[];
    currentState?: string;
    clientStatus?: string;
    message: string;
    msgs: string[];
    neighborhoods?: string[];
    channels?: string[]; //!!! update this
    neighborhood?: string;
    channel?: string;
    selectedMic: string;
    capabilities: string[];
    recording?: Blob;
    nowPlaying?: Blob;
    audioStream?: MediaStream;
    audioTrack?: MediaStreamTrack;
    queue: Blob[];
    isPlaying: boolean;
};
@withStateMachine
export class ChatApp extends Component<myProps, MyState> {
    //@ts-expect-error missing implementation (provided by withStateMachine)
    transition(t: string): Promise<any>;
    //@ts-expect-error missing implementation (provided by withStateMachine)
    mkTransition(t: string): () => Promise<any>;
    //@ts-expect-error missing implementation (provided by withStateMachine)
    hasState(...t: string[]): boolean;


    debugState = 1;
    recordingChunkInterval = 1500;
    lastMessage = "";
    client: DredClient;
    micSelector = React.createRef<HTMLSelectElement>();
    neighborhoodSelector = React.createRef<HTMLSelectElement>();
    channelSelector = React.createRef<HTMLSelectElement>();
    stopButton = React.createRef<HTMLButtonElement>();
    recorder?: MediaRecorder;
    player = React.createRef<HTMLAudioElement>();
    constructor(props: myProps) {
        super();
        this.client = this.ensureClient();
        this.state = {
            gen: 0,
            isPlaying: false,
            queue: [],
            message: "finding neighborhoods",
            msgs: [],
            audioInputDevices: [],
            capabilities: [],
            selectedMic: localStorage.getItem("mic") || "",
        };
    }
    ensureClient() {
        if (this.client) return this.client;

        const c : DredClient = this.client || new DredClient({ 
            discovery: new DevEnvLocalDiscovery({}),
            waitFor: "minimal",
            name: "Dred Communicator dev-0.1.2",
        });
        c.events.on("hasChannels", this.setChannelList)
        c.events.on("state:changed", this.clientStateChanged);
        return this.client = c;
    }

    @autobind
    async initialize() {
        await asyncDelay(800);
        const neighborhoods = await this.client.getNeighborhoods();
        this.setState({ neighborhoods, message: "neighborhood selection" });
        this.transition("initialized");
        this.neighborhoodSelector.current?.focus();

        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputDevices = devices.filter(
            (device) => device.kind === "audioinput"
        );
        this.setState({ audioInputDevices });
    }

    @autobind
    setChannelList( e: DredEvent & {nbh: NbhId, channels: ChanId[]} ) {
        const {channels} = e;
        this.setState({channels})
        this.transition("hasChannels")
    }
    @autobind
    clientStateChanged(e: ClientState) {
        const {
            channels,
            status
        } = e;
        // alert("client " + status)
        this.bump({message: status, clientStatus: status, channels})
    }

    @autobind
    async chooseNeighborhood(e) {
        const neighborhood = this.neighborhoodSelector.current.value;
        this.setState({ neighborhood, message: `selected neighborhood '${neighborhood}'` });
        this.client.setNeighborhood(neighborhood);

        await this.transition("findChannels");
        await asyncDelay(100);

        this.channelSelector.current?.focus();
    }

    // @autobind
    // async findChannelsInNeighborhood() {
    //     //!!!!!! todo: gets channel list via client
    //     const channels = ["discussion", "news"];
    //     this.client.transition("findChannels")
    //     await asyncDelay(400);
    //     this.setState({ channels });
    // }

    @autobind
    chooseChannel(e) {
        const channel = this.channelSelector.current.value;
        this.setState({ channel, message: `${channel}: chat channel ready` });
        return this.transition("chat");
    }

    didTransition(trans: string, nextState: string) {
        const msg = `⤻${trans} ➜ ${nextState}`;
        this.state.msgs.push(msg);
        console.log("app transition from", this.state.currentState, msg);
        this.bump();
    }

    render() {
        const {
            currentState = "",
            neighborhoods = [],
            channels = [],
            isPlaying,
            queue,
            audioInputDevices,
            nowPlaying,
            recording,
            message,
            msgs,
        } = this.state;
        const t: { hasState(s: string) } = this as any;
        // alert(currentState)

        if (message !== this.lastMessage) {
            msgs.push(message);
            this.lastMessage = message;
        }
        return (
            <div
                style={{
                    border: "1px dashed #555",
                    width: "70vh",
                    height: "10em",
                    borderRadius: "0.8em",
                    padding: "0.8em",
                    paddingBottom: "0",
                    marginBottom: "0",
                    position: "relative",
                }}
            >
                <h3 style={{ marginTop: "-1.3em" }}>
                    <span style={{ background: "#fff", padding: "0.4em" }}>
                        Sample App: Dred Communicator
                    </span>
                </h3>
                {this.showControlsAndStatus()}
                {this.showConsoleMessages()}

                {this.hasState("chatReady", "recording", "finishRecording") && (
                    this.showRecordButton()
                )}

                <State
                    name="default"
                    transitions={{
                        initialized: "choosingNeighborhood",
                    }}
                    onEntry={this.initialize}
                >
                    <small className="card read-the-docs">
                        ...contacting the Dred{" "}
                        <b style={{ color: "#aaa" }}>neighborhood discovery</b>{" "}
                        network...
                    </small>
                </State>

                <State
                    name="choosingNeighborhood"
                    transitions={{ 
                        findChannels: "findingChannels",
                        // hasChannels: "chooseChannels",
                    }}
                >
                    <p className="card read-the-docs">
                        <select
                            autoFocus
                            onChange={this.chooseNeighborhood}
                            ref={this.neighborhoodSelector}
                        >
                            <option>choose neighborhood</option>
                            {neighborhoods.map((n) => (
                                <>
                                    <option value={n}>{n}</option>
                                </>
                            ))}
                        </select>
                    </p>
                </State>
                <State
                    name="findingChannels"
                    transitions= {{
                        //! it is triggered to move to the next state when the client gives us a channel list.
                        hasChannels: "chooseChannels"
                        //!!!! todo: ensure that any potential failure of fetching channel-list is handled
                        //   ... that wouldn't be normal, but still useful to handle.  Ideally that condition 
                        //   ... can be routed through a generic state/warning notification, and otherise,
                        //   ... provided entirely by the Client object.
                    }}
                >
                   <small className="card read-the-docs"> ... finding channels in neighborhood ...</small>
                </State>

                <State
                    name="chooseChannels"
                    transitions={{ chat: "chatReady" }}
                >
                    <p className="card read-the-docs">
                        <select
                            autoFocus
                            onChange={this.chooseChannel}
                            ref={this.channelSelector}
                        >
                            <option>choose channel</option>
                            {channels.map((n) => (
                                <>
                                    <option value={n}>{n}</option>
                                </>
                            ))}
                        </select>
                    </p>
                </State>

                <State
                    name="chatReady"
                    transitions={{
                        record: "recording",
                        stop: "chatReady",
                        playNext: "playNext", //!!! todo: it is triggered when a message arrives
                    }}
                ></State>

                <State
                    name="recording"
                    onEntry={this.record}
                    transitions={{
                        stop: "finishRecording",
                        cancel: [null, "chatReady", this.cancelledRecording],
                    }}
                >
                    {/* Recording...
                    <button ref={this.stopButton}>stop</button> */}
                </State>
                <State
                    name="finishRecording"
                    onEntry={this.finishRecording}
                    transitions={{ 
                        play: "playing",
                        record: [() => false, "finishRecording"]
                     }}
                />

                <State
                    name="playing"
                    onEntry={this.playAudio}
                    transitions={{
                        playNext: "playNext",
                        stop: "stopped",
                    }}
                >
                    <audio
                        ref={this.player}
                        onEnded={this.mkTransition("playNext")}
                    />
                </State>

                <State
                    name="playNext"
                    onEntry={this.playNextOrReturnToReady}
                    transitions={{
                        ready: "chatReady",
                        playNext: "playing",
                    }}
                />
            </div>
        );
    }

    private showRecordButton() {
        return <button
            onMouseDown={this.mkTransition("record")}
            onMouseUp={this.mkTransition("stop")}
            onKeyUp={this.mkTransition("cancel")}
        >
            <div
                style={{
                    fontSize: "300%",
                }}
            >
                🔴
            </div>
            record
        </button>;
    }

    cancelledRecording() {
        this.setState({ message: "recording cancelled" });
    }

    @autobind
    async playNextOrReturnToReady() {
        if (this.state.queue.length) {
            const nowPlaying = this.state.queue.shift();
            return this.setState({ nowPlaying });
        }
        const { channel } = this.state;
        this.setStateThen({ message: `${channel}: chat channel ready` });
        return this.transition("ready");
    }
    async setStateThen(state) {
        return new Promise((resolve: any) => {
            this.setState(state, resolve);
        });
    }

    @autobind
    async record() {
        const { selectedMic, msgs } = this.state;
        const options = { mimeType: "audio/webm" };

        const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                deviceId: selectedMic,
            },
            video: false,
        });
        const audioTrack = audioStream.getAudioTracks()[0];
        const foundCapabilities = audioTrack.getCapabilities();

        // Set the echoCancellation property if supported
        if (foundCapabilities.echoCancellation) {
            audioTrack.applyConstraints({
                echoCancellation: { ideal: true },
            });
        }

        // Set the noiseSuppression property if supported
        if (foundCapabilities.noiseSuppression) {
            audioTrack.applyConstraints({
                noiseSuppression: { ideal: true },
            });
        }

        // Set the autoGainControl property if supported
        if (foundCapabilities.autoGainControl) {
            msgs.push("agc is available");
            audioTrack.applyConstraints({
                autoGainControl: { exact: false },
            });
        } else {
            msgs.push("agc not available; capabilities:");
        }
        const t = JSON.stringify(foundCapabilities, null, 2);
        console.log(t);
        //!! the output is below at 
        const settings = audioTrack.getSettings();
        console.log("settings", settings);
        const capabilities : string[] = [];
        for (const s in settings) {
            const v = settings[s]
            if ("boolean" == typeof v) {
                capabilities.push(`${v ? "" : "no "}${s}`)
            }
        }

        const recordedChunks: Blob[] = [];
        this.setState({ 
            message: "recording...", 
            audioStream, 
            audioTrack,
            capabilities 
        });
        const recorder = (this.recorder = new MediaRecorder(
            audioStream,
            options
        ));

        // setTimeout(this.recordNextChunk, this.recordingChunkInterval);
        // this.stopButton.current.addEventListener("click", this.finishRecording);

        recorder.start();
    }

    @autobind
    async finishRecording() {
        //! it is triggered when stopping recording.
        //! it stops the recorder and sends the data to the channel.

        await asyncDelay(100);
        const { channel } = this.state;

        if (!this.recorder) {
            const message = `can't finishRecording before starting recording`;
            this.bump({message})
            console.error(message);
            return;
        }

        this.doCaptureRecording()
        this.recorder.stop(); 
        this.stopCapture();
    }
    _liveNow: boolean = false;
    doCaptureRecording() {
        if (this._liveNow) return;

        this._liveNow = true;
        this.recorder?.addEventListener("dataavailable", this.captureRecording)
    }
    stopCapture() {
        this._liveNow = false;
        this.recorder?.removeEventListener("dataavailable", this.captureRecording)
    }

    @autobind
    captureRecording(e) {
        const { channel, audioTrack } = this.state;

        //! it disconnects from the microphone when not actively recording.            
        audioTrack?.stop();

        if (!channel) {
            return this.bump({message: "no channel selected"})
        }

        if (e.data.size > 0) {
            const recording = e.data;
            this.client.postMessage(channel, {
                msg: encodeBase64(recording)
            });


            this.bump({
                recording,
                message: "what you said...",
                nowPlaying: recording,
            });
            this.transition("play");
        }
    }

    @autobind bump({ message = "", msgs = [], ...state }: Partial<MyState> = {}) {
        if (message) (msgs as string[]).push(message);

        this.setState(({ gen }) => ({ message, ...state, gen: 1 + gen }));
    }

    // @autobind
    // recordNextChunk() {
    //     if (!this.recorder) throw new Error(`recorder not initialized`);
    //     if (
    //         this.state.recordingOut.length * this.recordingChunkInterval >
    //         9999
    //     ) {
    //         this.recorder.stop();
    //         return this.transition("playback");
    //     }
    //     if (!this.hasState("recording")) return;
    //     this.recorder.requestData();
    //     setTimeout(this.recordNextChunk, this.recordingChunkInterval);
    // }

    @autobind
    async playAudio() {
        const { nowPlaying } = this.state;
        if (!nowPlaying) return;

        const url = URL.createObjectURL(nowPlaying);
        this.player.current.src = url;
        this.player.current.play();
    }

    @autobind
    playDone() {
        this.bump({ message: "playDone -> playNext" });
        this.transition("playNext");
    }

    private showConsoleMessages() {
        const { msgs } = this.state;
        return React.createPortal(
            <div
                style={{
                    top: 0,
                    fontSize: "75%",
                    position: "absolute",
                    padding: "0.4em",
                    width: "15rem",
                    right: 0,
                    color: "#555",
                    background: "#111",
                    height: "100vh",
                }}
            >
                <h3>Console</h3>
                <code style={{ lineHeight: "0.8em", overflowY: "scroll" }}>
                    {msgs.map((msg) => (
                        <>
                            {msg}
                            <br />
                        </>
                    ))}
                </code>
            </div>,
            document.body
        );
    }

    private showControlsAndStatus() {
        const { message, currentState, capabilities } = this.state;
        return (
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "100%",
                    display: "block",
                    borderBottomLeftRadius: "0.8em",
                    borderBottomRightRadius: "0.8em",
                    // borderTopLeftRadius: "0.3em",
                    // borderTopRightRadius: "0.3em",
                }}
            >
                {this.showMicSelector()}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",

                        padding: "0.2em 0.4em",
                        fontSize: "80%",
                        borderBottomLeftRadius: "0.8em",
                        borderBottomRightRadius: "0.8em",
                        borderTopLeftRadius: "0.3em",
                        borderTopRightRadius: "0.3em",
                        background: "#111",
                        color: "#ccc",
                    }}
                >
                    <span style={{ float: "left", fontSize: "90%", color:"#fff" }}>{message}</span>
                    <code
                        style={{
                            // float: "right",
                            fontSize: "85%",
                            color: "#555",
                        }}
                    >
                        {currentState}
                    </code>
                </div>
                {/* <div
                    style={{
                        float: "left",
                        lineHeight: "1.2em",
                        fontSize: "75%",
                        marginBottom: "-3em",
                    }}>
                        {capabilities.join(", ")}
                    </div>
                <div
                    style={{
                        float: "right",
                        textAlign: "right",
                        lineHeight: "1.2em",
                        marginBottom: "-3em",
                        fontSize: "75%",
                    }}
                >
                    Mic quality trouble?: try{" "}
                    <a href="chrome://flags/#enable-webrtc-allow-input-volume-adjustment">
                        disabling forced AGC
                    </a>{" "}
                    in Chrome
                    <br />
                    (copy & paste link to new tab)
                </div> */}
            </div>
        );
    }

    private showMicSelector() {
        const { audioInputDevices, selectedMic } = this.state;

        return (
            !!audioInputDevices.length && (
                <div style={{ textAlign: "right" }}>
                    Mic:
                    <select
                        value={selectedMic}
                        style={{ maxWidth: "10em" }}
                        ref={this.micSelector}
                        onChange={this.setMicPref}
                    >
                        {audioInputDevices.map(this.showMicOption)}
                    </select>
                </div>
            )
        );
    }

    @autobind
    setMicPref() {
        const s = this.micSelector.current;
        const index = s.selectedIndex;
        const selectedItem = s.options[index];
        const selectedMic = selectedItem.value;
        localStorage.setItem("mic", selectedMic);

        this.setState({ selectedMic });
    }

    @autobind
    private showMicOption(mic) {
        // const { selectedMic } = this.state;

        // const selected = mic.id == selectedMic ? { selected: true } : {};
        //  {...selected}
        return <option value={mic.deviceId}>{mic.label}</option>;
    }
}

// thank you MIT license from https://github.com/Kikobeats/human-number
const ALPHABET = ["k", "mb", "gb", "tb"];
const THRESHOLD = 1e3;

function humanize(n: number): string {
    let idx = 0;
    while (n >= THRESHOLD && ++idx <= ALPHABET.length) n /= THRESHOLD;
    const formatted = Number.parseFloat(n).toFixed(1);
    return `${formatted}${idx > 0 ? ALPHABET[idx - 1] : ""}`;
}











//!! ref: 8ycggee
        // msgs.push(JSON.stringify(capabilities, null, 2));
        // from chromium 2023-02:
        // {
        //     autoGainControl: [true, false],
        //     channelCount: {
        //         max: 2,
        //         min: 1,
        //     },
        //     deviceId:
        //         "...a long hex number...",
        //     echoCancellation: [true, false],
        //     groupId:
        //         ""...another long hex number...",,
        //     latency: {
        //         max: 0.023219,
        //         min: 0.01,
        //     },
        //     noiseSuppression: [true, false],
        //     sampleRate: {
        //         max: 48000,
        //         min: 44100,
        //     },
        //     sampleSize: {
        //         max: 16,
        //         min: 16,
        //     },
        // };
//!/ref
