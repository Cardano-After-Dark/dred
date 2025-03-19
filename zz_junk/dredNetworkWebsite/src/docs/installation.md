# Installation Guide

This guide will walk you through the process of installing and setting up Dred in your development environment.

## Prerequisites

Before installing Dred, ensure you have the following prerequisites installed on your system:

- Docker (version 20.10 or higher)
- Node.js (version 16 or higher)
- npm (version 7 or higher)
- pnpm (version 6 or higher)

## Step 1: Install the Dred CLI

First, install the Dred CLI globally using npm:

```bash
npm install -g @dred/cli
```

## Step 2: Initialize a New Dred Project

Create a new directory for your project and initialize it:

```bash
mkdir my-dred-project
cd my-dred-project
dred init
```

This will create the basic project structure and configuration files.

## Step 3: Configure Your Server

Create a `dred.config.js` file in your project root:

```js
export default {
    serverId: 'your-unique-server-id',
    neighborhoods: [
        'your-neighborhood-name',
    ],
    listenAddress: "127.0.0.1", // Change this to your server's IP
    port: "4242"
}
```

## Step 4: Install Dependencies

Install the required dependencies:

```bash
pnpm install @dred/core @dred/client @dred/server
```

## Step 5: Start the Development Server

Start the Dred development server:

```bash
dred dev
```

Your Dred server should now be running at `http://localhost:4242`.

## Docker Installation

If you prefer using Docker, you can use our official Docker image:

```bash
docker pull dred/server:latest
docker run -p 4242:4242 dred/server:latest
```

## Environment Variables

Configure these environment variables in your `.env` file:

```env
DRED_SERVER_ID=your-server-id
DRED_NEIGHBORHOODS=neighborhood1,neighborhood2
DRED_LISTEN_ADDRESS=127.0.0.1
DRED_PORT=4242
```

## Next Steps

- Read the [Quick Start Guide](./quickstart) to learn how to use Dred
- Check out our [Examples](./examples) for common use cases
- Join our [Discord community](https://discord.gg/VwxRdEBwBE) for support 