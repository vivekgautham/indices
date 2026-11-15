import { FOMC_SCHEDULES, getFomcMinutesDate } from "../data/fomcSchedule";

export type EventCategory =
  | "rebalance"
  | "witching"
  | "opex"
  | "fomc"
  | "holiday";

export type EventImpact = "high" | "medium" | "low";

export interface MarketEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: EventCategory;
  impact: EventImpact;
  provider?: string;
  description: string;
  affectedTickers?: string[];
  time?: string;
  tags: string[];
  link?: string;
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  rebalance: "Index Rebalances",
  witching: "Triple / Quad Witching",
  opex: "Options & VIX Expiry",
  fomc: "FOMC & Fed Minutes",
  holiday: "Market Holidays",
};

export const CATEGORY_COLORS: Record<
  EventCategory,
  { bg: string; border: string; text: string; dot: string }
> = {
  rebalance: {
    bg: "rgba(0, 221, 148, 0.12)",
    border: "rgba(0, 221, 148, 0.35)",
    text: "#00DD94",
    dot: "#00DD94",
  },
  witching: {
    bg: "rgba(168, 85, 247, 0.14)",
    border: "rgba(168, 85, 247, 0.4)",
    text: "#c084fc",
    dot: "#a855f7",
  },
  opex: {
    bg: "rgba(14, 165, 233, 0.12)",
    border: "rgba(14, 165, 233, 0.35)",
    text: "#38bdf8",
    dot: "#0ea5e9",
  },
  fomc: {
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.35)",
    text: "#fbbf24",
    dot: "#f59e0b",
  },
  holiday: {
    bg: "rgba(239, 68, 68, 0.12)",
    border: "rgba(239, 68, 68, 0.35)",
    text: "#f87171",
    dot: "#ef4444",
  },
};

/**
 * Pads a single-digit integer to two digits string.
 */
function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/**
 * Returns formatted ISO date YYYY-MM-DD
 */
export function formatIsoDate(year: number, month: number, day: number): string {
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

/**
 * Finds the nth occurrence of a day of the week in a given month.
 * dayOfWeek: 0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday
 * n: 1 = 1st, 2 = 2nd, 3 = 3rd, 4 = 4th, 5 = 5th
 */
export function getNthDayOfWeek(
  year: number,
  month: number, // 1 - 12
  dayOfWeek: number, // 0 - 6
  n: number
): number {
  let count = 0;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(Date.UTC(year, month - 1, day));
    if (d.getUTCDay() === dayOfWeek) {
      count++;
      if (count === n) {
        return day;
      }
    }
  }
  return -1;
}

/**
 * Finds the last occurrence of a day of the week in a given month.
 */
export function getLastDayOfWeek(
  year: number,
  month: number,
  dayOfWeek: number
): number {
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = daysInMonth; day >= 1; day--) {
    const d = new Date(Date.UTC(year, month - 1, day));
    if (d.getUTCDay() === dayOfWeek) {
      return day;
    }
  }
  return -1;
}

/**
 * Returns the last business day of the month (skipping Saturday and Sunday).
 */
export function getLastBusinessDay(year: number, month: number): number {
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = daysInMonth; day >= 1; day--) {
    const d = new Date(Date.UTC(year, month - 1, day));
    const dow = d.getUTCDay();
    if (dow !== 0 && dow !== 6) {
      return day;
    }
  }
  return daysInMonth;
}

/**
 * Anonymous Gregorian Easter algorithm to determine Good Friday.
 */
function getGoodFriday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const easterMonth = Math.floor((h + l - 7 * m + 114) / 31);
  const easterDay = ((h + l - 7 * m + 114) % 31) + 1;

  // Good Friday is 2 days before Easter Sunday
  const easterDate = new Date(Date.UTC(year, easterMonth - 1, easterDay));
  easterDate.setUTCDate(easterDate.getUTCDate() - 2);

  return {
    month: easterDate.getUTCMonth() + 1,
    day: easterDate.getUTCDate(),
  };
}

/**
 * Returns US market holidays for the given year.
 */
export function getUsMarketHolidays(year: number): MarketEvent[] {
  const holidays: MarketEvent[] = [];

  const addHoliday = (
    title: string,
    month: number,
    day: number,
    desc: string
  ) => {
    holidays.push({
      id: `holiday-${year}-${pad2(month)}-${pad2(day)}`,
      title,
      date: formatIsoDate(year, month, day),
      category: "holiday",
      impact: "low",
      provider: "NYSE / Nasdaq",
      description: desc,
      tags: ["Market Holiday", "Exchange Closed", "NYSE"],
    });
  };

  // 1. New Year's Day (Jan 1)
  const jan1 = new Date(Date.UTC(year, 0, 1));
  if (jan1.getUTCDay() === 0) {
    addHoliday("New Year's Day (Observed)", 1, 2, "U.S. financial markets closed.");
  } else if (jan1.getUTCDay() !== 6) {
    addHoliday("New Year's Day", 1, 1, "U.S. financial markets closed.");
  }

  // 2. MLK Day: 3rd Monday in Jan
  const mlkDay = getNthDayOfWeek(year, 1, 1, 3);
  if (mlkDay > 0) {
    addHoliday("Martin Luther King Jr. Day", 1, mlkDay, "U.S. financial markets closed.");
  }

  // 3. Washington's Birthday (Presidents' Day): 3rd Monday in Feb
  const presDay = getNthDayOfWeek(year, 2, 1, 3);
  if (presDay > 0) {
    addHoliday("Washington's Birthday (Presidents' Day)", 2, presDay, "U.S. financial markets closed.");
  }

  // 4. Good Friday
  const gf = getGoodFriday(year);
  addHoliday("Good Friday", gf.month, gf.day, "U.S. equity and options markets closed.");

  // 5. Memorial Day: Last Monday in May
  const memDay = getLastDayOfWeek(year, 5, 1);
  if (memDay > 0) {
    addHoliday("Memorial Day", 5, memDay, "U.S. financial markets closed.");
  }

  // 6. Juneteenth (June 19)
  const jun19 = new Date(Date.UTC(year, 5, 19));
  if (jun19.getUTCDay() === 0) {
    addHoliday("Juneteenth National Independence Day (Observed)", 6, 20, "U.S. financial markets closed.");
  } else if (jun19.getUTCDay() === 6) {
    addHoliday("Juneteenth National Independence Day (Observed)", 6, 18, "U.S. financial markets closed.");
  } else {
    addHoliday("Juneteenth National Independence Day", 6, 19, "U.S. financial markets closed.");
  }

  // 7. Independence Day (July 4)
  const jul4 = new Date(Date.UTC(year, 6, 4));
  if (jul4.getUTCDay() === 0) {
    addHoliday("Independence Day (Observed)", 7, 5, "U.S. financial markets closed.");
  } else if (jul4.getUTCDay() === 6) {
    addHoliday("Independence Day (Observed)", 7, 3, "U.S. financial markets closed.");
  } else {
    addHoliday("Independence Day", 7, 4, "U.S. financial markets closed.");
  }

  // 8. Labor Day: 1st Monday in September
  const laborDay = getNthDayOfWeek(year, 9, 1, 1);
  if (laborDay > 0) {
    addHoliday("Labor Day", 9, laborDay, "U.S. financial markets closed.");
  }

  // 9. Thanksgiving Day: 4th Thursday in November
  const thanksgiving = getNthDayOfWeek(year, 11, 4, 4);
  if (thanksgiving > 0) {
    addHoliday("Thanksgiving Day", 11, thanksgiving, "U.S. financial markets closed.");
  }

  // 10. Christmas Day (Dec 25)
  const dec25 = new Date(Date.UTC(year, 11, 25));
  if (dec25.getUTCDay() === 0) {
    addHoliday("Christmas Day (Observed)", 12, 26, "U.S. financial markets closed.");
  } else if (dec25.getUTCDay() === 6) {
    addHoliday("Christmas Day (Observed)", 12, 24, "U.S. financial markets closed.");
  } else {
    addHoliday("Christmas Day", 12, 25, "U.S. financial markets closed.");
  }

  return holidays;
}

/**
 * Returns all market events for a specific year and month (1 - 12).
 */
export function getMonthMarketEvents(year: number, month: number): MarketEvent[] {
  const events: MarketEvent[] = [];

  const thirdFriday = getNthDayOfWeek(year, month, 5, 3);
  const firstFriday = getNthDayOfWeek(year, month, 5, 1);
  const lastBusinessDay = getLastBusinessDay(year, month);
  const isQuarterEndMonth = month === 3 || month === 6 || month === 9 || month === 12;

  // -----------------------------------------------------------------
  // 1. Triple / Quad Witching & Options Expiration (OPEX)
  // -----------------------------------------------------------------
  if (thirdFriday > 0) {
    const thirdFridayIso = formatIsoDate(year, month, thirdFriday);

    if (isQuarterEndMonth) {
      // Quadruple / Triple Witching
      events.push({
        id: `witching-${year}-${pad2(month)}`,
        title: "Triple / Quadruple Witching",
        date: thirdFridayIso,
        category: "witching",
        impact: "high",
        provider: "Cboe / CME / OCC",
        time: "Market Close (4:00 PM ET)",
        description:
          "Simultaneous quarterly expiration of single-stock options, stock index options, stock index futures, and single-stock futures. Typically one of the highest volume trading sessions of the quarter with heavy closing auction order imbalance flow.",
        affectedTickers: ["SPY", "QQQ", "IWM", "ES Futures", "NQ Futures"],
        tags: ["Derivatives", "Quad Witching", "Index Futures", "High Volume"],
      });
    } else {
      // Monthly OPEX
      events.push({
        id: `opex-${year}-${pad2(month)}`,
        title: "Monthly Options Expiration (OPEX)",
        date: thirdFridayIso,
        category: "opex",
        impact: "medium",
        provider: "Cboe / OCC",
        time: "Market Close (4:00 PM ET)",
        description:
          "Monthly expiration for standard U.S. listed equity and index options contracts across Cboe, Nasdaq, and NYSE exchanges. Dealers often adjust delta-hedging gamma positions leading into the close.",
        affectedTickers: ["SPY", "QQQ", "IWM"],
        tags: ["Derivatives", "Monthly OPEX", "Options Expiration"],
      });
    }

    // VIX Expiration: Wednesday immediately preceding the 3rd Friday
    const vixDate = new Date(Date.UTC(year, month - 1, thirdFriday));
    vixDate.setUTCDate(vixDate.getUTCDate() - 2); // Friday minus 2 days = Wednesday
    const vixIso = vixDate.toISOString().split("T")[0];

    events.push({
      id: `vix-expiry-${year}-${pad2(month)}`,
      title: "Cboe VIX Monthly Expiration",
      date: vixIso,
      category: "opex",
      impact: "medium",
      provider: "Cboe",
      time: "Market Open (9:30 AM ET SOQ)",
      description:
        "Cboe VIX monthly options and futures settlement at the market open via Special Opening Quotation (SOQ). Volatility rolls, pinned strikes, and gamma repositioning typically peak around this session.",
      affectedTickers: ["^VIX", "UVXY", "VXX", "SVXY"],
      tags: ["Volatility", "VIX", "Cboe", "Derivatives"],
    });
  }

  // -----------------------------------------------------------------
  // 2. Index Rebalances & Reconstitutions
  // -----------------------------------------------------------------

  // A. S&P Dow Jones Quarterly Rebalancing
  if (isQuarterEndMonth) {
    if (firstFriday > 0) {
      events.push({
        id: `sp-announce-${year}-${pad2(month)}`,
        title: "S&P Dow Jones Quarterly Rebalance Announcement",
        date: formatIsoDate(year, month, firstFriday),
        category: "rebalance",
        impact: "medium",
        provider: "S&P Dow Jones Indices",
        time: "After Market Close (5:15 PM ET)",
        description:
          "S&P DJI announces constituent additions, deletions, and investable weight factor (IWF) float updates for the S&P 500, S&P MidCap 400, and S&P SmallCap 600.",
        affectedTickers: ["SPY", "VOO", "IVV", "IJH", "IJR"],
        tags: ["S&P DJI", "Index Announcement", "S&P 500", "Constituent Changes"],
      });
    }

    if (thirdFriday > 0) {
      events.push({
        id: `sp-effective-${year}-${pad2(month)}`,
        title: "S&P Dow Jones Quarterly Rebalance Effective Date",
        date: formatIsoDate(year, month, thirdFriday),
        category: "rebalance",
        impact: "high",
        provider: "S&P Dow Jones Indices",
        time: "Market Close (4:00 PM ET)",
        description:
          "Quarterly reconstitution and share count rebalance becomes effective at the market close for S&P 500, S&P MidCap 400, and S&P SmallCap 600. Trillions in passive benchmark tracking funds rebalance their portfolio weights at the closing cross.",
        affectedTickers: ["SPY", "VOO", "IVV", "IJH", "IJR"],
        tags: ["S&P DJI", "Index Rebalance", "Passive Flows", "High Turnover"],
      });
    }

    // Nasdaq-100 Quarterly Rebalancing
    if (thirdFriday > 0) {
      events.push({
        id: `nasdaq100-qrebal-${year}-${pad2(month)}`,
        title:
          month === 12
            ? "Nasdaq-100 Annual Reconstitution Effective Date"
            : "Nasdaq-100 Quarterly Share Adjustment",
        date: formatIsoDate(year, month, thirdFriday),
        category: "rebalance",
        impact: month === 12 ? "high" : "medium",
        provider: "Nasdaq",
        time: "Market Close (4:00 PM ET)",
        description:
          month === 12
            ? "Nasdaq-100 annual reconstitution effective at the market close (changes trade Monday open). New index additions and deletions take effect with major ETF reallocations."
            : "Nasdaq quarterly weight adjustments and share count updates take effect at the close.",
        affectedTickers: ["QQQ", "QQQM", "TQQQ"],
        tags: ["Nasdaq", "Nasdaq-100", "Index Rebalance", "Tech Benchmark"],
      });
    }
  }

  // B. FTSE Russell Annual Reconstitution (May - June)
  if (month === 5) {
    // May: Rank Day (1st Friday)
    if (firstFriday > 0) {
      events.push({
        id: `russell-rank-day-${year}`,
        title: "FTSE Russell Reconstitution 'Rank Day'",
        date: formatIsoDate(year, 5, firstFriday),
        category: "rebalance",
        impact: "medium",
        provider: "FTSE Russell",
        time: "Market Close (4:00 PM ET)",
        description:
          "FTSE Russell establishes market cap ranking snapshot across U.S. equities. All companies are ranked by float-adjusted market capitalization to determine migration cutoff lines between the Russell 1000 and Russell 2000.",
        affectedTickers: ["IWM", "IWB", "IWF", "IWD"],
        tags: ["FTSE Russell", "Rank Day", "Russell 2000", "Russell 1000"],
      });
    }
  }

  if (month === 6) {
    // June: 4th Friday is the monumental Russell Reconstitution Final Effective Date
    const fourthFriday = getNthDayOfWeek(year, 6, 5, 4);
    if (fourthFriday > 0) {
      events.push({
        id: `russell-final-recon-${year}`,
        title: "FTSE Russell Annual Reconstitution (Final Effective)",
        date: formatIsoDate(year, 6, fourthFriday),
        category: "rebalance",
        impact: "high",
        provider: "FTSE Russell",
        time: "Market Close (4:00 PM ET Closing Cross)",
        description:
          "The largest scheduled equity trading liquidity event of the year. Hundreds of billions of dollars across passive institutional portfolios and ETFs execute in the final minutes of trading via the NYSE and Nasdaq closing auctions.",
        affectedTickers: ["IWM", "IWB", "IWF", "IWD", "VTWO"],
        tags: ["FTSE Russell", "Annual Reconstitution", "Mega Volume", "Russell 2000"],
      });
    }
  }

  // C. MSCI Quarterly & Semi-Annual Index Reviews (Feb, May, Aug, Nov)
  if (month === 2 || month === 5 || month === 8 || month === 11) {
    const isSemiAnnual = month === 5 || month === 11;
    const reviewType = isSemiAnnual ? "Semi-Annual Index Review (SAIR)" : "Quarterly Index Review (QIR)";

    // Announcement typically ~12th-14th
    const announceDay = 12;
    events.push({
      id: `msci-announce-${year}-${pad2(month)}`,
      title: `MSCI ${reviewType} Announcement`,
      date: formatIsoDate(year, month, announceDay),
      category: "rebalance",
      impact: "medium",
      provider: "MSCI",
      time: "After European Market Close (11:00 PM CEST / 5:00 PM ET)",
      description:
        `MSCI publishes constituent changes, foreign inclusion factors (FIF), and country classification updates for the MSCI World, MSCI ACWI, and MSCI Emerging Markets indices.`,
      affectedTickers: ["ACWI", "URTH", "EEM", "EFA"],
      tags: ["MSCI", "Index Review", "Global Benchmarks", "Emerging Markets"],
    });

    // Effective Date: Last business day of Feb, May, Aug, Nov
    events.push({
      id: `msci-effective-${year}-${pad2(month)}`,
      title: `MSCI ${reviewType} Effective Date`,
      date: formatIsoDate(year, month, lastBusinessDay),
      category: "rebalance",
      impact: "high",
      provider: "MSCI",
      time: "Market Close (4:00 PM ET)",
      description:
        `MSCI ${reviewType} constituent additions, deletions, and weight revisions take full effect across global equity markets at the market close. Massive closing cross volume across European, Asian, and American bourses.`,
      affectedTickers: ["ACWI", "URTH", "EEM", "EFA", "VXUS"],
      tags: ["MSCI", "Index Rebalance", "Global Equities", "Passive Flows"],
    });
  }

  // -----------------------------------------------------------------
  // 3. FOMC Meetings & Minutes Releases
  // -----------------------------------------------------------------
  const monthStr = `${year}-${pad2(month)}`;

  for (const meeting of FOMC_SCHEDULES) {
    if (meeting.decisionDate.startsWith(monthStr)) {
      events.push({
        id: `fomc-decision-${meeting.decisionDate}`,
        title: meeting.hasSep
          ? "FOMC Rate Decision & Press Conference (with SEP Dot Plot)"
          : "FOMC Rate Decision & Press Conference",
        date: meeting.decisionDate,
        category: "fomc",
        impact: "high",
        provider: "Federal Reserve",
        time: `${meeting.statementTime} Statement / ${meeting.pressConferenceTime} Presser`,
        description:
          meeting.hasSep
            ? "Federal Open Market Committee policy statement, target interest rate decision, and Chair press conference. Includes updated Summary of Economic Projections (SEP) and the Fed 'Dot Plot' rate trajectory."
            : "Federal Open Market Committee policy statement, target interest rate decision, and Chair Jerome Powell press conference.",
        affectedTickers: ["TLT", "IEF", "SHY", "SPY", "DXY"],
        tags: [
          "Federal Reserve",
          "FOMC",
          "Interest Rates",
          "Monetary Policy",
          meeting.hasSep ? "Dot Plot" : "Policy Statement",
        ],
      });
    }

    // Check if the FOMC Minutes release falls in this month
    const minutesDate = getFomcMinutesDate(meeting.decisionDate);
    if (minutesDate.startsWith(monthStr)) {
      events.push({
        id: `fomc-minutes-${minutesDate}`,
        title: "FOMC Meeting Minutes Release",
        date: minutesDate,
        category: "fomc",
        impact: "medium",
        provider: "Federal Reserve",
        time: "2:00 PM ET",
        description:
          `Detailed minutes from the ${meeting.decisionDate} FOMC monetary policy meeting, providing granular insight into member debates, inflation assessments, and balance sheet runoff policy.`,
        affectedTickers: ["TLT", "IEF", "SPY"],
        tags: ["Federal Reserve", "FOMC Minutes", "Monetary Policy"],
      });
    }
  }

  // -----------------------------------------------------------------
  // 4. US Market Holidays
  // -----------------------------------------------------------------
  const yearHolidays = getUsMarketHolidays(year);
  for (const hol of yearHolidays) {
    if (hol.date.startsWith(monthStr)) {
      events.push(hol);
    }
  }

  // Sort events chronologically by date, then impact (high before medium before low)
  const impactOrder: Record<EventImpact, number> = { high: 0, medium: 1, low: 2 };

  events.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return impactOrder[a.impact] - impactOrder[b.impact];
  });

  return events;
}

/**
 * Returns a map of date string (YYYY-MM-DD) to array of MarketEvents.
 */
export function groupEventsByDate(events: MarketEvent[]): Record<string, MarketEvent[]> {
  const map: Record<string, MarketEvent[]> = {};
  for (const e of events) {
    if (!map[e.date]) {
      map[e.date] = [];
    }
    map[e.date].push(e);
  }
  return map;
}
