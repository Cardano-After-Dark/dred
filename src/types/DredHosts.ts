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
    connectionWaitTimeMs: number
};