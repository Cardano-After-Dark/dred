#!/bin/bash

# DRED Replication Demonstration
# Shows live message replication between US and UK servers

set -e

# Server configuration
US_SERVER="74.208.13.84"
UK_SERVER="217.154.34.155"
DRED_PORT="3029"
DEMO_CHANNEL="demo-replication"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Demo configuration
WAIT_TIME=3
MESSAGE_COUNT=0

echo "🚀 DRED Replication Demonstration"
echo "================================="
echo -e "${BLUE}US Server: $US_SERVER:$DRED_PORT${NC}"
echo -e "${BLUE}UK Server: $UK_SERVER:$DRED_PORT${NC}"
echo -e "${BLUE}Demo Channel: $DEMO_CHANNEL${NC}"
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

# Function to create channel on server
create_channel() {
    local server=$1
    local name=$2
    
    echo -e "${YELLOW}📝 Creating channel '$DEMO_CHANNEL' on $name server...${NC}"
    
    local response=$(curl -s -X POST "http://$server:$DRED_PORT/channel/$DEMO_CHANNEL" \
        -H "Content-Type: application/json" \
        -d '{"createdAt": '$(date +%s000)'}' 2>/dev/null)
    
    if echo "$response" | grep -q "created\|exists"; then
        echo -e "${GREEN}✓ Channel ready on $name${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to create channel on $name${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Function to send message
send_message() {
    local server=$1
    local name=$2
    local message=$3
    local msg_type=${4:-"demo"}
    
    MESSAGE_COUNT=$((MESSAGE_COUNT + 1))
    local ocid="demo-msg-$(date +%s)-$MESSAGE_COUNT"
    
    echo -e "${CYAN}📤 Sending message from $name: '$message'${NC}"
    
    local response=$(curl -s -X POST "http://$server:$DRED_PORT/channel/$DEMO_CHANNEL/message" \
        -H "Content-Type: application/json" \
        -d "{
            \"msg\": \"$message\",
            \"type\": \"$msg_type\",
            \"ocid\": \"$ocid\",
            \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)\",
            \"sender\": \"$name-demo\"
        }" 2>/dev/null)
    
    if echo "$response" | grep -q "success\|ok\|id"; then
        echo -e "${GREEN}✓ Message sent successfully${NC}"
        echo -e "${YELLOW}  OCID: $ocid${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to send message${NC}"
        echo "Response: $response"
        return 1
    fi
}

# Function to wait and check for replication
check_replication() {
    local source_server=$1
    local target_server=$2
    local source_name=$3
    local target_name=$4
    
    echo -e "${YELLOW}⏳ Waiting ${WAIT_TIME}s for replication from $source_name to $target_name...${NC}"
    sleep $WAIT_TIME
    
    # For now, we'll check if replication is working by checking server logs
    # In a full implementation, we'd need WebSocket listeners or message history endpoints
    echo -e "${BLUE}🔍 Checking $target_name server logs for replication...${NC}"
    
    if ssh -o ConnectTimeout=3 devops@$target_server "timeout 5 pm2 logs dred --lines 10 2>/dev/null | grep -i replication | tail -5" 2>/dev/null | sed 's/^/  /'; then
        echo -e "${GREEN}✓ Replication activity detected on $target_name${NC}"
    else
        echo -e "${YELLOW}⚠️  No obvious replication logs on $target_name (this might be normal)${NC}"
    fi
}

# Function to show server neighborhood status
check_neighborhood_status() {
    echo -e "${BLUE}🏘️  Checking Neighborhood Status${NC}"
    echo "================================"
    
    for server_name in "US" "UK"; do
        local server_ip
        if [ "$server_name" = "US" ]; then
            server_ip=$US_SERVER
        else
            server_ip=$UK_SERVER
        fi
        
        echo -e "${YELLOW}$server_name Server:${NC}"
        
        if ssh -o ConnectTimeout=3 devops@$server_ip "timeout 5 pm2 show dred 2>/dev/null | grep -E 'NEIGHBORHOOD|DRED_NODE_ID' | head -2" 2>/dev/null | sed 's/^/  /'; then
            :
        else
            echo "  Environment variables not visible in pm2"
        fi
        
        # Check for discovery-related logs with timeout
        echo -e "${YELLOW}  Recent discovery logs:${NC}"
        if ssh -o ConnectTimeout=3 devops@$server_ip "timeout 5 pm2 logs dred --lines 20 2>/dev/null | grep -i 'discovery\|neighbor\|host' | tail -3" 2>/dev/null | sed 's/^/    /'; then
            :
        else
            echo "    No recent discovery logs visible"
        fi
        echo
    done
}

# Function to run full demonstration
run_demo() {
    echo -e "${BLUE}🎬 Starting Full Replication Demo${NC}"
    echo "================================="
    echo
    
    # Step 1: Pre-flight checks
    echo -e "${BLUE}Step 1: Pre-flight checks${NC}"
    check_server "$US_SERVER" "US" || exit 1
    check_server "$UK_SERVER" "UK" || exit 1
    echo
    
    # Step 2: Check neighborhood status
    echo -e "${BLUE}Step 2: Neighborhood status${NC}"
    check_neighborhood_status
    
    # Step 3: Set up demo channel
    echo -e "${BLUE}Step 3: Setting up demo channel${NC}"
    create_channel "$US_SERVER" "US" || exit 1
    create_channel "$UK_SERVER" "UK" || exit 1
    echo
    
    # Step 4: Wait for channel propagation
    echo -e "${YELLOW}⏳ Waiting 5s for channel propagation...${NC}"
    sleep 5
    echo
    
    # Step 5: Send message from US to UK
    echo -e "${BLUE}Step 4: US → UK replication test${NC}"
    send_message "$US_SERVER" "US" "Hello from US server! Testing replication to UK." "us-to-uk"
    check_replication "$US_SERVER" "$UK_SERVER" "US" "UK"
    echo
    
    # Step 6: Send message from UK to US
    echo -e "${BLUE}Step 5: UK → US replication test${NC}"
    send_message "$UK_SERVER" "UK" "Greetings from UK server! Testing replication to US." "uk-to-us"
    check_replication "$UK_SERVER" "$US_SERVER" "UK" "US"
    echo
    
    # Step 7: Summary
    echo -e "${GREEN}🎉 Replication demonstration complete!${NC}"
    echo "====================================="
    echo
    echo -e "${YELLOW}📋 What was demonstrated:${NC}"
    echo "  1. ✓ Both servers are operational"
    echo "  2. ✓ Demo channel created on both servers"
    echo "  3. ✓ Messages sent from US server"
    echo "  4. ✓ Messages sent from UK server"
    echo "  5. ⏳ Replication logs checked (manual verification needed)"
    echo
    echo -e "${YELLOW}🔧 Next steps for complete verification:${NC}"
    echo "  1. Implement WebSocket listeners for real-time verification"
    echo "  2. Add message history endpoints to check replication"
    echo "  3. Run the TypeScript integration test"
    echo
}

# Function to show menu
show_menu() {
    echo -e "${BLUE}📋 Demo Options${NC}"
    echo "=============="
    echo "1. Run full demonstration"
    echo "2. Check server status only"
    echo "3. Create demo channel"
    echo "4. Send test message to US"
    echo "5. Send test message to UK"
    echo "6. Check neighborhood status"
    echo "7. Exit"
    echo
}

# Interactive menu
interactive_mode() {
    while true; do
        show_menu
        read -p "Choose option (1-7): " choice
        
        case $choice in
            1)
                run_demo
                ;;
            2)
                check_server "$US_SERVER" "US"
                check_server "$UK_SERVER" "UK"
                ;;
            3)
                create_channel "$US_SERVER" "US"
                create_channel "$UK_SERVER" "UK"
                ;;
            4)
                send_message "$US_SERVER" "US" "Test message from US ($(date))"
                ;;
            5)
                send_message "$UK_SERVER" "UK" "Test message from UK ($(date))"
                ;;
            6)
                check_neighborhood_status
                ;;
            7)
                echo "Goodbye!"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid option. Please choose 1-7.${NC}"
                ;;
        esac
        echo
        read -p "Press Enter to continue..."
        echo
    done
}

# Main execution
main() {
    # Check dependencies
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}Error: curl is required but not installed${NC}"
        exit 1
    fi
    
    # Check arguments
    if [ "$1" = "--auto" ]; then
        run_demo
    else
        interactive_mode
    fi
}

# Run if executed directly
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi
