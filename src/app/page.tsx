import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { GlobalStats } from "@/components/GlobalStats"
import { LogoMarquee } from "@/components/LogoMarquee"
import { Product } from "@/components/Product"
import { TryCommand } from "@/components/TryCommand"
import { HowItWorks } from "@/components/HowItWorks"
import { Departments } from "@/components/Departments"
import { DepartmentShowcases } from "@/components/DepartmentShowcases"
import { Industries } from "@/components/Industries"
import { Integrations } from "@/components/Integrations"
import { BuiltDifferent } from "@/components/BuiltDifferent"
import { Testimonials } from "@/components/Testimonials"
import { SecurityFaq } from "@/components/SecurityFaq"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        <GlobalStats />
        <LogoMarquee />
        <Product />
        <section className="py-20 md:py-28 border-t border-border/60">
          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-primary mb-4">Try it</p>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight mb-4">
                Assign the work. Then keep it running.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                Type a brief. See what Fless would do. Register to turn the desk on for real — two minutes, no card.
              </p>
            </div>
            <div className="lg:col-span-7">
              <TryCommand />
            </div>
          </div>
        </section>
        <HowItWorks />
        <Departments />
        <DepartmentShowcases />
        <Industries />
        <Integrations />
        <BuiltDifferent />
        <Testimonials />
        <SecurityFaq />
      </main>
      <Footer />
    </div>
  )
}
