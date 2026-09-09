# BUSINESS INFO

> Comprehensive business/content reference audit for the **Operava-Website** marketing SPA  
> Repository: `https://github.com/jelvan-operava/Operava-Website`  
> Production domain: `https://www.operavaglobal.com`  
> Audit date: 2026-09-09  
> Scope: Full repository inspection (routes, pages, components, data, legal, forms, media, SEO, integrations)

---

## 1. Executive Summary

OPERAVA Global Solutions is a Philippine SEC-registered corporation providing **Workforce**, **Information Technology (IT)**, and **Business Process Outsourcing (BPO)** services on a remote-first, global delivery model.

The marketing website is a React + Vite SPA deployed on Cloudflare Pages, with:
- Bilingual/multi-language UI (en + ar, de, es, fil, fr, ja, zh)
- AVA AI assistant (Workers AI)
- OTP-verified intake forms (Services / Careers / Contact)
- Legal pages: Privacy, Terms, Refund Policy
- Payment portal deep-link to `pay.operavaglobal.com`
- Heavy Cloudinary media usage across multiple cloud accounts

**Key business identifiers found:**
- Brand: OPERAVA / OPERAVA GLOBAL SOLUTIONS
- Tagline / motto: "Operating in Advance." / "We Operate in Advance"
- SEC Registration Number: `2026080262213-03`
- Initial corporate location: Pagudpud, Ilocos Norte 2919, Philippines
- Primary public domain: `www.operavaglobal.com`
- Payment portal: `pay.operavaglobal.com`

---

## 2. Business Identity

| Field | Value found in repository |
|--------|---------------------------|
| Legal / business name | OPERAVA Global Solutions (also "Operava Global Solutions Opc" in Refund Policy) |
| Brand name | OPERAVA |
| Tagline | Global Solutions |
| Slogan / motto | Operating in Advance. / We Operate in Advance |
| Positioning | Philippine-based Corporation providing Workforce, IT, and BPO services, operating remotely and globally |
| Registration | SEC Registration Number: 2026080262213-03 |
| Location | Pagudpud, Ilocos Norte 2919, Philippines (initial corporate location); remote-first global operations |
| Delivery model | Remote-first / hybrid; 24/7/365 follow-the-sun |
| Target clients | Startups, SMEs, growing organizations, enterprises |
| Primary verticals (marketing) | Technology & SaaS, Financial Services, Healthcare, E-Commerce, Logistics, Professional Services |
| Trust claims (company-profile / AVA knowledge) | 99.4% long-term partnership retention; 99.99% uptime SLA; ISO 27001, SOC 2 Type II, HIPAA, GDPR & DPA, PCI-DSS claims appear in AVA-INSTRUCTIONS/company-profile.md (verify before external use) |

**Source references:** `src/utils/seo.ts`, `src/components/Footer.tsx`, `src/pages/Terms.tsx`, `src/pages/Privacy.tsx`, `AVA-INSTRUCTIONS/ABOUT-OPERAVA/company-profile.md`

---

## 3. Complete Website Page Inventory

| Page | Route(s) | Purpose | Primary CTA | Legal/Business relevance |
|------|----------|---------|-------------|---------------------------|
| Home | `/` | Brand landing, services overview, capabilities, models | Talk to Us / Explore Services | Core brand |
| About | `/about` | Company story, model, registration | Contact / Careers | Identity, SEC |
| IT Services hub | `/services/it`, `/services` | IT catalog | Discuss requirements / Quote | Service sales |
| BPO Services hub | `/services/bpo` | BPO catalog | Discuss requirements / Quote | Service sales |
| Service detail | `/services/it/:slug`, `/services/bpo/:slug` | Individual service pages | Discuss Your Requirements | Service sales |
| Industries | `/industries` | Vertical focus | Contact | Positioning |
| Careers | `/careers` | Job openings | Apply | Hiring |
| Apply | `/apply` | Career application form | Submit application (OTP) | Hiring |
| Quote | `/quote`, `/request-a-quote` | Service inquiry form | Request quote (OTP) | Sales |
| Contact | `/contact` | Contact / general inquiry | Talk to Us / form | Sales + support |
| Insights | `/insights` | Thought leadership | Read / Contact | Content |
| Privacy Policy | `/privacy` | Privacy notice | — | Legal |
| Terms & Conditions | `/terms` | Website & service terms | — | Legal |
| Refund Policy | `/refund-policy`, `/refundpolicy`, `/refund` | Refunds, cancellations, credits | Support email / portal | Legal / commercial |
| Payment Portal | `/payment-portal`, `/payment`, `/pay`, `/client-portal/payment` | Redirect/link to pay.operavaglobal.com | Pay | Finance |
| Not Found | `*` | 404 | Home | UX |

**Source:** `src/App.tsx`, `public/sitemap.xml`

---

## 4. Website Navigation Structure

```
HOME (/)
├── Services
│   ├── Information Technology (/services/it)
│   │   ├── Software Development
│   │   ├── Web & Mobile Application Development
│   │   ├── SaaS & Platform Development
│   │   ├── IT Systems Development
│   │   ├── Computer Programming
│   │   ├── IT Consulting
│   │   ├── Systems Integration
│   │   └── Database Services
│   └── Business Process Outsourcing (/services/bpo)
│       ├── Customer Service
│       ├── Technical Support
│       ├── Help Desk
│       ├── Back-Office Operations
│       ├── Data Processing
│       ├── Data Entry
│       ├── Document Processing
│       └── Virtual Assistance
├── Capabilities (/#capabilities)
├── Industries (/industries)
├── About (/about)
├── Careers (/careers)
│   └── Apply (/apply)
├── Insights (/insights)
├── Contact (/contact)
├── Quote (/quote | /request-a-quote)
└── Legal
    ├── Privacy Policy (/privacy)
    ├── Terms & Conditions (/terms)
    └── Refund Policy (/refund-policy)

External / related:
├── Payment Portal → https://pay.operavaglobal.com
└── Social (@operavaglobal) — Facebook, X, TikTok, Instagram, LinkedIn
```

Header CTAs: **Explore Services**, **Talk to Us**  
Mobile: full drawer + language switcher  
Footer: Services, Company, Legal + email directory carousel + social + SEC number  

**Source:** `src/components/Navigation.tsx`, `src/components/Footer.tsx`

---

## 5. Complete Website Content

### Brand copy (repeated)
- OPERAVA / OPERAVA GLOBAL SOLUTIONS
- "Operating in Advance."
- Technology • Workforce • Business Process Services
- Philippine-based Corporation… operating remotely and globally

### Core company FAQs (SEO / schema)
From `src/utils/seo.ts` — services offered, location/registration, delivery model, confidentiality, engagement speed (24–48h proposal).

### Service catalog (16 services)
**IT (8):** Software Development; Web & Mobile Application Development; SaaS & Platform Development; IT Systems Development; Computer Programming; IT Consulting; Systems Integration; Database Services  

**BPO (8):** Customer Service; Technical Support; Help Desk; Back-Office Operations; Data Processing; Data Entry; Document Processing; Virtual Assistance  

Each service has shortDescription, description, capabilities, benefits, industries, relatedPositions, FAQs, CTA "Discuss Your Requirements", and a Cloudinary image.

### Careers
Three executive tracks (see §9).

### Legal summaries
- Privacy: 31 sections, Effective Date **17 August 2026**, contact `compliance@operavaglobal.com`
- Terms: 31 sections, Effective Date **17 August 2026**, Pagudpud address
- Refund: Extensive commercial policy (Philippine law framing), support channels

### Contact emails (departmental directory)
| Purpose | Email |
|---------|--------|
| Client / general | hello@operavaglobal.com |
| HR | hr@operavaglobal.com |
| Customer Service | cs@operavaglobal.com |
| Compliance | compliance@operavaglobal.com |

**Source:** `src/components/EmailDirectoryCarousel.tsx`, legal pages, form routing

---

## 6. Business Services / Products

### Information Technology
1. Software Development  
2. Web & Mobile Application Development  
3. SaaS & Platform Development  
4. IT Systems Development  
5. Computer Programming  
6. IT Consulting  
7. Systems Integration  
8. Database Services  

### Business Process Outsourcing
1. Customer Service  
2. Technical Support  
3. Help Desk  
4. Back-Office Operations  
5. Data Processing  
6. Data Entry  
7. Document Processing  
8. Virtual Assistance  

### Engagement models
- Individual dedicated professionals  
- Dedicated operational teams  
- Enterprise multi-team governance  

Pricing: NOT FOUND as public fixed prices on the website (proposal-based / quotation).

**Note:** Footer lists "Cloud Services & Infrastructure" → `/services/it/cloud-services`, but **no matching slug** exists in `src/data/services.ts` (see §26).

---

## 7. Calls-to-Action

| Exact text | Location | Destination / action | Purpose |
|------------|----------|----------------------|---------|
| Talk to Us | Header, Footer, many pages | `/contact` | Primary sales contact |
| Explore Services / Explore All Services | Header | `/services` or `/services/it` | Catalog |
| Discuss Your Requirements | Service cards / detail | Quote / contact flow | Service inquiry |
| Apply / Apply Now | Careers cards | `/apply` (+ position context) | Career application |
| Request a Quote | Quote page | Form submit → OTP | Sales |
| Direct departmental mailto links | Footer carousel | mailto:hello@, hr@, cs@, compliance@ | Segmented contact |
| SEC Registration Number link | Footer | `https://pay.operavaglobal.com` | Opens payment portal (label is SEC number) |
| Social icons | Footer | Facebook, X, TikTok, Instagram, LinkedIn | Brand presence |
| Payment portal routes | Multiple aliases | External pay.operavaglobal.com | Client payments |

---

## 8. Complete Link & URL Inventory

### Internal routes (canonical)
`/`, `/about`, `/services`, `/services/it`, `/services/bpo`, `/services/it/{slug}`, `/services/bpo/{slug}`, `/industries`, `/careers`, `/apply`, `/quote`, `/request-a-quote`, `/contact`, `/insights`, `/privacy`, `/terms`, `/refund-policy` (+ aliases), `/payment-portal` (+ aliases)

### External
| Visible text / context | URL | Type |
|------------------------|-----|------|
| Facebook | https://facebook.com/operavaglobal | Social |
| X / Twitter | https://x.com/operavaglobal | Social |
| TikTok | https://tiktok.com/@operavaglobal | Social |
| Instagram | https://instagram.com/operavaglobal | Social |
| LinkedIn | https://linkedin.com/company/operavaglobal | Social |
| Payment / SEC footer | https://pay.operavaglobal.com | Finance portal |
| Logo fallback | Cloudinary Operava_Logo_Official.svg | Asset |

### Mailto
- hello@operavaglobal.com  
- hr@operavaglobal.com  
- cs@operavaglobal.com  
- compliance@operavaglobal.com  

### Tel
NOT FOUND as primary site-wide phone numbers in navigation/footer (forms collect phone).

---

## 9. Careers & Job Listings

| Title | Short title | Location | Type | Level | CTA |
|-------|-------------|----------|------|-------|-----|
| OPERAVA Technology Executive | Technology Executive | Remote / Hybrid (PH & Global) | Full-time | Associate to Senior | Apply |
| OPERAVA Business Operations Executive | Business Operations Executive | Remote / Philippines & Global | Full-time | Associate to Senior | Apply |
| OPERAVA Customer Experience Executive | Customer Experience Executive | Remote / Philippines & Global | Full-time (24/7 rotational) | Associate to Senior | Apply |

**Application method:** On-site form at `/apply` via `OperavaIntakeForm` (kind=CAREERS) → OTP verification → confirmation emails. Optional resume upload to `/api/forms/upload`.

Specializations are extensive per track (see `src/data/careersData.ts`).

Hiring process (Terms / AVA): AI-assisted interview → skills assessment → Talent Acquisition interview → client interview → documentation.

---

## 10. Contact & Communication Information

| Channel | Value |
|---------|--------|
| General / client | hello@operavaglobal.com |
| HR | hr@operavaglobal.com |
| Customer support | cs@operavaglobal.com |
| Compliance / privacy | compliance@operavaglobal.com |
| Address | Pagudpud, Ilocos Norte 2919, Philippines |
| Phone | NOT FOUND as published primary number |
| Payment | https://pay.operavaglobal.com |
| Website | https://www.operavaglobal.com |

---

## 11. Forms & User Input

### OperavaIntakeForm (central)
- **Kinds:** SERVICES (used by Contact, Quote, service CTAs) and CAREERS (Apply)
- **Flow:** form → `/api/forms/start` (draft + OTP) → OtpVerify → success
- **Common fields:** name*, email*, phone*, country*, privacy*, accurate*, honeypot `website`
- **SERVICES fields:** company (optional), category*, service*, description, budget, websiteUrl, contactMethod
- **CAREERS fields:** position*, specialization*, availability, experience, education, skills, portfolio, additional, optional resume
- **Consent:** privacy checkbox (links to Privacy Policy)
- **Security:** honeypot; OTP email verification; signed-draft model
- **Success:** FormSuccess component with reference ID

### Other
- OtpVerify component
- Resume upload endpoint `/api/forms/upload` (optional; R2 may be pending)

**Source:** `src/components/forms/OperavaIntakeForm.tsx`, `functions/api/*`

---

## 12. Cloudinary & Media Assets

Cloud accounts observed: `sdaxzncs`, `mgyosgsm`, `b5i5bwwa`

### Representative assets
| URL | Purpose / use |
|-----|----------------|
| https://res.cloudinary.com/sdaxzncs/image/upload/v1786240859/Cover%20Photo.png | Default OG image |
| https://res.cloudinary.com/sdaxzncs/image/upload/v1786248668/Operava_Logo_Official.svg | Logo fallback |
| Service card webp assets under sdaxzncs (software, web_mobile, saas, it_systems, programming, IT_consulting, system_integration, database_services, customer_service, technical_support, helpdesk, backoffice, dataprocessing, dataentry, document_processing, virtual_assistance) | Service visuals |
| Departmental email banner images | Footer carousel |
| https://res.cloudinary.com/mgyosgsm/video/upload/Video_*.mp4 | Hero / AVA avatar videos |
| https://res.cloudinary.com/b5i5bwwa/image/upload/... | Covers, shell cards, career images |
| Unsplash career placeholders | Careers card images |

Local public assets: `/operava-logo.svg`, `/favicon-512.svg`

---

## 13. External Services & Integrations

| Service | Purpose | Where used |
|---------|---------|------------|
| Cloudinary | Images & videos | Throughout UI |
| Cloudflare Pages + Workers | Hosting, functions, AI | Deployment |
| Cloudflare Workers AI | AVA assistant | AvaAssistant |
| Resend | Transactional email (OTP, confirmations) | Forms |
| Unsplash | Some career imagery | Careers |
| Social platforms | Brand links | Footer |
| pay.operavaglobal.com | Client payment portal | Footer + payment routes |

**Secrets:** Intentionally excluded.

---

## 14. Social Media

| Platform | URL | Handle |
|----------|-----|--------|
| Facebook | https://facebook.com/operavaglobal | @operavaglobal |
| X (Twitter) | https://x.com/operavaglobal | @operavaglobal |
| TikTok | https://tiktok.com/@operavaglobal | @operavaglobal |
| Instagram | https://instagram.com/operavaglobal | @operavaglobal |
| LinkedIn | https://linkedin.com/company/operavaglobal | company/operavaglobal |

---

## 15. Header Audit

- Logo: `/operava-logo.svg` (fallback Cloudinary official SVG, then favicon)
- Brand text: OPERAVA
- Nav: Home, Services (dropdown IT / BPO), Capabilities, Industries, About, Careers, Insights, Contact
- Desktop CTAs: Explore Services, Talk to Us
- Language switcher
- Mobile hamburger drawer
- Sticky on scroll

**Source:** `src/components/Navigation.tsx`

---

## 16. Footer Audit

1. Email directory carousel: hello / hr / cs / compliance (mailto)
2. Main footer: Brand, social, Services, Company, Legal, Talk to Us
3. Bottom: © 2026 OPERAVA Global Solutions · Philippines • Global Operations · SEC Registration Number: 2026080262213-03 → pay.operavaglobal.com

**Source:** `src/components/Footer.tsx`

---

## 17. Website Features

Multi-language UI; AVA AI assistant; OTP intake forms; service catalog; careers tracks; legal pages; schema/SEO; smooth scroll; payment deep-link; email directory.

---

## 18. SEO & Metadata

- Base URL: https://www.operavaglobal.com  
- Site name: OPERAVA GLOBAL SOLUTIONS  
- Default OG image: Cloudinary Cover Photo  
- Per-route titles, descriptions, keywords, breadcrumbs, FAQs  
- Schema: Organization, breadcrumbs, FAQ, service  
- robots.txt, sitemap.xml (lastmod 2026-08-20; incomplete vs full route set)

---

## 19. Legal & Policies

| Policy | Exists? | URL | Effective date |
|--------|---------|-----|----------------|
| Privacy Policy | YES | `/privacy` | 17 August 2026 |
| Terms & Conditions | YES | `/terms` | 17 August 2026 |
| Refund Policy | YES | `/refund-policy` (+ aliases) | In document body |
| Cookie Policy | Partial (Privacy §15) | — | — |
| Cancellation | Partial (Refund) | — | — |
| Acceptable Use | YES (Terms §12) | `/terms` | — |

---

## 20. Refund Policy

Exists at `/refund-policy`. Entity: Operava Global Solutions Opc. Covers IT/BPO/staffing/SaaS/digital. Principles: no unlawful blanket exclusion; cancellation ≠ refund; case-specific assessment; mandatory rights preserved.

**Source:** `src/pages/RefundPolicy.tsx`

---

## 21. Terms & Conditions

Exists at `/terms`. Effective 17 August 2026. 31 sections covering services, workforce positions, hiring, remote work, AUP, IP, payments, liability, Philippine governing law, Pagudpud contact.

**Source:** `src/pages/Terms.tsx`

---

## 22. Privacy Policy

Exists at `/privacy`. Effective 17 August 2026. RA 10173. Contact: compliance@operavaglobal.com. 31 sections including AI-assisted recruitment, cookies, data subject rights.

**Source:** `src/pages/Privacy.tsx`

---

## 23. Cookie Policy

Standalone page: NOT FOUND IN REPOSITORY. Covered in Privacy §15.

---

## 24. Other Legal Notices

Copyright © 2026; SEC registration in footer; professional-advice and liability disclaimers in Terms; AI recruitment disclosure in Privacy.

---

## 25. Content Consistency Audit

| Issue | Severity |
|-------|----------|
| Entity suffix OPC vs Corporation | Medium |
| Footer Cloud Services link without service slug | High |
| SEC number linked to payment portal | Medium |
| Sitemap incomplete | Medium |
| Certification claims in AVA profile need verification | High if unverified |

---

## 26. Broken / Suspicious Links

| Link | Issue |
|------|--------|
| `/services/it/cloud-services` | No matching slug in services.ts |
| SEC text → pay.operavaglobal.com | Label/destination mismatch |

---

## 27. Business Information Gaps

- Public fixed pricing: NOT FOUND  
- Primary published phone: NOT FOUND  
- Standalone Cookie Policy: NOT FOUND  
- Cloud Services formal page: missing vs footer  

---

## 28. Technical-to-Business Mapping

`services.ts` → catalog; `careersData.ts` → jobs; `seo.ts` → public narrative; legal page components → binding policies; forms APIs → lead pipeline; AVA-INSTRUCTIONS → assistant knowledge; Footer SEC + pay → identity + finance.

---

## 29. Master Content-to-URL Table

| Content / CTA | Destination | Type |
|---------------|-------------|------|
| Talk to Us | `/contact` | Internal |
| Explore Services | `/services` | Internal |
| IT / BPO hubs | `/services/it`, `/services/bpo` | Internal |
| Service detail | `/services/{it|bpo}/{slug}` | Internal |
| Apply Now | `/apply` | Internal |
| Privacy / Terms / Refund | `/privacy`, `/terms`, `/refund-policy` | Internal |
| hello@ / hr@ / cs@ / compliance@ | mailto: | Email |
| SEC Registration Number | https://pay.operavaglobal.com | External |
| Social icons | platform URLs | External |

---

## 30. Master Business Information Reference

- **Name:** OPERAVA Global Solutions  
- **Brand:** OPERAVA  
- **Motto:** Operating in Advance.  
- **Type:** Philippine Corporation (SEC 2026080262213-03)  
- **HQ reference:** Pagudpud, Ilocos Norte 2919, Philippines  
- **Model:** Remote-first IT + BPO + workforce  
- **Services:** 8 IT + 8 BPO  
- **Careers:** 3 executive tracks  
- **Emails:** hello@, hr@, cs@, compliance@operavaglobal.com  
- **Legal:** Privacy, Terms, Refund present  
- **Site:** https://www.operavaglobal.com  
- **Pay:** https://pay.operavaglobal.com  

---

## 31. Audit Notes

1. Audit against repository tree and primary sources (App, Navigation, Footer, services/careers data, SEO, legal pages, forms, Cloudinary search).  
2. English canonical content documented; translations exist for ar/de/es/fil/fr/ja/zh.  
3. Refund Policy is large; structure confirmed.  
4. Certification claims in AVA knowledge require verification before marketing use.  
5. No secrets copied.  
6. Follow-ups: fix cloud-services link or add service; expand sitemap; clarify SEC→pay label; reconcile legal entity naming.

---

*End of BUSINESSINFO.md — comprehensive business/content reference for Operava-Website.*
