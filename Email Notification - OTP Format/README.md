# Email Notification / OTP Format

This folder is the **single source of truth** for the HTML formatting of the
transactional emails sent by OPERAVA's website (Cloudflare Pages Functions,
see `functions/lib/formCore.ts`).

Edit any `.html` file in this folder and the change is picked up automatically
the next time these emails are sent — no other code changes are required.
The build imports each file as a raw text template and swaps the placeholder
tokens (`{{...}}`) shown below for real values at send time.

## Files

| File | Used for | Sent from |
|---|---|---|
| `otp-email.html` | One-time password (OTP) verification code sent while a visitor fills out a Contact, Services, or Careers form | `notification-noreply@operavaglobal.com` |
| `services-confirmation-email.html` | Confirmation sent after a **Services / Contact inquiry** is verified | `hello@operavaglobal.com` |
| `application-confirmation-email.html` | Confirmation sent after a **Careers / job application** is verified | `talents@operavaglobal.com` |

## Placeholder tokens

Do not remove the `{{ }}` tokens — they are replaced automatically:

- `otp-email.html`
  - `{{PURPOSE}}` — what the code is for, e.g. "service inquiry" or "job application"
  - `{{OTP_CODE}}` — the 6-digit one-time verification code
- `services-confirmation-email.html` / `application-confirmation-email.html`
  - `{{NAME}}` — the submitter's name
  - `{{DETAILS_LIST}}` — the bulleted list of submitted details (name, email, phone,
    category, reference number, etc.), generated from the form submission
  - `{{REFERENCE_ID}}` — the `OPERAVA-###-########` reference number (also included
    inside `{{DETAILS_LIST}}`)

## Notes

- Keep the HTML inline-styled (no external stylesheets/JS) — most email clients
  strip `<style>` blocks and scripts.
- Keep the `<!DOCTYPE html>` / `<html>` / `<head>` / `<body>` wrapper intact so the
  message renders consistently across mail clients.
- After editing, it's a good idea to send a test submission through the live
  Contact/Services/Careers forms to confirm the formatting still reads well.
