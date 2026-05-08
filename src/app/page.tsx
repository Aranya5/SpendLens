import Link from "next/link";

const TOOLS_LIST = [
  "Cursor",
  "GitHub Copilot",
  "Windsurf",
  "Claude",
  "ChatGPT",
  "Gemini",
  "Anthropic API",
  "OpenAI API",
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Enter your tools",
    desc: "Toggle the AI tools you pay for. Add your plan, monthly spend, and seat count.",
  },
  {
    step: "2",
    title: "We run the audit",
    desc: "SpendLens checks each tool against current pricing, your plan fit, and cheaper alternatives for your use case.",
  },
  {
    step: "3",
    title: "See your savings",
    desc: "Per-tool recommendations with defensible numbers. No vague suggestions — specific actions and dollar amounts.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight text-gray-900">
            SpendLens
          </span>
          <Link
            href="/audit"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            Start Audit →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-blue-100">
          🔍 Free · No signup required · 2 minutes
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
          Are you overpaying for
          <br />
          <span className="text-blue-600">AI tools?</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          SpendLens audits your AI tool stack and shows exactly where
          you&apos;re overspending — with specific, finance-defensible
          recommendations.
        </p>

        <Link
          href="/audit"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-10 py-4 rounded-2xl text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
        >
          Audit My AI Stack
          <span aria-hidden>→</span>
        </Link>

        <p className="mt-5 text-sm text-gray-400">
          Free forever · Email only asked after results are shown
        </p>
      </section>

      {/* Social proof placeholder */}
      <section className="border-y border-gray-100 py-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest font-medium">
            What founders are finding
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { stat: "$640/mo", label: "avg. savings found per audit" },
              { stat: "8 tools", label: "covered and updated weekly" },
              { stat: "2 min", label: "to complete the full audit" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold text-gray-900">{item.stat}</p>
                <p className="text-sm text-gray-400 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            How it works
          </h2>
          <p className="text-gray-400 text-center mb-14">
            No smoke and mirrors — here&apos;s exactly what we do.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tools we audit
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Pricing verified against official vendor pages — updated every week
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TOOLS_LIST.map((tool) => (
              <span
                key={tool}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-blue-600 py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Most teams find $200–$800/mo in unnecessary AI spend.
          </h2>
          <p className="text-blue-100 mb-10 text-lg">
            Takes 2 minutes. No account. No spam.
          </p>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-10 py-4 rounded-2xl text-lg hover:bg-blue-50 transition-colors"
          >
            Start Free Audit →
          </Link>
        </div>
      </section>

      {/* Footer */}
<footer className="border-t border-gray-100 py-10 text-center">
  <p className="text-sm text-gray-400">
    SpendLens is a free tool by{" "}
    <a
      href="https://credex.rocks"
      className="text-blue-600 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      Credex
    </a>{" "}
    — discounted AI infrastructure credits for startups.
  </p>
</footer>
    </main>
  );
}