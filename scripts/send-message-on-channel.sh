#!/bin/bash

# Simple script to send a message to a DRED channel
# Usage: ./send-message-on-channel.sh <address:port> <channel> <message>

if [ $# -ne 3 ]; then
    echo "Usage: $0 <address:port> <channel> <message>"
    echo "Example: $0 217.154.34.155:3029 news 'Hello World'"
    exit 1
fi

ADDRESS_PORT="$1"
CHANNEL="$2"
MESSAGE="$3"

# Generate unique OCID using timestamp and random number
OCID="test-$(date +%s)-$RANDOM"

# Send the message
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