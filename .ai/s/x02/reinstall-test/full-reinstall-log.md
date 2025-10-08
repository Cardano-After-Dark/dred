This is the first step after full reset

```
> make setup-devops uk
Setting up devops user on UK
🔐 Step 1: DevOps User Setup
=============================
Server: 217.154.34.155

🔧 Connecting to root user...
You will be prompted for the root password

🔧 Copying SSH keys and setting up devops user...
This will:
1. Copy SSH keys to server
2. Create devops user with sudo access
3. Configure SSH security

The authenticity of host '217.154.34.155 (217.154.34.155)' can't be established.
ED25519 key fingerprint is SHA256:G217EbCjasIXcwTrhIylpx7nLJS1GmqoPKtI7l14V38.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '217.154.34.155' (ED25519) to the list of known hosts.
root@217.154.34.155's password:
team-ssh-keys.private                                                                                     100% 1268    27.7KB/s   00:00
Pseudo-terminal will not be allocated because stdin is not a terminal.
root@217.154.34.155's password:
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-85-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Thu Oct  2 17:13:55 UTC 2025

  System load:  0.02              Processes:             109
  Usage of /:   2.5% of 76.45GB   Users logged in:       0
  Memory usage: 12%               IPv4 address for ens6: 217.154.34.155
  Swap usage:   0%


Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


🔧 Creating devops user...
info: Adding user `devops' ...
info: Selecting UID/GID from range 1000 to 59999 ...
info: Adding new group `devops' (1000) ...
info: Adding new user `devops' (1000) with group `devops (1000)' ...
info: Creating home directory `/home/devops' ...
info: Copying files from `/etc/skel' ...
info: Adding new user `devops' to supplemental / extra groups `users' ...
info: Adding user `devops' to group `users' ...
DevOps user created successfully
🔧 Configuring passwordless sudo...
Passwordless sudo configured for devops user
🔧 Setting up SSH directories...
🔧 Installing SSH keys...
🔧 Configuring SSH security...
🔧 Installing basic security...

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

1 package can be upgraded. Run 'apt list --upgradable' to see it.
🔧 Cleaning up...
✅ DevOps setup completed successfully!
🔧 Verifying devops access...
✅ DevOps SSH access verified
🔧 Testing sudo access...
✅ Sudo access verified
✅ SSH keys installed: 18

✅ 🎉 Step 1 completed successfully!

✅ DevOps user created with sudo access
✅ SSH keys installed for team members
✅ SSH security configured
✅ Basic firewall enabled

Next step: make setup-infrastructure UK
```

Then the next step is to run `make setup-infra uk`

```
> make setup-infra uk
Installing infrastructure on UK
🏗️  Step 2: Infrastructure Setup
=================================
Server: 217.154.34.155

🔧 Verifying devops access...
✅ DevOps access confirmed
🔧 Installing infrastructure components...
Pseudo-terminal will not be allocated because stdin is not a terminal.
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-85-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Thu Oct  2 17:15:37 UTC 2025

  System load:  0.13              Processes:             114
  Usage of /:   2.7% of 76.45GB   Users logged in:       0
  Memory usage: 15%               IPv4 address for ens6: 217.154.34.155
  Swap usage:   0%


Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


🔧 Installing essential packages...

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

1 package can be upgraded. Run 'apt list --upgradable' to see it.
🐳 Installing Docker...
Docker installed successfully
🗄️  Setting up Redis container...
Unable to find image 'redis:alpine' locally
alpine: Pulling from library/redis
9824c27679d3: Pulling fs layer
9880d81ff87a: Pulling fs layer
168694ef5d62: Pulling fs layer
f8eab6d4856e: Pulling fs layer
1f79dac8d2d4: Pulling fs layer
4f4fb700ef54: Pulling fs layer
61cfb50eeff3: Pulling fs layer
f8eab6d4856e: Waiting
1f79dac8d2d4: Waiting
4f4fb700ef54: Waiting
61cfb50eeff3: Waiting
9880d81ff87a: Verifying Checksum
9880d81ff87a: Download complete
168694ef5d62: Verifying Checksum
168694ef5d62: Download complete
9824c27679d3: Verifying Checksum
9824c27679d3: Download complete
9824c27679d3: Pull complete
9880d81ff87a: Pull complete
168694ef5d62: Pull complete
1f79dac8d2d4: Verifying Checksum
1f79dac8d2d4: Download complete
4f4fb700ef54: Verifying Checksum
4f4fb700ef54: Download complete
f8eab6d4856e: Download complete
61cfb50eeff3: Verifying Checksum
61cfb50eeff3: Download complete
f8eab6d4856e: Pull complete
1f79dac8d2d4: Pull complete
4f4fb700ef54: Pull complete
61cfb50eeff3: Pull complete
Digest: sha256:987c376c727652f99625c7d205a1cba3cb2c53b92b0b62aade2bd48ee1593232
Status: Downloaded newer image for redis:alpine
Redis container started successfully
📦 Installing Node.js and tools...
Node.js installed
pnpm installed
PM2 installed
🔒 Configuring firewall...
✅ Infrastructure setup completed!

Components installed:
- Docker: Docker version 28.4.0, build d8eb465
- Redis: redis-cli 7.0.15
- Node.js: v20.19.5
- pnpm: 10.11.0
- PM2:
                        -------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
 _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
  _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
   _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
    _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
     _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
      _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
       _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
        _\///______________\///______________\///__\///////////////__


                          Runtime Edition

        PM2 is a Production Process Manager for Node.js applications
                     with a built-in Load Balancer.

                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/


                        -------------

[PM2] Spawning PM2 daemon with pm2_home=/home/devops/.pm2
[PM2] PM2 Successfully daemonized
6.0.13
🔧 Verifying infrastructure...
✅ Redis container running
✅ Redis responding
✅ Node.js tools verified
✅ Firewall configured

✅ 🎉 Step 2 completed successfully!

✅ Docker installed and running
✅ Redis container running (512MB limit)
✅ Node.js, pnpm, PM2 installed
✅ Firewall configured for DRED port

Next step: make setup-dred UK
>
```

Then, I verify with `ssh devops@217.154.34.155 "docker ps && redis-cli ping && pnpm -v"`

```
> ssh devops@217.154.34.155 "docker ps && redis-cli ping && pnpm -v"
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS              PORTS                                         NAMES
02421d73e1c9   redis:alpine   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp   dred-redis
PONG
10.11.0
```

Finally,. I reinstal dred with `make setup-dred uk`

```
> make setup-dred uk
Setting up DRED on UK
📋 Loading configuration from: ./scripts/../config/uk.env
🚀 DRED Setup (Minimal & Idempotent)
====================================
Server: 217.154.34.155
Based on S00 Success Pattern

🔧 Verifying prerequisites...
✅ Prerequisites verified
🔧 Setting up DRED (idempotent)...
Pseudo-terminal will not be allocated because stdin is not a terminal.
Welcome to Ubuntu 24.04.3 LTS (GNU/Linux 6.8.0-85-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

 System information as of Thu Oct  2 17:18:00 UTC 2025

  System load:  0.17              Processes:             123
  Usage of /:   4.2% of 76.45GB   Users logged in:       0
  Memory usage: 22%               IPv4 address for ens6: 217.154.34.155
  Swap usage:   0%


Expanded Security Maintenance for Applications is not enabled.

0 updates can be applied immediately.

Enable ESM Apps to receive additional future security updates.
See https://ubuntu.com/esm or run: sudo pro status


🔧 IDEMPOTENT CLEANUP: Stopping existing DRED...
🔧 IDEMPOTENT CLEANUP: Checking port 3029...
✅ Port 3029 is free
🔧 IDEMPOTENT CLEANUP: Removing existing directory...
🔧 FRESH START: Cloning DRED...
Cloning into 'dred'...
branch 'feature/onchain-replication-m2' set up to track 'origin/feature/onchain-replication-m2'.
Switched to a new branch 'feature/onchain-replication-m2'
🔧 Installing dependencies...
Scope: all 5 workspace projects
Lockfile is up to date, resolution step is skipped
Packages: +1529
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   ╭──────────────────────────────────────────╮
   │                                          │
   │   Update available! 10.11.0 → 10.18.0.   │
   │   Changelog: https://pnpm.io/v/10.18.0   │
   │     To update, run: pnpm add -g pnpm     │
   │                                          │
   ╰──────────────────────────────────────────╯

Progress: resolved 0, reused 0, downloaded 1, added 0
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /home/devops/.local/share/pnpm/store/v10
  Virtual store is at:             node_modules/.pnpm
Progress: resolved 0, reused 0, downloaded 73, added 59
Progress: resolved 0, reused 0, downloaded 128, added 131
Progress: resolved 0, reused 0, downloaded 203, added 210
Progress: resolved 0, reused 0, downloaded 226, added 215
Progress: resolved 0, reused 0, downloaded 263, added 233
Progress: resolved 0, reused 0, downloaded 349, added 370
Progress: resolved 0, reused 0, downloaded 350, added 370
Progress: resolved 0, reused 0, downloaded 425, added 401
Progress: resolved 0, reused 0, downloaded 572, added 584
Progress: resolved 0, reused 0, downloaded 666, added 758
Progress: resolved 0, reused 0, downloaded 832, added 914
Progress: resolved 0, reused 0, downloaded 835, added 914
Progress: resolved 0, reused 0, downloaded 970, added 1113
Progress: resolved 0, reused 0, downloaded 1204, added 1360
Progress: resolved 0, reused 0, downloaded 1290, added 1427
Progress: resolved 0, reused 0, downloaded 1346, added 1523
Progress: resolved 0, reused 0, downloaded 1349, added 1529
Progress: resolved 0, reused 0, downloaded 1349, added 1529, done

╭ Warning ─────────────────────────────────────────────────────────────────────╮
│                                                                              │
│   Ignored build scripts: @swc/core, @tailwindcss/oxide, esbuild, sharp,      │
│   unrs-resolver.                                                             │
│   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
│   to run scripts.                                                            │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯

Done in 19.8s using pnpm v10.11.0
🔧 Building DRED...

> dred-server@0.6.0 build /home/devops/dred
> cd src/redis/streams; yarn ; cd - ; rollup -c

ERROR: There are no scenarios; must have at least one.
/home/devops/dred

bin/dredServer → dist/dredServer.mjs...
(!) Unused external imports
default imported from external module "dotenv/config" but never used in "bin/dredServer".
default imported from external module "node:path" but never used in "bin/dredServer".
environment imported from external module "@donecollectively/stellar-contracts" but never used in "src/peers/NeighborhoodDiscovery.ts".
NodeRegistryController imported from external module "dred-network-registry" but never used in "src/peers/NeighborhoodDiscovery.ts".
get,Server imported from external module "http" but never used in "src/server/DredServer.ts".
disconnect imported from external module "process" but never used in "src/client/ConnectionManager.ts".
(!) Circular dependencies
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/HostConnection.ts -> src/client/DredClient.ts
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/DredClient.ts
src/server/DredServer.ts -> src/server/ReplicationClient.ts -> src/server/DredServer.ts
src/server/DredServer.ts -> src/server/DredReplicator.ts -> src/server/DredServer.ts
created dist/dredServer.mjs in 654ms

src/server/index.ts → ./dist/dred-server.js, ./dist/dred-server.mjs...
(!) Circular dependencies
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/HostConnection.ts -> src/client/DredClient.ts
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/DredClient.ts
src/server/DredServer.ts -> src/server/ReplicationClient.ts -> src/server/DredServer.ts
src/server/DredServer.ts -> src/server/DredReplicator.ts -> src/server/DredServer.ts
(!) Unused external imports
get,Server imported from external module "http" but never used in "src/server/DredServer.ts".
disconnect imported from external module "process" but never used in "src/client/ConnectionManager.ts".
environment imported from external module "@donecollectively/stellar-contracts" but never used in "src/peers/NeighborhoodDiscovery.ts".
NodeRegistryController imported from external module "dred-network-registry" but never used in "src/peers/NeighborhoodDiscovery.ts".
created ./dist/dred-server.js, ./dist/dred-server.mjs in 535ms
🔧 Verifying build (S00 pattern)...
✅ Build successful: dist/dredServer.mjs exists
-rw-rw-r-- 1 devops devops 176075 Oct  2 17:19 dist/dredServer.mjs
🔧 Creating environment file...
🔧 Server identified as: preprod-uk
🔧 Server using blockfrost API: preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s
🔧 Server using cardano network: preprod
🔧 Server discovery method: USE_STATIC_DISCOVERY=true
🔧 Server HTTP/HTTPS mode: DRED_USE_INSECURE=true
🔧 Server IP: 217.154.34.155
🔧 Creating PM2 config (S00 pattern)...
🔧 Starting DRED with PM2...
[PM2][WARN] Applications dred not running, starting...
[PM2] App [dred] launched (1 instances)
┌────┬─────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name    │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼─────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ dred    │ default     │ 0.6.0   │ cluster │ 6491     │ 0s     │ 0    │ online    │ 0%       │ 40.9mb   │ devops   │ disabled │
└────┴─────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
🔧 Configuring auto-restart...
🔧 Waiting for startup...
✅ DRED setup completed!

PM2 Status:
┌────┬─────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name    │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼─────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ dred    │ default     │ 0.6.0   │ cluster │ 6491     │ 5s     │ 0    │ online    │ 0%       │ 165.6mb  │ devops   │ disabled │
└────┴─────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

Testing local API:
⚠️  Local API not responding yet

Environment file created: .env
PM2 config created: ecosystem.config.cjs
DRED script: dist/dredServer.mjs
🔧 Verifying deployment...
✅ DRED process is online
❌ DRED port 3029 not accessible
Note: Check cloud firewall settings

✅ 🎉 DRED Setup Completed Successfully!

✅ DRED running with PM2
✅ Auto-restart configured
✅ Environment file created
✅ Using S00 success pattern

DRED is running on 217.154.34.155:3029

Commands to manage DRED:
  ssh devops@217.154.34.155 'pm2 status'
  ssh devops@217.154.34.155 'pm2 logs dred'
  ssh devops@217.154.34.155 'pm2 restart dred'

Test API:
  curl -s http://217.154.34.155:3029/channels

🔄 This script is IDEMPOTENT - safe to run multiple times
```

Then , I verifyu all is ok with `make dred-status uk`

```
> make dred-status uk
DRED Status - UK (217.154.34.155):3029
│ 0  │ dred    │ default     │ 0.6.0   │ cluster │ 6491     │ 71s    │ 0    │ online    │ 0%       │ 147.9mb  │ devops   │ disabled │
--- Redis Status ---
02421d73e1c9   redis:alpine   "docker-entrypoint.s…"   4 minutes ago   Up 4 minutes   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp   dred-redis
--- DRED Channels ---
No channels endpoint available
```

This seems a bit fishy,as seems no channels are available. 

So, I go one level above and use the main make to see the status

```
> cd ..
> make dred-check-status
DRED Server Status
==================

LOCAL (localhost:3029)
  Status: RUNNING
  Channels: news discussion

US (74.208.13.84:3029)
  Status: ONLINE
  Channels: news discussion demo-channel remote-replication-test vps-replication-test

DE (85.215.215.192:3029)
  Status: SSH FAILED

UK (217.154.34.155:3029)
  Status: ONLINE
  Channels: news discussion
```

Effectively, I see two channels  

Locally, I had a dred server running since 8h. I stopped it and restarted, I omit the log here

```
> make dred-run-local LOGGING=default:info,replicant:trace,replicator:trace
Building DRED...

> dred-server@0.6.0 build /Users/psuzzi/projects/cad/dred
> cd src/redis/streams; yarn ; cd - ; rollup -c

sh: yarn: command not found
/Users/psuzzi/projects/cad/dred

bin/dredServer → dist/dredServer.mjs...
(!) Unused external imports
default imported from external module "dotenv/config" but never used in "bin/dredServer".
default imported from external module "node:path" but never used in "bin/dredServer".
environment imported from external module "@donecollectively/stellar-contracts" but never used in "src/peers/NeighborhoodDiscovery.ts".
NodeRegistryController imported from external module "dred-network-registry" but never used in "src/peers/NeighborhoodDiscovery.ts".
get,Server imported from external module "http" but never used in "src/server/DredServer.ts".
disconnect imported from external module "process" but never used in "src/client/ConnectionManager.ts".
(!) Circular dependencies
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/HostConnection.ts -> src/client/DredClient.ts
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/DredClient.ts
src/server/DredServer.ts -> src/server/ReplicationClient.ts -> src/server/DredServer.ts
src/server/DredServer.ts -> src/server/DredReplicator.ts -> src/server/DredServer.ts
created dist/dredServer.mjs in 254ms

src/server/index.ts → ./dist/dred-server.js, ./dist/dred-server.mjs...
(!) Circular dependencies
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/HostConnection.ts -> src/client/DredClient.ts
src/client/DredClient.ts -> src/client/ConnectionManager.ts -> src/client/DredClient.ts
src/server/DredServer.ts -> src/server/ReplicationClient.ts -> src/server/DredServer.ts
src/server/DredServer.ts -> src/server/DredReplicator.ts -> src/server/DredServer.ts
(!) Unused external imports
get,Server imported from external module "http" but never used in "src/server/DredServer.ts".
environment imported from external module "@donecollectively/stellar-contracts" but never used in "src/peers/NeighborhoodDiscovery.ts".
NodeRegistryController imported from external module "dred-network-registry" but never used in "src/peers/NeighborhoodDiscovery.ts".
disconnect imported from external module "process" but never used in "src/client/ConnectionManager.ts".
created ./dist/dred-server.js, ./dist/dred-server.mjs in 145ms

Starting local server...
  LOGGING=default:info,replicant:trace,replicator:trace
  (using .env)

non-vite, non-nextjs - consulting process.env keys directly
env: {
  DEBUG: 0,
  CARDANO_NETWORK: 'preprod',
  NODE_ENV: 'development',
  BF_API_KEY: 'preprodB0ntxMUrqIeNgLlUvDqLxzQtGvXkfA5s',
  OPTIMIZE: 0,
  cwd: '/Users/psuzzi/projects/cad/dred'
}
🚀 Starting DRED server initialization...
📡 Using NeighborhoodDiscovery dred-dev
INFO [19:24:32.319] (discovery): setting neighborhood dred-dev - no Error: called by...
    at NeighborhoodDiscovery.setNeighborhood (file:///Users/psuzzi/projects/cad/dred/dist/dredServer.mjs:81:60)
    at new Discovery (file:///Users/psuzzi/projects/cad/dred/dist/dredServer.mjs:39:28)
    at new NeighborhoodDiscovery (file:///Users/psuzzi/projects/cad/dred/dist/dredServer.mjs:101:5)
    at NeighborhoodDiscovery.forNeighborhood (file:///Users/psuzzi/projects/cad/dred/dist/dredServer.mjs:121:23)
    at init (file:///Users/psuzzi/projects/cad/dred/dist/dredServer.mjs:4889:53)
    at file:///Users/psuzzi/projects/cad/dred/dist/dredServer.mjs:4827:1
    at ModuleJob.run (node:internal/modules/esm/module_job:263:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:540:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
INFO [19:24:32.319] (discovery): restarting host discovery for neighborhood dred-dev
INFO [19:24:32.616] (discovery): Creating capo with simple wallet
INFO [19:24:32.933] (discovery): Creating capo with simple wallet
zonedLogger: default log levels: {"defaultLevel":"info","replicant":"trace","replicator":"trace"}
📦 DredCapo: loaded & parsed with pre-compiled program: 103ms
DredCapo: will use precompiled script on-demand
DredCapo dataBridgeClass =  CapoDataBridge
📦 CapoMinter: loaded & parsed without pre-compiled program: 54ms
📦 CapoMinter: loaded & parsed without pre-compiled program: 40ms
busting program cache
📦 CapoMinter: loaded & parsed with pre-compiled program: 40ms
CapoMinter bundle loaded
DredCapo caching addr
TODO TODO TODO - ensure each contract can indicate the right stake part of its address
and that the onchain part also supports it
📦 DredCapo: loaded & parsed with pre-compiled program: 40ms
DredCapo: will use precompiled script on-demand
DredCapo dataBridgeClass =  CapoDataBridge
📦 CapoMinter: loaded & parsed without pre-compiled program: 40ms
📦 CapoMinter: loaded & parsed without pre-compiled program: 37ms
busting program cache
📦 CapoMinter: loaded & parsed with pre-compiled program: 38ms
CapoMinter bundle loaded
DredCapo caching addr
TODO TODO TODO - ensure each contract can indicate the right stake part of its address
and that the onchain part also supports it
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
   🔎delegate 💁 mintDelegate
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 56ms
   🔎delegate 💁 govAuthority
   🔎delegate 💁 spendDelegate
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 55ms
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 65ms
  -- 🐞🐞🐞 🐞 MyMintSpendDelegate: no programBundle; will use JIT compilation
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 54ms
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 52ms
  -- 🐞🐞🐞 🐞 MyMintSpendDelegate: no programBundle; will use JIT compilation
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 50ms
BasicDelegate bundle loaded
BasicDelegate bundle loaded
   ✅ 💁 govAuthority  (now cached)
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
   🔎delegate 💁 mintDelegate
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 54ms
   🔎delegate 💁 govAuthority
   🔎delegate 💁 spendDelegate
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 58ms
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 52ms
  -- 🐞🐞🐞 🐞 MyMintSpendDelegate: no programBundle; will use JIT compilation
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 51ms
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 48ms
  -- 🐞🐞🐞 🐞 MyMintSpendDelegate: no programBundle; will use JIT compilation
📦 STokMintDelegate: loaded & parsed with pre-compiled program: 52ms
BasicDelegate bundle loaded
BasicDelegate bundle loaded
   ✅ 💁 govAuthority  (now cached)
Delegate configuration for role 'spendDelegate' requires upgrade
  Previous config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}
  Next config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}

   ✅ 💁 spendDelegate  (now cached)
Delegate configuration for role 'mintDelegate' requires upgrade
  Previous config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}
  Next config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}

   ✅ 💁 mintDelegate  (now cached)
Delegate configuration for role 'mintDelegate' requires upgrade
  Previous config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}
  Next config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}

   ✅ 💁 mintDelegate  (now cached)
INFO [19:24:34.790] (discovery): Capo created
Delegate configuration for role 'spendDelegate' requires upgrade
  Previous config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}
  Next config: {
    "rev": "1",
    "isMintDelegate": true,
    "isSpendDelegate": true,
    "isDgDataPolicy": false,
    "delegateName": "mintDelegate",
    "requiresGovAuthority": true
}

   ✅ 💁 spendDelegate  (now cached)
INFO [19:24:34.809] (discovery): Capo created
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
   🔎delegate 💁 DredNode
📦 DredNodeRegistryPolicy: loaded & parsed with pre-compiled program: 55ms
  -- 🐞🐞🐞 🐞 NodeRegistryController: no programBundle; will use JIT compilation
📦 DredNodeRegistryPolicy: loaded & parsed with pre-compiled program: 55ms
BasicDelegate bundle loaded
   ✅ 💁 DredNode  (now cached)
INFO [19:24:35.272] (discovery): Registry controller created
INFO [19:24:35.272] (discovery): Getting host list
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
   🔎delegate 💁 DredNode
📦 DredNodeRegistryPolicy: loaded & parsed with pre-compiled program: 59ms
  -- 🐞🐞🐞 🐞 NodeRegistryController: no programBundle; will use JIT compilation
📦 DredNodeRegistryPolicy: loaded & parsed with pre-compiled program: 53ms
BasicDelegate bundle loaded
   ✅ 💁 DredNode  (now cached)
INFO [19:24:35.448] (discovery): Registry controller created
... NeighborhoodDiscovery:waiting for hosts:ready
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
key  @id
key  tpe
   🔎delegate 💁 settings
   - no map field in datum undefined
   - no type field in datum undefined
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
📦 ProtocolSettingsPolicy: loaded & parsed with pre-compiled program: 58ms
  -- 🐞🐞🐞 🐞 ProtocolSettingsController: no programBundle; will use JIT compilation
📦 ProtocolSettingsPolicy: loaded & parsed with pre-compiled program: 51ms
BasicDelegate bundle loaded
NodeRegistryController dataBridgeClass =  DredNodeRegistryPolicyDataBridge
   ✅ 💁 settings  (now cached)
ProtocolSettingsController dataBridgeClass =  ProtocolSettingsPolicyDataBridge
DredNode findDelegatedData:  9
INFO [19:24:35.972] (discovery): utxos: 17
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
key  @id
key  tpe
   - no map field in datum undefined
   - no type field in datum undefined
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
DredNode findDelegatedData:  9
[
  {
    id: [
      100, 114, 101, 100,  78, 111,
      100, 101,  45,  52, 101,  48,
       48,  48,  50, 101,  51,  56,
       50, 100,  48
    ],
    type: 'DredNode',
    memberToken: 'member-0751c2d8ff2b',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'NotExist',
      port: 8080n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111,
      100, 101,  45, 101, 48, 102,
       99, 102,  49, 101, 48,  98,
       56,  54,  54
    ],
    type: 'DredNode',
    memberToken: 'member-b295d7aad4a8',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'us.pp.node-01.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111,
      100, 101,  45,  97, 51,  49,
       55,  98, 100,  97, 97,  51,
       97, 100,  53
    ],
    type: 'DredNode',
    memberToken: 'member-b295d7aad4a8',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'bogus2.example.com',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100,  78, 111,
      100, 101,  45, 101, 102,  98,
       52,  97,  53,  97, 101,  49,
       50,  48,  54
    ],
    type: 'DredNode',
    memberToken: 'member-94e848f868dc',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: '74.208.13.84',
      port: 3029n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100,  78, 111, 100,
      101,  45,  49,  48, 100,  56,  52,
       52,  57,  56,  53,  52,  56,  97
    ],
    type: 'DredNode',
    memberToken: 'member-94e848f868dc',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: '217.154.34.155',
      port: 3029n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111, 100,
      101,  45,  53,  97, 99,  57,  52,
       48,  99,  54,  53, 55,  50,  53
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'de.pp.node-02.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111, 100,
      101,  45,  49,  55, 48,  54,  52,
       55,  98,  57,  57, 53,  49,  49
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'de.pp.node-01.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111,
      100, 101,  45,  97, 53, 101,
       54, 102,  52,  53, 98,  98,
       52,  51,  98
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'example.com',
      port: 8080n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100,  78, 111,
      100, 101,  45,  51,  97,  54,
       50,  49,  50,  97, 101,  49,
       57, 102,  53
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'at.pp.node-01.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  }
]
INFO [19:24:36.089] (discovery): ^ found 9 hosts in neighborhood dred-dev
INFO [19:24:36.089] (discovery): Filtered out self-node: 9 -> 8 hosts
✅ hosts:ready event received
Dred nbh dred-dev
Dred serverAddress 0.0.0.0
Dred serverPort 3029
Dred myServerInfo {
  address: '127.0.0.1',
  port: 3029,
  serverId: 'dredNode-e0fcf1e0b866',
  publicKey: 'publicKey',
  pubKeyHash: 'pubKeyHash',
  insecure: true
}
Dred discovered peer hosts 8
INFO [19:24:36.090] (dred): ‹dredNode-e0fcf1e0b866› +server 'dredNode-e0fcf1e0b866' with discovery type: NeighborhoodDiscovery
INFO [19:24:36.090] (dred): ‹dredNode-e0fcf1e0b866› Setting up Redis connection: redis://localhost:6379, db: 0
INFO [19:24:36.124] (dred): ‹dredNode-e0fcf1e0b866› channelCreated _chans {"channelId":"_chans"}
INFO [19:24:36.126] (dred): ‹dredNode-e0fcf1e0b866› channelCreated _auth {"channelId":"_auth"}
INFO [19:24:36.127] (dred): ‹dredNode-e0fcf1e0b866› channelCreated news {"channelId":"news"}
INFO [19:24:36.128] (dred): ‹dredNode-e0fcf1e0b866› channelCreated discussion {"channelId":"discussion"}
INFO [19:24:36.129] (dred): ‹dredNode-e0fcf1e0b866› server 'dredNode-e0fcf1e0b866' listening at 127.0.0.1:3029
WARN [19:24:36.129] (dred): ‹dredNode-e0fcf1e0b866› 🔄 STARTING AUTO-REPLICATION FOR DREDNODE-E0FCF1E0B866 (BACKGROUND)
WARN [19:24:36.129] (dred): ‹dredNode-e0fcf1e0b866› dredNode-e0fcf1e0b866 Starting replication setup...
WARN [19:24:36.129] (dred): ‹dredNode-e0fcf1e0b866› dredNode-e0fcf1e0b866 Creating replicator...
WARN [19:24:36.130] (dred): ‹dredNode-e0fcf1e0b866› dredNode-e0fcf1e0b866 Initializing replicator...
INFO [19:24:36.130] (replicator): ‹bjk› initializing
INFO [19:24:36.130] (discovery): Getting host list
INFO [19:24:36.130] (dred): ‹dredNode-e0fcf1e0b866› 📊 Starting periodic status logging every 5 seconds
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
key  @id
key  tpe
   🔎delegate 💁 settings
   - no map field in datum undefined
   - no type field in datum undefined
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
📦 ProtocolSettingsPolicy: loaded & parsed with pre-compiled program: 64ms
  -- 🐞🐞🐞 🐞 ProtocolSettingsController: no programBundle; will use JIT compilation
📦 ProtocolSettingsPolicy: loaded & parsed with pre-compiled program: 51ms
BasicDelegate bundle loaded
NodeRegistryController dataBridgeClass =  DredNodeRegistryPolicyDataBridge
   ✅ 💁 settings  (now cached)
ProtocolSettingsController dataBridgeClass =  ProtocolSettingsPolicyDataBridge
DredNode findDelegatedData:  9
INFO [19:24:36.670] (discovery): utxos: 17
  🔎 finding 'charter' utxo (17 candidates; show with globalThis.utxoDump or `dumpDetail` option)
   🎈found 📖 c672acf8…d9c4🔹#3:  💵 addr_test1wqsh…gktu 6.296_910 ADA + ⦑🏦 486b1009…00a3  1×💴 charter  ⦒ d‹inline:afa83bd9…c897 - 1219 bytes›
key  @id
key  tpe
   - no map field in datum undefined
   - no type field in datum undefined
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
key  @id
key  tpe
DredNode findDelegatedData:  9
[
  {
    id: [
      100, 114, 101, 100,  78, 111,
      100, 101,  45,  52, 101,  48,
       48,  48,  50, 101,  51,  56,
       50, 100,  48
    ],
    type: 'DredNode',
    memberToken: 'member-0751c2d8ff2b',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'NotExist',
      port: 8080n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111,
      100, 101,  45, 101, 48, 102,
       99, 102,  49, 101, 48,  98,
       56,  54,  54
    ],
    type: 'DredNode',
    memberToken: 'member-b295d7aad4a8',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'us.pp.node-01.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111,
      100, 101,  45,  97, 51,  49,
       55,  98, 100,  97, 97,  51,
       97, 100,  53
    ],
    type: 'DredNode',
    memberToken: 'member-b295d7aad4a8',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'bogus2.example.com',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100,  78, 111,
      100, 101,  45, 101, 102,  98,
       52,  97,  53,  97, 101,  49,
       50,  48,  54
    ],
    type: 'DredNode',
    memberToken: 'member-94e848f868dc',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: '74.208.13.84',
      port: 3029n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100,  78, 111, 100,
      101,  45,  49,  48, 100,  56,  52,
       52,  57,  56,  53,  52,  56,  97
    ],
    type: 'DredNode',
    memberToken: 'member-94e848f868dc',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: '217.154.34.155',
      port: 3029n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111, 100,
      101,  45,  53,  97, 99,  57,  52,
       48,  99,  54,  53, 55,  50,  53
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'de.pp.node-02.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111, 100,
      101,  45,  49,  55, 48,  54,  52,
       55,  98,  57,  57, 53,  49,  49
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'de.pp.node-01.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100, 78, 111,
      100, 101,  45,  97, 53, 101,
       54, 102,  52,  53, 98,  98,
       52,  51,  98
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'example.com',
      port: 8080n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  },
  {
    id: [
      100, 114, 101, 100,  78, 111,
      100, 101,  45,  51,  97,  54,
       50,  49,  50,  97, 101,  49,
       57, 102,  53
    ],
    type: 'DredNode',
    memberToken: 'member-5f555ba7e4aa',
    state: { NeedsValidation: [] },
    nodeDetails: {
      address: 'at.pp.node-01.dred.network',
      port: 443n,
      pubKey: [PubKeyImpl],
      pubKeyHash: [PubKeyHashImpl]
    }
  }
]
INFO [19:24:36.828] (discovery): ^ found 9 hosts in neighborhood dred-dev
INFO [19:24:36.829] (discovery): Filtered out self-node: 9 -> 8 hosts
INFO [19:24:36.830] (replicant): ‹from-4e0002e382d0› from-4e0002e382d0 starting connection loop
INFO [19:24:36.830] (replicant): ‹from-a317bdaa3ad5› from-a317bdaa3ad5 starting connection loop
INFO [19:24:36.831] (replicant): ‹from-efb4a5ae1206› from-efb4a5ae1206 starting connection loop
INFO [19:24:36.831] (replicant): ‹from-10d84498548a› from-10d84498548a starting connection loop
INFO [19:24:36.831] (replicant): ‹from-5ac940c65725› from-5ac940c65725 starting connection loop
INFO [19:24:36.831] (replicant): ‹from-170647b99511› from-170647b99511 starting connection loop
INFO [19:24:36.831] (replicant): ‹from-a5e6f45bb43b› from-a5e6f45bb43b starting connection loop
INFO [19:24:36.831] (replicant): ‹from-3a6212ae19f5› from-3a6212ae19f5 starting connection loop
INFO [19:24:36.831] (replicator): ‹bjk› started 8 connection loops in parallel
INFO [19:24:36.832] (replicator): ‹bjk› initialized
WARN [19:24:36.832] (dred): ‹dredNode-e0fcf1e0b866› dredNode-e0fcf1e0b866 Replication setup complete - replicator exists: true
INFO [19:24:36.832] (dred): ‹dredNode-e0fcf1e0b866› ✅ Replication setup ok
WARN [19:24:36.868] (replicant): ‹from-4e0002e382d0› getaddrinfo ENOTFOUND notexist
WARN [19:24:36.868] (replicant): ‹from-4e0002e382d0› can't yet replicate from NotExist:8080 - will retry
INFO [19:24:36.933] (hostconn): ‹LPw› client from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6 connecting to server dredNode-10d84498548a 🐲 readyToConnect
WARN [19:24:36.935] (connection-manager:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6› no promise returned from 🐲 readyToConnect : bound onEntry in context: 🗜️ ConnectionManager ➜ connecting onEntry() ...in🗜️connection-manager @pendingSetup transition readyToConnect⦡ connecting ...in🗜️ ConnectionManager ➜ pendingSetup onEntry() ...in🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup ...in🗜️ConnectionManager ↝ default-state onEntry onEntry() ...in🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh
WARN [19:24:36.936] (zonedLogger): dred-client:state: using minimum level info, not suggested level=warn
WARN [19:24:36.936] (zonedLogger): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6› dred-client:state: using minimum level info, not suggested level=warn 🐲 default
INFO [19:24:36.939] (connection-manager:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6›  ✓ transitioned 🐲 readyToConnect : connMgr @pendingSetup ➜ connecting
INFO [19:24:36.939] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6›  ✓ transitioned 🐲 nbhSelected : client @default ➜ discoveringHosts
INFO [19:24:36.940] (connection-manager:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6›  ✓ trampolined  🐲 setupPending : connMgr @discoveringNbh ➜ pendingSetup:onEntry ⟹ ➜ connecting
DEBUG [19:24:36.945] (replicant): ‹from-10d84498548a› Triggering channel discovery for dredNode-10d84498548a
WARN [19:24:36.951] (zonedLogger): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6› dred-client:state: using minimum level info, not suggested level=warn 🐲 nbhSelected
WARN [19:24:36.997] (replicant): ‹from-a317bdaa3ad5› getaddrinfo ENOTFOUND bogus2.example.com
WARN [19:24:36.997] (replicant): ‹from-a317bdaa3ad5› can't yet replicate from bogus2.example.com:443 - will retry
DEBUG [19:24:37.058] (replicant): ‹from-10d84498548a› dredNode-10d84498548a channels: [news, discussion]
WARN [19:24:37.060] (zonedLogger): dred-client:state: using minimum level info, not suggested level=warn
INFO [19:24:37.060] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6›  ✓ transitioned 🐲 hasChannels : client @discoveringChannels ➜ ready
INFO [19:24:37.061] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6›  ✓ trampolined  🐲 haveHostList : client @discoveringHosts ➜ discoveringChannels:onEntry ⟹ ➜ ready
DEBUG [19:24:37.061] (replicant): ‹from-10d84498548a› my channels: [_chans, _auth, news, discussion]
INFO [19:24:37.061] (replicant): ‹from-10d84498548a› from-10d84498548a common channels: news, discussion
INFO [19:24:37.103] (hostconn): ‹c5l› client from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n connecting to server dredNode-efb4a5ae1206 🐲 readyToConnect
WARN [19:24:37.103] (connection-manager:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n› no promise returned from 🐲 readyToConnect : bound onEntry in context: 🗜️ ConnectionManager ➜ connecting onEntry() ...in🗜️connection-manager @pendingSetup transition readyToConnect⦡ connecting ...in🗜️ ConnectionManager ➜ pendingSetup onEntry() ...in🗜️connection-manager @discoveringNbh transition setupPending⦡ pendingSetup ...in🗜️ConnectionManager ↝ default-state onEntry onEntry() ...in🗜️connection-manager @discoveringNbh transition default⦡ discoveringNbh
WARN [19:24:37.103] (zonedLogger): dred-client:state: using minimum level info, not suggested level=warn
WARN [19:24:37.104] (zonedLogger): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n› dred-client:state: using minimum level info, not suggested level=warn 🐲 default
INFO [19:24:37.104] (connection-manager:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n›  ✓ transitioned 🐲 readyToConnect : connMgr @pendingSetup ➜ connecting
INFO [19:24:37.104] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n›  ✓ transitioned 🐲 nbhSelected : client @default ➜ discoveringHosts
INFO [19:24:37.104] (connection-manager:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n›  ✓ trampolined  🐲 setupPending : connMgr @discoveringNbh ➜ pendingSetup:onEntry ⟹ ➜ connecting
DEBUG [19:24:37.106] (replicant): ‹from-efb4a5ae1206› Triggering channel discovery for dredNode-efb4a5ae1206
WARN [19:24:37.107] (zonedLogger): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n› dred-client:state: using minimum level info, not suggested level=warn 🐲 nbhSelected
INFO [19:24:37.163] (replicant): ‹from-10d84498548a› Connection states:
          - RepClient: ready
          - ConnManager: connecting
          - Waiting for connection...
          - After wait - RepClient: ready, ConnManager: connecting
WARN [19:24:37.163] (replicant): ‹from-10d84498548a› 🔔 REPLICATION: Subscribing to 2 channels
INFO [19:24:37.167] (hostconn): ‹FjK› client from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6 connecting to server dredNode-10d84498548a
WARN [19:24:37.169] (replicant): ‹from-10d84498548a› ✅ Successfully subscribed to 2 channels
INFO [19:24:37.169] (replicant): ‹from-10d84498548a› ✅ replication connection established
DEBUG [19:24:37.379] (replicant): ‹from-efb4a5ae1206› dredNode-efb4a5ae1206 channels: [news, discussion, demo-channel, remote-replication-test, vps-replication-test]
WARN [19:24:37.383] (zonedLogger): dred-client:state: using minimum level info, not suggested level=warn
INFO [19:24:37.383] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n›  ✓ transitioned 🐲 hasChannels : client @discoveringChannels ➜ ready
INFO [19:24:37.384] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n›  ✓ trampolined  🐲 haveHostList : client @discoveringHosts ➜ discoveringChannels:onEntry ⟹ ➜ ready
DEBUG [19:24:37.384] (replicant): ‹from-efb4a5ae1206› my channels: [_chans, _auth, news, discussion]
INFO [19:24:37.384] (replicant): ‹from-efb4a5ae1206› from-efb4a5ae1206 common channels: news, discussion
WARN [19:24:37.449] (replicant): ‹from-5ac940c65725› HTTP error: 400: Bad Request
WARN [19:24:37.449] (replicant): ‹from-5ac940c65725› can't yet replicate from de.pp.node-02.dred.network:443 - will retry
INFO [19:24:37.485] (replicant): ‹from-efb4a5ae1206› Connection states:
          - RepClient: ready
          - ConnManager: connecting
          - Waiting for connection...
          - After wait - RepClient: ready, ConnManager: connecting
WARN [19:24:37.486] (replicant): ‹from-efb4a5ae1206› 🔔 REPLICATION: Subscribing to 2 channels
INFO [19:24:37.487] (hostconn): ‹EMK› client from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n connecting to server dredNode-efb4a5ae1206
WARN [19:24:37.488] (replicant): ‹from-efb4a5ae1206› ✅ Successfully subscribed to 2 channels
INFO [19:24:37.488] (replicant): ‹from-efb4a5ae1206› ✅ replication connection established
WARN [19:24:37.730] (replicant): ‹from-3a6212ae19f5› other side closed
WARN [19:24:37.730] (replicant): ‹from-3a6212ae19f5› can't yet replicate from at.pp.node-01.dred.network:443 - will retry
WARN [19:24:37.753] (replicant): ‹from-170647b99511› HTTP error: 400: Bad Request
WARN [19:24:37.754] (replicant): ‹from-170647b99511› can't yet replicate from de.pp.node-01.dred.network:443 - will retry
INFO [19:24:41.137] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 9s | Replication: ENABLED (2/8) | Channels: 4
WARN [19:24:41.833] (replicant): ‹from-a5e6f45bb43b› This operation was aborted
WARN [19:24:41.834] (replicant): ‹from-a5e6f45bb43b› can't yet replicate from example.com:8080 - will retry
INFO [19:24:46.135] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 14s | Replication: ENABLED (2/8) | Channels: 4
```


And now, last test to send a message to uk, and see it duplicated

```
> make dred-send-message uk news Hello from UK server
Sending to 217.154.34.155:3029 / news: Hello from UK server
Sending message to http://217.154.34.155:3029/channel/news/message
Channel: news
Message: Hello from UK server
OCID: test-1759425982-26781

{"id":"1759425982149-0","status":"created","ocid":"test-1759425982-26781"}

HTTP Status: 200
```


Below, is a portion of the local server log to demonstrate the replication works 

```
WARN [19:24:37.163] (replicant): ‹from-10d84498548a› 🔔 REPLICATION: Subscribing to 2 channels
INFO [19:24:37.167] (hostconn): ‹FjK› client from-dredNode-e0fcf1e0b866-to-dredNode-10d84498548a-qbnd6 connecting to server dredNode-10d84498548a
WARN [19:24:37.169] (replicant): ‹from-10d84498548a› ✅ Successfully subscribed to 2 channels
INFO [19:24:37.169] (replicant): ‹from-10d84498548a› ✅ replication connection established
DEBUG [19:24:37.379] (replicant): ‹from-efb4a5ae1206› dredNode-efb4a5ae1206 channels: [news, discussion, demo-channel, remote-replication-test, vps-replication-test]
WARN [19:24:37.383] (zonedLogger): dred-client:state: using minimum level info, not suggested level=warn
INFO [19:24:37.383] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n›  ✓ transitioned 🐲 hasChannels : client @discoveringChannels ➜ ready
INFO [19:24:37.384] (dred-client:state): ‹from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n›  ✓ trampolined  🐲 haveHostList : client @discoveringHosts ➜ discoveringChannels:onEntry ⟹ ➜ ready
DEBUG [19:24:37.384] (replicant): ‹from-efb4a5ae1206› my channels: [_chans, _auth, news, discussion]
INFO [19:24:37.384] (replicant): ‹from-efb4a5ae1206› from-efb4a5ae1206 common channels: news, discussion
WARN [19:24:37.449] (replicant): ‹from-5ac940c65725› HTTP error: 400: Bad Request
WARN [19:24:37.449] (replicant): ‹from-5ac940c65725› can't yet replicate from de.pp.node-02.dred.network:443 - will retry
INFO [19:24:37.485] (replicant): ‹from-efb4a5ae1206› Connection states:
          - RepClient: ready
          - ConnManager: connecting
          - Waiting for connection...
          - After wait - RepClient: ready, ConnManager: connecting
WARN [19:24:37.486] (replicant): ‹from-efb4a5ae1206› 🔔 REPLICATION: Subscribing to 2 channels
INFO [19:24:37.487] (hostconn): ‹EMK› client from-dredNode-e0fcf1e0b866-to-dredNode-efb4a5ae1206-7zv7n connecting to server dredNode-efb4a5ae1206
WARN [19:24:37.488] (replicant): ‹from-efb4a5ae1206› ✅ Successfully subscribed to 2 channels
INFO [19:24:37.488] (replicant): ‹from-efb4a5ae1206› ✅ replication connection established
WARN [19:24:37.730] (replicant): ‹from-3a6212ae19f5› other side closed
WARN [19:24:37.730] (replicant): ‹from-3a6212ae19f5› can't yet replicate from at.pp.node-01.dred.network:443 - will retry
WARN [19:24:37.753] (replicant): ‹from-170647b99511› HTTP error: 400: Bad Request
WARN [19:24:37.754] (replicant): ‹from-170647b99511› can't yet replicate from de.pp.node-01.dred.network:443 - will retry
INFO [19:24:41.137] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 9s | Replication: ENABLED (2/8) | Channels: 4
WARN [19:24:41.833] (replicant): ‹from-a5e6f45bb43b› This operation was aborted
WARN [19:24:41.834] (replicant): ‹from-a5e6f45bb43b› can't yet replicate from example.com:8080 - will retry
INFO [19:24:46.135] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 14s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:24:51.137] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 19s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:24:56.136] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 24s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:01.137] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 29s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:06.144] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 34s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:11.138] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 39s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:16.140] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 44s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:21.140] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 49s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:26.142] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 54s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:31.155] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 0m 59s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:36.144] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 4s | Replication: ENABLED (2/8) | Channels: 4
WARN [19:25:36.883] (replicant): ‹from-4e0002e382d0› getaddrinfo ENOTFOUND notexist
WARN [19:25:36.883] (replicant): ‹from-4e0002e382d0› can't yet replicate from NotExist:8080 - will retry
WARN [19:25:37.004] (replicant): ‹from-a317bdaa3ad5› getaddrinfo ENOTFOUND bogus2.example.com
WARN [19:25:37.005] (replicant): ‹from-a317bdaa3ad5› can't yet replicate from bogus2.example.com:443 - will retry
WARN [19:25:37.539] (replicant): ‹from-5ac940c65725› HTTP error: 400: Bad Request
WARN [19:25:37.539] (replicant): ‹from-5ac940c65725› can't yet replicate from de.pp.node-02.dred.network:443 - will retry
WARN [19:25:37.802] (replicant): ‹from-3a6212ae19f5› other side closed
WARN [19:25:37.802] (replicant): ‹from-3a6212ae19f5› can't yet replicate from at.pp.node-01.dred.network:443 - will retry
WARN [19:25:37.845] (replicant): ‹from-170647b99511› HTTP error: 400: Bad Request
WARN [19:25:37.845] (replicant): ‹from-170647b99511› can't yet replicate from de.pp.node-01.dred.network:443 - will retry
INFO [19:25:41.152] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 9s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:46.152] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 14s | Replication: ENABLED (2/8) | Channels: 4
WARN [19:25:46.836] (replicant): ‹from-a5e6f45bb43b› This operation was aborted
WARN [19:25:46.836] (replicant): ‹from-a5e6f45bb43b› can't yet replicate from example.com:8080 - will retry
INFO [19:25:51.166] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 19s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:25:56.153] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 24s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:26:01.155] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 29s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:26:06.157] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 34s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:26:11.156] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 39s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:26:16.159] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 44s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:26:21.164] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 49s | Replication: ENABLED (2/8) | Channels: 4
WARN [19:26:22.131] (replicant): ‹from-10d84498548a› 📥 REPLICATION: Message detected from dredNode-10d84498548a in channel 'news' (1759425982149-0)
INFO [19:26:22.135] (replicant): ‹from-10d84498548a› 🎯 REPL MESSAGE from dredNode-10d84498548a: {"message":"msg received in chan","mid":"1759425982149-0","ocid":"test-1759425982-26781","type":"test-message","msg":"Hello from UK server","channel":"news","details":{},"neighborhood":"dred-dev","ts":"2025-10-02T17:26:22.131Z"}
WARN [19:26:22.135] (replicant): ‹from-10d84498548a› 📥 REPLICATION: Received message from dredNode-10d84498548a -> dredNode-e0fcf1e0b866 in channel 'news' (1759425982149-0)
INFO [19:26:22.135] (replicant): ‹from-10d84498548a›  >>>>>>>>>>  about to call shouldReplicateMessage: news 1759425982149-0
INFO [19:26:22.135] (replicant): ‹from-10d84498548a›  >>>>>>>>>>  shouldReplicateMessage: news 1759425982149-0
INFO [19:26:22.137] (replicant): ‹from-10d84498548a›  >>>>>>>>>>  channelExists: true }
INFO [19:26:22.137] (replicant): ‹from-10d84498548a›  >>>>>>>>>>  shouldReplicateMessage returned true
WARN [19:26:22.137] (replicant): ‹from-10d84498548a› 📤 REPLICATION: Publishing to home server 'dredNode-e0fcf1e0b866' in channel 'news' (ocid: test-1759425982-26781)
WARN [19:26:22.137] (dred): ‹dredNode-e0fcf1e0b866› 🔍 DEDUP CHECK [dredNode-e0fcf1e0b866] checking: news:::test-1759425982-26781
WARN [19:26:22.140] (dred): ‹dredNode-e0fcf1e0b866› 🔍 DEDUP RESULT [dredNode-e0fcf1e0b866] news:::test-1759425982-26781 -> already processed: 0
WARN [19:26:22.141] (dred): ‹dredNode-e0fcf1e0b866› ✅ DEDUP ADD [dredNode-e0fcf1e0b866] Added to known messages: news:::test-1759425982-26781
INFO [19:26:22.141] (dred): ‹dredNode-e0fcf1e0b866› Message published to channel news: 1759425982141-0
WARN [19:26:22.141] (dred): ‹dredNode-e0fcf1e0b866› ✅ DEDUP PUBLISH [dredNode-e0fcf1e0b866] Message successfully deduplicated and posted: news:::test-1759425982-26781 -> 1759425982141-0
INFO [19:26:22.141] (replicant): ‹from-10d84498548a› Message successfully replicated to home server: 1759425982141-0
INFO [19:26:22.141] (replicant): ‹from-10d84498548a› Successfully replicated message from dredNode-10d84498548a to home server in channel news
INFO [19:26:26.161] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 54s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:26:31.165] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 1m 59s | Replication: ENABLED (2/8) | Channels: 4
INFO [19:26:36.166] (dred): ‹dredNode-e0fcf1e0b866› 📊 Uptime: 0h 2m 4s | Replication: ENABLED (2/8) | Channels: 4
```