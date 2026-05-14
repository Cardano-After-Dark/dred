export interface DredHostDetails {
    serverId: string;
    address: any;
    port: any;
    insecure?: boolean;
    family?: any;
    publicKey?: string;
    pubKeyHash?: string;
}

export type connnectionSettings = {
    watchChannels: boolean;
    maxRetries: number;
    retryBaseIntervalMs: number;
    retryMaxIntervalMs: number;
    connectionWaitTimeMs: number;
    //! per-attempt fetch timeout — bounds how long a single connect attempt
    //  waits for stream headers before aborting and entering the retry loop.
    //  Without this, undici's 2-minute default applies: a peer that's down
    //  (or behind a non-routing nebula link) wastes 2m per attempt before
    //  the retry/backoff machinery even gets a chance to run.
    connectAttemptTimeoutMs: number;
};