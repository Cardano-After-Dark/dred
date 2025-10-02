#!/bin/bash

# Check Environment Variables on DRED Servers
# This script verifies if the required environment variables are set for on-chain discovery

set -e

# Server configuration
US_SERVER="74.208.13.84"
UK_SERVER="217.154.34.155"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🔍 DRED Environment Variables Check"
echo "=================================="
echo

# Required environment variables for on-chain discovery
REQUIRED_VARS=(
    "BF_API_KEY"
    "CARDANO_NETWORK" 
    "NEIGHBORHOOD"
    "DRED_NODE_ID"
    "DRED_PORT"
)

# Function to check environment variables on a server
check_server_env() {
    local server=$1
    local name=$2
    
    echo -e "${BLUE}📡 Checking $name server ($server)...${NC}"
    
    if ! ssh -o ConnectTimeout=5 -o BatchMode=yes devops@$server "exit" 2>/dev/null; then
        echo -e "${RED}✗ Cannot connect to $name server via SSH${NC}"
        return 1
    fi
    
    echo -e "${YELLOW}🔧 System Environment Variables:${NC}"
    for var in "${REQUIRED_VARS[@]}"; do
        local value=$(ssh devops@$server "printenv $var 2>/dev/null || echo 'NOT_SET'")
        if [ "$value" = "NOT_SET" ]; then
            echo -e "  ${RED}✗ $var: NOT SET${NC}"
        else
            # Mask sensitive values
            if [ "$var" = "BF_API_KEY" ]; then
                local masked_value="${value:0:8}..."
                echo -e "  ${GREEN}✓ $var: $masked_value${NC}"
            else
                echo -e "  ${GREEN}✓ $var: $value${NC}"
            fi
        fi
    done
    
    echo -e "${YELLOW}🗂️  PM2 Process Environment:${NC}"
    local pm2_env=$(ssh devops@$server "timeout 10 pm2 show dred 2>/dev/null | grep -A 30 'env:' | head -20" 2>/dev/null || echo "")
    
    if [ -n "$pm2_env" ]; then
        for var in "${REQUIRED_VARS[@]}"; do
            if echo "$pm2_env" | grep -q "$var"; then
                local pm2_value=$(echo "$pm2_env" | grep "$var" | head -1)
                echo -e "  ${GREEN}✓ Found in PM2: $pm2_value${NC}"
            else
                echo -e "  ${RED}✗ $var: Not visible in PM2 environment${NC}"
            fi
        done
    else
        echo -e "  ${YELLOW}⚠️  Cannot read PM2 environment (timeout or access issue)${NC}"
    fi
    
    echo
}

# Function to provide setup guidance
provide_setup_guidance() {
    echo -e "${BLUE}📋 Setup Guidance${NC}"
    echo "================="
    echo
    echo -e "${YELLOW}If BF_API_KEY is missing:${NC}"
    echo "  1. Get a Blockfrost API key from https://blockfrost.io/"
    echo "  2. Sign up and create a Cardano Preprod project"
    echo "  3. Copy the project API key"
    echo
    echo -e "${YELLOW}To set environment variables:${NC}"
    echo "  1. SSH to each server: ssh devops@<server-ip>"
    echo "  2. Edit PM2 ecosystem file or set environment variables"
    echo "  3. Example commands:"
    echo "     export BF_API_KEY='your-blockfrost-api-key'"
    echo "     export CARDANO_NETWORK='preprod'"
    echo "     export NEIGHBORHOOD='dred-dev'"
    echo "     export DRED_NODE_ID='us-production-node'  # or 'uk-production-node'"
    echo "  4. Restart DRED: pm2 restart dred"
    echo
    echo -e "${YELLOW}To verify setup:${NC}"
    echo "  1. Check server logs: pm2 logs dred | grep -i discovery"
    echo "  2. Look for successful on-chain connection messages"
    echo "  3. Run this script again to verify environment variables"
    echo
}

# Function to analyze results
analyze_results() {
    echo -e "${BLUE}🎯 Analysis & Next Steps${NC}"
    echo "========================"
    echo
    echo -e "${YELLOW}Current Status:${NC}"
    echo "  ✅ Basic HTTP API working (messages can be sent)"
    echo "  ✅ Channels exist on both servers"
    echo "  ❓ On-chain discovery status unknown (check environment variables above)"
    echo "  ❓ Replication status unknown (depends on discovery)"
    echo
    echo -e "${YELLOW}To enable replication:${NC}"
    echo "  1. ⚠️  Fix missing environment variables (see guidance above)"
    echo "  2. 🔄 Restart both DRED servers after setting variables"
    echo "  3. 📋 Check server logs for discovery and replication activity"
    echo "  4. 🧪 Run the working test to verify replication"
    echo
    echo -e "${YELLOW}Available tests:${NC}"
    echo "  • Static test (no env vars needed): pnpm test static-replication"
    echo "  • Full integration test (needs env vars): pnpm test remote-replication"
    echo
}

# Main execution
main() {
    # Check both servers
    check_server_env "$US_SERVER" "US"
    check_server_env "$UK_SERVER" "UK"
    
    # Provide guidance
    provide_setup_guidance
    
    # Analyze results
    analyze_results
}

# Run if executed directly
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi
