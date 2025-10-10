# Project Setup

## Prerequisites
- You must have a user account with **sudo** rights to allow installation and configuration operations.

## Setup Steps

### 1. Install Docker
Run the installation script to set up Docker and any dependencies:

```bash
chmod u+x ./scripts/docker-install.sh
./scripts/docker-install.sh
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