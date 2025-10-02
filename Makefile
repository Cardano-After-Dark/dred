# DRED Development Makefile
-include .env

# Server IPs
US ?= 74.208.13.84
DE ?= 85.215.215.192
UK ?= 217.154.34.155

# Get server IP (case insensitive)
define get_ip
$(if $(filter US us,$(1)),$(US),$(if $(filter DE de,$(1)),$(DE),$(if $(filter UK uk,$(1)),$(UK),$(error Unknown server: $(1)))))
endef

# Help
.PHONY: help
help:
	@echo "DRED Development Commands"
	@echo "========================="
	@echo ""
	@echo "Commands:"
	@echo "  make dred-setup-remote [server]       # Deploy from current branch"
	@echo "  make dred-run-local [LOGGING=...]     # Build and run locally"
	@echo "  make dred-send-message [server] [channel] message words..."
	@echo "  make dred-check-status                # Check all servers"
	@echo ""
	@echo "Examples:"
	@echo "  make dred-setup-remote uk"
	@echo "  make dred-run-local LOGGING=default:debug,replicant:trace,replicator:trace"
	@echo "  make dred-send-message uk news Hello from UK server"
	@echo ""
	@echo "Servers: US ($(US)) | DE ($(DE)) | UK ($(UK))"

# Handle server args
ifneq (,$(filter dred-setup-remote,$(MAKECMDGOALS)))
    SERVER := $(word 2,$(MAKECMDGOALS))
    $(eval $(SERVER):;@:)
endif

ifneq (,$(filter dred-send-message,$(MAKECMDGOALS)))
    $(eval $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS)):;@:)
endif

# Commands
.PHONY: dred-setup-remote
dred-setup-remote:
	@if [ -z "$(SERVER)" ]; then \
		echo "Usage: make dred-setup-remote [us|de|uk]"; exit 1; \
	fi
	@./scripts/deploy-remote.sh $(call get_ip,$(SERVER)) $(SERVER)

.PHONY: dred-run-local
dred-run-local:
	@./scripts/run-local.sh

.PHONY: dred-send-message
dred-send-message:
	@./scripts/send-message.sh $(filter-out $@,$(MAKECMDGOALS))

.PHONY: dred-check-status
dred-check-status:
	@./scripts/check-status.sh $(US) $(DE) $(UK)
