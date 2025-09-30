# DRED Replication Testing Requirements - Session x01

## **🎯 Primary Goal**
Verify DRED server replication is working correctly with proper logging, and test message replication between servers.

## **📋 Core Requirements**

### **1. Server Deployment & Configuration**
- **Current Branch**: `feature/onchain-replication-m2`
- **Workflow**: All changes must follow: Local code → Commit → Push → Redeploy server. 
- **No Direct Server Modifications**: Everything must be reproducible through codebase
- **Target Servers**: DE (Germany), US (United States), UK (United Kingdom)

### **2. Logging Requirements**
- **Framework**: Pino + PinoPretty + zonedLogger
- **Standard Levels**: trace(10), debug(20), info(30), warn(40), error(50), fatal(60)
- **Custom Levels**: progress(25), userError(32/42), ops(28/45)
- **Replication Logging**: Use facilities like `replicant:trace` and `replicator:trace`
- **Example Command**: `LOGGING=default:debug,replicant:trace,replicator:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty`

### **3. Server Configuration**
```javascript
const SERVERS = {
    DE: {
        name: "DE (Germany)",
        address: "de.pp.node-01.dred.network",
        port: 443,
        serverId: "dredNode-170647b99511",
        nodeId: "preprod-de",
        ssl: true
    },
    US: {
        name: "US (United States)", 
        address: "74.208.13.84",
        port: 3029,
        serverId: "dredNode-efb4a5ae1206",
        nodeId: "preprod-us",
        ssl: false
    },
    UK: {
        name: "UK (United Kingdom)",
        address: "217.154.34.155", 
        port: 3029,
        serverId: "dredNode-10d84498548a",
        nodeId: "preprod-uk",
        ssl: false
    }
};
```

## **🔧 Technical Context**

### **Key Files & Components**
- **`bin/dredServer`**: Entry point, handles server binding via `DRED_HOST` env var
- **`src/server/DredReplicator.ts`**: Core replication logic with logging
- **`src/client/DredClient.ts`**: WebSocket client for testing
- **`scripts/test-client.js`**: Interactive test client with server selection
- **`preprod/`**: Deployment scripts and configuration

### **Known Issues Fixed**
1. **Server Binding**: Fixed `bin/dredServer` to respect `DRED_HOST=0.0.0.0` for external access
2. **Client Protocol**: Fixed `DredClient` to use `insecure: !server.ssl` for HTTP/HTTPS
3. **Replication Logging**: Enhanced error reporting in `DredReplicator.ts`

### **Environment Variables**
- **`DRED_HOST=0.0.0.0`**: Bind server to all interfaces (not just localhost)
- **`DRED_PORT=3029`**: Server port
- **`LOGGING=facility:level`**: Control log output (comma-separated)
- **`BF_API_KEY`**: Required for blockchain operations

## **🎯 Testing Workflow**

### **Step 1: Local Server Setup**
```bash
# Build and launch local server
cd ~/projects/cad/dred/
pnpm build
LOGGING=default:debug,replicant:trace,replicator:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty
```

### **Step 2: Verify Replication**
- Check logs for replication connections to remote servers
- Look for messages like "attempting connection to..." and "replication active"

### **Step 3: Deploy Remote Server (if needed)**
```bash
# Deploy to US server
cd ~/projects/cad/dred/preprod
make setup-dred us
# or update existing deployment
make update-dred us
```

### **Step 4: Test Message Replication**
**Option A: curl Command**
```bash
# Post to DE server (HTTPS)
curl -X POST "https://de.pp.node-01.dred.network/channel/news/message" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "clientid: test-curl-client" \
  -d '{"type": "test-message", "ocid": "curl-test-'$(date +%s)'", "msg": "{\"content\": \"Hello from curl!\", \"timestamp\": \"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'\"}"}'
```

**Option B: Test Client**
```bash
# Launch interactive test client
cd ~/projects/cad/dred/
LOGGING=test-client:info node scripts/test-client.js
```

### **Step 5: Verify Replication**
- Monitor local server logs for replicated messages
- Look for trace-level logs showing message processing
- Verify message appears in local server channels

## **🚨 Current Issues**

### **Primary Problems**
1. **US Server Connectivity**: Port 3029 not accessible externally
2. **curl Commands Failing**: Connection timeouts to remote servers
3. **Client Connection Issues**: Protocol mismatches (HTTP/HTTPS)

### **Root Causes**
- Server binding to `127.0.0.1` instead of `0.0.0.0`
- Missing or incorrect environment variables in deployment
- Firewall/network configuration issues

## **✅ Success Criteria**
1. Local server shows active replication connections in logs
2. Message sent to remote server appears in local server logs
3. Test client can connect and send/receive messages
4. Replication trace logs show message processing
5. All operations work consistently across DE/US/UK servers

## **🔄 Next Steps**
1. Fix server binding issues in deployment
2. Test external connectivity to remote servers
3. Verify message replication end-to-end
4. Document working configuration for future use

## **📝 Notes**
- Use `pnpm test replication` for automated testing
- Redis must be running: `docker-compose up redis`
- All tests run single-threaded to avoid Redis conflicts
- Follow Randall's logging guidelines from recent commits
