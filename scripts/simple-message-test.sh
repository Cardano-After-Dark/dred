#!/bin/bash
# Simple script to send a message to local DRED server for replication testing

echo "🧪 Sending test message to local DRED server..."
echo "📡 Target: http://127.0.0.1:3029/channels/news/messages"

# Send a simple message to the news channel
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "type": "replication-test",
    "msg": "Hello from simple replication test! Timestamp: '$(date -Iseconds)'"
  }' \
  http://127.0.0.1:3029/channels/news/messages

echo ""
echo "✅ Message sent! Check server logs for replication to remote peer."
echo "🔍 Look for replication messages in the server console."
