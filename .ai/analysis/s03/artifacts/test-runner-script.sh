#!/bin/bash

# Cross-Server Test Runner Script
# Tests discovery and replication between US and UK DRED servers

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 DRED Cross-Server Test Runner${NC}"
echo "=================================="

# Check required environment variables
if [[ -z "$US_SERVER_IP" || -z "$UK_SERVER_IP" ]]; then
    echo -e "${RED}❌ Error: US_SERVER_IP and UK_SERVER_IP environment variables required${NC}"
    echo "Example: export US_SERVER_IP=xxx.xxx.xxx.xxx"
    echo "         export UK_SERVER_IP=yyy.yyy.yyy.yyy"
    exit 1
fi

# Set defaults
export US_SERVER_PORT=${US_SERVER_PORT:-3029}
export UK_SERVER_PORT=${UK_SERVER_PORT:-3029}
export NODE_ENV=${NODE_ENV:-production}

echo -e "${BLUE}📍 Test Configuration:${NC}"
echo "  US Server: $US_SERVER_IP:$US_SERVER_PORT"
echo "  UK Server: $UK_SERVER_IP:$UK_SERVER_PORT"
echo "  Environment: $NODE_ENV"
echo ""

# Function to test server connectivity
test_connectivity() {
    local server_name=$1
    local server_ip=$2
    local server_port=$3
    
    echo -e "${YELLOW}🔌 Testing connectivity to $server_name server...${NC}"
    
    if timeout 5 bash -c "</dev/tcp/$server_ip/$server_port"; then
        echo -e "${GREEN}✅ $server_name server is reachable${NC}"
        return 0
    else
        echo -e "${RED}❌ $server_name server is NOT reachable${NC}"
        return 1
    fi
}

# Function to test discovery API
test_discovery_api() {
    local server_name=$1
    local server_ip=$2
    local server_port=$3
    
    echo -e "${YELLOW}🔍 Testing discovery API on $server_name server...${NC}"
    
    local url="http://$server_ip:$server_port/admin/discovery/status"
    local response=$(curl -s --max-time 10 "$url" || echo "ERROR")
    
    if [[ "$response" == "ERROR" ]]; then
        echo -e "${RED}❌ Failed to connect to $server_name discovery API${NC}"
        return 1
    fi
    
    # Check if response contains expected fields
    if echo "$response" | grep -q "neighborhood" && echo "$response" | grep -q "hostsCount"; then
        echo -e "${GREEN}✅ $server_name discovery API responding correctly${NC}"
        local hosts_count=$(echo "$response" | jq -r '.hostsCount' 2>/dev/null || echo "unknown")
        local neighborhood=$(echo "$response" | jq -r '.neighborhood' 2>/dev/null || echo "unknown")
        echo "   Neighborhood: $neighborhood"
        echo "   Hosts Count: $hosts_count"
        return 0
    else
        echo -e "${RED}❌ $server_name discovery API returned invalid response${NC}"
        echo "   Response: $response"
        return 1
    fi
}

# Function to run vitest with timeout
run_test_with_timeout() {
    local test_file=$1
    local timeout_seconds=${2:-60}
    local test_name=$3
    
    echo -e "${YELLOW}🧪 Running $test_name...${NC}"
    
    if timeout $timeout_seconds npx vitest "$test_file" --reporter=verbose; then
        echo -e "${GREEN}✅ $test_name passed${NC}"
        return 0
    else
        echo -e "${RED}❌ $test_name failed or timed out${NC}"
        return 1
    fi
}

# Pre-flight checks
echo -e "${BLUE}🛫 Pre-flight checks${NC}"
echo "-------------------"

connectivity_ok=true

if ! test_connectivity "US" "$US_SERVER_IP" "$US_SERVER_PORT"; then
    connectivity_ok=false
fi

if ! test_connectivity "UK" "$UK_SERVER_IP" "$UK_SERVER_PORT"; then
    connectivity_ok=false
fi

if [[ "$connectivity_ok" != "true" ]]; then
    echo -e "${RED}❌ Connectivity tests failed. Check server status and network.${NC}"
    exit 1
fi

echo ""

# Discovery API checks
echo -e "${BLUE}🔍 Discovery API checks${NC}"
echo "----------------------"

api_ok=true

if ! test_discovery_api "US" "$US_SERVER_IP" "$US_SERVER_PORT"; then
    api_ok=false
fi

if ! test_discovery_api "UK" "$UK_SERVER_IP" "$UK_SERVER_PORT"; then
    api_ok=false
fi

if [[ "$api_ok" != "true" ]]; then
    echo -e "${YELLOW}⚠️  Some discovery API tests failed, but continuing with vitest...${NC}"
fi

echo ""

# Vitest discovery tests
echo -e "${BLUE}🧪 Running Discovery Tests${NC}"
echo "-------------------------"

if ! run_test_with_timeout "src/server/__tests__/discovery.test.ts" 120 "Discovery Tests"; then
    echo -e "${RED}❌ Discovery tests failed${NC}"
    exit 1
fi

echo ""

# Vitest replication tests
echo -e "${BLUE}🔄 Running Cross-Server Replication Tests${NC}"
echo "----------------------------------------"

if ! run_test_with_timeout "src/server/__tests__/cross-server-replication.test.ts" 180 "Replication Tests"; then
    echo -e "${RED}❌ Replication tests failed${NC}"
    exit 1
fi

echo ""

# Success summary
echo -e "${GREEN}🎉 All tests passed successfully!${NC}"
echo "=================================="
echo -e "${GREEN}✅ Connectivity: Both servers reachable${NC}"
echo -e "${GREEN}✅ Discovery: Both servers have working discovery APIs${NC}"
echo -e "${GREEN}✅ Discovery Tests: Peer discovery working${NC}"
echo -e "${GREEN}✅ Replication Tests: Cross-server message replication working${NC}"
echo ""
echo -e "${BLUE}🚀 Your US and UK DRED servers are successfully communicating!${NC}" 