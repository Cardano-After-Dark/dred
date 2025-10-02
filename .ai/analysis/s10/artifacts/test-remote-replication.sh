#!/bin/bash

# Simple Remote Replication Test Runner
# Runs the TypeScript remote replication test

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "🧪 DRED Remote Replication Test Runner"
echo "====================================="
echo

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Must be run from the project root directory${NC}"
    exit 1
fi

# Check if the test file exists
if [ ! -f "src/server/__tests__/remote-replication.test.ts" ]; then
    echo -e "${RED}Error: Remote replication test file not found${NC}"
    echo "Expected: src/server/__tests__/remote-replication.test.ts"
    exit 1
fi

# Check dependencies
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Error: pnpm is required but not installed${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Pre-flight checks${NC}"
echo "===================="

# Check server connectivity
echo -e "${YELLOW}🔍 Checking US server (74.208.13.84:3029)...${NC}"
if curl -s --connect-timeout 5 "http://74.208.13.84:3029/channels" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ US server responding${NC}"
else
    echo -e "${RED}✗ US server not responding${NC}"
    echo "Make sure the US server is running and accessible"
    exit 1
fi

echo -e "${YELLOW}🔍 Checking UK server (217.154.34.155:3029)...${NC}"
if curl -s --connect-timeout 5 "http://217.154.34.155:3029/channels" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ UK server responding${NC}"
else
    echo -e "${RED}✗ UK server not responding${NC}"
    echo "Make sure the UK server is running and accessible"
    exit 1
fi

echo
echo -e "${BLUE}🧪 Running Remote Replication Test${NC}"
echo "=================================="

# Run the test with verbose output
echo -e "${YELLOW}Starting test execution...${NC}"
echo

if pnpm test remote-replication --reporter=verbose; then
    echo
    echo -e "${GREEN}🎉 Remote replication test completed successfully!${NC}"
    echo "=============================================="
    echo
    echo -e "${YELLOW}📋 What was tested:${NC}"
    echo "  ✓ Server connectivity"
    echo "  ✓ Channel creation and synchronization"
    echo "  ✓ Message replication US → UK"
    echo "  ✓ Message replication UK → US"
    echo "  ✓ Replication loop prevention"
    echo "  ✓ On-chain discovery verification"
    echo
    echo -e "${GREEN}🏆 Replication is working correctly between your servers!${NC}"
else
    echo
    echo -e "${RED}❌ Remote replication test failed${NC}"
    echo "================================"
    echo
    echo -e "${YELLOW}💡 Troubleshooting steps:${NC}"
    echo "  1. Verify both servers are running and accessible"
    echo "  2. Check that both servers are in the same neighborhood"
    echo "  3. Ensure replication is enabled on both servers"
    echo "  4. Check server logs for error messages:"
    echo "     make dred-logs us"
    echo "     make dred-logs uk"
    echo "  5. Verify network connectivity between servers"
    echo
    exit 1
fi
