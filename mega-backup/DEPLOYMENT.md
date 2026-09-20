# OPERAVA MEGA backup — deployment & operations

Complete guide to deploy the **mega-backup** Worker and connect every website inquiry/form to the correct MEGA folder.

---

## 1. MEGA account folders (already created)

These names must match **exactly** (including spaces):

| Folder | What is stored |
|--------|----------------|
| `OPERAVA APPLICANTS` | Careers form applications + Recruitment AVA (`/ai-job-screening`) |
| `OPERAVA CLIENTS` | Services / Request a Quote / Contact inquiries |
| `OPERAVA EMPLOYEES` | Reserved for employee-system exports |
| `OPERAVA FILES AND DOCUMENTS` | Academy inquiries + general document-style submissions |

Confirm all four exist in the MEGA mobile/desktop app before deploying.

---

## 2. Authenticator / 2FA

If the MEGA login uses an **OTP authenticator app**, automated Worker login often fails.

**Recommended**

1. Create a **dedicated MEGA service account** only for OPERAVA backups.
2. Prefer **no authenticator** on that service account.
3. Never store password or authenticator seed in GitHub.

Optional secret: `MEGA_TOTP` (only if your runtime supports TOTP login — treat as highly sensitive).

---

## 3. Deploy the mega-backup Worker

From this folder on a machine with Node 20+ and Cloudflare access:

```bash
cd mega-backup
npm install

# Required secrets
npx wrangler secret put MEGA_EMAIL
npx wrangler secret put MEGA_PASSWORD
npx wrangler secret put MEGA_BACKUP_SHARED_SECRET

# Optional if using TOTP-capable login
# npx wrangler secret put MEGA_TOTP

npx wrangler deploy
```

Note the deployed URL, for example:

```text
https://operava-mega-backup.<your-subdomain>.workers.dev
```

### Smoke test

```bash
curl -sS "https://operava-mega-backup....workers.dev/"
# → { "service": "operava-mega-backup", "status": "ok", "folders": [...], "megaConfigured": true }

curl -sS -X POST "https://operava-mega-backup....workers.dev/" \
  -H "Authorization: Bearer <MEGA_BACKUP_SHARED_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{
    "folder": "OPERAVA CLIENTS",
    "kind": "client",
    "fileName": "test_inquiry.json",
    "payload": { "test": true, "note": "deployment check" }
  }'
```

Check MEGA → **OPERAVA CLIENTS** for `test_inquiry.json`.

---

## 4. Connect the marketing website (Cloudflare Pages)

Project: **operava-website** → Settings → Environment variables (Production):

| Secret | Value |
|--------|--------|
| `MEGA_BACKUP_URL` | Worker base URL (https://…) |
| `MEGA_BACKUP_SHARED_SECRET` | **Same** string as Worker secret |

After deploy, health should show:

```text
GET https://www.operavaglobal.com/api/health
→ bindings.megaBackupWebhookConfigured: true
→ bindings.megaBackupSecretConfigured: true
```

---

## 5. What gets saved automatically

| Source | When | MEGA folder |
|--------|------|-------------|
| Careers form (`/careers`, `/apply`) | After email OTP verify | `OPERAVA APPLICANTS` |
| Recruitment AVA (`/ai-job-screening`) | After application email OTP verify | `OPERAVA APPLICANTS` |
| Services / Quote form | After email OTP verify | `OPERAVA CLIENTS` |
| Contact form | After email OTP verify | `OPERAVA CLIENTS` |
| Academy inquiry form | After email OTP verify | `OPERAVA FILES AND DOCUMENTS` |

Backup is **fire-and-forget**: if MEGA is down, the user still gets a successful form confirmation. Failures are logged on the Worker/Pages side only.

File naming examples:

```text
OPERAVA APPLICANTS/OPERAVA-APP-2026-123456_1726….json
OPERAVA APPLICANTS/CAR-2026-….json
OPERAVA CLIENTS/INQ-2026-….json
OPERAVA FILES AND DOCUMENTS/ACA-2026-….json
```

---

## 6. API contract (Worker)

`POST /`  
Header: `Authorization: Bearer <MEGA_BACKUP_SHARED_SECRET>`

```json
{
  "folder": "OPERAVA CLIENTS",
  "kind": "client",
  "fileName": "optional-name.json",
  "payload": { }
}
```

Allowed `folder` values only:

- `OPERAVA APPLICANTS`
- `OPERAVA CLIENTS`
- `OPERAVA EMPLOYEES`
- `OPERAVA FILES AND DOCUMENTS`

---

## 7. Security checklist

- [ ] MEGA service account credentials only in Cloudflare secrets
- [ ] `MEGA_BACKUP_SHARED_SECRET` ≥ 16 characters, random
- [ ] Same secret on Worker and Pages
- [ ] No passwords in GitHub, chat, or tickets
- [ ] Folders pre-created in MEGA (Worker does not auto-create top-level folders)
- [ ] Test one CAREERS and one SERVICES submission end-to-end

---

## 8. Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| `megaBackupWebhookConfigured: false` | Pages secrets missing or not production |
| `Target folder not found` | Folder name mismatch or not created in MEGA |
| `Unauthorized` | Secret mismatch between Pages and Worker |
| Login / MEGA errors | 2FA authenticator blocking service login |
| Form OK but no MEGA file | Webhook failed silently; check Pages + Worker logs |

---

## 9. Related code

| Path | Role |
|------|------|
| `mega-backup/src/index.ts` | Worker entry (megajs upload) |
| `mega-backup/src/folders.ts` | Allowed folder names |
| `functions/lib/megaBackupHook.ts` | Website → Worker webhook |
| `functions/api/forms/verify.ts` | All site forms after OTP |
| `functions/api/recruitment/email-verify.ts` | Recruitment AVA after OTP |
