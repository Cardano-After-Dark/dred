# Session S00 - User Input Summary

## Initial Request
User wants to understand what is needed to deploy DRED on a VPS Ubuntu 24 server. They have:
- SSH access as a DevOps superuser
- Access to clone the repository (branch: dev3/message-replication-rebased)
- Need to understand Docker vs direct deployment
- Need configuration for ports and firewall setup

## Key Questions Asked
1. Should DRED run directly on the VPS or use Docker?
2. What configuration is needed for ports and firewall?
3. What are the complete infrastructure requirements?
4. What are the step-by-step deployment procedures?

## User Context
- VPS: Ubuntu 24
- User: DevOps with sudo access
- Repository: DRED project, branch dev3/message-replication-rebased
- Goal: Run DRED server with proper networking configuration
- Target: US server (will be called "DRED one")
- Focus: Single server deployment first

## Hardware Constraints
- **RAM**: 2GB (shared between Ubuntu, firewall, Redis, DRED)
- **CPU**: 2 vCPUs
- **VPS must run everything**: Ubuntu + firewall + Redis + DRED
- **Future scaling**: May upgrade specs later

## Test Results
- **Makefile test**: `make test us` shows SSH OK, DRED not responding (expected)
- **Server connectivity**: Confirmed working
- **Current status**: Ready for installation

## Important Clarifications
- **pre-prod scripts are untested**: Written 3 days ago, never tried
- **Don't rely on pre-prod automation**: May have correct requirements but scripts are unproven
- **servers.conf may be accurate**: Contains correct server addresses
- **Makefile has working commands**: Can check if servers are up, shows Redis status
- **Need architectural understanding**: Want to understand DRED-Redis interaction before deciding

## User Preferences
- **Comfortable with Docker commands**
- **No specific Redis requirements** (beyond 2GB RAM constraint)
- **Ready to proceed with hybrid approach**
- **Wants manual step-by-step instructions first**
- **Then automation script for other servers**

## Key Decisions Needed
- Docker vs direct deployment approach (based on architecture understanding)
- Pure Docker vs hybrid (Docker Redis + direct DRED)
- Port configuration and firewall setup
- Required dependencies and services
- Security considerations 