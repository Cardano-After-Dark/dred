#!/bin/bash
set -e

# Load environment variables
source "$(dirname "$0")/load-env.sh"

# Docker DRED Deployment
# Usage: ./dok-dred-deploy.sh <server_ip> <server_name>
# This script deploys DRED using Docker (idempotent, can be run multiple times)

if [ $# -ne 2 ]; then
    echo "Usage: $0 <server_ip> <server_name>"
    echo "Example: $0 74.208.13.84 US"
    exit 1
fi

SERVER_IP="$1"
SERVER_NAME="$2"

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

echo "🚀 DRED Docker Deployment"
echo "================================="
echo "Server: $SERVER_NAME ($SERVER_IP)"
echo ""

# Verify devops access
log_step "Verifying devops access..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes devops@"$SERVER_IP" "echo 'Access verified'" >/dev/null 2>&1; then
    log_error "DevOps access failed. Run 'make srv-setup' first"
    exit 1
fi
log_info "DevOps access confirmed"

# Verify Docker is installed
log_step "Checking Docker installation..."
if ! ssh devops@"$SERVER_IP" "command -v docker" >/dev/null 2>&1; then
    log_error "Docker is not installed. Run 'make dok-infra-setup' first"
    exit 1
fi
log_info "Docker is installed"

# Determine server-specific .env file
SERVER_NAME_LOWER=$(echo "$SERVER_NAME" | tr '[:upper:]' '[:lower:]')
ENV_FILE="$(dirname "$0")/../config/${SERVER_NAME_LOWER}.env"

if [ ! -f "$ENV_FILE" ]; then
    log_error "Environment file not found: $ENV_FILE"
    log_error "Expected: devops/config/${SERVER_NAME_LOWER}.env"
    exit 1
fi
log_info "Using environment file: $ENV_FILE"

# Create remote directory structure
log_step "Creating remote directory structure..."
ssh devops@"$SERVER_IP" << 'EOF'
mkdir -p ~/dred-docker
cd ~/dred-docker
mkdir -p letsencrypt nginx-ssl redis-data logs keystore
EOF
log_info "Directory structure created"

# Copy docker folder contents to server
log_step "Copying Docker configuration to server..."
DOCKER_DIR="$(dirname "$0")/../docker"

if [ ! -d "$DOCKER_DIR" ]; then
    log_error "Docker directory not found: $DOCKER_DIR"
    exit 1
fi

# Copy all docker files except .env
rsync -az --delete \
    --exclude='.env' \
    --exclude='letsencrypt' \
    --exclude='nginx-ssl' \
    --exclude='redis-data' \
    --exclude='logs' \
    --exclude='keystore' \
    --exclude='.git' \
    "$DOCKER_DIR/" devops@"$SERVER_IP":~/dred-docker/ >/dev/null 2>&1

log_info "Docker configuration copied"

# Copy server-specific .env file
log_step "Deploying server-specific environment configuration..."
scp "$ENV_FILE" devops@"$SERVER_IP":~/dred-docker/.env >/dev/null 2>&1
log_info "Environment file deployed"

# Build and deploy containers
log_step "Building and starting Docker containers..."
log_warn "This may take several minutes on first deployment..."

ssh devops@"$SERVER_IP" << 'EOF'
set -e

cd ~/dred-docker

# Apply docker group for current session (needed for docker commands without sudo)
# Note: This is idempotent and safe to run multiple times
if ! groups | grep -q docker; then
    echo "Applying docker group membership..."
    # We'll use sudo for docker commands since newgrp doesn't work in ssh sessions
    USE_SUDO="sudo"
else
    USE_SUDO=""
fi

# Stop existing containers if running (idempotent)
echo "Stopping existing containers (if any)..."
$USE_SUDO docker compose down 2>/dev/null || true

# Build and start containers in detached mode
echo "Building and starting containers..."
$USE_SUDO docker compose up -d --build

# Wait for containers to be healthy
echo "Waiting for containers to start..."
sleep 10

# Check container status
echo ""
echo "Container status:"
$USE_SUDO docker compose ps
EOF

# Verify deployment
log_step "Verifying deployment..."

# Check if containers are running
CONTAINER_STATUS=$(ssh devops@"$SERVER_IP" "cd ~/dred-docker && sudo docker compose ps -q" 2>/dev/null || echo "")
if [ -z "$CONTAINER_STATUS" ]; then
    log_error "No containers are running"
    log_warn "Check logs with: ssh devops@$SERVER_IP 'cd ~/dred-docker && sudo docker compose logs'"
    exit 1
fi
log_info "Containers are running"

# Get container details
log_step "Container details:"
ssh devops@"$SERVER_IP" "cd ~/dred-docker && sudo docker compose ps"

echo ""
log_info "🎉 DRED deployment completed successfully!"
echo ""
echo "✅ Docker containers built and started"
echo "✅ Configuration deployed"
echo "✅ Environment variables set"
echo ""
echo "Useful commands:"
echo "  View logs:    ssh devops@$SERVER_IP 'cd ~/dred-docker && sudo docker logs -f dred-node'"
echo "  Check status: ssh devops@$SERVER_IP 'cd ~/dred-docker && sudo docker compose ps'"
echo "  Restart:      ssh devops@$SERVER_IP 'cd ~/dred-docker && sudo docker compose restart'"
echo "  Stop:         ssh devops@$SERVER_IP 'cd ~/dred-docker && sudo docker compose down'"
echo ""

# Try to get the domain from the .env file for testing hint
DOMAIN=$(grep "^HOST_DOMAIN=" "$ENV_FILE" | cut -d'=' -f2 | sed 's/https:\/\///' | sed 's/\/$//' || echo "")
if [ -n "$DOMAIN" ]; then
    echo "Test endpoint:"
    echo "  curl https://$DOMAIN/channels"
fi
