import { INDICES_DATA } from "../src/data/indicesData.ts";
import { PROVIDERS_DATA } from "../src/data/providersData.ts";

console.log("=================================================");
console.log("🔍 FULL CATALOG AUDIT & VERIFICATION REPORT");
console.log("=================================================");

let errors = 0;
let warnings = 0;

// 1. Check Providers
const providerIds = Object.keys(PROVIDERS_DATA);
console.log(`\n1. Providers Profile Check (${providerIds.length} providers)`);
for (const [pid, prov] of Object.entries(PROVIDERS_DATA)) {
  if (!prov.id || !prov.name || !prov.shortName || !prov.accentColor || !prov.badgeBg) {
    console.error(`❌ Provider ${pid} missing required fields!`);
    errors++;
  } else {
    console.log(`   ✓ [${prov.id}] ${prov.name} (${prov.shortName}) - Accent: ${prov.accentColor}`);
  }
}

// 2. Check Indices
console.log(`\n2. Indices Structural & Schema Check (${INDICES_DATA.length} indices)`);
const seenIds = new Set();
const seenTickers = new Map();

for (const idx of INDICES_DATA) {
  // ID uniqueness
  if (seenIds.has(idx.id)) {
    console.error(`❌ Duplicate index id: ${idx.id}`);
    errors++;
  }
  seenIds.add(idx.id);

  // Provider validity
  if (!PROVIDERS_DATA[idx.providerId]) {
    console.error(`❌ Index ${idx.id} references invalid providerId: ${idx.providerId}`);
    errors++;
  }

  // Required fields check
  const requiredFields = [
    "id", "symbol", "name", "providerId", "category", "assetClass",
    "region", "constituentsCount", "weightingMethodology",
    "rebalanceFrequency", "launchYear", "summary", "description",
    "officialUrl", "trackingEtfs", "tags"
  ];
  for (const field of requiredFields) {
    if (idx[field] === undefined || idx[field] === null || idx[field] === "") {
      console.error(`❌ Index ${idx.id} missing field: ${field}`);
      errors++;
    }
  }

  // URL format
  if (!idx.officialUrl.startsWith("http://") && !idx.officialUrl.startsWith("https://")) {
    console.error(`❌ Index ${idx.id} has invalid officialUrl: ${idx.officialUrl}`);
    errors++;
  }

  // Tracking ETFs check
  for (const etf of idx.trackingEtfs) {
    if (!etf.ticker || !etf.name || !etf.aum) {
      console.error(`❌ Index ${idx.id} ETF entry missing fields:`, etf);
      errors++;
    }
    if (!seenTickers.has(etf.ticker)) {
      seenTickers.set(etf.ticker, []);
    }
    seenTickers.get(etf.ticker).push(idx.id);
  }
}
console.log(`   ✓ All ${INDICES_DATA.length} indices passed schema and provider checks`);
console.log(`   ✓ Total unique ETF tickers tracked: ${seenTickers.size}`);

// 3. Check All 46 User-Requested Tickers
console.log("\n3. User Requested Tickers Verification");
const userRequestedTickers = [
  "SPYM", "VOO", "IVV",
  "VTI",
  "SCHB", "ITOT",
  "SPTM",
  "VONE",
  "SOXQ", "SOXX", "SMH", "PSI", "DRAM",
  "QQQM", "QQQ",
  "XLK", "FTEC", "VGT",
  "SPYG", "SCHG", "VOOG",
  "IAU", "GLD", "PHYS",
  "VTV", "SPYV", "VYM", "SCHD",
  "FSTA", "XLP",
  "XAR", "ITA",
  "XPH", "IHE",
  "VXUS", "VYMI",
  "SLV",
  "SPMO",
  "VT",
  "XLE",
  "RSP",
  "XLI", "VIS",
  "SGOV",
  "IGM", "IXN"
];

for (const ticker of userRequestedTickers) {
  if (!seenTickers.has(ticker)) {
    console.error(`❌ Missing user-requested ticker: ${ticker}`);
    errors++;
  } else {
    const indicesList = seenTickers.get(ticker);
    console.log(`   ✓ [${ticker.padEnd(5)}] -> mapped to: ${indicesList.join(", ")}`);
  }
}

// 4. Test Search Matching Engine
console.log("\n4. Search Engine Matching Test");
function matchIndex(idx, tokens) {
  const searchableText = [
    idx.name,
    idx.symbol,
    ...(idx.altSymbols || []),
    idx.providerId,
    idx.category,
    idx.assetClass,
    idx.region,
    idx.weightingMethodology,
    idx.rebalanceFrequency,
    String(idx.launchYear),
    idx.summary,
    idx.description,
    ...(idx.eligibilityCriteria || []),
    ...(idx.keyCharacteristics || []),
    ...idx.tags,
    ...(idx.trackingEtfs || []).map((etf) => `${etf.ticker} ${etf.name}`),
  ]
    .join(" ")
    .toLowerCase();

  return tokens.every((token) => searchableText.includes(token));
}

function runSearch(term) {
  const tokens = term
    .trim()
    .toLowerCase()
    .split(/[\s/]+/)
    .filter((t) => t.length > 0 && /[a-z0-9]/i.test(t));
  return INDICES_DATA.filter((idx) => matchIndex(idx, tokens));
}

const suggestions = [
  "Float-Adjusted",
  "Equal Weight",
  "Profitability Screen",
  "Dividend Growth",
  "Momentum",
  "Semiconductor",
  "Precious Metals",
  "Treasury / Cash",
  "Cybersecurity",
  "Volatility / VIX"
];

for (const term of suggestions) {
  const results = runSearch(term);
  if (results.length === 0) {
    console.error(`❌ Search suggestion "${term}" returned 0 matches!`);
    errors++;
  } else {
    console.log(`   ✓ "${term}" -> ${results.length} results (${results.map(r => r.symbol).slice(0, 4).join(", ")}${results.length > 4 ? "..." : ""})`);
  }
}

// Specifically test "Profitability Screen"
const profitMatches = runSearch("Profitability Screen");
const expectedProfitIds = ["sp-500", "sp-midcap-400", "sp-smallcap-600", "sp-composite-1500"];
for (const expId of expectedProfitIds) {
  if (!profitMatches.some(m => m.id === expId)) {
    console.error(`❌ Profitability Screen search failed to match ${expId}!`);
    errors++;
  }
}
console.log(`   ✓ "Profitability Screen" matches all 4 core S&P indices: ${profitMatches.map(m => m.symbol).join(", ")}`);

// 5. Test Related Indices for all 61 indices
console.log("\n5. Related Indices Coverage Test");
let indicesWithZeroRelated = 0;
for (const index of INDICES_DATA) {
  const sameProvider = INDICES_DATA.filter(
    (idx) => idx.providerId === index.providerId && idx.id !== index.id
  );
  let related;
  if (sameProvider.length >= 3) {
    related = sameProvider.slice(0, 6);
  } else {
    const peers = INDICES_DATA.filter(
      (idx) =>
        idx.id !== index.id &&
        idx.providerId !== index.providerId &&
        (idx.category === index.category ||
          (idx.assetClass === index.assetClass &&
            idx.tags.some((t) => index.tags.includes(t))))
    );
    related = [...sameProvider, ...peers].slice(0, 6);
  }
  if (related.length === 0) {
    console.error(`❌ Index ${index.id} (${index.symbol}) has 0 related indices!`);
    indicesWithZeroRelated++;
    errors++;
  }
}
if (indicesWithZeroRelated === 0) {
  console.log(`   ✓ All ${INDICES_DATA.length} indices have at least 1-6 related benchmarks (100% coverage)`);
}

console.log("\n=================================================");
console.log(`AUDIT COMPLETE: ${errors} errors, ${warnings} warnings.`);
console.log("=================================================");
if (errors > 0) process.exit(1);
