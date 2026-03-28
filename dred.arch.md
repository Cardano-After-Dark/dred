
# DRED - Architecture

> **🏗️ ARCHITECTURE TRIGGER: READ THIS FIRST**
>
> This architecture document is strictly managed. Before interpreting, implementing, or discussing architectural decisions, you **MUST** read and apply the **Architecture Consumer Skill** at:
>
> `architect/architect-consumer.SKILL.md`
>
> **CRITICAL**: You are **FORBIDDEN** from modifying this file or making architectural changes until you have ingested the "Read-Only" constraints and "Escalation Protocol" defined in that skill.
> NOTE: If you've already studied the full Architect skill (`architect/architect.SKILL.md`), you don't need the consumer skill.



**Maturity**:

- draft: 8/8

## Components and Concerns



- [Discovery](#discovery-arch-56nvf2nfc3) (local): Pluggable host discovery — bridges on-chain registry to runtime
- [Docs Site](#docs-site-arch-ev6tt1ct8q) (external): Next.js static documentation site on GitHub Pages
- [DRED](#dred-arch-ar4skk7d55) (remote): Decentralized Redis State Channels — a distributed real-time messaging system for Cardano dApps, providing shared communication channels served by a decentralized network of nodes.
- [DredClient](#dredclient-arch-yjznx2s7w1) (local): State-machine client library for dApps — discovery, connection management, channel ops, crypto, events
- [DredServer](#dredserver-arch-ahm6njveq4) (remote): Node process — Express HTTP + Redis Streams message relay, channel management, deduplication, replication
- [On-chain Node Registry](#on-chain-node-registry-arch-6hkc6h0c0s) (external): Smart contracts for node/neighborhood registration and protocol settings on Cardano L1



## Components

<a id="discovery-arch-56nvf2nfc3"></a>

### Component: Discovery (local; draft - ARCH-56nvf2nfc3)

Pluggable host discovery — bridges on-chain registry to runtime

**Activities**:

- Provide getHostList(), getNeighborhoods(), getConnectionThresholds()
- Emit hosts:updated events when host list changes
- Bridge on-chain registry data to runtime host lists


**Concerns and Responsibilities**:
- **Responsibility**: Resolve and maintain current host list from configured source
- **Responsibility**: Notify consumers when host availability changes
- **Responsibility**: Support both StaticHostDiscovery (dev/testing) and NeighborhoodDiscovery (production via Blockfrost)




---

<a id="docs-site-arch-ev6tt1ct8q"></a>

### Component: Docs Site (external; draft - ARCH-ev6tt1ct8q)

Next.js static documentation site on GitHub Pages

**Activities**:

- Present conceptual documentation and architecture guides
- Publish blog posts
- Build from Markdoc/MDX source to static HTML via Next.js


**Concerns and Responsibilities**:
- **Responsibility**: Maintain up-to-date documentation for all DRED components and APIs




---

<a id="dred-arch-ar4skk7d55"></a>

### Component: DRED (remote; draft - ARCH-ar4skk7d55)

Decentralized Redis State Channels — a distributed real-time messaging system for Cardano dApps, providing shared communication channels served by a decentralized network of nodes.

**Activities**:

- Relay real-time messages between clients through decentralized node network
- Manage encrypted communication channels with NaCl crypto
- Replicate state across peer nodes for availability and partition tolerance


**Concerns and Responsibilities**:
- **Responsibility**: Guarantee message delivery to all connected subscribers via NDJSON streaming
- **Responsibility**: Prevent duplicate message processing across direct posts and replication
- **Responsibility**: Maintain decentralized node membership through on-chain registry
- **Responsibility**: Provide pluggable discovery so clients find nodes without central authority
- **Responsibility**: Enforce channel ownership and membership authorization via cryptographic signatures




---

<a id="dredclient-arch-yjznx2s7w1"></a>

### Component: DredClient (local; draft - ARCH-yjznx2s7w1)

State-machine client library for dApps — discovery, connection management, channel ops, crypto, events

**Activities**:

- Progress through state machine (default → discoveringHosts → discoveringChannels → ready)
- Manage multi-host connections with health monitoring via ConnectionManager
- Provide channel operations (create, join, post, subscribe) with NaCl signing


**Concerns and Responsibilities**:
- **Responsibility**: Maintain connection health state (healthy/degraded/disconnected) across multiple hosts
- **Responsibility**: Generate NaCl key pairs and sign channel names and member IDs
- **Responsibility**: Deduplicate incoming messages client-side via rotating Set pairs (30s rotation)
- **Responsibility**: Emit typed events for application integration (hasChannels, channel:message, state:changed, error)
- **Responsibility**: Abstract Discovery interface so apps work identically with static or on-chain discovery




---

<a id="dredserver-arch-ahm6njveq4"></a>

### Component: DredServer (remote; draft - ARCH-ahm6njveq4)

Node process — Express HTTP + Redis Streams message relay, channel management, deduplication, replication

**Activities**:

- Relay messages between clients via HTTP POST ingestion and NDJSON streaming
- Manage channel lifecycle (create, join, list, expire) with crypto validation
- Coordinate replication to/from peer servers via internal DredReplicator


**Concerns and Responsibilities**:
- **Responsibility**: Guarantee message deduplication via ensureMessageProcessedOnce() with Redis-backed known-messages set
- **Responsibility**: Validate channel ownership signatures before accepting channel creation
- **Responsibility**: Enforce channel membership authorization rules (owner/member/self-join)
- **Responsibility**: Stream heartbeats to connected clients for liveness detection
- **Responsibility**: Publish all accepted messages to Redis Streams for subscriber delivery
- **Responsibility**: Expose admin endpoints for replication status monitoring




---

<a id="on-chain-node-registry-arch-6hkc6h0c0s"></a>

### Component: On-chain Node Registry (external; draft - ARCH-6hkc6h0c0s)

Smart contracts for node/neighborhood registration and protocol settings on Cardano L1

**Activities**:

- Register and update DRED node entries (address, port, public key, heartbeat, stake)
- Register application-specific neighborhoods (groupings of nodes)
- Govern protocol parameters (heartbeat intervals, uptime requirements, registration fees, operator stake)


**Concerns and Responsibilities**:
- **Responsibility**: Maintain authoritative source of registered nodes on Cardano L1
- **Responsibility**: Enforce registration validation via Helios on-chain validators
- **Responsibility**: Store network-wide operational parameters accessible to all nodes




---


### Nested Components

> These components declare a `parentComponent` and should each have a separate architectural breakdown document. The summary here is a placeholder until that breakdown exists.

| Component | Parent | Summary |
|-----------|--------|---------|
| [Discovery](#discovery-arch-56nvf2nfc3) | [DRED](#dred-arch-ar4skk7d55) | Pluggable host discovery — bridges on-chain registry to runtime |
| [Docs Site](#docs-site-arch-ev6tt1ct8q) | [DRED](#dred-arch-ar4skk7d55) | Next.js static documentation site on GitHub Pages |
| [DredClient](#dredclient-arch-yjznx2s7w1) | [DRED](#dred-arch-ar4skk7d55) | State-machine client library for dApps — discovery, connection management, channel ops, crypto, events |
| [DredServer](#dredserver-arch-ahm6njveq4) | [DRED](#dred-arch-ar4skk7d55) | Node process — Express HTTP + Redis Streams message relay, channel management, deduplication, replication |
| [On-chain Node Registry](#on-chain-node-registry-arch-6hkc6h0c0s) | [DRED](#dred-arch-ar4skk7d55) | Smart contracts for node/neighborhood registration and protocol settings on Cardano L1 |



## Actors


External participants who interact with the system:

| ARCH-UUT | Name | Description |
|----------|------|-------------|
| ARCH-ne9hs8j281 | dApp (Consumer Application) | External application consuming DredClient library — browser or Node.js |
| ARCH-6vspekwt20 | Node Operator | Human or automated process that registers and maintains DRED nodes on Cardano L1 |




## Interfaces




## Data Flow




## Design Patterns



## Files



## Collaboration Summary




## Open Questions




## Discovery Notes



