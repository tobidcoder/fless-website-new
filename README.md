# Fless website

The marketing site for Fless (getfless.com): home, marketplace browse (`/hire`), "build your own" landing (`/build`), builders programme, pricing, help centre (`/docs`), department and solution pages, investors, legal pages and the sign-up forms.

Next.js 15 (App Router, Turbopack), React 19, Tailwind CSS 4, next-intl.

## Setup

```bash
npm install
cp .env.example .env.local   # or create it; see the variables below
npm run dev                  # http://localhost:3000
```

Node 20 or newer.

## Environment variables

All are public (`NEXT_PUBLIC_*`) and read in `src/lib/env.ts`.

| Variable | Required | What it does |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes in production | Fless API origin, e.g. `https://api.getfless.com`. Used for marketplace data (`/hire`, `/pricing`, employee pages, sitemap) and the sign-up forms. Without it, those pages say live data is unavailable and forms show an error. |
| `NEXT_PUBLIC_APP_URL` | Yes in production | Dashboard origin, e.g. `https://app.getfless.com`. "Log in" goes to `${APP_URL}/login`; the `/build` prompt box opens `${APP_URL}/#/studio?prompt=<text>`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Turns on Plausible analytics for this domain. Plausible is cookieless, so no consent banner is shown. |
| `NEXT_PUBLIC_PLAUSIBLE_SRC` | No | Script URL for a self-hosted Plausible. Defaults to `https://plausible.io/js/script.js`. |

The API must allow this site's origin in its `CORS_ORIGINS`, because the forms post from the browser.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (also type-checks and lints) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

### Syncing the app list from the backend

`src/lib/connections.generated.ts` (the apps employees can connect to) is generated from the backend catalog. From a checkout of `backend-employees` with dependencies installed:

```bash
cd ../backend-employees
OUT=../fless-website-new/src/lib/connections.generated.ts \
  node --import tsx ../fless-website-new/scripts/sync-connections.mts
```

The script uses the backend's capability catalog (`CAPABILITY_CATALOG`, covering sign-in apps, standard connectors, API connections and website tasks) when it exists, and otherwise the package catalog (`PACKAGE_CATALOG`). Set `CAPABILITY_CATALOG_MODULE` to point at the catalog module if it lives somewhere unusual.

## Where things live

| Path | What |
|---|---|
| `src/lib/claims.ts` | Every public claim (pilot count, regions, social networks, SOC 2 wording). Change numbers here only. |
| `src/lib/billing.ts` | Plans, regional price lists, currencies, the single billing statement, builder share. |
| `src/lib/marketplace.ts` | Calls to the public marketplace API. |
| `src/lib/waitlist.ts` | Sign-up form client: `POST /api/v1/public/waitlist` with role `business`, `builder` or `investor`. |
| `src/i18n/`, `messages/*.json` | Translations. English is the default; French and Portuguese cover the header, footer, home hero and pricing, and everything else falls back to English. The language is kept in the `NEXT_LOCALE` cookie (falling back to the browser's language). |
| `docs/WEBSITE_AUDIT.md` | Audit history and open to-dos. |

## Forms

`/start` (business, builder or investor, chosen with `?role=`), the builders application on `/builders#apply`, and the contact form on `/contact` all post to the Fless API waitlist. The email boxes in the hero and footer pass the address on to `/start`. The sign-ups are listed in the admin console (`GET /api/v1/admin/waitlist`).
