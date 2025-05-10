import { ReadableStream as platformReadableStream } from "node:stream/web";
import { nodeToWebStream } from "./readable-stream-node-to-web.js";
import { Readable } from "node:stream";

//! purpose: allows server-side code to handle fetch() responses with a streaming
//   interface matching the browser's ReadableStream standard, so that browser- 
//   and server-side code can uniformly use that single (better) interface.

// Supports older nodejs versions via node-fetch and an adapter in nodeToWebStream().

// Supports newer versions via their web-api-compliant fetch() 
//   .., and native web-compliant ReadableStream, which doesn't need adapting.

export const ReadableStream = platformReadableStream
export default ReadableStream;
export function fromPlatformFetchBody(b) {
    // Readable is the old-style nodejs readable stream.
    if (b instanceof Readable) return nodeToWebStream(b);

    // modern web stream from native fetch doesn't need conversion:
    return b
}
