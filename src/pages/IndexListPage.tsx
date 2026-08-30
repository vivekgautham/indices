import ClearIcon from "@mui/icons-material/Clear";
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
} from "@mui/material";
import { useMemo, useState } from "react";
import { useIndicesData, useProvidersData } from "../api/indicesApi";
import { IndexCard } from "../components/IndexCard";
import { ProviderHeroBanner } from "../components/ProviderHeroBanner";
import { ProviderPresetBar } from "../components/ProviderPresetBar";
import { MarketIndex, ProviderId } from "../types";

const POPULAR_SEARCH_SUGGESTIONS = [
  "Float-Adjusted",
  "Price-Weighted",
  "Equal Weight",
  "Packeting",
  "Multi-Factor",
  "Profitability Screen",
  "Dividend Growth",
  "Semiconductor",
  "Cybersecurity",
  "Volatility / VIX",
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

  // Preset selected provider, default to S&P as requested
  const [selectedProvider, setSelectedProvider] = useState<ProviderId | "all">(
    "sp",
  );
  const [searchTerm, setSearchTerm] = useState("");

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

  // Tokenized search query
  const searchTokens = useMemo(() => {
    return searchTerm
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter((t) => t.length > 0);
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

  const isLoading = loadingProviders || loadingIndices;

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 1720,
        py: { xs: 2.5, sm: 4 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      {/* Header Section */}
      <Box component="header" sx={{ mb: 3.5, textAlign: "center" }}>
        <Stack spacing={2} alignItems="center">
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
              Indices Catalog
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

          {/* Quick Preset Provider Selection Chips (Default S&P) */}
          <ProviderPresetBar
            selectedProvider={selectedProvider}
            onSelectProvider={(p) => setSelectedProvider(p)}
            indexCounts={indexCounts}
          />

          {/* Search Bar */}
          <Box sx={{ width: "100%", maxWidth: 780, mt: 0.5 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by index name, symbol (SPX, NDX, RUT), ETF (VOO, SCHD), methodology (packeting, price-weighted, equal weight), criteria..."
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
                  backgroundColor: "rgba(30, 41, 59, 0.7)",
                  backdropFilter: "blur(12px)",
                  fontSize: "0.95rem",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.light",
                  },
                },
              }}
            />

            {/* Quick Methodology Search Chips */}
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              gap={0.75}
              sx={{ mt: 1.25 }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  mr: 0.5,
                }}
              >
                Suggested searches:
              </Typography>
              {POPULAR_SEARCH_SUGGESTIONS.map((term) => {
                const isActive =
                  searchTerm.toLowerCase() === term.toLowerCase();
                return (
                  <Chip
                    key={term}
                    label={term}
                    size="small"
                    clickable
                    onClick={() =>
                      setSearchTerm((prev) => (prev === term ? "" : term))
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
                        : "rgba(255, 255, 255, 0.1)",
                      backgroundColor: isActive
                        ? "primary.main"
                        : "rgba(30, 41, 59, 0.4)",
                      "&:hover": {
                        backgroundColor: isActive
                          ? "primary.dark"
                          : "rgba(30, 41, 59, 0.8)",
                      },
                    }}
                  />
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ width: "100%" }}>
        {/* Selected Provider Spotlight Hero Banner (Collapsible) */}
        <ProviderHeroBanner
          provider={activeProviderObj}
          totalIndicesCount={filteredIndices.length}
        />

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

          {(searchTerm || selectedProvider !== "sp") && (
            <Button
              size="small"
              startIcon={<ReplayIcon fontSize="small" />}
              onClick={() => {
                setSelectedProvider("sp");
                setSearchTerm("");
              }}
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                "&:hover": { color: "#ffffff" },
              }}
            >
              Reset to S&P Default
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
              <Typography color="text.secondary">
                Loading index catalog...
              </Typography>
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
              backgroundColor: "rgba(30, 41, 59, 0.3)",
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
                  "Try searching by ticker (e.g. SPX, NDX, RUT, VTI, SCHD), weighting methodology (e.g. Equal Weight, Packeting, Price-Weighted), or constituent criteria."
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
                    setSelectedProvider("sp");
                    setSearchTerm("");
                  }}
                >
                  Reset Filters
                </Button>
              </Stack>
            </Stack>
          </Paper>
        ) : (
          /* Indices Grid */
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
            {filteredIndices.map((index) => (
              <IndexCard key={index.id} index={index} />
            ))}
          </Box>
        )}
      </Box>
    </Container>
  );
}
