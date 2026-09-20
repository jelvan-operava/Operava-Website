#!/usr/bin/env bash
# Deploy OPERAVA MEGA backup Worker to Cloudflare.
# Prerequisites: Node 20+, Cloudflare account login (wrangler login)
set -euo pipefail
cd "$(dirname "$0")"

echo "==> Installing dependencies"
npm install

if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "==> Not logged in. Opening Cloudflare login…"
  npx wrangler login
fi

echo "==> Setting secrets (press Enter to skip a secret if already set)"
echo "MEGA_EMAIL:"
npx wrangler secret put MEGA_EMAIL || true
echo "MEGA_PASSWORD:"
npx wrangler secret put MEGA_PASSWORD || true
echo "MEGA_BACKUP_SHARED_SECRET (long random string; same value on Pages):"
npx wrangler secret put MEGA_BACKUP_SHARED_SECRET || true

echo "==> Deploying Worker operava-mega-backup"
npx wrangler deploy

echo ""
echo "Done. Copy the workers.dev URL above into Cloudflare Pages secret:"
echo "  MEGA_BACKUP_URL             = https://operava-mega-backup.<account>.workers.dev"
echo "  MEGA_BACKUP_SHARED_SECRET    = <same as Worker secret>"
echo ""
echo "Smoke test:"
echo "  curl -sS \"https://operava-mega-backup.<account>.workers.dev/\""
