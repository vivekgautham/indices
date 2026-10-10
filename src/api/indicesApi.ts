import { useQuery } from "@tanstack/react-query";
import { INDICES_DATA } from "../data/indicesData";
import { PROVIDERS_DATA, PROVIDERS_LIST } from "../data/providersData";
import { IndexProvider, MarketIndex, ProviderId } from "../types";

export function useProvidersData() {
  return useQuery<IndexProvider[]>({
    queryKey: ["providers"],
    queryFn: async () => {
      return PROVIDERS_LIST;
    },
    staleTime: Infinity,
  });
}

export function useIndicesData() {
  return useQuery<MarketIndex[]>({
    queryKey: ["indices"],
    queryFn: async () => {
      return INDICES_DATA.map((idx) => {
        if (!idx._searchableText) {
          idx._searchableText = [
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
            ...(idx.trackingEtfs || []).map(
              (etf) => `${etf.ticker} ${etf.name}`,
            ),
          ]
            .join(" ")
            .toLowerCase();
        }
        return idx;
      });
    },
    staleTime: Infinity,
  });
}

export function useIndicesByProvider(providerId: ProviderId | "all") {
  return useQuery<MarketIndex[]>({
    queryKey: ["indices", providerId],
    queryFn: async () => {
      const data =
        providerId === "all"
          ? INDICES_DATA
          : INDICES_DATA.filter((idx) => idx.providerId === providerId);

      return data.map((idx) => {
        if (!idx._searchableText) {
          idx._searchableText = [
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
            ...(idx.trackingEtfs || []).map(
              (etf) => `${etf.ticker} ${etf.name}`,
            ),
          ]
            .join(" ")
            .toLowerCase();
        }
        return idx;
      });
    },
    staleTime: Infinity,
  });
}

export function getProviderById(
  providerId: ProviderId,
): IndexProvider | undefined {
  return PROVIDERS_DATA[providerId];
}
