# Testing Guide

Comprehensive testing setup for DRED distributed messaging system.

## Quick Commands

```bash
# Basic commands
pnpm test                            # All tests
pnpm testing                         # Watch mode  
pnpm test:debug                      # Debug mode
pnpm test [pattern]                  # Run tests matching pattern

# Test suites
pnpm test replication                # Cross-server replication
pnpm test self-identification        # On-chain discovery self-filtering
pnpm test channels                   # Channel management
pnpm test messages                   # Message handling  
pnpm test redis                      # Redis operations
pnpm test client                     # Client functionality
pnpm test keyexchange                # Key exchange protocols
pnpm test:streams                    # Redis streams (yarn)

# Detailed logging
LOGGING=1 pnpm test replication | pnpm exec pino-pretty
LOGGING=1 pnpm test self-identification | pnpm exec pino-pretty
```

## Setup & Requirements

- Redis: `scripts/setupEnvironment` or `docker-compose up redis`
- Ports: 53032-53034 free (integration test servers)
- Environment: `REDIS_URL=redis://localhost:6379`
- Execution: Single-threaded (shared Redis state)
- Test location: `__tests__/` directories alongside source

## Key Test Suites

### Replication Test

Tests cross-server message replication using StaticHostDiscovery with multiple servers:

- Creates 3 test servers (ports 53032-53034) with local shared Redis
- Validates message flow between servers and deduplication
- Tests replication setup, cleanup, and Redis integration

**Success indicators:**

- All 5 tests pass (Setup Validation, Basic Messaging, Cross-Server Replication)
- See `✅ Successfully subscribed to X channels on target server` messages
- Message flow: `📥 REPLICATION: Message detected` and `📤 REPLICATION: Publishing`
- Deduplication working: `❌ DEDUP SKIP` for duplicate messages
- Clean shutdown: `Replication cleanup complete` for all servers

**Expected warnings:** May show "Connection is closed" errors and state machine transition warnings during cleanup. These don't affect test functionality.

### Self-Identification Test

Tests on-chain discovery self-filtering to prevent servers from replicating to themselves:

- Simulates blockchain-derived serverIds (production scenario)
- Validates `DRED_NODE_ID` environment variable (self-)filtering
- Compares with StaticHostDiscovery baseline (test scenario)

**Success indicators:**

- All 3 tests pass (REPRODUCES ISSUE, SHOWS SOLUTION, BASELINE)
- See blockchain-derived serverIds: `blockchain-derived-node-01-xyz`
- Self-filtering confirmation: `Self-filtering works: 2 hosts -> 1 host`
- Baseline comparison: `StaticHostDiscovery baseline: Works correctly`

**Expected behavior:** This test intentionally generates `ECONNREFUSED` errors when attempting to connect to mock peer servers. The test validates replication setup logic without actually running peer servers.

## Debug & Troubleshooting

```bash
pnpm test:debug          # Run with debugger (Chrome: chrome://inspect port 9230)
```

## Common Issues

### Redis Connection Errors

```text
Error: connect ECONNREFUSED 127.0.0.1:6379
```

**Solution:** Run `scripts/setupEnvironment` or `docker-compose up redis`

### Port Conflicts

```text
Error: listen EADDRINUSE: address already in use :::53032
```

**Solution:** Kill processes using ports 53032-53034

```bash
lsof -ti:53032,53033,53034 | xargs kill -9
```

### Test Timeouts

```text
Error: Timeout of 10000ms exceeded
```

**Solution:** Verify Redis container is running and responsive

```bash
redis-cli ping  # Should return "PONG"
```
