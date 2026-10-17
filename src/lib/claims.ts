// Every public claim about traction, compliance and coverage lives here, so the
// whole site changes together when a number changes.
//
// TODO(owner): confirm each value below before launch. Anything not confirmed
// should be removed from this file (and the pages that read it) rather than guessed.

/** Businesses currently in the pilot programme. TODO(owner): confirm the current count. */
export const PILOT_BUSINESS_COUNT = 18

/** Where the pilot businesses are. TODO(owner): confirm. */
export const PILOT_REGIONS = ["Nigeria", "the UK", "North America"] as const
export const PILOT_REGION_COUNT = PILOT_REGIONS.length
export const PILOT_REGIONS_TEXT = "Nigeria, the UK and North America"

/** e.g. "18 businesses in pilot" */
export const PILOT_LINE = `${PILOT_BUSINESS_COUNT} businesses in pilot`
/** e.g. "18 businesses in pilot across Nigeria, the UK and North America" */
export const PILOT_LINE_LONG = `${PILOT_LINE} across ${PILOT_REGIONS_TEXT}`

/**
 * Social networks the Marketing employee publishes to through the backend's own
 * adapters (official APIs). Keep in step with the backend social adapters.
 */
export const SOCIAL_NETWORKS = ["LinkedIn", "X", "Facebook", "Instagram", "Threads", "Bluesky"] as const
export const SOCIAL_NETWORK_COUNT = SOCIAL_NETWORKS.length
export const SOCIAL_NETWORKS_TEXT = "LinkedIn, X, Facebook, Instagram, Threads and Bluesky"

/** Compliance wording. Do not say "in progress" until an auditor is engaged. */
export const SOC2_STATUS = "SOC 2 planned"
export const SOC2_SENTENCE =
  "A SOC 2 audit is planned. Until then we answer security questionnaires and sign DPAs on request."

/** Enterprise identity and data-location features, tied to the plans that include them. */
export const SSO_LINE = "SSO and audit export on the Business and Enterprise plans"
export const REGION_LINE = "Choice of data region on the Business and Enterprise plans"

/** Ads: no ads platform is connected for publishing yet. */
export const ADS_STATUS = "Ads: coming soon"

/**
 * Channels the owner lists as live today (from the owner's GlobalStats copy on main).
 * TODO(owner): reconcile with SOCIAL_NETWORKS above, which lists six adapters.
 */
export const LIVE_CHANNELS = ["LinkedIn", "X", "Facebook", "Bluesky"] as const
export const LIVE_CHANNEL_COUNT = LIVE_CHANNELS.length
export const LIVE_CHANNELS_TEXT = "LinkedIn, X, Facebook, Bluesky"

/** NVIDIA Inception membership, as stated by the owner on main. TODO(owner): confirm before launch. */
export const NVIDIA_INCEPTION_MEMBER = true

/**
 * Illustrative monthly output per AI employee, used by the workforce estimator on /pricing.
 * From the owner's calculator on main, with unmeasured performance figures (CSAT,
 * error rates, sync rates) removed. TODO(owner): confirm or replace with measured pilot data.
 */
export const DEPARTMENT_CAPACITY_ESTIMATES: Record<string, string> = {
  marketing: "~140 SEO articles and 450 social posts",
  voice: "~1,200 inbound calls handled",
  sales: "~850 inbound leads enriched and 160 meetings booked",
  support: "~3,200 tickets handled across WhatsApp and web",
  recruitment: "~450 candidate profiles scored and 60 screening calls booked",
  operations: "~500 team dispatches, internal Slack escalation and project logs",
  finance: "~700 PDF invoices scanned and synced to your ledger",
  hr: "~90 employee onboarding workflows and handbook answers",
  legal: "~120 contracts triaged and tracked, renewals flagged weeks ahead",
}

/**
 * Typical monthly cost of a human hire per department (USD), for the illustrative
 * comparison in the workforce estimator. TODO(owner): cite a source or remove.
 */
export const HUMAN_BENCHMARK_MONTHLY_USD: Record<string, number> = {
  marketing: 5200,
  voice: 4100,
  sales: 5800,
  support: 3800,
  recruitment: 4900,
  operations: 4600,
  finance: 6200,
  hr: 4200,
  legal: 7500,
}
