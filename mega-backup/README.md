# OPERAVA MEGA backup — Cloudflare Worker

Standalone Worker that writes verified OPERAVA form/inquiry JSON into your existing MEGA folders.

| Doc | Purpose |
|-----|--------|
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Full ops guide |
| [FOLDERS.md](./FOLDERS.md) | Folder name map |
| [wrangler.toml](./wrangler.toml) | Cloudflare Worker config |
| [deploy.sh](./deploy.sh) | One-shot login + secrets + deploy |

## Deploy (recommended)

On a machine logged into Cloudflare:

```bash
cd mega-backup
chmod +x deploy.sh
./deploy.sh
```

Or step by step:

```bash
cd mega-backup
npm install
npx wrangler login
npx wrangler secret put MEGA_EMAIL
npx wrangler secret put MEGA_PASSWORD
npx wrangler secret put MEGA_BACKUP_SHARED_SECRET
npx wrangler deploy
```

Worker name: **`operava-mega-backup`**  
URL shape: `https://operava-mega-backup.<your-subdomain>.workers.dev`

## Connect website (Pages secrets)

| Secret | Value |
|--------|--------|
| `MEGA_BACKUP_URL` | Worker URL |
| `MEGA_BACKUP_SHARED_SECRET` | Same as Worker `MEGA_BACKUP_SHARED_SECRET` |

Then `/api/health` → `megaBackupWebhookConfigured: true`.

## Folder routing

| Source | MEGA folder |
|--------|-------------|
| Careers + Recruitment AVA | `OPERAVA APPLICANTS` |
| Services / Contact / Quote | `OPERAVA CLIENTS` |
| Academy | `OPERAVA FILES AND DOCUMENTS` |
| Employees (reserved) | `OPERAVA EMPLOYEES` |

Prefer a MEGA **service account without authenticator OTP** for automated login.
