#!/bin/bash
# Deploy DRED to remote VPS
set -e

SERVER_IP=$1
SERVER_NAME=$(echo "$2" | tr '[:lower:]' '[:upper:]')

# Check SSH access
ssh -o ConnectTimeout=5 -o BatchMode=yes devops@"$SERVER_IP" exit 2>/dev/null || {
    echo "Error: Cannot connect to devops@$SERVER_IP"
    exit 1
}

# Show deployment info
echo "Deploying DRED to $SERVER_NAME ($SERVER_IP)"
echo "Branch: $(git branch --show-current)"
echo ""

# Show env vars from config
if [ -f "preprod/config/$2.env" ]; then
    echo "Environment from preprod/config/$2.env:"
    grep -v "^#" "preprod/config/$2.env" | grep -v "^$"
    echo ""
fi

# Deploy
cd preprod && make setup-dred "$2" && make test "$2"
