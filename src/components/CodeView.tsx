"use client"

import { Fragment, useState } from "react"
import { cn } from "@/lib/utils"

type Token = { text: string; kind?: "comment" | "string" | "keyword" | "number" | "key" | "prompt" }

const KEYWORDS = new Set([
  "import", "export", "default", "from", "const", "let", "async", "await", "return",
  "interface", "type", "new", "true", "false", "string", "number", "boolean",
])

// Small, dependency-free highlighter: enough for TypeScript snippets and CLI output.
function tokenize(line: string, language: string): Token[] {
  if (language === "bash") {
    if (line.trimStart().startsWith("$")) return [{ text: line, kind: "prompt" }]
    return line.split(/(passed|signed|confirmed|sent)/).map((text) =>
      ["passed", "signed", "confirmed", "sent"].includes(text) ? { text, kind: "string" } : { text }
    )
  }
  const tokens: Token[] = []
  const re = /(\/\/.*$)|('(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*")|(\b\d[\d_.]*\b)|([A-Za-z_$][\w$]*)(?=\??:)|([A-Za-z_$][\w$]*)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(line))) {
    if (m.index > last) tokens.push({ text: line.slice(last, m.index) })
    if (m[1]) tokens.push({ text: m[1], kind: "comment" })
    else if (m[2]) tokens.push({ text: m[2], kind: "string" })
    else if (m[3]) tokens.push({ text: m[3], kind: "number" })
    else if (m[4]) tokens.push({ text: m[4], kind: "key" })
    else if (m[5]) tokens.push({ text: m[5], kind: KEYWORDS.has(m[5]) ? "keyword" : undefined })
    last = re.lastIndex
  }
  if (last < line.length) tokens.push({ text: line.slice(last) })
  return tokens
}

const tone: Record<NonNullable<Token["kind"]>, string> = {
  comment: "text-white/35",
  string: "text-emerald-300",
  keyword: "text-[#a5b4fc]",
  number: "text-amber-300",
  key: "text-sky-200",
  prompt: "text-white",
}

export function CodeView({
  code,
  language = "typescript",
  filename,
  className,
  maxHeight,
}: {
  code: string
  language?: "typescript" | "bash"
  filename?: string
  className?: string
  maxHeight?: number
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code.replace(/^\$ /gm, ""))
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard can be blocked (permissions, insecure context); nothing else to do.
    }
  }

  const lines = code.split("\n")

  return (
    <div className={cn("rounded-2xl bg-[#0c0d16] ring-1 ring-white/[0.06] overflow-hidden", className)}>
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 h-11 border-b border-white/[0.06]">
        <span className="font-mono text-[12px] text-white/50 truncate">{filename ?? language}</span>
        <button
          type="button"
          onClick={copy}
          className="text-[12px] font-medium text-white/50 hover:text-white transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="overflow-auto" style={maxHeight ? { maxHeight } : undefined}>
        <pre className="py-4 sm:py-5 font-mono text-[12.5px] sm:text-[13px] leading-[1.75] text-white/80">
          <code className="grid min-w-max">
            {lines.map((line, i) => (
              <span key={i} className="flex">
                {language === "typescript" && (
                  <span className="select-none w-10 sm:w-12 shrink-0 pr-4 text-right text-white/20 tabular-nums">
                    {i + 1}
                  </span>
                )}
                <span className={cn("pr-6", language === "bash" && "pl-4 sm:pl-5")}>
                  {line === "" ? " " : tokenize(line, language).map((t, j) => (
                    <Fragment key={j}>
                      {t.kind ? <span className={tone[t.kind]}>{t.text}</span> : t.text}
                    </Fragment>
                  ))}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  )
}
