import { ChannelMember } from "./ChannelMember";

export type ClientChannelState = {
    options: ChannelOptions;
    bookmark: { a: string, c: string }; // last known position in admin, content channels

}

export type ChannelOptions = {
    channelId: string;

    encrypted?: boolean;
    owner?: ChannelMember;
    members?: Array<ChannelMember>;
    requests?: Array<ChannelMember>;

    //! it can allow members to (request) joining the channel
    allowJoining?: boolean;

    //! it can require join-requests to be approved by channel-owner or by any other member
    approveJoins?: "owner" | "member" | "open";

    //! it can limit members to a maximum count
    memberLimit?: number;

    //! it has a created timestamp, provided by the server
    createdAt?: Date;

    //! it can have a channel-expiration timestamp
    expiresAt?: Date;

    //! it can expire messages after a number of milliseconds
    messageLifetime?: number;
    signature?: string;
};
