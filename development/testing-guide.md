# Testing Guide

## Commands

```bash
pnpm test                            # All tests
pnpm test [pattern]                  # Specific suite (replication, self-identification, channels, etc.)
pnpm testing                         # Watch mode
pnpm test:debug                      # Debug mode

# With detailed logging
LOGGING=1 pnpm test [pattern] | pnpm exec pino-pretty
```

Note: you can use more detailed logging options, see examples below

```bash
# debug testing for all, verbose, good when writing tests
LOGGING=default:debug pnpm test preprod | pnpm exec pino-pretty
# tailored logging per class
LOGGING=dred-client:debug,dred-client:state:warn,default:info,REPLicator:info,REPLicant:info pnpm test -- replication | pino-pretty | grep -v zonedLogger
LOGGING=dred-client:state:warn,default:debug pnpm test replication | pnpm exec pino-pretty
LOGGING=discovery:debug #your commands..
```

# Test suites
pnpm test replication                # Cross-server replication
pnpm test self-identification        # On-chain discovery self-filtering
pnpm test channels                   # Channel management
pnpm test messages                   # Message handling  
pnpm test redis                      # Redis operations
pnpm test client                     # Client functionality
pnpm test keyexchange                # Key exchange protocols
pnpm test:streams                    # Redis streams (yarn)

## Setup

- Redis: `scripts/setupEnvironment` or `docker-compose up redis`
- Ports 53032-53034 free
- Single-threaded execution (shared Redis state)

## Key Tests

### Replication

```bash
LOGGING=1 pnpm test replication | pnpm exec pino-pretty
```

Tests cross-server message replication using StaticHostDiscovery with multiple servers:

- Creates 3 test servers (ports 53032 - 53034) with local shared Redis
- Validates message flow between servers and deduplication
- Tests replication setup, cleanup, and Redis integration

- Success: 5 tests pass, `✅ Successfully subscribed`, `📥/📤 REPLICATION`, `❌ DEDUP SKIP`, `Replication setup complete`, `Replication cleanup complete`
- Expected: "Connection is closed" warnings during cleanup

### Self-Identification

```bash
LOGGING=1 pnpm test self-identification | pnpm exec pino-pretty
```

Tests on-chain discovery self-filtering to prevent servers from replicating with `DRED_NODE_ID`

- Simulates blockchain-derived serverIds (production scenario)
- Validates `DRED_NODE_ID` environment variable (self-)filtering
- Compares with StaticHostDiscovery baseline (test scenario)

- Success: 3 tests pass, `blockchain-derived-node-01-xyz`, `Self-filtering works: 2 hosts -> 1 host`
- Expected: `ECONNREFUSED` errors to mock peers (intentional)

## Troubleshooting

### Debug

`pnpm test:debug` (Chrome: chrome://inspect port 9230)

### Common Issues

#### Redis Connection Errors

`ECONNREFUSED 127.0.0.1:6379`

Solution: Run `scripts/setupEnvironment` or `docker-compose up redis`

#### Port Conflicts

`EADDRINUSE :::53032`

Solution: Kill processes using ports 53032 - 53034

```bash
lsof -ti:53032,53033,53034 | xargs kill -9
```

#### Test Timeouts

`Timeout of 10000ms exceeded`

Solution: Check Redis container is running and responsive

```bash
redis-cli ping  # Should return "PONG"
```
