#!/bin/bash

# DRED Server Query Tool
# Queries both US and UK servers for status, channels, and neighborhood info

set -e

# Server configuration
US_SERVER="74.208.13.84"
UK_SERVER="217.154.34.155"
DRED_PORT="3029"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🔍 DRED Server Query Tool"
echo "=========================="
echo

# Function to query a server's channels
query_server_channels() {
    local server=$1
    local name=$2
    
    echo -e "${BLUE}📡 Querying $name server ($server:$DRED_PORT)...${NC}"
    
    # Test basic connectivity
    if curl -s --connect-timeout 5 "http://$server:$DRED_PORT/channels" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Server responding${NC}"
        
        # Get channels
        local channels_response=$(curl -s "http://$server:$DRED_PORT/channels" 2>/dev/null || echo '{"channels":[]}')
        local channels=$(echo "$channels_response" | jq -r '.channels[]' 2>/dev/null || echo "")
        local channel_count=$(echo "$channels_response" | jq '.channels | length' 2>/dev/null || echo "0")
        
        echo -e "${YELLOW}📋 Channels ($channel_count):${NC}"
        if [ "$channel_count" -gt 0 ] && [ -n "$channels" ]; then
            echo "$channels" | sed 's/^/  - /'
        else
            echo "  (no channels)"
        fi
        
        # Check if server is accessible via SSH for additional info
        if ssh -o ConnectTimeout=5 -o BatchMode=yes devops@$server "exit" 2>/dev/null; then
            echo -e "${YELLOW}🔧 Server Info:${NC}"
            ssh devops@$server "pm2 status | grep dred | head -1" 2>/dev/null | sed 's/^/  /'
            
            # Check for neighborhood environment variable with timeout
            echo -e "${YELLOW}🏘️  Node ID:${NC}"
            ssh -o ConnectTimeout=3 devops@$server "timeout 5 pm2 show dred 2>/dev/null | grep 'DRED_NODE_ID' | head -1 || echo '  Not visible in pm2 env'" 2>/dev/null | sed 's/^/  /'
            
            echo -e "${YELLOW}🌐 Neighborhood:${NC}"
            ssh -o ConnectTimeout=3 devops@$server "timeout 5 pm2 show dred 2>/dev/null | grep 'NEIGHBORHOOD' | head -1 || echo '  Not visible in pm2 env'" 2>/dev/null | sed 's/^/  /'
        fi
        
    else
        echo -e "${RED}✗ Server not responding${NC}"
    fi
    echo
}

# Function to compare servers
compare_servers() {
    echo -e "${BLUE}🔄 Cross-Server Analysis${NC}"
    echo "========================"
    
    # Get channels from both servers
    local us_channels_response=$(curl -s "http://$US_SERVER:$DRED_PORT/channels" 2>/dev/null || echo '{"channels":[]}')
    local uk_channels_response=$(curl -s "http://$UK_SERVER:$DRED_PORT/channels" 2>/dev/null || echo '{"channels":[]}')
    
    # Find common channels
    local common_channels=""
    if command -v jq &> /dev/null; then
        common_channels=$(comm -12 <(echo "$us_channels_response" | jq -r '.channels[]' 2>/dev/null | sort) <(echo "$uk_channels_response" | jq -r '.channels[]' 2>/dev/null | sort) 2>/dev/null || echo "")
    fi
    
    if [ -n "$common_channels" ]; then
        echo -e "${GREEN}✓ Common channels found:${NC}"
        echo "$common_channels" | sed 's/^/  - /'
        echo -e "${YELLOW}💡 These channels can be used for replication demonstration${NC}"
    else
        echo -e "${YELLOW}⚠️  No common channels found${NC}"
        echo -e "${YELLOW}💡 Create the same channel on both servers to demonstrate replication${NC}"
    fi
    echo
}

# Function to suggest next steps
suggest_next_steps() {
    echo -e "${BLUE}🎯 Next Steps for Replication Demo${NC}"
    echo "=================================="
    echo
    echo "1. Ensure both servers are in the same neighborhood"
    echo "2. Create a test channel on both servers:"
    echo "   curl -X POST http://$US_SERVER:$DRED_PORT/channel/demo-channel"
    echo "   curl -X POST http://$UK_SERVER:$DRED_PORT/channel/demo-channel"
    echo
    echo "3. Run replication demonstration:"
    echo "   ./replication-demo.sh"
    echo
    echo "4. Send test message:"
    echo "   curl -X POST http://$US_SERVER:$DRED_PORT/channel/demo-channel/message \\"
    echo "        -H 'Content-Type: application/json' \\"
    echo "        -d '{\"msg\":\"Hello from US!\",\"type\":\"demo\"}'"
    echo
}

# Main execution
main() {
    # Check dependencies
    if ! command -v curl &> /dev/null; then
        echo -e "${RED}Error: curl is required but not installed${NC}"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        echo -e "${YELLOW}Warning: jq not found - JSON output will be raw${NC}"
        echo
    fi
    
    # Query both servers
    query_server_channels "$US_SERVER" "US"
    query_server_channels "$UK_SERVER" "UK"
    
    # Compare and analyze
    compare_servers
    
    # Suggest next steps
    suggest_next_steps
}

# Run if executed directly
if [ "${BASH_SOURCE[0]}" == "${0}" ]; then
    main "$@"
fi
