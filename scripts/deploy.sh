#!/usr/bin/env bash
# Simple deploy helper for the VPS. Run from /opt/fullscope.

set -euo pipefail

REPO_DIR="/opt/fullscope"
APP_NAME="fullscope"
PORT="${PORT:-3000}"
HOST="${HOST:-0.0.0.0}"

cd "$REPO_DIR"

echo "==> Fetching latest main..."
git fetch origin
git reset --hard origin/main

echo "==> Installing deps (npm install)..."
npm install

echo "==> Building (npx vite build)..."
npx vite build

echo "==> Restarting pm2 app ($APP_NAME)..."
pm2 restart "$APP_NAME" || pm2 start "HOST=${HOST} PORT=${PORT} node build" --name "$APP_NAME"

echo "==> Done."
