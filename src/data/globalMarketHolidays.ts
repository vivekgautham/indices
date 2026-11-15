export interface GlobalHoliday {
  date: string; // YYYY-MM-DD
  name: string;
  country: string;
  flag: string;
  exchange: string; // e.g. "NYSE / Nasdaq", "LSE", "TSE", "Xetra", "HKEX", "TSX", "ASX"
  description?: string;
}

/**
 * Official Equity Exchange Trading Holidays (2025 - 2027)
 * Sourced directly from official exchange calendars:
 * - 🇺🇸 United States: NYSE & Nasdaq
 * - 🇬🇧 United Kingdom: London Stock Exchange (LSE)
 * - 🇯🇵 Japan: Tokyo Stock Exchange (TSE / JPX)
 * - 🇩🇪 / 🇪🇺 Germany / Eurozone: Deutsche Börse (Xetra) & Euronext
 * - 🇭🇰 Hong Kong: Hong Kong Exchanges and Clearing (HKEX)
 * - 🇨🇦 Canada: Toronto Stock Exchange (TMX / TSX)
 * - 🇦🇺 Australia: Australian Securities Exchange (ASX)
 */
export const GLOBAL_MARKET_HOLIDAYS: GlobalHoliday[] = [
  // =========================================================================
  // 2025 HOLIDAYS
  // =========================================================================
  // Jan 2025
  { date: "2025-01-01", name: "New Year's Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-01-01", name: "New Year's Day", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2025-01-01", name: "New Year's Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-01-01", name: "New Year's Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2025-01-01", name: "New Year's Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-01-01", name: "New Year's Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-01-01", name: "New Year's Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-01-02", name: "Bank / Market Holiday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-01-03", name: "Bank / Market Holiday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-01-13", name: "Coming of Age Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-01-20", name: "Martin Luther King Jr. Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-01-27", name: "Australia Day (Observed)", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-01-29", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-01-30", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-01-31", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },

  // Feb 2025
  { date: "2025-02-11", name: "National Foundation Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-02-17", name: "Presidents' Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-02-17", name: "Family Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-02-24", name: "Emperor's Birthday (Observed)", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Mar 2025
  { date: "2025-03-20", name: "Vernal Equinox Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Apr 2025
  { date: "2025-04-04", name: "Ching Ming Festival", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-04-18", name: "Good Friday", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-04-18", name: "Good Friday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2025-04-18", name: "Good Friday", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2025-04-18", name: "Good Friday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-04-18", name: "Good Friday", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-04-18", name: "Good Friday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-04-21", name: "Easter Monday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2025-04-21", name: "Easter Monday", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2025-04-21", name: "Easter Monday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-04-21", name: "Easter Monday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-04-25", name: "ANZAC Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-04-29", name: "Showa Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // May 2025
  { date: "2025-05-01", name: "Labour Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2025-05-05", name: "Early May Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2025-05-05", name: "Children's Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-05-05", name: "Buddha's Birthday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-05-06", name: "Constitution Memorial Day (Observed)", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-05-19", name: "Victoria Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-05-26", name: "Memorial Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-05-26", name: "Spring Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },

  // Jun 2025
  { date: "2025-06-09", name: "King's Birthday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-06-19", name: "Juneteenth National Independence Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },

  // Jul 2025
  { date: "2025-07-01", name: "HKSAR Establishment Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-07-01", name: "Canada Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-07-04", name: "Independence Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-07-21", name: "Marine Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Aug 2025
  { date: "2025-08-04", name: "Civic Holiday", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-08-11", name: "Mountain Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-08-25", name: "Summer Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },

  // Sep 2025
  { date: "2025-09-01", name: "Labor Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-09-01", name: "Labour Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-09-15", name: "Respect for the Aged Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-09-23", name: "Autumnal Equinox Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Oct 2025
  { date: "2025-10-01", name: "National Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-10-07", name: "Mid-Autumn Festival Following Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-10-13", name: "Sports Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-10-13", name: "Thanksgiving Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-10-29", name: "Chung Yeung Festival", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },

  // Nov 2025
  { date: "2025-11-03", name: "Culture Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-11-24", name: "Labor Thanksgiving Day (Observed)", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2025-11-27", name: "Thanksgiving Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },

  // Dec 2025
  { date: "2025-12-25", name: "Christmas Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2025-12-25", name: "Christmas Day", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2025-12-25", name: "Christmas Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2025-12-25", name: "Christmas Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-12-25", name: "Christmas Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-12-25", name: "Christmas Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-12-26", name: "Boxing Day", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2025-12-26", name: "Boxing Day / St. Stephen's Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2025-12-26", name: "Boxing Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2025-12-26", name: "Boxing Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2025-12-26", name: "Boxing Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2025-12-31", name: "Year-End Market Holiday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // =========================================================================
  // 2026 HOLIDAYS
  // =========================================================================
  // Jan 2026
  { date: "2026-01-01", name: "New Year's Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-01-01", name: "New Year's Day", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2026-01-01", name: "New Year's Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-01-01", name: "New Year's Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2026-01-01", name: "New Year's Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-01-01", name: "New Year's Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-01-01", name: "New Year's Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2026-01-02", name: "Bank / Market Holiday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-01-12", name: "Coming of Age Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-01-19", name: "Martin Luther King Jr. Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-01-26", name: "Australia Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },

  // Feb 2026
  { date: "2026-02-11", name: "National Foundation Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-02-16", name: "Presidents' Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-02-16", name: "Family Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-02-17", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-02-18", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-02-19", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-02-23", name: "Emperor's Birthday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Mar 2026
  { date: "2026-03-20", name: "Vernal Equinox Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Apr 2026
  { date: "2026-04-03", name: "Good Friday", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-04-03", name: "Good Friday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2026-04-03", name: "Good Friday", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2026-04-03", name: "Good Friday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-04-03", name: "Good Friday", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-04-03", name: "Good Friday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2026-04-06", name: "Easter Monday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2026-04-06", name: "Easter Monday", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2026-04-06", name: "Easter Monday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-04-06", name: "Easter Monday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2026-04-07", name: "Ching Ming Festival Following Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-04-29", name: "Showa Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // May 2026
  { date: "2026-05-01", name: "Labour Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2026-05-04", name: "Early May Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2026-05-04", name: "Greenery Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-05-05", name: "Children's Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-05-06", name: "Constitution Memorial Day (Observed)", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-05-18", name: "Victoria Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-05-25", name: "Memorial Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-05-25", name: "Spring Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2026-05-25", name: "Buddha's Birthday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },

  // Jun 2026
  { date: "2026-06-08", name: "King's Birthday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2026-06-19", name: "Juneteenth National Independence Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-06-19", name: "Tuen Ng (Dragon Boat) Festival", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },

  // Jul 2026
  { date: "2026-07-01", name: "HKSAR Establishment Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-07-01", name: "Canada Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-07-03", name: "Independence Day (Observed)", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-07-20", name: "Marine Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Aug 2026
  { date: "2026-08-03", name: "Civic Holiday", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-08-11", name: "Mountain Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-08-31", name: "Summer Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },

  // Sep 2026
  { date: "2026-09-07", name: "Labor Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-09-07", name: "Labour Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-09-21", name: "Respect for the Aged Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-09-22", name: "Citizen's Holiday (Kokumin no kyujitsu)", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-09-23", name: "Autumnal Equinox Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-09-25", name: "Mid-Autumn Festival Following Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },

  // Oct 2026
  { date: "2026-10-01", name: "National Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-10-12", name: "Sports Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-10-12", name: "Thanksgiving Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-10-19", name: "Chung Yeung Festival", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },

  // Nov 2026
  { date: "2026-11-03", name: "Culture Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-11-23", name: "Labor Thanksgiving Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2026-11-26", name: "Thanksgiving Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },

  // Dec 2026
  { date: "2026-12-25", name: "Christmas Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2026-12-25", name: "Christmas Day", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2026-12-25", name: "Christmas Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2026-12-25", name: "Christmas Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2026-12-25", name: "Christmas Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-12-25", name: "Christmas Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2026-12-28", name: "Boxing Day (Observed)", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2026-12-28", name: "Boxing Day (Observed)", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2026-12-28", name: "Boxing Day (Observed)", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2026-12-31", name: "Year-End Market Holiday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // =========================================================================
  // 2027 HOLIDAYS
  // =========================================================================
  // Jan 2027
  { date: "2027-01-01", name: "New Year's Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-01-01", name: "New Year's Day", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2027-01-01", name: "New Year's Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-01-01", name: "New Year's Day", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2027-01-01", name: "New Year's Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-01-01", name: "New Year's Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-01-01", name: "New Year's Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2027-01-11", name: "Coming of Age Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-01-18", name: "Martin Luther King Jr. Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-01-26", name: "Australia Day", country: "Australia", flag: "🇦🇺", exchange: "ASX" },

  // Feb 2027
  { date: "2027-02-05", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-02-08", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-02-09", name: "Lunar New Year", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-02-11", name: "National Foundation Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-02-15", name: "Presidents' Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-02-15", name: "Family Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-02-23", name: "Emperor's Birthday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Mar 2027
  { date: "2027-03-22", name: "Vernal Equinox Day (Observed)", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-03-26", name: "Good Friday", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-03-26", name: "Good Friday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2027-03-26", name: "Good Friday", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2027-03-26", name: "Good Friday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-03-26", name: "Good Friday", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-03-26", name: "Good Friday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2027-03-29", name: "Easter Monday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2027-03-29", name: "Easter Monday", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra / Euronext" },
  { date: "2027-03-29", name: "Easter Monday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-03-29", name: "Easter Monday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },

  // Apr 2027
  { date: "2027-04-05", name: "Ching Ming Festival", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-04-26", name: "ANZAC Day (Observed)", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2027-04-29", name: "Showa Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // May 2027
  { date: "2027-05-03", name: "Early May Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2027-05-03", name: "Constitution Memorial Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-05-04", name: "Greenery Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-05-05", name: "Children's Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-05-13", name: "Buddha's Birthday", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-05-24", name: "Victoria Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-05-31", name: "Memorial Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-05-31", name: "Spring Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },

  // Jun 2027
  { date: "2027-06-09", name: "Tuen Ng (Dragon Boat) Festival", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-06-14", name: "King's Birthday", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2027-06-18", name: "Juneteenth (Observed)", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },

  // Jul 2027
  { date: "2027-07-01", name: "HKSAR Establishment Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-07-01", name: "Canada Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-07-05", name: "Independence Day (Observed)", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-07-19", name: "Marine Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Aug 2027
  { date: "2027-08-02", name: "Civic Holiday", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-08-11", name: "Mountain Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-08-30", name: "Summer Bank Holiday", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },

  // Sep 2027
  { date: "2027-09-06", name: "Labor Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-09-06", name: "Labour Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-09-16", name: "Mid-Autumn Festival Following Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-09-20", name: "Respect for the Aged Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-09-23", name: "Autumnal Equinox Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },

  // Oct 2027
  { date: "2027-10-01", name: "National Day", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-10-08", name: "Chung Yeung Festival", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-10-11", name: "Sports Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-10-11", name: "Thanksgiving Day", country: "Canada", flag: "🇨🇦", exchange: "TSX" },

  // Nov 2027
  { date: "2027-11-03", name: "Culture Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-11-23", name: "Labor Thanksgiving Day", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
  { date: "2027-11-25", name: "Thanksgiving Day", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },

  // Dec 2027
  { date: "2027-12-24", name: "Christmas Eve (Market Holiday)", country: "United States", flag: "🇺🇸", exchange: "NYSE / Nasdaq" },
  { date: "2027-12-24", name: "Christmas Eve (Market Holiday)", country: "Eurozone", flag: "🇪🇺", exchange: "Xetra" },
  { date: "2027-12-27", name: "Christmas Day (Observed)", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2027-12-27", name: "Christmas Day (Observed)", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-12-27", name: "Christmas Day (Observed)", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-12-27", name: "Christmas Day (Observed)", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2027-12-28", name: "Boxing Day (Observed)", country: "United Kingdom", flag: "🇬🇧", exchange: "LSE" },
  { date: "2027-12-28", name: "Boxing Day (Observed)", country: "Hong Kong", flag: "🇭🇰", exchange: "HKEX" },
  { date: "2027-12-28", name: "Boxing Day (Observed)", country: "Canada", flag: "🇨🇦", exchange: "TSX" },
  { date: "2027-12-28", name: "Boxing Day (Observed)", country: "Australia", flag: "🇦🇺", exchange: "ASX" },
  { date: "2027-12-31", name: "Year-End Market Holiday", country: "Japan", flag: "🇯🇵", exchange: "TSE" },
];
