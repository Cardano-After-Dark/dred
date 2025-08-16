#!/bin/bash
set -e

# Fixed version - proper variable expansion
# Usage: ./fix-api-key-v2.sh <server_ip> <api_key>

if [ $# -ne 2 ]; then
    echo "Usage: $0 <server_ip> <blockfrost_api_key>"
    echo "Example: $0 217.154.34.155 preprodXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    exit 1
fi

SERVER_IP="$1"
API_KEY="$2"

echo "🔑 Fixed API Key Setup"
echo "====================="
echo "Server: $SERVER_IP"
echo "API Key: ${API_KEY:0:20}..."
echo ""

# Update .env file
echo "🔧 Updating .env file..."
ssh devops@"$SERVER_IP" "cd dred && sed -i 's/BF_API_KEY=.*/BF_API_KEY=$API_KEY/' .env"

# Get DRED_NODE_ID from .env
echo "🔧 Getting DRED_NODE_ID..."
DRED_NODE_ID=$(ssh devops@"$SERVER_IP" "cd dred && grep DRED_NODE_ID .env | cut -d= -f2")
echo "Node ID: $DRED_NODE_ID"

# Create PM2 config with proper variable substitution
echo "🔧 Creating fixed PM2 config..."
ssh devops@"$SERVER_IP" "cd dred && cat > ecosystem.config.cjs << EOF
module.exports = {
  apps: [{
    name: 'dred',
    script: 'dist/dredServer.mjs',
    cwd: '/home/devops/dred',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '600M',
    env: {
      NODE_ENV: 'production',
      REDIS_URL: 'redis://localhost:6379',
      DRED_PORT: '3029',
      DRED_HOST: '0.0.0.0',
      LOGGING: 'default:info',
      DRED_NODE_ID: '$DRED_NODE_ID',
      BF_API_KEY: '$API_KEY'
    }
  }]
};
EOF"

# Force complete restart
echo "🔧 Restarting DRED..."
ssh devops@"$SERVER_IP" "cd dred && pm2 delete dred && pm2 start ecosystem.config.cjs && pm2 save"

# Verify
sleep 5
echo "🔧 Verifying..."
if ssh devops@"$SERVER_IP" "pm2 status | grep dred | grep -q online"; then
    echo "✅ DRED restarted successfully"
    
    echo ""
    echo "🔍 Checking environment:"
    ssh devops@"$SERVER_IP" "pm2 env 0 | grep -E '(BF_API_KEY|DRED_NODE_ID)'"
    
else
    echo "❌ DRED failed to start"
    ssh devops@"$SERVER_IP" "pm2 logs dred --lines 10" || true
    exit 1
fi

echo ""
echo "✅ Fixed! Wait 30 seconds then test with:"
echo "   make test-self-id uk"
