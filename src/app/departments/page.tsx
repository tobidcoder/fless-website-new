import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PhotoTile } from "@/components/BrandedStage"
import { DepartmentShowcases } from "@/components/DepartmentShowcases"
import { departments } from "@/lib/departments"

export const metadata: Metadata = {
  title: "AI Employee Departments & Desks — Fless",
  description:
    "Explore the 9 Fless AI employee desks: Marketing (live today), Voice, Sales, Support, Operations, Finance, Recruitment, HR, and Legal (early access).",
  alternates: {
    canonical: "https://getfless.com/departments",
  },
  openGraph: {
    title: "AI Employee Departments & Desks — Fless",
    description:
      "Explore the 9 Fless AI employee desks: Marketing (live today), Voice, Sales, Support, Operations, Finance, Recruitment, HR, and Legal (early access).",
    url: "https://getfless.com/departments",
    siteName: "Fless",
    images: [
      {
        url: "/fless-og.png",
        width: 1200,
        height: 630,
        alt: "Fless Departments & Desks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Employee Departments & Desks — Fless",
    description:
      "Explore the 9 Fless AI employee desks: Marketing (live today), plus 8 desks on the early access roadmap.",
    images: ["/fless-og.png"],
  },
}

const departmentListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Fless AI Employee Departments",
  description: "Directory of autonomous AI employee departments offered by Fless.",
  itemListElement: departments.map((d, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${d.name} Desk`,
    description: `${d.line}. ${d.lede}`,
    url: `https://getfless.com/departments/${d.slug}`,
  })),
}

export default function DepartmentsDirectoryPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(departmentListSchema) }}
      />
      <Header activePage="departments" />

      <main className="flex-1 pt-24 md:pt-32 pb-24">
        <section className="max-w-[1200px] mx-auto px-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Autonomous Desks
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground leading-[1.12] mb-4">
              AI employees for every operational desk.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Marketing is live today with multi-channel publishing and human approval gates. The remaining eight departments are in early access with pilot teams.
            </p>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => (
              <article key={dept.slug} className="group flex flex-col justify-between">
                <div>
                  <Link href={`/departments/${dept.slug}`} className="block mb-4">
                    <PhotoTile
                      image={dept.hero}
                      alt={dept.heroAlt}
                      title={dept.name}
                      subtitle={dept.line}
                      status={dept.status}
                      className="aspect-[4/5] rounded-2xl"
                    />
                  </Link>

                  <div className="space-y-1.5 px-0.5">
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-foreground">
                        <Link href={`/departments/${dept.slug}`} className="hover:text-primary transition-colors">
                          {dept.name}
                        </Link>
                      </h2>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                          dept.status === "live"
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-secondary text-muted-foreground border border-border/60"
                        }`}
                      >
                        {dept.status === "live" ? "Live today" : "Early access"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {dept.lede}
                    </p>
                  </div>
                </div>

                <div className="pt-4 px-0.5">
                  <Link
                    href={`/departments/${dept.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    View {dept.name} Desk <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-20">
          <DepartmentShowcases />
        </div>

        {/* PILOT CALLOUT BANNER */}
        <section className="max-w-[1200px] mx-auto px-6 mt-20">
          <div className="p-8 md:p-12 rounded-3xl bg-card border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> Pilot Program
              </div>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                Deploy Marketing today or request early access
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Join 18 businesses piloting Fless AI employees. Full audit log, strict policy gates, and human approval before every publication.
              </p>
            </div>
            <Link
              href="/start"
              className="inline-flex h-11 items-center justify-center px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shrink-0"
            >
              Join the beta
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
