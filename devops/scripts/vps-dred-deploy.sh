#!/bin/bash
set -e

# Load environment variables
source "$(dirname "$0")/load-env.sh"

# Minimal DRED Setup Script - Based on S00 Success
# IDEMPOTENT: Safe to run multiple times
# Usage: ./setup-dred-minimal.sh <server_ip> <server_name>

if [ $# -ne 2 ]; then
    echo "Usage: $0 <server_ip> <server_name>"
    echo "Example: $0 217.154.34.155 UK"
    exit 1
fi

SERVER_IP="$1"
SERVER_NAME="$2"

# Load server-specific configuration (in addition to ops.env)
CONFIG_FILE="$(dirname "$0")/../config/$(echo "$SERVER_NAME" | tr '[:upper:]' '[:lower:]').env"
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Configuration file not found: $CONFIG_FILE"
    echo "Available configurations:"
    ls -1 "$(dirname "$0")/../config/"*.env 2>/dev/null || echo "  No configuration files found"
    exit 1
fi

echo "📋 Loading server configuration from: $CONFIG_FILE"
source "$CONFIG_FILE"

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
ssh devops@"$SERVER_IP" << EOF
set -e

# Set configuration variables from config file
export BF_API_KEY="$BF_API_KEY"
export DRED_NODE_ID="$DRED_NODE_ID"
export CARDANO_NETWORK="$CARDANO_NETWORK"
export LOGGING="$LOGGING"
export USE_STATIC_DISCOVERY="$USE_STATIC_DISCOVERY"
export DRED_USE_INSECURE="$DRED_USE_INSECURE"
export SERVER_IP="$SERVER_IP"

echo "🔧 IDEMPOTENT CLEANUP: Stopping existing DRED..."
pm2 stop dred 2>/dev/null || true
pm2 delete dred 2>/dev/null || true

echo "🔧 IDEMPOTENT CLEANUP: Checking port 3029..."
PORT_PIDS=\$(sudo lsof -ti:3029 2>/dev/null || true)
if [ -n "\$PORT_PIDS" ]; then
    echo "⚠️  WARNING: Port 3029 is still in use by process(es): \$PORT_PIDS"
    echo "🔧 Auto-killing processes using port 3029..."
    for PID in \$PORT_PIDS; do
        echo "   Killing PID \$PID"
        sudo kill -9 \$PID 2>/dev/null || true
    done
    sleep 2
    # Verify port is free
    if sudo lsof -ti:3029 2>/dev/null; then
        echo "❌ ERROR: Failed to free port 3029"
        exit 1
    fi
    echo "✅ Port 3029 is now free"
else
    echo "✅ Port 3029 is free"
fi

echo "🔧 IDEMPOTENT CLEANUP: Removing existing directory..."
cd /home/devops
rm -rf dred

echo "🔧 FRESH START: Cloning DRED..."
git clone https://github.com/Cardano-After-Dark/dred.git dred
cd dred
# git checkout feature/onchain-nbh-discovery
git checkout feature/onchain-replication-m2



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
# Configuration variables loaded from config file:
# - BF_API_KEY: Blockfrost API key for Cardano network access
# - DRED_NODE_ID: Unique identifier for this server instance  
# - CARDANO_NETWORK: Cardano network (preprod/mainnet)
# - LOGGING: Log level configuration
# - USE_STATIC_DISCOVERY: Discovery method (false=NeighborhoodDiscovery, true=StaticHostDiscovery)


cat > .env << ENVEOF
REDIS_URL=redis://localhost:6379
DRED_PORT=3029
DRED_HOST=0.0.0.0
SERVER_IP=${SERVER_IP}
NODE_ENV=production
LOGGING=${LOGGING}
DRED_NODE_ID=${DRED_NODE_ID}
BF_API_KEY=${BF_API_KEY}
CARDANO_NETWORK=${CARDANO_NETWORK}
USE_STATIC_DISCOVERY=${USE_STATIC_DISCOVERY}
DRED_USE_INSECURE=${DRED_USE_INSECURE}
ENVEOF

echo "🔧 Server identified as: $DRED_NODE_ID"

echo "🔧 Server using blockfrost API: $BF_API_KEY"

echo "🔧 Server using cardano network: $CARDANO_NETWORK"

echo "🔧 Server discovery method: USE_STATIC_DISCOVERY=$USE_STATIC_DISCOVERY"

echo "🔧 Server HTTP/HTTPS mode: DRED_USE_INSECURE=$DRED_USE_INSECURE"

echo "🔧 Server IP: $SERVER_IP"

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
      LOGGING: '${LOGGING}',
      DRED_NODE_ID: '${DRED_NODE_ID}',
      BF_API_KEY: '${BF_API_KEY}',
      CARDANO_NETWORK: '${CARDANO_NETWORK}',
      USE_STATIC_DISCOVERY: '${USE_STATIC_DISCOVERY}',
      DRED_USE_INSECURE: '${DRED_USE_INSECURE}',
      SERVER_IP: '${SERVER_IP}'
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