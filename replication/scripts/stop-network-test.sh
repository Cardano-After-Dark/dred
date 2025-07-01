#!/bin/bash

# Network Boundary Test Cleanup Script
# This script stops and cleans up the Docker containers for network boundary testing

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="replication/docker-compose.networktest.yml"
PROJECT_NAME="dred-networktest"

echo -e "${BLUE}🛑 Stopping DRED Network Boundary Test${NC}"
echo "====================================="

# Check if Docker Compose file exists 
if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}❌ Docker Compose file not found: $COMPOSE_FILE${NC}"
    exit 1
fi

# Stop and remove containers
echo -e "${YELLOW}🐳 Stopping containers...${NC}"
docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" down --remove-orphans

# Remove unused volumes (optional - uncomment if needed)
# echo -e "${YELLOW}🗑️  Removing unused volumes...${NC}"
# docker volume prune -f

# Remove unused networks (optional - uncomment if needed)
# echo -e "${YELLOW}🌐 Removing unused networks...${NC}"
# docker network prune -f

# Show remaining containers (if any)
remaining_containers=$(docker ps -a --filter "name=dred-server" --filter "name=redis-" --format "table {{.Names}}\t{{.Status}}" | tail -n +2)
if [ -n "$remaining_containers" ]; then
    echo -e "${YELLOW}⚠️  Remaining related containers:${NC}"
    echo "$remaining_containers"
else
    echo -e "${GREEN}✅ All test containers have been removed${NC}"
fi

# Check for orphaned networks
orphaned_networks=$(docker network ls --filter "name=dred" --format "{{.Name}}" | grep -v "bridge\|host\|none" || true)
if [ -n "$orphaned_networks" ]; then
    echo -e "${YELLOW}⚠️  Related networks still exist:${NC}"
    echo "$orphaned_networks"
    echo -e "${BLUE}💡 To remove them manually: docker network rm <network_name>${NC}"
else
    echo -e "${GREEN}✅ All test networks have been cleaned up${NC}"
fi

echo ""
echo -e "${GREEN}✨ Network boundary test environment has been stopped${NC}"
echo -e "${YELLOW}💡 To restart the environment: ./replication/scripts/start-network-test.sh${NC}" 