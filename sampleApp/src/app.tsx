import React from "react";

import { Reactor, NotificationArea } from "@poshplum/poshplum";
import { useState } from "preact/hooks";
import "./app.css";
import { ChatApp } from "./ChatApp";

const Communicator = ChatApp as React.Component

@Reactor
export class App extends React.Component {
    hasNotifications = true
    render() {
    return (
        <>
            <NotificationArea name="root"/>
            <div className="float-left">
                <img
                    src="/cad-logo.webp"
                    className="logo"
                    alt="Cardano After Dark logo"
                    style={{ borderRadius: "4em", height: "20em" }}
                />
            </div>
            <p
                style={{ marginTop: "-4rem", fontSize: "75%" }}
                className="read-the-docs"
            >
                presents
            </p>
            <h1 style={{
                marginTop: "0.2em",
                fontFamily: "'Oswald', sans-serif",
            }}>DRED</h1>
            <p style={{
                marginTop: "-2em", 
                marginBottom: "1.66em",
                fontFamily: "'Encode Sans', sans-serif",
                    // fontFamily: "'Goldman', cursive;"
                }}>
                Realtime decentralized event-messaging platform for web3
                dapps
            </p>
            <Communicator />
        </>
    );
    } }
