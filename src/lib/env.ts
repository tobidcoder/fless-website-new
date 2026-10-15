// Public URLs for the Fless platform, set per deployment.
// NEXT_PUBLIC_API_URL: the backend API origin, e.g. https://api.getfless.com
// NEXT_PUBLIC_APP_URL: the customer dashboard origin, e.g. https://app.getfless.com
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN: optional; enables cookieless Plausible analytics for this domain
// NEXT_PUBLIC_PLAUSIBLE_SRC: optional; script URL for a self-hosted Plausible

const trim = (v: string | undefined) => (v ? v.replace(/\/+$/, "") : undefined)

export const API_URL = trim(process.env.NEXT_PUBLIC_API_URL)
export const APP_URL = trim(process.env.NEXT_PUBLIC_APP_URL)
export const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() || undefined
export const PLAUSIBLE_SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC?.trim() || "https://plausible.io/js/script.js"

/**
 * Opens Employee Studio in the dashboard with the description filled in.
 * Without NEXT_PUBLIC_APP_URL there is no dashboard to open, so people join the beta instead.
 */
export function studioUrl(prompt: string): string {
  if (!APP_URL) return `/start?source=build`
  return `${APP_URL}/#/studio?prompt=${encodeURIComponent(prompt)}`
}
