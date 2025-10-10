#!/bin/bash

# Make all scripts executable
chmod +x scripts/setup-devops.sh
chmod +x scripts/setup-infrastructure.sh
chmod +x scripts/setup-dred.sh
chmod +x scripts/test-server.sh

echo "✅ All scripts are now executable"
echo ""
echo "Scripts ready:"
echo "  setup-devops.sh"
echo "  setup-infrastructure.sh"
echo "  setup-dred.sh"
echo "  test-server.sh"
echo ""
echo "Now run: make help" 