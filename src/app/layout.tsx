import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpendLens — AI Tool Spend Audit",
  description:
    "Find out if your startup is overpaying for AI tools. Free 2-minute audit. No signup required.",
  openGraph: {
    title: "SpendLens — AI Tool Spend Audit",
    description: "Most teams find $200–$800/mo in unnecessary AI spend.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}