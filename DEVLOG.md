# SpendLens — Development Log

## Day 1 — 2026-05-08

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



## Day 2 — 2026-05-09

**Hours worked:** 7

**What I did:**
- Fixed Tailwind deprecation warning: flex-shrink-0 → shrink-0 in ToolCard (Tailwind v4 canonical classes)
- Updated AuditResult type to include toolName and currentPlan fields needed by result components
- Built src/lib/pricing.ts — structured pricing data for all 8 tools with plan-level granularity
- Built src/lib/audit-engine.ts — per-tool audit functions covering plan-fit, seat count mismatches, cross-tool overlap, and API optimization recommendations. Each savings figure is conservative and traceable to plan pricing math.
- Cross-tool overlap detection: flags Gemini paid plans when Claude or ChatGPT are already active
- Built SavingsHero component — two states: big savings number (blue gradient) vs "you're spending well" (green, honest)
- Built AuditResultCard — shows current plan, recommended action, reason, potential savings per tool
- Built CredexCTA — only renders when total savings > $500/mo (not manufactured)
- Built LeadCaptureBox — email capture, wired to console.log for now (Supabase + Resend Day 4)
- Built ResultsView — reads from Zustand store, runs audit synchronously, renders full results page
- Replaced results/page.tsx placeholder with real page
- Wrote PRICING_DATA.md with all sources — verified each URL manually during writing

**What I learned:**
- Keeping audit functions as individual named functions (auditCursor, auditClaude, etc.) instead of a big switch with inline logic makes each rule independently testable — this matters a lot for Day 5 when I write tests.
- The cross-tool overlap case (paying for Gemini + Claude) is the most subjective part of the engine. Framed it as "evaluate overlap" with explicit reasoning rather than a blanket "cancel Gemini" to stay defensible.
- Running the audit synchronously on the client (no API call) means instant results — avoids loading state complexity and no backend needed for the core audit.

**Blockers / what I'm stuck on:**
- AI summary (Anthropic API) not built yet — Day 3 task. Placeholder in AuditReport type.
- Shareable URL requires persisting the report server-side — planning Supabase for Day 4 combined with lead capture.
- Windsurf pricing: the Teams plan was $35/mo at time of writing — should re-verify closer to submission.

**Plan for tomorrow:**
- Integrate Anthropic API for AI-generated personalized summary paragraph
- Add graceful fallback for API failures (templated summary)
- Write PROMPTS.md
- Generate unique shareable URLs for each audit (slug-based, stored in localStorage for now, Supabase Day 4)
- Add Open Graph + Twitter Card meta tags to the results URL