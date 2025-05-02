---
title: Operating a Dred Node
description: How to run a Dred messaging server
---

This guide explains how to set up, configure, and maintain a DRED node to support the decentralized real-time messaging ecosystem.

---

## What is a DRED Node?

DRED nodes create a network that provides real-time messaging for Cardano blockchain applications. By running a node, you help make the network stronger and more reliable, enabling applications to communicate without building their own infrastructure.

## Before You Start

Make sure you have:

- Docker for containerized deployment
- Node.js and npm for running the server software
- pnpm package manager
- A server with enough resources (CPU, memory, bandwidth)
- Public internet access so your node can be reached by others
- SSL/TLS certificate for secure communications (recommended)

## Hardware Needs

For a basic DRED node:
- 2 CPU cores
- 4 GB RAM
- 50 GB SSD storage
- 10 Mbps dedicated bandwidth

For busier nodes serving multiple neighborhoods:
- 4+ CPU cores
- 8+ GB RAM
- 100+ GB SSD storage
- 100+ Mbps dedicated bandwidth

The exact requirements depend on message volume, number of neighborhoods, how long you store data, and redundancy needs.

## Setting Up Your Node

### Server Options

You can run a DRED node on:
- Physical servers
- Cloud virtual machines (AWS, GCP, Azure)
- VPS providers
- Any system that can run Docker containers

### Installation with Docker

Pull the official image:
```bash
docker pull cardanoafterdark/dred-node:latest
```

Create a configuration folder:
```bash
mkdir -p /opt/dred-node/config
```

Run the node container:
```bash
docker run -d \
  --name dred-node \
  -p 4242:4242 \
  -v /opt/dred-node/config:/app/config \
  cardanoafterdark/dred-node:latest
```

### Building From Source

Clone the repository:
```bash
git clone git@github.com:Cardano-After-Dark/dred.git
```

Go to the server directory:
```bash
cd dred/packages/dred-server
```

Build the Docker image:
```bash
docker build -t dred-node:custom .
```

Run your custom build:
```bash
docker run -d \
  --name dred-node \
  -p 4242:4242 \
  -v /path/to/config:/app/config \
  dred-node:custom
```

## Configuring Your Node

### Authentication Keys

Generate a new key pair:
```bash
cd /opt/dred-node
openssl genrsa -out dred-private.pem 2048
openssl rsa -in dred-private.pem -pubout -out dred-public.pem
```

Secure your private key:
```bash
chmod 600 dred-private.pem
```

Extract your public key for registration:
```bash
cat dred-public.pem | grep -v "BEGIN\|END" | tr -d '\n'
```

### Server Configuration File

Create a configuration file at `/opt/dred-node/config/dredServer.config.json`:

```json
{
  "serverId": "your-unique-server-id",
  "neighborhoods": [
    "cardano-after-dark",
    "your-other-neighborhood"
  ],
  "authenticationKey": "path/to/dred-private.pem",
  "publicKey": "path/to/dred-public.pem",
  "listenAddress": "0.0.0.0",
  "port": 4242,
  "redisConfig": {
    "host": "localhost",
    "port": 6379
  },
  "retention": {
    "messageExpiry": 86400,
    "channelExpiry": 604800
  }
}
```

Important settings:
- `serverId`: A unique ID for your server
- `neighborhoods`: Names of neighborhoods your node will serve
- `authenticationKey`: Path to your private key
- `publicKey`: Path to your public key
- `listenAddress`: Network interface (0.0.0.0 means all interfaces)
- `port`: Port for the DRED server
- `redisConfig`: Settings for Redis
- `retention`: How long to keep messages and channels (in seconds)

### Setting Up Redis

DRED uses Redis for message storage:

Install Redis (if not using Docker Compose):
```bash
docker run -d --name redis \
  -p 6379:6379 \
  redis:alpine --requirepass "your-secure-password"
```

Recommended Redis settings for production:
```
maxmemory 2gb
maxmemory-policy allkeys-lru
appendonly yes
```

## Registering Your Node

To let clients and other nodes find your node, register it on the Cardano blockchain:

### Preparation

You'll need:
- Your node's public key
- The minimum tokens for staking
- Registration fee

### Registration Process

Use the Cardano After Dark tools:

Initialize the DRED Capo:
```javascript
const capo = new DredCapo({
  // Configuration parameters
});
```

Get the node registry controller:
```javascript
const controller = await capo.getNodeRegistryController();
```

Register your node:
```javascript
const nodeData = {
  nodeAddress: "your-server-address.com", // or IP
  nodePort: 4242,
  nodePublicKey: "your-node-public-key" 
};

const tx = await controller.mkTxnRegisteringNode(nodeData, {
  // Include required assets (registration fee and stake)
});

// Submit the transaction through your wallet
```

Check your registration:
```javascript
const nodes = await capo.findNodeOpEntries();
console.log(nodes);
```

## Maintaining Your Node

### Monitoring

Keep an eye on:
- System resources: CPU, memory, disk, network
- Application logs for errors
- Redis performance
- Connection counts

Check container stats:
```bash
docker stats dred-node redis
```

### Updates

Keep your node updated:

```bash
# Get the latest image
docker pull cardanoafterdark/dred-node:latest

# Stop the current container
docker stop dred-node
docker rm dred-node

# Start with the new image
docker run -d \
  --name dred-node \
  -p 4242:4242 \
  -v /opt/dred-node/config:/app/config \
  cardanoafterdark/dred-node:latest
```

### Backups

Regularly back up your configuration and keys:

```bash
# Backup configuration
tar -czf dred-config-backup-$(date +%Y%m%d).tar.gz \
  /opt/dred-node/config \
  /opt/dred-node/*.pem
```

### Security Tips

- Only open necessary ports (4242 for DRED, 6379 for Redis)
- Keep your private keys secure
- Update all software regularly
- Limit who can access your server
- Use SSL/TLS for all connections

## Improving Performance

### Redis Optimization

For busy nodes:
- Give Redis enough memory
- Set appropriate eviction policies
- Consider Redis Cluster for very large deployments

### Network Optimization

- Ensure low-latency connections
- Have enough bandwidth
- Use CDN or edge services for global deployments

### Keeping Your Node Active

Update your node's heartbeat regularly:

```javascript
const updateTx = await controller.mkTxnUpdatingNodeRegistration(
  "updateHeartbeat",
  existingNodeData,
  {
    data: { lastHeartbeat: Date.now() },
    memberToken: yourMemberToken
  }
);
```

## Solving Common Problems

### Node Not Visible in Registry
- Check if your transaction went through
- Make sure you meet the minimum stake requirements
- Verify your public key format is correct

### Connection Issues Between Nodes
- Check firewalls and network settings
- Verify Redis is working properly
- Check SSL/TLS certificate validity

### High Latency
- Monitor system resources
- Check for network congestion
- Verify Redis performance

### Message Delivery Problems
- Check relay configuration
- Verify neighborhood connectivity
- Check authentication status

## Getting Help

Operating a DRED node helps the Cardano ecosystem by providing messaging infrastructure for decentralized applications.