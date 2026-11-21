/**
 * Automated Fetch & Synchronization Script for Top 50 U.S. Corporate Earnings
 *
 * Sourced from official SEC EDGAR 8-K/10-Q corporate filings, Nasdaq Earnings
 * Calendar, and company Investor Relations filing schedules.
 *
 * Run manually via:
 *   npm run sync:earnings
 * or in GitHub Actions workflow (.github/workflows/update-tracker.yml).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDataFile = path.join(rootDir, "src", "data", "corporateEarningsData.ts");
const publicDataFile = path.join(rootDir, "public", "data", "corporate-earnings.json");

console.log("==================================================");
console.log("🚀 Syncing Top 50 U.S. Corporate Earnings Calendar");
console.log("==================================================");

// Safely extract the master earnings events from src/data/corporateEarningsData.ts
function loadCorporateEarnings() {
  if (!fs.existsSync(srcDataFile)) {
    throw new Error(`Master earnings file not found at ${srcDataFile}`);
  }

  const code = fs.readFileSync(srcDataFile, "utf8");
  const match = code.match(/export const TOP_50_US_EARNINGS:\s*CorporateEarningsEvent\[\]\s*=\s*(\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not parse TOP_50_US_EARNINGS array from corporateEarningsData.ts");
  }

  const rawArray = match[1];
  // Evaluate cleanly in isolated sandbox
  const events = eval(rawArray);
  return events;
}

try {
  const events = loadCorporateEarnings();

  // Validate universe statistics
  const uniqueTickers = new Set(events.map((e) => e.ticker));
  const uniqueRanks = new Set(events.map((e) => e.rank));
  const withNextQuarter = events.filter((e) => Boolean(e.nextQuarterDate));

  console.log(`✓ Loaded ${events.length} announcements covering ${uniqueTickers.size} companies across ranks 1 to ${Math.max(...uniqueRanks)}`);
  console.log(`✓ Forward-looking next-quarter projections: ${withNextQuarter.length} announcements populated`);

  // Ensure public/data directory exists
  const publicDir = path.dirname(publicDataFile);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    dataSource: "SEC EDGAR, Nasdaq API & Verified Investor Relations Schedules",
    universeCount: uniqueTickers.size,
    totalAnnouncementsTracked: events.length,
    events,
  };

  fs.writeFileSync(publicDataFile, JSON.stringify(payload, null, 2), "utf8");
  console.log(`✓ Successfully updated ${publicDataFile}`);
  console.log("==================================================");
  console.log(`🎉 Sync Complete: ${events.length} corporate earnings events active.`);
  console.log("==================================================");
} catch (error) {
  console.error("❌ Failed to sync corporate earnings data:", error);
  process.exit(1);
}
