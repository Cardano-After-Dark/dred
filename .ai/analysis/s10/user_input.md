# Session S10 - User Input Summary

## Initial Request
User has both DRED US and UK servers running successfully and wants to perform a demonstration of replication using on-chain details. The on-chain details are read by DRED at startup.

## Server Status
- US server (74.208.13.84): ✓ SSH OK, ✓ DRED server responding
- UK server (217.154.34.155): ✓ SSH OK, ✓ DRED server responding

## Key Context
- On-chain details are read by DRED at startup
- Need to demonstrate replication between the two servers

## Clarifying Questions Asked

1. What's the intended purpose of this demonstration? (validation, documentation, stakeholder demo, proof-of-concept)
2. What specific aspects of "replication using on-chain details" to highlight?
3. What format should the demonstration take? (script, test, manual steps, visual)
4. What level of technical detail to show? (high-level, medium, deep technical)
5. Which scenarios to demonstrate? (basic replication, channel sync, deduplication, etc.)

## User Responses

1. **Purpose**: Show that a message sent on a DRED server is replicated to the other DRED server
2. **On-chain details**: Read at startup by each of the two DRED servers
3. **Goal**: Messages sent to US appear in UK (basic high-level demonstration)
4. **Level**: High-level - "messages sent to US appear in UK"
5. **Scope**: Basic message replication

## Additional Requirements

**Pre-demonstration setup**:
- Command to query both servers for available channels
- Ensure both servers are in the same neighborhood
- Execute replication demonstration

**Approach**:
1. First try via command line tools to test manually
2. Then write a TypeScript test against remote servers (similar to replication.test.ts)

**Code organization**:
- Analysis/examples in `.ai/analysis/s10/`
- New TypeScript test in `src/server/__tests__/`

## Final Requirements

Create a demonstration showing message replication between live US and UK servers using on-chain discovery, with both manual CLI approach and automated test.

## Key Decisions Made

1. **Hybrid Approach**: Combine CLI tools for immediate testing with TypeScript integration test for comprehensive validation
2. **Three-Tier Demonstration**: 
   - Query tools for server status and channel inspection
   - Interactive/automated replication demonstration 
   - Comprehensive TypeScript test for end-to-end validation
3. **Self-Contained Implementation**: All demonstration code in `.ai/analysis/s10/` except the TypeScript test which goes in the main test directory
4. **Makefile Integration**: Optional extensions to add demo commands to existing preprod/Makefile
5. **Safety-First Design**: All tools designed to be safe to run multiple times without conflicts

## Progress Update

**✅ Completed:**
- Basic infrastructure verified (servers responding, channels created)
- Messages successfully sent to both servers
- CLI tools working correctly

**🔍 Current Issue:**
- No replication activity visible in server logs
- Need to diagnose why replication isn't happening

**📋 Diagnostic Phase:**
- User ran TypeScript remote replication test
- **RESULTS**: Test failed with missing BF_API_KEY environment variable
- **ROOT CAUSE IDENTIFIED**: On-chain discovery not working due to missing Blockfrost API key

**🔍 Root Cause Analysis:**
- BF_API_KEY environment variable missing on both servers
- Without this, NeighborhoodDiscovery can't connect to Cardano blockchain
- No on-chain discovery = no peer discovery = no replication
- DredClient API also has some mismatches (connect method missing)
