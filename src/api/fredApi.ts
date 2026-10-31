import { useQuery } from "@tanstack/react-query";
import localFredData from "../data/fredData.json";
import {
  FRED_SERIES_LIST,
  FredSeriesData,
  FredSeriesMeta,
} from "../data/fredSeriesData";

const FRED_API_KEY_STORAGE = "indices_fred_api_key";
export const DEFAULT_FRED_API_KEY = "2d9fe8dbad89dabfd5afba8ca6e5f4f6";

export function getCustomFredApiKey(): string {
  try {
    return localStorage.getItem(FRED_API_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

export function getStoredFredApiKey(): string {
  return getCustomFredApiKey();
}

export function getActiveFredApiKey(): string {
  return getCustomFredApiKey() || DEFAULT_FRED_API_KEY;
}

export function setStoredFredApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(FRED_API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(FRED_API_KEY_STORAGE);
    }
  } catch {
    // Ignore storage errors in private mode
  }
}

/**
 * Normalizes observations from local pre-fetched JSON or API response.
 */
function buildFullSeriesData(
  meta: FredSeriesMeta,
  rawItem?: {
    observations?: [string, number][];
    latestDate?: string;
    latestValue?: number;
    prevValue?: number;
    change?: number;
    changePct?: number;
    high52?: number;
    low52?: number;
  },
): FredSeriesData {
  const observations = rawItem?.observations || [];
  const latestDate =
    rawItem?.latestDate ||
    (observations.length > 0 ? observations[observations.length - 1][0] : "");
  const latestValue =
    rawItem?.latestValue ??
    (observations.length > 0 ? observations[observations.length - 1][1] : 0);
  const prevValue =
    rawItem?.prevValue ??
    (observations.length > 1 ? observations[observations.length - 2][1] : latestValue);
  const change =
    rawItem?.change ?? (prevValue ? latestValue - prevValue : 0);
  const changePct =
    rawItem?.changePct ??
    (prevValue && prevValue !== 0 ? (change / prevValue) * 100 : 0);

  const lastYear = observations.slice(-252).map((p) => p[1]);
  const high52 =
    rawItem?.high52 ??
    (lastYear.length > 0 ? Math.max(...lastYear) : latestValue);
  const low52 =
    rawItem?.low52 ??
    (lastYear.length > 0 ? Math.min(...lastYear) : latestValue);

  return {
    ...meta,
    observations,
    latestDate,
    latestValue,
    prevValue,
    change,
    changePct,
    high52,
    low52,
  };
}

export interface FredDataset {
  updatedAt: string;
  series: Record<string, FredSeriesData>;
  seriesList: FredSeriesData[];
  equitySeries: FredSeriesData[];
  macroSeries: FredSeriesData[];
}

/**
 * Loads baseline dataset from local pre-computed data.
 */
export function getInitialFredDataset(): FredDataset {
  const rawSeries = (localFredData as unknown as { series?: Record<string, unknown> })
    .series || {};
  const seriesMap: Record<string, FredSeriesData> = {};

  for (const meta of FRED_SERIES_LIST) {
    const raw = rawSeries[meta.id] as Parameters<typeof buildFullSeriesData>[1];
    seriesMap[meta.id] = buildFullSeriesData(meta, raw);
  }

  const seriesList = Object.values(seriesMap);
  return {
    updatedAt: (localFredData as unknown as { updatedAt?: string }).updatedAt || new Date().toISOString(),
    series: seriesMap,
    seriesList,
    equitySeries: seriesList.filter((s) => s.category === "equity"),
    macroSeries: seriesList.filter((s) => s.category === "macro"),
  };
}

/**
 * Fetches live data for a specific series if FRED API key is provided or from CORS-friendly endpoint.
 */
export async function fetchLiveFredObservations(
  seriesId: string,
  apiKey?: string,
): Promise<[string, number][] | null> {
  const key = apiKey || getActiveFredApiKey();

  // If user provided a FRED API key, use official FRED JSON API
  if (key) {
    try {
      const endpoint = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${key}&file_type=json`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const json = await res.json();
        const obs: [string, number][] = [];
        for (const item of json.observations || []) {
          if (item.value && item.value !== "." && !isNaN(Number(item.value))) {
            obs.push([item.date, Number(Number(item.value).toFixed(2))]);
          }
        }
        if (obs.length > 0) return obs;
      }
    } catch {
      // Fall through to public proxy / local cache
    }
  }

  // Attempt fetch via CORS proxy or dev proxy
  const urlsToTry = [
    `/api/fred/graph/fredgraph.csv?id=${seriesId}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://fred.stlouisfed.org/graph/fredgraph.csv?id=${seriesId}`)}`,
  ];

  for (const url of urlsToTry) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const text = await res.text();
        const lines = text.trim().split("\n");
        const obs: [string, number][] = [];
        for (let i = 1; i < lines.length; i++) {
          const [date, val] = lines[i].split(",");
          if (val && val !== "." && !isNaN(Number(val))) {
            obs.push([date, Number(Number(val).toFixed(2))]);
          }
        }
        if (obs.length > 0) return obs;
      }
    } catch {
      // Continue next attempt
    }
  }

  return null;
}

/**
 * Main hook to access FRED dataset in components.
 */
export function useFredData() {
  return useQuery<FredDataset>({
    queryKey: ["fred_dataset"],
    queryFn: async () => {
      return getInitialFredDataset();
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    initialData: getInitialFredDataset(),
  });
}

/**
 * Hook to access single series by ID.
 */
export function useFredSeries(seriesId: string) {
  const { data } = useFredData();
  return data?.series[seriesId];
}

export type TimeRange = "5D" | "1M" | "3M" | "6M" | "YTD" | "1Y" | "5Y" | "MAX";

export interface RangeStats {
  points: [string, number][];
  startValue: number;
  endValue: number;
  startDate: string;
  endDate: string;
  change: number;
  changePct: number;
  min: number;
  max: number;
  minDate: string;
  maxDate: string;
}

/**
 * Computes performance statistics and filtered data points for a given time range.
 */
export function filterObservationsByRange(
  observations: [string, number][],
  range: TimeRange,
): RangeStats {
  if (!observations || observations.length === 0) {
    return {
      points: [],
      startValue: 0,
      endValue: 0,
      startDate: "",
      endDate: "",
      change: 0,
      changePct: 0,
      min: 0,
      max: 0,
      minDate: "",
      maxDate: "",
    };
  }

  const latest = observations[observations.length - 1];
  const latestDate = new Date(latest[0]);
  let cutoffDate: Date;

  switch (range) {
    case "5D":
      cutoffDate = new Date(latestDate);
      cutoffDate.setDate(cutoffDate.getDate() - 7);
      break;
    case "1M":
      cutoffDate = new Date(latestDate);
      cutoffDate.setMonth(cutoffDate.getMonth() - 1);
      break;
    case "3M":
      cutoffDate = new Date(latestDate);
      cutoffDate.setMonth(cutoffDate.getMonth() - 3);
      break;
    case "6M":
      cutoffDate = new Date(latestDate);
      cutoffDate.setMonth(cutoffDate.getMonth() - 6);
      break;
    case "YTD":
      cutoffDate = new Date(latestDate.getFullYear(), 0, 1);
      break;
    case "1Y":
      cutoffDate = new Date(latestDate);
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 1);
      break;
    case "5Y":
      cutoffDate = new Date(latestDate);
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 5);
      break;
    case "MAX":
    default:
      cutoffDate = new Date("1900-01-01");
      break;
  }

  const cutoffStr = cutoffDate.toISOString().split("T")[0];
  let filtered =
    range === "5D"
      ? observations.slice(-5)
      : observations.filter((p) => p[0] >= cutoffStr);

  if (filtered.length === 0) {
    filtered = observations.slice(-30);
  }

  const startPt = filtered[0];
  const endPt = filtered[filtered.length - 1];
  const startValue = startPt[1];
  const endValue = endPt[1];
  const change = Number((endValue - startValue).toFixed(2));
  const changePct =
    startValue !== 0 ? Number(((change / startValue) * 100).toFixed(2)) : 0;

  let min = filtered[0][1];
  let max = filtered[0][1];
  let minDate = filtered[0][0];
  let maxDate = filtered[0][0];

  for (const pt of filtered) {
    if (pt[1] < min) {
      min = pt[1];
      minDate = pt[0];
    }
    if (pt[1] > max) {
      max = pt[1];
      maxDate = pt[0];
    }
  }

  return {
    points: filtered,
    startValue,
    endValue,
    startDate: startPt[0],
    endDate: endPt[0],
    change,
    changePct,
    min: Number(min.toFixed(2)),
    max: Number(max.toFixed(2)),
    minDate,
    maxDate,
  };
}
