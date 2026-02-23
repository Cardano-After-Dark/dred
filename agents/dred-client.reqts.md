# About DredClient Skill

## MAINTAINERS MUST READ:
> **AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY**
>
> This file is generated from the `.reqts.jsonl` source. To make changes:
> 1. Edit the JSONL source file
> 2. Run `node generate-reqts.mjs` to regenerate
>
> **COMPLIANCE TRIGGER**: Before interpreting these requirements, you **MUST** read:
> `reqt-consumer.SKILL.md`
>
> **hash.notice.reqt-consumer**: 5dddc026e9370dc8

A practical API reference skill for AI coding agents building web applications that use the DredClient library. Guides agents through setup, connection, channel operations, messaging, events, and crypto — producing correct integration code without needing to read source code. Browser-first, with isomorphic (Node.js) import noted.

The essential technologies are **TypeScript, DredClient, EventEmitter, StateMachine**. Related technologies include Redis Streams, NDJSON, TweetNaCl, Cardano.


# Background

Without this skill, an agent must reverse-engineer the DredClient API from source code and architecture docs. The existing docs/api-reference.md has significant inaccuracies: fictional methods (connect(), subscribe()), wrong event names, missing required constructor args. Key risks without the skill include: missing the state machine lifecycle, incorrect event handling, misunderstanding crypto requirements, and producing code that uses a non-existent API surface.



# Design Goals

**General Approach**

- Reference-style, code-heavy guidance over personality or philosophy
- Accurate API surface derived from source code, not from outdated docs
- Factored into focused sub-documents for token efficiency

**Specific Goals**

1. **Correct API Surface**: Document the real DredClient API as it exists in source code
2. **State Machine Clarity**: Make the client lifecycle states and transitions unambiguous
3. **Event Catalog**: Comprehensive typed event reference with when/why each fires
4. **Integration Patterns**: Show complete working patterns for common use cases
5. **Token Efficiency**: Compact format optimized for agent consumption, not human browsing


# Must Read: Special Skills and Know-how

1. **Component relationships, data flows, interfaces, and design decisions**: When needing deeper understanding of the DRED system architecture beyond the client API → load `../ARCHITECTURE.md`

# Collaborators

**NEEDS (this module depends on):**
- `ARCHITECTURE.md`: System architecture context for DredClient's position in the DRED ecosystem


**Expected users:** AI coding agents building web applications with real-time messaging via DRED

# Functional Areas and Key Requirements

### 1. API Reference
Accurate documentation of the DredClient public API surface — constructor, methods, types, and imports.

#### Key Requirements:
1. **API Reference Accuracy**: An agent reading the API reference can trust that every constructor arg, method signature, and type definition matches the real DredClient source code

### 2. Event System
Typed event catalog covering client events, connection manager events, and event wiring patterns.

#### Key Requirements:
1. **Event System Coverage**: An agent can look up any DredClient event and know its exact name, payload type, when it fires, and what action to take in response

### 3. Integration Patterns
Working code patterns for common use cases: setup, subscribe, post, encrypted channels, connection health handling.

#### Key Requirements:
1. **Integration Patterns**: An agent can copy a working pattern for any common scenario — dev setup, channel subscription, message posting, encrypted channels — and adapt it to its application

### 4. Skill Structure
How the skill itself is organized — SKILL.md, reference sub-documents, and their relationships.

#### Key Requirements:
1. **Skill Structure and Token Efficiency**: The skill loads quickly in an agent's context window, with focused sub-documents that can be loaded on demand rather than all at once


# Detailed Requirements

## Area 1: API Reference

### **REQT-1.0/s5mtz2k625**: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **API Reference Accuracy**
#### Purpose: Ensures the documented API matches the actual source code. Applied when writing or reviewing any DredClient integration code, or when verifying reference materials against the codebase.

 - 1.0.1: REQT-88jyz67qa4: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Constructor Documentation** - MUST document DredClientArgs with all required fields (waitFor, neighborhood, bookmarkStorage) and optional fields (discovery, name, connectionSettings). MUST NOT show fictional args.
 - 1.0.2: REQT-2mzmbtr7vz: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Method Documentation** - MUST document only methods that exist on DredClient: createChannel(), joinChannel(), addMemberToChannel(), postMessage(), subscribeToChannels(), generateKey(), signString(), verifySig(), setNeighborhood(), disconnect(), once(). MUST NOT document fictional methods (connect(), subscribe(), unsubscribe(), getMessages(), leaveChannel()).
 - 1.0.3: REQT-weedpdrvq7: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Import Paths** - MUST show browser import (`@cardano-after-dark/dred-client`) and Node.js import (`@cardano-after-dark/dred-client/node`). MUST document exported symbols from index.ts: DredClient, StaticHostDiscovery, NeighborhoodDiscovery, and key types.
 - 1.0.4: REQT-hhtr74rzd3: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Message Constraint** - MUST prominently document that the msg field in postMessage() MUST be a string, not a JSON object. The server is message-opaque and enforces string-only payloads.
 - 1.0.5: REQT-xt25km50xr: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Discovery Documentation** - MUST document StaticHostDiscovery (dev/testing, with defaultHosts() and custom hosts) and NeighborhoodDiscovery (production, reads on-chain registry). MUST show how DredClient resolves discovery from args.
 - 1.0.6: REQT-bvhjpqasf4: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **BookmarkStorage Documentation** - MUST document the BookmarkStorage interface (getBookmark, setBookmark) and the NoBookmarkMemory no-op implementation. MUST note that bookmarkStorage is required in DredClientArgs.

## Area 2: Event System

### **REQT-2.0/zjv3t9v2gd**: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Event System Coverage**
#### Purpose: Ensures agents understand the typed event system that drives DredClient interaction. Applied when wiring up event handlers or debugging event flow in application code.

 - 2.0.1: REQT-0pcj3ev0d7: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Client Events** - MUST document all ClientEvents: needsNeighborhood, hasChannels, needsAuth, channel:created, channel:removed, state:changed, channel:message, error. Each event MUST include its payload type and when it fires.
 - 2.0.2: REQT-w1g9jebhev: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **State Machine Lifecycle** - MUST document the client state machine states (default, findingNbhs, selectingNbh, discoveringHosts, discoveringChannels, ready) and transitions. MUST show how state:changed events map to lifecycle progression.
 - 2.0.3: REQT-barh01d76k: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Connection Health Events** - MUST document ConnectionManager health states (connecting, partiallyConnected, healthy, degraded, disconnected) and their corresponding events (connecting, connect:minimal, connected, disconnected). MUST explain what each state means for the application.

## Area 3: Integration Patterns

### **REQT-3.0/ee3v4py1cf**: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Integration Patterns**
#### Purpose: Provides ready-to-use code patterns for common DredClient integration scenarios. Applied when an agent is writing application code that uses DredClient, or when reviewing existing integrations for correctness.

 - 3.0.1: REQT-0dhjg3j3ny: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Dev Setup Pattern** - MUST provide a complete dev setup pattern using StaticHostDiscovery, NoBookmarkMemory, and minimal configuration. MUST show the full sequence from import through ready state.
 - 3.0.2: REQT-jmj86a1da5: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Channel Subscription Patterns** - MUST show both subscription modes: mapped listeners (per-channel handlers) and mass listener (single handler for multiple channels). MUST show how to wire subscribeToChannels() with SimpleChannelsListeners.
 - 3.0.3: REQT-z2gggf9t54: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Encrypted Channel Pattern** - MUST show the sequence for encrypted channels: generateKey() → createChannel() with encrypted options (owner, signature, allowJoining/members) → joinChannel(). MUST note that postEncrypted is not yet implemented.
 - 3.0.4: REQT-10pa0ymt1j: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Error Handling Pattern** - MUST show how to handle the error event (DredError with reason, message, recommendation) and how try/catch works with async methods like postMessage() and createChannel().

## Area 4: Skill Structure

### **REQT-4.0/8mj5tcv032**: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Skill Structure and Token Efficiency**
#### Purpose: Governs how the skill itself is organized for optimal agent consumption. Applied when creating or restructuring skill files, or evaluating whether the skill format serves agents effectively.

 - 4.0.1: REQT-8pn3crnb6j: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Factored Reference Documents** - Reference material MUST be factored into focused sub-documents (reference/api.md, reference/events.md, reference/patterns.md) rather than one monolithic file. The SKILL.md MUST be lightweight, directing agents to load specific reference files as needed.
 - 4.0.2: REQT-gnqp492m55: **IMPLEMENTED/NEEDS VERIFICATION**/draft: **Compact Format** - Reference documents MUST use compact, agent-efficient formatting: consolidated type+usage (not separate blocks), inline examples only where they add clarity, no decorative markup (horizontal rules, redundant labels). Each method SHOULD be documented in 3-5 lines unless complexity warrants more.


# Files

- `./dred-client.SKILL.md` - Main skill definition
- `./reference/api.md` - API reference — constructor, methods, types, imports
- `./reference/events.md` - Event catalog with types and firing conditions
- `./reference/patterns.md` - Integration patterns and code examples
- `./dred-client.reqts.jsonl` - Requirements source of truth

# Implementation Log

> Maintainers MUST NOT modify past entries. Append new entries only.


# Release Management Plan

See `release-management-scope.md` for version criteria and lifecycle management.
