# DRED Project Context - Session x01

## **🏗️ Project Architecture**
- **Name**: DRED - Distributed messaging system
- **Tech Stack**: Node.js, TypeScript 5.3.3, Redis, WebSockets, Express
- **Package Manager**: pnpm 10.11.0 (workspace configuration)
- **Testing**: Vitest with Docker Redis integration

## **📁 Workspace Structure**
```
/Users/psuzzi/projects/cad/dred/
├── src/
│   ├── client/          # WebSocket client implementation
│   ├── server/          # Express server + WebSocket handling  
│   ├── peers/           # Network peer discovery
│   ├── redis/           # Redis operations
│   └── types/           # TypeScript definitions
├── preprod/             # Deployment scripts & config
├── scripts/             # Test utilities
└── bin/dredServer       # Server entry point
```

## **🔧 Key Components**

### **Server Components**
- **`DredServer.ts`**: Main server class, handles clients and channels
- **`DredReplicator.ts`**: Message replication between servers
- **`NeighborhoodDiscovery.ts`**: Blockchain-based peer discovery
- **`bin/dredServer`**: Entry point with environment setup

### **Client Components**  
- **`DredClient.ts`**: WebSocket client with auto-reconnection
- **`StaticHostDiscovery.ts`**: Direct server connection config
- **Test clients**: Interactive and automated testing tools

### **Infrastructure**
- **Redis**: Message storage, pub/sub, channel management
- **Docker**: Redis containerization for development
- **PM2**: Production process management on VPS servers

## **🌍 Server Environments**

### **Development**
- **Local**: `localhost:3029` with Redis on `localhost:6379`
- **Docker**: `docker-compose up redis` for testing

### **Pre-Production Servers**
- **DE**: `de.pp.node-01.dred.network:443` (HTTPS)
- **US**: `74.208.13.84:3029` (HTTP) 
- **UK**: `217.154.34.155:3029` (HTTP)

## **🔄 Message Flow**
```
Client → Local Server → Redis → Replication → Remote Server
                    ↓
                 Local Redis ← Replication ← Remote Server
                    ↓
               Local Clients
```

## **📊 Logging Architecture**

### **Framework Stack**
- **Pino**: High-performance JSON logging
- **PinoPretty**: Human-readable console output
- **zonedLogger**: DRED-specific structured logging

### **Log Levels & Facilities**
```javascript
// Standard levels
trace: 10    // Fine-grained debugging
debug: 20    // Program activities  
info: 30     // Normal operation output
warn: 40     // Potential issues
error: 50    // Actual problems
fatal: 60    // Critical failures

// Custom levels
progress: 25     // Operation progress
userError: 32/42 // User input errors
ops: 28/45       // Operational metrics
```

### **Logging Configuration**
```bash
# Examples
LOGGING=default:info                    # Basic info logging
LOGGING=default:debug,replicator:trace  # Debug + replication tracing
LOGGING=test-client:info,replication:trace  # Client + replication
```

## **🧪 Testing Infrastructure**

### **Test Environment**
- **Redis**: Dockerized instance on `localhost:6379`
- **Multi-Server**: Tests create multiple DredServer instances
- **Database Isolation**: Each server uses different Redis DB number
- **Single-Threaded**: Tests run serially to avoid state conflicts

### **Test Commands**
```bash
pnpm test                    # All tests
pnpm test replication       # Replication tests only
pnpm test [pattern]         # Specific test pattern
LOGGING=test:debug pnpm test # Debug test logging
```

## **🚀 Deployment Process**

### **Local Development**
```bash
pnpm build                  # Compile TypeScript
pnpm exec node dist/dredServer.mjs  # Run server
```

### **Pre-Production Deployment**
```bash
cd preprod/
make setup-dred [server]    # Initial deployment
make update-dred [server]   # Update existing
make test [server]          # Connectivity test
```

### **Deployment Scripts**
- **`setup-dred-minimal.sh`**: Initial server setup
- **`update-dred.sh`**: Code updates and restart
- **Environment configs**: `config/{de,us,uk}.env`

## **🔐 Security & Network**

### **Authentication**
- **Client ID**: Required header for all requests
- **OCID**: Operation/Correlation ID for message deduplication
- **SSL**: HTTPS for DE server, HTTP for US/UK

### **Network Configuration**
- **Binding**: `DRED_HOST=0.0.0.0` for external access
- **Ports**: 443 (DE), 3029 (US/UK)
- **Firewall**: UFW rules for port access

## **⚙️ Environment Variables**

### **Server Configuration**
```bash
DRED_HOST=0.0.0.0          # Bind address
DRED_PORT=3029             # Listen port  
REDIS_URL=redis://localhost:6379  # Redis connection
LOGGING=facility:level     # Log configuration
BF_API_KEY=...            # Blockchain API key
```

### **Client Configuration**
```bash
LOGGING=test-client:info   # Client logging
```

## **🔄 Git Workflow**
- **Current Branch**: `feature/onchain-replication-m2`
- **Workflow**: Local changes → Commit → Push → Redeploy
- **No Direct Server Edits**: All changes through codebase

## **📋 Development Standards**
- **TypeScript**: Strict mode, explicit return types
- **Error Handling**: Result<T, E> pattern
- **Code Organization**: One class per file, barrel exports
- **Testing**: Unit + integration tests required
- **Logging**: Structured JSON with semantic methods
