# DRED Testing Workflow Guide

## Overview

This guide explains how DRED testing works, covering local development tests, integration tests, and VPS deployment tests. It provides step-by-step instructions for performing successful tests in all environments.

## Testing Architecture

### Test Types
1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Multi-server replication testing  
3. **VPS Tests**: External server connectivity and cross-server replication
4. **Performance Tests**: Response time and concurrent connection testing

### Test Infrastructure
- **Local Environment**: Uses `StaticHostDiscovery` with Redis on `localhost:6379`
- **Test Servers**: Creates multiple `DredServer` instances on ports `53032`, `53033`, `53034`
- **VPS Environment**: Tests real production servers via HTTP API calls
- **Redis Backend**: Dockerized Redis instance shared across test servers

## Local Development Testing

### Prerequisites

#### Required Software
```bash
# Check installations
node --version     # Should be v20.x.x
pnpm --version     # Should be 10.11.0
docker --version   # For Redis container
```

#### Redis Setup
```bash
# Option 1: Use setup script
./scripts/setupEnvironment

# Option 2: Manual Docker setup
docker-compose up redis

# Option 3: Manual Redis installation
sudo apt install redis-server  # Ubuntu
brew install redis             # macOS
```

#### Port Requirements
- **53032**: Test server "first"
- **53033**: Test server "second"  
- **53034**: Test server "third"
- **6379**: Redis (default port)

### Running Tests

#### Basic Test Commands

```bash
# All tests
pnpm test

# Specific test suites
pnpm test replication    # Server replication tests
pnpm test channels       # Channel management tests
pnpm test messages       # Message handling tests
pnpm test client         # Client functionality tests
pnpm test keyexchange    # Key exchange tests
pnpm test redis          # Redis data structures tests
```

#### Enhanced Testing with Logging

```bash
# Detailed logging
LOGGING=1 pnpm test replication | pnpm exec pino-pretty

# Less detailed (recommended for most debugging)
pnpm test replication | pnpm exec pino-pretty

# Test specific patterns
pnpm test [pattern]      # Run tests matching pattern/name
```

#### Debug Mode

```bash
# Run tests with Node.js debugger
pnpm test:debug

# Then connect Chrome debugger:
# 1. Open Chrome
# 2. Go to chrome://inspect
# 3. Click "Inspect" on Node.js process (port 9230)
# 4. Set breakpoints and debug
```

#### Watch Mode

```bash
# Automatically re-run tests on file changes
pnpm testing
```

### Test Structure

#### Multi-Server Test Setup

Tests automatically create a multi-server environment:

```typescript
// src/server/testServer.ts - Test setup
const hosts: DredHostDetails[] = [
    { serverId: "first", address: "localhost", port: "53032", insecure: true },
    { serverId: "second", address: "localhost", port: "53033", insecure: true },
    { serverId: "third", address: "localhost", port: "53034", insecure: true },
];

// Each server gets:
// - Unique Redis database (1, 2, 3)
// - StaticHostDiscovery with full host list
// - Neighborhood: "dredTestNbh"
```

#### Discovery Mechanism in Tests

Tests use `StaticHostDiscovery` (not `NeighborhoodDiscovery`):

```typescript
const discovery = new StaticHostDiscovery({
    hosts,
    neighborhood: "dredTestNbh",
}).reset(hosts);
```

This ensures tests work without blockchain connectivity and use predictable serverIds.

### Successful Test Execution

#### Expected Test Flow

1. **Setup Phase**:
   ```
   ✓ Redis connection established
   ✓ Three test servers created (first, second, third)
   ✓ Servers listening on ports 53032, 53033, 53034
   ✓ StaticHostDiscovery configured with all servers
   ```

2. **Replication Test Execution**:
   ```
   ✓ Channel created on primary server
   ✓ Replication clients connect to other servers
   ✓ Messages posted to primary server
   ✓ Messages replicated to secondary servers
   ✓ Deduplication prevents message loops
   ```

3. **Cleanup Phase**:
   ```
   ✓ All client connections closed
   ✓ Server instances stopped
   ✓ Redis databases cleaned up
   ```

#### Success Indicators

**Logs to Look For:**
- `server 'first' listening at localhost:53032`
- `DredReplicator-[first] initializing`
- `📤 REPLICATION: Publishing to home server 'second'`
- `✅ DEDUP PUBLISH [first] Message successfully deduplicated`

**Test Output Should Show:**
- All tests passing with green checkmarks
- No Redis connection errors
- No port binding conflicts
- Clean test cleanup (no hanging processes)

### Common Test Issues and Solutions

#### Redis Connection Errors
```bash
# Error: Redis connection refused
# Solution:
docker-compose up redis
# Or
./scripts/setupEnvironment
```

#### Port Conflicts
```bash
# Error: EADDRINUSE :::53032
# Solution: Kill processes using test ports
lsof -ti:53032,53033,53034 | xargs kill -9
```

#### Test Timeouts
```bash
# Error: Test timeout exceeded
# Check Redis is responding:
redis-cli ping  # Should return PONG

# Increase timeout if needed:
JEST_TIMEOUT=30000 pnpm test replication
```

#### Hanging Tests
```bash
# Tests don't complete/cleanup
# Force cleanup:
pkill -f "node.*vitest"
docker stop $(docker ps -q --filter "ancestor=redis")
```

## Integration Testing

### Multi-Server Replication Tests

#### Test Scenario
```typescript
// Creates test scenario with 3 servers
// Tests message flow: Server1 → Server2 → Server3
// Verifies deduplication prevents loops
// Confirms all servers receive messages
```

#### Key Test Cases

1. **Basic Replication**:
   - Create channel on Server 1
   - Post message to Server 1
   - Verify message appears on Server 2 and 3
   - Check message deduplication works

2. **Cross-Server Channel Management**:
   - Create channels on different servers
   - Verify channels replicate across servers
   - Test channel cleanup and management

3. **Message Deduplication**:
   - Send same message to multiple servers
   - Verify only one copy is stored
   - Check deduplication keys work correctly

4. **Connection Management**:
   - Test server connections and disconnections
   - Verify replication clients reconnect automatically
   - Test cleanup on server shutdown

### Running Integration Tests

```bash
# Full replication test suite
LOGGING=1 pnpm test replication | pnpm exec pino-pretty

# Focus on specific replication scenarios
pnpm test replication -- --grep "cross-server"
pnpm test replication -- --grep "deduplication"
```

### Integration Test Success Criteria

#### Message Replication
- [x] Messages post successfully to origin server
- [x] Messages appear on all other servers within 2 seconds
- [x] Message content is identical across servers
- [x] Original server ID (ocid) is preserved

#### Deduplication
- [x] Duplicate messages are rejected
- [x] Deduplication keys are generated correctly
- [x] Known message tracking works across servers
- [x] No message loops occur

#### Connection Management
- [x] Replication clients connect to all other servers
- [x] No self-connection attempts (server to itself)
- [x] Clean disconnect on test cleanup
- [x] No hanging client connections

## VPS Testing

### VPS Test Architecture

VPS tests verify real-world deployment scenarios using HTTP API calls to actual servers running on VPS instances.

#### Test Configuration

```typescript
// pre-prod/test.vps.ts
const VPS_SERVERS: VpsServer[] = [
    {
        id: 'vps-1',
        host: '217.154.34.155', // UK test server
        port: 3029,
        description: 'UK Test Server'
    },
    {
        id: 'vps-2',
        host: '85.215.215.192', // DE production server
        port: 3029,
        description: 'DE Production Server'
    }
];
```

### VPS Test Types

#### 1. Health Check Tests
```bash
# Tests basic server connectivity
curl http://SERVER_IP:3029/channels
# Expected: JSON response with channel list
```

#### 2. API Functionality Tests
```bash
# Create channel via API
curl -X POST http://SERVER_IP:3029/channel/test-channel \
  -H "Content-Type: application/json" \
  -d '{"approveJoins": "open", "description": "Test channel"}'

# List channels
curl http://SERVER_IP:3029/channels
# Expected: Array containing "test-channel"
```

#### 3. Cross-VPS Replication Tests
```bash
# Create channel on VPS 1
curl -X POST http://VPS1_IP:3029/channel/replication-test

# Send message to VPS 1  
curl -X POST http://VPS1_IP:3029/channel/replication-test/message \
  -d '{"msg": "test message", "type": "test"}'

# Verify channel exists on VPS 2 (after replication delay)
curl http://VPS2_IP:3029/channels
# Expected: Array containing "replication-test"
```

### Running VPS Tests

#### Prerequisites

1. **VPS Servers Deployed**: Follow VPS setup guide first
2. **Network Access**: Ensure VPS servers are accessible on port 3029
3. **Configuration**: Update `VPS_SERVERS` array with actual server IPs

#### Test Execution

```bash
# Update VPS server configuration in pre-prod/test.vps.ts
# Replace 192.168.1.100, 192.168.1.101 with actual VPS IPs

# Run VPS connectivity tests
pnpm test pre-prod/test.vps.ts

# Or with detailed logging
LOGGING=1 pnpm test pre-prod/test.vps.ts | pnpm exec pino-pretty
```

#### VPS Test Timeouts

```typescript
// Network timeouts for VPS tests
const NETWORK_TIMEOUT = 10000; // 10 seconds
const CONNECTION_RETRY_DELAY = 1000; // 1 second
const MAX_RETRIES = 5;
const REPLICATION_DELAY = 3000; // 3 seconds for replication
```

### VPS Test Success Criteria

#### Health Checks
- [x] All VPS servers respond to `/channels` endpoint
- [x] Response time < 5 seconds per server
- [x] HTTP status 200 with valid JSON response
- [x] No network timeouts or connection errors

#### API Functionality
- [x] Channel creation succeeds via POST API
- [x] Created channels appear in channel list
- [x] Channel names are correctly stored
- [x] JSON response format is valid

#### Cross-VPS Replication
- [x] Channels created on one VPS appear on others
- [x] Replication occurs within 3-5 seconds
- [x] Message content replicates correctly
- [x] No duplicate messages across servers

#### Performance
- [x] Concurrent connections to all servers succeed
- [x] Average response time across servers < 2 seconds
- [x] All servers handle load consistently
- [x] No server crashes under test load

### VPS Test Troubleshooting

#### Common VPS Test Issues

**Connection Refused**:
```bash
# Check server is running
ssh devops@VPS_IP "pm2 status"
# Check port is open
nmap -p 3029 VPS_IP
# Check firewall
ssh devops@VPS_IP "sudo ufw status"
```

**Timeouts**:
```bash
# Check server response manually
curl -v http://VPS_IP:3029/channels
# Check server logs
ssh devops@VPS_IP "pm2 logs dred-vps-server"
```

**Replication Issues**:
```bash
# Check if servers can reach each other
ssh devops@VPS1_IP "curl http://VPS2_IP:3029/channels"
# Check replication logs
ssh devops@VPS_IP "pm2 logs dred-vps-server | grep -i repl"
```

## Performance Testing

### Response Time Benchmarks

#### Local Testing
- **Expected**: < 100ms for local operations
- **Acceptable**: < 500ms for cross-server operations
- **Warning**: > 1000ms indicates issues

#### VPS Testing
- **Expected**: < 2000ms for API responses
- **Acceptable**: < 5000ms for network operations
- **Warning**: > 10000ms indicates network/server issues

### Load Testing

```bash
# Concurrent channel creation
for i in {1..10}; do
  curl -X POST http://VPS_IP:3029/channel/load-test-$i &
done
wait

# Verify all channels created
curl http://VPS_IP:3029/channels | jq length
# Expected: Should include all 10 test channels
```

## Test Environment Setup

### Local Development Environment

```bash
# Complete local setup
git clone https://github.com/YOUR_ORG/dred.git
cd dred
pnpm install

# Setup Redis
./scripts/setupEnvironment
# Or manually:
docker-compose up redis

# Run tests
pnpm test replication | pnpm exec pino-pretty
```

### CI/CD Testing

```yaml
# Example GitHub Actions workflow
name: DRED Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis:7
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - run: npm install -g pnpm@10.11.0
      - run: pnpm install
      - run: pnpm test
```

## Debugging Test Issues

### Debug Strategies

#### 1. Isolate the Problem
```bash
# Test Redis connectivity first
redis-cli ping

# Test individual server startup
pnpm test channels  # Simpler than replication

# Test with minimal logging
pnpm test replication --reporter=verbose
```

#### 2. Check Test Infrastructure
```bash
# Verify ports are free
lsof -i :53032,53033,53034,6379

# Check Redis is clean
redis-cli flushall

# Verify Node.js version
node --version  # Should be 20.x
```

#### 3. Enable Maximum Logging
```bash
# Full debugging output
DEBUG=* LOGGING=1 pnpm test replication | pnpm exec pino-pretty
```

### Test Log Analysis

#### Successful Test Patterns
```
✓ server 'first' listening at localhost:53032
✓ DredReplicator-[first] initializing  
✓ 📤 REPLICATION: Publishing to home server
✓ ✅ DEDUP PUBLISH [first] Message successfully
✓ Test: should replicate messages ✓
```

#### Failure Patterns
```
✗ Redis connection refused
✗ EADDRINUSE :::53032
✗ Test timeout exceeded
✗ Connection to server failed
```

## Summary

This testing guide covers:

1. **Local Testing**: Development environment with simulated multi-server setup
2. **Integration Testing**: Cross-server replication and message flow
3. **VPS Testing**: Real-world deployment verification  
4. **Performance Testing**: Response time and load validation

### Quick Test Commands Reference

```bash
# Essential test commands
pnpm test                                    # All tests
pnpm test replication | pnpm exec pino-pretty   # Main replication tests
LOGGING=1 pnpm test replication | pnpm exec pino-pretty  # Detailed logging
pnpm test pre-prod/test.vps.ts              # VPS connectivity tests
pnpm test:debug                              # Debug mode

# Troubleshooting
./scripts/setupEnvironment                   # Setup Redis
lsof -ti:53032,53033,53034 | xargs kill -9  # Free test ports
redis-cli flushall                           # Clean Redis
```

The testing infrastructure is designed to be reliable and fast, with automatic cleanup and clear success/failure indicators. Follow this guide to ensure consistent and successful test execution across all environments.
