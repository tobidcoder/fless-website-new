# Fless website audit (October 2026)

A page-by-page review of getfless.com, written in plain language. The question it answers: **can a business owner, a builder, or an investor understand what Fless does within a few seconds, on any screen?**

Each finding is marked as **Fixed** (done on this branch) or **To do** (needs a decision, content or assets from the team).

---

## 1. The 10-second test

**What a first-time visitor saw before:**
"AI Employees for every part of your business," followed by a list of eight department names.

**The problem:** the headline names a category but doesn't say what happens. A visitor can't tell whether Fless is a chatbot, an agency or software, or whether it's safe to let it act for them. Investors had no page of their own, and builders were one link among six in the menu.

**Fixed:**
- **New headline:** "AI employees that do the work. You approve what ships." It covers what Fless does and the main worry (control) in eight words.
- **New one-line explanation:** "Fless lets any business hire AI employees by department. They plan, write and publish real work, and a person on your team signs off first. Marketing is live today; seven more departments are in early access."
- **Three quick facts under the sign-up box:** Marketing live today · you approve before anything goes out · pay in USD, GBP, NGN and 5 more currencies.
- **Direct paths for each audience in the hero:** "How it works →", "I'm a builder →", "I'm an investor →".

## 2. Speaking to all three audiences

| Audience | What they need to know | Before | Now |
|---|---|---|---|
| **Businesses** | What it does, is it safe, what it costs, does it work in my country | Spread across many sections. Price only on the pricing page. | "One platform. Three ways in." cards near the top, plus a business FAQ covering cost, approvals, currencies and data |
| **Builders** | What I build, how I get paid, how to start | Shouty all-caps hero full of jargon ("typed manifests", "hermetic sandbox") | Plain hero: "Build an AI employee once. Earn every month it works." The 35% split is explained in one sentence. Builder FAQ added. |
| **Investors & accelerators** | Stage, traction, business model, how to get in touch | **No page existed.** "About Fless" in the footer linked to the enterprise sales form. | New **/investors** page: snapshot, problem / product / why us, business model, done vs next milestones, and "Request the deck" and accelerator contact buttons. Investor FAQ added. |

Everything on the investors page comes from claims already on the site: 18 pilots, 3 regions, NVIDIA Inception, the 35/65 split, Marketing from about $1,600 a month, 8 currencies, SOC 2 in progress. Nothing new was invented, such as round size, valuation, revenue or team.

## 3. Mobile (phones and tablets)

Every page was tested at 320px (small phone), 375px (iPhone), 768px (tablet) and 1440px (desktop).

| Issue | Where | Status |
|---|---|---|
| Page was wider than the screen, so it wobbled sideways when scrolled | Home ("Try it" block), every Solutions page, every Department page | **Fixed.** The cause was grids without a single-column phone layout; this is now set across all 65 grids. No page overflows at any tested width. |
| The homepage was extremely long on phones (21,800px, about 26 screens) | Home | **Fixed.** Now 16,300px. The eight-department deep dive moved to /departments, where it belongs, and "How it works" became a compact numbered list on phones. |
| Menu button was the word "Menu", and the menu was missing Builders, Docs and Contact | Header | **Fixed.** Standard ☰ / ✕ icon, full-height menu, large tap targets, every main page listed, and "Log in" and "Join the beta" buttons at the bottom. The page behind no longer scrolls while the menu is open. |
| Inconsistent side margins | Site-wide | **Fixed** on the sections touched: 20px on phones, 24px from tablet up. |

## 4. Clarity and consistency

| Finding | Status |
|---|---|
| All-caps headlines on Pricing and Builders read as shouting and are slower to read | **Fixed.** Pricing now reads "Pay for the work, not for seats." with a plain explanation underneath. |
| Stats strip used "NVIDIA" as a number and "8 departments on roadmap" (which sounds like none are live) | **Fixed.** Now: 18 businesses in pilot · 4 social channels live · 8 departments (1 live, 7 early access) · 3 regions. |
| Footer labels didn't match page names ("Accounts Payable" opened Finance, "Zero-Secret Vault" opened Security, "Operations & Ops") | **Fixed.** Labels now match the pages. Investors & Accelerators and FAQ links added. "Cancellation Terms" was listed twice; one removed. |
| Homepage showed the departments twice (a grid, then four large sections) | **Fixed.** One grid on the homepage; the full showcase lives on /departments. |
| FAQ had only 3 security questions | **Fixed.** New FAQ with Businesses / Builders / Investors tabs (15 questions), linked from the footer at /#faq. |
| Sticky "Join" bar said "A lot of teams want in · we'll reach out" (vague) | **Fixed.** Now "Marketing employee live · no card needed". |

## 5. Search and sharing

| Finding | Status |
|---|---|
| **The social share image was missing.** Every page pointed to `/fless-og.png`, but the file didn't exist, so links shared on LinkedIn, X or WhatsApp showed no preview image. | **Fixed.** Added a branded 1200×630 image. |
| Page title and description used jargon ("Infrastructure for AI Employees", "multi-currency billing") | **Fixed.** Now: "Fless — AI employees that do the work", with a plain description. |
| /investors not in the sitemap | **Fixed.** |

## 6. To do (needs the team)

1. **Replace stock photos.** About 78 different images are hot-linked from Unsplash: generic offices and handshakes. They load slowly, can disappear if Unsplash changes the URLs, and make Fless look like a template. Swap them for real product screenshots, self-hosted in `/public`.
2. **Show real customer proof.** "Customer case studies will publish as cohorts conclude" appears in several places. Even one named quote, or an anonymised result such as "posts per week went from 2 to 9", would do more than any design change.
3. **Add the team.** Investors back people. Add founder names, photos and one-line backgrounds to /investors, plus LinkedIn links.
4. **Confirm the investor email.** The buttons currently email hello@getfless.com with a pre-filled subject. Switch to investors@ if you set one up.
5. **Check the "18 businesses" number.** It appears in more than 50 places. Move it into one shared constant so it stays consistent when it changes.
6. **Typos and jargon in /docs.** The docs page (2,700 lines) wasn't rewritten here. It's aimed at developers, but its intro should start with one plain sentence on what the SDK is.
7. **SecurityFaq overlaps the new FAQ.** "How is our data used?" now appears in both. Consider trimming the security section to its credentials list only.
8. **Unused components.** `ProblemSolution`, `FeaturesBento`, `WorkflowVisualizer`, `DashboardShowcase`, `NetworkDiagram`, `CommandPalette` and `Pricing` aren't used anywhere. Delete them to keep the codebase lean.

## 7. Homepage order (after)

1. Hero: what it is, the main worry answered, and paths for each audience
2. Stats strip
3. **"One platform. Three ways in."** (Businesses / Builders / Investors)
4. Pilot sectors marquee
5. Command centre product view
6. Try it (type a brief)
7. How it works (4 steps)
8. Departments grid
9. Solutions by size and industry
10. Integrations
11. "Not another dashboard"
12. Early validation (pilots)
13. Security
14. **FAQ by audience**
15. Footer

## 8. Builder page and docs (second pass)

| Finding | Status |
|---|---|
| Docs read like a legal document: dense paragraphs, coloured icon tiles on every line, small grey text | **Fixed.** Rebuilt /docs as a text-first reference: plain sidebar, 720px reading width, 16–18px body text, generous spacing, no decorative icons. Tables become stacked cards on phones. |
| Builder page used AI-style icon chips and badges everywhere | **Fixed.** Removed all decorative icons; layout now relies on type, spacing and thin rules. |
| Package and plugin lists were short and differed between pages | **Fixed.** One catalog (`src/lib/sdk.ts`) feeds both pages: 3 core packages and 14 plugins, each marked Live, Beta or Planned. |
| The example employee was thin (no skills, knowledge, approvals or agents) | **Fixed.** The example now covers target market, packages, capabilities, tools, skills with triggers and steps, knowledge, agents, orchestration, approval gates, pricing and limits, with a plain-English guide to each block. |
| CLI and field names contradicted each other (`publish` vs `submit`, `systemPrompt` vs `systemInstructions`, `countries` vs `targetMarket`) | **Fixed.** One spelling everywhere. |
| Footer links such as /docs#quickstart always opened the intro | **Fixed.** Docs pages follow the URL, and old links are redirected to their new sections. |

**Third pass: cross-checked against `getfless/backend-employees`.**
- Removed every mention of Buffer. The backend connects directly to official APIs: Meta Graph (Facebook, Instagram, WhatsApp, Meta Ads), X API v2, LinkedIn, Bluesky (AT Protocol), Google (Gmail, Calendar, YouTube, Business Profile, Ads), Microsoft Graph (Outlook Calendar, Teams) and Zoom.
- The website now lists 22 connections: 17 **Available** (built in the backend) and 5 **Rolling out** (Threads, Calendly, Stripe, Google Workspace Drive/Docs/Sheets and Microsoft 365 Outlook mail/OneDrive/Excel).
- Packages, tool IDs and parameters now match `packages/contracts/src/package-manifest.ts` and `packages/package-adapters`. 10 packages: meta, linkedin, whatsapp, mail, google-calendar, voice, crm, slack, documents and custom-api.
- The example employee uses the real `EmployeeManifest` fields: `policies`, `workflows`, `settingsSchema`, `evaluationScenarios`, top-level `countries`/`industries`/`languages` and the real pricing fields.
- There is no `@fless/cli` package, so the CLI was replaced with the real builder API (`/api/v1/builder/...`).
- Marketing publishes directly to 5 networks (LinkedIn, X, Facebook, Instagram, Bluesky). Site-wide counts were updated from 4 to 5.

## 9. Launch pass: no fake data

Removed from the website:
- Invented activity cards, "Fless · Live" browser chrome and pulsing "live" dots layered over stock photos (BrandedStage, PhotoTile)
- The scripted hotspot replies on the hero screenshot (IntroFilm); the real product screenshot stays
- The "Simulated preview · multi-desk" feed, the "Sample workspace" chat, and the invented department dashboards (names, pipeline values, invoices)
- The "Try it" demo, which returned canned answers whatever you typed
- Invented "human benchmark" savings, capacity claims (e.g. "99.4% CSAT") and hardcoded exchange rates on the pricing page
- The fake fallback employee profile and fallback sitemap slugs used when the API was unreachable
- Hardcoded prices in copy, metadata and structured data
- All ads connections (no ads API is called in the backend) and any Buffer reference
- Unused mock components

Now real:
- **Pricing** loads every published employee and its listed price from `GET /api/v1/marketplace/public/employees/*`, refreshed hourly. If the API is unreachable it says so instead of showing numbers.
- **Employee profiles and the sitemap** come only from the same API.
- **Log in** goes to the customer dashboard when `NEXT_PUBLIC_APP_URL` is set.
- **Connections** are marked Available only where the backend really connects and acts. Anything that only signs in, or is still being built, is marked Rolling out.

Required environment variables in production:
- `NEXT_PUBLIC_API_URL`: backend origin, e.g. https://api.getfless.com
- `NEXT_PUBLIC_APP_URL`: dashboard origin, e.g. https://app.getfless.com

## 10. Connections generated from the backend catalog

The connection list is no longer written by hand. `scripts/sync-connections.mts` reads `PACKAGE_CATALOG` from `getfless/backend-employees` and writes `src/lib/connections.generated.ts`. The first run listed 176 connections: 19 Available (GA), 150 Beta and 7 Awaiting provider approval. Unofficial partner integrations are excluded. Re-run the script whenever the backend catalog changes.

## 11. Re-architecture pass (October 2026): Studio, three-part pricing, real forms

The site now sells the approved model: businesses hire employees made by builders **or build their own in Studio**; builders describe, test and publish with no code.

**Removed (D19, D20)**
- The developer SDK story: `src/lib/sdk.ts`, `CodeView`, the code tabs and manifest anatomy on /builders, the SDK reference on /docs, the "Plugins", "SDK Overview" and "Request SDK access" footer links, and every "SDK", "plugin", "TypeScript file" and "npm install" mention. The app-catalog types moved to `src/lib/connections.ts`.
- Google Form forwarding: `src/app/api/beta/route.ts` and `src/lib/betaForm.ts`.
- The tenure discount table, "model use included" copy, and hourly or multi-year hire wording.

**New and changed pages**
- **/builders**: "Describe it. Test it. Publish it. Earn every month it works." Shows the Studio chat flow (describe, questions, test live, publish privately or to the marketplace), builders keep 70%, payouts through Stripe and Paystack, review before the marketplace, automatic sales pages and referral links, reusable and sellable skills, a builder FAQ and a builder application form (role=builder).
- **/docs** is now a help centre with no code: getting started, hiring, connecting apps (apps with sign-in, apps that connect through a standard connector, websites on approved sites, any API), approvals (Off, Ask first, Automatic), workspace limits, activity log, building in Studio, skills, publishing and review, pricing and credits, payouts, hosting (Fless Cloud, Private Cloud, your own servers), and security. Old `/docs#…` anchors are mapped to the new sections.
- **/pricing** has three parts: the plans table (Free $0, Starter $39, Growth $149, Business $499, Enterprise custom; $5/$20/$100/$400 of included credits; key limits), live marketplace employee prices labelled monthly, annual or per task, and work credits explained (what uses them, the spending cap, bringing your own model key). It adds a currency switcher with local price lists in NGN, GHS, KES and ZAR plus USD, GBP and EUR, a monthly or annual toggle (2 months free), and the calculator the FAQ promised (plan + employees + estimated credits).
- **/hire** (new): marketplace browse page with search, category filters and paging, using the new public `GET /api/v1/marketplace/public/employees` (PUBLISHED only, minimal fields).
- **/build** (new): "Build an AI employee for your business in minutes", with a prompt box that opens `${NEXT_PUBLIC_APP_URL}/#/studio?prompt=<text>`.
- **Department pages** are now categories. They show live published employees from the API first, then the old roles relabelled as "Examples". The persona names and stock-photo faces were removed.
- **Header**: Hire, Build, Categories, Solutions, Pricing, Builders, Help, plus a language switcher. **Footer**: the link columns were rebuilt around the new pages.

**Forms**: /start (role=business|builder|investor, chosen in the form or with `?role=`), the builder application and the new contact form post to `POST /api/v1/public/waitlist`, which is rate limited, validates email and has a honeypot. Staff see sign-ups at `GET /api/v1/admin/waitlist`. The hero and footer email boxes hand over to /start.

**Claims**
- Pilot count, regions, social networks and SOC 2 wording now live in one place, `src/lib/claims.ts`, with TODO(owner) notes to confirm them. "18 businesses" is no longer hard-coded anywhere else.
- SOC 2 now reads "planned", not "in progress". SSO and data region are now "Business and Enterprise plans"; SAML and "private region" wording was removed. Ads now read "coming soon". The network count is 6 everywhere, matching LinkedIn, X, Facebook, Instagram, Threads and Bluesky.
- There is one billing statement, `BILLING_STATEMENT` in `src/lib/billing.ts`, used on pricing, docs, FAQ and solutions. This replaces the three conflicting statements (USD-only invoicing, "8 currencies with local invoices", and "USD converted at invoice date"). AED was dropped.

**Analytics and consent**: Plausible loads only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set. It is cookieless, and the only cookie the site sets is the `NEXT_LOCALE` language preference, so there is no consent banner. Add one before adding any tool that sets non-essential cookies.

**Translations**: next-intl 4.14.9 is pinned. English is the default. French and Portuguese cover the header, footer, home hero and pricing, and other text falls back to English. The language comes from the `NEXT_LOCALE` cookie set by the switcher, falling back to Accept-Language. Because of this, pages render per request; marketplace data is still cached for 10 minutes.

**Catalog sync**: `scripts/sync-connections.mts` reads the backend capability catalog (`CAPABILITY_CATALOG`, covering sign-in apps, standard connectors, API connections and website tasks) when it exists, and otherwise the package catalog as before.

**Still to do (owner)**
1. Confirm every value in `src/lib/claims.ts` and the plan and regional prices in `src/lib/billing.ts` (proposals from the plan).
2. Add the site origin to the API's `CORS_ORIGINS` so the forms work in production.
3. Translate the remaining pages into French and Portuguese (Arabic next, which needs right-to-left layout).
4. Re-run the catalog sync once the backend capability catalog lands. The committed list predates it.
5. Earlier to-dos still stand: replace stock photos, add customer proof, and add the team.
