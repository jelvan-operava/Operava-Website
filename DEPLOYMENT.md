# OPERAVA form email routing

## Primary website forms (OTP path)

Contact, Quote/Services, and Careers pages use `OperavaIntakeForm` → `/api/forms/start` (OTP) → `/api/forms/verify`.

After the applicant/client verifies their email:

1. **Confirmation email** is sent **to the submitter** from the client or talent inbox
2. **Staff and the relevant inbox are CC’d** on that same confirmation, and replies route to the relevant client or talent inbox
3. A second **staff-only** notification is also sent with the full payload

| Form type | Sent to | Reply-To | CC / staff |
|---|---|---|---|
| CONTACT | submitter | `hello@operavaglobal.com` | `CLIENT_INBOX` (default `hello@operavaglobal.com`, always CC'd) |
| SERVICES | submitter | `hello@operavaglobal.com` | `CLIENT_INBOX` (default `hello@operavaglobal.com`, always CC'd) |
| CAREERS | submitter | `talents@operavaglobal.com` | `TALENT_INBOX` (default `talents@operavaglobal.com`) + `hello@operavaglobal.com` |

Ticket / reference IDs use `OPERAVA-SER-########`, `OPERAVA-CAR-########`, or `OPERAVA-CON-########`.

## Legacy / AVA ticket path

`/api/inquiry` and `/api/apply` (used by AVA-style tickets and `submitInquiry`) send confirmation **to the submitter** from the relevant client or talent inbox with staff **CC**:

| Source | Sent to | Reply-To | CC |
|---|---|---|---|
| Contact, services, AVA consultation | submitter | `hello@operavaglobal.com` | `CLIENT_INBOX` (default `hello@operavaglobal.com`, always CC'd) |
| Careers apply, AVA career interest | submitter | `talents@operavaglobal.com` | `TALENT_INBOX` (talents@operavaglobal.com) + `hello@operavaglobal.com`, optional `APPLICANT_CC` |

Ticket IDs: `OPV-######`.

OTP and staff notification emails do not set a Reply-To address. Client confirmations reply to `hello@operavaglobal.com`; applicant confirmations reply to `talents@operavaglobal.com`.

## Cloudflare Pages secrets & bindings

Set these on the production Pages project:

**Secrets / vars**
- `RESEND_API_KEY` (required for all email)
- `OTP_SECRET` (**required** for forms + recruitment OTP). Generate with `openssl rand -hex 32` (64 hex chars). Minimum length **32**. There is **no** fallback to `RESEND_API_KEY` or a hardcoded default — missing/short secret returns HTTP 503 `OTP_SECRET_MISSING`.
- `RESEND_FROM` = `OPERAVA <notification@operavaglobal.com>` (or `RESEND_EMAIL_FROM`)
- `CLIENT_INBOX` = `hello@operavaglobal.com`
- `TALENT_INBOX` = `talents@operavaglobal.com`
- `APPLICANT_CC` (optional, comma-separated extra CCs for career tickets)
- `NODE_VERSION` = `20`

**How to set `OTP_SECRET`**

1. Generate locally: `openssl rand -hex 32`
2. Cloudflare Dashboard → **Workers & Pages** → your Pages project → **Settings** → **Environment variables** (Production)
3. Add secret: name `OTP_SECRET`, value = the generated string, type **Secret**
4. **Redeploy** (Retry deployment or push to `main`). Secrets apply at deploy time.
5. Confirm: `GET /api/health` → `bindings.otpSecretConfigured: true`

**Bindings**
- `AI` — Workers AI (AVA chat → `@cf/meta/llama-3.3-70b-instruct-fp8-fast`)
- `SUBMISSIONS_DB` — D1 (`operava-submissions`) optional; OTP works via signed drafts without D1
- `RESUMES_BUCKET` — R2 (`operava-resumes`) optional; applications proceed with `pending:` key if unbound

**Important:** After adding or changing secrets in the Cloudflare dashboard, trigger a **new deployment** (push to `main` or Retry deployment). Secrets are injected only at deploy time.

Verify `notification@operavaglobal.com` (or the RESEND_FROM domain) in Resend before going live.

### Troubleshooting: `R2 bucket 'operava-resumes' not found`

If a deployment fails during Function publish with:

```
Error: Failed to publish your Function. Got error: R2 bucket 'operava-resumes' not found.
Verify the bucket exists in your account and that the bucket_name in your configuration is correct.
```

This is a **Cloudflare account/dashboard configuration issue, not a code issue** — `wrangler.jsonc` in this repo does not declare an `r2_buckets` binding, so `RESUMES_BUCKET` is bound entirely from the Pages project's dashboard settings.

To fix:

1. In the Cloudflare dashboard, go to **R2** and confirm a bucket named exactly `operava-resumes` (case-sensitive) exists in the **same account** the Pages project deploys to.
2. If it doesn't exist, create it, or if it exists under a different name, either rename it to match or update the binding.
3. Go to the Pages project → **Settings → Functions → R2 bucket bindings** and confirm `RESUMES_BUCKET` points at the correct bucket.
4. Retry the deployment (or push a new commit) after correcting the binding.

Since the application already treats `RESUMES_BUCKET` as optional at runtime (falling back to a `pending:` resume key, see `functions/lib/formCore.ts`), the binding can also be **removed** from the Pages project's Functions settings if resume storage isn't needed yet — deployments will then succeed without it.

## AVA chat

Production `/api/chat` uses the Workers AI binding. No Gemini key is required. Client-side `avaConversationEngine` is the offline fallback.
