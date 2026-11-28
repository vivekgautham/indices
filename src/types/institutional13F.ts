/**
 * Type definitions for Form 13F Institutional Investor Disclosures.
 * Compliant with SEC Rule 13f-1 requirements for investment managers
 * with >$100M in Section 13(f) securities.
 */

export type InvestorCategory =
  | "hedge_fund"
  | "asset_manager"
  | "family_office"
  | "activist"
  | "pension_sovereign"
  | "tech_growth";

export type PositionChangeStatus =
  | "new"
  | "increased"
  | "reduced"
  | "unmodified"
  | "exited";

export interface Holding13F {
  ticker: string;
  name: string;
  shares: number;
  value: number; // in USD
  portfolioWeight: number; // percentage (e.g. 14.2)
  changeStatus: PositionChangeStatus;
  changePct?: number; // percentage change in share count
}

export interface InstitutionalInvestor13F {
  id: string;
  name: string;
  manager: string;
  cik: string;
  category: InvestorCategory;
  portfolioValue: string; // formatted e.g. "$280.4B"
  portfolioValueNum: number; // numeric value in USD
  reportPeriod: string; // e.g. "Q3 2026"
  filingDate: string; // e.g. "2026-11-14"
  holdingsCount: number;
  top10ConcentrationPct: number;
  topHoldings: Holding13F[];
  secFilingUrl: string;
  description: string;
  cityState?: string;
  avatarInitials?: string;
}

export interface ConsensusHolding {
  rank: number;
  ticker: string;
  name: string;
  sector: string;
  holdersCount: number; // number of top 100 funds holding this
  totalValue: number; // aggregate USD value across funds
  avgWeightPct: number;
  topFunds: string[]; // names of prominent funds holding this stock
  sentiment: "strong_buy" | "buy" | "neutral" | "trim";
}

export interface SectorAllocationItem {
  sector: string;
  institutionalWeight: number; // percentage of institutional portfolio
  sp500Weight: number; // benchmark percentage
  difference: number; // overweight / underweight percentage points
  totalValue: number; // in billions
}
