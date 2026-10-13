import { API_URL } from "@/lib/env"

// Live marketplace data from the Fless public API. No local fallbacks: when the
// API is unreachable these return an empty list and pages say so.

export interface PublicEmployee {
  id: string
  slug: string
  name: string
  title: string
  department: string
  description: string
  avatarUrl: string | null
  authorName: string
  pricingDisplay: { formattedRate: string }
  status: string
}

const REVALIDATE_SECONDS = 3600

export async function getPublishedSlugs(): Promise<string[]> {
  if (!API_URL) return []
  try {
    const res = await fetch(`${API_URL}/api/v1/marketplace/public/employees/sitemap-slugs`, {
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) return []
    const items = (await res.json()) as Array<{ slug: string }>
    return items.map((i) => i.slug)
  } catch {
    return []
  }
}

export async function getPublicEmployee(slug: string): Promise<PublicEmployee | null> {
  if (!API_URL) return null
  try {
    const res = await fetch(`${API_URL}/api/v1/marketplace/public/employees/${encodeURIComponent(slug)}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    })
    return res.ok ? ((await res.json()) as PublicEmployee) : null
  } catch {
    return null
  }
}

export async function getPublishedEmployees(): Promise<PublicEmployee[]> {
  const slugs = await getPublishedSlugs()
  const employees = await Promise.all(slugs.map(getPublicEmployee))
  return employees.filter((e): e is PublicEmployee => e !== null && e.status === "PUBLISHED")
}
