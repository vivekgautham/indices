export type FredCategory = "equity" | "macro" | "international" | "bond";

export interface FredSeriesMeta {
  id: string;
  name: string;
  shortName: string;
  category: FredCategory;
  subcategory: string;
  region?: string;
  country?: string;
  currency?: string;
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
  SP500EW: {
    id: "SP500EW",
    name: "S&P 500 Equal Weight Index",
    shortName: "S&P 500 Equal Weight",
    category: "equity",
    subcategory: "Large-Cap Equal Weight",
    units: "Index",
    frequency: "Daily",
    source: "S&P Dow Jones Indices LLC",
    description:
      "Equal-weighted alternative to the market-cap S&P 500 allocating an identical 0.2% weight to each of the 500 constituent companies upon quarterly rebalancing.",
    marketSignificance:
      "The premier market breadth barometer. Measuring equal-weight against cap-weight S&P 500 indicates whether rallies are broadening across the average stock or narrowing into mega-cap concentration.",
    relatedIndexId: "sp-500-equal-weight",
    trackingEtfs: ["RSP", "EWSP", "ISPE"],
    format: "number",
    decimals: 2,
    badgeColor: "#10b981",
    icon: "⚖️",
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
  RUI: {
    id: "RUI",
    name: "Russell 1000 Index",
    shortName: "Russell 1000",
    category: "equity",
    subcategory: "Large/Mid-Cap Equities",
    units: "Index",
    frequency: "Daily",
    source: "FTSE Russell",
    description:
      "Represents approximately the top 1,000 largest publicly traded U.S. companies, covering approximately 93% of the investable U.S. equity universe.",
    marketSignificance:
      "The definitive institutional benchmark for broad U.S. large- and mid-cap equity performance, widely used by asset managers and institutional allocators.",
    relatedIndexId: "russell-1000",
    trackingEtfs: ["IWB", "VONE"],
    format: "number",
    decimals: 2,
    badgeColor: "#2563eb",
    icon: "🏛️",
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
  // 2. Economic & Macro Indexes
  // ==========================================
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

  // ==========================================
  // 3. International Equity Benchmarks
  // ==========================================
  FTSE_100: {
    id: "FTSE_100",
    name: "FTSE 100 Index",
    shortName: "FTSE 100",
    category: "international",
    subcategory: "United Kingdom Blue-Chip",
    region: "Europe",
    country: "United Kingdom",
    currency: "GBP",
    units: "Index Points",
    frequency: "Daily",
    source: "FTSE Russell / London Stock Exchange",
    description:
      "Tracks the 100 largest capitalized UK-domiciled blue chip companies on the London Stock Exchange, heavily weighted toward global multinationals, energy, financials, and healthcare.",
    marketSignificance:
      "The definitive equity benchmark of the United Kingdom and London financial hub, offering global dividend exposure and multinational revenue drivers.",
    relatedIndexId: "ftse-100",
    trackingEtfs: ["EWU", "ISF"],
    format: "number",
    decimals: 2,
    badgeColor: "#3b82f6",
    icon: "🇬🇧",
  },
  NIKKEI_225: {
    id: "NIKKEI_225",
    name: "Nikkei 225 Stock Average",
    shortName: "Nikkei 225",
    category: "international",
    subcategory: "Japan Large-Cap",
    region: "Asia-Pacific",
    country: "Japan",
    currency: "JPY",
    units: "Index Points",
    frequency: "Daily",
    source: "Nikkei Inc. / Tokyo Stock Exchange",
    description:
      "The premier price-weighted equity benchmark of Japan, tracking 225 prominent blue-chip companies listed on the Tokyo Stock Exchange Prime Market.",
    marketSignificance:
      "The primary gauge of Japanese corporate vitality, yen sensitivity, industrial robotics, export dynamics, and Tokyo equity sentiment.",
    relatedIndexId: "nikkei-225",
    trackingEtfs: ["EWJ", "DXJ"],
    format: "number",
    decimals: 2,
    badgeColor: "#e11d48",
    icon: "🇯🇵",
  },
  DAX_40: {
    id: "DAX_40",
    name: "DAX 40 Performance Index",
    shortName: "DAX 40",
    category: "international",
    subcategory: "Germany Blue-Chip",
    region: "Europe",
    country: "Germany",
    currency: "EUR",
    units: "Index Points",
    frequency: "Daily",
    source: "Deutsche Börse Group / STOXX",
    description:
      "The blue-chip index of the 40 largest, most actively traded German companies listed on the Frankfurt Stock Exchange, calculated as a total return performance index.",
    marketSignificance:
      "The cornerstone benchmark of the powerhouse German economy and Eurozone industrial, automotive, chemicals, and enterprise software engineering.",
    relatedIndexId: "dax-40",
    trackingEtfs: ["EWG", "DAX"],
    format: "number",
    decimals: 2,
    badgeColor: "#0284c7",
    icon: "🇩🇪",
  },
  EURO_STOXX_50: {
    id: "EURO_STOXX_50",
    name: "EURO STOXX 50 Index",
    shortName: "Euro Stoxx 50",
    category: "international",
    subcategory: "Eurozone Supersector Leaders",
    region: "Europe",
    country: "Eurozone",
    currency: "EUR",
    units: "Index Points",
    frequency: "Daily",
    source: "STOXX Ltd. (Deutsche Börse)",
    description:
      "Europe's leading blue-chip index for the eurozone, providing a representation of supersector leaders across 11 eurozone countries including France, Germany, Netherlands, and Spain.",
    marketSignificance:
      "The standard institutional gauge for eurozone large-cap equities, driving Europe's most heavily traded index futures and options.",
    relatedIndexId: "euro-stoxx-50",
    trackingEtfs: ["FEZ"],
    format: "number",
    decimals: 2,
    badgeColor: "#6366f1",
    icon: "🇪🇺",
  },
  CAC_40: {
    id: "CAC_40",
    name: "CAC 40 Index",
    shortName: "CAC 40",
    category: "international",
    subcategory: "France Large-Cap",
    region: "Europe",
    country: "France",
    currency: "EUR",
    units: "Index Points",
    frequency: "Daily",
    source: "Euronext Paris",
    description:
      "The benchmark stock market index representing 40 most significant equities on Euronext Paris, distinguished by world-leading luxury, aerospace, energy, and cosmetics giants.",
    marketSignificance:
      "The benchmark for French economic output and global premium consumer goods, luxury conglomerate valuations, and European industrial strength.",
    trackingEtfs: ["EWQ"],
    format: "number",
    decimals: 2,
    badgeColor: "#0ea5e9",
    icon: "🇫🇷",
  },
  HANG_SENG: {
    id: "HANG_SENG",
    name: "Hang Seng Index",
    shortName: "Hang Seng",
    category: "international",
    subcategory: "Hong Kong / China Tech & Finance",
    region: "Asia-Pacific",
    country: "Hong Kong / China",
    currency: "HKD",
    units: "Index Points",
    frequency: "Daily",
    source: "Hang Seng Indexes Company",
    description:
      "Freefloat-adjusted market-capitalization-weighted index tracking the largest and most liquid companies listed on the Stock Exchange of Hong Kong.",
    marketSignificance:
      "The definitive barometer for international capital flows into Greater China, Asian finance titans, and Chinese technology conglomerates.",
    relatedIndexId: "hang-seng-index",
    trackingEtfs: ["FXI", "EWH"],
    format: "number",
    decimals: 2,
    badgeColor: "#059669",
    icon: "🇭🇰",
  },
  TSX_COMPOSITE: {
    id: "TSX_COMPOSITE",
    name: "S&P/TSX Composite Index",
    shortName: "TSX Composite",
    category: "international",
    subcategory: "Canada Broad Equity",
    region: "Americas",
    country: "Canada",
    currency: "CAD",
    units: "Index Points",
    frequency: "Daily",
    source: "S&P Dow Jones Indices / TMX Group",
    description:
      "The headline index for the Canadian equity market, covering approximately 95% of coverage in the Canadian equities universe with significant financial and commodity weighting.",
    marketSignificance:
      "The premier institutional barometer of Canadian equity performance, banking liquidity, energy infrastructure, and mining commodities.",
    trackingEtfs: ["EWC", "XIU"],
    format: "number",
    decimals: 2,
    badgeColor: "#b91c1c",
    icon: "🇨🇦",
  },
  ASX_200: {
    id: "ASX_200",
    name: "S&P/ASX 200 Index",
    shortName: "ASX 200",
    category: "international",
    subcategory: "Australia Blue-Chip",
    region: "Asia-Pacific",
    country: "Australia",
    currency: "AUD",
    units: "Index Points",
    frequency: "Daily",
    source: "S&P Dow Jones Indices / ASX",
    description:
      "Recognized as the primary investable benchmark for the Australian equity market, tracking the 200 largest index-eligible stocks listed on the Australian Securities Exchange.",
    marketSignificance:
      "Key institutional gauge of Australian banking, iron ore and copper mining, lithium extraction, energy resources, and Asia-Pacific trade links.",
    trackingEtfs: ["EWA"],
    format: "number",
    decimals: 2,
    badgeColor: "#d97706",
    icon: "🇦🇺",
  },
  NIFTY_50: {
    id: "NIFTY_50",
    name: "Nifty 50 Index",
    shortName: "Nifty 50",
    category: "international",
    subcategory: "India Large-Cap",
    region: "Asia-Pacific",
    country: "India",
    currency: "INR",
    units: "Index Points",
    frequency: "Daily",
    source: "NSE Indices Limited",
    description:
      "Flagship index of the National Stock Exchange of India (NSE), tracking 50 premier blue-chip companies across 13 sectors of the Indian economy.",
    marketSignificance:
      "The premier benchmark of the world's fastest-growing major economy, driven by robust domestic demographics, digital transformation, and manufacturing expansion.",
    trackingEtfs: ["INDA", "INDY"],
    format: "number",
    decimals: 2,
    badgeColor: "#f59e0b",
    icon: "🇮🇳",
  },
  KOSPI: {
    id: "KOSPI",
    name: "KOSPI Composite Index",
    shortName: "KOSPI",
    category: "international",
    subcategory: "South Korea Large-Cap",
    region: "Asia-Pacific",
    country: "South Korea",
    currency: "KRW",
    units: "Index Points",
    frequency: "Daily",
    source: "Korea Exchange (KRX)",
    description:
      "The benchmark equity index of South Korea, tracking all common shares listed on the Stock Market Division of the Korea Exchange (KRX).",
    marketSignificance:
      "The definitive economic barometer of South Korea's high-tech export economy, heavily concentrated in global AI memory semiconductors (Samsung Electronics, SK Hynix), automotive titans, and EV battery champions.",
    relatedIndexId: "kospi-200",
    trackingEtfs: ["EWY"],
    format: "number",
    decimals: 2,
    badgeColor: "#2563eb",
    icon: "🇰🇷",
  },
  MSCI_EAFE: {
    id: "MSCI_EAFE",
    name: "MSCI EAFE Index (Proxy: EFA)",
    shortName: "MSCI EAFE",
    category: "international",
    subcategory: "Developed Markets ex-US",
    region: "Global Developed",
    country: "Developed ex-US",
    currency: "USD",
    units: "Index Points",
    frequency: "Daily",
    source: "MSCI Inc.",
    description:
      "The premier international equity benchmark designed to represent the performance of large and mid-cap securities across 21 developed markets countries outside the US and Canada.",
    marketSignificance:
      "The definitive asset allocation benchmark for international developed equity exposure among US institutional investors, pensions, and endowments.",
    relatedIndexId: "msci-eafe",
    trackingEtfs: ["EFA", "VEA"],
    format: "number",
    decimals: 2,
    badgeColor: "#10b981",
    icon: "🌐",
  },
  MSCI_EM: {
    id: "MSCI_EM",
    name: "MSCI Emerging Markets Index (Proxy: EEM)",
    shortName: "MSCI Emerging Markets",
    category: "international",
    subcategory: "Global Emerging Markets",
    region: "Emerging Markets",
    country: "Emerging Markets",
    currency: "USD",
    units: "Index Points",
    frequency: "Daily",
    source: "MSCI Inc.",
    description:
      "Captures large and mid-cap representation across 24 Emerging Markets countries, spanning China, India, Taiwan, South Korea, and Brazil.",
    marketSignificance:
      "The world's standard benchmark for emerging markets investment, reflecting high-growth demographic expansion, tech hardware supply chains, and sovereign development.",
    relatedIndexId: "msci-emerging-markets",
    trackingEtfs: ["EEM", "VWO"],
    format: "number",
    decimals: 2,
    badgeColor: "#8b5cf6",
    icon: "🌏",
  },

  // ==========================================
  // 4. U.S. Treasury Yields & Bond Benchmarks
  // ==========================================
  DGS3MO: {
    id: "DGS3MO",
    name: "3-Month Treasury Constant Maturity Rate",
    shortName: "3-Month T-Bill Yield",
    category: "bond",
    subcategory: "Ultra Short-Term T-Bills",
    units: "%",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "Yield on 3-month Treasury bills quoted on an investment basis, representing the ultra-short risk-free cash return.",
    marketSignificance:
      "The bedrock benchmark for cash yields, money market funds, and the front-end risk-free discount rate.",
    relatedIndexId: "ice-0-3-month-us-treasury",
    trackingEtfs: ["BIL", "SGOV"],
    format: "percent",
    decimals: 2,
    badgeColor: "#06b6d4",
    icon: "💵",
  },
  DGS2: {
    id: "DGS2",
    name: "2-Year Treasury Constant Maturity Yield",
    shortName: "2-Year Treasury Yield",
    category: "bond",
    subcategory: "Short-Term / Fed Policy",
    units: "%",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "Yield on 2-year US Treasury notes, most sensitive to near-term Federal Reserve monetary policy and interest rate expectations.",
    marketSignificance:
      "The primary market-driven barometer of where institutional investors expect the Federal Reserve to steer the Fed Funds policy rate over the next 12–24 months.",
    relatedIndexId: "ice-us-treasury-1-3-year",
    trackingEtfs: ["SHY", "VGSH"],
    format: "percent",
    decimals: 2,
    badgeColor: "#14b8a6",
    icon: "⏱️",
  },
  DGS5: {
    id: "DGS5",
    name: "5-Year Treasury Constant Maturity Yield",
    shortName: "5-Year Treasury Yield",
    category: "bond",
    subcategory: "Intermediate Treasury Notes",
    units: "%",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "Yield on 5-year US Treasury notes, capturing intermediate-duration interest rate sentiment and economic momentum.",
    marketSignificance:
      "Crucial reference rate for auto loans, 5-year commercial loans, and medium-term corporate debt issuance.",
    trackingEtfs: ["IEI", "VGIT"],
    format: "percent",
    decimals: 2,
    badgeColor: "#3b82f6",
    icon: "📈",
  },
  DGS10: {
    id: "DGS10",
    name: "10-Year Treasury Constant Maturity Yield",
    shortName: "10-Year Treasury Yield",
    category: "bond",
    subcategory: "Benchmark Sovereign Risk-Free Rate",
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
  DGS30: {
    id: "DGS30",
    name: "30-Year Treasury Constant Maturity Rate",
    shortName: "30-Year Treasury Yield",
    category: "bond",
    subcategory: "Long-Term Treasury Bond",
    units: "%",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "Yield on 30-year US Treasury bonds, reflecting long-term inflation expectations, federal deficit term premiums, and pension liabilities.",
    marketSignificance:
      "The long-term benchmark anchor for 30-year fixed mortgages, infrastructure financing, and institutional duration hedging.",
    relatedIndexId: "ice-us-treasury-20-plus-year",
    trackingEtfs: ["TLT", "VGLT"],
    format: "percent",
    decimals: 2,
    badgeColor: "#8b5cf6",
    icon: "🏛️",
  },
  T10Y2Y: {
    id: "T10Y2Y",
    name: "10-Year minus 2-Year Treasury Yield Spread",
    shortName: "Yield Curve (10Y - 2Y)",
    category: "bond",
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
  T10Y3M: {
    id: "T10Y3M",
    name: "10-Year minus 3-Month Treasury Yield Spread",
    shortName: "Yield Curve (10Y - 3M)",
    category: "bond",
    subcategory: "Recession Warning Indicator",
    units: "% Spread",
    frequency: "Daily",
    source: "Federal Reserve Bank of St. Louis",
    description:
      "Spread between the 10-year Treasury yield and the 3-month Treasury bill, historically favored by the Federal Reserve as the most reliable recession predictor.",
    marketSignificance:
      "Sustained inversion of the 10Y-3M curve has historically signaled an imminent recession within 6 to 18 months.",
    trackingEtfs: ["IEF", "BIL"],
    format: "percent",
    decimals: 2,
    badgeColor: "#f59e0b",
    icon: "⚠️",
  },
  DFII10: {
    id: "DFII10",
    name: "10-Year Treasury Inflation-Indexed Security (TIPS) Yield",
    shortName: "10-Year Real Yield (TIPS)",
    category: "bond",
    subcategory: "Inflation-Protected / Real Yields",
    units: "%",
    frequency: "Daily",
    source: "Federal Reserve Board",
    description:
      "The yield on 10-year Treasury Inflation-Protected Securities (TIPS), representing the true inflation-adjusted 'real' interest rate.",
    marketSignificance:
      "The benchmark real discount rate. Surging real yields compress equity valuation multiples and gold prices; falling real yields stimulate risk assets.",
    relatedIndexId: "bloomberg-us-tips",
    trackingEtfs: ["TIP", "VTIP"],
    format: "percent",
    decimals: 2,
    badgeColor: "#ec4899",
    icon: "🛡️",
  },
  FEDFUNDS: {
    id: "FEDFUNDS",
    name: "Federal Funds Effective Rate",
    shortName: "Fed Funds Rate",
    category: "bond",
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
  BAMLH0A0HYM2: {
    id: "BAMLH0A0HYM2",
    name: "ICE BofA US High Yield Index Option-Adjusted Spread",
    shortName: "High Yield Credit Spread",
    category: "bond",
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
  AGG_BOND: {
    id: "AGG_BOND",
    name: "Bloomberg U.S. Aggregate Bond Index (Proxy: AGG)",
    shortName: "U.S. Aggregate Bond",
    category: "bond",
    subcategory: "Total U.S. Investment Grade Bonds",
    units: "USD",
    frequency: "Daily",
    source: "Bloomberg Index Services",
    description:
      "The flagship benchmark for the entire US investment-grade bond market, covering Treasuries, government-related agencies, corporate bonds, MBS, and ABS.",
    marketSignificance:
      "The core institutional benchmark for US fixed income portfolios, representing over $25 trillion in debt securities.",
    relatedIndexId: "bloomberg-us-aggregate",
    trackingEtfs: ["AGG", "BND"],
    format: "currency",
    decimals: 2,
    badgeColor: "#0284c7",
    icon: "📊",
  },
  TLT_BOND: {
    id: "TLT_BOND",
    name: "ICE U.S. Treasury 20+ Year Bond Index (Proxy: TLT)",
    shortName: "20+ Year Treasury Bond",
    category: "bond",
    subcategory: "Long-Term Sovereign Debt",
    units: "USD",
    frequency: "Daily",
    source: "ICE Data Indices",
    description:
      "Tracks market-value-weighted US Treasury bonds with remaining maturities greater than twenty years, offering maximum interest-rate duration sensitivity.",
    marketSignificance:
      "The premier high-beta fixed-income instrument used by institutional traders and asset allocators for flight-to-safety duration hedging.",
    relatedIndexId: "ice-us-treasury-20-plus-year",
    trackingEtfs: ["TLT", "VGLT"],
    format: "currency",
    decimals: 2,
    badgeColor: "#6366f1",
    icon: "📈",
  },
  LQD_BOND: {
    id: "LQD_BOND",
    name: "Markit iBoxx USD Liquid Investment Grade Index (Proxy: LQD)",
    shortName: "Investment Grade Corporate",
    category: "bond",
    subcategory: "Corporate Investment-Grade Debt",
    units: "USD",
    frequency: "Daily",
    source: "S&P Dow Jones Indices / Markit",
    description:
      "Tracks liquid, US-dollar-denominated investment-grade corporate bonds issued by domestic and foreign corporations.",
    marketSignificance:
      "The standard institutional liquid benchmark for blue-chip corporate debt risk and spreads over Treasuries.",
    relatedIndexId: "sp-markit-iboxx-usd-liquid-investment-grade",
    trackingEtfs: ["LQD", "VCIT"],
    format: "currency",
    decimals: 2,
    badgeColor: "#10b981",
    icon: "🏢",
  },
  HYG_BOND: {
    id: "HYG_BOND",
    name: "Markit iBoxx USD Liquid High Yield Index (Proxy: HYG)",
    shortName: "High Yield Corporate (Junk)",
    category: "bond",
    subcategory: "High Yield / Sub-Investment Grade",
    units: "USD",
    frequency: "Daily",
    source: "S&P Dow Jones Indices / Markit",
    description:
      "Rules-based benchmark of the most liquid US-dollar-denominated sub-investment grade corporate bonds (junk bonds).",
    marketSignificance:
      "High-beta credit risk benchmark sensitive to corporate default rates, refinancing costs, and economic growth expectations.",
    relatedIndexId: "sp-markit-iboxx-usd-liquid-high-yield",
    trackingEtfs: ["HYG", "JNK"],
    format: "currency",
    decimals: 2,
    badgeColor: "#ef4444",
    icon: "🔥",
  },
  TIP_BOND: {
    id: "TIP_BOND",
    name: "Bloomberg U.S. TIPS Index (Proxy: TIP)",
    shortName: "TIPS Inflation-Protected",
    category: "bond",
    subcategory: "Inflation-Protected Sovereign Bonds",
    units: "USD",
    frequency: "Daily",
    source: "Bloomberg Index Services",
    description:
      "Measures the performance of all public obligations of the US Treasury that have remaining maturities of one or more years and are inflation-indexed.",
    marketSignificance:
      "The world's largest inflation-protected sovereign bond benchmark, directly tied to the Consumer Price Index (CPI-U).",
    relatedIndexId: "bloomberg-us-tips",
    trackingEtfs: ["TIP", "SCHP"],
    format: "currency",
    decimals: 2,
    badgeColor: "#f59e0b",
    icon: "🛡️",
  },
};

export const FRED_SERIES_LIST = Object.values(FRED_SERIES_CATALOG);
