import Script from "next/script"
import { PLAUSIBLE_DOMAIN, PLAUSIBLE_SRC } from "@/lib/env"

/**
 * Privacy-friendly page analytics. Off unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 * Plausible sets no cookies and stores no personal data, so no consent banner is needed.
 * If a tool that sets non-essential cookies is ever added, add a consent banner first.
 */
export function Analytics() {
  if (!PLAUSIBLE_DOMAIN) return null
  return <Script defer data-domain={PLAUSIBLE_DOMAIN} src={PLAUSIBLE_SRC} strategy="afterInteractive" />
}
