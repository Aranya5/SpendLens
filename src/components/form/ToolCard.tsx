"use client";

import { ToolConfig } from "@/lib/tools-config";
import { useAuditStore } from "@/lib/store";
import { ToolId } from "@/lib/types";

interface ToolCardProps {
  tool: ToolConfig;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { formData, setToolEnabled, setToolPlan, setToolSpend, setToolSeats } =
    useAuditStore();

  const entry = formData.tools[tool.id as ToolId];
  const isApi = tool.category === "api";

  return (
    <div
      className={`border rounded-2xl p-5 transition-all duration-200 ${
        entry.enabled
          ? "border-blue-200 bg-blue-50/40 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl flex-shrink-0" aria-hidden>
            {tool.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {tool.name}
            </h3>
            <p className="text-xs text-gray-400 truncate">{tool.description}</p>
          </div>
        </div>

        {/* Toggle switch */}
        <button
          onClick={() => setToolEnabled(tool.id as ToolId, !entry.enabled)}
          role="switch"
          aria-checked={entry.enabled}
          aria-label={`Toggle ${tool.name}`}
          className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            entry.enabled ? "bg-blue-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
              entry.enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Expanded fields */}
      {entry.enabled && (
        <div
          className={`mt-4 grid gap-3 ${
            isApi ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"
          }`}
        >
          {/* Plan selector — hidden for pure API tools */}
          {!isApi && (
            <div>
              <label
                htmlFor={`plan-${tool.id}`}
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                Plan
              </label>
              <select
                id={`plan-${tool.id}`}
                value={entry.plan}
                onChange={(e) =>
                  setToolPlan(tool.id as ToolId, e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tool.plans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Monthly spend */}
          <div>
            <label
              htmlFor={`spend-${tool.id}`}
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              Monthly Spend ($)
            </label>
            <input
              id={`spend-${tool.id}`}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={entry.monthlySpend}
              onChange={(e) =>
                setToolSpend(tool.id as ToolId, e.target.value)
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Seats — hidden for API tools */}
          {!isApi && (
            <div>
              <label
                htmlFor={`seats-${tool.id}`}
                className="block text-xs font-medium text-gray-500 mb-1"
              >
                Seats / Users
              </label>
              <input
                id={`seats-${tool.id}`}
                type="number"
                min="1"
                placeholder="1"
                value={entry.seats}
                onChange={(e) =>
                  setToolSeats(tool.id as ToolId, e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}