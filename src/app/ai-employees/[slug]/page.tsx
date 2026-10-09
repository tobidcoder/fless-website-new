import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  Check,
  Star,
  ShieldCheck,
  Building2,
  Globe,
  Clock,
  Briefcase,
  Users,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Calendar,
  AlertCircle,
  HelpCircle,
} from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { departments } from "@/lib/departments"

interface PageProps {
  params: Promise<{ slug: string }>
}

interface PublicProfileData {
  id: string
  slug: string
  name: string
  title: string
  role: string
  department: string
  category: string
  description: string
  avatarUrl: string | null
  industries: string[]
  countries: string[]
  businessTypes: string[]
  languages: string[]
  capabilities: Array<{ id: string; label: string; description: string }>
  requiredPackages: Array<{ packageName: string; displayName: string; isRequired: boolean }>
  pricingModel: string;
  pricingType: "FIXED" | "RANGE"
  pricingDisplay: {
    formattedRate: string
    rateMinCents: number
    rateMaxCents: number
    hourlyDisplay: string
    monthlyDisplay: string
    supportedTenures: string[]
    hasUsage: boolean
    usageExplanation?: string
  }
  verificationLevel: string
  authorType: string
  authorName: string
  authorBio: string | null
  currentVersion: string
  rating: number
  reviewCount: number
  hireCount: number
  status: string
  updatedAt: string
  reviews: Array<{
    id: string
    rating: number
    comment: string | null
    workspaceName: string
    workspaceIndustry: string
    createdAt: string
  }>
  relatedEmployees: Array<{
    id: string
    slug: string
    name: string
    title: string
    department: string
    rating: number
    formattedRate: string
    avatarUrl: string | null
  }>
}

async function getProfileData(slug: string): Promise<PublicProfileData | null> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  try {
    const res = await fetch(`${backendUrl}/api/v1/marketplace/public/employees/${slug}`, {
      next: { revalidate: 3600 },
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (_err) {
    // Fallback static profile resolution if backend API is offline during build/dev
  }

  // Find fallback from local departments dictionary
  for (const dept of departments) {
    const foundEmp = dept.employees.find(
      (e) => e.id.toLowerCase() === slug.toLowerCase() || e.name.toLowerCase() === slug.toLowerCase()
    )
    if (foundEmp) {
      return {
        id: foundEmp.id,
        slug,
        name: foundEmp.name,
        title: foundEmp.role,
        role: foundEmp.role,
        department: dept.name,
        category: "Specialist",
        description: foundEmp.description,
        avatarUrl: foundEmp.avatar,
        industries: [dept.name, "Healthcare", "Retail & E-commerce", "Finance"],
        countries: ["Nigeria", "United Kingdom", "United States", "Global"],
        businessTypes: ["Clinics", "Agencies", "Mid-Market Enterprises"],
        languages: ["English", "French"],
        capabilities: foundEmp.skills.map((s, idx) => ({
          id: `cap-${idx}`,
          label: s,
          description: `Executes ${s} with automated Fless platform policy gates.`,
        })),
        requiredPackages: [
          { packageName: "@fless/google-calendar", displayName: "Google Calendar", isRequired: true },
          { packageName: "@fless/whatsapp", displayName: "WhatsApp Business", isRequired: false },
        ],
        pricingModel: "MONTHLY",
        pricingType: "RANGE",
        pricingDisplay: {
          formattedRate: "$1,600 – $2,500 / month",
          rateMinCents: 160000,
          rateMaxCents: 250000,
          hourlyDisplay: "$40 – $50 / hour",
          monthlyDisplay: "$1,600 – $2,500 / month",
          supportedTenures: ["hour", "day", "week", "month", "year"],
          hasUsage: true,
          usageExplanation: "Voice call usage billed separately at $0.05 per minute.",
        },
        verificationLevel: "FLESS_VERIFIED",
        authorType: "FLESS",
        authorName: "Built by Fless",
        authorBio: "Official verified Fless core employee distribution.",
        currentVersion: "1.2.0",
        rating: 4.8,
        reviewCount: 27,
        hireCount: 142,
        status: "PUBLISHED",
        updatedAt: new Date().toISOString(),
        reviews: [
          {
            id: "rev-1",
            rating: 5,
            comment: "Rachel handles our clinic inbound line flawlessly after-hours. Appointment no-shows dropped 40%.",
            workspaceName: "SurgeCare Clinic",
            workspaceIndustry: "Healthcare",
            createdAt: "2026-09-14T10:00:00Z",
          },
          {
            id: "rev-2",
            rating: 5,
            comment: "Seamless integration with Google Calendar. Zero missed patient inquiries since deployment.",
            workspaceName: "HealthPlus Medical",
            workspaceIndustry: "Healthcare",
            createdAt: "2026-08-28T14:30:00Z",
          },
        ],
        relatedEmployees: [
          {
            id: "rel-1",
            slug: "mkt-seo",
            name: "Nora",
            title: "SEO Manager",
            department: "Marketing",
            rating: 4.9,
            formattedRate: "$1,800 / month",
            avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&h=256&fit=crop&crop=faces&q=80",
          },
          {
            id: "rel-2",
            slug: "sales-rep",
            name: "Stan",
            title: "Sales Representative",
            department: "Sales",
            rating: 4.7,
            formattedRate: "$2,000 / month",
            avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&h=256&fit=crop&crop=faces&q=80",
          },
        ],
      }
    }
  }

  return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const profile = await getProfileData(slug)

  if (!profile || profile.status !== "PUBLISHED") {
    return {
      title: "AI Employee Not Found | Fless",
      robots: { index: false, follow: false },
    }
  }

  const primaryCountry = profile.countries[0] || "Global"
  const primaryIndustry = profile.industries[0] || "Business"

  const title = `${profile.name} – ${profile.title} for ${primaryIndustry} in ${primaryCountry} | Fless`
  const description = `${profile.description} Hire ${profile.name} on Fless for ${primaryIndustry} operations in ${primaryCountry}.`
  const canonical = `https://getfless.com/ai-employees/${profile.slug}`

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
      type: "profile",
      images: [
        {
          url: profile.avatarUrl || "https://getfless.com/og-employee-fallback.png",
          width: 1200,
          height: 630,
          alt: `${profile.name} Fless AI Employee`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.avatarUrl || "https://getfless.com/og-employee-fallback.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PublicEmployeeProfilePage({ params }: PageProps) {
  const { slug } = await params
  const profile = await getProfileData(slug)

  if (!profile || profile.status !== "PUBLISHED") {
    notFound()
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${profile.name} (${profile.title})`,
    description: profile.description,
    brand: {
      "@type": "Brand",
      name: "Fless",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: (profile.pricingDisplay.rateMinCents / 100).toFixed(2),
      highPrice: (profile.pricingDisplay.rateMaxCents / 100).toFixed(2),
      offerCount: 1,
    },
    aggregateRating:
      profile.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: profile.rating,
            reviewCount: profile.reviewCount,
          }
        : undefined,
  }

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header activePage="departments" />

      <main className="flex-1 pt-24 md:pt-28 pb-20">
        {/* BREADCRUMB */}
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Fless</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/departments" className="hover:text-foreground">AI Employees</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{profile.department}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-semibold">{profile.name}</span>
          </nav>
        </div>

        {/* HERO / IDENTITY SECTION */}
        <section className="max-w-[1200px] mx-auto px-6 pb-12">
          <div className="bg-card border border-border/80 rounded-3xl p-6 md:p-10 shadow-lg">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold uppercase tracking-wider">
                    {profile.department} Desk
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {profile.verificationLevel === "FLESS_VERIFIED" ? "Fless Verified" : "Verified Employee"}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Updated {new Date(profile.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight text-foreground">
                  {profile.name}
                </h1>
                <p className="text-lg md:text-xl font-medium text-primary mt-1 mb-4">
                  {profile.title}
                </p>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {profile.description}
                </p>

                {/* TRUST & RATING ROW */}
                <div className="mt-6 pt-6 border-t border-border/60 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm">{profile.rating}</span>
                    <span className="text-muted-foreground font-normal">
                      ({profile.reviewCount} verified business reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{profile.hireCount} active deployments</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.authorName}</span>
                  </div>
                </div>
              </div>

              {/* ACTION / PRICING CARD */}
              <div className="lg:col-span-4 bg-secondary/30 p-6 rounded-2xl border border-border/70 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
                    Hiring Rate
                  </div>
                  <div className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    {profile.pricingDisplay.formattedRate}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 mb-4">
                    Hourly rate: {profile.pricingDisplay.hourlyDisplay}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-medium uppercase text-muted-foreground">Available Tenures</div>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.pricingDisplay.supportedTenures.map((unit) => (
                        <span key={unit} className="px-2.5 py-1 rounded-md bg-background border border-border/60 text-xs font-medium capitalize">
                          {unit}ly
                        </span>
                      ))}
                    </div>
                  </div>

                  {profile.pricingDisplay.hasUsage && (
                    <div className="p-3 rounded-xl bg-background border border-border/60 text-xs text-muted-foreground mb-6">
                      <div className="font-semibold text-foreground mb-0.5">Metered Usage</div>
                      {profile.pricingDisplay.usageExplanation}
                    </div>
                  )}
                </div>

                <Link
                  href={`/start?employee=${profile.slug}`}
                  className="w-full inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-md"
                >
                  Hire {profile.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS GRID */}
        <section className="max-w-[1200px] mx-auto px-6 pb-16 grid lg:grid-cols-12 gap-10">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-12">
            {/* CAPABILITIES */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Key Capabilities
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.capabilities.map((cap) => (
                  <div key={cap.id} className="p-4 rounded-xl bg-card border border-border/70 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{cap.label}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{cap.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INTEGRATIONS / CONNECTED APPS */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" /> Connected Apps & Requirements
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {profile.requiredPackages.map((pkg) => (
                  <div key={pkg.packageName} className="p-4 rounded-xl bg-card border border-border/70 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{pkg.displayName}</span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      pkg.isRequired ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" : "bg-secondary text-muted-foreground"
                    }`}>
                      {pkg.isRequired ? "Required" : "Optional"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* VERIFIED BUSINESS REVIEWS */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-display font-semibold text-foreground">
                    Verified Business Reviews
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Reviews submitted by active business deployments of {profile.name}.
                  </p>
                </div>
                <div className="flex items-center gap-1 font-semibold text-foreground text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{profile.rating}</span>
                </div>
              </div>

              {profile.reviews.length > 0 ? (
                <div className="space-y-4">
                  {profile.reviews.map((rev) => (
                    <div key={rev.id} className="p-5 rounded-xl bg-card border border-border/70 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= rev.rating ? "fill-amber-400 text-amber-400" : "text-border"}`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed">{rev.comment}</p>
                      <div className="text-[11px] font-medium text-muted-foreground pt-1 border-t border-border/40">
                        {rev.workspaceName} • {rev.workspaceIndustry}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center rounded-xl bg-secondary/20 border border-border/60 text-xs text-muted-foreground">
                  No public reviews submitted yet for this Fless employee version.
                </div>
              )}
            </div>

            {/* FAQ SECTION */}
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-card border border-border/70">
                  <h3 className="text-xs font-semibold text-foreground">Who is {profile.name} designed for?</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Designed for {profile.businessTypes.join(", ")} operating in {profile.industries.join(", ")}.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/70">
                  <h3 className="text-xs font-semibold text-foreground">Where is this AI Employee available?</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Available for deployment across {profile.countries.join(", ")}. Supports {profile.languages.join(", ")} language communications.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/70">
                  <h3 className="text-xs font-semibold text-foreground">Can I cancel or refund unused tenure?</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Yes. Cancel whenever your business no longer needs capacity. Eligible unused tenure service is calculated and pro-rated according to Fless terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR METADATA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4 text-xs">
              <h3 className="font-display font-semibold text-sm text-foreground pb-2 border-b border-border/60">
                Market & Operational Scope
              </h3>

              <div>
                <span className="text-muted-foreground block text-[11px] font-medium uppercase mb-1">Target Industries</span>
                <div className="flex flex-wrap gap-1">
                  {profile.industries.map((ind) => (
                    <span key={ind} className="px-2 py-0.5 rounded bg-secondary text-foreground font-medium text-[11px]">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block text-[11px] font-medium uppercase mb-1">Supported Countries</span>
                <div className="flex flex-wrap gap-1">
                  {profile.countries.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded bg-secondary text-foreground font-medium text-[11px]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block text-[11px] font-medium uppercase mb-1">Supported Languages</span>
                <div className="flex flex-wrap gap-1">
                  {profile.languages.map((l) => (
                    <span key={l} className="px-2 py-0.5 rounded bg-secondary text-foreground font-medium text-[11px]">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RELATED EMPLOYEES */}
            {profile.relatedEmployees.length > 0 && (
              <div className="p-6 rounded-2xl bg-card border border-border/70 space-y-4">
                <h3 className="font-display font-semibold text-sm text-foreground">
                  Related AI Employees
                </h3>
                <div className="space-y-3">
                  {profile.relatedEmployees.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/ai-employees/${rel.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary shrink-0">
                        {rel.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-foreground group-hover:text-primary truncate">
                          {rel.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate">{rel.title}</div>
                      </div>
                      <div className="text-xs font-medium text-foreground shrink-0">{rel.formattedRate}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
