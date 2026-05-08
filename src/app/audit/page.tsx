import { Metadata } from "next";
import Link from "next/link";
import { AuditForm } from "@/components/form/AuditForm";

export const metadata: Metadata = {
  title: "Audit My AI Stack | SpendLens",
  description:
    "Enter your AI tools and get an instant breakdown of where you're overspending.",
};

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-xl tracking-tight text-gray-900"
          >
            SpendLens
          </Link>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            Auto-saves as you type
          </span>
        </div>
      </nav>
      <AuditForm />
    </main>
  );
}