import type { MarketIndex } from "../types/index.ts";

export type StyleFilter = "all" | "growth" | "value";

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
