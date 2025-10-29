#!/bin/bash
# Check DRED server status
# Load configuration
SCRIPT_DIR="$(dirname "$0")"
source "$SCRIPT_DIR/load-env.sh"

US_IP=$1
DE_IP=$2
UK_IP=$3

echo "DRED Server Status"
echo "=================="
echo ""

# Local
echo "LOCAL (localhost:$DRED_PORT)"
if lsof -i :"$DRED_PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "  Status: RUNNING"
    CHANNELS=$(curl -s http://localhost:"$DRED_PORT"/channels --max-time 2 2>/dev/null | jq -r '.channels[]' 2>/dev/null | tr '\n' ' ')
    if [ -n "$CHANNELS" ]; then
        echo "  Channels: $CHANNELS"
    else
        echo "  Channels: (unable to fetch)"
    fi
else
    echo "  Status: NOT RUNNING"
fi
echo ""

# Remote servers
check_remote() {
    local NAME=$1
    local IP=$2
    echo "$NAME ($IP:$DRED_PORT)"

    if ! ssh -o ConnectTimeout=5 -o BatchMode=yes $SSH_USER@"$IP" exit 2>/dev/null; then
        echo "  Status: SSH FAILED"
        echo ""
        return
    fi

    STATUS=$(ssh $SSH_USER@"$IP" "pm2 jlist 2>/dev/null | jq -r '.[] | select(.name==\"dred\") | .pm2_env.status' 2>/dev/null" || echo "unknown")
    echo "  Status: $(echo "$STATUS" | tr '[:lower:]' '[:upper:]')"

    if [ "$STATUS" = "online" ]; then
        CHANNELS=$(curl -s http://"$IP":$DRED_PORT/channels --max-time 2 2>/dev/null | jq -r '.channels[]' 2>/dev/null | tr '\n' ' ')
        if [ -n "$CHANNELS" ]; then
            echo "  Channels: $CHANNELS"
        else
            echo "  Channels: (unable to fetch)"
        fi
    fi
    echo ""
}

check_remote "US" "$US_IP"
check_remote "DE" "$DE_IP"
check_remote "UK" "$UK_IP"
