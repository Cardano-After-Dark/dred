# Temp Readme

While I'm figuring out how to properly build the project, I am keeping this notes to have an updated idea on how to build, test, and run the project. 

install dependencies

```bash
pnpm install
```

Setup redis environment. I am not sure this script is updated
```bash
# Initiate the redis container
scripts/setupEnvironment

# If you want to check the Redis container logs
docker logs dred_redis
```

If you want to check the redi


``` bash
pnpm build 

pnpm dev 
```

```
# Run tests once
pnpm test

# Run tests in watch mode
pnpm testing

# Run tests with debugger
pnpm test:debug
```