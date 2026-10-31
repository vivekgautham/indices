export type FredCategory = "equity" | "macro";

export interface FredSeriesMeta {
  id: string;
  name: string;
  shortName: string;
  category: FredCategory;
  subcategory: string;
  units: string;
  frequency: string;
  source: string;
  description: string;
  marketSignificance: string;
  relatedIndexId?: string;
  trackingEtfs?: string[];
  format: "currency" | "percent" | "number" | "index";
  decimals: number;
  badgeColor: string;
  icon: string;
}

export interface FredObservation {
  date: string;
  value: number;
}

export interface FredSeriesData extends FredSeriesMeta {
  observations: [string, number][]; // [date, value]
  latestDate: string;
  latestValue: number;
  prevValue: number;
  change: number;
  changePct: number;
  high52: number;
  low52: number;
}

export const FRED_SERIES_CATALOG: Record<string, FredSeriesMeta> = {
  // ==========================================
  // 1. Major U.S. Equity Benchmarks
  // ==========================================
  SP500: {
    id: "SP500",
    name: "S&P 500 Index",
    shortName: "S&P 500",
    category: "equity",
    subcategory: "Large-Cap Equities",
    units: "Index",
    frequency: "Daily",
    source: "S&P Dow Jones Indices LLC",
    description:
      "Widely regarded as the premier benchmark for US equities, tracking 500 leading companies representing approximately 80% of available market capitalization.",
    marketSignificance:
      "The global standard for broad US equity performance, core institutional portfolios, and macroeconomic corporate health.",
    relatedIndexId: "sp-500",
    trackingEtfs: ["SPY", "VOO", "IVV", "SPLG"],
    format: "number",
    decimals: 2,
    badgeColor: "#8b5cf6",
    icon: "📈",
  },
  DJIA: {
    id: "DJIA",
    name: "Dow Jones Industrial Average",
    shortName: "Dow 30",
    category: "equity",
    subcategory: "Mega-Cap Blue Chip",
    units: "Index",
    frequency: "Daily",
    source: "S&P Dow Jones Indices LLC",
    description:
      "A price-weighted measure of 30 prominent, industry-leading American companies representing the bedrock of corporate America.",
    marketSignificance:
      "The oldest continuously published equity barometer in the world (est. 1896), heavily watched by retail investors and media as the primary market summary.",
    relatedIndexId: "djia",
    trackingEtfs: ["DIA"],
    format: "number",
    decimals: 2,
    badgeColor: "#3b82f6",
    icon: "🏛️",
  },
  NASDAQ100: {
    id: "NASDAQ100",
    name: "NASDAQ-100 Index",
    shortName: "Nasdaq-100",
    category: "equity",
    subcategory: "Tech & Innovation",
    units: "Index",
    frequency: "Daily",
    source: "NASDAQ OMX Group",
    description:
      "Tracks 100 of the largest domestic and international non-financial securities listed on The Nasdaq Stock Market, dominated by transformative technology and innovation titans.",
    marketSignificance:
      "The world's preeminent growth benchmark, reflecting sentiment around AI, cloud computing, consumer internet, semiconductors, and large-cap tech multiples.",
    relatedIndexId: "nasdaq-100",
    trackingEtfs: ["QQQ", "QQQM", "TQQQ", "SQQQ"],
    format: "number",
    decimals: 2,
    badgeColor: "#06b6d4",
    icon: "💻",
  },
  NASDAQCOM: {
    id: "NASDAQCOM",
    name: "NASDAQ Composite Index",
    shortName: "Nasdaq Composite",
    category: "equity",
    subcategory: "Broad Technology & Growth",
    units: "Index",
    frequency: "Daily",
    source: "NASDAQ OMX Group",
    description:
      "Comprehensive market-cap weighted index of more than 3,000 common equities listed on the Nasdaq Stock Market, including software, biotech, and hardware developers.",
    marketSignificance:
      "Broader breadth indicator than the Nasdaq-100, showing underlying health and breadth among speculative, high-beta, and emerging tech companies.",
    relatedIndexId: "nasdaq-composite",
    trackingEtfs: ["ONEQ"],
    format: "number",
    decimals: 2,
    badgeColor: "#0ea5e9",
    icon: "🌐",
  },
  VIXCLS: {
    id: "VIXCLS",
    name: "Cboe Volatility Index (VIX)",
    shortName: "VIX (Fear Gauge)",
    category: "equity",
    subcategory: "Equity Market Volatility",
    units: "Index Points",
    frequency: "Daily",
    source: "Chicago Board Options Exchange (Cboe)",
    description:
      "Calculated from real-time S&P 500 option bids and asks, the VIX estimates market expectations of 30-day forward annualized volatility.",
    marketSignificance:
      "Wall Street's definitive 'Fear Gauge'. Readings below 15 indicate market complacency, while spikes above 25–30 signal acute institutional hedging and market distress.",
    relatedIndexId: "cboe-vix",
    trackingEtfs: ["VIXY", "VIXM", "UVXY"],
    format: "number",
    decimals: 2,
    badgeColor: "#ef4444",
    icon: "⚡",
  },

  // ==========================================
  // 2. Economic, Global & Macro Indexes
  // ==========================================
  DGS10: {
    id: "DGS10",
    name: "10-Year Treasury Constant Maturity Yield",
    shortName: "10-Year Treasury Yield",
    category: "macro",
    subcategory: "Interest Rates / Sovereign Debt",
    units: "%",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "The yield on 10-year US Treasury notes interpolated by the US Treasury Department based on daily market closing bid prices.",
    marketSignificance:
      "The world's foundational risk-free discount rate. Directly dictates mortgage rates, corporate borrowing costs, equity valuations, and global currency valuation.",
    relatedIndexId: "ice-us-treasury-7-10-year",
    trackingEtfs: ["IEF", "VGIT", "TLT"],
    format: "percent",
    decimals: 2,
    badgeColor: "#10b981",
    icon: "🏦",
  },
  DGS2: {
    id: "DGS2",
    name: "2-Year Treasury Constant Maturity Yield",
    shortName: "2-Year Treasury Yield",
    category: "macro",
    subcategory: "Interest Rates / Fed Policy",
    units: "%",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "Yield on 2-year US Treasury notes, most sensitive to near-term Federal Reserve monetary policy, rate hike or cut expectations.",
    marketSignificance:
      "The most accurate market-driven barometer of where institutional investors expect the Federal Reserve to steer the Fed Funds policy rate over the next 12–24 months.",
    relatedIndexId: "ice-us-treasury-1-3-year",
    trackingEtfs: ["SHY", "VGSH"],
    format: "percent",
    decimals: 2,
    badgeColor: "#14b8a6",
    icon: "⏱️",
  },
  T10Y2Y: {
    id: "T10Y2Y",
    name: "10-Year minus 2-Year Treasury Yield Spread",
    shortName: "Yield Curve (10Y - 2Y)",
    category: "macro",
    subcategory: "Yield Curve / Recession Indicator",
    units: "% Spread",
    frequency: "Daily",
    source: "Federal Reserve Bank of St. Louis",
    description:
      "The difference between the 10-year Treasury yield and the 2-year Treasury yield, representing the slope of the sovereign yield curve.",
    marketSignificance:
      "The premier historical recession predictor. Inversion (spread below 0.00%) has preceded every US recession since 1955. Re-steepening often signals inflection into monetary easing.",
    relatedIndexId: "ice-us-treasury-7-10-year",
    trackingEtfs: ["IEF", "SHY"],
    format: "percent",
    decimals: 2,
    badgeColor: "#f59e0b",
    icon: "📐",
  },
  FEDFUNDS: {
    id: "FEDFUNDS",
    name: "Federal Funds Effective Rate",
    shortName: "Fed Funds Rate",
    category: "macro",
    subcategory: "Monetary Policy",
    units: "%",
    frequency: "Monthly / Daily",
    source: "Federal Reserve Board",
    description:
      "The volume-weighted median interest rate at which depository institutions trade federal funds (balances held at Federal Reserve Banks) overnight.",
    marketSignificance:
      "The anchor of the global financial system. The primary monetary policy lever set by the Federal Open Market Committee (FOMC) to manage inflation and employment.",
    relatedIndexId: "ice-0-3-month-us-treasury",
    trackingEtfs: ["SGOV", "BIL"],
    format: "percent",
    decimals: 2,
    badgeColor: "#6366f1",
    icon: "🎯",
  },
  DTWEXBGS: {
    id: "DTWEXBGS",
    name: "Trade-Weighted U.S. Dollar Index (Broad Goods & Services)",
    shortName: "US Dollar Index (Broad)",
    category: "macro",
    subcategory: "Global Currencies & FX",
    units: "Index Jan 2006=100",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "A weighted average of the foreign exchange value of the U.S. dollar against the currencies of a broad group of major US trading partners.",
    marketSignificance:
      "Measures relative greenback purchasing power globally. A stronger dollar headwinds US multinational foreign revenue and tightens global dollar funding liquidity.",
    trackingEtfs: ["UUP", "USDU"],
    format: "number",
    decimals: 2,
    badgeColor: "#059669",
    icon: "💵",
  },
  DCOILWTICO: {
    id: "DCOILWTICO",
    name: "Crude Oil Prices: West Texas Intermediate (WTI)",
    shortName: "WTI Crude Oil",
    category: "macro",
    subcategory: "Commodities & Energy",
    units: "$ / Barrel",
    frequency: "Daily",
    source: "U.S. Energy Information Administration",
    description:
      "Benchmark spot price for light, sweet crude oil delivered to Cushing, Oklahoma, serving as the benchmark for US petroleum pricing.",
    marketSignificance:
      "Crucial input cost for transportation, manufacturing, agriculture, and consumer gasoline; major driver of headline inflation expectations and energy sector earnings.",
    trackingEtfs: ["USO", "BNO"],
    format: "currency",
    decimals: 2,
    badgeColor: "#d97706",
    icon: "🛢️",
  },
  MORTGAGE30US: {
    id: "MORTGAGE30US",
    name: "30-Year Fixed Rate Mortgage Average in the United States",
    shortName: "30-Year Mortgage Rate",
    category: "macro",
    subcategory: "Housing & Real Estate",
    units: "%",
    frequency: "Weekly",
    source: "Freddie Mac",
    description:
      "National survey average of commitment rates on 30-year conventional fixed-rate first mortgages for prime borrowers.",
    marketSignificance:
      "The dominant determinant of US home affordability, mortgage applications, residential real estate transaction volume, and consumer household debt burdens.",
    relatedIndexId: "sp-composite-1500",
    trackingEtfs: ["MBB", "VMBS"],
    format: "percent",
    decimals: 2,
    badgeColor: "#8b5cf6",
    icon: "🏡",
  },
  BAMLH0A0HYM2: {
    id: "BAMLH0A0HYM2",
    name: "ICE BofA US High Yield Index Option-Adjusted Spread",
    shortName: "High Yield Credit Spread",
    category: "macro",
    subcategory: "Credit & Fixed Income Risk",
    units: "% Spread",
    frequency: "Daily",
    source: "ICE Data Indices, LLC",
    description:
      "The option-adjusted spread (OAS) of the ICE BofA US High Yield Index over spot Treasury curves, measuring the yield premium demanded for sub-investment grade corporate debt.",
    marketSignificance:
      "One of the purest gauges of corporate financial stress and default risk. Widening spreads indicate tightening credit conditions and risk aversion across equity and debt markets.",
    relatedIndexId: "iboxx-usd-high-yield",
    trackingEtfs: ["HYG", "JNK", "USHY"],
    format: "percent",
    decimals: 2,
    badgeColor: "#dc2626",
    icon: "📉",
  },
  GDPC1: {
    id: "GDPC1",
    name: "Real Gross Domestic Product (Real GDP)",
    shortName: "Real GDP",
    category: "macro",
    subcategory: "Economic Growth & Output",
    units: "Billions of Chained 2017 $",
    frequency: "Quarterly",
    source: "U.S. Bureau of Economic Analysis",
    description:
      "Inflation-adjusted value of all goods and services produced by labor and property located in the United States, measured at seasonally adjusted annual rates.",
    marketSignificance:
      "The comprehensive scorecard of American economic output and health. Two consecutive quarters of contraction traditionally define an economic recession.",
    trackingEtfs: ["SPY", "VTI"],
    format: "currency",
    decimals: 1,
    badgeColor: "#2563eb",
    icon: "🏭",
  },
};

export const FRED_SERIES_LIST = Object.values(FRED_SERIES_CATALOG);
