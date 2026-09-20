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
      { ticker: "SPY", name: "SPDR S&P 500 ETF Trust", aum: "$815B+" },
      { ticker: "VOO", name: "Vanguard S&P 500 ETF", aum: "$1.05T+" },
      { ticker: "IVV", name: "iShares Core S&P 500 ETF", aum: "$887B+" },
      {
        ticker: "SPYM",
        name: "State Street SPDR Portfolio S&P 500 ETF (formerly SPLG)",
        aum: "$157B+",
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
      { ticker: "IJH", name: "iShares Core S&P Mid-Cap ETF", aum: "$126B+" },
      { ticker: "MDY", name: "SPDR S&P MidCap 400 ETF Trust", aum: "$26B+" },
      { ticker: "IVOO", name: "Vanguard S&P Mid-Cap 400 ETF", aum: "$4B+" },
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
      { ticker: "IJR", name: "iShares Core S&P Small-Cap ETF", aum: "$110B+" },
      {
        ticker: "SPSM",
        name: "SPDR Portfolio S&P 600 Small Cap ETF",
        aum: "$12B+",
      },
      { ticker: "VIOO", name: "Vanguard S&P Small-Cap 600 ETF", aum: "$4.2B+" },
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
        ticker: "SPTM",
        name: "SPDR Portfolio S&P 1500 Composite Stock Market ETF",
        aum: "$14B+",
      },
    ],
    summary:
      "Combines the S&P 500, S&P MidCap 400, and S&P SmallCap 600 into a unified benchmark covering ~90% of US equity market capitalization.",
    description:
      "The S&P Composite 1500 provides comprehensive coverage of the US market cap spectrum while preserving the profitability and quality filters enforced by the S&P Index Committee. It is tracked by the $14B+ SPDR Portfolio S&P 1500 Composite Stock Market ETF (SPTM). Note: iShares Core S&P Total U.S. Stock Market ETF (ITOT) originally tracked this index from 2004 to December 2015 before transitioning to the broader all-cap S&P Total Market Index.",
    eligibilityCriteria: [
      "Consists of all constituents in the S&P 500, S&P MidCap 400, and S&P SmallCap 600",
    ],
    keyCharacteristics: [
      "Covers approximately 90% of US market capitalization across large, mid, and small caps",
      "Enforces S&P Index Committee profitability and earnings quality screens",
      "Primary tracking ETF is State Street's SPDR Portfolio S&P 1500 ETF (SPTM)",
    ],
    tags: ["Total Market", "All Cap", "Large+Mid+Small", "SPTM", "Core"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-composite-1500/",
  },
  {
    id: "sp-total-market",
    symbol: "SPTMI",
    altSymbols: ["SPTRC", "S&P TMI", "ITOT Benchmark"],
    name: "S&P Total Market Index (TMI)",
    providerId: "sp",
    category: "Broad Market Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 3850,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2005,
    trackingEtfs: [
      {
        ticker: "ITOT",
        name: "iShares Core S&P Total U.S. Stock Market ETF",
        aum: "$97B+",
      },
    ],
    summary:
      "Comprehensive benchmark tracking the entire investable universe of US common equities, spanning large, mid, small, and micro caps.",
    description:
      "The S&P Total Market Index is designed to track the broad U.S. equity market, including large-, mid-, small-, and micro-cap stocks listed on major U.S. exchanges. It encompasses approximately 3,850+ common stocks, serving as the official benchmark for the $97B+ iShares Core S&P Total U.S. Stock Market ETF (ITOT).",
    eligibilityCriteria: [
      "US company domiciled with primary listing on NYSE, NASDAQ, or Cboe",
      "Investable universe encompasses all eligible US common stocks",
      "Public float of at least 10% and sufficient trading liquidity",
    ],
    keyCharacteristics: [
      "Encompasses ~3,850+ investable US equities across the entire market-cap spectrum",
      "Includes micro-cap universe (~2,350 additional stocks) beyond the S&P Composite 1500",
      "Official underlying benchmark for iShares Core S&P Total U.S. Stock Market ETF (ITOT)",
    ],
    tags: [
      "Total Market",
      "All Cap",
      "Broad Market",
      "ITOT",
      "Core US",
      "Micro Cap",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-total-market-index/",
  },
  {
    id: "dow-jones-us-broad-market",
    symbol: "DJUSBM",
    altSymbols: [
      "DW4900",
      "DJ Broad Market",
      "SCHB Benchmark",
      "Dow Jones Broad",
    ],
    name: "Dow Jones U.S. Broad Stock Market Index",
    providerId: "sp",
    category: "Broad Market Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 2500,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1999,
    trackingEtfs: [
      {
        ticker: "SCHB",
        name: "Schwab U.S. Broad Market ETF",
        aum: "$44B+",
      },
    ],
    summary:
      "Measures the performance of the largest ~2,500 US companies by market capitalization, representing approximately 95% of the investable US equity universe.",
    description:
      "The Dow Jones U.S. Broad Stock Market Index is a subset of the Dow Jones U.S. Total Stock Market Index. It includes the 2,500 largest US equity securities by float-adjusted market cap, capturing large-, mid-, and small-cap exposure with ultra-low portfolio turnover. It is the underlying benchmark for the $44B+ Schwab U.S. Broad Market ETF (SCHB).",
    eligibilityCriteria: [
      "US companies listed on major US exchanges",
      "Ranked among top 2,500 by float-adjusted market capitalization",
      "Minimum liquidity and public float requirements",
    ],
    keyCharacteristics: [
      "Tracks the top 2,500 US equities representing ~95% of market capitalization",
      "Primary benchmark underlying the Schwab U.S. Broad Market ETF (SCHB)",
      "Foundation for Dow Jones U.S. Select Sector and specialty indices",
    ],
    tags: [
      "Broad Market",
      "Total Market",
      "Schwab",
      "SCHB",
      "Large+Mid+Small",
      "Core",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/dow-jones-us-broad-stock-market-index/",
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
      {
        ticker: "RSP",
        name: "Invesco S&P 500 Equal Weight ETF",
        aum: "$101B+",
      },
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
    id: "dow-jones-us-dividend-100",
    symbol: "DJUSDIV",
    altSymbols: ["DJUSD", "SCHD Benchmark", "DJUS100"],
    name: "Dow Jones U.S. Dividend 100 Index",
    providerId: "sp",
    category: "Dividend & Quality",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 100,
    weightingMethodology:
      "Modified Market Capitalization (4% stock cap, 25% sector cap)",
    rebalanceFrequency: "Annual Reconstitution (March), Quarterly Reweighting",
    launchYear: 2011,
    trackingEtfs: [
      {
        ticker: "SCHD",
        name: "Schwab U.S. Dividend Equity ETF",
        aum: "$112B+",
      },
    ],
    summary:
      "Measures 100 high-yielding US dividend-paying equities screened for fundamental financial strength and long-term dividend growth. The benchmark for Schwab SCHD.",
    description:
      "The Dow Jones U.S. Dividend 100 Index selects 100 top US dividend-paying companies from the Dow Jones U.S. Broad Market Index (excluding REITs). Candidates must have a minimum of 10 consecutive years of dividend payments. Eligible stocks are ranked by an equal-weighted composite score of 4 fundamentals: cash flow-to-total debt, return on equity (ROE), indicated dividend yield, and 5-year dividend growth rate.",
    eligibilityCriteria: [
      "Minimum 10 consecutive years of dividend payouts",
      "Minimum float-adjusted market capitalization of $500M and 3-month ADTV of $2M",
      "Excludes Real Estate Investment Trusts (REITs)",
      "Ranked by 4 fundamental criteria: Cash Flow-to-Total Debt, Return on Equity (ROE), Indicated Dividend Yield, and 5-Year Dividend Growth Rate",
    ],
    keyCharacteristics: [
      "Underlying benchmark for the popular Schwab U.S. Dividend Equity ETF (SCHD)",
      "Strict constituent diversification: 4.0% maximum individual stock weight, 25.0% maximum sector weight",
      "Widely acclaimed for balancing durable high current yield, dividend growth, and downside protection",
    ],
    tags: [
      "Dividends",
      "SCHD",
      "Quality",
      "Dividend Growth",
      "Cash Flow",
      "S&P DJI",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/dow-jones-us-dividend-100-index/",
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
  {
    id: "sp-500-growth",
    symbol: "SP500G",
    altSymbols: [
      "^SP500G",
      "SGX",
      "S&P 500 Growth",
      "SPYG Benchmark",
      "VOOG Benchmark",
    ],
    name: "S&P 500 Growth Index",
    providerId: "sp",
    category: "Large-Cap Growth Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 230,
    weightingMethodology: "Float-Adjusted Market Cap (Growth Factor Weighted)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1995,
    trackingEtfs: [
      {
        ticker: "SPYG",
        name: "SPDR Portfolio S&P 500 Growth ETF",
        aum: "$53.8B+",
      },
      {
        ticker: "VOOG",
        name: "Vanguard S&P 500 Growth ETF",
        aum: "$26.7B+",
      },
      {
        ticker: "IVW",
        name: "iShares S&P 500 Growth ETF",
        aum: "$58B+",
      },
    ],
    summary:
      "Measures the performance of the growth style segment of the S&P 500 based on sales growth, earnings momentum, and price momentum.",
    description:
      "The S&P 500 Growth Index includes constituents from the S&P 500 displaying the strongest growth characteristics. Growth factor scores are calculated using three-year net change in earnings per share over price per share, three-year sales per share growth rate, and 12-month momentum.",
    eligibilityCriteria: [
      "Must be a constituent of the parent S&P 500 Index",
      "Ranked in the top growth tier based on sales growth, earnings growth, and momentum factors",
      "Companies with balanced growth and value attributes may have their market cap split between S&P 500 Growth and Value",
    ],
    keyCharacteristics: [
      "Heavily weighted in leading technology, consumer discretionary, and communication services giants",
      "Benchmark for major low-cost growth ETFs including SPYG and VOOG",
      "Disciplined multi-factor screening prevents pure single-metric style bias",
    ],
    tags: [
      "Large Cap",
      "Growth",
      "S&P 500",
      "SPYG",
      "VOOG",
      "Tech Giants",
      "Style",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-500-growth/",
  },
  {
    id: "dow-jones-us-large-cap-growth",
    symbol: "DJUSGL",
    altSymbols: ["DJUSG", "SCHG Benchmark", "Dow Jones Large Cap Growth"],
    name: "Dow Jones U.S. Large-Cap Growth Total Stock Market Index",
    providerId: "sp",
    category: "Large-Cap Growth Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 240,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2001,
    trackingEtfs: [
      {
        ticker: "SCHG",
        name: "Schwab U.S. Large-Cap Growth ETF",
        aum: "$62.0B+",
      },
    ],
    summary:
      "Tracks large-cap US growth equities drawn from the top 750 US companies, weighted by float-adjusted market capitalization.",
    description:
      "The Dow Jones U.S. Large-Cap Growth Total Stock Market Index selects companies from the 750 largest US stocks based on six fundamental growth metrics: projected P/E, price-to-book, dividend yield, historical sales and earnings growth. It serves as the underlying benchmark for the $62B+ Schwab U.S. Large-Cap Growth ETF (SCHG).",
    eligibilityCriteria: [
      "Drawn from the 750 largest US companies in the Dow Jones U.S. Total Stock Market Index",
      "Multi-factor growth ranking combining forward and trailing fundamentals",
      "Float-adjusted market capitalization weighting with minimum liquidity hurdles",
    ],
    keyCharacteristics: [
      "Primary benchmark underlying the popular Schwab U.S. Large-Cap Growth ETF (SCHG)",
      "High concentration in modern technology and mega-cap digital leaders",
      "Cost-efficient index construction designed for minimal tracking error and low turnover",
    ],
    tags: ["Large Cap", "Growth", "Schwab", "SCHG", "Momentum", "Style"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/dow-jones-us-large-cap-growth-total-stock-market-index/",
  },
  {
    id: "sp-500-value",
    symbol: "SP500V",
    altSymbols: ["^SP500V", "SVX", "S&P 500 Value", "SPYV Benchmark"],
    name: "S&P 500 Value Index",
    providerId: "sp",
    category: "Large-Cap Value Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 400,
    weightingMethodology: "Float-Adjusted Market Cap (Value Factor Weighted)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1995,
    trackingEtfs: [
      {
        ticker: "SPYV",
        name: "SPDR Portfolio S&P 500 Value ETF",
        aum: "$36.2B+",
      },
      {
        ticker: "VOOV",
        name: "Vanguard S&P 500 Value ETF",
        aum: "$6.2B+",
      },
      {
        ticker: "IVE",
        name: "iShares S&P 500 Value ETF",
        aum: "$33.5B+",
      },
    ],
    summary:
      "Measures the value segment of the S&P 500 based on book value to price, cash flow to price, and sales to price ratios.",
    description:
      "The S&P 500 Value Index captures the performance of large-cap US companies showing value style traits, identified via three fundamental metrics: book value-to-price, earnings-to-price, and sales-to-price ratios. It underlies major value ETFs including SPYV and VOOV.",
    eligibilityCriteria: [
      "Must be a constituent of the parent S&P 500 Index",
      "Ranked in the value style tier based on book value to price, earnings to price, and sales to price",
      "Constituents with blended characteristics have weight apportioned between Growth and Value",
    ],
    keyCharacteristics: [
      "Emphasis on financial services, healthcare, industrials, and energy sectors",
      "Offers higher dividend yield and lower valuation multiples than the core S&P 500",
      "Tracks over $75B+ in aggregate ETF assets across SPYV, VOOV, and IVE",
    ],
    tags: ["Large Cap", "Value", "S&P 500", "SPYV", "Dividends", "Style"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-500-value/",
  },
  {
    id: "sp-500-momentum",
    symbol: "SP500MO",
    altSymbols: ["SPAMO", "SPMO Benchmark", "S&P 500 Momentum"],
    name: "S&P 500 Momentum Index",
    providerId: "sp",
    category: "Factor / Momentum Large-Cap Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 100,
    weightingMethodology:
      "Momentum Score-Weighted Float-Adjusted Market Cap (5% Cap)",
    rebalanceFrequency: "Semi-Annually (March and September)",
    launchYear: 2014,
    trackingEtfs: [
      {
        ticker: "SPMO",
        name: "Invesco S&P 500 Momentum ETF",
        aum: "$22.1B+",
      },
    ],
    summary:
      "Tracks the top 100 stocks in the S&P 500 exhibiting the highest risk-adjusted price momentum over the trailing 12 months.",
    description:
      "The S&P 500 Momentum Index identifies companies in the S&P 500 that have demonstrated persistent upward price performance. Constituents are selected by evaluating 12-month trailing price momentum adjusted for volatility, with individual security weights capped at 5%. Underlying benchmark for the $22B+ Invesco S&P 500 Momentum ETF (SPMO).",
    eligibilityCriteria: [
      "Constituent of the S&P 500 Index",
      "Calculated momentum score using 12-month trailing price performance divided by daily volatility",
      "Top 100 securities with highest momentum scores are selected",
      "Individual constituent weights capped at 5%",
    ],
    keyCharacteristics: [
      "One of the most popular and highest-performing factor strategies in institutional finance",
      "Underlying benchmark for SPMO with over $22B in assets under management",
      "Dynamically rotates into market-leading leaders while dampening excess volatility",
    ],
    tags: ["Momentum", "Factor", "Smart Beta", "SPMO", "S&P 500", "Top 100"],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-500-momentum-index/",
  },
  {
    id: "sp-technology-select-sector",
    symbol: "IXT",
    altSymbols: ["XLK", "^IXT", "Technology Select Sector", "XLK Benchmark"],
    name: "Technology Select Sector Index",
    providerId: "sp",
    category: "Technology Sector Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 65,
    weightingMethodology: "Modified Market Cap (Capped at 23% / 4.8%)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1998,
    trackingEtfs: [
      {
        ticker: "XLK",
        name: "Technology Select Sector SPDR Fund",
        aum: "$119.4B+",
      },
    ],
    summary:
      "The premier US technology sector benchmark, tracking IT companies within the S&P 500 including software, semiconductors, and hardware leaders.",
    description:
      "The Technology Select Sector Index includes companies from the S&P 500 classified under the Information Technology sector by GICS. It is modified market-cap weighted to meet IRS diversification rules (max single stock weight 23%, and sum of weights over 4.8% capped at 50%). It is the underlying benchmark for the $119B+ Technology Select Sector SPDR Fund (XLK).",
    eligibilityCriteria: [
      "Must be an existing constituent of the S&P 500 Index",
      "Classified in the Information Technology Sector under GICS",
      "Quarterly rebalancing with capped weighting (max single stock 23%, cumulative >4.8% capped at 50%)",
    ],
    keyCharacteristics: [
      "The benchmark for the largest technology sector ETF on Earth (XLK, $119B+ AUM)",
      "High exposure to semiconductor, enterprise software, and cloud infrastructure titans",
      "Strict capping rules manage single-stock concentration between Microsoft, Apple, and Nvidia",
    ],
    tags: [
      "Technology",
      "XLK",
      "Sector",
      "S&P 500",
      "Semiconductors",
      "Software",
      "GICS IT",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/technology-select-sector-index/",
  },
  {
    id: "sp-consumer-staples-select-sector",
    symbol: "IXR",
    altSymbols: ["XLP", "^IXR", "Consumer Staples Select", "XLP Benchmark"],
    name: "Consumer Staples Select Sector Index",
    providerId: "sp",
    category: "Consumer Staples Sector Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 38,
    weightingMethodology: "Modified Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1998,
    trackingEtfs: [
      {
        ticker: "XLP",
        name: "Consumer Staples Select Sector SPDR Fund",
        aum: "$14.2B+",
      },
    ],
    summary:
      "Tracks defensive consumer staples companies from the S&P 500, spanning food & beverage, household products, hypermarkets, and tobacco.",
    description:
      "The Consumer Staples Select Sector Index measures companies in the S&P 500 that produce non-cyclical essential goods and consumer staples, including Procter & Gamble, Costco, Coca-Cola, and PepsiCo. Renowned for low beta, recession resilience, and reliable dividend yields. Underlying benchmark for the $14B+ Consumer Staples Select Sector SPDR Fund (XLP).",
    eligibilityCriteria: [
      "Must be a constituent of the S&P 500 Index",
      "Classified under the Consumer Staples GICS Sector",
      "Modified market cap weighting with RIC diversification limits",
    ],
    keyCharacteristics: [
      "Underlying index for the $14B+ Consumer Staples Select Sector SPDR Fund (XLP)",
      "Historically defensive risk profile with significantly lower volatility than broad equities",
      "High concentration in blue-chip dividend aristocrats with stable consumer pricing power",
    ],
    tags: [
      "Consumer Staples",
      "XLP",
      "Defensive",
      "Dividends",
      "Sector",
      "S&P 500",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/consumer-staples-select-sector-index/",
  },
  {
    id: "sp-energy-select-sector",
    symbol: "IXE",
    altSymbols: ["XLE", "^IXE", "Energy Select Sector", "XLE Benchmark"],
    name: "Energy Select Sector Index",
    providerId: "sp",
    category: "Energy Sector Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 23,
    weightingMethodology: "Modified Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1998,
    trackingEtfs: [
      {
        ticker: "XLE",
        name: "Energy Select Sector SPDR Fund",
        aum: "$41.8B+",
      },
    ],
    summary:
      "Measures the performance of the energy sector in the S&P 500, dominated by integrated oil & gas supermajors and equipment/service providers.",
    description:
      "The Energy Select Sector Index captures US oil, gas, and consumable fuels leaders alongside energy equipment and services corporations from the S&P 500, led by ExxonMobil and Chevron. Serves as the primary institutional benchmark for energy equity exposure, tracked by the $41B+ Energy Select Sector SPDR Fund (XLE).",
    eligibilityCriteria: [
      "Must be a constituent of the S&P 500 Index",
      "Classified under the Energy GICS Sector",
      "Modified market cap weighting with single-stock and aggregate diversification caps",
    ],
    keyCharacteristics: [
      "Benchmark for the world's largest energy ETF (XLE, $41B+ AUM)",
      "High dividend yield and direct sensitivity to crude oil and natural gas commodity cycles",
      "Concentrated exposure to mega-cap integrated energy producers and oilfield infrastructure",
    ],
    tags: [
      "Energy",
      "XLE",
      "Oil & Gas",
      "Sector",
      "S&P 500",
      "Commodities",
      "Dividends",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/energy-select-sector-index/",
  },
  {
    id: "sp-industrial-select-sector",
    symbol: "IXI",
    altSymbols: ["XLI", "^IXI", "Industrial Select Sector", "XLI Benchmark"],
    name: "Industrial Select Sector Index",
    providerId: "sp",
    category: "Industrial Sector Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 78,
    weightingMethodology: "Modified Market Cap",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 1998,
    trackingEtfs: [
      {
        ticker: "XLI",
        name: "Industrial Select Sector SPDR Fund",
        aum: "$30.5B+",
      },
    ],
    summary:
      "The premier US industrials benchmark, tracking aerospace & defense, transportation, machinery, and electrical equipment giants in the S&P 500.",
    description:
      "The Industrial Select Sector Index includes companies from the S&P 500 involved in manufacturing industrial machinery, aerospace & defense, commercial services, freight transportation, and construction equipment, such as GE Aerospace, Caterpillar, Union Pacific, and Honeywell. Benchmark for the $30B+ Industrial Select Sector SPDR Fund (XLI).",
    eligibilityCriteria: [
      "Must be an existing constituent of the S&P 500 Index",
      "Classified under the Industrials GICS Sector",
      "Quarterly rebalancing with modified market capitalization weighting",
    ],
    keyCharacteristics: [
      "Benchmark for the largest industrial ETF globally (XLI, $30B+ AUM)",
      "Broad economic cyclical exposure across aerospace, defense, logistics, and heavy machinery",
      "Key beneficiary of global infrastructure investment and defense spending programs",
    ],
    tags: [
      "Industrials",
      "XLI",
      "Aerospace",
      "Machinery",
      "Sector",
      "S&P 500",
      "Defense",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/industrial-select-sector-index/",
  },
  {
    id: "sp-aerospace-defense-select-industry",
    symbol: "SPSAD",
    altSymbols: ["SPSIAD", "XAR Benchmark", "S&P Aerospace & Defense"],
    name: "S&P Aerospace & Defense Select Industry Index",
    providerId: "sp",
    category: "Industry Equity / Aerospace & Defense",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 35,
    weightingMethodology: "Modified Equal-Weighted",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2006,
    trackingEtfs: [
      {
        ticker: "XAR",
        name: "SPDR S&P Aerospace & Defense ETF",
        aum: "$5.8B+",
      },
    ],
    summary:
      "Equal-weighted benchmark of US aerospace & defense stocks drawn from the broad S&P Total Market Index, providing balanced small/mid/large cap exposure.",
    description:
      "The S&P Aerospace & Defense Select Industry Index represents the aerospace & defense sub-industry portion of the S&P Total Market Index. It employs a modified equal-weighting methodology, avoiding mega-cap concentration and allowing smaller defense innovators and component manufacturers equal voice alongside prime defense contractors. Underlying benchmark for XAR ($5.8B+).",
    eligibilityCriteria: [
      "Must be a constituent of the S&P Total Market Index",
      "Classified in the Aerospace & Defense GICS sub-industry",
      "Modified equal-weighted structure with liquidity screening",
    ],
    keyCharacteristics: [
      "Underlying benchmark for SPDR S&P Aerospace & Defense ETF (XAR)",
      "Equal-weight approach gives mid- and small-cap defense suppliers meaningful weight",
      "Contrasts with market-cap-weighted defense benchmarks dominated by 3-4 mega-cap contractors",
    ],
    tags: [
      "Aerospace & Defense",
      "XAR",
      "Equal Weight",
      "Industry",
      "Defense",
      "SPDR",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-aerospace-defense-select-industry-index/",
  },
  {
    id: "dow-jones-us-select-aerospace-defense",
    symbol: "DJUSAD",
    altSymbols: ["^DJUSAD", "ITA Benchmark", "Dow Jones Aerospace & Defense"],
    name: "Dow Jones U.S. Select Aerospace & Defense Index",
    providerId: "sp",
    category: "Industry Equity / Aerospace & Defense",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 35,
    weightingMethodology: "Float-Adjusted Market Cap (Capped at 22.5% / 4.5%)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2006,
    trackingEtfs: [
      {
        ticker: "ITA",
        name: "iShares U.S. Aerospace & Defense ETF",
        aum: "$12.6B+",
      },
    ],
    summary:
      "Market-cap weighted index measuring US companies that manufacture commercial and military aircraft and defense electronics.",
    description:
      "The Dow Jones U.S. Select Aerospace & Defense Index is a market-cap weighted benchmark tracking prime US defense contractors and aerospace manufacturers including Lockheed Martin, RTX, General Dynamics, and Boeing. Underlying benchmark for the $12.6B+ iShares U.S. Aerospace & Defense ETF (ITA).",
    eligibilityCriteria: [
      "Constituent of the Dow Jones U.S. Total Stock Market Index",
      "Classified in the Aerospace & Defense industry sector",
      "Float-adjusted market cap weighting with single-stock and group capping limits",
    ],
    keyCharacteristics: [
      "Underlying benchmark for iShares U.S. Aerospace & Defense ETF (ITA, $12.6B+ AUM)",
      "Market-cap weighted structure gives highest weighting to dominant prime military contractors",
      "Direct exposure to Department of Defense (DoD) procurement and foreign military sales",
    ],
    tags: [
      "Aerospace & Defense",
      "ITA",
      "Market Cap Weighted",
      "iShares",
      "Defense",
      "Contractors",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/dow-jones-us-select-aerospace-defense-index/",
  },
  {
    id: "sp-pharmaceuticals-select-industry",
    symbol: "SPSIPH",
    altSymbols: ["^SPSIPH", "XPH Benchmark", "S&P Pharmaceuticals"],
    name: "S&P Pharmaceuticals Select Industry Index",
    providerId: "sp",
    category: "Industry Equity / Pharmaceuticals",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 40,
    weightingMethodology: "Modified Equal-Weighted",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2006,
    trackingEtfs: [
      {
        ticker: "XPH",
        name: "SPDR S&P Pharmaceuticals ETF",
        aum: "$572M+",
      },
    ],
    summary:
      "Equal-weighted index of US pharmaceutical producers across the market-cap spectrum, preventing single-stock dominance.",
    description:
      "The S&P Pharmaceuticals Select Industry Index represents the pharmaceuticals sub-industry of the S&P Total Market Index. It utilizes a modified equal-weight scheme so that innovative mid- and small-cap drug developers have equal impact alongside global pharma giants. Underlying benchmark for the SPDR S&P Pharmaceuticals ETF (XPH).",
    eligibilityCriteria: [
      "Constituent of the S&P Total Market Index",
      "Classified under the Pharmaceuticals GICS sub-industry",
      "Quarterly rebalancing with modified equal-weight allocation",
    ],
    keyCharacteristics: [
      "Underlying benchmark for the SPDR S&P Pharmaceuticals ETF (XPH)",
      "Equal-weight methodology boosts exposure to clinical drug approvals and mid-cap pharma M&A",
      "Avoids mega-cap drug patent cliff concentration risk",
    ],
    tags: [
      "Pharmaceuticals",
      "XPH",
      "Equal Weight",
      "Healthcare",
      "Biotech",
      "SPDR",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-pharmaceuticals-select-industry-index/",
  },
  {
    id: "dow-jones-us-select-pharmaceuticals",
    symbol: "DJUSPR",
    altSymbols: ["^DJUSPR", "IHE Benchmark", "Dow Jones Pharmaceuticals"],
    name: "Dow Jones U.S. Select Pharmaceuticals Index",
    providerId: "sp",
    category: "Industry Equity / Pharmaceuticals",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 45,
    weightingMethodology: "Float-Adjusted Market Cap (Capped at 22.5% / 4.5%)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2006,
    trackingEtfs: [
      {
        ticker: "IHE",
        name: "iShares U.S. Pharmaceuticals ETF",
        aum: "$1.7B+",
      },
    ],
    summary:
      "Market-cap weighted benchmark of US pharmaceutical companies developing and commercializing prescription drugs and vaccines.",
    description:
      "The Dow Jones U.S. Select Pharmaceuticals Index measures the performance of US companies within the pharmaceutical sector, weighted by market capitalization and tracked by the iShares U.S. Pharmaceuticals ETF (IHE), heavily featuring leaders like Eli Lilly, Pfizer, and Johnson & Johnson.",
    eligibilityCriteria: [
      "Constituent of the Dow Jones U.S. Total Stock Market Index",
      "Classified under the Pharmaceuticals industry sector",
      "Float-adjusted market cap weighting subject to regulatory capping constraints",
    ],
    keyCharacteristics: [
      "Underlying benchmark for iShares U.S. Pharmaceuticals ETF (IHE, $1.7B+ AUM)",
      "Market-cap weighted design gives heaviest weighting to global commercial pharma giants",
      "High cash flows, defensive prescription demand, and strong dividend distributions",
    ],
    tags: [
      "Pharmaceuticals",
      "IHE",
      "Healthcare",
      "Market Cap Weighted",
      "iShares",
      "Pharma",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/dow-jones-us-select-pharmaceuticals-index/",
  },
  {
    id: "sp-north-american-expanded-technology",
    symbol: "SPNETX",
    altSymbols: [
      "SPNATX",
      "IGM Benchmark",
      "S&P Expanded Tech",
      "Expanded Technology Sector",
    ],
    name: "S&P North American Expanded Technology Sector Index",
    providerId: "sp",
    category: "Technology & Communication Services Equity",
    assetClass: "Equity",
    region: "Americas",
    constituentsCount: 280,
    weightingMethodology:
      "Modified Market Capitalization (8.5% Single Issuer Cap)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2001,
    trackingEtfs: [
      {
        ticker: "IGM",
        name: "iShares Expanded Tech Sector ETF",
        aum: "$11.0B+",
      },
    ],
    summary:
      "Expanded technology benchmark capturing traditional IT plus interactive media, digital entertainment, and electronic retail giants across North America.",
    description:
      "The S&P North American Expanded Technology Sector Index measures the performance of US- and Canadian-listed technology-related companies. Unlike standard narrow GICS Information Technology indexes (such as XLK or VGT), the Expanded Tech universe incorporates interactive media, internet services, and digital platforms—bringing together Alphabet, Meta, and Netflix alongside Apple, Microsoft, and Nvidia. It serves as the underlying benchmark for the $11B+ iShares Expanded Tech Sector ETF (IGM).",
    eligibilityCriteria: [
      "Common stock listed on a major US or Canadian stock exchange with market capitalization >$250M",
      "Classified under GICS Information Technology or eligible sub-industries from Communication Services and Consumer Discretionary (interactive media, software, internet retail, digital entertainment)",
      "Modified market capitalization weighting capped at 8.5% for individual issuers to avoid single-stock dominance",
    ],
    keyCharacteristics: [
      "Underlying benchmark for the iShares Expanded Tech Sector ETF (IGM, $11.0B+ AUM)",
      "Broader, modern definition of 'Tech' that includes Alphabet and Meta (Communication Services) alongside software and chip giants",
      "Solves GICS reclassification dilemmas where transformative digital leaders were removed from pure Information Technology",
    ],
    tags: [
      "Technology",
      "IGM",
      "Expanded Tech",
      "Software",
      "Interactive Media",
      "Semiconductors",
      "S&P DJI",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-north-american-expanded-technology-sector-index/",
  },
  {
    id: "sp-global-1200-information-technology",
    symbol: "SGIT",
    altSymbols: [
      "SPG1200-45",
      "IXN Benchmark",
      "S&P Global Tech",
      "Global Information Technology",
    ],
    name: "S&P Global 1200 Information Technology Index",
    providerId: "sp",
    category: "Global Technology Sector Equity",
    assetClass: "Equity",
    region: "Global",
    constituentsCount: 125,
    weightingMethodology:
      "Float-Adjusted Market Cap (4.5/22.5/45 Regulatory Capping)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2001,
    trackingEtfs: [
      {
        ticker: "IXN",
        name: "iShares Global Tech ETF",
        aum: "$9.5B+",
      },
    ],
    summary:
      "Global technology benchmark capturing worldwide information technology leaders drawn from the flagship S&P Global 1200 index family.",
    description:
      "The S&P Global 1200 Information Technology Index captures leading information technology corporations across North America, Europe, Asia, and Latin America drawn from the S&P Global 1200. It combines domestic US powerhouses (Apple, Microsoft, Nvidia) with international semiconductor and enterprise titans (TSMC, ASML, SAP, Samsung). Tracked by the $9.5B+ iShares Global Tech ETF (IXN) with a 4.5/22.5/45 regulatory capping structure.",
    eligibilityCriteria: [
      "Constituent of the parent S&P Global 1200 Index across 7 regional headline benchmarks",
      "Classified under the GICS Information Technology Sector",
      "Quarterly rebalancing subject to 4.5/22.5/45 capping (max 22.5% single weight, aggregate weights >4.5% capped at 45%)",
    ],
    keyCharacteristics: [
      "Underlying benchmark for the iShares Global Tech ETF (IXN, $9.5B+ AUM)",
      "True global semiconductor, software, and hardware exposure across developed and key international markets",
      "Complements domestic US tech portfolios with major European (ASML, SAP) and Asian semiconductor leadership",
    ],
    tags: [
      "Global Tech",
      "IXN",
      "Information Technology",
      "Semiconductors",
      "Global",
      "Hardware",
      "S&P DJI",
    ],
    officialUrl:
      "https://www.spglobal.com/spdji/en/indices/equity/sp-global-1200-information-technology-sector/",
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
      { ticker: "IWM", name: "iShares Russell 2000 ETF", aum: "$81B+" },
      { ticker: "VTWO", name: "Vanguard Russell 2000 ETF", aum: "$17B+" },
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
      { ticker: "IWB", name: "iShares Russell 1000 ETF", aum: "$49B+" },
      { ticker: "VONE", name: "Vanguard Russell 1000 ETF", aum: "$9B+" },
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
      { ticker: "IWF", name: "iShares Russell 1000 Growth ETF", aum: "$126B+" },
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
      { ticker: "IWV", name: "iShares Russell 3000 ETF", aum: "$20B+" },
      { ticker: "VTHR", name: "Vanguard Russell 3000 ETF", aum: "$5B+" },
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
      { ticker: "ISF", name: "iShares Core FTSE 100 UCITS ETF", aum: "£15B+" },
      { ticker: "VUKE", name: "Vanguard FTSE 100 UCITS ETF", aum: "£5B+" },
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
        aum: "$238B+",
      },
      { ticker: "SCHF", name: "Schwab International Equity ETF", aum: "$70B+" },
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
        aum: "$128B+",
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
      { ticker: "VT", name: "Vanguard Total World Stock ETF", aum: "$82B+" },
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
  {
    id: "ftse-high-dividend-yield",
    symbol: "FTHDY",
    altSymbols: ["FTSEHDY", "VYM Benchmark"],
    name: "FTSE® High Dividend Yield Index",
    providerId: "ftse",
    category: "Dividend & Income",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 545,
    weightingMethodology:
      "Market Capitalization Weighted (Screened for top 50% 12-month forward forecasted dividend yields)",
    rebalanceFrequency: "Semi-Annual (March, September)",
    launchYear: 2006,
    trackingEtfs: [
      {
        ticker: "VYM",
        name: "Vanguard High Dividend Yield ETF",
        aum: "$83B+ (ETF) / $105B+ (Fund)",
      },
      {
        ticker: "VHYAX",
        name: "Vanguard High Dividend Yield Index Admiral Fund",
        aum: "$105B+ Total Fund",
      },
    ],
    summary:
      "Measures the investment return of common stocks of US companies that are characterized by high dividend yields. Benchmark for Vanguard VYM.",
    description:
      "The FTSE® High Dividend Yield Index is derived from the US component of the FTSE Global Equity Index Series (GEIS). It ranks eligible US dividend-paying stocks by their 12-month forward forecasted dividend yield (provided by I/B/E/S consensus estimates), excludes REITs, and selects the top 50% highest yielding companies, weighting them by float-adjusted market capitalization.",
    eligibilityCriteria: [
      "Member of the US component of the FTSE Global Equity Index Series (large- and mid-cap domestic universe)",
      "Ranked by 12-month forward projected dividend yield using I/B/E/S consensus estimates",
      "Excludes Real Estate Investment Trusts (REITs) due to their unique tax pass-through structure",
      "Selects constituents in the top 50% ranking until the target market cap is reached",
      "Weighted by float-adjusted market capitalization to reduce portfolio turnover",
    ],
    keyCharacteristics: [
      "Underlying benchmark for Vanguard High Dividend Yield ETF (VYM) with over $105B+ in total fund assets",
      "Market cap weighting ensures large, established cash-generative blue-chip payers anchor the index",
      "Excludes REITs to optimize dividend income for qualified dividend tax treatment",
    ],
    tags: [
      "Dividends",
      "VYM Benchmark",
      "High Yield",
      "Income",
      "Vanguard",
      "Value",
      "FTSE Russell",
    ],
    officialUrl:
      "https://www.ftserussell.com/products/indices/high-dividend-yield",
  },
  {
    id: "ftse-global-all-cap-ex-us",
    symbol: "GEISACXUS",
    altSymbols: [
      "FTSE4XUS",
      "VXUS Benchmark",
      "FTSE Global ex US",
      "FTSE All Cap ex US",
    ],
    name: "FTSE Global All Cap ex US Index",
    providerId: "ftse",
    category: "Broad International Equity",
    assetClass: "Equity",
    region: "Global",
    constituentsCount: 8200,
    weightingMethodology: "Float-Adjusted Market Cap",
    rebalanceFrequency: "Semi-Annually (March and September)",
    launchYear: 2003,
    trackingEtfs: [
      {
        ticker: "VXUS",
        name: "Vanguard Total International Stock ETF",
        aum: "$162.5B+ (ETF) / $430B+ (Fund)",
      },
    ],
    summary:
      "The premier international equity benchmark tracking ~8,200 stocks across 48 developed and emerging markets excluding the United States.",
    description:
      "The FTSE Global All Cap ex US Index is designed to measure the performance of international equity markets, covering large, mid, and small-cap stocks across 25 developed and 23 emerging countries outside the United States. It serves as the primary benchmark for the Vanguard Total International Stock ETF (VXUS), the world's largest international index fund.",
    eligibilityCriteria: [
      "Member of the FTSE Global Equity Index Series (GEIS) domiciled outside the United States",
      "Spans large, mid, and small-cap segments across 48 non-US developed and emerging economies",
      "Float-adjusted market cap weighting with strict liquidity, foreign ownership, and investability screens",
    ],
    keyCharacteristics: [
      "Underlying benchmark for Vanguard Total International Stock ETF (VXUS) with over $430B in total fund assets",
      "Covers approximately 99% of the world's non-US investable equity market capitalization",
      "Balanced exposure across Developed Europe, Developed Pacific, and Emerging Markets",
    ],
    tags: [
      "International",
      "VXUS",
      "Global ex US",
      "Developed + Emerging",
      "All Cap",
      "Vanguard Core",
      "FTSE Russell",
    ],
    officialUrl: "https://www.ftserussell.com/products/indices/geis",
  },
  {
    id: "ftse-all-world-ex-us-high-dividend-yield",
    symbol: "FTAWXUSHD",
    altSymbols: ["FTHDYXU", "VYMI Benchmark", "FTSE ex US High Dividend Yield"],
    name: "FTSE All-World ex US High Dividend Yield Index",
    providerId: "ftse",
    category: "International Dividend Equity",
    assetClass: "Equity",
    region: "Global",
    constituentsCount: 1400,
    weightingMethodology: "Float-Adjusted Market Cap (Dividend Yield Screened)",
    rebalanceFrequency: "Semi-Annually (March and September)",
    launchYear: 2016,
    trackingEtfs: [
      {
        ticker: "VYMI",
        name: "Vanguard International High Dividend Yield ETF",
        aum: "$21.8B+",
      },
    ],
    summary:
      "Measures higher-yielding international stocks across developed and emerging countries outside the United States.",
    description:
      "The FTSE All-World ex US High Dividend Yield Index selects international stocks with above-average forecasted dividend yields from the parent FTSE All-World ex US Index. It weights qualifying high-yield companies by float-adjusted market capitalization and serves as the benchmark for the $21B+ Vanguard International High Dividend Yield ETF (VYMI).",
    eligibilityCriteria: [
      "Constituent of the parent FTSE All-World ex US Index (developed and emerging markets excluding US)",
      "Ranked by 12-month forward projected dividend yield using I/B/E/S consensus data",
      "Selects top 50% highest yielding international companies; excludes REITs",
    ],
    keyCharacteristics: [
      "Underlying benchmark for the Vanguard International High Dividend Yield ETF (VYMI, $21.8B+ AUM)",
      "Provides international income diversification without domestic US tax or economic overlap",
      "Strong historical tilt toward financial services, materials, energy, and European dividend champions",
    ],
    tags: [
      "International Dividend",
      "VYMI",
      "High Yield",
      "Global ex US",
      "Income",
      "Value",
      "FTSE Russell",
    ],
    officialUrl:
      "https://www.ftserussell.com/products/indices/high-dividend-yield",
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
      { ticker: "ACWI", name: "iShares MSCI ACWI ETF", aum: "$33B+" },
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
      { ticker: "URTH", name: "iShares MSCI World ETF", aum: "$8B+" },
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
      { ticker: "EFA", name: "iShares MSCI EAFE ETF", aum: "$79B+" },
      { ticker: "IEFA", name: "iShares Core MSCI EAFE ETF", aum: "$195B+" },
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
        aum: "$161B+",
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
      {
        ticker: "SUSL",
        name: "iShares ESG MSCI USA Leaders ETF",
        aum: "$1.2B+",
      },
    ],
    summary:
      "Selects companies from the MSCI USA Index with the highest Environmental, Social, and Governance (ESG) ratings relative to sector peers.",
    description:
      "The index targets 50% sector representation by market cap, selecting companies with superior ESG ratings while excluding alcohol, tobacco, weapons, thermal coal, and controversial practices.",
    tags: ["ESG", "Sustainability", "Factor", "Responsible Investing"],
    officialUrl: "https://www.msci.com/our-solutions/indexes/esg-leaders",
  },
  {
    id: "msci-us-imi-information-technology-25-50",
    symbol: "M1USIT",
    altSymbols: [
      "FTEC Benchmark",
      "VGT Benchmark",
      "MSCI-US-IMI-TECH",
      "M1US50T",
    ],
    name: "MSCI US IMI Information Technology 25/50 Index",
    providerId: "msci",
    category: "Sector & Thematic Tech",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 325,
    weightingMethodology:
      "Modified Market Cap (25/50 Capped: max 25% single company, max 50% for all >5% issuers)",
    rebalanceFrequency: "Quarterly (February, May, August, November)",
    launchYear: 2013,
    trackingEtfs: [
      {
        ticker: "VGT",
        name: "Vanguard Information Technology ETF",
        aum: "$145.8B+",
      },
      {
        ticker: "FTEC",
        name: "Fidelity MSCI Information Technology Index ETF",
        aum: "$18.5B+",
      },
    ],
    summary:
      "Comprehensive benchmark capturing large, mid, and small-cap US Information Technology equities under GICS, applying 25/50 RIC diversification constraints.",
    description:
      "The MSCI US Investable Market Index (IMI) Information Technology 25/50 Index captures the complete market cap spectrum of US technology companies across software, semiconductors, hardware, and IT services. It applies the 25/50 constraint to comply with US Internal Revenue Code Regulated Investment Company (RIC) rules, ensuring no single group entity exceeds 25% and the sum of all entities with weights above 5% cannot exceed 50%. It serves as the underlying benchmark for Vanguard's $145B+ VGT and Fidelity's FTEC.",
    eligibilityCriteria: [
      "Member of the MSCI US Investable Market Index (IMI) classified under the GICS Information Technology Sector",
      "Spans large-cap, mid-cap, and small-cap tiers for complete sector coverage",
      "Single-issuer weight capped strictly at 25% at each quarterly rebalance",
      "Aggregate weight of all constituents each exceeding 5% is capped at 50%",
      "Buffer rules applied at quarterly rebalances to avoid unnecessary portfolio turnover",
    ],
    keyCharacteristics: [
      "Underlying benchmark for Vanguard's massive tech ETF (VGT, $145B+ AUM) and Fidelity's low-cost fund (FTEC)",
      "Broader constituent breath than S&P Technology Select Sector (XLK) or Nasdaq-100 by incorporating mid and small caps",
      "Strict 25/50 capping ensures regulatory compliance and prevents excessive concentration in mega-cap tech giants",
    ],
    tags: [
      "Technology",
      "VGT",
      "FTEC Benchmark",
      "25/50 Capped",
      "Software",
      "Semiconductors",
      "All-Cap Tech",
      "MSCI IMI",
    ],
    officialUrl:
      "https://www.msci.com/our-solutions/indexes/real-time-index-data-search/index-details/us-investable-market-25-50-information-technology/M1US50T",
  },
  {
    id: "msci-us-imi-consumer-staples-25-50",
    symbol: "M1USCS",
    altSymbols: [
      "FSTA Benchmark",
      "VDC Benchmark",
      "MSCI Staples",
      "MSCI US Consumer Staples",
    ],
    name: "MSCI USA IMI Consumer Staples 25/50 Index",
    providerId: "msci",
    category: "Consumer Staples Sector Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 105,
    weightingMethodology:
      "Modified Market Cap (25/50 Capped: max 25% single company, max 50% for all >5% issuers)",
    rebalanceFrequency: "Quarterly (February, May, August, November)",
    launchYear: 2013,
    trackingEtfs: [
      {
        ticker: "FSTA",
        name: "Fidelity MSCI Consumer Staples Index ETF",
        aum: "$1.4B+",
      },
      {
        ticker: "VDC",
        name: "Vanguard Consumer Staples ETF",
        aum: "$7.5B+",
      },
    ],
    summary:
      "Captures large, mid, and small-cap US consumer staples equities with 25/50 issuer diversification caps.",
    description:
      "The MSCI USA IMI Consumer Staples 25/50 Index measures the performance of the consumer staples sector across the entire US investable market universe. It applies a 25/50 capping structure to ensure regulatory compliance and diversification across household food, beverage, personal care, and retail essentials. Benchmark for Fidelity's FSTA and Vanguard's VDC.",
    eligibilityCriteria: [
      "Member of the MSCI US Investable Market Index classified under Consumer Staples GICS",
      "Includes large, mid, and small-cap US companies",
      "25/50 capping constraint prevents excessive weighting in mega-caps like Procter & Gamble or Costco",
    ],
    keyCharacteristics: [
      "Underlying benchmark for Fidelity MSCI Consumer Staples Index ETF (FSTA, $1.4B+ AUM)",
      "Broader constituent count (105+ holdings) than S&P Consumer Staples Select Sector (XLP, ~38 holdings)",
      "Low beta, defensive cash flows, and reliable historical dividend yields",
    ],
    tags: [
      "Consumer Staples",
      "FSTA",
      "VDC",
      "MSCI",
      "Defensive",
      "Dividends",
      "All-Cap",
    ],
    officialUrl:
      "https://www.msci.com/our-solutions/indexes/real-time-index-data-search/index-details/us-investable-market-25-50-consumer-staples/M1US50C",
  },
  {
    id: "msci-us-imi-industrials-25-50",
    symbol: "M1USIN",
    altSymbols: [
      "VIS Benchmark",
      "FIDU Benchmark",
      "MSCI Industrials",
      "MSCI US Industrials",
    ],
    name: "MSCI USA IMI Industrials 25/50 Index",
    providerId: "msci",
    category: "Industrial Sector Equity",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 380,
    weightingMethodology:
      "Modified Market Cap (25/50 Capped: max 25% single company, max 50% for all >5% issuers)",
    rebalanceFrequency: "Quarterly (February, May, August, November)",
    launchYear: 2010,
    trackingEtfs: [
      {
        ticker: "VIS",
        name: "Vanguard Industrials ETF",
        aum: "$8.0B+",
      },
      {
        ticker: "FIDU",
        name: "Fidelity MSCI Industrials Index ETF",
        aum: "$1.2B+",
      },
    ],
    summary:
      "Comprehensive benchmark of US industrial companies spanning large, mid, and small caps, tracked by Vanguard's VIS.",
    description:
      "The MSCI USA IMI Industrials 25/50 Index represents the full US industrials spectrum, encompassing manufacturing, transportation, commercial services, aerospace, and capital goods. It underlies the $8B+ Vanguard Industrials ETF (VIS) and Fidelity MSCI Industrials Index ETF (FIDU), offering broad industrial exposure beyond the mega-cap focus of XLI.",
    eligibilityCriteria: [
      "Member of the MSCI US Investable Market Index classified under Industrials GICS",
      "Spans large, mid, and small-cap tiers across 380+ companies",
      "Applies 25/50 RIC diversification capping at quarterly reconstitutions",
    ],
    keyCharacteristics: [
      "Primary benchmark underlying the Vanguard Industrials ETF (VIS, $8.0B+ AUM)",
      "Nearly 5x the constituent breath of S&P's Industrial Select Sector (XLI, ~78 holdings)",
      "Captures high-growth specialized equipment makers and mid-cap logistics innovators",
    ],
    tags: [
      "Industrials",
      "VIS",
      "FIDU",
      "Vanguard",
      "All-Cap",
      "MSCI",
      "Aerospace",
      "Machinery",
    ],
    officialUrl:
      "https://www.msci.com/our-solutions/indexes/real-time-index-data-search/index-details/us-investable-market-25-50-industrials/M1US50I",
  },

  // ==========================================
  // NASDAQ
  // ==========================================
  {
    id: "nasdaq-100",
    symbol: "NDX",
    altSymbols: ["^NDX", "QQQ Benchmark", "IQQ", "QNDX"],
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
      { ticker: "QQQ", name: "Invesco QQQ Trust", aum: "$486B+" },
      { ticker: "QQQM", name: "Invesco NASDAQ 100 ETF", aum: "$105B+" },
      {
        ticker: "IQQ",
        name: "iShares Nasdaq 100 ETF (BlackRock)",
        aum: "$1B+",
      },
      {
        ticker: "QNDX",
        name: "SPDR Portfolio Nasdaq 100 ETF (State Street)",
        aum: "$1B+",
      },
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
    altSymbols: [
      "^SOX",
      "SOXQ Benchmark",
      "SOXX Benchmark",
      "PHLX Semiconductor",
    ],
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
      {
        ticker: "SOXQ",
        name: "Invesco PHLX Semiconductor ETF",
        aum: "$2.9B+",
      },
      {
        ticker: "SOXX",
        name: "iShares Semiconductor ETF (originally tracked SOX; now tracks ICE Semi)",
        aum: "$42B+",
      },
      {
        ticker: "SOXL",
        name: "Direxion Daily Semiconductor Bull 3X Shares",
        aum: "$19B+",
      },
      {
        ticker: "DRAM",
        name: "Roundhill Memory ETF (Actively Managed AI Memory / Semiconductor Peer)",
        aum: "$25.8B+",
      },
    ],
    summary:
      "The worldwide premier benchmark for the semiconductor industry, tracking 30 leaders in chip design, manufacturing, distribution, and equipment.",
    description:
      "Created by the Philadelphia Stock Exchange (PHLX) and managed by Nasdaq, SOX tracks companies involved in the design, distribution, manufacture, and sale of semiconductors. It is the direct benchmark for the Invesco PHLX Semiconductor ETF (SOXQ).",
    keyCharacteristics: [
      "The definitive barometer for artificial intelligence chips, GPUs, and hardware infrastructure",
      "Features NVIDIA, TSMC (ADR), Broadcom, Qualcomm, ASML, AMD, and Intel",
      "Direct underlying benchmark for SOXQ and peer reference for AI hardware/memory ETFs",
    ],
    tags: [
      "Semiconductors",
      "Chips",
      "SOXQ",
      "SOXX",
      "DRAM",
      "AI Hardware",
      "Sector Leader",
    ],
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
      { ticker: "BUG", name: "Global X Cybersecurity ETF", aum: "$1.7B+" },
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
        aum: "$690B+ (ETF) / $1.9T (Fund)",
      },
      {
        ticker: "VTSAX",
        name: "Vanguard Total Stock Market Index Admiral Fund",
        aum: "$1.9T Total Fund",
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
      "Benchmark for Vanguard's iconic $1.9+ Trillion Total Stock Market Fund (VTI / VTSAX)",
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
      { ticker: "VV", name: "Vanguard Large-Cap ETF", aum: "$54B+" },
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
      { ticker: "VUG", name: "Vanguard Growth ETF", aum: "$228B+" },
      {
        ticker: "VIGAX",
        name: "Vanguard Growth Index Admiral Fund",
        aum: "$300B+ Total Fund",
      },
    ],
    summary:
      "Multi-factor growth style ranking for US large-cap stocks. Benchmark for the $300B+ Vanguard Growth Fund (VUG / VIGAX).",
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
      { ticker: "VTV", name: "Vanguard Value ETF", aum: "$192B+" },
      {
        ticker: "VVIAX",
        name: "Vanguard Value Index Admiral Fund",
        aum: "$220B+ Total Fund",
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
      { ticker: "VO", name: "Vanguard Mid-Cap ETF", aum: "$108B+" },
      {
        ticker: "VIMAX",
        name: "Vanguard Mid-Cap Index Admiral Fund",
        aum: "$190B+ Total Fund",
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
      { ticker: "VB", name: "Vanguard Small-Cap ETF", aum: "$81B+" },
      {
        ticker: "VSMAX",
        name: "Vanguard Small-Cap Index Admiral Fund",
        aum: "$160B+ Total Fund",
      },
    ],
    summary:
      "Targets the 85%-98% cumulative capitalization spectrum of the US market. Benchmark for Vanguard Small-Cap (VB / VSMAX).",
    description:
      "The CRSP US Small Cap Index targets companies between the 85th and 98th percentiles of cumulative US market capitalization, covering over 1,400 small-cap stocks.",
    tags: ["Small Cap", "VB Benchmark", "Vanguard", "Small-Cap US"],
    officialUrl: "https://www.crsp.org/indexes-pages/crsp-us-market-indexes/",
  },

  // ==========================================
  // INTERCONTINENTAL EXCHANGE (ICE Data Indices)
  // ==========================================
  {
    id: "ice-0-3-month-us-treasury",
    symbol: "IDCOT3",
    altSymbols: [
      "IDCOT3TR",
      "ICE 0-3M Treasury",
      "SGOV Benchmark",
      "0-3 Month Treasury",
    ],
    name: "ICE 0-3 Month US Treasury Securities Index",
    providerId: "ice",
    category: "Ultra Short-Term Treasury",
    assetClass: "Fixed Income",
    region: "United States",
    constituentsCount: 20,
    weightingMethodology: "Market Value Weighted",
    rebalanceFrequency: "Monthly",
    launchYear: 2020,
    trackingEtfs: [
      {
        ticker: "SGOV",
        name: "iShares 0-3 Month Treasury Bond ETF",
        aum: "$110.5B+",
      },
    ],
    summary:
      "Measures the performance of public obligations of the US Treasury that have a remaining maturity of less than or equal to three months.",
    description:
      "The ICE 0-3 Month US Treasury Securities Index tracks short-dated US Treasury Bills (T-Bills) maturing within three months. It serves as the primary cash-alternative and risk-free benchmark underlying the $110B+ iShares 0-3 Month Treasury Bond ETF (SGOV), offering maximum capital preservation, near-zero duration risk, and exempt-from-state-tax monthly income distributions.",
    eligibilityCriteria: [
      "Securities must be direct obligations of the US Treasury (Bills, Notes, or Bonds with remaining maturity <= 3 months)",
      "Minimum outstanding par value of $1 billion",
      "STRIPS, inflation-linked securities (TIPS), and floating rate notes are excluded",
      "Rebalanced on the last calendar day of each month",
    ],
    keyCharacteristics: [
      "Primary underlying benchmark for the massive iShares 0-3 Month Treasury Bond ETF (SGOV, $110B+ AUM)",
      "Effective duration of ~0.1 years minimizes interest rate sensitivity during monetary policy changes",
      "Income is generally exempt from state and local income taxes for US investors",
    ],
    tags: [
      "Treasury",
      "SGOV",
      "T-Bills",
      "Cash Alternative",
      "Ultra Short",
      "Fixed Income",
      "Risk-Free Rate",
      "ICE",
    ],
    officialUrl: "https://indices.ice.com/",
  },
  {
    id: "ice-semiconductor",
    symbol: "ICESEMI",
    altSymbols: ["ICESEMITR", "ICE Semi", "SOXX Benchmark", "SOXL Benchmark"],
    name: "ICE Semiconductor Index",
    providerId: "ice",
    category: "Semiconductors & Hardware",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 30,
    weightingMethodology:
      "Modified Market Cap (Top 5 capped at 8%, remainder capped at 4%)",
    rebalanceFrequency: "Quarterly (March, June, September, December)",
    launchYear: 2021,
    trackingEtfs: [
      {
        ticker: "SOXX",
        name: "iShares Semiconductor ETF",
        aum: "$42.0B+",
      },
      {
        ticker: "SOXL",
        name: "Direxion Daily Semiconductor Bull 3X Shares",
        aum: "$19.0B+",
      },
      {
        ticker: "DRAM",
        name: "Roundhill Memory ETF (Actively Managed AI Memory Peer)",
        aum: "$25.8B+",
      },
    ],
    summary:
      "Rules-based benchmark tracking the 30 largest US-listed semiconductor manufacturers and chip design equipment leaders.",
    description:
      "The ICE Semiconductor Index tracks 30 prominent US-listed semiconductor companies across manufacturing, integrated circuits, testing, and memory chips. It is the underlying benchmark for the $42B+ iShares Semiconductor ETF (SOXX) and Direxion Daily Semiconductor Bull 3X Shares (SOXL) following their transition from the PHLX index in 2021. It also serves as a primary benchmark peer for active thematic memory funds such as Roundhill DRAM.",
    eligibilityCriteria: [
      "US-listed equities classified under the Semiconductor industry sector",
      "Ranked by float-adjusted market capitalization and three-month average daily trading volume",
      "Top 30 qualifying securities selected",
      "Weighting capped at 8% for the top 5 constituents and 4% for remaining constituents",
    ],
    keyCharacteristics: [
      "Official benchmark underlying the flagship iShares Semiconductor ETF (SOXX, $42B+ AUM)",
      "Disciplined 8%/4% capping structure prevents extreme concentration in a single chipmaker",
      "Captures high-bandwidth memory (HBM), graphic processing units (GPUs), and foundry giants",
    ],
    tags: [
      "Semiconductor",
      "SOXX",
      "SOXL",
      "DRAM",
      "Chips",
      "AI Hardware",
      "ICE",
      "Tech",
    ],
    officialUrl: "https://indices.ice.com/",
  },
  {
    id: "dynamic-semiconductor-intellidex",
    symbol: "DWSX",
    altSymbols: [
      "DWSX Index",
      "PSI Benchmark",
      "Intellidex Semi",
      "Dynamic Semiconductor",
    ],
    name: "Dynamic Semiconductor Intellidex Index",
    providerId: "ice",
    category: "Factor / Smart Beta Semiconductor",
    assetClass: "Equity",
    region: "United States",
    constituentsCount: 30,
    weightingMethodology:
      "Factor-Weighted Tiered Equal Weight (10-Factor Multi-Metric Model)",
    rebalanceFrequency: "Quarterly (February, May, August, November)",
    launchYear: 2005,
    trackingEtfs: [
      {
        ticker: "PSI",
        name: "Invesco Semiconductors ETF",
        aum: "$2.5B+",
      },
    ],
    summary:
      "Quantitatively-driven smart beta semiconductor benchmark screening 30 US chipmakers on momentum, earnings quality, and value.",
    description:
      "Calculated by ICE Data Indices for Invesco, the Dynamic Semiconductor Intellidex Index evaluates US semiconductor companies based on a proprietary quantitative multi-factor model. It assesses 30 securities across five investment merit criteria: price momentum, earnings momentum, quality, management action, and value. Benchmark for the Invesco Semiconductors ETF (PSI).",
    eligibilityCriteria: [
      "US companies engaged in the manufacture of semiconductors and semiconductor equipment",
      "Evaluated across 10 fundamental and price metrics grouped into 5 investment merit categories",
      "Constituents re-ranked and reconstituted quarterly",
      "Tiered modified equal-weighting scheme applied to manage stock liquidity",
    ],
    keyCharacteristics: [
      "Underlying benchmark for the Invesco Semiconductors ETF (PSI, $2.5B+ AUM)",
      "Smart-beta quantitative model contrasts with pure market-cap-weighted semiconductor indices",
      "Historically provides higher mid-cap chip exposure and dynamic factor tilt adjustments",
    ],
    tags: [
      "Semiconductor",
      "PSI",
      "Smart Beta",
      "Quant",
      "Multi-Factor",
      "Chips",
      "ICE",
    ],
    officialUrl: "https://indices.ice.com/",
  },
  {
    id: "lbma-gold-price",
    symbol: "GOLD",
    altSymbols: [
      "XAU",
      "LBMA Gold",
      "Gold PM Fix",
      "GLD Benchmark",
      "IAU Benchmark",
      "PHYS Benchmark",
    ],
    name: "LBMA Gold Price PM (London Gold Fix)",
    providerId: "ice",
    category: "Physical Precious Metals",
    assetClass: "Commodity",
    region: "Global",
    constituentsCount: 1,
    weightingMethodology:
      "Electronic Auction Equilibrium Price (USD per Troy Ounce)",
    rebalanceFrequency: "Twice Daily (10:30 AM & 3:00 PM London Time)",
    launchYear: 1919,
    trackingEtfs: [
      {
        ticker: "GLD",
        name: "SPDR Gold Shares",
        aum: "$146.4B+",
      },
      {
        ticker: "IAU",
        name: "iShares Gold Trust",
        aum: "$64.6B+",
      },
      {
        ticker: "PHYS",
        name: "Sprott Physical Gold Trust",
        aum: "$16.5B+",
      },
    ],
    summary:
      "The globally recognized institutional benchmark for physical gold bullion pricing, administered electronically by ICE Benchmark Administration.",
    description:
      "The LBMA Gold Price is the international price benchmark for unallocated physical gold delivered in London. Administered independently by ICE Benchmark Administration (IBA) via twice-daily electronic auctions, it is the direct pricing benchmark underlying the world's largest physically backed gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust (IAU), and Sprott Physical Gold Trust (PHYS).",
    eligibilityCriteria: [
      "Physical gold bullion meeting LBMA Good Delivery standards (minimum 99.5% fine gold purity)",
      "Standard 400 troy ounce gold bar specifications",
      "Auction clearing price determined through participating direct institutional bank bidding rounds",
    ],
    keyCharacteristics: [
      "The supreme global pricing standard for gold, underlying over $225B+ in aggregate ETF/trust assets",
      "Administered under strict UK Financial Conduct Authority (FCA) benchmark regulations by ICE Benchmark Administration",
      "Provides institutional investors and sovereign entities transparent price discovery for physical gold bullion",
    ],
    tags: [
      "Gold",
      "GLD",
      "IAU",
      "PHYS",
      "Commodity",
      "Precious Metals",
      "Store of Value",
      "Inflation Hedge",
      "LBMA",
      "ICE",
    ],
    officialUrl:
      "https://www.lbma.org.uk/prices-and-data/precious-metal-prices",
  },
  {
    id: "lbma-silver-price",
    symbol: "SILVER",
    altSymbols: ["XAG", "LBMA Silver", "Silver Fix", "SLV Benchmark"],
    name: "LBMA Silver Price (London Silver Fix)",
    providerId: "ice",
    category: "Physical Precious Metals",
    assetClass: "Commodity",
    region: "Global",
    constituentsCount: 1,
    weightingMethodology:
      "Electronic Auction Equilibrium Price (USD per Troy Ounce)",
    rebalanceFrequency: "Daily (12:00 PM London Time)",
    launchYear: 1897,
    trackingEtfs: [
      {
        ticker: "SLV",
        name: "iShares Silver Trust",
        aum: "$31.7B+",
      },
    ],
    summary:
      "The international pricing benchmark for physical silver bullion, administered by ICE Benchmark Administration.",
    description:
      "The LBMA Silver Price is the primary global benchmark used to value physical silver bullion and settle silver derivative contracts. Operated by ICE Benchmark Administration (IBA) via an electronic auction platform at 12:00 London time, it establishes the daily settlement price underlying the $31B+ iShares Silver Trust (SLV).",
    eligibilityCriteria: [
      "Physical silver bars meeting LBMA Good Delivery standards (minimum 99.9% fine silver purity)",
      "Standard 1,000 troy ounce bar specifications",
      "Determined through electronic multi-round auction administered by ICE Benchmark Administration",
    ],
    keyCharacteristics: [
      "The premier global benchmark for physical silver bullion pricing",
      "Underlying benchmark for the iShares Silver Trust (SLV, $31.7B+ AUM)",
      "Hybrid commodity capturing both monetary safe-haven demand and growing industrial/solar photovoltaic demand",
    ],
    tags: [
      "Silver",
      "SLV",
      "Commodity",
      "Precious Metals",
      "Industrial Metals",
      "Solar",
      "LBMA",
      "ICE",
    ],
    officialUrl:
      "https://www.lbma.org.uk/prices-and-data/precious-metal-prices",
  },

  // ==========================================
  // MARKETVECTOR INDEXES (MVIS)
  // ==========================================
  {
    id: "mvis-us-semiconductor-25",
    symbol: "MVSMH",
    altSymbols: [
      "MVSMHTR",
      "SMH Benchmark",
      "MarketVector Semiconductor",
      "MVIS Semi 25",
    ],
    name: "MVIS US Listed Semiconductor 25 Index",
    providerId: "marketvector",
    category: "Semiconductors & Hardware",
    assetClass: "Equity",
    region: "Global",
    constituentsCount: 25,
    weightingMethodology:
      "Modified Market Cap (Top company capped at 20%, others capped at 4.5% - 5%)",
    rebalanceFrequency: "Semi-Annually (March and September)",
    launchYear: 2011,
    trackingEtfs: [
      {
        ticker: "SMH",
        name: "VanEck Semiconductor ETF",
        aum: "$66.8B+",
      },
    ],
    summary:
      "Tracks the 25 largest and most liquid US-listed semiconductor manufacturers and suppliers worldwide, tracked by the $66B+ VanEck SMH.",
    description:
      "Developed by MarketVector Indexes (MVIS), this benchmark includes US-listed global semiconductor leaders (including foreign ADRs such as TSMC and ASML). It underlies the $66B+ VanEck Semiconductor ETF (SMH), featuring heavy targeted weighting in Nvidia, TSMC, and Broadcom. It allows up to 20% weighting in the largest company, reflecting the true market dominance of leading GPU and AI chip makers.",
    eligibilityCriteria: [
      "Companies must generate at least 50% of their revenue from semiconductors or semiconductor equipment",
      "Listed on a US exchange (including common stocks and American Depositary Receipts / ADRs)",
      "Full market cap of at least $150 million and three-month average daily turnover >$1 million",
      "Top 25 securities by market capitalization are selected",
    ],
    keyCharacteristics: [
      "Underlying benchmark for the VanEck Semiconductor ETF (SMH, $66.8B+ AUM)",
      "Permits up to 20% single-stock capping, capturing the outsized market weight of Nvidia and TSMC",
      "Includes international powerhouses (TSMC, ASML) via US-listed ADRs",
    ],
    tags: [
      "Semiconductor",
      "SMH",
      "Chips",
      "Nvidia",
      "TSMC",
      "AI Hardware",
      "MarketVector",
      "VanEck",
    ],
    officialUrl:
      "https://www.marketvector.com/indexes/sector/mvis-us-listed-semiconductor-25",
  },
];
