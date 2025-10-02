#!/bin/bash

# Simple DRED Replication Test
# Focuses on just sending messages and basic verification

set -e

# Server configuration
US_SERVER="74.208.13.84"
UK_SERVER="217.154.34.155"
DRED_PORT="3029"
TEST_CHANNEL="demo-channel"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo "🚀 Simple DRED Replication Test"
echo "==============================="
echo -e "${BLUE}US Server: $US_SERVER:$DRED_PORT${NC}"
echo -e "${BLUE}UK Server: $UK_SERVER:$DRED_PORT${NC}"
echo -e "${BLUE}Test Channel: $TEST_CHANNEL${NC}"
echo

# Function to check server connectivity
check_server() {
    local server=$1
    local name=$2
    
    if curl -s --connect-timeout 5 "http://$server:$DRED_PORT/channels" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ $name server responding${NC}"
        return 0
    else
        echo -e "${RED}✗ $name server not responding${NC}"
        return 1
    fi
}

# Function to check if channel exists
check_channel() {
    local server=$1
    local name=$2
    
    local channels_response=$(curl -s "http://$server:$DRED_PORT/channels" 2>/dev/null || echo '{"channels":[]}')
    if echo "$channels_response" | grep -q "$TEST_CHANNEL"; then
        echo -e "${GREEN}✓ Channel '$TEST_CHANNEL' exists on $name${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  Channel '$TEST_CHANNEL' not found on $name${NC}"
        return 1
    fi
}

# Function to create channel if needed
create_channel_if_needed() {
    local server=$1
    local name=$2
    
    if ! check_channel "$server" "$name"; then
        echo -e "${YELLOW}📝 Creating channel '$TEST_CHANNEL' on $name...${NC}"
        local response=$(curl -s -X POST "http://$server:$DRED_PORT/channel/$TEST_CHANNEL" \
            -H "Content-Type: application/json" \
            -d '{"createdAt": '$(date +%s000)'}' 2>/dev/null)
        
        if echo "$response" | grep -q "created\|exists"; then
            echo -e "${GREEN}✓ Channel ready on $name${NC}"
            return 0
        else
            echo -e "${RED}✗ Failed to create channel on $name${NC}"
            return 1
        fi
    fi
}

# Function to send test message
send_test_message() {
    local server=$1
    local name=$2
    local message="$3"
    
    local timestamp=$(date +%s)
    local ocid="test-${timestamp}-$(echo "$name" | tr '[:upper:]' '[:lower:]')"
    
    echo -e "${CYAN}📤 Sending message from $name: '$message'${NC}"
    
    local response=$(curl -s -X POST "http://$server:$DRED_PORT/channel/$TEST_CHANNEL/message" \
        -H "Content-Type: application/json" \
        -d "{
            \"msg\": \"$message\",
            \"type\": \"replication-test\",
            \"ocid\": \"$ocid\",
            \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)\",
            \"sender\": \"$(echo "$name" | tr '[:upper:]' '[:lower:]')-test\"
        }" 2>/dev/null)
    
    if echo "$response" | grep -q "success\|ok\|id\|message"; then
        echo -e "${GREEN}✓ Message sent successfully${NC}"
        echo -e "${YELLOW}  OCID: $ocid${NC}"
        echo -e "${YELLOW}  Timestamp: $(date)${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to send message${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Main test function
run_test() {
    echo -e "${BLUE}🔍 Step 1: Connectivity Check${NC}"
    echo "=========================="
    check_server "$US_SERVER" "US" || exit 1
    check_server "$UK_SERVER" "UK" || exit 1
    echo
    
    echo -e "${BLUE}📋 Step 2: Channel Verification${NC}"
    echo "============================="
    create_channel_if_needed "$US_SERVER" "US" || exit 1
    create_channel_if_needed "$UK_SERVER" "UK" || exit 1
    echo
    
    echo -e "${BLUE}📤 Step 3: Message Tests${NC}"
    echo "======================"
    
    # Test 1: Send from US
    echo -e "${YELLOW}Test 1: US → UK Message${NC}"
    send_test_message "$US_SERVER" "US" "Hello from US server! Testing replication to UK at $(date +%H:%M:%S)"
    echo -e "${YELLOW}⏳ Waiting 5 seconds for potential replication...${NC}"
    sleep 5
    echo
    
    # Test 2: Send from UK  
    echo -e "${YELLOW}Test 2: UK → US Message${NC}"
    send_test_message "$UK_SERVER" "UK" "Greetings from UK server! Testing replication to US at $(date +%H:%M:%S)"
    echo -e "${YELLOW}⏳ Waiting 5 seconds for potential replication...${NC}"
    sleep 5
    echo
    
    echo -e "${GREEN}🎉 Basic Replication Test Complete!${NC}"
    echo "=================================="
    echo
    echo -e "${YELLOW}📋 What was tested:${NC}"
    echo "  ✓ Both servers are responding"
    echo "  ✓ Test channel exists on both servers"
    echo "  ✓ Messages can be sent to both servers"
    echo "  ✓ Basic infrastructure is working"
    echo
    echo -e "${YELLOW}🔍 To verify replication manually:${NC}"
    echo "  1. Check server logs:"
    echo "     ssh devops@$US_SERVER \"pm2 logs dred --lines 10 | grep -i replication\""
    echo "     ssh devops@$UK_SERVER \"pm2 logs dred --lines 10 | grep -i replication\""
    echo
    echo "  2. Run the comprehensive TypeScript test:"
    echo "     pnpm test remote-replication"
    echo
    echo -e "${YELLOW}💡 Expected behavior:${NC}"
    echo "  - Messages sent to US should appear in UK server logs/clients"
    echo "  - Messages sent to UK should appear in US server logs/clients"
    echo "  - Both servers should be discovering each other via on-chain data"
}

# Run the test
run_test
