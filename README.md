# dred
## Decentralized Redis State Channels

Objective: support a network of nodes sharing many event channel where clients can connect (to any node in the network) and share an event stream with other clients having joined the same channel.

## Status

Early.

## Running

Docker is needed for running Redis.

`yarn ; yarn start`

Make sure you run this once before running tests.  It ensures that a Docker container is started for Redis.

Note that a `data` directory for tests is created in 
   ../dredDb

## Running Tests

`yarn test`

## Running Tests continuously

`yarn testing` runs tests and re-runs every time files are changed

## Debugging tests

Configure chrome://inspect to listen on port 9230 and on the same screen, use Dedicated DevTools for Node.

`yarn test:debug` runs tests once.  

- or -

`yarn testing:debug` for continuous debugging

## Support

This project is in early alpha and is not suitable for production use.  

