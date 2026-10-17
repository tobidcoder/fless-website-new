"use client";

import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";

export function BuilderInvitation() {
  return (
    <section className="py-20 bg-background border-t border-border/60">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/[0.04] p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>For Developers &amp; Creators</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-foreground">
              Have an idea for an AI employee?
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Build specialized employees for real business needs, test them in our hermetic sandbox, and submit them for publication to earn 70% recurring revenue share.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                TypeScript SDK
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                No-Code Studio
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                70/30 Revenue Split
              </span>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/builders"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 shadow-md shadow-primary/25 transition-all"
            >
              <span>Explore Fless for Builders</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border bg-background hover:bg-muted text-foreground text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Read Documentation</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
