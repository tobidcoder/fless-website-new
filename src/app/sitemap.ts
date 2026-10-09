import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://getfless.com'
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/departments`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/builders`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/solutions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  let employeeRoutes: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${backendUrl}/api/v1/marketplace/public/employees/sitemap-slugs`, {
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
  } catch (_err) {
    // Fallback static slugs
    const fallbackSlugs = ['mkt-manager', 'voice-receptionist', 'sales-rep', 'sup-customer', 'fin-manager']
    employeeRoutes = fallbackSlugs.map((slug) => ({
      url: `${baseUrl}/ai-employees/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  }

  return [...staticRoutes, ...employeeRoutes]
}
