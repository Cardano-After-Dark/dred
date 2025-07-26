#!/bin/bash

# Initial Server Setup Script for DRED VPS Servers
# This script sets up a fresh VPS server using root password authentication
# and configures it for SSH key authentication
#
# Usage: ./initial-server-setup.sh [SERVER_IP]
# Example: ./initial-server-setup.sh 74.208.13.84

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/../conf/initial-setup.conf"
KEYS_FILE="$SCRIPT_DIR/../conf/authorized_keys"
DEFAULT_USER="devops"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to get server credentials
get_server_credentials() {
    local server_ip="$1"
    local config_line
    
    if [ ! -f "$CONFIG_FILE" ]; then
        print_error "Configuration file not found: $CONFIG_FILE"
        print_error "Please create it from the template: cp initial-setup.conf.template initial-setup.conf"
        exit 1
    fi
    
    config_line=$(grep "^$server_ip:" "$CONFIG_FILE" | head -1)
    
    if [ -z "$config_line" ]; then
        print_error "Server $server_ip not found in configuration file"
        exit 1
    fi
    
    echo "$config_line"
}

# Function to test SSH connection with password
test_ssh_connection() {
    local server_ip="$1"
    local password="$2"
    
    print_status "Testing SSH connection to root@$server_ip..."
    
    if ! sshpass -p "$password" ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@"$server_ip" "echo 'SSH connection test successful'" >/dev/null 2>&1; then
        print_error "Cannot connect to root@$server_ip with provided password"
        print_error "Please verify:"
        print_error "  1. Server IP is correct"
        print_error "  2. Root password is correct"
        print_error "  3. SSH service is running on the server"
        exit 1
    fi
    
    print_status "✓ SSH connection successful"
}

# Function to create devops user
create_devops_user() {
    local server_ip="$1"
    local root_password="$2"
    local devops_password="$3"
    
    print_status "Creating devops user..."
    
    sshpass -p "$root_password" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@"$server_ip" "
        # Create devops user
        useradd -m -s /bin/bash $DEFAULT_USER || echo 'User already exists'
        
        # Set password for devops user
        echo '$DEFAULT_USER:$devops_password' | chpasswd
        
        # Add to sudo group
        usermod -aG sudo $DEFAULT_USER
        
        # Create .ssh directory
        mkdir -p /home/$DEFAULT_USER/.ssh
        chmod 700 /home/$DEFAULT_USER/.ssh
        chown $DEFAULT_USER:$DEFAULT_USER /home/$DEFAULT_USER/.ssh
        
        # Allow sudo without password for initial setup
        echo '$DEFAULT_USER ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/$DEFAULT_USER
        chmod 440 /etc/sudoers.d/$DEFAULT_USER
    "
    
    print_status "✓ Devops user created successfully"
}

# Function to deploy SSH keys
deploy_ssh_keys() {
    local server_ip="$1"
    local root_password="$2"
    
    print_status "Deploying SSH keys..."
    
    if [ ! -f "$KEYS_FILE" ]; then
        print_error "SSH keys file not found: $KEYS_FILE"
        exit 1
    fi
    
    # Copy SSH keys to devops user
    sshpass -p "$root_password" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$KEYS_FILE" root@"$server_ip":/home/$DEFAULT_USER/.ssh/authorized_keys
    
    # Set proper permissions
    sshpass -p "$root_password" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@"$server_ip" "
        chmod 600 /home/$DEFAULT_USER/.ssh/authorized_keys
        chown $DEFAULT_USER:$DEFAULT_USER /home/$DEFAULT_USER/.ssh/authorized_keys
    "
    
    print_status "✓ SSH keys deployed successfully"
}

# Function to secure SSH configuration
secure_ssh_config() {
    local server_ip="$1"
    local root_password="$2"
    
    print_status "Securing SSH configuration..."
    
    sshpass -p "$root_password" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null root@"$server_ip" "
        # Backup original SSH config
        cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
        
        # Update SSH configuration
        sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
        sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
        sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
        sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
        sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
        sed -i 's/PubkeyAuthentication no/PubkeyAuthentication yes/' /etc/ssh/sshd_config
        
        # Restart SSH service
        systemctl restart sshd
    "
    
    print_status "✓ SSH configuration secured"
}

# Function to test SSH key authentication
test_ssh_keys() {
    local server_ip="$1"
    
    print_status "Testing SSH key authentication..."
    
    # Test SSH connection with keys
    if ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o PasswordAuthentication=no "$DEFAULT_USER@$server_ip" "echo 'SSH key authentication successful'" >/dev/null 2>&1; then
        print_status "✓ SSH key authentication working"
    else
        print_warning "SSH key authentication test failed"
        print_warning "You may need to manually verify the setup"
    fi
}

# Show help
show_help() {
    echo "Initial Server Setup Script for DRED VPS Servers"
    echo ""
    echo "This script performs the initial setup of a fresh VPS server:"
    echo "  1. Creates devops user with sudo privileges"
    echo "  2. Deploys SSH public keys"
    echo "  3. Secures SSH configuration"
    echo "  4. Disables root login and password authentication"
    echo ""
    echo "Usage: $0 [SERVER_IP]"
    echo ""
    echo "Prerequisites:"
    echo "  - sshpass installed (brew install sshpass / apt install sshpass)"
    echo "  - initial-setup.conf file configured with server credentials"
    echo "  - authorized_keys file with SSH public keys"
    echo ""
    echo "Examples:"
    echo "  $0 74.208.13.84    # Setup US server"
    echo "  $0 85.215.215.192  # Setup DE server"
    echo ""
    echo "Available servers in config:"
    if [ -f "$CONFIG_FILE" ]; then
        grep "^[0-9]" "$CONFIG_FILE" | cut -d':' -f1 | while read ip; do
            echo "  $ip"
        done
    fi
}

# Main function
main() {
    local server_ip="$1"
    local config_line
    local root_password
    local devops_password
    
    # Check arguments
    if [ -z "$server_ip" ] || [ "$server_ip" = "-h" ] || [ "$server_ip" = "--help" ]; then
        show_help
        exit 0
    fi
    
    # Check if sshpass is installed
    if ! command -v sshpass >/dev/null 2>&1; then
        print_error "sshpass is required but not installed"
        print_error "Install it with: brew install sshpass (macOS) or apt install sshpass (Ubuntu)"
        exit 1
    fi
    
    # Get server credentials
    config_line=$(get_server_credentials "$server_ip")
    root_password=$(echo "$config_line" | cut -d':' -f2)
    devops_password=$(echo "$config_line" | cut -d':' -f3)
    
    if [ -z "$root_password" ] || [ -z "$devops_password" ]; then
        print_error "Invalid configuration format. Expected: SERVER_IP:ROOT_PASSWORD:DEVOPS_PASSWORD"
        exit 1
    fi
    
    print_status "Starting initial setup for server: $server_ip"
    print_status "This will:"
    print_status "  1. Create devops user with sudo privileges"
    print_status "  2. Deploy SSH public keys"
    print_status "  3. Secure SSH configuration"
    print_status "  4. Disable root login and password authentication"
    print_status ""
    
    # Confirm before proceeding
    read -p "Continue with setup? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warning "Setup cancelled"
        exit 0
    fi
    
    # Execute setup steps
    test_ssh_connection "$server_ip" "$root_password"
    create_devops_user "$server_ip" "$root_password" "$devops_password"
    deploy_ssh_keys "$server_ip" "$root_password"
    secure_ssh_config "$server_ip" "$root_password"
    test_ssh_keys "$server_ip"
    
    print_status ""
    print_status "🎉 Initial server setup completed successfully!"
    print_status ""
    print_status "Next steps:"
    print_status "  1. Test SSH key access: ssh $DEFAULT_USER@$server_ip"
    print_status "  2. Run full server setup: make setup-server $server_ip"
    print_status "  3. Deploy DRED application"
    print_status ""
    print_status "Important: Root password login is now DISABLED for security"
    print_status "Save the devops password: $devops_password"
}

# Run main function
main "$@" 