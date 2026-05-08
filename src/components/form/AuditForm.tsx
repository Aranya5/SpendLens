"use client";

import { TOOLS, TOOL_CATEGORIES, ToolCategory } from "@/lib/tools-config";
import { useAuditStore } from "@/lib/store";
import { UseCase } from "@/lib/types";
import { ToolCard } from "./ToolCard";
import { useRouter } from "next/navigation";

const USE_CASES: { value: UseCase; label: string; emoji: string }[] = [
  { value: "coding", label: "Coding", emoji: "💻" },
  { value: "writing", label: "Writing / Content", emoji: "✍️" },
  { value: "data", label: "Data / Analytics", emoji: "📊" },
  { value: "research", label: "Research", emoji: "🔍" },
  { value: "mixed", label: "Mixed", emoji: "🔀" },
];

const CATEGORY_ORDER: ToolCategory[] = ["ide", "chat", "api"];

export function AuditForm() {
  const { formData, setTeamSize, setUseCase } = useAuditStore();
  const router = useRouter();

  const enabledTools = Object.values(formData.tools).filter((t) => t.enabled);
  const enabledCount = enabledTools.length;

  const totalSpend = enabledTools.reduce(
    (sum, t) => sum + (parseFloat(t.monthlySpend) || 0),
    0
  );

  const canSubmit =
    enabledCount > 0 &&
    enabledTools.some((t) => parseFloat(t.monthlySpend) > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;
    router.push("/results");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
          Audit My AI Stack
        </h1>
        <p className="text-gray-500">
          Toggle the tools you pay for, enter your plan and monthly spend. Form
          auto-saves.
        </p>
      </div>

      {/* Team context */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10">
        <h2 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wider">
          Your context
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="teamSize"
              className="block text-sm font-medium text-gray-600 mb-1.5"
            >
              Team size
            </label>
            <input
              id="teamSize"
              type="number"
              min="1"
              placeholder="e.g. 8"
              value={formData.teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="useCase"
              className="block text-sm font-medium text-gray-600 mb-1.5"
            >
              Primary use case
            </label>
            <select
              id="useCase"
              value={formData.useCase}
              onChange={(e) => setUseCase(e.target.value as UseCase)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {USE_CASES.map((uc) => (
                <option key={uc.value} value={uc.value}>
                  {uc.emoji} {uc.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tool sections by category */}
      {CATEGORY_ORDER.map((category) => {
        const categoryTools = TOOLS.filter((t) => t.category === category);
        return (
          <div key={category} className="mb-10">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              {TOOL_CATEGORIES[category]}
            </h2>
            <div className="space-y-3">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Bottom spacer so sticky bar doesn't hide content */}
      <div className="h-24" />

      {/* Sticky summary + CTA bar */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-50 transition-all duration-300 ${
          enabledCount > 0
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-gray-900/10 px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">
              {enabledCount} tool{enabledCount !== 1 ? "s" : ""} selected
            </p>
            <p className="font-bold text-gray-900 text-lg">
              ${totalSpend.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              /mo
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`font-bold px-6 py-3 rounded-xl transition-colors text-sm ${
              canSubmit
                ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Run Audit →
          </button>
        </div>
      </div>
    </div>
  );
}