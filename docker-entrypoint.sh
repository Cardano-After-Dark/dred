#!/bin/bash

set -Eeuo pipefail

echo 'about to run dred'
echo $REDIS_URL
pnpm run run
echo 'did something fail?'

exec "$@"