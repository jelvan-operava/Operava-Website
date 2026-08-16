# OPERAVA Global Solutions — Deployment Guide

This document contains instructions, configuration values, and checklists for deploying the **OPERAVA Global Solutions** web platform to **Cloudflare Pages**, **GitHub**, and full-stack container environments.

---

## 1. Cloudflare Pages Deployment (Recommended)

Cloudflare Pages provides global Edge CDN distribution, zero-downtime atomic deployments, and native edge functions for AVA Virtual Intelligence.

### Method A: Automated GitHub CI/CD Integration

1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository (`operava-website`).
4. In the **Set up builds and deployments** screen, enter the following settings:

#### Exact Build Configuration:

| Configuration Field | Exact Value To Enter |
| :--- | :--- |
| **Project Name** | `operava-website` *(or your preferred slug)* |
| **Production Branch** | `main` *(or `master`)* |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` *(or `npx vite build`)* |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` *(Leave empty/blank)* |

#### Environment Variables (Production & Preview):

Click on **Environment variables (advanced)** or go to **Settings > Environment variables** after creation and add:

| Variable Name | Value / Description | Required |
| :--- | :--- | :--- |
| `NODE_VERSION` | `20` | Yes |
| `GEMINI_API_KEY` | `AIzaSy...` *(Google AI Studio / Gemini API Key)* | Optional (Serverless AI) |
| `NODE_ENV` | `production` | Yes |

5. Click **Save and Deploy**. Cloudflare will clone the repo, build the Vite application into `dist/`, deploy edge functions from `functions/`, and publish your website to `https://operava-website.pages.dev`.

---

### Method B: Deploying via Wrangler CLI

If deploying directly from your local terminal or a CI pipeline:

```bash
# 1. Install dependencies
npm install

# 2. Build production assets
npm run build

# 3. Authenticate with Cloudflare
npx wrangler login

# 4. Deploy the dist directory to Cloudflare Pages
npx wrangler pages deploy dist --project-name=operava-website --branch=main

# 5. (Optional) Set the Gemini API Secret for Edge Functions
npx wrangler pages secret put GEMINI_API_KEY --project-name=operava-website
```

---

## 2. Cloudflare Routing & Edge Configuration

The repository includes pre-configured files to guarantee seamless operation on Cloudflare:

1. **SPA Routing Fallback (`public/_redirects`)**:
   ```
   /*    /index.html   200
   ```
   Ensures deep links (e.g. `/services/it`, `/services/bpo`, `/careers`, `/contact`) resolve properly without 404 errors on refresh.

2. **Security & Cache Headers (`public/_headers`)**:
   - `X-Frame-Options: SAMEORIGIN`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - Long-term immutable caching (`max-age=31536000`) for all hashed JavaScript, CSS, and media in `/assets/*`.

3. **Edge Functions (`functions/api/`)**:
   - `functions/api/health.ts`: Edge health check endpoint.
   - `functions/api/chat.ts`: Serverless API route executing Google Gemini 3.7 Flash with fallback to the client-side intelligence engine.

---

## 3. Custom Domain & DNS Setup

To point your official company domain (e.g., `operava.com`) to Cloudflare Pages:

1. In Cloudflare Pages, navigate to **Projects** > `operava-website` > **Custom domains**.
2. Click **Set up a domain** and enter `operava.com` and `www.operava.com`.
3. Cloudflare will automatically configure the DNS records if your domain is managed on Cloudflare DNS:
   - **Root domain**: `CNAME` or `Apex Flattening` pointing to `operava-website.pages.dev`
   - **Subdomain (`www`)**: `CNAME` pointing to `operava-website.pages.dev`
4. Under **SSL/TLS**:
   - Encryption Mode: **Full (Strict)**
   - Always Use HTTPS: **Enabled**
   - Minimum TLS Version: **TLS 1.2**
   - HTTP/3 (with QUIC): **Enabled**

---

## 4. Alternative Deployment: Full-Stack Docker / Node.js

For containerized hosts (Google Cloud Run, AWS ECS, Railway, Render, DigitalOcean):

```bash
# 1. Install dependencies
npm install

# 2. Build both Vite frontend and Express server bundle
npm run build

# 3. Start the production Express server
npm run start
```

- Production server binds to host `0.0.0.0` and port `3000` (configurable via `process.env.PORT`).
- Serves static SPA from `dist/` with fallback routing and hosts `/api/*` endpoints.

---

## 5. Pre-Flight Verification Checklist

Before opening to public traffic, verify:

- [ ] **Home Media Loader**: All 3 capabilities videos (`Video_otwv5l.mp4`, `Video_nmdtfe.mp4`, `Video_pmorrn.mp4`), AVA video avatar (`Video_vpaaxl.mp4`), and hero cover graphic load smoothly.
- [ ] **Direct Route Navigation**: Refreshing on `/services/it`, `/services/bpo`, `/industries`, `/about`, `/careers`, and `/contact` renders the respective page without 404 errors.
- [ ] **AVA Assistant**: Launcher button opens the assistant, processes queries, and offers consultation/application booking flows.
- [ ] **Language Localization**: Switching between English, Spanish, French, German, Tagalog (Filipino), Arabic, Chinese, and Japanese updates translations instantly.
- [ ] **Responsive Viewports**: Tested across mobile (375px+), tablet (768px), and ultra-wide screens (1440px+).
- [ ] **SEO & Metadata**: `robots.txt`, `sitemap.xml`, OpenGraph cards, and Favicons render properly.
