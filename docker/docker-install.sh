#!/bin/bash

# ------------------------------------------------------------
# Docker Setup & Security Automation (run as root)
# ------------------------------------------------------------

# Step 1: Check privileges
if [[ "$EUID" != 0 ]]; then
  echo "Run this script with sudo!"
  exit 1
fi

# Step 2: Preinstall requirements
echo "Updating system..." && \
  apt-get update -y && \
  apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  software-properties-common

# Step 3: Set up Docker Repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null

# Step 4: Install Docker Packages
echo "Installing Docker..." && \
  apt-get update && \
  apt-get install -y \
  docker-ce \
  docker-ce-cli \
  containerd.io \
  docker-buildx-plugin \
  docker-compose-plugin \
  docker-compose

# Step 5: Service Configuration
echo "Enabling Docker service..." && \
  systemctl enable docker && \
  systemctl start docker

# Step 6: Secure Docker Access
echo "Securing Docker access..." && \
  usermod -aG docker devops && \
  echo " nfds failing: Please log out and back in after installation..."

# Step 7: Verify Installation
echo "Checking Docker status..." && \
  docker --version && \
  docker run --rm hello-world

echo "Checking Compose..." && \
  docker compose --version
