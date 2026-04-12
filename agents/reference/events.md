# DredClient Event Reference

> Source of truth: `src/client/DredClient.ts` (ClientEvents), `src/client/ConnectionManager.ts` (ManagerEvents)

## Client Events (`client.events`)

Access via `client.events.on(eventName, handler)` or `client.events.once(eventName, handler)`.

| Event | Payload | Fires when |
|-------|---------|------------|
| `needsNeighborhood` | `{message, nbhs[]}` | Client needs app to call `setNeighborhood()` |
| `hasChannels` | `{nbh, channels[], message}` | Channel list is ready (initial or refreshed) |
| `channel:created` | `{nbh, channel, options}` | New channel discovered via `_chans` meta-channel |
| `channel:removed` | `{nbh, channel, options}` | Channel removed (not yet implemented) |
| `state:changed` | `{nbh, status, channels[], message}` | State machine transitioned |
| `channel:message` | `DredChannelMessage` | Message received on subscribed channel |
| `error` | `{reason, message, recommendation}` | Request or protocol error |
| `needsAuth` | `{tbd}` | Authentication required (not yet implemented) |

### Event payload details

**All events** include a `message` (user-facing string) and `[devMessage]` (developer guidance symbol-keyed field, not enumerable).

**`hasChannels`** — Primary signal that the client is ready. Wire your UI channel list here:
```typescript
client.events.on('hasChannels', ({ channels, nbh }) => {
  updateChannelList(channels);
});
```

**`state:changed`** — Emitted on every state machine transition. The `status` field is the current state name (see State Machine below).

**`error`** — Contains `recommendation` field with suggested user-facing action text.

## State Machine Lifecycle

```
default → discoveringHosts → discoveringChannels → ready
   │
   ├─(has neighborhood)──→ discoveringHosts
   └─(no neighborhood)──→ findingNbhs → selectingNbh ─(setNeighborhood())─→ discoveringHosts
```

| State | What happens | Next |
|-------|-------------|------|
| `default` | Auto-advances based on whether `neighborhood` was provided | `discoveringHosts` or `findingNbhs` |
| `findingNbhs` | Calls `getNeighborhoods()` on discovery | `selectingNbh` |
| `selectingNbh` | Emits `needsNeighborhood` — waits for `setNeighborhood()` | `discoveringHosts` |
| `discoveringHosts` | Calls `discovery.getHostList()` in background | `discoveringChannels` |
| `discoveringChannels` | ConnectionManager fetches `/channels` from hosts; emits `hasChannels` | `ready` |
| `ready` | Client is fully operational | — |

## Connection Health (ConnectionManager)

The ConnectionManager has its own state machine tracking connectivity to neighborhood hosts. Applications don't interact with it directly but see its effects through client events.

| CM State | Meaning | Client-visible event |
|----------|---------|---------------------|
| `connecting` | Establishing connections to hosts | `connecting` on CM events |
| `partiallyConnected` | Some hosts connected, below healthy threshold | — |
| `healthy` | Sufficient connections for reliable operation | `connected` {message} |
| `degraded` | Was healthy, dropped below threshold | `connect:minimal` {message, altMessageRealtime, altMessageSecurity} |
| `disconnected` | Lost all connections | `disconnected` {message, recommendation} |

**`connected`** — Safe to proceed with normal operations. Clears any prior warnings.

**`connect:minimal`** — Partial connectivity. Messages may be delayed. Security-critical apps should pause. ConnectionManager will auto-retry.

**`disconnected`** — No connections. Show user guidance from `recommendation` field. ConnectionManager will attempt reconnection.

### Connection thresholds
Determined by the Discovery implementation. StaticHostDiscovery adapts to host count:
- 1 host: minimal=1, healthy=1
- 2 hosts: minimal=1, healthy=2
- 3+ hosts: minimal=2, healthy=3

The `waitFor` arg in DredClientArgs selects which threshold to wait for before proceeding (`'minimal'` or `'healthy'`).
