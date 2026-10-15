"use client"

import { useEffect } from "react"

// Old developer-docs anchors (from the retired SDK reference) → help-centre sections.
const ALIASES: Record<string, string> = {
  overview: "getting-started",
  intro: "getting-started",
  quickstart: "getting-started",
  concepts: "getting-started",
  "sdk-overview": "studio",
  "single-sdk": "studio",
  packages: "connecting-apps",
  plugins: "connecting-apps",
  connections: "connecting-apps",
  manifest: "studio",
  "define-employee": "studio",
  "create-employee": "studio",
  agents: "studio",
  knowledge: "studio",
  "skills-workflows": "skills",
  policies: "approvals",
  "security-boundaries": "security",
  settings: "studio",
  "ref-pricing": "pricing",
  sandbox: "studio",
  evaluate: "publishing",
  verify: "publishing",
  evaluations: "publishing",
  submit: "publishing",
  publish: "publishing",
  api: "studio",
  cli: "studio",
}

/** Sends old /docs#… links to the matching help-centre section. */
export function DocsHashAliases() {
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.slice(1)
      if (!hash || document.getElementById(hash)) return
      const target = ALIASES[hash] ?? (hash.startsWith("plugin-") || hash.startsWith("package-") ? "connecting-apps" : null)
      if (!target) return
      history.replaceState(null, "", `#${target}`)
      document.getElementById(target)?.scrollIntoView()
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])
  return null
}
