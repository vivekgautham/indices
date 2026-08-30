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
      return INDICES_DATA;
    },
    staleTime: Infinity,
  });
}

export function useIndicesByProvider(providerId: ProviderId | "all") {
  return useQuery<MarketIndex[]>({
    queryKey: ["indices", providerId],
    queryFn: async () => {
      if (providerId === "all") {
        return INDICES_DATA;
      }
      return INDICES_DATA.filter((idx) => idx.providerId === providerId);
    },
    staleTime: Infinity,
  });
}

export function getProviderById(
  providerId: ProviderId,
): IndexProvider | undefined {
  return PROVIDERS_DATA[providerId];
}
