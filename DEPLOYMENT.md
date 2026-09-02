# OPERAVA form email routing

Website inquiries are sent with Resend from `functions/api/inquiry.ts`.

| Source | Inbox |
|---|---|
| Contact form, services inquiry, AVA consultation | `client@operavaglobal.com` |
| Careers apply form, AVA career interest | `talents@operavaglobal.com` |

## Cloudflare Pages secrets

Set these on the production Pages project:

- `RESEND_API_KEY`
- `RESEND_FROM` = `OPERAVA Website <noreply@operavaglobal.com>`
- `CLIENT_INBOX` = `client@operavaglobal.com`
- `TALENT_INBOX` = `talents@operavaglobal.com`
- `GEMINI_API_KEY` (optional, AVA)
- `NODE_VERSION` = `20`

Verify `noreply@operavaglobal.com` (or the RESEND_FROM domain) in Resend before going live.
