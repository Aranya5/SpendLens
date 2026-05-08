# SpendLens — Development Log

## Day 1 — YYYY-MM-DD

**Hours worked:** 6

**What I did:**
- Initialized Next.js 15 project with TypeScript, Tailwind CSS, and App Router
- Defined all TypeScript domain types: ToolEntry, AuditFormData, AuditResult, AuditReport, LeadCapture
- Created tool configuration file listing all 8 required tools (Cursor, GitHub Copilot, Windsurf, Claude, ChatGPT, Gemini, Anthropic API, OpenAI API) with their plans, descriptions, and pricing URLs
- Set up Zustand store with persist middleware — form state survives page reloads via localStorage
- Built the full landing page: hero with value prop, social proof numbers, how-it-works, tools grid, CTA banner, footer
- Built ToolCard component: toggle switch (accessible, aria-checked), plan selector, spend input, seat count — all wired to store
- Built AuditForm component: team context fields, tools grouped by category (IDE / Chat / API), sticky bottom bar with live spend total
- Set up routing: / → landing, /audit → form, /results → placeholder
- Form state persists correctly across reloads — tested

**What I learned:**
- Keeping `monthlySpend` as a string in the Zustand store (not number) avoids NaN edge cases when the input is empty. Parse to float only at audit calculation time.
- Zustand's persist middleware plays well with Next.js App Router "use client" components without any extra hydration handling for this use case.
- The sticky bar pattern (fixed bottom, translate-y on condition) is cleaner than a floating button for multi-field forms.

**Blockers / what I'm stuck on:**
- Need to research and verify current pricing for all 8 tools before building the audit engine. Will do this first thing Day 2 and write PRICING_DATA.md as I go.
- Backend choice: leaning Supabase (free tier, familiar) over Cloudflare D1. Will decide Day 4.

**Plan for tomorrow:**
- Research and document current pricing for all 8 tools → PRICING_DATA.md
- Build the audit engine: per-tool savings logic, plan-fit evaluation, cross-tool alternatives
- Build the results page: per-tool breakdown cards, total savings hero, Credex CTA for high-savings cases
- Make the form actually navigate to a working results page
