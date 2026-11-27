import type { FlatEtfItem, MarketIndex, TrackingEtf } from "../types/index.ts";

/**
 * Determines whether a tracking ETF is an active benchmark / factor strategy
 * rather than a purely passive index replication fund.
 */
export function isActivelyManagedEtf(etf: TrackingEtf): boolean {
  if (etf.trackingType === "active") return true;
  if (etf.trackingType === "passive") return false;
  return /active/i.test(etf.name);
}

/**
 * Determines the fund issuer/sponsor from ETF name or ticker.
 */
export function getEtfIssuer(name: string, ticker: string): string {
  if (/avantis/i.test(name)) return "Avantis";
  if (/vanguard/i.test(name)) return "Vanguard";
  if (/ishares/i.test(name)) return "iShares (BlackRock)";
  if (/spdr|state street/i.test(name)) return "SPDR (State Street)";
  if (/invesco/i.test(name)) return "Invesco";
  if (/schwab/i.test(name)) return "Charles Schwab";
  if (/fidelity/i.test(name)) return "Fidelity";
  if (/jpmorgan|j\.p\. morgan/i.test(name) || /^(JEPI|JEPQ)$/i.test(ticker))
    return "JPMorgan";
  if (/direxion/i.test(name)) return "Direxion";
  if (/proshares/i.test(name)) return "ProShares";
  if (/vaneck/i.test(name)) return "VanEck";
  if (/global x/i.test(name)) return "Global X";
  if (/roundhill/i.test(name)) return "Roundhill";
  if (/first trust/i.test(name)) return "First Trust";
  if (/dws|xtrackers/i.test(name)) return "DWS Xtrackers";
  if (/amundi/i.test(name)) return "Amundi";
  return "Other";
}

/**
 * Parses an AUM string (e.g. "$1.05T+", "$815B+", "$500M+", "€1.8B+", "A$16.5B+", "$83B+ (ETF) / $105B+ (Fund)")
 * into a standardized numeric USD-approximate value for accurate sorting and comparisons.
 */
export function parseAumValue(aumStr?: string): number {
  if (!aumStr) return 0;

  // Approximate FX conversion rates to USD for uniform comparison across international ETFs
  let fx = 1.0;
  if (/¥/i.test(aumStr)) fx = 0.0067;
  else if (/SEK/i.test(aumStr)) fx = 0.095;
  else if (/^R\d|ZAR/i.test(aumStr)) fx = 0.055;
  else if (/A\$/i.test(aumStr)) fx = 0.65;
  else if (/S\$/i.test(aumStr)) fx = 0.75;
  else if (/€/i.test(aumStr)) fx = 1.08;
  else if (/£/i.test(aumStr)) fx = 1.28;

  // Match the first numeric quantity and scale unit (T, B, M, K)
  const match = aumStr.match(/([\d.,]+)\s*([TMBK])/i);
  if (!match) return 0;
  const num = parseFloat(match[1].replace(/,/g, ""));
  if (isNaN(num)) return 0;

  const unit = match[2].toUpperCase();
  let multiplier = 1;
  if (unit === "T") multiplier = 1e12;
  else if (unit === "B") multiplier = 1e9;
  else if (unit === "M") multiplier = 1e6;
  else if (unit === "K") multiplier = 1e3;

  return num * multiplier * fx;
}

/**
 * Returns a human-friendly strategy description or tooltip note for the ETF.
 */
export function getEtfStrategyDescription(etf: TrackingEtf): string {
  if (etf.strategyNote) return etf.strategyNote;
  if (isActivelyManagedEtf(etf)) {
    return "Actively managed fund using systematic factor tilts or active selection benchmarked against this index, rather than mechanical index replication.";
  }
  return "Passive index fund designed to track and replicate the performance of this benchmark.";
}

/**
 * Flattens all tracking ETFs from market indices into a rich searchable ETF list.
 */
export function flattenEtfsFromIndices(indices: MarketIndex[]): FlatEtfItem[] {
  const result: FlatEtfItem[] = [];
  for (const idx of indices) {
    for (const etf of idx.trackingEtfs || []) {
      const isActive = isActivelyManagedEtf(etf);
      result.push({
        ...etf,
        isActive,
        issuer: getEtfIssuer(etf.name, etf.ticker),
        indexId: idx.id,
        indexName: idx.name,
        indexSymbol: idx.symbol,
        indexProviderId: idx.providerId,
        category: idx.category,
        assetClass: idx.assetClass,
        region: idx.region,
        weightingMethodology: idx.weightingMethodology,
        rebalanceFrequency: idx.rebalanceFrequency,
      });
    }
  }
  return result;
}
