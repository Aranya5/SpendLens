// All prices in USD per user per month.
// Sources documented in PRICING_DATA.md — verify at submission week.

export interface PlanPrice {
  plan: string;
  pricePerUserPerMonth: number; // 0 = free, -1 = custom/enterprise
  minSeats?: number;
  notes?: string;
}

export interface ToolPricing {
  toolId: string;
  plans: Record<string, PlanPrice>;
  pricingUrl: string;
}

export const PRICING: Record<string, ToolPricing> = {
  cursor: {
    toolId: "cursor",
    pricingUrl: "https://cursor.com/pricing",
    plans: {
      Hobby:      { plan: "Hobby",      pricePerUserPerMonth: 0,   notes: "Free tier, limited completions" },
      Pro:        { plan: "Pro",        pricePerUserPerMonth: 20 },
      Business:   { plan: "Business",   pricePerUserPerMonth: 40,  notes: "Adds SSO, privacy mode, admin" },
      Enterprise: { plan: "Enterprise", pricePerUserPerMonth: -1,  notes: "Custom" },
    },
  },

  github_copilot: {
    toolId: "github_copilot",
    pricingUrl: "https://github.com/features/copilot#pricing",
    plans: {
      Individual: { plan: "Individual", pricePerUserPerMonth: 10,  notes: "$100/yr if billed annually" },
      Business:   { plan: "Business",   pricePerUserPerMonth: 19 },
      Enterprise: { plan: "Enterprise", pricePerUserPerMonth: 39,  notes: "Adds fine-tuning, security features" },
    },
  },

  claude: {
    toolId: "claude",
    pricingUrl: "https://www.anthropic.com/pricing",
    plans: {
      Free:        { plan: "Free",        pricePerUserPerMonth: 0 },
      Pro:         { plan: "Pro",         pricePerUserPerMonth: 20 },
      Max:         { plan: "Max",         pricePerUserPerMonth: 100, notes: "5× more usage than Pro" },
      Team:        { plan: "Team",        pricePerUserPerMonth: 30,  minSeats: 5, notes: "Min 5 seats, shared Projects" },
      Enterprise:  { plan: "Enterprise",  pricePerUserPerMonth: -1,  notes: "Custom" },
      "API direct":{ plan: "API direct",  pricePerUserPerMonth: 0,   notes: "Usage-based" },
    },
  },

  chatgpt: {
    toolId: "chatgpt",
    pricingUrl: "https://openai.com/chatgpt/pricing",
    plans: {
      Plus:        { plan: "Plus",        pricePerUserPerMonth: 20 },
      Team:        { plan: "Team",        pricePerUserPerMonth: 30, minSeats: 2, notes: "Min 2 users, shared workspace" },
      Enterprise:  { plan: "Enterprise",  pricePerUserPerMonth: -1, notes: "Custom" },
      "API direct":{ plan: "API direct",  pricePerUserPerMonth: 0,  notes: "Usage-based" },
    },
  },

  gemini: {
    toolId: "gemini",
    pricingUrl: "https://one.google.com/about/plans",
    plans: {
      Free:  { plan: "Free",  pricePerUserPerMonth: 0,  notes: "Gemini 1.5 Flash" },
      Pro:   { plan: "Pro",   pricePerUserPerMonth: 20, notes: "Google One AI Premium — Gemini Advanced" },
      Ultra: { plan: "Ultra", pricePerUserPerMonth: 20, notes: "Included in Google One AI Premium" },
      API:   { plan: "API",   pricePerUserPerMonth: 0,  notes: "Usage-based via Google AI Studio" },
    },
  },

  windsurf: {
    toolId: "windsurf",
    pricingUrl: "https://codeium.com/windsurf/pricing",
    plans: {
      Free:  { plan: "Free",  pricePerUserPerMonth: 0  },
      Pro:   { plan: "Pro",   pricePerUserPerMonth: 15 },
      Teams: { plan: "Teams", pricePerUserPerMonth: 35, notes: "Admin controls, shared credits" },
    },
  },

  anthropic_api: {
    toolId: "anthropic_api",
    pricingUrl: "https://www.anthropic.com/pricing",
    plans: {
      "Pay-as-you-go": { plan: "Pay-as-you-go", pricePerUserPerMonth: 0, notes: "claude-3-5-sonnet: $3/MTok in, $15/MTok out" },
    },
  },

  openai_api: {
    toolId: "openai_api",
    pricingUrl: "https://openai.com/api/pricing",
    plans: {
      "Pay-as-you-go": { plan: "Pay-as-you-go", pricePerUserPerMonth: 0, notes: "gpt-4o: $2.50/MTok in, $10/MTok out" },
    },
  },
};

export function getPlanPrice(toolId: string, plan: string): number {
  return PRICING[toolId]?.plans[plan]?.pricePerUserPerMonth ?? 0;
}