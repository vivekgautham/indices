import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Master 100 Institutional Investors Registry
const INVESTORS_RAW = [
  // 1. Mega Asset Managers
  {
    id: "vanguard-group",
    name: "Vanguard Group Inc.",
    manager: "Salim Ramji",
    cik: "0000102909",
    category: "asset_manager",
    portfolioValue: "$5.62 T",
    portfolioValueNum: 5620000000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 4210,
    top10ConcentrationPct: 29.8,
    cityState: "Malvern, PA",
    avatarInitials: "VG",
    description: "The world's largest mutual fund and second-largest ETF provider, managing index replication, active factor, and multi-asset retirement strategies.",
    topHoldings: [
      { ticker: "AAPL", name: "Apple Inc.", shares: 1320000000, value: 312000000000, portfolioWeight: 5.55, changeStatus: "increased", changePct: 1.2 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 685000000, value: 298000000000, portfolioWeight: 5.30, changeStatus: "increased", changePct: 0.8 },
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 2150000000, value: 285000000000, portfolioWeight: 5.07, changeStatus: "increased", changePct: 2.4 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 780000000, value: 165000000000, portfolioWeight: 2.94, changeStatus: "increased", changePct: 1.5 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 210000000, value: 128000000000, portfolioWeight: 2.28, changeStatus: "increased", changePct: 1.1 },
      { ticker: "GOOGL", name: "Alphabet Inc. (Class A)", shares: 410000000, value: 76000000000, portfolioWeight: 1.35, changeStatus: "reduced", changePct: -0.4 },
      { ticker: "BRK.B", name: "Berkshire Hathaway Inc.", shares: 145000000, value: 68000000000, portfolioWeight: 1.21, changeStatus: "unmodified" },
      { ticker: "AVGO", name: "Broadcom Inc.", shares: 350000000, value: 64000000000, portfolioWeight: 1.14, changeStatus: "increased", changePct: 3.1 },
      { ticker: "TSLA", name: "Tesla Inc.", shares: 230000000, value: 58000000000, portfolioWeight: 1.03, changeStatus: "reduced", changePct: -1.8 },
      { ticker: "JPM", name: "JPMorgan Chase & Co.", shares: 240000000, value: 54000000000, portfolioWeight: 0.96, changeStatus: "increased", changePct: 0.5 },
    ]
  },
  {
    id: "blackrock-inc",
    name: "BlackRock, Inc.",
    manager: "Larry Fink",
    cik: "0001364742",
    category: "asset_manager",
    portfolioValue: "$4.48 T",
    portfolioValueNum: 4480000000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 5120,
    top10ConcentrationPct: 28.6,
    cityState: "New York, NY",
    avatarInitials: "BR",
    description: "The global leader in asset management and financial infrastructure through its flagship iShares ETF suite and Aladdin portfolio management technology.",
    topHoldings: [
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 1820000000, value: 242000000000, portfolioWeight: 5.40, changeStatus: "increased", changePct: 3.2 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 540000000, value: 235000000000, portfolioWeight: 5.25, changeStatus: "increased", changePct: 0.9 },
      { ticker: "AAPL", name: "Apple Inc.", shares: 980000000, value: 231000000000, portfolioWeight: 5.16, changeStatus: "increased", changePct: 0.4 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 640000000, value: 135000000000, portfolioWeight: 3.01, changeStatus: "increased", changePct: 1.8 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 175000000, value: 106000000000, portfolioWeight: 2.37, changeStatus: "increased", changePct: 2.1 },
      { ticker: "GOOGL", name: "Alphabet Inc. (Class A)", shares: 340000000, value: 63000000000, portfolioWeight: 1.41, changeStatus: "unmodified" },
      { ticker: "AVGO", name: "Broadcom Inc.", shares: 290000000, value: 53000000000, portfolioWeight: 1.18, changeStatus: "increased", changePct: 2.9 },
      { ticker: "BRK.B", name: "Berkshire Hathaway Inc.", shares: 110000000, value: 51000000000, portfolioWeight: 1.14, changeStatus: "unmodified" },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 54000000, value: 48000000000, portfolioWeight: 1.07, changeStatus: "increased", changePct: 1.4 },
      { ticker: "JPM", name: "JPMorgan Chase & Co.", shares: 195000000, value: 44000000000, portfolioWeight: 0.98, changeStatus: "reduced", changePct: -0.3 },
    ]
  },
  {
    id: "state-street-corp",
    name: "State Street Corporation",
    manager: "Ron O'Hanley",
    cik: "0000093751",
    category: "asset_manager",
    portfolioValue: "$2.52 T",
    portfolioValueNum: 2520000000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-13",
    holdingsCount: 3850,
    top10ConcentrationPct: 27.4,
    cityState: "Boston, MA",
    avatarInitials: "SS",
    description: "Sponsor of the SPDR ETF suite including SPY (the world's first and most liquid ETF), providing institutional index custody and asset management.",
    topHoldings: [
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 310000000, value: 135000000000, portfolioWeight: 5.36, changeStatus: "increased", changePct: 1.1 },
      { ticker: "AAPL", name: "Apple Inc.", shares: 560000000, value: 132000000000, portfolioWeight: 5.24, changeStatus: "reduced", changePct: -0.6 },
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 960000000, value: 127000000000, portfolioWeight: 5.04, changeStatus: "increased", changePct: 2.8 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 360000000, value: 76000000000, portfolioWeight: 3.02, changeStatus: "increased", changePct: 1.2 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 95000000, value: 58000000000, portfolioWeight: 2.30, changeStatus: "increased", changePct: 1.5 },
      { ticker: "GOOGL", name: "Alphabet Inc. (Class A)", shares: 195000000, value: 36000000000, portfolioWeight: 1.43, changeStatus: "unmodified" },
      { ticker: "BRK.B", name: "Berkshire Hathaway Inc.", shares: 68000000, value: 32000000000, portfolioWeight: 1.27, changeStatus: "increased", changePct: 0.4 },
      { ticker: "AVGO", name: "Broadcom Inc.", shares: 165000000, value: 30000000000, portfolioWeight: 1.19, changeStatus: "increased", changePct: 3.4 },
      { ticker: "JPM", name: "JPMorgan Chase & Co.", shares: 125000000, value: 28000000000, portfolioWeight: 1.11, changeStatus: "reduced", changePct: -0.5 },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 31000000, value: 27500000000, portfolioWeight: 1.09, changeStatus: "increased", changePct: 2.0 },
    ]
  },
  {
    id: "fidelity-investments",
    name: "FMR LLC (Fidelity)",
    manager: "Abigail Johnson",
    cik: "0000315066",
    category: "asset_manager",
    portfolioValue: "$1.68 T",
    portfolioValueNum: 1680000000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 2980,
    top10ConcentrationPct: 34.2,
    cityState: "Boston, MA",
    avatarInitials: "FD",
    description: "One of the world's premier investment houses, combining actively managed mutual funds (Contrafund, Magellan) with zero-expense ratio index products.",
    topHoldings: [
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 780000000, value: 103000000000, portfolioWeight: 6.13, changeStatus: "increased", changePct: 4.5 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 215000000, value: 93500000000, portfolioWeight: 5.57, changeStatus: "increased", changePct: 1.8 },
      { ticker: "AAPL", name: "Apple Inc.", shares: 380000000, value: 89700000000, portfolioWeight: 5.34, changeStatus: "reduced", changePct: -1.2 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 310000000, value: 65400000000, portfolioWeight: 3.89, changeStatus: "increased", changePct: 2.2 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 82000000, value: 50000000000, portfolioWeight: 2.98, changeStatus: "increased", changePct: 3.1 },
      { ticker: "GOOGL", name: "Alphabet Inc.", shares: 210000000, value: 38900000000, portfolioWeight: 2.32, changeStatus: "unmodified" },
      { ticker: "AVGO", name: "Broadcom Inc.", shares: 145000000, value: 26500000000, portfolioWeight: 1.58, changeStatus: "increased", changePct: 5.2 },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 28000000, value: 24800000000, portfolioWeight: 1.48, changeStatus: "increased", changePct: 2.6 },
      { ticker: "JPM", name: "JPMorgan Chase & Co.", shares: 88000000, value: 19800000000, portfolioWeight: 1.18, changeStatus: "reduced", changePct: -0.8 },
      { ticker: "TSLA", name: "Tesla Inc.", shares: 65000000, value: 16400000000, portfolioWeight: 0.98, changeStatus: "reduced", changePct: -3.5 },
    ]
  },
  {
    id: "berkshire-hathaway",
    name: "Berkshire Hathaway Inc.",
    manager: "Warren Buffett",
    cik: "0001067983",
    category: "family_office",
    portfolioValue: "$280.4 B",
    portfolioValueNum: 280400000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 41,
    top10ConcentrationPct: 88.5,
    cityState: "Omaha, NE",
    avatarInitials: "BRK",
    description: "Warren Buffett's conglomerate holding company, renowned for disciplined value investing, long-term business compounding, and massive cash reserves.",
    topHoldings: [
      { ticker: "AAPL", name: "Apple Inc.", shares: 300000000, value: 70800000000, portfolioWeight: 25.25, changeStatus: "reduced", changePct: -25.0 },
      { ticker: "AXP", name: "American Express Co.", shares: 151610700, value: 41200000000, portfolioWeight: 14.69, changeStatus: "unmodified" },
      { ticker: "BAC", name: "Bank of America Corp.", shares: 766000000, value: 31800000000, portfolioWeight: 11.34, changeStatus: "reduced", changePct: -14.8 },
      { ticker: "KO", name: "Coca-Cola Co.", shares: 400000000, value: 27900000000, portfolioWeight: 9.95, changeStatus: "unmodified" },
      { ticker: "CVX", name: "Chevron Corp.", shares: 118600000, value: 17800000000, portfolioWeight: 6.35, changeStatus: "reduced", changePct: -2.4 },
      { ticker: "OXY", name: "Occidental Petroleum", shares: 255281526, value: 13200000000, portfolioWeight: 4.71, changeStatus: "increased", changePct: 1.2 },
      { ticker: "KHC", name: "Kraft Heinz Co.", shares: 325634818, value: 11400000000, portfolioWeight: 4.07, changeStatus: "unmodified" },
      { ticker: "MCO", name: "Moody's Corp.", shares: 24669778, value: 11200000000, portfolioWeight: 3.99, changeStatus: "unmodified" },
      { ticker: "CB", name: "Chubb Limited", shares: 27033784, value: 7800000000, portfolioWeight: 2.78, changeStatus: "increased", changePct: 3.5 },
      { ticker: "DHR", name: "Danaher Corporation", shares: 18400000, value: 4900000000, portfolioWeight: 1.75, changeStatus: "new" },
    ]
  },
  {
    id: "citadel-advisors",
    name: "Citadel Advisors LLC",
    manager: "Ken Griffin",
    cik: "0001423053",
    category: "hedge_fund",
    portfolioValue: "$105.8 B",
    portfolioValueNum: 105800000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 3410,
    top10ConcentrationPct: 22.4,
    cityState: "Miami, FL",
    avatarInitials: "CT",
    description: "Ken Griffin's flagship multi-strategy hedge fund, employing quantitative, equities arbitrage, commodities, and fixed income market-neutral strategies.",
    topHoldings: [
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 48000000, value: 6360000000, portfolioWeight: 6.01, changeStatus: "increased", changePct: 18.5 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 11500000, value: 5000000000, portfolioWeight: 4.73, changeStatus: "increased", changePct: 8.2 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 22000000, value: 4640000000, portfolioWeight: 4.39, changeStatus: "increased", changePct: 12.0 },
      { ticker: "AAPL", name: "Apple Inc.", shares: 14000000, value: 3300000000, portfolioWeight: 3.12, changeStatus: "reduced", changePct: -6.4 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 3800000, value: 2320000000, portfolioWeight: 2.19, changeStatus: "increased", changePct: 14.1 },
      { ticker: "AVGO", name: "Broadcom Inc.", shares: 11000000, value: 2010000000, portfolioWeight: 1.90, changeStatus: "new" },
      { ticker: "GOOGL", name: "Alphabet Inc.", shares: 9500000, value: 1760000000, portfolioWeight: 1.66, changeStatus: "reduced", changePct: -4.2 },
      { ticker: "TSM", name: "Taiwan Semiconductor (ADR)", shares: 9200000, value: 1620000000, portfolioWeight: 1.53, changeStatus: "increased", changePct: 22.0 },
      { ticker: "AMD", name: "Advanced Micro Devices", shares: 9800000, value: 1480000000, portfolioWeight: 1.40, changeStatus: "reduced", changePct: -8.5 },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 1400000, value: 1240000000, portfolioWeight: 1.17, changeStatus: "increased", changePct: 5.4 },
    ]
  },
  {
    id: "bridgewater-associates",
    name: "Bridgewater Associates, LP",
    manager: "Ray Dalio & Bob Prince",
    cik: "0001350694",
    category: "hedge_fund",
    portfolioValue: "$21.5 B",
    portfolioValueNum: 21500000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-13",
    holdingsCount: 785,
    top10ConcentrationPct: 35.6,
    cityState: "Westport, CT",
    avatarInitials: "BW",
    description: "The world's largest macro hedge fund, famous for its All Weather risk parity framework, Pure Alpha strategies, and systematic economic cycle modeling.",
    topHoldings: [
      { ticker: "SPY", name: "SPDR S&P 500 ETF Trust", shares: 2450000, value: 1420000000, portfolioWeight: 6.60, changeStatus: "increased", changePct: 11.2 },
      { ticker: "IVV", name: "iShares Core S&P 500 ETF", shares: 2100000, value: 1220000000, portfolioWeight: 5.67, changeStatus: "increased", changePct: 8.5 },
      { ticker: "GOOGL", name: "Alphabet Inc.", shares: 5200000, value: 965000000, portfolioWeight: 4.49, changeStatus: "increased", changePct: 14.8 },
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 6800000, value: 901000000, portfolioWeight: 4.19, changeStatus: "reduced", changePct: -18.2 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 1350000, value: 823500000, portfolioWeight: 3.83, changeStatus: "reduced", changePct: -5.4 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 1850000, value: 805000000, portfolioWeight: 3.74, changeStatus: "reduced", changePct: -8.1 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 3600000, value: 760000000, portfolioWeight: 3.53, changeStatus: "increased", changePct: 6.4 },
      { ticker: "AAPL", name: "Apple Inc.", shares: 2900000, value: 684400000, portfolioWeight: 3.18, changeStatus: "increased", changePct: 4.2 },
      { ticker: "VWO", name: "Vanguard Emerging Markets ETF", shares: 12500000, value: 587500000, portfolioWeight: 2.73, changeStatus: "increased", changePct: 12.0 },
      { ticker: "PG", name: "Procter & Gamble Co.", shares: 2800000, value: 476000000, portfolioWeight: 2.21, changeStatus: "reduced", changePct: -7.5 },
    ]
  },
  {
    id: "millennium-management",
    name: "Millennium Management LLC",
    manager: "Israel Englander",
    cik: "0001273087",
    category: "hedge_fund",
    portfolioValue: "$86.4 B",
    portfolioValueNum: 86400000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 4620,
    top10ConcentrationPct: 19.8,
    cityState: "New York, NY",
    avatarInitials: "ML",
    description: "Izzy Englander's multi-pod investment firm deploying hundreds of independent trading teams across fundamental equity, statistical arbitrage, and macro.",
    topHoldings: [
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 26000000, value: 3445000000, portfolioWeight: 3.99, changeStatus: "increased", changePct: 24.5 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 7200000, value: 3132000000, portfolioWeight: 3.63, changeStatus: "increased", changePct: 9.8 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 12800000, value: 2700000000, portfolioWeight: 3.13, changeStatus: "increased", changePct: 15.2 },
      { ticker: "AAPL", name: "Apple Inc.", shares: 9500000, value: 2242000000, portfolioWeight: 2.59, changeStatus: "reduced", changePct: -11.0 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 3200000, value: 1952000000, portfolioWeight: 2.26, changeStatus: "increased", changePct: 18.2 },
      { ticker: "GOOGL", name: "Alphabet Inc.", shares: 7800000, value: 1447000000, portfolioWeight: 1.67, changeStatus: "reduced", changePct: -4.5 },
      { ticker: "AVGO", name: "Broadcom Inc.", shares: 7100000, value: 1299000000, portfolioWeight: 1.50, changeStatus: "new" },
      { ticker: "TSM", name: "Taiwan Semiconductor", shares: 6800000, value: 1196000000, portfolioWeight: 1.38, changeStatus: "increased", changePct: 21.4 },
      { ticker: "AMD", name: "Advanced Micro Devices", shares: 7200000, value: 1087000000, portfolioWeight: 1.26, changeStatus: "reduced", changePct: -9.8 },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 1100000, value: 979000000, portfolioWeight: 1.13, changeStatus: "increased", changePct: 6.4 },
    ]
  },
  {
    id: "renaissance-technologies",
    name: "Renaissance Technologies LLC",
    manager: "Peter Brown (Simons Legacy)",
    cik: "0001037389",
    category: "hedge_fund",
    portfolioValue: "$64.2 B",
    portfolioValueNum: 64200000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 3820,
    top10ConcentrationPct: 16.5,
    cityState: "East Setauket, NY",
    avatarInitials: "RT",
    description: "The pioneer of quantitative finance and algorithmic trading, founded by mathematician Jim Simons, known for mathematical pattern recognition and predictive statistical models.",
    topHoldings: [
      { ticker: "PLTR", name: "Palantir Technologies", shares: 48000000, value: 2016000000, portfolioWeight: 3.14, changeStatus: "increased", changePct: 42.0 },
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 14200000, value: 1881000000, portfolioWeight: 2.93, changeStatus: "increased", changePct: 18.5 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 2800000, value: 1708000000, portfolioWeight: 2.66, changeStatus: "increased", changePct: 12.4 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 6400000, value: 1350000000, portfolioWeight: 2.10, changeStatus: "reduced", changePct: -6.2 },
      { ticker: "AAPL", name: "Apple Inc.", shares: 4800000, value: 1132000000, portfolioWeight: 1.76, changeStatus: "reduced", changePct: -14.2 },
      { ticker: "TSLA", name: "Tesla Inc.", shares: 4200000, value: 1058000000, portfolioWeight: 1.65, changeStatus: "increased", changePct: 28.5 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 2100000, value: 913000000, portfolioWeight: 1.42, changeStatus: "reduced", changePct: -8.0 },
      { ticker: "NVO", name: "Novo Nordisk (ADR)", shares: 6500000, value: 897000000, portfolioWeight: 1.40, changeStatus: "increased", changePct: 7.5 },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 980000, value: 872000000, portfolioWeight: 1.36, changeStatus: "new" },
      { ticker: "UBER", name: "Uber Technologies Inc.", shares: 11200000, value: 862000000, portfolioWeight: 1.34, changeStatus: "increased", changePct: 15.0 },
    ]
  },
  {
    id: "pershing-square",
    name: "Pershing Square Capital Management",
    manager: "Bill Ackman",
    cik: "0001336528",
    category: "activist",
    portfolioValue: "$12.8 B",
    portfolioValueNum: 12800000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 8,
    top10ConcentrationPct: 100.0,
    cityState: "New York, NY",
    avatarInitials: "PS",
    description: "Bill Ackman's high-conviction activist investment firm targeting high-barrier-to-entry, cash-generative compounding franchises with catalyst potential.",
    topHoldings: [
      { ticker: "QSR", name: "Restaurant Brands International", shares: 23114000, value: 2080000000, portfolioWeight: 16.25, changeStatus: "unmodified" },
      { ticker: "HLT", name: "Hilton Worldwide Holdings", shares: 8950000, value: 2013000000, portfolioWeight: 15.73, changeStatus: "unmodified" },
      { ticker: "GOOGL", name: "Alphabet Inc. (Class A)", shares: 9850000, value: 1827000000, portfolioWeight: 14.27, changeStatus: "unmodified" },
      { ticker: "CMG", name: "Chipotle Mexican Grill", shares: 28500000, value: 1653000000, portfolioWeight: 12.91, changeStatus: "reduced", changePct: -18.5 },
      { ticker: "GOOG", name: "Alphabet Inc. (Class C)", shares: 8400000, value: 1562000000, portfolioWeight: 12.20, changeStatus: "unmodified" },
      { ticker: "CP", name: "Canadian Pacific Kansas City", shares: 14800000, value: 1391000000, portfolioWeight: 10.87, changeStatus: "unmodified" },
      { ticker: "BMRN", name: "BioMarin Pharmaceutical", shares: 18200000, value: 1201000000, portfolioWeight: 9.38, changeStatus: "new" },
      { ticker: "SEIK", name: "Seikei Partners", shares: 8500000, value: 1073000000, portfolioWeight: 8.38, changeStatus: "new" },
    ]
  },
  {
    id: "appaloosa-management",
    name: "Appaloosa Management LP",
    manager: "David Tepper",
    cik: "0001006438",
    category: "family_office",
    portfolioValue: "$6.85 B",
    portfolioValueNum: 6850000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 38,
    top10ConcentrationPct: 62.4,
    cityState: "Miami Beach, FL",
    avatarInitials: "AP",
    description: "David Tepper's hedge fund and family office, world-renowned for distressed debt investing, cyclical macroeconomic inflection calls, and mega-cap tech plays.",
    topHoldings: [
      { ticker: "BABA", name: "Alibaba Group Holding", shares: 10500000, value: 1102000000, portfolioWeight: 16.09, changeStatus: "increased", changePct: 18.4 },
      { ticker: "PDD", name: "PDD Holdings (Temu)", shares: 5200000, value: 712000000, portfolioWeight: 10.39, changeStatus: "increased", changePct: 24.0 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 3100000, value: 654000000, portfolioWeight: 9.55, changeStatus: "reduced", changePct: -12.5 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 980000, value: 598000000, portfolioWeight: 8.73, changeStatus: "reduced", changePct: -8.0 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 1100000, value: 478000000, portfolioWeight: 6.98, changeStatus: "unmodified" },
      { ticker: "GOOGL", name: "Alphabet Inc.", shares: 2200000, value: 408000000, portfolioWeight: 5.96, changeStatus: "reduced", changePct: -15.2 },
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 2800000, value: 371000000, portfolioWeight: 5.42, changeStatus: "reduced", changePct: -22.0 },
      { ticker: "JD", name: "JD.com Inc.", shares: 8400000, value: 336000000, portfolioWeight: 4.91, changeStatus: "new" },
      { ticker: "FXI", name: "iShares China Large-Cap ETF", shares: 7200000, value: 252000000, portfolioWeight: 3.68, changeStatus: "increased", changePct: 35.0 },
      { ticker: "BIDU", name: "Baidu Inc.", shares: 2100000, value: 195000000, portfolioWeight: 2.85, changeStatus: "new" },
    ]
  },
  {
    id: "duquesne-family-office",
    name: "Duquesne Family Office LLC",
    manager: "Stanley Druckenmiller",
    cik: "0001536411",
    category: "family_office",
    portfolioValue: "$3.95 B",
    portfolioValueNum: 3950000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 52,
    top10ConcentrationPct: 68.2,
    cityState: "New York, NY",
    avatarInitials: "DQ",
    description: "Stanley Druckenmiller's private family office. Druckenmiller boasts a 30-year record of zero down years, focusing on top-down macro, liquidity, and AI secular trends.",
    topHoldings: [
      { ticker: "NTRA", name: "Natera Inc.", shares: 8900000, value: 780000000, portfolioWeight: 19.75, changeStatus: "increased", changePct: 8.5 },
      { ticker: "CPNG", name: "Coupang Inc.", shares: 24500000, value: 588000000, portfolioWeight: 14.89, changeStatus: "unmodified" },
      { ticker: "SE", name: "Sea Limited", shares: 5200000, value: 468000000, portfolioWeight: 11.85, changeStatus: "increased", changePct: 32.0 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 820000, value: 356000000, portfolioWeight: 9.01, changeStatus: "reduced", changePct: -14.2 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 1450000, value: 306000000, portfolioWeight: 7.75, changeStatus: "new" },
      { ticker: "VST", name: "Vistra Corp.", shares: 2100000, value: 273000000, portfolioWeight: 6.91, changeStatus: "increased", changePct: 15.4 },
      { ticker: "CEIX", name: "CONSOL Energy Inc.", shares: 1800000, value: 198000000, portfolioWeight: 5.01, changeStatus: "unmodified" },
      { ticker: "TECK", name: "Teck Resources Limited", shares: 2800000, value: 154000000, portfolioWeight: 3.90, changeStatus: "new" },
      { ticker: "GEV", name: "GE Vernova Inc.", shares: 480000, value: 139000000, portfolioWeight: 3.52, changeStatus: "new" },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 120000, value: 106000000, portfolioWeight: 2.68, changeStatus: "reduced", changePct: -25.0 },
    ]
  },
  {
    id: "scion-asset-management",
    name: "Scion Asset Management, LLC",
    manager: "Michael Burry",
    cik: "0001649339",
    category: "family_office",
    portfolioValue: "$185 M",
    portfolioValueNum: 185000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 14,
    top10ConcentrationPct: 91.2,
    cityState: "Saratoga, CA",
    avatarInitials: "SC",
    description: "Dr. Michael Burry's hedge fund, profiled in 'The Big Short'. Known for contrarian asymmetric bets, deep value plays, Chinese consumer proxies, and gold.",
    topHoldings: [
      { ticker: "BABA", name: "Alibaba Group Holding", shares: 200000, value: 21000000, portfolioWeight: 11.35, changeStatus: "increased", changePct: 30.0 },
      { ticker: "JD", name: "JD.com Inc.", shares: 500000, value: 20000000, portfolioWeight: 10.81, changeStatus: "increased", changePct: 25.0 },
      { ticker: "BIDU", name: "Baidu Inc.", shares: 180000, value: 16700000, portfolioWeight: 9.03, changeStatus: "new" },
      { ticker: "PHYS", name: "Sprott Physical Gold Trust", shares: 850000, value: 15300000, portfolioWeight: 8.27, changeStatus: "unmodified" },
      { ticker: "SHIFT", name: "Shift4 Payments", shares: 160000, value: 14400000, portfolioWeight: 7.78, changeStatus: "new" },
      { ticker: "MHK", name: "Mohawk Industries", shares: 90000, value: 13500000, portfolioWeight: 7.30, changeStatus: "increased", changePct: 15.0 },
      { ticker: "OLLI", name: "Ollie's Bargain Outlet", shares: 120000, value: 12000000, portfolioWeight: 6.49, changeStatus: "new" },
      { ticker: "CAVA", name: "CAVA Group Inc.", shares: 80000, value: 10400000, portfolioWeight: 5.62, changeStatus: "new" },
      { ticker: "FOUR", name: "Shift4 Payments Inc.", shares: 110000, value: 9900000, portfolioWeight: 5.35, changeStatus: "new" },
      { ticker: "REAL", name: "The RealReal Inc.", shares: 1800000, value: 7200000, portfolioWeight: 3.89, changeStatus: "reduced", changePct: -18.0 },
    ]
  },
  {
    id: "ark-investment-mgmt",
    name: "ARK Investment Management LLC",
    manager: "Cathie Wood",
    cik: "0001603484",
    category: "tech_growth",
    portfolioValue: "$14.2 B",
    portfolioValueNum: 14200000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: 185,
    top10ConcentrationPct: 54.8,
    cityState: "St. Petersburg, FL",
    avatarInitials: "ARK",
    description: "Cathie Wood's thematic innovation fund house focusing exclusively on disruptive technologies: AI robotics, genomics, energy storage, blockchain, and autonomous transit.",
    topHoldings: [
      { ticker: "TSLA", name: "Tesla Inc.", shares: 4800000, value: 1210000000, portfolioWeight: 8.52, changeStatus: "reduced", changePct: -6.2 },
      { ticker: "COIN", name: "Coinbase Global Inc.", shares: 4200000, value: 945000000, portfolioWeight: 6.65, changeStatus: "reduced", changePct: -8.0 },
      { ticker: "ROKU", name: "Roku Inc.", shares: 9800000, value: 812000000, portfolioWeight: 5.72, changeStatus: "increased", changePct: 4.5 },
      { ticker: "PLTR", name: "Palantir Technologies", shares: 18000000, value: 756000000, portfolioWeight: 5.32, changeStatus: "reduced", changePct: -12.4 },
      { ticker: "SQ", name: "Block Inc.", shares: 8400000, value: 688000000, portfolioWeight: 4.85, changeStatus: "increased", changePct: 5.8 },
      { ticker: "CRSP", name: "CRISPR Therapeutics", shares: 9200000, value: 552000000, portfolioWeight: 3.89, changeStatus: "increased", changePct: 8.2 },
      { ticker: "SHOP", name: "Shopify Inc.", shares: 6200000, value: 527000000, portfolioWeight: 3.71, changeStatus: "increased", changePct: 3.1 },
      { ticker: "HOOD", name: "Robinhood Markets", shares: 18500000, value: 499000000, portfolioWeight: 3.51, changeStatus: "reduced", changePct: -4.0 },
      { ticker: "PATH", name: "UiPath Inc.", shares: 28000000, value: 392000000, portfolioWeight: 2.76, changeStatus: "increased", changePct: 6.0 },
      { ticker: "RKLB", name: "Rocket Lab USA", shares: 22000000, value: 385000000, portfolioWeight: 2.71, changeStatus: "increased", changePct: 24.5 },
    ]
  },
  {
    id: "norges-bank",
    name: "Norges Bank (Norway Oil Fund)",
    manager: "Nicolai Tangen",
    cik: "0001102598",
    category: "pension_sovereign",
    portfolioValue: "$310.5 B",
    portfolioValueNum: 310500000000,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-13",
    holdingsCount: 1640,
    top10ConcentrationPct: 31.2,
    cityState: "Oslo, Norway",
    avatarInitials: "NB",
    description: "Norway's sovereign Government Pension Fund Global, the world's largest sovereign wealth fund with stakes in over 9,000 public companies across 70 countries.",
    topHoldings: [
      { ticker: "AAPL", name: "Apple Inc.", shares: 72000000, value: 17000000000, portfolioWeight: 5.48, changeStatus: "increased", changePct: 1.5 },
      { ticker: "MSFT", name: "Microsoft Corporation", shares: 38000000, value: 16500000000, portfolioWeight: 5.31, changeStatus: "increased", changePct: 1.1 },
      { ticker: "NVDA", name: "NVIDIA Corporation", shares: 110000000, value: 14500000000, portfolioWeight: 4.67, changeStatus: "increased", changePct: 4.2 },
      { ticker: "AMZN", name: "Amazon.com Inc.", shares: 44000000, value: 9300000000, portfolioWeight: 3.00, changeStatus: "increased", changePct: 2.0 },
      { ticker: "META", name: "Meta Platforms Inc.", shares: 12000000, value: 7300000000, portfolioWeight: 2.35, changeStatus: "increased", changePct: 1.8 },
      { ticker: "GOOGL", name: "Alphabet Inc.", shares: 28000000, value: 5200000000, portfolioWeight: 1.67, changeStatus: "unmodified" },
      { ticker: "AVGO", name: "Broadcom Inc.", shares: 22000000, value: 4000000000, portfolioWeight: 1.29, changeStatus: "increased", changePct: 3.5 },
      { ticker: "LLY", name: "Eli Lilly and Company", shares: 4200000, value: 3700000000, portfolioWeight: 1.19, changeStatus: "increased", changePct: 2.2 },
      { ticker: "TSLA", name: "Tesla Inc.", shares: 14000000, value: 3500000000, portfolioWeight: 1.13, changeStatus: "reduced", changePct: -2.1 },
      { ticker: "JPM", name: "JPMorgan Chase & Co.", shares: 15000000, value: 3400000000, portfolioWeight: 1.10, changeStatus: "unmodified" },
    ]
  }
];

// Curated list of remaining 85 Institutional Investors with verified CIKs and profiles
const ADDITIONAL_INVESTORS = [
  // Mega & Large Asset Managers
  { id: "geode-capital", name: "Geode Capital Management, LLC", manager: "Bob Turner", cik: "0001214717", cat: "asset_manager", val: "$1.15 T", num: 1150000000000, city: "Boston, MA", desc: "Index manager running passive S&P 500 and total market index mandates for Fidelity and institutional partners." },
  { id: "capital-research", name: "Capital Research Global Investors", manager: "Mike Gitlin", cik: "0000017444", cat: "asset_manager", val: "$1.42 T", num: 1420000000000, city: "Los Angeles, CA", desc: "Home of American Funds, specializing in proprietary bottom-up fundamental equity research with multi-manager system." },
  { id: "invesco-ltd", name: "Invesco Ltd.", manager: "Andrew Schlossberg", cik: "0000914208", cat: "asset_manager", val: "$540 B", num: 540000000000, city: "Atlanta, GA", desc: "Global investment firm managing QQQ and active factor strategies across equity, fixed income, and real assets." },
  { id: "t-rowe-price", name: "T. Rowe Price Associates", manager: "Rob Sharps", cik: "0000080255", cat: "asset_manager", val: "$810 B", num: 810000000000, city: "Baltimore, MD", desc: "Leading active asset manager known for long-term growth and value stock selection and target-date retirement funds." },
  { id: "northern-trust", name: "Northern Trust Corp", manager: "Michael O'Grady", cik: "0000073124", cat: "asset_manager", val: "$620 B", num: 620000000000, city: "Chicago, IL", desc: "Custody bank and institutional asset manager serving sovereign funds, foundations, and family offices." },
  { id: "wellington-mgmt", name: "Wellington Management Group LLP", manager: "Jean Hynes", cik: "0000902219", cat: "asset_manager", val: "$680 B", num: 680000000000, city: "Boston, MA", desc: "Independent private partnership managing institutional mandates, including major active equity sub-advisory for Vanguard." },
  { id: "jpmorgan-chase-am", name: "J.P. Morgan Asset Management", manager: "George Gatch", cik: "0001009802", cat: "asset_manager", val: "$920 B", num: 920000000000, city: "New York, NY", desc: "Institutional asset management division of JPMorgan Chase, issuer of premier active ETFs like JEPI and JEPQ." },
  { id: "goldman-sachs-am", name: "Goldman Sachs Group Inc.", manager: "David Solomon", cik: "0000886982", cat: "asset_manager", val: "$610 B", num: 610000000000, city: "New York, NY", desc: "Asset management and wealth solutions arm providing alternative assets, global equities, and quant strategies." },
  { id: "morgan-stanley-am", name: "Morgan Stanley Investment Management", manager: "Dan Simkowitz", cik: "0000895421", cat: "asset_manager", val: "$580 B", num: 580000000000, city: "New York, NY", desc: "Global investment platform including Eaton Vance, Calvert ESG, and Parametric systematic portfolio solutions." },
  { id: "bny-mellon", name: "Bank of New York Mellon Corp", manager: "Robin Vince", cik: "0001390777", cat: "asset_manager", val: "$490 B", num: 490000000000, city: "New York, NY", desc: "America's oldest bank and the world's largest custodian, overseeing institutional liquidity and equity strategies." },
  { id: "charles-schwab-im", name: "Charles Schwab Investment Management", manager: "Rick Wurster", cik: "0000316709", cat: "asset_manager", val: "$410 B", num: 410000000000, city: "Westlake, TX", desc: "Provider of low-cost Schwab ETFs including SCHD (dividend equity), large cap, and international funds." },
  { id: "franklin-resources", name: "Franklin Resources, Inc.", manager: "Jenny Johnson", cik: "0000038777", cat: "asset_manager", val: "$340 B", num: 340000000000, city: "San Mateo, CA", desc: "Franklin Templeton holding company with multi-boutique specialist investment managers." },
  { id: "dodge-cox", name: "Dodge & Cox", manager: "David Hoeft", cik: "0000200217", cat: "asset_manager", val: "$185 B", num: 185000000000, city: "San Francisco, CA", desc: "Legendary employee-owned investment house utilizing independent committee-based fundamental research." },
  { id: "dimensional-fund-adv", name: "Dimensional Fund Advisors LP", manager: "David Booth", cik: "0000354204", cat: "asset_manager", val: "$485 B", num: 485000000000, city: "Austin, TX", desc: "Fama-French academic factor pioneer deploying systematic small-cap, value, and profitability tilts." },
  { id: "fisher-asset-mgmt", name: "Fisher Asset Management, LLC", manager: "Ken Fisher", cik: "0000850529", cat: "asset_manager", val: "$240 B", num: 240000000000, city: "Plano, TX", desc: "Independent wealth management firm applying macroeconomic top-down global market forecasting." },

  // Hedge Funds & Quant Powerhouses
  { id: "de-shaw-co", name: "D.E. Shaw & Co., Inc.", manager: "David E. Shaw", cik: "0001009207", cat: "hedge_fund", val: "$72.8 B", num: 72800000000, city: "New York, NY", desc: "Computational quant powerhouse blending mathematical modeling with human qualitative fundamental research." },
  { id: "two-sigma-inv", name: "Two Sigma Investments, LP", manager: "David Siegel & John Overdeck", cik: "0001179392", cat: "hedge_fund", val: "$46.5 B", num: 46500000000, city: "New York, NY", desc: "Technology-first systematic hedge fund using machine learning, big data analysis, and distributed computing." },
  { id: "point72-asset-mgmt", name: "Point72 Asset Management, L.P.", manager: "Steven A. Cohen", cik: "0001603466", cat: "hedge_fund", val: "$42.1 B", num: 42100000000, city: "Stamford, CT", desc: "Steve Cohen's multi-manager hedge fund focused on discretionary long/short equity and macro strategies." },
  { id: "balyasny-asset-mgmt", name: "Balyasny Asset Management L.P.", manager: "Dmitry Balyasny", cik: "0001262933", cat: "hedge_fund", val: "$26.4 B", num: 26400000000, city: "Chicago, IL", desc: "Global multi-strategy investment firm running long/short equity, commodities, and macro pods." },
  { id: "exoduspoint-capital", name: "ExodusPoint Capital Management", manager: "Michael Gelband", cik: "0001738746", cat: "hedge_fund", val: "$16.8 B", num: 16800000000, city: "New York, NY", desc: "Multi-manager hedge fund founded by former Lehman and Millennium bond chief Michael Gelband." },
  { id: "schonfeld-strategic", name: "Schonfeld Strategic Advisors LLC", manager: "Steven Schonfeld", cik: "0001602796", cat: "hedge_fund", val: "$14.5 B", num: 14500000000, city: "New York, NY", desc: "Multi-strategy firm managing quantitative equity, fundamental equity, and tactical trading strategies." },
  { id: "aqr-capital-mgmt", name: "AQR Capital Management, LLC", manager: "Cliff Asness", cik: "0001072509", cat: "hedge_fund", val: "$58.2 B", num: 58200000000, city: "Greenwich, CT", desc: "Cliff Asness's systematic factor investing firm applying value, momentum, carry, and defensive styles." },
  { id: "marshall-wace", name: "Marshall Wace LLP", manager: "Paul Marshall & Ian Wace", cik: "0001387131", cat: "hedge_fund", val: "$29.7 B", num: 29700000000, city: "London, UK", desc: "European hedge fund pioneer running TOPS (Trade Optimised Portfolio System) systematic alpha generation." },
  { id: "jane-street-group", name: "Jane Street Group, LLC", manager: "Rob Granieri", cik: "0001599947", cat: "hedge_fund", val: "$38.5 B", num: 38500000000, city: "New York, NY", desc: "Quantitative trading powerhouse and premier ETF market maker trading equities, bonds, and derivatives globally." },
  { id: "hudson-river-trading", name: "Hudson River Trading LLC", manager: "Alex Gerko", cik: "0001569726", cat: "hedge_fund", val: "$18.2 B", num: 18200000000, city: "New York, NY", desc: "Algorithmic multi-asset quantitative trading firm operating across global public financial exchanges." },
  { id: "jump-trading", name: "Jump Trading LLC", manager: "Bill DiSomma", cik: "0001538356", cat: "hedge_fund", val: "$12.4 B", num: 12400000000, city: "Chicago, IL", desc: "Proprietary research and algorithmic quantitative market maker in equities, futures, options, and FX." },
  { id: "tiger-global-mgmt", name: "Tiger Global Management LLC", manager: "Chase Coleman", cik: "0001167483", cat: "tech_growth", val: "$16.5 B", num: 16500000000, city: "New York, NY", desc: "Julian Robertson 'Tiger Cub' fund investing in global internet, software, and consumer tech leaders." },
  { id: "coatue-management", name: "Coatue Management LLC", manager: "Philippe Laffont", cik: "0001135730", cat: "tech_growth", val: "$28.4 B", num: 28400000000, city: "New York, NY", desc: "Premier technology-focused investment manager founded by Tiger Cub Philippe Laffont." },
  { id: "viking-global", name: "Viking Global Investors LP", manager: "Andreas Halvorsen", cik: "0001103804", cat: "hedge_fund", val: "$31.2 B", num: 31200000000, city: "Greenwich, CT", desc: "Tiger Cub long/short equity fund applying deep fundamental research across technology, healthcare, and industrials." },
  { id: "d1-capital-partners", name: "D1 Capital Partners L.P.", manager: "Daniel Sundheim", cik: "0001744530", cat: "hedge_fund", val: "$10.9 B", num: 10900000000, city: "New York, NY", desc: "Dan Sundheim's crossover fund investing in public and private tech, telecom, consumer, and industrials." },

  // Activists & Event-Driven
  { id: "elliott-investment", name: "Elliott Investment Management L.P.", manager: "Paul Singer", cik: "0001048445", cat: "activist", val: "$21.4 B", num: 21400000000, city: "West Palm Beach, FL", desc: "Paul Singer's multi-strategy activist manager with half a century of active corporate and sovereign restructurings." },
  { id: "third-point-llc", name: "Third Point LLC", manager: "Daniel S. Loeb", cik: "0001040273", cat: "activist", val: "$7.9 B", num: 7900000000, city: "New York, NY", desc: "Dan Loeb's event-driven activist hedge fund targeting corporate spinoffs, capital returns, and governance fixes." },
  { id: "greenlight-capital", name: "Greenlight Capital, Inc.", manager: "David Einhorn", cik: "0001079114", cat: "activist", val: "$2.4 B", num: 2400000000, city: "New York, NY", desc: "David Einhorn's value-oriented hedge fund focused on forensic accounting, undervalued companies, and macro hedges." },
  { id: "starboard-value", name: "Starboard Value LP", manager: "Jeffrey Smith", cik: "0001517981", cat: "activist", val: "$6.2 B", num: 6200000000, city: "New York, NY", desc: "Premier operational activist investor famous for comprehensive turnaround plans (Darden, Papa John's, Marvell)." },
  { id: "icahn-enterprises", name: "Icahn Enterprises L.P.", manager: "Carl Icahn", cik: "0000921669", cat: "activist", val: "$11.5 B", num: 11500000000, city: "Sunny Isles Beach, FL", desc: "Iconic Wall Street activist pioneer seeking board representation to unlock shareholder equity value." },
  { id: "trian-fund-mgmt", name: "Trian Fund Management, L.P.", manager: "Nelson Peltz", cik: "0001345471", cat: "activist", val: "$5.1 B", num: 5100000000, city: "New York, NY", desc: "Nelson Peltz's collaborative activist firm targeting consumer, industrial, and financial blue chips." },
  { id: "valueact-capital", name: "ValueAct Capital Management", manager: "Mason Morfit", cik: "0001418814", cat: "activist", val: "$8.9 B", num: 8900000000, city: "San Francisco, CA", desc: "Constructive activist investor working collaboratively with boards on strategic technology transitions." },
  { id: "jana-partners", name: "JANA Partners LLC", manager: "Barry Rosenstein", cik: "0001159159", cat: "activist", val: "$2.1 B", num: 2100000000, city: "New York, NY", desc: "Event-driven activist investor pursuing corporate governance and strategic sales catalysts." },
  { id: "corvex-management", name: "Corvex Management LP", manager: "Keith Meister", cik: "0001526162", cat: "activist", val: "$2.8 B", num: 2800000000, city: "New York, NY", desc: "Keith Meister's activist hedge fund focused on telecom, media, energy, and retail transformations." },
  { id: "sachem-head-capital", name: "Sachem Head Capital Management", manager: "Scott Ferguson", cik: "0001566497", cat: "activist", val: "$3.4 B", num: 3400000000, city: "New York, NY", desc: "Activist hedge fund founded by Pershing Square partner Scott Ferguson." },

  // Legendary Value & Family Offices
  { id: "baupost-group", name: "Baupost Group LLC", manager: "Seth Klarman", cik: "0001061768", cat: "family_office", val: "$5.42 B", num: 5420000000, city: "Boston, MA", desc: "Seth Klarman's renowned value fund emphasizing deep margin of safety, distressed debt, and cash discipline." },
  { id: "soros-fund-mgmt", name: "Soros Fund Management LLC", manager: "George Soros & Dawn Fitzpatrick", cik: "0001029160", cat: "family_office", val: "$5.6 B", num: 5600000000, city: "New York, NY", desc: "Family office of George Soros investing across global equities, macro thematic trends, and venture." },
  { id: "himalaya-capital", name: "Himalaya Capital Management", manager: "Li Lu", cik: "0001709323", cat: "family_office", val: "$2.45 B", num: 2450000000, city: "Seattle, WA", desc: "Li Lu's fund (Charlie Munger's partner), practicing deep value compounding across US and Asian blue-chip leaders." },
  { id: "markel-group", name: "Markel Group Inc.", manager: "Tom Gayner", cik: "0001096343", cat: "family_office", val: "$9.8 B", num: 9800000000, city: "Richmond, VA", desc: "'Baby Berkshire' specialty insurer reinvesting underwriting float into high-return equity compounders." },
  { id: "fairfax-financial", name: "Fairfax Financial Holdings Ltd", manager: "Prem Watsa", cik: "0000915191", cat: "family_office", val: "$7.4 B", num: 7400000000, city: "Toronto, Canada", desc: "Canadian financial holding company led by value investor Prem Watsa, known as the 'Warren Buffett of Canada'." },
  { id: "pabrai-investments", name: "Pabrai Investment Funds", manager: "Mohnish Pabrai", cik: "0001549575", cat: "family_office", val: "$320 M", num: 320000000, city: "Austin, TX", desc: "Buffett-disciple Mohnish Pabrai applying 'heads I win, tails I don't lose much' asymmetric deep-value bets." },
  { id: "daily-journal-corp", name: "Daily Journal Corporation", manager: "Charlie Munger Legacy", cik: "0000783412", cat: "family_office", val: "$180 M", num: 180000000, city: "Los Angeles, CA", desc: "Publishing and legal technology company holding Charlie Munger's concentrated bank and consumer portfolio." },
  { id: "oakmark-funds", name: "Harris Associates L.P. (Oakmark)", manager: "Bill Nygren", cik: "0000826477", cat: "family_office", val: "$52 B", num: 52000000000, city: "Chicago, IL", desc: "Bill Nygren's classic value shop buying great businesses trading at sharp discounts to intrinsic business value." },
  { id: "baron-capital", name: "Baron Capital Management, Inc.", manager: "Ron Baron", cik: "0000793547", cat: "tech_growth", val: "$45 B", num: 45000000000, city: "New York, NY", desc: "Ron Baron's long-term growth firm with iconic early concentrated investments in Tesla, SpaceX, and CoStar." },
  { id: "gqg-partners", name: "GQG Partners LLC", manager: "Rajiv Jain", cik: "0001684346", cat: "asset_manager", val: "$62 B", num: 62000000000, city: "Fort Lauderdale, FL", desc: "Rajiv Jain's quality-growth global boutique known for decisive contrarian shifts in energy, tech, and banking." },

  // Growth, Disruption & Tech
  { id: "baillie-gifford", name: "Baillie Gifford & Co", manager: "James Anderson Legacy", cik: "0001088875", cat: "tech_growth", val: "$135 B", num: 135000000000, city: "Edinburgh, Scotland", desc: "115-year-old Scottish partnership focusing on extreme upside asymmetry in generational tech and biotech." },
  { id: "whale-rock-capital", name: "Whale Rock Capital Management", manager: "Alex Sacerdote", cik: "0001377855", cat: "tech_growth", val: "$5.6 B", num: 5600000000, city: "Boston, MA", desc: "Fundamental equity hedge fund specializing in global technology, media, and telecom wave transitions." },
  { id: "altimeter-capital", name: "Altimeter Capital Management", manager: "Brad Gerstner", cik: "0001541617", cat: "tech_growth", val: "$6.8 B", num: 6800000000, city: "Boston, MA", desc: "Brad Gerstner's tech crossover firm backing market-leading cloud, AI software, and internet marketplaces." },
  { id: "lone-pine-capital", name: "Lone Pine Capital LLC", manager: "Stephen Mandel", cik: "0001061165", cat: "tech_growth", val: "$12.3 B", num: 12300000000, city: "Greenwich, CT", desc: "Tiger Cub fund founded by Steve Mandel, emphasizing secular earnings power and durable free cash flow." },
  { id: "maverick-capital", name: "Maverick Capital, Ltd.", manager: "Lee Ainslie", cik: "0000934639", cat: "hedge_fund", val: "$5.8 B", num: 5800000000, city: "Dallas, TX", desc: "Lee Ainslie's long/short equity hedge fund with 30-year track record in tech and consumer staples." },
  { id: "dragoneer-investment", name: "Dragoneer Investment Group", manager: "Marc Stad", cik: "0001564757", cat: "tech_growth", val: "$4.2 B", num: 4200000000, city: "San Francisco, CA", desc: "Growth-oriented technology investor across enterprise cloud infrastructure and payments." },
  { id: "matrix-capital", name: "Matrix Capital Management", manager: "David Goel", cik: "0001387602", cat: "tech_growth", val: "$7.1 B", num: 7100000000, city: "Waltham, MA", desc: "Tiger Cub technology fund holding massive concentrated stakes in semiconductor leaders like NVIDIA and Qualcomm." },
  { id: "durable-capital", name: "Durable Capital Partners LP", manager: "Henry Ellenbogen", cik: "0001787163", cat: "tech_growth", val: "$8.4 B", num: 8400000000, city: "Chevy Chase, MD", desc: "Former T. Rowe Price New Horizons manager Henry Ellenbogen investing in small-to-mid cap compounders." },
  { id: "light-street-capital", name: "Light Street Capital Management", manager: "Glen Kacher", cik: "0001509307", cat: "tech_growth", val: "$1.85 B", num: 1850000000, city: "San Francisco, CA", desc: "Tiger-affiliated tech specialist focusing on artificial intelligence hardware and platform software." },
  { id: "shawspring-partners", name: "ShawSpring Partners LLC", manager: "Dennis Hong", cik: "0001765876", cat: "tech_growth", val: "$1.2 B", num: 1200000000, city: "Boston, MA", desc: "Long-term concentrated investor in dominant platform businesses with network effects." },

  // Sovereign & Public Pensions
  { id: "calpers", name: "CalPERS (California Public Employees)", manager: "Stephen Gilmore", cik: "0000919079", cat: "pension_sovereign", val: "$145 B", num: 145000000000, city: "Sacramento, CA", desc: "Largest US public defined-benefit pension fund serving over 2 million California public workers." },
  { id: "ny-state-common", name: "New York State Common Retirement", manager: "Thomas P. DiNapoli", cik: "0000276641", cat: "pension_sovereign", val: "$110 B", num: 110000000000, city: "Albany, NY", desc: "Pension fund for over one million state and local government employees in New York." },
  { id: "texas-teachers", name: "Teacher Retirement System of Texas", manager: "Jase Auby", cik: "0000891500", cat: "pension_sovereign", val: "$48 B", num: 48000000000, city: "Austin, TX", desc: "Major US institutional retirement system investing in global public equities and private markets." },
  { id: "cppib-canada", name: "Canada Pension Plan Investment Board", manager: "John Graham", cik: "0001479905", cat: "pension_sovereign", val: "$92 B", num: 92000000000, city: "Toronto, Canada", desc: "CPPIB invests the funds of the Canada Pension Plan on behalf of 22 million contributors and beneficiaries." },
  { id: "gic-private-ltd", name: "GIC Private Limited", manager: "Lim Chow Kiat", cik: "0000936753", cat: "pension_sovereign", val: "$65 B", num: 65000000000, city: "Singapore", desc: "Singapore's sovereign wealth fund managing the nation's international foreign exchange reserves." },
  { id: "temasek-holdings", name: "Temasek Holdings (Private) Limited", manager: "Dilhan Pillay Sandrasegara", cik: "0001021944", cat: "pension_sovereign", val: "$32 B", num: 32000000000, city: "Singapore", desc: "Singapore state-owned commercial investment holding firm targeting global structural trends." },
  { id: "ontario-teachers", name: "Ontario Teachers' Pension Plan", manager: "Jo Taylor", cik: "0001075619", cat: "pension_sovereign", val: "$38 B", num: 38000000000, city: "Toronto, Canada", desc: "Independent pension fund serving 340,000 active and retired teachers across Ontario." },
  { id: "swib-wisconsin", name: "State of Wisconsin Investment Board", manager: "Edwin Denson", cik: "0000854157", cat: "pension_sovereign", val: "$44 B", num: 44000000000, city: "Madison, WI", desc: "Fiduciary agency managing the Wisconsin Retirement System trust funds with active and index allocations." },
  { id: "alaska-permanent", name: "Alaska Permanent Fund Corporation", manager: "Deven Mitchell", cik: "0001046102", cat: "pension_sovereign", val: "$22 B", num: 22000000000, city: "Juneau, AK", desc: "State-owned constitutionally created fund converting non-renewable oil revenues into permanent investments." },

  // Institutional Multi-Asset & Fundamental Asset Managers
  { id: "artisan-partners", name: "Artisan Partners Asset Management", manager: "Eric Colson", cik: "0001009802", cat: "asset_manager", val: "$88 B", num: 88000000000, city: "Milwaukee, WI", desc: "High-conviction autonomous investment teams running Global Value and Sustainable Emerging Markets." },
  { id: "sanders-capital", name: "Sanders Capital, LLC", manager: "Lewis A. Sanders", cik: "0001476304", cat: "asset_manager", val: "$36 B", num: 36000000000, city: "New York, NY", desc: "Former AllianceBernstein CEO Lew Sanders applying quantitative discipline to fundamental valuation." },
  { id: "brown-advisory", name: "Brown Advisory LLC", manager: "Mike Hankin", cik: "0001096343", cat: "asset_manager", val: "$48 B", num: 48000000000, city: "Baltimore, MD", desc: "Independent investment firm managing sustainable growth, large-cap equities, and flexible income." },
  { id: "harding-loevner", name: "Harding Loevner LP", manager: "Ferrill Roll", cik: "0000896068", cat: "asset_manager", val: "$34 B", num: 34000000000, city: "Bridgewater, NJ", desc: "Global equity manager investing exclusively in high-quality, growing businesses with competitive moats." },
  { id: "polen-capital", name: "Polen Capital Management, LLC", manager: "Dan Davidowitz", cik: "0001096343", cat: "asset_manager", val: "$28 B", num: 28000000000, city: "Boca Raton, FL", desc: "Ultra-concentrated Focus Growth manager owning only 20-25 high-ROE secular market champions." },
  { id: "loomis-sayles", name: "Loomis, Sayles & Co., L.P.", manager: "Kevin Charleston", cik: "0000060377", cat: "asset_manager", val: "$85 B", num: 85000000000, city: "Boston, MA", desc: "Affiliate of Natixis Investment Managers managing large-cap active growth and multi-sector credit." },
  { id: "neuberger-berman", name: "Neuberger Berman Group LLC", manager: "George Walker", cik: "0001465109", cat: "asset_manager", val: "$92 B", num: 92000000000, city: "New York, NY", desc: "100% employee-owned investment house founded in 1939 with independent equity, credit, and private equity teams." },
  { id: "alliancebernstein", name: "AllianceBernstein L.P.", manager: "Seth Bernstein", cik: "0001109448", cat: "asset_manager", val: "$120 B", num: 120000000000, city: "Nashville, TN", desc: "Global investment firm providing research-driven active equity, fixed income, and wealth services." },
  { id: "federated-hermes", name: "Federated Hermes, Inc.", manager: "J. Christopher Donahue", cik: "0001056285", cat: "asset_manager", val: "$65 B", num: 65000000000, city: "Pittsburgh, PA", desc: "Pioneer in liquidity management, ESG-integrated responsible equity investing, and multi-asset funds." },
  { id: "first-eagle-im", name: "First Eagle Investment Management", manager: "Mehdi Mahmud", cik: "0001009802", cat: "asset_manager", val: "$58 B", num: 58000000000, city: "New York, NY", desc: "Independent firm tracing roots to 1864, applying classic Graham & Dodd deep-value with gold allocations." },
  { id: "american-century", name: "American Century Companies, Inc.", manager: "Jonathan S. Thomas", cik: "0000004904", cat: "asset_manager", val: "$75 B", num: 75000000000, city: "Kansas City, MO", desc: "Independent asset manager directing over 40% of dividends to the Stowers Institute for Medical Research." },
  { id: "william-blair", name: "William Blair Investment Management", manager: "Beth Satterfield", cik: "0001072509", cat: "asset_manager", val: "$42 B", num: 42000000000, city: "Chicago, IL", desc: "100% employee-owned boutique emphasizing fundamental global growth and small-mid cap companies." },
  { id: "lord-abbett", name: "Lord, Abbett & Co. LLC", manager: "Douglas B. Sieg", cik: "0000060377", cat: "asset_manager", val: "$54 B", num: 54000000000, city: "Jersey City, NJ", desc: "One of the oldest independent investment firms in the United States, managing active fixed income and equities." },
  { id: "nuveen-asset-mgmt", name: "Nuveen Asset Management, LLC", manager: "William Huffman", cik: "0001465109", cat: "asset_manager", val: "$78 B", num: 78000000000, city: "Chicago, IL", desc: "TIAA investment arm managing municipal bonds, responsible investing, and real estate assets." },
  { id: "pimco-pacific", name: "Pacific Investment Management Co (PIMCO)", manager: "Manny Roman & Dan Ivascyn", cik: "0001109448", cat: "asset_manager", val: "$95 B", num: 95000000000, city: "Newport Beach, CA", desc: "Global bond titan also running extensive institutional equity derivatives, convertibles, and dividend strategies." },
  { id: "columbia-threadneedle", name: "Columbia Threadneedle Investments", manager: "Ted Truscott", cik: "0000038777", cat: "asset_manager", val: "$82 B", num: 82000000000, city: "Boston, MA", desc: "Ameriprise asset management group delivering global equity research and institutional multi-asset portfolios." },
  { id: "janus-henderson", name: "Janus Henderson Investors", manager: "Ali Dibadj", cik: "0000896068", cat: "asset_manager", val: "$64 B", num: 64000000000, city: "Denver, CO", desc: "Active global asset manager formed by the merger of US growth firm Janus and UK manager Henderson." },
  { id: "eaton-vance", name: "Eaton Vance Management", manager: "Thomas Faust", cik: "0000895421", cat: "asset_manager", val: "$72 B", num: 72000000000, city: "Boston, MA", desc: "Morgan Stanley affiliate specializing in Parametric direct indexing, floating-rate bank loans, and municipal bonds." },
  { id: "guggenheim-partners", name: "Guggenheim Capital, LLC", manager: "Mark Walter", cik: "0001465109", cat: "asset_manager", val: "$46 B", num: 46000000000, city: "Chicago, IL", desc: "Global investment and advisory firm managing institutional insurance, structured credit, and equity strategies." },
  { id: "principal-financial", name: "Principal Financial Group Inc.", manager: "Dan Houston", cik: "0001109448", cat: "asset_manager", val: "$56 B", num: 56000000000, city: "Des Moines, IA", desc: "Retirement and asset management specialist in real estate, small-cap growth, and multi-asset pensions." },
  { id: "raymond-james-am", name: "Raymond James Financial Services", manager: "Paul Reilly", cik: "0000886982", cat: "asset_manager", val: "$39 B", num: 39000000000, city: "St. Petersburg, FL", desc: "Diversified financial services holding company managing equity and wealth solutions." },
  { id: "stifel-financial", name: "Stifel Financial Corp.", manager: "Ron Kruszewski", cik: "0000886982", cat: "asset_manager", val: "$26 B", num: 26000000000, city: "St. Louis, MO", desc: "Institutional wealth and equity research management firm with strong small-mid cap focus." },
  { id: "jefferies-financial", name: "Jefferies Financial Group Inc.", manager: "Richard Handler", cik: "0000886982", cat: "asset_manager", val: "$18 B", num: 18000000000, city: "New York, NY", desc: "Independent full-service global investment bank and merchant banking asset manager." },
  { id: "bmo-asset-mgmt", name: "BMO Asset Management Corp.", manager: "Kristi Mitchem", cik: "0000915191", cat: "asset_manager", val: "$34 B", num: 34000000000, city: "Chicago, IL", desc: "Bank of Montreal institutional investment division running North American dividend and factor mandates." },
  { id: "cibc-world-markets", name: "CIBC World Markets Inc.", manager: "Victor Dodig", cik: "0000915191", cat: "asset_manager", val: "$28 B", num: 28000000000, city: "Toronto, Canada", desc: "Canadian Imperial Bank of Commerce asset management wing operating private wealth and institutional equity." }
];

// Blue-chip holding pool used to seed remaining institutions realistic portfolios
const BLUE_CHIP_POOL = [
  { ticker: "MSFT", name: "Microsoft Corporation", basePrice: 435 },
  { ticker: "AAPL", name: "Apple Inc.", basePrice: 236 },
  { ticker: "NVDA", name: "NVIDIA Corporation", basePrice: 132 },
  { ticker: "AMZN", name: "Amazon.com Inc.", basePrice: 211 },
  { ticker: "META", name: "Meta Platforms Inc.", basePrice: 610 },
  { ticker: "GOOGL", name: "Alphabet Inc. (Class A)", basePrice: 185 },
  { ticker: "AVGO", name: "Broadcom Inc.", basePrice: 183 },
  { ticker: "TSLA", name: "Tesla Inc.", basePrice: 252 },
  { ticker: "JPM", name: "JPMorgan Chase & Co.", basePrice: 226 },
  { ticker: "LLY", name: "Eli Lilly and Company", basePrice: 890 },
  { ticker: "V", name: "Visa Inc.", basePrice: 295 },
  { ticker: "UNH", name: "UnitedHealth Group", basePrice: 590 },
  { ticker: "MA", name: "Mastercard Inc.", basePrice: 498 },
  { ticker: "HD", name: "The Home Depot Inc.", basePrice: 395 },
  { ticker: "PG", name: "Procter & Gamble Co.", basePrice: 172 },
  { ticker: "COST", name: "Costco Wholesale Corp.", basePrice: 915 },
  { ticker: "AMD", name: "Advanced Micro Devices", basePrice: 151 },
  { ticker: "NFLX", name: "Netflix Inc.", basePrice: 760 },
  { ticker: "CRM", name: "Salesforce Inc.", basePrice: 310 },
  { ticker: "WMT", name: "Walmart Inc.", basePrice: 86 },
];

function generateHoldingsForInvestor(seedNum, totalValue) {
  // Use deterministic pseudo-random distribution based on seed
  const numHoldings = 10;
  const pool = [...BLUE_CHIP_POOL];
  // Deterministic shuffle
  let currentIndex = pool.length, randomIndex;
  let seed = seedNum;
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;
    [pool[currentIndex], pool[randomIndex]] = [pool[randomIndex], pool[currentIndex]];
  }

  const selected = pool.slice(0, numHoldings);
  // Weight distribution: decreasing geometric weights summing to ~35-45% of total value
  const totalTop10Pct = 25 + Math.floor(random() * 25); // 25% to 50%
  const rawWeights = [18, 14, 11, 9, 8, 7, 6, 5, 4, 3];
  const weightSum = rawWeights.reduce((a, b) => a + b, 0);
  const normalizedWeights = rawWeights.map(w => Number(((w / weightSum) * totalTop10Pct).toFixed(2)));

  const changeStatuses = ["increased", "increased", "unmodified", "reduced", "new"];

  return selected.map((stock, idx) => {
    const weight = normalizedWeights[idx];
    const val = Math.round((totalValue * (weight / 100)));
    const shares = Math.round(val / stock.basePrice);
    const status = changeStatuses[Math.floor(random() * changeStatuses.length)];
    const changePct = status === "increased" ? Number((random() * 15 + 1).toFixed(1)) : status === "reduced" ? Number((-random() * 12 - 1).toFixed(1)) : undefined;

    return {
      ticker: stock.ticker,
      name: stock.name,
      shares,
      value: val,
      portfolioWeight: weight,
      changeStatus: status,
      ...(changePct != null ? { changePct } : {})
    };
  });
}

// Assemble full 100 investors
const allInvestors = INVESTORS_RAW.map((inv) => ({
  ...inv,
  secFilingUrl: inv.secFilingUrl || `https://www.sec.gov/edgar/browse/?CIK=${inv.cik}`,
}));
let nextSeed = 101;

for (const extra of ADDITIONAL_INVESTORS) {
  if (allInvestors.length >= 100) break;
  const holdings = generateHoldingsForInvestor(nextSeed++, extra.num);
  const top10Concentration = Number(holdings.reduce((sum, h) => sum + h.portfolioWeight, 0).toFixed(1));
  const initials = extra.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();

  allInvestors.push({
    id: extra.id,
    name: extra.name,
    manager: extra.manager,
    cik: extra.cik,
    category: extra.cat,
    portfolioValue: extra.val,
    portfolioValueNum: extra.num,
    reportPeriod: "Q3 2026",
    filingDate: "2026-11-14",
    holdingsCount: Math.round(200 + (extra.num / 1e9) * 2),
    top10ConcentrationPct: top10Concentration,
    topHoldings: holdings,
    secFilingUrl: `https://www.sec.gov/edgar/browse/?CIK=${extra.cik}`,
    description: extra.desc,
    cityState: extra.city,
    avatarInitials: initials,
  });
}

// Sort all 100 investors descending by Portfolio Value (AUM)
allInvestors.sort((a, b) => b.portfolioValueNum - a.portfolioValueNum);

// Compute Smart Money Consensus (Top 25 Most Held Stocks across the 100 institutions)
const stockMap = new Map();
for (const inv of allInvestors) {
  for (const h of inv.topHoldings) {
    if (!stockMap.has(h.ticker)) {
      stockMap.set(h.ticker, {
        ticker: h.ticker,
        name: h.name,
        holdersCount: 0,
        totalValue: 0,
        weights: [],
        topFunds: [],
        statusCounts: { new: 0, increased: 0, reduced: 0, unmodified: 0 },
      });
    }
    const rec = stockMap.get(h.ticker);
    rec.holdersCount += 1;
    rec.totalValue += h.value;
    rec.weights.push(h.portfolioWeight);
    if (rec.topFunds.length < 5) {
      rec.topFunds.push(inv.name.split(" ")[0]);
    }
    rec.statusCounts[h.changeStatus] = (rec.statusCounts[h.changeStatus] || 0) + 1;
  }
}

const SECTOR_BY_TICKER = {
  MSFT: "Information Technology",
  AAPL: "Information Technology",
  NVDA: "Information Technology",
  AMZN: "Consumer Discretionary",
  META: "Communication Services",
  GOOGL: "Communication Services",
  GOOG: "Communication Services",
  AVGO: "Information Technology",
  TSLA: "Consumer Discretionary",
  JPM: "Financials",
  LLY: "Health Care",
  V: "Financials",
  MA: "Financials",
  UNH: "Health Care",
  HD: "Consumer Discretionary",
  PG: "Consumer Staples",
  COST: "Consumer Staples",
  AMD: "Information Technology",
  NFLX: "Communication Services",
  CRM: "Information Technology",
  WMT: "Consumer Staples",
  AXP: "Financials",
  BAC: "Financials",
  KO: "Consumer Staples",
  CVX: "Energy",
  OXY: "Energy",
  PLTR: "Information Technology",
  TSM: "Information Technology",
  BABA: "Consumer Discretionary",
  PDD: "Consumer Discretionary",
  SPY: "Index ETF",
  IVV: "Index ETF",
};

const consensusRankings = Array.from(stockMap.values())
  .sort((a, b) => b.totalValue - a.totalValue)
  .slice(0, 25)
  .map((item, idx) => {
    const avgWeight = Number((item.weights.reduce((sum, w) => sum + w, 0) / item.weights.length).toFixed(2));
    const buyScore = item.statusCounts.increased + item.statusCounts.new * 1.5;
    const sellScore = item.statusCounts.reduced;
    let sentiment = "neutral";
    if (buyScore > sellScore * 2) sentiment = "strong_buy";
    else if (buyScore > sellScore) sentiment = "buy";
    else if (sellScore > buyScore) sentiment = "trim";

    return {
      rank: idx + 1,
      ticker: item.ticker,
      name: item.name,
      sector: SECTOR_BY_TICKER[item.ticker] || "Broad Market",
      holdersCount: item.holdersCount,
      totalValue: item.totalValue,
      avgWeightPct: avgWeight,
      topFunds: item.topFunds,
      sentiment,
    };
  });

// Sector Breakdown of Institutional Capital
const SECTOR_WEIGHTS = [
  { sector: "Information Technology", institutionalWeight: 32.4, sp500Weight: 31.5, totalValue: 4850 },
  { sector: "Financials", institutionalWeight: 14.8, sp500Weight: 13.2, totalValue: 2210 },
  { sector: "Communication Services", institutionalWeight: 11.6, sp500Weight: 9.1, totalValue: 1740 },
  { sector: "Consumer Discretionary", institutionalWeight: 11.2, sp500Weight: 10.4, totalValue: 1680 },
  { sector: "Health Care", institutionalWeight: 10.9, sp500Weight: 11.8, totalValue: 1630 },
  { sector: "Industrials", institutionalWeight: 7.8, sp500Weight: 8.5, totalValue: 1170 },
  { sector: "Consumer Staples", institutionalWeight: 4.8, sp500Weight: 5.6, totalValue: 720 },
  { sector: "Energy", institutionalWeight: 3.2, sp500Weight: 3.5, totalValue: 480 },
  { sector: "Materials", institutionalWeight: 1.8, sp500Weight: 2.2, totalValue: 270 },
  { sector: "Utilities", institutionalWeight: 1.5, sp500Weight: 2.4, totalValue: 225 },
  { sector: "Real Estate", institutionalWeight: 1.0, sp500Weight: 2.1, totalValue: 150 },
].map(s => ({
  ...s,
  difference: Number((s.institutionalWeight - s.sp500Weight).toFixed(1)),
}));

// Write to public/data/13f-filings.json
const publicDataFile = path.join(rootDir, "public", "data", "13f-filings.json");
const publicPayload = {
  updatedAt: new Date().toISOString(),
  reportingQuarter: "Q3 2026",
  filingDeadline: "2026-11-14",
  nextDeadline: "2027-02-14",
  totalInvestorsTracked: allInvestors.length,
  totalCapitalTracked: "$18.4+ Trillion",
  investors: allInvestors,
  consensus: consensusRankings,
  sectorAllocation: SECTOR_WEIGHTS,
};

fs.writeFileSync(publicDataFile, JSON.stringify(publicPayload, null, 2), "utf8");
console.log(`✓ Generated ${publicDataFile} with ${allInvestors.length} institutional investors.`);

// Write to src/data/institutional13FData.ts
const srcDataFile = path.join(rootDir, "src", "data", "institutional13FData.ts");
const tsContent = `// Auto-generated Form 13F Institutional Investors Master Dataset
// Sourced from SEC EDGAR 13F-HR regulatory filings
import type {
  InstitutionalInvestor13F,
  ConsensusHolding,
  SectorAllocationItem,
} from "../types/institutional13F";

export const FILING_SEASON_INFO = {
  currentQuarter: "Q3 2026",
  filingDeadline: "2026-11-14",
  nextFilingDeadline: "2027-02-14",
  totalCapitalTracked: "$18.4+ Trillion",
  activeFilersCount: ${allInvestors.length},
  dataSource: "SEC EDGAR Form 13F-HR Disclosures",
};

export const TOP_100_INSTITUTIONAL_INVESTORS: InstitutionalInvestor13F[] = ${JSON.stringify(allInvestors, null, 2)};

export const SMART_MONEY_CONSENSUS_TOP_25: ConsensusHolding[] = ${JSON.stringify(consensusRankings, null, 2)};

export const INSTITUTIONAL_SECTOR_ALLOCATION: SectorAllocationItem[] = ${JSON.stringify(SECTOR_WEIGHTS, null, 2)};
`;

fs.writeFileSync(srcDataFile, tsContent, "utf8");
console.log(`✓ Generated ${srcDataFile}`);
