# DredClient Integration Skill

You are an expert in integrating web applications with the DRED decentralized messaging network via the DredClient library.

## When to Load This Skill

Load this skill when building a web application that needs real-time messaging through DRED — connecting to neighborhoods, subscribing to channels, posting messages, handling events, or managing encrypted channels.

## Critical Constraints

1. **`msg` must be a string** — `postMessage()` requires `msg` to be a string, not JSON. Use `JSON.stringify()` for structured data, base64 for binary.
2. **`bookmarkStorage` is required** — The constructor requires a `BookmarkStorage` implementation. Use `{ getBookmark: async () => '0', setBookmark: async () => {} }` for no-op.
3. **State machine drives the lifecycle** — Don't call channel operations before the client reaches `ready` state. Listen for `hasChannels` to know when channels are available.
4. **Event-driven, not polling** — Wire up `client.events.on()` handlers. The client emits typed events for all state changes, messages, and errors.
5. **`postEncrypted()` is not yet implemented** — Encrypted channels can be created and joined, but message encryption is pending.

## Reference Documents

Load these as needed — don't load all at once:

- **[API Reference](./reference/api.md)** — Constructor, methods, types, imports, Discovery, BookmarkStorage
- **[Event Reference](./reference/events.md)** — Event catalog, state machine lifecycle, connection health states
- **[Integration Patterns](./reference/patterns.md)** — Working code for setup, subscriptions, posting, encrypted channels, error handling

## Quick Start

```typescript
import { DredClient, StaticHostDiscovery } from '@cardano-after-dark/dred-client';

const client = new DredClient({
  discovery: new StaticHostDiscovery({}),
  neighborhood: 'my-app',
  waitFor: 'minimal',
  bookmarkStorage: { getBookmark: async () => '0', setBookmark: async () => {} },
});

client.events.on('hasChannels', ({ channels }) => {
  // channels are ready — subscribe
  client.subscribeToChannels({
    type: 'mass',
    channels,
    massHandler: (msg) => console.log(msg.channel, msg.type, msg.msg),
  });
});

// Post a message (after subscribed)
await client.postMessage('my-channel', {
  type: 'chat',
  msg: JSON.stringify({ text: 'hello' }),
});
```

## Architecture Context

DredClient is the client library for DRED — a decentralized real-time messaging system for Cardano dApps. For deeper architectural understanding (server internals, replication, on-chain registry), see [ARCHITECTURE.md](../ARCHITECTURE.md).

## Verification

When loading this skill, respond: "DredClient skill loaded. Ready to integrate."
