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

# Resolve server name to IP:port and domain (case insensitive)
SERVER_LOWER=$(echo "$SERVER_OR_ADDR" | tr '[:upper:]' '[:lower:]')
HOST_DOMAIN=""
case "$SERVER_LOWER" in
    us)
        ADDRESS="$US:$DRED_PORT"
        # Load server-specific config to get HOST_DOMAIN
        if [ -f "$SCRIPT_DIR/../config/us.env" ]; then
            source "$SCRIPT_DIR/../config/us.env"
        fi
        ;;
    de)
        ADDRESS="$DE:$DRED_PORT"
        if [ -f "$SCRIPT_DIR/../config/de.env" ]; then
            source "$SCRIPT_DIR/../config/de.env"
        fi
        ;;
    uk)
        ADDRESS="$UK:$DRED_PORT"
        if [ -f "$SCRIPT_DIR/../config/uk.env" ]; then
            source "$SCRIPT_DIR/../config/uk.env"
        fi
        ;;
    *:*) ADDRESS="$SERVER_OR_ADDR" ;;
    *)
        echo "Unknown server: $SERVER_OR_ADDR (use us|de|uk or address:port)"
        exit 1
        ;;
esac

echo "Sending to $ADDRESS / $CHANNEL: $MESSAGE"
if [ -n "$HOST_DOMAIN" ]; then
    echo "Using SSL domain: $HOST_DOMAIN"
    "$SCRIPT_DIR/send-message-on-channel.sh" "$ADDRESS" "$CHANNEL" "$MESSAGE" "$HOST_DOMAIN"
else
    "$SCRIPT_DIR/send-message-on-channel.sh" "$ADDRESS" "$CHANNEL" "$MESSAGE"
fi
