import ClearIcon from "@mui/icons-material/Clear";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
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
import { IndexDetailModal } from "../components/IndexDetailModal";
import { ProviderHeroBanner } from "../components/ProviderHeroBanner";
import { ProviderPresetBar } from "../components/ProviderPresetBar";
import { MarketIndex, ProviderId } from "../types";

export default function IndexListPage() {
  const { data: providers = [], isLoading: loadingProviders } =
    useProvidersData();
  const { data: indices = [], isLoading: loadingIndices } = useIndicesData();

  // Preset selected provider, default to S&P as requested
  const [selectedProvider, setSelectedProvider] = useState<ProviderId | "all">(
    "sp",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState<MarketIndex | null>(
    null,
  );

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

  // Filtered indices list
  const filteredIndices = useMemo(() => {
    let result = [...indices];

    // Filter by provider preset
    if (selectedProvider !== "all") {
      result = result.filter((idx) => idx.providerId === selectedProvider);
    }

    // Filter by search query
    const query = searchTerm.trim().toLowerCase();
    if (query) {
      result = result.filter((idx) => {
        const symbolMatch =
          idx.symbol.toLowerCase().includes(query) ||
          idx.altSymbols?.some((alt) => alt.toLowerCase().includes(query));
        const nameMatch = idx.name.toLowerCase().includes(query);
        const categoryMatch = idx.category.toLowerCase().includes(query);
        const providerMatch = idx.providerId.toLowerCase().includes(query);
        const tagMatch = idx.tags.some((tag) =>
          tag.toLowerCase().includes(query),
        );
        const etfMatch = idx.trackingEtfs?.some(
          (etf) =>
            etf.ticker.toLowerCase().includes(query) ||
            etf.name.toLowerCase().includes(query),
        );
        const summaryMatch =
          idx.summary.toLowerCase().includes(query) ||
          idx.description.toLowerCase().includes(query);

        return (
          symbolMatch ||
          nameMatch ||
          categoryMatch ||
          providerMatch ||
          tagMatch ||
          etfMatch ||
          summaryMatch
        );
      });
    }

    return result;
  }, [indices, selectedProvider, searchTerm]);

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
          <Box sx={{ width: "100%", maxWidth: 760, mt: 0.5 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search index names, tickers (SPX, NDX, RUT, VTI), ETFs (VOO, QQQ), methodology..."
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
              <Typography color="text.secondary">
                Try selecting a different provider or clearing the search term.
              </Typography>
              <Button
                variant="contained"
                startIcon={<ReplayIcon />}
                onClick={() => {
                  setSelectedProvider("sp");
                  setSearchTerm("");
                }}
              >
                Reset Filters
              </Button>
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
              <IndexCard
                key={index.id}
                index={index}
                onSelect={(idx) => setActiveModalIndex(idx)}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Index Detail Modal */}
      <IndexDetailModal
        index={activeModalIndex}
        open={Boolean(activeModalIndex)}
        onClose={() => setActiveModalIndex(null)}
      />
    </Container>
  );
}
