# sdc-rs Implementation

A Rust client library for DRED (Decentralized Redis State Channels), implementing
a pragmatic subset of the TypeScript `dred-client` focused on channel listening,
message deduplication, and reliable reconnection.

## What it does

`sdc-rs` connects to a DRED server's NDJSON streaming endpoint, subscribes to
named channels, deduplicates messages by their `ocid` field, and delivers them
to per-channel async receivers. It handles connection failures, server heartbeat
monitoring, and exponential backoff transparently.

## Architecture

The library is structured around two primary types:

**`DredClient`** -- owns shared state (base_url, client_id, reqwest::Client,
Deduplicator, CancellationToken). Provides request/response methods
(`post_message`, `list_channels`, `create_channel`) and spawns listeners
via `subscribe(channels)`.

**`DredListener`** -- spawned from a `DredClient`, maintains a persistent
streaming connection for the subscribed channels. Runs as an async task.

```
DredClient::builder(url)      DredClient                Per-channel
    .build()              -->   .subscribe(...)  -->  mpsc::Receiver
                                (spawns DredListener)  (one per channel)
                                .post_message(...)
                                .list_channels()
                                .create_channel(...)
```

### Key components

- **`DredClient`** -- builder pattern for configuration; holds shared
  connection pool and deduplicator. Cloneable (`Arc`-backed) so it can be
  passed between tasks.

- **`DredListener`** -- spawned via `client.subscribe(channels)`. Its
  `run()` method handles the connection lifecycle including reconnection.
  Each listener has its own child `CancellationToken` — cancel it to stop
  just that listener; cancel the client's to stop all listeners.

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

## Test coverage

### Unit tests (20)

| Area | Tests |
|------|-------|
| Deduplicator | basic insert/duplicate, rotation drops old generation, empty/len, shared across clones, survives poisoned mutex |
| DredMessage | full deserialization, minimal (heartbeat), extra fields, roundtrip serialize |
| DredError | display formatting |
| Auto-traits | `Send + Sync` assertions for `DredError`, `Deduplicator`, `DredMessage`, `DredClient` |
| ID generation | Crockford alphabet compliance, excluded letters never appear |
| Client | shares dedup across listeners, clone shares state |
| Listener | cancellation before connect, stops when receiver dropped |

### Integration tests (12, against live DRED server)

| Test | What it verifies |
|------|-----------------|
| `connects_and_receives_messages` | POST a message, receive it on the channel receiver |
| `deduplicates_across_reconnections` | Shared dedup across two listener instances filters replayed messages |
| `cancellation_stops_listener` | `CancellationToken` causes `run()` to return promptly |
| `per_channel_routing` | Messages arrive only on their channel's receiver, not others |
| `multiple_listeners_share_dedup` | Two listeners on same channel share dedup; exactly one receives each ocid |
| `post_message_returns_id` | Server returns `{id, status, ocid}` on successful post |
| `post_message_with_explicit_ocid` | Provided ocid is preserved through the round-trip |
| `post_message_echo_suppressed` | Pre-dedup suppresses own posted messages from the sender's listener |
| `list_channels_returns_channels` | GET /channels returns public channels, excludes `_` prefixed |
| `create_channel_then_post_and_receive` | Create → list → subscribe → post end-to-end |
| `create_channel_duplicate_fails` | Creating an existing channel returns an error |
| `create_encrypted_channel_not_supported` | Encrypted channels error until NaCl signing lands |

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

The implementation was shaped by skills from the ODIN skillz library:

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
  The entire implementation was developed interactively in a single Claude Code
  session: codebase exploration, protocol analysis, code generation, iterative
  review with loaded skills, test authoring, and integration testing against the
  live DRED server.

### Timeline

The Rust implementation took **21 minutes** (22:50 - 23:12, April 4 2026),
producing 6 commits across a single session. But that speed was only possible
because of prior investment in structured system documentation:

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
they made it possible to write a working Rust client in 21 minutes that would
otherwise have required hours of source-code archaeology across a TypeScript
codebase the author had never worked in.

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
