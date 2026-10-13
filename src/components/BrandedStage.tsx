"use client"

import type { ReactNode } from "react"

// Photo frames used across marketing pages. They show the photo and any real
// content passed as children; they never invent product activity or "live" status.

export function BrandedStage({
  image,
  alt,
  children,
  className = "",
}: {
  image: string
  alt: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.08] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {children ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/[0.08] to-transparent" />
          <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-4 sm:bottom-4 z-10">{children}</div>
        </>
      ) : null}
    </div>
  )
}

export function PhotoTile({
  image,
  alt,
  title,
  subtitle,
  status,
  className = "",
}: {
  image: string
  alt: string
  title?: string
  subtitle?: string
  status?: "live" | "early-access"
  className?: string
}) {
  return (
    <div className={`relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 ring-1 ring-inset ring-black/[0.08] dark:ring-white/[0.08] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      {status && (
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${
              status === "live" ? "bg-emerald-500 text-white" : "bg-white/25 text-white"
            }`}
          >
            {status === "live" ? "Live" : "Early access"}
          </span>
        </div>
      )}
      {(title || subtitle) && (
        <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4 z-10">
          {title ? <div className="text-white font-semibold tracking-tight leading-tight">{title}</div> : null}
          {subtitle ? <p className="text-white/75 text-[12px] mt-1 leading-snug">{subtitle}</p> : null}
        </div>
      )}
    </div>
  )
}
