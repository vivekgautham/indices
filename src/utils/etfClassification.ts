import type { TrackingEtf } from "../types/index.ts";

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
 * Returns a human-friendly strategy description or tooltip note for the ETF.
 */
export function getEtfStrategyDescription(etf: TrackingEtf): string {
  if (etf.strategyNote) return etf.strategyNote;
  if (isActivelyManagedEtf(etf)) {
    return "Actively managed fund using systematic factor tilts or active selection benchmarked against this index, rather than mechanical index replication.";
  }
  return "Passive index fund designed to track and replicate the performance of this benchmark.";
}
