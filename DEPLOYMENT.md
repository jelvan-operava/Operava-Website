# OPERAVA form email routing

## Primary website forms (OTP path)

Contact, Quote/Services, and Careers pages use `OperavaIntakeForm` → `/api/forms/start` (OTP) → `/api/forms/verify`.

After the applicant/client verifies their email:

1. **Confirmation email** is sent **to the submitter**
2. **Staff are CC’d** on that same confirmation
3. A second **staff-only** notification is also sent with the full payload

| Form type | Auto-reply To | CC / staff |
|---|---|---|
| CONTACT | submitter | `CLIENT_INBOX` (default `hello@operavaglobal.com`) |
| SERVICES | submitter | `SALES_INBOX` or `CLIENT_INBOX` |
| CAREERS | submitter | `TALENT_INBOX` + `HR_INBOX` |

Ticket / reference IDs use `OPERAVA-SER-########`, `OPERAVA-CAR-########`, or `OPERAVA-CON-########`.

## Legacy / AVA ticket path

`/api/inquiry` and `/api/apply` (used by AVA-style tickets and `submitInquiry`) send confirmation **to the submitter** with staff **CC**:

| Source | Auto-reply To | CC |
|---|---|---|
| Contact, services, AVA consultation | submitter | `CLIENT_INBOX` |
| Careers apply, AVA career interest | submitter | `TALENT_INBOX`, `HR_INBOX`, optional `APPLICANT_CC` |

Ticket IDs: `OPV-######`.

Reply-To is the staff inbox so replies land with the team.

## Cloudflare Pages secrets & bindings

Set these on the production Pages project:

**Secrets / vars**
- `RESEND_API_KEY` (required for all email)
- `RESEND_FROM` = `OPERAVA <noreply@operavaglobal.com>`
- `CLIENT_INBOX` = `hello@operavaglobal.com`
- `SALES_INBOX` = `hello@operavaglobal.com`
- `TALENT_INBOX` = `talents@operavaglobal.com`
- `HR_INBOX` = `hr@operavaglobal.com`
- `APPLICANT_CC` (optional, comma-separated extra CCs for career tickets)
- `OTP_SECRET` (preferred for OTP hashing; falls back to RESEND_API_KEY)
- `NODE_VERSION` = `20`

**Bindings**
- `AI` — Workers AI (AVA chat → `@cf/meta/llama-3.3-70b-instruct-fp8-fast`)
- `SUBMISSIONS_DB` — D1 (`operava-submissions`) optional; OTP works via signed drafts without D1
- `RESUMES_BUCKET` — R2 (`operava-resumes`) optional; applications proceed with `pending:` key if unbound

**Important:** After adding or changing secrets in the Cloudflare dashboard, trigger a **new deployment** (push to `main` or Retry deployment). Secrets are injected only at deploy time.

Verify `noreply@operavaglobal.com` (or the RESEND_FROM domain) in Resend before going live.

## AVA chat

Production `/api/chat` uses the Workers AI binding. No Gemini key is required. Client-side `avaConversationEngine` is the offline fallback.
