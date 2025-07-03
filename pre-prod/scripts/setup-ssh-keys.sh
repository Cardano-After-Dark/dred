#!/bin/bash

# Automated SSH Key Setup Script for DRED VPS Servers
# Usage: ./setup-ssh-keys.sh [SERVER_NAME_OR_IP] [USERNAME]
# Example: ./setup-ssh-keys.sh US devops
#          ./setup-ssh-keys.sh 74.208.13.84 devops

set -e

# Configuration
DEFAULT_USER="devops"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KEYS_FILE="$SCRIPT_DIR/../conf/authorized_keys"

# Function to get server IP
get_server_ip() {
    local server="$1"
    local config_file="$SCRIPT_DIR/../conf/servers.conf"
    
    # If it's already an IP address, return as-is
    if [[ $server =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "$server"
        return
    fi
    
    # Try to look up in servers.conf
    if [ -f "$config_file" ]; then
        local server_upper=$(echo "$server" | tr '[:lower:]' '[:upper:]')
        local ip=$(grep "^${server_upper}=" "$config_file" | cut -d'=' -f2 | tr -d ' ')
        if [ -n "$ip" ]; then
            echo "$ip"
            return
        fi
    fi
    
    # Fallback: assume it's a hostname/IP
    echo "$server"
}

# Show help
show_help() {
    echo "SSH Key Setup Script for DRED VPS Servers"
    echo ""
    echo "Usage: $0 [SERVER] [USERNAME]"
    echo ""
    echo "Arguments:"
    echo "  SERVER    Server name (US/DE) or IP address"
    echo "  USERNAME  SSH username (default: devops)"
    echo ""
    echo "Examples:"
    echo "  $0 US                    # Setup keys for US server as devops user"
    echo "  $0 DE root               # Setup keys for DE server as root user"
    echo "  $0 192.168.1.100         # Setup keys for IP address as devops user"
    echo ""
    echo "Available servers:"
    if [ -f "$SCRIPT_DIR/../conf/servers.conf" ]; then
        grep "^[A-Z].*=" "$SCRIPT_DIR/../conf/servers.conf" | while IFS='=' read name ip; do
            echo "  $name ($ip)"
        done
    fi
}

# Main function
main() {
    local server="$1"
    local username="${2:-$DEFAULT_USER}"
    
    # Check arguments
    if [ -z "$server" ] || [ "$server" = "-h" ] || [ "$server" = "--help" ]; then
        show_help
        exit 0
    fi
    
    # Check if keys file exists
    if [ ! -f "$KEYS_FILE" ]; then
        echo "Error: SSH keys file not found: $KEYS_FILE"
        echo "Please create the authorized_keys file with your SSH public keys."
        exit 1
    fi
    
    # Get server IP
    local server_ip
    server_ip=$(get_server_ip "$server")
    
    echo "Setting up SSH keys for $username@$server_ip..."
    
    # Test SSH connection first
    if ! ssh -o ConnectTimeout=5 -o BatchMode=yes "$username@$server_ip" "echo 'SSH connection test'" >/dev/null 2>&1; then
        echo "Error: Cannot connect to $username@$server_ip"
        echo "Please ensure:"
        echo "  1. Server is reachable"
        echo "  2. SSH service is running"
        echo "  3. User '$username' exists on the server"
        echo "  4. You have current SSH access (password or existing key)"
        exit 1
    fi
    
    echo "✓ SSH connection successful"
    
    # Create .ssh directory and set permissions
    echo "Creating .ssh directory..."
    ssh "$username@$server_ip" "
        mkdir -p ~/.ssh
        chmod 700 ~/.ssh
    "
    
    # Copy SSH keys to server
    echo "Deploying SSH public keys..."
    scp "$KEYS_FILE" "$username@$server_ip:~/.ssh/authorized_keys"
    
    # Set proper permissions
    echo "Setting proper permissions..."
    ssh "$username@$server_ip" "
        chmod 600 ~/.ssh/authorized_keys
        chown -R $username:$username ~/.ssh
    "
    
    # Verify setup
    echo "Verifying SSH key setup..."
    local key_count
    key_count=$(ssh "$username@$server_ip" "wc -l < ~/.ssh/authorized_keys")
    
    echo "✓ SSH keys deployed successfully!"
    echo "  - $key_count SSH public keys installed"
    echo "  - Server: $server_ip"
    echo "  - User: $username"
    echo ""
    echo "Team members can now SSH to the server using their private keys:"
    echo "  ssh $username@$server_ip"
}

# Run main function
main "$@" 