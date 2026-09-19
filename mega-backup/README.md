# OPERAVA MEGA backup (separate coding folder)

Isolated Worker package for **encrypted MEGA cloud backups**.  
Does **not** live inside the marketing SPA runtime. Credentials stay in Cloudflare secrets only.

## Why separate

- Keeps `megajs` and MEGA login out of the public website bundle
- Matches your MEGA structure: Applicants / Clients / Employees / Files
- Recruitment AVA can POST applicant snapshots here after verify (optional webhook)

## Authenticator (2FA)

If the MEGA account uses an **OTP authenticator app**, plain email+password login from a Worker often fails.

**Recommended for automation**

1. Create a **dedicated MEGA service account** used only for OPERAVA backups
2. Prefer **no authenticator** on that service account, or
3. Supply a current TOTP via secret `MEGA_TOTP` when your `megajs` build supports it (rotate carefully)

Do **not** put the authenticator seed or password in GitHub.

## Cloudflare secrets (this Worker)

| Secret | Description |
|--------|-------------|
| `MEGA_EMAIL` | MEGA login email |
| `MEGA_PASSWORD` | MEGA password |
| `MEGA_TOTP` | Optional one-time code / seed handling if required by your setup |
| `BACKUP_SHARED_SECRET` | Shared bearer token so only OPERAVA systems can call this Worker |

## Website (optional webhook)

On the **operava-website** Pages project, set:

| Secret | Description |
|--------|-------------|
| `MEGA_BACKUP_URL` | Full URL of this Worker, e.g. `https://operava-mega-backup.workers.dev/` |
| `MEGA_BACKUP_SECRET` | Same value as `BACKUP_SHARED_SECRET` |

After applicant email verification, the site POSTs a JSON snapshot when these are set. Failure is logged and **does not block** the applicant flow.

## Deploy (standalone)

```bash
cd mega-backup
npm install
npx wrangler secret put MEGA_EMAIL
npx wrangler secret put MEGA_PASSWORD
npx wrangler secret put BACKUP_SHARED_SECRET
npx wrangler deploy
```

## API

`POST /` with header `Authorization: Bearer <BACKUP_SHARED_SECRET>`

```json
{
  "folder": "OPERAVA APPLICANTS",
  "fileName": "OPERAVA-APP-2026-123456.json",
  "payload": { "applicationId": "...", "email": "..." }
}
```

`folder` must be one of the four OPERAVA folder names listed in `FOLDERS.md`.
