// Auto-generated Form 13F Institutional Investors Master Dataset
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
  activeFilersCount: 100,
  dataSource: "SEC EDGAR Form 13F-HR Disclosures",
};

export const TOP_100_INSTITUTIONAL_INVESTORS: InstitutionalInvestor13F[] = [
  {
    "id": "vanguard-group",
    "name": "Vanguard Group Inc.",
    "manager": "Salim Ramji",
    "cik": "0000102909",
    "category": "asset_manager",
    "portfolioValue": "$5.62 T",
    "portfolioValueNum": 5620000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 4210,
    "top10ConcentrationPct": 29.8,
    "cityState": "Malvern, PA",
    "avatarInitials": "VG",
    "description": "The world's largest mutual fund and second-largest ETF provider, managing index replication, active factor, and multi-asset retirement strategies.",
    "topHoldings": [
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 1320000000,
        "value": 312000000000,
        "portfolioWeight": 5.55,
        "changeStatus": "increased",
        "changePct": 1.2
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 685000000,
        "value": 298000000000,
        "portfolioWeight": 5.3,
        "changeStatus": "increased",
        "changePct": 0.8
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 2150000000,
        "value": 285000000000,
        "portfolioWeight": 5.07,
        "changeStatus": "increased",
        "changePct": 2.4
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 780000000,
        "value": 165000000000,
        "portfolioWeight": 2.94,
        "changeStatus": "increased",
        "changePct": 1.5
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 210000000,
        "value": 128000000000,
        "portfolioWeight": 2.28,
        "changeStatus": "increased",
        "changePct": 1.1
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 410000000,
        "value": 76000000000,
        "portfolioWeight": 1.35,
        "changeStatus": "reduced",
        "changePct": -0.4
      },
      {
        "ticker": "BRK.B",
        "name": "Berkshire Hathaway Inc.",
        "shares": 145000000,
        "value": 68000000000,
        "portfolioWeight": 1.21,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 350000000,
        "value": 64000000000,
        "portfolioWeight": 1.14,
        "changeStatus": "increased",
        "changePct": 3.1
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 230000000,
        "value": 58000000000,
        "portfolioWeight": 1.03,
        "changeStatus": "reduced",
        "changePct": -1.8
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 240000000,
        "value": 54000000000,
        "portfolioWeight": 0.96,
        "changeStatus": "increased",
        "changePct": 0.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000102909"
  },
  {
    "id": "blackrock-inc",
    "name": "BlackRock, Inc.",
    "manager": "Larry Fink",
    "cik": "0001364742",
    "category": "asset_manager",
    "portfolioValue": "$4.48 T",
    "portfolioValueNum": 4480000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 5120,
    "top10ConcentrationPct": 28.6,
    "cityState": "New York, NY",
    "avatarInitials": "BR",
    "description": "The global leader in asset management and financial infrastructure through its flagship iShares ETF suite and Aladdin portfolio management technology.",
    "topHoldings": [
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 1820000000,
        "value": 242000000000,
        "portfolioWeight": 5.4,
        "changeStatus": "increased",
        "changePct": 3.2
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 540000000,
        "value": 235000000000,
        "portfolioWeight": 5.25,
        "changeStatus": "increased",
        "changePct": 0.9
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 980000000,
        "value": 231000000000,
        "portfolioWeight": 5.16,
        "changeStatus": "increased",
        "changePct": 0.4
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 640000000,
        "value": 135000000000,
        "portfolioWeight": 3.01,
        "changeStatus": "increased",
        "changePct": 1.8
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 175000000,
        "value": 106000000000,
        "portfolioWeight": 2.37,
        "changeStatus": "increased",
        "changePct": 2.1
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 340000000,
        "value": 63000000000,
        "portfolioWeight": 1.41,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 290000000,
        "value": 53000000000,
        "portfolioWeight": 1.18,
        "changeStatus": "increased",
        "changePct": 2.9
      },
      {
        "ticker": "BRK.B",
        "name": "Berkshire Hathaway Inc.",
        "shares": 110000000,
        "value": 51000000000,
        "portfolioWeight": 1.14,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 54000000,
        "value": 48000000000,
        "portfolioWeight": 1.07,
        "changeStatus": "increased",
        "changePct": 1.4
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 195000000,
        "value": 44000000000,
        "portfolioWeight": 0.98,
        "changeStatus": "reduced",
        "changePct": -0.3
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001364742"
  },
  {
    "id": "state-street-corp",
    "name": "State Street Corporation",
    "manager": "Ron O'Hanley",
    "cik": "0000093751",
    "category": "asset_manager",
    "portfolioValue": "$2.52 T",
    "portfolioValueNum": 2520000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-13",
    "holdingsCount": 3850,
    "top10ConcentrationPct": 27.4,
    "cityState": "Boston, MA",
    "avatarInitials": "SS",
    "description": "Sponsor of the SPDR ETF suite including SPY (the world's first and most liquid ETF), providing institutional index custody and asset management.",
    "topHoldings": [
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 310000000,
        "value": 135000000000,
        "portfolioWeight": 5.36,
        "changeStatus": "increased",
        "changePct": 1.1
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 560000000,
        "value": 132000000000,
        "portfolioWeight": 5.24,
        "changeStatus": "reduced",
        "changePct": -0.6
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 960000000,
        "value": 127000000000,
        "portfolioWeight": 5.04,
        "changeStatus": "increased",
        "changePct": 2.8
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 360000000,
        "value": 76000000000,
        "portfolioWeight": 3.02,
        "changeStatus": "increased",
        "changePct": 1.2
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 95000000,
        "value": 58000000000,
        "portfolioWeight": 2.3,
        "changeStatus": "increased",
        "changePct": 1.5
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 195000000,
        "value": 36000000000,
        "portfolioWeight": 1.43,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "BRK.B",
        "name": "Berkshire Hathaway Inc.",
        "shares": 68000000,
        "value": 32000000000,
        "portfolioWeight": 1.27,
        "changeStatus": "increased",
        "changePct": 0.4
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 165000000,
        "value": 30000000000,
        "portfolioWeight": 1.19,
        "changeStatus": "increased",
        "changePct": 3.4
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 125000000,
        "value": 28000000000,
        "portfolioWeight": 1.11,
        "changeStatus": "reduced",
        "changePct": -0.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 31000000,
        "value": 27500000000,
        "portfolioWeight": 1.09,
        "changeStatus": "increased",
        "changePct": 2
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000093751"
  },
  {
    "id": "fidelity-investments",
    "name": "FMR LLC (Fidelity)",
    "manager": "Abigail Johnson",
    "cik": "0000315066",
    "category": "asset_manager",
    "portfolioValue": "$1.68 T",
    "portfolioValueNum": 1680000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 2980,
    "top10ConcentrationPct": 34.2,
    "cityState": "Boston, MA",
    "avatarInitials": "FD",
    "description": "One of the world's premier investment houses, combining actively managed mutual funds (Contrafund, Magellan) with zero-expense ratio index products.",
    "topHoldings": [
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 780000000,
        "value": 103000000000,
        "portfolioWeight": 6.13,
        "changeStatus": "increased",
        "changePct": 4.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 215000000,
        "value": 93500000000,
        "portfolioWeight": 5.57,
        "changeStatus": "increased",
        "changePct": 1.8
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 380000000,
        "value": 89700000000,
        "portfolioWeight": 5.34,
        "changeStatus": "reduced",
        "changePct": -1.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 310000000,
        "value": 65400000000,
        "portfolioWeight": 3.89,
        "changeStatus": "increased",
        "changePct": 2.2
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 82000000,
        "value": 50000000000,
        "portfolioWeight": 2.98,
        "changeStatus": "increased",
        "changePct": 3.1
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc.",
        "shares": 210000000,
        "value": 38900000000,
        "portfolioWeight": 2.32,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 145000000,
        "value": 26500000000,
        "portfolioWeight": 1.58,
        "changeStatus": "increased",
        "changePct": 5.2
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 28000000,
        "value": 24800000000,
        "portfolioWeight": 1.48,
        "changeStatus": "increased",
        "changePct": 2.6
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 88000000,
        "value": 19800000000,
        "portfolioWeight": 1.18,
        "changeStatus": "reduced",
        "changePct": -0.8
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 65000000,
        "value": 16400000000,
        "portfolioWeight": 0.98,
        "changeStatus": "reduced",
        "changePct": -3.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000315066"
  },
  {
    "id": "capital-research",
    "name": "Capital Research Global Investors",
    "manager": "Mike Gitlin",
    "cik": "0001422848",
    "category": "asset_manager",
    "portfolioValue": "$1.42 T",
    "portfolioValueNum": 1420000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 3040,
    "top10ConcentrationPct": 32,
    "topHoldings": [
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 426000000,
        "value": 96276000000,
        "portfolioWeight": 6.78,
        "changeStatus": "increased",
        "changePct": 13.1
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 408928962,
        "value": 74834000000,
        "portfolioWeight": 5.27,
        "changeStatus": "reduced",
        "changePct": -6.6
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 66053933,
        "value": 58788000000,
        "portfolioWeight": 4.14,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 228142180,
        "value": 48138000000,
        "portfolioWeight": 3.39,
        "changeStatus": "increased",
        "changePct": 12
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 98257471,
        "value": 42742000000,
        "portfolioWeight": 3.01,
        "changeStatus": "increased",
        "changePct": 1.7
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 40970492,
        "value": 37488000000,
        "portfolioWeight": 2.64,
        "changeStatus": "reduced",
        "changePct": -4.2
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 81245570,
        "value": 32092000000,
        "portfolioWeight": 2.26,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 113118644,
        "value": 26696000000,
        "portfolioWeight": 1.88,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 162439394,
        "value": 21442000000,
        "portfolioWeight": 1.51,
        "changeStatus": "increased",
        "changePct": 15.5
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 106264901,
        "value": 16046000000,
        "portfolioWeight": 1.13,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001422848",
    "description": "Home of American Funds, specializing in proprietary bottom-up fundamental equity research with multi-manager system.",
    "cityState": "Los Angeles, CA",
    "avatarInitials": "CR"
  },
  {
    "id": "geode-capital",
    "name": "Geode Capital Management, LLC",
    "manager": "Bob Turner",
    "cik": "0001214717",
    "category": "asset_manager",
    "portfolioValue": "$1.15 T",
    "portfolioValueNum": 1150000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 2500,
    "top10ConcentrationPct": 44,
    "topHoldings": [
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 246390805,
        "value": 107180000000,
        "portfolioWeight": 9.32,
        "changeStatus": "increased",
        "changePct": 5.3
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 484738372,
        "value": 83375000000,
        "portfolioWeight": 7.25,
        "changeStatus": "increased",
        "changePct": 3.1
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 289535398,
        "value": 65435000000,
        "portfolioWeight": 5.69,
        "changeStatus": "increased",
        "changePct": 15.5
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 289675676,
        "value": 53590000000,
        "portfolioWeight": 4.66,
        "changeStatus": "increased",
        "changePct": 6.1
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 161389831,
        "value": 47610000000,
        "portfolioWeight": 4.14,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 46775281,
        "value": 41630000000,
        "portfolioWeight": 3.62,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 169502370,
        "value": 35765000000,
        "portfolioWeight": 3.11,
        "changeStatus": "increased",
        "changePct": 3
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 346337209,
        "value": 29785000000,
        "portfolioWeight": 2.59,
        "changeStatus": "new"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 76790323,
        "value": 23805000000,
        "portfolioWeight": 2.07,
        "changeStatus": "new"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 35793173,
        "value": 17825000000,
        "portfolioWeight": 1.55,
        "changeStatus": "increased",
        "changePct": 9
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001214717",
    "description": "Index manager running passive S&P 500 and total market index mandates for Fidelity and institutional partners.",
    "cityState": "Boston, MA",
    "avatarInitials": "GC"
  },
  {
    "id": "jpmorgan-chase-am",
    "name": "J.P. Morgan Asset Management",
    "manager": "George Gatch",
    "cik": "0000019617",
    "category": "asset_manager",
    "portfolioValue": "$920 B",
    "portfolioValueNum": 920000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 2040,
    "top10ConcentrationPct": 42,
    "topHoldings": [
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 951023256,
        "value": 81788000000,
        "portfolioWeight": 8.89,
        "changeStatus": "increased",
        "changePct": 7.5
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 370139535,
        "value": 63664000000,
        "portfolioWeight": 6.92,
        "changeStatus": "reduced",
        "changePct": -2.4
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 270529730,
        "value": 50048000000,
        "portfolioWeight": 5.44,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 67114754,
        "value": 40940000000,
        "portfolioWeight": 4.45,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 172227488,
        "value": 36340000000,
        "portfolioWeight": 3.95,
        "changeStatus": "new"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 140849558,
        "value": 31832000000,
        "portfolioWeight": 3.46,
        "changeStatus": "increased",
        "changePct": 2.1
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 108063492,
        "value": 27232000000,
        "portfolioWeight": 2.96,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 52239080,
        "value": 22724000000,
        "portfolioWeight": 2.47,
        "changeStatus": "increased",
        "changePct": 8.1
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 58761290,
        "value": 18216000000,
        "portfolioWeight": 1.98,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 23077966,
        "value": 13616000000,
        "portfolioWeight": 1.48,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000019617",
    "description": "Institutional asset management division of JPMorgan Chase, issuer of premier active ETFs like JEPI and JEPQ.",
    "cityState": "New York, NY",
    "avatarInitials": "JM"
  },
  {
    "id": "t-rowe-price",
    "name": "T. Rowe Price Associates",
    "manager": "Rob Sharps",
    "cik": "0000080255",
    "category": "asset_manager",
    "portfolioValue": "$810 B",
    "portfolioValueNum": 810000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1820,
    "top10ConcentrationPct": 31,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 351894040,
        "value": 53136000000,
        "portfolioWeight": 6.56,
        "changeStatus": "reduced",
        "changePct": -11.3
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 67854098,
        "value": 41391000000,
        "portfolioWeight": 5.11,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 74668966,
        "value": 32481000000,
        "portfolioWeight": 4.01,
        "changeStatus": "increased",
        "changePct": 1.6
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 45030508,
        "value": 26568000000,
        "portfolioWeight": 3.28,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 25849180,
        "value": 23652000000,
        "portfolioWeight": 2.92,
        "changeStatus": "new"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 70016949,
        "value": 20655000000,
        "portfolioWeight": 2.55,
        "changeStatus": "new"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 44908861,
        "value": 17739000000,
        "portfolioWeight": 2.19,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 85709302,
        "value": 14742000000,
        "portfolioWeight": 1.82,
        "changeStatus": "reduced",
        "changePct": -8.7
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 89590909,
        "value": 11826000000,
        "portfolioWeight": 1.46,
        "changeStatus": "increased",
        "changePct": 11.7
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 39066372,
        "value": 8829000000,
        "portfolioWeight": 1.09,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000080255",
    "description": "Leading active asset manager known for long-term growth and value stock selection and target-date retirement funds.",
    "cityState": "Baltimore, MD",
    "avatarInitials": "TR"
  },
  {
    "id": "wellington-mgmt",
    "name": "Wellington Management Group LLP",
    "manager": "Jean Hynes",
    "cik": "0000902219",
    "category": "asset_manager",
    "portfolioValue": "$680 B",
    "portfolioValueNum": 680000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1560,
    "top10ConcentrationPct": 30,
    "topHoldings": [
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 146372881,
        "value": 43180000000,
        "portfolioWeight": 6.35,
        "changeStatus": "increased",
        "changePct": 14.6
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 181578378,
        "value": 33592000000,
        "portfolioWeight": 4.94,
        "changeStatus": "increased",
        "changePct": 12.9
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 104698413,
        "value": 26384000000,
        "portfolioWeight": 3.88,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 251441860,
        "value": 21624000000,
        "portfolioWeight": 3.18,
        "changeStatus": "reduced",
        "changePct": -3.4
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 111488372,
        "value": 19176000000,
        "portfolioWeight": 2.82,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 27534426,
        "value": 16796000000,
        "portfolioWeight": 2.47,
        "changeStatus": "new"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 95470199,
        "value": 14416000000,
        "portfolioWeight": 2.12,
        "changeStatus": "reduced",
        "changePct": -1.3
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 24032129,
        "value": 11968000000,
        "portfolioWeight": 1.76,
        "changeStatus": "reduced",
        "changePct": -12.1
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 72636364,
        "value": 9588000000,
        "portfolioWeight": 1.41,
        "changeStatus": "reduced",
        "changePct": -10.8
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 16570115,
        "value": 7208000000,
        "portfolioWeight": 1.06,
        "changeStatus": "increased",
        "changePct": 11
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000902219",
    "description": "Independent private partnership managing institutional mandates, including major active equity sub-advisory for Vanguard.",
    "cityState": "Boston, MA",
    "avatarInitials": "WM"
  },
  {
    "id": "northern-trust",
    "name": "Northern Trust Corp",
    "manager": "Michael O'Grady",
    "cik": "0000073124",
    "category": "asset_manager",
    "portfolioValue": "$620 B",
    "portfolioValueNum": 620000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1440,
    "top10ConcentrationPct": 43,
    "topHoldings": [
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 249920354,
        "value": 56482000000,
        "portfolioWeight": 9.11,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 57757895,
        "value": 43896000000,
        "portfolioWeight": 7.08,
        "changeStatus": "increased",
        "changePct": 7.6
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 58427119,
        "value": 34472000000,
        "portfolioWeight": 5.56,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 91000000,
        "value": 28210000000,
        "portfolioWeight": 4.55,
        "changeStatus": "increased",
        "changePct": 10.1
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 166291391,
        "value": 25110000000,
        "portfolioWeight": 4.05,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 50455172,
        "value": 21948000000,
        "portfolioWeight": 3.54,
        "changeStatus": "reduced",
        "changePct": -9
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 102994536,
        "value": 18848000000,
        "portfolioWeight": 3.04,
        "changeStatus": "reduced",
        "changePct": -11
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 91197674,
        "value": 15686000000,
        "portfolioWeight": 2.53,
        "changeStatus": "increased",
        "changePct": 5.8
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 13687432,
        "value": 12524000000,
        "portfolioWeight": 2.02,
        "changeStatus": "increased",
        "changePct": 2.6
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 23858228,
        "value": 9424000000,
        "portfolioWeight": 1.52,
        "changeStatus": "reduced",
        "changePct": -5.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000073124",
    "description": "Custody bank and institutional asset manager serving sovereign funds, foundations, and family offices.",
    "cityState": "Chicago, IL",
    "avatarInitials": "NT"
  },
  {
    "id": "goldman-sachs-am",
    "name": "Goldman Sachs Group Inc.",
    "manager": "David Solomon",
    "cik": "0000886982",
    "category": "asset_manager",
    "portfolioValue": "$610 B",
    "portfolioValueNum": 610000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1420,
    "top10ConcentrationPct": 29,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 42083146,
        "value": 37454000000,
        "portfolioWeight": 6.14,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 31866667,
        "value": 29158000000,
        "portfolioWeight": 4.78,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 38771186,
        "value": 22875000000,
        "portfolioWeight": 3.75,
        "changeStatus": "increased",
        "changePct": 7.8
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 101227027,
        "value": 18727000000,
        "portfolioWeight": 3.07,
        "changeStatus": "increased",
        "changePct": 2.3
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 96819767,
        "value": 16653000000,
        "portfolioWeight": 2.73,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 169523256,
        "value": 14579000000,
        "portfolioWeight": 2.39,
        "changeStatus": "increased",
        "changePct": 5.2
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 52987288,
        "value": 12505000000,
        "portfolioWeight": 2.05,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 17100000,
        "value": 10431000000,
        "portfolioWeight": 1.71,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 39317536,
        "value": 8296000000,
        "portfolioWeight": 1.36,
        "changeStatus": "increased",
        "changePct": 3.1
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 47136364,
        "value": 6222000000,
        "portfolioWeight": 1.02,
        "changeStatus": "increased",
        "changePct": 4.6
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000886982",
    "description": "Asset management and wealth solutions arm providing alternative assets, global equities, and quant strategies.",
    "cityState": "New York, NY",
    "avatarInitials": "GS"
  },
  {
    "id": "morgan-stanley-am",
    "name": "Morgan Stanley Investment Management",
    "manager": "Dan Simkowitz",
    "cik": "0000895421",
    "category": "asset_manager",
    "portfolioValue": "$580 B",
    "portfolioValueNum": 580000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1360,
    "top10ConcentrationPct": 42,
    "topHoldings": [
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 103538153,
        "value": 51562000000,
        "portfolioWeight": 8.89,
        "changeStatus": "reduced",
        "changePct": -6.8
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 101610127,
        "value": 40136000000,
        "portfolioWeight": 6.92,
        "changeStatus": "reduced",
        "changePct": -10.4
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 41515789,
        "value": 31552000000,
        "portfolioWeight": 5.44,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 29000000,
        "value": 25810000000,
        "portfolioWeight": 4.45,
        "changeStatus": "increased",
        "changePct": 1.7
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 90912698,
        "value": 22910000000,
        "portfolioWeight": 3.95,
        "changeStatus": "new"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 108475676,
        "value": 20068000000,
        "portfolioWeight": 3.46,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 130060606,
        "value": 17168000000,
        "portfolioWeight": 2.96,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 60703390,
        "value": 14326000000,
        "portfolioWeight": 2.47,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 76052980,
        "value": 11484000000,
        "portfolioWeight": 1.98,
        "changeStatus": "new"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 37982301,
        "value": 8584000000,
        "portfolioWeight": 1.48,
        "changeStatus": "reduced",
        "changePct": -9.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000895421",
    "description": "Global investment platform including Eaton Vance, Calvert ESG, and Parametric systematic portfolio solutions.",
    "cityState": "New York, NY",
    "avatarInitials": "MS"
  },
  {
    "id": "invesco-ltd",
    "name": "Invesco Ltd.",
    "manager": "Andrew Schlossberg",
    "cik": "0000914208",
    "category": "asset_manager",
    "portfolioValue": "$540 B",
    "portfolioValueNum": 540000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1280,
    "top10ConcentrationPct": 44,
    "topHoldings": [
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 170603390,
        "value": 50328000000,
        "portfolioWeight": 9.32,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 43988764,
        "value": 39150000000,
        "portfolioWeight": 7.25,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 130194915,
        "value": 30726000000,
        "portfolioWeight": 5.69,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 57848276,
        "value": 25164000000,
        "portfolioWeight": 4.66,
        "changeStatus": "reduced",
        "changePct": -4.5
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 37891525,
        "value": 22356000000,
        "portfolioWeight": 4.14,
        "changeStatus": "increased",
        "changePct": 16
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 227302326,
        "value": 19548000000,
        "portfolioWeight": 3.62,
        "changeStatus": "increased",
        "changePct": 10.7
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 111218543,
        "value": 16794000000,
        "portfolioWeight": 3.11,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 75600000,
        "value": 13986000000,
        "portfolioWeight": 2.59,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 84681818,
        "value": 11178000000,
        "portfolioWeight": 2.07,
        "changeStatus": "increased",
        "changePct": 9.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 39668246,
        "value": 8370000000,
        "portfolioWeight": 1.55,
        "changeStatus": "reduced",
        "changePct": -2.8
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000914208",
    "description": "Global investment firm managing QQQ and active factor strategies across equity, fixed income, and real assets.",
    "cityState": "Atlanta, GA",
    "avatarInitials": "IL"
  },
  {
    "id": "bny-mellon",
    "name": "Bank of New York Mellon Corp",
    "manager": "Robin Vince",
    "cik": "0001390777",
    "category": "asset_manager",
    "portfolioValue": "$490 B",
    "portfolioValueNum": 490000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1180,
    "top10ConcentrationPct": 29,
    "topHoldings": [
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 227924242,
        "value": 30086000000,
        "portfolioWeight": 6.14,
        "changeStatus": "new"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 25597814,
        "value": 23422000000,
        "portfolioWeight": 4.78,
        "changeStatus": "increased",
        "changePct": 6.6
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 30122951,
        "value": 18375000000,
        "portfolioWeight": 3.75,
        "changeStatus": "increased",
        "changePct": 11.3
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 63741525,
        "value": 15043000000,
        "portfolioWeight": 3.07,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 72308108,
        "value": 13377000000,
        "portfolioWeight": 2.73,
        "changeStatus": "reduced",
        "changePct": -10.6
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 46472222,
        "value": 11711000000,
        "portfolioWeight": 2.39,
        "changeStatus": "reduced",
        "changePct": -12.2
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 32403226,
        "value": 10045000000,
        "portfolioWeight": 2.05,
        "changeStatus": "reduced",
        "changePct": -8.7
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 28403390,
        "value": 8379000000,
        "portfolioWeight": 1.71,
        "changeStatus": "increased",
        "changePct": 1.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 7487640,
        "value": 6664000000,
        "portfolioWeight": 1.36,
        "changeStatus": "reduced",
        "changePct": -4.7
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 58116279,
        "value": 4998000000,
        "portfolioWeight": 1.02,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001390777",
    "description": "America's oldest bank and the world's largest custodian, overseeing institutional liquidity and equity strategies.",
    "cityState": "New York, NY",
    "avatarInitials": "BO"
  },
  {
    "id": "dimensional-fund-adv",
    "name": "Dimensional Fund Advisors LP",
    "manager": "David Booth",
    "cik": "0000354204",
    "category": "asset_manager",
    "portfolioValue": "$485 B",
    "portfolioValueNum": 485000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1170,
    "top10ConcentrationPct": 27,
    "topHoldings": [
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 55706827,
        "value": 27742000000,
        "portfolioWeight": 5.72,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 95497788,
        "value": 21582500000,
        "portfolioWeight": 4.45,
        "changeStatus": "increased",
        "changePct": 11.8
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 57377966,
        "value": 16926500000,
        "portfolioWeight": 3.49,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 35116456,
        "value": 13871000000,
        "portfolioWeight": 2.86,
        "changeStatus": "reduced",
        "changePct": -1.6
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 71622093,
        "value": 12319000000,
        "portfolioWeight": 2.54,
        "changeStatus": "increased",
        "changePct": 2.8
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 81568182,
        "value": 10767000000,
        "portfolioWeight": 2.22,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 107715116,
        "value": 9263500000,
        "portfolioWeight": 1.91,
        "changeStatus": "increased",
        "changePct": 9
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 24875806,
        "value": 7711500000,
        "portfolioWeight": 1.59,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 29191943,
        "value": 6159500000,
        "portfolioWeight": 1.27,
        "changeStatus": "reduced",
        "changePct": -6.4
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 18283730,
        "value": 4607500000,
        "portfolioWeight": 0.95,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000354204",
    "description": "Fama-French academic factor pioneer deploying systematic small-cap, value, and profitability tilts.",
    "cityState": "Austin, TX",
    "avatarInitials": "DF"
  },
  {
    "id": "charles-schwab-im",
    "name": "Charles Schwab Investment Management",
    "manager": "Rick Wurster",
    "cik": "0000884546",
    "category": "asset_manager",
    "portfolioValue": "$410 B",
    "portfolioValueNum": 410000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 1020,
    "top10ConcentrationPct": 41,
    "topHoldings": [
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 413813953,
        "value": 35588000000,
        "portfolioWeight": 8.68,
        "changeStatus": "increased",
        "changePct": 9
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 183278146,
        "value": 27675000000,
        "portfolioWeight": 6.75,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 50048276,
        "value": 21771000000,
        "portfolioWeight": 5.31,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 78734513,
        "value": 17794000000,
        "portfolioWeight": 4.34,
        "changeStatus": "new"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 86480874,
        "value": 15826000000,
        "portfolioWeight": 3.86,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 23488136,
        "value": 13858000000,
        "portfolioWeight": 3.38,
        "changeStatus": "increased",
        "changePct": 10.5
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 19424590,
        "value": 11849000000,
        "portfolioWeight": 2.89,
        "changeStatus": "new"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 74856061,
        "value": 9881000000,
        "portfolioWeight": 2.41,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 37502370,
        "value": 7913000000,
        "portfolioWeight": 1.93,
        "changeStatus": "new"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 19177419,
        "value": 5945000000,
        "portfolioWeight": 1.45,
        "changeStatus": "increased",
        "changePct": 15.3
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000884546",
    "description": "Provider of low-cost Schwab ETFs including SCHD (dividend equity), large cap, and international funds.",
    "cityState": "Westlake, TX",
    "avatarInitials": "CS"
  },
  {
    "id": "franklin-resources",
    "name": "Franklin Resources, Inc.",
    "manager": "Jenny Johnson",
    "cik": "0000038777",
    "category": "asset_manager",
    "portfolioValue": "$340 B",
    "portfolioValueNum": 340000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 880,
    "top10ConcentrationPct": 28,
    "topHoldings": [
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 117220930,
        "value": 20162000000,
        "portfolioWeight": 5.93,
        "changeStatus": "increased",
        "changePct": 1.9
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 50561290,
        "value": 15674000000,
        "portfolioWeight": 4.61,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 81509934,
        "value": 12308000000,
        "portfolioWeight": 3.62,
        "changeStatus": "reduced",
        "changePct": -3.8
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 23135632,
        "value": 10064000000,
        "portfolioWeight": 2.96,
        "changeStatus": "reduced",
        "changePct": -11.8
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 38033898,
        "value": 8976000000,
        "portfolioWeight": 2.64,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 8824719,
        "value": 7854000000,
        "portfolioWeight": 2.31,
        "changeStatus": "increased",
        "changePct": 1.3
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 11036066,
        "value": 6732000000,
        "portfolioWeight": 1.98,
        "changeStatus": "increased",
        "changePct": 2.3
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 22261905,
        "value": 5610000000,
        "portfolioWeight": 1.65,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 21270142,
        "value": 4488000000,
        "portfolioWeight": 1.32,
        "changeStatus": "reduced",
        "changePct": -2.1
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 11410169,
        "value": 3366000000,
        "portfolioWeight": 0.99,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000038777",
    "description": "Franklin Templeton holding company with multi-boutique specialist investment managers.",
    "cityState": "San Mateo, CA",
    "avatarInitials": "FR"
  },
  {
    "id": "norges-bank",
    "name": "Norges Bank (Norway Oil Fund)",
    "manager": "Nicolai Tangen",
    "cik": "0001374170",
    "category": "pension_sovereign",
    "portfolioValue": "$310.5 B",
    "portfolioValueNum": 310500000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-13",
    "holdingsCount": 1640,
    "top10ConcentrationPct": 31.2,
    "cityState": "Oslo, Norway",
    "avatarInitials": "NB",
    "description": "Norway's sovereign Government Pension Fund Global, the world's largest sovereign wealth fund with stakes in over 9,000 public companies across 70 countries.",
    "topHoldings": [
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 72000000,
        "value": 17000000000,
        "portfolioWeight": 5.48,
        "changeStatus": "increased",
        "changePct": 1.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 38000000,
        "value": 16500000000,
        "portfolioWeight": 5.31,
        "changeStatus": "increased",
        "changePct": 1.1
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 110000000,
        "value": 14500000000,
        "portfolioWeight": 4.67,
        "changeStatus": "increased",
        "changePct": 4.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 44000000,
        "value": 9300000000,
        "portfolioWeight": 3,
        "changeStatus": "increased",
        "changePct": 2
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 12000000,
        "value": 7300000000,
        "portfolioWeight": 2.35,
        "changeStatus": "increased",
        "changePct": 1.8
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc.",
        "shares": 28000000,
        "value": 5200000000,
        "portfolioWeight": 1.67,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 22000000,
        "value": 4000000000,
        "portfolioWeight": 1.29,
        "changeStatus": "increased",
        "changePct": 3.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 4200000,
        "value": 3700000000,
        "portfolioWeight": 1.19,
        "changeStatus": "increased",
        "changePct": 2.2
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 14000000,
        "value": 3500000000,
        "portfolioWeight": 1.13,
        "changeStatus": "reduced",
        "changePct": -2.1
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 15000000,
        "value": 3400000000,
        "portfolioWeight": 1.1,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001374170"
  },
  {
    "id": "berkshire-hathaway",
    "name": "Berkshire Hathaway Inc.",
    "manager": "Warren Buffett",
    "cik": "0001067983",
    "category": "family_office",
    "portfolioValue": "$280.4 B",
    "portfolioValueNum": 280400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 41,
    "top10ConcentrationPct": 88.5,
    "cityState": "Omaha, NE",
    "avatarInitials": "BRK",
    "description": "Warren Buffett's conglomerate holding company, renowned for disciplined value investing, long-term business compounding, and massive cash reserves.",
    "topHoldings": [
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 300000000,
        "value": 70800000000,
        "portfolioWeight": 25.25,
        "changeStatus": "reduced",
        "changePct": -25
      },
      {
        "ticker": "AXP",
        "name": "American Express Co.",
        "shares": 151610700,
        "value": 41200000000,
        "portfolioWeight": 14.69,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "BAC",
        "name": "Bank of America Corp.",
        "shares": 766000000,
        "value": 31800000000,
        "portfolioWeight": 11.34,
        "changeStatus": "reduced",
        "changePct": -14.8
      },
      {
        "ticker": "KO",
        "name": "Coca-Cola Co.",
        "shares": 400000000,
        "value": 27900000000,
        "portfolioWeight": 9.95,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CVX",
        "name": "Chevron Corp.",
        "shares": 118600000,
        "value": 17800000000,
        "portfolioWeight": 6.35,
        "changeStatus": "reduced",
        "changePct": -2.4
      },
      {
        "ticker": "OXY",
        "name": "Occidental Petroleum",
        "shares": 255281526,
        "value": 13200000000,
        "portfolioWeight": 4.71,
        "changeStatus": "increased",
        "changePct": 1.2
      },
      {
        "ticker": "KHC",
        "name": "Kraft Heinz Co.",
        "shares": 325634818,
        "value": 11400000000,
        "portfolioWeight": 4.07,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MCO",
        "name": "Moody's Corp.",
        "shares": 24669778,
        "value": 11200000000,
        "portfolioWeight": 3.99,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CB",
        "name": "Chubb Limited",
        "shares": 27033784,
        "value": 7800000000,
        "portfolioWeight": 2.78,
        "changeStatus": "increased",
        "changePct": 3.5
      },
      {
        "ticker": "DHR",
        "name": "Danaher Corporation",
        "shares": 18400000,
        "value": 4900000000,
        "portfolioWeight": 1.75,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001067983"
  },
  {
    "id": "fisher-asset-mgmt",
    "name": "Fisher Asset Management, LLC",
    "manager": "Ken Fisher",
    "cik": "0000850529",
    "category": "asset_manager",
    "portfolioValue": "$240 B",
    "portfolioValueNum": 240000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 680,
    "top10ConcentrationPct": 39,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 22274157,
        "value": 19824000000,
        "portfolioWeight": 8.26,
        "changeStatus": "reduced",
        "changePct": -8.6
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 68176991,
        "value": 15408000000,
        "portfolioWeight": 6.42,
        "changeStatus": "increased",
        "changePct": 12.4
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 51355932,
        "value": 12120000000,
        "portfolioWeight": 5.05,
        "changeStatus": "increased",
        "changePct": 4.1
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 75090909,
        "value": 9912000000,
        "portfolioWeight": 4.13,
        "changeStatus": "reduced",
        "changePct": -12.4
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 58331126,
        "value": 8808000000,
        "portfolioWeight": 3.67,
        "changeStatus": "reduced",
        "changePct": -2.7
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 42098361,
        "value": 7704000000,
        "portfolioWeight": 3.21,
        "changeStatus": "reduced",
        "changePct": -4.1
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 8684211,
        "value": 6600000000,
        "portfolioWeight": 2.75,
        "changeStatus": "increased",
        "changePct": 13.1
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 17729032,
        "value": 5496000000,
        "portfolioWeight": 2.29,
        "changeStatus": "increased",
        "changePct": 13.8
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 7484746,
        "value": 4416000000,
        "portfolioWeight": 1.84,
        "changeStatus": "reduced",
        "changePct": -1.8
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 8384810,
        "value": 3312000000,
        "portfolioWeight": 1.38,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000850529",
    "description": "Independent wealth management firm applying macroeconomic top-down global market forecasting.",
    "cityState": "Plano, TX",
    "avatarInitials": "FA"
  },
  {
    "id": "dodge-cox",
    "name": "Dodge & Cox",
    "manager": "David Hoeft",
    "cik": "0000200217",
    "category": "asset_manager",
    "portfolioValue": "$185 B",
    "portfolioValueNum": 185000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 570,
    "top10ConcentrationPct": 40,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 17606180,
        "value": 15669500000,
        "portfolioWeight": 8.47,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 80738411,
        "value": 12191500000,
        "portfolioWeight": 6.59,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 12609211,
        "value": 9583000000,
        "portfolioWeight": 5.18,
        "changeStatus": "increased",
        "changePct": 2.5
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 42863388,
        "value": 7844000000,
        "portfolioWeight": 4.24,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 17610127,
        "value": 6956000000,
        "portfolioWeight": 3.76,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 9977869,
        "value": 6086500000,
        "portfolioWeight": 3.29,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 17684746,
        "value": 5217000000,
        "portfolioWeight": 2.82,
        "changeStatus": "increased",
        "changePct": 5.6
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 4751366,
        "value": 4347500000,
        "portfolioWeight": 2.35,
        "changeStatus": "increased",
        "changePct": 6.2
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 6983936,
        "value": 3478000000,
        "portfolioWeight": 1.88,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 11052966,
        "value": 2608500000,
        "portfolioWeight": 1.41,
        "changeStatus": "increased",
        "changePct": 2.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000200217",
    "description": "Legendary employee-owned investment house utilizing independent committee-based fundamental research.",
    "cityState": "San Francisco, CA",
    "avatarInitials": "D&"
  },
  {
    "id": "calpers",
    "name": "CalPERS (California Public Employees)",
    "manager": "Stephen Gilmore",
    "cik": "0000919079",
    "category": "pension_sovereign",
    "portfolioValue": "$145 B",
    "portfolioValueNum": 145000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 490,
    "top10ConcentrationPct": 47,
    "topHoldings": [
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 46540323,
        "value": 14427500000,
        "portfolioWeight": 9.95,
        "changeStatus": "increased",
        "changePct": 12.7
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 12265574,
        "value": 11223000000,
        "portfolioWeight": 7.74,
        "changeStatus": "increased",
        "changePct": 15.1
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 14452459,
        "value": 8816000000,
        "portfolioWeight": 6.08,
        "changeStatus": "reduced",
        "changePct": -7.6
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 9501316,
        "value": 7221000000,
        "portfolioWeight": 4.98,
        "changeStatus": "increased",
        "changePct": 2.2
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 42443709,
        "value": 6409000000,
        "portfolioWeight": 4.42,
        "changeStatus": "increased",
        "changePct": 1.7
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 65250000,
        "value": 5611500000,
        "portfolioWeight": 3.87,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 16318644,
        "value": 4814000000,
        "portfolioWeight": 3.32,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 9200000,
        "value": 4002000000,
        "portfolioWeight": 2.76,
        "changeStatus": "increased",
        "changePct": 3.2
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 3600562,
        "value": 3204500000,
        "portfolioWeight": 2.21,
        "changeStatus": "increased",
        "changePct": 1.6
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 10199153,
        "value": 2407000000,
        "portfolioWeight": 1.66,
        "changeStatus": "reduced",
        "changePct": -2.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000919079",
    "description": "Largest US public defined-benefit pension fund serving over 2 million California public workers.",
    "cityState": "Sacramento, CA",
    "avatarInitials": "C("
  },
  {
    "id": "baillie-gifford",
    "name": "Baillie Gifford & Co",
    "manager": "James Anderson Legacy",
    "cik": "0001088875",
    "category": "tech_growth",
    "portfolioValue": "$135 B",
    "portfolioValueNum": 135000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 470,
    "top10ConcentrationPct": 26,
    "topHoldings": [
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 86494186,
        "value": 7438500000,
        "portfolioWeight": 5.51,
        "changeStatus": "increased",
        "changePct": 9
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 22928571,
        "value": 5778000000,
        "portfolioWeight": 4.28,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 15376271,
        "value": 4536000000,
        "portfolioWeight": 3.36,
        "changeStatus": "reduced",
        "changePct": -12.1
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 20067568,
        "value": 3712500000,
        "portfolioWeight": 2.75,
        "changeStatus": "new"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 18073770,
        "value": 3307500000,
        "portfolioWeight": 2.45,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 12241525,
        "value": 2889000000,
        "portfolioWeight": 2.14,
        "changeStatus": "reduced",
        "changePct": -2.3
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 10991150,
        "value": 2484000000,
        "portfolioWeight": 1.84,
        "changeStatus": "reduced",
        "changePct": -7.5
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 15647727,
        "value": 2065500000,
        "portfolioWeight": 1.53,
        "changeStatus": "increased",
        "changePct": 3.6
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 5312903,
        "value": 1647000000,
        "portfolioWeight": 1.22,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 1357377,
        "value": 1242000000,
        "portfolioWeight": 0.92,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001088875",
    "description": "115-year-old Scottish partnership focusing on extreme upside asymmetry in generational tech and biotech.",
    "cityState": "Edinburgh, Scotland",
    "avatarInitials": "BG"
  },
  {
    "id": "alliancebernstein",
    "name": "AllianceBernstein L.P.",
    "manager": "Seth Bernstein",
    "cik": "0001109448",
    "category": "asset_manager",
    "portfolioValue": "$120 B",
    "portfolioValueNum": 120000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 440,
    "top10ConcentrationPct": 42,
    "topHoldings": [
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 42333333,
        "value": 10668000000,
        "portfolioWeight": 8.89,
        "changeStatus": "increased",
        "changePct": 3.7
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 36743363,
        "value": 8304000000,
        "portfolioWeight": 6.92,
        "changeStatus": "reduced",
        "changePct": -3.6
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 21058065,
        "value": 6528000000,
        "portfolioWeight": 5.44,
        "changeStatus": "increased",
        "changePct": 2.6
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 6000000,
        "value": 5340000000,
        "portfolioWeight": 4.45,
        "changeStatus": "new"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 31390728,
        "value": 4740000000,
        "portfolioWeight": 3.95,
        "changeStatus": "increased",
        "changePct": 7.6
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 31454545,
        "value": 4152000000,
        "portfolioWeight": 3.46,
        "changeStatus": "reduced",
        "changePct": -6.6
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 4673684,
        "value": 3552000000,
        "portfolioWeight": 2.96,
        "changeStatus": "increased",
        "changePct": 14.7
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 5023729,
        "value": 2964000000,
        "portfolioWeight": 2.47,
        "changeStatus": "new"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 8054237,
        "value": 2376000000,
        "portfolioWeight": 1.98,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 1940984,
        "value": 1776000000,
        "portfolioWeight": 1.48,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001109448",
    "description": "Global investment firm providing research-driven active equity, fixed income, and wealth services.",
    "cityState": "Nashville, TN",
    "avatarInitials": "AL"
  },
  {
    "id": "ny-state-common",
    "name": "New York State Common Retirement",
    "manager": "Thomas P. DiNapoli",
    "cik": "0000810265",
    "category": "pension_sovereign",
    "portfolioValue": "$110 B",
    "portfolioValueNum": 110000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 420,
    "top10ConcentrationPct": 35,
    "topHoldings": [
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 18737931,
        "value": 8151000000,
        "portfolioWeight": 7.41,
        "changeStatus": "increased",
        "changePct": 5.6
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 30028436,
        "value": 6336000000,
        "portfolioWeight": 5.76,
        "changeStatus": "new"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 33000000,
        "value": 4983000000,
        "portfolioWeight": 4.53,
        "changeStatus": "increased",
        "changePct": 15.1
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 13833898,
        "value": 4081000000,
        "portfolioWeight": 3.71,
        "changeStatus": "reduced",
        "changePct": -9.5
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 11674194,
        "value": 3619000000,
        "portfolioWeight": 3.29,
        "changeStatus": "new"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 17124324,
        "value": 3168000000,
        "portfolioWeight": 2.88,
        "changeStatus": "increased",
        "changePct": 2.4
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 12022124,
        "value": 2717000000,
        "portfolioWeight": 2.47,
        "changeStatus": "reduced",
        "changePct": -3.8
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 13174419,
        "value": 2266000000,
        "portfolioWeight": 2.06,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 3076271,
        "value": 1815000000,
        "portfolioWeight": 1.65,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1794737,
        "value": 1364000000,
        "portfolioWeight": 1.24,
        "changeStatus": "reduced",
        "changePct": -5.2
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000810265",
    "description": "Pension fund for over one million state and local government employees in New York.",
    "cityState": "Albany, NY",
    "avatarInitials": "NY"
  },
  {
    "id": "citadel-advisors",
    "name": "Citadel Advisors LLC",
    "manager": "Ken Griffin",
    "cik": "0001423053",
    "category": "hedge_fund",
    "portfolioValue": "$105.8 B",
    "portfolioValueNum": 105800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 3410,
    "top10ConcentrationPct": 22.4,
    "cityState": "Miami, FL",
    "avatarInitials": "CT",
    "description": "Ken Griffin's flagship multi-strategy hedge fund, employing quantitative, equities arbitrage, commodities, and fixed income market-neutral strategies.",
    "topHoldings": [
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 48000000,
        "value": 6360000000,
        "portfolioWeight": 6.01,
        "changeStatus": "increased",
        "changePct": 18.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 11500000,
        "value": 5000000000,
        "portfolioWeight": 4.73,
        "changeStatus": "increased",
        "changePct": 8.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 22000000,
        "value": 4640000000,
        "portfolioWeight": 4.39,
        "changeStatus": "increased",
        "changePct": 12
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 14000000,
        "value": 3300000000,
        "portfolioWeight": 3.12,
        "changeStatus": "reduced",
        "changePct": -6.4
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 3800000,
        "value": 2320000000,
        "portfolioWeight": 2.19,
        "changeStatus": "increased",
        "changePct": 14.1
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 11000000,
        "value": 2010000000,
        "portfolioWeight": 1.9,
        "changeStatus": "new"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc.",
        "shares": 9500000,
        "value": 1760000000,
        "portfolioWeight": 1.66,
        "changeStatus": "reduced",
        "changePct": -4.2
      },
      {
        "ticker": "TSM",
        "name": "Taiwan Semiconductor (ADR)",
        "shares": 9200000,
        "value": 1620000000,
        "portfolioWeight": 1.53,
        "changeStatus": "increased",
        "changePct": 22
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 9800000,
        "value": 1480000000,
        "portfolioWeight": 1.4,
        "changeStatus": "reduced",
        "changePct": -8.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1400000,
        "value": 1240000000,
        "portfolioWeight": 1.17,
        "changeStatus": "increased",
        "changePct": 5.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001423053"
  },
  {
    "id": "pimco-pacific",
    "name": "Pacific Investment Management Co (PIMCO)",
    "manager": "Manny Roman & Dan Ivascyn",
    "cik": "0001163368",
    "category": "asset_manager",
    "portfolioValue": "$95 B",
    "portfolioValueNum": 95000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 390,
    "top10ConcentrationPct": 27,
    "topHoldings": [
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 21563492,
        "value": 5434000000,
        "portfolioWeight": 5.72,
        "changeStatus": "increased",
        "changePct": 13.8
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 20035545,
        "value": 4227500000,
        "portfolioWeight": 4.45,
        "changeStatus": "reduced",
        "changePct": -7.4
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 5619492,
        "value": 3315500000,
        "portfolioWeight": 3.49,
        "changeStatus": "new"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 5455823,
        "value": 2717000000,
        "portfolioWeight": 2.86,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 5547126,
        "value": 2413000000,
        "portfolioWeight": 2.54,
        "changeStatus": "increased",
        "changePct": 14.2
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 5339241,
        "value": 2109000000,
        "portfolioWeight": 2.22,
        "changeStatus": "increased",
        "changePct": 12.8
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 8028761,
        "value": 1814500000,
        "portfolioWeight": 1.91,
        "changeStatus": "increased",
        "changePct": 3.3
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 6400424,
        "value": 1510500000,
        "portfolioWeight": 1.59,
        "changeStatus": "increased",
        "changePct": 7.4
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 1977869,
        "value": 1206500000,
        "portfolioWeight": 1.27,
        "changeStatus": "increased",
        "changePct": 3.2
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1187500,
        "value": 902500000,
        "portfolioWeight": 0.95,
        "changeStatus": "increased",
        "changePct": 6.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001163368",
    "description": "Global bond titan also running extensive institutional equity derivatives, convertibles, and dividend strategies.",
    "cityState": "Newport Beach, CA",
    "avatarInitials": "PI"
  },
  {
    "id": "cppib-canada",
    "name": "Canada Pension Plan Investment Board",
    "manager": "John Graham",
    "cik": "0001283718",
    "category": "pension_sovereign",
    "portfolioValue": "$92 B",
    "portfolioValueNum": 92000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 384,
    "top10ConcentrationPct": 34,
    "topHoldings": [
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 22454237,
        "value": 6624000000,
        "portfolioWeight": 7.2,
        "changeStatus": "reduced",
        "changePct": -5.3
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 20444444,
        "value": 5152000000,
        "portfolioWeight": 5.6,
        "changeStatus": "increased",
        "changePct": 14.9
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 6861017,
        "value": 4048000000,
        "portfolioWeight": 4.4,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 5429508,
        "value": 3312000000,
        "portfolioWeight": 3.6,
        "changeStatus": "increased",
        "changePct": 15.1
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 9496774,
        "value": 2944000000,
        "portfolioWeight": 3.2,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 19515152,
        "value": 2576000000,
        "portfolioWeight": 2.8,
        "changeStatus": "reduced",
        "changePct": -3.1
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 4433735,
        "value": 2208000000,
        "portfolioWeight": 2.4,
        "changeStatus": "increased",
        "changePct": 11.2
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 9945946,
        "value": 1840000000,
        "portfolioWeight": 2,
        "changeStatus": "increased",
        "changePct": 4.2
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 3726582,
        "value": 1472000000,
        "portfolioWeight": 1.6,
        "changeStatus": "increased",
        "changePct": 15.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1240449,
        "value": 1104000000,
        "portfolioWeight": 1.2,
        "changeStatus": "reduced",
        "changePct": -8.8
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001283718",
    "description": "CPPIB invests the funds of the Canada Pension Plan on behalf of 22 million contributors and beneficiaries.",
    "cityState": "Toronto, Canada",
    "avatarInitials": "CP"
  },
  {
    "id": "neuberger-berman",
    "name": "Neuberger Berman Group LLC",
    "manager": "George Walker",
    "cik": "0001465109",
    "category": "asset_manager",
    "portfolioValue": "$92 B",
    "portfolioValueNum": 92000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 384,
    "top10ConcentrationPct": 29,
    "topHoldings": [
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 12985747,
        "value": 5648800000,
        "portfolioWeight": 6.14,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 18633898,
        "value": 4397600000,
        "portfolioWeight": 4.78,
        "changeStatus": "reduced",
        "changePct": -1.9
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 8734177,
        "value": 3450000000,
        "portfolioWeight": 3.75,
        "changeStatus": "new"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 21396970,
        "value": 2824400000,
        "portfolioWeight": 3.07,
        "changeStatus": "reduced",
        "changePct": -12.4
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 11113274,
        "value": 2511600000,
        "portfolioWeight": 2.73,
        "changeStatus": "increased",
        "changePct": 8.7
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 2893158,
        "value": 2198800000,
        "portfolioWeight": 2.39,
        "changeStatus": "increased",
        "changePct": 11.1
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 3787149,
        "value": 1886000000,
        "portfolioWeight": 2.05,
        "changeStatus": "increased",
        "changePct": 6.4
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 5074839,
        "value": 1573200000,
        "portfolioWeight": 1.71,
        "changeStatus": "increased",
        "changePct": 8.1
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 7274419,
        "value": 1251200000,
        "portfolioWeight": 1.36,
        "changeStatus": "reduced",
        "changePct": -9
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 6214570,
        "value": 938400000,
        "portfolioWeight": 1.02,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001465109",
    "description": "100% employee-owned investment house founded in 1939 with independent equity, credit, and private equity teams.",
    "cityState": "New York, NY",
    "avatarInitials": "NB"
  },
  {
    "id": "artisan-partners",
    "name": "Artisan Partners Asset Management",
    "manager": "Eric Colson",
    "cik": "0001466153",
    "category": "asset_manager",
    "portfolioValue": "$88 B",
    "portfolioValueNum": 88000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 376,
    "top10ConcentrationPct": 32,
    "topHoldings": [
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 10112542,
        "value": 5966400000,
        "portfolioWeight": 6.78,
        "changeStatus": "new"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 18403175,
        "value": 4637600000,
        "portfolioWeight": 5.27,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 16120354,
        "value": 3643200000,
        "portfolioWeight": 4.14,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 9623226,
        "value": 2983200000,
        "portfolioWeight": 3.39,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 2976180,
        "value": 2648800000,
        "portfolioWeight": 3.01,
        "changeStatus": "increased",
        "changePct": 15.9
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 11010427,
        "value": 2323200000,
        "portfolioWeight": 2.64,
        "changeStatus": "reduced",
        "changePct": -7.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 4571954,
        "value": 1988800000,
        "portfolioWeight": 2.26,
        "changeStatus": "increased",
        "changePct": 7.3
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 7010169,
        "value": 1654400000,
        "portfolioWeight": 1.88,
        "changeStatus": "increased",
        "changePct": 1.3
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 10066667,
        "value": 1328800000,
        "portfolioWeight": 1.51,
        "changeStatus": "reduced",
        "changePct": -5.1
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 2517468,
        "value": 994400000,
        "portfolioWeight": 1.13,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001466153",
    "description": "High-conviction autonomous investment teams running Global Value and Sustainable Emerging Markets.",
    "cityState": "Milwaukee, WI",
    "avatarInitials": "AP"
  },
  {
    "id": "millennium-management",
    "name": "Millennium Management LLC",
    "manager": "Israel Englander",
    "cik": "0001273087",
    "category": "hedge_fund",
    "portfolioValue": "$86.4 B",
    "portfolioValueNum": 86400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 4620,
    "top10ConcentrationPct": 19.8,
    "cityState": "New York, NY",
    "avatarInitials": "ML",
    "description": "Izzy Englander's multi-pod investment firm deploying hundreds of independent trading teams across fundamental equity, statistical arbitrage, and macro.",
    "topHoldings": [
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 26000000,
        "value": 3445000000,
        "portfolioWeight": 3.99,
        "changeStatus": "increased",
        "changePct": 24.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 7200000,
        "value": 3132000000,
        "portfolioWeight": 3.63,
        "changeStatus": "increased",
        "changePct": 9.8
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 12800000,
        "value": 2700000000,
        "portfolioWeight": 3.13,
        "changeStatus": "increased",
        "changePct": 15.2
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 9500000,
        "value": 2242000000,
        "portfolioWeight": 2.59,
        "changeStatus": "reduced",
        "changePct": -11
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 3200000,
        "value": 1952000000,
        "portfolioWeight": 2.26,
        "changeStatus": "increased",
        "changePct": 18.2
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc.",
        "shares": 7800000,
        "value": 1447000000,
        "portfolioWeight": 1.67,
        "changeStatus": "reduced",
        "changePct": -4.5
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 7100000,
        "value": 1299000000,
        "portfolioWeight": 1.5,
        "changeStatus": "new"
      },
      {
        "ticker": "TSM",
        "name": "Taiwan Semiconductor",
        "shares": 6800000,
        "value": 1196000000,
        "portfolioWeight": 1.38,
        "changeStatus": "increased",
        "changePct": 21.4
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 7200000,
        "value": 1087000000,
        "portfolioWeight": 1.26,
        "changeStatus": "reduced",
        "changePct": -9.8
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1100000,
        "value": 979000000,
        "portfolioWeight": 1.13,
        "changeStatus": "increased",
        "changePct": 6.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001273087"
  },
  {
    "id": "loomis-sayles",
    "name": "Loomis, Sayles & Co., L.P.",
    "manager": "Kevin Charleston",
    "cik": "0000312348",
    "category": "asset_manager",
    "portfolioValue": "$85 B",
    "portfolioValueNum": 85000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 370,
    "top10ConcentrationPct": 42,
    "topHoldings": [
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 43933140,
        "value": 7556500000,
        "portfolioWeight": 8.89,
        "changeStatus": "reduced",
        "changePct": -2.6
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 9969492,
        "value": 5882000000,
        "portfolioWeight": 6.92,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 20460177,
        "value": 4624000000,
        "portfolioWeight": 5.44,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 20445946,
        "value": 3782500000,
        "portfolioWeight": 4.45,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 14226695,
        "value": 3357500000,
        "portfolioWeight": 3.95,
        "changeStatus": "reduced",
        "changePct": -9.6
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 11670635,
        "value": 2941000000,
        "portfolioWeight": 3.46,
        "changeStatus": "reduced",
        "changePct": -1.4
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 8528814,
        "value": 2516000000,
        "portfolioWeight": 2.96,
        "changeStatus": "reduced",
        "changePct": -2
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 4826437,
        "value": 2099500000,
        "portfolioWeight": 2.47,
        "changeStatus": "reduced",
        "changePct": -9.4
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 3379518,
        "value": 1683000000,
        "portfolioWeight": 1.98,
        "changeStatus": "increased",
        "changePct": 1.2
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 14627907,
        "value": 1258000000,
        "portfolioWeight": 1.48,
        "changeStatus": "increased",
        "changePct": 4.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000312348",
    "description": "Affiliate of Natixis Investment Managers managing large-cap active growth and multi-sector credit.",
    "cityState": "Boston, MA",
    "avatarInitials": "LS"
  },
  {
    "id": "columbia-threadneedle",
    "name": "Columbia Threadneedle Investments",
    "manager": "Ted Truscott",
    "cik": "0001233991",
    "category": "asset_manager",
    "portfolioValue": "$82 B",
    "portfolioValueNum": 82000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 364,
    "top10ConcentrationPct": 39,
    "topHoldings": [
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 26877778,
        "value": 6773200000,
        "portfolioWeight": 8.26,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 13327595,
        "value": 5264400000,
        "portfolioWeight": 6.42,
        "changeStatus": "increased",
        "changePct": 6.3
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 4652809,
        "value": 4141000000,
        "portfolioWeight": 5.05,
        "changeStatus": "new"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 22427815,
        "value": 3386600000,
        "portfolioWeight": 4.13,
        "changeStatus": "increased",
        "changePct": 6.8
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 10201356,
        "value": 3009400000,
        "portfolioWeight": 3.67,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 6051034,
        "value": 2632200000,
        "portfolioWeight": 3.21,
        "changeStatus": "new"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 12189189,
        "value": 2255000000,
        "portfolioWeight": 2.75,
        "changeStatus": "increased",
        "changePct": 1.7
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 2052240,
        "value": 1877800000,
        "portfolioWeight": 2.29,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1985263,
        "value": 1508800000,
        "portfolioWeight": 1.84,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 4794915,
        "value": 1131600000,
        "portfolioWeight": 1.38,
        "changeStatus": "reduced",
        "changePct": -9.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001233991",
    "description": "Ameriprise asset management group delivering global equity research and institutional multi-asset portfolios.",
    "cityState": "Boston, MA",
    "avatarInitials": "CT"
  },
  {
    "id": "nuveen-asset-mgmt",
    "name": "Nuveen Asset Management, LLC",
    "manager": "William Huffman",
    "cik": "0001521019",
    "category": "asset_manager",
    "portfolioValue": "$78 B",
    "portfolioValueNum": 78000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 356,
    "top10ConcentrationPct": 39,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 42667550,
        "value": 6442800000,
        "portfolioWeight": 8.26,
        "changeStatus": "increased",
        "changePct": 6
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 11511724,
        "value": 5007600000,
        "portfolioWeight": 6.42,
        "changeStatus": "increased",
        "changePct": 4
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 21524590,
        "value": 3939000000,
        "portfolioWeight": 5.05,
        "changeStatus": "reduced",
        "changePct": -1.8
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 37458140,
        "value": 3221400000,
        "portfolioWeight": 4.13,
        "changeStatus": "reduced",
        "changePct": -4.8
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 11359524,
        "value": 2862600000,
        "portfolioWeight": 3.67,
        "changeStatus": "reduced",
        "changePct": -12.5
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 8076774,
        "value": 2503800000,
        "portfolioWeight": 3.21,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 10165877,
        "value": 2145000000,
        "portfolioWeight": 2.75,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 9655135,
        "value": 1786200000,
        "portfolioWeight": 2.29,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 2352787,
        "value": 1435200000,
        "portfolioWeight": 1.84,
        "changeStatus": "new"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 6258140,
        "value": 1076400000,
        "portfolioWeight": 1.38,
        "changeStatus": "reduced",
        "changePct": -10.9
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001521019",
    "description": "TIAA investment arm managing municipal bonds, responsible investing, and real estate assets.",
    "cityState": "Chicago, IL",
    "avatarInitials": "NA"
  },
  {
    "id": "american-century",
    "name": "American Century Companies, Inc.",
    "manager": "Jonathan S. Thomas",
    "cik": "0000748054",
    "category": "asset_manager",
    "portfolioValue": "$75 B",
    "portfolioValueNum": 75000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 350,
    "top10ConcentrationPct": 28,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 4997191,
        "value": 4447500000,
        "portfolioWeight": 5.93,
        "changeStatus": "reduced",
        "changePct": -10.1
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 18689189,
        "value": 3457500000,
        "portfolioWeight": 4.61,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 5451807,
        "value": 2715000000,
        "portfolioWeight": 3.62,
        "changeStatus": "increased",
        "changePct": 14.2
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 3762712,
        "value": 2220000000,
        "portfolioWeight": 2.96,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 2605263,
        "value": 1980000000,
        "portfolioWeight": 2.64,
        "changeStatus": "new"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 5872881,
        "value": 1732500000,
        "portfolioWeight": 2.31,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 6292373,
        "value": 1485000000,
        "portfolioWeight": 1.98,
        "changeStatus": "increased",
        "changePct": 13.5
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 8195364,
        "value": 1237500000,
        "portfolioWeight": 1.65,
        "changeStatus": "increased",
        "changePct": 4.7
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 1622951,
        "value": 990000000,
        "portfolioWeight": 1.32,
        "changeStatus": "reduced",
        "changePct": -11.7
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 811475,
        "value": 742500000,
        "portfolioWeight": 0.99,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000748054",
    "description": "Independent asset manager directing over 40% of dividends to the Stowers Institute for Medical Research.",
    "cityState": "Kansas City, MO",
    "avatarInitials": "AC"
  },
  {
    "id": "de-shaw-co",
    "name": "D.E. Shaw & Co., Inc.",
    "manager": "David E. Shaw",
    "cik": "0001009207",
    "category": "hedge_fund",
    "portfolioValue": "$72.8 B",
    "portfolioValueNum": 72800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 346,
    "top10ConcentrationPct": 26,
    "topHoldings": [
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 5278000,
        "value": 4011280000,
        "portfolioWeight": 5.51,
        "changeStatus": "new"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 16842378,
        "value": 3115840000,
        "portfolioWeight": 4.28,
        "changeStatus": "increased",
        "changePct": 14.4
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 9706667,
        "value": 2446080000,
        "portfolioWeight": 3.36,
        "changeStatus": "increased",
        "changePct": 5.9
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 9488152,
        "value": 2002000000,
        "portfolioWeight": 2.75,
        "changeStatus": "increased",
        "changePct": 6.4
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 13512121,
        "value": 1783600000,
        "portfolioWeight": 2.45,
        "changeStatus": "reduced",
        "changePct": -12.1
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 1702645,
        "value": 1557920000,
        "portfolioWeight": 2.14,
        "changeStatus": "increased",
        "changePct": 14.7
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 3079356,
        "value": 1339520000,
        "portfolioWeight": 1.84,
        "changeStatus": "new"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 3593032,
        "value": 1113840000,
        "portfolioWeight": 1.53,
        "changeStatus": "new"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 2248506,
        "value": 888160000,
        "portfolioWeight": 1.22,
        "changeStatus": "increased",
        "changePct": 15.2
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 2963540,
        "value": 669760000,
        "portfolioWeight": 0.92,
        "changeStatus": "increased",
        "changePct": 15
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001009207",
    "description": "Computational quant powerhouse blending mathematical modeling with human qualitative fundamental research.",
    "cityState": "New York, NY",
    "avatarInitials": "DS"
  },
  {
    "id": "gic-private-ltd",
    "name": "GIC Private Limited",
    "manager": "Lim Chow Kiat",
    "cik": "0000936828",
    "category": "pension_sovereign",
    "portfolioValue": "$65 B",
    "portfolioValueNum": 65000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 330,
    "top10ConcentrationPct": 46,
    "topHoldings": [
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 21461017,
        "value": 6331000000,
        "portfolioWeight": 9.74,
        "changeStatus": "new"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 26632432,
        "value": 4927000000,
        "portfolioWeight": 7.58,
        "changeStatus": "new"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 9791139,
        "value": 3867500000,
        "portfolioWeight": 5.95,
        "changeStatus": "reduced",
        "changePct": -4.1
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 4165132,
        "value": 3165500000,
        "portfolioWeight": 4.87,
        "changeStatus": "reduced",
        "changePct": -3.3
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 12453540,
        "value": 2814500000,
        "portfolioWeight": 4.33,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 5663218,
        "value": 2463500000,
        "portfolioWeight": 3.79,
        "changeStatus": "increased",
        "changePct": 15.7
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 13990066,
        "value": 2112500000,
        "portfolioWeight": 3.25,
        "changeStatus": "increased",
        "changePct": 3.9
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 13344697,
        "value": 1761500000,
        "portfolioWeight": 2.71,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 4529032,
        "value": 1404000000,
        "portfolioWeight": 2.16,
        "changeStatus": "reduced",
        "changePct": -7.8
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 1726230,
        "value": 1053000000,
        "portfolioWeight": 1.62,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000936828",
    "description": "Singapore's sovereign wealth fund managing the nation's international foreign exchange reserves.",
    "cityState": "Singapore",
    "avatarInitials": "GP"
  },
  {
    "id": "federated-hermes",
    "name": "Federated Hermes, Inc.",
    "manager": "J. Christopher Donahue",
    "cik": "0001056288",
    "category": "asset_manager",
    "portfolioValue": "$65 B",
    "portfolioValueNum": 65000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 330,
    "top10ConcentrationPct": 29,
    "topHoldings": [
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 5251316,
        "value": 3991000000,
        "portfolioWeight": 6.14,
        "changeStatus": "increased",
        "changePct": 11.6
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 10022581,
        "value": 3107000000,
        "portfolioWeight": 4.78,
        "changeStatus": "increased",
        "changePct": 9.2
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 10785398,
        "value": 2437500000,
        "portfolioWeight": 3.75,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 11601744,
        "value": 1995500000,
        "portfolioWeight": 3.07,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 9591892,
        "value": 1774500000,
        "portfolioWeight": 2.73,
        "changeStatus": "increased",
        "changePct": 10.7
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 6582627,
        "value": 1553500000,
        "portfolioWeight": 2.39,
        "changeStatus": "reduced",
        "changePct": -8.8
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 3373418,
        "value": 1332500000,
        "portfolioWeight": 2.05,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 12924419,
        "value": 1111500000,
        "portfolioWeight": 1.71,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 2996610,
        "value": 884000000,
        "portfolioWeight": 1.36,
        "changeStatus": "increased",
        "changePct": 3.2
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 4390728,
        "value": 663000000,
        "portfolioWeight": 1.02,
        "changeStatus": "increased",
        "changePct": 3.8
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001056288",
    "description": "Pioneer in liquidity management, ESG-integrated responsible equity investing, and multi-asset funds.",
    "cityState": "Pittsburgh, PA",
    "avatarInitials": "FH"
  },
  {
    "id": "renaissance-technologies",
    "name": "Renaissance Technologies LLC",
    "manager": "Peter Brown (Simons Legacy)",
    "cik": "0001037389",
    "category": "hedge_fund",
    "portfolioValue": "$64.2 B",
    "portfolioValueNum": 64200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 3820,
    "top10ConcentrationPct": 16.5,
    "cityState": "East Setauket, NY",
    "avatarInitials": "RT",
    "description": "The pioneer of quantitative finance and algorithmic trading, founded by mathematician Jim Simons, known for mathematical pattern recognition and predictive statistical models.",
    "topHoldings": [
      {
        "ticker": "PLTR",
        "name": "Palantir Technologies",
        "shares": 48000000,
        "value": 2016000000,
        "portfolioWeight": 3.14,
        "changeStatus": "increased",
        "changePct": 42
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 14200000,
        "value": 1881000000,
        "portfolioWeight": 2.93,
        "changeStatus": "increased",
        "changePct": 18.5
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 2800000,
        "value": 1708000000,
        "portfolioWeight": 2.66,
        "changeStatus": "increased",
        "changePct": 12.4
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 6400000,
        "value": 1350000000,
        "portfolioWeight": 2.1,
        "changeStatus": "reduced",
        "changePct": -6.2
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 4800000,
        "value": 1132000000,
        "portfolioWeight": 1.76,
        "changeStatus": "reduced",
        "changePct": -14.2
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 4200000,
        "value": 1058000000,
        "portfolioWeight": 1.65,
        "changeStatus": "increased",
        "changePct": 28.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 2100000,
        "value": 913000000,
        "portfolioWeight": 1.42,
        "changeStatus": "reduced",
        "changePct": -8
      },
      {
        "ticker": "NVO",
        "name": "Novo Nordisk (ADR)",
        "shares": 6500000,
        "value": 897000000,
        "portfolioWeight": 1.4,
        "changeStatus": "increased",
        "changePct": 7.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 980000,
        "value": 872000000,
        "portfolioWeight": 1.36,
        "changeStatus": "new"
      },
      {
        "ticker": "UBER",
        "name": "Uber Technologies Inc.",
        "shares": 11200000,
        "value": 862000000,
        "portfolioWeight": 1.34,
        "changeStatus": "increased",
        "changePct": 15
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001037389"
  },
  {
    "id": "gqg-partners",
    "name": "GQG Partners LLC",
    "manager": "Rajiv Jain",
    "cik": "0001697233",
    "category": "asset_manager",
    "portfolioValue": "$62 B",
    "portfolioValueNum": 62000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 324,
    "top10ConcentrationPct": 39,
    "topHoldings": [
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 6738421,
        "value": 5121200000,
        "portfolioWeight": 8.26,
        "changeStatus": "increased",
        "changePct": 1.1
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 6525246,
        "value": 3980400000,
        "portfolioWeight": 6.42,
        "changeStatus": "new"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 10100000,
        "value": 3131000000,
        "portfolioWeight": 5.05,
        "changeStatus": "increased",
        "changePct": 10.8
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 5886437,
        "value": 2560600000,
        "portfolioWeight": 4.13,
        "changeStatus": "reduced",
        "changePct": -4.8
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 5760506,
        "value": 2275400000,
        "portfolioWeight": 3.67,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 23141860,
        "value": 1990200000,
        "portfolioWeight": 3.21,
        "changeStatus": "new"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 9316940,
        "value": 1705000000,
        "portfolioWeight": 2.75,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 2406441,
        "value": 1419800000,
        "portfolioWeight": 2.29,
        "changeStatus": "increased",
        "changePct": 9.4
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 6632558,
        "value": 1140800000,
        "portfolioWeight": 1.84,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 3395238,
        "value": 855600000,
        "portfolioWeight": 1.38,
        "changeStatus": "increased",
        "changePct": 3.8
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001697233",
    "description": "Rajiv Jain's quality-growth global boutique known for decisive contrarian shifts in energy, tech, and banking.",
    "cityState": "Fort Lauderdale, FL",
    "avatarInitials": "GP"
  },
  {
    "id": "aqr-capital-mgmt",
    "name": "AQR Capital Management, LLC",
    "manager": "Cliff Asness",
    "cik": "0001167557",
    "category": "hedge_fund",
    "portfolioValue": "$58.2 B",
    "portfolioValueNum": 58200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 316,
    "top10ConcentrationPct": 49,
    "topHoldings": [
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 19487613,
        "value": 6041160000,
        "portfolioWeight": 10.38,
        "changeStatus": "increased",
        "changePct": 5.6
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 5277236,
        "value": 4696740000,
        "portfolioWeight": 8.07,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 4032656,
        "value": 3689880000,
        "portfolioWeight": 6.34,
        "changeStatus": "increased",
        "changePct": 15.6
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 22883182,
        "value": 3020580000,
        "portfolioWeight": 5.19,
        "changeStatus": "increased",
        "changePct": 1.9
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 31197907,
        "value": 2683020000,
        "portfolioWeight": 4.61,
        "changeStatus": "reduced",
        "changePct": -2.9
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 12848525,
        "value": 2351280000,
        "portfolioWeight": 4.04,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 7990952,
        "value": 2013720000,
        "portfolioWeight": 3.46,
        "changeStatus": "increased",
        "changePct": 5.7
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 7416637,
        "value": 1676160000,
        "portfolioWeight": 2.88,
        "changeStatus": "reduced",
        "changePct": -4.5
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 7267135,
        "value": 1344420000,
        "portfolioWeight": 2.31,
        "changeStatus": "increased",
        "changePct": 1.2
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1324816,
        "value": 1006860000,
        "portfolioWeight": 1.73,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001167557",
    "description": "Cliff Asness's systematic factor investing firm applying value, momentum, carry, and defensive styles.",
    "cityState": "Greenwich, CT",
    "avatarInitials": "AC"
  },
  {
    "id": "first-eagle-im",
    "name": "First Eagle Investment Management",
    "manager": "Mehdi Mahmud",
    "cik": "0001325447",
    "category": "asset_manager",
    "portfolioValue": "$58 B",
    "portfolioValueNum": 58000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 316,
    "top10ConcentrationPct": 41,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 5656629,
        "value": 5034400000,
        "portfolioWeight": 8.68,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 15535714,
        "value": 3915000000,
        "portfolioWeight": 6.75,
        "changeStatus": "increased",
        "changePct": 13.5
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 7796962,
        "value": 3079800000,
        "portfolioWeight": 5.31,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 4126557,
        "value": 2517200000,
        "portfolioWeight": 4.34,
        "changeStatus": "reduced",
        "changePct": -6.1
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 3794576,
        "value": 2238800000,
        "portfolioWeight": 3.86,
        "changeStatus": "increased",
        "changePct": 1
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 11397674,
        "value": 1960400000,
        "portfolioWeight": 3.38,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 3853333,
        "value": 1676200000,
        "portfolioWeight": 2.89,
        "changeStatus": "reduced",
        "changePct": -11.1
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 2806827,
        "value": 1397800000,
        "portfolioWeight": 2.41,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 3794576,
        "value": 1119400000,
        "portfolioWeight": 1.93,
        "changeStatus": "increased",
        "changePct": 9.1
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 2712903,
        "value": 841000000,
        "portfolioWeight": 1.45,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001325447",
    "description": "Independent firm tracing roots to 1864, applying classic Graham & Dodd deep-value with gold allocations.",
    "cityState": "New York, NY",
    "avatarInitials": "FE"
  },
  {
    "id": "lord-abbett",
    "name": "Lord, Abbett & Co. LLC",
    "manager": "Douglas B. Sieg",
    "cik": "0000728100",
    "category": "asset_manager",
    "portfolioValue": "$54 B",
    "portfolioValueNum": 54000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 308,
    "top10ConcentrationPct": 27,
    "topHoldings": [
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 5235254,
        "value": 3088800000,
        "portfolioWeight": 5.72,
        "changeStatus": "increased",
        "changePct": 13.1
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 7751613,
        "value": 2403000000,
        "portfolioWeight": 4.45,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 10298361,
        "value": 1884600000,
        "portfolioWeight": 3.49,
        "changeStatus": "new"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 6128571,
        "value": 1544400000,
        "portfolioWeight": 2.86,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 4649492,
        "value": 1371600000,
        "portfolioWeight": 2.54,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1577368,
        "value": 1198800000,
        "portfolioWeight": 2.22,
        "changeStatus": "increased",
        "changePct": 8.3
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 4888152,
        "value": 1031400000,
        "portfolioWeight": 1.91,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 938361,
        "value": 858600000,
        "portfolioWeight": 1.59,
        "changeStatus": "new"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1377108,
        "value": 685800000,
        "portfolioWeight": 1.27,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 840984,
        "value": 513000000,
        "portfolioWeight": 0.95,
        "changeStatus": "reduced",
        "changePct": -12.3
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000728100",
    "description": "One of the oldest independent investment firms in the United States, managing active fixed income and equities.",
    "cityState": "Jersey City, NJ",
    "avatarInitials": "LA"
  },
  {
    "id": "oakmark-funds",
    "name": "Harris Associates L.P. (Oakmark)",
    "manager": "Bill Nygren",
    "cik": "0000813917",
    "category": "family_office",
    "portfolioValue": "$52 B",
    "portfolioValueNum": 52000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 304,
    "top10ConcentrationPct": 40,
    "topHoldings": [
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 7465085,
        "value": 4404400000,
        "portfolioWeight": 8.47,
        "changeStatus": "reduced",
        "changePct": -12.5
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 16240758,
        "value": 3426800000,
        "portfolioWeight": 6.59,
        "changeStatus": "reduced",
        "changePct": -8.8
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 31320930,
        "value": 2693600000,
        "portfolioWeight": 5.18,
        "changeStatus": "increased",
        "changePct": 8.2
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 12818605,
        "value": 2204800000,
        "portfolioWeight": 4.24,
        "changeStatus": "increased",
        "changePct": 5.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 4494713,
        "value": 1955200000,
        "portfolioWeight": 3.76,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 7249153,
        "value": 1710800000,
        "portfolioWeight": 3.29,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 5819048,
        "value": 1466400000,
        "portfolioWeight": 2.82,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 2003279,
        "value": 1222000000,
        "portfolioWeight": 2.35,
        "changeStatus": "increased",
        "changePct": 6.3
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 3153548,
        "value": 977600000,
        "portfolioWeight": 1.88,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1472289,
        "value": 733200000,
        "portfolioWeight": 1.41,
        "changeStatus": "reduced",
        "changePct": -1.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000813917",
    "description": "Bill Nygren's classic value shop buying great businesses trading at sharp discounts to intrinsic business value.",
    "cityState": "Chicago, IL",
    "avatarInitials": "HA"
  },
  {
    "id": "texas-teachers",
    "name": "Teacher Retirement System of Texas",
    "manager": "Jase Auby",
    "cik": "0000796848",
    "category": "pension_sovereign",
    "portfolioValue": "$48 B",
    "portfolioValueNum": 48000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 296,
    "top10ConcentrationPct": 47,
    "topHoldings": [
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 5219672,
        "value": 4776000000,
        "portfolioWeight": 9.95,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 14742857,
        "value": 3715200000,
        "portfolioWeight": 7.74,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 4946441,
        "value": 2918400000,
        "portfolioWeight": 6.08,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 27795349,
        "value": 2390400000,
        "portfolioWeight": 4.98,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 2383820,
        "value": 2121600000,
        "portfolioWeight": 4.42,
        "changeStatus": "increased",
        "changePct": 14.1
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 3730120,
        "value": 1857600000,
        "portfolioWeight": 3.87,
        "changeStatus": "increased",
        "changePct": 12.1
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 12072727,
        "value": 1593600000,
        "portfolioWeight": 3.32,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 8773510,
        "value": 1324800000,
        "portfolioWeight": 2.76,
        "changeStatus": "increased",
        "changePct": 13.2
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 4494915,
        "value": 1060800000,
        "portfolioWeight": 2.21,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1048421,
        "value": 796800000,
        "portfolioWeight": 1.66,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000796848",
    "description": "Major US institutional retirement system investing in global public equities and private markets.",
    "cityState": "Austin, TX",
    "avatarInitials": "TR"
  },
  {
    "id": "brown-advisory",
    "name": "Brown Advisory LLC",
    "manager": "Mike Hankin",
    "cik": "0001345929",
    "category": "asset_manager",
    "portfolioValue": "$48 B",
    "portfolioValueNum": 48000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 296,
    "top10ConcentrationPct": 31,
    "topHoldings": [
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 10673898,
        "value": 3148800000,
        "portfolioWeight": 6.56,
        "changeStatus": "increased",
        "changePct": 9.3
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 5638621,
        "value": 2452800000,
        "portfolioWeight": 5.11,
        "changeStatus": "reduced",
        "changePct": -7.8
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 3262373,
        "value": 1924800000,
        "portfolioWeight": 4.01,
        "changeStatus": "reduced",
        "changePct": -4.7
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 7461611,
        "value": 1574400000,
        "portfolioWeight": 3.28,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1844211,
        "value": 1401600000,
        "portfolioWeight": 2.92,
        "changeStatus": "increased",
        "changePct": 7.3
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 1337705,
        "value": 1224000000,
        "portfolioWeight": 2.55,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 4171429,
        "value": 1051200000,
        "portfolioWeight": 2.19,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 3865487,
        "value": 873600000,
        "portfolioWeight": 1.82,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 5309091,
        "value": 700800000,
        "portfolioWeight": 1.46,
        "changeStatus": "new"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 1324557,
        "value": 523200000,
        "portfolioWeight": 1.09,
        "changeStatus": "increased",
        "changePct": 14.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001345929",
    "description": "Independent investment firm managing sustainable growth, large-cap equities, and flexible income.",
    "cityState": "Baltimore, MD",
    "avatarInitials": "BA"
  },
  {
    "id": "two-sigma-inv",
    "name": "Two Sigma Investments, LP",
    "manager": "David Siegel & John Overdeck",
    "cik": "0001179392",
    "category": "hedge_fund",
    "portfolioValue": "$46.5 B",
    "portfolioValueNum": 46500000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 293,
    "top10ConcentrationPct": 39,
    "topHoldings": [
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 8829655,
        "value": 3840900000,
        "portfolioWeight": 8.26,
        "changeStatus": "increased",
        "changePct": 11.3
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 16136757,
        "value": 2985300000,
        "portfolioWeight": 6.42,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 15551325,
        "value": 2348250000,
        "portfolioWeight": 5.05,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 11165407,
        "value": 1920450000,
        "portfolioWeight": 4.13,
        "changeStatus": "reduced",
        "changePct": -7.3
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 4320380,
        "value": 1706550000,
        "portfolioWeight": 3.67,
        "changeStatus": "new"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 11307955,
        "value": 1492650000,
        "portfolioWeight": 3.21,
        "changeStatus": "reduced",
        "changePct": -2.5
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 5418432,
        "value": 1278750000,
        "portfolioWeight": 2.75,
        "changeStatus": "increased",
        "changePct": 2.6
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 5818852,
        "value": 1064850000,
        "portfolioWeight": 2.29,
        "changeStatus": "reduced",
        "changePct": -8
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1718072,
        "value": 855600000,
        "portfolioWeight": 1.84,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 2175254,
        "value": 641700000,
        "portfolioWeight": 1.38,
        "changeStatus": "reduced",
        "changePct": -6.6
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001179392",
    "description": "Technology-first systematic hedge fund using machine learning, big data analysis, and distributed computing.",
    "cityState": "New York, NY",
    "avatarInitials": "TS"
  },
  {
    "id": "baron-capital",
    "name": "Baron Capital Management, Inc.",
    "manager": "Ron Baron",
    "cik": "0001017918",
    "category": "tech_growth",
    "portfolioValue": "$45 B",
    "portfolioValueNum": 45000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 290,
    "top10ConcentrationPct": 27,
    "topHoldings": [
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 4362712,
        "value": 2574000000,
        "portfolioWeight": 5.72,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 4603448,
        "value": 2002500000,
        "portfolioWeight": 4.45,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 1716393,
        "value": 1570500000,
        "portfolioWeight": 3.49,
        "changeStatus": "increased",
        "changePct": 15.7
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 4151613,
        "value": 1287000000,
        "portfolioWeight": 2.86,
        "changeStatus": "increased",
        "changePct": 10.6
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 7569536,
        "value": 1143000000,
        "portfolioWeight": 2.54,
        "changeStatus": "reduced",
        "changePct": -2.6
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 5459016,
        "value": 999000000,
        "portfolioWeight": 2.22,
        "changeStatus": "reduced",
        "changePct": -7.6
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 4645946,
        "value": 859500000,
        "portfolioWeight": 1.91,
        "changeStatus": "increased",
        "changePct": 13.5
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 2425424,
        "value": 715500000,
        "portfolioWeight": 1.59,
        "changeStatus": "new"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 2528761,
        "value": 571500000,
        "portfolioWeight": 1.27,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 562500,
        "value": 427500000,
        "portfolioWeight": 0.95,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001017918",
    "description": "Ron Baron's long-term growth firm with iconic early concentrated investments in Tesla, SpaceX, and CoStar.",
    "cityState": "New York, NY",
    "avatarInitials": "BC"
  },
  {
    "id": "swib-wisconsin",
    "name": "State of Wisconsin Investment Board",
    "manager": "Edwin Denson",
    "cik": "0000854157",
    "category": "pension_sovereign",
    "portfolioValue": "$44 B",
    "portfolioValueNum": 44000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 288,
    "top10ConcentrationPct": 32,
    "topHoldings": [
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 3260328,
        "value": 2983200000,
        "portfolioWeight": 6.78,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 3801311,
        "value": 2318800000,
        "portfolioWeight": 5.27,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 4611646,
        "value": 1821600000,
        "portfolioWeight": 4.14,
        "changeStatus": "increased",
        "changePct": 4.7
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 5919048,
        "value": 1491600000,
        "portfolioWeight": 3.39,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 2244746,
        "value": 1324400000,
        "portfolioWeight": 3.01,
        "changeStatus": "reduced",
        "changePct": -5.9
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 4922034,
        "value": 1161600000,
        "portfolioWeight": 2.64,
        "changeStatus": "new"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 5433880,
        "value": 994400000,
        "portfolioWeight": 2.26,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 1901609,
        "value": 827200000,
        "portfolioWeight": 1.88,
        "changeStatus": "increased",
        "changePct": 12.4
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 746517,
        "value": 664400000,
        "portfolioWeight": 1.51,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 5781395,
        "value": 497200000,
        "portfolioWeight": 1.13,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000854157",
    "description": "Fiduciary agency managing the Wisconsin Retirement System trust funds with active and index allocations.",
    "cityState": "Madison, WI",
    "avatarInitials": "SO"
  },
  {
    "id": "point72-asset-mgmt",
    "name": "Point72 Asset Management, L.P.",
    "manager": "Steven A. Cohen",
    "cik": "0001603466",
    "category": "hedge_fund",
    "portfolioValue": "$42.1 B",
    "portfolioValueNum": 42100000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 284,
    "top10ConcentrationPct": 26,
    "topHoldings": [
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 26973372,
        "value": 2319710000,
        "portfolioWeight": 5.51,
        "changeStatus": "increased",
        "changePct": 4.1
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 9739892,
        "value": 1801880000,
        "portfolioWeight": 4.28,
        "changeStatus": "increased",
        "changePct": 12.3
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 3581165,
        "value": 1414560000,
        "portfolioWeight": 3.36,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 5486967,
        "value": 1157750000,
        "portfolioWeight": 2.75,
        "changeStatus": "reduced",
        "changePct": -8.1
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1158933,
        "value": 1031450000,
        "portfolioWeight": 2.45,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 5966490,
        "value": 900940000,
        "portfolioWeight": 2.14,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1555502,
        "value": 774640000,
        "portfolioWeight": 1.84,
        "changeStatus": "increased",
        "changePct": 7.3
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 4879773,
        "value": 644130000,
        "portfolioWeight": 1.53,
        "changeStatus": "increased",
        "changePct": 14.1
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 1741085,
        "value": 513620000,
        "portfolioWeight": 1.22,
        "changeStatus": "increased",
        "changePct": 12.7
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 890391,
        "value": 387320000,
        "portfolioWeight": 0.92,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001603466",
    "description": "Steve Cohen's multi-manager hedge fund focused on discretionary long/short equity and macro strategies.",
    "cityState": "Stamford, CT",
    "avatarInitials": "PA"
  },
  {
    "id": "william-blair",
    "name": "William Blair Investment Management",
    "manager": "Beth Satterfield",
    "cik": "0001644956",
    "category": "asset_manager",
    "portfolioValue": "$42 B",
    "portfolioValueNum": 42000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 284,
    "top10ConcentrationPct": 40,
    "topHoldings": [
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 19439344,
        "value": 3557400000,
        "portfolioWeight": 8.47,
        "changeStatus": "new"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 16091860,
        "value": 2767800000,
        "portfolioWeight": 6.59,
        "changeStatus": "increased",
        "changePct": 1.1
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 7018065,
        "value": 2175600000,
        "portfolioWeight": 5.18,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 6036610,
        "value": 1780800000,
        "portfolioWeight": 4.24,
        "changeStatus": "increased",
        "changePct": 12.2
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 8536216,
        "value": 1579200000,
        "portfolioWeight": 3.76,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 3498228,
        "value": 1381800000,
        "portfolioWeight": 3.29,
        "changeStatus": "reduced",
        "changePct": -4.2
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 8972727,
        "value": 1184400000,
        "portfolioWeight": 2.82,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1298684,
        "value": 987000000,
        "portfolioWeight": 2.35,
        "changeStatus": "increased",
        "changePct": 15.6
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1585542,
        "value": 789600000,
        "portfolioWeight": 1.88,
        "changeStatus": "increased",
        "changePct": 4.8
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 6886047,
        "value": 592200000,
        "portfolioWeight": 1.41,
        "changeStatus": "increased",
        "changePct": 4.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001644956",
    "description": "100% employee-owned boutique emphasizing fundamental global growth and small-mid cap companies.",
    "cityState": "Chicago, IL",
    "avatarInitials": "WB"
  },
  {
    "id": "jane-street-group",
    "name": "Jane Street Group, LLC",
    "manager": "Rob Granieri",
    "cik": "0001595888",
    "category": "hedge_fund",
    "portfolioValue": "$38.5 B",
    "portfolioValueNum": 38500000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 277,
    "top10ConcentrationPct": 49,
    "topHoldings": [
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 15858333,
        "value": 3996300000,
        "portfolioWeight": 10.38,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 10532034,
        "value": 3106950000,
        "portfolioWeight": 8.07,
        "changeStatus": "increased",
        "changePct": 9.7
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 10342797,
        "value": 2440900000,
        "portfolioWeight": 6.34,
        "changeStatus": "reduced",
        "changePct": -7.3
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 8841372,
        "value": 1998150000,
        "portfolioWeight": 5.19,
        "changeStatus": "reduced",
        "changePct": -4.5
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 2909590,
        "value": 1774850000,
        "portfolioWeight": 4.61,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 1699891,
        "value": 1555400000,
        "portfolioWeight": 4.04,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 3062299,
        "value": 1332100000,
        "portfolioWeight": 3.46,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 1879322,
        "value": 1108800000,
        "portfolioWeight": 2.88,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1785843,
        "value": 889350000,
        "portfolioWeight": 2.31,
        "changeStatus": "reduced",
        "changePct": -10.9
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 3600270,
        "value": 666050000,
        "portfolioWeight": 1.73,
        "changeStatus": "increased",
        "changePct": 10.7
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001595888",
    "description": "Quantitative trading powerhouse and premier ETF market maker trading equities, bonds, and derivatives globally.",
    "cityState": "New York, NY",
    "avatarInitials": "JS"
  },
  {
    "id": "ontario-teachers",
    "name": "Ontario Teachers' Pension Plan",
    "manager": "Jo Taylor",
    "cik": "0000937567",
    "category": "pension_sovereign",
    "portfolioValue": "$38 B",
    "portfolioValueNum": 38000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 276,
    "top10ConcentrationPct": 45,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 23982781,
        "value": 3621400000,
        "portfolioWeight": 9.53,
        "changeStatus": "increased",
        "changePct": 15
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 32741860,
        "value": 2815800000,
        "portfolioWeight": 7.41,
        "changeStatus": "reduced",
        "changePct": -12
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 5084138,
        "value": 2211600000,
        "portfolioWeight": 5.82,
        "changeStatus": "increased",
        "changePct": 8.7
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 10516279,
        "value": 1808800000,
        "portfolioWeight": 4.76,
        "changeStatus": "reduced",
        "changePct": -1.6
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 2641311,
        "value": 1611200000,
        "portfolioWeight": 4.24,
        "changeStatus": "increased",
        "changePct": 5.5
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 6238053,
        "value": 1409800000,
        "portfolioWeight": 3.71,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 2426506,
        "value": 1208400000,
        "portfolioWeight": 3.18,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 4772512,
        "value": 1007000000,
        "portfolioWeight": 2.65,
        "changeStatus": "new"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 6103030,
        "value": 805600000,
        "portfolioWeight": 2.12,
        "changeStatus": "increased",
        "changePct": 5.6
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 3301639,
        "value": 604200000,
        "portfolioWeight": 1.59,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000937567",
    "description": "Independent pension fund serving 340,000 active and retired teachers across Ontario.",
    "cityState": "Toronto, Canada",
    "avatarInitials": "OT"
  },
  {
    "id": "sanders-capital",
    "name": "Sanders Capital, LLC",
    "manager": "Lewis A. Sanders",
    "cik": "0001508097",
    "category": "asset_manager",
    "portfolioValue": "$36 B",
    "portfolioValueNum": 36000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 272,
    "top10ConcentrationPct": 44,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 22219868,
        "value": 3355200000,
        "portfolioWeight": 9.32,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 4278689,
        "value": 2610000000,
        "portfolioWeight": 7.25,
        "changeStatus": "increased",
        "changePct": 3.2
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 11909302,
        "value": 2048400000,
        "portfolioWeight": 5.69,
        "changeStatus": "increased",
        "changePct": 7.1
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 1833443,
        "value": 1677600000,
        "portfolioWeight": 4.66,
        "changeStatus": "increased",
        "changePct": 4.8
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 17330233,
        "value": 1490400000,
        "portfolioWeight": 4.14,
        "changeStatus": "increased",
        "changePct": 4.2
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 5171429,
        "value": 1303200000,
        "portfolioWeight": 3.62,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 4744068,
        "value": 1119600000,
        "portfolioWeight": 3.11,
        "changeStatus": "increased",
        "changePct": 12.1
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 5095082,
        "value": 932400000,
        "portfolioWeight": 2.59,
        "changeStatus": "increased",
        "changePct": 11.5
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 5645455,
        "value": 745200000,
        "portfolioWeight": 2.07,
        "changeStatus": "increased",
        "changePct": 2.8
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 626966,
        "value": 558000000,
        "portfolioWeight": 1.55,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001508097",
    "description": "Former AllianceBernstein CEO Lew Sanders applying quantitative discipline to fundamental valuation.",
    "cityState": "New York, NY",
    "avatarInitials": "SC"
  },
  {
    "id": "harding-loevner",
    "name": "Harding Loevner LP",
    "manager": "Ferrill Roll",
    "cik": "0000928196",
    "category": "asset_manager",
    "portfolioValue": "$34 B",
    "portfolioValueNum": 34000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 268,
    "top10ConcentrationPct": 43,
    "topHoldings": [
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 36016279,
        "value": 3097400000,
        "portfolioWeight": 9.11,
        "changeStatus": "increased",
        "changePct": 2.2
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 13011892,
        "value": 2407200000,
        "portfolioWeight": 7.08,
        "changeStatus": "increased",
        "changePct": 14.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 2124045,
        "value": 1890400000,
        "portfolioWeight": 5.56,
        "changeStatus": "new"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 8994186,
        "value": 1547000000,
        "portfolioWeight": 4.55,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 4441935,
        "value": 1377000000,
        "portfolioWeight": 4.05,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 4080000,
        "value": 1203600000,
        "portfolioWeight": 3.54,
        "changeStatus": "increased",
        "changePct": 10.3
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 6845033,
        "value": 1033600000,
        "portfolioWeight": 3.04,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 3413492,
        "value": 860200000,
        "portfolioWeight": 2.53,
        "changeStatus": "reduced",
        "changePct": -3.3
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 903684,
        "value": 686800000,
        "portfolioWeight": 2.02,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 2189831,
        "value": 516800000,
        "portfolioWeight": 1.52,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000928196",
    "description": "Global equity manager investing exclusively in high-quality, growing businesses with competitive moats.",
    "cityState": "Bridgewater, NJ",
    "avatarInitials": "HL"
  },
  {
    "id": "temasek-holdings",
    "name": "Temasek Holdings (Private) Limited",
    "manager": "Dilhan Pillay Sandrasegara",
    "cik": "0001021944",
    "category": "pension_sovereign",
    "portfolioValue": "$32 B",
    "portfolioValueNum": 32000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 264,
    "top10ConcentrationPct": 33,
    "topHoldings": [
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 2444590,
        "value": 2236800000,
        "portfolioWeight": 6.99,
        "changeStatus": "increased",
        "changePct": 7.1
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 9409730,
        "value": 1740800000,
        "portfolioWeight": 5.44,
        "changeStatus": "increased",
        "changePct": 9.8
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 5789831,
        "value": 1366400000,
        "portfolioWeight": 4.27,
        "changeStatus": "increased",
        "changePct": 6.3
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1254831,
        "value": 1116800000,
        "portfolioWeight": 3.49,
        "changeStatus": "increased",
        "changePct": 4.4
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 1686780,
        "value": 995200000,
        "portfolioWeight": 3.11,
        "changeStatus": "increased",
        "changePct": 4.8
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1145263,
        "value": 870400000,
        "portfolioWeight": 2.72,
        "changeStatus": "increased",
        "changePct": 2.9
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 1222295,
        "value": 745600000,
        "portfolioWeight": 2.33,
        "changeStatus": "increased",
        "changePct": 14.8
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 7218605,
        "value": 620800000,
        "portfolioWeight": 1.94,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 1255696,
        "value": 496000000,
        "portfolioWeight": 1.55,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 853333,
        "value": 371200000,
        "portfolioWeight": 1.16,
        "changeStatus": "increased",
        "changePct": 1.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001021944",
    "description": "Singapore state-owned commercial investment holding firm targeting global structural trends.",
    "cityState": "Singapore",
    "avatarInitials": "TH"
  },
  {
    "id": "viking-global",
    "name": "Viking Global Investors LP",
    "manager": "Andreas Halvorsen",
    "cik": "0001103804",
    "category": "hedge_fund",
    "portfolioValue": "$31.2 B",
    "portfolioValueNum": 31200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 262,
    "top10ConcentrationPct": 34,
    "topHoldings": [
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 4510843,
        "value": 2246400000,
        "portfolioWeight": 7.2,
        "changeStatus": "increased",
        "changePct": 15.8
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 9547541,
        "value": 1747200000,
        "portfolioWeight": 5.6,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1542472,
        "value": 1372800000,
        "portfolioWeight": 4.4,
        "changeStatus": "increased",
        "changePct": 14.4
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 3623226,
        "value": 1123200000,
        "portfolioWeight": 3.6,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 4230508,
        "value": 998400000,
        "portfolioWeight": 3.2,
        "changeStatus": "increased",
        "changePct": 9.3
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 1480678,
        "value": 873600000,
        "portfolioWeight": 2.8,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 818361,
        "value": 748800000,
        "portfolioWeight": 2.4,
        "changeStatus": "reduced",
        "changePct": -5.5
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 1579747,
        "value": 624000000,
        "portfolioWeight": 2,
        "changeStatus": "increased",
        "changePct": 13.8
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 2698378,
        "value": 499200000,
        "portfolioWeight": 1.6,
        "changeStatus": "reduced",
        "changePct": -3.6
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 613770,
        "value": 374400000,
        "portfolioWeight": 1.2,
        "changeStatus": "increased",
        "changePct": 3.7
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001103804",
    "description": "Tiger Cub long/short equity fund applying deep fundamental research across technology, healthcare, and industrials.",
    "cityState": "Greenwich, CT",
    "avatarInitials": "VG"
  },
  {
    "id": "marshall-wace",
    "name": "Marshall Wace LLP",
    "manager": "Paul Marshall & Ian Wace",
    "cik": "0001318757",
    "category": "hedge_fund",
    "portfolioValue": "$29.7 B",
    "portfolioValueNum": 29700000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 259,
    "top10ConcentrationPct": 36,
    "topHoldings": [
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 7671661,
        "value": 2263140000,
        "portfolioWeight": 7.62,
        "changeStatus": "increased",
        "changePct": 13.5
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 7792965,
        "value": 1761210000,
        "portfolioWeight": 5.93,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1821079,
        "value": 1384020000,
        "portfolioWeight": 4.66,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 2601310,
        "value": 1131570000,
        "portfolioWeight": 3.81,
        "changeStatus": "increased",
        "changePct": 8.3
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 11707326,
        "value": 1006830000,
        "portfolioWeight": 3.39,
        "changeStatus": "reduced",
        "changePct": -8
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 1441180,
        "value": 879120000,
        "portfolioWeight": 2.96,
        "changeStatus": "increased",
        "changePct": 8.1
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 1909823,
        "value": 754380000,
        "portfolioWeight": 2.54,
        "changeStatus": "increased",
        "changePct": 1.6
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 2667966,
        "value": 629640000,
        "portfolioWeight": 2.12,
        "changeStatus": "increased",
        "changePct": 10.7
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 2713135,
        "value": 501930000,
        "portfolioWeight": 1.69,
        "changeStatus": "new"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 2192965,
        "value": 377190000,
        "portfolioWeight": 1.27,
        "changeStatus": "increased",
        "changePct": 4.3
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001318757",
    "description": "European hedge fund pioneer running TOPS (Trade Optimised Portfolio System) systematic alpha generation.",
    "cityState": "London, UK",
    "avatarInitials": "MW"
  },
  {
    "id": "coatue-management",
    "name": "Coatue Management LLC",
    "manager": "Philippe Laffont",
    "cik": "0001135730",
    "category": "tech_growth",
    "portfolioValue": "$28.4 B",
    "portfolioValueNum": 28400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 257,
    "top10ConcentrationPct": 47,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 18713907,
        "value": 2825800000,
        "portfolioWeight": 9.95,
        "changeStatus": "increased",
        "changePct": 7.9
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 2892316,
        "value": 2198160000,
        "portfolioWeight": 7.74,
        "changeStatus": "new"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 5853288,
        "value": 1726720000,
        "portfolioWeight": 6.08,
        "changeStatus": "increased",
        "changePct": 10.3
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 2397153,
        "value": 1414320000,
        "portfolioWeight": 4.98,
        "changeStatus": "increased",
        "changePct": 12.3
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 4981270,
        "value": 1255280000,
        "portfolioWeight": 4.42,
        "changeStatus": "reduced",
        "changePct": -5.6
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 3545419,
        "value": 1099080000,
        "portfolioWeight": 3.87,
        "changeStatus": "reduced",
        "changePct": -3.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 4468626,
        "value": 942880000,
        "portfolioWeight": 3.32,
        "changeStatus": "reduced",
        "changePct": -4
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 1801931,
        "value": 783840000,
        "portfolioWeight": 2.76,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 3392649,
        "value": 627640000,
        "portfolioWeight": 2.21,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 2086018,
        "value": 471440000,
        "portfolioWeight": 1.66,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001135730",
    "description": "Premier technology-focused investment manager founded by Tiger Cub Philippe Laffont.",
    "cityState": "New York, NY",
    "avatarInitials": "CM"
  },
  {
    "id": "polen-capital",
    "name": "Polen Capital Management, LLC",
    "manager": "Dan Davidowitz",
    "cik": "0001034524",
    "category": "asset_manager",
    "portfolioValue": "$28 B",
    "portfolioValueNum": 28000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 256,
    "top10ConcentrationPct": 30,
    "topHoldings": [
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 4501266,
        "value": 1778000000,
        "portfolioWeight": 6.35,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 8041860,
        "value": 1383200000,
        "portfolioWeight": 4.94,
        "changeStatus": "reduced",
        "changePct": -11.8
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 3682712,
        "value": 1086400000,
        "portfolioWeight": 3.88,
        "changeStatus": "increased",
        "changePct": 4.5
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 4812973,
        "value": 890400000,
        "portfolioWeight": 3.18,
        "changeStatus": "reduced",
        "changePct": -2.3
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 1815172,
        "value": 789600000,
        "portfolioWeight": 2.82,
        "changeStatus": "new"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 4580132,
        "value": 691600000,
        "portfolioWeight": 2.47,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 666966,
        "value": 593600000,
        "portfolioWeight": 2.12,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 989558,
        "value": 492800000,
        "portfolioWeight": 1.76,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 1871090,
        "value": 394800000,
        "portfolioWeight": 1.41,
        "changeStatus": "new"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 324372,
        "value": 296800000,
        "portfolioWeight": 1.06,
        "changeStatus": "increased",
        "changePct": 12.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001034524",
    "description": "Ultra-concentrated Focus Growth manager owning only 20-25 high-ROE secular market champions.",
    "cityState": "Boca Raton, FL",
    "avatarInitials": "PC"
  },
  {
    "id": "balyasny-asset-mgmt",
    "name": "Balyasny Asset Management L.P.",
    "manager": "Dmitry Balyasny",
    "cik": "0001218710",
    "category": "hedge_fund",
    "portfolioValue": "$26.4 B",
    "portfolioValueNum": 26400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 253,
    "top10ConcentrationPct": 38,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 2387865,
        "value": 2125200000,
        "portfolioWeight": 8.05,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 12520000,
        "value": 1652640000,
        "portfolioWeight": 6.26,
        "changeStatus": "reduced",
        "changePct": -8.8
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 2985931,
        "value": 1298880000,
        "portfolioWeight": 4.92,
        "changeStatus": "increased",
        "changePct": 3.3
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 6170233,
        "value": 1061280000,
        "portfolioWeight": 4.02,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 4004746,
        "value": 945120000,
        "portfolioWeight": 3.58,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1659277,
        "value": 826320000,
        "portfolioWeight": 3.13,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 930947,
        "value": 707520000,
        "portfolioWeight": 2.68,
        "changeStatus": "increased",
        "changePct": 8.2
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 2346667,
        "value": 591360000,
        "portfolioWeight": 2.24,
        "changeStatus": "increased",
        "changePct": 13
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 1601898,
        "value": 472560000,
        "portfolioWeight": 1.79,
        "changeStatus": "increased",
        "changePct": 2.3
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 599593,
        "value": 353760000,
        "portfolioWeight": 1.34,
        "changeStatus": "increased",
        "changePct": 14.7
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001218710",
    "description": "Global multi-strategy investment firm running long/short equity, commodities, and macro pods.",
    "cityState": "Chicago, IL",
    "avatarInitials": "BA"
  },
  {
    "id": "alaska-permanent",
    "name": "Alaska Permanent Fund Corporation",
    "manager": "Deven Mitchell",
    "cik": "0001582681",
    "category": "pension_sovereign",
    "portfolioValue": "$22 B",
    "portfolioValueNum": 22000000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 244,
    "top10ConcentrationPct": 45,
    "topHoldings": [
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 4819770,
        "value": 2096600000,
        "portfolioWeight": 9.53,
        "changeStatus": "reduced",
        "changePct": -12.8
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 7726066,
        "value": 1630200000,
        "portfolioWeight": 7.41,
        "changeStatus": "new"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 2571084,
        "value": 1280400000,
        "portfolioWeight": 5.82,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 6935099,
        "value": 1047200000,
        "portfolioWeight": 4.76,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1048090,
        "value": 932800000,
        "portfolioWeight": 4.24,
        "changeStatus": "new"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 2766780,
        "value": 816200000,
        "portfolioWeight": 3.71,
        "changeStatus": "increased",
        "changePct": 11.7
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 3822951,
        "value": 699600000,
        "portfolioWeight": 3.18,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 955738,
        "value": 583000000,
        "portfolioWeight": 2.65,
        "changeStatus": "increased",
        "changePct": 15.2
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 3533333,
        "value": 466400000,
        "portfolioWeight": 2.12,
        "changeStatus": "increased",
        "changePct": 2
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 885570,
        "value": 349800000,
        "portfolioWeight": 1.59,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001582681",
    "description": "State-owned constitutionally created fund converting non-renewable oil revenues into permanent investments.",
    "cityState": "Juneau, AK",
    "avatarInitials": "AP"
  },
  {
    "id": "bridgewater-associates",
    "name": "Bridgewater Associates, LP",
    "manager": "Ray Dalio & Bob Prince",
    "cik": "0001350694",
    "category": "hedge_fund",
    "portfolioValue": "$21.5 B",
    "portfolioValueNum": 21500000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-13",
    "holdingsCount": 785,
    "top10ConcentrationPct": 35.6,
    "cityState": "Westport, CT",
    "avatarInitials": "BW",
    "description": "The world's largest macro hedge fund, famous for its All Weather risk parity framework, Pure Alpha strategies, and systematic economic cycle modeling.",
    "topHoldings": [
      {
        "ticker": "SPY",
        "name": "SPDR S&P 500 ETF Trust",
        "shares": 2450000,
        "value": 1420000000,
        "portfolioWeight": 6.6,
        "changeStatus": "increased",
        "changePct": 11.2
      },
      {
        "ticker": "IVV",
        "name": "iShares Core S&P 500 ETF",
        "shares": 2100000,
        "value": 1220000000,
        "portfolioWeight": 5.67,
        "changeStatus": "increased",
        "changePct": 8.5
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc.",
        "shares": 5200000,
        "value": 965000000,
        "portfolioWeight": 4.49,
        "changeStatus": "increased",
        "changePct": 14.8
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 6800000,
        "value": 901000000,
        "portfolioWeight": 4.19,
        "changeStatus": "reduced",
        "changePct": -18.2
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 1350000,
        "value": 823500000,
        "portfolioWeight": 3.83,
        "changeStatus": "reduced",
        "changePct": -5.4
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 1850000,
        "value": 805000000,
        "portfolioWeight": 3.74,
        "changeStatus": "reduced",
        "changePct": -8.1
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 3600000,
        "value": 760000000,
        "portfolioWeight": 3.53,
        "changeStatus": "increased",
        "changePct": 6.4
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 2900000,
        "value": 684400000,
        "portfolioWeight": 3.18,
        "changeStatus": "increased",
        "changePct": 4.2
      },
      {
        "ticker": "VWO",
        "name": "Vanguard Emerging Markets ETF",
        "shares": 12500000,
        "value": 587500000,
        "portfolioWeight": 2.73,
        "changeStatus": "increased",
        "changePct": 12
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 2800000,
        "value": 476000000,
        "portfolioWeight": 2.21,
        "changeStatus": "reduced",
        "changePct": -7.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001350694"
  },
  {
    "id": "elliott-investment",
    "name": "Elliott Investment Management L.P.",
    "manager": "Paul Singer",
    "cik": "0001791786",
    "category": "activist",
    "portfolioValue": "$21.4 B",
    "portfolioValueNum": 21400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 243,
    "top10ConcentrationPct": 33,
    "topHoldings": [
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 7089384,
        "value": 1495860000,
        "portfolioWeight": 6.99,
        "changeStatus": "reduced",
        "changePct": -1.4
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 2676230,
        "value": 1164160000,
        "portfolioWeight": 5.44,
        "changeStatus": "reduced",
        "changePct": -1.5
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 3626111,
        "value": 913780000,
        "portfolioWeight": 4.27,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 1265864,
        "value": 746860000,
        "portfolioWeight": 3.49,
        "changeStatus": "reduced",
        "changePct": -8.3
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 2146903,
        "value": 665540000,
        "portfolioWeight": 3.11,
        "changeStatus": "increased",
        "changePct": 1
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 3854834,
        "value": 582080000,
        "portfolioWeight": 2.72,
        "changeStatus": "new"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 2898953,
        "value": 498620000,
        "portfolioWeight": 2.33,
        "changeStatus": "reduced",
        "changePct": -10.9
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 4827442,
        "value": 415160000,
        "portfolioWeight": 1.94,
        "changeStatus": "increased",
        "changePct": 8.4
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 436447,
        "value": 331700000,
        "portfolioWeight": 1.55,
        "changeStatus": "reduced",
        "changePct": -10.4
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 1356503,
        "value": 248240000,
        "portfolioWeight": 1.16,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001791786",
    "description": "Paul Singer's multi-strategy activist manager with half a century of active corporate and sovereign restructurings.",
    "cityState": "West Palm Beach, FL",
    "avatarInitials": "EI"
  },
  {
    "id": "hudson-river-trading",
    "name": "Hudson River Trading LLC",
    "manager": "Alex Gerko",
    "cik": "0001475597",
    "category": "hedge_fund",
    "portfolioValue": "$18.2 B",
    "portfolioValueNum": 18200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 236,
    "top10ConcentrationPct": 36,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 1558247,
        "value": 1386840000,
        "portfolioWeight": 7.62,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 2167189,
        "value": 1079260000,
        "portfolioWeight": 5.93,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 1437492,
        "value": 848120000,
        "portfolioWeight": 4.66,
        "changeStatus": "increased",
        "changePct": 1.9
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 4592185,
        "value": 693420000,
        "portfolioWeight": 3.81,
        "changeStatus": "reduced",
        "changePct": -10.6
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 2730000,
        "value": 616980000,
        "portfolioWeight": 3.39,
        "changeStatus": "new"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 2943825,
        "value": 538720000,
        "portfolioWeight": 2.96,
        "changeStatus": "increased",
        "changePct": 12.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 1062713,
        "value": 462280000,
        "portfolioWeight": 2.54,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 2923030,
        "value": 385840000,
        "portfolioWeight": 2.12,
        "changeStatus": "reduced",
        "changePct": -6.8
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1662595,
        "value": 307580000,
        "portfolioWeight": 1.69,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 252612,
        "value": 231140000,
        "portfolioWeight": 1.27,
        "changeStatus": "increased",
        "changePct": 6.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001475597",
    "description": "Algorithmic multi-asset quantitative trading firm operating across global public financial exchanges.",
    "cityState": "New York, NY",
    "avatarInitials": "HR"
  },
  {
    "id": "exoduspoint-capital",
    "name": "ExodusPoint Capital Management",
    "manager": "Michael Gelband",
    "cik": "0001736225",
    "category": "hedge_fund",
    "portfolioValue": "$16.8 B",
    "portfolioValueNum": 16800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 234,
    "top10ConcentrationPct": 25,
    "topHoldings": [
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 3765763,
        "value": 888720000,
        "portfolioWeight": 5.29,
        "changeStatus": "reduced",
        "changePct": -4.1
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 910737,
        "value": 692160000,
        "portfolioWeight": 4.12,
        "changeStatus": "increased",
        "changePct": 7.2
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 2974426,
        "value": 544320000,
        "portfolioWeight": 3.24,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 2588372,
        "value": 445200000,
        "portfolioWeight": 2.65,
        "changeStatus": "increased",
        "changePct": 13.4
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 431475,
        "value": 394800000,
        "portfolioWeight": 2.35,
        "changeStatus": "increased",
        "changePct": 12.2
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 1373333,
        "value": 346080000,
        "portfolioWeight": 2.06,
        "changeStatus": "increased",
        "changePct": 11.1
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 1308319,
        "value": 295680000,
        "portfolioWeight": 1.76,
        "changeStatus": "new"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 625215,
        "value": 246960000,
        "portfolioWeight": 1.47,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 672000,
        "value": 198240000,
        "portfolioWeight": 1.18,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 1120000,
        "value": 147840000,
        "portfolioWeight": 0.88,
        "changeStatus": "reduced",
        "changePct": -5.7
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001736225",
    "description": "Multi-manager hedge fund founded by former Lehman and Millennium bond chief Michael Gelband.",
    "cityState": "New York, NY",
    "avatarInitials": "EC"
  },
  {
    "id": "tiger-global-mgmt",
    "name": "Tiger Global Management LLC",
    "manager": "Chase Coleman",
    "cik": "0001167483",
    "category": "tech_growth",
    "portfolioValue": "$16.5 B",
    "portfolioValueNum": 16500000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 233,
    "top10ConcentrationPct": 35,
    "topHoldings": [
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 7108430,
        "value": 1222650000,
        "portfolioWeight": 7.41,
        "changeStatus": "new"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 3065806,
        "value": 950400000,
        "portfolioWeight": 5.76,
        "changeStatus": "new"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 3307301,
        "value": 747450000,
        "portfolioWeight": 4.53,
        "changeStatus": "increased",
        "changePct": 11.8
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 1549747,
        "value": 612150000,
        "portfolioWeight": 3.71,
        "changeStatus": "increased",
        "changePct": 2.8
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 609944,
        "value": 542850000,
        "portfolioWeight": 3.29,
        "changeStatus": "increased",
        "changePct": 14.4
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 2596721,
        "value": 475200000,
        "portfolioWeight": 2.88,
        "changeStatus": "increased",
        "changePct": 10.6
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 536250,
        "value": 407550000,
        "portfolioWeight": 2.47,
        "changeStatus": "new"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 682530,
        "value": 339900000,
        "portfolioWeight": 2.06,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 3165698,
        "value": 272250000,
        "portfolioWeight": 1.65,
        "changeStatus": "reduced",
        "changePct": -1.8
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 969668,
        "value": 204600000,
        "portfolioWeight": 1.24,
        "changeStatus": "reduced",
        "changePct": -7.6
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001167483",
    "description": "Julian Robertson 'Tiger Cub' fund investing in global internet, software, and consumer tech leaders.",
    "cityState": "New York, NY",
    "avatarInitials": "TG"
  },
  {
    "id": "schonfeld-strategic",
    "name": "Schonfeld Strategic Advisors LLC",
    "manager": "Steven Schonfeld",
    "cik": "0001665241",
    "category": "hedge_fund",
    "portfolioValue": "$14.5 B",
    "portfolioValueNum": 14500000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 229,
    "top10ConcentrationPct": 37,
    "topHoldings": [
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 2877975,
        "value": 1136800000,
        "portfolioWeight": 7.84,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1161908,
        "value": 883050000,
        "portfolioWeight": 6.09,
        "changeStatus": "reduced",
        "changePct": -10.9
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 2240484,
        "value": 694550000,
        "portfolioWeight": 4.79,
        "changeStatus": "reduced",
        "changePct": -9.4
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 2255556,
        "value": 568400000,
        "portfolioWeight": 3.92,
        "changeStatus": "increased",
        "changePct": 7.6
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 2757377,
        "value": 504600000,
        "portfolioWeight": 3.48,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 749576,
        "value": 442250000,
        "portfolioWeight": 3.05,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 425225,
        "value": 378450000,
        "portfolioWeight": 2.61,
        "changeStatus": "increased",
        "changePct": 13.9
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 3675581,
        "value": 316100000,
        "portfolioWeight": 2.18,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 413607,
        "value": 252300000,
        "portfolioWeight": 1.74,
        "changeStatus": "increased",
        "changePct": 15.1
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 840487,
        "value": 189950000,
        "portfolioWeight": 1.31,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001665241",
    "description": "Multi-strategy firm managing quantitative equity, fundamental equity, and tactical trading strategies.",
    "cityState": "New York, NY",
    "avatarInitials": "SS"
  },
  {
    "id": "ark-investment-mgmt",
    "name": "ARK Investment Management LLC",
    "manager": "Cathie Wood",
    "cik": "0001697748",
    "category": "tech_growth",
    "portfolioValue": "$14.2 B",
    "portfolioValueNum": 14200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 185,
    "top10ConcentrationPct": 54.8,
    "cityState": "St. Petersburg, FL",
    "avatarInitials": "ARK",
    "description": "Cathie Wood's thematic innovation fund house focusing exclusively on disruptive technologies: AI robotics, genomics, energy storage, blockchain, and autonomous transit.",
    "topHoldings": [
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 4800000,
        "value": 1210000000,
        "portfolioWeight": 8.52,
        "changeStatus": "reduced",
        "changePct": -6.2
      },
      {
        "ticker": "COIN",
        "name": "Coinbase Global Inc.",
        "shares": 4200000,
        "value": 945000000,
        "portfolioWeight": 6.65,
        "changeStatus": "reduced",
        "changePct": -8
      },
      {
        "ticker": "ROKU",
        "name": "Roku Inc.",
        "shares": 9800000,
        "value": 812000000,
        "portfolioWeight": 5.72,
        "changeStatus": "increased",
        "changePct": 4.5
      },
      {
        "ticker": "PLTR",
        "name": "Palantir Technologies",
        "shares": 18000000,
        "value": 756000000,
        "portfolioWeight": 5.32,
        "changeStatus": "reduced",
        "changePct": -12.4
      },
      {
        "ticker": "SQ",
        "name": "Block Inc.",
        "shares": 8400000,
        "value": 688000000,
        "portfolioWeight": 4.85,
        "changeStatus": "increased",
        "changePct": 5.8
      },
      {
        "ticker": "CRSP",
        "name": "CRISPR Therapeutics",
        "shares": 9200000,
        "value": 552000000,
        "portfolioWeight": 3.89,
        "changeStatus": "increased",
        "changePct": 8.2
      },
      {
        "ticker": "SHOP",
        "name": "Shopify Inc.",
        "shares": 6200000,
        "value": 527000000,
        "portfolioWeight": 3.71,
        "changeStatus": "increased",
        "changePct": 3.1
      },
      {
        "ticker": "HOOD",
        "name": "Robinhood Markets",
        "shares": 18500000,
        "value": 499000000,
        "portfolioWeight": 3.51,
        "changeStatus": "reduced",
        "changePct": -4
      },
      {
        "ticker": "PATH",
        "name": "UiPath Inc.",
        "shares": 28000000,
        "value": 392000000,
        "portfolioWeight": 2.76,
        "changeStatus": "increased",
        "changePct": 6
      },
      {
        "ticker": "RKLB",
        "name": "Rocket Lab USA",
        "shares": 22000000,
        "value": 385000000,
        "portfolioWeight": 2.71,
        "changeStatus": "increased",
        "changePct": 24.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001697748"
  },
  {
    "id": "pershing-square",
    "name": "Pershing Square Capital Management",
    "manager": "Bill Ackman",
    "cik": "0001336528",
    "category": "activist",
    "portfolioValue": "$12.8 B",
    "portfolioValueNum": 12800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 8,
    "top10ConcentrationPct": 100,
    "cityState": "New York, NY",
    "avatarInitials": "PS",
    "description": "Bill Ackman's high-conviction activist investment firm targeting high-barrier-to-entry, cash-generative compounding franchises with catalyst potential.",
    "topHoldings": [
      {
        "ticker": "QSR",
        "name": "Restaurant Brands International",
        "shares": 23114000,
        "value": 2080000000,
        "portfolioWeight": 16.25,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HLT",
        "name": "Hilton Worldwide Holdings",
        "shares": 8950000,
        "value": 2013000000,
        "portfolioWeight": 15.73,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 9850000,
        "value": 1827000000,
        "portfolioWeight": 14.27,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CMG",
        "name": "Chipotle Mexican Grill",
        "shares": 28500000,
        "value": 1653000000,
        "portfolioWeight": 12.91,
        "changeStatus": "reduced",
        "changePct": -18.5
      },
      {
        "ticker": "GOOG",
        "name": "Alphabet Inc. (Class C)",
        "shares": 8400000,
        "value": 1562000000,
        "portfolioWeight": 12.2,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CP",
        "name": "Canadian Pacific Kansas City",
        "shares": 14800000,
        "value": 1391000000,
        "portfolioWeight": 10.87,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "BMRN",
        "name": "BioMarin Pharmaceutical",
        "shares": 18200000,
        "value": 1201000000,
        "portfolioWeight": 9.38,
        "changeStatus": "new"
      },
      {
        "ticker": "SEIK",
        "name": "Seikei Partners",
        "shares": 8500000,
        "value": 1073000000,
        "portfolioWeight": 8.38,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001336528"
  },
  {
    "id": "jump-trading",
    "name": "Jump Trading LLC",
    "manager": "Bill DiSomma",
    "cik": "0001831577",
    "category": "hedge_fund",
    "portfolioValue": "$12.4 B",
    "portfolioValueNum": 12400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 225,
    "top10ConcentrationPct": 48,
    "topHoldings": [
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 5970806,
        "value": 1259840000,
        "portfolioWeight": 10.16,
        "changeStatus": "reduced",
        "changePct": -5.9
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 4340000,
        "value": 980840000,
        "portfolioWeight": 7.91,
        "changeStatus": "reduced",
        "changePct": -5.7
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 1949468,
        "value": 770040000,
        "portfolioWeight": 6.21,
        "changeStatus": "increased",
        "changePct": 15.4
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1264900,
        "value": 629920000,
        "portfolioWeight": 5.08,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 1899932,
        "value": 560480000,
        "portfolioWeight": 4.52,
        "changeStatus": "increased",
        "changePct": 15.6
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 5695349,
        "value": 489800000,
        "portfolioWeight": 3.95,
        "changeStatus": "reduced",
        "changePct": -10.7
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 1781186,
        "value": 420360000,
        "portfolioWeight": 3.39,
        "changeStatus": "increased",
        "changePct": 1.5
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 392899,
        "value": 349680000,
        "portfolioWeight": 2.82,
        "changeStatus": "reduced",
        "changePct": -1.9
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1514811,
        "value": 280240000,
        "portfolioWeight": 2.26,
        "changeStatus": "increased",
        "changePct": 4
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 831587,
        "value": 209560000,
        "portfolioWeight": 1.69,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001831577",
    "description": "Proprietary research and algorithmic quantitative market maker in equities, futures, options, and FX (filing as Jump Financial, LLC).",
    "cityState": "Chicago, IL",
    "avatarInitials": "JT"
  },
  {
    "id": "lone-pine-capital",
    "name": "Lone Pine Capital LLC",
    "manager": "Stephen Mandel",
    "cik": "0001061165",
    "category": "tech_growth",
    "portfolioValue": "$12.3 B",
    "portfolioValueNum": 12300000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 225,
    "top10ConcentrationPct": 38,
    "topHoldings": [
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 1302829,
        "value": 990150000,
        "portfolioWeight": 8.05,
        "changeStatus": "new"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 4162054,
        "value": 769980000,
        "portfolioWeight": 6.26,
        "changeStatus": "increased",
        "changePct": 3.6
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 992066,
        "value": 605160000,
        "portfolioWeight": 4.92,
        "changeStatus": "reduced",
        "changePct": -10
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 2343412,
        "value": 494460000,
        "portfolioWeight": 4.02,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 1114785,
        "value": 440340000,
        "portfolioWeight": 3.58,
        "changeStatus": "reduced",
        "changePct": -4.3
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 2103770,
        "value": 384990000,
        "portfolioWeight": 3.13,
        "changeStatus": "reduced",
        "changePct": -10.1
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 2497273,
        "value": 329640000,
        "portfolioWeight": 2.68,
        "changeStatus": "increased",
        "changePct": 7.8
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 933966,
        "value": 275520000,
        "portfolioWeight": 2.24,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 247382,
        "value": 220170000,
        "portfolioWeight": 1.79,
        "changeStatus": "reduced",
        "changePct": -1.5
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 378897,
        "value": 164820000,
        "portfolioWeight": 1.34,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001061165",
    "description": "Tiger Cub fund founded by Steve Mandel, emphasizing secular earnings power and durable free cash flow.",
    "cityState": "Greenwich, CT",
    "avatarInitials": "LP"
  },
  {
    "id": "icahn-enterprises",
    "name": "Icahn Enterprises L.P.",
    "manager": "Carl Icahn",
    "cik": "0000921669",
    "category": "activist",
    "portfolioValue": "$11.5 B",
    "portfolioValueNum": 11500000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 223,
    "top10ConcentrationPct": 32,
    "topHoldings": [
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 4214595,
        "value": 779700000,
        "portfolioWeight": 6.78,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 1216968,
        "value": 606050000,
        "portfolioWeight": 5.27,
        "changeStatus": "increased",
        "changePct": 1.5
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 3606818,
        "value": 476100000,
        "portfolioWeight": 4.14,
        "changeStatus": "increased",
        "changePct": 9.1
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 512961,
        "value": 389850000,
        "portfolioWeight": 3.39,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 1531637,
        "value": 346150000,
        "portfolioWeight": 3.01,
        "changeStatus": "increased",
        "changePct": 8.9
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 1204762,
        "value": 303600000,
        "portfolioWeight": 2.64,
        "changeStatus": "new"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 838387,
        "value": 259900000,
        "portfolioWeight": 2.26,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 497011,
        "value": 216200000,
        "portfolioWeight": 1.88,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 948907,
        "value": 173650000,
        "portfolioWeight": 1.51,
        "changeStatus": "reduced",
        "changePct": -6.8
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 755523,
        "value": 129950000,
        "portfolioWeight": 1.13,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000921669",
    "description": "Iconic Wall Street activist pioneer seeking board representation to unlock shareholder equity value.",
    "cityState": "Sunny Isles Beach, FL",
    "avatarInitials": "IE"
  },
  {
    "id": "d1-capital-partners",
    "name": "D1 Capital Partners L.P.",
    "manager": "Daniel Sundheim",
    "cik": "0001747057",
    "category": "hedge_fund",
    "portfolioValue": "$10.9 B",
    "portfolioValueNum": 10900000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 222,
    "top10ConcentrationPct": 46,
    "topHoldings": [
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 4697611,
        "value": 1061660000,
        "portfolioWeight": 9.74,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 2800746,
        "value": 826220000,
        "portfolioWeight": 7.58,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 2092097,
        "value": 648550000,
        "portfolioWeight": 5.95,
        "changeStatus": "increased",
        "changePct": 11.7
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 596438,
        "value": 530830000,
        "portfolioWeight": 4.87,
        "changeStatus": "increased",
        "changePct": 10
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 2551189,
        "value": 471970000,
        "portfolioWeight": 4.33,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 1957867,
        "value": 413110000,
        "portfolioWeight": 3.79,
        "changeStatus": "increased",
        "changePct": 12.9
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 711345,
        "value": 354250000,
        "portfolioWeight": 3.25,
        "changeStatus": "reduced",
        "changePct": -7.8
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 1251653,
        "value": 295390000,
        "portfolioWeight": 2.71,
        "changeStatus": "increased",
        "changePct": 7.9
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 1286557,
        "value": 235440000,
        "portfolioWeight": 2.16,
        "changeStatus": "increased",
        "changePct": 14.9
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 405931,
        "value": 176580000,
        "portfolioWeight": 1.62,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001747057",
    "description": "Dan Sundheim's crossover fund investing in public and private tech, telecom, consumer, and industrials.",
    "cityState": "New York, NY",
    "avatarInitials": "DC"
  },
  {
    "id": "markel-group",
    "name": "Markel Group Inc.",
    "manager": "Tom Gayner",
    "cik": "0001096343",
    "category": "family_office",
    "portfolioValue": "$9.8 B",
    "portfolioValueNum": 9800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 220,
    "top10ConcentrationPct": 41,
    "topHoldings": [
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 4598054,
        "value": 850640000,
        "portfolioWeight": 8.68,
        "changeStatus": "increased",
        "changePct": 13.9
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 1520690,
        "value": 661500000,
        "portfolioWeight": 6.75,
        "changeStatus": "increased",
        "changePct": 5.9
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 2466256,
        "value": 520380000,
        "portfolioWeight": 5.31,
        "changeStatus": "increased",
        "changePct": 13.6
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 2324153,
        "value": 425320000,
        "portfolioWeight": 4.34,
        "changeStatus": "reduced",
        "changePct": -12.8
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 620131,
        "value": 378280000,
        "portfolioWeight": 3.86,
        "changeStatus": "reduced",
        "changePct": -5.1
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 2193642,
        "value": 331240000,
        "portfolioWeight": 3.38,
        "changeStatus": "increased",
        "changePct": 4.3
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 309530,
        "value": 283220000,
        "portfolioWeight": 2.89,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 265371,
        "value": 236180000,
        "portfolioWeight": 2.41,
        "changeStatus": "increased",
        "changePct": 14.6
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 836903,
        "value": 189140000,
        "portfolioWeight": 1.93,
        "changeStatus": "reduced",
        "changePct": -2
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 826163,
        "value": 142100000,
        "portfolioWeight": 1.45,
        "changeStatus": "increased",
        "changePct": 6.3
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001096343",
    "description": "'Baby Berkshire' specialty insurer reinvesting underwriting float into high-return equity compounders.",
    "cityState": "Richmond, VA",
    "avatarInitials": "MG"
  },
  {
    "id": "valueact-capital",
    "name": "ValueAct Capital Management",
    "manager": "Mason Morfit",
    "cik": "0001418814",
    "category": "activist",
    "portfolioValue": "$8.9 B",
    "portfolioValueNum": 8900000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 218,
    "top10ConcentrationPct": 31,
    "topHoldings": [
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 3155892,
        "value": 583840000,
        "portfolioWeight": 6.56,
        "changeStatus": "reduced",
        "changePct": -3.2
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 2644128,
        "value": 454790000,
        "portfolioWeight": 5.11,
        "changeStatus": "increased",
        "changePct": 1.3
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 1950219,
        "value": 356890000,
        "portfolioWeight": 4.01,
        "changeStatus": "increased",
        "changePct": 11.8
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 384105,
        "value": 291920000,
        "portfolioWeight": 3.28,
        "changeStatus": "increased",
        "changePct": 3.8
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 838323,
        "value": 259880000,
        "portfolioWeight": 2.92,
        "changeStatus": "increased",
        "changePct": 1.8
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 1004204,
        "value": 226950000,
        "portfolioWeight": 2.55,
        "changeStatus": "new"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 1290795,
        "value": 194910000,
        "portfolioWeight": 2.19,
        "changeStatus": "increased",
        "changePct": 11.4
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 1227121,
        "value": 161980000,
        "portfolioWeight": 1.82,
        "changeStatus": "reduced",
        "changePct": -12
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 142011,
        "value": 129940000,
        "portfolioWeight": 1.46,
        "changeStatus": "reduced",
        "changePct": -10.5
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 411059,
        "value": 97010000,
        "portfolioWeight": 1.09,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001418814",
    "description": "Constructive activist investor working collaboratively with boards on strategic technology transitions.",
    "cityState": "San Francisco, CA",
    "avatarInitials": "VC"
  },
  {
    "id": "durable-capital",
    "name": "Durable Capital Partners LP",
    "manager": "Henry Ellenbogen",
    "cik": "0001798849",
    "category": "tech_growth",
    "portfolioValue": "$8.4 B",
    "portfolioValueNum": 8400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 217,
    "top10ConcentrationPct": 36,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 4238940,
        "value": 640080000,
        "portfolioWeight": 7.62,
        "changeStatus": "reduced",
        "changePct": -3.5
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 2360758,
        "value": 498120000,
        "portfolioWeight": 5.93,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 439820,
        "value": 391440000,
        "portfolioWeight": 4.66,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 542441,
        "value": 320040000,
        "portfolioWeight": 3.81,
        "changeStatus": "new"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 1556066,
        "value": 284760000,
        "portfolioWeight": 3.39,
        "changeStatus": "increased",
        "changePct": 4.7
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 1100177,
        "value": 248640000,
        "portfolioWeight": 2.96,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 233180,
        "value": 213360000,
        "portfolioWeight": 2.54,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 1349091,
        "value": 178080000,
        "portfolioWeight": 2.12,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 601525,
        "value": 141960000,
        "portfolioWeight": 1.69,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 140368,
        "value": 106680000,
        "portfolioWeight": 1.27,
        "changeStatus": "increased",
        "changePct": 7.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001798849",
    "description": "Former T. Rowe Price New Horizons manager Henry Ellenbogen investing in small-to-mid cap compounders.",
    "cityState": "Chevy Chase, MD",
    "avatarInitials": "DC"
  },
  {
    "id": "third-point-llc",
    "name": "Third Point LLC",
    "manager": "Daniel S. Loeb",
    "cik": "0001040273",
    "category": "activist",
    "portfolioValue": "$7.9 B",
    "portfolioValueNum": 7900000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 216,
    "top10ConcentrationPct": 46,
    "topHoldings": [
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 1261410,
        "value": 769460000,
        "portfolioWeight": 9.74,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 6963023,
        "value": 598820000,
        "portfolioWeight": 7.58,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 1865278,
        "value": 470050000,
        "portfolioWeight": 5.95,
        "changeStatus": "increased",
        "changePct": 6.6
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 1241065,
        "value": 384730000,
        "portfolioWeight": 4.87,
        "changeStatus": "reduced",
        "changePct": -12.1
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 450092,
        "value": 342070000,
        "portfolioWeight": 4.33,
        "changeStatus": "increased",
        "changePct": 1.6
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1618432,
        "value": 299410000,
        "portfolioWeight": 3.79,
        "changeStatus": "increased",
        "changePct": 13.7
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 515562,
        "value": 256750000,
        "portfolioWeight": 3.25,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 1014645,
        "value": 214090000,
        "portfolioWeight": 2.71,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 992093,
        "value": 170640000,
        "portfolioWeight": 2.16,
        "changeStatus": "reduced",
        "changePct": -11.1
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 324000,
        "value": 127980000,
        "portfolioWeight": 1.62,
        "changeStatus": "increased",
        "changePct": 2.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001040273",
    "description": "Dan Loeb's event-driven activist hedge fund targeting corporate spinoffs, capital returns, and governance fixes.",
    "cityState": "New York, NY",
    "avatarInitials": "TP"
  },
  {
    "id": "fairfax-financial",
    "name": "Fairfax Financial Holdings Ltd",
    "manager": "Prem Watsa",
    "cik": "0000915191",
    "category": "family_office",
    "portfolioValue": "$7.4 B",
    "portfolioValueNum": 7400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 215,
    "top10ConcentrationPct": 28,
    "topHoldings": [
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 881165,
        "value": 438820000,
        "portfolioWeight": 5.93,
        "changeStatus": "increased",
        "changePct": 6.7
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 1353730,
        "value": 341140000,
        "portfolioWeight": 4.61,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 439148,
        "value": 267880000,
        "portfolioWeight": 3.62,
        "changeStatus": "reduced",
        "changePct": -4.4
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 1273488,
        "value": 219040000,
        "portfolioWeight": 2.96,
        "changeStatus": "new"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 494582,
        "value": 195360000,
        "portfolioWeight": 2.64,
        "changeStatus": "increased",
        "changePct": 13.2
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 551419,
        "value": 170940000,
        "portfolioWeight": 2.31,
        "changeStatus": "new"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 1110000,
        "value": 146520000,
        "portfolioWeight": 1.98,
        "changeStatus": "increased",
        "changePct": 7.1
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 667213,
        "value": 122100000,
        "portfolioWeight": 1.65,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 109753,
        "value": 97680000,
        "portfolioWeight": 1.32,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 324159,
        "value": 73260000,
        "portfolioWeight": 0.99,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000915191",
    "description": "Canadian financial holding company led by value investor Prem Watsa, known as the 'Warren Buffett of Canada'.",
    "cityState": "Toronto, Canada",
    "avatarInitials": "FF"
  },
  {
    "id": "matrix-capital",
    "name": "Matrix Capital Management",
    "manager": "David Goel",
    "cik": "0001410830",
    "category": "tech_growth",
    "portfolioValue": "$7.1 B",
    "portfolioValueNum": 7100000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 214,
    "top10ConcentrationPct": 49,
    "topHoldings": [
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 3492796,
        "value": 736980000,
        "portfolioWeight": 10.38,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 1942271,
        "value": 572970000,
        "portfolioWeight": 8.07,
        "changeStatus": "reduced",
        "changePct": -12.2
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 1907373,
        "value": 450140000,
        "portfolioWeight": 6.34,
        "changeStatus": "reduced",
        "changePct": -7.9
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 4284767,
        "value": 368490000,
        "portfolioWeight": 5.19,
        "changeStatus": "new"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 828633,
        "value": 327310000,
        "portfolioWeight": 4.61,
        "changeStatus": "reduced",
        "changePct": -10.2
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 575984,
        "value": 286840000,
        "portfolioWeight": 4.04,
        "changeStatus": "increased",
        "changePct": 14.3
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 402721,
        "value": 245660000,
        "portfolioWeight": 3.46,
        "changeStatus": "reduced",
        "changePct": -8.4
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1105297,
        "value": 204480000,
        "portfolioWeight": 2.88,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 277983,
        "value": 164010000,
        "portfolioWeight": 2.31,
        "changeStatus": "reduced",
        "changePct": -3.1
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 813444,
        "value": 122830000,
        "portfolioWeight": 1.73,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001410830",
    "description": "Tiger Cub technology fund holding massive concentrated stakes in semiconductor leaders like NVIDIA and Qualcomm.",
    "cityState": "Waltham, MA",
    "avatarInitials": "MC"
  },
  {
    "id": "appaloosa-management",
    "name": "Appaloosa Management LP",
    "manager": "David Tepper",
    "cik": "0001006438",
    "category": "family_office",
    "portfolioValue": "$6.85 B",
    "portfolioValueNum": 6850000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 38,
    "top10ConcentrationPct": 62.4,
    "cityState": "Miami Beach, FL",
    "avatarInitials": "AP",
    "description": "David Tepper's hedge fund and family office, world-renowned for distressed debt investing, cyclical macroeconomic inflection calls, and mega-cap tech plays.",
    "topHoldings": [
      {
        "ticker": "BABA",
        "name": "Alibaba Group Holding",
        "shares": 10500000,
        "value": 1102000000,
        "portfolioWeight": 16.09,
        "changeStatus": "increased",
        "changePct": 18.4
      },
      {
        "ticker": "PDD",
        "name": "PDD Holdings (Temu)",
        "shares": 5200000,
        "value": 712000000,
        "portfolioWeight": 10.39,
        "changeStatus": "increased",
        "changePct": 24
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 3100000,
        "value": 654000000,
        "portfolioWeight": 9.55,
        "changeStatus": "reduced",
        "changePct": -12.5
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 980000,
        "value": 598000000,
        "portfolioWeight": 8.73,
        "changeStatus": "reduced",
        "changePct": -8
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 1100000,
        "value": 478000000,
        "portfolioWeight": 6.98,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc.",
        "shares": 2200000,
        "value": 408000000,
        "portfolioWeight": 5.96,
        "changeStatus": "reduced",
        "changePct": -15.2
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 2800000,
        "value": 371000000,
        "portfolioWeight": 5.42,
        "changeStatus": "reduced",
        "changePct": -22
      },
      {
        "ticker": "JD",
        "name": "JD.com Inc.",
        "shares": 8400000,
        "value": 336000000,
        "portfolioWeight": 4.91,
        "changeStatus": "new"
      },
      {
        "ticker": "FXI",
        "name": "iShares China Large-Cap ETF",
        "shares": 7200000,
        "value": 252000000,
        "portfolioWeight": 3.68,
        "changeStatus": "increased",
        "changePct": 35
      },
      {
        "ticker": "BIDU",
        "name": "Baidu Inc.",
        "shares": 2100000,
        "value": 195000000,
        "portfolioWeight": 2.85,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001006438"
  },
  {
    "id": "altimeter-capital",
    "name": "Altimeter Capital Management",
    "manager": "Brad Gerstner",
    "cik": "0001541617",
    "category": "tech_growth",
    "portfolioValue": "$6.8 B",
    "portfolioValueNum": 6800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 214,
    "top10ConcentrationPct": 25,
    "topHoldings": [
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 2725152,
        "value": 359720000,
        "portfolioWeight": 5.29,
        "changeStatus": "reduced",
        "changePct": -8
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1514378,
        "value": 280160000,
        "portfolioWeight": 4.12,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 1280930,
        "value": 220320000,
        "portfolioWeight": 3.24,
        "changeStatus": "increased",
        "changePct": 8.1
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 2095349,
        "value": 180200000,
        "portfolioWeight": 2.65,
        "changeStatus": "increased",
        "changePct": 3.4
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 634127,
        "value": 159800000,
        "portfolioWeight": 2.35,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 281285,
        "value": 140080000,
        "portfolioWeight": 2.06,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 507119,
        "value": 119680000,
        "portfolioWeight": 1.76,
        "changeStatus": "reduced",
        "changePct": -12
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 473744,
        "value": 99960000,
        "portfolioWeight": 1.47,
        "changeStatus": "reduced",
        "changePct": -5.6
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 184460,
        "value": 80240000,
        "portfolioWeight": 1.18,
        "changeStatus": "increased",
        "changePct": 5.9
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 151494,
        "value": 59840000,
        "portfolioWeight": 0.88,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001541617",
    "description": "Brad Gerstner's tech crossover firm backing market-leading cloud, AI software, and internet marketplaces.",
    "cityState": "Boston, MA",
    "avatarInitials": "AC"
  },
  {
    "id": "starboard-value",
    "name": "Starboard Value LP",
    "manager": "Jeffrey Smith",
    "cik": "0001517137",
    "category": "activist",
    "portfolioValue": "$6.2 B",
    "portfolioValueNum": 6200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 212,
    "top10ConcentrationPct": 45,
    "topHoldings": [
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 3435233,
        "value": 590860000,
        "portfolioWeight": 9.53,
        "changeStatus": "increased",
        "changePct": 10.1
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 1557356,
        "value": 459420000,
        "portfolioWeight": 7.41,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1950486,
        "value": 360840000,
        "portfolioWeight": 5.82,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 952000,
        "value": 295120000,
        "portfolioWeight": 4.76,
        "changeStatus": "increased",
        "changePct": 7.8
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 3056744,
        "value": 262880000,
        "portfolioWeight": 4.24,
        "changeStatus": "reduced",
        "changePct": -8.4
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 302658,
        "value": 230020000,
        "portfolioWeight": 3.71,
        "changeStatus": "new"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 453241,
        "value": 197160000,
        "portfolioWeight": 3.18,
        "changeStatus": "increased",
        "changePct": 15.9
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 179563,
        "value": 164300000,
        "portfolioWeight": 2.65,
        "changeStatus": "new"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 718251,
        "value": 131440000,
        "portfolioWeight": 2.12,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 197952,
        "value": 98580000,
        "portfolioWeight": 1.59,
        "changeStatus": "reduced",
        "changePct": -9.5
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001517137",
    "description": "Premier operational activist investor famous for comprehensive turnaround plans (Darden, Papa John's, Marvell).",
    "cityState": "New York, NY",
    "avatarInitials": "SV"
  },
  {
    "id": "maverick-capital",
    "name": "Maverick Capital, Ltd.",
    "manager": "Lee Ainslie",
    "cik": "0000934639",
    "category": "hedge_fund",
    "portfolioValue": "$5.8 B",
    "portfolioValueNum": 5800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 212,
    "top10ConcentrationPct": 25,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 344742,
        "value": 306820000,
        "portfolioWeight": 5.29,
        "changeStatus": "increased",
        "changePct": 10.5
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 405017,
        "value": 238960000,
        "portfolioWeight": 4.12,
        "changeStatus": "reduced",
        "changePct": -12.5
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 1423636,
        "value": 187920000,
        "portfolioWeight": 3.24,
        "changeStatus": "increased",
        "changePct": 9.9
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 202237,
        "value": 153700000,
        "portfolioWeight": 2.65,
        "changeStatus": "increased",
        "changePct": 2.6
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 902649,
        "value": 136300000,
        "portfolioWeight": 2.35,
        "changeStatus": "new"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 405017,
        "value": 119480000,
        "portfolioWeight": 2.06,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 483791,
        "value": 102080000,
        "portfolioWeight": 1.76,
        "changeStatus": "increased",
        "changePct": 3.6
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 139770,
        "value": 85260000,
        "portfolioWeight": 1.47,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 157333,
        "value": 68440000,
        "portfolioWeight": 1.18,
        "changeStatus": "increased",
        "changePct": 12.3
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 102490,
        "value": 51040000,
        "portfolioWeight": 0.88,
        "changeStatus": "increased",
        "changePct": 11.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000934639",
    "description": "Lee Ainslie's long/short equity hedge fund with 30-year track record in tech and consumer staples.",
    "cityState": "Dallas, TX",
    "avatarInitials": "MC"
  },
  {
    "id": "soros-fund-mgmt",
    "name": "Soros Fund Management LLC",
    "manager": "George Soros & Dawn Fitzpatrick",
    "cik": "0001029160",
    "category": "family_office",
    "portfolioValue": "$5.6 B",
    "portfolioValueNum": 5600000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 211,
    "top10ConcentrationPct": 42,
    "topHoldings": [
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 999679,
        "value": 497840000,
        "portfolioWeight": 8.89,
        "changeStatus": "reduced",
        "changePct": -10.7
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 2117596,
        "value": 387520000,
        "portfolioWeight": 6.92,
        "changeStatus": "increased",
        "changePct": 11
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 332940,
        "value": 304640000,
        "portfolioWeight": 5.44,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 1650331,
        "value": 249200000,
        "portfolioWeight": 4.45,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 937288,
        "value": 221200000,
        "portfolioWeight": 3.95,
        "changeStatus": "increased",
        "changePct": 5.9
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1047351,
        "value": 193760000,
        "portfolioWeight": 3.46,
        "changeStatus": "increased",
        "changePct": 4.9
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 733451,
        "value": 165760000,
        "portfolioWeight": 2.96,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 1608372,
        "value": 138320000,
        "portfolioWeight": 2.47,
        "changeStatus": "reduced",
        "changePct": -9.7
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 280709,
        "value": 110880000,
        "portfolioWeight": 1.98,
        "changeStatus": "increased",
        "changePct": 8.2
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 140475,
        "value": 82880000,
        "portfolioWeight": 1.48,
        "changeStatus": "increased",
        "changePct": 7.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001029160",
    "description": "Family office of George Soros investing across global equities, macro thematic trends, and venture.",
    "cityState": "New York, NY",
    "avatarInitials": "SF"
  },
  {
    "id": "whale-rock-capital",
    "name": "Whale Rock Capital Management",
    "manager": "Alex Sacerdote",
    "cik": "0001387322",
    "category": "tech_growth",
    "portfolioValue": "$5.6 B",
    "portfolioValueNum": 5600000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 211,
    "top10ConcentrationPct": 38,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 2985430,
        "value": 450800000,
        "portfolioWeight": 8.05,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 2655758,
        "value": 350560000,
        "portfolioWeight": 6.26,
        "changeStatus": "increased",
        "changePct": 1
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 451672,
        "value": 275520000,
        "portfolioWeight": 4.92,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 1066919,
        "value": 225120000,
        "portfolioWeight": 4.02,
        "changeStatus": "increased",
        "changePct": 2.7
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 849492,
        "value": 200480000,
        "portfolioWeight": 3.58,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 2038140,
        "value": 175280000,
        "portfolioWeight": 3.13,
        "changeStatus": "reduced",
        "changePct": -4.7
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 484129,
        "value": 150080000,
        "portfolioWeight": 2.68,
        "changeStatus": "reduced",
        "changePct": -9.8
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 685464,
        "value": 125440000,
        "portfolioWeight": 2.24,
        "changeStatus": "increased",
        "changePct": 12.7
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 201285,
        "value": 100240000,
        "portfolioWeight": 1.79,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 84315,
        "value": 75040000,
        "portfolioWeight": 1.34,
        "changeStatus": "reduced",
        "changePct": -4.2
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001387322",
    "description": "Fundamental equity hedge fund specializing in global technology, media, and telecom wave transitions.",
    "cityState": "Boston, MA",
    "avatarInitials": "WR"
  },
  {
    "id": "baupost-group",
    "name": "Baupost Group LLC",
    "manager": "Seth Klarman",
    "cik": "0001061768",
    "category": "family_office",
    "portfolioValue": "$5.42 B",
    "portfolioValueNum": 5420000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 211,
    "top10ConcentrationPct": 30,
    "topHoldings": [
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 376142,
        "value": 344170000,
        "portfolioWeight": 6.35,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 352300,
        "value": 267748000,
        "portfolioWeight": 4.94,
        "changeStatus": "increased",
        "changePct": 9.3
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 356434,
        "value": 210296000,
        "portfolioWeight": 3.88,
        "changeStatus": "increased",
        "changePct": 3.8
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 762637,
        "value": 172356000,
        "portfolioWeight": 3.18,
        "changeStatus": "increased",
        "changePct": 12.5
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 1777256,
        "value": 152844000,
        "portfolioWeight": 2.82,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 567263,
        "value": 133874000,
        "portfolioWeight": 2.47,
        "changeStatus": "increased",
        "changePct": 4.3
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 627891,
        "value": 114904000,
        "portfolioWeight": 2.12,
        "changeStatus": "reduced",
        "changePct": -1.6
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 107182,
        "value": 95392000,
        "portfolioWeight": 1.76,
        "changeStatus": "increased",
        "changePct": 1.6
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 303262,
        "value": 76422000,
        "portfolioWeight": 1.41,
        "changeStatus": "reduced",
        "changePct": -11.5
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 94184,
        "value": 57452000,
        "portfolioWeight": 1.06,
        "changeStatus": "increased",
        "changePct": 10.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001061768",
    "description": "Seth Klarman's renowned value fund emphasizing deep margin of safety, distressed debt, and cash discipline.",
    "cityState": "Boston, MA",
    "avatarInitials": "BG"
  },
  {
    "id": "trian-fund-mgmt",
    "name": "Trian Fund Management, L.P.",
    "manager": "Nelson Peltz",
    "cik": "0001345471",
    "category": "activist",
    "portfolioValue": "$5.1 B",
    "portfolioValueNum": 5100000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 210,
    "top10ConcentrationPct": 44,
    "topHoldings": [
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 1533290,
        "value": 475320000,
        "portfolioWeight": 9.32,
        "changeStatus": "reduced",
        "changePct": -8.9
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 2149709,
        "value": 369750000,
        "portfolioWeight": 7.25,
        "changeStatus": "reduced",
        "changePct": -9.3
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 3374302,
        "value": 290190000,
        "portfolioWeight": 5.69,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 1126351,
        "value": 237660000,
        "portfolioWeight": 4.66,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 230754,
        "value": 211140000,
        "portfolioWeight": 4.14,
        "changeStatus": "reduced",
        "changePct": -5.3
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 242921,
        "value": 184620000,
        "portfolioWeight": 3.62,
        "changeStatus": "increased",
        "changePct": 1.2
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 268831,
        "value": 158610000,
        "portfolioWeight": 3.11,
        "changeStatus": "reduced",
        "changePct": -6.2
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 148416,
        "value": 132090000,
        "portfolioWeight": 2.59,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 576885,
        "value": 105570000,
        "portfolioWeight": 2.07,
        "changeStatus": "increased",
        "changePct": 5.9
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 427297,
        "value": 79050000,
        "portfolioWeight": 1.55,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001345471",
    "description": "Nelson Peltz's collaborative activist firm targeting consumer, industrial, and financial blue chips.",
    "cityState": "New York, NY",
    "avatarInitials": "TF"
  },
  {
    "id": "dragoneer-investment",
    "name": "Dragoneer Investment Group",
    "manager": "Marc Stad",
    "cik": "0001602189",
    "category": "tech_growth",
    "portfolioValue": "$4.2 B",
    "portfolioValueNum": 4200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 208,
    "top10ConcentrationPct": 37,
    "topHoldings": [
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 1116203,
        "value": 329280000,
        "portfolioWeight": 7.84,
        "changeStatus": "increased",
        "changePct": 3.4
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 1015000,
        "value": 255780000,
        "portfolioWeight": 6.09,
        "changeStatus": "increased",
        "changePct": 5.3
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 1087459,
        "value": 201180000,
        "portfolioWeight": 4.79,
        "changeStatus": "increased",
        "changePct": 12.3
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 184989,
        "value": 164640000,
        "portfolioWeight": 3.92,
        "changeStatus": "increased",
        "changePct": 15
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 159738,
        "value": 146160000,
        "portfolioWeight": 3.48,
        "changeStatus": "increased",
        "changePct": 13.6
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 324304,
        "value": 128100000,
        "portfolioWeight": 3.05,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 144237,
        "value": 109620000,
        "portfolioWeight": 2.61,
        "changeStatus": "new"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 387966,
        "value": 91560000,
        "portfolioWeight": 2.18,
        "changeStatus": "increased",
        "changePct": 6.6
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 168000,
        "value": 73080000,
        "portfolioWeight": 1.74,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 177484,
        "value": 55020000,
        "portfolioWeight": 1.31,
        "changeStatus": "unmodified"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001602189",
    "description": "Growth-oriented technology investor across enterprise cloud infrastructure and payments.",
    "cityState": "San Francisco, CA",
    "avatarInitials": "DI"
  },
  {
    "id": "duquesne-family-office",
    "name": "Duquesne Family Office LLC",
    "manager": "Stanley Druckenmiller",
    "cik": "0001536411",
    "category": "family_office",
    "portfolioValue": "$3.95 B",
    "portfolioValueNum": 3950000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 52,
    "top10ConcentrationPct": 68.2,
    "cityState": "New York, NY",
    "avatarInitials": "DQ",
    "description": "Stanley Druckenmiller's private family office. Druckenmiller boasts a 30-year record of zero down years, focusing on top-down macro, liquidity, and AI secular trends.",
    "topHoldings": [
      {
        "ticker": "NTRA",
        "name": "Natera Inc.",
        "shares": 8900000,
        "value": 780000000,
        "portfolioWeight": 19.75,
        "changeStatus": "increased",
        "changePct": 8.5
      },
      {
        "ticker": "CPNG",
        "name": "Coupang Inc.",
        "shares": 24500000,
        "value": 588000000,
        "portfolioWeight": 14.89,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "SE",
        "name": "Sea Limited",
        "shares": 5200000,
        "value": 468000000,
        "portfolioWeight": 11.85,
        "changeStatus": "increased",
        "changePct": 32
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 820000,
        "value": 356000000,
        "portfolioWeight": 9.01,
        "changeStatus": "reduced",
        "changePct": -14.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 1450000,
        "value": 306000000,
        "portfolioWeight": 7.75,
        "changeStatus": "new"
      },
      {
        "ticker": "VST",
        "name": "Vistra Corp.",
        "shares": 2100000,
        "value": 273000000,
        "portfolioWeight": 6.91,
        "changeStatus": "increased",
        "changePct": 15.4
      },
      {
        "ticker": "CEIX",
        "name": "CONSOL Energy Inc.",
        "shares": 1800000,
        "value": 198000000,
        "portfolioWeight": 5.01,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TECK",
        "name": "Teck Resources Limited",
        "shares": 2800000,
        "value": 154000000,
        "portfolioWeight": 3.9,
        "changeStatus": "new"
      },
      {
        "ticker": "GEV",
        "name": "GE Vernova Inc.",
        "shares": 480000,
        "value": 139000000,
        "portfolioWeight": 3.52,
        "changeStatus": "new"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 120000,
        "value": 106000000,
        "portfolioWeight": 2.68,
        "changeStatus": "reduced",
        "changePct": -25
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001536411"
  },
  {
    "id": "sachem-head-capital",
    "name": "Sachem Head Capital Management",
    "manager": "Scott Ferguson",
    "cik": "0001582090",
    "category": "activist",
    "portfolioValue": "$3.4 B",
    "portfolioValueNum": 3400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 207,
    "top10ConcentrationPct": 43,
    "topHoldings": [
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 3601628,
        "value": 309740000,
        "portfolioWeight": 9.11,
        "changeStatus": "increased",
        "changePct": 12.4
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 1020000,
        "value": 240720000,
        "portfolioWeight": 7.08,
        "changeStatus": "new"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 640814,
        "value": 189040000,
        "portfolioWeight": 5.56,
        "changeStatus": "increased",
        "changePct": 14.7
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 1171970,
        "value": 154700000,
        "portfolioWeight": 4.55,
        "changeStatus": "increased",
        "changePct": 3.3
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 181184,
        "value": 137700000,
        "portfolioWeight": 4.05,
        "changeStatus": "reduced",
        "changePct": -11.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 570427,
        "value": 120360000,
        "portfolioWeight": 3.54,
        "changeStatus": "increased",
        "changePct": 7.9
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 175186,
        "value": 103360000,
        "portfolioWeight": 3.04,
        "changeStatus": "increased",
        "changePct": 8.7
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 380619,
        "value": 86020000,
        "portfolioWeight": 2.53,
        "changeStatus": "reduced",
        "changePct": -1.7
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 137912,
        "value": 68680000,
        "portfolioWeight": 2.02,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 58067,
        "value": 51680000,
        "portfolioWeight": 1.52,
        "changeStatus": "reduced",
        "changePct": -6.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001582090",
    "description": "Activist hedge fund founded by Pershing Square partner Scott Ferguson.",
    "cityState": "New York, NY",
    "avatarInitials": "SH"
  },
  {
    "id": "corvex-management",
    "name": "Corvex Management LP",
    "manager": "Keith Meister",
    "cik": "0001535472",
    "category": "activist",
    "portfolioValue": "$2.8 B",
    "portfolioValueNum": 2800000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 206,
    "top10ConcentrationPct": 31,
    "topHoldings": [
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 1003716,
        "value": 183680000,
        "portfolioWeight": 6.56,
        "changeStatus": "increased",
        "changePct": 4.5
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 606271,
        "value": 143080000,
        "portfolioWeight": 5.11,
        "changeStatus": "increased",
        "changePct": 11.2
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 284253,
        "value": 112280000,
        "portfolioWeight": 4.01,
        "changeStatus": "reduced",
        "changePct": -1.5
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 608212,
        "value": 91840000,
        "portfolioWeight": 3.28,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 263742,
        "value": 81760000,
        "portfolioWeight": 2.92,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 830233,
        "value": 71400000,
        "portfolioWeight": 2.55,
        "changeStatus": "reduced",
        "changePct": -2.7
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 100525,
        "value": 61320000,
        "portfolioWeight": 2.19,
        "changeStatus": "increased",
        "changePct": 10.1
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 57258,
        "value": 50960000,
        "portfolioWeight": 1.82,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 69288,
        "value": 40880000,
        "portfolioWeight": 1.46,
        "changeStatus": "increased",
        "changePct": 6.2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 144645,
        "value": 30520000,
        "portfolioWeight": 1.09,
        "changeStatus": "increased",
        "changePct": 7.7
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001535472",
    "description": "Keith Meister's activist hedge fund focused on telecom, media, energy, and retail transformations.",
    "cityState": "New York, NY",
    "avatarInitials": "CM"
  },
  {
    "id": "himalaya-capital",
    "name": "Himalaya Capital Management",
    "manager": "Li Lu",
    "cik": "0001709323",
    "category": "family_office",
    "portfolioValue": "$2.45 B",
    "portfolioValueNum": 2450000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 205,
    "top10ConcentrationPct": 29,
    "topHoldings": [
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 164404,
        "value": 150430000,
        "portfolioWeight": 6.14,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 198492,
        "value": 117110000,
        "portfolioWeight": 4.78,
        "changeStatus": "increased",
        "changePct": 11.9
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 184488,
        "value": 91875000,
        "portfolioWeight": 3.75,
        "changeStatus": "new"
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 498113,
        "value": 75215000,
        "portfolioWeight": 3.07,
        "changeStatus": "reduced",
        "changePct": -9.1
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 316991,
        "value": 66885000,
        "portfolioWeight": 2.73,
        "changeStatus": "increased",
        "changePct": 3.4
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 680872,
        "value": 58555000,
        "portfolioWeight": 2.39,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 127152,
        "value": 50225000,
        "portfolioWeight": 2.05,
        "changeStatus": "increased",
        "changePct": 1.4
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 55125,
        "value": 41895000,
        "portfolioWeight": 1.71,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 132222,
        "value": 33320000,
        "portfolioWeight": 1.36,
        "changeStatus": "increased",
        "changePct": 12.3
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 136557,
        "value": 24990000,
        "portfolioWeight": 1.02,
        "changeStatus": "increased",
        "changePct": 8.3
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001709323",
    "description": "Li Lu's fund (Charlie Munger's partner), practicing deep value compounding across US and Asian blue-chip leaders.",
    "cityState": "Seattle, WA",
    "avatarInitials": "HC"
  },
  {
    "id": "greenlight-capital",
    "name": "Greenlight Capital, Inc.",
    "manager": "David Einhorn",
    "cik": "0001079114",
    "category": "activist",
    "portfolioValue": "$2.4 B",
    "portfolioValueNum": 2400000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 205,
    "top10ConcentrationPct": 33,
    "topHoldings": [
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 541161,
        "value": 167760000,
        "portfolioWeight": 6.99,
        "changeStatus": "increased",
        "changePct": 2.2
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 330532,
        "value": 130560000,
        "portfolioWeight": 5.44,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 173695,
        "value": 102480000,
        "portfolioWeight": 4.27,
        "changeStatus": "reduced",
        "changePct": -12.9
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 634545,
        "value": 83760000,
        "portfolioWeight": 3.49,
        "changeStatus": "increased",
        "changePct": 13.6
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 353744,
        "value": 74640000,
        "portfolioWeight": 3.11,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 107016,
        "value": 65280000,
        "portfolioWeight": 2.72,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "MSFT",
        "name": "Microsoft Corporation",
        "shares": 128552,
        "value": 55920000,
        "portfolioWeight": 2.33,
        "changeStatus": "new"
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 270698,
        "value": 46560000,
        "portfolioWeight": 1.94,
        "changeStatus": "increased",
        "changePct": 5
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 74699,
        "value": 37200000,
        "portfolioWeight": 1.55,
        "changeStatus": "increased",
        "changePct": 4
      },
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 123186,
        "value": 27840000,
        "portfolioWeight": 1.16,
        "changeStatus": "increased",
        "changePct": 7.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001079114",
    "description": "David Einhorn's value-oriented hedge fund focused on forensic accounting, undervalued companies, and macro hedges.",
    "cityState": "New York, NY",
    "avatarInitials": "GC"
  },
  {
    "id": "jana-partners",
    "name": "JANA Partners LLC",
    "manager": "Barry Rosenstein",
    "cik": "0001159159",
    "category": "activist",
    "portfolioValue": "$2.1 B",
    "portfolioValueNum": 2100000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 204,
    "top10ConcentrationPct": 43,
    "topHoldings": [
      {
        "ticker": "JPM",
        "name": "JPMorgan Chase & Co.",
        "shares": 846504,
        "value": 191310000,
        "portfolioWeight": 9.11,
        "changeStatus": "new"
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 243738,
        "value": 148680000,
        "portfolioWeight": 7.08,
        "changeStatus": "reduced",
        "changePct": -10.5
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 295595,
        "value": 116760000,
        "portfolioWeight": 5.56,
        "changeStatus": "increased",
        "changePct": 6.4
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 723864,
        "value": 95550000,
        "portfolioWeight": 4.55,
        "changeStatus": "new"
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 170783,
        "value": 85050000,
        "portfolioWeight": 4.05,
        "changeStatus": "new"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 239806,
        "value": 74340000,
        "portfolioWeight": 3.54,
        "changeStatus": "increased",
        "changePct": 7.6
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 302559,
        "value": 63840000,
        "portfolioWeight": 3.04,
        "changeStatus": "increased",
        "changePct": 2.2
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 58066,
        "value": 53130000,
        "portfolioWeight": 2.53,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 493256,
        "value": 42420000,
        "portfolioWeight": 2.02,
        "changeStatus": "increased",
        "changePct": 15.7
      },
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 211391,
        "value": 31920000,
        "portfolioWeight": 1.52,
        "changeStatus": "reduced",
        "changePct": -12.4
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001159159",
    "description": "Event-driven activist investor pursuing corporate governance and strategic sales catalysts.",
    "cityState": "New York, NY",
    "avatarInitials": "JP"
  },
  {
    "id": "light-street-capital",
    "name": "Light Street Capital Management",
    "manager": "Glen Kacher",
    "cik": "0001569049",
    "category": "tech_growth",
    "portfolioValue": "$1.85 B",
    "portfolioValueNum": 1850000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 204,
    "top10ConcentrationPct": 48,
    "topHoldings": [
      {
        "ticker": "AMD",
        "name": "Advanced Micro Devices",
        "shares": 1244768,
        "value": 187960000,
        "portfolioWeight": 10.16,
        "changeStatus": "new"
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 693531,
        "value": 146335000,
        "portfolioWeight": 7.91,
        "changeStatus": "reduced",
        "changePct": -2.3
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 370597,
        "value": 114885000,
        "portfolioWeight": 6.21,
        "changeStatus": "increased",
        "changePct": 2.8
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 123658,
        "value": 93980000,
        "portfolioWeight": 5.08,
        "changeStatus": "increased",
        "changePct": 13.9
      },
      {
        "ticker": "NVDA",
        "name": "NVIDIA Corporation",
        "shares": 633485,
        "value": 83620000,
        "portfolioWeight": 4.52,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 395000,
        "value": 73075000,
        "portfolioWeight": 3.95,
        "changeStatus": "reduced",
        "changePct": -12.6
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 158772,
        "value": 62715000,
        "portfolioWeight": 3.39,
        "changeStatus": "increased",
        "changePct": 2
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 176847,
        "value": 52170000,
        "portfolioWeight": 2.82,
        "changeStatus": "increased",
        "changePct": 7.5
      },
      {
        "ticker": "PG",
        "name": "Procter & Gamble Co.",
        "shares": 243081,
        "value": 41810000,
        "portfolioWeight": 2.26,
        "changeStatus": "reduced",
        "changePct": -6.1
      },
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 35129,
        "value": 31265000,
        "portfolioWeight": 1.69,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001569049",
    "description": "Tiger-affiliated tech specialist focusing on artificial intelligence hardware and platform software.",
    "cityState": "San Francisco, CA",
    "avatarInitials": "LS"
  },
  {
    "id": "shawspring-partners",
    "name": "ShawSpring Partners LLC",
    "manager": "Dennis Hong",
    "cik": "0001766908",
    "category": "tech_growth",
    "portfolioValue": "$1.2 B",
    "portfolioValueNum": 1200000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 202,
    "top10ConcentrationPct": 35,
    "topHoldings": [
      {
        "ticker": "LLY",
        "name": "Eli Lilly and Company",
        "shares": 99910,
        "value": 88920000,
        "portfolioWeight": 7.41,
        "changeStatus": "new"
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 90947,
        "value": 69120000,
        "portfolioWeight": 5.76,
        "changeStatus": "increased",
        "changePct": 11.4
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 137620,
        "value": 54360000,
        "portfolioWeight": 4.53,
        "changeStatus": "reduced",
        "changePct": -5.7
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 143613,
        "value": 44520000,
        "portfolioWeight": 3.71,
        "changeStatus": "increased",
        "changePct": 8.2
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 64721,
        "value": 39480000,
        "portfolioWeight": 3.29,
        "changeStatus": "increased",
        "changePct": 15.3
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 69398,
        "value": 34560000,
        "portfolioWeight": 2.88,
        "changeStatus": "increased",
        "changePct": 4.7
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 161967,
        "value": 29640000,
        "portfolioWeight": 2.47,
        "changeStatus": "reduced",
        "changePct": -8.4
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 27016,
        "value": 24720000,
        "portfolioWeight": 2.06,
        "changeStatus": "reduced",
        "changePct": -4.8
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 83898,
        "value": 19800000,
        "portfolioWeight": 1.65,
        "changeStatus": "reduced",
        "changePct": -4.7
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 173023,
        "value": 14880000,
        "portfolioWeight": 1.24,
        "changeStatus": "new"
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001766908",
    "description": "Long-term concentrated investor in dominant platform businesses with network effects.",
    "cityState": "Boston, MA",
    "avatarInitials": "SP"
  },
  {
    "id": "pabrai-investments",
    "name": "Pabrai Investment Funds",
    "manager": "Mohnish Pabrai",
    "cik": "0001549575",
    "category": "family_office",
    "portfolioValue": "$320 M",
    "portfolioValueNum": 320000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 201,
    "top10ConcentrationPct": 40,
    "topHoldings": [
      {
        "ticker": "GOOGL",
        "name": "Alphabet Inc. (Class A)",
        "shares": 146508,
        "value": 27104000,
        "portfolioWeight": 8.47,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 115235,
        "value": 21088000,
        "portfolioWeight": 6.59,
        "changeStatus": "new"
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 192744,
        "value": 16576000,
        "portfolioWeight": 5.18,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "AAPL",
        "name": "Apple Inc.",
        "shares": 57492,
        "value": 13568000,
        "portfolioWeight": 4.24,
        "changeStatus": "new"
      },
      {
        "ticker": "UNH",
        "name": "UnitedHealth Group",
        "shares": 20393,
        "value": 12032000,
        "portfolioWeight": 3.76,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 35688,
        "value": 10528000,
        "portfolioWeight": 3.29,
        "changeStatus": "increased",
        "changePct": 13.7
      },
      {
        "ticker": "TSLA",
        "name": "Tesla Inc.",
        "shares": 35810,
        "value": 9024000,
        "portfolioWeight": 2.82,
        "changeStatus": "reduced",
        "changePct": -2
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 35640,
        "value": 7520000,
        "portfolioWeight": 2.35,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 15230,
        "value": 6016000,
        "portfolioWeight": 1.88,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 14555,
        "value": 4512000,
        "portfolioWeight": 1.41,
        "changeStatus": "reduced",
        "changePct": -2.7
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001549575",
    "description": "Buffett-disciple Mohnish Pabrai applying 'heads I win, tails I don't lose much' asymmetric deep-value bets.",
    "cityState": "Austin, TX",
    "avatarInitials": "PI"
  },
  {
    "id": "scion-asset-management",
    "name": "Scion Asset Management, LLC",
    "manager": "Michael Burry",
    "cik": "0001649339",
    "category": "family_office",
    "portfolioValue": "$185 M",
    "portfolioValueNum": 185000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 14,
    "top10ConcentrationPct": 91.2,
    "cityState": "Saratoga, CA",
    "avatarInitials": "SC",
    "description": "Dr. Michael Burry's hedge fund, profiled in 'The Big Short'. Known for contrarian asymmetric bets, deep value plays, Chinese consumer proxies, and gold.",
    "topHoldings": [
      {
        "ticker": "BABA",
        "name": "Alibaba Group Holding",
        "shares": 200000,
        "value": 21000000,
        "portfolioWeight": 11.35,
        "changeStatus": "increased",
        "changePct": 30
      },
      {
        "ticker": "JD",
        "name": "JD.com Inc.",
        "shares": 500000,
        "value": 20000000,
        "portfolioWeight": 10.81,
        "changeStatus": "increased",
        "changePct": 25
      },
      {
        "ticker": "BIDU",
        "name": "Baidu Inc.",
        "shares": 180000,
        "value": 16700000,
        "portfolioWeight": 9.03,
        "changeStatus": "new"
      },
      {
        "ticker": "PHYS",
        "name": "Sprott Physical Gold Trust",
        "shares": 850000,
        "value": 15300000,
        "portfolioWeight": 8.27,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "SHIFT",
        "name": "Shift4 Payments",
        "shares": 160000,
        "value": 14400000,
        "portfolioWeight": 7.78,
        "changeStatus": "new"
      },
      {
        "ticker": "MHK",
        "name": "Mohawk Industries",
        "shares": 90000,
        "value": 13500000,
        "portfolioWeight": 7.3,
        "changeStatus": "increased",
        "changePct": 15
      },
      {
        "ticker": "OLLI",
        "name": "Ollie's Bargain Outlet",
        "shares": 120000,
        "value": 12000000,
        "portfolioWeight": 6.49,
        "changeStatus": "new"
      },
      {
        "ticker": "CAVA",
        "name": "CAVA Group Inc.",
        "shares": 80000,
        "value": 10400000,
        "portfolioWeight": 5.62,
        "changeStatus": "new"
      },
      {
        "ticker": "FOUR",
        "name": "Shift4 Payments Inc.",
        "shares": 110000,
        "value": 9900000,
        "portfolioWeight": 5.35,
        "changeStatus": "new"
      },
      {
        "ticker": "REAL",
        "name": "The RealReal Inc.",
        "shares": 1800000,
        "value": 7200000,
        "portfolioWeight": 3.89,
        "changeStatus": "reduced",
        "changePct": -18
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0001649339"
  },
  {
    "id": "daily-journal-corp",
    "name": "Daily Journal Corporation",
    "manager": "Charlie Munger Legacy",
    "cik": "0000783412",
    "category": "family_office",
    "portfolioValue": "$180 M",
    "portfolioValueNum": 180000000,
    "reportPeriod": "Q3 2026",
    "filingDate": "2026-11-14",
    "holdingsCount": 200,
    "top10ConcentrationPct": 28,
    "topHoldings": [
      {
        "ticker": "AVGO",
        "name": "Broadcom Inc.",
        "shares": 58328,
        "value": 10674000,
        "portfolioWeight": 5.93,
        "changeStatus": "reduced",
        "changePct": -6.2
      },
      {
        "ticker": "WMT",
        "name": "Walmart Inc.",
        "shares": 96488,
        "value": 8298000,
        "portfolioWeight": 4.61,
        "changeStatus": "increased",
        "changePct": 5.8
      },
      {
        "ticker": "CRM",
        "name": "Salesforce Inc.",
        "shares": 21019,
        "value": 6516000,
        "portfolioWeight": 3.62,
        "changeStatus": "new"
      },
      {
        "ticker": "COST",
        "name": "Costco Wholesale Corp.",
        "shares": 5823,
        "value": 5328000,
        "portfolioWeight": 2.96,
        "changeStatus": "increased",
        "changePct": 8
      },
      {
        "ticker": "META",
        "name": "Meta Platforms Inc.",
        "shares": 7790,
        "value": 4752000,
        "portfolioWeight": 2.64,
        "changeStatus": "unmodified"
      },
      {
        "ticker": "HD",
        "name": "The Home Depot Inc.",
        "shares": 10527,
        "value": 4158000,
        "portfolioWeight": 2.31,
        "changeStatus": "increased",
        "changePct": 8
      },
      {
        "ticker": "AMZN",
        "name": "Amazon.com Inc.",
        "shares": 16891,
        "value": 3564000,
        "portfolioWeight": 1.98,
        "changeStatus": "reduced",
        "changePct": -5.7
      },
      {
        "ticker": "MA",
        "name": "Mastercard Inc.",
        "shares": 5964,
        "value": 2970000,
        "portfolioWeight": 1.65,
        "changeStatus": "reduced",
        "changePct": -3.1
      },
      {
        "ticker": "NFLX",
        "name": "Netflix Inc.",
        "shares": 3126,
        "value": 2376000,
        "portfolioWeight": 1.32,
        "changeStatus": "increased",
        "changePct": 11.8
      },
      {
        "ticker": "V",
        "name": "Visa Inc.",
        "shares": 6041,
        "value": 1782000,
        "portfolioWeight": 0.99,
        "changeStatus": "increased",
        "changePct": 11.1
      }
    ],
    "secFilingUrl": "https://www.sec.gov/edgar/browse/?CIK=0000783412",
    "description": "Publishing and legal technology company holding Charlie Munger's concentrated bank and consumer portfolio.",
    "cityState": "Los Angeles, CA",
    "avatarInitials": "DJ"
  }
];

export const SMART_MONEY_CONSENSUS_TOP_25: ConsensusHolding[] = [
  {
    "rank": 1,
    "ticker": "MSFT",
    "name": "Microsoft Corporation",
    "sector": "Information Technology",
    "holdersCount": 57,
    "totalValue": 1144750410000,
    "avgWeightPct": 3.97,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "Capital"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 2,
    "ticker": "AAPL",
    "name": "Apple Inc.",
    "sector": "Information Technology",
    "holdersCount": 53,
    "totalValue": 1019951352000,
    "avgWeightPct": 3.7,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "Capital"
    ],
    "sentiment": "buy"
  },
  {
    "rank": 3,
    "ticker": "NVDA",
    "name": "NVIDIA Corporation",
    "sector": "Information Technology",
    "holdersCount": 51,
    "totalValue": 954467630000,
    "avgWeightPct": 3.32,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "Capital"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 4,
    "ticker": "AMZN",
    "name": "Amazon.com Inc.",
    "sector": "Consumer Discretionary",
    "holdersCount": 53,
    "totalValue": 651794354000,
    "avgWeightPct": 3.77,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "Capital"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 5,
    "ticker": "META",
    "name": "Meta Platforms Inc.",
    "sector": "Communication Services",
    "holdersCount": 50,
    "totalValue": 548500754000,
    "avgWeightPct": 3.41,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "J.P."
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 6,
    "ticker": "JPM",
    "name": "JPMorgan Chase & Co.",
    "sector": "Financials",
    "holdersCount": 47,
    "totalValue": 517824406000,
    "avgWeightPct": 3.49,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "Capital"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 7,
    "ticker": "GOOGL",
    "name": "Alphabet Inc. (Class A)",
    "sector": "Communication Services",
    "holdersCount": 55,
    "totalValue": 480380569000,
    "avgWeightPct": 3.94,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "Geode"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 8,
    "ticker": "LLY",
    "name": "Eli Lilly and Company",
    "sector": "Health Care",
    "holdersCount": 53,
    "totalValue": 408195417000,
    "avgWeightPct": 3.63,
    "topFunds": [
      "BlackRock,",
      "State",
      "FMR",
      "Capital",
      "Geode"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 9,
    "ticker": "AVGO",
    "name": "Broadcom Inc.",
    "sector": "Information Technology",
    "holdersCount": 47,
    "totalValue": 335080606000,
    "avgWeightPct": 3.13,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State",
      "FMR",
      "Capital"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 10,
    "ticker": "PG",
    "name": "Procter & Gamble Co.",
    "sector": "Consumer Staples",
    "holdersCount": 38,
    "totalValue": 283171010000,
    "avgWeightPct": 3.85,
    "topFunds": [
      "Geode",
      "J.P.",
      "T.",
      "Wellington",
      "Northern"
    ],
    "sentiment": "buy"
  },
  {
    "rank": 11,
    "ticker": "WMT",
    "name": "Walmart Inc.",
    "sector": "Consumer Staples",
    "holdersCount": 44,
    "totalValue": 262194163000,
    "avgWeightPct": 3.9,
    "topFunds": [
      "Geode",
      "J.P.",
      "Wellington",
      "Goldman",
      "Invesco"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 12,
    "ticker": "V",
    "name": "Visa Inc.",
    "sector": "Financials",
    "holdersCount": 44,
    "totalValue": 256127520000,
    "avgWeightPct": 4.06,
    "topFunds": [
      "Geode",
      "T.",
      "Wellington",
      "Invesco",
      "Bank"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 13,
    "ticker": "AMD",
    "name": "Advanced Micro Devices",
    "sector": "Information Technology",
    "holdersCount": 44,
    "totalValue": 253527885000,
    "avgWeightPct": 4.1,
    "topFunds": [
      "Capital",
      "T.",
      "Wellington",
      "Northern",
      "Morgan"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 14,
    "ticker": "TSLA",
    "name": "Tesla Inc.",
    "sector": "Consumer Discretionary",
    "holdersCount": 45,
    "totalValue": 253061396000,
    "avgWeightPct": 3.79,
    "topFunds": [
      "Vanguard",
      "FMR",
      "J.P.",
      "Wellington",
      "Morgan"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 15,
    "ticker": "UNH",
    "name": "UnitedHealth Group",
    "sector": "Health Care",
    "holdersCount": 41,
    "totalValue": 192598868000,
    "avgWeightPct": 3.75,
    "topFunds": [
      "J.P.",
      "T.",
      "Northern",
      "Goldman",
      "Invesco"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 16,
    "ticker": "CRM",
    "name": "Salesforce Inc.",
    "sector": "Information Technology",
    "holdersCount": 48,
    "totalValue": 182913003000,
    "avgWeightPct": 3.79,
    "topFunds": [
      "Geode",
      "J.P.",
      "Northern",
      "Bank",
      "Dimensional"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 17,
    "ticker": "COST",
    "name": "Costco Wholesale Corp.",
    "sector": "Consumer Staples",
    "holdersCount": 37,
    "totalValue": 173284778000,
    "avgWeightPct": 3.54,
    "topFunds": [
      "Capital",
      "T.",
      "Northern",
      "Goldman",
      "Bank"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 18,
    "ticker": "HD",
    "name": "The Home Depot Inc.",
    "sector": "Consumer Discretionary",
    "holdersCount": 46,
    "totalValue": 163805884000,
    "avgWeightPct": 3.27,
    "topFunds": [
      "Capital",
      "T.",
      "Northern",
      "Morgan",
      "Dimensional"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 19,
    "ticker": "BRK.B",
    "name": "Berkshire Hathaway Inc.",
    "sector": "Broad Market",
    "holdersCount": 3,
    "totalValue": 151000000000,
    "avgWeightPct": 1.21,
    "topFunds": [
      "Vanguard",
      "BlackRock,",
      "State"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 20,
    "ticker": "NFLX",
    "name": "Netflix Inc.",
    "sector": "Communication Services",
    "holdersCount": 45,
    "totalValue": 144038449000,
    "avgWeightPct": 3.64,
    "topFunds": [
      "Northern",
      "Morgan",
      "Fisher",
      "Dodge",
      "CalPERS"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 21,
    "ticker": "MA",
    "name": "Mastercard Inc.",
    "sector": "Financials",
    "holdersCount": 42,
    "totalValue": 143021815000,
    "avgWeightPct": 3.25,
    "topFunds": [
      "Geode",
      "Wellington",
      "Morgan",
      "Dimensional",
      "Dodge"
    ],
    "sentiment": "strong_buy"
  },
  {
    "rank": 22,
    "ticker": "AXP",
    "name": "American Express Co.",
    "sector": "Financials",
    "holdersCount": 1,
    "totalValue": 41200000000,
    "avgWeightPct": 14.69,
    "topFunds": [
      "Berkshire"
    ],
    "sentiment": "neutral"
  },
  {
    "rank": 23,
    "ticker": "BAC",
    "name": "Bank of America Corp.",
    "sector": "Financials",
    "holdersCount": 1,
    "totalValue": 31800000000,
    "avgWeightPct": 11.34,
    "topFunds": [
      "Berkshire"
    ],
    "sentiment": "trim"
  },
  {
    "rank": 24,
    "ticker": "KO",
    "name": "Coca-Cola Co.",
    "sector": "Consumer Staples",
    "holdersCount": 1,
    "totalValue": 27900000000,
    "avgWeightPct": 9.95,
    "topFunds": [
      "Berkshire"
    ],
    "sentiment": "neutral"
  },
  {
    "rank": 25,
    "ticker": "CVX",
    "name": "Chevron Corp.",
    "sector": "Energy",
    "holdersCount": 1,
    "totalValue": 17800000000,
    "avgWeightPct": 6.35,
    "topFunds": [
      "Berkshire"
    ],
    "sentiment": "trim"
  }
];

export const INSTITUTIONAL_SECTOR_ALLOCATION: SectorAllocationItem[] = [
  {
    "sector": "Information Technology",
    "institutionalWeight": 32.4,
    "sp500Weight": 31.5,
    "totalValue": 4850,
    "difference": 0.9
  },
  {
    "sector": "Financials",
    "institutionalWeight": 14.8,
    "sp500Weight": 13.2,
    "totalValue": 2210,
    "difference": 1.6
  },
  {
    "sector": "Communication Services",
    "institutionalWeight": 11.6,
    "sp500Weight": 9.1,
    "totalValue": 1740,
    "difference": 2.5
  },
  {
    "sector": "Consumer Discretionary",
    "institutionalWeight": 11.2,
    "sp500Weight": 10.4,
    "totalValue": 1680,
    "difference": 0.8
  },
  {
    "sector": "Health Care",
    "institutionalWeight": 10.9,
    "sp500Weight": 11.8,
    "totalValue": 1630,
    "difference": -0.9
  },
  {
    "sector": "Industrials",
    "institutionalWeight": 7.8,
    "sp500Weight": 8.5,
    "totalValue": 1170,
    "difference": -0.7
  },
  {
    "sector": "Consumer Staples",
    "institutionalWeight": 4.8,
    "sp500Weight": 5.6,
    "totalValue": 720,
    "difference": -0.8
  },
  {
    "sector": "Energy",
    "institutionalWeight": 3.2,
    "sp500Weight": 3.5,
    "totalValue": 480,
    "difference": -0.3
  },
  {
    "sector": "Materials",
    "institutionalWeight": 1.8,
    "sp500Weight": 2.2,
    "totalValue": 270,
    "difference": -0.4
  },
  {
    "sector": "Utilities",
    "institutionalWeight": 1.5,
    "sp500Weight": 2.4,
    "totalValue": 225,
    "difference": -0.9
  },
  {
    "sector": "Real Estate",
    "institutionalWeight": 1,
    "sp500Weight": 2.1,
    "totalValue": 150,
    "difference": -1.1
  }
];
