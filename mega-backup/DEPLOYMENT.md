# OPERAVA MEGA backup — deployment & operations

Complete guide for MEGA folder backups from the website (forms + recruitment).

---

## Feature status (implementation matrix)

| Feature | Code | Backend binding | Live test |
|---------|------|-----------------|----------|
| Folder map (4 folders) | ✅ `megaFolders.ts` / `FOLDERS.md` | MEGA must have folders | Manual in MEGA app |
| Direct upload (Pages) | ✅ `megaUpload.ts` via `megaBackupHook` | `MEGA_EMAIL` + `MEGA_PASSWORD` | `megaCredentialsConfigured: true` |
| Auth secret | ✅ `MEGA_BACKUP_SHARED_SECRET` (legacy aliases OK) | Pages env | `POST /api/mega-backup` with Bearer |
| Forms → MEGA after OTP | ✅ `forms/verify.ts` → `backupFormSubmissionToMega` | Resend + OTP + MEGA | End-to-end form |
| Recruitment email verify → MEGA | ✅ `email-verify.ts` → `backupApplicantToMega` | D1 + MEGA | AI screening OTP |
| Assessment complete → MEGA `.txt` | ✅ `assessment-answer.ts` → `backupRecruitmentAssessmentToMega` | D1 + MEGA + AI | Full screening flow |
| Optional Worker webhook | ✅ `mega-backup/` package | `MEGA_BACKUP_URL` + shared secret | Optional if direct creds set |
| Public sample API | ✅ `POST /api/mega-backup` | MEGA + shared secret | curl with Bearer |

**Preferred production path:** set `MEGA_EMAIL` + `MEGA_PASSWORD` on **Cloudflare Pages**. Direct upload runs in the Pages Function; the separate Worker is optional.

---

## 1. MEGA account folders (required)

These names must match **exactly** (including spaces):

| Folder | What is stored |
|--------|----------------|
| `OPERAVA APPLICANTS` | Careers form JSON + Recruitment AVA `.txt` |
| `OPERAVA CLIENTS` | Services / Quote / Contact inquiry JSON |
| `OPERAVA EMPLOYEES` | Reserved for employee-system exports |
| `OPERAVA FILES AND DOCUMENTS` | Academy + sample / document-style files |

Create all four in the MEGA app before relying on backups.

---

## 2. Authenticator / 2FA

If MEGA login uses an authenticator app, automated login often fails.

**Recommended**

1. Dedicated MEGA service account for OPERAVA backups only.
2. Prefer **no authenticator** on that account.
3. Never store password or authenticator seed in GitHub.

Optional: `MEGA_TOTP` (highly sensitive).

---

## 3. Cloudflare Pages secrets (primary)

Project → Settings → Environment variables (**Production**):

| Secret | Required | Purpose |
|--------|----------|--------|
| `MEGA_EMAIL` | Yes (direct) | MEGA login |
| `MEGA_PASSWORD` | Yes (direct) | MEGA login |
| `MEGA_BACKUP_SHARED_SECRET` | Yes for `POST /api/mega-backup` | Bearer auth (≥16 chars) |
| `MEGA_BACKUP_URL` | Optional | Only if using external Worker webhook |
| `OTP_SECRET` | Yes (site-wide) | Forms + recruitment OTP (≥32 chars) |
| `RESEND_API_KEY` | Yes | OTP + confirmation email |

Health checks:

```text
GET https://www.operavaglobal.com/api/health
→ bindings.megaCredentialsConfigured: true
→ bindings.otpSecretConfigured: true
→ bindings.resendConfigured: true
→ bindings.d1Bound / submissionsDbBound: true
```

---

## 4. Optional: standalone Worker

Only needed if you prefer not to put MEGA credentials on Pages:

```bash
cd mega-backup
npm install
npx wrangler secret put MEGA_EMAIL
npx wrangler secret put MEGA_PASSWORD
npx wrangler secret put MEGA_BACKUP_SHARED_SECRET
npx wrangler deploy
```

Then on Pages set `MEGA_BACKUP_URL` + the **same** `MEGA_BACKUP_SHARED_SECRET`.

Smoke test:

```bash
curl -sS -X POST "https://www.operavaglobal.com/api/mega-backup" \
  -H "Authorization: Bearer <MEGA_BACKUP_SHARED_SECRET>" \
  -H "Content-Type: application/json" \
  -d '{
    "folder": "OPERAVA FILES AND DOCUMENTS",
    "kind": "file",
    "fileName": "operava_sample_probe.txt",
    "text": "deployment check"
  }'
```

Expect `{ "success": true, ... }` and the file in MEGA.

---

## 5. Automatic routing (website → folder)

| Source | When | MEGA folder | Format |
|--------|------|-------------|--------|
| Careers (`/careers`, `/apply`) | After form OTP verify | `OPERAVA APPLICANTS` | JSON |
| Contact / Services / Quote | After form OTP verify | `OPERAVA CLIENTS` | JSON |
| Academy (`/academy`) | After form OTP verify | `OPERAVA FILES AND DOCUMENTS` | JSON |
| Recruitment AVA email OTP | After `/api/recruitment/email-verify` | `OPERAVA APPLICANTS` | `.txt` snapshot |
| Assessment complete | After last answer (pass or fail) | `OPERAVA APPLICANTS` | Full `.txt` record |

Backup is **fire-and-forget** (`waitUntil`): form/OTP success is not blocked if MEGA is down.

File name examples:

```text
OPERAVA APPLICANTS/OPERAVA-APP-2026-123456_Full_Name.txt
OPERAVA APPLICANTS/OPERAVA-CAR-….json
OPERAVA CLIENTS/OPERAVA-SER-….json
OPERAVA FILES AND DOCUMENTS/OPERAVA-ACA-….json
```

---

## 6. API contract (`POST /api/mega-backup`)

Header: `Authorization: Bearer <MEGA_BACKUP_SHARED_SECRET>`

```json
{
  "folder": "OPERAVA CLIENTS",
  "kind": "client",
  "fileName": "optional-name.json",
  "payload": { },
  "text": "optional plain text body"
}
```

If `text` is set, uploads `.txt`; otherwise JSON.

Allowed folders only:

- `OPERAVA APPLICANTS`
- `OPERAVA CLIENTS`
- `OPERAVA EMPLOYEES`
- `OPERAVA FILES AND DOCUMENTS`

---

## 7. Website pages + APIs (related)

| Page / API | Role |
|------------|------|
| `/` `/services` `/contacts` `/academy` `/careers` `/apply` | Public pages (forms) |
| `/ai-job-screening` | Recruitment AVA (OTP → profile → assessment) |
| `/verification` | Document ID lookup |
| `/api/forms/start` `/api/forms/verify` | Site forms OTP |
| `/api/recruitment/email-start` `/email-verify` | Recruitment OTP |
| `/api/recruitment/assessment-answer` | Assessment + final MEGA `.txt` |
| `/api/mega-backup` | Manual / sample MEGA upload |
| `/api/health` | Binding status |

---

## 8. Security checklist

- [x] MEGA credentials only in Cloudflare secrets (not in git)
- [ ] `MEGA_BACKUP_SHARED_SECRET` ≥ 16 characters, random (set in Pages)
- [x] `OTP_SECRET` ≥ 32 characters, no default fallback
- [ ] Same shared secret on Worker and Pages **if** using Worker
- [ ] No passwords in GitHub, chat, or tickets
- [ ] Four MEGA folders pre-created
- [ ] One CAREERS + one SERVICES end-to-end test after go-live
- [ ] One AI screening assessment complete → check MEGA applicants folder

---

## 9. Troubleshooting

| Symptom | Likely cause |
|---------|----------------|
| `megaCredentialsConfigured: false` | Missing `MEGA_EMAIL` / `MEGA_PASSWORD` on Pages Production |
| `megaBackupWebhookConfigured: false` | Normal if using **direct** creds only (no `MEGA_BACKUP_URL`) |
| `Unauthorized` on POST | Wrong/missing Bearer `MEGA_BACKUP_SHARED_SECRET` |
| `Target folder not found` | Folder name mismatch or not created in MEGA |
| Login / MEGA errors | 2FA authenticator blocking service login |
| Form OK but no MEGA file | Upload failed in background; check Pages Function logs |
| Invalid OTP | Start a **new** code after secret/hash changes; use 6 digits |

---

## 10. Related code

| Path | Role |
|------|------|
| `functions/lib/megaFolders.ts` | Allowed folder names |
| `functions/lib/megaUpload.ts` | megajs direct upload |
| `functions/lib/megaBackupHook.ts` | Forms / recruitment backup orchestration |
| `functions/api/mega-backup.ts` | Public POST/GET API |
| `functions/api/forms/verify.ts` | All site forms after OTP → MEGA JSON |
| `functions/api/recruitment/email-verify.ts` | Recruitment OTP → early `.txt` |
| `functions/api/recruitment/assessment-answer.ts` | Final applicant `.txt` |
| `mega-backup/src/index.ts` | Optional Worker entry |
