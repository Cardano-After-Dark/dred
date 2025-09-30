# Deployment Fix: Server Binding Issue

## Root Cause Identified ✅
- Server is binding to `127.0.0.1:3029` instead of `0.0.0.0:3029`
- The issue is in `myServerInfo.address` returning `'127.0.0.1'` from NeighborhoodDiscovery
- Server code: `this.listener = this.api.listen(Number(port), address);` uses `myInfo.address`

## Quick Fix Solution

### Option 1: Override in Code (Recommended)
Modify the server startup to force `0.0.0.0` binding regardless of discovery result:

```bash
# Connect to server and modify the binding
ssh devops@74.208.13.84 "cd dred && cat > fix-binding.js << 'EOF'
// Quick fix: Override myServerInfo address to bind to all interfaces
const fs = require('fs');
const content = fs.readFileSync('bin/dredServer', 'utf8');
const fixed = content.replace(
    'const server = await createServer({', 
    `// Force external binding
    myServerInfo.address = process.env.DRED_HOST || '0.0.0.0';
    const server = await createServer({`
);
fs.writeFileSync('bin/dredServer', fixed);
console.log('Fixed binding to use DRED_HOST');
EOF
node fix-binding.js && pm2 restart dred"
```

### Option 2: Environment Override (Simpler)
The issue might be that the PM2 environment isn't being updated. Let's restart with explicit environment:

```bash
ssh devops@74.208.13.84 "cd dred && pm2 restart dred --update-env"
```

### Option 3: Direct PM2 Config Fix
Update the PM2 ecosystem config to force the correct host:

```bash
ssh devops@74.208.13.84 "cd dred && sed -i 's/DRED_HOST.*0.0.0.0/DRED_HOST: \"0.0.0.0\"/' ecosystem.config.cjs && pm2 restart dred --update-env"
```

## Expected Result
After fix, `netstat -tlnp | grep 3029` should show:
```
tcp        0      0 0.0.0.0:3029            0.0.0.0:*               LISTEN
```

## Test Commands
```bash
# 1. Check binding
ssh devops@74.208.13.84 "netstat -tlnp | grep 3029"

# 2. Test external access  
curl -s http://74.208.13.84:3029/channels

# 3. If successful, update test client to US server
```

