#!/bin/bash

# DRED Automated Deployment Script
# This script automates the deployment of DRED server on a Ubuntu 24.04 VPS
# Based on successful manual deployment experience

set -e  # Exit on any error

# Script configuration
SCRIPT_VERSION="1.0.0"
REDIS_MEMORY_LIMIT="400mb"
DRED_MEMORY_LIMIT="600M"
DRED_PORT="3029"
DRED_HOST="0.0.0.0"
REDIS_PORT="6379"
NODE_VERSION="20.19.3"
PNPM_VERSION="10.11.0"
REPOSITORY_URL="https://github.com/Cardano-After-Dark/dred.git"
BRANCH="dev3/message-replication-rebased"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_phase() {
    echo -e "\n${BLUE}=== PHASE $1 ===${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        log_error "This script should not be run as root. Please run as a regular user with sudo privileges."
        exit 1
    fi
}

# Function to validate parameters
validate_params() {
    if [[ -z "$SERVER_IP" || -z "$USERNAME" ]]; then
        log_error "Usage: $0 <server_ip> <username> [sudo_password]"
        echo "Example: $0 74.208.13.84 devops mypassword"
        echo "Note: If sudo_password is not provided, you'll be prompted for it"
        exit 1
    fi
    
    # Validate IP address format
    if ! [[ "$SERVER_IP" =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
        log_error "Invalid IP address format: $SERVER_IP"
        exit 1
    fi
}

# Function to setup SSH connection
setup_ssh_connection() {
    log_info "Testing SSH connection to $USERNAME@$SERVER_IP..."
    
    if ! ssh -o ConnectTimeout=10 -o BatchMode=yes "$USERNAME@$SERVER_IP" "echo 'SSH connection successful'" 2>/dev/null; then
        log_error "SSH connection failed. Please ensure:"
        echo "  1. SSH key is properly configured"
        echo "  2. Server is accessible"
        echo "  3. Username is correct"
        exit 1
    fi
    
    log_success "SSH connection established"
}

# Function to execute commands on remote server
remote_exec() {
    local cmd="$1"
    local description="$2"
    
    if [[ -n "$description" ]]; then
        log_info "$description"
    fi
    
    if [[ -n "$SUDO_PASSWORD" ]]; then
        ssh "$USERNAME@$SERVER_IP" "echo '$SUDO_PASSWORD' | sudo -S bash -c '$cmd'" 2>/dev/null
    else
        ssh "$USERNAME@$SERVER_IP" "$cmd"
    fi
}

# Function to transfer and execute script on remote server
execute_remote_script() {
    local script_content="$1"
    local description="$2"
    
    log_info "$description"
    
    # Create temporary script file
    local temp_script=$(mktemp)
    echo "$script_content" > "$temp_script"
    
    # Transfer script to remote server
    scp "$temp_script" "$USERNAME@$SERVER_IP:/tmp/deploy_script.sh"
    
    # Execute script on remote server
    ssh "$USERNAME@$SERVER_IP" "chmod +x /tmp/deploy_script.sh && /tmp/deploy_script.sh"
    
    # Cleanup
    rm "$temp_script"
    ssh "$USERNAME@$SERVER_IP" "rm /tmp/deploy_script.sh"
}

# Phase 1: System verification
phase_1_verification() {
    log_phase "1: System Verification"
    
    local verification_script='
#!/bin/bash
echo "Checking system resources..."
echo "RAM: $(free -h | grep Mem | awk '"'"'{print $2}'"'"')"
echo "CPU: $(nproc) cores"
echo "Disk: $(df -h / | tail -1 | awk '"'"'{print $4}'"'"') available"
echo "OS: $(lsb_release -d | cut -f2)"

# Check if ports are available
if ss -tlnp | grep -q ":22 "; then
    echo "Port 22 (SSH): In use ✓"
else
    echo "Port 22 (SSH): Not accessible ✗"
    exit 1
fi

if ss -tlnp | grep -q ":3029 "; then
    echo "Port 3029 (DRED): Already in use ✗"
    exit 1
else
    echo "Port 3029 (DRED): Available ✓"
fi

if ss -tlnp | grep -q ":6379 "; then
    echo "Port 6379 (Redis): Already in use - will use Docker"
else
    echo "Port 6379 (Redis): Available ✓"
fi
'
    
    execute_remote_script "$verification_script" "Verifying system resources and port availability"
    log_success "System verification completed"
}

# Phase 2: Install Docker
phase_2_install_docker() {
    log_phase "2: Installing Docker"
    
    local docker_script='
#!/bin/bash
# Check if Docker is already installed
if command -v docker >/dev/null 2>&1; then
    echo "Docker already installed: $(docker --version)"
    exit 0
fi

# Install Docker
echo "Installing Docker..."
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Install docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version

echo "Docker installation completed"
'
    
    execute_remote_script "$docker_script" "Installing Docker and Docker Compose"
    log_success "Docker installation completed"
}

# Phase 3: Setup Redis
phase_3_setup_redis() {
    log_phase "3: Setting up Redis"
    
    local redis_script='
#!/bin/bash
# Stop any existing Redis container
docker stop dred-redis 2>/dev/null || true
docker rm dred-redis 2>/dev/null || true

# Start Redis container with memory optimization
docker run -d \
    --name dred-redis \
    --restart unless-stopped \
    -p 6379:6379 \
    -v redis-data:/data \
    redis:alpine \
    redis-server \
    --appendonly yes \
    --maxmemory 400mb \
    --maxmemory-policy allkeys-lru \
    --save 900 1 \
    --save 300 10 \
    --save 60 10000

# Wait for Redis to start
sleep 5

# Test Redis connection
if docker exec dred-redis redis-cli ping | grep -q "PONG"; then
    echo "Redis is running successfully"
else
    echo "Redis failed to start"
    exit 1
fi

# Show Redis info
docker exec dred-redis redis-cli info memory | grep used_memory_human
'
    
    execute_remote_script "$redis_script" "Setting up Redis container"
    log_success "Redis setup completed"
}

# Phase 4: Install Node.js and dependencies
phase_4_install_nodejs() {
    log_phase "4: Installing Node.js and Dependencies"
    
    local nodejs_script='
#!/bin/bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
sudo npm install -g pnpm@10.11.0

# Install PM2
sudo npm install -g pm2@6.0.8

# Verify installations
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "pnpm: $(pnpm --version)"
echo "PM2: $(pm2 --version)"
'
    
    execute_remote_script "$nodejs_script" "Installing Node.js, pnpm, and PM2"
    log_success "Node.js dependencies installed"
}

# Phase 5: Clone and build DRED
phase_5_clone_build_dred() {
    log_phase "5: Cloning and Building DRED"
    
    local dred_script='
#!/bin/bash
cd /home/'$USERNAME'

# Remove existing directory if it exists
if [[ -d "dred" ]]; then
    echo "Removing existing DRED directory..."
    rm -rf dred
fi

# Clone repository
echo "Cloning DRED repository..."
git clone '$REPOSITORY_URL' dred
cd dred

# Switch to correct branch
echo "Switching to branch: '$BRANCH'"
git checkout '$BRANCH'

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build project
echo "Building DRED..."
pnpm build

# Verify build
if [[ -f "dist/dredServer.mjs" ]]; then
    echo "Build successful - dredServer.mjs created"
    ls -la dist/
else
    echo "Build failed - dredServer.mjs not found"
    exit 1
fi
'
    
    execute_remote_script "$dred_script" "Cloning and building DRED"
    log_success "DRED build completed"
}

# Phase 6: Configure environment and PM2
phase_6_configure_environment() {
    log_phase "6: Configuring Environment"
    
    local config_script='
#!/bin/bash
cd /home/'$USERNAME'/dred

# Create .env file
cat > .env << EOF
REDIS_URL=redis://localhost:6379
DRED_PORT='$DRED_PORT'
DRED_HOST='$DRED_HOST'
NODE_ENV=production
LOGGING=default:info
EOF

# Create logs directory
mkdir -p /home/'$USERNAME'/logs

# Create PM2 ecosystem configuration
cat > ecosystem.config.cjs << EOF
module.exports = {
  apps: [{
    name: '"'"'dred-us-server'"'"',
    script: '"'"'./dist/dredServer.mjs'"'"',
    cwd: '"'"'/home/'$USERNAME'/dred'"'"',
    env: {
      NODE_ENV: '"'"'production'"'"',
      REDIS_URL: '"'"'redis://localhost:6379'"'"',
      DRED_PORT: '"'"''$DRED_PORT''"'"',
      DRED_HOST: '"'"''$DRED_HOST''"'"',
      LOGGING: '"'"'default:info'"'"'
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '"'"''$DRED_MEMORY_LIMIT''"'"',
    log_file: '"'"'/home/'$USERNAME'/logs/dred-server.log'"'"',
    error_file: '"'"'/home/'$USERNAME'/logs/dred-error.log'"'"',
    out_file: '"'"'/home/'$USERNAME'/logs/dred-out.log'"'"',
    log_date_format: '"'"'YYYY-MM-DD HH:mm:ss Z'"'"'
  }]
};
EOF

echo "Environment configuration completed"
echo "Created .env file and PM2 ecosystem configuration"
'
    
    execute_remote_script "$config_script" "Configuring environment and PM2"
    log_success "Environment configuration completed"
}

# Phase 7: Start DRED server
phase_7_start_dred() {
    log_phase "7: Starting DRED Server"
    
    local start_script='
#!/bin/bash
cd /home/'$USERNAME'/dred

# Stop any existing PM2 processes
pm2 stop all 2>/dev/null || true
pm2 delete all 2>/dev/null || true

# Start DRED with PM2
pm2 start ecosystem.config.cjs

# Wait for startup
sleep 10

# Check PM2 status
pm2 status

# Check logs
echo "=== Recent logs ==="
pm2 logs dred-us-server --lines 10 --nostream

# Test local connection
echo "=== Testing local connection ==="
if curl -s http://localhost:'$DRED_PORT'/channels | jq . 2>/dev/null; then
    echo "Local API test: SUCCESS"
else
    echo "Local API test: FAILED"
    exit 1
fi
'
    
    execute_remote_script "$start_script" "Starting DRED server"
    log_success "DRED server started"
}

# Phase 8: Configure firewall
phase_8_configure_firewall() {
    log_phase "8: Configuring Firewall"
    
    local firewall_script='
#!/bin/bash
# Configure UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing  
sudo ufw allow ssh
sudo ufw allow '$DRED_PORT'/tcp
sudo ufw --force enable

# Show UFW status
sudo ufw status verbose

# Check if service is listening on external interface
echo "=== Port binding verification ==="
ss -tlnp | grep '$DRED_PORT' || echo "Port '$DRED_PORT' not found in listening ports"

echo "UFW firewall configuration completed"
echo "IMPORTANT: You must also configure your VPS provider'"'"'s cloud firewall to allow port '$DRED_PORT'"
'
    
    execute_remote_script "$firewall_script" "Configuring UFW firewall"
    log_success "OS firewall configured"
}

# Phase 9: Final testing and verification
phase_9_final_testing() {
    log_phase "9: Final Testing and Verification"
    
    local test_script='
#!/bin/bash
cd /home/'$USERNAME'/dred

echo "=== System Status ==="
echo "RAM Usage:"
free -h

echo "Docker Status:"
docker ps | grep dred-redis

echo "PM2 Status:"
pm2 status

echo "Redis Status:"
docker exec dred-redis redis-cli ping

echo "DRED Server Status:"
# Test local API
if curl -s http://localhost:'$DRED_PORT'/channels >/dev/null; then
    echo "✓ Local API responding"
else
    echo "✗ Local API not responding"
fi

# Test external IP from server
if curl -s http://'$SERVER_IP':'$DRED_PORT'/channels >/dev/null; then
    echo "✓ External IP accessible from server"
else
    echo "✗ External IP not accessible from server"
fi

echo "=== Resource Usage ==="
echo "Memory usage:"
ps aux | grep -E "(dred|redis|docker)" | grep -v grep

echo "Disk usage:"
df -h /

echo "=== Port Check ==="
ss -tlnp | grep '$DRED_PORT'

echo "=== Firewall Status ==="
sudo ufw status
'
    
    execute_remote_script "$test_script" "Running final tests and verification"
    log_success "Final testing completed"
}

# Phase 10: Setup auto-start
phase_10_setup_autostart() {
    log_phase "10: Setting up Auto-start"
    
    local autostart_script='
#!/bin/bash
cd /home/'$USERNAME'/dred

# Configure PM2 to start on boot
pm2 startup | grep "sudo" | bash

# Save current PM2 configuration
pm2 save

echo "Auto-start configuration completed"
echo "DRED will automatically start on system reboot"
'
    
    execute_remote_script "$autostart_script" "Setting up auto-start configuration"
    log_success "Auto-start setup completed"
}

# Main deployment function
main() {
    echo "DRED Automated Deployment Script v$SCRIPT_VERSION"
    echo "=================================================="
    
    # Parse command line arguments
    SERVER_IP="$1"
    USERNAME="$2"
    SUDO_PASSWORD="$3"
    
    # Validate parameters
    validate_params
    
    # Check prerequisites
    check_root
    
    # Check if required tools are available locally
    if ! command_exists ssh; then
        log_error "SSH client not found. Please install SSH client."
        exit 1
    fi
    
    if ! command_exists scp; then
        log_error "SCP not found. Please install SCP."
        exit 1
    fi
    
    # Setup SSH connection
    setup_ssh_connection
    
    # Execute deployment phases
    phase_1_verification
    phase_2_install_docker
    phase_3_setup_redis
    phase_4_install_nodejs
    phase_5_clone_build_dred
    phase_6_configure_environment
    phase_7_start_dred
    phase_8_configure_firewall
    phase_9_final_testing
    phase_10_setup_autostart
    
    # Final summary
    echo ""
    log_success "=== DEPLOYMENT COMPLETED SUCCESSFULLY ==="
    echo ""
    echo "DRED Server Details:"
    echo "  Server IP: $SERVER_IP"
    echo "  API Port: $DRED_PORT"
    echo "  Local API: http://localhost:$DRED_PORT/channels"
    echo "  External API: http://$SERVER_IP:$DRED_PORT/channels"
    echo ""
    echo "Next Steps:"
    echo "1. Configure your VPS provider's cloud firewall to allow port $DRED_PORT"
    echo "2. Test external access: curl -s http://$SERVER_IP:$DRED_PORT/channels"
    echo "3. Monitor logs: ssh $USERNAME@$SERVER_IP 'pm2 logs dred-us-server'"
    echo ""
    echo "Management Commands:"
    echo "  PM2 Status: ssh $USERNAME@$SERVER_IP 'pm2 status'"
    echo "  View Logs: ssh $USERNAME@$SERVER_IP 'pm2 logs dred-us-server --lines 50'"
    echo "  Restart: ssh $USERNAME@$SERVER_IP 'pm2 restart dred-us-server'"
    echo ""
    log_success "Deployment completed successfully!"
}

# Run main function with all arguments
main "$@" 