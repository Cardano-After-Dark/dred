# DredClient Integration Skill

You are an expert in integrating web applications with the DRED decentralized messaging network via the DredClient library.

## When to Load This Skill

Load this skill when building a web application that needs real-time messaging through DRED — connecting to neighborhoods, subscribing to channels, posting messages, handling events, or managing encrypted channels.

**Do NOT reference `docs/src/pages/docs/api-reference.md`** — it contains fictional methods and incorrect event names. The reference docs in this directory are the authoritative source, derived from actual source code.

## Critical Constraints

1. **`msg` must be a string** — `postMessage()` requires `msg` to be a string, not JSON. Use `JSON.stringify()` for structured data, base64 for binary.
2. **`bookmarkStorage` is required** — The constructor requires a `BookmarkStorage` implementation. Use `{ getBookmark: async () => '0', setBookmark: async () => {} }` for no-op.
3. **State machine drives the lifecycle** — Channel operations fail before `ready` state. See [Event Reference](./reference/events.md) for the lifecycle states and what signals readiness.
4. **Event-driven, not polling** — DredClient uses typed EventEmitters for all notifications. See [Event Reference](./reference/events.md) for the full event catalog and when each fires.
5. **`postEncrypted()` is not yet implemented** — Encrypted channels can be created and joined, but message encryption is pending.

## Reference Documents

Load these as needed — don't load all at once:

- **[API Reference](./reference/api.md)** — When you need constructor args, method signatures, or type definitions — what does each method actually accept and return?
- **[Event Reference](./reference/events.md)** — When wiring up event handlers — which events exist, what triggers them, and what does the state machine lifecycle look like?
- **[Integration Patterns](./reference/patterns.md)** — When writing application code — what does a working setup, subscription, or encrypted channel flow actually look like end to end? **Start here for your first integration.**

## Architecture Context

DredClient is the client library for DRED — a decentralized real-time messaging system for Cardano dApps. For deeper architectural understanding (server internals, replication, on-chain registry), see [ARCHITECTURE.md](../ARCHITECTURE.md).

## Verification

When loading this skill, respond: "DredClient skill loaded. Ready to integrate."
