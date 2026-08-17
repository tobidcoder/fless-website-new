/**
 * Google Form: Fless AI Beta
 * https://docs.google.com/forms/d/e/1FAIpQLSf1WkrCCThMr08FBdMQhh9RHDe0EjnOyFmTpVYA5iaOolj_2Q/viewform
 *
 * Desk checkboxes must match the form options exactly (voice is lowercase).
 */
export const betaGoogleForm = {
  action:
    "https://docs.google.com/forms/d/e/1FAIpQLSf1WkrCCThMr08FBdMQhh9RHDe0EjnOyFmTpVYA5iaOolj_2Q/formResponse",
  entries: {
    name: "entry.1327944591",
    email: "entry.1769534409",
    company: "entry.1490254729",
    role: "entry.1159644757",
    companySize: "entry.1570951164",
    market: "entry.935725187",
    phone: "entry.1741643783",
    desks: "entry.449251063",
    firstJob: "entry.1642381233",
    heard: "entry.868740781",
    industry: "entry.886221062",
  },
}

/** Google Form checkbox labels for “Which desks do you want first?” */
export const googleDeskOptions: Record<string, string> = {
  marketing: "Marketing",
  voice: "voice",
  sales: "Sales",
  support: "Support",
  operations: "Operations",
  finance: "Finance",
  hr: "HR",
}

const allowedDesks = new Set(Object.values(googleDeskOptions))

export type BetaPayload = {
  name: string
  email: string
  company: string
  role: string
  companySize: string
  market: string
  phone: string
  desks: string[]
  firstJob: string
  heard: string
  industry: string
}

export function buildGoogleFormBody(payload: BetaPayload) {
  const { entries } = betaGoogleForm
  const body = new URLSearchParams()
  body.set(entries.name, payload.name)
  body.set(entries.email, payload.email)
  body.set(entries.company, payload.company)
  body.set(entries.role, payload.role)
  body.set(entries.companySize, payload.companySize)
  body.set(entries.market, payload.market)
  body.set(entries.phone, payload.phone)
  const extraDesks = payload.desks.filter((desk) => !allowedDesks.has(desk))
  const firstJob = extraDesks.length
    ? `${payload.firstJob}\n\nAlso: ${extraDesks.join(", ")}`
    : payload.firstJob
  body.set(entries.firstJob, firstJob)
  body.set(entries.industry, payload.industry)
  if (payload.heard) body.set(entries.heard, payload.heard)

  payload.desks.filter((desk) => allowedDesks.has(desk)).forEach((desk) => {
    body.append(entries.desks, desk)
  })

  return body
}

export async function submitBetaToGoogleForm(payload: BetaPayload) {
  const res = await fetch("/api/beta", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    throw new Error("Google Form rejected the submission")
  }
}
