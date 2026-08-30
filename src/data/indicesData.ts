import { MarketIndex } from "../types";

export const INDICES_DATA: MarketIndex[] = [
  // ==========================================
  // S&P DOW JONES INDICES
  // ==========================================
  {
    id: "sp-500",
    symbol: "SPX",
    altSymbols: ["^GSPC", "S&P 500"],
    name: "S&P 500 Index",
    providerId: "sp",
    category: "Large-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 503,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1957,
    trackingEtfs: [
      { ticker: "SPY", name: "SPDR S&P 500 ETF Trust", aum: "$600B+" },
      { ticker: "VOO", name: "Vanguard S&P 500 ETF", aum: "$550B+" },
      { ticker: "IVV", name: "iShares Core S&P 500 ETF", aum: "$520B+" },
      {
        ticker: "SPYM",
        name: "State Street SPDR Portfolio S&P 500 ETF (formerly SPLG)",
        aum: "$45B+",
      },
    ],
    summary:
      "The premier benchmark for large-cap US equities, measuring the performance of 500 leading companies representing ~80% of available market cap.",
    description:
      "Widely regarded as the single best gauge of large-cap US equities, the S&P 500 includes 500 leading companies in leading industries of the US economy. It requires companies to meet stringent criteria including positive earnings over the most recent 4 quarters, high liquidity, and float percentage.",
    eligibilityCriteria: [
      "US company domiciled with primary listing on NYSE, NASDAQ, or Cboe",
      "Market capitalization minimum threshold (currently >$18.0B)",
      "Positive as-reported earnings over the most recent quarter and sum of 4 quarters",
      "Public float of at least 50% and high trading liquidity ratio",
    ],
    keyCharacteristics: [
      "Represents approximately 80% of total US market capitalization",
      "Determined by the S&P Index Committee",
      "Foundation for futures (ES), options (SPX), and hundreds of ETFs globally",
    ],
    tags: ["Large Cap", "US Core", "Benchmark", "Blue Chip", "S&P Committee"],
    officialUrl: "https://www.spglobal.com/spdji/en/indices/equity/sp-500/",
  },
  {
    id: "djia",
    symbol: "DJIA",
    altSymbols: ["^DJI", "Dow 30"],
    name: "Dow Jones Industrial Average",
    providerId: "sp",
    category: "Mega-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 30,
    weightingMethodology: "Price-Weighted",
    rebalanceFrequency: "As Needed by Averages Committee",
    launchYear: 1896,
    trackingEtfs: [
      {
        ticker: "DIA",
        name: "SPDR Dow Jones Industrial Average ETF Trust",
        aum: "$35B+",
      },
    ],
    summary:
      "The oldest continuous equity benchmark in the world, tracking 30 blue-chip US corporate market leaders across all sectors except Transportation and Utilities.",
    description:
      "Created by Charles Dow in 1896, the DJIA is a price-weighted index of 30 prominent companies. Higher stock prices confer larger index weights. Component changes occur on an as-needed basis without periodic scheduled reconstitutions.",
    eligibilityCriteria: [
      "Constituents must be members of the S&P 500 (except Transportation & Utilities)",
      "Must possess an excellent reputation, demonstrated sustained growth, and wide interest among investors",
    ],
    keyCharacteristics: [
      "Price-weighted index using the proprietary Dow Divisor",
      "Contains 30 iconic American industrial and economic leaders",
      "Most quoted financial index in mainstream news media worldwide",
    ],
    tags: ["Blue Chip", "Mega Cap", "Price-Weighted", "Iconic", "Historic"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/dow-jones-industrial-average/",
  },
  {
    id: "sp-midcap-400",
    symbol: "MID",
    altSymbols: ["^MID", "S&P 400"],
    name: "S&P MidCap 400 Index",
    providerId: "sp",
    category: "Mid-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 400,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly",
    launchYear: 1991,
    trackingEtfs: [
      { ticker: "IJH", name: "iShares Core S&P Mid-Cap ETF", aum: "$85B+" },
      { ticker: "MDY", name: "SPDR S&P MidCap 400 ETF Trust", aum: "$22B+" },
      { ticker: "IVOO", name: "Vanguard S&P Mid-Cap 400 ETF", aum: "$3B+" },
    ],
    summary:
      "Serves as the barometer for the US mid-cap equity sector, covering 400 companies representing ~7% of the total US market cap.",
    description:
      "The S&P MidCap 400 provides investors with a benchmark for mid-sized companies, which often offer higher growth potential than large caps with greater operational stability than small caps.",
    eligibilityCriteria: [
      "Market capitalization within the mid-cap range (approx. $5.8B - $15.8B)",
      "Track record of positive earnings over the recent four quarters",
      "Sufficient liquidity and 50%+ public float",
    ],
    keyCharacteristics: [
      "Historically distinctive risk/return profile ('mid-cap sweet spot')",
      "Captures companies in their rapid expansion phase",
    ],
    tags: ["Mid Cap", "US Equity", "Growth & Value", "Core"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-midcap-400/",
  },
  {
    id: "sp-smallcap-600",
    symbol: "SML",
    altSymbols: ["^SML", "S&P 600"],
    name: "S&P SmallCap 600 Index",
    providerId: "sp",
    category: "Small-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 600,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly",
    launchYear: 1994,
    trackingEtfs: [
      { ticker: "IJR", name: "iShares Core S&P Small-Cap ETF", aum: "$80B+" },
      {
        ticker: "SPSM",
        name: "SPDR Portfolio S&P 600 Small Cap ETF",
        aum: "$12B+",
      },
      { ticker: "VIOO", name: "Vanguard S&P Small-Cap 600 ETF", aum: "$2.5B+" },
    ],
    summary:
      "Measures the small-cap segment of the US equity market, enforcing a strict profitability screen that eliminates unprofitable speculative firms.",
    description:
      "Unlike some other small-cap indices, the S&P 600 requires companies to have positive earnings in their latest quarter and across their past four quarters to be added. This profitability screen has historically provided superior risk-adjusted returns.",
    eligibilityCriteria: [
      "Market capitalization in the small-cap range (approx. $1.0B - $6.7B)",
      "Strict profitability requirement: positive earnings for trailing 4 quarters",
      "High liquidity and minimum 50% public float",
    ],
    keyCharacteristics: [
      "Enforces earnings quality screen to filter out low-quality zombie firms",
      "Often outperforms non-screened small cap benchmarks over full cycles",
    ],
    tags: ["Small Cap", "Profitability Screened", "US Equity", "Quality"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-smallcap-600/",
  },
  {
    id: "sp-composite-1500",
    symbol: "SP1500",
    altSymbols: ["^SP1500"],
    name: "S&P Composite 1500 Index",
    providerId: "sp",
    category: "Broad Market Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 1500,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly",
    launchYear: 1995,
    trackingEtfs: [
      {
        ticker: "ITOT",
        name: "iShares Core S&P Total U.S. Stock Market ETF",
        aum: "$55B+",
      },
      {
        ticker: "SPTM",
        name: "SPDR Portfolio S&P 1500 Composite Stock Market ETF",
        aum: "$8B+",
      },
    ],
    summary:
      "Combines the S&P 500, S&P MidCap 400, and S&P SmallCap 600 into a unified benchmark covering ~90% of US equity market capitalization.",
    description:
      "The S&P Composite 1500 provides comprehensive coverage of the US market cap spectrum while preserving the profitability and quality filters enforced by the S&P Index Committee.",
    eligibilityCriteria: [
      "Consists of all constituents in the S&P 500, S&P MidCap 400, and S&P SmallCap 600",
    ],
    keyCharacteristics: [
      "Covers approximately 90% of US market capitalization",
      "Combines large, mid, and small caps into a seamless quality-screened total market solution",
    ],
    tags: ["Total Market", "All Cap", "Large+Mid+Small", "Core"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-composite-1500/",
  },
  {
    id: "sp-500-equal-weight",
    symbol: "SPXEW",
    altSymbols: ["^SP500EW"],
    name: "S&P 500 Equal Weight Index",
    providerId: "sp",
    category: "Smart Beta / Factor",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 503,
    weightingMethodology: "Equal Weighted (0.2% each at rebalance)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2003,
    trackingEtfs: [
      { ticker: "RSP", name: "Invesco S&P 500 Equal Weight ETF", aum: "$60B+" },
    ],
    summary:
      "An equal-weighted alternative to the market-cap S&P 500, giving each constituent identical weight (0.2%) to reduce concentration in top mega-cap tech stocks.",
    description:
      "The S&P 500 Equal Weight Index includes the same constituents as the market capitalization weighted S&P 500, but each company is allocated a fixed weight of 0.2% at quarterly rebalancing. This introduces systematic size and value factor tilts.",
    keyCharacteristics: [
      "Eliminates mega-cap single-stock concentration risk",
      "Inherent contrarian rebalance: trims winners and buys underperformers every quarter",
    ],
    tags: ["Equal Weight", "Smart Beta", "Size Factor", "Anti-Concentration"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-500-equal-weight-index/",
  },
  {
    id: "sp-500-dividend-aristocrats",
    symbol: "SPDAUDP",
    altSymbols: ["NOBL Index"],
    name: "S&P 500 Dividend Aristocrats Index",
    providerId: "sp",
    category: "Dividend & Quality",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 67,
    weightingMethodology: "Equally Weighted (with sector caps)",
    rebalanceFrequency:
      "Quarterly reweighting, Annual reconstitution (January)",
    launchYear: 2005,
    trackingEtfs: [
      {
        ticker: "NOBL",
        name: "ProShares S&P 500 Dividend Aristocrats ETF",
        aum: "$12B+",
      },
    ],
    summary:
      "Tracks high-quality S&P 500 companies that have consistently increased dividend payouts every single year for at least 25 consecutive years.",
    description:
      "The Dividend Aristocrats index focuses on companies with durable competitive moats, strong balance sheets, and resilient cash flow generation capable of maintaining 25+ years of uninterrupted dividend growth through various recessions and economic cycles.",
    eligibilityCriteria: [
      "Member of the S&P 500",
      "Minimum 25 consecutive years of dividend payout increases",
      "Minimum float-adjusted market cap of $3B and minimum 40 stocks in index",
    ],
    keyCharacteristics: [
      "Strict 25-year dividend growth barrier to entry",
      "Historically exhibits superior downside protection during market downturns",
    ],
    tags: ["Dividends", "Quality", "Aristocrats", "Income", "Defensive"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-500-dividend-aristocrats/",
  },
  {
    id: "cboe-vix",
    symbol: "VIX",
    altSymbols: ["^VIX", "Fear Gauge"],
    name: "Cboe Volatility Index (VIX)",
    providerId: "sp",
    category: "Volatility & Derivatives",
    assetClass: "Volatility",
    region: "United States",
    constituentsCount: "N/A (Option Chain)",
    weightingMethodology: "Variance Swap Formula on SPX Options",
    rebalanceFrequency: "Continuous Real-Time",
    launchYear: 1993,
    trackingEtfs: [
      {
        ticker: "VXX",
        name: "iPath Series B S&P 500 VIX Short-Term Futures ETN",
        aum: "$500M+",
      },
      {
        ticker: "UVXY",
        name: "ProShares Ultra VIX Short-Term Futures ETF",
        aum: "$400M+",
      },
    ],
    summary:
      "The global premier benchmark for 30-day expected US stock market volatility, calculated from S&P 500 (SPX) index options pricing.",
    description:
      "Created by Cboe and calculated using S&P 500 option prices, the VIX Index is often referred to as the market's 'fear gauge'. It measures market expectation of near-term volatility conveyed by S&P 500 stock index options.",
    keyCharacteristics: [
      "Inverse relationship to the S&P 500 during sharp market drawdowns",
      "Global barometer of investor sentiment and market stress",
    ],
    tags: ["Volatility", "Fear Gauge", "Options", "Derivatives", "Risk"],
    officialUrl: "https://www.cboe.com/tradable_products/vix/",
  },

  // ==========================================
  // FTSE RUSSELL
  // ==========================================
  {
    id: "russell-2000",
    symbol: "RUT",
    altSymbols: ["^RUT", "Russell 2K"],
    name: "Russell 2000 Index",
    providerId: "ftse",
    category: "Small-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 2000,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Annual Reconstitution (June)",
    launchYear: 1984,
    trackingEtfs: [
      { ticker: "IWM", name: "iShares Russell 2000 ETF", aum: "$68B+" },
      { ticker: "VTWO", name: "Vanguard Russell 2000 ETF", aum: "$11B+" },
      {
        ticker: "TNA",
        name: "Direxion Daily Small Cap Bull 3X Shares",
        aum: "$2B+",
      },
    ],
    summary:
      "The industry-defining benchmark for US small-cap equity funds, measuring the performance of the 2,000 smallest companies in the Russell 3000 Index.",
    description:
      "The Russell 2000 Index measures the performance of the small-cap segment of the US equity universe. It represents approximately 10% of the total market capitalization of the Russell 3000 Index and is the most widely quoted measure of small-cap company performance globally.",
    eligibilityCriteria: [
      "Companies ranked 1,001 through 3,000 by market capitalization in the annual Russell US Index reconstitution",
      "Must be incorporated in the US or designated as US-benefit entity",
      "Minimum trading price of $1.00 on rank day",
    ],
    keyCharacteristics: [
      "Purely rules-based market cap rank methodology with annual June Reconstitution",
      "The #1 institutional benchmark for small-cap active asset managers",
    ],
    tags: [
      "Small Cap",
      "US Equities",
      "Russell Reconstitution",
      "Institutional Benchmark",
    ],
    officialUrl: "https://www.ftserussell.com/products/indices/russell-us",
  },
  {
    id: "russell-1000",
    symbol: "RUI",
    altSymbols: ["^RUI", "Russell 1K"],
    name: "Russell 1000 Index",
    providerId: "ftse",
    category: "Large-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 1000,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Annual Reconstitution (June)",
    launchYear: 1984,
    trackingEtfs: [
      { ticker: "IWB", name: "iShares Russell 1000 ETF", aum: "$38B+" },
      { ticker: "VONE", name: "Vanguard Russell 1000 ETF", aum: "$5B+" },
    ],
    summary:
      "Captures the 1,000 largest publicly traded companies in the US equity universe, representing ~93% of the total US equity market value.",
    description:
      "The Russell 1000 Index is designed to represent the large-cap universe of the US equity market. It serves as the foundation for the prestigious Russell 1000 Growth and Russell 1000 Value style benchmarks.",
    keyCharacteristics: [
      "Represents approximately 93% of the investable US equity market",
      "Spans mega-cap and mid-cap equities with transparent ranking rules",
    ],
    tags: ["Large Cap", "US Core", "Foundation Index", "Style Benchmarks"],
    officialUrl: "https://www.ftserussell.com/products/indices/russell-us",
  },
  {
    id: "russell-1000-growth",
    symbol: "RLG",
    altSymbols: ["IWF Benchmark"],
    name: "Russell 1000 Growth Index",
    providerId: "ftse",
    category: "Growth Style",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 440,
    weightingMethodology: "Float-Adjusted Market Cap with Style Probability",
    rebalanceFrequency: "Annual Reconstitution (June)",
    launchYear: 1987,
    trackingEtfs: [
      { ticker: "IWF", name: "iShares Russell 1000 Growth ETF", aum: "$95B+" },
      {
        ticker: "VONG",
        name: "Vanguard Russell 1000 Growth ETF",
        aum: "$25B+",
      },
    ],
    summary:
      "The preeminent institutional benchmark for US large-cap growth managers, selecting stocks exhibiting higher price-to-book ratios and forecasted growth.",
    description:
      "Measures the performance of large-cap US equities that exhibit growth characteristics. Uses a multi-variable score based on I/B/E/S forecast long-term growth and historical sales growth.",
    keyCharacteristics: [
      "Industry standard benchmark for US growth mutual funds and asset managers",
      "Heavily weighted towards technology, consumer discretionary, and communication services",
    ],
    tags: ["Growth", "Large Cap", "Momentum", "Tech Heavy", "Style Benchmark"],
    officialUrl: "https://www.ftserussell.com/products/indices/russell-us",
  },
  {
    id: "russell-3000",
    symbol: "RUA",
    altSymbols: ["^RUA", "Russell 3K"],
    name: "Russell 3000 Index",
    providerId: "ftse",
    category: "Broad Market Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 3000,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Annual Reconstitution (June)",
    launchYear: 1984,
    trackingEtfs: [
      { ticker: "IWV", name: "iShares Russell 3000 ETF", aum: "$15B+" },
      { ticker: "VTHR", name: "Vanguard Russell 3000 ETF", aum: "$2B+" },
    ],
    summary:
      "Comprehensive measure of the entire US equity market, representing roughly 98% of investable domestic equity securities.",
    description:
      "The Russell 3000 Index combines the Russell 1000 and Russell 2000, providing an unbiased benchmark for the entire US equity opportunity set.",
    keyCharacteristics: [
      "Covers 98% of the investable US equity market",
      "Famous for the annual Russell Reconstitution in June, the highest volume trading day of the year",
    ],
    tags: ["Total Market", "US Equities", "Comprehensive", "Broad Market"],
    officialUrl: "https://www.ftserussell.com/products/indices/russell-us",
  },
  {
    id: "ftse-100",
    symbol: "UKX",
    altSymbols: ["^FTSE", "Footsie"],
    name: "FTSE 100 Index",
    providerId: "ftse",
    category: "Large-Cap Equity",
    assetClass: "Equity",
    region: "Europe",
    constituentsCount: 100,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1984,
    trackingEtfs: [
      { ticker: "ISF", name: "iShares Core FTSE 100 UCITS ETF", aum: "£14B+" },
      { ticker: "VUKE", name: "Vanguard FTSE 100 UCITS ETF", aum: "£4B+" },
    ],
    summary:
      "The marquee benchmark for the UK equity market, comprising the 100 largest capitalized blue-chip companies listed on the London Stock Exchange.",
    description:
      "The FTSE 100 is the leading benchmark for the UK stock market. Because many constituents are multinational energy, mining, financial, and healthcare corporations, a large majority of its revenue originates outside the UK.",
    keyCharacteristics: [
      "Heavy weighting in international revenue, global commodity producers, and financial services",
      "Primary barometer of the London Stock Exchange",
    ],
    tags: ["UK Equities", "Blue Chip", "London Stock Exchange", "Europe"],
    officialUrl: "https://www.ftserussell.com/products/indices/uk",
  },
  {
    id: "ftse-developed-all-cap",
    symbol: "FTDEDPU",
    altSymbols: ["FTSE Dev All Cap", "VEA Benchmark"],
    name: "FTSE Developed All Cap Index",
    providerId: "ftse",
    category: "International Equity",
    assetClass: "Equity",
    region: "Developed Markets",
    constituentsCount: 4000,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Semi-Annual (March, September)",
    launchYear: 2012,
    trackingEtfs: [
      {
        ticker: "VEA",
        name: "Vanguard FTSE Developed Markets ETF",
        aum: "$140B+",
      },
      { ticker: "SCHF", name: "Schwab International Equity ETF", aum: "$42B+" },
    ],
    summary:
      "Measures large, mid, and small-cap stocks across 25 developed market countries worldwide excluding the United States.",
    description:
      "Designed as a comprehensive benchmark for international developed market equity investing. It serves as the underlying index for some of the world's lowest-cost international index funds.",
    keyCharacteristics: [
      "Includes Canada and South Korea within developed markets classification",
      "Broad all-cap coverage across Europe, Japan, UK, Canada, Australia, and Asia-Pacific",
    ],
    tags: ["International", "Developed Markets", "Ex-US", "All Cap"],
    officialUrl: "https://www.ftserussell.com/products/indices/geis",
  },
  {
    id: "ftse-emerging-all-cap",
    symbol: "FTERM",
    altSymbols: ["VWO Benchmark"],
    name: "FTSE Emerging All Cap Index",
    providerId: "ftse",
    category: "Emerging Markets",
    assetClass: "Equity",
    region: "Emerging Markets",
    constituentsCount: 4500,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Semi-Annual",
    launchYear: 2015,
    trackingEtfs: [
      {
        ticker: "VWO",
        name: "Vanguard FTSE Emerging Markets ETF",
        aum: "$85B+",
      },
    ],
    summary:
      "Comprehensive benchmark for emerging market equities spanning 20+ countries, covering large, mid, and small-cap companies.",
    description:
      "Underlying index for Vanguard's flagship emerging markets ETF (VWO). Notably classifies South Korea as a Developed Market (unlike MSCI), resulting in higher relative allocations to China, India, Taiwan, and Brazil.",
    keyCharacteristics: [
      "Comprehensive small-cap exposure in emerging markets",
      "Excludes South Korea (classified as Developed by FTSE)",
    ],
    tags: ["Emerging Markets", "Global", "All Cap", "International"],
    officialUrl: "https://www.ftserussell.com/products/indices/geis",
  },
  {
    id: "ftse-global-all-cap",
    symbol: "GEIS",
    altSymbols: ["VT Benchmark"],
    name: "FTSE Global All Cap Index",
    providerId: "ftse",
    category: "Global All-Cap",
    assetClass: "Equity",
    region: "Global",
    constituentsCount: 10000,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Semi-Annual",
    launchYear: 2003,
    trackingEtfs: [
      { ticker: "VT", name: "Vanguard Total World Stock ETF", aum: "$45B+" },
    ],
    summary:
      "The definitive single-index coverage of world equities, tracking over 10,000 stocks across 49 Developed and Emerging countries.",
    description:
      "Part of the FTSE Global Equity Index Series (GEIS), this index captures 98% of the world's investable market capitalization across large, mid, and small-cap segments.",
    keyCharacteristics: [
      "Covers 98% of global investable equity market capitalization",
      "Ultimate one-stop global portfolio benchmark",
    ],
    tags: ["Global", "All World", "Total Market", "Complete Universe"],
    officialUrl: "https://www.ftserussell.com/products/indices/geis",
  },

  // ==========================================
  // MSCI
  // ==========================================
  {
    id: "msci-acwi",
    symbol: "MSCI-ACWI",
    altSymbols: ["ACWI", "MSCI AC World"],
    name: "MSCI ACWI (All Country World Index)",
    providerId: "msci",
    category: "Global Equity",
    assetClass: "Equity",
    region: "Global",
    constituentsCount: 2760,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly Index Reviews (Feb, May, Aug, Nov)",
    launchYear: 1990,
    trackingEtfs: [
      { ticker: "ACWI", name: "iShares MSCI ACWI ETF", aum: "$22B+" },
      {
        ticker: "SPGM",
        name: "SPDR Portfolio MSCI Global Stock Market ETF",
        aum: "$2.5B+",
      },
    ],
    summary:
      "MSCI's flagship global equity benchmark, capturing large and mid-cap representation across 23 Developed Markets and 24 Emerging Markets.",
    description:
      "The MSCI ACWI Index is the gold standard for global institutional equity benchmarking. It covers roughly 85% of the global investable equity opportunity set across 47 developed and emerging nations.",
    eligibilityCriteria: [
      "Companies from 23 Developed and 24 Emerging Markets",
      "Minimum free-float market capitalization and liquidity criteria",
      "Targets 85% free float-adjusted market capitalization in each market",
    ],
    keyCharacteristics: [
      "The standard institutional benchmark for global equity funds worldwide",
      "Classifies South Korea and Taiwan within Emerging Markets",
    ],
    tags: ["Global", "ACWI", "Institutional Standard", "Developed & Emerging"],
    officialUrl: "https://www.msci.com/our-solutions/indexes/acwi",
  },
  {
    id: "msci-world",
    symbol: "MSCI-WORLD",
    altSymbols: ["URTH Benchmark"],
    name: "MSCI World Index",
    providerId: "msci",
    category: "Developed Markets",
    assetClass: "Equity",
    region: "Developed Markets",
    constituentsCount: 1465,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly Index Reviews",
    launchYear: 1969,
    trackingEtfs: [
      { ticker: "URTH", name: "iShares MSCI World ETF", aum: "$4.5B+" },
      {
        ticker: "SWDA",
        name: "iShares Core MSCI World UCITS ETF",
        aum: "$75B+",
      },
    ],
    summary:
      "Captures large and mid-cap representation across 23 Developed Markets countries (including US, Japan, UK, France, Germany, Canada, Switzerland).",
    description:
      "With over 50 years of history, MSCI World is the foremost benchmark for developed equity markets. It covers approximately 85% of the free float-adjusted market capitalization in each developed country.",
    keyCharacteristics: [
      "US equities account for approximately 70% of index weight",
      "Excludes Emerging Markets entirely",
    ],
    tags: [
      "Developed World",
      "Ex-Emerging",
      "Global Standard",
      "Large & Mid Cap",
    ],
    officialUrl: "https://www.msci.com/our-solutions/indexes/world",
  },
  {
    id: "msci-eafe",
    symbol: "MSCI-EAFE",
    altSymbols: ["EFA Benchmark"],
    name: "MSCI EAFE Index",
    providerId: "msci",
    category: "International Developed",
    assetClass: "Equity",
    region: "Developed Markets",
    constituentsCount: 740,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly Index Reviews",
    launchYear: 1969,
    trackingEtfs: [
      { ticker: "EFA", name: "iShares MSCI EAFE ETF", aum: "$55B+" },
      { ticker: "IEFA", name: "iShares Core MSCI EAFE ETF", aum: "$120B+" },
    ],
    summary:
      "The oldest and most traditional international benchmark, covering Europe, Australasia, and the Far East while excluding the US and Canada.",
    description:
      "Formulated in 1969, MSCI EAFE was the first international equity index for US pension funds. It covers 21 developed markets across Europe, Japan, Australia, Hong Kong, and Singapore.",
    keyCharacteristics: [
      "Excludes North America (both United States and Canada)",
      "Japan and the United Kingdom represent the two largest country weights",
    ],
    tags: ["EAFE", "International", "Ex-US", "Developed Markets", "Historic"],
    officialUrl: "https://www.msci.com/our-solutions/indexes/eafe",
  },
  {
    id: "msci-emerging-markets",
    symbol: "MSCI-EM",
    altSymbols: ["EEM Benchmark"],
    name: "MSCI Emerging Markets Index",
    providerId: "msci",
    category: "Emerging Markets",
    assetClass: "Equity",
    region: "Emerging Markets",
    constituentsCount: 1330,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly Index Reviews",
    launchYear: 1988,
    trackingEtfs: [
      {
        ticker: "EEM",
        name: "iShares MSCI Emerging Markets ETF",
        aum: "$18B+",
      },
      {
        ticker: "IEMG",
        name: "iShares Core MSCI Emerging Markets ETF",
        aum: "$82B+",
      },
    ],
    summary:
      "The primary global institutional gauge for emerging market equities across 24 developing economies.",
    description:
      "Launched in 1988 with 10 countries representing less than 1% of world market cap, MSCI EM now spans 24 countries with heavy weights in China, India, Taiwan, South Korea, and Brazil.",
    keyCharacteristics: [
      "Includes South Korea (classified as Emerging by MSCI)",
      "High exposure to semiconductor leaders (TSMC, Samsung) and Indian growth equities",
    ],
    tags: [
      "Emerging Markets",
      "Asia Heavy",
      "High Growth",
      "Institutional Benchmark",
    ],
    officialUrl: "https://www.msci.com/our-solutions/indexes/emerging-markets",
  },
  {
    id: "msci-usa-esg-leaders",
    symbol: "MSCI-USA-ESG",
    altSymbols: ["SUSL Benchmark"],
    name: "MSCI USA ESG Leaders Index",
    providerId: "msci",
    category: "ESG & Sustainability",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 290,
    weightingMethodology: "Best-in-Class ESG Sector-Neutral Market Cap",
    rebalanceFrequency: "Quarterly",
    launchYear: 2019,
    trackingEtfs: [
      { ticker: "SUSL", name: "iShares ESG MSCI USA Leaders ETF", aum: "$1B+" },
    ],
    summary:
      "Selects companies from the MSCI USA Index with the highest Environmental, Social, and Governance (ESG) ratings relative to sector peers.",
    description:
      "The index targets 50% sector representation by market cap, selecting companies with superior ESG ratings while excluding alcohol, tobacco, weapons, thermal coal, and controversial practices.",
    tags: ["ESG", "Sustainability", "Factor", "Responsible Investing"],
    officialUrl: "https://www.msci.com/our-solutions/indexes/esg-leaders",
  },

  // ==========================================
  // NASDAQ
  // ==========================================
  {
    id: "nasdaq-100",
    symbol: "NDX",
    altSymbols: ["^NDX", "QQQ Benchmark"],
    name: "Nasdaq-100 Index",
    providerId: "nasdaq",
    category: "Large-Cap Tech & Innovation",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 101,
    weightingMethodology: "Modified Market Capitalization",
    rebalanceFrequency:
      "Quarterly reweighting, Annual reconstitution (December)",
    launchYear: 1985,
    trackingEtfs: [
      { ticker: "QQQ", name: "Invesco QQQ Trust", aum: "$300B+" },
      { ticker: "QQQM", name: "Invesco NASDAQ 100 ETF", aum: "$35B+" },
      {
        ticker: "TQQQ",
        name: "ProShares UltraPro QQQ (3x Leveraged)",
        aum: "$25B+",
      },
      {
        ticker: "SQQQ",
        name: "ProShares UltraPro Short QQQ (-3x)",
        aum: "$4B+",
      },
    ],
    summary:
      "Includes 100 of the largest non-financial companies listed on the Nasdaq Stock Market, defining global innovation and technology leadership.",
    description:
      "The Nasdaq-100 is one of the world's most prominent large-cap growth indexes. It includes companies across major industry groups including technology, communications, consumer discretionary, healthcare, and industrials, while explicitly excluding commercial banks and financial institutions.",
    eligibilityCriteria: [
      "Must be listed exclusively on the Nasdaq Stock Market",
      "Must be a non-financial company (ICB Industry code other than Financials)",
      "Minimum average daily trading volume of 200,000 shares",
    ],
    keyCharacteristics: [
      "Excludes financial institutions entirely",
      "Home to the world's largest mega-cap tech innovators (Apple, Microsoft, NVIDIA, Amazon, Alphabet, Meta)",
      "One of the highest-performing major equity benchmarks of the past 2 decades",
    ],
    tags: ["Tech", "Mega Cap", "Innovation", "QQQ", "Growth"],
    officialUrl: "https://www.nasdaq.com/solutions/nasdaq-100",
  },
  {
    id: "nasdaq-composite",
    symbol: "IXIC",
    altSymbols: ["^IXIC", "Nasdaq Comp"],
    name: "Nasdaq Composite Index",
    providerId: "nasdaq",
    category: "Broad Market Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 3400,
    weightingMethodology: "Market Capitalization Weighted",
    rebalanceFrequency: "Continuous Additions / Deletions",
    launchYear: 1971,
    trackingEtfs: [
      {
        ticker: "ONEQ",
        name: "Fidelity Nasdaq Composite Index ETF",
        aum: "$6B+",
      },
    ],
    summary:
      "The broad-market index encompassing almost all common stocks and ADRs listed on the Nasdaq Stock Market (over 3,400 securities).",
    description:
      "Created in 1971 alongside the founding of the Nasdaq electronic stock market, the Nasdaq Composite is heavily weighted toward high-growth technology, biotechnology, and consumer services.",
    keyCharacteristics: [
      "Includes domestic and international companies listed on Nasdaq",
      "One of the three most watched US stock market indices alongside S&P 500 and DJIA",
    ],
    tags: ["Broad Market", "Nasdaq Listed", "Tech Heavy", "All Cap"],
    officialUrl: "https://www.nasdaq.com/solutions/nasdaq-composite-index",
  },
  {
    id: "phlx-semiconductor",
    symbol: "SOX",
    altSymbols: ["^SOX", "SOXX Benchmark"],
    name: "PHLX Semiconductor Sector Index",
    providerId: "nasdaq",
    category: "Semiconductors & Hardware",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 30,
    weightingMethodology: "Modified Market Capitalization (8% Top Cap)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1993,
    trackingEtfs: [
      { ticker: "SOXX", name: "iShares Semiconductor ETF", aum: "$15B+" },
      {
        ticker: "SOXL",
        name: "Direxion Daily Semiconductor Bull 3X",
        aum: "$10B+",
      },
    ],
    summary:
      "The worldwide premier benchmark for the semiconductor industry, tracking 30 leaders in chip design, manufacturing, distribution, and equipment.",
    description:
      "Created by the Philadelphia Stock Exchange (PHLX) and managed by Nasdaq, SOX tracks companies involved in the design, distribution, manufacture, and sale of semiconductors.",
    keyCharacteristics: [
      "The definitive barometer for artificial intelligence chips, GPUs, and hardware infrastructure",
      "Features NVIDIA, TSMC (ADR), Broadcom, Qualcomm, ASML, AMD, and Intel",
    ],
    tags: ["Semiconductors", "Chips", "AI Hardware", "Sector Leader"],
    officialUrl:
      "https://www.nasdaq.com/solutions/phlx-semiconductor-sector-index",
  },
  {
    id: "nasdaq-next-gen-100",
    symbol: "NGX",
    altSymbols: ["QQQJ Benchmark"],
    name: "Nasdaq Next Generation 100 Index",
    providerId: "nasdaq",
    category: "Mid-Cap Growth",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 100,
    weightingMethodology: "Modified Market Capitalization",
    rebalanceFrequency: "Annual Reconstitution (December)",
    launchYear: 2020,
    trackingEtfs: [
      {
        ticker: "QQQJ",
        name: "Invesco NASDAQ Next Gen 100 ETF",
        aum: "$800M+",
      },
    ],
    summary:
      "Tracks the next 100 largest non-financial companies listed on Nasdaq after the top 100 of the Nasdaq-100.",
    description:
      "The 'farm team' for the Nasdaq-100, highlighting the mid-cap disruptors and future large-cap tech titans positioned for next-stage growth.",
    tags: ["Mid Cap", "Tech Growth", "Disruption", "Next Gen"],
    officialUrl:
      "https://www.nasdaq.com/solutions/nasdaq-next-generation-100-index",
  },
  {
    id: "nasdaq-cybersecurity",
    symbol: "NQCYBR",
    altSymbols: ["CBR", "HACK / BUG Benchmark"],
    name: "Nasdaq CTA Cybersecurity Index",
    providerId: "nasdaq",
    category: "Cybersecurity & Software",
    assetClass: "Equity",
    region: "Global",
    constituentsCount: 38,
    weightingMethodology: "Modified Liquidity Weighting",
    rebalanceFrequency: "Semi-Annual (March, September)",
    launchYear: 2015,
    trackingEtfs: [
      { ticker: "BUG", name: "Global X Cybersecurity ETF", aum: "$800M+" },
      {
        ticker: "CIBR",
        name: "First Trust NASDAQ Cybersecurity ETF",
        aum: "$6B+",
      },
    ],
    summary:
      "Tracks global cybersecurity software and hardware providers protecting infrastructure, clouds, networks, and enterprise data.",
    description:
      "Formulated in partnership with the Consumer Technology Association (CTA), this index targets companies building firewall protection, endpoint security, and cloud threat intelligence.",
    tags: ["Cybersecurity", "Cloud Security", "Thematic", "Software"],
    officialUrl:
      "https://www.nasdaq.com/solutions/nasdaq-cta-cybersecurity-index",
  },

  // ==========================================
  // CRSP
  // ==========================================
  {
    id: "crsp-us-total-market",
    symbol: "CRSPTMT",
    altSymbols: ["VTI Benchmark"],
    name: "CRSP US Total Market Index",
    providerId: "crsp",
    category: "Total Market Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 3700,
    weightingMethodology: "Float-Adjusted Market Cap with Packeting",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2011,
    trackingEtfs: [
      {
        ticker: "VTI",
        name: "Vanguard Total Stock Market ETF",
        aum: "$420B+ (ETF) / $1.6T (Fund)",
      },
      {
        ticker: "VTSAX",
        name: "Vanguard Total Stock Market Index Admiral Fund",
        aum: "$1.6T Total",
      },
    ],
    summary:
      "Captures 100% of the investable US equity universe across mega, large, mid, small, and micro caps. The official benchmark for Vanguard VTI.",
    description:
      "The CRSP US Total Market Index is the benchmark for the largest investment fund on the planet. Built on six decades of University of Chicago empirical research, it provides nearly complete coverage of the US stock market with innovative 'packeting' rules that suppress turnover and eliminate capital gains friction.",
    eligibilityCriteria: [
      "US common stock listed on NYSE, NYSE American, NASDAQ, or Cboe",
      "Covers approximately 100% of the investable US equity market capitalization",
    ],
    keyCharacteristics: [
      "Benchmark for Vanguard's iconic $1.6+ Trillion Total Stock Market Fund (VTI / VTSAX)",
      "CRSP 'Packeting' technology splits moving securities 50/50 across rebalances to eliminate turnover whipsawing",
      "Unrivaled historical academic database connection dating back to 1926",
    ],
    tags: [
      "Total Market",
      "VTI Benchmark",
      "Packeting",
      "Zero-Drag",
      "Vanguard",
    ],
    officialUrl: "https://www.crsp.org/indexes-pages/crsp-us-market-indexes/",
  },
  {
    id: "crsp-us-large-cap",
    symbol: "CRSPLC1",
    altSymbols: ["VV Benchmark"],
    name: "CRSP US Large Cap Index",
    providerId: "crsp",
    category: "Large-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 500,
    weightingMethodology: "Float-Adjusted Market Cap with Banding",
    rebalanceFrequency: "Quarterly",
    launchYear: 2011,
    trackingEtfs: [
      { ticker: "VV", name: "Vanguard Large-Cap ETF", aum: "$45B+" },
      {
        ticker: "VLCAX",
        name: "Vanguard Large-Cap Index Admiral",
        aum: "$55B+",
      },
    ],
    summary:
      "Represents the largest 85% of the US market cap using cumulative capitalization breakpoints rather than fixed constituent counts.",
    description:
      "Instead of an arbitrary round number of stocks, CRSP targets the top 85% cumulative market capitalization of the US market. Banding and packeting smooth transitions between large and mid-cap classifications.",
    keyCharacteristics: [
      "Targets the top 85% cumulative market cap of investable US companies",
      "Serves as the parent index for CRSP US Large Cap Growth and Value",
    ],
    tags: ["Large Cap", "Vanguard VV", "Cumulative Cap", "Low Turnover"],
    officialUrl: "https://www.crsp.org/indexes-pages/crsp-us-market-indexes/",
  },
  {
    id: "crsp-us-large-cap-growth",
    symbol: "CRSPLCG",
    altSymbols: ["VUG Benchmark"],
    name: "CRSP US Large Cap Growth Index",
    providerId: "crsp",
    category: "Growth Style",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 205,
    weightingMethodology: "Multi-Factor Style Assignment with Packeting",
    rebalanceFrequency: "Quarterly",
    launchYear: 2011,
    trackingEtfs: [
      { ticker: "VUG", name: "Vanguard Growth ETF", aum: "$140B+" },
      {
        ticker: "VIGAX",
        name: "Vanguard Growth Index Admiral Fund",
        aum: "$250B+",
      },
    ],
    summary:
      "Multi-factor growth style ranking for US large-cap stocks. Benchmark for the $250B+ Vanguard Growth Fund (VUG / VIGAX).",
    description:
      "CRSP evaluates growth using a comprehensive 6-factor model: future long-term EPS growth, future short-term EPS growth, historical 3-year EPS growth, historical 3-year sales growth, current investment-to-assets ratio, and return on assets.",
    keyCharacteristics: [
      "Underlying benchmark for Vanguard Growth ETF (VUG)",
      "Multi-factor score determines fractional style assignments without abrupt full-stock reallocations",
    ],
    tags: ["Growth", "Large Cap", "VUG Benchmark", "Multi-Factor", "Vanguard"],
    officialUrl: "https://www.crsp.org/indexes-pages/crsp-us-market-indexes/",
  },
  {
    id: "crsp-us-large-cap-value",
    symbol: "CRSPLCV",
    altSymbols: ["VTV Benchmark"],
    name: "CRSP US Large Cap Value Index",
    providerId: "crsp",
    category: "Value Style",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 340,
    weightingMethodology: "Multi-Factor Value Assignment with Packeting",
    rebalanceFrequency: "Quarterly",
    launchYear: 2011,
    trackingEtfs: [
      { ticker: "VTV", name: "Vanguard Value ETF", aum: "$120B+" },
      {
        ticker: "VVIAX",
        name: "Vanguard Value Index Admiral Fund",
        aum: "$180B+",
      },
    ],
    summary:
      "Multi-factor value style ranking for US large-cap equities. Benchmark for Vanguard Value ETF (VTV / VVIAX).",
    description:
      "CRSP determines value ranking using 5 core metrics: book-to-price, future earnings-to-price, historical earnings-to-price, sales-to-price, and dividend yield.",
    keyCharacteristics: [
      "Underlying benchmark for Vanguard Value ETF (VTV)",
      "High concentration in financials, healthcare, industrials, and energy",
    ],
    tags: ["Value", "Large Cap", "VTV Benchmark", "Multi-Factor", "Dividends"],
    officialUrl: "https://www.crsp.org/indexes-pages/crsp-us-market-indexes/",
  },
  {
    id: "crsp-us-mid-cap",
    symbol: "CRSPMC1",
    altSymbols: ["VO Benchmark"],
    name: "CRSP US Mid Cap Index",
    providerId: "crsp",
    category: "Mid-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 320,
    weightingMethodology: "Float-Adjusted Market Cap with Banding",
    rebalanceFrequency: "Quarterly",
    launchYear: 2011,
    trackingEtfs: [
      { ticker: "VO", name: "Vanguard Mid-Cap ETF", aum: "$65B+" },
      {
        ticker: "VIMAX",
        name: "Vanguard Mid-Cap Index Admiral Fund",
        aum: "$170B+",
      },
    ],
    summary:
      "Targets the 70%-85% cumulative capitalization spectrum of the US equity market. Benchmark for Vanguard Mid-Cap (VO / VIMAX).",
    description:
      "Captures the mid-cap tier of the US equity market, defining constituents between the 70th and 85th percentiles of cumulative market capitalization.",
    tags: ["Mid Cap", "VO Benchmark", "Vanguard", "Core US"],
    officialUrl: "https://www.crsp.org/indexes-pages/crsp-us-market-indexes/",
  },
  {
    id: "crsp-us-small-cap",
    symbol: "CRSPSC1",
    altSymbols: ["VB Benchmark"],
    name: "CRSP US Small Cap Index",
    providerId: "crsp",
    category: "Small-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 1400,
    weightingMethodology: "Float-Adjusted Market Cap with Banding",
    rebalanceFrequency: "Quarterly",
    launchYear: 2011,
    trackingEtfs: [
      { ticker: "VB", name: "Vanguard Small-Cap ETF", aum: "$55B+" },
      {
        ticker: "VSMAX",
        name: "Vanguard Small-Cap Index Admiral Fund",
        aum: "$140B+",
      },
    ],
    summary:
      "Targets the 85%-98% cumulative capitalization spectrum of the US market. Benchmark for Vanguard Small-Cap (VB / VSMAX).",
    description:
      "The CRSP US Small Cap Index targets companies between the 85th and 98th percentiles of cumulative US market capitalization, covering over 1,400 small-cap stocks.",
    tags: ["Small Cap", "VB Benchmark", "Vanguard", "Small-Cap US"],
    officialUrl: "https://www.crsp.org/indexes-pages/crsp-us-market-indexes/",
  },
];
