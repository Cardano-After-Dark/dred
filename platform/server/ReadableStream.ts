import { ReadableStream as platformReadableStream } from "node:stream/web";
import { nodeToWebStream } from "./readable-stream-node-to-web";

//! purpose: allows server-side code to handle fetch() responses with a streaming
//   interface matching the browser's ReadableStream standard, so that browser- 
//   and server-side code can uniformly use that single (better) interface.

export const ReadableStream = platformReadableStream
export default ReadableStream;
export function fromPlatformFetchBody(b) {
    return nodeToWebStream(b);
}
