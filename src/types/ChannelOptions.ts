import { ChannelMember } from "src/types/ChannelMember";

export type ChannelOptions = {
    encrypted?: boolean;
    owner?: ChannelMember;
    members?: Array<ChannelMember>;

    //! it can allow members to (request) joining the channel
    allowJoining?: boolean;

    //! it can require join-requests to be approved by channel-owner or by any other member
    approveJoins?: "owner" | "member";

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
