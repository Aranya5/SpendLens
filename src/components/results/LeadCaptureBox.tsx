"use client";

import { useState } from "react";

interface LeadCaptureBoxProps {
  isOptimal: boolean;
}

export function LeadCaptureBox({ isOptimal }: LeadCaptureBoxProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    // Day 4: wire to Supabase + Resend
    console.log("Lead captured:", email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-semibold text-green-800">Report sent!</p>
        <p className="text-sm text-green-600 mt-1">
          Check your inbox. We&apos;ll flag any pricing changes that affect your stack.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
      <h3 className="font-semibold text-gray-900 mb-1">
        {isOptimal
          ? "Notify me when new savings apply to my stack"
          : "Get this report by email"}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {isOptimal
          ? "AI tool pricing changes frequently. We'll email you when we find something."
          : "We'll send a PDF copy and alert you when pricing changes affect these recommendations."}
      </p>
      <div className="flex gap-3">
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          {isOptimal ? "Notify me" : "Send Report"}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        No spam. Unsubscribe anytime.{" "}
        {!isOptimal &&
          "For audits showing >$500/mo in savings, a Credex advisor may reach out."}
      </p>
    </div>
  );
}