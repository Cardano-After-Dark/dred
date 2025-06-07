# Neighborhood Discovery Override Issue

**Status**: Identified  
**Priority**: High  
**Category**: Client Discovery / State Machine  
**Date**: 2024-12-07  

## Problem Summary

When a DredServer has a neighborhood property set and creates clients via `mkClient()`, the clients inherit the neighborhood setting which causes their working `StaticHostDiscovery` to be overridden with a non-functional `NeighborhoodDiscovery`, leading to replication failures.

## Error Manifestation

```
TypeError: Cannot read properties of undefined (reading 'insecure')
❯ DredClient.fetch src/client/DredClient.ts:453:28
   451| 
   452|         let host = (await this.discovery.getHostList())[0];
   453|         const proto = host.insecure ? "http" : "https";
       |                            ^
   454|         const shortServer = `${host.address}:${host.port}`;
   455|         const url = `${proto}://${shortServer}${path}`;
❯ DredClient.createChannel src/client/DredClient.ts:551:20
```

## Root Cause Analysis

### 1. Server Neighborhood Setting
When a server is configured with a neighborhood:
```typescript
// In testSetup()
s.args.neighborhood = neighborhood;
```

### 2. Client Creation Inherits Neighborhood
The `DredServer.mkClient()` method spreads server args to client:

```typescript
// In DredServer.mkClient()
mkClient(serverSelection: string, clientArgs: Partial<DredClientArgs> = {}): DredClient {
    // ... discovery setup ...
    const singleDiscovery = new StaticHostDiscovery({
        hosts: [oneHost],
    });

    return new DredClient({
        name: `${serverSelection || ""}-${clientIndex++}`,
        ...this.clientArgs,  // <-- INCLUDES neighborhood property
        ...clientArgs,
        discovery: singleDiscovery,  // <-- Working discovery, but gets overridden
    });
}
```

### 3. Discovery Override in Client Constructor
Despite `mkClient` explicitly providing a working `StaticHostDiscovery`, the `DredClient` constructor calls `resolveDiscovery()` which overrides it:

```typescript
// In DredClient.resolveDiscovery()
static resolveDiscovery({ neighborhood, discovery }): Discovery {
    if (neighborhood) discovery = new NeighborhoodDiscovery({ neighborhood }); // <-- OVERRIDES!
    if (!discovery) throw new Error(`required: 'discovery' object or 'neighborhood' name`);
    return discovery;
}
```

### 4. NeighborhoodDiscovery is Unimplemented
The `NeighborhoodDiscovery.getHostList()` method is not implemented:

```typescript
// In NeighborhoodDiscovery.ts
async getHostList(): findingDredHosts {
    console.warn(`Discovery in neighborhood has no impl yet.  Try DevEnvLocalDiscovery for now`);
    return [];  // <-- Empty array
}
```

### 5. Client Fetch Fails
When client tries to make requests:
```typescript
// In DredClient.fetch()
let host = (await this.discovery.getHostList())[0];  // <-- undefined
const proto = host.insecure ? "http" : "https";      // <-- Error!
```

## Technical Flow

1. **Server setup**: `testSetup("test-neighborhood")` → `server.args.neighborhood = "test-neighborhood"`
2. **Client creation**: `server.mkClient("second")` → Creates client with working `StaticHostDiscovery` + inherited neighborhood
3. **Discovery override**: `DredClient` constructor → `resolveDiscovery()` sees neighborhood → replaces with `NeighborhoodDiscovery`
4. **Empty host list**: `NeighborhoodDiscovery.getHostList()` → returns `[]`
5. **Fetch failure**: `client.fetch()` → `host` is undefined → crash on `host.insecure`

## State Machine Conflicts

There are additional state machine conflicts when `setNeighborhood()` is called on clients:

```
client @ready: INVALID transition('nbhSelected') from state 'ready' 
client @discoveringChannels: INVALID transition('nbhSelected') from state 'discoveringChannels'
```

This occurs because:
- `setNeighborhood()` calls `asyncDelay(1).then(this.mkTransition("nbhSelected"))`
- But clients in `ready` or `discoveringChannels` states don't have valid transitions to `nbhSelected`
- The state machine is designed for initial discovery flow, not runtime neighborhood changes

## Impact on Replication

This issue completely breaks replication client functionality because:

1. **Replication clients can't connect**: They inherit server neighborhood and lose working discovery
2. **Channel discovery fails**: `connManager.getChannelList()` fails due to no hosts
3. **Message subscription fails**: Can't subscribe to channels on unreachable servers
4. **Replication can't proceed**: No messages can be replicated between servers

## Observed in Logs

```
Discovery in neighborhood has no impl yet.  Try DevEnvLocalDiscovery for now
Unhandled Promise rejection: no hosts discovered yet
ERROR: createChannel at server failed: TypeError: Cannot read properties of undefined (reading 'insecure')
```

## Solutions Considered

### Option 1: Exclude Neighborhood from Client Args
```typescript
// In DredServer.mkClient()
const { neighborhood, ...clientArgsWithoutNeighborhood } = this.clientArgs;
return new DredClient({
    name: `${serverSelection || ""}-${clientIndex++}`,
    ...clientArgsWithoutNeighborhood,  // <-- Exclude neighborhood
    ...clientArgs,
    discovery: singleDiscovery,
});
```

### Option 2: Modify resolveDiscovery Logic
Make `resolveDiscovery()` respect explicitly provided discovery objects:
```typescript
static resolveDiscovery({ neighborhood, discovery }): Discovery {
    if (discovery) return discovery;  // <-- Respect explicit discovery first
    if (neighborhood) discovery = new NeighborhoodDiscovery({ neighborhood });
    if (!discovery) throw new Error(`required: 'discovery' object or 'neighborhood' name`);
    return discovery;
}
```

### Option 3: Implement NeighborhoodDiscovery
Actually implement the `getHostList()` method in `NeighborhoodDiscovery` to use a discovery service.

### Option 4: Separate Neighborhood Context
Create a separate way to provide neighborhood context to clients without affecting their discovery mechanism.

## Workarounds

- Use `testSetup()` without neighborhood parameter to avoid the issue
- Don't set neighborhood on servers that need to create functional clients
- Use direct client construction instead of `server.mkClient()`

## Related Files

- `src/server/DredServer.ts` - `mkClient()` method
- `src/client/DredClient.ts` - `resolveDiscovery()` method and constructor
- `src/peers/NeighborhoodDiscovery.ts` - Unimplemented `getHostList()`
- `src/server/testServer.ts` - `testSetup()` neighborhood setting
- `src/server/DredReplicator.ts` - Replication client creation

## Test Cases Affected

- `src/server/__tests__/replication.test.ts` - All tests fail with neighborhood setting
- Any test that uses `testSetup(neighborhoodId)` and expects clients to work

## Resolution Status

This issue requires architectural decision about how neighborhood context should be handled separately from discovery mechanism. The current design conflates neighborhood identity with discovery implementation, which breaks the intended separation of concerns. 