import { MetadataRoute } from 'next'
import { departments } from '@/lib/departments'
import { solutions } from '@/lib/solutions'
import { API_URL } from '@/lib/env'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://getfless.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/ai-employees`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/departments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/industries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/builders`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/docs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/start`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/data-deletion`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  const departmentRoutes: MetadataRoute.Sitemap = departments.map((d) => ({
    url: `${baseUrl}/departments/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const solutionRoutes: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  let employeeRoutes: MetadataRoute.Sitemap = []
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/api/v1/marketplace/public/employees/sitemap-slugs`, {
        next: { revalidate: 3600 },
      })
      if (res.ok) {
        const items: Array<{ slug: string; updatedAt: string }> = await res.json()
        employeeRoutes = items.map((emp) => ({
          url: `${baseUrl}/ai-employees/${emp.slug}`,
          lastModified: new Date(emp.updatedAt),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      }
    } catch {
      // API unreachable: list only the static pages rather than guessing employee URLs.
    }
  }

  return [...staticRoutes, ...departmentRoutes, ...solutionRoutes, ...employeeRoutes]
}
