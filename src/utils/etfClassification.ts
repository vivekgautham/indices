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
