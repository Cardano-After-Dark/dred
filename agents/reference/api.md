# DredClient API Reference

> Source of truth: `src/client/DredClient.ts`, `src/client/index.ts`

## Imports

```typescript
// Browser
import { DredClient, StaticHostDiscovery, NeighborhoodDiscovery } from '@cardano-after-dark/dred-client';

// Node.js
import { DredClient, StaticHostDiscovery, NeighborhoodDiscovery } from '@cardano-after-dark/dred-client/node';
```

**Exported types**: `ClientState`, `DredMessageListener`, `SubscriberMap`, `EncryptedDredMessage`, `DredClientArgs`, `ClientEvents`, `eventHasChannels`, `eventChannelInfo`, `FullDredMessage`, `DredEvent`, `DredError`, `ChanId`, `NbhId`, `MsgId`, `DredChannelMessage`, `DredMessage`

## Constructor

```typescript
new DredClient(args: DredClientArgs)
```

```typescript
interface DredClientArgs {
  waitFor: 'minimal' | 'healthy';  // connection threshold before proceeding
  neighborhood: NbhId;              // required — the neighborhood to join
  bookmarkStorage: BookmarkStorage; // required — resumability interface
  discovery?: Discovery;            // optional — defaults to NeighborhoodDiscovery
  name?: string;                    // optional — client name for logging
  connectionSettings?: Partial<connnectionSettings>; // optional — tuning
}
```

If `discovery` is omitted, DredClient creates a `NeighborhoodDiscovery` from the `neighborhood` name. The constructor immediately starts the state machine (transitions to `default`).

## Methods

### `createChannel(channelName: string, options?: Partial<ChannelOptions>): Promise<{id, status, ocid}>`
Creates a channel. For encrypted channels, call `generateKey()` first — the method auto-signs with the client's identity. Options:

```typescript
interface ChannelOptions {
  encrypted?: boolean;        // enable encryption
  owner?: string;             // auto-set from identity for encrypted
  members?: string[];         // initial member public keys
  allowJoining?: boolean;     // allow new members
  approveJoins?: 'owner' | 'member' | 'open';
  memberLimit?: number;
  expiresAt?: Date;
  messageLifetime?: number;   // ms
  signature?: string;         // auto-set for encrypted
}
```

### `joinChannel(channelName: string): Promise<any>`
Joins an encrypted channel using the client's public key. Requires prior `generateKey()`.

### `addMemberToChannel(channelName: string, memberKeyBase64: string): Promise<any>`
Adds another member to an encrypted channel. Signs the member's key with the client's identity.

### `postMessage(channelName: string, msg: DredMessage): Promise<{id, status, ocid}>`
Posts a message to a channel. **CRITICAL**: `msg.msg` MUST be a string, not a JSON object. The server is message-opaque. An `ocid` is auto-generated if not provided.

```typescript
interface DredMessage {
  type: string;           // message type identifier
  msg: string;            // payload — MUST be string
  'content-type'?: string;
  ocid?: string;          // client-generated dedup ID
}
```

### `subscribeToChannels(listeners: SimpleChannelsListeners): Promise<void>`
Sets channel subscriptions. Two modes:

**Mapped** (per-channel handlers):
```typescript
await client.subscribeToChannels({
  type: 'mapped',
  subs: {
    'room-1': { listener: (msg) => handleMsg(msg), options: { bookmark: '0' } },
    'room-2': { listener: (msg) => handleMsg(msg) }
  }
});
```

**Mass** (single handler for multiple channels):
```typescript
await client.subscribeToChannels({
  type: 'mass',
  channels: ['room-1', 'room-2'],
  massHandler: (msg) => handleMsg(msg)
});
```

### `generateKey(): Promise<void>`
Generates a NaCl signing key pair. Required before encrypted channel operations. No-op if already called.

### `signString(s: string): Promise<string>`
Signs a string with the client's private key. Returns base64-encoded signature. Requires prior `generateKey()`.

### `verifySig(s: string, sigBase64: string, keyBase64: string): Promise<boolean>`
Verifies a signature against a public key.

### `setNeighborhood(n: NbhId): void`
Changes the neighborhood. Triggers async state machine transition to `discoveringHosts`.

### `disconnect(): void`
Disconnects from all hosts via ConnectionManager.

### `once<E>(eventName: E): Promise<payload>`
Promise wrapper for waiting on a single event occurrence. Resolves with the event payload.

## Discovery

### StaticHostDiscovery (dev/testing)
```typescript
import { StaticHostDiscovery } from '@cardano-after-dark/dred-client';

// Default: connects to DRED_HOST:DRED_PORT or 127.0.0.1:3029
const discovery = new StaticHostDiscovery({});

// Custom hosts:
const discovery = new StaticHostDiscovery({
  hosts: [
    { serverId: 'dev-1', address: '127.0.0.1', port: 3029, insecure: true },
    { serverId: 'dev-2', address: '127.0.0.1', port: 3030, insecure: true }
  ]
});
```

### NeighborhoodDiscovery (production)
Created automatically when `discovery` arg is omitted and `neighborhood` is provided. Reads node registration data from the Cardano on-chain registry via Blockfrost.

## BookmarkStorage

Required in `DredClientArgs`. Interface for message position resumability:

```typescript
interface BookmarkStorage {
  getBookmark(channel: ChanId): Promise<string>;
  setBookmark(channel: ChanId, bookmark: string): Promise<void>;
}
```

**No-op implementation** (always returns `"0"`, discards writes) — use for dev/testing when resumability isn't needed:
```typescript
const noBookmarks: BookmarkStorage = {
  getBookmark: async () => '0',
  setBookmark: async () => {},
};
```

Note: `NoBookmarkMemory` exists in the server package (`src/server/NoBookmarkMemory.ts`) but is not exported from the client package. Use the inline form above.
