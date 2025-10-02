#!/bin/bash
# Build and run DRED locally
set -e

LOGGING=${LOGGING:-"default:debug,replicant:trace,replicator:trace"}

echo "Building DRED..."
pnpm build

echo ""
echo "Starting local server..."
echo "  LOGGING=$LOGGING"
[ -f .env ] && echo "  (using .env)"
echo ""
sleep 2

LOGGING="$LOGGING" pnpm exec node dist/dredServer.mjs | pnpm exec pino-pretty
