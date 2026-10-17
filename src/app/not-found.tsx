import Link from "next/link"
import { Users, Compass, Home } from "lucide-react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-1 flex items-center justify-center py-24 md:py-36 px-6">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <span>Error 404</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold tracking-tight leading-[1.1]">
            Desk not found.
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            The page or employee profile you&apos;re looking for has moved, expired, or doesn&apos;t exist on this workspace.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover shadow-sm transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              Return Home
            </Link>
            <Link
              href="/ai-employees"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-foreground text-xs sm:text-sm font-semibold hover:bg-muted transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-primary" />
              Browse AI Employees
            </Link>
            <Link
              href="/#departments"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-foreground text-xs sm:text-sm font-semibold hover:bg-muted transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-primary" />
              Explore 9 Departments
            </Link>
          </div>

          <div className="pt-10 border-t border-border/60 text-xs text-muted-foreground">
            Looking for something specific? Contact our support team at{" "}
            <a href="mailto:hello@getfless.com" className="text-primary hover:underline">
              hello@getfless.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
