import { Metadata } from "next";
import Link from "next/link";
import { ResultsView } from "@/components/results/ResultsView";

export const metadata: Metadata = {
  title: "Your AI Spend Audit | SpendLens",
  description:
    "See exactly where your team is overspending on AI tools, with specific recommendations and dollar savings.",
};

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight text-gray-900"
          >
            SpendLens
          </Link>
        </div>
      </nav>
      <ResultsView />
    </main>
  );
}