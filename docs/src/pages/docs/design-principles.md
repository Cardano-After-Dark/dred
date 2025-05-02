---
title: Design principles
description: Core ideas that guide how we build DRED.
---

These are the core ideas that guide how we build DRED.

## Decentralization First

DRED is truly decentralized:

- No single point where the system can fail
- Many different operators run the servers
- Message routing is not controlled by one group
- Apps work even when some servers are down
- Anyone can join by registering on the blockchain

## Keep It Simple

We prefer solutions that are simple and reliable:

- We use HTTP for messaging because it works everywhere
- Messages use JSON format which is easy to work with
- Redis handles message distribution efficiently
- The relay system is straightforward and reliable
- Each part of the system has a clear job

## Protect Privacy

DRED respects user and app privacy:

- Servers don't need to know what messages contain
- Apps can encrypt sensitive information
- Servers only see what they need to pass messages along
- Apps control their own encryption keys
- Messages aren't stored longer than needed

## Use Blockchain Smartly

DRED works with Cardano to improve security:

- The blockchain tracks which servers are part of the network
- Token staking gives operators a reason to be reliable
- Smart contracts enforce network rules
- Neighborhoods let apps find the right servers
- Protocol changes can be voted on by the community

## Built for Speed and Scale

The system is designed to be fast even as it grows:

- Messages are delivered quickly
- Multiple paths prevent traffic jams
- Neighborhoods allow the system to grow sideways, not just up
- Redis processes messages at high speed
- The relay system avoids wasting bandwidth

## Easy for Developers

We make DRED simple for app developers:

- The client library has clear, simple functions
- Setup requires minimal configuration
- Network complexity is handled automatically
- Works with any JavaScript or TypeScript app
- Helpful error messages make debugging easier

## Open to Everyone

DRED welcomes community involvement:

- All code is open source
- Documentation is clear and complete
- Anyone can run a node
- Multiple ways to contribute
- Development happens in the open

## Works Through Problems

The system keeps running even when things go wrong:

- Clients connect to multiple servers
- Messages find their way even if some paths are blocked
- Regular checks detect offline servers
- Connections switch to working servers automatically
- The system doesn't rely on any single part

## Security at Every Level

Security is built into all parts of DRED:

- Servers prove their identity with cryptographic keys
- Messages can be encrypted
- The blockchain verifies server identities
- Staking requirements add economic security
- Each component has limited permissions

## Efficient Resource Use

DRED is careful with system resources:

- Messages expire after a set time to save space
- Smart relay prevents sending the same message twice
- Redis stores data efficiently in memory
- Docker makes resource management simpler
- Storage policies can be adjusted as needed
