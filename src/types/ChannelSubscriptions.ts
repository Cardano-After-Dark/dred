import type { DredMessageListener, FullDredMessage } from "../client/DredClient.js";
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
export type SubscriptionList = ChannelSubConfig[];
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

export type MessageListenerWithOptions = {
    options: ChannelSubOptions;
    listener: DredMessageListener;
}

export type SimpleDredMessageListener = DredMessageListener | MessageListenerWithOptions;

export type NamedListeners = Record<string, SimpleDredMessageListener>;
export type SimpleChannelsListeners = NamedListeners | SimpleMappedListeners | SimpleMassListener;

export type SimpleMappedListeners = {
    type: "mapped";
    subs: NamedListeners;
};

export type SimpleMassListener = {
    type: "mass";
    channels: ChanId[];
    massHandler: SimpleDredMessageListener;
};

export type FullMassListener = Omit<SimpleMassListener, "massHandler"> & {
    subs: FullSubscriptionListenerMap;
    massHandler: ChannelSubscriptionListener;
    bookmarks: Record<ChanId, string>;
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
 * @public
 */
export interface BookmarkStorage {
    getBookmark(channel: ChanId): Promise<string>;
    setBookmark(channel: ChanId, bookmark: string): Promise<void>;
}

/**
 * Represents a configuration for monitoring a specific channel
 * @remarks
 * It includes alt-values for optional attributes for developers to easily see
 * the default behavior if the attribute is omitted
 * @public
 */
export interface ChannelSubConfig {
    // neighborhood: NbhId;
    channel: ChanId;
    options: ChannelSubOptions
}

export const defaultMaxDelayMs = 0 as const

export type ChannelSubOptions = {
    /**
     * Indicates the starting point for the subscription.  Use 0 for the beginning of the stream,
     * use "$" for the end of the stream, or the ocid of a previous known message.
     * @remarks
     * default: start from the end of the stream
     */
    bookmark?: string// | "default:start from the beginning of the stream";
    /**
     * Not yet implemented
     * @deprecated Not yet implemented
     */
    filter?: {
        //! todo: allows messages to be filtered on field attributes with $gt, $gte, $lt, $lte, $in, $nin.
    };
    /**
     * Indicates a buffering interval for high-volume delivery of small events to the client.
     * @remarks
     * The server will buffer new messages for the given interval, and send all buffered
     * messages at that time.  This prevents network congestion by enabling many small 
     * messages to be sent as a single packet, instead of flushing many small packets.
     * 
     * Note: when most messages will compress to larger than 1500 bytes, it's better to use 
     * zero latency.
     * 
     * default latency: 0ms or by channel configuration
     */
    maxLatency?: number
    // unconfirmed?: true | "default:only confirmed messages";
    // summary?: true | "default:include message details";
    // onlyFields?: string[] | "default:include all fields in details";
}

/**
 * @public
 */
export type DredMessage = {
    type: string;
    msg: string;
    "content-type"?: string;
    ocid?: string;
    encryptedMsg?: string;
    // [key: string]: string | undefined,
};

type DredMsgData = string;
/**
 * @public
 */
export type DredChannelMessage = ConnectionEvent & ReplicatedMessage & {
    message: "msg received in chan";
    neighborhood: NbhId;
    channel: ChanId;
    msg: DredMsgData;
    details: any;
    mid: MsgId;
    ts: Date;
}

export type ReplicatedMessage = {
    replFrom?: string;
    replAt?: number;
    //! only set on multi-hop replication (origSrvId !== replFrom); on single-hop the
    //! original server is implied by replFrom, so this field is omitted.
    origSrvId?: string;
};


/**
 * @public
 */
export class ChannelSubscriptionListener {
    // allows a message to be deduplicated within 60 seconds
    static rotationIntervalMs = 30 * 1000;

    config: ChannelSubConfig;
    options: ChannelSubOptions;
    logger: Logger;
    olderMsgs!: Set<MsgId>;
    recentMsgs!: Set<MsgId>;
    lastRotated: number;

    listener!: DredMessageListener;
    // XXevents: EventEmitter<ChannelSubEvents>;
    constructor(
        config: ChannelSubConfig & {
            listener: DredMessageListener;
            logger: Logger;
        },
    ) {
        const { listener, logger, ...rest } = config;
        this.config = rest;
        this.options = rest.options;
        this.logger = logger;

        //! it tracks recent messages to prevent duplicate notifications
        this.recentMsgs = new Set<MsgId>();

        //! it prevents unbounded growth of the tracking data structure
        this.olderMsgs = new Set<MsgId>();
        this.lastRotated = Date.now();

        this.listener = listener;
        // this.events = new EventEmitter<ChannelSubEvents>();
    }

    hasSeen(originalClientId?: string, msgId?: string) {
        const now = Date.now();
        if (now - this.lastRotated > ChannelSubscriptionListener.rotationIntervalMs) {
            this.olderMsgs = this.recentMsgs;
            this.recentMsgs = new Set<MsgId>();
            this.lastRotated = now;
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

        if (this.hasSeen(originalClientId)) {
            this.logger.trace("already seen: %s", originalClientId);
            return;
        }
        if (this.hasSeen(msgId)) {
            this.logger.error("already seen messageId: %s", msgId);
            return;
        }

        const seen = this.recentMsgs;
        if (!seen.has(originalClientId!) && !seen.has(msgId)) {
            seen.add(msgId);
            this.logger.trace("msg %s", originalClientId);
            this.listener(event);
        }
    }
}
