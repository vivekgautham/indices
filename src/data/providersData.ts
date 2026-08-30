import { IndexProvider, ProviderId } from "../types";

export const PROVIDERS_DATA: Record<ProviderId, IndexProvider> = {
  sp: {
    id: "sp",
    name: "S&P Dow Jones Indices",
    shortName: "S&P",
    logoText: "S&P DJI",
    tagline: "The world's foremost provider of financial market benchmarks.",
    description:
      "A joint venture between S&P Global and CME Group, S&P Dow Jones Indices is home to iconic financial market indicators such as the S&P 500 and the Dow Jones Industrial Average. S&P indices serve as the basis for more investable products than any other provider in the world.",
    headquarters: "New York, NY, USA",
    founded: "1896 (DJIA) / 1957 (S&P 500)",
    website: "https://www.spglobal.com/spdji",
    accentColor: "#8b5cf6",
    badgeBg: "rgba(139, 92, 246, 0.15)",
    keyEtfPartners: [
      "State Street (SPDR)",
      "BlackRock (iShares)",
      "Vanguard",
      "Invesco",
    ],
    coverage:
      "Global Equities, Fixed Income, Real Estate, Commodities, Strategy & Factor",
    marketShareSummary:
      "More assets are invested in products based on the S&P 500 than any other index globally, with over $11+ trillion benchmarked.",
  },
  ftse: {
    id: "ftse",
    name: "FTSE Russell",
    shortName: "FTSE Russell",
    logoText: "FTSE Russell",
    tagline:
      "Global benchmark leader calculating thousands of indices across 70+ countries.",
    description:
      "Part of the London Stock Exchange Group (LSEG), FTSE Russell calculates thousands of indexes that measure and benchmark markets across more than 70 countries. Famous for the UK FTSE 100, the US Russell 2000 small-cap benchmark, and global all-cap universes.",
    headquarters: "London, United Kingdom",
    founded: "1984 (FTSE / Russell)",
    website: "https://www.ftserussell.com",
    accentColor: "#3b82f6",
    badgeBg: "rgba(59, 130, 246, 0.15)",
    keyEtfPartners: [
      "Vanguard",
      "BlackRock (iShares)",
      "Charles Schwab",
      "DWS Xtrackers",
    ],
    coverage:
      "Global All-Cap Equities, US Small/Mid Cap (Russell), UK & International Equities, Fixed Income",
    marketShareSummary:
      "Over $20 trillion in institutional assets are benchmarked to FTSE Russell indices worldwide.",
  },
  msci: {
    id: "msci",
    name: "MSCI Inc.",
    shortName: "MSCI",
    logoText: "MSCI",
    tagline:
      "Pioneering institutional global equity indexes and international benchmarks.",
    description:
      "MSCI is a leading provider of critical decision support tools and services for the global investment community. Its equity indexes (such as MSCI ACWI, MSCI World, and MSCI Emerging Markets) are the primary standard for cross-border and institutional equity allocation.",
    headquarters: "New York, NY, USA",
    founded: "1969 (Capital Int.) / 1986",
    website: "https://www.msci.com",
    accentColor: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.15)",
    keyEtfPartners: [
      "BlackRock (iShares)",
      "UBS",
      "Amundi",
      "DWS",
      "State Street",
    ],
    coverage:
      "International Equities, Emerging Markets, ESG & Climate, Factor & Custom Indexes",
    marketShareSummary:
      "More than 99 of the top 100 global asset managers license MSCI indexes for international and global benchmarking.",
  },
  nasdaq: {
    id: "nasdaq",
    name: "Nasdaq Global Indexes",
    shortName: "NASDAQ",
    logoText: "NASDAQ",
    tagline:
      "Premier home of innovation, technology leaders, and modern thematic benchmarks.",
    description:
      "Nasdaq Global Indexes designs innovative, market-leading benchmarks across asset classes and geographies. Celebrated for the iconic Nasdaq-100 (NDX) index featuring the world's most transformative non-financial tech and growth giants.",
    headquarters: "New York, NY, USA",
    founded: "1971 (Nasdaq) / 1985 (NDX)",
    website: "https://www.nasdaq.com/solutions/nasdaq-global-indexes",
    accentColor: "#06b6d4",
    badgeBg: "rgba(6, 182, 212, 0.15)",
    keyEtfPartners: [
      "Invesco (QQQ/QQQM)",
      "First Trust",
      "Global X",
      "ProShares",
      "Direxion",
    ],
    coverage:
      "Technology, Innovation, Thematic Equities, Green Energy, Cybersecurity, Dividend Achievers",
    marketShareSummary:
      "Tracking the world's largest innovation companies; Invesco QQQ tracking Nasdaq-100 is one of the highest-volume ETFs on Earth.",
  },
  crsp: {
    id: "crsp",
    name: "Center for Research in Security Prices (CRSP)",
    shortName: "CRSP",
    logoText: "CRSP",
    tagline:
      "Academically rigorous index architecture designed for cost- and tax-efficient investing.",
    description:
      "Based at the University of Chicago Booth School of Business, CRSP has been the foundational source for academic financial research since 1960. CRSP Market Indexes feature unique innovative banding and packeting methodology to minimize unnecessary portfolio turnover.",
    headquarters: "Chicago, IL, USA",
    founded: "1960 (Research) / 2011 (Indexes)",
    website: "https://www.crsp.org",
    accentColor: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.15)",
    keyEtfPartners: ["The Vanguard Group (Exclusive Index Fund Partner)"],
    coverage:
      "US Total Market, Large Cap, Mid Cap, Small Cap, Micro Cap, Value & Growth Style Dimensions",
    marketShareSummary:
      "Primary benchmark underlying Vanguard's core US index funds, including the $1.5+ trillion Vanguard Total Stock Market (VTI).",
  },
};

export const PROVIDERS_LIST: IndexProvider[] = [
  PROVIDERS_DATA.sp,
  PROVIDERS_DATA.ftse,
  PROVIDERS_DATA.msci,
  PROVIDERS_DATA.nasdaq,
  PROVIDERS_DATA.crsp,
];
