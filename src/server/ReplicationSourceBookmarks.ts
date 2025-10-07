import type { BookmarkStorage, ChanId } from "../types/ChannelSubscriptions.js";
import { Redis, type RedisOptions } from "ioredis";

import { RedisHash, StringValueAdapter } from "../redis/RedisHash.js";

export class ReplicationSourceBookmarks implements BookmarkStorage {
    redis: Redis;
    localServerId: string;
    remoteServerId: string;
    channelBookmarks: RedisHash<ChanId, string>;

    constructor(localServerId: string, remoteServerId: string, connection: Redis) {
        this.redis = connection;
        this.localServerId = localServerId;
        this.remoteServerId = remoteServerId;
        this.channelBookmarks = new RedisHash(
            this.redis, 
            `bookmarks:repl<${this.localServerId}>-at-${this.remoteServerId}-#`, 
            StringValueAdapter
        );
    }

    async getBookmark(channel: ChanId): Promise<string> {
        const result = await this.channelBookmarks.get(channel)
        if (!result) {
            return "0";
        }
        return result;
    }
 
    async setBookmark(channel: ChanId, bookmark: string): Promise<void> {
        return this.channelBookmarks.set(channel, bookmark).then(() => {});
    }
}