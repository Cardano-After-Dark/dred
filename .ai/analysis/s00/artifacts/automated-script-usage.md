# DRED Automated Deployment Script - Usage Guide

## Overview

The automated deployment script (`automated-deployment-script.sh`) completely automates the DRED deployment process that was manually tested and documented. It handles all phases from system verification through final testing.

## Prerequisites

### Local Machine Requirements
- **SSH Client**: Must have `ssh` and `scp` commands available
- **SSH Key**: Configured for passwordless SSH access to target VPS
- **Network Access**: Ability to connect to target VPS on port 22

### Target VPS Requirements
- **OS**: Ubuntu 24.04 LTS (tested configuration)
- **RAM**: Minimum 1.5GB available (2GB recommended)
- **CPU**: Minimum 1 vCPU (2 vCPU recommended)
- **User**: Non-root user with sudo privileges
- **SSH**: SSH key authentication configured
- **Ports**: 22 (SSH), 3029 (DRED), 6379 (Redis Docker) available

## Basic Usage

### Command Syntax
```bash
./automated-deployment-script.sh <server_ip> <username> [sudo_password]
```

### Parameters
- **server_ip**: IP address of the target VPS (e.g., 74.208.13.84)
- **username**: Username with sudo privileges (e.g., devops)
- **sudo_password**: (Optional) Sudo password for the user

### Examples

#### With Sudo Password
```bash
./automated-deployment-script.sh 74.208.13.84 devops mypassword
```

#### Without Sudo Password (Will Prompt)
```bash
./automated-deployment-script.sh 74.208.13.84 devops
```

## Step-by-Step Execution

### Pre-Execution Checklist
1. **SSH Key Setup**: Ensure passwordless SSH access works
   ```bash
   ssh devops@74.208.13.84 "echo 'SSH test successful'"
   ```

2. **Script Permissions**: Make script executable
   ```bash
   chmod +x automated-deployment-script.sh
   ```

3. **Network Access**: Verify VPS is reachable
   ```bash
   ping 74.208.13.84
   ```

### Running the Script

1. **Start Deployment**:
   ```bash
   ./automated-deployment-script.sh 74.208.13.84 devops
   ```

2. **Monitor Progress**: The script provides colored output showing each phase:
   - **Blue [INFO]**: Information messages
   - **Green [SUCCESS]**: Successful completion
   - **Yellow [WARNING]**: Warning messages
   - **Red [ERROR]**: Error messages

3. **Expected Duration**: Complete deployment takes 10-15 minutes

## Phase-by-Phase Breakdown

### Phase 1: System Verification
- Checks RAM, CPU, disk space availability
- Verifies required ports are available
- Confirms OS version compatibility

### Phase 2: Docker Installation
- Installs Docker Engine via official script
- Configures user permissions
- Installs Docker Compose
- Verifies installation

### Phase 3: Redis Setup
- Starts Redis container with memory optimization
- Configures persistence and memory policies
- Tests Redis connectivity
- Monitors memory usage

### Phase 4: Node.js Dependencies
- Installs Node.js 20.x from NodeSource
- Installs pnpm package manager
- Installs PM2 process manager
- Verifies all versions

### Phase 5: DRED Build
- Clones repository from GitHub
- Switches to correct branch
- Installs dependencies with pnpm
- Builds application with error checking

### Phase 6: Environment Configuration
- Creates .env file with production settings
- Creates PM2 ecosystem configuration
- Sets up log directories
- Configures memory limits

### Phase 7: Service Start
- Starts DRED with PM2
- Monitors startup process
- Tests local API connectivity
- Verifies process status

### Phase 8: Firewall Configuration
- Configures UFW (Ubuntu firewall)
- Sets up port rules
- Verifies network binding
- Provides cloud firewall instructions

### Phase 9: Testing & Verification
- Comprehensive system status check
- Resource usage monitoring
- Local and external API testing
- Network connectivity verification

### Phase 10: Auto-start Setup
- Configures PM2 startup scripts
- Saves PM2 configuration
- Tests reboot persistence

## Post-Deployment Steps

### 1. Configure Cloud Firewall
**CRITICAL**: The script cannot configure your VPS provider's cloud firewall. You must manually:

**For IONOS**:
1. Log into IONOS control panel
2. Navigate to VPS settings → Firewall
3. Add rule: Allow TCP port 3029 from 0.0.0.0/0
4. Save changes (takes 2-3 minutes to propagate)

**For Other Providers**:
- **AWS**: EC2 → Security Groups → Add inbound rule
- **DigitalOcean**: Droplets → Networking → Firewalls
- **Google Cloud**: VPC → Firewall rules

### 2. Test External Access
```bash
# Test TCP connectivity
nc -v YOUR_VPS_IP 3029

# Test API access
curl -s http://YOUR_VPS_IP:3029/channels | jq .
```

### 3. Verify Auto-start (Optional)
```bash
# Reboot VPS and test
ssh username@YOUR_VPS_IP "sudo reboot"
# Wait 3-5 minutes
curl -s http://YOUR_VPS_IP:3029/channels
```

## Management Commands

After successful deployment, use these commands for ongoing management:

### Process Management
```bash
# Check status
ssh username@YOUR_VPS_IP "pm2 status"

# View logs
ssh username@YOUR_VPS_IP "pm2 logs dred-us-server --lines 50"

# Restart service
ssh username@YOUR_VPS_IP "pm2 restart dred-us-server"

# Monitor resources
ssh username@YOUR_VPS_IP "pm2 monit"
```

### System Monitoring
```bash
# Check memory usage
ssh username@YOUR_VPS_IP "free -h"

# Check Docker containers
ssh username@YOUR_VPS_IP "docker ps"

# Check Redis status
ssh username@YOUR_VPS_IP "docker exec dred-redis redis-cli ping"
```

## Troubleshooting

### Common Issues

#### 1. SSH Connection Failed
**Error**: "SSH connection failed"
**Solutions**:
- Verify SSH key is configured: `ssh-add -l`
- Test manual SSH: `ssh username@IP`
- Check VPS is running and accessible

#### 2. Permission Denied Errors
**Error**: Permission denied during sudo operations
**Solutions**:
- Provide sudo password as third parameter
- Verify user has sudo privileges
- Check `/etc/sudoers` configuration

#### 3. Port Already in Use
**Error**: "Port 3029: Already in use"
**Solutions**:
- Check what's using the port: `ssh username@IP "ss -tlnp | grep 3029"`
- Stop conflicting service
- Choose different port (modify script)

#### 4. Out of Memory Errors
**Error**: Build fails or process killed
**Solutions**:
- Verify VPS has at least 1.5GB RAM available
- Check for other running processes consuming memory
- Consider upgrading VPS plan

#### 5. Docker Permission Issues
**Error**: "permission denied while trying to connect to Docker daemon"
**Solutions**:
- Script should handle this automatically
- May require logout/login after docker group addition
- Verify with: `ssh username@IP "docker ps"`

### Recovery Procedures

#### Clean Restart
If deployment fails midway, clean up and restart:

```bash
# Remove PM2 processes
ssh username@IP "pm2 delete all"

# Stop and remove Docker containers
ssh username@IP "docker stop dred-redis && docker rm dred-redis"

# Remove DRED directory
ssh username@IP "rm -rf ~/dred"

# Re-run script
./automated-deployment-script.sh IP username password
```

#### Partial Recovery
To restart from a specific phase, manually execute individual phases by examining the script and running relevant sections.

## Script Customization

### Configuration Variables
The script includes configurable variables at the top:

```bash
REDIS_MEMORY_LIMIT="400mb"      # Redis memory limit
DRED_MEMORY_LIMIT="600M"        # DRED process memory limit
DRED_PORT="3029"                # DRED API port
DRED_HOST="0.0.0.0"             # Bind address
NODE_VERSION="20.19.3"          # Node.js version
PNPM_VERSION="10.11.0"          # pnpm version
REPOSITORY_URL="https://github.com/Cardano-After-Dark/dred.git"
BRANCH="dev3/message-replication-rebased"
```

### Customizing for Different Setups

#### Different VPS Sizes
For VPS with different RAM sizes, adjust memory limits:

```bash
# For 1GB VPS
REDIS_MEMORY_LIMIT="200mb"
DRED_MEMORY_LIMIT="300M"

# For 4GB VPS
REDIS_MEMORY_LIMIT="800mb"
DRED_MEMORY_LIMIT="1200M"
```

#### Different Ports
To use different ports, modify:

```bash
DRED_PORT="8080"  # Use port 8080 instead of 3029
```

#### Different Branch
To deploy from a different branch:

```bash
BRANCH="main"  # Use main branch instead of dev3/message-replication-rebased
```

## Success Indicators

### Successful Deployment Shows:
- ✅ All 10 phases complete without errors
- ✅ Final summary with server details
- ✅ Instructions for cloud firewall configuration
- ✅ Management commands provided

### Final Output Example:
```
=== DEPLOYMENT COMPLETED SUCCESSFULLY ===

DRED Server Details:
  Server IP: 74.208.13.84
  API Port: 3029
  Local API: http://localhost:3029/channels
  External API: http://74.208.13.84:3029/channels

Next Steps:
1. Configure your VPS provider's cloud firewall to allow port 3029
2. Test external access: curl -s http://74.208.13.84:3029/channels
3. Monitor logs: ssh devops@74.208.13.84 'pm2 logs dred-us-server'
```

## Advanced Usage

### Multiple Server Deployment
To deploy to multiple servers:

```bash
# Deploy to multiple servers in sequence
for server in 74.208.13.84 74.208.13.85 74.208.13.86; do
    echo "Deploying to $server..."
    ./automated-deployment-script.sh $server devops mypassword
    echo "Deployment to $server completed"
done
```

### Parallel Deployment
For parallel deployment (be careful with rate limits):

```bash
# Deploy to multiple servers in parallel
./automated-deployment-script.sh 74.208.13.84 devops mypassword &
./automated-deployment-script.sh 74.208.13.85 devops mypassword &
./automated-deployment-script.sh 74.208.13.86 devops mypassword &
wait
```

### Logging Deployment
To capture deployment logs:

```bash
./automated-deployment-script.sh 74.208.13.84 devops mypassword 2>&1 | tee deployment.log
```

## Security Considerations

### Password Handling
- **Avoid**: Passing sudo password as command line argument in shared environments
- **Prefer**: Let script prompt for password interactively
- **Best Practice**: Configure passwordless sudo for deployment user

### SSH Security
- **Use**: SSH key authentication (never password auth)
- **Restrict**: SSH access to specific IP addresses
- **Configure**: Fail2ban or similar intrusion detection

### Firewall Security
- **Restrict**: Port 3029 to specific IP ranges if possible
- **Monitor**: Access logs for unusual activity
- **Update**: Keep system and Docker images updated

## Maintenance

### Regular Tasks
- Monitor resource usage: `pm2 monit`
- Check logs: `pm2 logs dred-us-server`
- Update system: `sudo apt update && sudo apt upgrade`
- Update Docker images: `docker pull redis:alpine`

### Backup Procedures
- **Redis Data**: `docker exec dred-redis redis-cli BGSAVE`
- **Application**: Git repository serves as source backup
- **Configuration**: Backup PM2 ecosystem files and .env

**End of Usage Guide** 