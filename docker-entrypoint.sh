#!/bin/bash

set -Eeuo pipefail

pnpm run run

exec "$@"