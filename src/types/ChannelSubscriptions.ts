import type { DredMessage, DredMessageListener, FullDredMessage } from "../client/DredClient.js";
import type { ConnectionEvent } from "../client/HostConnection.js";
import type { Logger } from "./Logger.js";

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

export const nbhChannelListChannel = "_chans";
export const nbhAuthInfoChannel = "_auth";

/**
 * @public
 */
export type SubscriptionList = ChannelSubOptions[];
/**
 * @public
 */
export type FullSubscriptionListenerMap = Record<string, ChannelSubscriptionListener>;

/**
 * @public
 */
export interface ChannelSubEvents {
    activity: [DredChannelMessage];
    "channel:message": [DredChannelMessage];
}
export type NamedListeners = Record<string, DredMessageListener>;
export type SimpleChannelsListeners = NamedListeners | SimpleMappedListeners | SimpleMassListener;

export type SimpleMappedListeners = {
    type: "mapped";
    subs: NamedListeners;
};

export type SimpleMassListener = {
    type: "mass";
    channels: ChanId[];
    massHandler: DredMessageListener;
};

export type FullMassListener = Omit<SimpleMassListener, "massHandler"> & {
    subs: FullSubscriptionListenerMap;
    massHandler: ChannelSubscriptionListener;
};
export type FullMappedListeners = {
    type: "mapped";
    subs: FullSubscriptionListenerMap;
};

export type FullChannelsListeners = FullMassListener | FullMappedListeners;

/**
 * @public
 */
export function expandChannelListeners(listeners: FullChannelsListeners) {
    return listeners.type === "mass"
        ? [...listeners.channels, nbhChannelListChannel, nbhAuthInfoChannel]
        : listeners.subs
          ? Object.keys(listeners.subs)
          : [];
}


/**
 * Represents a configuration for monitoring a specific channel
 * @remarks
 * It includes alt-values for optional attributes for developers to easily see
 * the default behavior if the attribute is omitted
 * @public
 */
export interface ChannelSubOptions {
    neighborhood: NbhId;
    channel: ChanId;
    unconfirmed?: true | "default:only confirmed messages";
    summary?: true | "default:include message details";
    interval?: number | "default:notify in realtime";
    onlyFields?: string[] | "default:include all fields in details";
    filter?: {
        //! todo: allows messages to be filtered on field attributes with $gt, $gte, $lt, $lte, $in, $nin.
    };
}

type DredMsgData = string;
/**
 * @public
 */
export type DredChannelMessage = ConnectionEvent & {
    message: "msg received in chan";
    neighborhood: NbhId;
    channel: ChanId;
    msg: DredMsgData;
    details: any;
    mid: MsgId;
    ts: Date;
    replFrom?: string;
    replAt?: number;
    origSrvId?: string;
    origMsgId?: string;
};

/**
 * @public
 */
export class ChannelSubscriptionListener {
    // allows a message to be deduplicated within 60 seconds
    static rotationIntervalMs = 30 * 1000;

    options: ChannelSubOptions;
    olderMsgs!: Set<MsgId>;
    recentMsgs!: Set<MsgId>;
    rotateTime: number;

    listener!: DredMessageListener;
    // XXevents: EventEmitter<ChannelSubEvents>;
    constructor(
        options: ChannelSubOptions & {
            listener: DredMessageListener;
            logger: Logger;
        },
    ) {
        const { listener, logger, ...rest } = options;
        this.options = rest;

        //! it tracks recent messages to prevent duplicate notifications
        this.recentMsgs = new Set<MsgId>();
        //! it prevents unbounded growth of the tracking data structure
        this.olderMsgs = new Set<MsgId>();
        this.rotateTime = Date.now();

        this.listener = listener;
        // this.events = new EventEmitter<ChannelSubEvents>();
    }

    hasSeen(originalClientId?: string, msgId?: string) {
        const now = Date.now();
        if (now - this.rotateTime > ChannelSubscriptionListener.rotationIntervalMs) {
            this.olderMsgs = this.recentMsgs;
            this.recentMsgs = new Set<MsgId>();
            this.rotateTime = now;
        }
        if (originalClientId) {
            if (this.recentMsgs.has(originalClientId)) return true;
            if (this.olderMsgs.has(originalClientId)) return true;
        }
        if (msgId) {
            if (this.recentMsgs.has(msgId)) return true;
            if (this.olderMsgs.has(msgId)) return true;
        }
        return false;
    }

    notify(event: FullDredMessage) {
        const {
            mid: msgId,
            ocid: originalClientId,
            connection,
            message: message,
            details,
            neighborhood,
            channel,
        } = event;

        if (this.hasSeen(originalClientId, msgId)) return;

        const seen = this.recentMsgs;
        if (!seen.has(originalClientId!) && !seen.has(msgId)) {
            seen.add(msgId);
            this.listener(event);
        }
    }
}
