# DRED Pre-Production - Streamlined 4-Step Workflow
# Usage: make <command> <SERVER>
# Example: make setup-devops UK

# Load environment configuration (optional)
-include .env

# Default server configuration (can be overridden by .env)
US ?= 74.208.13.84
DE ?= 85.215.215.192
UK ?= 217.154.34.155

# Default DRED configuration (can be overridden by .env)
DRED_REPO ?= https://github.com/Cardano-After-Dark/dred.git
DRED_BRANCH ?= feature/onchain-nbh-discovery
DRED_PORT ?= 3029
REDIS_MEMORY_LIMIT ?= 512mb
SSH_TIMEOUT ?= 10

# Get server IP based on server name (case insensitive)
define get_server_ip
$(if $(filter US us,$(1)),$(US),$(if $(filter DE de,$(1)),$(DE),$(if $(filter UK uk,$(1)),$(UK),$(error Unknown server: $(1)))))
endef

# Get normalized server name
define get_server_name
$(if $(filter US us,$(1)),US,$(if $(filter DE de,$(1)),DE,$(if $(filter UK uk,$(1)),UK,$(error Unknown server: $(1)))))
endef

# Default help
.PHONY: help
help:
	@echo "DRED Pre-Production Management"
	@echo "=============================="
	@echo ""
	@echo "Server Setup Commands:"
	@echo "  make setup-devops [server]    # Step 1: Create devops user + SSH keys"
	@echo "  make setup-infra [server]     # Step 2: Install Docker, Redis, Node.js"
	@echo "  make setup-dred [server]      # Step 3: Deploy DRED application"
	@echo ""
	@echo "DRED Management:"
	@echo "  make dred-redeploy [server]   # Update DRED (pull + restart)"
	@echo "  make dred-status [server]     # Check DRED status + channels"
	@echo "  make dred-logs [server]       # View DRED logs (50 lines)"
	@echo "  make test-self-id [server]    # Test self-identification fix"
	@echo ""
	@echo "Server Operations:"
	@echo "  make connect [server]         # Connect to server"
	@echo "  make test [server]            # Test server connectivity + env vars"
	@echo "  make list                     # List available servers"
	@echo ""
	@echo "Examples:"
	@echo "  make setup-devops uk          # Setup UK test server"
	@echo "  make test de                  # Test DE server"
	@echo "  make dred-redeploy us         # Update US server"
	@echo ""
	@echo "Available servers:"
	@echo "  US ($(US))"
	@echo "  DE ($(DE))"
	@echo "  UK ($(UK))"

# Handle server parameter (case insensitive)
ifneq (,$(filter setup-devops setup-infra setup-dred dred-redeploy test connect dred-logs dred-status test-self-id verify-nbh,$(MAKECMDGOALS)))
    SERVER := $(word 2,$(MAKECMDGOALS))
    $(eval $(SERVER):;@:)
endif

# =============================================================================
# SERVER SETUP COMMANDS
# =============================================================================

.PHONY: setup-devops
setup-devops:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make setup-devops [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Setting up devops user on $(call get_server_name,$(SERVER))"
	@./scripts/setup-devops.sh $(call get_server_ip,$(SERVER))

.PHONY: setup-infra
setup-infra:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make setup-infra [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Installing infrastructure on $(call get_server_name,$(SERVER))"
	@./scripts/setup-infrastructure.sh $(call get_server_ip,$(SERVER))

.PHONY: setup-dred
setup-dred:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make setup-dred [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Setting up DRED on $(call get_server_name,$(SERVER))"
	@./scripts/setup-dred-minimal.sh $(call get_server_ip,$(SERVER)) $(call get_server_name,$(SERVER))

# =============================================================================
# DRED MANAGEMENT
# =============================================================================

.PHONY: dred-redeploy
dred-redeploy:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make dred-redeploy [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Redeploying DRED on $(call get_server_name,$(SERVER))"
	@ssh devops@$(call get_server_ip,$(SERVER)) "cd dred && bash scripts/update-dred.sh"

.PHONY: dred-logs
dred-logs:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make dred-logs [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@ssh devops@$(call get_server_ip,$(SERVER)) "pm2 logs dred --lines 50"

.PHONY: dred-status
dred-status:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make dred-status [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "DRED Status - $(call get_server_name,$(SERVER)) ($(call get_server_ip,$(SERVER))):3029"
	@ssh devops@$(call get_server_ip,$(SERVER)) "pm2 status | grep dred && echo '--- Redis Status ---' && docker ps | grep dred-redis && echo '--- DRED Channels ---' && curl -s http://localhost:3029/channels 2>/dev/null || echo 'No channels endpoint available'"

.PHONY: test-self-id
test-self-id:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make test-self-id [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Testing self-identification fix on $(call get_server_name,$(SERVER))"
	@./scripts/test-self-identification.sh $(call get_server_ip,$(SERVER))

# =============================================================================
# SERVER OPERATIONS
# =============================================================================

.PHONY: connect
connect:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make connect [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Connecting to $(call get_server_name,$(SERVER)) ($(call get_server_ip,$(SERVER)))..."
	@ssh devops@$(call get_server_ip,$(SERVER))

.PHONY: test
test:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make test [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@./scripts/test-server.sh $(call get_server_ip,$(SERVER))

.PHONY: list
list:
	@echo "Available servers:"
	@echo "  US ($(US))"
	@echo "  DE ($(DE))"
	@echo "  UK ($(UK))"

# Server names are handled dynamically above 
	@echo "  UK ($(UK))"

# Server names are handled dynamically above 