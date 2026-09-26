/**
 * Returns the Stock Analysis URL for a given ETF ticker.
 * Example: 'VOO' -> 'https://stockanalysis.com/etf/voo/'
 */
export function getStockAnalysisEtfUrl(ticker: string): string {
  return `https://stockanalysis.com/etf/${encodeURIComponent(ticker.trim().toLowerCase())}/`;
}
