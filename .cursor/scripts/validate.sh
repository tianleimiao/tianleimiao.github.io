#!/usr/bin/env bash
# Agent validation gate — run from repo root or web/
set -euo pipefail
cd "$(dirname "$0")/../../web"
npm run validate
echo "✓ validate passed"
