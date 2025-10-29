#!/bin/bash

# Simple script to send a message to a DRED channel
# Usage: ./send-message-on-channel.sh <address:port> <channel> <message> [domain]

if [ $# -lt 3 ]; then
    echo "Usage: $0 <address:port> <channel> <message> [domain]"
    echo "Example: $0 217.154.34.155:3029 news 'Hello World'"
    echo "Example: $0 217.154.34.155:3029 news 'Hello World' uk.pp.node-01.dred.network"
    exit 1
fi

ADDRESS_PORT="$1"
CHANNEL="$2"
MESSAGE="$3"
DOMAIN="${4:-}"

# Generate unique OCID using timestamp and random number
OCID="test-$(date +%s)-$RANDOM"

# Try SSL first if domain is provided
if [ -n "$DOMAIN" ]; then
    echo "Attempting HTTPS with domain: $DOMAIN"
    echo "Channel: ${CHANNEL}"
    echo "Message: ${MESSAGE}"
    echo "OCID: ${OCID}"
    echo ""

    # Try HTTPS on port 443 with domain
    if curl -X POST "https://${DOMAIN}:443/channel/${CHANNEL}/message" \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -H "clientid: test-curl-client" \
      -d "{\"type\": \"test-message\", \"ocid\": \"${OCID}\", \"msg\": \"${MESSAGE}\"}" \
      --fail-with-body \
      -w "\n\nHTTP Status: %{http_code}\n" \
      --connect-timeout 5 \
      --max-time 10 2>&1; then
        echo ""
        echo "✓ Message sent successfully via HTTPS"
        exit 0
    else
        echo ""
        echo "⚠ HTTPS failed, falling back to HTTP..."
        echo ""
    fi
fi

# Fallback to HTTP
echo "Sending message to http://${ADDRESS_PORT}/channel/${CHANNEL}/message"
echo "Channel: ${CHANNEL}"
echo "Message: ${MESSAGE}"
echo "OCID: ${OCID}"
echo ""

curl -X POST "http://${ADDRESS_PORT}/channel/${CHANNEL}/message" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "clientid: test-curl-client" \
  -d "{\"type\": \"test-message\", \"ocid\": \"${OCID}\", \"msg\": \"${MESSAGE}\"}" \
  --fail-with-body \
  -w "\n\nHTTP Status: %{http_code}\n"

echo ""