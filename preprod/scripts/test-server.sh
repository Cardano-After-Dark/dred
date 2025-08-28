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

echo "🌐 Testing $SERVER_NAME server ($SERVER_IP)..."
echo "=============================="

# Test SSH connection
if ssh -o ConnectTimeout=5 -o BatchMode=yes -o LogLevel=ERROR "$SSH_USER@$SERVER_IP" "exit 0" 2>/dev/null; then
    log_info "SSH connection successful"
else
    log_error "SSH connection failed"
    echo ""
    exit 1
fi

# Test DRED server connectivity first
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
echo "🔧 Key Environment Variables:"
echo "========================="

# Get environment variables and PM2 status
{
ssh -o ConnectTimeout=5 -o LogLevel=QUIET -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o UpdateHostKeys=no -o BatchMode=yes -T "$SSH_USER@$SERVER_IP" 'bash -s' << 'EOF'
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

echo ""
echo "📊 PM2 Process Status:"
if command -v pm2 >/dev/null 2>&1; then
    pm2 status 2>/dev/null | grep -E "dred" | head -1 || echo "❌ DRED process not found in PM2"
else
    echo "❌ PM2 not installed"
fi
EOF
} | grep -v -E "Welcome to Ubuntu|Documentation:|Management:|Support:|System information|System load:|Usage of|Memory usage:|Swap usage:|Strictly confined|just raised|https://|Expanded Security|updates can be applied|To see these|Enable ESM|See https://|or run:|^\s*\*|^\s*$" | grep -v "System restart required"

echo "" 