#!/bin/bash
set -e

# Minimal DRED Setup Script - Based on S00 Success
# IDEMPOTENT: Safe to run multiple times
# Usage: ./setup-dred-minimal.sh <server_ip>

if [ $# -ne 1 ]; then
    echo "Usage: $0 <server_ip>"
    echo "Example: $0 217.154.34.155"
    exit 1
fi

SERVER_IP="$1"

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${BLUE}🔧 $1${NC}"; }

echo "🚀 DRED Setup (Minimal & Idempotent)"
echo "===================================="
echo "Server: $SERVER_IP"
echo "Based on S00 Success Pattern"
echo ""

# Verify prerequisites
log_step "Verifying prerequisites..."
if ! ssh devops@"$SERVER_IP" "redis-cli ping" | grep -q PONG; then
    log_error "Redis not running. Run 'make setup-infrastructure' first"
    exit 1
fi

if ! ssh devops@"$SERVER_IP" "command -v pnpm && command -v pm2" >/dev/null 2>&1; then
    log_error "Node.js tools not installed. Run 'make setup-infrastructure' first"
    exit 1
fi
log_info "Prerequisites verified"

# Execute setup on server
log_step "Setting up DRED (idempotent)..."
ssh devops@"$SERVER_IP" << 'EOF'
set -e

echo "🔧 IDEMPOTENT CLEANUP: Stopping existing DRED..."
pm2 stop dred 2>/dev/null || true
pm2 delete dred 2>/dev/null || true

echo "🔧 IDEMPOTENT CLEANUP: Removing existing directory..."
cd /home/devops
rm -rf dred

echo "🔧 FRESH START: Cloning DRED..."
git clone https://github.com/Cardano-After-Dark/dred.git dred
cd dred
git checkout feature/onchain-nbh-discovery

echo "🔧 Installing dependencies..."
pnpm install

echo "🔧 Building DRED..."
pnpm build

echo "🔧 Verifying build (S00 pattern)..."
if [ -f "dist/dredServer.mjs" ]; then
    echo "✅ Build successful: dist/dredServer.mjs exists"
    ls -la dist/dredServer.mjs
else
    echo "❌ Build failed: dist/dredServer.mjs missing"
    echo "Available files:"
    find dist/ -name "*.mjs" -o -name "*.js" 2>/dev/null
    exit 1
fi

echo "🔧 Creating environment file..."
# Determine DRED_NODE_ID based on server hostname/IP
SERVER_NAME=$(hostname -s 2>/dev/null || echo "unknown")
SERVER_IP=$(hostname -I | awk '{print $1}' 2>/dev/null || echo "127.0.0.1")

# Generate a unique node ID for this server
DRED_NODE_ID="preprod-${SERVER_NAME}-${SERVER_IP}"

cat > .env << ENVEOF
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
NODE_ENV=production
LOGGING=default:info
DRED_NODE_ID=${DRED_NODE_ID}
BF_API_KEY=${BF_API_KEY:-YOUR_BLOCKFROST_API_KEY_HERE}
ENVEOF

echo "🔧 Server identified as: $DRED_NODE_ID"

echo "🔧 Creating PM2 config (S00 pattern)..."
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
      DRED_NODE_ID: '${DRED_NODE_ID}',
      BF_API_KEY: '${BF_API_KEY:-YOUR_BLOCKFROST_API_KEY_HERE}'
    }
  }]
};
PM2EOF

echo "🔧 Starting DRED with PM2..."
pm2 start ecosystem.config.cjs

echo "🔧 Configuring auto-restart..."
pm2 startup >/dev/null 2>&1 || true
pm2 save >/dev/null 2>&1

echo "🔧 Waiting for startup..."
sleep 5

echo "✅ DRED setup completed!"
echo ""
echo "PM2 Status:"
pm2 status

echo ""
echo "Testing local API:"
if curl -s http://localhost:3029/channels >/dev/null 2>&1; then
    echo "✅ Local API responding"
else
    echo "⚠️  Local API not responding yet"
fi

echo ""
echo "Environment file created: .env"
echo "PM2 config created: ecosystem.config.cjs"
echo "DRED script: dist/dredServer.mjs"
EOF

# Verify from outside
log_step "Verifying deployment..."

# Check PM2 status
if ssh devops@"$SERVER_IP" "pm2 status | grep dred | grep -q online"; then
    log_info "DRED process is online"
else
    log_error "DRED process not online"
    ssh devops@"$SERVER_IP" "pm2 logs dred --lines 10" || true
    exit 1
fi

# Test API
sleep 3
if timeout 10 bash -c "</dev/tcp/$SERVER_IP/3029" >/dev/null 2>&1; then
    log_info "DRED port 3029 accessible"
else
    log_error "DRED port 3029 not accessible"
    echo "Note: Check cloud firewall settings"
fi

echo ""
log_info "🎉 DRED Setup Completed Successfully!"
echo ""
echo "✅ DRED running with PM2"
echo "✅ Auto-restart configured"
echo "✅ Environment file created"
echo "✅ Using S00 success pattern"
echo ""
echo "DRED is running on $SERVER_IP:3029"
echo ""
echo "Commands to manage DRED:"
echo "  ssh devops@$SERVER_IP 'pm2 status'"
echo "  ssh devops@$SERVER_IP 'pm2 logs dred'"
echo "  ssh devops@$SERVER_IP 'pm2 restart dred'"
echo ""
echo "Test API:"
echo "  curl -s http://$SERVER_IP:3029/channels"
echo ""
echo "🔄 This script is IDEMPOTENT - safe to run multiple times" 