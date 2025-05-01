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
- **Redis Backend**: Storage system for messages

## How Messages Move Through DRED

1. A user sends a message from their app
2. The DRED client encrypts the message
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
  neighborhoodId: "your-app-name"
});

// Connect to servers
await dred.connect();

// Join a message room
await dred.joinChannel("room-123");

// Send a message
await dred.postMessage("room-123", {
  type: "chat",
  msg: "Hello"
});

// Get messages
dred.subscribe("room-123", (message) => {
  console.log(message);
});
```

### DRED Server

The server handles messages:

```javascript
// Server parts
class DredServer {
  // Web API
  api: express.Application;
  
  // Storage
  redis: Redis;
  
  // Channel handler
  channelConn: RedisChannels;
}
```

Each server:
- Receives new messages
- Stores messages temporarily
- Sends messages to other servers
- Delivers messages to users

### Node Registry

The registry tracks servers on the blockchain:

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

- **Key Authentication**: Servers prove who they are
- **Message Encryption**: Content can be encrypted
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
- **Redis**: For message storage
- **Express**: For web APIs
- **Docker**: For deployment
- **Cardano**: For blockchain features

## Code Structure

The code is organized like this:

- `/packages/dred-server`: Server code
- `/packages/dred-client`: App library
- `/packages/dred-types`: Shared types
- `/packages/capo`: Blockchain tools
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
