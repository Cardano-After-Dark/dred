export type PeerSettings = {
    hostName: String;
    port: Number;
    ssl: Boolean;
    publicKey: String;
};
export abstract class Peer<PEER_CONNECTION> {
    //! EXPECTS subclass to implement an async connect() method to connect to the indicated peer

    //! allows a subclass to have additional needed settings, and to use them in its connect()

    abstract connect(): Promise<PEER_CONNECTION>;
    abstract get isConnecting(): false | Promise<PEER_CONNECTION>;
    abstract get isConnected(): Boolean;

    constructor(protected settings: PeerSettings) {}
    eq(p: Peer<PEER_CONNECTION>) {
        return (
            p.settings.hostName == this.settings.hostName &&
            p.settings.port == this.settings.port &&
            p.settings.publicKey == this.settings.publicKey
        );
    }
}

export type PeerDiscoveryOptions = {
    neighborhood: String;
    serviceName: String;
    discoveryRoots: String[];
};

export type Peers<T> = Peer<T>[];
export type PromisedPeers<T> = Promise<Peers<T>>;

export type ThresholdChoice = "minimal" | "healthy";

export type ConnectionThresholds = {
    minimal: Number;
    healthy: Number;
};

export type ConnectionState =
    | "pending"
    | "discovering"
    | "connecting"
    | "disconnected"
    | "underconnected"
    | "minimally connected"
    | "connected"
    | "refreshing";
