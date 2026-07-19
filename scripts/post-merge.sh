#!/bin/bash
set -e

pnpm install --frozen-lockfile

# Sync the latest changes to GitHub automatically.
# Uses the Replit GitHub integration (replit-git-askpass) for authentication.
# Non-fatal: remote may have diverged; app works regardless.
pnpm --filter @workspace/scripts run sync-github || true
