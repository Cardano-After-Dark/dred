please add my requirements to the .ai/s/x06 

I need to use the content of the docker folder as base to expand the devops capabilities: 
devops . 

Currently, among other things, the makefile offers these options: 

```
Server Operations:
  make srv-setup [server]                        # Step 1: Create devops user + SSH keys
  make srv-connect [server]                      # ssh-connect to server

VPS Ops:
  make vps-infra-setup [server]                  # Step 2: Install Docker, Redis, Node.js
  make vps-dred-deploy [server]                  # Step 3: Deploy DRED application from feature/onchain-replication-m2
  make vps-check [server] [command]              # Run test-server.sh commands
  make vps-dred-logs [server]                    # Tail DRED logs (50 lines)

Docker Ops:
  #TODO: add equivalent to VPS setup, deploy, logs, check (next iteration)
```

I need to add more options: 

```
Docker Ops:
  make dok-infra-setup [server]                  # Step 2: Install Docker
  make dok-dred-deploy [server]                  # Step 3: Deploy DRED application from feature/onchain-replication-m2
```

I already copied the docker folder into devops/docker. So, during the job, you might need to consider this. I already tested the install of it following the readme and it works (I don't know if it works now that I moved the folder into devops/docker). 

You should write the two additional scripts dok-infra-setup and dok dred-deploy, in a way to automate what we have now described in the devops/docker/readme.md. The idea is the following: 

dok-infra-setup [server] runs from the local computer, connects to the server, and:
- installs docker in the system (ubuntu)

dok-dred-deploy [server] runs from the local computer, connects to the server, and:
- runs devops/docker/scripts/docker-install.sh
- add the user to the docker group (as per readme)
- apply the group changes by running newgrp docker
- takes the devops/docker/.env file from local machine and copies over to the server in devops/docker/.env
- build and start docker containers in detached mode like: docker-compose up -d --build

I am not entirely clear if I should split differently the responsibilities between the two scripts, as the dok-infra-setup should be run only once, and the dok-dred-deploy, should be run several times, in an idempotent fashion, every time there is a change in the codebase. I leave this to your analysis, and you'' need to get my feedback on th

After installing, a good way of testing, would be to reach curl https://us.pp.node-01.dred.network:443/channels (if I use the ip address, does not work). the 
us.pp.node-01.dred.network is defined in the us.env.