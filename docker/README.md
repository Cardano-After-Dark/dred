# Project Setup

## Prerequisites
- You must have a user account with **sudo** rights to allow installation and configuration operations.

## Setup Steps

Start by cloning the repository, and change to the docker folder

```bash
git clone https://github.com/Cardano-After-Dark/dred.git
cd dred
git checkout infra/containerization-v2
```

### 1. Install Docker
Run the installation script to set up Docker and any dependencies:

```bash
cd docker 
chmod u+x ./scripts/docker-install.sh
sudo ./scripts/docker-install.sh
```


**Important:** After installation, add your user to the `docker` group to run Docker commands without needing `sudo`:

```bash
sudo usermod -aG docker $USER

```
Then, apply the group changes by either logging out and logging back in, or by running:
```bash
newgrp docker

```
This ensures your current session recognizes the new group membership.  
Verify by running `docker run hello-world` without `sudo`.

### 2. Configure Environment Variables
Copy the example `.env.example` file to `.env`:

```bash
cp .env.example .env

```
Then edit the `.env` file to set your specific environment variables according to your requirements.

```bash
# typically, we change just these
DOMAIN=xx.pp.node-01.dred.network
BF_API_KEY=preprodwj3I80hV2...
DRED_NODE_ID=xx.pp.node-01
```

### 3. Start Services with Docker Compose
Build and start the Docker containers in detached mode with:


```bash
docker-compose up -d --build

```

This will build the images if necessary and start up the services defined in your `docker-compose.yml`.

---

With these steps, your environment should be ready to run the project successfully.  
Make sure that the `.env` file is properly configured before starting the containers.



### 4. Verify Docker Status and Logs
- Check if Docker service is active (for systemd-based systems):
```bash
systemctl status docker
```

- List all running containers:
```bash
docker ps
```

- View logs for a specific container (replace `<container_name>`):
```bash
docker logs <container_name>
```

- To follow live logs:
```bash
docker logs -f <container_name>
```

---

With these steps, your environment should be ready to run the project successfully.  
Make sure that the `.env` file is properly configured before starting the containers.

### 5. Verifyh DRED Operations

As last step, verify DRED operations are working properly

Assuming your server can be reached at the address defined in the `DOMAIN`,

Check you can see the channels

```bash
curl https://uk.pp.node-01.dred.network/channels
```

Check you can send a message

```bash
  curl -X POST https://uk.pp.node-01.dred.network/channel/news/message \
    -H "Content-Type: application/json" \
    -d '{"msg":"Hello from UK","type":"text"}'
```

When all the above works, DRED is fully operational, and you can proceed registering the node 
- [cardano-after-dark.github.io/dred/operator](https://cardano-after-dark.github.io/dred/operator)