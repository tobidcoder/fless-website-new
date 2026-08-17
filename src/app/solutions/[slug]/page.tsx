import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { solutions, getSolution } from "@/lib/solutions"
import { SolutionPage } from "@/components/SolutionPage"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) return { title: "Solutions — Fless" }
  return {
    title: `${solution.name} — Fless`,
    description: solution.lede,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) notFound()
  return <SolutionPage solution={solution} />
}
