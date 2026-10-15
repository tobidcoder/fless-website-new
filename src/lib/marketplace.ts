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

// ---------- Browse list (/hire, /pricing, department pages) ----------

export interface ListedPrice {
  basis: "monthly" | "annual" | "per_task"
  amountCents: number
  currency: string
  unit: string | null
  annualCents: number | null
}

export interface ListedEmployee {
  id: string
  slug: string
  name: string
  title: string
  department: string
  category: string
  description: string
  avatarUrl: string | null
  authorName: string
  rating: number
  hireCount: number
  languages: string[]
  countries: string[]
  price: ListedPrice | null
}

export interface EmployeeList {
  items: ListedEmployee[]
  total: number
  page: number
  pageSize: number
  /** False when the API could not be reached; pages say so instead of showing an empty list. */
  ok: boolean
}

export const DEPARTMENT_LABELS: Record<string, string> = {
  MARKETING: "Marketing",
  VOICE: "Voice and calls",
  SALES: "Sales",
  SUPPORT: "Customer support",
  RECRUITMENT: "Recruitment",
  OPERATIONS: "Operations",
  FINANCE: "Finance",
  HR: "People and HR",
  CUSTOM: "Other",
}

export async function listEmployees(params: {
  query?: string
  department?: string
  page?: number
  pageSize?: number
} = {}): Promise<EmployeeList> {
  const empty = { items: [], total: 0, page: params.page ?? 1, pageSize: params.pageSize ?? 24 }
  if (!API_URL) return { ...empty, ok: false }
  const qs = new URLSearchParams()
  if (params.query) qs.set("query", params.query)
  if (params.department) qs.set("department", params.department)
  if (params.page) qs.set("page", String(params.page))
  if (params.pageSize) qs.set("pageSize", String(params.pageSize))
  try {
    const res = await fetch(`${API_URL}/api/v1/marketplace/public/employees?${qs.toString()}`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) return { ...empty, ok: false }
    const data = (await res.json()) as Omit<EmployeeList, "ok">
    return { ...data, ok: true }
  } catch {
    return { ...empty, ok: false }
  }
}

/** "$99 / month", "$990 / year", "$2.50 per booked appointment". */
export function formatListedPrice(price: ListedPrice | null): string {
  if (!price) return "Price on request"
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency || "USD",
    maximumFractionDigits: price.amountCents % 100 === 0 ? 0 : 2,
  }).format(price.amountCents / 100)
  if (price.basis === "monthly") return `${amount} / month`
  if (price.basis === "annual") return `${amount} / year`
  return `${amount} per ${price.unit || "task"}`
}

export const PRICE_BASIS_LABEL: Record<ListedPrice["basis"], string> = {
  monthly: "Monthly",
  annual: "Annual",
  per_task: "Per task",
}
