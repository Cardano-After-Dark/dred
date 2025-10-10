#!/bin/bash

# Test manual replication with auto-replication disabled
echo "🧪 Testing manual replication with DISABLE_AUTO_REPLICATION=true..."

# Set environment variable to disable auto-replication startup (but allow manual calls)
export DISABLE_AUTO_REPLICATION=true

# Run the replication test
LOGGING=default:info pnpm test replication

echo "✅ Manual replication test completed"
