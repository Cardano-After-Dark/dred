#!/bin/bash

# Network Boundary Test Monitoring Script
# This script provides real-time monitoring of the Docker containers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
COMPOSE_FILE="replication/docker-compose.networktest.yml"
PROJECT_NAME="dred-networktest"

echo -e "${BLUE}📊 DRED Network Boundary Test Monitor${NC}"
echo "===================================="

# Function to display container status
show_status() {
    echo -e "${CYAN}📈 Container Status:${NC}"
    docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" ps 2>/dev/null || {
        echo -e "${RED}❌ No containers found. Run start-network-test.sh first.${NC}"
        exit 1
    }
    echo ""
}

# Function to display resource usage
show_resources() {
    echo -e "${CYAN}💾 Resource Usage:${NC}"
    docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}" \
        dred-server-1 dred-server-2 redis-1 redis-2 2>/dev/null || true
    echo ""
}

# Function to check health status
check_health() {
    echo -e "${CYAN}🏥 Health Status:${NC}"
    
    containers=("dred-server-1" "dred-server-2" "redis-1" "redis-2")
    for container in "${containers[@]}"; do
        if docker inspect "$container" > /dev/null 2>&1; then
            status=$(docker inspect --format='{{.State.Status}}' "$container" 2>/dev/null)
            health=$(docker inspect --format='{{.State.Health.Status}}' "$container" 2>/dev/null || echo "no-health-check")
            
            if [ "$status" = "running" ]; then
                if [ "$health" = "healthy" ]; then
                    echo -e "   ${GREEN}✅ $container: running (healthy)${NC}"
                elif [ "$health" = "unhealthy" ]; then
                    echo -e "   ${RED}❌ $container: running (unhealthy)${NC}"
                elif [ "$health" = "starting" ]; then
                    echo -e "   ${YELLOW}⏳ $container: running (starting)${NC}"
                else
                    echo -e "   ${GREEN}✅ $container: running${NC}"
                fi
            else
                echo -e "   ${RED}❌ $container: $status${NC}"
            fi
        else
            echo -e "   ${RED}❌ $container: not found${NC}"
        fi
    done
    echo ""
}

# Function to show network information
show_network() {
    echo -e "${CYAN}🌐 Network Information:${NC}"
    
    # Show network details
    network_id=$(docker network ls --filter "name=dred-network" --format "{{.ID}}" | head -1)
    if [ -n "$network_id" ]; then
        echo "   Network: dred-network ($network_id)"
        docker network inspect "$network_id" --format "   Subnet: {{range .IPAM.Config}}{{.Subnet}}{{end}}" 2>/dev/null || true
        
        # Show container IPs
        echo "   Container IPs:"
        for container in dred-server-1 dred-server-2 redis-1 redis-2; do
            ip=$(docker inspect "$container" --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' 2>/dev/null || echo "N/A")
            echo "     $container: $ip"
        done
    else
        echo -e "   ${RED}❌ dred-network not found${NC}"
    fi
    echo ""
}

# Parse command line arguments
case "${1:-status}" in
    "logs")
        echo -e "${YELLOW}📜 Following container logs (Ctrl+C to stop):${NC}"
        echo ""
        docker-compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" logs -f --tail=20
        ;;
    "status")
        show_status
        check_health
        show_resources
        show_network
        ;;
    "health")
        check_health
        ;;
    "resources")
        show_resources
        ;;
    "network")
        show_network
        ;;
    "interactive")
        echo -e "${YELLOW}🔄 Interactive monitoring (Ctrl+C to stop):${NC}"
        echo ""
        while true; do
            clear
            echo -e "${BLUE}📊 DRED Network Boundary Test Monitor${NC}"
            echo "===================================="
            echo "$(date)"
            echo ""
            show_status
            check_health
            show_resources
            sleep 5
        done
        ;;
    *)
        echo -e "${YELLOW}Usage: $0 [command]${NC}"
        echo ""
        echo "Commands:"
        echo "  status      - Show container status, health, and resources (default)"
        echo "  logs        - Follow container logs in real-time"
        echo "  health      - Show health status only"
        echo "  resources   - Show resource usage only"
        echo "  network     - Show network information"
        echo "  interactive - Continuous monitoring with auto-refresh"
        echo ""
        echo "Examples:"
        echo "  $0              # Show status"
        echo "  $0 logs         # Follow logs"
        echo "  $0 interactive  # Continuous monitoring"
        ;;
esac 