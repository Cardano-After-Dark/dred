#!/bin/bash
set -e

# Load environment variables
source "$(dirname "$0")/load-env.sh"

# Docker Infrastructure Setup
# Usage: ./dok-infra-setup.sh <server_ip>
# This script installs Docker on the remote server (run once per server)

if [ $# -ne 1 ]; then
    echo "Usage: $0 <server_ip>"
    exit 1
fi

SERVER_IP="$1"

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠️  $1${NC}"; }
log_step() { echo -e "${BLUE}🔧 $1${NC}"; }

echo "🐳 Docker Infrastructure Setup"
echo "================================="
echo "Server: $SERVER_IP"
echo ""

# Verify devops access
log_step "Verifying devops access..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes devops@"$SERVER_IP" "echo 'Access verified'" >/dev/null 2>&1; then
    log_error "DevOps access failed. Run 'make srv-setup' first"
    exit 1
fi
log_info "DevOps access confirmed"

# Check if Docker is already installed
log_step "Checking for existing Docker installation..."
if ssh devops@"$SERVER_IP" "command -v docker" >/dev/null 2>&1; then
    DOCKER_VERSION=$(ssh devops@"$SERVER_IP" "docker --version" 2>/dev/null || echo "unknown")
    log_warn "Docker is already installed: $DOCKER_VERSION"
    read -p "Do you want to reinstall? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Skipping Docker installation"
        echo ""
        log_info "🎉 Infrastructure check completed!"
        exit 0
    fi
fi

# Copy docker-install.sh script to server
log_step "Copying docker-install.sh to server..."
DOCKER_INSTALL_SCRIPT="$(dirname "$0")/../docker/scripts/docker-install.sh"
if [ ! -f "$DOCKER_INSTALL_SCRIPT" ]; then
    log_error "docker-install.sh not found at: $DOCKER_INSTALL_SCRIPT"
    exit 1
fi

# Create temporary directory on remote server
ssh devops@"$SERVER_IP" "mkdir -p /tmp/dred-docker-setup"

# Copy the script
scp "$DOCKER_INSTALL_SCRIPT" devops@"$SERVER_IP":/tmp/dred-docker-setup/docker-install.sh >/dev/null 2>&1
log_info "Script copied successfully"

# Run docker installation
log_step "Running Docker installation on remote server..."
log_warn "This may take a few minutes..."
ssh devops@"$SERVER_IP" << 'EOF'
set -e

cd /tmp/dred-docker-setup
chmod +x docker-install.sh

# Run the installation script with sudo
sudo ./docker-install.sh

# Verify Docker installation
if ! command -v docker >/dev/null 2>&1; then
    echo "ERROR: Docker installation failed"
    exit 1
fi

# Verify docker-compose
if ! docker compose version >/dev/null 2>&1; then
    echo "ERROR: docker-compose installation failed"
    exit 1
fi

# Clean up
cd ~
rm -rf /tmp/dred-docker-setup

echo ""
echo "✅ Docker installation completed successfully!"
EOF

# Verify installation from local machine
log_step "Verifying Docker installation..."

# Test Docker version
DOCKER_VERSION=$(ssh devops@"$SERVER_IP" "docker --version" 2>/dev/null || echo "")
if [ -z "$DOCKER_VERSION" ]; then
    log_error "Docker not responding"
    exit 1
fi
log_info "Docker installed: $DOCKER_VERSION"

# Test docker-compose
COMPOSE_VERSION=$(ssh devops@"$SERVER_IP" "docker compose version" 2>/dev/null || echo "")
if [ -z "$COMPOSE_VERSION" ]; then
    log_error "docker-compose not responding"
    exit 1
fi
log_info "Docker Compose installed: $COMPOSE_VERSION"

# Test Docker service
if ! ssh devops@"$SERVER_IP" "sudo systemctl is-active docker" | grep -q "^active$"; then
    log_error "Docker service not running"
    exit 1
fi
log_info "Docker service is active"

echo ""
log_info "🎉 Docker infrastructure setup completed successfully!"
echo ""
echo "✅ Docker installed and running"
echo "✅ docker-compose plugin installed"
echo "✅ User added to docker group (will take effect after re-login or newgrp)"
echo ""
echo "Next step: make dok-dred-deploy $(echo $SERVER_IP | sed 's/74.208.13.84/us/; s/85.215.215.192/de/; s/217.154.34.155/uk/')"
