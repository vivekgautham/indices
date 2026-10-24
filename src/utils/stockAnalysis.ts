/**
 * Known non-US ETF tickers or foreign exchange listings that do not have
 * a dedicated ETF profile page on StockAnalysis.com.
 */
const NON_STOCK_ANALYSIS_TICKERS = new Set([
  // European UCITS
  "SX5E",
  "EXSA",
  "LYP6",
  "DAXEX",
  "CAC",
  "IAEX",
  "CSSMI",
  // Irish-domiciled UCITS
  "CSPX",
  "VUAA",
  "VUSA",
  "CNDX",
  "EQQQ",
  "EQAC",
  "EWSP",
  "ISPE",
  "IUIT",
  "XLKT",
  "SPY4",
  "IJPH",
  "ISP6",
  "USDV",
  "R2US",
  "CIND",
  "IUEN",
  "IUCS",
  "IUID",
  "SMGB",
  "VWRA",
  "VWRD",
  "VHYA",
  "VHYD",
  "SUAG",
  "DTLA",
  "IDTL",
  "IB01",
  "IBTM",
  "CTYM",
  "SSAC",
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
 * Example: 'VOO' -> 'https://stockanalysis.com/etf/voo/'
 */
export function getStockAnalysisEtfUrl(
  ticker: string,
  hasStockAnalysis?: boolean
): string | null {
  if (!hasStockAnalysisPage(ticker, hasStockAnalysis)) {
    return null;
  }
  return `https://stockanalysis.com/etf/${encodeURIComponent(ticker.trim().toLowerCase())}/`;
}
