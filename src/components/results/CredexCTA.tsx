interface CredexCTAProps {
  totalMonthlySavings: number;
}

export function CredexCTA({ totalMonthlySavings }: CredexCTAProps) {
  if (totalMonthlySavings < 500) return null;

  return (
    <div className="bg-gray-900 text-white rounded-3xl p-8 mb-8">
      <div className="flex items-start gap-5">
        <div className="text-3xl shrink-0">💡</div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Unlock even more savings
          </p>

          <h3 className="font-bold text-xl mb-2">
            Credex can cut this further with discounted credits
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Credex sources discounted AI infrastructure credits — Cursor,
            Claude, ChatGPT Enterprise — from companies that overforecast or
            pivoted. The discount is real and substantial. For teams at your
            spend level, a 10-minute call with Credex often finds another
            20–40% on top of the optimizations above.
          </p>

          <a
            href="https://credex.rocks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors"
          >
            Book a free Credex consultation →
          </a>
        </div>
      </div>
    </div>
  );
}