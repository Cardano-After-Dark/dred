---
title: Welcome to DRED
pageTitle: DRED - Decentralized REDIS state channels
description: Real-time message channels for Cardano dApps
---

DRED provides decentralized real-time messaging for Cardano applications. Connect users through shared channels without running your own servers. {% .lead %}

{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Get started with DRED in your development environment or deploy a production node." /%}

{% quick-link title="Understanding DRED" icon="presets" href="/docs/understanding-dred" description="Learn what DRED is and why it exists for the Cardano ecosystem." /%}

{% quick-link title="Architecture Guide" icon="theming" href="/docs/architecture-guide" description="Explore how DRED works and contribute to the project." /%}

{% quick-link title="Node Operations" icon="plugins" href="/docs/node-operations" description="Run your own DRED node and join the decentralized network." /%}

{% /quick-links %}

---

## What is DRED?

DRED (Decentralized REDIS state channels) is a messaging protocol designed for decentralized applications on Cardano. It enables multiple users to share real-time updates through message channels, with any authorized participant able to contribute content.

**Key Benefits:**

- **No Infrastructure Required** - Application developers don't need to operate messaging servers
- **Decentralized Network** - Messages are served by a distributed network of independent nodes
- **Simple Protocol** - Built on HTTP with JSON messages for easy integration
- **Real-time Updates** - Low-latency message delivery for interactive applications

---

## Quick Start

### For Application Developers

Install the DRED client library:

```bash
npm install @cardano-after-dark/dred-client
```

Connect to the network and start messaging:

```javascript
import { DredClient } from '@cardano-after-dark/dred-client';

// Initialize client
const dred = new DredClient({
  neighborhood: "your-app-name"
});

// Connect to network
await dred.connect();

// Join a channel
await dred.joinChannel("game-room-42");

// Listen for messages
dred.subscribe("game-room-42", (message) => {
  console.log("Received:", message);
});

// Send a message
await dred.postMessage("game-room-42", {
  type: "chat",
  msg: "Hello, world!"
});
```

### For Node Operators

Deploy a DRED node using Docker:

```bash
# Pull the official image
docker pull cardanoafterdark/dred-node:latest

# Configure your environment
cp .env.example .env
# Edit .env with your settings

# Start the node
docker-compose up -d
```

For node operators, we suggest to have your own configuration, which could be similar to the one below.

```js
// dredServer.config.json
export default {
    serverId: 'x1b42yum',
    neighborhoods: [
        'cardano-after-dark',
        'done-collectively-dao',
    ],
    listenAddress: "191.168.42.42",
    port: "4242"
}
```

See [Node Operations](/dred/docs/node-operations) for complete setup instructions.

---

## Use Cases

DRED powers real-time communication for:

- **Gaming** - Multiplayer card games, turn-based strategy, and collaborative gameplay
- **Auctions** - Live bidding and price updates
- **DAOs** - Voting coordination and proposal discussions
- **NFT Marketplaces** - Real-time notifications for listings and sales
- **DeFi** - Price feeds and trade coordination
- **Social Apps** - Chat, notifications, and activity streams

---

## How It Works

1. **Neighborhood Discovery** - Apps discover available DRED nodes registered for their neighborhood
2. **Multi-Node Connection** - Clients connect to multiple nodes for redundancy
3. **Channel Management** - Create or join channels for specific message streams
4. **Message Distribution** - Nodes replicate messages to ensure delivery across the network
5. **Real-time Updates** - All channel participants receive messages with low latency

---

## Architecture Highlights

**Client Layer:**

- Browser and Node.js compatible
- Automatic reconnection
- Message encryption support
- TypeScript first

**Network Layer:**

- HTTP-based protocol (HTTP/2, HTTP/3 compatible)
- Node-to-node replication
- Smart relay to prevent message duplication
- Redis for high-performance message storage

**Blockchain Layer:**

- On-chain node registry on Cardano
- Neighborhood configuration via smart contracts
- Token staking for node operators
- Decentralized governance

---

## Network Status

The DRED network is currently in **active development** with production-ready Docker deployment available.

- **Current Version**: Server 0.8.1, Client 0.8.1
- **Network**: Cardano Preprod Testnet
- **Deployment**: Docker-based with SSL/TLS support
- **Documentation**: Complete guides for developers and node operators

---

## Open Source

DRED is fully open source under the MIT license. The project welcomes contributions from the Cardano community.

- **GitHub**: [Cardano-After-Dark/dred](https://github.com/Cardano-After-Dark/dred)
- **License**: MIT
- **Funding**: Project Catalyst funded

---

## Getting Help

Need assistance with DRED?

- **Documentation**: Browse the guides in this site
- **Discord**: Join our [Discord server](https://discord.gg/VwxRdEBwBE) for discussions and support
- **GitHub Issues**: [Submit an issue](https://github.com/Cardano-After-Dark/dred/issues) for bugs and feature requests
- **Telegram**: Connect with the community on [Telegram](https://t.me/CardanoAfterDark)

---

## Contributing

We welcome contributions:

- **Code**: Submit pull requests for bug fixes and features
- **Documentation**: Improve guides and examples
- **Node Operations**: Run a node and strengthen the network
- **Feedback**: Share your experience and suggestions

See [How to Contribute](/dred/docs/how-to-contribute) for details.

---

## Join the Community

Stay connected with the DRED project:

- **X (Twitter)**: [@cardafterdark](https://x.com/cardafterdark)
- **Discord**: [Join our server](https://discord.gg/VwxRdEBwBE)
- **Telegram**: [CardanoAfterDark](https://t.me/CardanoAfterDark)
- **GitHub**: [Follow the project](https://github.com/Cardano-After-Dark/dred)
