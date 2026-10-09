"use client"

import React from "react"
import Image from "next/image"

interface NvidiaInceptionBadgeProps {
  className?: string
  variant?: "pill" | "footer" | "banner"
}

export function NvidiaInceptionBadge({
  className = "",
  variant = "pill",
}: NvidiaInceptionBadgeProps) {
  if (variant === "footer") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <a
          href="https://www.nvidia.com/en-us/startups/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block transition-transform hover:scale-[1.02]"
          title="NVIDIA Inception Program Member"
        >
          {/* Official white-on-dark real logo with NVIDIA green mark */}
          <Image
            src="/nvidia-inception-white-trimmed.png"
            alt="NVIDIA Inception Program Member"
            width={270}
            height={99}
            className="h-10 sm:h-11 w-auto object-contain opacity-95 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_16px_rgba(118,185,0,0.2)]"
          />
        </a>
      </div>
    )
  }

  if (variant === "banner") {
    return (
      <div className={`rounded-2xl border border-border bg-card p-4 sm:p-5 flex items-center justify-between gap-4 ${className}`}>
        <a
          href="https://www.nvidia.com/en-us/startups/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block transition-transform hover:scale-[1.02]"
          title="NVIDIA Inception Program Member"
        >
          <Image
            src="/nvidia-inception-trimmed.png"
            alt="NVIDIA Inception Program Member"
            width={270}
            height={99}
            className="h-10 w-auto object-contain dark:hidden"
          />
          <Image
            src="/nvidia-inception-white-trimmed.png"
            alt="NVIDIA Inception Program Member"
            width={270}
            height={99}
            className="h-10 w-auto object-contain hidden dark:block drop-shadow-[0_0_14px_rgba(118,185,0,0.2)]"
          />
        </a>
      </div>
    )
  }

  // "pill" variant (Used in Hero section)
  return (
    <a
      href="https://www.nvidia.com/en-us/startups/"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center transition-transform hover:scale-[1.03] ${className}`}
      title="NVIDIA Inception Program Member"
    >
      <Image
        src="/nvidia-inception-trimmed.png"
        alt="NVIDIA Inception Program Member"
        width={270}
        height={99}
        priority
        className="h-7 sm:h-8 w-auto object-contain dark:hidden"
      />
      <Image
        src="/nvidia-inception-white-trimmed.png"
        alt="NVIDIA Inception Program Member"
        width={270}
        height={99}
        priority
        className="h-7 sm:h-8 w-auto object-contain hidden dark:block drop-shadow-[0_0_12px_rgba(118,185,0,0.22)]"
      />
    </a>
  )
}
