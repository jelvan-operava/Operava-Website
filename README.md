# OPERAVA Global Solutions — Official Web Platform

> **"We Operate in Advance"**  
> Enterprise Digital Engineering, Cloud/DevSecOps Architecture, and 24/7 Global Business Process Outsourcing (BPO).

---

## 🔒 Confidentiality & License Notice

**PROPRIETARY AND CONFIDENTIAL — STRICTLY PRIVATE & ONLY FOR OPERAVA GLOBAL SOLUTIONS.**

Copyright &copy; 2026 OPERAVA Global Solutions. All rights reserved.

This codebase, including all design assets, architectural specifications, proprietary copy, business logic, AVA intelligence models, and source code, is the exclusive intellectual property of **OPERAVA Global Solutions**. 

- Unauthorized copying, reverse-engineering, distribution, public hosting, cloning, or commercial use in whole or in part without express written authorization from OPERAVA Global Solutions executive leadership is strictly prohibited.
- This repository is strictly for authorized OPERAVA personnel, engineering contractors, and designated automated build pipelines.

---

## 🌐 Project Overview & Purpose

The **OPERAVA Web Platform** is an enterprise-grade digital experience presenting OPERAVA's dual capabilities:
1. **High-Velocity Technology & Software Engineering**: Custom web and cloud applications, multi-cloud infrastructure (AWS/GCP/Azure), Kubernetes orchestration, cybersecurity SOC, and AI dataset engineering.
2. **24/7 Global Business Operations & BPO**: Omnichannel customer experience (CX), Tier 1–3 technical support, back-office data processing, KYC/AML compliance, and dedicated engineering squads.
3. **AVA Virtual Intelligence**: Real-time conversational AI assistant powered by Google Gemini and a resilient client-side reasoning engine for direct consultations, qualification, and candidate onboarding.
4. **Multilingual Architecture**: Native 8-language localization (English, Spanish, French, German, Tagalog/Filipino, Arabic, Chinese, Japanese) with automated RTL direction support.

---

## 📁 Repository Structure

```
operava-website/
├── .github/                       # GitHub Actions workflows & CI/CD configs
├── functions/                     # Cloudflare Pages Functions (Edge Serverless)
│   └── api/
│       ├── chat.ts                # Serverless Gemini 3.7 Flash API handler
│       └── health.ts              # Edge health check endpoint
├── public/                        # Static assets served at root
│   ├── _headers                   # Cloudflare security headers & caching rules
│   ├── _redirects                 # Cloudflare SPA fallback routing (/* /index.html 200)
│   ├── robots.txt                 # Search engine crawler policies
│   └── sitemap.xml                # SEO URL structure & priority mappings
├── src/
│   ├── components/                # Modular UI & Layout Components
│   │   ├── AvaAssistant.tsx       # AVA Interactive Virtual Intelligence Drawer
│   │   ├── AvaVideoAvatar.tsx     # Conic-gradient video avatar with glow aura
│   │   ├── DraggableMarquee.tsx   # Interactive horizontal technology marquee
│   │   ├── Footer.tsx             # Enterprise footer with brand video & links
│   │   ├── HangingFeaturesBanner.tsx # Interactive pull-down features banner
│   │   ├── HeroVisual.tsx         # Responsive hero graphic & stats cards
│   │   ├── HomeMediaLoader.tsx    # White-themed pre-flight stream loader
│   │   ├── LanguageSwitcher.tsx   # 8-language dropdown selector
│   │   ├── Navigation.tsx         # Fixed navbar with brand logo & navigation
│   │   ├── PurpleRunningBorderBeam.tsx # SVG perimeter beam animation
│   │   ├── ScrollToTopButton.tsx  # Dynamic floating scroll-to-top button
│   │   ├── Skeleton.tsx           # Route progress bars & loading skeletons
│   │   ├── SmoothScroll.tsx       # Lenis momentum smooth scrolling engine
│   │   ├── StackedPlaybooks.tsx   # Interactive industry playbook cards
│   │   ├── TestimonialsCarousel.tsx # Enterprise client testimonial carousel
│   │   └── TypewriterHero.tsx     # Multi-phrase dynamic typewriter hero headline
│   ├── data/                      # Structured Business Data & Content
│   │   ├── careers.ts             # Active job openings, benefits & hiring stages
│   │   ├── industries.ts          # Vertical solutions (Fintech, Health, SaaS, etc.)
│   │   ├── insights.ts            # Thought leadership articles & whitepapers
│   │   ├── playbooks.ts           # Operational deployment playbooks
│   │   └── services.ts            # Detailed IT & BPO service catalog items
│   ├── hooks/                     # Custom React Hooks
│   │   └── useScrollReveal.ts     # IntersectionObserver reveal animation hook
│   ├── i18n/                      # Internationalization Engine
│   │   ├── LanguageContext.tsx    # React Context & Translation Hook (useTranslation)
│   │   └── translations/          # Localized string dictionaries (en, es, fr, de, fil, ar, zh, ja)
│   ├── pages/                     # Full-Page Route Views
│   │   ├── About.tsx              # Company mission, leadership & certifications
│   │   ├── BPOServices.tsx        # 24/7 BPO operations & support models
│   │   ├── Careers.tsx            # Global career opportunities & application form
│   │   ├── Contact.tsx            # Consultation booking & office contact details
│   │   ├── Home.tsx               # Homepage with hero, capabilities & playbooks
│   │   ├── ITServices.tsx         # Cloud & custom software engineering services
│   │   ├── Industries.tsx         # Enterprise vertical solutions
│   │   ├── Insights.tsx           # Technical insights & market reports
│   │   ├── NotFound.tsx           # Custom 404 error page
│   │   ├── Privacy.tsx            # GDPR & DPA privacy policy
│   │   ├── ServiceDetail.tsx      # Dynamic service detail drilldown view
│   │   └── Terms.tsx              # Terms of service & SLA covenants
│   ├── utils/                     # Helpers & Conversation Engines
│   │   └── avaConversationEngine.ts # Autonomous conversational logic for AVA
│   ├── App.tsx                    # Route definitions, layout wrapper & router
│   ├── index.css                  # Tailwind CSS v4 entrypoint & brand theme tokens
│   ├── main.tsx                   # React 19 application entrypoint
│   └── vite-env.d.ts              # Vite environment typings
├── .env.example                   # Environment variable documentation template
├── .gitignore                     # Git exclusion rules
├── .nvmrc                         # Node.js version pinning (v20)
├── DEPLOYMENT.md                  # Detailed Cloudflare Pages & GitHub deployment guide
├── metadata.json                  # Application platform manifest
├── package.json                   # Dependencies, scripts & engine requirements
├── server.ts                      # Full-stack Express server with Vite middleware
├── tsconfig.json                  # TypeScript compiler configuration
├── vite.config.ts                 # Vite bundler, React plugin & Tailwind v4 setup
└── wrangler.jsonc                 # Cloudflare Pages / Workers project configuration
```

---

## 🎨 AI Developer & Contributor Design System Guide

> **MANDATORY INSTRUCTION FOR ALL AI AGENTS AND FUTURE DEVELOPERS:**  
> When modifying or extending this application, you MUST strictly adhere to the brand guidelines, mathematical spacing rules, color tokens, and anti-slop principles documented below. Never introduce unapproved color schemes, inconsistent fonts, or unsolicited visual paradigms.

### 1. Brand Color Palette & Hex Tokens

| Role | Color Name | Hex Code | Tailwind Utility Class | Usage Context |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Brand** | Royal Violet | `#6D28D9` | `bg-violet-700`, `text-violet-700` | Primary buttons, active tabs, brand accents |
| **Primary Hover** | Deep Violet | `#5B21B6` | `bg-violet-800`, `text-violet-800` | Hover states, active links, emphasized titles |
| **Accent Glow** | Bright Violet | `#7C3AED` | `bg-violet-600`, `text-violet-600` | Badges, glowing border beams, highlight text |
| **Light Tint** | Violet Mist | `#F5F3FF` | `bg-violet-50`, `border-violet-100` | Card background highlights, soft badges |
| **Conic Aura (AVA)** | Electric Violet | `#8A2BE2` | Gradient stop | AVA video avatar conic border & animated glows |
| **Conic Aura (AVA)** | Neon Magenta | `#FF00FF` | Gradient stop | AVA pulse indicator & outer ring reflection |
| **Primary Canvas** | Pure Light White | `#FFFFFF` | `bg-white` | Default page body canvas & light container cards |
| **Neutral Dark** | Obsidian Slate | `#0B0F19` | `bg-gray-950`, `text-gray-950` | Section headers, contrast cards, deep footer |
| **Body Text** | Charcoal | `#1F2937` | `text-gray-800` | Primary readable paragraph copy (min 15–16px) |
| **Muted Text** | Slate Gray | `#4B5563` | `text-gray-600` | Subtitles, helper text, breadcrumbs |
| **Success/SLA** | Emerald Green | `#10B981` | `text-emerald-600`, `bg-emerald-50` | 99.99% uptime badges, active status indicators |

### 2. Typography Rules

- **Font Family**: Primary font is **Inter** (`'Inter', system-ui, -apple-system, sans-serif`).
- **Hierarchy Scale**:
  - `Display / H1`: 36px to 54px, bold (`font-bold` / `font-extrabold`), tracking tight (`tracking-tight`), line height 1.15–1.25.
  - `Section / H2`: 28px to 36px, bold (`font-bold`), tracking tight, line height 1.25–1.3.
  - `Card / H3`: 18px to 22px, semibold (`font-semibold`), line height 1.35–1.4.
  - `Body Copy`: 15px to 16px, regular (`font-normal`), line height 1.6–1.7, constrained width (65–75ch).
  - `Eyebrow / Badge`: 11px to 13px, semibold (`font-semibold`), uppercase, tracking widest (`tracking-wider` or `tracking-widest`).

### 3. Visual Craft & Anti-Slop Principles

- **No Purple-to-Blue Gradients**: Do NOT mix random cyan or blue gradients. Use pure Royal Violet (`#7C3AED`) to Deep Fuchsia (`#C026D3`) or maintain clean solid neutrals.
- **Mathematical Corner Nesting**: Always ensure `Inner Radius = Outer Radius - Distance/Padding`.
- **Button Sizing Rule**: Horizontal padding on buttons must be **2x vertical padding** (e.g. `px-6 py-3` or `px-4 py-2`).
- **Zero Unsolicited Modals or Promotional Banners**: Render functional interfaces immediately without intrusive popups.
- **All Icons From `lucide-react`**: Never embed raw inline SVGs or third-party icon fonts.

### 4. Authoritative Cloudinary Media URLs

| Asset Description | Direct Cloudinary HTTPS URL |
| :--- | :--- |
| **Technology & Cloud Video** | `https://res.cloudinary.com/mgyosgsm/video/upload/Video_otwv5l.mp4` |
| **Global Workforce Video** | `https://res.cloudinary.com/mgyosgsm/video/upload/Video_nmdtfe.mp4` |
| **Business Processes Video** | `https://res.cloudinary.com/mgyosgsm/video/upload/Video_pmorrn.mp4` |
| **OPERAVA Motion Logo Video**| `https://res.cloudinary.com/mgyosgsm/video/upload/Video_ffvnwd.mp4` |
| **AVA Assistant Video Avatar**| `https://res.cloudinary.com/mgyosgsm/video/upload/Video_vpaaxl.mp4` |
| **Hero Cover Graphic** | `https://res.cloudinary.com/sdaxzncs/image/upload/v1786240859/Cover%20Photo.png` |

---

## 🚀 Local Development & Build

### Prerequisites
- Node.js version `20.x` or higher
- npm, pnpm, or bun

```bash
# 1. Clone the private repository
git clone https://github.com/operava/operava-website.git
cd operava-website

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional)
cp .env.example .env
# Edit .env and supply your GEMINI_API_KEY if testing live server-side AI

# 4. Start local development server (hosts on port 3000)
npm run dev

# 5. Run TypeScript typecheck & lint verification
npm run lint

# 6. Build for production
npm run build

# 7. Preview production build locally
npm run preview
```

---

## 🚢 Deployment Guide

For complete, detailed instructions on deploying to **Cloudflare Pages**, configuring custom domains, setting edge variables, and full-stack Docker deployments, refer to:

👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## 📞 Contact & Governance

**OPERAVA Global Solutions**  
- **Website**: [https://operava.com](https://operava.com)  
- **Location**: Philippine-Based, operating remotely and globally  
- **Global Delivery**: North America &bull; Europe &bull; Australia &bull; Asia-Pacific  
- **Enterprise Support**: `contact@operava.com`
