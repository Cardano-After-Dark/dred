---
title: Architecture guide
description: How DRED works and how you can contribute to the project.
---

This guide explains how DRED works and how you can contribute to the project.

---

## System Overview

DRED is a messaging system for Cardano apps with four main parts:

- **Node Network**: Servers that pass messages between users
- **On-chain Registry**: Blockchain records that help find servers
- **Client Library**: Code that apps use to connect to DRED
- **Redis Backend**: Storage system for messages and pub/sub functionality

## How Messages Move Through DRED

1. A user sends a message from their app
2. The DRED client encrypts the message (optional)
3. The message goes to DRED servers
4. Servers share the message with other servers
5. Connected users receive the message
6. Each user's app shows the decrypted message

## Main Components

### DRED Client

The client helps apps use the network:

```javascript
// Create a client
const dred = new DredClient({
  neighborhood: "your-app-name",
  waitFor: "minimum", // Connection threshold setting
  name: "my-client", // Optional client name
  connectionSettings: {} // Optional connection configuration
});

// Connect to servers
await dred.connect();

// Join a message room
await dred.joinChannel("room-123");

// Send a message
await dred.postMessage("room-123", {
  type: "chat",
  msg: "Hello",
  "content-type": "text/plain" // Optional content type
});

// Get messages
dred.subscribe("room-123", (message) => {
  console.log(message);
});
```

### DRED Server

The server handles messages:

```javascript
// Server implementation
class DredServer {
  // Web API
  api: express.Application;
  
  // Storage
  redis: Redis;
  
  // Channel handler
  channelConn: RedisChannels;
  
  // Server configuration
  discovery: Discovery;
  serverId: string;
  
  constructor(clientArgs, serverId) {
    // Initialize server components
  }
}
```

Each server:
- Receives new messages
- Stores messages temporarily
- Sends messages to other servers
- Delivers messages to users
- Manages channel subscriptions

### Node Registry

The registry tracks servers using a discovery mechanism:

```javascript
// Server information
interface NodeRegistrationData {
  nodeAddress: String    // Server address
  nodePort: Number       // Server port
  nodePublicKey: Bytes   // Identity key
  lastHeartbeat: Number  // Last active time
}
```

This helps:
- Find available servers
- Check server identities
- See which servers are online
- Group servers by app

### Neighborhoods

Neighborhoods group servers by the apps they support:

```javascript
// Server settings
{
  "serverId": "server-id",
  "neighborhoods": [
    "cardano-after-dark",
    "poker-app"
  ]
}
```

This allows:
- Apps to find the right servers
- Messages to stay with their app
- Servers to focus on specific apps
- Better performance

## Security

DRED keeps messages secure through:

- **Key Authentication**: Servers prove who they are using nacl signatures
- **Message Encryption**: Content can be encrypted end-to-end
- **Blockchain Checks**: On-chain records verify servers
- **Token Staking**: Servers must stake tokens to join

## Reliability

DRED makes sure messages arrive even if problems occur:

- Messages can take different paths
- Apps connect to multiple servers
- The network works even if some servers stop
- Messages are tracked to prevent duplicates

## Development Tools

The project uses:

- **TypeScript**: For safer code
- **Node.js**: For running servers
- **Redis**: For message storage and pub/sub
- **Express**: For web APIs
- **Docker**: For deployment
- **Cardano**: For blockchain features

## Code Structure

The code is organized like this:

- `/src`: Main source code
  - `/client`: Client implementation
  - `/server`: Server implementation
  - `/redis`: Redis integration
  - `/types`: Shared type definitions
  - `/util`: Utility functions
- `/examples`: Example apps

## Contributing

To help improve DRED:

1. **Learn the System**: Read this guide and the code
2. **Set Up Your Tools**: Install needed software
3. **Test**: Make sure everything works
4. **Make Changes**: Add your improvements
5. **Share**: Submit your changes

## Performance Tips

When working with DRED:

- Keep messages small
- Handle multiple server connections
- Set up Redis correctly
- Plan for network problems

## Future Plans

DRED may grow to include:

- Server performance tracking
- Rewards for server operators
- Support for more blockchains
- Long-term message storage
- Better security features
