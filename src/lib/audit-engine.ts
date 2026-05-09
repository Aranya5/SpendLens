import { AuditFormData, AuditReport, AuditResult, ToolId } from "./types";
import { TOOL_MAP } from "./tools-config";

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 11);
}

// ─────────────────────────────────────────────
// Per-tool audit functions
// All savings figures are conservative and defensible.
// ─────────────────────────────────────────────

function auditCursor(
  entry: AuditFormData["tools"][ToolId],
  formData: AuditFormData
): Partial<AuditResult> {
  const seats = parseInt(entry.seats) || 1;
  const spend = parseFloat(entry.monthlySpend) || 0;
  const useCase = formData.useCase;

  // Business plan overkill for small teams
  if (entry.plan === "Business" && seats <= 8) {
    const savings = (40 - 20) * seats;
    return {
      recommendedPlan: "Pro",
      recommendedAction: "Downgrade from Cursor Business to Cursor Pro",
      monthlySavings: savings,
      reason: `Cursor Business ($40/user/mo) adds SSO, privacy mode, and admin controls — features that matter at 20+ engineers. Cursor Pro ($20/user/mo) gives your ${seats}-person team the same AI completions and chat. Savings: $20/seat × ${seats} seats = $${savings}/mo.`,
      isOptimal: false,
    };
  }

  // Non-coding team paying for a coding IDE
  if (
    (useCase === "writing" || useCase === "research") &&
    entry.plan !== "Hobby" &&
    spend > 0
  ) {
    const savings = Math.max(0, spend - 20);
    return {
      recommendedPlan: "Claude Pro (substitute)",
      recommendedAction: "Replace Cursor with Claude Pro for non-coding workflows",
      monthlySavings: savings,
      reason: `Cursor is built for code editing. For writing and research tasks, Claude Pro ($20/mo) provides better long-document understanding, citation handling, and generation quality. If coding represents less than 20% of your workflow, this swap saves ~$${savings}/mo.`,
      isOptimal: savings < 5,
    };
  }

  // Spend doesn't match expected seat × price
  const expectedSpend = 20 * seats;
  if (entry.plan === "Pro" && spend > expectedSpend + 5) {
    const savings = spend - expectedSpend;
    return {
      recommendedAction: "Verify your active seat count",
      monthlySavings: savings,
      reason: `At $20/seat, ${seats} Pro seats should cost $${expectedSpend}/mo. You're reporting $${spend}/mo — a $${Math.round(savings)} gap. Check for former employees still holding active licenses in your Cursor admin dashboard.`,
      isOptimal: false,
    };
  }

  return { isOptimal: true, recommendedAction: "No action needed.", monthlySavings: 0, reason: "Your Cursor plan fits your team size and use case." };
}

function auditGithubCopilot(
  entry: AuditFormData["tools"][ToolId],
  formData: AuditFormData
): Partial<AuditResult> {
  const seats = parseInt(entry.seats) || 1;

  // Enterprise overkill
  if (entry.plan === "Enterprise" && seats <= 15) {
    const savings = (39 - 19) * seats;
    return {
      recommendedPlan: "Business",
      recommendedAction: "Downgrade from Copilot Enterprise to Copilot Business",
      monthlySavings: savings,
      reason: `Copilot Enterprise ($39/user/mo) adds fine-tuned models trained on your private codebase and advanced security controls — ROI kicks in at 50+ engineers with large proprietary codebases. At ${seats} seats, Business ($19/user/mo) covers completions, chat, and PR summaries. Saves $${savings}/mo.`,
      isOptimal: false,
    };
  }

  // Individual plan with multiple seats is a billing red flag
  if (entry.plan === "Individual" && seats > 1) {
    return {
      recommendedAction: "Review billing — Individual is a single-user license",
      monthlySavings: 0,
      reason: `GitHub Copilot Individual ($10/mo) is a per-person subscription, not a team license. If ${seats} engineers are using it, each needs their own account. Verify that ${seats} separate Individual subscriptions are active, or consolidate to Business ($19/user/mo) for team admin and policy controls.`,
      isOptimal: false,
    };
  }

  // Close to Cursor Pro in price — worth noting for coding teams
  if (entry.plan === "Business" && seats <= 5 && formData.useCase === "coding") {
    return {
      isOptimal: true,
      recommendedAction: "Consider a Cursor Pro trial (comparable cost)",
      monthlySavings: 0,
      reason: `Copilot Business ($19/user/mo) and Cursor Pro ($20/user/mo) are nearly identical in cost for ${seats} seats. Cursor's agent mode and larger chat context are meaningful for full-file refactors; Copilot's GitHub native integration matters if PRs and code review are central. Worth a trial comparison before next renewal.`,
    };
  }

  return { isOptimal: true, recommendedAction: "No action needed.", monthlySavings: 0, reason: "Copilot plan is well-matched to your team." };
}

function auditClaude(
  entry: AuditFormData["tools"][ToolId]
): Partial<AuditResult> {
  const seats = parseInt(entry.seats) || 1;

  // Team plan for fewer than 5 is always more expensive than individual Pro
  if (entry.plan === "Team" && seats < 5) {
    const savings = (30 - 20) * seats;
    return {
      recommendedPlan: "Pro (per user)",
      recommendedAction: "Switch from Claude Team to individual Pro plans",
      monthlySavings: savings,
      reason: `Claude Team ($30/user/mo, 5-seat minimum) costs more than individual Pro subscriptions ($20/user/mo) for teams under 5. ${seats} Pro plans = $${20 * seats}/mo vs $${30 * seats}/mo. Team adds shared Projects and collaborative features — if your team doesn't use shared Projects, this is a straightforward downgrade. Saves $${savings}/mo.`,
      isOptimal: false,
    };
  }

  // Max plan for multiple people — most don't need 5× usage
  if (entry.plan === "Max" && seats > 1) {
    const powerUserFraction = 0.3; // assume 30% are genuine power users
    const downgradeSeats = Math.floor(seats * (1 - powerUserFraction));
    const savings = (100 - 20) * downgradeSeats;
    return {
      recommendedPlan: "Max (power users) + Pro (rest)",
      recommendedAction: "Audit who actually needs Max — most users don't exhaust Pro",
      monthlySavings: savings,
      reason: `Claude Max ($100/user/mo) delivers 5× more usage than Pro — built for engineers running long multi-step agentic tasks daily. In most teams, ~30% of users are heavy enough to need Max. Moving the remaining ${downgradeSeats} users to Pro ($20/user/mo) saves ~$${savings}/mo without impacting daily productivity for the majority.`,
      isOptimal: false,
    };
  }

  return { isOptimal: true, recommendedAction: "No action needed.", monthlySavings: 0, reason: "Claude plan matches your team size and usage." };
}

function auditChatGPT(
  entry: AuditFormData["tools"][ToolId]
): Partial<AuditResult> {
  const seats = parseInt(entry.seats) || 1;

  // Team cheaper threshold: Team ($30) is worth it at 3+ users for workspace features
  if (entry.plan === "Team" && seats < 3) {
    const savings = (30 - 20) * seats;
    return {
      recommendedPlan: "Plus (per user)",
      recommendedAction: "Switch from ChatGPT Team to individual Plus plans",
      monthlySavings: savings,
      reason: `ChatGPT Team ($30/user/mo) adds a shared workspace, admin console, and higher limits. For ${seats} users who work independently, ${seats} individual Plus plans ($20/user/mo each) cost $${20 * seats}/mo vs $${30 * seats}/mo. Saves $${savings}/mo — revisit when your team crosses 5 people.`,
      isOptimal: false,
    };
  }

  return { isOptimal: true, recommendedAction: "No action needed.", monthlySavings: 0, reason: "ChatGPT plan is appropriate for your team." };
}

function auditGemini(
  entry: AuditFormData["tools"][ToolId],
  formData: AuditFormData,
  hasPaidClaude: boolean,
  hasPaidChatGPT: boolean
): Partial<AuditResult> {
  const spend = parseFloat(entry.monthlySpend) || 0;
  const isPaid = entry.plan === "Pro" || entry.plan === "Ultra";

  if (isPaid && (hasPaidClaude || hasPaidChatGPT)) {
    return {
      recommendedPlan: "Free (or cancel)",
      recommendedAction: "Consolidate AI assistants — Gemini overlaps with existing tools",
      monthlySavings: spend,
      reason: `You're paying for Gemini ${entry.plan} ($${spend}/mo) alongside ${hasPaidClaude ? "Claude" : "ChatGPT"}. For ${formData.useCase} tasks, a single AI assistant handles 90%+ of use cases. Gemini's strongest advantages are Google Workspace integration (Docs, Gmail, Sheets) and native multimodal Google Search grounding — if those aren't core to your workflow, this is the easiest cut. Saves $${spend}/mo.`,
      isOptimal: false,
    };
  }

  if (isPaid && formData.useCase === "coding") {
    return {
      recommendedPlan: "Free (or API)",
      recommendedAction: "Gemini chat plans add limited value for coding-first teams",
      monthlySavings: spend,
      reason: `For coding use cases, dedicated coding assistants (Cursor, Copilot, Windsurf) and Claude's code capability outperform Gemini Advanced in most benchmarks. Unless you're specifically using Gemini for code review in Google Cloud or Firebase projects, the $${spend}/mo could be redirected.`,
      isOptimal: false,
    };
  }

  return { isOptimal: true, recommendedAction: "No action needed.", monthlySavings: 0, reason: "Gemini plan is reasonable for your use case." };
}

function auditWindsurf(
  entry: AuditFormData["tools"][ToolId]
): Partial<AuditResult> {
  const seats = parseInt(entry.seats) || 1;

  if (entry.plan === "Teams" && seats <= 6) {
    const savings = (35 - 15) * seats;
    return {
      recommendedPlan: "Pro",
      recommendedAction: "Downgrade from Windsurf Teams to Pro",
      monthlySavings: savings,
      reason: `Windsurf Teams ($35/user/mo) adds admin dashboards, centralized billing, and shared flow credits — worth it at 10+ engineers. For a ${seats}-person team, Pro ($15/user/mo) covers full AI features including Cascade and Flow. Saves $${savings}/mo.`,
      isOptimal: false,
    };
  }

  return { isOptimal: true, recommendedAction: "No action needed.", monthlySavings: 0, reason: "Windsurf plan looks well-fitted." };
}

function auditApiTool(
  entry: AuditFormData["tools"][ToolId],
  toolName: string
): Partial<AuditResult> {
  const spend = parseFloat(entry.monthlySpend) || 0;

  if (spend > 500) {
    const savings = Math.round(spend * 0.3);
    return {
      recommendedAction: "High API spend — apply model tiering and prompt caching",
      monthlySavings: savings,
      reason: `$${spend}/mo in ${toolName} spend is substantial. Three levers: (1) Route non-critical calls to smaller, cheaper models (e.g. claude-haiku vs sonnet is ~10× cheaper per token); (2) Enable prompt caching for repeated system prompts — cache hits cost 10% of base price; (3) Batch non-realtime workloads using the Batch API (50% discount). Conservative 25–35% reduction is achievable without quality regression on most workloads.`,
      isOptimal: false,
    };
  }

  if (spend > 100) {
    return {
      isOptimal: true,
      recommendedAction: "Consider prompt caching to reduce costs as you scale",
      monthlySavings: 0,
      reason: `$${spend}/mo in API spend is in a reasonable range. As volume grows, implement prompt caching for system prompts and consider model tiering (smaller models for classification/routing, larger for generation) before costs compound.`,
    };
  }

  return { isOptimal: true, recommendedAction: "No action needed.", monthlySavings: 0, reason: "API spend is within a healthy range for your scale." };
}

// ─────────────────────────────────────────────
// Main audit runner
// ─────────────────────────────────────────────

export function runAudit(formData: AuditFormData): AuditReport {
  const enabledEntries = Object.values(formData.tools).filter((t) => t.enabled);

  // Pre-compute cross-tool flags
  const hasPaidClaude =
    formData.tools.claude.enabled &&
    ["Pro", "Max", "Team"].includes(formData.tools.claude.plan);

  const hasPaidChatGPT =
    formData.tools.chatgpt.enabled &&
    ["Plus", "Team"].includes(formData.tools.chatgpt.plan);

  const results: AuditResult[] = enabledEntries.map((entry) => {
    const tool = TOOL_MAP[entry.id];
    const base: AuditResult = {
      toolId: entry.id,
      toolName: tool.name,
      currentSpend: parseFloat(entry.monthlySpend) || 0,
      currentPlan: entry.plan,
      recommendedPlan: null,
      recommendedAction: "No action needed.",
      monthlySavings: 0,
      reason: "Your plan looks well-fitted.",
      isOptimal: true,
    };

    let partial: Partial<AuditResult> = {};

    switch (entry.id) {
      case "cursor":
        partial = auditCursor(entry, formData);
        break;
      case "github_copilot":
        partial = auditGithubCopilot(entry, formData);
        break;
      case "claude":
        partial = auditClaude(entry);
        break;
      case "chatgpt":
        partial = auditChatGPT(entry);
        break;
      case "gemini":
        partial = auditGemini(entry, formData, hasPaidClaude, hasPaidChatGPT);
        break;
      case "windsurf":
        partial = auditWindsurf(entry);
        break;
      case "anthropic_api":
        partial = auditApiTool(entry, "Anthropic API");
        break;
      case "openai_api":
        partial = auditApiTool(entry, "OpenAI API");
        break;
    }

    return { ...base, ...partial };
  });

  const totalMonthlySavings = results.reduce(
    (sum, r) => sum + r.monthlySavings,
    0
  );

  return {
    id: generateId(),
    formData,
    results: results.sort((a, b) => b.monthlySavings - a.monthlySavings),
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    createdAt: new Date().toISOString(),
  };
}