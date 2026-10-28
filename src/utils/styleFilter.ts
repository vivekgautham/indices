import type { MarketIndex } from "../types/index.ts";

export type StyleFilter = "all" | "growth" | "value" | "factor";

/**
 * Determines whether a market index belongs to the Growth investment style.
 */
export function isGrowthIndex(idx: MarketIndex): boolean {
  const id = idx.id.toLowerCase();
  const cat = idx.category.toLowerCase();
  const tags = idx.tags.map((t) => t.toLowerCase());

  // Exclude broad EM/single countries with "High Growth" economic tags and broad mid-cap
  if (
    id === "msci-emerging-markets" ||
    id === "msci-india" ||
    id === "sp-midcap-400" ||
    id === "lbma-gold-price"
  ) {
    return false;
  }

  return (
    id.includes("-growth") ||
    id === "nasdaq-100" ||
    id === "nasdaq-next-gen-100" ||
    id === "sp-global-ex-us-dividend-growers" ||
    id === "dow-jones-us-large-cap-growth" ||
    cat.includes("growth") ||
    tags.includes("growth") ||
    tags.includes("growth style") ||
    tags.includes("large cap growth") ||
    tags.includes("mid cap growth") ||
    tags.includes("small cap growth") ||
    tags.includes("mega cap growth")
  );
}

/**
 * Determines whether a market index belongs to the Value investment style.
 */
export function isValueIndex(idx: MarketIndex): boolean {
  const id = idx.id.toLowerCase();
  const cat = idx.category.toLowerCase();
  const tags = idx.tags.map((t) => t.toLowerCase());

  // Exclude commodities with "Store of Value" and broad blend indices
  if (id === "lbma-gold-price" || id === "sp-midcap-400") {
    return false;
  }

  return (
    id.includes("-value") ||
    id.includes("-garp") ||
    id === "ftse-high-dividend-yield" ||
    id === "ftse-all-world-ex-us-high-dividend-yield" ||
    id === "morningstar-wide-moat-focus" ||
    id === "russell-rafi-developed-ex-us-large" ||
    id === "dow-jones-us-dividend-100" ||
    id === "sp-500-dividend-aristocrats" ||
    cat.includes("value") ||
    cat.includes("garp") ||
    tags.includes("value") ||
    tags.includes("value style") ||
    tags.includes("value tilt") ||
    tags.includes("deep value")
  );
}

/**
 * Determines whether a market index belongs to the Factor / Smart Beta category
 * (e.g., Momentum, Quality, Low Volatility, GARP, Equal Weight, Fundamental/RAFI, Dividend Quality).
 */
export function isFactorIndex(idx: MarketIndex): boolean {
  const id = idx.id.toLowerCase();
  const cat = idx.category.toLowerCase();
  const tags = idx.tags.map((t) => t.toLowerCase());
  const method = (idx.weightingMethodology || "").toLowerCase();

  // Exclude standard pure growth and pure value style indices (which have their own dedicated filters)
  const pureGrowth = [
    "sp-500-growth",
    "sp-900-growth",
    "dow-jones-us-large-cap-growth",
    "russell-1000-growth",
    "crsp-us-large-cap-growth",
    "crsp-us-mega-cap-growth",
    "crsp-us-mid-cap-growth",
    "crsp-us-small-cap-growth",
    "msci-eafe-growth",
  ];
  const pureValue = [
    "sp-500-value",
    "sp-900-value",
    "dow-jones-us-large-cap-value",
    "crsp-us-large-cap-value",
    "crsp-us-mid-cap-value",
    "crsp-us-small-cap-value",
    "russell-2000-value",
  ];

  if (pureGrowth.includes(id) || pureValue.includes(id)) {
    return false;
  }

  // Exclude broad market, commodities, or growth dividend growers
  if (
    id === "msci-emerging-markets" ||
    id === "russell-3000" ||
    id === "cboe-vix" ||
    id === "sp-midcap-400" ||
    id === "sp-smallcap-600" ||
    id === "lbma-gold-price" ||
    id === "msci-usa-esg-leaders" ||
    id === "sp-global-ex-us-dividend-growers"
  ) {
    return false;
  }

  return (
    id.includes("-momentum") ||
    id.includes("-quality") ||
    id.includes("-garp") ||
    id.includes("dorsey-wright") ||
    id.includes("-equal-weight") ||
    id.includes("intellidex") ||
    id === "morningstar-wide-moat-focus" ||
    id === "russell-rafi-developed-ex-us-large" ||
    id === "dow-jones-us-dividend-100" ||
    id === "sp-500-dividend-aristocrats" ||
    cat.includes("factor") ||
    cat.includes("smart beta") ||
    cat.includes("garp") ||
    tags.includes("factor") ||
    tags.includes("smart beta") ||
    tags.includes("momentum") ||
    tags.includes("quality") ||
    tags.includes("garp") ||
    tags.includes("equal weight") ||
    tags.includes("wide moat") ||
    method.includes("equal-weighted") ||
    method.includes("fundamental")
  );
}
