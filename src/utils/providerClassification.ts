import { INDICES_DATA } from "../data/indicesData";
import { PROVIDERS_LIST } from "../data/providersData";
import { IndexProvider, ProviderId } from "../types";

export const OTHER_PROVIDER_THRESHOLD = 10;

/**
 * Baseline count of indices per provider across the entire catalog.
 */
export const CATALOG_PROVIDER_COUNTS: Record<ProviderId, number> = (() => {
  const counts = {} as Record<ProviderId, number>;
  for (const idx of INDICES_DATA) {
    counts[idx.providerId] = (counts[idx.providerId] || 0) + 1;
  }
  return counts;
})();

/**
 * Providers with at least OTHER_PROVIDER_THRESHOLD indices (>= 10).
 */
export const MAJOR_PROVIDERS: IndexProvider[] = PROVIDERS_LIST.filter(
  (p) => (CATALOG_PROVIDER_COUNTS[p.id] || 0) >= OTHER_PROVIDER_THRESHOLD
);

/**
 * Providers with fewer than OTHER_PROVIDER_THRESHOLD indices (< 10), sorted by count descending.
 */
export const OTHER_PROVIDERS: IndexProvider[] = PROVIDERS_LIST.filter(
  (p) => (CATALOG_PROVIDER_COUNTS[p.id] || 0) < OTHER_PROVIDER_THRESHOLD
).sort(
  (a, b) =>
    (CATALOG_PROVIDER_COUNTS[b.id] || 0) - (CATALOG_PROVIDER_COUNTS[a.id] || 0)
);

export const OTHER_PROVIDER_IDS = new Set<ProviderId>(
  OTHER_PROVIDERS.map((p) => p.id)
);

export function isOtherProvider(
  providerId: string | null | undefined
): providerId is ProviderId {
  if (!providerId) return false;
  return OTHER_PROVIDER_IDS.has(providerId as ProviderId);
}
