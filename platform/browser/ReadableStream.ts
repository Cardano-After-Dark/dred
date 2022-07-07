const ReadableStream = (self || window).ReadableStream;
import { webToNodeStream } from "./readable-stream-web-to-node";
export default ReadableStream;
export function fromPlatformFetchBody(url) {
    return webToNodeStream(url);
}
