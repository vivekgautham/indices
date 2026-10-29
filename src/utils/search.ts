import { MarketIndex } from "../types";

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits query string into normalized search tokens.
 */
export function extractSearchTokens(term: string): string[] {
  return term
    .trim()
    .toLowerCase()
    .split(/[\s/]+/)
    .filter((t) => t.length > 0 && /[a-z0-9]/i.test(t));
}

/**
 * Checks if a market index matches a single search token.
 * For short tokens (<= 3 chars, e.g. "ita", "spy", "voo", "esg", "oil", "500"),
 * prevents false-positive substring matches inside long words (e.g. "cap-ITA-lization").
 */
export function matchesSearchToken(idx: MarketIndex, token: string): boolean {
  // 1. Exact ETF ticker match (e.g., "ita", "spy", "voo")
  if ((idx.trackingEtfs || []).some((e) => e.ticker.toLowerCase() === token)) {
    return true;
  }
  // 2. Exact Index symbol or altSymbols match
  if (idx.symbol && idx.symbol.toLowerCase() === token) return true;
  if ((idx.altSymbols || []).some((s) => s.toLowerCase() === token)) return true;

  // 3. For short tokens (<= 3 chars), require word boundary or word-prefix matching
  if (token.length <= 3) {
    const escaped = escapeRegex(token);
    const prefixRegex = new RegExp("(?:^|[^a-zA-Z0-9])" + escaped, "i");
    const searchable = [
      idx.name,
      idx.symbol,
      ...(idx.altSymbols || []),
      idx.category,
      idx.providerId,
      ...idx.tags,
      ...(idx.trackingEtfs || []).map((e) => `${e.ticker} ${e.name}`),
      idx.summary,
    ].join(" ");
    return prefixRegex.test(searchable);
  }

  // 4. For tokens >= 4 chars, full text search
  const text = idx._searchableText || "";
  return text.includes(token);
}

/**
 * Evaluates a user search query against an index.
 * Handles conjunctions (spaces = AND) and alternatives (slashes = OR).
 */
export function matchesSearchQuery(idx: MarketIndex, query: string): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  if (!trimmed.includes("/")) {
    const tokens = extractSearchTokens(trimmed);
    return tokens.every((token) => matchesSearchToken(idx, token));
  }

  const segments = trimmed
    .split("/")
    .map((s) => extractSearchTokens(s))
    .filter((tokens) => tokens.length > 0);

  if (segments.length === 0) return true;
  return segments.some((tokens) =>
    tokens.every((token) => matchesSearchToken(idx, token)),
  );
}

/**
 * Checks if an index matches a preset filter term (chip) from SEARCH_CATEGORIES.
 * Accurately handles compound categories, slash-separated synonyms ("Treasury / Cash"),
 * and dedicated theme definitions.
 */
export function matchesPresetTerm(idx: MarketIndex, term: string): boolean {
  const norm = term.trim().toLowerCase();

  // "Treasury / Cash" -> Pure Treasuries, T-Bills, Cash Alternatives
  if (norm === "treasury / cash") {
    if (idx.assetClass !== "Fixed Income") return false;
    return (
      /treasury|t-bill|cash alternative|inflation-protected|tips|government/i.test(
        idx.category,
      ) ||
      (idx.tags || []).some((t) =>
        /treasury|t-bill|cash alternative|tips|risk-free/i.test(t),
      ) ||
      /treasury|treasury bill/i.test(idx.name)
    );
  }

  // "Bonds / Fixed Income" -> All Fixed Income benchmarks
  if (norm === "bonds / fixed income") {
    return (
      idx.assetClass === "Fixed Income" ||
      /bond|fixed income/i.test(idx.category) ||
      (idx.tags || []).some((t) => /bond|fixed income/i.test(t))
    );
  }

  // "Volatility / VIX"
  if (norm === "volatility / vix") {
    return (
      idx.symbol === "VIX" ||
      (idx.altSymbols || []).includes("VIX") ||
      (idx.tags || []).some((t) => /volatility|vix/i.test(t)) ||
      /volatility/i.test(idx.name)
    );
  }

  // "Aerospace & Defense"
  if (norm === "aerospace & defense") {
    return (
      /aerospace/i.test(idx.category) ||
      (idx.tags || []).some((t) => /aerospace|defense/i.test(t)) ||
      /aerospace & defense/i.test(idx.name)
    );
  }

  // "Metals & Mining"
  if (norm === "metals & mining") {
    return (
      /metals & mining|mining/i.test(idx.category) ||
      (idx.tags || []).some((t) => /metals & mining|mining/i.test(t)) ||
      /metals & mining|mining/i.test(idx.name)
    );
  }

  // "Profitability Screen"
  if (norm === "profitability screen") {
    return (
      (idx.tags || []).some((t) => /profitability/i.test(t)) ||
      (idx.eligibilityCriteria || []).some((c) =>
        /profitability|positive earnings/i.test(c),
      ) ||
      (idx.keyCharacteristics || []).some((k) =>
        /profitability|earnings/i.test(k),
      ) ||
      /profitability screen/i.test(idx._searchableText || "")
    );
  }

  // If the term has slashes, treat as OR across slash alternatives
  if (norm.includes("/")) {
    const alternatives = norm
      .split("/")
      .map((p) => p.trim())
      .filter(Boolean);
    return alternatives.some((alt) => {
      const tokens = extractSearchTokens(alt);
      return tokens.every((token) => matchesSearchToken(idx, token));
    });
  }

  // Standard term: split into tokens and match all tokens
  const tokens = extractSearchTokens(norm);
  return tokens.every((token) => matchesSearchToken(idx, token));
}

/**
 * Calculates a relevance score for an index given a set of search tokens.
 * Higher scores mean more relevant results (exact ticker match > symbol match > name match > tag match).
 */
export function computeIndexRelevanceScore(
  idx: MarketIndex,
  tokens: string[],
): number {
  let score = 0;
  for (const token of tokens) {
    const isShort = token.length <= 3;
    const escaped = escapeRegex(token);
    const wordRegex = new RegExp(
      "(?:^|[^a-zA-Z0-9])" + escaped + "(?:$|[^a-zA-Z0-9])",
      "i",
    );
    const prefixRegex = new RegExp("(?:^|[^a-zA-Z0-9])" + escaped, "i");

    // Exact ETF ticker match (+10,000)
    if ((idx.trackingEtfs || []).some((e) => e.ticker.toLowerCase() === token)) {
      score += 10000;
    }
    // Exact Index symbol or altSymbol match (+8,000)
    if (idx.symbol && idx.symbol.toLowerCase() === token) score += 8000;
    if ((idx.altSymbols || []).some((s) => s.toLowerCase() === token)) score += 8000;

    // Word boundary in ETF ticker or name (+5,000)
    if (
      (idx.trackingEtfs || []).some(
        (e) => wordRegex.test(e.ticker) || wordRegex.test(e.name),
      )
    ) {
      score += 5000;
    }

    // Index Name match (+4,000 word boundary, +2,500 prefix, +1,000 substring)
    if (wordRegex.test(idx.name)) {
      score += 4000;
    } else if (prefixRegex.test(idx.name)) {
      score += 2500;
    } else if (!isShort && idx.name.toLowerCase().includes(token)) {
      score += 1000;
    }

    // Tags & Category (+2,000)
    if ((idx.tags || []).some((t) => wordRegex.test(t))) score += 2000;
    if (wordRegex.test(idx.category)) score += 2000;

    // Summary / Description (+800 / +400)
    if (wordRegex.test(idx.summary)) score += 800;
    if (wordRegex.test(idx.description)) score += 400;
  }
  return score;
}
