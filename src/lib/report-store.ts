// In-memory store for Day 3.
// Replaced with Supabase on Day 4.
// Uses global to survive Next.js hot reloads in dev.

import { AuditReport } from "./types";

declare global {
  // eslint-disable-next-line no-var
  var reportStore: Map<string, AuditReport> | undefined;
}

export const reportStore: Map<string, AuditReport> =
  global.reportStore ?? new Map();

if (process.env.NODE_ENV === "development") {
  global.reportStore = reportStore;
}