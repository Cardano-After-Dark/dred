# DRED Dynamic Discovery - VPS Testing Infrastructure

**4-Step Workflow for Dynamic Host Discovery Testing**

## Quick Start

### 1. Configure SSH Keys
```bash
cp team-ssh-keys.private.example team-ssh-keys.private
# Edit team-ssh-keys.private with your team's SSH public keys
```

### 2. Test on UK Server (217.154.34.155)
```bash
make setup-devops uk && make test uk
make setup-infra uk && make test uk  
make setup-dred uk && make test uk
make test-dynamic-discovery uk     # NEW: Test dynamic discovery
```

### 3. Deploy to Production with Dynamic Discovery
```bash
make setup-devops de && make test de
make setup-infra de && make test de
make setup-dred de && make test de
make enable-dynamic-discovery de   # NEW: Enable dynamic discovery
```

## Available Commands

### Setup Commands
- `make setup-devops [server]` - Create devops user with SSH keys
- `make setup-infra [server]` - Install Docker, Redis, Node.js
- `make setup-dred [server]` - Deploy DRED application with dynamic discovery

### Dynamic Discovery Management (NEW)
- `make enable-dynamic-discovery [server]` - Enable dynamic host discovery on server
- `make update-discovery [server] [hosts]` - Update discovery hosts dynamically
- `make test-dynamic-discovery [server]` - Test dynamic discovery functionality
- `make discovery-status [server]` - Show current discovery configuration

### DRED Management
- `make dred-redeploy [server]` - Update DRED (pull latest + restart)
- `make dred-status [server]` - Check DRED status + channels
- `make dred-logs [server]` - View DRED logs (50 lines)

### Server Operations
- `make connect [server]` - Connect to server as devops user
- `make test [server]` - Test server connectivity

### Quick Reference
- `make list` - List all available servers
- `make help` - Show all commands

### Server Configuration
- **US**: 74.208.13.84 (production)
- **DE**: 85.215.215.192 (production)
- **UK**: 217.154.34.155 (test server)

### Examples
```bash
# Basic workflow
make test us              # Test US server
make connect de           # Connect to DE server
make dred-status uk       # Check DRED on UK server

# Dynamic discovery workflow (NEW)
make setup-devops uk      # Step 1
make setup-infra uk       # Step 2  
make setup-dred uk        # Step 3 (with dynamic discovery)
make test-dynamic-discovery uk  # Test dynamic discovery

# Update discovery hosts during runtime
make update-discovery uk "server1:host1:3029,server2:host2:3029"
```

## Architecture

**Enhanced with Dynamic Discovery**:
- **Redis**: Dockerized with 512MB memory limit
- **DRED**: Direct Node.js application managed by PM2
- **Discovery**: DynamicHostDiscovery for runtime host updates
- **External Port**: 3029 (DRED)
- **Internal Port**: 6379 (Redis)

## Dynamic Discovery Features (NEW)

### Test-Based Dynamic Discovery
- `DynamicHostDiscovery` class extends base `Discovery` 
- `server.updateDiscovery(newHosts)` method for runtime updates
- Differential replicant management (add/remove based on host changes)
- In-flight message preservation during topology changes

### VPS Command-Line Integration
- `POST /admin/discovery` API endpoint for host updates
- CLI command: `dred-admin update-discovery --hosts server1:host1:port1,server2:host2:port2`
- Runtime discovery changes without server restart

### Future: Blockchain Integration
- `BlockchainHostDiscovery` class for on-chain node registry
- `BlockServerMapper` for blockchain data → `DredHostDetails` mapping
- Startup + method-call triggered updates (not continuous polling)

## Requirements

- SSH access to servers (root password for initial setup)
- SSH public keys in `team-ssh-keys.private`
- Ubuntu 22.04+ servers with 2GB RAM

## Testing Dynamic Discovery

### Phase 1: Local Testing
```bash
# Run dynamic discovery tests locally
pnpm test dynamic-discovery

# Test replication with dynamic discovery  
pnpm test replication
```

### Phase 2: VPS Testing
```bash
# Setup servers with dynamic discovery
make setup-dred uk
make setup-dred de

# Test discovery updates between servers
make update-discovery uk "server1:uk:3029,server2:de:3029"
make test-dynamic-discovery uk
```

### Phase 3: Multi-Server Replication
```bash
# Test replication across dynamically updated topology
make test-replication-dynamic uk de
```

## Troubleshooting

### Common Issues
- **SSH connection failed**: Run `make setup-devops [server]` first
- **DRED not responding**: Check `make dred-status [server]`
- **Dynamic discovery not working**: Check `make discovery-status [server]`
- **Command not found**: Run `make help` to see available commands

### Dynamic Discovery Issues
- **Host update failed**: Verify host format: `server1:host1:port1,server2:host2:port2`
- **Replication not adapting**: Check `make dred-logs [server]` for replication errors
- **Discovery API not responding**: Ensure DRED is running with admin endpoints enabled

## Directory Structure

```
artifacts/
├── Makefile                 # Main interface (enhanced for dynamic discovery)
├── .env                     # Server configuration
├── scripts/                 # Setup scripts
│   ├── setup-devops.sh      # Step 1: User setup
│   ├── setup-infrastructure.sh # Step 2: Infrastructure
│   ├── setup-dred-dynamic.sh   # Step 3: DRED with dynamic discovery (NEW)
│   ├── test-dynamic-discovery.sh # Test dynamic discovery (NEW)
│   └── test-server.sh       # Progressive testing
├── dynamic-discovery/       # Dynamic discovery implementation (NEW)
│   ├── DynamicHostDiscovery.ts  # Dynamic discovery class
│   ├── dynamic-discovery.test.ts # Comprehensive tests
│   └── BlockServerMapper.ts    # Blockchain data mapping (future)
├── team-ssh-keys.private    # SSH keys (gitignored)
└── README.md               # This file
```

## Next Steps

1. **Setup SSH keys**: `cp team-ssh-keys.private.example team-ssh-keys.private`
2. **Test workflow**: `make test uk` (should show SSH failed)
3. **Start setup**: `make setup-devops uk` (will prompt for root password)
4. **Continue with dynamic discovery**: `make setup-infra uk && make setup-dred uk`
5. **Test dynamic features**: `make test-dynamic-discovery uk`

**Need help?** Run `make help` for command reference. 