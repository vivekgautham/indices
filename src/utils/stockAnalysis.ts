/**
 * Known tickers listed on the London Stock Exchange (LON) where Stock Analysis
 * provides data under the /quote/lon/<ticker>/ URL structure.
 * Maps input ticker symbols to their respective LON quote symbol.
 */
export const LON_STOCK_ANALYSIS_TICKERS: Record<string, string> = {
  // Irish-domiciled UCITS ETFs on London Stock Exchange
  CSPX: "CSPX",
  VUAA: "VUAA",
  VUSA: "VUSA",
  CNDX: "CNDX",
  EQQQ: "EQQQ",
  EQQU: "EQQU",
  EQAC: "EQQU", // EQAC (SWX/BIT) trades as EQQU on LON
  EWSP: "EWSP",
  ISPE: "ISPE",
  IUIT: "IUIT",
  XLKS: "XLKS",
  XLKT: "XLKS", // Trades as XLKS on LON
  SPY4: "SPY4",
  IJPH: "IJPH",
  ISP6: "ISP6",
  USDV: "USDV",
  R2US: "R2US",
  CIND: "CIND",
  IUES: "IUES",
  IUEN: "IUES", // iShares Energy trades as IUES on LON
  IUCS: "IUCS",
  IUIS: "IUIS",
  IUID: "IUIS", // iShares Industrials trades as IUIS on LON
  SMGB: "SMGB",
  VWRA: "VWRA",
  VWRD: "VWRD",
  VHYA: "VHYA",
  VHYD: "VHYD",
  SUAG: "SUAG",
  DTLA: "DTLA",
  IDTL: "IDTL",
  IB01: "IB01",
  IBTM: "IBTM",
  CBU0: "CBU0",
  CTYM: "CBU0", // iShares 7-10yr Acc trades as CBU0 on LON
  SSAC: "SSAC",
  IAEX: "IAEX",
};

/**
 * Known non-US ETF tickers or foreign exchange listings that do not have
 * a dedicated ETF profile page on StockAnalysis.com.
 */
const NON_STOCK_ANALYSIS_TICKERS = new Set([
  // European UCITS not on Stock Analysis
  "SX5E",
  "EXSA",
  "LYP6",
  "DAXEX",
  "CAC",
  "CSSMI",
  // Canadian TSX
  "XIU",
  "XIC",
  "VCN",
  // Tokyo Stock Exchange
  "1321.T",
  "1306.T",
  "1348.T",
  // Hong Kong Exchanges
  "2800.HK",
  "3033.HK",
  "3067.HK",
  // National Stock Exchange of India
  "NIFTYBEES",
  "JUNIORBEES",
  "SBINIFTYJ",
  "BANKBEES",
  "KOTAKBKETF",
  // Shanghai Stock Exchange
  "510300.SH",
  "510500.SH",
  // Korea Exchange
  "069500.KS",
]);

/**
 * Checks if a given ETF ticker has a valid Stock Analysis page.
 * Returns false if explicitly marked false, or if it matches non-US exchange patterns
 * (e.g. contains dots/numbers, longer than 5 letters, or in known international ticker list).
 */
export function hasStockAnalysisPage(
  ticker: string,
  hasStockAnalysis?: boolean
): boolean {
  if (hasStockAnalysis === false) return false;
  if (hasStockAnalysis === true) return true;

  const normalized = ticker.trim().toUpperCase();
  if (LON_STOCK_ANALYSIS_TICKERS[normalized]) {
    return true;
  }
  if (NON_STOCK_ANALYSIS_TICKERS.has(normalized)) {
    return false;
  }
  // US ETF tickers are 1 to 5 alphabetic characters without dots or digits
  if (!/^[A-Z]{1,5}$/.test(normalized)) {
    return false;
  }

  return true;
}

/**
 * Returns the Stock Analysis URL for a given ETF ticker, or null if no valid page exists.
 * - For London Stock Exchange listings: https://stockanalysis.com/quote/lon/<TICKER>/
 * - For US ETF tickers: https://stockanalysis.com/etf/<ticker>/
 */
export function getStockAnalysisEtfUrl(
  ticker: string,
  hasStockAnalysis?: boolean,
  customUrl?: string
): string | null {
  if (customUrl) return customUrl;
  if (!hasStockAnalysisPage(ticker, hasStockAnalysis)) {
    return null;
  }

  const normalized = ticker.trim().toUpperCase();
  const lonTicker = LON_STOCK_ANALYSIS_TICKERS[normalized];
  if (lonTicker) {
    return `https://stockanalysis.com/quote/lon/${encodeURIComponent(lonTicker)}/`;
  }

  return `https://stockanalysis.com/etf/${encodeURIComponent(ticker.trim().toLowerCase())}/`;
}
