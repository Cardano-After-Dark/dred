#!/bin/bash
# Send message to DRED channel
# Load configuration
SCRIPT_DIR="$(dirname "$0")"
source "$SCRIPT_DIR/load-env.sh"

if [ $# -lt 3 ]; then
    echo "Usage: $0 [server|address:port] [channel] message..."
    exit 1
fi

SERVER_OR_ADDR="$1"
CHANNEL="$2"
shift 2
MESSAGE="$*"

# Resolve server name to IP:port (case insensitive)
SERVER_LOWER=$(echo "$SERVER_OR_ADDR" | tr '[:upper:]' '[:lower:]')
case "$SERVER_LOWER" in
    us) ADDRESS="$US:$DRED_PORT" ;;
    de) ADDRESS="$DE:$DRED_PORT" ;;
    uk) ADDRESS="$UK:$DRED_PORT" ;;
    *:*) ADDRESS="$SERVER_OR_ADDR" ;;
    *)
        echo "Unknown server: $SERVER_OR_ADDR (use us|de|uk or address:port)"
        exit 1
        ;;
esac

echo "Sending to $ADDRESS / $CHANNEL: $MESSAGE"
"$SCRIPT_DIR/send-message-on-channel.sh" "$ADDRESS" "$CHANNEL" "$MESSAGE"
