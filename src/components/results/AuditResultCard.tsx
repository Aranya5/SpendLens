import { AuditResult } from "@/lib/types";
import { TOOL_MAP } from "@/lib/tools-config";

interface AuditResultCardProps {
  result: AuditResult;
}

export function AuditResultCard({ result }: AuditResultCardProps) {
  const tool = TOOL_MAP[result.toolId];
  const hasSavings = result.monthlySavings > 0;

  return (
    <div
      className={`border rounded-2xl p-6 transition-all ${
        result.isOptimal
          ? "border-gray-200 bg-white"
          : "border-amber-200 bg-amber-50/20"
      }`}
    >
      {/* Tool header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl shrink-0" aria-hidden>
            {tool.emoji}
          </span>
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">
              {tool.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-400">{result.currentPlan}</span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">
                ${result.currentSpend.toLocaleString()}/mo currently
              </span>
            </div>
          </div>
        </div>

        {hasSavings ? (
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400">Save up to</p>
            <p className="text-xl font-bold text-emerald-600">
              ${result.monthlySavings.toLocaleString()}/mo
            </p>
            <p className="text-xs text-gray-400">
              ${(result.monthlySavings * 12).toLocaleString()}/yr
            </p>
          </div>
        ) : (
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full shrink-0">
            ✓ Optimal
          </span>
        )}
      </div>

      {/* Recommendation box */}
      <div
        className={`rounded-xl p-4 text-sm ${
          result.isOptimal
            ? "bg-gray-50 border border-gray-100"
            : "bg-white border border-amber-100"
        }`}
      >
        <p className="font-semibold text-gray-800 mb-1.5">
          {result.recommendedAction}
        </p>
        <p className="text-gray-500 leading-relaxed">{result.reason}</p>
      </div>

      {/* Recommended plan pill */}
      {result.recommendedPlan && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-gray-400 text-xs">Switch to:</span>
          <span className="bg-blue-50 text-blue-700 font-medium text-xs px-2.5 py-1 rounded-full">
            {result.recommendedPlan}
          </span>
        </div>
      )}
    </div>
  );
}