# Network Boundary Test Architecture

## Overview

This document specifies the architecture for testing DRED server replication across network boundaries using Docker containers. The goal is to create a realistic test environment that simulates distributed DRED servers communicating over network connections.

## Test Scenarios

### Phase 1: Docker Localhost Network
- **Objective**: Test replication between DRED servers in separate Docker containers on the same host
- **Network**: Docker Compose bridge network
- **Complexity**: Low - controlled environment, predictable networking
- **Use Case**: CI/CD integration, development testing

### Phase 2: Cross-Internet Network  
- **Objective**: Test replication between DRED servers on different physical machines
- **Network**: Internet with port forwarding/NAT traversal
- **Complexity**: High - real network conditions, firewalls, latency
- **Use Case**: Production deployment validation

## Architecture Design

### Container Topology

```
┌─────────────────────┐    ┌─────────────────────┐
│   Docker Container 1│    │   Docker Container 2│
│                     │    │                     │
│  ┌─────────────────┐│    │  ┌─────────────────┐│
│  │   DRED Server 1 ││    │  │   DRED Server 2 ││
│  │   Port: 3029    ││    │  │   Port: 3029    ││
│  │   ServerId: dred1││   ││  │   ServerId: dred2││
│  └─────────────────┘│    │  └─────────────────┘│
│  ┌─────────────────┐│    │  ┌─────────────────┐│
│  │   Redis 1       ││    │  │   Redis 2       ││
│  │   Port: 6379    ││    │  │   Port: 6379    ││
│  └─────────────────┘│    │  └─────────────────┘│
│                     │    │                     │
│  External Port:     │    │  External Port:     │
│  4001:3029          │    │  4002:3029          │
│  6001:6379          │    │  6002:6379          │
└─────────────────────┘    └─────────────────────┘
           │                          │
           └────────── Bridge ────────┘
              Network (dred-network)
```

### Client Topology

```
Client A ──→ Container 1 (DRED Server 1) ←──┐
                     │                      │
                     ↓                      │ Replication
                Message Flow                │
                     │                      │
                     ↓                      │
Client B ──→ Container 2 (DRED Server 2) ←──┘
Client C ──→ Container 2 (DRED Server 2)
```

### Static Host Discovery Configuration

Each DRED server will be configured with static host discovery pointing to the other server:

**Server 1 Configuration:**
```typescript
const hosts: DredHostDetails[] = [
    { serverId: "dred1", address: "dred-server-1", port: "3029", insecure: true },
    { serverId: "dred2", address: "dred-server-2", port: "3029", insecure: true }
];
```

**Server 2 Configuration:**
```typescript
const hosts: DredHostDetails[] = [
    { serverId: "dred1", address: "dred-server-1", port: "3029", insecure: true },
    { serverId: "dred2", address: "dred-server-2", port: "3029", insecure: true }
];
```

## Implementation Plan

### Phase 1: Docker Compose Network Test

#### 1.1 Docker Infrastructure
- **File**: `replication/docker-compose.networktest.yml`
- **Components**:
  - Two DRED server containers (`dred-server-1`, `dred-server-2`)
  - Two Redis containers (`redis-1`, `redis-2`)
  - Custom bridge network (`dred-network`)

#### 1.2 Configuration Files
- **Server 1 Config**: `replication/configs/server1.json`
- **Server 2 Config**: `replication/configs/server2.json`
- **Environment Variables**: Separate environment files for each container

#### 1.3 Test Implementation
- **File**: `src/server/__tests__/networkboundary.test.ts`
- **Test Structure**:
  - Container lifecycle management
  - Network connectivity validation
  - Cross-container replication testing
  - Message flow verification
  - Cleanup and teardown

### Phase 2: Cross-Internet Test Framework

#### 2.1 Configuration Management
- Environment-based host discovery configuration
- Dynamic host resolution for different network topologies
- Support for custom ports and external IPs

#### 2.2 Manual Test Procedures
- **File**: `replication/manual-test-guide.md`
- Step-by-step instructions for cross-internet testing
- Network troubleshooting guide
- Firewall and NAT configuration examples

## Technical Specifications

### Docker Compose Configuration

```yaml
version: "3.8"
services:
  dred-server-1:
    build: ../
    container_name: dred-server-1
    environment:
      - REDIS_URL=redis://redis-1:6379
      - SERVER_ID=dred1
      - DISCOVERY_CONFIG=/app/config/server1-discovery.json
    ports:
      - "4001:3029"
    depends_on:
      - redis-1
    networks:
      - dred-network

  dred-server-2:
    build: ../
    container_name: dred-server-2
    environment:
      - REDIS_URL=redis://redis-2:6379
      - SERVER_ID=dred2
      - DISCOVERY_CONFIG=/app/config/server2-discovery.json
    ports:
      - "4002:3029"
    depends_on:
      - redis-2
    networks:
      - dred-network

  redis-1:
    image: redis:7-alpine
    container_name: redis-1
    ports:
      - "6001:6379"
    networks:
      - dred-network

  redis-2:
    image: redis:7-alpine
    container_name: redis-2
    ports:
      - "6002:6379"
    networks:
      - dred-network

networks:
  dred-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### Test Framework Architecture

#### Network Boundary Test Suite
```typescript
describe("Network Boundary Replication", () => {
    describe("Docker Network Tests", () => {
        // Container lifecycle management
        // Network connectivity validation
        // Cross-container message replication
        // Performance benchmarking
    });

    describe("Configuration Tests", () => {
        // Static host discovery validation
        // Environment variable handling
        // Configuration file parsing
    });

    describe("Failure Recovery Tests", () => {
        // Network partition simulation
        // Container restart scenarios
        // Redis connection failures
    });
});
```

#### Helper Classes
```typescript
class DockerTestManager {
    async startContainers(): Promise<void>
    async stopContainers(): Promise<void>
    async getContainerLogs(service: string): Promise<string>
    async waitForHealthy(service: string): Promise<void>
}

class NetworkTestClient {
    constructor(serverUrl: string)
    async connectToServer(): Promise<void>
    async sendMessage(channel: string, message: any): Promise<void>
    async waitForMessage(timeout?: number): Promise<any>
}
```

## Test Execution Strategy

### Automated Testing (CI/CD)
1. **Pre-test Setup**
   - Build Docker images
   - Start test containers
   - Wait for service health checks

2. **Test Execution**
   - Validate container connectivity
   - Test cross-container replication
   - Verify message deduplication
   - Performance benchmarking

3. **Post-test Cleanup**
   - Collect container logs
   - Stop and remove containers
   - Clean up test data

### Manual Testing
1. **Environment Setup**
   - Configure firewall rules
   - Set up port forwarding
   - Exchange server configurations

2. **Test Execution**
   - Start servers on separate machines
   - Validate network connectivity
   - Execute cross-internet replication tests

3. **Results Analysis**
   - Network latency measurements
   - Message throughput analysis
   - Failure scenario handling

## Configuration Management

### Environment Variables
- `DRED_SERVER_ID`: Unique identifier for the server
- `DRED_DISCOVERY_HOSTS`: JSON string of host configurations
- `DRED_NEIGHBORHOOD`: Network neighborhood identifier
- `REDIS_URL`: Redis connection string
- `DRED_PORT`: Server listening port
- `DRED_EXTERNAL_HOST`: External hostname/IP for cross-internet tests

### Discovery Configuration Files
```json
{
  "hosts": [
    {
      "serverId": "dred1",
      "address": "dred-server-1",
      "port": "3029",
      "insecure": true
    },
    {
      "serverId": "dred2", 
      "address": "dred-server-2",
      "port": "3029",
      "insecure": true
    }
  ],
  "neighborhood": "dred-test-network",
  "connectionThresholds": {
    "minimal": 1,
    "healthy": 2
  }
}
```

## Success Criteria

### Functional Requirements
- ✅ DRED servers start successfully in separate containers
- ✅ Static host discovery connects servers across container boundary
- ✅ Messages replicate from Server 1 to Server 2
- ✅ Messages replicate from Server 2 to Server 1
- ✅ Anti-loop protection prevents message duplication
- ✅ Redis isolation maintained between servers

### Performance Requirements
- ✅ Message replication latency < 500ms (Docker network)
- ✅ Message replication latency < 2000ms (Cross-internet)
- ✅ Support for 100+ messages/second throughput
- ✅ Graceful handling of network interruptions

### Reliability Requirements
- ✅ Automatic reconnection after network failures
- ✅ Message persistence during temporary disconnections
- ✅ Container restart recovery
- ✅ Redis failover handling

## Future Enhancements

### Multi-Container Mesh Network
- Extend to 3+ DRED server containers
- Complex network topologies
- Dynamic host discovery integration

### Network Simulation
- Latency injection
- Packet loss simulation
- Bandwidth limitations
- Network partition testing

### Monitoring and Metrics
- Real-time replication monitoring
- Performance metrics collection
- Health check endpoints
- Alerting integration

## File Structure

```
replication/
├── networktest.md                    # This specification document
├── docker-compose.networktest.yml    # Docker Compose configuration
├── configs/
│   ├── server1-discovery.json        # Server 1 host discovery config
│   ├── server2-discovery.json        # Server 2 host discovery config
│   ├── server1.env                   # Server 1 environment variables
│   └── server2.env                   # Server 2 environment variables
├── scripts/
│   ├── start-network-test.sh         # Test startup script
│   ├── stop-network-test.sh          # Test cleanup script
│   └── monitor-containers.sh         # Container monitoring script
└── manual-test-guide.md              # Cross-internet testing guide
```

## Implementation Timeline

### Week 1: Foundation
- [ ] Create Docker Compose configuration
- [ ] Implement container management scripts
- [ ] Set up basic test structure

### Week 2: Core Testing
- [ ] Implement network boundary test suite
- [ ] Add container lifecycle management
- [ ] Validate cross-container replication

### Week 3: Enhancement
- [ ] Add performance benchmarking
- [ ] Implement failure recovery tests
- [ ] Create monitoring capabilities

### Week 4: Cross-Internet Preparation
- [ ] Create manual testing guide
- [ ] Add configuration for external networks
- [ ] Prepare for cross-internet validation

This architecture provides a solid foundation for testing DRED server replication across network boundaries, starting with controlled Docker environments and scaling to real-world cross-internet scenarios. 