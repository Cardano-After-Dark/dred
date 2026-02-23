# DredClient Skill — Discovery Summary

*Interview in progress*

---

## Phase 1: Context & Need

### Purpose
This skill guides an AI agent building **applications that use the DredClient library** — dApps that communicate over the DRED decentralized messaging network.

### Problem
Without this skill, an agent must reverse-engineer the DredClient API from source code and architecture docs. Key risks:
- Missing the state machine lifecycle (default → discoveringHosts → discoveringChannels → ready)
- Incorrect event handling patterns (typed EventEmitters, connection health states)
- Misunderstanding the crypto layer (NaCl key generation, channel signing)
- Not following the NDJSON streaming subscription model correctly

### Target Users
AI coding agents building web applications (browser-first) that use DredClient. The library is isomorphic (browser + Node.js via Rollup dual builds), but the primary focus is web platform usage.

### Existing Workarounds
Without this skill, agents read ARCHITECTURE.md then dig through source (DredClient.ts, ConnectionManager.ts, etc.) and the sample app ("Dred Communicator") to figure out API usage. Error-prone and time-consuming.

### Platform Note
Browser-first, but DredClient is isomorphic. The skill MUST show how to import for browser and for Node.js, but otherwise focuses on web platform usage.

### Success Criteria
An agent unfamiliar with DRED can read this skill and correctly wire up a DredClient — connecting to a neighborhood, subscribing to channels, handling messages via events, managing the state machine lifecycle — without needing to read source code. The agent produces code that handles connection health states and works with (not against) the event-driven architecture.

---

## Phase 2: Persona & Authority

### Persona
Lightweight — more practical API reference than personality. The expertise is "someone who deeply understands the DredClient library and its event-driven, state-machine architecture." Not a distributed systems theorist; the person who's built several apps on DRED and knows the pitfalls.

### Tone
Reference-style. Direct, concise, code-heavy. Guide by showing correct patterns rather than explaining philosophy.

### Boundaries
Guides API usage and integration patterns. Does not make app-level architectural decisions (e.g. which framework to use, how to structure the app). Defers on anything outside the DredClient surface area.

### Key Principles
- Respect the state machine lifecycle — don't skip states
- Event-driven: subscribe to events, don't poll
- Connection health is managed for you — work with the ConnectionManager's states
- Crypto is built in — use the provided key generation and signing

---

## Phase 3: Capabilities & Constraints

### Core Activities
1. **Setup & Import** — browser (`@cardano-after-dark/dred-client`) vs Node (`@cardano-after-dark/dred-client/node`)
2. **Discovery configuration** — `StaticHostDiscovery` for dev, `NeighborhoodDiscovery` for production
3. **Client lifecycle** — instantiation with `DredClientArgs`, state machine (default → discoveringHosts → discoveringChannels → ready)
4. **Channel operations** — `createChannel()`, `joinChannel()`, `addMemberToChannel()`, channel listing via events
5. **Messaging** — `postMessage()` with `{type, msg, ocid}` (msg MUST be string), `subscribeToChannels()` with mapped or mass listeners
6. **Events** — `hasChannels`, `channel:created`, `state:changed`, `needsNeighborhood`, `error`
7. **Crypto** — `generateKey()`, `signString()`, `verifySig()`, encrypted channel creation with owner/signature
8. **Connection health** — healthy/degraded/disconnected states; `connect:minimal` event for partial connectivity
9. **BookmarkStorage** — pluggable interface for resumability (`getBookmark`/`setBookmark`)

### Key API Observations (from source code review)
- `DredClientArgs` requires: `waitFor`, `neighborhood`, `bookmarkStorage`; optional: `discovery`, `name`, `connectionSettings`
- `msg` field MUST be a string — not JSON objects (server is message-opaque)
- `subscribeToChannels()` accepts `SimpleChannelsListeners` which can be `type: "mapped"` (per-channel) or `type: "mass"` (all channels one handler)
- `NoBookmarkMemory` is available as a no-op bookmark implementation
- `postMessage()` auto-generates `ocid` if not provided
- Exported from index: `DredClient`, `StaticHostDiscovery`, `NeighborhoodDiscovery`, key types

### Out of Scope
- Server-side implementation (DredServer, Redis layer)
- Replication internals (DredReplicator, Replicant)
- On-chain node registry / smart contracts
- KeyExchanger / message encryption (not yet integrated per architecture audit)

### Dependencies
- No dependency on other skills
- References ARCHITECTURE.md for deeper architectural context

### Factoring Plan
- `dred-client.SKILL.md` — main skill file, lightweight, references sub-docs
- `reference/api.md` — API reference built from source code (accurate, unlike docs/ version)
- `reference/events.md` — event catalog with types and when they fire
- `reference/patterns.md` — integration patterns (setup, subscribe, post, encrypted channels)

---

## Phase 4: Workflow & Interaction

### Typical Invocation
Agent is building a web app that needs real-time messaging. Loads this skill when wiring up DredClient for the first time or modifying messaging behavior.

### Primary Workflow
1. Import DredClient + Discovery + BookmarkStorage
2. Create discovery (StaticHostDiscovery for dev, NeighborhoodDiscovery for prod)
3. Instantiate DredClient with neighborhood, waitFor, bookmarkStorage, discovery
4. Listen for events (hasChannels, state:changed, error)
5. Create or discover channels
6. Subscribe to channels with listener map or mass handler
7. Post messages (msg MUST be string)
8. For encrypted channels: generateKey() first, then createChannel with encrypted options

---

## Phase 5: Integration & Validation

### Relationship to Other Skills
- Standalone; no dependency on other skills in the ecosystem
- ARCHITECTURE.md is a companion reference for deeper system understanding

### Interview Opportunity
Not needed — this is a reference/API skill, not a discovery-facilitating skill.

### Audit Opportunity
Not needed at this time — this skill doesn't enforce conventions on artifacts or produce specs that code must satisfy. It's a reference guide.

### Verification Criteria
- Agent produces code that compiles and uses the real API surface (not the fictional docs/ version)
- State machine lifecycle is respected (no calling channel ops before ready state)
- Events are wired up correctly with proper typed handlers
- msg field is always a string
- bookmarkStorage is always provided

---

## Discovery Complete

Checkpoint: `skill-crafter.interview: complete`

Proceeding to Step 1: Analyze & Require.

