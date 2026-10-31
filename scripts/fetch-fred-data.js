import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDataDir = path.join(rootDir, "src", "data");
const publicDataDir = path.join(rootDir, "public", "data");

const FRED_API_KEY = process.env.FRED_API_KEY || "2d9fe8dbad89dabfd5afba8ca6e5f4f6";

const SERIES = [
  // Major U.S. Equity Benchmarks
  { id: "SP500", name: "S&P 500", category: "equity" },
  { id: "DJIA", name: "Dow Jones Industrial Average", category: "equity" },
  { id: "NASDAQ100", name: "NASDAQ 100", category: "equity" },
  { id: "NASDAQCOM", name: "NASDAQ Composite", category: "equity" },
  { id: "VIXCLS", name: "CBOE Volatility Index (VIX)", category: "equity" },

  // Economic, Global & Macro Indexes
  { id: "DGS10", name: "10-Year Treasury Constant Maturity Rate", category: "macro" },
  { id: "DGS2", name: "2-Year Treasury Constant Maturity Rate", category: "macro" },
  { id: "T10Y2Y", name: "10-Year minus 2-Year Treasury Yield Spread", category: "macro" },
  { id: "FEDFUNDS", name: "Federal Funds Effective Rate", category: "macro" },
  { id: "CPIAUCSL", name: "Consumer Price Index (CPI)", category: "macro" },
  { id: "DTWEXBGS", name: "Trade-Weighted U.S. Dollar Index", category: "macro" },
  { id: "DCOILWTICO", name: "Crude Oil (WTI)", category: "macro" },
  { id: "MORTGAGE30US", name: "30-Year Fixed Mortgage Rate", category: "macro" },
  { id: "BAMLH0A0HYM2", name: "US High Yield Option-Adjusted Spread", category: "macro" },
  { id: "GDPC1", name: "Real Gross Domestic Product (Real GDP)", category: "macro" },
];

function downsamplePoints(points) {
  // Downsample for optimized 5-year payload:
  // Last 252 points (~1 trading year): keep 100% daily
  // Prior to 1 year: keep 1 per 5 points (~weekly)
  const fiveYears = points.slice(-1260);
  if (fiveYears.length <= 252) {
    return fiveYears;
  }
  const recent = fiveYears.slice(-252);
  const older = fiveYears.slice(0, -252).filter((_, idx) => idx % 5 === 0);
  return [...older, ...recent];
}

async function fetchSeries(id) {
  // Try official FRED JSON API first
  if (FRED_API_KEY) {
    try {
      const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${id}&api_key=${FRED_API_KEY}&file_type=json`;
      const res = await fetch(url, {
        headers: { "User-Agent": "MarketIndices-BenchmarkTracker/1.0" },
      });
      if (res.ok) {
        const json = await res.json();
        const points = [];
        for (const item of json.observations || []) {
          if (item.value && item.value !== "." && !isNaN(Number(item.value))) {
            points.push([item.date, Number(Number(item.value).toFixed(2))]);
          }
        }
        if (points.length > 0) {
          return downsamplePoints(points);
        }
      }
    } catch {
      // Fallback to CSV
    }
  }

  // Fallback: FRED CSV endpoint
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "MarketIndices-BenchmarkTracker/1.0" },
    });
    if (!res.ok) {
      console.warn(`⚠️ Warning: Failed to fetch FRED series ${id} (HTTP ${res.status})`);
      return null;
    }
    const text = await res.text();
    const lines = text.trim().split("\n");
    const points = [];
    for (let i = 1; i < lines.length; i++) {
      const [date, val] = lines[i].split(",");
      if (val && val !== "." && !isNaN(Number(val))) {
        points.push([date, Number(Number(val).toFixed(2))]);
      }
    }
    return downsamplePoints(points);
  } catch (err) {
    console.warn(`⚠️ Error fetching FRED series ${id}:`, err.message);
    return null;
  }
}

async function main() {
  console.log("=========================================");
  console.log("📊 Fetching FRED Benchmark Tracker Data");
  console.log("=========================================");

  if (!fs.existsSync(srcDataDir)) fs.mkdirSync(srcDataDir, { recursive: true });
  if (!fs.existsSync(publicDataDir)) fs.mkdirSync(publicDataDir, { recursive: true });

  const existingFile = path.join(srcDataDir, "fredData.json");
  let existingData = {};
  if (fs.existsSync(existingFile)) {
    try {
      existingData = JSON.parse(fs.readFileSync(existingFile, "utf8"));
    } catch {
      existingData = {};
    }
  }

  const seriesData = {};
  let successCount = 0;

  for (const item of SERIES) {
    const observations = await fetchSeries(item.id);
    if (observations && observations.length > 0) {
      const latest = observations[observations.length - 1];
      const prev = observations[observations.length - 2];
      const change = prev ? latest[1] - prev[1] : 0;
      const changePct = prev && prev[1] !== 0 ? (change / prev[1]) * 100 : 0;

      // 52-week (last 252 points) high/low
      const lastYearPoints = observations.slice(-252).map((p) => p[1]);
      const high52 = Math.max(...lastYearPoints);
      const low52 = Math.min(...lastYearPoints);

      seriesData[item.id] = {
        id: item.id,
        name: item.name,
        category: item.category,
        observations,
        latestDate: latest[0],
        latestValue: latest[1],
        prevValue: prev ? prev[1] : latest[1],
        change: Number(change.toFixed(2)),
        changePct: Number(changePct.toFixed(2)),
        high52: Number(high52.toFixed(2)),
        low52: Number(low52.toFixed(2)),
      };
      successCount++;
      console.log(`✓ ${item.id.padEnd(12)}: ${observations.length} pts, latest: ${latest[0]} = ${latest[1]} (${change >= 0 ? "+" : ""}${change.toFixed(2)})`);
    } else if (existingData.series && existingData.series[item.id]) {
      console.log(`ℹ️ Preserved existing data for ${item.id}`);
    }
  }

  const payload = {
    updatedAt: new Date().toISOString(),
    seriesCount: Object.keys(seriesData).length,
    series: seriesData,
  };

  const jsonStr = JSON.stringify(payload) + "\n";
  fs.writeFileSync(path.join(srcDataDir, "fredData.json"), jsonStr, "utf8");
  fs.writeFileSync(path.join(publicDataDir, "fred-data.json"), jsonStr, "utf8");

  const kb = (Buffer.byteLength(jsonStr, "utf8") / 1024).toFixed(1);
  console.log(`=========================================`);
  console.log(`🎉 FRED Data Generation Complete (${successCount}/${SERIES.length} series, ${kb} KB)`);
  console.log(`=========================================`);
}

main().catch((err) => {
  console.error("FATAL: Failed to generate FRED data:", err);
  process.exit(1);
});
