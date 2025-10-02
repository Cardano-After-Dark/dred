#!/bin/bash
# Send message to DRED channel

US_IP="74.208.13.84"
DE_IP="85.215.215.192"
UK_IP="217.154.34.155"

if [ $# -lt 3 ]; then
    echo "Usage: $0 [server|address:port] [channel] message..."
    exit 1
fi

SERVER_OR_ADDR="$1"
CHANNEL="$2"
shift 2
MESSAGE="$*"

# Resolve server name to IP:port (case insensitive, works on macOS and Linux)
SERVER_LOWER=$(echo "$SERVER_OR_ADDR" | tr '[:upper:]' '[:lower:]')
case "$SERVER_LOWER" in
    us) ADDRESS="$US_IP:3029" ;;
    de) ADDRESS="$DE_IP:3029" ;;
    uk) ADDRESS="$UK_IP:3029" ;;
    *:*) ADDRESS="$SERVER_OR_ADDR" ;;
    *)
        echo "Unknown server: $SERVER_OR_ADDR (use us|de|uk or address:port)"
        exit 1
        ;;
esac

echo "Sending to $ADDRESS / $CHANNEL: $MESSAGE"
"$(dirname "$0")/send-message-on-channel.sh" "$ADDRESS" "$CHANNEL" "$MESSAGE"
