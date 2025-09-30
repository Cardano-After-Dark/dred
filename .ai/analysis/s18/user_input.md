# Session S18 - User Input Summary

## Initial Request
Deploy current codebase on US server using preprod deployment scripts to test replication functionality.

## Context
- German server (DE) is not up-to-date with latest codebase
- Client connection to DE server is failing (timeout after 30s in "discoveringChannels" state)
- Need to deploy current branch `feature/onchain-replication-m2` to US server
- Preprod deployment hasn't been tested for 2 weeks - may have variable mismatches

## Requirements
1. **Analysis Phase**: Examine preprod folder structure and deployment scripts
2. **Gap Analysis**: Compare current codebase variables with preprod environment variables
3. **Deployment Plan**: Provide minimal 3-command deployment process for US server
4. **Testing Plan**: After deployment, test replication-client.js against US server instead of DE

## Key Concerns
- Potential environment variable mismatches between current code and preprod scripts
- Need to ensure US server gets latest replication functionality
- Want minimal, reliable deployment process

## Target Server
- **US Server**: `74.208.13.84:3029` (from preprod/servers.conf)
- **Node ID**: `preprod-us` (from preprod/config/us.env)
- **Environment**: Pre-production deployment

## Expected Deliverables
1. Current deployment status vs codebase analysis
2. 3-command deployment procedure for US server
3. Updated test client configuration for US target

