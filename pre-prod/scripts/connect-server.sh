#!/bin/bash

# Simple VPS connection script
# Usage: ./connect-server.sh [SERVER_NAME] [--test]

set -e

# Path to server configuration file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/../conf/servers.conf"
SSH_USER="devops"

# Function to get server IP from config
get_server_ip() {
    local server_name=$(echo "$1" | tr '[:lower:]' '[:upper:]')
    
    if [ ! -f "$CONFIG_FILE" ]; then
        echo "Error: Server config file not found: $CONFIG_FILE"
        exit 1
    fi
    
    # Read IP from config file
    local server_ip=$(grep "^${server_name}=" "$CONFIG_FILE" | cut -d'=' -f2 | tr -d ' ')
    
    if [ -z "$server_ip" ]; then
        echo "Error: Server '$1' not found in config file"
        echo "Available servers:"
        grep "^[A-Z].*=" "$CONFIG_FILE" | cut -d'=' -f1 | sed 's/^/  /'
        exit 1
    fi
    
    echo "$server_ip"
}

# Show help if no arguments or help flag
if [ $# -eq 0 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    echo "Usage: $0 [SERVER_NAME] [--test]"
    echo ""
    echo "Available servers:"
    if [ -f "$CONFIG_FILE" ]; then
        grep "^[A-Z].*=" "$CONFIG_FILE" | while IFS='=' read name ip; do
            echo "  $name ($ip)"
        done
    fi
    echo ""
    echo "Examples:"
    echo "  $0 US        # Connect to US server"
    echo "  $0 DE --test # Test DE server"
    exit 0
fi

# Get server details
SERVER_NAME=$(echo "$1" | tr '[:lower:]' '[:upper:]')
SERVER_IP=$(get_server_ip "$1")

# Test mode
if [ "$2" = "--test" ]; then
    echo "Testing $SERVER_NAME server ($SERVER_IP)..."
    
    # Test SSH connection
    if ssh -o ConnectTimeout=5 -o BatchMode=yes "$SSH_USER@$SERVER_IP" "echo 'SSH OK'" 2>/dev/null; then
        echo "✓ SSH connection successful"
    else
        echo "✗ SSH connection failed"
        exit 1
    fi
    
    # Test DRED server
    if curl -s --connect-timeout 3 "http://$SERVER_IP:3029/channels" >/dev/null 2>&1; then
        echo "✓ DRED server responding"
    else
        echo "✗ DRED server not responding"
    fi
    
    exit 0
fi

# Connect to server
echo "Connecting to $SERVER_NAME server ($SERVER_IP)..."
ssh "$SSH_USER@$SERVER_IP" 