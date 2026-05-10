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


## Day 3 — 2026-05-10

**Hours worked:** 6

**What I did:**
- Created .env.local with ANTHROPIC_API_KEY and NEXT_PUBLIC_BASE_URL
- Built src/lib/report-store.ts — in-memory Map using global to survive
  Next.js hot reloads in development. Documents Day 4 Supabase replacement.
- Built POST /api/reports — saves AuditReport by ID, returns ID to client
- Built GET /api/reports/[id] — fetches report by ID for the shared page
- Built POST /api/summarize — calls Anthropic API (claude-haiku-4-5),
  catches all errors and returns templated fallback with fallback:true flag.
  Never crashes the results page.
- Built AISummary component — skeleton loader during fetch, "templated"
  badge when fallback, nothing rendered if summary is null
- Built ShareBox component — copy-to-clipboard, shows after reportId
  returned from API, loading skeleton while saving
- Updated ResultsView to fire saveReport() and fetchSummary() in parallel
  on mount — neither blocks the other or the main results render
- Built /report/[id] shared page — server component, reads directly from
  reportStore (same process), strips email/company (not in AuditReport
  anyway), shows OG and Twitter Card meta via generateMetadata
- Wrote PROMPTS.md documenting the prompt, model choice, 4 failed attempts,
  and fallback behavior

**What I learned:**
- In Next.js App Router, server components in the same process can import
  the in-memory store directly — no need to self-fetch via HTTP. This is
  cleaner and faster but won't work on Vercel where each function invocation
  is a separate process. Documented this limitation; Supabase fixes it Day 4.
- Firing saveReport and fetchSummary in parallel (not awaiting one before
  the other) cut the time-to-share-URL by ~half.
- The AISummary skeleton loader matters a lot perceptually — the results page
  feels complete even while the AI summary is loading, because the savings
  hero and per-tool cards are already visible.

**Blockers / what I'm stuck on:**
- The in-memory report store resets on server restart, so /report/[id] links
  die after a dev server restart. This is the #1 priority for Day 4 (Supabase).
- AI summary isn't being saved back to the AuditReport in the store — if
  someone shares the link, the shared page won't show the AI summary.
  Will fix this on Day 4 when persisting to Supabase.

**Plan for tomorrow:**
- Set up Supabase: audits table + leads table
- Wire lead capture (email form in LeadCaptureBox) to POST /api/leads
- Set up Resend for transactional email confirmation
- Add rate limiting / honeypot to lead capture
- Save AI summary back into the report before persisting to Supabase
- Replace in-memory store with Supabase reads/writes