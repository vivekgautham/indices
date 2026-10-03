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
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useIndicesData, useProvidersData } from "../api/indicesApi";
import AppVersionBadge from "../components/layout/AppVersionBadge";
import SiteFooter from "../components/layout/SiteFooter";
import ThemeSelector from "../components/layout/ThemeSelector";
import { IndexCard } from "../components/IndexCard";
import { ProviderHeroBanner } from "../components/ProviderHeroBanner";
import { ProviderPresetBar } from "../components/ProviderPresetBar";
import { MarketIndex, ProviderId } from "../types";

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
      "Semiconductor",
      "Wide Moat",
      "Quality",
      "High Dividend",
      "Cybersecurity",
      "Precious Metals",
      "Bonds / Fixed Income",
      "Treasury / Cash",
      "Volatility / VIX",
      "Profitability Screen",
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
      "Growth",
      "Value",
      "International",
      "Emerging Markets",
      "Japan",
      "India",
      "China",
    ],
  },
];

// Helper to check if a market index matches a multi-term query
function matchIndex(idx: MarketIndex, tokens: string[]): boolean {
  // Build a rich searchable text blob covering all index metadata & methodology
  const searchableText = [
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
    ...(idx.trackingEtfs || []).map((etf) => `${etf.ticker} ${etf.name}`),
  ]
    .join(" ")
    .toLowerCase();

  // Every search token must be present in the searchable blob (AND match)
  return tokens.every((token) => searchableText.includes(token));
}

export default function IndexListPage() {
  const { data: providers = [], isLoading: loadingProviders } =
    useProvidersData();
  const { data: indices = [], isLoading: loadingIndices } = useIndicesData();

  // Preset selected provider, default to all providers
  const [selectedProvider, setSelectedProvider] = useState<ProviderId | "all">(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleRows, setVisibleRows] = useState(3);
  const [activeCategory, setActiveCategory] = useState<
    "all" | "themes" | "etf-providers" | "market-exposure"
  >("themes");

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  // Reset pagination to 3 rows whenever filter or search query changes
  useEffect(() => {
    setVisibleRows(3);
  }, [searchTerm, selectedProvider]);

  // Calculate index counts per provider
  const indexCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: indices.length,
    };
    indices.forEach((idx) => {
      counts[idx.providerId] = (counts[idx.providerId] || 0) + 1;
    });
    return counts;
  }, [indices]);

  // Current active provider object if a single provider is selected
  const activeProviderObj = useMemo(() => {
    if (selectedProvider === "all") return undefined;
    return providers.find((p) => p.id === selectedProvider);
  }, [providers, selectedProvider]);

  // Tokenized search query (splitting by whitespace and slashes, filtering non-alphanumeric)
  const searchTokens = useMemo(() => {
    return searchTerm
      .trim()
      .toLowerCase()
      .split(/[\s/]+/)
      .filter((t) => t.length > 0 && /[a-z0-9]/i.test(t));
  }, [searchTerm]);

  // Matches across ALL providers (for global search discovery)
  const allProviderMatches = useMemo(() => {
    if (searchTokens.length === 0) return indices;
    return indices.filter((idx) => matchIndex(idx, searchTokens));
  }, [indices, searchTokens]);

  // Filtered indices list for the current provider selection
  const filteredIndices = useMemo(() => {
    let list = allProviderMatches;
    if (selectedProvider !== "all") {
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
      {/* Top Right Header Controls: Color Theme & App Version */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexWrap: "wrap",
          gap: { xs: 0.75, sm: 1.25 },
          mb: { xs: 1, sm: 1.5 },
        }}
      >
        <ThemeSelector />
        <AppVersionBadge />
      </Box>

      {/* Header Section */}
      <Box
        component="header"
        sx={{ mb: 3.5, textAlign: "center", width: "100%" }}
      >
        <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.03em",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              fontSize: { xs: "2rem", sm: "2.75rem" },
            }}
          >
            <Box component="span" sx={{ fontSize: "1.1em", lineHeight: 1 }}>
              📊
            </Box>
            <Box
              component="span"
              sx={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Indices
            </Box>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 720,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Explore the world&apos;s premier benchmark providers and their
            iconic market indices, tracking ETFs, constituent criteria, and
            weighting methodologies.
          </Typography>

          {/* Quick Preset Provider Selection Chips (Default All) */}
          <ProviderPresetBar
            selectedProvider={selectedProvider}
            onSelectProvider={(p) => setSelectedProvider(p)}
            indexCounts={indexCounts}
          />

          {/* Search Bar */}
          <Box sx={{ width: "100%", mt: 0.5 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by index name, symbol (SPX, NDX, RUT), ETF (VOO, SCHD, SCHX), methodology (packeting, price-weighted, equal weight), criteria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Clear search"
                      onClick={() => setSearchTerm("")}
                      edge="end"
                      size="small"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
                sx: {
                  borderRadius: 3.5,
                  backgroundColor:
                    "var(--indices-card-bg, rgba(30, 41, 59, 0.7))",
                  backdropFilter: "blur(12px)",
                  fontSize: "0.95rem",
                  "& fieldset": {
                    borderColor:
                      "var(--indices-border, rgba(255, 255, 255, 0.12))",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                },
              }}
            />

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
                  const hasActiveTerm = cat.terms.some(
                    (t) => t.toLowerCase() === searchTerm.toLowerCase()
                  );
                  return (
                    <Button
                      key={cat.id}
                      size="small"
                      variant={isCatActive ? "contained" : "outlined"}
                      onClick={() => setActiveCategory(cat.id)}
                      sx={{
                        borderRadius: 2,
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        py: 0.25,
                        px: 1.1,
                        minHeight: 24,
                        textTransform: "none",
                        borderColor: hasActiveTerm
                          ? "primary.main"
                          : undefined,
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
                  onClick={() => setActiveCategory("all")}
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
                        onClick={() => setActiveCategory(cat.id)}
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.68rem",
                          height: 22,
                          cursor: "pointer",
                          color: "primary.light",
                          backgroundColor:
                            "var(--indices-card-hover-bg, rgba(99, 102, 241, 0.12))",
                          borderColor: "rgba(99, 102, 241, 0.3)",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "#fff",
                          },
                        }}
                      />
                      {cat.terms.map((term) => {
                        const isActive =
                          searchTerm.toLowerCase() === term.toLowerCase();
                        return (
                          <Chip
                            key={term}
                            label={term}
                            size="small"
                            clickable
                            onClick={() =>
                              setSearchTerm((prev) =>
                                prev.toLowerCase() === term.toLowerCase()
                                  ? ""
                                  : term
                              )
                            }
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
                    (c) => c.id === activeCategory
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
                        const isActive =
                          searchTerm.toLowerCase() === term.toLowerCase();
                        return (
                          <Chip
                            key={term}
                            label={term}
                            size="small"
                            clickable
                            onClick={() =>
                              setSearchTerm((prev) =>
                                prev.toLowerCase() === term.toLowerCase()
                                  ? ""
                                  : term
                              )
                            }
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
                backgroundColor: "rgba(99, 102, 241, 0.08)",
                borderColor: "rgba(99, 102, 241, 0.3)",
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
                under <strong>{activeProviderObj?.shortName}</strong>, and{" "}
                <strong>{allProviderMatches.length}</strong> matches across{" "}
                <strong>All Providers</strong>.
              </Typography>
              <Button
                size="small"
                variant="contained"
                startIcon={<LanguageIcon sx={{ fontSize: 15 }} />}
                onClick={() => setSelectedProvider("all")}
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
          direction="row"
          justifyContent="space-between"
          alignItems="center"
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
            {selectedProvider !== "all"
              ? `${activeProviderObj?.shortName || ""} indices`
              : "indices across major providers"}
            {searchTerm && ` • Matching "${searchTerm}"`}
          </Typography>

          {(searchTerm || selectedProvider !== "all") && (
            <Button
              size="small"
              startIcon={<ReplayIcon fontSize="small" />}
              onClick={() => {
                setSelectedProvider("all");
                setSearchTerm("");
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
                    <strong>{activeProviderObj?.shortName}</strong>, but{" "}
                    <strong>{allProviderMatches.length}</strong> matching
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
                      onClick={() => setSelectedProvider("all")}
                    >
                      Search All Providers ({allProviderMatches.length} matches)
                    </Button>
                  )}
                <Button
                  variant="outlined"
                  startIcon={<ReplayIcon />}
                  onClick={() => {
                    setSelectedProvider("all");
                    setSearchTerm("");
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
                  Showing {visibleIndices.length} of {filteredIndices.length} indices
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
                      boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.35)",
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
                          Math.ceil(filteredIndices.length / columns)
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
