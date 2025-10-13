# Root Makefile - Delegates to devops/Makefile
#
# This allows running devops commands from the project root:
#   make local-dred-run
#   make dred-send-message uk news Hello
#   make vps-dred-deploy uk
#
# All targets are forwarded to devops/Makefile

# Default target
.DEFAULT_GOAL := help

# Forward all targets to devops/Makefile
%:
	@$(MAKE) -C devops $@

# Explicit help target for clarity
.PHONY: help
help:
	@echo "==================================="
	@echo "DRED Project - Root Makefile"
	@echo "==================================="
	@echo ""
	@echo "This Makefile delegates all commands to devops/Makefile"
	@echo "Run 'make help' to see all available targets."
	@echo ""
	@$(MAKE) -C devops help

# Common build workflow
.PHONY: build
build:
	npm run build

# Build and run locally
.PHONY: build-run
build-run: build
	@$(MAKE) -C devops local-dred-run

# Show location of actual Makefile
.PHONY: where
where:
	@echo "Root Makefile location: $(CURDIR)/Makefile"
	@echo "Devops Makefile location: $(CURDIR)/devops/Makefile"
	@echo ""
	@echo "All targets are delegated to devops/Makefile"
