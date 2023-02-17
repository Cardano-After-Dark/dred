import React from "react";

import { Reactor, NotificationArea } from "@poshplum/poshplum";
import { useState } from "preact/hooks";
import "./app.css";
import { ChatApp } from "./ChatApp";


@Reactor
export class App extends React.Component {
    hasNotifications = true
    render() {
    return (
        <>
            <NotificationArea name="root"/>
            <div class="float-left">
                <img
                    src="/cad-logo.webp"
                    class="logo"
                    alt="Cardano After Dark logo"
                    style={{ borderRadius: "4em", height: "20em" }}
                />
            </div>
            <p
                style={{ marginTop: "-4rem", fontSize: "75%" }}
                class="read-the-docs"
            >
                presents
            </p>
            <h1>Dred</h1>
            <div>
                <p>
                    Realtime decentralized event-messaging platform for web3
                    dapps
                </p>
            </div>
            <ChatApp />
        </>
    );
    } }
