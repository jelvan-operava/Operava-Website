# OPERAVA MEGA backup (separate coding folder)

Isolated Cloudflare Worker for **MEGA cloud backups** of OPERAVA inquiries and applications.

- Full deploy steps: **[DEPLOYMENT.md](./DEPLOYMENT.md)**
- Folder names: **[FOLDERS.md](./FOLDERS.md)**

## Folder map

| MEGA folder | Sources |
|-------------|--------|
| `OPERAVA APPLICANTS` | Careers form + Recruitment AVA |
| `OPERAVA CLIENTS` | Services, Quote, Contact |
| `OPERAVA EMPLOYEES` | Reserved (employee systems) |
| `OPERAVA FILES AND DOCUMENTS` | Academy + document-style submissions |

## Quick deploy

```bash
cd mega-backup
npm install
npx wrangler secret put MEGA_EMAIL
npx wrangler secret put MEGA_PASSWORD
npx wrangler secret put BACKUP_SHARED_SECRET
npx wrangler deploy
```

Then on **operava-website** Pages production secrets:

- `MEGA_BACKUP_URL` = Worker URL
- `MEGA_BACKUP_SECRET` = same as `BACKUP_SHARED_SECRET`

## Authenticator

Prefer a **dedicated MEGA service account without authenticator OTP** for automated backups. See DEPLOYMENT.md.
