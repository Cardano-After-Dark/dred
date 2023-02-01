//@ts-expect-error
import React from "react";
import PropTypes, { InferProps } from "prop-types";
import { DredClient } from "dred-client";
import { DevEnvLocalDiscovery } from "dred-client";

import { Component } from 'preact'
type myProps = {
    // hi?: string;
};
type MyState = {
    gen: number
}
export class ChatApp extends Component<myProps, MyState> {
    client: DredClient;
    constructor(props:myProps) {
        super()
        this.client = new DredClient({ discovery: new DevEnvLocalDiscovery() });
        this.state = {gen:0}
    }
    render() {
        return (
            <div>
                <p class="card read-the-docs">
                    ...contacting the Dred{" "}
                    <b style="color: #aaa">neighborhood discovery</b> network...
                </p>
            </div>
        );
    }
}
