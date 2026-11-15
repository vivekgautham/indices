export interface FomcMeeting {
  year: number;
  startDate: string; // YYYY-MM-DD
  decisionDate: string; // YYYY-MM-DD
  hasSep: boolean; // Summary of Economic Projections (Dot Plot)
  statementTime: string; // "2:00 PM ET"
  pressConferenceTime: string; // "2:30 PM ET"
}

// Official Federal Reserve FOMC Meeting Schedules for 2025, 2026, and 2027
// Source: https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm
export const FOMC_SCHEDULES: FomcMeeting[] = [
  // 2025
  { year: 2025, startDate: "2025-01-28", decisionDate: "2025-01-29", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2025, startDate: "2025-03-18", decisionDate: "2025-03-19", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2025, startDate: "2025-05-06", decisionDate: "2025-05-07", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2025, startDate: "2025-06-17", decisionDate: "2025-06-18", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2025, startDate: "2025-07-29", decisionDate: "2025-07-30", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2025, startDate: "2025-09-16", decisionDate: "2025-09-17", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2025, startDate: "2025-10-28", decisionDate: "2025-10-29", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2025, startDate: "2025-12-09", decisionDate: "2025-12-10", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },

  // 2026
  { year: 2026, startDate: "2026-01-27", decisionDate: "2026-01-28", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2026, startDate: "2026-03-17", decisionDate: "2026-03-18", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2026, startDate: "2026-04-28", decisionDate: "2026-04-29", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2026, startDate: "2026-06-16", decisionDate: "2026-06-17", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2026, startDate: "2026-07-28", decisionDate: "2026-07-29", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2026, startDate: "2026-09-15", decisionDate: "2026-09-16", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2026, startDate: "2026-10-27", decisionDate: "2026-10-28", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2026, startDate: "2026-12-08", decisionDate: "2026-12-09", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },

  // 2027
  { year: 2027, startDate: "2027-01-26", decisionDate: "2027-01-27", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2027, startDate: "2027-03-16", decisionDate: "2027-03-17", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2027, startDate: "2027-04-27", decisionDate: "2027-04-28", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2027, startDate: "2027-06-15", decisionDate: "2027-06-16", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2027, startDate: "2027-07-27", decisionDate: "2027-07-28", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2027, startDate: "2027-09-21", decisionDate: "2027-09-22", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2027, startDate: "2027-11-02", decisionDate: "2027-11-03", hasSep: false, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
  { year: 2027, startDate: "2027-12-14", decisionDate: "2027-12-15", hasSep: true, statementTime: "2:00 PM ET", pressConferenceTime: "2:30 PM ET" },
];

/**
 * Computes the FOMC minutes release date (exactly 21 calendar days after decision date).
 */
export function getFomcMinutesDate(decisionDateStr: string): string {
  const [year, month, day] = decisionDateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + 21);
  return date.toISOString().split("T")[0];
}
