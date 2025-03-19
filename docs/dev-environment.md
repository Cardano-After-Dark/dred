# Dev Environment

## How to launch the application:

Before running the application, you need to set up the development environment:

Prerequisites:
- Docker (for running Redis)
- Node.js version 18 (using nvm)
- pnpm package manager
- yarn package manager

Initial Setup (one-time):

```bash
    # Install dependencies
    pnpm install

    # Set up Redis in Docker
    scripts/setupEnvironment

    # Build the server
    pnpm build
```

Running the application:
```bash
    pnpm dev
```

This will start several services:
- Client package build-watcher
- Server package build-watcher
- Server on port 3029
- Sample application "Dred Communicator" on port 3030
- Documentation server (Next.js app) on port 3034

# Multi-node

The development environment discovery includes two nodes, see `DevEnvLocalDiscovery.defaultHosts()` and `setupDefaultHosts()`. 
The latter selects which hosts are in the nbh.

The `dredServer` startup script allows yyou to specify which node to run. See the `init()` function.

To run two nodes, first run the `scripts/setupEnvironment` and `pnpm build`. 
Then run the two servers in separate shells:

```bash
    node bin/dredServer node1
    node bin/dredServer node2
```