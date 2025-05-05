# Dred Server Message Replication

## Overview

This document describes the implementation of message replication functionality for the Dred server. The replication feature ensures that messages posted to one server instance are automatically propagated to other server instances in the network, creating a distributed messaging system.

## Implementation

### Core Components

1. **Server Replication Setup**
   - Added a `setupReplication()` method to the `DredServer` class that is called during server initialization
   - This method discovers other servers in the network and establishes connections to them
   - Each server maintains client connections to all other servers in the network

2. **Message Source Tracking**
   - Added `sourceServer` field to messages to track their origin
   - Prevents circular replication by skipping messages that originated from the current server
   - Each server stamps outgoing messages with its server ID

3. **Channel Replication**
   - When a channel is created on one server, it is automatically created on all connected servers
   - Uses channel-genesis message type detection to trigger channel creation

### Implementation Details

#### Server-to-Server Communication

The implementation leverages the existing client-server architecture:

- Each server creates client connections to other servers
- The `mkClient()` method is used to create these connections
- Servers subscribe to all channels on connected servers, including special system channels
- Message propagation happens through these client connections

#### Message Flow Control

To prevent infinite loops in message propagation:

1. When a server receives a message from a client, it adds its server ID to the message
2. Before replicating a message from another server, it checks if the message originated from itself
3. Messages are only replicated if they didn't originate from the current server

#### Channel Synchronization

Channel creation events are identified by their message type:

- The "channel-genesis" message type indicates a channel creation event
- When a server detects this message type from a peer, it creates the channel locally
- All messages for a channel are subsequently replicated across the network

## Testing 

The implementation includes a dedicated test file (`replication.test.ts`) that verifies:

1. Channel creation replication from one server to another
2. Message replication between servers
3. Proper message delivery to clients connected to different servers

## Configuration

The implementation uses `StaticHostDiscovery` to manage host information:

- The `defaultHosts()` method provides the list of servers in the network
- Each server is identified by its `serverId`
- Connection details include address and port information

## Limitations and Future Improvements

1. **Consistency Model**: The current implementation doesn't guarantee strict consistency across all servers. 
   In future iterations, a more robust consistency model could be implemented.

2. **Scalability**: The current implementation connects every server to every other server, which may not scale
   well for large numbers of servers. A more optimized topology could be considered.

3. **Error Handling**: The implementation includes basic error handling, but more robust failure detection
   and recovery mechanisms could be added.

4. **Message Deduplication**: While the current implementation avoids circular replication, more sophisticated
   message deduplication might be needed in complex network topologies.

## Usage

The replication feature works transparently to clients. Clients connect to any server in the network and any message
they post will be automatically replicated across all servers, allowing other clients connected to different servers
to see the same messages. 