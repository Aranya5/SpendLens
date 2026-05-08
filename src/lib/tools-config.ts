import { ToolId } from "./types";

export type ToolCategory = "ide" | "chat" | "api";

export interface ToolConfig {
  id: ToolId;
  name: string;
  emoji: string;
  category: ToolCategory;
  plans: string[];
  description: string;
  pricingUrl: string;
}

export const TOOLS: ToolConfig[] = [
  {
    id: "cursor",
    name: "Cursor",
    emoji: "⌨️",
    category: "ide",
    plans: ["Hobby", "Pro", "Business", "Enterprise"],
    description: "AI-powered code editor",
    pricingUrl: "https://cursor.com/pricing",
  },
  {
    id: "github_copilot",
    name: "GitHub Copilot",
    emoji: "🐙",
    category: "ide",
    plans: ["Individual", "Business", "Enterprise"],
    description: "AI coding assistant by GitHub",
    pricingUrl: "https://github.com/features/copilot#pricing",
  },
  {
    id: "windsurf",
    name: "Windsurf",
    emoji: "🏄",
    category: "ide",
    plans: ["Free", "Pro", "Teams"],
    description: "AI-powered IDE by Codeium",
    pricingUrl: "https://codeium.com/windsurf/pricing",
  },
  {
    id: "claude",
    name: "Claude",
    emoji: "🟠",
    category: "chat",
    plans: ["Free", "Pro", "Max", "Team", "Enterprise", "API direct"],
    description: "Anthropic's AI assistant",
    pricingUrl: "https://www.anthropic.com/pricing",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    emoji: "🟢",
    category: "chat",
    plans: ["Plus", "Team", "Enterprise", "API direct"],
    description: "OpenAI's conversational AI",
    pricingUrl: "https://openai.com/chatgpt/pricing",
  },
  {
    id: "gemini",
    name: "Gemini",
    emoji: "💎",
    category: "chat",
    plans: ["Free", "Pro", "Ultra", "API"],
    description: "Google's AI assistant",
    pricingUrl: "https://gemini.google.com/advanced",
  },
  {
    id: "anthropic_api",
    name: "Anthropic API",
    emoji: "🔶",
    category: "api",
    plans: ["Pay-as-you-go"],
    description: "Direct API access to Claude models",
    pricingUrl: "https://www.anthropic.com/pricing",
  },
  {
    id: "openai_api",
    name: "OpenAI API",
    emoji: "⚡",
    category: "api",
    plans: ["Pay-as-you-go"],
    description: "Direct API access to GPT models",
    pricingUrl: "https://openai.com/api/pricing",
  },
];

export const TOOL_MAP: Record<ToolId, ToolConfig> = Object.fromEntries(
  TOOLS.map((t) => [t.id, t])
) as Record<ToolId, ToolConfig>;

export const TOOL_CATEGORIES: Record<ToolCategory, string> = {
  ide: "Code Editors & IDEs",
  chat: "AI Assistants",
  api: "API Access (Direct)",
};