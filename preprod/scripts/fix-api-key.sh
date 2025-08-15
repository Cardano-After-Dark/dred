#!/bin/bash
set -e

# Quick fix for missing BF_API_KEY
# Usage: ./fix-api-key.sh <server_ip> <api_key>

if [ $# -ne 2 ]; then
    echo "Usage: $0 <server_ip> <blockfrost_api_key>"
    echo "Example: $0 217.154.34.155 preprodXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    echo ""
    echo "Get a Blockfrost API key at: https://blockfrost.io"
    echo "Select 'Preprod' testnet for testing"
    exit 1
fi

SERVER_IP="$1"
API_KEY="$2"

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${BLUE}🔧 $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

echo "🔑 Adding Blockfrost API Key"
echo "============================"
echo "Server: $SERVER_IP"
echo "API Key: ${API_KEY:0:20}..."
echo ""

# Add BF_API_KEY to .env file
log_step "Adding BF_API_KEY to .env..."
ssh devops@"$SERVER_IP" "cd dred && echo 'BF_API_KEY=$API_KEY' >> .env"

# Update PM2 config to include BF_API_KEY
log_step "Updating PM2 configuration..."
ssh devops@"$SERVER_IP" << EOF
cd dred

# Get current DRED_NODE_ID
DRED_NODE_ID=\$(grep DRED_NODE_ID .env | cut -d= -f2)

# Create new PM2 config with BF_API_KEY
cat > ecosystem.config.cjs << 'PM2EOF'
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
      DRED_NODE_ID: '\${DRED_NODE_ID}',
      BF_API_KEY: '$API_KEY'
    }
  }]
};
PM2EOF

echo "Updated PM2 config with BF_API_KEY"
EOF

# Restart DRED
log_step "Restarting DRED with new configuration..."
ssh devops@"$SERVER_IP" "cd dred && pm2 delete dred && pm2 start ecosystem.config.cjs"

# Verify
sleep 3
log_step "Verifying startup..."
if ssh devops@"$SERVER_IP" "pm2 status | grep dred | grep -q online"; then
    log_info "DRED restarted successfully"
else
    log_error "DRED failed to start"
    ssh devops@"$SERVER_IP" "pm2 logs dred --lines 10" || true
    exit 1
fi

echo ""
log_info "🎉 BF_API_KEY Added Successfully!"
echo ""
echo "Next steps:"
echo "1. Wait 30 seconds for initialization"
echo "2. Run: make test-self-id uk"
echo "3. Look for 'Filtered out self-node' messages"
echo ""
echo "Monitor logs:"
echo "  ssh devops@$SERVER_IP 'pm2 logs dred --lines 0'"
