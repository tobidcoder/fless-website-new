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
