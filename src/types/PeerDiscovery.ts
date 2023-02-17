import { connnectionSettings, DredHostDetails } from "./DredHosts.js";
import { Discovery } from "./Discovery.js";

// export type unusedPeerSettings = {
//     hostName: String;
//     port: Number;
//     ssl: Boolean;
//     publicKey: String;
// };
// export abstract class unusedPeer<PEER_CONNECTION> {
//     //! EXPECTS subclass to implement an async connect() method to connect to the indicated peer

//     //! allows a subclass to have additional needed settings, and to use them in its connect()

//     abstract connect(): Promise<PEER_CONNECTION>;
//     abstract get isConnecting(): false | Promise<PEER_CONNECTION>;
//     abstract get isConnected(): Boolean;

//     constructor(protected settings: PeerSettings) {}
//     eq(p: Peer<PEER_CONNECTION>) {
//         return (
//             p.settings.hostName == this.settings.hostName &&
//             p.settings.port == this.settings.port &&
//             p.settings.publicKey == this.settings.publicKey
//         );
//     }
// }

export type ConnectionManagerOptions = {
    discovery: Discovery;
    waitFor: ThresholdChoice,
    connectionSettings: Partial<connnectionSettings>
};

export type PromisedHostDetails = Promise<DredHostDetails[]>;


export type ConnectionThresholds = {
    minimal: Number;
    healthy: Number;
};
export type ThresholdChoice = keyof ConnectionThresholds

export type ConnectionState =
    | "pending"
    | "discovering"
    | "connecting"
    | "minimally connected"
    | "degraded"
    | "connected"
    | "disconnected"
    | "refreshing";
