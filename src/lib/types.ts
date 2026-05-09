export type ToolId =
  | "cursor"
  | "github_copilot"
  | "claude"
  | "chatgpt"
  | "anthropic_api"
  | "openai_api"
  | "gemini"
  | "windsurf";

export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

export interface ToolEntry {
  id: ToolId;
  enabled: boolean;
  plan: string;
  monthlySpend: string;
  seats: string;
}

export interface AuditFormData {
  tools: Record<ToolId, ToolEntry>;
  teamSize: string;
  useCase: UseCase;
}

export interface AuditResult {
  toolId: ToolId;
  toolName: string;         // added Day 2
  currentSpend: number;
  currentPlan: string;      // added Day 2
  recommendedPlan: string | null;
  recommendedAction: string;
  monthlySavings: number;
  reason: string;
  isOptimal: boolean;
}

export interface AuditReport {
  id: string;
  formData: AuditFormData;
  results: AuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  aiSummary?: string;
  createdAt: string;
}

export interface LeadCapture {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: string;
  auditId: string;
}