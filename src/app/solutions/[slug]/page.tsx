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
  if (!solution) return { title: "Playbook — Fless" }

  const title = `${solution.name} Playbook — Fless`
  const description = solution.lede
  const canonical = `https://getfless.com/solutions/${solution.slug}`

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
          url: solution.hero || "/fless-og.png",
          width: 1200,
          height: 630,
          alt: `${solution.name} Playbook`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [solution.hero || "/fless-og.png"],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const solution = getSolution(slug)
  if (!solution) notFound()
  return <SolutionPage solution={solution} />
}
