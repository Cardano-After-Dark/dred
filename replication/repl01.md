# ongoing work on repl

before starting, identify the other stable redis tests and try to run them

```bash
cd ~/cad/dred
git co feature/message-duplication
pnpm install
pnpm build
LOGGING=1 pnpm test src/redis/__tests__/RedisSet.test.ts
LOGGING=1 pnpm test src/client/__tests__/client.test.ts # Failing
```

## Scope

Implement message replication for the DRED server
Add a test to verify the replication works

## Idea

in DredServer.ts:

- add `setupReplication()` in the constructor
- look at `mkClient` for how to create a client
- setup discovery in `createServer`

For the discovery, we should use StaticHostDiscovery (which replaces StaticHostDiscovery used in the past)

Verify

- start with an empty test, similar to src/server/__tests__/peers.test.ts, but call it replication.test.ts
- in the test, add a single test: 
  - launch two instances of dred: dred1, and dred2 
  - create two clients: c1 and c2, c1 connected to dred1, and c2 connected to dred2
  - send a message from c1 to dred1
  - verify the message sent from c1 to dred1 is replicated also by dred2

Below are references to two initial examples which I started but never completed to implement message repl in the past:
- Commit 498664a7 on branch feature/message-duplication-onmain
- Commit 3c464d19 on branch patrik_test

## Build and test execution

This is how to run the replication tests

```bash
cd ~/cad/dred
git co feature/message-duplication
pnpm install
pnpm build
LOGGING=1 pnpm test replication.test.ts    
```

All the above should work correctly.


## Implementation details

In the testServer.ts we have a test setup like the snippet below, which defines servers on given ports

```typescript
export async function testSetup() {
    const hosts: DredHostDetails[] = [
        { serverId: "first", address: "localhost", port: "53032", insecure: true },
        { serverId: "second", address: "localhost", port: "53033", insecure: true },
        { serverId: "third", address: "localhost", port: "53034", insecure: true },
    ];
```

In client.test.ts, we see how to create clients, like in the snippet below.

In a test scenario we cana make a client for each different server for instance we can create a client for the first  

```typescript
            const chanName = "client1";
            const c = server.mkClient("first");
            await expect(
                c.createChannel(chanName, {
                    encrypted: true,
                })
            ).rejects.toThrow(/generateKey/);
```

And then for another client, we look for the presence of that other channel. If this does not happen the replication does not work. 


## Details

Details that might be useful: during th e test setup, iterates through the servers and calls create server. 
The third argument to create server is a number, which indicates the server DB

The redis db number is used in the setupRedis, to pass the DB number in the Redis options

When we setup the redis db in tests, we set 1, 2, 3 for server first,s econd and third, and there is no DB zero in the test (to be checked)

- the current version seems different than the one in the recording 

