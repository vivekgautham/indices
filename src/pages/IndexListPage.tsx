import ClearIcon from "@mui/icons-material/Clear";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanguageIcon from "@mui/icons-material/Language";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  InputBase,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useIndicesData, useProvidersData } from "../api/indicesApi";
import SiteFooter from "../components/layout/SiteFooter";
import { IndexCard } from "../components/IndexCard";
import { IndexTableView } from "../components/IndexTableView";
import { ProviderHeroBanner } from "../components/ProviderHeroBanner";
import { ProviderLogo } from "../components/ProviderLogo";
import { ProviderPresetBar } from "../components/ProviderPresetBar";
import { StyleQuickFilter } from "../components/StyleQuickFilter";
import { PROVIDERS_DATA } from "../data/providersData";
import { ProviderId } from "../types";
import { OTHER_PROVIDER_IDS } from "../utils/providerClassification";
import {
  isFactorIndex,
  isGrowthIndex,
  isValueIndex,
  StyleFilter,
} from "../utils/styleFilter";
import {
  computeIndexRelevanceScore,
  extractSearchTokens,
  matchesPresetTerm,
  matchesSearchQuery,
} from "../utils/search";

export interface SearchCategory {
  id: "themes" | "etf-providers" | "market-exposure";
  label: string;
  icon: string;
  description: string;
  terms: string[];
}

export const SEARCH_CATEGORIES: SearchCategory[] = [
  {
    id: "themes",
    label: "Themes",
    icon: "🏷️",
    description: "Strategies, factor tilts, and industry themes",
    terms: [
      "Momentum",
      "Dividend Growth",
      "Equal Weight",
      "GARP",
      "Aerospace & Defense",
      "Biotechnology",
      "Semiconductor",
      "Software",
      "Cloud",
      "Wide Moat",
      "Quality",
      "High Dividend",
      "Cybersecurity",
      "Precious Metals",
      "Copper",
      "Gold Miners",
      "Metals & Mining",
      "Bonds / Fixed Income",
      "Treasury / Cash",
      "Volatility / VIX",
      "Profitability Screen",
      "UCITS",
    ],
  },
  {
    id: "etf-providers",
    label: "ETF Providers",
    icon: "🏛️",
    description: "Major asset managers and fund sponsors",
    terms: [
      "Vanguard",
      "iShares",
      "Schwab",
      "Invesco",
      "SPDR",
      "Avantis",
      "VanEck",
      "Fidelity",
    ],
  },
  {
    id: "market-exposure",
    label: "Market Exposure",
    icon: "🌐",
    description: "Cap tiers, styles, and geographic reach",
    terms: [
      "Broad Market",
      "Large Cap",
      "Mega Cap",
      "Mid Cap",
      "Small Cap",
      "Extended Market",
      "Growth",
      "Value",
      "Factor",
      "International",
      "Europe",
      "United Kingdom",
      "Emerging Markets",
      "Japan",
      "India",
      "China",
      "Australia",
    ],
  },
];

// The rich searchable text blob is now pre-computed in indicesApi to avoid O(N) concatenation on every keystroke

export default function IndexListPage() {
  const { data: providers = [], isLoading: loadingProviders } =
    useProvidersData();
  const { data: indices = [], isLoading: loadingIndices } = useIndicesData();

  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to update URL search parameters cleanly and avoid feedback loops
  const updateFilterParams = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const [key, val] of Object.entries(updates)) {
            if (
              val === null ||
              val === undefined ||
              val === "" ||
              (key === "provider" && val === "all") ||
              (key === "style" && val === "all") ||
              (key === "cat" && val === "themes") ||
              (key === "view" && val === "card")
            ) {
              next.delete(key);
            } else {
              next.set(key, val);
            }
          }
          if (next.toString() === prev.toString()) {
            return prev;
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  // Directly derive all filter states from searchParams (single source of truth)
  const selectedProvider = useMemo<ProviderId | "others" | "all">(() => {
    const p = searchParams.get("provider");
    return p && (p in PROVIDERS_DATA || p === "all" || p === "others")
      ? (p as ProviderId | "others")
      : "all";
  }, [searchParams]);

  const selectedStyle = useMemo<StyleFilter>(() => {
    const s = searchParams.get("style");
    return s === "growth" || s === "value" || s === "factor" ? s : "all";
  }, [searchParams]);

  const selectedTerms = useMemo<string[]>(() => {
    const tParam = searchParams.get("terms") || "";
    return tParam
      ? tParam
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];
  }, [searchParams]);

  const activeCategory = useMemo<
    "all" | "themes" | "etf-providers" | "market-exposure"
  >(() => {
    const cat = searchParams.get("cat");
    return cat === "all" ||
      cat === "themes" ||
      cat === "etf-providers" ||
      cat === "market-exposure"
      ? cat
      : "themes";
  }, [searchParams]);

  const viewMode = useMemo<"card" | "table">(() => {
    return searchParams.get("view") === "table" ? "table" : "card";
  }, [searchParams]);

  // Keep local search term for smooth keystroke input, synchronized with URL query parameter
  const urlQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(urlQuery);
  const [visibleRows, setVisibleRows] = useState(3);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Synchronize local search input when URL changes externally (e.g. clicking Home, Market Indices logo, Back/Forward)
  useEffect(() => {
    setSearchTerm(urlQuery);
  }, [urlQuery]);

  // Debounce syncing local search input to URL query parameters
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = searchTerm.trim();
      if (trimmed !== (searchParams.get("q") || "")) {
        updateFilterParams({ q: trimmed || null });
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchTerm, searchParams, updateFilterParams]);

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  // Detect platform for keyboard shortcut display (Cmd+K vs Ctrl+K)
  const isMac = useMemo(
    () =>
      typeof navigator !== "undefined" &&
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent),
    [],
  );

  // Global shortcut: Pressing Cmd+K, Ctrl+K, or "/" focuses the search bar from anywhere
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isInput)
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
        searchInputRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset pagination to 3 rows whenever filter or search query changes
  useEffect(() => {
    setVisibleRows(3);
  }, [searchTerm, selectedTerms, selectedProvider, selectedStyle]);

  // Calculate index counts per provider (accounting for selectedStyle and selectedTerms / themes selected)
  const indexCounts = useMemo(() => {
    let list = indices;
    if (selectedStyle === "growth") {
      list = list.filter(isGrowthIndex);
    } else if (selectedStyle === "value") {
      list = list.filter(isValueIndex);
    } else if (selectedStyle === "factor") {
      list = list.filter(isFactorIndex);
    }
    if (selectedTerms.length > 0) {
      list = list.filter((idx) => {
        return selectedTerms.every((term) => matchesPresetTerm(idx, term));
      });
    }
    const counts: Record<string, number> = {
      all: list.length,
      others: 0,
    };
    list.forEach((idx) => {
      counts[idx.providerId] = (counts[idx.providerId] || 0) + 1;
      if (OTHER_PROVIDER_IDS.has(idx.providerId)) {
        counts.others = (counts.others || 0) + 1;
      }
    });
    return counts;
  }, [indices, selectedStyle, selectedTerms]);

  // Calculate style counts (Growth / Value / Factor) for the currently selected provider
  const styleCounts = useMemo(() => {
    const list =
      selectedProvider === "all"
        ? indices
        : selectedProvider === "others"
          ? indices.filter((idx) => OTHER_PROVIDER_IDS.has(idx.providerId))
          : indices.filter((idx) => idx.providerId === selectedProvider);
    return {
      all: list.length,
      growth: list.filter(isGrowthIndex).length,
      value: list.filter(isValueIndex).length,
      factor: list.filter(isFactorIndex).length,
    };
  }, [indices, selectedProvider]);

  // Current active provider object if a single provider is selected
  const activeProviderObj = useMemo(() => {
    if (selectedProvider === "all" || selectedProvider === "others")
      return undefined;
    return providers.find((p) => p.id === selectedProvider);
  }, [providers, selectedProvider]);

  // Tokenized search query (splitting by whitespace and slashes, filtering non-alphanumeric)
  const searchTokens = useMemo(() => {
    return extractSearchTokens(searchTerm);
  }, [searchTerm]);

  // Matches across ALL providers (for global search discovery), filtered by selectedStyle, selectedTerms, and searchTokens
  const allProviderMatches = useMemo(() => {
    let list = indices;
    if (selectedStyle === "growth") {
      list = list.filter(isGrowthIndex);
    } else if (selectedStyle === "value") {
      list = list.filter(isValueIndex);
    } else if (selectedStyle === "factor") {
      list = list.filter(isFactorIndex);
    }

    if (selectedTerms.length > 0) {
      list = list.filter((idx) => {
        return selectedTerms.every((term) => matchesPresetTerm(idx, term));
      });
    }

    if (searchTokens.length > 0) {
      list = list.filter((idx) => matchesSearchQuery(idx, searchTerm));
    }

    if (selectedTerms.length > 0 || searchTokens.length > 0) {
      const scoringTokens = [
        ...selectedTerms.flatMap((t) => extractSearchTokens(t)),
        ...searchTokens,
      ];
      list = [...list].sort((a, b) => {
        const scoreB = computeIndexRelevanceScore(b, scoringTokens);
        const scoreA = computeIndexRelevanceScore(a, scoringTokens);
        return scoreB - scoreA;
      });
    }

    return list;
  }, [indices, selectedStyle, selectedTerms, searchTokens, searchTerm]);

  // Filtered indices list for the current provider selection
  const filteredIndices = useMemo(() => {
    let list = allProviderMatches;
    if (selectedProvider === "others") {
      list = list.filter((idx) => OTHER_PROVIDER_IDS.has(idx.providerId));
    } else if (selectedProvider !== "all") {
      list = list.filter((idx) => idx.providerId === selectedProvider);
    }
    return list;
  }, [allProviderMatches, selectedProvider]);

  // Responsive column count and visible indices for 3-row batches
  const columns = isXl ? 4 : isMd ? 3 : isSm ? 2 : 1;
  const batchSize = columns * 3;
  const visibleCount = visibleRows * columns;
  const visibleIndices = useMemo(() => {
    return filteredIndices.slice(0, visibleCount);
  }, [filteredIndices, visibleCount]);
  const hasMore = visibleCount < filteredIndices.length;
  const remainingCount = filteredIndices.length - visibleCount;

  const isLoading = loadingProviders || loadingIndices;

  // Set document title
  useEffect(() => {
    document.title =
      "Market Indices Explorer | Global Benchmark Catalog & ETF Trackers";
  }, []);

  // Handle clicking on suggested search terms, integrating StyleFilter for Growth, Value, Factor
  const handleTermClick = (term: string) => {
    const lower = term.toLowerCase();
    let nextStyle: StyleFilter = selectedStyle;
    let nextTerms = [...selectedTerms];
    let nextProvider = selectedProvider;
    let nextSearch = searchTerm;

    if (lower === "growth") {
      nextStyle = selectedStyle === "growth" ? "all" : "growth";
    } else if (lower === "value") {
      nextStyle = selectedStyle === "value" ? "all" : "value";
    } else if (lower === "factor") {
      nextStyle = selectedStyle === "factor" ? "all" : "factor";
    } else {
      const exists = selectedTerms.some((t) => t.toLowerCase() === lower);
      if (exists) {
        nextTerms = selectedTerms.filter((t) => t.toLowerCase() !== lower);
      } else {
        nextTerms = [...selectedTerms, term];
      }
    }

    // If user had typed this exact word in the search input, clean it so it doesn't duplicate
    if (searchTerm.trim().toLowerCase() === lower) {
      nextSearch = "";
      setSearchTerm("");
    }

    // If a specific provider tab is active and has 0 matches for this newly selected term,
    // switch selectedProvider to "all" so the user immediately sees matching results!
    if (selectedProvider !== "all") {
      const isActivating = !selectedTerms.some(
        (t) => t.toLowerCase() === lower,
      );
      if (isActivating) {
        const matchesInCurrentProvider = indices.some((idx) => {
          const matchesProv =
            selectedProvider === "others"
              ? OTHER_PROVIDER_IDS.has(idx.providerId)
              : idx.providerId === selectedProvider;
          return matchesProv && matchesPresetTerm(idx, term);
        });
        if (!matchesInCurrentProvider) {
          nextProvider = "all";
        }
      }
    }

    updateFilterParams({
      style: nextStyle,
      terms: nextTerms.length > 0 ? nextTerms.join(",") : null,
      provider: nextProvider,
      q: nextSearch.trim() || null,
    });
  };

  const handleRemoveTerm = (termToRemove: string) => {
    const lower = termToRemove.toLowerCase();
    const nextTerms = selectedTerms.filter((t) => t.toLowerCase() !== lower);
    updateFilterParams({
      terms: nextTerms.length > 0 ? nextTerms.join(",") : null,
    });
  };

  const handleClearAllSearchAndFilters = () => {
    setSearchTerm("");
    updateFilterParams({
      q: null,
      terms: null,
      style: null,
    });
  };

  const isTermActive = (term: string) => {
    const lower = term.toLowerCase();
    if (lower === "growth") {
      return selectedStyle === "growth";
    }
    if (lower === "value") {
      return selectedStyle === "value";
    }
    if (lower === "factor") {
      return selectedStyle === "factor";
    }
    return selectedTerms.some((t) => t.toLowerCase() === lower);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        width: "100%",
        maxWidth: "100%",
        py: { xs: 2, sm: 3 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      {/* Header Section */}
      <Box
        component="header"
        sx={{ mb: 1, textAlign: "center", width: "100%" }}
      >
        <Typography
          component="h1"
          sx={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: 0,
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          Market Indices Explorer - Global Benchmark Catalog
        </Typography>

        <Stack spacing={1.5} alignItems="center" sx={{ width: "100%" }}>
          {/* Quick Preset Provider Selection Chips (Default All) */}
          <ProviderPresetBar
            selectedProvider={selectedProvider}
            onSelectProvider={(p) => updateFilterParams({ provider: p })}
            indexCounts={indexCounts}
          />

          {/* Quick Filter: Value and Growth Indices */}
          <StyleQuickFilter
            selectedStyle={selectedStyle}
            onSelectStyle={(s) => updateFilterParams({ style: s })}
            styleCounts={styleCounts}
          />

          {/* Search Bar & Reset Filters */}
          <Box sx={{ width: "100%", mt: 0.5 }}>
            <Stack
              direction="row"
              spacing={1.25}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Box
                onClick={() => searchInputRef.current?.focus()}
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 0.75,
                  minHeight: 54,
                  py: 0.75,
                  px: 1.75,
                  borderRadius: 3.5,
                  backgroundColor: "rgba(11, 26, 20, 0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(0, 221, 148, 0.22)",
                  cursor: "text",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow:
                    "0 4px 20px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
                  "&:hover": {
                    borderColor: "rgba(0, 221, 148, 0.48)",
                    boxShadow:
                      "0 6px 24px -2px rgba(0, 221, 148, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                  },
                  "&:focus-within": {
                    borderColor: "#00DD94",
                    backgroundColor: "rgba(11, 26, 20, 0.98)",
                    boxShadow:
                      "0 0 0 1px #00DD94, 0 0 30px rgba(0, 221, 148, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    "& .search-bar-icon": {
                      color: "#00DD94",
                      filter: "drop-shadow(0 0 6px rgba(0, 221, 148, 0.6))",
                      transform: "scale(1.08)",
                    },
                  },
                }}
              >
                <SearchIcon
                  className="search-bar-icon"
                  sx={{
                    color: "text.secondary",
                    fontSize: 21,
                    flexShrink: 0,
                    mr: 0.25,
                    transition: "all 0.2s ease",
                  }}
                />

                {/* Active Provider Chip (S&P, FTSE, etc.) */}
                {selectedProvider !== "all" && (
                  <Chip
                    size="small"
                    icon={
                      <ProviderLogo
                        providerId={
                          selectedProvider === "others"
                            ? "all"
                            : selectedProvider
                        }
                        size={14}
                      />
                    }
                    label={
                      selectedProvider === "others"
                        ? "Others (<10)"
                        : activeProviderObj?.shortName ||
                          selectedProvider.toUpperCase()
                    }
                    onDelete={(e) => {
                      e.stopPropagation();
                      updateFilterParams({ provider: "all" });
                    }}
                    color="primary"
                    variant="filled"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.76rem",
                      height: 28,
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      flexShrink: 0,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                      "& .MuiChip-icon": {
                        ml: 0.75,
                        mr: -0.25,
                      },
                      "& .MuiChip-label": {
                        px: 1,
                        lineHeight: 1,
                      },
                      "& .MuiChip-deleteIcon": {
                        color: "inherit",
                        fontSize: 16,
                        mr: 0.5,
                        ml: -0.25,
                        opacity: 0.8,
                        "&:hover": {
                          opacity: 1,
                        },
                      },
                    }}
                  />
                )}

                {/* Active Style Chip */}
                {selectedStyle !== "all" && (
                  <Chip
                    size="small"
                    label={
                      selectedStyle === "growth"
                        ? "📈 Growth"
                        : selectedStyle === "value"
                          ? "💎 Value"
                          : "⚡ Factor"
                    }
                    onDelete={(e) => {
                      e.stopPropagation();
                      updateFilterParams({ style: "all" });
                    }}
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.76rem",
                      height: 28,
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      flexShrink: 0,
                      backgroundColor:
                        selectedStyle === "growth"
                          ? "rgba(16, 185, 129, 0.15)"
                          : selectedStyle === "value"
                            ? "rgba(139, 92, 246, 0.15)"
                            : "rgba(245, 158, 11, 0.15)",
                      color:
                        selectedStyle === "growth"
                          ? "#10b981"
                          : selectedStyle === "value"
                            ? "#a855f7"
                            : "#f59e0b",
                      border: `1px solid ${
                        selectedStyle === "growth"
                          ? "#10b981"
                          : selectedStyle === "value"
                            ? "#8b5cf6"
                            : "#f59e0b"
                      }`,
                      "& .MuiChip-label": {
                        px: 1,
                        lineHeight: 1,
                      },
                      "& .MuiChip-deleteIcon": {
                        color: "inherit",
                        fontSize: 16,
                        mr: 0.5,
                        ml: -0.25,
                        opacity: 0.75,
                        "&:hover": {
                          opacity: 1,
                          color: "text.primary",
                        },
                      },
                    }}
                  />
                )}

                {/* Active Selected Term Chips */}
                {selectedTerms.map((term) => (
                  <Chip
                    key={term}
                    size="small"
                    label={term}
                    onDelete={(e) => {
                      e.stopPropagation();
                      handleRemoveTerm(term);
                    }}
                    color="primary"
                    variant="filled"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.76rem",
                      height: 28,
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      flexShrink: 0,
                      "& .MuiChip-label": {
                        px: 1,
                        lineHeight: 1,
                      },
                      "& .MuiChip-deleteIcon": {
                        fontSize: 16,
                        mr: 0.5,
                        ml: -0.25,
                        opacity: 0.75,
                        "&:hover": {
                          opacity: 1,
                        },
                      },
                    }}
                  />
                ))}

                {/* Inline Search Input */}
                <InputBase
                  inputRef={searchInputRef}
                  fullWidth={false}
                  placeholder={
                    selectedProvider !== "all" ||
                    selectedStyle !== "all" ||
                    selectedTerms.length > 0
                      ? "Type additional keywords, tickers (e.g. SPMO, VOO, VXF)..."
                      : "Search by index name, symbol (SPX, NDX, RUT), ETF (VOO, VXF, SCHD, SCHX), methodology, criteria..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && searchTerm === "") {
                      if (selectedTerms.length > 0) {
                        handleRemoveTerm(
                          selectedTerms[selectedTerms.length - 1],
                        );
                      } else if (selectedStyle !== "all") {
                        updateFilterParams({ style: "all" });
                      } else if (selectedProvider !== "all") {
                        updateFilterParams({ provider: "all" });
                      }
                    }
                  }}
                  sx={{
                    flex: 1,
                    minWidth: { xs: 100, sm: 220 },
                    fontSize: "0.95rem",
                    color: "text.primary",
                    "& input": {
                      py: 0.5,
                      px: 0.5,
                      lineHeight: 1.5,
                    },
                  }}
                />

                {/* Right Badges: Live Match Count & Keyboard Shortcut */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.75}
                  sx={{ ml: "auto", flexShrink: 0 }}
                >
                  {/* Live Match Counter Badge */}
                  <Chip
                    size="small"
                    label={
                      searchTerm ||
                      selectedTerms.length > 0 ||
                      selectedStyle !== "all" ||
                      selectedProvider !== "all"
                        ? `${allProviderMatches.length} match${allProviderMatches.length === 1 ? "" : "es"}`
                        : `${indices.length} indices`
                    }
                    sx={{
                      height: 22,
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      letterSpacing: "0.02em",
                      borderRadius: 1.5,
                      border: "1px solid",
                      borderColor:
                        searchTerm ||
                        selectedTerms.length > 0 ||
                        selectedStyle !== "all" ||
                        selectedProvider !== "all"
                          ? "rgba(0, 221, 148, 0.45)"
                          : "rgba(255, 255, 255, 0.12)",
                      backgroundColor:
                        searchTerm ||
                        selectedTerms.length > 0 ||
                        selectedStyle !== "all" ||
                        selectedProvider !== "all"
                          ? "rgba(0, 221, 148, 0.16)"
                          : "rgba(255, 255, 255, 0.05)",
                      color:
                        searchTerm ||
                        selectedTerms.length > 0 ||
                        selectedStyle !== "all" ||
                        selectedProvider !== "all"
                          ? "#00DD94"
                          : "text.secondary",
                      userSelect: "none",
                    }}
                  />

                  {/* Keyboard Shortcut Hint (Cmd+K / Ctrl+K) */}
                  <Box
                    component="kbd"
                    sx={{
                      display: { xs: "none", md: "inline-flex" },
                      alignItems: "center",
                      gap: 0.35,
                      px: 0.85,
                      py: 0.25,
                      borderRadius: 1.5,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "text.secondary",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      userSelect: "none",
                      "& span": {
                        fontSize: "0.75rem",
                        lineHeight: 1,
                      },
                    }}
                  >
                    <span>{isMac ? "⌘" : "Ctrl"}</span>
                    <span>K</span>
                  </Box>
                </Stack>

                {/* Clear Action Button */}
                {(searchTerm ||
                  selectedTerms.length > 0 ||
                  selectedStyle !== "all" ||
                  selectedProvider !== "all") && (
                  <Tooltip title="Clear search and filters">
                    <IconButton
                      aria-label="Clear search and filters"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearAllSearchAndFilters();
                      }}
                      size="small"
                      sx={{
                        color: "text.secondary",
                        ml: "auto",
                        "&:hover": { color: "text.primary" },
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              {/* Reset Filters button directly adjacent to search bar */}
              {(searchTerm ||
                selectedTerms.length > 0 ||
                selectedProvider !== "all" ||
                selectedStyle !== "all") && (
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<ReplayIcon sx={{ fontSize: 16 }} />}
                  onClick={() => {
                    setSearchTerm("");
                    updateFilterParams({
                      provider: "all",
                      style: "all",
                      terms: null,
                      q: null,
                    });
                  }}
                  sx={{
                    height: 52,
                    px: { xs: 1.25, sm: 2.25 },
                    borderRadius: 3.5,
                    fontSize: { xs: "0.76rem", sm: "0.82rem" },
                    fontWeight: 700,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    borderColor:
                      "var(--indices-border, rgba(255, 255, 255, 0.15))",
                    color: "text.secondary",
                    backgroundColor:
                      "var(--indices-card-bg, rgba(30, 41, 59, 0.5))",
                    backdropFilter: "blur(12px)",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "text.primary",
                      backgroundColor: `${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  Reset Filters
                </Button>
              )}
            </Stack>

            {/* Categorized Suggested Searches */}
            <Box sx={{ mt: 1.75, width: "100%" }}>
              {/* Category Filter Buttons */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                gap={0.75}
                sx={{ mb: 1.25 }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    mr: 0.5,
                  }}
                >
                  Suggested searches:
                </Typography>

                {SEARCH_CATEGORIES.map((cat) => {
                  const isCatActive = activeCategory === cat.id;
                  const hasActiveTerm = cat.terms.some((t) => isTermActive(t));
                  return (
                    <Button
                      key={cat.id}
                      size="small"
                      variant={isCatActive ? "contained" : "outlined"}
                      onClick={() => updateFilterParams({ cat: cat.id })}
                      sx={{
                        borderRadius: 2,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        py: 0.25,
                        px: 1.1,
                        minHeight: 24,
                        textTransform: "none",
                        borderColor: hasActiveTerm ? "primary.main" : undefined,
                      }}
                    >
                      <Box component="span" sx={{ mr: 0.4 }}>
                        {cat.icon}
                      </Box>
                      {cat.label} ({cat.terms.length})
                    </Button>
                  );
                })}

                <Button
                  size="small"
                  variant={activeCategory === "all" ? "contained" : "outlined"}
                  onClick={() => updateFilterParams({ cat: "all" })}
                  sx={{
                    borderRadius: 2,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    py: 0.25,
                    px: 1.1,
                    minHeight: 24,
                    textTransform: "none",
                  }}
                >
                  All Categories
                </Button>
              </Stack>

              {/* Grouped or Filtered Chips View */}
              {activeCategory === "all" ? (
                /* All categories grouped by category label */
                <Stack spacing={0.9} sx={{ width: "100%" }}>
                  {SEARCH_CATEGORIES.map((cat) => (
                    <Stack
                      key={cat.id}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      flexWrap="wrap"
                      gap={0.6}
                    >
                      <Chip
                        label={`${cat.icon} ${cat.label}`}
                        size="small"
                        onClick={() => updateFilterParams({ cat: cat.id })}
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          height: 22,
                          cursor: "pointer",
                          color: "primary.light",
                          backgroundColor:
                            "var(--indices-subtle-bg, rgba(255, 255, 255, 0.08))",
                          borderColor: `${theme.palette.primary.main}55`,
                          borderWidth: "1px",
                          borderStyle: "solid",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "#fff",
                          },
                        }}
                      />
                      {cat.terms.map((term) => {
                        const isActive = isTermActive(term);
                        return (
                          <Chip
                            key={term}
                            label={term}
                            size="small"
                            clickable
                            onClick={() => handleTermClick(term)}
                            variant={isActive ? "filled" : "outlined"}
                            color={isActive ? "primary" : "default"}
                            sx={{
                              fontSize: "0.71rem",
                              fontWeight: 600,
                              height: 23,
                              borderRadius: 1.5,
                              borderColor: isActive
                                ? "primary.main"
                                : "var(--indices-border, rgba(255, 255, 255, 0.1))",
                              backgroundColor: isActive
                                ? "primary.main"
                                : "var(--indices-subtle-bg, rgba(30, 41, 59, 0.4))",
                              "&:hover": {
                                backgroundColor: isActive
                                  ? "primary.dark"
                                  : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.8))",
                                borderColor: "primary.light",
                              },
                            }}
                          />
                        );
                      })}
                    </Stack>
                  ))}
                </Stack>
              ) : (
                /* Focused single category view */
                (() => {
                  const currentCat = SEARCH_CATEGORIES.find(
                    (c) => c.id === activeCategory,
                  );
                  if (!currentCat) return null;
                  return (
                    <Stack
                      direction="row"
                      flexWrap="wrap"
                      justifyContent="center"
                      alignItems="center"
                      gap={0.7}
                      sx={{ mt: 0.5 }}
                    >
                      {currentCat.terms.map((term) => {
                        const isActive = isTermActive(term);
                        return (
                          <Chip
                            key={term}
                            label={term}
                            size="small"
                            clickable
                            onClick={() => handleTermClick(term)}
                            variant={isActive ? "filled" : "outlined"}
                            color={isActive ? "primary" : "default"}
                            sx={{
                              fontSize: "0.72rem",
                              fontWeight: 600,
                              height: 24,
                              borderRadius: 1.5,
                              borderColor: isActive
                                ? "primary.main"
                                : "var(--indices-border, rgba(255, 255, 255, 0.1))",
                              backgroundColor: isActive
                                ? "primary.main"
                                : "var(--indices-subtle-bg, rgba(30, 41, 59, 0.4))",
                              "&:hover": {
                                backgroundColor: isActive
                                  ? "primary.dark"
                                  : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.8))",
                                borderColor: "primary.light",
                              },
                            }}
                          />
                        );
                      })}
                    </Stack>
                  );
                })()
              )}
            </Box>
          </Box>
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ width: "100%" }}>
        {/* Selected Provider Spotlight Hero Banner (Collapsible) */}
        {activeProviderObj && (
          <ProviderHeroBanner provider={activeProviderObj} />
        )}

        {/* Global Search Discovery Callout (if search finds results in other providers) */}
        {searchTerm &&
          selectedProvider !== "all" &&
          allProviderMatches.length > filteredIndices.length && (
            <Paper
              variant="outlined"
              sx={{
                mb: 2.5,
                p: 1.5,
                borderRadius: 2.5,
                backgroundColor: `${theme.palette.primary.main}14`,
                borderColor: `${theme.palette.primary.main}4d`,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "primary.light", fontSize: "0.85rem" }}
              >
                🔍 Found <strong>{filteredIndices.length}</strong> matching
                under{" "}
                <strong>
                  {selectedProvider === "others"
                    ? "Other Providers"
                    : activeProviderObj?.shortName}
                </strong>
                , and <strong>{allProviderMatches.length}</strong> matches
                across <strong>All Providers</strong>.
              </Typography>
              <Button
                size="small"
                variant="contained"
                startIcon={<LanguageIcon sx={{ fontSize: 15 }} />}
                onClick={() => updateFilterParams({ provider: "all" })}
                sx={{
                  borderRadius: 2,
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  py: 0.5,
                  px: 1.75,
                  whiteSpace: "nowrap",
                }}
              >
                View All {allProviderMatches.length} Results
              </Button>
            </Paper>
          )}

        {/* Results Count & Reset Action */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={{ xs: 1, sm: 1.5 }}
          sx={{ mb: 2, px: 0.5 }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 700,
              fontSize: "0.82rem",
            }}
          >
            Showing {filteredIndices.length} famous{" "}
            {selectedStyle !== "all"
              ? `${
                  selectedStyle === "growth"
                    ? "Growth"
                    : selectedStyle === "value"
                      ? "Value"
                      : "Factor"
                } `
              : ""}
            {selectedProvider !== "all"
              ? selectedProvider === "others"
                ? "Other Providers (Bloomberg, Nasdaq, MarketVector) indices"
                : `${activeProviderObj?.shortName || ""} indices`
              : "indices across major providers"}
            {selectedTerms.length > 0 &&
              ` • Filtered by [${selectedTerms.join(", ")}]`}
            {searchTerm && ` • Matching "${searchTerm}"`}
          </Typography>

          <Stack direction="row" spacing={1.5} alignItems="center">
            {(searchTerm ||
              selectedTerms.length > 0 ||
              selectedProvider !== "all" ||
              selectedStyle !== "all") && (
              <Button
                size="small"
                startIcon={<ReplayIcon fontSize="small" />}
                onClick={() => {
                  setSearchTerm("");
                  updateFilterParams({
                    provider: "all",
                    style: "all",
                    terms: null,
                    q: null,
                  });
                }}
                sx={{
                  fontSize: "0.75rem",
                  color: "text.secondary",
                  "&:hover": { color: "#ffffff" },
                }}
              >
                Reset Filters
              </Button>
            )}

            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_, newMode) => {
                if (newMode) updateFilterParams({ view: newMode });
              }}
              size="small"
              sx={{
                height: 28,
                "& .MuiToggleButton-root": {
                  px: 1,
                  py: 0,
                  color: "text.secondary",
                  borderColor:
                    "var(--indices-border, rgba(255, 255, 255, 0.1))",
                  "&.Mui-selected": {
                    color: "primary.light",
                    backgroundColor: `${theme.palette.primary.main}25`,
                  },
                },
              }}
            >
              <ToggleButton value="card" aria-label="card view">
                <ViewModuleIcon sx={{ fontSize: 18 }} />
              </ToggleButton>
              <ToggleButton value="table" aria-label="table view">
                <ViewListIcon sx={{ fontSize: 18 }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        {/* Loading State */}
        {isLoading ? (
          <Paper
            variant="outlined"
            sx={{
              p: 8,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: "rgba(30, 41, 59, 0.3)",
              borderStyle: "dashed",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <CircularProgress color="primary" />
              <Typography color="text.secondary">Loading indices...</Typography>
            </Stack>
          </Paper>
        ) : filteredIndices.length === 0 ? (
          /* Empty State */
          <Paper
            variant="outlined"
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(30, 41, 59, 0.3))",
              borderColor: "var(--indices-border, rgba(255, 255, 255, 0.12))",
              borderStyle: "dashed",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Typography sx={{ fontSize: "3rem" }}>🔍</Typography>
              <Typography variant="h5" component="h2">
                No matching indices found
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 540 }}>
                {selectedProvider !== "all" && allProviderMatches.length > 0 ? (
                  <>
                    No matches under{" "}
                    <strong>
                      {selectedProvider === "others"
                        ? "Other Providers"
                        : activeProviderObj?.shortName}
                    </strong>
                    , but <strong>{allProviderMatches.length}</strong> matching
                    indices were found across other providers.
                  </>
                ) : (
                  "Try searching by ticker (e.g. SPX, NDX, RUT, VTI, SCHD, SCHX), weighting methodology (e.g. Equal Weight, Packeting, Price-Weighted), or constituent criteria."
                )}
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
                {selectedProvider !== "all" &&
                  allProviderMatches.length > 0 && (
                    <Button
                      variant="contained"
                      startIcon={<LanguageIcon />}
                      onClick={() => updateFilterParams({ provider: "all" })}
                    >
                      Search All Providers ({allProviderMatches.length} matches)
                    </Button>
                  )}
                <Button
                  variant="outlined"
                  startIcon={<ReplayIcon />}
                  onClick={() => {
                    setSearchTerm("");
                    updateFilterParams({
                      provider: "all",
                      style: "all",
                      terms: null,
                      q: null,
                    });
                  }}
                >
                  Reset Filters
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ) : (
          /* Indices Grid & Pagination */
          <>
            {viewMode === "card" ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {visibleIndices.map((index) => (
                  <IndexCard key={index.id} index={index} />
                ))}
              </Box>
            ) : (
              <Box sx={{ mt: 1 }}>
                <IndexTableView indices={visibleIndices} />
              </Box>
            )}

            {/* Pagination / Show More... Controls */}
            {hasMore ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 4,
                  mb: 1.5,
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  Showing {visibleIndices.length} of {filteredIndices.length}{" "}
                  indices
                </Typography>

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  flexWrap="wrap"
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setVisibleRows((prev) => prev + 3)}
                    endIcon={<ExpandMoreIcon />}
                    sx={{
                      px: 3.5,
                      py: 1,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      fontSize: "0.92rem",
                      textTransform: "none",
                      boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}55`,
                    }}
                  >
                    Show More ({remainingCount} remaining)...
                  </Button>

                  {remainingCount > batchSize && (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() =>
                        setVisibleRows(
                          Math.ceil(filteredIndices.length / columns),
                        )
                      }
                      sx={{
                        px: 2.5,
                        py: 1,
                        borderRadius: 2.5,
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        textTransform: "none",
                        borderColor:
                          "var(--indices-border, rgba(255, 255, 255, 0.15))",
                        color: "text.secondary",
                        "&:hover": {
                          borderColor: "primary.main",
                          color: "text.primary",
                        },
                      }}
                    >
                      Show All ({filteredIndices.length})
                    </Button>
                  )}
                </Stack>
              </Box>
            ) : (
              filteredIndices.length > batchSize && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                    mb: 1,
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    Showing all {filteredIndices.length} indices
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    startIcon={<ExpandLessIcon />}
                    onClick={() => {
                      setVisibleRows(3);
                      window.scrollTo({ top: 380, behavior: "smooth" });
                    }}
                    sx={{
                      fontSize: "0.8rem",
                      color: "text.secondary",
                      textTransform: "none",
                      "&:hover": { color: "primary.light" },
                    }}
                  >
                    Show Less (Collapse to 3 rows)
                  </Button>
                </Box>
              )
            )}
          </>
        )}
      </Box>

      {/* Page Footer */}
      <SiteFooter />
    </Container>
  );
}
