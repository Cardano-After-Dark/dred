# Actual Setup

Here is the actual setup done on the two servers

```bash
ssh root@74.208.13.84 #(US)
ssh root@74.208.13.84 #(DE)
```

```bash
#Update as first step
apt update && apt upgrade -y
reboot
```

```bash
# As root: create user, add user to sudo group, switch to user
adduser devops
usermod -aG sudo devops
su - devops
```

``` bash
# As devops user
mkdir -p ~/.ssh
nano ~/.ssh/authorized_keys
# Paste your SSH public keys (one per line) >>> See uncommitted file pks.md
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
exit
```

```bash
# As root user (if you want to keep SSH key access)
mkdir -p /root/.ssh
nano /root/.ssh/authorized_keys
# Paste your SSH public keys
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
```

systemctl status ssh


```bash
chmod 700 /home/devops/.ssh
chmod 600 /home/devops/.ssh/authorized_keys
chown -R devops:devops /home/devops/.ssh


Check ssh auth works without password
```bash
ssh devops@74.208.13.84 #US
ssh devops@85.215.215.192 #DE
```

## Only after successful test - Configure SSH security

```bash
# As devops
sudo nano /etc/ssh/sshd_config
```

Add/modify

```bash
PasswordAuthentication no
PermitRootLogin prohibit-password
PubkeyAuthentication yes
```

``` bash
# restart
sudo systemctl restart ssh
```

last test
```bash
# Test in another new terminal
ssh devops@74.208.13.84 #US
ssh devops@85.215.215.192 #DE
```


# Actual Setup Steps after Users Ready

```bash
sudo apt update && apt upgrade -y
```