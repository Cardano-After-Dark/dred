#!/bin/bash
# Debug script for newrep test with pino-pretty formatting

# Setup environment
scripts/setupEnvironment

# Run the test with debugging and pipe through pino-pretty
LOGGING=default:debug \
VITEST_TIMEOUT=100000 \
ENV_FILE=./config/.env.test \
NODE_OPTIONS='--experimental-vm-modules' \
./node_modules/.bin/vitest run \
  --inspect-brk \
  --poolOptions.threads.singleThread \
  --no-file-parallelism \
  --reporter=verbose \
  newrep | pnpm exec pino-pretty
