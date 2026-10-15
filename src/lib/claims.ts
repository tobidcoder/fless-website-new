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
