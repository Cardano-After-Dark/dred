import type { DredMessage, DredMessageListener } from "../client/DredClient.js";
import type { ConnectionEvent } from "../client/HostConnection.js";

/**
 * @public
 */
export type ChanId = string;
/**
 * @public
 */
export type MsgId = string;
/**
 * @public
 */
export type NbhId = string;

/**
 * @public
 */
export type SubscriptionList = ChannelSubOptions[]
/**
 * @public
 */
export type SubscriptionListenerMap = Record<string, ChannelSubscriptionListener>

/**
 * @public
 */
export interface ChannelSubEvents {
    activity: [DredChannelMessage]
    "channel:message": [DredChannelMessage]
}

/**
 * Represents a configuration for monitoring a specific channel
 * @remarks
 * It includes alt-values for optional attributes for developers to easily see 
 * the default behavior if the attribute is omitted
 * @public
 */
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


type DredMsgData = string;
/**
 * @public
 */
export type DredChannelMessage = ConnectionEvent &  {
    message: "msg received in chan"
    neighborhood: NbhId,
    channel: ChanId,
    msg: DredMsgData,
    details: any,
    mid: MsgId,
    ts: Date,
}

/**
 * @public
 */
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

     notify(event : ConnectionEvent & DredChannelMessage & DredMessage) {
        const { mid: msgId, ocid: originalClientId, connection, message: message, details, neighborhood, channel } = event;

        const seen = this.recentMsgs;
        if (!seen.has(originalClientId!) && !seen.has(msgId)) {
            seen.add(msgId);
            this.listener(event);
                    // sub.events.emit("channel:message", event);
        }
     }

}
