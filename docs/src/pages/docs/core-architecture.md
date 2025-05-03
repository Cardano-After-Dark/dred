# Dred Core Architecture

This document provides a comprehensive overview of the Dred network architecture, highlighting the key components, their interactions, and the underlying blockchain integration that enables a decentralized real-time communication network.

## System Overview

Dred is a decentralized real-time messaging system that provides shared communication channels for dApps. The architecture consists of several key components:

1. **Node Network** - A distributed network of server nodes that relay messages between clients
2. **On-chain Registry** - Blockchain-based registry for node discovery and authentication
3. **Client Library** - JavaScript/TypeScript library for applications to connect to the network
4. **Neighborhood Groups** - Application-specific clusters of nodes

## On-Chain Components

The blockchain layer provides the trust and discovery mechanisms for the Dred network.

### DredCapo

The `DredCapo` class serves as the central coordination point for all on-chain operations, managing access to controllers and validators:

```typescript
class DredCapo extends Capo<DredCapo, DredCapoFeatures> {
    // Access to node registry operations
    async getNodeRegistryController(): Promise<NodeRegistryController>;
    
    // Access to neighborhood registry
    async getNbhRegistryController(): Promise<NeighborhoodController>;
    
    // Find current protocol settings
    async findSettingsInfo(options): Promise<FoundDatumUtxo<ErgoProtocolSettings>>;
    
    // Node discovery methods
    async findNodeOpEntries();
    async findNbhRegistryEntries();
}
```

The DredCapo provides a unified interface for interacting with the various on-chain registries and controllers.

### Node Registry

The Node Registry is responsible for managing the registration and discovery of Dred nodes:

```typescript
interface NodeRegistrationData {
    id: number[]                // Unique identifier for the node
    type: string                // Type descriptor ("dredNode")
    memberToken: string         // Token identifying the node operator
    nodeAddress: string         // Server hostname or IP address
    nodePort: bigint            // Port where the Dred server listens
    nodePublicKey: PubKey       // Public key for node identity verification
    lastHeartbeat: number       // Timestamp of last activity
}
```

The `NodeRegistryController` provides methods for creating and updating node registrations:

```typescript
class NodeRegistryController extends DelegatedDataContract<...> {
    // Create a new node registration
    async mkTxnRegisteringNode(nodeReg: minimalNodeRegistrationData): Promise<...>;
    
    // Update an existing node registration
    async mkTxnUpdatingNodeRegistration(txnName, item, options, tcx): Promise<...>;
}
```

### Protocol Settings

The network operates according to protocol settings that define requirements for nodes and neighborhoods:

```typescript
interface NodeOperatorSettings {
    expectedHeartbeatInterval: bigint  // Expected frequency of heartbeats
    requiredNodeUptime: bigint         // Minimum uptime requirement (e.g., 0.95)
    minNodeRegistrationFee: bigint     // Minimum fee for registration
    minNodeOperatorStake: Value        // Minimum stake required for operators
}
```

## Off-Chain Components

The off-chain components handle the actual message processing and real-time communication.

### DredServer

The `DredServer` class implements the server-side functionality:

```typescript
class DredServer {
    // HTTP API for client connections
    api: express.Application;
    
    // Redis for message storage and pub/sub
    redis: Redis;
    
    // Message channel management
    channelConn: RedisChannels;
    
    // Listen to messages from other nodes in the neighborhood
    async listenToNeighborhood();
    
    // Create new communication channels
    createChannel(...args);
    
    // Join existing channels
    joinInChannel(...args);
    
    // Post and relay messages
    postMessageInChannel(...args);
}
```

### DredClient

The `DredClient` class provides the client interface for applications:

```typescript
class DredClient extends StateMachine {
    // Connect to the network
    async connect();
    
    // Create and join channels
    async createChannel(options);
    async joinChannel(channelName);
    
    // Send messages
    async postMessage(channelName, message);
    
    // Subscribe to updates
    subscribe(channelName, listener);
}
```

### Connection Management

The `ConnectionManager` handles the connections to multiple nodes for redundancy:

```typescript
class ConnectionManager {
    // Manage connections to multiple nodes
    connections: Map<string, HostConnection>;
    
    // Handle events for connection status changes
    events: EventEmitter<ManagerEvents>;
    
    // Control connection thresholds
    thresholds: ConnectionThresholds;
}
```

## Neighborhood System

The neighborhood system organizes nodes by application:

```typescript
class NeighborhoodController {
    // Register a new application neighborhood
    async mkTxnRegisteringNeighborhood(data);
    
    // Update neighborhood data
    async mkTxnUpdatingNeighborhood(data);
}
```

Neighborhoods allow nodes to specialize in serving specific applications and provide a natural scaling mechanism for the network.

## Message Protocol

The message protocol is designed for simplicity and flexibility:

1. **HTTP Transport** - Uses standard HTTP/2 and HTTP/3 with chunked responses for server-to-client streaming
2. **JSON Messages** - Simple JSON structure for message content
3. **Encrypted Payloads** - Optional message encryption for end-to-end security
4. **Unique Message IDs** - Every message has a unique identifier to prevent duplication
5. **Relay System** - Smart relay system to ensure efficient message propagation

```typescript
interface DredMessage {
    type: string;           // Message type identifier
    msg: any;               // Message content
    ocid?: string;          // Optional client-generated ID
}
```

## Relay Protocol

The relay protocol ensures message delivery across the network:

1. Nodes receive messages from clients or other nodes
2. Each node maintains a list of recently seen message IDs
3. When a new message arrives, the node forwards it to other nodes that haven't seen it
4. Nodes acknowledge receipt to prevent unnecessary retransmission
5. The protocol minimizes redundant message transmission while maximizing delivery reliability

## Security Model

The security model is built on several mechanisms:

1. **On-chain Registration** - Nodes register on the blockchain with stake and public key
2. **Public Key Authentication** - Nodes authenticate using their registered public keys
3. **Encrypted Payloads** - Application-level messages can be encrypted end-to-end
4. **Heartbeat Verification** - Nodes must regularly update their heartbeat to remain active
5. **Staking Requirements** - Operators must stake tokens to participate, creating economic incentive

## Integration Flow

Applications integrate with Dred through this flow:

1. Include the `dred-client` library
2. Initialize `DredClient` with the appropriate neighborhood ID
3. Connect to the network (`await dred.connect()`)
4. Create or join channels (`await dred.joinChannel('my-channel')`)
5. Subscribe to messages (`dred.subscribe('my-channel', handleMessage)`)
6. Send messages (`await dred.postMessage('my-channel', { type: 'chat', msg: 'Hello' })`)

## Performance Characteristics

The distributed nature of Dred provides several performance advantages:

1. **Reduced Latency** - Multiple path options for message delivery
2. **High Redundancy** - Multiple nodes ensure message delivery
3. **Scalability** - Horizontal scaling through neighborhoods
4. **Fault Tolerance** - The network continues to function even if some nodes fail

## Future Extensions

Several extensions are planned or in development:

1. **Enhanced Node Metrics** - Performance tracking and reputation systems
2. **Advanced Economic Models** - Token incentives for node operators
3. **Cross-Chain Capabilities** - Support for multiple blockchain backends
4. **Persistent Message Channels** - Long-term storage options for messages
5. **Advanced Authentication** - More sophisticated identity and permission systems

## Deployment Considerations

When deploying Dred nodes, operators should consider:

1. **Hardware Requirements** - Sufficient CPU, memory, and bandwidth
2. **Redis Optimization** - Tuning Redis for message throughput
3. **Network Configuration** - Proper firewall rules and DNS setup
4. **Monitoring** - Setting up alerting for node health
5. **Backup Systems** - Redundancy planning for high availability

## Developer Resources

For developers building on Dred:

1. **Client Library** - The `dred-client` npm package provides the primary interface
2. **API Reference** - Complete documentation of client and server APIs
3. **Example Applications** - Sample code showing common integration patterns
4. **Testing Tools** - Utilities for testing Dred integrations
5. **Local Development** - Instructions for running a local development network

## Conclusion

The Dred architecture provides a robust foundation for decentralized real-time communication, combining blockchain-based trust with efficient messaging protocols. By leveraging both on-chain and off-chain components, Dred offers a unique solution that maintains decentralization while delivering the performance needed for real-time applications. 