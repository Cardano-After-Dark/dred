# Actual Setup

Here is the actual setup done on the two servers

```bash
ssh root@74.208.13.84
```

```bash
# Create user
adduser devops

# Add to sudo group
usermod -aG sudo devops
```

``` bash
# For devops user
mkdir -p /home/devops/.ssh
nano /home/devops/.ssh/authorized_keys
```


``` bash
# Paste all 3 SSH public keys (one per line)
# >>> See uncommitted file pks.md
```


```bash
chmod 700 /home/devops/.ssh
chmod 600 /home/devops/.ssh/authorized_keys
chown -R devops:devops /home/devops/.ssh

# For root user (if you want to keep SSH key access)
mkdir -p /root/.ssh
nano /root/.ssh/authorized_keys
# Paste your SSH public keys
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
```

Check ssh auth works
```bash
ssh devops@74.208.13.84
ssh root@74.208.13.84
```

## Only after successful test - Configure SSH security

```bash
nano /etc/ssh/sshd_config
```

Add/modify

```bash
PasswordAuthentication no
PermitRootLogin prohibit-password
PubkeyAuthentication yes
```

``` bash
# restart
systemctl restart ssh
```

last test
```bash
# Test in another new terminal
ssh devops@74.208.13.84
```