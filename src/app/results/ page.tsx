import Link from "next/link";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-5xl mb-6">🔧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Audit engine coming Day 2
        </h1>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          The form and state are wired up. Audit logic ships tomorrow.
        </p>
        <Link
          href="/audit"
          className="text-blue-600 hover:underline font-medium text-sm"
        >
          ← Back to form
        </Link>
      </div>
    </main>
  );
}