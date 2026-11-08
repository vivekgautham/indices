export interface Sp500SectorDefinition {
  id: string;
  name: string;
  shortName: string;
  ticker: string;
  etfName: string;
  weight: number; // Percentage of S&P 500
  color: string;
  icon: string;
  topHoldings: string[];
  topHoldingsWeight: string;
  description: string;
  relatedIndexId?: string;
}

export interface Sp500SectorMarketData {
  ticker: string;
  price: number;
  prevClose: number;
  change: number;
  changePct: number;
  sparkline?: number[];
  latestDate?: string;
}

export interface Sp500SectorCombined extends Sp500SectorDefinition {
  marketData?: Sp500SectorMarketData;
}

export const SP500_SECTORS: Sp500SectorDefinition[] = [
  {
    id: "tech",
    name: "Information Technology",
    shortName: "Technology",
    ticker: "XLK",
    etfName: "Technology Select Sector SPDR Fund",
    weight: 31.8,
    color: "#38bdf8",
    icon: "💻",
    topHoldings: [
      "Apple (AAPL)",
      "NVIDIA (NVDA)",
      "Microsoft (MSFT)",
      "Broadcom (AVGO)",
    ],
    topHoldingsWeight: "~52% in Top 3",
    description:
      "Enterprise cloud software, generative AI accelerators, semiconductors, and digital infrastructure.",
    relatedIndexId: "sp-technology-select-sector",
  },
  {
    id: "financials",
    name: "Financials",
    shortName: "Financials",
    ticker: "XLF",
    etfName: "Financial Select Sector SPDR Fund",
    weight: 13.1,
    color: "#3b82f6",
    icon: "🏦",
    topHoldings: [
      "Berkshire Hathaway (BRK.B)",
      "JPMorgan Chase (JPM)",
      "Visa (V)",
      "Mastercard (MA)",
    ],
    topHoldingsWeight: "~33% in Top 3",
    description:
      "Global money-center banking institutions, credit card transaction networks, insurance underwriters, and investment managers.",
  },
  {
    id: "healthcare",
    name: "Health Care",
    shortName: "Health Care",
    ticker: "XLV",
    etfName: "Health Care Select Sector SPDR Fund",
    weight: 11.4,
    color: "#10b981",
    icon: "🩺",
    topHoldings: [
      "Eli Lilly (LLY)",
      "UnitedHealth Group (UNH)",
      "Johnson & Johnson (JNJ)",
      "AbbVie (ABBV)",
    ],
    topHoldingsWeight: "~31% in Top 3",
    description:
      "Biopharmaceutical breakthroughs, life science technologies, surgical medical equipment, and managed health networks.",
  },
  {
    id: "discretionary",
    name: "Consumer Discretionary",
    shortName: "Discretionary",
    ticker: "XLY",
    etfName: "Consumer Discretionary Select Sector SPDR Fund",
    weight: 10.2,
    color: "#f59e0b",
    icon: "🛍️",
    topHoldings: [
      "Amazon (AMZN)",
      "Tesla (TSLA)",
      "Home Depot (HD)",
      "McDonald's (MCD)",
    ],
    topHoldingsWeight: "~55% in Top 3",
    description:
      "Global e-commerce platforms, electric vehicles, home improvement retailers, consumer dining franchises, and travel.",
  },
  {
    id: "comm_services",
    name: "Communication Services",
    shortName: "Communications",
    ticker: "XLC",
    etfName: "Communication Services Select Sector SPDR Fund",
    weight: 9.1,
    color: "#8b5cf6",
    icon: "📡",
    topHoldings: [
      "Alphabet (GOOGL)",
      "Meta Platforms (META)",
      "Netflix (NFLX)",
      "Walt Disney (DIS)",
    ],
    topHoldingsWeight: "~51% in Top 3",
    description:
      "Global search engines, interactive social media ecosystems, streaming entertainment, and telecommunications.",
  },
  {
    id: "industrials",
    name: "Industrials",
    shortName: "Industrials",
    ticker: "XLI",
    etfName: "Industrial Select Sector SPDR Fund",
    weight: 8.3,
    color: "#6366f1",
    icon: "🏭",
    topHoldings: [
      "GE Aerospace (GE)",
      "Caterpillar (CAT)",
      "Union Pacific (UNP)",
      "Honeywell (HON)",
    ],
    topHoldingsWeight: "~17% in Top 3",
    description:
      "Commercial aerospace propulsion, defense systems, transcontinental freight rail logistics, and heavy construction equipment.",
    relatedIndexId: "sp-industrial-select-sector",
  },
  {
    id: "staples",
    name: "Consumer Staples",
    shortName: "Staples",
    ticker: "XLP",
    etfName: "Consumer Staples Select Sector SPDR Fund",
    weight: 5.7,
    color: "#06b6d4",
    icon: "🛒",
    topHoldings: [
      "Procter & Gamble (PG)",
      "Costco (COST)",
      "Walmart (WMT)",
      "Coca-Cola (KO)",
    ],
    topHoldingsWeight: "~37% in Top 3",
    description:
      "Recession-resistant consumer household goods, wholesale hypermarkets, packaged foods, and global beverage titans.",
    relatedIndexId: "sp-consumer-staples-select-sector",
  },
  {
    id: "energy",
    name: "Energy",
    shortName: "Energy",
    ticker: "XLE",
    etfName: "Energy Select Sector SPDR Fund",
    weight: 3.3,
    color: "#ea580c",
    icon: "⚡",
    topHoldings: [
      "ExxonMobil (XOM)",
      "Chevron (CVX)",
      "ConocoPhillips (COP)",
      "Schlumberger (SLB)",
    ],
    topHoldingsWeight: "~49% in Top 3",
    description:
      "Integrated petroleum exploration giants, refining facilities, transcontinental pipeline infrastructure, and oilfield engineering.",
    relatedIndexId: "sp-energy-select-sector",
  },
  {
    id: "utilities",
    name: "Utilities",
    shortName: "Utilities",
    ticker: "XLU",
    etfName: "Utilities Select Sector SPDR Fund",
    weight: 2.5,
    color: "#eab308",
    icon: "💡",
    topHoldings: [
      "NextEra Energy (NEE)",
      "Southern Company (SO)",
      "Duke Energy (DUK)",
      "Constellation Energy (CEG)",
    ],
    topHoldingsWeight: "~30% in Top 3",
    description:
      "Regulated electric utilities, nuclear power generators, natural gas distribution, and clean renewable transmission grids.",
  },
  {
    id: "real_estate",
    name: "Real Estate",
    shortName: "Real Estate",
    ticker: "XLRE",
    etfName: "Real Estate Select Sector SPDR Fund",
    weight: 2.2,
    color: "#ec4899",
    icon: "🏢",
    topHoldings: [
      "Prologis (PLD)",
      "American Tower (AMT)",
      "Equinix (EQIX)",
      "Welltower (WELL)",
    ],
    topHoldingsWeight: "~28% in Top 3",
    description:
      "Industrial distribution warehouses, digital wireless telecom towers, data centers, and senior healthcare housing REITs.",
  },
  {
    id: "materials",
    name: "Materials",
    shortName: "Materials",
    ticker: "XLB",
    etfName: "Materials Select Sector SPDR Fund",
    weight: 2.1,
    color: "#14b8a6",
    icon: "⛏️",
    topHoldings: [
      "Linde plc (LIN)",
      "Sherwin-Williams (SHW)",
      "Freeport-McMoRan (FCX)",
      "Ecolab (ECL)",
    ],
    topHoldingsWeight: "~39% in Top 3",
    description:
      "Atmospheric industrial gases, architectural coatings, copper & metals mining, and advanced chemical materials.",
  },
];
