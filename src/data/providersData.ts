import type { IndexProvider, ProviderId } from "../types/index.ts";

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
      "Charles Schwab",
    ],
    coverage:
      "Global Equities, Fixed Income, Real Estate, Commodities, Strategy & Factor",
    marketShareSummary:
      "More assets are invested in products based on the S&P 500 than any other index globally, with over $15+ trillion benchmarked.",
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
      "Fidelity Investments (MSCI Sector ETFs)",
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
      "Amplify (HACK)",
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
    name: "Center for Research in Security Prices (CRSP / Morningstar)",
    shortName: "CRSP",
    logoText: "CRSP",
    tagline:
      "Academically rigorous index architecture designed for cost- and tax-efficient investing.",
    description:
      "Originally established in 1960 at the University of Chicago Booth School of Business and acquired by Morningstar in February 2026 for $375M, CRSP is the foundational benchmark provider for Vanguard's largest US index funds. CRSP Market Indexes feature innovative banding and packeting methodology to minimize portfolio turnover.",
    headquarters: "Chicago, IL, USA",
    founded: "1960 (Univ. of Chicago) / 2026 (Morningstar)",
    website: "https://www.crsp.org",
    accentColor: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.15)",
    keyEtfPartners: ["The Vanguard Group", "VanEck"],
    coverage:
      "US Total Market, Mega Cap, Large Cap, Mid Cap, Small Cap, Value & Growth Style Dimensions, Morningstar Economic Moat",
    marketShareSummary:
      "Primary benchmark underlying Vanguard's core US index funds, including the $1.9+ trillion Vanguard Total Stock Market (VTI / VTSAX).",
  },
  ice: {
    id: "ice",
    name: "Intercontinental Exchange (ICE Data Indices)",
    shortName: "ICE",
    logoText: "ICE",
    tagline:
      "Global exchange powerhouse calculating fixed income, commodity, and equity benchmarks.",
    description:
      "Intercontinental Exchange (ICE) operates leading global exchanges including the New York Stock Exchange (NYSE) and major clearing houses. ICE Data Indices and ICE Benchmark Administration (IBA) administer essential market benchmarks including the LBMA Gold & Silver Prices, ICE BofA Fixed Income Indexes, ICE US Treasury Indices (underlying SGOV), and the ICE Semiconductor Index (underlying SOXX).",
    headquarters: "Atlanta, GA, USA",
    founded: "2000 (NYSE: 1792)",
    website: "https://www.ice.com/market-data/indices",
    accentColor: "#0284c7",
    badgeBg: "rgba(2, 132, 199, 0.15)",
    keyEtfPartners: [
      "BlackRock (iShares)",
      "State Street (SPDR)",
      "Direxion",
      "Sprott",
      "Invesco",
    ],
    coverage:
      "Fixed Income (BofA), U.S. Treasuries, Precious Metals & Commodities (LBMA Gold/Silver/Platinum/Palladium), Equities & Semiconductors",
    marketShareSummary:
      "Administers the world's physical precious metals bullion benchmarks (LBMA Gold, Silver, Platinum, Palladium), the leading short-term US Treasury index ($110B+ SGOV), and ICE Semiconductor Index ($40B+ SOXX).",
  },
  marketvector: {
    id: "marketvector",
    name: "MarketVector Indexes",
    shortName: "MarketVector",
    logoText: "MVIS",
    tagline:
      "Pioneering specialized, liquid thematic, industry, and digital asset benchmarks.",
    description:
      "MarketVector Indexes (formerly MVIS), a subsidiary of VanEck founded in Frankfurt, Germany, develops and maintains specialized benchmarks designed specifically to underpin investable ETFs. It is renowned for the MVIS US Listed Semiconductor 25 Index underlying the $66B+ VanEck Semiconductor ETF (SMH), as well as major gold mining, critical materials, and digital asset benchmarks.",
    headquarters: "Frankfurt am Main, Germany",
    founded: "2011",
    website: "https://www.marketvector.com",
    accentColor: "#ea580c",
    badgeBg: "rgba(234, 88, 12, 0.15)",
    keyEtfPartners: ["VanEck (SMH / GDX / GDXJ / REMX)"],
    coverage:
      "Thematic & Industry Equities (Semiconductors, Gold Mining, Rare Earths, Clean Energy), Digital Assets & Crypto",
    marketShareSummary:
      "Underpins many of the largest thematic equity ETFs globally, most notably the $66B+ VanEck Semiconductor ETF (SMH) and $26B+ VanEck Gold Miners ETF (GDX).",
  },
  bloomberg: {
    id: "bloomberg",
    name: "Bloomberg Index Services",
    shortName: "Bloomberg",
    logoText: "Bloomberg",
    tagline: "Pioneering global fixed income, multi-asset, and ESG benchmarks.",
    description:
      "Bloomberg Index Services Limited (BISL) calculates and administers thousands of benchmarks across fixed income, equities, commodities, and currencies. Home to the legendary Bloomberg U.S. Aggregate Bond Index ('The Agg')—originally created by Lehman Brothers in 1973—Bloomberg is the preeminent benchmark standard for global institutional bond and fixed-income investing.",
    headquarters: "New York, NY, USA",
    founded: "1973 (Lehman) / 2016 (Bloomberg)",
    website: "https://www.bloomberg.com/professional/product/indices/",
    accentColor: "#f97316",
    badgeBg: "rgba(249, 115, 22, 0.15)",
    keyEtfPartners: [
      "BlackRock (iShares)",
      "Vanguard",
      "State Street (SPDR)",
      "Charles Schwab",
    ],
    coverage:
      "US & Global Fixed Income, Aggregate Bonds, US Treasuries, Corporate Credit, High Yield, Inflation-Linked (TIPS)",
    marketShareSummary:
      "Underpins the multi-trillion-dollar institutional fixed income world, including the $120B+ iShares Core U.S. Aggregate Bond ETF (AGG) and the $330B+ Vanguard Total Bond Market fund (BND).",
  },
  stoxx: {
    id: "stoxx",
    name: "STOXX Ltd. (Deutsche Börse Group)",
    shortName: "STOXX",
    logoText: "STOXX",
    tagline: "The leading benchmark provider for European and global markets.",
    description:
      "Part of Deutsche Börse Group, STOXX Ltd. is a global index provider and calculates more than 10,000 strictly rules-based and transparent indices. Famous for the blue-chip EURO STOXX 50, pan-European STOXX Europe 600, and Germany's national DAX 40 index, STOXX is the foundational standard for European equity and derivatives trading.",
    headquarters: "Frankfurt, Germany & Zug, Switzerland",
    founded: 1998,
    website: "https://www.stoxx.com",
    accentColor: "#0284c7",
    badgeBg: "rgba(2, 132, 199, 0.15)",
    keyEtfPartners: [
      "State Street (SPDR)",
      "BlackRock (iShares)",
      "DWS (Xtrackers)",
      "Amundi",
      "Invesco",
    ],
    coverage:
      "Eurozone Equities, Pan-European All-Cap, German Equities (DAX), Thematics & ESG",
    marketShareSummary:
      "EURO STOXX 50 derivatives are among the most liquid financial contracts globally, with hundreds of billions in ETFs and structured products benchmarked.",
  },
  euronext: {
    id: "euronext",
    name: "Euronext N.V.",
    shortName: "Euronext",
    logoText: "Euronext",
    tagline: "The leading pan-European stock exchange and index operator.",
    description:
      "Euronext operates regulated securities markets across Amsterdam, Brussels, Dublin, Lisbon, Milan, Oslo, and Paris. Euronext calculates iconic national benchmarks such as France's CAC 40, the Netherlands' AEX Index, Belgium's BEL 20, and the pan-European Euronext 100.",
    headquarters: "Amsterdam, Netherlands & Paris, France",
    founded: 2000,
    website: "https://www.euronext.com/en/indices",
    accentColor: "#0ea5e9",
    badgeBg: "rgba(14, 165, 233, 0.15)",
    keyEtfPartners: [
      "Amundi",
      "BlackRock (iShares)",
      "BNP Paribas Easy",
      "Lyxor",
    ],
    coverage:
      "French Equities (CAC 40), Dutch Equities (AEX), Belgian Equities, ESG & Climate Benchmarks",
    marketShareSummary:
      "Underpins the sovereign benchmarks for France, the Netherlands, and Belgium with over €4+ trillion in aggregate market capitalization.",
  },
  six: {
    id: "six",
    name: "SIX Financial Information",
    shortName: "SIX",
    logoText: "SIX",
    tagline: "The premier financial infrastructure and index powerhouse of Switzerland.",
    description:
      "SIX operates the infrastructure for the Swiss financial center and calculates the Swiss Market Index (SMI), Switzerland's most prominent equity benchmark comprising 20 blue-chip titans including Nestlé, Novartis, and Roche.",
    headquarters: "Zurich, Switzerland",
    founded: 1930,
    website: "https://www.six-group.com/en/products-services/financial-information/indices.html",
    accentColor: "#dc2626",
    badgeBg: "rgba(220, 38, 38, 0.15)",
    keyEtfPartners: [
      "UBS (UBS ETF)",
      "BlackRock (iShares)",
      "Credit Suisse",
      "Amundi",
    ],
    coverage:
      "Swiss Equities (SMI, SPI), Swiss Real Estate, Swiss Bond Indices (SBI)",
    marketShareSummary:
      "The SMI represents approximately 80% of total Swiss equity market capitalization and underpins all major Swiss-domiciled index funds.",
  },
  nikkei: {
    id: "nikkei",
    name: "Nikkei Inc. / Japan Exchange Group",
    shortName: "Nikkei / JPX",
    logoText: "Nikkei",
    tagline: "The definitive barometer for Japanese capital markets and industry.",
    description:
      "Nikkei Inc., publisher of Japan's leading financial daily, calculates the world-renowned Nikkei 225 index. Together with the Japan Exchange Group (JPX)—operator of the Tokyo Stock Exchange which calculates TOPIX—they represent the two pillars of Japanese equity benchmarking.",
    headquarters: "Tokyo, Japan",
    founded: "1950 (Nikkei 225) / 1969 (TOPIX)",
    website: "https://indexes.nikkei.co.jp/en/",
    accentColor: "#e11d48",
    badgeBg: "rgba(225, 29, 72, 0.15)",
    keyEtfPartners: [
      "Nomura (NEXT FUNDS)",
      "Daiwa (MAXIS)",
      "BlackRock (iShares)",
      "Mitsubishi UFJ",
    ],
    coverage:
      "Japanese Equities (Nikkei 225, TOPIX, JPX-Nikkei 400), High Dividend, Thematic",
    marketShareSummary:
      "Over $500B+ invested in ETFs tracking Nikkei 225 and TOPIX, forming the core holding of Japan's Government Pension Investment Fund (GPIF) and the Bank of Japan.",
  },
  hangseng: {
    id: "hangseng",
    name: "Hang Seng Indexes Company",
    shortName: "Hang Seng",
    logoText: "Hang Seng",
    tagline: "The premier benchmark compiler in Hong Kong and Greater China.",
    description:
      "A wholly-owned subsidiary of Hang Seng Bank, Hang Seng Indexes Company is the foremost compiler of Hong Kong and Mainland-linked indices. Its flagship Hang Seng Index (HSI) has served as the key barometer of the Hong Kong equity market since 1969.",
    headquarters: "Hong Kong",
    founded: 1969,
    website: "https://www.hsi.com.hk",
    accentColor: "#059669",
    badgeBg: "rgba(5, 150, 105, 0.15)",
    keyEtfPartners: [
      "Tracker Fund of Hong Kong (2800.HK)",
      "BlackRock (iShares)",
      "CSOP",
      "Hang Seng Investment Management",
    ],
    coverage:
      "Hong Kong Blue Chips (HSI), China Tech (HSTECH), Mainland Enterprises (HSCEI), ESG",
    marketShareSummary:
      "The Tracker Fund of Hong Kong (2800.HK) and other HSI/HSTECH funds constitute the deepest institutional liquidity pools in East Asia.",
  },
  nse: {
    id: "nse",
    name: "NSE Indices Limited",
    shortName: "NSE India",
    logoText: "NSE India",
    tagline: "The pulse of the world's fastest-growing major equity market.",
    description:
      "A subsidiary of the National Stock Exchange of India (NSE), NSE Indices develops and maintains the NIFTY brand of benchmarks. The flagship NIFTY 50 is India's preeminent stock index, representing 13 sectors of the Indian economy and serving as the underlying asset for domestic and offshore index products worldwide.",
    headquarters: "Mumbai, India",
    founded: 1998,
    website: "https://www.niftyindices.com",
    accentColor: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.15)",
    keyEtfPartners: [
      "Nippon India (Nifty BeES)",
      "SBI Mutual Fund",
      "HDFC AMC",
      "BlackRock (iShares)",
    ],
    coverage:
      "Indian Equities (NIFTY 50, NIFTY Next 50, NIFTY 500), Sectoral (NIFTY Bank, NIFTY IT), Fixed Income",
    marketShareSummary:
      "NSE is the world's largest derivatives exchange by volume, with NIFTY contracts and ETFs representing the premier vehicle for international capital entering India.",
  },
  csi: {
    id: "csi",
    name: "China Securities Index Co., Ltd.",
    shortName: "CSI",
    logoText: "CSI",
    tagline: "The foundational benchmark compiler for China's onshore A-Share markets.",
    description:
      "Jointly founded by the Shanghai Stock Exchange and Shenzhen Stock Exchange, China Securities Index (CSI) specializes in index calculation, maintenance, and licensing. Its flagship CSI 300 Index is widely considered the 'S&P 500 of China', capturing 300 large, liquid A-shares.",
    headquarters: "Shanghai, China",
    founded: 2005,
    website: "https://www.csindex.com.cn/en",
    accentColor: "#d97706",
    badgeBg: "rgba(217, 119, 6, 0.15)",
    keyEtfPartners: [
      "Huatai-PineBridge",
      "E Fund Management",
      "ChinaAMC",
      "DWS Xtrackers",
    ],
    coverage:
      "China A-Shares (CSI 300, CSI 500, CSI 1000), Cross-Market Equities, Green Finance",
    marketShareSummary:
      "Underpins mainland China's $200B+ onshore ETF ecosystem, including China's largest equity ETFs.",
  },
  krx: {
    id: "krx",
    name: "Korea Exchange (KRX)",
    shortName: "KRX",
    logoText: "KRX",
    tagline: "The premier financial exchange and index operator of South Korea.",
    description:
      "The sole securities exchange operator in South Korea, KRX calculates the KOSPI series of indices. The flagship KOSPI 200 tracks 200 blue-chip market leaders including Samsung Electronics, SK Hynix, and Hyundai Motor, reflecting the core of Korea's global technology and manufacturing powerhouse.",
    headquarters: "Busan & Seoul, South Korea",
    founded: 1956,
    website: "https://global.krx.co.kr",
    accentColor: "#2563eb",
    badgeBg: "rgba(37, 99, 235, 0.15)",
    keyEtfPartners: [
      "Samsung Asset Management (KODEX)",
      "Mirae Asset (TIGER)",
      "KB Asset Management",
      "BlackRock (iShares)",
    ],
    coverage:
      "South Korean Equities (KOSPI 200, KOSDAQ 150, KRX 300), Sectoral, ESG",
    marketShareSummary:
      "KOSPI 200 options and futures are among the most actively traded derivatives contracts worldwide, anchoring Korea's multi-billion dollar ETF industry.",
  },
  tsx: {
    id: "tsx",
    name: "TMX Group / Toronto Stock Exchange",
    shortName: "TSX",
    logoText: "TSX",
    tagline: "The premier Canadian capital markets and resource benchmarking leader.",
    description:
      "TMX Group operates the Toronto Stock Exchange and, in partnership with S&P Dow Jones, co-publishes the S&P/TSX index family. The flagship S&P/TSX 60 tracks Canada's top 60 companies across financials, energy, mining, and technology.",
    headquarters: "Toronto, Ontario, Canada",
    founded: 1861,
    website: "https://www.tmx.com",
    accentColor: "#b91c1c",
    badgeBg: "rgba(185, 28, 28, 0.15)",
    keyEtfPartners: [
      "BlackRock Canada (iShares XIU)",
      "BMO Global Asset Management",
      "Vanguard Canada",
      "Horizons ETFs",
    ],
    coverage:
      "Canadian Equities (S&P/TSX 60, S&P/TSX Composite), Energy, Financials, Materials",
    marketShareSummary:
      "Home to the world's very first ETF (TIPS 35, now the iShares S&P/TSX 60 ETF 'XIU') created in 1990.",
  },
};

export const PROVIDERS_LIST: IndexProvider[] = [
  PROVIDERS_DATA.sp,
  PROVIDERS_DATA.ftse,
  PROVIDERS_DATA.msci,
  PROVIDERS_DATA.nasdaq,
  PROVIDERS_DATA.crsp,
  PROVIDERS_DATA.ice,
  PROVIDERS_DATA.marketvector,
  PROVIDERS_DATA.bloomberg,
  PROVIDERS_DATA.stoxx,
  PROVIDERS_DATA.euronext,
  PROVIDERS_DATA.six,
  PROVIDERS_DATA.nikkei,
  PROVIDERS_DATA.hangseng,
  PROVIDERS_DATA.nse,
  PROVIDERS_DATA.csi,
  PROVIDERS_DATA.krx,
  PROVIDERS_DATA.tsx,
];
