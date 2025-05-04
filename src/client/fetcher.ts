import fetch from "cross-fetch";
import { DredHostDetails } from "../types/DredHosts";

export interface fetchOptions extends RequestInit {
    host: DredHostDetails;
    parse?: boolean;
    debug?: boolean;
}

export async function fetcher(path: string, options: fetchOptions) {
    const { host, debug = false, parse = true, ...reqInit } = options;
    if (path[0] !== "/") path = `/${path}`;

    const proto = host.insecure ? "http" : "https";
    const shortServer = `${host.address}:${host.port}`;
    const url = `${proto}://${shortServer}${path}`;
    // console.warn(`+fetch`, options.method, shortServer, path)

    const result = await fetch(url, reqInit);
    if (debug) debugger;

    //! successful requests are directly resolved to the parsed json ...
    //   ...unless parse:false is provided; this allows the response to be hooked up
    //   to a streaming reader or take other treatment provided by the caller.
    if (result.ok) {
        if (!parse) return result;
        return result.json();
    }

    //! failed requests @request or parsing level cause a rejection.
    // let reason : string | Error;
    const reason = await result.json().catch((r) => {
        return new Error(`${result.status} ${result.statusText} for ${path}`);
    });

    if (!(reason instanceof Error)) {
        const t = new Error(`${result.status} ${result.statusText} for ${path}`);
        t.cause = result;
        throw t
    }

    throw reason
}
