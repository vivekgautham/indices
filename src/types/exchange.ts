export type ExchangeRegion = "Americas" | "EMEA" | "APAC";

export type AssetClass =
  | "Equities"
  | "Derivatives"
  | "Commodities"
  | "Fixed Income"
  | "ETFs"
  | "FX"
  | "Funds";

export type MarketSessionStatus =
  | "OPEN"
  | "LUNCH"
  | "PRE_MARKET"
  | "POST_MARKET"
  | "CLOSED"
  | "WEEKEND";

export interface ExchangeTradingHours {
  open: string; // "HH:MM" in local 24h format e.g. "09:30"
  close: string; // "HH:MM" e.g. "16:00"
}

export interface ExchangeLunchBreak {
  start: string; // "HH:MM" e.g. "11:30"
  end: string; // "HH:MM" e.g. "12:30"
}

export interface FlagshipIndexLink {
  name: string;
  symbol?: string;
  indexId?: string; // id matching indicesData.ts if available
}

export interface WorldExchange {
  id: string;
  name: string;
  shortName: string;
  mic: string; // ISO 10383 Market Identifier Code
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  region: ExchangeRegion;
  timezone: string; // IANA timezone e.g. "America/New_York"
  timezoneAbbr: string;
  marketCapUsdTrillion: number; // e.g. 28.5
  marketCapDisplay: string; // e.g. "$28.5T"
  globalRank: number;
  listedCompaniesCount: number;
  operator: string;
  website: string;
  assetClasses: AssetClass[];
  tradingDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  regularHours: ExchangeTradingHours;
  lunchBreak?: ExchangeLunchBreak;
  preMarket?: ExchangeTradingHours;
  postMarket?: ExchangeTradingHours;
  flagshipIndices: FlagshipIndexLink[];
  holidayCalendarExchange?: string; // key matching globalMarketHolidays exchange name
  description: string;
}

export interface ExchangeLiveStatus {
  exchangeId: string;
  status: MarketSessionStatus;
  statusLabel: string;
  currentLocalTime: string; // e.g. "14:25:10"
  currentLocalDate: string; // e.g. "Mon, Nov 16"
  nextEvent: string; // e.g. "Closes in 1h 35m", "Opens in 4h 12m", "Resumes in 45m"
  minutesToNextEvent: number;
  isRegularOpen: boolean;
  userLocalOpenTime: string; // converted to user's browser timezone
  userLocalCloseTime: string;
}
