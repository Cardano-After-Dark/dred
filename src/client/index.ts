import type { FullDredMessage } from "./DredClient.js";

export { DredClient } from "./DredClient.js";
export type {
    ClientState,
    DredMessageListener,
    SubscriberMap,
    EncryptedDredMessage,
    DredClientArgs,
    ClientEvents,
    eventHasChannels,
    eventChannelInfo,
    FullDredMessage,
} from "./DredClient.js";
export { StaticHostDiscovery } from "../peers/StaticHostDiscovery.js";
export { NeighborhoodDiscovery } from "../peers/NeighborhoodDiscovery.js";
export type { DredEvent, DredError } from "../types/DredEvents.js";
export type { ChanId, NbhId, MsgId, DredChannelMessage, DredMessage } from "../types/ChannelSubscriptions.js";
// export { StateChannel, type ChannelState, hasStateChannel } from "./StateChannel";

