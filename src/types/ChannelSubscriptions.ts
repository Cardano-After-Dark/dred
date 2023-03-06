import type { DredMessageListener } from "../client/DredClient.js";
import type { ConnectionEvent } from "../client/HostConnection.js";

export type ChanId = string;
export type MsgId = string;
export type NbhId = string;

export type SubscriptionList = ChannelSubOptions[]
export type SubscriptionListenerMap = Record<string, ChannelSubscriptionListener>

export interface ChannelSubEvents {
    activity: [DredChannelMessage]
    "channel:message": [DredChannelMessage]
}

//! represents a configuration for monitoring a specific channel
//! it includes alt-values for optional attributes for developers to easily see 
//  the default behavior if the attribute is omitted
export interface ChannelSubOptions {
    neighborhood: NbhId,
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

export class ChannelSubscriptionListener {
    options: ChannelSubOptions;
    recentMsgs!: Set<MsgId>;
    listener!: DredMessageListener;
    // XXevents: EventEmitter<ChannelSubEvents>;
    constructor(options: ChannelSubOptions & { listener: DredMessageListener}) {
        const {listener, ...rest} = options;
        this.options = rest;
        //! it has a recent-messages map, not included in a JSON representation of the subscription

        this.recentMsgs = new Set<MsgId>();
        this.listener = listener;
        // this.events = new EventEmitter<ChannelSubEvents>();
     }

}
