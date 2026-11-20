import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COUNTRY_METADATA = {
  "United States": {
    code: "US",
    flag: "🇺🇸",
    region: "Americas",
    primaryExchanges: ["NYSE", "NASDAQ"],
    topCompany: { name: "NVIDIA", ticker: "NVDA", marketCap: "$3.50 T" },
  },
  China: {
    code: "CN",
    flag: "🇨🇳",
    region: "Asia-Pacific",
    primaryExchanges: ["SSE", "SZSE"],
    topCompany: { name: "Tencent", ticker: "0700.HK", marketCap: "$540 B" },
  },
  Japan: {
    code: "JP",
    flag: "🇯🇵",
    region: "Asia-Pacific",
    primaryExchanges: ["TSE (Tokyo)"],
    topCompany: { name: "Toyota Motor", ticker: "7203.T", marketCap: "$310 B" },
  },
  India: {
    code: "IN",
    flag: "🇮🇳",
    region: "Asia-Pacific",
    primaryExchanges: ["NSE", "BSE"],
    topCompany: { name: "Reliance Industries", ticker: "RELIANCE.NS", marketCap: "$240 B" },
  },
  "United Kingdom": {
    code: "GB",
    flag: "🇬🇧",
    region: "Europe",
    primaryExchanges: ["LSE (London)"],
    topCompany: { name: "AstraZeneca", ticker: "AZN", marketCap: "$220 B" },
  },
  Canada: {
    code: "CA",
    flag: "🇨🇦",
    region: "Americas",
    primaryExchanges: ["TSX (Toronto)"],
    topCompany: { name: "Royal Bank of Canada", ticker: "RY", marketCap: "$175 B" },
  },
  Taiwan: {
    code: "TW",
    flag: "🇹🇼",
    region: "Asia-Pacific",
    primaryExchanges: ["TWSE (Taiwan)"],
    topCompany: { name: "TSMC", ticker: "2330.TW", marketCap: "$950 B" },
  },
  Switzerland: {
    code: "CH",
    flag: "🇨🇭",
    region: "Europe",
    primaryExchanges: ["SIX Swiss Exchange"],
    topCompany: { name: "Nestlé", ticker: "NESN.SW", marketCap: "$260 B" },
  },
  France: {
    code: "FR",
    flag: "🇫🇷",
    region: "Europe",
    primaryExchanges: ["Euronext Paris"],
    topCompany: { name: "LVMH", ticker: "MC.PA", marketCap: "$360 B" },
  },
  "South Korea": {
    code: "KR",
    flag: "🇰🇷",
    region: "Asia-Pacific",
    primaryExchanges: ["KRX (Korea)"],
    topCompany: { name: "Samsung Electronics", ticker: "005930.KS", marketCap: "$340 B" },
  },
  Germany: {
    code: "DE",
    flag: "🇩🇪",
    region: "Europe",
    primaryExchanges: ["Deutsche Börse (Xetra)"],
    topCompany: { name: "SAP", ticker: "SAP", marketCap: "$265 B" },
  },
  "Saudi Arabia": {
    code: "SA",
    flag: "🇸🇦",
    region: "Middle East",
    primaryExchanges: ["Saudi Tadawul"],
    topCompany: { name: "Saudi Aramco", ticker: "2222.SR", marketCap: "$1.75 T" },
  },
  Australia: {
    code: "AU",
    flag: "🇦🇺",
    region: "Asia-Pacific",
    primaryExchanges: ["ASX (Sydney)"],
    topCompany: { name: "BHP Group", ticker: "BHP", marketCap: "$140 B" },
  },
  Netherlands: {
    code: "NL",
    flag: "🇳🇱",
    region: "Europe",
    primaryExchanges: ["Euronext Amsterdam"],
    topCompany: { name: "ASML Holding", ticker: "ASML", marketCap: "$340 B" },
  },
  Spain: {
    code: "ES",
    flag: "🇪🇸",
    region: "Europe",
    primaryExchanges: ["BME (Madrid)"],
    topCompany: { name: "Inditex (Zara)", ticker: "ITX.MC", marketCap: "$160 B" },
  },
  Sweden: {
    code: "SE",
    flag: "🇸🇪",
    region: "Europe",
    primaryExchanges: ["Nasdaq Stockholm"],
    topCompany: { name: "Atlas Copco", ticker: "ATCO-A.ST", marketCap: "$85 B" },
  },
  Italy: {
    code: "IT",
    flag: "🇮🇹",
    region: "Europe",
    primaryExchanges: ["Borsa Italiana (Milan)"],
    topCompany: { name: "Ferrari", ticker: "RACE", marketCap: "$85 B" },
  },
  "Hong Kong": {
    code: "HK",
    flag: "🇭🇰",
    region: "Asia-Pacific",
    primaryExchanges: ["HKEX (Hong Kong)"],
    topCompany: { name: "AIA Group", ticker: "1299.HK", marketCap: "$95 B" },
  },
  Ireland: {
    code: "IE",
    flag: "🇮🇪",
    region: "Europe",
    primaryExchanges: ["Euronext Dublin"],
    topCompany: { name: "Accenture", ticker: "ACN", marketCap: "$220 B" },
  },
  "United Arab Emirates": {
    code: "AE",
    flag: "🇦🇪",
    region: "Middle East",
    primaryExchanges: ["ADX (Abu Dhabi)", "DFM (Dubai)"],
    topCompany: { name: "IHC", ticker: "IHC.AE", marketCap: "$240 B" },
  },
  Brazil: {
    code: "BR",
    flag: "🇧🇷",
    region: "Americas",
    primaryExchanges: ["B3 (São Paulo)"],
    topCompany: { name: "Petrobras", ticker: "PETR4", marketCap: "$95 B" },
  },
  Singapore: {
    code: "SG",
    flag: "🇸🇬",
    region: "Asia-Pacific",
    primaryExchanges: ["SGX (Singapore)"],
    topCompany: { name: "DBS Group", ticker: "D05.SI", marketCap: "$80 B" },
  },
  Denmark: {
    code: "DK",
    flag: "🇩🇰",
    region: "Europe",
    primaryExchanges: ["Nasdaq Copenhagen"],
    topCompany: { name: "Novo Nordisk", ticker: "NOVO-B.CO", marketCap: "$520 B" },
  },
  Mexico: {
    code: "MX",
    flag: "🇲🇽",
    region: "Americas",
    primaryExchanges: ["BMV (Bolsa Mexicana)"],
    topCompany: { name: "América Móvil", ticker: "AMX", marketCap: "$65 B" },
  },
  Belgium: {
    code: "BE",
    flag: "🇧🇪",
    region: "Europe",
    primaryExchanges: ["Euronext Brussels"],
    topCompany: { name: "Anheuser-Busch InBev", ticker: "ABI.BR", marketCap: "$120 B" },
  },
  Israel: {
    code: "IL",
    flag: "🇮🇱",
    region: "Middle East",
    primaryExchanges: ["TASE (Tel Aviv)"],
    topCompany: { name: "Check Point", ticker: "CHKP", marketCap: "$24 B" },
  },
  Thailand: {
    code: "TH",
    flag: "🇹🇭",
    region: "Asia-Pacific",
    primaryExchanges: ["SET (Stock Exchange of Thailand)"],
    topCompany: { name: "PTT Public Co.", ticker: "PTT.BK", marketCap: "$30 B" },
  },
  Norway: {
    code: "NO",
    flag: "🇳🇴",
    region: "Europe",
    primaryExchanges: ["Oslo Børs"],
    topCompany: { name: "Equinor", ticker: "EQNR", marketCap: "$75 B" },
  },
  Finland: {
    code: "FI",
    flag: "🇫🇮",
    region: "Europe",
    primaryExchanges: ["Nasdaq Helsinki"],
    topCompany: { name: "KONE", ticker: "KNEBV.HE", marketCap: "$26 B" },
  },
  "South Africa": {
    code: "ZA",
    flag: "🇿🇦",
    region: "Africa",
    primaryExchanges: ["JSE (Johannesburg)"],
    topCompany: { name: "Naspers", ticker: "NPN.JO", marketCap: "$45 B" },
  },
};

function formatMarketCap(val) {
  if (val >= 1e12) {
    return `$${(val / 1e12).toFixed(2)} T`;
  }
  if (val >= 1e9) {
    return `$${(val / 1e9).toFixed(2)} B`;
  }
  return `$${val.toLocaleString()}`;
}

function fetchPage() {
  return new Promise((resolve, reject) => {
    https
      .get(
        "https://companiesmarketcap.com/all-countries/",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
          },
        },
        (res) => {
          let html = "";
          res.on("data", (chunk) => (html += chunk));
          res.on("end", () => resolve(html));
        }
      )
      .on("error", reject);
  });
}

async function main() {
  console.log("Fetching country market capitalization data from companiesmarketcap.com...");
  let html;
  try {
    html = await fetchPage();
  } catch (err) {
    console.error("Failed to fetch live page:", err.message);
    process.exit(1);
  }

  const rowRegex =
    /<tr[^>]*><td[^>]*data-sort="(\d+)"[^>]*>.*?<td[^>]*data-sort="([^"]+)"[^>]*><a[^>]*>(.*?)<\/a><\/td><td[^>]*data-sort="(\d+)"[^>]*>.*?<\/td><td[^>]*data-sort="(\d+)"[^>]*>/g;

  let match;
  const rawList = [];
  while ((match = rowRegex.exec(html)) !== null && rawList.length < 30) {
    const [_, rank, country, _linkText, marketCapStr, countStr] = match;
    rawList.push({
      rank: parseInt(rank, 10),
      country: country.trim(),
      marketCapUsd: parseInt(marketCapStr, 10),
      companiesCount: parseInt(countStr, 10),
    });
  }

  if (rawList.length === 0) {
    console.error("Error: Parsed 0 rows. Website layout may have changed.");
    process.exit(1);
  }

  // Calculate total across top 30
  const top30TotalUsd = rawList.reduce((sum, item) => sum + item.marketCapUsd, 0);

  const countries = rawList.map((item) => {
    const meta = COUNTRY_METADATA[item.country] || {
      code: item.country.slice(0, 2).toUpperCase(),
      flag: "🌐",
      region: "Global",
      primaryExchanges: [],
      topCompany: { name: "N/A", ticker: "N/A", marketCap: "N/A" },
    };

    const shareOfGlobalPct = parseFloat(
      ((item.marketCapUsd / top30TotalUsd) * 100).toFixed(2)
    );

    return {
      rank: item.rank,
      country: item.country,
      countryCode: meta.code,
      flag: meta.flag,
      marketCapUsd: item.marketCapUsd,
      formattedMarketCap: formatMarketCap(item.marketCapUsd),
      shareOfGlobalPct,
      companiesCount: item.companiesCount,
      region: meta.region,
      primaryExchanges: meta.primaryExchanges,
      topCompany: meta.topCompany,
    };
  });

  const dataset = {
    updatedAt: new Date().toISOString(),
    source: "CompaniesMarketCap (companiesmarketcap.com/all-countries/)",
    top30TotalUsd,
    top30TotalFormatted: formatMarketCap(top30TotalUsd),
    countriesCount: countries.length,
    countries,
  };

  const tsContent = `// Automatically generated by scripts/fetch-country-market-cap.js
// Sourced from CompaniesMarketCap (https://companiesmarketcap.com/all-countries/)
// Run \`npm run sync:market-cap\` to refresh.

export interface TopCompanyMeta {
  name: string;
  ticker: string;
  marketCap: string;
}

export type CountryRegion =
  | "Americas"
  | "Europe"
  | "Asia-Pacific"
  | "Middle East"
  | "Africa";

export interface CountryMarketCap {
  rank: number;
  country: string;
  countryCode: string;
  flag: string;
  marketCapUsd: number;
  formattedMarketCap: string;
  shareOfGlobalPct: number;
  companiesCount: number;
  region: CountryRegion;
  primaryExchanges: string[];
  topCompany: TopCompanyMeta;
}

export interface CountryMarketCapDataset {
  updatedAt: string;
  source: string;
  top30TotalUsd: number;
  top30TotalFormatted: string;
  countriesCount: number;
  countries: CountryMarketCap[];
}

export const COUNTRY_MARKET_CAP_DATA: CountryMarketCapDataset = ${JSON.stringify(
    dataset,
    null,
    2
  )};
`;

  const outputPath = path.resolve(__dirname, "../src/data/countryMarketCapData.ts");
  fs.writeFileSync(outputPath, tsContent, "utf8");
  console.log(`✓ Successfully written Top 30 Country Market Cap data to ${outputPath}`);
}

main();
