# dred
## Decentralized Redis State Channels

Objective: support a network of nodes sharing many event channel where clients can connect (to any node in the network) and share an event stream with other clients having joined the same channel.

## Status

In development.  This code has not been audited for security.

## Running

Docker is needed for running Redis.

`yarn ; yarn start`

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

## License

TODO: dual-licensing, with non-commercial use under terms of a suitable source-available license, with commercial use constrained to paying customers.  

Some code in this package is forked from @hearit-io/redis-channels and modified under the terms of its MIT license.  Accordingly, THOSE code modifications are licensed under the same MIT licensing terms.  See src/redis/streams/LICENSE.

## Support

This project is in early alpha and is not suitable for production use.  Support is provided on a best-effort, collaborative basis.

