import fs from "fs";
import https from "https";

function fetchUrl(url) {
  return new Promise((resolve) => {
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve(data));
        }
      )
      .on("error", () => resolve(""));
  });
}

async function getStockAnalysisAum(ticker) {
  const html = await fetchUrl(
    "https://stockanalysis.com/etf/" + ticker.toLowerCase() + "/"
  );
  const aumMatch = html.match(/aum:"([^"]+)"/i);
  if (aumMatch) return aumMatch[1];
  const marketCapMatch = html.match(/marketCap:"([^"]+)"/i);
  if (marketCapMatch) return marketCapMatch[1];
  const totalAssetsMatch = html.match(/totalAssets:"([^"]+)"/i);
  if (totalAssetsMatch) return totalAssetsMatch[1];

  // Try parsing from page content
  const idx = html.indexOf("Assets under Management");
  if (idx !== -1) {
    const chunk = html.substring(idx, idx + 200);
    const m = chunk.match(/\$([0-9.]+\s*[BMT])/i);
    if (m) return "$" + m[1];
  }
  return null;
}

const content = fs.readFileSync("src/data/indicesData.ts", "utf8");
const tickers = [
  ...new Set(
    [...content.matchAll(/ticker:\s*"([^"]+)"/g)].map((m) => m[1])
  ),
];

async function run() {
  const aumMap = {};
  for (const t of tickers) {
    const aum = await getStockAnalysisAum(t);
    aumMap[t] = aum;
    console.log(`${t} -> ${aum}`);
  }
  if (!fs.existsSync("scratch")) {
    fs.mkdirSync("scratch");
  }
  fs.writeFileSync("scratch/aums.json", JSON.stringify(aumMap, null, 2));
}

run();
