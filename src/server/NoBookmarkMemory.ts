import type { BookmarkStorage, ChanId } from "../types/ChannelSubscriptions.js";


export class NoBookmarkMemory implements BookmarkStorage {
    async getBookmark(channel: ChanId): Promise<string> {
        return "0";
    }
 
    async setBookmark(channel: ChanId, bookmark: string): Promise<void> {
    }
}