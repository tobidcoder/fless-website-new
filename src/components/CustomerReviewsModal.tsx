"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building2,
  Lock,
} from "lucide-react";
import { VerifiedBadge } from "./VerifiedBadge";

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  rating: number;
  date: string;
  activeDuration: string;
  tasksCompleted: string;
  comment: string;
  builderReply?: string;
}

export interface ReviewEmployeeModalProps {
  employee: {
    id: string;
    slug: string;
    name: string;
    role: string;
    department: string;
    avatar: string;
    rating: number;
    reviewsCount: number;
    pricing: string;
    billingUnit: string;
    isFless?: boolean;
    builderName?: string;
    isRecommended?: boolean;
    reviews: CustomerReview[];
  } | null;
  onClose: () => void;
}

export function CustomerReviewsModal({
  employee,
  onClose,
}: ReviewEmployeeModalProps) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-border bg-card shadow-2xl z-10 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-border/70 flex items-start justify-between gap-4 bg-muted/20">
          <div className="flex items-start gap-4">
            <Image
              src={employee.avatar}
              alt={employee.name}
              width={56}
              height={56}
              unoptimized
              className="w-14 h-14 rounded-2xl object-cover border border-border shadow-xs shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-base sm:text-lg text-foreground">
                  {employee.name}
                </h3>
                <VerifiedBadge
                  isFless={employee.isFless}
                  builderName={employee.builderName}
                  isRecommended={employee.isRecommended}
                  size="sm"
                />
              </div>

              <p className="text-xs text-muted-foreground">{employee.role}</p>

              {/* Star Rating summary */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-sm text-foreground">
                    {employee.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  · Based on {employee.reviewsCount} verified employer reviews
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Verified Active Employer Guarantee Banner ── */}
        <div className="px-6 py-3.5 bg-emerald-500/[0.07] border-b border-emerald-500/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-semibold">
              Verified Active Employer Policy: Only companies actively deploying this employee can review.
            </span>
          </div>
          <span className="text-[10.5px] font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0 hidden sm:inline">
            100% Tamper-Proof
          </span>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-border/60">
          {employee.reviews.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-xs space-y-2">
              <Lock className="w-6 h-6 mx-auto text-muted-foreground/60" />
              <p className="font-medium text-foreground">Initial reviews pending verification</p>
              <p>Reviews will appear once customer production deployments complete their 30-day review cycle.</p>
            </div>
          ) : (
            employee.reviews.map((rev) => (
              <div key={rev.id} className="pt-4 first:pt-0 space-y-3">
                {/* Reviewer Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{rev.author}</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Verified Active Employer
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {rev.role} at <strong>{rev.company}</strong> ({rev.industry})
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                    <div className="flex items-center text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                      ))}
                    </div>
                    <span>{rev.date}</span>
                  </div>
                </div>

                {/* Verified Metadata Pills */}
                <div className="flex items-center gap-3 text-[10.5px] font-mono text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {rev.activeDuration}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {rev.tasksCompleted} automated
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-xs text-foreground/90 leading-relaxed font-sans bg-muted/20 p-3.5 rounded-xl border border-border/50">
                  &ldquo;{rev.comment}&rdquo;
                </p>

                {/* Builder Reply (if available) */}
                {rev.builderReply && (
                  <div className="ml-4 pl-3 border-l-2 border-primary/40 space-y-1 text-xs">
                    <span className="font-bold text-primary text-[11px]">
                      {employee.builderName || "Fless"} (Builder Reply):
                    </span>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      {rev.builderReply}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-border bg-muted/10 flex items-center justify-between gap-4">
          <div>
            <span className="text-base font-bold text-foreground">
              {employee.pricing}
            </span>
            <span className="text-xs text-muted-foreground">
              /{employee.billingUnit}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Close
            </button>
            <Link
              href={`/start?role=${encodeURIComponent(employee.slug)}`}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/25"
            >
              <span>Hire {employee.name.split(" ")[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
