export type ProviderId = "sp" | "ftse" | "msci" | "nasdaq" | "crsp";

export interface IndexProvider {
  id: ProviderId;
  name: string;
  shortName: string;
  logoText: string;
  tagline: string;
  description: string;
  headquarters: string;
  founded: string | number;
  website: string;
  accentColor: string;
  badgeBg: string;
  keyEtfPartners: string[];
  coverage: string;
  marketShareSummary: string;
}

export interface MarketIndex {
  id: string;
  symbol: string;
  altSymbols?: string[];
  name: string;
  providerId: ProviderId;
  category: string;
  assetClass:
    "Equity" | "Fixed Income" | "Commodity" | "Volatility" | "Multi-Asset";
  region:
    | "United States"
    | "Global"
    | "Developed Markets"
    | "Emerging Markets"
    | "Europe"
    | "Asia-Pacific"
    | "Americas";
  constituentsCount: number | string;
  weightingMethodology: string;
  rebalanceFrequency: string;
  launchYear: number | string;
  trackingEtfs: { ticker: string; name: string; aum?: string }[];
  summary: string;
  description: string;
  eligibilityCriteria?: string[];
  keyCharacteristics?: string[];
  tags: string[];
  officialUrl?: string;
}
