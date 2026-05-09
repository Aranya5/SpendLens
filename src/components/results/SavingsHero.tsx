interface SavingsHeroProps {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  isOverallOptimal: boolean;
}

export function SavingsHero({
  totalMonthlySavings,
  totalAnnualSavings,
  isOverallOptimal,
}: SavingsHeroProps) {
  if (isOverallOptimal) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center mb-8">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          You&apos;re spending well.
        </h2>
        <p className="text-green-700 max-w-md mx-auto text-sm leading-relaxed">
          Your AI stack looks well-optimized for your team size and use case.
          No significant savings identified with current pricing. We&apos;ll
          notify you when that changes.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-center mb-8 text-white">
      <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-5">
        Potential monthly savings found
      </p>
      <p className="text-7xl sm:text-8xl font-extrabold tracking-tight mb-3">
        ${totalMonthlySavings.toLocaleString()}
      </p>
      <p className="text-blue-200 text-lg">
        That&apos;s{" "}
        <span className="text-white font-bold">
          ${totalAnnualSavings.toLocaleString()} per year
        </span>{" "}
        left on the table
      </p>
    </div>
  );
}