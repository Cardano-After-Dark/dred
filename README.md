# dred
## Decentralized Redis State Channels

Objective: support a network of nodes sharing many event channels where clients can connect (to any node in the network) and share an event stream with other clients having joined the same channel.

## Status

In development.  This code has not been audited for security.

## Documentation

The documentation is built with Next.js and can be accessed in three ways:

### 1. Development Mode

Run `pnpm dev` from the project root. This will start all services, including the documentation server on port 3034.
Access the documentation at `http://localhost:3034`.

### 2. Local Static Build

To test the static build locally:
```bash
cd docs
rm -rf .next out  # Clean previous builds
pnpm build        # Build the site
pnpm export       # Export as static files
cd out
python3 -m http.server 8000  # Or any other static file server
```
Then access the documentation at `http://localhost:8000`.

### 3. GitHub Pages

The documentation is automatically deployed to GitHub Pages when changes are pushed to the docs directory.
Access the live documentation at `https://cardano-after-dark.github.io/dred`.

## Setup for Development

The following details should only need to be set up once.  If you've already done these, skip right to Development

### Docker

Docker is needed for running Redis.  Make sure you have a working `docker` before continuing.

### NVM and Node 18

This software works with node version 18.  We use `nvm` as an easy way to ensure that version number.  Make sure `nvm` is installed and working on your machine before continuing.  `nvm use` should reflect version 18.

### Package Manager(s)

We use `pnpm` as our preferred package manager.  if `pnpm -v` doesn't indicate it's installed, run `npm i -g pnpm`.

We have one dependency that prefers to build using yarn.  Run `npm i -g yarn`.  

### Docker container for Redis

With those dependencies installed properly, run `scripts/setupEnvironment`.  This script will create and run a Redis service in a docker container, suitable for demo and development.  Note that it will create a data directory for Redis, in `../dredDb`.

### One-time build of dredServer

With those dependencies installed properly, run `pnpm build`.

## Development

Ensure you've done the prior Setup steps once first.

### Run in NVM

Make sure you're running with the right version of Nodejs.  `nvm use` should do the trick.

### Run all the services

`pnpm dev` will run all of the following services:

  * Build-watcher for the Client package
  * Build-watcher for the Server package
  * Nodemon-based runner for the Server on port 3029
  * A sample application "Dred Communicator" in `sampleApp` on port 3030
  * Docs server (a Nextjs app in `docs/`) on port 3034

The two UI servers should display links in your terminal.

## Running Tests

When running tests, sample servers are created on port 3032 and 3033.  If you see any errors relating to these port numbers, please ensure that there are no conflicting processes running on your machine (including port 3030, due to port-finding fallback behavor by the sample app).

### Run tests once

`pnpm test`

### Running Tests continuously

`pnpm testing` runs tests and re-runs every time files are changed

### Debugging tests

`pnpm test:debug` runs tests once with the debugger listener

- or -

`pnpm testing:debug` for continuous debugging with debugger

Configure chrome://inspect to listen on port 9230 and on the same screen, use Dedicated DevTools for Node.

## Architecture

For learning about DRED you can dive into the Core concepts beginning with the [About Dred](https://cardano-after-dark.github.io/dred/docs/understanding-dred) section, then move on to read the [DRED Core Architecture](https://cardano-after-dark.github.io/dred/docs/core-architecture) for a full understanding of how DRED actually works.

## License

TODO: dual-licensing, with non-commercial use under terms of a suitable source-available license, with commercial use constrained to paying customers.  

Some code in this package is forked from @hearit-io/redis-channels and modified under the terms of its MIT license.  Accordingly, THOSE code modifications are licensed under the same MIT licensing terms.  See src/redis/streams/LICENSE.

## Support

Support is provided on a best-effort, collaborative basis.

