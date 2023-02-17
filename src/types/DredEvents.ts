import { EventEmitter } from "eventemitter3";
import { Newable } from "ts-essentials";

// import { MarkRequired } from "ts-essentials";


//! it makes these available for in-package development,
//  but they're not really intended to be used by external developers,
//  so we hide them behind symbols.  String keys are fair game for externals
export const eventMeaning = Symbol("?meaning?");
export const devMessage = Symbol("?developer?");
// export const emitterHelp = Symbol("?emitter?");

export type stringMap<T> = Record<string, T>
export type HelpText = stringMap<string>
export interface DredEvent {
    //! it does not necessarily represent in-channel message events,
    //   but can indicate operational events occuring before or outside the scope of a channel 

    //! it uses a 'message' field, so is usable for errors as well as for non-errors.
    //   the message field should generally be useful for onscreen messaging
    message: string;

    //! it uses an optional 'recommendation' field, whose content SHOULD be used
    //   to advise the user on a way they can proceed.  
    recommendation?: string;

    //! it uses alt-message fields containing alternative messages that may be used
    //   in applications that have special realtime- or security-focused expectations.
    altMessageRealtime?: string;
    altMessageSecurity?: string;

    //! it uses a development-only message, adding contextual information for
    //  developers to use for interpretation or guidance around the event.  It is
    //  structured as a symbol so that the information is easy to see but difficult
    //  to re-present to end users.
    [devMessage]: string | string[];

    //! it allows additional untyped entries
    // [key: string]: any;
    // [emitterHelp]: Record<string, string>;
}



export interface DredError extends DredEvent {
    reason: string | Error
    [key: string]: any;
}

// export type DredEventArg = Omit<DredEvent, typeof emitterHelp>

// EventEmitter has type-safety conventions for emit() and on().
//    examples:
// type things = {
//     thing1: (d: DredEvent<any>) => void;
//     thing2: (d: DredEvent<any>) => void;
// }
// type EE = EventEmitter<things>;
// const t : EE = new EventEmitter();
// t.emit("thing3")
// t.on("thing2", (d) => {
//     d[devMessage]
// })

export type DredNotificationStruct = Record<string, Function | any>;
export type DredEventPlus<moreFields> = {
    [key in keyof DredEvent]: DredEvent[key];
} & {
    [key in keyof moreFields]: moreFields[key];
};

export type EventHelpAllowedEvents<EH extends EmitterDef> = keyof EH["help"];
export interface EmitterDef {
    _info: string;
    help: HelpText //!!!!!! remove 
    handlers?: DredNotificationStruct;
}
type test = [DredEvent] extends any[] ? "yes" : never
type singleRequiredEvent = [DredEvent];
{
    //! it only allows a single item, but still matches array 'any[]'
    const check: singleRequiredEvent extends any[] ? "good" : never = "good";
}

type DredNotifierFunc = (...e: singleRequiredEvent) => void;

// type selfDoc = {
//     __note: "the default handler for Dred types receives a DredEvent object, and all you need to do is include a help string.",
//     __override: "... if desired, customize the data-types for args to notifications in emit() and on(... handler(...args)), by adding your handler-type here",
// }

//! it provides a type facade to describe available events
export interface hasEvents<ha extends Record<string, Function>> {
    [key: string]: // selfDoc extends {key : string] ? selfDoc[key] :
    ha extends { key: infer HT } ? HT : never;
}
