export interface IndexProvider {
  id: string;
  name: string;
  code: string;
  description?: string;
  website?: string;
  headquarters?: string;
}

export interface MarketIndex {
  id: string;
  symbol: string;
  name: string;
  providerId: string;
  category?: string;
  assetClass?: string;
  region?: string;
  description?: string;
}
