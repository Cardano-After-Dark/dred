#!/bin/bash
set -e

# Simple server testing script
# Usage: ./test-server.sh <server_ip>

if [ $# -ne 1 ]; then
    echo "Usage: $0 <server_ip>"
    exit 1
fi

SERVER_IP="$1"
SSH_USER="devops"

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✓ $1${NC}"; }
log_error() { echo -e "${RED}✗ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠ $1${NC}"; }

# Get server name for display
SERVER_NAME=$(echo $SERVER_IP | sed 's/74.208.13.84/US/; s/85.215.215.192/DE/; s/217.154.34.155/UK/')

echo "Testing $SERVER_NAME server ($SERVER_IP)..."

# Test SSH connection
if ssh -o ConnectTimeout=5 -o BatchMode=yes "$SSH_USER@$SERVER_IP" "echo 'SSH OK'" 2>/dev/null; then
    log_info "SSH connection successful"
else
    log_error "SSH connection failed"
    echo ""
    exit 1
fi

# Test environment variables
echo -e "\n🔧 Environment Variables:"
echo "========================="
ssh -o ConnectTimeout=5 "$SSH_USER@$SERVER_IP" << 'EOF'
cd dred 2>/dev/null || { echo "❌ DRED directory not found"; exit 1; }

echo "📋 Key Configuration Variables:"
if [ -f .env ]; then
    echo "   DRED_NODE_ID: $(grep DRED_NODE_ID .env | cut -d= -f2 || echo 'NOT SET')"
    echo "   CARDANO_NETWORK: $(grep CARDANO_NETWORK .env | cut -d= -f2 || echo 'NOT SET')"
    echo "   DRED_PORT: $(grep DRED_PORT .env | cut -d= -f2 || echo 'NOT SET')"
    echo "   USE_STATIC_DISCOVERY: $(grep USE_STATIC_DISCOVERY .env | cut -d= -f2 || echo 'NOT SET')"
    echo "   SERVER_IP: $(grep SERVER_IP .env | cut -d= -f2 || echo 'NOT SET')"
else
    echo "❌ .env file not found"
fi

echo -e "\n📊 PM2 Process Status:"
pm2 status 2>/dev/null | grep -E "(dred|Status)" || echo "❌ PM2 not running or DRED process not found"
EOF

# Test DRED server connectivity
echo -e "\n🌐 DRED Server Connectivity:"
echo "=============================="
if command -v curl >/dev/null 2>&1; then
    if curl -s --connect-timeout 3 "http://$SERVER_IP:3029/channels" >/dev/null 2>&1; then
        log_info "DRED server responding on port 3029"
        # Try to get channels info
        CHANNELS=$(curl -s --connect-timeout 3 "http://$SERVER_IP:3029/channels" 2>/dev/null)
        if [ $? -eq 0 ] && [ -n "$CHANNELS" ]; then
            echo "   Available channels: $CHANNELS"
        fi
    else
        log_warn "DRED server not responding on port 3029"
    fi
else
    # Fallback to port test if curl not available
    if timeout 5 bash -c "</dev/tcp/$SERVER_IP/3029" >/dev/null 2>&1; then
        log_info "DRED port 3029 accessible"
    else
        log_warn "DRED port 3029 not accessible"
    fi
fi

echo "" 