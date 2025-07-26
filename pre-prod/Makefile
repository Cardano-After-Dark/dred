# DRED VPS Management
# Usage: make connect us
#        make test de

.DEFAULT_GOAL := help

# Check if this is a connect or test command with server argument
ifneq (,$(filter connect,$(MAKECMDGOALS)))
    SERVER := $(word 2,$(MAKECMDGOALS))
    $(eval $(SERVER):;@:)
endif

ifneq (,$(filter test,$(MAKECMDGOALS)))
    SERVER := $(word 2,$(MAKECMDGOALS))
    $(eval $(SERVER):;@:)
endif

ifneq (,$(filter setup-keys,$(MAKECMDGOALS)))
    SERVER := $(word 2,$(MAKECMDGOALS))
    $(eval $(SERVER):;@:)
endif

# Connect to server
connect:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make connect [server]"; \
		echo "Available servers:"; \
		grep "^[A-Z].*=" conf/servers.conf | cut -d'=' -f1 | sed 's/^/  /' | tr '[:upper:]' '[:lower:]'; \
	else \
		chmod +x scripts/connect-server.sh; \
		scripts/connect-server.sh $(SERVER); \
	fi

# Test server
test:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make test [server]"; \
		echo "Available servers:"; \
		grep "^[A-Z].*=" conf/servers.conf | cut -d'=' -f1 | sed 's/^/  /' | tr '[:upper:]' '[:lower:]'; \
	else \
		chmod +x scripts/connect-server.sh; \
		scripts/connect-server.sh $(SERVER) --test; \
	fi

# Setup SSH keys on server
setup-keys:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make setup-keys [server]"; \
		echo "Available servers:"; \
		grep "^[A-Z].*=" conf/servers.conf | cut -d'=' -f1 | sed 's/^/  /' | tr '[:upper:]' '[:lower:]'; \
	else \
		chmod +x scripts/setup-ssh-keys.sh; \
		scripts/setup-ssh-keys.sh $(SERVER); \
	fi

# Test all servers
test-all:
	@chmod +x scripts/connect-server.sh
	@echo "Testing all servers..."
	@grep "^[A-Z].*=" conf/servers.conf | cut -d'=' -f1 | while read server; do \
		echo ""; \
		echo "Testing $$server server..."; \
		scripts/connect-server.sh $$server --test || true; \
	done

# List available servers
list:
	@echo "Available servers:"
	@grep "^[A-Z].*=" conf/servers.conf | while IFS='=' read name ip; do \
		echo "  $$name ($$ip)"; \
	done

# Show help
help:
	@echo "DRED VPS Management"
	@echo "==================="
	@echo ""
	@echo "Commands:"
	@echo "  make connect [server]     # Connect to server"
	@echo "  make test [server]        # Test server connectivity"
	@echo "  make setup-keys [server]  # Deploy SSH keys to server"
	@echo "  make test-all             # Test all servers"
	@echo "  make list                 # List available servers"
	@echo ""
	@echo "Examples:"
	@echo "  make connect us           # Connect to US server"
	@echo "  make test de              # Test DE server"
	@echo "  make setup-keys us        # Deploy SSH keys to US server"
	@echo ""
	@echo "Available servers:"
	@grep "^[A-Z].*=" conf/servers.conf | while IFS='=' read name ip; do \
		echo "  $$name ($$ip)"; \
	done

.PHONY: help connect test setup-keys test-all list 