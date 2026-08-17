import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { departments, getDepartment } from "@/lib/departments"
import { DepartmentPage } from "@/components/DepartmentPage"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dept = getDepartment(slug)
  if (!dept) return { title: "Department — Fless" }
  return {
    title: `${dept.name} — Fless`,
    description: `${dept.line}. ${dept.lede}`,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const dept = getDepartment(slug)
  if (!dept) notFound()
  return <DepartmentPage dept={dept} />
}
