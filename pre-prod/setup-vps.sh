#!/bin/bash

# DRED VPS Setup Script
# Usage: ./setup-vps.sh SERVER_IP SSH_KEY_FILE
# This script automates the VPS setup process

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DEFAULT_DRED_PORT=3029
DEVOPS_USER="devops"
NODE_VERSION="20"
PNPM_VERSION="10.11.0"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to get script directory
get_script_dir() {
    cd "$(dirname "${BASH_SOURCE[0]}")" && pwd
}

# Function to validate inputs
validate_inputs() {
    if [ -z "$SERVER_IP" ]; then
        print_error "Server IP address is required"
        echo "Usage: $0 SERVER_IP [SSH_KEY_FILE]"
        exit 1
    fi

    if [ -n "$SSH_KEY_FILE" ] && [ ! -f "$SSH_KEY_FILE" ]; then
        print_error "SSH key file not found: $SSH_KEY_FILE"
        exit 1
    fi
}

# Function to test SSH connectivity
test_ssh_connection() {
    print_status "Testing SSH connection to $SERVER_IP..."
    
    if [ -n "$SSH_KEY_FILE" ]; then
        SSH_CMD="ssh -i $SSH_KEY_FILE -o ConnectTimeout=10 -o StrictHostKeyChecking=no"
    else
        SSH_CMD="ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=no"
    fi
    
    if $SSH_CMD root@$SERVER_IP "echo 'SSH connection successful'" >/dev/null 2>&1; then
        print_success "SSH connection established"
    else
        print_error "Cannot connect to server via SSH"
        print_warning "Make sure:"
        echo "  1. Server IP is correct: $SERVER_IP"
        echo "  2. SSH service is running on the server"
        echo "  3. Root access is available"
        [ -n "$SSH_KEY_FILE" ] && echo "  4. SSH key is correct: $SSH_KEY_FILE"
        exit 1
    fi
}

# Function to copy SSH key to server
setup_ssh_keys() {
    if [ -z "$SSH_KEY_FILE" ]; then
        print_warning "No SSH key file provided, skipping automated key setup"
        print_warning "Please manually add your SSH public key to /home/$DEVOPS_USER/.ssh/authorized_keys"
        return
    fi
    
    print_status "Setting up SSH keys for $DEVOPS_USER user..."
    
    # Extract public key from private key file if needed
    if ssh-keygen -l -f "$SSH_KEY_FILE" >/dev/null 2>&1; then
        # It's a private key, generate public key
        PUBLIC_KEY=$(ssh-keygen -y -f "$SSH_KEY_FILE")
    else
        # Assume it's already a public key
        PUBLIC_KEY=$(cat "$SSH_KEY_FILE")
    fi
    
    $SSH_CMD root@$SERVER_IP "echo '$PUBLIC_KEY' >> /home/$DEVOPS_USER/.ssh/authorized_keys"
    print_success "SSH key added for $DEVOPS_USER user"
}

# Function to create remote setup script
create_remote_script() {
    cat > /tmp/dred-vps-setup.sh << 'REMOTE_SCRIPT_EOF'
#!/bin/bash
set -e

# Configuration
DEVOPS_USER="devops"
NODE_VERSION="20"
PNPM_VERSION="10.11.0"
DRED_PORT="3029"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

print_status "Starting DRED VPS setup..."

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install security tools
print_status "Installing security tools..."
apt install -y ufw fail2ban curl wget git build-essential htop

# Configure UFW firewall
print_status "Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow $DRED_PORT/tcp
ufw --force enable

# Create DevOps user
print_status "Creating DevOps user..."
if ! id "$DEVOPS_USER" >/dev/null 2>&1; then
    useradd -m -s /bin/bash $DEVOPS_USER
    usermod -aG sudo $DEVOPS_USER
    print_success "DevOps user created"
else
    print_status "DevOps user already exists"
fi

# Setup SSH for DevOps user
mkdir -p /home/$DEVOPS_USER/.ssh
chmod 700 /home/$DEVOPS_USER/.ssh
touch /home/$DEVOPS_USER/.ssh/authorized_keys
chmod 600 /home/$DEVOPS_USER/.ssh/authorized_keys
chown -R $DEVOPS_USER:$DEVOPS_USER /home/$DEVOPS_USER/.ssh

# Install Node.js
print_status "Installing Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt install -y nodejs

# Install pnpm
print_status "Installing pnpm $PNPM_VERSION..."
npm install -g pnpm@$PNPM_VERSION

# Install Redis
print_status "Installing Redis..."
apt install -y redis-server

# Configure Redis
sed -i 's/^# maxmemory <bytes>/maxmemory 512mb/' /etc/redis/redis.conf
sed -i 's/^# maxmemory-policy noeviction/maxmemory-policy allkeys-lru/' /etc/redis/redis.conf

# Start Redis
systemctl start redis-server
systemctl enable redis-server

# Install PM2
print_status "Installing PM2..."
npm install -g pm2

# Test installations
print_status "Verifying installations..."
node --version
pnpm --version
redis-cli ping
pm2 --version

print_success "System setup completed!"

# Setup DRED project as DevOps user
print_status "Setting up DRED project as DevOps user..."
sudo -u $DEVOPS_USER bash << 'DEVOPS_SCRIPT_EOF'
cd /home/devops

# Note: Repository URL should be updated to actual repository
echo "IMPORTANT: Update the repository URL in the script before cloning"
echo "git clone YOUR_REPOSITORY_URL dred"

# Create placeholder directories and files
mkdir -p dred/config/vps
mkdir -p logs

# Create VPS host configuration
cat > dred/config/vps/hosts.json << 'HOST_CONFIG_EOF'
{
  "hosts": [
    {
      "serverId": "vps-server-1",
      "address": "0.0.0.0",
      "port": 3029,
      "insecure": true
    }
  ],
  "neighborhood": "pre-prod-nbh"
}
HOST_CONFIG_EOF

# Create PM2 ecosystem configuration
cat > dred/ecosystem.config.js << 'PM2_CONFIG_EOF'
module.exports = {
  apps: [{
    name: 'dred-vps-server',
    script: './dist/dredServer.mjs',
    cwd: '/home/devops/dred',
    env: {
      NODE_ENV: 'production',
      REDIS_URL: 'redis://localhost:6379',
      DRED_PORT: '3029',
      DRED_HOST: '0.0.0.0',
      LOGGING: 'default:info'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    log_file: '/home/devops/logs/dred-server.log',
    error_file: '/home/devops/logs/dred-error.log',
    out_file: '/home/devops/logs/dred-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
PM2_CONFIG_EOF

print_success "DRED project structure created"
print_status "Next steps:"
echo "1. Clone the actual DRED repository"
echo "2. Run 'pnpm install' in the dred directory"
echo "3. Run 'pnpm build' to build the project"
echo "4. Start with 'pm2 start ecosystem.config.js'"

DEVOPS_SCRIPT_EOF

print_success "VPS setup completed!"
print_status "Server is ready for DRED deployment"

REMOTE_SCRIPT_EOF
}

# Main setup function
main() {
    local SERVER_IP="$1"
    local SSH_KEY_FILE="$2"
    
    # Validate inputs
    validate_inputs
    
    # Set SSH command
    if [ -n "$SSH_KEY_FILE" ]; then
        SSH_CMD="ssh -i $SSH_KEY_FILE -o StrictHostKeyChecking=no"
        SCP_CMD="scp -i $SSH_KEY_FILE -o StrictHostKeyChecking=no"
    else
        SSH_CMD="ssh -o StrictHostKeyChecking=no"
        SCP_CMD="scp -o StrictHostKeyChecking=no"
    fi
    
    print_status "Starting DRED VPS setup for $SERVER_IP"
    
    # Test SSH connection
    test_ssh_connection
    
    # Create and upload setup script
    print_status "Creating remote setup script..."
    create_remote_script
    
    print_status "Uploading setup script to server..."
    $SCP_CMD /tmp/dred-vps-setup.sh root@$SERVER_IP:/tmp/
    
    # Execute setup script on remote server
    print_status "Executing setup script on remote server..."
    $SSH_CMD root@$SERVER_IP "chmod +x /tmp/dred-vps-setup.sh && /tmp/dred-vps-setup.sh"
    
    # Setup SSH keys if provided
    setup_ssh_keys
    
    # Cleanup
    rm -f /tmp/dred-vps-setup.sh
    
    print_success "VPS setup completed successfully!"
    print_status "You can now SSH to the server as: $DEVOPS_USER@$SERVER_IP"
    print_status "Next steps:"
    echo "  1. SSH to the server: ssh $DEVOPS_USER@$SERVER_IP"
    echo "  2. Clone the DRED repository in /home/$DEVOPS_USER/dred/"
    echo "  3. Install dependencies: pnpm install"
    echo "  4. Build the project: pnpm build"
    echo "  5. Start the server: pm2 start ecosystem.config.js"
    echo "  6. Test connectivity: curl http://$SERVER_IP:$DEFAULT_DRED_PORT/channels"
}

# Help function
show_help() {
    echo "DRED VPS Setup Script"
    echo ""
    echo "USAGE:"
    echo "  $0 SERVER_IP [SSH_KEY_FILE]"
    echo ""
    echo "ARGUMENTS:"
    echo "  SERVER_IP     IP address of the Ubuntu VPS server"
    echo "  SSH_KEY_FILE  Optional: Path to SSH private key file"
    echo ""
    echo "EXAMPLES:"
    echo "  $0 192.168.1.100"
    echo "  $0 192.168.1.100 ~/.ssh/id_rsa"
    echo ""
    echo "REQUIREMENTS:"
    echo "  - Fresh Ubuntu 22.04+ server"
    echo "  - Root SSH access to the server"
    echo "  - SSH client installed locally"
    echo ""
}

# Check for help flag
if [[ "$1" == "-h" || "$1" == "--help" ]]; then
    show_help
    exit 0
fi

# Check for required arguments
if [ $# -lt 1 ]; then
    print_error "Missing required arguments"
    show_help
    exit 1
fi

# Run main function
main "$@" 