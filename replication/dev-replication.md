# Dev Replication

## Setup

Ensure you have docker running and start fresh:

```bash
git checkout feature/fix-tests-02-dup
git clean -fdx
pnpm install
pnpm build
```

All the above should work correctly. It does not for some minor issues

## Scope

Implement message replication for the dred server. 
Add a test to verify the replication works

## Idea

in DredServer.ts:

- add `setupReplication()` in the constructor
- look at `mkClient` for how to create a client
- setup discovery in `createServer`

DevEnvLocalDiscovery

- use

Verify

- start with an empty test, similar to src/server/__tests__/peers.test.ts, but call it replication.test.ts
- in the test, add a single test: 
  - launch two instances of dred: dred1, and dred2 
  - create two clients: c1 and c2, c1 connected to dred1, and c2 connected to dred2
  - send a message from c1 to dred1
  - verify the message sent from c1 to dred1 is replicated also by dred2

