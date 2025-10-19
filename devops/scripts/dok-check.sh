#!/bin/bash
set -e

# Docker server testing script with container command execution
# Usage: ./dok-check.sh <server_ip> <server_name> [command] [args...]

if [ $# -lt 2 ]; then
    echo "Usage: $0 <server_ip> <server_name> [command] [args...]"
    echo "Commands: status, logs, ps, exec, restart, env, health"
    echo "Examples:"
    echo "  $0 74.208.13.84 US                             # Show status and commands"
    echo "  $0 74.208.13.84 US status                      # Show container status"
    echo "  $0 74.208.13.84 US logs                        # Show recent logs (50 lines)"
    echo "  $0 74.208.13.84 US logs 100                    # Show last 100 log lines"
    echo "  $0 74.208.13.84 US logs grep 'discovery'       # Grep on logs (default 50 lines)"
    echo "  $0 74.208.13.84 US logs 1000 grep 'discovery'  # Grep on last 1000 lines"
    echo "  $0 74.208.13.84 US exec 'pm2 status'           # Execute command in container"
    echo "  $0 74.208.13.84 US health                      # Check health endpoints"
    exit 1
fi

SERVER_IP="$1"
SERVER_NAME="$2"
SSH_USER="devops"
shift 2  # Remove server_ip and server_name from arguments

# Parse command and arguments
COMMAND="${1:-}"
shift || true
ARGS=("$@")

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✓ $1${NC}"; }
log_error() { echo -e "${RED}✗ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
log_step() { echo -e "${BLUE}🔧 $1${NC}"; }

# Get domain from server config
CONFIG_DIR="$(dirname "$0")/../config"
SERVER_NAME_LOWER=$(echo "$SERVER_NAME" | tr '[:upper:]' '[:lower:]')
ENV_FILE="$CONFIG_DIR/${SERVER_NAME_LOWER}.env"

DOMAIN=""
if [ -f "$ENV_FILE" ]; then
    DOMAIN=$(grep "^HOST_DOMAIN=" "$ENV_FILE" 2>/dev/null | cut -d'=' -f2 | sed 's/https:\/\///' | sed 's/http:\/\///' | sed 's/\/$//' || echo "")
fi

# Function to execute Docker commands
execute_docker_command() {
    local cmd="$1"
    shift
    local args=("$@")

    case "$cmd" in
        "status")
            log_step "Container status:"
            ssh "$SSH_USER@$SERVER_IP" "cd ~/dred-docker && sudo docker compose ps"
            ;;
        "ps")
            log_step "Docker processes:"
            ssh "$SSH_USER@$SERVER_IP" "sudo docker ps -a"
            ;;
        "logs")
            local lines="50"
            local grep_pattern=""

            # Parse arguments for logs command
            if [ ${#args[@]} -gt 0 ]; then
                # Case 1: logs NUMBER [grep PATTERN]
                if [[ "${args[0]}" =~ ^[0-9]+$ ]]; then
                    lines="${args[0]}"
                    if [ ${#args[@]} -gt 2 ] && [ "${args[1]}" = "grep" ]; then
                        grep_pattern="${args[2]}"
                    fi
                # Case 2: logs grep [NUMBER] PATTERN
                elif [ "${args[0]}" = "grep" ]; then
                    if [ ${#args[@]} -gt 2 ] && [[ "${args[1]}" =~ ^[0-9]+$ ]]; then
                        lines="${args[1]}"
                        grep_pattern="${args[2]}"
                    elif [ ${#args[@]} -gt 1 ]; then
                        grep_pattern="${args[1]}"
                    fi
                fi
            fi

            if [ -n "$grep_pattern" ]; then
                log_step "Container logs (last $lines lines, grep: $grep_pattern):"
                ssh "$SSH_USER@$SERVER_IP" "sudo docker logs --tail $lines dred-node 2>&1 | grep -i -E '$grep_pattern' || true"
            else
                log_step "Container logs (last $lines lines):"
                ssh "$SSH_USER@$SERVER_IP" "sudo docker logs --tail $lines dred-node 2>&1"
            fi
            ;;
        "exec")
            if [ ${#args[@]} -eq 0 ]; then
                log_error "exec command requires an argument"
                echo "Usage: $0 $SERVER_IP $SERVER_NAME exec 'command'"
                exit 1
            fi
            local exec_cmd="${args[0]}"
            log_step "Executing in container: $exec_cmd"
            ssh "$SSH_USER@$SERVER_IP" "sudo docker exec dred-node sh -c '$exec_cmd'"
            ;;
        "restart")
            log_step "Restarting containers..."
            ssh "$SSH_USER@$SERVER_IP" "cd ~/dred-docker && sudo docker compose restart"
            log_info "Containers restarted"
            ;;
        "env")
            log_step "Container environment:"
            ssh "$SSH_USER@$SERVER_IP" "sudo docker exec dred-node env | grep -E 'DRED|CARDANO|NODE_ENV|HOST_DOMAIN|BF_API' | sort"
            ;;
        "health")
            log_step "Health checks:"

            # Check HTTP (port 80)
            if curl -s --connect-timeout 5 "http://$SERVER_IP/" >/dev/null 2>&1; then
                log_info "HTTP (port 80) responding"
            else
                log_warn "HTTP (port 80) not responding"
            fi

            # Check HTTPS (port 443) if domain is known
            if [ -n "$DOMAIN" ]; then
                if curl -k -s --connect-timeout 5 "https://$DOMAIN/" >/dev/null 2>&1; then
                    log_info "HTTPS (port 443) responding"
                else
                    log_warn "HTTPS (port 443) not responding"
                fi

                # Check /channels endpoint
                echo ""
                log_step "Testing API endpoint: https://$DOMAIN/channels"
                RESPONSE=$(curl -k -s --connect-timeout 5 "https://$DOMAIN/channels" 2>&1 || echo "")
                if [ -n "$RESPONSE" ] && echo "$RESPONSE" | grep -q -E '\[|{'; then
                    log_info "API endpoint responding:"
                    echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
                else
                    log_error "API endpoint not responding or invalid response"
                    echo "Response: $RESPONSE"
                fi
            else
                log_warn "Domain not configured in $ENV_FILE - skipping HTTPS tests"
            fi

            # Check SSL certificate
            if [ -n "$DOMAIN" ]; then
                echo ""
                log_step "Checking SSL certificate:"
                ssh "$SSH_USER@$SERVER_IP" "sudo docker exec dred-node ls -la /etc/nginx/ssl/" 2>/dev/null || log_warn "Cannot access SSL directory"
            fi
            ;;
        *)
            log_error "Unknown command: $cmd"
            echo "Available commands: status, logs, ps, exec, restart, env, health"
            exit 1
            ;;
    esac
}

# If a specific command was provided, execute it and exit
if [ -n "$COMMAND" ]; then
    execute_docker_command "$COMMAND" "${ARGS[@]}"
    exit 0
fi

# Default behavior: run connectivity tests and show available commands

echo "🐳 Docker DRED Server Check - $SERVER_NAME"
echo "================================="
echo "Server: $SERVER_IP"
if [ -n "$DOMAIN" ]; then
    echo "Domain: $DOMAIN"
fi
echo ""

# Test SSH connection
log_step "Testing SSH connection..."
if ssh -o ConnectTimeout=5 -o BatchMode=yes -o LogLevel=ERROR "$SSH_USER@$SERVER_IP" "exit 0" 2>/dev/null; then
    log_info "SSH connection successful"
else
    log_error "SSH connection failed"
    exit 1
fi

# Test Docker is installed
log_step "Checking Docker installation..."
if ssh "$SSH_USER@$SERVER_IP" "command -v docker" >/dev/null 2>&1; then
    DOCKER_VERSION=$(ssh "$SSH_USER@$SERVER_IP" "docker --version" 2>/dev/null || echo "unknown")
    log_info "Docker installed: $DOCKER_VERSION"
else
    log_error "Docker not installed"
    exit 1
fi

# Check container status
echo ""
log_step "Container status:"
CONTAINER_STATUS=$(ssh "$SSH_USER@$SERVER_IP" "cd ~/dred-docker && sudo docker compose ps 2>/dev/null" || echo "")
if [ -n "$CONTAINER_STATUS" ]; then
    echo "$CONTAINER_STATUS"

    # Check if container is running
    if echo "$CONTAINER_STATUS" | grep -q "Up"; then
        log_info "Container is running"
    else
        log_warn "Container not running properly"
    fi
else
    log_warn "No containers found or docker-compose not set up"
fi

# Test HTTP endpoint
echo ""
log_step "Testing HTTP endpoint..."
if command -v curl >/dev/null 2>&1; then
    if curl -s --connect-timeout 5 "http://$SERVER_IP/" >/dev/null 2>&1; then
        log_info "HTTP (port 80) responding"
    else
        log_warn "HTTP (port 80) not responding"
    fi
else
    log_warn "curl not available - skipping HTTP tests"
fi

# Test HTTPS endpoint if domain is known
if [ -n "$DOMAIN" ]; then
    log_step "Testing HTTPS endpoint..."
    if command -v curl >/dev/null 2>&1; then
        if curl -k -s --connect-timeout 5 "https://$DOMAIN/" >/dev/null 2>&1; then
            log_info "HTTPS (port 443) responding"

            # Try to get channels
            CHANNELS=$(curl -k -s --connect-timeout 5 "https://$DOMAIN/channels" 2>/dev/null)
            if [ $? -eq 0 ] && [ -n "$CHANNELS" ]; then
                echo "   API endpoint: https://$DOMAIN/channels"
                echo "   Response: $CHANNELS"
            fi
        else
            log_warn "HTTPS (port 443) not responding"
        fi
    fi
fi

# Show recent logs (last 10 lines)
echo ""
log_step "Recent container logs (last 10 lines):"
ssh "$SSH_USER@$SERVER_IP" "sudo docker logs --tail 10 dred-node 2>&1" 2>/dev/null || log_warn "Cannot fetch logs"

echo ""
echo "========================="
echo "🔧 Docker Commands:"
echo ""
printf "ssh devops@%s \"cd ~/dred-docker && sudo docker compose ps\"                    # [status]              : container status\n" "$SERVER_IP"
printf "ssh devops@%s \"sudo docker ps -a\"                                              # [ps]                  : all docker processes\n" "$SERVER_IP"
printf "ssh devops@%s \"sudo docker logs --tail 50 dred-node\"                           # [logs]                : show last 50 log lines\n" "$SERVER_IP"
printf "ssh devops@%s \"sudo docker logs --tail 100 dred-node\"                          # [logs 100]            : show last 100 log lines\n" "$SERVER_IP"
printf "ssh devops@%s \"sudo docker logs --tail 50 dred-node | grep -i 'text'\"          # [logs grep 'text']    : grep on last 50 log lines\n" "$SERVER_IP"
printf "ssh devops@%s \"sudo docker exec dred-node pm2 status\"                          # [exec 'pm2 status']   : execute command in container\n" "$SERVER_IP"
printf "ssh devops@%s \"sudo docker exec dred-node env\"                                 # [env]                 : show container environment\n" "$SERVER_IP"
printf "ssh devops@%s \"cd ~/dred-docker && sudo docker compose restart\"                # [restart]             : restart containers\n" "$SERVER_IP"

if [ -n "$DOMAIN" ]; then
    echo ""
    printf "curl -k https://%s/channels                                                    # Test API endpoint\n" "$DOMAIN"
fi

echo ""
echo "========================="
echo "📊 Quick checks:"
echo ""
echo "  make dok-check $SERVER_NAME_LOWER status         # Container status"
echo "  make dok-check $SERVER_NAME_LOWER logs           # View logs"
echo "  make dok-check $SERVER_NAME_LOWER health         # Health check"
echo "  make dok-check $SERVER_NAME_LOWER env            # Environment variables"
echo ""
