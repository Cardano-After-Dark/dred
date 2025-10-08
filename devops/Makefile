# DRED DevOps - Unified Management Interface
# Usage: make <command> [SERVER] [ARGS...]

# Load server configuration from config/hosts.conf
-include config/hosts.conf

# Load DRED configuration from config/.env
-include config/.env

# Default DRED configuration (can be overridden by config/.env)
DRED_PORT ?= 3029
DRED_BRANCH ?= main
REDIS_MEMORY_LIMIT ?= 512mb
SSH_TIMEOUT ?= 10
SSH_USER ?= devops

# Get server IP based on server name (case insensitive)
define get_server_ip
$(if $(filter US us,$(1)),$(US),$(if $(filter DE de,$(1)),$(DE),$(if $(filter UK uk,$(1)),$(UK),$(error Unknown server: $(1)))))
endef

# Get normalized server name
define get_server_name
$(if $(filter US us,$(1)),US,$(if $(filter DE de,$(1)),DE,$(if $(filter UK uk,$(1)),UK,$(error Unknown server: $(1)))))
endef

# Handle command arguments
# For commands with just server parameter
ifneq (,$(filter srv-setup srv-connect vps-infra-setup vps-dred-deploy vps-dred-logs,$(MAKECMDGOALS)))
    SERVER := $(word 2,$(MAKECMDGOALS))
    $(eval $(SERVER):;@:)
endif

# For commands with server + extra arguments
ifneq (,$(filter vps-check,$(MAKECMDGOALS)))
    SERVER := $(word 2,$(MAKECMDGOALS))
    $(eval $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)):;@:)
endif

# For dred-send-message (server + channel + message)
ifneq (,$(filter dred-send-message,$(MAKECMDGOALS)))
    $(eval $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)):;@:)
endif

# Default help
.PHONY: help
help:
	@echo "DRED DevOps Management"
	@echo "======================"
	@echo ""
	@echo "Local Development:"
	@echo "  make local-dred-run [LOGGING=...]              # Build and run locally"
	@echo ""
	@echo "DRED Operations (All):"
	@echo "  make dred-send-message [server] [channel] message words..."
	@echo "  make dred-check-status                         # Check all known servers local and remote"
	@echo ""
	@echo "Server Operations:"
	@echo "  make srv-setup [server]                        # Step 1: Create devops user + SSH keys"
	@echo "  make srv-connect [server]                      # ssh-connect to server"
	@echo ""
	@echo "VPS Ops:"
	@echo "  make vps-infra-setup [server]                  # Step 2: Install Docker, Redis, Node.js"
	@echo "  make vps-dred-deploy [server]                  # Step 3: Deploy DRED application from $(DRED_BRANCH)"
	@echo "  make vps-check [server] [command]              # Run test-server.sh commands"
	@echo "  make vps-dred-logs [server]                    # Tail DRED logs (50 lines)"
	@echo ""
	@echo "Docker Ops:"
	@echo "  #TODO: add equivalent to VPS setup, deploy, logs, check (next iteration)"
	@echo ""
	@echo "Examples:"
	@echo ""
	@echo "  make local-dred-run LOGGING=default:debug,replicant:trace # run locally"
	@echo ""
	@echo "  make srv-setup uk                              # Setup UK test vps"
	@echo ""
	@echo "  make vps-infra-setup uk                        # Install software on UK vps"
	@echo "  make vps-dred-deploy uk                        # Deploy dred branch"
	@echo "  make vps-check uk logs 100 grep discovery      # check logs"
	@echo ""
	@echo "  make dred-send-message uk news Hello from uk   # message remote"
	@echo ""
	@echo "Available servers:"
	@echo "  US ($(US))"
	@echo "  DE ($(DE))"
	@echo "  UK ($(UK))"
	@echo ""

# =============================================================================
# LOCAL DEVELOPMENT
# =============================================================================

.PHONY: local-dred-run
local-dred-run:
	@echo "Building DRED..."
	@cd .. && pnpm build
	@echo ""
	@echo "Starting local server..."
	@echo "  LOGGING=$(LOGGING)"
	@[ -f ../config/.env ] && echo "  (using config/.env)" || [ -f ../.env ] && echo "  (using .env)" || true
	@echo ""
	@sleep 2
	@cd .. && LOGGING="$(LOGGING)" pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty

# =============================================================================
# DRED OPERATIONS (ALL)
# =============================================================================

.PHONY: dred-send-message
dred-send-message:
	@./scripts/dred-send-message.sh $(filter-out $@,$(MAKECMDGOALS))

.PHONY: dred-check-status
dred-check-status:
	@./scripts/dred-check-status.sh $(US) $(DE) $(UK)

# =============================================================================
# SERVER OPERATIONS
# =============================================================================

.PHONY: srv-setup
srv-setup:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make srv-setup [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Setting up devops user on $(call get_server_name,$(SERVER))"
	@./scripts/srv-setup.sh $(call get_server_ip,$(SERVER))

.PHONY: srv-connect
srv-connect:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make srv-connect [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Connecting to $(call get_server_name,$(SERVER)) ($(call get_server_ip,$(SERVER)))..."
	@ssh $(SSH_USER)@$(call get_server_ip,$(SERVER))

# =============================================================================
# VPS OPERATIONS
# =============================================================================

.PHONY: vps-infra-setup
vps-infra-setup:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make vps-infra-setup [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Installing infrastructure on $(call get_server_name,$(SERVER))"
	@./scripts/vps-infra-setup.sh $(call get_server_ip,$(SERVER))

.PHONY: vps-dred-deploy
vps-dred-deploy:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make vps-dred-deploy [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@echo "Deploying DRED on $(call get_server_name,$(SERVER))"
	@./scripts/vps-dred-deploy.sh $(call get_server_ip,$(SERVER)) $(call get_server_name,$(SERVER))

.PHONY: vps-check
vps-check:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make vps-check [server] [command] [args...]"; \
		echo "Available servers: us, de, uk"; \
		echo "Commands: env, show, logs, restart, status"; \
		exit 1; \
	fi
	@./scripts/vps-check.sh $(call get_server_ip,$(SERVER)) $(wordlist 3,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

.PHONY: vps-dred-logs
vps-dred-logs:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make vps-dred-logs [server]"; \
		echo "Available servers: us, de, uk"; \
		exit 1; \
	fi
	@ssh $(SSH_USER)@$(call get_server_ip,$(SERVER)) "pm2 logs dred --lines 50"

# =============================================================================
# DOCKER OPERATIONS (TODO)
# =============================================================================

# TODO: Docker equivalents for VPS operations will be added in next iteration
