#!/bin/bash
set -e

# Enhanced server testing script with PM2 command execution
# Usage: ./test-server.sh <server_ip> [command] [args...]

if [ $# -lt 1 ]; then
    echo "Usage: $0 <server_ip> [command] [args...]"
    echo "Commands: env, show, logs, restart, status"
    echo "Examples:"
    echo "  $0 74.208.13.84                                    # Show status and commands"
    echo "  $0 74.208.13.84 env                                # Show environment variables"
    echo "  $0 74.208.13.84 logs                               # Show recent logs"
    echo "  $0 74.208.13.84 logs 50                            # Show last 50 log lines"
    echo "  $0 74.208.13.84 logs grep 'discovery'              # Grep on logs (default 50 lines)"
    echo "  $0 74.208.13.84 logs 1000 grep 'discovery|nbh'     # Grep on last 1000 lines"
    exit 1
fi

SERVER_IP="$1"
SSH_USER="devops"
shift  # Remove server_ip from arguments

# Parse command and arguments
COMMAND="${1:-}"
shift || true
ARGS=("$@")

# Color output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${GREEN}✓ $1${NC}"; }
log_error() { echo -e "${RED}✗ $1${NC}"; }
log_warn() { echo -e "${YELLOW}⚠ $1${NC}"; }

# Get server name for display
SERVER_NAME=$(echo $SERVER_IP | sed 's/74.208.13.84/US/; s/85.215.215.192/DE/; s/217.154.34.155/UK/')

# Function to execute PM2 commands
execute_pm2_command() {
    local cmd="$1"
    shift
    local args=("$@")
    
    case "$cmd" in
        "env")
            echo "Executing: ssh $SSH_USER@$SERVER_IP \"pm2 env 0\""
            ssh "$SSH_USER@$SERVER_IP" "pm2 env 0"
            ;;
        "show")
            echo "Executing: ssh $SSH_USER@$SERVER_IP \"pm2 show dred\""
            ssh "$SSH_USER@$SERVER_IP" "pm2 show dred"
            ;;
        "logs")
            local lines="50"
            local grep_pattern=""
            
            # Parse arguments for logs command
            # Supported formats:
            # logs                          -> 50 lines
            # logs 100                      -> 100 lines
            # logs grep 'pattern'           -> 50 lines + grep
            # logs 100 grep 'pattern'       -> 100 lines + grep
            # logs grep 100 'pattern'       -> 100 lines + grep (alternative order)
            
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
                        # logs grep 100 'pattern'
                        lines="${args[1]}"
                        grep_pattern="${args[2]}"
                    elif [ ${#args[@]} -gt 1 ]; then
                        # logs grep 'pattern'
                        grep_pattern="${args[1]}"
                    fi
                fi
            fi
            
            if [ -n "$grep_pattern" ]; then
                echo "Executing: ssh $SSH_USER@$SERVER_IP \"pm2 logs dred --lines $lines --nostream | grep -i -E '$grep_pattern' || true\""
                ssh "$SSH_USER@$SERVER_IP" "pm2 logs dred --lines $lines --nostream | grep -i -E '$grep_pattern' || true"
            else
                echo "Executing: ssh $SSH_USER@$SERVER_IP \"pm2 logs dred --lines $lines\""
                ssh "$SSH_USER@$SERVER_IP" "pm2 logs dred --lines $lines"
            fi
            ;;
        "restart")
            echo "Executing: ssh $SSH_USER@$SERVER_IP \"pm2 restart dred\""
            ssh "$SSH_USER@$SERVER_IP" "pm2 restart dred"
            ;;
        "status")
            echo "Executing: ssh $SSH_USER@$SERVER_IP \"pm2 status\""
            ssh "$SSH_USER@$SERVER_IP" "pm2 status"
            ;;
        *)
            echo "❌ Unknown command: $cmd"
            echo "Available commands: env, show, logs, restart, status"
            exit 1
            ;;
    esac
}

# If a specific command was provided, execute it and exit
if [ -n "$COMMAND" ]; then
    execute_pm2_command "$COMMAND" "${ARGS[@]}"
    exit 0
fi

# Default behavior: run connectivity tests and show available commands

# Test SSH connection
if ssh -o ConnectTimeout=5 -o BatchMode=yes -o LogLevel=ERROR "$SSH_USER@$SERVER_IP" "exit 0" 2>/dev/null; then
    log_info "SSH connection successful"
else
    log_error "SSH connection failed"
    echo ""
    exit 1
fi

# Test DRED server connectivity
if command -v curl >/dev/null 2>&1; then
    if curl -s --connect-timeout 3 "http://$SERVER_IP:3029/channels" >/dev/null 2>&1; then
        log_info "DRED server responding on port 3029"
        # Try to get channels info
        CHANNELS=$(curl -s --connect-timeout 3 "http://$SERVER_IP:3029/channels" 2>/dev/null)
        if [ $? -eq 0 ] && [ -n "$CHANNELS" ]; then
            echo "   Available channels: $CHANNELS"
        fi
    else
        log_warn "DRED server not responding on port 3029"
    fi
else
    # Fallback to port test if curl not available
    if timeout 5 bash -c "</dev/tcp/$SERVER_IP/3029" >/dev/null 2>&1; then
        log_info "DRED port 3029 accessible"
    else
        log_warn "DRED port 3029 not accessible"
    fi
fi

echo ""
echo "========================="
echo "📊 PM2 Process Status:"

# Get PM2 status
{
ssh -o ConnectTimeout=5 -o LogLevel=QUIET -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o UpdateHostKeys=no -o BatchMode=yes -T "$SSH_USER@$SERVER_IP" 'bash -s' << 'EOF'
if command -v pm2 >/dev/null 2>&1; then
    pm2 status 2>/dev/null || echo "❌ PM2 not running"
else
    echo "❌ PM2 not installed"
fi
EOF
} | grep -v -E "Welcome to Ubuntu|Documentation:|Management:|Support:|System information|System load:|Usage of|Memory usage:|Swap usage:|Strictly confined|just raised|https://|Expanded Security|updates can be applied|To see these|Enable ESM|See https://|or run:|^\s*\*|^\s*$" | grep -v "System restart required"

echo ""
echo "========================="
echo "🔧 PM2 Process Control:"
echo ""
printf "ssh devops@%s \"pm2 env 0\"                                    # [env]                 : show environment variables\n" "$SERVER_IP"
printf "ssh devops@%s \"pm2 show dred\"                                # [show]                : show detailed process info\n" "$SERVER_IP"
printf "ssh devops@%s \"pm2 logs dred\"                                # [logs]                : show recent logs (default 50 lines)\n" "$SERVER_IP"
printf "ssh devops@%s \"pm2 logs dred --lines 50\"                     # [logs 50]             : show last 50 log lines\n" "$SERVER_IP"
printf "ssh devops@%s \"pm2 logs dred --lines 50\" | grep -i -E 'text' # [logs 50 grep 'text'] : grep on last 50 log lines\n" "$SERVER_IP"
printf "ssh devops@%s \"pm2 restart dred\"                             # [restart]             : restart DRED process\n" "$SERVER_IP"
printf "ssh devops@%s \"pm2 status\"                                   # [status]              : show all PM2 processes\n" "$SERVER_IP"

echo "" 