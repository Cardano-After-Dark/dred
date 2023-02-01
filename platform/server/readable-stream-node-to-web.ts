//! see ./ReadableStream.ts

// !!! compare to
//  https://raw.githubusercontent.com/xuset/readable-stream-node-to-web/master/index.js

import { ReadableStream } from "node:stream/web";

//! converts a nodejs Readable Stream as returned by `node-fetch` and `cross-fetch`
//  ... into a web-readable-stream "node:stream/web"
export function nodeToWebStream(nodeStream) {
    // Assumes the nodeStream has not ended/closed
    var destroyed = false;
    var listeners = {};

    function start(controller) {
        listeners["data"] = onData;
        listeners["end"] = onData; // wtf no-op, see next line
        listeners["end"] = onDestroy;
        listeners["close"] = onDestroy;
        listeners["error"] = onDestroy;
        for (var name in listeners) nodeStream.on(name, listeners[name]);

        nodeStream.pause();

        function onData(chunk) {
            if (destroyed) return;
            controller.enqueue(chunk);
            nodeStream.pause();
        }

        function onDestroy(err) {
            if (destroyed) return;
            destroyed = true;

            for (var name in listeners)
                nodeStream.removeListener(name, listeners[name]);

            if (err) controller.error(err);
            else controller.close();
        }
    }

    function pull() {
        if (destroyed) return;
        nodeStream.resume();
    }

    function cancel() {
        destroyed = true;

        for (var name in listeners)
            nodeStream.removeListener(name, listeners[name]);

        nodeStream.push(null);
        nodeStream.pause();
        if (nodeStream.destroy) nodeStream.destroy();
        else if (nodeStream.close) nodeStream.close();
    }

    return new ReadableStream({ start: start, pull: pull, cancel: cancel });
}
