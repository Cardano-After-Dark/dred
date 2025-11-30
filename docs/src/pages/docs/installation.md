---
title: Installation
description: Install DRED for development or deploy a production node
---

This guide covers installing DRED for local development and deploying production nodes.

---

## For Application Developers

### Prerequisites

- **Node.js**: Version 18 or higher (managed via nvm recommended)
- **npm**: Comes with Node.js
- **pnpm**: Version 10.11.0 or higher

### Install the Client Library

For applications using DRED, install the client package:

```bash
npm install @cardano-after-dark/dred-client
```

Start using DRED in your application:

```javascript
import { DredClient } from '@cardano-after-dark/dred-client';

const dred = new DredClient({ neighborhood: "your-app" });
await dred.connect();
```

See the [API Reference](api-reference) for complete usage details.

---

## For Local Development

### Prerequisites

- **Docker**: For running Redis
- **Node.js**: Version 18 (see `.nvmrc`)
- **npm**: Comes with Node.js
- **pnpm**: Version 10.11.0 or higher

### Install nvm and pnpm

Check if nvm is installed:

```bash
nvm -v
```

If not installed, install nvm and then install Node.js:

```bash
nvm install --lts
```

Install pnpm globally:

```bash
npm install -g pnpm
```

### Clone the Repository

Using SSH (recommended):

```bash
git clone git@github.com:Cardano-After-Dark/dred.git
cd dred
```

Using HTTPS:

```bash
git clone https://github.com/Cardano-After-Dark/dred.git
cd dred
```

### Build and Run

Install dependencies and start the development environment:

```bash
pnpm install
pnpm dev
```

This command:

- Starts Redis in a Docker container
- Runs the DRED server on localhost
- Launches a [demo client app](http://localhost:3030/)
- Serves [documentation](http://localhost:3034/)

### Verify Installation

Once running, access:

- **Demo Application**: [http://localhost:3030](http://localhost:3030/)
- **Documentation**: [http://localhost:3034](http://localhost:3034/)

The demo application shows the DRED client connecting to the local server and managing message channels.

---

## For Node Operators

### Deploy with Docker (Recommended)

The easiest way to run a production DRED node is using Docker.

#### Prerequisites

- **Docker**: Install for [Windows](https://docs.docker.com/desktop/install/windows-install/), [macOS](https://docs.docker.com/desktop/install/mac-install/), or [Linux](https://docs.docker.com/desktop/install/linux-install/)
- **Server**: Public IP or domain name
- **Resources**: 2+ CPU cores, 4+ GB RAM, 50+ GB storage

#### Quick Deployment

Pull the official DRED node image:

```bash
docker pull cardanoafterdark/dred-node:latest
```

Create a configuration directory:

```bash
mkdir -p /opt/dred-node
cd /opt/dred-node
```

Download the example configuration:

```bash
curl -o .env.example https://raw.githubusercontent.com/Cardano-After-Dark/dred/main/.env.example
cp .env.example .env
```

Edit `.env` with your settings:

```bash
nano .env
```

Key settings to configure:

- `DRED_NODE_ID`: Your unique node identifier
- `SERVER_IP`: Your server's public IP or domain
- `CARDANO_NETWORK`: Network to use (preprod/mainnet)
- `BF_API_KEY`: Your Blockfrost API key

Start the node using Docker Compose:

```bash
docker-compose up -d
```

Check node status:

```bash
docker-compose ps
docker-compose logs -f dred-server
```

For complete deployment instructions, see:

- [Deployment Guide](https://github.com/Cardano-After-Dark/dred/blob/main/devops/DEPLOYMENT-GUIDE.md)
- [Quick Start](https://github.com/Cardano-After-Dark/dred/blob/main/devops/QUICKSTART.md)

### Build from Source

Clone the repository:

```bash
git clone git@github.com:Cardano-After-Dark/dred.git
cd dred
```

Install dependencies:

```bash
pnpm install
```

Build all packages:

```bash
pnpm build:all
```

This builds:

- DRED server
- Client library (browser and Node.js)
- Documentation site
- On-chain contracts

Run the server:

```bash
pnpm start
```

---

## Testing Your Installation

### Run Tests

Execute the test suite:

```bash
# Run all tests
pnpm test

# Run specific tests
pnpm test replication

# Run tests in watch mode
pnpm testing

# Run with coverage
pnpm test:coverage
```

### Type Checking

Verify TypeScript types:

```bash
pnpm typecheck
```

### Linting

Check code style:

```bash
pnpm lint
```

---

## Environment Configuration

### Development Environment

Create a `.env` file in the project root:

```bash
# Redis connection
REDIS_URL=redis://localhost:6379

# Server configuration
DRED_PORT=3029
DRED_HOST=0.0.0.0
SERVER_IP=127.0.0.1

# Environment mode
NODE_ENV=development

# Logging
LOGGING=default:info,discovery:debug

# Node identification
DRED_NODE_ID=local-dev

# Allow insecure HTTP (development only)
DRED_USE_INSECURE=true
```

### Production Environment

For production nodes, configure:

```bash
# Redis connection
REDIS_URL=redis://localhost:6379

# Server configuration
DRED_PORT=3029
SERVER_IP=your-public-ip-or-domain

# Environment mode
NODE_ENV=production

# Cardano Network
CARDANO_NETWORK=preprod
BF_API_KEY=your_blockfrost_api_key

# Node identification
DRED_NODE_ID=your-unique-node-id

# Discovery method
USE_STATIC_DISCOVERY=true

# Security (NEVER use insecure in production)
DRED_USE_INSECURE=false
```

---

## Next Steps

### For Developers

1. Read [Understanding DRED](understanding-dred)
2. Explore the [API Reference](api-reference)
3. Check the [Architecture Guide](architecture-guide)
4. Review the sample application in `/sampleApp`

### For Node Operators

1. Complete [Node Operations](node-operations) guide
2. Register your node in the [Node Registry](dred-node-registry)
3. Monitor your node's health and performance
4. Join the community on [Discord](https://discord.gg/VwxRdEBwBE)

---

## Troubleshooting

### Docker Issues

If Redis container fails to start:

```bash
# Check Docker status
docker ps -a

# View Redis logs
docker logs dred_redis

# Restart Redis
docker restart dred_redis
```

### Build Issues

If build fails:

```bash
# Clean and rebuild
rm -rf node_modules dist
pnpm install
pnpm build
```

### Port Conflicts

If ports are already in use, update `.env`:

```bash
DRED_PORT=3030  # Change to an available port
```

---

## Getting Help

Need assistance?

- **Documentation**: Browse all guides on this site
- **Discord**: Join our [Discord server](https://discord.gg/VwxRdEBwBE) for discussions and support
- **GitHub Issues**: [Report issues](https://github.com/Cardano-After-Dark/dred/issues) for bugs and feature requests
- **Telegram**: Connect with the community on [Telegram](https://t.me/CardanoAfterDark)
