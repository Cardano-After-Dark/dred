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
    maxRetries: number;
    retryBaseIntervalMs: number;
    retryMaxIntervalMs: number;
    connectionWaitTimeMs: number
};