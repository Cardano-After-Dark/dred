#!/bin/bash
set -e

# Step 1: Setup devops user and SSH keys
# Usage: ./setup-devops.sh <server_ip>

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

echo "🔐 Step 1: DevOps User Setup"
echo "============================="
echo "Server: $SERVER_IP"
echo ""

# Check if SSH keys file exists
if [ ! -f "team-ssh-keys.private" ]; then
    log_error "team-ssh-keys.private not found"
    echo "Create this file with your team's SSH public keys:"
    echo "cp team-ssh-keys.private.example team-ssh-keys.private"
    exit 1
fi

# Test root access directly (skip ping - VPS often block ICMP)
log_step "Connecting to root user..."
echo "You will be prompted for the root password"
echo ""

# Copy SSH keys and setup devops user
log_step "Copying SSH keys and setting up devops user..."
echo "This will:"
echo "1. Copy SSH keys to server"
echo "2. Create devops user with sudo access"
echo "3. Configure SSH security"
echo ""

# Copy SSH keys
if ! scp team-ssh-keys.private root@"$SERVER_IP":~/team-keys.txt; then
    log_error "Failed to copy SSH keys"
    exit 1
fi

# Setup devops user
ssh root@"$SERVER_IP" << 'EOF'
set -e

echo "🔧 Creating devops user..."
if ! id "devops" &>/dev/null; then
    adduser --disabled-password --gecos "" devops
    usermod -aG sudo devops
    echo "DevOps user created successfully"
else
    echo "DevOps user already exists"
fi

echo "🔧 Configuring passwordless sudo..."
# Add devops to sudoers with NOPASSWD
echo "devops ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/devops
chmod 440 /etc/sudoers.d/devops
echo "Passwordless sudo configured for devops user"

echo "🔧 Setting up SSH directories..."
mkdir -p /root/.ssh /home/devops/.ssh
chmod 700 /root/.ssh /home/devops/.ssh

echo "🔧 Installing SSH keys..."
cp ~/team-keys.txt /root/.ssh/authorized_keys
cp ~/team-keys.txt /home/devops/.ssh/authorized_keys
chmod 600 /root/.ssh/authorized_keys /home/devops/.ssh/authorized_keys
chown -R devops:devops /home/devops/.ssh

echo "🔧 Configuring SSH security..."
# Backup SSH config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Configure SSH settings
sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication yes/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config  
sed -i 's/PermitRootLogin yes/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config

# Restart SSH
systemctl restart ssh

echo "🔧 Installing basic security..."
apt update -qq
apt install -y ufw fail2ban >/dev/null 2>&1

# Configure firewall
ufw default deny incoming >/dev/null 2>&1
ufw default allow outgoing >/dev/null 2>&1
ufw allow ssh >/dev/null 2>&1
echo "y" | ufw enable >/dev/null 2>&1

echo "🔧 Cleaning up..."
rm -f ~/team-keys.txt

echo "✅ DevOps setup completed successfully!"
EOF

if [ $? -ne 0 ]; then
    log_error "Failed to setup devops user"
    exit 1
fi

# Verify setup
log_step "Verifying devops access..."
sleep 2

if ssh -o ConnectTimeout=10 -o BatchMode=yes devops@"$SERVER_IP" "echo 'DevOps SSH access successful'" >/dev/null 2>&1; then
    log_info "DevOps SSH access verified"
else
    log_error "DevOps SSH access failed"
    echo "Try running the test again in a few seconds"
    exit 1
fi

# Test sudo access
log_step "Testing sudo access..."
if ssh devops@"$SERVER_IP" "sudo whoami" | grep -q root; then
    log_info "Sudo access verified"
else
    log_error "Sudo access failed"
    exit 1
fi

# Show key count
KEY_COUNT=$(ssh devops@"$SERVER_IP" "wc -l < ~/.ssh/authorized_keys")
log_info "SSH keys installed: $KEY_COUNT"

echo ""
log_info "🎉 Step 1 completed successfully!"
echo ""
echo "✅ DevOps user created with sudo access"
echo "✅ SSH keys installed for team members"
echo "✅ SSH security configured"
echo "✅ Basic firewall enabled"
echo ""
echo "Next step: make setup-infrastructure $(echo $SERVER_IP | sed 's/74.208.13.84/US/; s/85.215.215.192/DE/; s/217.154.34.155/UK/')" 