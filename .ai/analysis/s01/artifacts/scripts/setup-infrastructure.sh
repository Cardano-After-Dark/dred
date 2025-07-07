#!/bin/bash
set -e

# Step 2: Setup infrastructure (Docker, Redis, Node.js)
# Usage: ./setup-infrastructure.sh <server_ip>

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

echo "🏗️  Step 2: Infrastructure Setup"
echo "================================="
echo "Server: $SERVER_IP"
echo ""

# Verify devops access
log_step "Verifying devops access..."
if ! ssh -o ConnectTimeout=10 -o BatchMode=yes devops@"$SERVER_IP" "echo 'Access verified'" >/dev/null 2>&1; then
    log_error "DevOps access failed. Run 'make setup-devops' first"
    exit 1
fi
log_info "DevOps access confirmed"

# Install infrastructure
log_step "Installing infrastructure components..."
ssh devops@"$SERVER_IP" << 'EOF'
set -e

echo "🔧 Installing essential packages..."
sudo apt update -qq
sudo apt install -y curl wget git build-essential redis-tools >/dev/null 2>&1

echo "🐳 Installing Docker..."
if ! command -v docker >/dev/null 2>&1; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh >/dev/null 2>&1
    sudo systemctl enable docker >/dev/null 2>&1
    sudo systemctl start docker >/dev/null 2>&1
    sudo usermod -aG docker devops
    rm get-docker.sh
    echo "Docker installed successfully"
else
    echo "Docker already installed"
fi

# Test Docker (need to use sudo initially before group membership takes effect)
if ! sudo docker ps >/dev/null 2>&1; then
    echo "ERROR: Docker not responding"
    exit 1
fi

echo "🗄️  Setting up Redis container..."
# Stop existing Redis if running
sudo docker stop dred-redis 2>/dev/null || true
sudo docker rm dred-redis 2>/dev/null || true

# Start Redis with memory optimization
sudo docker run -d --name dred-redis \
  --restart unless-stopped \
  -p 6379:6379 \
  -v redis-data:/data \
  redis:alpine redis-server \
  --appendonly yes \
  --maxmemory 512mb \
  --maxmemory-policy allkeys-lru >/dev/null

# Wait for Redis to start
sleep 5

# Test Redis
if ! redis-cli ping | grep -q PONG; then
    echo "ERROR: Redis not responding"
    exit 1
fi
echo "Redis container started successfully"

echo "📦 Installing Node.js and tools..."
if ! command -v node >/dev/null 2>&1; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash - >/dev/null 2>&1
    sudo apt install -y nodejs >/dev/null 2>&1
    echo "Node.js installed"
else
    echo "Node.js already installed"
fi

if ! command -v pnpm >/dev/null 2>&1; then
    sudo npm install -g pnpm@10.11.0 >/dev/null 2>&1
    echo "pnpm installed"
else
    echo "pnpm already installed"
fi

if ! command -v pm2 >/dev/null 2>&1; then
    sudo npm install -g pm2 >/dev/null 2>&1
    echo "PM2 installed"
else
    echo "PM2 already installed"
fi

echo "🔒 Configuring firewall..."
sudo ufw allow 3029/tcp >/dev/null 2>&1

echo "✅ Infrastructure setup completed!"
echo ""
echo "Components installed:"
echo "- Docker: $(docker --version)"
echo "- Redis: $(redis-cli --version)"
echo "- Node.js: $(node --version)"
echo "- pnpm: $(pnpm --version)"
echo "- PM2: $(pm2 --version)"
EOF

# Verify installation
log_step "Verifying infrastructure..."

# Test Docker
if ssh devops@"$SERVER_IP" "sudo docker ps | grep dred-redis | grep -q Up"; then
    log_info "Redis container running"
else
    log_error "Redis container not running"
    exit 1
fi

# Test Redis connectivity
if ssh devops@"$SERVER_IP" "redis-cli ping" | grep -q PONG; then
    log_info "Redis responding"
else
    log_error "Redis not responding"
    exit 1
fi

# Test Node.js tools
if ssh devops@"$SERVER_IP" "node --version && pnpm --version && pm2 --version" >/dev/null 2>&1; then
    log_info "Node.js tools verified"
else
    log_error "Node.js tools not working"
    exit 1
fi

# Check firewall
if ssh devops@"$SERVER_IP" "sudo ufw status | grep -q 3029"; then
    log_info "Firewall configured"
else
    log_warn "Firewall rule may not be set"
fi

echo ""
log_info "🎉 Step 2 completed successfully!"
echo ""
echo "✅ Docker installed and running"
echo "✅ Redis container running (512MB limit)"
echo "✅ Node.js, pnpm, PM2 installed"
echo "✅ Firewall configured for DRED port"
echo ""
echo "Next step: make setup-dred $(echo $SERVER_IP | sed 's/74.208.13.84/US/; s/85.215.215.192/DE/; s/217.154.34.155/UK/')" 