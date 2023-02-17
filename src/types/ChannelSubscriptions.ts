import {EventEmitter} from "eventemitter3";
import { ConnectionEvent } from "../client/HostConnection.js";
import { HostConnection } from "../client/HostConnection.js";

export type ChanId = string;
export type MsgId = string;
export type NbhId = string;

export type SubscriptionSet = Map<ChanId, ChannelSubscription>

export interface ChannelSubEvents {
    activity: [DredChannelMessage]
    "channel:message": [DredChannelMessage]
}

//! represents a configuration for monitoring a specific channel
export interface ChannelSubOptions {
    neighborhood: NbhId
    channel: ChanId
    unconfirmed?: true 
        | "default:only confirmed messages"
    summary?: true 
        | "default:include message details"
    interval?: number 
        | "default:notify in realtime"
    onlyFields?: string[] 
        | "default:include all fields in details"
    filter?: {
        //! todo: allows messages to be filtered on field attributes with $gt, $gte, $lt, $lte, $in, $nin.
    }
}

//! it includes alt-values for optional attributes for developers to easily see 
//  the default behavior if the attribute is omitted
export type ChannelSubs = Array<ChannelSubscription>

type DredMsgData = any;
export type DredChannelMessage = ConnectionEvent &  {
    message: "msg received in chan"
    neighborhood: NbhId,
    channel: ChanId,
    msg: DredMsgData,
    details: any,
    mid: MsgId,
    ts: Date,
}

export class ChannelSubscription {
    options: ChannelSubOptions
    recentMsgs: Set<MsgId>;
    events: EventEmitter<ChannelSubEvents>;
    constructor(options: ChannelSubOptions) {
        this.options = options
        this.recentMsgs = new Set<MsgId>();
        this.events = new EventEmitter<ChannelSubEvents>();
     }

}
