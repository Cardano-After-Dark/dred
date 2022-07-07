import { ReadableWebToNodeStream } from "readable-web-to-node-stream";

export async function webToNodeStream(url: RequestInfo | URL) {
    const response: Response = await fetch(url);
    return new ReadableWebToNodeStream(response.body!);
}
