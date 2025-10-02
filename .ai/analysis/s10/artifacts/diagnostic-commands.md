# DRED Replication Diagnostic Commands

Please run these commands in your environment and share the outputs:

## 1. TypeScript Integration Test
```bash
cd /Users/psuzzi/projects/cad/dred
pnpm test remote-replication
```

## 2. Check Server Environment Variables
```bash
# US Server
ssh devops@74.208.13.84 "printenv | grep -E 'NEIGHBORHOOD|DRED_NODE_ID|DRED_'"

# UK Server  
ssh devops@217.154.34.155 "printenv | grep -E 'NEIGHBORHOOD|DRED_NODE_ID|DRED_'"
```

## 3. Check PM2 Process Environment
```bash
# US Server
ssh devops@74.208.13.84 "pm2 show dred | grep -A 20 'env:'"

# UK Server
ssh devops@217.154.34.155 "pm2 show dred | grep -A 20 'env:'"
```

## 4. Check Recent Server Logs (last 20 lines)
```bash
# US Server logs
ssh devops@74.208.13.84 "pm2 logs dred --lines 20"

# UK Server logs
ssh devops@217.154.34.155 "pm2 logs dred --lines 20"
```

## 5. Look for Discovery/Replication Activity
```bash
# US Server - search for discovery/replication activity
ssh devops@74.208.13.84 "pm2 logs dred --lines 50 | grep -i -E 'discovery|neighbor|replication|host.*ready'"

# UK Server - search for discovery/replication activity  
ssh devops@217.154.34.155 "pm2 logs dred --lines 50 | grep -i -E 'discovery|neighbor|replication|host.*ready'"
```

## 6. Check if Replication is Active (Alternative Check)
```bash
# Check if servers are actively trying to connect to each other
ssh devops@74.208.13.84 "netstat -an | grep 3029"
ssh devops@217.154.34.155 "netstat -an | grep 3029"
```

---

**Please run these commands and share the outputs.** 

The most important ones are:
1. **TypeScript test** - will show exactly what's failing
2. **Environment variables** - to see if NEIGHBORHOOD and DRED_NODE_ID are set correctly
3. **Recent logs** - to see if there's any discovery/replication activity

This will help me understand whether:
- Servers are in the same neighborhood
- On-chain discovery is working
- Replication is even attempting to start
- There are any error messages
