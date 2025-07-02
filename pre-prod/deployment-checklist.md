# DRED Pre-Production Deployment Checklist

This checklist ensures consistent and secure deployment of DRED servers on VPS instances for pre-production testing.

## Pre-Deployment Checklist

### 1. VPS Server Requirements
- [v] Ubuntu 22.04+ server provisioned
- [v] Root access credentials available
- [v] Server IP address documented
- [v] Minimum 2GB RAM, 20GB storage
- [v] Network connectivity verified

### 2. Local Environment Setup
- [v] SSH client installed and configured
- [v] SSH key pair generated (if not existing)
- [v] Git repository access verified
- [v] Node.js and pnpm installed locally for testing

### 3. Security Preparation
- [v] SSH public keys collected from team members
- [v] Firewall rules planned (ports 22, 3029, optionally 80/443)
- [v] fail2ban configuration reviewed
- [ ] Security update schedule planned

## Deployment Process

### Phase 1: Basic Server Setup
- [v] Connect to server as root
- [v] Update system packages (`apt update && apt upgrade -y`)
- [ ] Install security tools (ufw, fail2ban)
- [ ] Configure basic firewall rules
- [v] Create DevOps user with sudo privileges

### Phase 2: Software Installation
- [ ] Install Node.js 20.x LTS
- [ ] Install pnpm 10.11.0
- [ ] Install Redis server
- [ ] Install Git and build tools
- [ ] Install PM2 process manager
- [ ] Verify all installations with version checks

### Phase 3: Security Configuration
- [v] Set up SSH keys for DevOps user
- [v] Test SSH key authentication
- [v] Disable root SSH login (optional but recommended)
- [ ] Configure UFW firewall with required ports
- [ ] Enable and test fail2ban
- [ ] Set up Redis security (if needed)

### Phase 4: DRED Project Setup
- [ ] Clone DRED repository to `/home/devops/dred`
- [ ] Install project dependencies (`pnpm install`)
- [ ] Build project (`pnpm build`)
- [ ] Create VPS-specific configuration files
- [ ] Set up PM2 ecosystem configuration
- [ ] Create log directories with proper permissions

### Phase 5: Service Configuration
- [ ] Configure DRED server for external access (bind to 0.0.0.0)
- [ ] Set appropriate environment variables
- [ ] Test Redis connectivity
- [ ] Start DRED server with PM2
- [ ] Configure PM2 auto-start on system boot
- [ ] Verify server startup and logs

## Post-Deployment Verification

### Connectivity Tests
- [ ] Test local server response: `curl http://localhost:3029/channels`
- [ ] Test external server response: `curl http://SERVER_IP:3029/channels`
- [ ] Verify firewall allows DRED port traffic
- [ ] Test SSH access as DevOps user

### Functional Tests
- [ ] Run VPS connectivity tests: `npm test pre-prod/test.vps.ts`
- [ ] Create test channel via API
- [ ] Send test message via API
- [ ] Monitor server logs for errors
- [ ] Test PM2 process management commands

### Monitoring Setup
- [ ] Verify PM2 status and log rotation
- [ ] Set up log monitoring (optional)
- [ ] Document server monitoring procedures
- [ ] Test server restart procedures

## Multi-Server Deployment

### For 2+ VPS Servers
- [ ] Deploy each server following the above checklist
- [ ] Configure static host discovery for server mesh
- [ ] Update neighborhood configuration consistently
- [ ] Test cross-server replication
- [ ] Verify message propagation between servers

### Network Configuration
- [ ] Document all server IP addresses and ports
- [ ] Update `test.vps.ts` with actual server details
- [ ] Configure DNS entries (if applicable)
- [ ] Test cross-server connectivity

## Production Readiness Checklist

### Security Hardening
- [ ] Review and restrict SSH access
- [ ] Implement key rotation schedule
- [ ] Set up automated security updates
- [ ] Configure log retention policies
- [ ] Review Redis security settings

### Performance Optimization
- [ ] Configure Redis memory limits
- [ ] Set up PM2 clustering (if needed)
- [ ] Monitor resource usage patterns
- [ ] Optimize logging levels for production

### Backup and Recovery
- [ ] Set up configuration backup procedures
- [ ] Document disaster recovery steps
- [ ] Test server restoration procedures
- [ ] Document rollback procedures

## Troubleshooting Checklist

### Connection Issues
- [ ] Check server firewall status: `sudo ufw status`
- [ ] Verify DRED server is listening: `netstat -tulpn | grep :3029`
- [ ] Check PM2 process status: `pm2 status`
- [ ] Review server logs: `pm2 logs dred-vps-server`

### Redis Issues
- [ ] Test Redis connectivity: `redis-cli ping`
- [ ] Check Redis service status: `systemctl status redis-server`
- [ ] Review Redis logs: `journalctl -u redis-server`
- [ ] Verify Redis configuration

### Performance Issues
- [ ] Monitor system resources: `htop`, `free -h`, `df -h`
- [ ] Check PM2 resource usage: `pm2 monit`
- [ ] Review application logs for errors
- [ ] Test network latency between servers

## Documentation Requirements

### Server Documentation
- [ ] Server IP addresses and access details
- [ ] SSH key management procedures
- [ ] Service restart procedures
- [ ] Firewall configuration details

### Application Documentation
- [ ] DRED server configuration parameters
- [ ] Environment variable settings
- [ ] PM2 ecosystem configuration
- [ ] Log file locations and rotation

### Maintenance Procedures
- [ ] Update deployment procedures
- [ ] Server restart checklist
- [ ] Security update procedures
- [ ] Backup and recovery procedures

## Sign-off

### Technical Review
- [ ] Server configuration reviewed by: `________________`
- [ ] Security settings approved by: `________________`
- [ ] Network connectivity verified by: `________________`

### Deployment Approval
- [ ] Pre-production deployment approved by: `________________`
- [ ] Testing procedures approved by: `________________`
- [ ] Go-live authorization by: `________________`

### Post-Deployment
- [ ] Deployment completed on: `________________`
- [ ] Initial testing completed on: `________________`
- [ ] Monitoring confirmed working on: `________________`

---

**Notes:**
- Replace `SERVER_IP` with actual VPS IP addresses
- Update repository URLs in scripts before deployment  
- Keep this checklist updated as procedures evolve
- Document any deviations from standard procedures 