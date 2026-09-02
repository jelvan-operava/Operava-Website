# OPERAVA form email routing

Website inquiries send an AVA-style ticket auto-reply to the person who submitted the form. Staff inboxes are CC'd so the same confirmation already sits in our mailbox.

Ticket IDs match AVA chat generation: `OPV-######`.

| Source | Auto-reply To | CC |
|---|---|---|
| Contact form, services inquiry, AVA consultation | submitter | `client@operavaglobal.com` |
| Careers apply form, AVA career interest | submitter | `talents@operavaglobal.com`, `hr@operavaglobal.com` |

Client and applicant confirmation copy is different. Reply-To is the staff inbox so answers land with the team.

## Cloudflare Pages secrets

Set these on the production Pages project:

- `RESEND_API_KEY`
- `RESEND_FROM` = `OPERAVA Website <noreply@operavaglobal.com>`
- `CLIENT_INBOX` = `client@operavaglobal.com`
- `TALENT_INBOX` = `talents@operavaglobal.com`
- `HR_INBOX` = `hr@operavaglobal.com`
- `APPLICANT_CC` (optional, comma-separated extra CCs for career tickets)
- `GEMINI_API_KEY` (optional, AVA)
- `NODE_VERSION` = `20`

Verify `noreply@operavaglobal.com` (or the RESEND_FROM domain) in Resend before going live.
