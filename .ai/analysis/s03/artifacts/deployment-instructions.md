# Deployment Instructions: Cross-Server Discovery & Replication

## Prerequisites

1. **Real Server IPs**: Replace placeholders in config files with actual IPs
2. **SSH Access**: Ensure you can SSH into both US and UK servers
3. **Port Access**: Confirm port 3029 is open on both servers

## Step 1: Prepare Configuration Files

### 1.1 Create Production Discovery Config

Create `discovery-config.json` with your real server IPs:

```json
{
  "neighborhood": "production-nbh",
  "servers": [
    {
      "serverId": "US",
      "address": "YOUR_US_SERVER_IP", 
      "port": 3029,
      "insecure": false
    },
    {
      "serverId": "UK",
      "address": "YOUR_UK_SERVER_IP",
      "port": 3029,
      "insecure": false
    }
  ]
}
```

### 1.2 Environment Variables Template

Create `.env.production`:

```bash
# Discovery configuration
DRED_DISCOVERY_CONFIG=/opt/dred/config/discovery-config.json

# Server identification (different for each server)
DRED_SERVER_ID=US  # Change to "UK" for UK server

# Network configuration
DRED_HOST=0.0.0.0
DRED_PORT=3029

# Redis configuration
REDIS_URL=redis://localhost:6379

# Neighborhood
DRED_NEIGHBORHOOD=production-nbh
```

## Step 2: Deploy Code Changes

### 2.1 Update Codebase

```bash
# On your local machine
git add src/peers/StaticHostDiscovery.ts
git add src/server/DredServer.ts  # If adding admin API
git commit -m "feat: file-based discovery with admin API"
git push origin main
```

### 2.2 Deploy to US Server

```bash
# SSH into US server
ssh user@YOUR_US_SERVER_IP

# Navigate to DRED directory
cd /opt/dred

# Pull latest changes
git pull origin main

# Install dependencies if needed
pnpm install

# Copy configuration files
sudo mkdir -p /opt/dred/config
sudo cp discovery-config.json /opt/dred/config/
sudo cp .env.production /opt/dred/.env

# Set correct server ID for US
sudo sed -i 's/DRED_SERVER_ID=.*/DRED_SERVER_ID=US/' /opt/dred/.env

# Set permissions
sudo chown -R dred:dred /opt/dred/config
```

### 2.3 Deploy to UK Server

```bash
# SSH into UK server
ssh user@YOUR_UK_SERVER_IP

# Same steps as US, but set UK server ID
cd /opt/dred
git pull origin main
pnpm install
sudo mkdir -p /opt/dred/config
sudo cp discovery-config.json /opt/dred/config/
sudo cp .env.production /opt/dred/.env

# Set correct server ID for UK
sudo sed -i 's/DRED_SERVER_ID=.*/DRED_SERVER_ID=UK/' /opt/dred/.env

sudo chown -R dred:dred /opt/dred/config
```

## Step 3: Update Server Startup

### 3.1 Modify DredServer Constructor

Ensure your server startup code uses the environment variables:

```typescript
// In your server startup script
const discovery = new StaticHostDiscovery({
    configFile: process.env.DRED_DISCOVERY_CONFIG,
    neighborhood: process.env.DRED_NEIGHBORHOOD || "production-nbh"
});

const server = new DredServer({
    discovery,
    neighborhood: process.env.DRED_NEIGHBORHOOD || "production-nbh",
    waitFor: "minimal"
}, process.env.DRED_SERVER_ID || "unknown", 0);
```

### 3.2 Restart Services

```bash
# On both servers
sudo systemctl restart dred
# OR if using PM2
pm2 restart dred
# OR if running manually
pkill -f dred && nohup pnpm start &
```

## Step 4: Verification

### 4.1 Check Discovery Status

```bash
# Test US server discovery
curl http://YOUR_US_SERVER_IP:3029/admin/discovery/status

# Test UK server discovery  
curl http://YOUR_UK_SERVER_IP:3029/admin/discovery/status
```

Expected response:
```json
{
  "discoveryType": "StaticHostDiscovery",
  "neighborhood": "production-nbh", 
  "hostsCount": 2,
  "hosts": [...],
  "myServerId": "US"
}
```

### 4.2 Test Cross-Server Communication

```bash
# Send message to US server
curl -X POST http://YOUR_US_SERVER_IP:3029/channel/news/message \
  -H "Content-Type: application/json" \
  -d '{
    "msg": "Test message from deployment",
    "type": "deployment-test",
    "ocid": "deploy-test-001"
  }'

# Check if message appears on UK server (manual verification)
# Connect a client to UK server and check news channel
```

## Step 5: Run Tests

### 5.1 Set Up Test Environment

```bash
# On your local machine
export US_SERVER_IP=YOUR_US_SERVER_IP
export UK_SERVER_IP=YOUR_UK_SERVER_IP
export US_SERVER_PORT=3029
export UK_SERVER_PORT=3029
export NODE_ENV=production
```

### 5.2 Run Discovery Tests

```bash
pnpm test discovery
# OR
npx vitest src/server/__tests__/discovery.test.ts
```

### 5.3 Run Replication Tests

```bash
pnpm test cross-server-replication  
# OR
npx vitest src/server/__tests__/cross-server-replication.test.ts
```

## Troubleshooting

### Discovery Issues
- Check config file exists: `ls -la /opt/dred/config/discovery-config.json`
- Verify file permissions: `sudo chown dred:dred /opt/dred/config/*`
- Check environment variable: `echo $DRED_DISCOVERY_CONFIG`

### Network Issues
- Test connectivity: `telnet OTHER_SERVER_IP 3029`
- Check firewall: `sudo ufw status` or `sudo iptables -L`
- Verify server is listening: `netstat -tlnp | grep 3029`

### Replication Issues
- Check server logs for replication errors
- Verify both servers are using same neighborhood
- Test admin API endpoints for discovery status

## Security Notes

1. **HTTPS**: Consider setting `insecure: false` and using HTTPS in production
2. **Firewall**: Ensure only necessary ports are open
3. **Authentication**: Plan to implement server authentication in next iteration
4. **Config Security**: Protect configuration files with appropriate permissions

## Rolling Back

If issues occur, rollback procedure:

```bash
# Revert to previous commit
git checkout HEAD~1

# Restart with old configuration
sudo systemctl restart dred

# Or use localhost discovery for emergency
export DRED_DISCOVERY_CONFIG=""
sudo systemctl restart dred
``` 