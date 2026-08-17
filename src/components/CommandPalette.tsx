"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, Command, Sparkles, Building2, BookOpen, Code2, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        if (isOpen) {
          onClose()
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const quickLinks = [
    { icon: Sparkles, label: "AI Support Department", category: "Department", href: "/departments/support" },
    { icon: Building2, label: "Company Command Center", category: "Product", href: "/#product" },
    { icon: BookOpen, label: "API Reference & Docs", category: "Resources", href: "/pricing" },
    { icon: Code2, label: "Workflow Automation SDK", category: "Developers", href: "/#features" },
  ]

  const categories = [
    { title: "Departments", items: ["Marketing AI", "Voice AI", "Sales AI", "Support AI", "Recruiting AI", "Operations AI", "Finance AI", "HR AI"] },
    { title: "Products", items: ["AI Workforce Platform", "Company Command Center", "Knowledge Base", "Workflow Automation"] },
    { title: "Solutions", items: ["Startup", "SMB", "Enterprise", "Agency", "Healthcare", "Retail"] },
  ]

  const filteredCategories = query
    ? categories.map(cat => ({
        ...cat,
        items: cat.items.filter(item => item.toLowerCase().includes(query.toLowerCase()))
      })).filter(cat => cat.items.length > 0)
    : categories

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-background/95 dark:bg-[#0f1015]/95 border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-10 backdrop-blur-xl"
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 border-b border-border/60 h-14 gap-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search departments, docs, AI employees..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
              />
              {query ? (
                <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-secondary rounded border border-border/50">
                  <Command className="w-2.5 h-2.5" /> ESC
                </kbd>
              )}
            </div>

            {/* Results Body */}
            <div className="max-h-[380px] overflow-y-auto p-4 space-y-5 text-left text-xs">
              {!query && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5 px-2">
                    Quick Access
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/70 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <link.icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</div>
                            <div className="text-[9px] text-muted-foreground">{link.category}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredCategories.map((cat) => (
                <div key={cat.title}>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">
                    {cat.title}
                  </div>
                  <div className="space-y-1">
                    {cat.items.map((item) => (
                      <div
                        key={item}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-secondary/80 text-foreground cursor-pointer transition-colors group"
                      >
                        <span className="font-medium text-xs group-hover:text-primary transition-colors">{item}</span>
                        <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">Jump to →</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer inside Modal */}
            <div className="h-10 border-t border-border/50 px-4 bg-secondary/30 flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>Navigate <kbd className="px-1 py-0.5 bg-background rounded text-[9px] font-mono border">↑</kbd> <kbd className="px-1 py-0.5 bg-background rounded text-[9px] font-mono border">↓</kbd></span>
                <span>Select <kbd className="px-1 py-0.5 bg-background rounded text-[9px] font-mono border">↵</kbd></span>
              </div>
              <span className="font-mono text-[10px]">Fless Search v2.4</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
