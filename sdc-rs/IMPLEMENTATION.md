# sdc-rs Implementation

A Rust client library for DRED (Decentralized Redis State Channels),
implementing a pragmatic subset of the TypeScript `dred-client`:
channel subscription, message posting, channel management, Ed25519
ownership signing, and reliable reconnection.

## What it does

`sdc-rs` connects to a DRED server's NDJSON streaming endpoint, subscribes
to named channels, deduplicates messages by their `ocid` field, and
delivers them to per-channel async receivers. It posts messages (with
echo suppression via pre-dedup), lists and creates channels (plaintext
or encrypted with Ed25519 ownership proofs), and rotates connections
gracefully when the subscribed channel set changes. Connection failures,
server heartbeat monitoring, and exponential backoff are handled
transparently.

## Architecture

The library is structured around three primary types:

**`DredClient`** -- owns shared state (base_url, client_id, reqwest::Client,
Deduplicator, CancellationToken). Provides request/response methods
(`post_message`, `list_channels`, `create_channel`) and creates
subscriptions via `subscribe(channels)`.

**`DredSubscription`** -- returned from `client.subscribe()`. Owns the
streaming listener task and exposes per-channel receivers. Supports
`update_channels()` for rotation without losing messages.

**`DredListener`** -- internal streaming listener. Maintains the persistent
connection to `/channels/listen`, parses NDJSON, deduplicates, and routes
to per-channel senders.

```
DredClient::builder(url)      DredClient                  DredSubscription
    .build()              -->   .subscribe(...)   -->    .take_receiver(ch)
                                (returns Sub)             .update_channels(new)
                                .post_message(...)        .cancellation_token()
                                .list_channels()
                                .create_channel(...)
```

### Key components

- **`DredClient`** -- builder pattern for configuration; holds shared
  connection pool and deduplicator. Cloneable (`Arc`-backed) so it can be
  passed between tasks.

- **`DredSubscription`** -- owns the listener task (auto-cancelled on drop).
  Provides `take_receiver(channel)` for per-channel message streams.
  Calling `update_channels(new)` spins up a new listener with the new
  channel set, waits for it to connect, and only then cancels the old
  listener. Both connections briefly coexist and route through the same
  deduplicator, so no message is lost or duplicated across the rotation.
  Receivers for channels present in both old and new lists are preserved.

- **`DredListener`** -- internal streaming listener. Each has its own
  child `CancellationToken` — cancel it to stop just that listener.
  Holds an optional `connected_signal` oneshot that fires on first
  parsed message, used by `DredSubscription::update_channels` to
  sequence rotation.

- **`Deduplicator`** -- two-generation rotating `HashSet` keyed on `ocid`. Rotates
  every 30 seconds: current generation becomes previous, previous is dropped. This
  bounds memory to a 30-60s window while catching duplicates across reconnections.
  Shared via `Arc<Mutex<_>>` with poison recovery so a panic on another thread
  doesn't brick the dedup state.

- **`DredMessage`** -- serde-based deserialization of the NDJSON wire format.
  Known fields (`mid`, `channel`, `type`, `nbh`, `msg`, `ocid`) are typed;
  everything else lands in `extra` via `#[serde(flatten)]`.

- **`DredError`** -- enumerated error type (`Send + Sync + 'static`) with
  variants for transport failures, server status codes, protocol errors,
  stream termination, and cancellation.

- **`Identity`** -- Ed25519 signing keypair for channel-ownership proofs.
  Wraps dryoc's `crypto_sign_detached` / `crypto_sign_verify_detached`.
  Wire format matches the TS client's `StringNacl`: base64-encoded
  64-byte detached signatures over the UTF-8 bytes of the signed string.
  Used by `create_encrypted_channel(name, identity, options)` which signs
  the channel name and sends `owner` (pubkey b64) + `signature` (sig b64)
  in the channel creation body.

### Connection lifecycle

1. POST to `/channels/listen` with JSON subscription list and `clientid` header
2. Parse the `heartbeat-info` first message to learn the heartbeat interval
3. Stream NDJSON lines, routing each to the appropriate channel receiver
4. If no heartbeat arrives within 3x the interval, declare the connection dead
5. On any disconnection, reconnect with exponential backoff (500ms to 30s)
6. If the connection was alive longer than `backoff_max`, reset backoff on failure

### Per-channel routing

`build()` returns a `HashMap<String, mpsc::Receiver<DredMessage>>` with one
receiver per subscribed channel. Messages are routed by their `channel` field.
Heartbeats and heartbeat-info messages are consumed internally and never
forwarded. Dropping an individual channel's receiver does not affect other
channels.

### ID generation

Client IDs use 10-character nanoids with a lowercase Crockford Base32 alphabet
(`0123456789abcdefghjkmnpqrstvwxyz` -- excludes i, l, o, u to avoid visual
ambiguity).

## Protocol reference

Derived from the DRED server and TypeScript client implementations in this
repository:

**Streaming subscription** (`src/server/DredServer.ts:225`)
- **Endpoint**: `POST /channels/listen`
- **Request body**: `[{"channel": "name", "options": {"bookmark": "$"}}]`
- **Response**: chunked NDJSON (`Content-Type: application/ndjson`)
- **Wire format**: `{"mid", "channel", "type", "nbh", "msg", "ocid", ...}`
- **Heartbeat**: server sends `{"type":"heartbeat-info","timerInterval":7000}`
  at connection start, then periodic `{"type":"heartbeat"}` messages
- **Dedup key**: `ocid` field (original client ID), per server requirement
  `REQT-p5c4tcz2r7` (composite `channel/ocid` on the server side)
- **Client dedup**: two-generation rotating set, matching the TypeScript
  `ChannelSubscriptionListener` pattern (`src/types/ChannelSubscriptions.ts:175`)

**Message posting** (`src/server/DredServer.ts:208`)
- **Endpoint**: `POST /channel/{channelId}/message`
- **Request body**: `{"msg": "...", "type": "...", "ocid": "..."}`
- **Response**: `{"id": "<stream-id>", "status": "created", "ocid": "..."}`
- **Echo suppression**: client pre-registers the `ocid` in its deduplicator
  before posting, so the message doesn't round-trip back to the sender

**Channel management** (`src/server/DredServer.ts:202, 211`)
- **List**: `GET /channels` → `{"channels": [...]}` (public channels only)
- **Create**: `POST /channel/{name}` with options body → `{"id", "status": "created", ...}`
- **Encrypted create**: same endpoint with `{encrypted: true, owner, signature, ...}`
  where `signature = sign_detached(channel_name, owner_sk)` (base64), and the
  server verifies `signature` against `owner` pubkey before accepting

## Test coverage

### Unit tests (29)

| Area | Tests |
|------|-------|
| Deduplicator | basic insert/duplicate, rotation drops old generation, empty/len, shared across clones, survives poisoned mutex |
| DredMessage | full deserialization, minimal (heartbeat), extra fields, roundtrip serialize |
| DredError | display formatting |
| Auto-traits | `Send + Sync` for `DredError`, `Deduplicator`, `DredMessage`, `DredClient`, `Identity` |
| ID generation | Crockford alphabet compliance, excluded letters never appear |
| Client | shares dedup across listeners, clone shares state |
| Subscription | cancels on drop, cancellation stops listener, take_receiver behavior, update_channels fails on unreachable server |
| Identity | sign/verify roundtrip, rejects wrong string, rejects wrong pubkey, rejects garbage b64, from_base64 roundtrip, rejects wrong length |

### Integration tests (16, against live DRED server)

| Test | What it verifies |
|------|-----------------|
| `connects_and_receives_messages` | POST a message, receive it on the channel receiver |
| `deduplicates_across_reconnections` | Shared dedup across two listener instances filters replayed messages |
| `cancellation_stops_listener` | `CancellationToken` causes `run()` to return promptly |
| `per_channel_routing` | Messages arrive only on their channel's receiver, not others |
| `multiple_subscriptions_share_dedup` | Two subscriptions on same channel share dedup; exactly one receives each ocid |
| `post_message_returns_id` | Server returns `{id, status, ocid}` on successful post |
| `post_message_with_explicit_ocid` | Provided ocid is preserved through the round-trip |
| `post_message_echo_suppressed` | Pre-dedup suppresses own posted messages from the sender's listener |
| `list_channels_returns_channels` | GET /channels returns public channels, excludes `_` prefixed |
| `create_channel_then_post_and_receive` | Create → list → subscribe → post end-to-end |
| `create_channel_duplicate_fails` | Creating an existing channel returns an error |
| `create_channel_rejects_encrypted_opts_without_identity` | Plaintext create rejects encrypted=true, directs to create_encrypted_channel |
| `create_encrypted_channel_with_signed_identity` | End-to-end: sign channel name, server verifies, channel created |
| `create_encrypted_channel_rejects_bad_signature` | Server rejects signature made with wrong private key |
| `update_channels_adds_channel_without_losing_existing` | Rotation adds new channel while preserving existing receiver |
| `update_channels_removes_channel` | Rotation removes a channel; remaining channel still receives |

## Dependencies

| Crate | Purpose |
|-------|---------|
| `reqwest` (stream, json) | HTTP client with streaming response support |
| `tokio` (full) | Async runtime |
| `tokio-util` | `CancellationToken` for clean shutdown |
| `serde`, `serde_json` | NDJSON serialization/deserialization |
| `futures` | `StreamExt` for byte stream consumption |
| `tracing`, `tracing-subscriber` | Structured logging |
| `nanoid` | Crockford Base32 ID generation |
| `dryoc` | NaCl-compatible Ed25519 sign/verify (wraps libsodium primitives) |
| `base64` | Base64 encoding for signatures and public keys |

## Design decisions

**Per-channel `mpsc` over single channel or callbacks.** Callbacks (`impl Fn`)
block async consumers from doing async work in the handler. A single mpsc forces
consumers to re-dispatch by channel themselves. Per-channel receivers give each
consumer exactly the stream they need with no routing overhead on their side.

**Two-generation dedup over unbounded HashSet.** Matches the TypeScript client's
approach. Without rotation, the set grows without bound for long-running
connections. The 30-60s window is sufficient because DRED's server-side dedup
(Redis Set) is the authoritative guard; client-side dedup is a performance
optimization to avoid redundant processing.

**Heartbeat watchdog over TCP keepalive.** TCP keepalive detects dead peers but
on a timescale of minutes. The DRED server sends heartbeats every ~7 seconds;
detecting a miss within 21 seconds catches half-open connections much faster
than relying on the OS network stack.

**Poison-safe mutex.** The deduplicator is shared across reconnections and
potentially across threads. A panic while holding the lock (e.g., in a
callback during testing) would poison the mutex and brick all future dedup
checks. `unwrap_or_else(PoisonError::into_inner)` recovers the data and
continues operating.

## Credits

### Skills

The implementation was shaped by skills from the EIDOS Advanced Skills library:

- **Architect (archie)** -- `skillz/architect/architect.SKILL.md`. The DRED
  architecture in `dred.arch.jsonl` was authored and maintained using this skill's
  structured discovery process. The 84-record architecture file -- with its
  component definitions, interactions, dataflows, and concerns -- gave us the
  system map that made a targeted Rust reimplementation feasible without
  reverse-engineering from source.

- **Code Whisperer (cwispy)** -- `skillz/code-whisperer/code-whisperer.SKILL.md`.
  Structural quality review guided the evolution from quick-hack free functions
  to a production-shaped library: API shape (builder struct), error type design
  (`Send + Sync`), callback vs channel output, cancellation strategy, and
  separation of concerns between transport, parsing, and routing.

- **Rust Coder (crusty)** -- `skillz/rust-coder/rust-coder.SKILL.md`. Rust
  domain expertise distilled from the Rust for Rustaceans bookworm extraction.
  Guided ownership patterns, async/concurrency primitive selection (`sync::Mutex`
  for brief holds, `mpsc` for async delivery, `CancellationToken` over ad-hoc
  signaling), `Send + Sync` auto-trait verification, poison recovery strategy,
  and error type design conventions.

- **REQM (rex)** -- `skillz/reqm/reqm.SKILL.md`. The formal requirements files
  (`*.reqts.jsonl`, `*.reqts.md`) that provided precise protocol specifications
  were authored under REQM conventions. Requirements like `REQT-p5c4tcz2r7`
  (dedup key format) and `REQT-hfmveq25qc` (NDJSON message format) gave us
  exact wire-format specs rather than having to infer them from code.

### Tools

- **Claude Code** -- Anthropic's CLI coding agent (Claude Opus 4.6, 1M context).
  The implementation was developed across two interactive Claude Code sessions:
  codebase exploration, protocol analysis, code generation, iterative review
  with loaded skills (Architect, Code Whisperer, Rust Coder, REQM), test
  authoring, and integration testing against the live DRED server. Session 2
  was driven entirely via the loaded skills — each API-shape decision was
  proposed in-character by Rust Coder or Code Whisperer before being
  implemented.

### Timeline

**Session 1 — first working client** (April 4 2026, 22:50 - 23:19, ~29 min,
6 commits). NDJSON subscription, two-generation deduplication, heartbeat
watchdog, exponential-backoff reconnection, per-channel routing, nanoid
crockford IDs, unit + integration tests against the live server, and the
first pass of this document.

**Session 2 — production shaping** (April 4 2026 23:37 - April 5 00:13,
~36 min, 5 commits). Extracted `DredClient` from `DredListener` (shared
`Arc`-backed state, child cancellation tokens per listener), aligned the
API with the TS client (`subscribe` / `post_message` / `list_channels`
/ `create_channel`), added connection rotation via `DredSubscription`
with graceful old→new handoff (new connects before old cancels, both
routing through the same dedup so no messages are lost), and Ed25519
signing via `dryoc` for encrypted channel ownership proofs — verified
end-to-end against the TS server's `StringNacl` verifier.

Total across both sessions: **~65 minutes, 11 commits, 47 tests** (29 unit
+ 16 integration + 2 doc-tests, all passing against a live DRED server).

The speed was only possible because of prior investment in structured
system documentation:

**Architecture discovery** -- March 28, 2026, 15:08 - 16:19 (~71 minutes).
A single focused session using the Architect skill produced 84 structured
records in `dred.arch.jsonl`: components, interactions, dataflows, concerns,
tools, and diagrams covering the full DRED system.

**Requirements capture** -- March 28-30, 2026 (~2 days, multiple sessions).
216 formal requirements across 4 subsystems, still in progress (untracked):

| File | Records | Created |
|------|---------|---------|
| `src/client/client.reqts.jsonl` | 62 | March 28, 23:39 |
| `src/discovery.reqts.jsonl` | 43 | March 30, 09:43 |
| `src/server.reqts.jsonl` | 57 | March 30, 09:52 |
| `src/server-replication.reqts.jsonl` | 54 | March 30, 11:13 |

The architecture file provided the system map (which components exist, what
they own, how they interact). The requirements files provided exact protocol
specs (wire format fields, dedup key composition, endpoint contracts). Together
they made it possible to ship a production-shaped Rust client in roughly an
hour of work that would otherwise have required hours of source-code
archaeology across a TypeScript codebase the author had never worked in.

Session 2 also benefited from loading the **Code Whisperer** and **Rust
Coder** skills as review lenses: they surfaced the API-shape issues in the
session-1 lib (free functions with too many parameters, callback-based
output blocking async consumers, `Box<dyn Error>` not being `Send`) before
any of that code had to be rewritten under production pressure.

### Source material

The system understanding began with the DRED architecture documentation:
- `dred.arch.jsonl` (84 records) -- the structured architecture provided the
  component map that oriented the entire effort: DredServer's responsibilities
  (message relay, deduplication via `ensureMessageProcessedOnce`, channel
  management), DredClient's role (multi-host connection management, subscription
  lifecycle), HostConnection (persistent NDJSON stream, heartbeat watchdog,
  reconnection with exponential backoff), ConnectionManager (host selection,
  failure detection), and the Deduplicator's two-generation rotating set design.
  Without this, we would have been reverse-engineering from scattered source
  files instead of working from a coherent system description.

Protocol details and implementation patterns were then confirmed against the
TypeScript codebase:
- `src/server/DredServer.ts` -- server endpoint, NDJSON format, heartbeat protocol
- `src/client/HostConnection.ts` -- connection lifecycle, reconnection pattern
- `src/types/ChannelSubscriptions.ts` -- deduplication algorithm, subscription types

Formal requirements provided precise specifications:
- `src/server.reqts.jsonl` -- dedup key format (`channel/ocid`), NDJSON message
  format (`{mid, channel, type, nbh, msg, ocid}`), streaming endpoint contract
- `src/client/client.reqts.jsonl` -- NDJSON stream connection, named listeners,
  mass listeners
- `src/server-replication.reqts.jsonl` -- composite dedup key confirmation,
  replication metadata fields
