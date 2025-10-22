#!/bin/bash
# Load environment variables from devops/config/.env and hosts.conf
# Usage: source "$(dirname "$0")/load-env.sh"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_DIR="$SCRIPT_DIR/../config"

# Load common configuration from .env
ENV_FILE="$CONFIG_DIR/.env"
if [ -f "$ENV_FILE" ]; then
    set -a
    source "$ENV_FILE"
    set +a
fi

# Load server configuration from hosts.conf
HOSTS_FILE="$CONFIG_DIR/hosts.conf"
if [ -f "$HOSTS_FILE" ]; then
    set -a
    source "$HOSTS_FILE"
    set +a
fi
