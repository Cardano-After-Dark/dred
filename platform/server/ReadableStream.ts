import { ReadableStream } from "node:stream/web";
import { nodeToWebStream } from "./readable-stream-node-to-web";

export default ReadableStream;
export function fromPlatformFetchBody(b) {
    return nodeToWebStream(b);
}
