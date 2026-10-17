"use client";

import React from "react";

interface VerifiedBadgeProps {
  isFless?: boolean;
  builderName?: string;
  isRecommended?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function VerifiedBadge({
  isFless = false,
  builderName = "Fless",
  isRecommended = false,
  size = "sm",
  className = "",
}: VerifiedBadgeProps) {
  const isSm = size === "sm";

  return (
    <div className={`inline-flex items-center gap-1.5 flex-wrap ${className}`}>
      {/* Builder Tag with Twitter/X-style Verified Checkmark */}
      <span
        className={`inline-flex items-center gap-1 rounded-full font-medium transition-colors ${
          isSm ? "text-[10.5px] px-2 py-0.5" : "text-xs px-2.5 py-1"
        } ${
          isFless
            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/25"
            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25"
        }`}
        title={
          isFless
            ? "Official Fless Employee: Built & maintained by Fless core engineering"
            : `Approved Builder: ${builderName} has passed Fless security & quality audits`
        }
      >
        {/* Twitter/X-style Scalloped Verification Badge Icon */}
        <svg
          viewBox="0 0 24 24"
          className={`${isSm ? "w-3 h-3" : "w-3.5 h-3.5"} shrink-0 ${
            isFless ? "text-[#1D9BF0]" : "text-emerald-500"
          }`}
          fill="currentColor"
        >
          <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.42 1.42-6.41 6.4z" />
        </svg>

        <span className="font-semibold truncate max-w-[140px]">
          {isFless ? "Fless Official" : builderName}
        </span>
      </span>

      {/* Most Recommended Badge for Fless Employees */}
      {isRecommended && (
        <span
          className={`inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider ${
            isSm ? "text-[9.5px] px-2 py-0.5" : "text-[10px] px-2.5 py-0.5"
          } bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30`}
          title="Most Recommended: Prioritized for enterprise reliability and official maintenance"
        >
          <span className="text-amber-500 font-bold">★</span>
          <span>Most Recommended</span>
        </span>
      )}
    </div>
  );
}
