#!/bin/bash
set -e

# Update DRED to latest feature/onchain-nbh-discovery
# This script runs ON the VPS server

echo "🔄 Updating DRED (Self-Identification Fix)"
echo "=========================================="

cd /home/devops/dred

echo "🔧 Stopping DRED..."
pm2 stop dred || true

echo "🔧 Pulling latest changes..."
git fetch origin
git checkout feature/onchain-nbh-discovery
git pull origin feature/onchain-nbh-discovery

echo "🔧 Installing dependencies..."
pnpm install

echo "🔧 Building DRED..."
pnpm build

echo "🔧 Verifying build..."
if [ -f "dist/dredServer.mjs" ]; then
    echo "✅ Build successful: dist/dredServer.mjs exists"
else
    echo "❌ Build failed: dist/dredServer.mjs missing"
    exit 1
fi

# Preserve existing DRED_NODE_ID from .env if it exists
if [ -f ".env" ] && grep -q "DRED_NODE_ID" .env; then
    EXISTING_NODE_ID=$(grep DRED_NODE_ID .env | cut -d= -f2)
    echo "🔧 Preserving existing DRED_NODE_ID: $EXISTING_NODE_ID"
else
    # Generate new DRED_NODE_ID if missing
    SERVER_NAME=$(hostname -s 2>/dev/null || echo "unknown")
    SERVER_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || echo "127.0.0.1")
    EXISTING_NODE_ID="preprod-${SERVER_NAME}-${SERVER_IP}"
    echo "🔧 Generated new DRED_NODE_ID: $EXISTING_NODE_ID"
fi

echo "🔧 Updating environment file..."
cat > .env << ENVEOF
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
NODE_ENV=production
LOGGING=default:info
DRED_NODE_ID=${EXISTING_NODE_ID}
ENVEOF

echo "🔧 Updating PM2 config..."
cat > ecosystem.config.cjs << PM2EOF
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
      DRED_NODE_ID: '${EXISTING_NODE_ID}'
    }
  }]
};
PM2EOF

echo "🔧 Starting DRED..."
pm2 start ecosystem.config.cjs

echo "🔧 Saving PM2 configuration..."
pm2 save

echo "🔧 Waiting for startup..."
sleep 3

echo "✅ DRED Update Completed!"
echo ""
echo "Status:"
pm2 status | grep dred

echo ""
echo "Node ID: $EXISTING_NODE_ID"
echo "Branch: feature/onchain-nbh-discovery"
echo ""
echo "To test the self-identification fix:"
echo "  pm2 logs dred --lines 0"
echo "  # Look for 'Filtered out self-node' messages"
