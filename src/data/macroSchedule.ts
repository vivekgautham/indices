export type MacroReportType = "cpi" | "jobs" | "sentiment";

export interface MacroReportEvent {
  type: MacroReportType;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "8:30 AM ET"
  referencePeriod: string;
  description: string;
}

/**
 * Official U.S. Macroeconomic Release Schedules (2025 - 2027)
 * Sources:
 * - U.S. Bureau of Labor Statistics (BLS) Release Calendar: https://www.bls.gov/schedule/news_release/
 * - University of Michigan Surveys of Consumers: http://www.sca.isr.umich.edu/
 */
export const MACRO_ECONOMIC_SCHEDULE: MacroReportEvent[] = [
  // =========================================================================
  // 2025 SCHEDULE
  // =========================================================================
  // January 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-01-10",
    time: "8:30 AM ET",
    referencePeriod: "December 2024",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-01-15",
    time: "8:30 AM ET",
    referencePeriod: "December 2024",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-01-17",
    time: "10:00 AM ET",
    referencePeriod: "January 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-01-31",
    time: "10:00 AM ET",
    referencePeriod: "January 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // February 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-02-07",
    time: "8:30 AM ET",
    referencePeriod: "January 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-02-12",
    time: "8:30 AM ET",
    referencePeriod: "January 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-02-14",
    time: "10:00 AM ET",
    referencePeriod: "February 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-02-28",
    time: "10:00 AM ET",
    referencePeriod: "February 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // March 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-03-07",
    time: "8:30 AM ET",
    referencePeriod: "February 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-03-12",
    time: "8:30 AM ET",
    referencePeriod: "February 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-03-14",
    time: "10:00 AM ET",
    referencePeriod: "March 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-03-28",
    time: "10:00 AM ET",
    referencePeriod: "March 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // April 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-04-04",
    time: "8:30 AM ET",
    referencePeriod: "March 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-04-10",
    time: "8:30 AM ET",
    referencePeriod: "March 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-04-11",
    time: "10:00 AM ET",
    referencePeriod: "April 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-04-25",
    time: "10:00 AM ET",
    referencePeriod: "April 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // May 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-05-02",
    time: "8:30 AM ET",
    referencePeriod: "April 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-05-13",
    time: "8:30 AM ET",
    referencePeriod: "April 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-05-16",
    time: "10:00 AM ET",
    referencePeriod: "May 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-05-30",
    time: "10:00 AM ET",
    referencePeriod: "May 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // June 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-06-06",
    time: "8:30 AM ET",
    referencePeriod: "May 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-06-11",
    time: "8:30 AM ET",
    referencePeriod: "May 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-06-13",
    time: "10:00 AM ET",
    referencePeriod: "June 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-06-27",
    time: "10:00 AM ET",
    referencePeriod: "June 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // July 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-07-03", // Thursday before July 4th holiday
    time: "8:30 AM ET",
    referencePeriod: "June 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-07-15",
    time: "8:30 AM ET",
    referencePeriod: "June 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-07-18",
    time: "10:00 AM ET",
    referencePeriod: "July 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-07-25",
    time: "10:00 AM ET",
    referencePeriod: "July 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // August 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-08-01",
    time: "8:30 AM ET",
    referencePeriod: "July 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-08-13",
    time: "8:30 AM ET",
    referencePeriod: "July 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-08-15",
    time: "10:00 AM ET",
    referencePeriod: "August 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-08-29",
    time: "10:00 AM ET",
    referencePeriod: "August 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // September 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-09-05",
    time: "8:30 AM ET",
    referencePeriod: "August 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-09-11",
    time: "8:30 AM ET",
    referencePeriod: "August 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-09-12",
    time: "10:00 AM ET",
    referencePeriod: "September 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-09-26",
    time: "10:00 AM ET",
    referencePeriod: "September 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // October 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-10-03",
    time: "8:30 AM ET",
    referencePeriod: "September 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-10-15",
    time: "8:30 AM ET",
    referencePeriod: "September 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-10-10",
    time: "10:00 AM ET",
    referencePeriod: "October 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-10-24",
    time: "10:00 AM ET",
    referencePeriod: "October 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // November 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-11-07",
    time: "8:30 AM ET",
    referencePeriod: "October 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-11-13",
    time: "8:30 AM ET",
    referencePeriod: "October 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-11-07",
    time: "10:00 AM ET",
    referencePeriod: "November 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-11-26", // Wednesday before Thanksgiving
    time: "10:00 AM ET",
    referencePeriod: "November 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // December 2025
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2025-12-05",
    time: "8:30 AM ET",
    referencePeriod: "November 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2025-12-10",
    time: "8:30 AM ET",
    referencePeriod: "November 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2025-12-12",
    time: "10:00 AM ET",
    referencePeriod: "December 2025 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2025-12-23",
    time: "10:00 AM ET",
    referencePeriod: "December 2025 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // =========================================================================
  // 2026 SCHEDULE
  // =========================================================================
  // Jan 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-01-09",
    time: "8:30 AM ET",
    referencePeriod: "December 2025",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-01-14",
    time: "8:30 AM ET",
    referencePeriod: "December 2025",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-01-16",
    time: "10:00 AM ET",
    referencePeriod: "January 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-01-30",
    time: "10:00 AM ET",
    referencePeriod: "January 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Feb 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-02-06",
    time: "8:30 AM ET",
    referencePeriod: "January 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-02-11",
    time: "8:30 AM ET",
    referencePeriod: "January 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-02-13",
    time: "10:00 AM ET",
    referencePeriod: "February 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-02-27",
    time: "10:00 AM ET",
    referencePeriod: "February 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Mar 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-03-06",
    time: "8:30 AM ET",
    referencePeriod: "February 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-03-11",
    time: "8:30 AM ET",
    referencePeriod: "February 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-03-13",
    time: "10:00 AM ET",
    referencePeriod: "March 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-03-27",
    time: "10:00 AM ET",
    referencePeriod: "March 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Apr 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-04-03",
    time: "8:30 AM ET",
    referencePeriod: "March 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-04-14",
    time: "8:30 AM ET",
    referencePeriod: "March 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-04-10",
    time: "10:00 AM ET",
    referencePeriod: "April 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-04-24",
    time: "10:00 AM ET",
    referencePeriod: "April 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // May 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-05-08",
    time: "8:30 AM ET",
    referencePeriod: "April 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-05-13",
    time: "8:30 AM ET",
    referencePeriod: "April 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-05-15",
    time: "10:00 AM ET",
    referencePeriod: "May 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-05-29",
    time: "10:00 AM ET",
    referencePeriod: "May 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Jun 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-06-05",
    time: "8:30 AM ET",
    referencePeriod: "May 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-06-10",
    time: "8:30 AM ET",
    referencePeriod: "May 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-06-12",
    time: "10:00 AM ET",
    referencePeriod: "June 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-06-26",
    time: "10:00 AM ET",
    referencePeriod: "June 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Jul 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-07-02", // Thursday before July 3rd observed holiday
    time: "8:30 AM ET",
    referencePeriod: "June 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-07-14",
    time: "8:30 AM ET",
    referencePeriod: "June 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-07-17",
    time: "10:00 AM ET",
    referencePeriod: "July 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-07-31",
    time: "10:00 AM ET",
    referencePeriod: "July 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Aug 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-08-07",
    time: "8:30 AM ET",
    referencePeriod: "July 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-08-12",
    time: "8:30 AM ET",
    referencePeriod: "July 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-08-14",
    time: "10:00 AM ET",
    referencePeriod: "August 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-08-28",
    time: "10:00 AM ET",
    referencePeriod: "August 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Sep 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-09-04",
    time: "8:30 AM ET",
    referencePeriod: "August 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-09-15",
    time: "8:30 AM ET",
    referencePeriod: "August 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-09-11",
    time: "10:00 AM ET",
    referencePeriod: "September 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-09-25",
    time: "10:00 AM ET",
    referencePeriod: "September 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Oct 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-10-02",
    time: "8:30 AM ET",
    referencePeriod: "September 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-10-14",
    time: "8:30 AM ET",
    referencePeriod: "September 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-10-09",
    time: "10:00 AM ET",
    referencePeriod: "October 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-10-23",
    time: "10:00 AM ET",
    referencePeriod: "October 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Nov 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-11-06",
    time: "8:30 AM ET",
    referencePeriod: "October 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-11-12",
    time: "8:30 AM ET",
    referencePeriod: "October 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-11-13",
    time: "10:00 AM ET",
    referencePeriod: "November 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-11-25", // Wednesday before Thanksgiving
    time: "10:00 AM ET",
    referencePeriod: "November 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Dec 2026
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2026-12-04",
    time: "8:30 AM ET",
    referencePeriod: "November 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2026-12-10",
    time: "8:30 AM ET",
    referencePeriod: "November 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2026-12-11",
    time: "10:00 AM ET",
    referencePeriod: "December 2026 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2026-12-22",
    time: "10:00 AM ET",
    referencePeriod: "December 2026 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // =========================================================================
  // 2027 SCHEDULE
  // =========================================================================
  // Jan 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-01-08",
    time: "8:30 AM ET",
    referencePeriod: "December 2026",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-01-13",
    time: "8:30 AM ET",
    referencePeriod: "December 2026",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-01-15",
    time: "10:00 AM ET",
    referencePeriod: "January 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-01-29",
    time: "10:00 AM ET",
    referencePeriod: "January 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Feb 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-02-05",
    time: "8:30 AM ET",
    referencePeriod: "January 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-02-10",
    time: "8:30 AM ET",
    referencePeriod: "January 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-02-12",
    time: "10:00 AM ET",
    referencePeriod: "February 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-02-26",
    time: "10:00 AM ET",
    referencePeriod: "February 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Mar 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-03-05",
    time: "8:30 AM ET",
    referencePeriod: "February 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-03-10",
    time: "8:30 AM ET",
    referencePeriod: "February 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-03-12",
    time: "10:00 AM ET",
    referencePeriod: "March 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-03-26",
    time: "10:00 AM ET",
    referencePeriod: "March 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Apr 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-04-02",
    time: "8:30 AM ET",
    referencePeriod: "March 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-04-14",
    time: "8:30 AM ET",
    referencePeriod: "March 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-04-16",
    time: "10:00 AM ET",
    referencePeriod: "April 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-04-30",
    time: "10:00 AM ET",
    referencePeriod: "April 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // May 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-05-07",
    time: "8:30 AM ET",
    referencePeriod: "April 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-05-12",
    time: "8:30 AM ET",
    referencePeriod: "April 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-05-14",
    time: "10:00 AM ET",
    referencePeriod: "May 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-05-28",
    time: "10:00 AM ET",
    referencePeriod: "May 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Jun 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-06-04",
    time: "8:30 AM ET",
    referencePeriod: "May 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-06-10",
    time: "8:30 AM ET",
    referencePeriod: "May 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-06-11",
    time: "10:00 AM ET",
    referencePeriod: "June 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-06-25",
    time: "10:00 AM ET",
    referencePeriod: "June 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Jul 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-07-02",
    time: "8:30 AM ET",
    referencePeriod: "June 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-07-14",
    time: "8:30 AM ET",
    referencePeriod: "June 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-07-16",
    time: "10:00 AM ET",
    referencePeriod: "July 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-07-30",
    time: "10:00 AM ET",
    referencePeriod: "July 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Aug 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-08-06",
    time: "8:30 AM ET",
    referencePeriod: "July 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-08-11",
    time: "8:30 AM ET",
    referencePeriod: "July 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-08-13",
    time: "10:00 AM ET",
    referencePeriod: "August 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-08-27",
    time: "10:00 AM ET",
    referencePeriod: "August 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Sep 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-09-03",
    time: "8:30 AM ET",
    referencePeriod: "August 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-09-14",
    time: "8:30 AM ET",
    referencePeriod: "August 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-09-17",
    time: "10:00 AM ET",
    referencePeriod: "September 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-09-24",
    time: "10:00 AM ET",
    referencePeriod: "September 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Oct 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-10-08",
    time: "8:30 AM ET",
    referencePeriod: "September 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-10-13",
    time: "8:30 AM ET",
    referencePeriod: "September 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-10-15",
    time: "10:00 AM ET",
    referencePeriod: "October 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-10-29",
    time: "10:00 AM ET",
    referencePeriod: "October 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Nov 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-11-05",
    time: "8:30 AM ET",
    referencePeriod: "October 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-11-10",
    time: "8:30 AM ET",
    referencePeriod: "October 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-11-12",
    time: "10:00 AM ET",
    referencePeriod: "November 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-11-24", // Wednesday before Thanksgiving
    time: "10:00 AM ET",
    referencePeriod: "November 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },

  // Dec 2027
  {
    type: "jobs",
    title: "U.S. Employment Situation & Unemployment Rate",
    date: "2027-12-03",
    time: "8:30 AM ET",
    referencePeriod: "November 2027",
    description:
      "Nonfarm Payroll additions, headline Unemployment Rate (U-3), and Average Hourly Earnings wage growth.",
  },
  {
    type: "cpi",
    title: "U.S. Consumer Price Index (CPI) Inflation",
    date: "2027-12-09",
    time: "8:30 AM ET",
    referencePeriod: "November 2027",
    description:
      "Headline CPI and Core CPI (excluding food and energy). Key inflation barometer for Fed rate decisions.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Preliminary)",
    date: "2027-12-10",
    time: "10:00 AM ET",
    referencePeriod: "December 2027 Prelim",
    description:
      "Consumer confidence, current economic conditions, and 1-year & 5-year inflation expectations.",
  },
  {
    type: "sentiment",
    title: "U.Mich Consumer Sentiment (Final)",
    date: "2027-12-22",
    time: "10:00 AM ET",
    referencePeriod: "December 2027 Final",
    description:
      "Final monthly revision of University of Michigan consumer confidence and inflation expectations.",
  },
];
