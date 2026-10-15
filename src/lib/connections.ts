// Apps a business can connect, generated from the backend catalog
// (scripts/sync-connections.mts -> src/lib/connections.generated.ts).

import { CONNECTIONS } from "@/lib/connections.generated"
export { CONNECTIONS, CATALOG_COMMIT } from "@/lib/connections.generated"

export type ConnectionStatus = "Available" | "Beta" | "Awaiting approval"

export interface Connection {
  id: string
  name: string
  status: ConnectionStatus
  category: string
  summary: string
  actions: number
  /**
   * How Fless reaches the app. Shown only as a small detail, in plain words.
   * Present when the list comes from the capability catalog.
   */
  source?: ConnectionSource
}

export type ConnectionSource = "sign-in" | "connector" | "api" | "website"

export const SOURCE_LABEL: Record<ConnectionSource, string> = {
  "sign-in": "Sign in with the app",
  connector: "Standard connector",
  api: "API connection",
  website: "Website task",
}


export const CONNECTION_STATUS_NOTE: Record<ConnectionStatus, string> = {
  Available: "Generally available. Built on the provider's official API and in production.",
  Beta: "Built and working, still being hardened with pilot customers.",
  "Awaiting approval": "Built, waiting on the provider's app review before businesses can connect.",
}

const CATEGORY_LABELS: Record<string, string> = {
  social: "Social and publishing",
  messaging: "Messaging",
  email: "Email",
  email_marketing: "Email marketing",
  scheduling: "Scheduling",
  video: "Meetings and video",
  ads: "Ads",
  analytics: "Analytics",
  storage: "Files and storage",
  docs: "Docs and workspace",
  team_chat: "Team chat",
  project: "Projects",
  crm: "CRM",
  sales_engagement: "Sales engagement",
  helpdesk: "Help desk",
  accounting: "Accounting",
  payments: "Payments",
  banking: "Banking",
  payroll: "HR and payroll",
  ats: "Recruiting",
  esign: "E-signature",
  legal: "Legal",
  ecommerce: "E-commerce",
  telephony: "Phone and SMS",
  forms: "Forms",
  developer: "Developer",
}

export const categoryLabel = (c: string) => CATEGORY_LABELS[c] ?? c.replace(/_/g, " ")

// Categories ordered by how many connections are generally available, then size.
export const CONNECTION_CATEGORIES = Array.from(new Set(CONNECTIONS.map((c) => c.category))).sort((a, b) => {
  const live = (k: string) => CONNECTIONS.filter((c) => c.category === k && c.status === "Available").length
  const all = (k: string) => CONNECTIONS.filter((c) => c.category === k).length
  return live(b) - live(a) || all(b) - all(a)
})
