#!/bin/bash

# Network Boundary Test Startup Script
# This script starts the Docker containers for cross-container DRED server testing

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

echo -e "${BLUE}🚀 Starting DRED Network Boundary Test${NC}"
echo "======================================"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose file exists
if [ ! -f "$COMPOSE_FILE" ]; then
    echo -e "${RED}❌ Docker Compose file not found: $COMPOSE_FILE${NC}"
    exit 1
fi

# Clean up any previous test containers
echo -e "${YELLOW}🧹 Cleaning up previous test containers...${NC}"
docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" down --remove-orphans 2>/dev/null || true

# Build and start containers
echo -e "${YELLOW}🏗️  Building Docker images...${NC}"
docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" build --no-cache

echo -e "${YELLOW}🐳 Starting containers...${NC}"
docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" up -d

# Wait for health checks
echo -e "${YELLOW}⏳ Waiting for services to be healthy...${NC}"

# Function to check service health
check_health() {
    service_name=$1
    container_name=$2
    max_attempts=30
    attempt=0
    
    echo -e "${BLUE}   Checking $service_name health...${NC}"
    
    while [ $attempt -lt $max_attempts ]; do
        if docker inspect --format='{{.State.Health.Status}}' "$container_name" 2>/dev/null | grep -q "healthy"; then
            echo -e "${GREEN}   ✅ $service_name is healthy${NC}"
            return 0
        elif docker inspect --format='{{.State.Health.Status}}' "$container_name" 2>/dev/null | grep -q "unhealthy"; then
            echo -e "${RED}   ❌ $service_name is unhealthy${NC}"
            return 1
        fi
        
        echo -e "${YELLOW}   ⏳ $service_name not ready yet (attempt $((attempt+1))/$max_attempts)${NC}"
        sleep 2
        attempt=$((attempt+1))
    done
    
    echo -e "${RED}   ❌ $service_name health check timed out${NC}"
    return 1
}

# Check Redis instances
check_health "Redis-1" "redis-1"
check_health "Redis-2" "redis-2"

# Check DRED servers
check_health "DRED-Server-1" "dred-server-1"
check_health "DRED-Server-2" "dred-server-2"

# Display connection information
echo -e "${GREEN}✅ All services are healthy!${NC}"
echo ""
echo -e "${BLUE}🔗 Connection Information:${NC}"
echo "=========================="
echo -e "${GREEN}DRED Server 1:${NC} http://localhost:4001"
echo -e "${GREEN}DRED Server 2:${NC} http://localhost:4002"
echo -e "${GREEN}Redis 1:${NC}       localhost:6001"
echo -e "${GREEN}Redis 2:${NC}       localhost:6002"
echo ""
echo -e "${BLUE}📊 Container Status:${NC}"
docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" ps

echo ""
echo -e "${GREEN}✨ Network boundary test environment is ready!${NC}"
echo -e "${YELLOW}💡 Next steps:${NC}"
echo "   - Run network boundary tests: pnpm test networkboundary"
echo "   - Monitor logs: ./replication/scripts/monitor-containers.sh"
echo "   - Stop environment: ./replication/scripts/stop-network-test.sh" 