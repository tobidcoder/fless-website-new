import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { departments, getDepartment } from "@/lib/departments"
import { DepartmentPage } from "@/components/DepartmentPage"
import { listEmployees } from "@/lib/marketplace"

export const revalidate = 600

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dept = getDepartment(slug)
  if (!dept) return { title: "Department Desk — Fless" }

  const statusLabel = dept.status === "live" ? "Live" : "Early Access"
  const title = `${dept.name} AI Employee Desk (${statusLabel}) — Fless`
  const description = `${dept.headline} ${dept.lede}`
  const canonical = `https://getfless.com/departments/${dept.slug}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Fless",
      images: [
        {
          url: dept.hero || "/fless-og.png",
          width: 1200,
          height: 630,
          alt: `${dept.name} AI Employee Desk`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [dept.hero || "/fless-og.png"],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const dept = getDepartment(slug)
  if (!dept) notFound()
  const live = await listEmployees({ department: dept.slug.toUpperCase(), pageSize: 6 })
  return <DepartmentPage dept={dept} live={live.items} />
}
