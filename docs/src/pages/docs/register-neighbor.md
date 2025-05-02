---
title: Registering a neighbor host
description: Contributing to the Dred messaging network
---

Operate a Dred neighborhood server to contribute to the capacity of the Dred messaging network

---

This guide explains how to register your DRED node with a neighborhood to help expand the messaging network.

## What is a DRED Neighborhood?

A "neighborhood" in DRED is a group of servers that support a specific application. Neighborhoods help nodes focus on particular dApps and allow the network to scale effectively.

By joining a neighborhood, you:
- Provide backup paths for messages
- Reduce delays for users
- Make the network stronger
- Support Cardano applications

## Before You Start

Make sure you have:

- A working DRED node (see the Node Operations guide)
- A node that others can reach over the internet
- Any tokens needed for registration
- Knowledge of the neighborhood's rules

## Joining an Existing Neighborhood

Most operators start by joining an existing neighborhood.

### Finding Neighborhoods

You can find existing neighborhoods through:
- The on-chain neighborhood registry
- Community channels
- Talking with application developers

### Meeting Requirements

To join a neighborhood, you typically need to:

1. Meet with neighborhood operators
2. Stake or buy required tokens
3. Show you can maintain reliable uptime
4. Prove you can run a stable node
5. Agree to follow the neighborhood's rules

Each neighborhood may have different rules about:
- Voting on decisions
- Minimum token amounts
- Performance standards

## Setting Up Your Node

Once you're approved to join a neighborhood:

1. Update your server configuration file:

```javascript
// dredServer.config.json
{
  "serverId": "your-unique-server-id",
  "neighborhoods": [
    "cardano-after-dark",
    "your-other-neighborhood"
  ],
  "trustedWalletPubkeys": [
    "walletPubkey1...",
    "walletPubkey2..."
  ],
  "authenticationKey": "path/to/dred-private.pem",
  "publicKey": "path/to/dred-public.pem",
  "listenAddress": "0.0.0.0",
  "port": 4242
}
```

2. Restart your server:
```bash
docker restart dred-node
```

3. Check that you're connected to other nodes:
```bash
docker logs dred-node | grep "Connected to neighborhood"
```

## Registering On-Chain

To officially join a neighborhood, register on the Cardano blockchain:

### Using the Registration Portal

The easiest way is through the web interface:

1. Go to the DRED Neighborhood Registration Portal
2. Connect your wallet with the required tokens
3. Choose the neighborhood to join
4. Enter your node information:
   - Server ID
   - Public key
   - Server address and port
5. Submit the transaction

### Using Code

For automated registration:

```javascript
// Set up the DRED Capo
const capo = new DredCapo({
  // Configuration settings
});

// Get the neighborhood controller
const nbhController = await capo.getNbhRegistryController();

// Register your node
const nodeData = {
  neighborhoodId: "cardano-after-dark",
  nodeId: "your-unique-server-id",
  nodePublicKey: "your-node-public-key"
};

// Create transaction
const tx = await nbhController.mkTxnRegisteringNodeToNeighborhood(
  nodeData,
  {
    memberToken: yourMemberToken
  }
);

// Submit the transaction
```

## Your Responsibilities

After registering, you need to:

### Keep Your Node Running
- Maintain 24/7 uptime
- Provide enough bandwidth
- Monitor performance

### Stay Updated
- Apply security fixes quickly
- Update your node software
- Keep your heartbeat current

### Work with Others
- Pass messages efficiently
- Coordinate with other nodes
- Join in neighborhood decisions

## Creating a New Neighborhood

If you're building a new app that needs DRED, you might create a new neighborhood:

### Planning

Consider:
- How many users you expect
- Where your users are located
- How reliable the service needs to be
- How decisions will be made

### Registration

To create a neighborhood:

1. Prepare your neighborhood information:
```javascript
const neighborhoodData = {
  name: "your-application-name",
  description: "What your application does",
  websiteUrl: "https://your-app-website.com",
  iconUrl: "https://your-app-website.com/icon.png",
  requirements: {
    minNodes: 3,
    minUptime: 0.95
  }
};
```

2. Register it:
```javascript
const nbhController = await capo.getNbhRegistryController();

const tx = await nbhController.mkTxnRegisteringNeighborhood(
  neighborhoodData,
  {
    // Required assets
  }
);

// Submit the transaction
```

3. Set up your first nodes:
   - Start with at least 3 nodes
   - Register each node to your neighborhood
   - Test thoroughly before going live

## Fixing Common Problems

### Registration Issues
- Check if your transaction was processed
- Verify you have all required tokens
- Make sure your node details are correct

### Connection Problems
- Check if your firewall allows connections
- Verify your public key matches what you registered
- Make sure you can reach other nodes

### Performance Issues
- Monitor your server resources
- Check your network connection
- Consider upgrading if needed

## Best Practices

- Start with one neighborhood
- Monitor your node regularly
- Keep backups of your configuration
- Document your setup
