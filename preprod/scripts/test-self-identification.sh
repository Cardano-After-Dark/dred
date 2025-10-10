#!/bin/bash
set -e

# Test Self-Identification Fix on VPS
# Usage: ./test-self-identification.sh <server_ip>

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
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_step() { echo -e "${BLUE}🔧 $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

echo "🧪 Testing Self-Identification Fix"
echo "================================="
echo "Server: $SERVER_IP"
echo ""

# Check if DRED is running
log_step "Checking DRED status..."
if ! ssh devops@"$SERVER_IP" "pm2 status | grep dred | grep -q online"; then
    log_error "DRED is not running. Please deploy first with 'make setup-dred uk'"
    exit 1
fi
log_info "DRED is running"

# Check DRED_NODE_ID is set
log_step "Checking DRED_NODE_ID configuration..."
NODE_ID=$(ssh devops@"$SERVER_IP" "cd dred && grep DRED_NODE_ID .env | cut -d= -f2" 2>/dev/null || echo "")
if [ -z "$NODE_ID" ]; then
    log_error "DRED_NODE_ID not found in .env file"
    exit 1
fi
log_info "DRED_NODE_ID: $NODE_ID"

# Check PM2 environment
log_step "Checking PM2 environment variables..."
if ssh devops@"$SERVER_IP" "pm2 env 0 | grep -q DRED_NODE_ID"; then
    log_info "DRED_NODE_ID configured in PM2"
else
    log_warning "DRED_NODE_ID may not be in PM2 environment"
fi

# Check recent logs for self-filtering behavior
log_step "Checking logs for self-identification behavior..."
echo ""
echo "🔍 Recent DRED logs (looking for self-filtering):"
echo "=================================================="

# Look for filtering messages in logs
FILTER_LOGS=$(ssh devops@"$SERVER_IP" "pm2 logs dred --lines 100 --nostream 2>/dev/null | grep -E '(Filtered out self-node|DRED_NODE_ID|getHostList)' | tail -10" || echo "")

if [ -n "$FILTER_LOGS" ]; then
    echo "$FILTER_LOGS"
    echo ""
    if echo "$FILTER_LOGS" | grep -q "Filtered out self-node"; then
        log_info "✅ Self-filtering is working! Found filtering messages in logs"
    else
        log_warning "Self-filtering messages found, but no 'Filtered out self-node' detected"
    fi
else
    log_warning "No self-filtering messages found in recent logs"
    echo ""
    echo "🔍 Recent general logs:"
    echo "======================="
    ssh devops@"$SERVER_IP" "pm2 logs dred --lines 20 --nostream 2>/dev/null | tail -10" || true
fi

# Test API endpoints
log_step "Testing API endpoints..."
if timeout 5 curl -s "http://$SERVER_IP:3029/channels" >/dev/null 2>&1; then
    log_info "DRED API responding on port 3029"
    
    # Try to get channels
    CHANNELS=$(timeout 5 curl -s "http://$SERVER_IP:3029/channels" 2>/dev/null || echo "[]")
    echo "📋 Available channels: $CHANNELS"
else
    log_warning "DRED API not responding externally (may be firewall)"
fi

# Check if this is on-chain discovery enabled
log_step "Checking discovery configuration..."
if ssh devops@"$SERVER_IP" "cd dred && grep -q 'NeighborhoodDiscovery' dist/dredServer.mjs 2>/dev/null"; then
    log_info "NeighborhoodDiscovery code is present in build"
else
    log_warning "NeighborhoodDiscovery not found in build - using StaticHostDiscovery"
fi

echo ""
echo "🎯 Test Summary"
echo "==============="
echo "Server: $SERVER_IP"
echo "Node ID: $NODE_ID"
echo "Branch: feature/onchain-nbh-discovery"
echo ""

# Provide restart command for testing
echo "💡 To restart DRED and see fresh logs:"
echo "   ssh devops@$SERVER_IP 'cd dred && pm2 restart dred'"
echo ""
echo "💡 To watch logs in real-time:"
echo "   ssh devops@$SERVER_IP 'pm2 logs dred --lines 0'"
echo ""
echo "💡 To test replication setup (if on-chain discovery is working):"
echo "   ssh devops@$SERVER_IP 'cd dred && LOGGING=1 pm2 restart dred'"
echo "   # Then watch logs for 'Filtered out self-node' messages"
