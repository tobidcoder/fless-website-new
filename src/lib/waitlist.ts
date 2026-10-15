import { API_URL } from "@/lib/env"

// Website forms post here: POST {API_URL}/api/v1/public/waitlist
// The API must list this site's origin in CORS_ORIGINS.

export type WaitlistRole = "business" | "builder" | "investor"

export interface WaitlistPayload {
  name: string
  email: string
  role: WaitlistRole
  company?: string
  companySize?: string
  market?: string
  phone?: string
  interests?: string[]
  source?: string
  plan?: string
  /** Honeypot; must stay empty. */
  website?: string
}

export function parseRole(value: string | null | undefined): WaitlistRole {
  return value === "builder" || value === "investor" ? value : "business"
}

export class WaitlistError extends Error {
  constructor(message: string, readonly status: number) {
    super(message)
  }
}

export async function joinWaitlist(payload: WaitlistPayload): Promise<void> {
  if (!API_URL) throw new WaitlistError("Sign-ups are not configured on this site.", 0)
  const body: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(payload)) {
    if (Array.isArray(v) ? v.length > 0 : typeof v === "string" ? v.trim() !== "" : v != null) body[k] = v
  }
  let res: Response
  try {
    res = await fetch(`${API_URL}/api/v1/public/waitlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    throw new WaitlistError("We couldn’t reach Fless. Check your connection and try again.", 0)
  }
  if (res.ok) return
  if (res.status === 429) throw new WaitlistError("Too many attempts. Please wait a few minutes and try again.", 429)
  if (res.status === 400) throw new WaitlistError("Check your name and email address and try again.", 400)
  throw new WaitlistError("We couldn’t send that just now. Please try again.", res.status)
}
