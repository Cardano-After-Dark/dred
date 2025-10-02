Now, I would like to add a makefile at the top level of this project. 

the makefile should be able to run three commands : 

```
# 1. redeploy from branch and run on remote VPS
make dred-setup-remote uk

# 2. build and run local dred with given logging 
make dred-start-local LOGGING=default:debug,replicant:trace,replicator:trace

# 3. send a message to a dred on given server:port / channel
make dred-send-message 217.154.34.155:3029 news "Testing replication from UK to local server" 
```

# First: Redeploy

```
# 1. redeploy from branch and run on remote VPS
make dred-setup-remote [server]
```

cd into preprod, check the [server] exists and that is accessible via ssh with user devops
prints the name of the branch that is going to be deployed
prints the environmetn variables that are going to be added 
the rest is similar to:

```
make setup-dred uk
make test uk
```

# Second: run dred locally

```
# 2. build and run local dred with given logging 
make dred-run-local LOGGING=default:debug,replicant:trace,replicator:trace
```

Before of this, we should execute a `pnpm build`
Then, we should show the environment variables and the relevant details for the local server and wait three seconds  so the user reads the info
Then, the command executed should be similar to this: `LOGGING=default:debug,replicant:trace,replicator:trace pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty`


# Third: send message

```
# 3. send a message to a dred on given server:port / channel
make dred-send-message uk news "Testing replication from UK to local server" 
```

This should be similar to `./scripts/send-message-on-channel.sh 217.154.34.155:3029 news "Testing replication from UK to local server"`, where the parameters passed expands. 
If the server is not among those registered, or if the channel is not present, send an error 
Otherwise show the details of the server before sending the message

# Additional

It would be nice to have an additional command to check the current status of the dreds used for develompent]

```
# check current status of dred servers
make dred-check-status
```

This command checks the available servers plus the local machine, and finds if there is a dred running, and what is the status