# DredClient Integration Patterns

> Working patterns derived from source code and the sample app (`sampleApp/src/ChatApp.tsx`).

## Dev Setup (minimal)

```typescript
import {
  DredClient, StaticHostDiscovery,
  type FullDredMessage, type eventHasChannels
} from '@cardano-after-dark/dred-client';

const noBookmarks = { getBookmark: async () => '0', setBookmark: async () => {} };

const client = new DredClient({
  discovery: new StaticHostDiscovery({}), // localhost:3029 by default
  neighborhood: 'my-app-dev',
  waitFor: 'minimal',
  bookmarkStorage: noBookmarks,
  name: 'dev-client',
});

// Wait for channels to be discovered
client.events.on('hasChannels', ({ channels }: eventHasChannels) => {
  console.log('Channels:', channels);
});

// Monitor state progression
client.events.on('state:changed', ({ status }) => {
  console.log('Client state:', status);
});

// Handle errors
client.events.on('error', ({ message, recommendation }) => {
  console.error(message);
  // Show recommendation to user if present
});
```

## Channel Subscription — Mapped (per-channel handlers)

```typescript
await client.subscribeToChannels({
  type: 'mapped',
  subs: {
    'game-room': {
      listener: (msg: FullDredMessage) => {
        console.log(`[${msg.type}] ${msg.channel}:`, msg.msg);
      },
      options: { bookmark: '0' } // start from beginning
    }
  }
});
```

## Channel Subscription — Mass (one handler, many channels)

```typescript
await client.subscribeToChannels({
  type: 'mass',
  channels: ['room-1', 'room-2', 'room-3'],
  massHandler: (msg: FullDredMessage) => {
    switch (msg.channel) {
      case 'room-1': handleRoom1(msg); break;
      default: handleGeneric(msg);
    }
  }
});
```

## Posting Messages

```typescript
// msg MUST be a string — stringify JSON payloads
await client.postMessage('game-room', {
  type: 'player-action',
  msg: JSON.stringify({ player: 'alice', action: 'bet', amount: 100 }),
  'content-type': 'application/json',
});

// Binary data: base64-encode it
import util from 'tweetnacl-util';
const encoded = util.encodeBase64(new Uint8Array(arrayBuffer));
await client.postMessage('voice-channel', {
  type: 'audio',
  msg: encoded,
  'content-type': 'audio/webm',
});
```

## Creating Channels

```typescript
// Unencrypted channel
await client.createChannel('public-chat');

// With options
await client.createChannel('timed-room', {
  encrypted: false,
  expiresAt: new Date(Date.now() + 3600_000), // 1 hour
  messageLifetime: 60_000, // 60s message TTL
});
```

## Encrypted Channel Flow

```typescript
// 1. Generate keys (once per client session)
await client.generateKey();

// 2. Create encrypted channel
await client.createChannel('private-room', {
  encrypted: true,
  allowJoining: true,
  approveJoins: 'owner',
  memberLimit: 10,
});

// 3. Other clients join
await otherClient.generateKey();
await otherClient.joinChannel('private-room');

// 4. Owner can add members directly
await client.addMemberToChannel('private-room', otherPubKeyBase64);

// NOTE: postEncrypted() is not yet implemented.
// Messages in encrypted channels currently use postMessage() with plain text.
```

## Error Handling

```typescript
// Event-based errors (protocol, connection)
client.events.on('error', ({ reason, message, recommendation }) => {
  showError(message);
  if (recommendation) showSuggestion(recommendation);
});

// Method-level errors (async)
try {
  await client.postMessage('room', { type: 'chat', msg: 'hello' });
} catch (err) {
  // Server rejected the message
  console.error('Post failed:', err.message);
}

try {
  await client.createChannel('room');
} catch (err) {
  // Channel creation failed (e.g., missing key for encrypted)
  console.error('Create failed:', err.message);
}
```

## New Channel Discovery

```typescript
// Watch for channels created by other clients
client.events.on('channel:created', ({ channel, options, nbh }) => {
  console.log(`New channel: ${channel}`, options);
  // Optionally auto-subscribe
});
```

## Custom Host Configuration

```typescript
// Multiple dev servers
const discovery = new StaticHostDiscovery({
  hosts: [
    { serverId: 'srv-1', address: '192.168.1.10', port: 3029, insecure: true },
    { serverId: 'srv-2', address: '192.168.1.11', port: 3029, insecure: true },
  ]
});

const client = new DredClient({
  discovery,
  neighborhood: 'my-app',
  waitFor: 'healthy', // wait for both connections
  bookmarkStorage: noBookmarks,
});
```
