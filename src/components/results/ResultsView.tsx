"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuditStore } from "@/lib/store";
import { runAudit } from "@/lib/audit-engine";
import { AuditReport } from "@/lib/types";
import { SavingsHero } from "./SavingsHero";
import { AuditResultCard } from "./AuditResultCard";
import { CredexCTA } from "./CredexCTA";
import { LeadCaptureBox } from "./LeadCaptureBox";

export function ResultsView() {
  const { formData } = useAuditStore();
  const router = useRouter();
  const [report, setReport] = useState<AuditReport | null>(null);

  useEffect(() => {
    const enabledCount = Object.values(formData.tools).filter(
      (t) => t.enabled
    ).length;

    if (enabledCount === 0) {
      router.replace("/audit");
      return;
    }

    const result = runAudit(formData);
    setReport(result);
  }, [formData, router]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl mb-3 animate-pulse">🔍</div>
          <p className="text-gray-400 text-sm">Running your audit...</p>
        </div>
      </div>
    );
  }

  const isOverallOptimal = report.totalMonthlySavings < 50;
  const enabledCount = report.results.length;
  const optimalCount = report.results.filter((r) => r.isOptimal).length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <Link
        href="/audit"
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 inline-flex items-center gap-1"
      >
        ← Edit my inputs
      </Link>

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Your AI Spend Audit
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {enabledCount} tool{enabledCount !== 1 ? "s" : ""} audited ·{" "}
          {optimalCount} already optimal ·{" "}
          {new Date(report.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Savings hero */}
      <SavingsHero
        totalMonthlySavings={report.totalMonthlySavings}
        totalAnnualSavings={report.totalAnnualSavings}
        isOverallOptimal={isOverallOptimal}
      />

      {/* Credex CTA — high savings only */}
      <CredexCTA totalMonthlySavings={report.totalMonthlySavings} />

      {/* Per-tool breakdown */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Per-tool breakdown
        </h2>
        <div className="space-y-4">
          {report.results.map((result) => (
            <AuditResultCard key={result.toolId} result={result} />
          ))}
        </div>
      </div>

      {/* Lead capture */}
      <LeadCaptureBox isOptimal={isOverallOptimal} />

      {/* Pricing transparency footer */}
      <p className="text-center text-xs text-gray-400 mt-8">
        Pricing data verified against official vendor pages as of{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
        . Savings figures are conservative estimates.
      </p>
    </div>
  );
}