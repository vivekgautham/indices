import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useIndicesData, useProvidersData } from "../api/indicesApi";

export default function IndexDetailPage() {
  const { indexId = "" } = useParams<{ indexId: string }>();
  const navigate = useNavigate();
  const { data: indices = [], isLoading: loadingIndices } = useIndicesData();
  const { data: providers = [], isLoading: loadingProviders } =
    useProvidersData();

  // Scroll to top when indexId changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [indexId]);

  // Find index by id or symbol (case-insensitive)
  const index = useMemo(() => {
    const target = indexId.trim().toLowerCase();
    if (!target) return null;
    return (
      indices.find(
        (idx) =>
          idx.id.toLowerCase() === target ||
          idx.symbol.toLowerCase() === target ||
          idx.altSymbols?.some(
            (alt) =>
              alt.toLowerCase() === target ||
              alt.toLowerCase().replace(/[^a-z0-9]/g, "") === target,
          ),
      ) || null
    );
  }, [indices, indexId]);

  // Provider object
  const provider = useMemo(() => {
    if (!index) return null;
    return providers.find((p) => p.id === index.providerId) || null;
  }, [index, providers]);

  // Related indices from the same provider
  const relatedIndices = useMemo(() => {
    if (!index) return [];
    return indices
      .filter(
        (idx) => idx.providerId === index.providerId && idx.id !== index.id,
      )
      .slice(0, 6);
  }, [indices, index]);

  const isLoading = loadingIndices || loadingProviders;

  if (isLoading && indices.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
              Loading benchmark details...
            </Typography>
          </Stack>
        </Paper>
      </Container>
    );
  }

  if (!index) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
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
            <Typography sx={{ fontSize: "3.5rem" }}>🔍</Typography>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
              Index Not Found
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 500 }}>
              No market benchmark index found matching identifier &quot;
              {indexId}&quot;.
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              sx={{ mt: 2, borderRadius: 2.5, fontWeight: 700 }}
            >
              Back to Catalog
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  const accentColor = provider?.accentColor || "#6366f1";

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: 1440,
        py: { xs: 2.5, sm: 4 },
        px: { xs: 1.5, sm: 3 },
      }}
    >
      {/* Navigation Bar / Breadcrumb */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 3.5 }}
      >
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderRadius: 2.5,
            fontWeight: 700,
            fontSize: "0.88rem",
            color: "text.secondary",
            px: 2,
            py: 0.75,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(30, 41, 59, 0.5)",
            backdropFilter: "blur(8px)",
            "&:hover": {
              color: "#ffffff",
              backgroundColor: "rgba(30, 41, 59, 0.85)",
              borderColor: "primary.light",
            },
          }}
        >
          Back to Indices Catalog
        </Button>

        {index.officialUrl && (
          <Button
            variant="outlined"
            href={index.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
            sx={{
              borderRadius: 2.5,
              borderColor: `${accentColor}66`,
              color: accentColor,
              backgroundColor: `${accentColor}10`,
              fontWeight: 700,
              fontSize: "0.82rem",
              px: 2,
              py: 0.75,
              "&:hover": {
                borderColor: accentColor,
                backgroundColor: `${accentColor}20`,
              },
            }}
          >
            Official Factsheet
          </Button>
        )}
      </Stack>

      {/* Hero Header Card */}
      <Card
        variant="outlined"
        sx={{
          mb: 4,
          p: { xs: 2.5, sm: 4 },
          borderRadius: 4,
          background: `linear-gradient(135deg, ${provider?.badgeBg || "rgba(99, 102, 241, 0.15)"} 0%, rgba(15, 23, 42, 0.95) 100%)`,
          backdropFilter: "blur(20px)",
          border: `1.5px solid ${accentColor}33`,
          boxShadow: `0 12px 36px rgba(0, 0, 0, 0.4), 0 0 30px ${accentColor}18`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <Box
          sx={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: accentColor,
            opacity: 0.12,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <Stack spacing={2.5}>
          {/* Tag row */}
          <Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
            <Chip
              label={index.symbol}
              sx={{
                fontWeight: 800,
                fontSize: "0.92rem",
                py: 2,
                px: 0.5,
                backgroundColor: accentColor,
                color: "#ffffff",
                borderRadius: 2,
              }}
            />

            {provider && (
              <Chip
                label={provider.name}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  borderColor: `${accentColor}55`,
                  color: accentColor,
                  borderRadius: 2,
                  border: "1px solid",
                  backgroundColor: `${accentColor}15`,
                }}
              />
            )}

            <Chip
              label={index.category}
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "text.secondary",
                borderRadius: 2,
              }}
            />

            <Chip
              label={index.region}
              sx={{
                fontSize: "0.78rem",
                fontWeight: 600,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "text.secondary",
                borderRadius: 2,
              }}
            />

            {index.altSymbols && index.altSymbols.length > 0 && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 600, ml: 0.5 }}
              >
                Alt Tickers: {index.altSymbols.join(", ")}
              </Typography>
            )}
          </Stack>

          {/* Main Title */}
          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "#f8fafc",
                fontSize: { xs: "1.85rem", sm: "2.5rem" },
                mb: 1,
              }}
            >
              {index.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#cbd5e1",
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                lineHeight: 1.65,
                maxWidth: 1050,
              }}
            >
              {index.summary}
            </Typography>
          </Box>
        </Stack>
      </Card>

      {/* Main Grid: Specifications & Detailed Sections */}
      <Stack spacing={4}>
        {/* Key Metrics Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          <Card
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                display: "block",
              }}
            >
              👥 Total Constituents
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "#f8fafc", mt: 0.5 }}
            >
              {typeof index.constituentsCount === "number"
                ? index.constituentsCount.toLocaleString()
                : index.constituentsCount}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Active basket members
            </Typography>
          </Card>

          <Card
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                display: "block",
              }}
            >
              ⚖️ Weighting Scheme
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#f8fafc",
                mt: 0.5,
                lineHeight: 1.3,
              }}
            >
              {index.weightingMethodology}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Portfolio weighting rule
            </Typography>
          </Card>

          <Card
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                display: "block",
              }}
            >
              🔄 Rebalance Cadence
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#f8fafc",
                mt: 0.5,
                lineHeight: 1.3,
              }}
            >
              {index.rebalanceFrequency}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Review & reconstitution
            </Typography>
          </Card>

          <Card
            variant="outlined"
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(30, 41, 59, 0.6)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                display: "block",
              }}
            >
              🚀 Launch Inception Year
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: "#f8fafc", mt: 0.5 }}
            >
              {index.launchYear}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Official benchmark launch
            </Typography>
          </Card>
        </Box>

        {/* Detailed Narrative & Tracking ETFs */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.7fr 1fr" },
            gap: 3,
          }}
        >
          {/* Left Column: Methodology & Criteria */}
          <Stack spacing={3}>
            {/* Overview Card */}
            <Card
              variant="outlined"
              sx={{
                p: { xs: 2.5, sm: 3.5 },
                borderRadius: 3.5,
                backgroundColor: "rgba(30, 41, 59, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "#f8fafc", mb: 1.5 }}
              >
                📖 Benchmark Methodology & Description
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#cbd5e1", lineHeight: 1.75 }}
              >
                {index.description}
              </Typography>
            </Card>

            {/* Inclusion Criteria */}
            {index.eligibilityCriteria &&
              index.eligibilityCriteria.length > 0 && (
                <Card
                  variant="outlined"
                  sx={{
                    p: { xs: 2.5, sm: 3.5 },
                    borderRadius: 3.5,
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "#f8fafc", mb: 2 }}
                  >
                    📋 Constituent Inclusion & Eligibility Criteria
                  </Typography>
                  <Stack spacing={1.5}>
                    {index.eligibilityCriteria.map((crit, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                        }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: 20,
                            color: accentColor,
                            mt: "2px",
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "#cbd5e1", lineHeight: 1.5 }}
                        >
                          {crit}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              )}

            {/* Key Characteristics */}
            {index.keyCharacteristics &&
              index.keyCharacteristics.length > 0 && (
                <Card
                  variant="outlined"
                  sx={{
                    p: { xs: 2.5, sm: 3.5 },
                    borderRadius: 3.5,
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 800, color: "#f8fafc", mb: 2 }}
                  >
                    ⭐ Key Benchmark Highlights
                  </Typography>
                  <Stack spacing={1.5}>
                    {index.keyCharacteristics.map((char, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: "primary.light",
                            mt: 1,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ color: "#cbd5e1", lineHeight: 1.5 }}
                        >
                          {char}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              )}

            {/* Tags */}
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {index.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`# ${tag}`}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "text.secondary",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {/* Right Column: Tracking ETFs & Provider Spotlight */}
          <Stack spacing={3}>
            {/* Top Tracking ETFs */}
            {index.trackingEtfs && index.trackingEtfs.length > 0 && (
              <Card
                variant="outlined"
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 3.5,
                  backgroundColor: "rgba(30, 41, 59, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 800, color: "#f8fafc", mb: 2 }}
                >
                  📦 Benchmark Tracking ETFs & Funds
                </Typography>
                <Stack spacing={1.5}>
                  {index.trackingEtfs.map((etf) => (
                    <Box
                      key={etf.ticker}
                      sx={{
                        p: 1.75,
                        borderRadius: 2.5,
                        backgroundColor: "rgba(15, 23, 42, 0.7)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.light",
                          backgroundColor: "rgba(15, 23, 42, 0.95)",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 0.5 }}
                      >
                        <Chip
                          label={etf.ticker}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            backgroundColor: "rgba(99, 102, 241, 0.25)",
                            color: "primary.light",
                            border: "1px solid rgba(99, 102, 241, 0.4)",
                            borderRadius: 1.5,
                          }}
                        />
                        {etf.aum && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "primary.light",
                              fontWeight: 800,
                              fontSize: "0.78rem",
                            }}
                          >
                            AUM: {etf.aum}
                          </Typography>
                        )}
                      </Stack>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#f8fafc" }}
                      >
                        {etf.name}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>
            )}

            {/* Provider Info Card */}
            {provider && (
              <Card
                variant="outlined"
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 3.5,
                  background: `linear-gradient(135deg, ${provider.badgeBg} 0%, rgba(15, 23, 42, 0.85) 100%)`,
                  border: `1.5px solid ${accentColor}33`,
                }}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip
                      label={provider.shortName}
                      size="small"
                      sx={{
                        backgroundColor: accentColor,
                        color: "#ffffff",
                        fontWeight: 800,
                        borderRadius: 1.5,
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 800, color: "#f8fafc" }}
                    >
                      {provider.name}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "0.85rem" }}
                  >
                    {provider.tagline}
                  </Typography>

                  <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block" }}
                    >
                      🏢 Headquarters
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#f8fafc" }}
                    >
                      {provider.headquarters}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block" }}
                    >
                      🏛️ Founded / Inception
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#f8fafc" }}
                    >
                      {provider.founded}
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    endIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
                    sx={{
                      mt: 1,
                      borderColor: `${accentColor}66`,
                      color: "#ffffff",
                      backgroundColor: `${accentColor}15`,
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: accentColor,
                        backgroundColor: `${accentColor}30`,
                      },
                    }}
                  >
                    Visit {provider.shortName} Website
                  </Button>
                </Stack>
              </Card>
            )}
          </Stack>
        </Box>

        {/* Related Indices Section */}
        {relatedIndices.length > 0 && (
          <Box sx={{ pt: 2 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: 800, color: "#f8fafc", mb: 2 }}
            >
              🔗 More Famous Indices from{" "}
              {provider?.shortName || "Same Provider"}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                },
                gap: 2,
              }}
            >
              {relatedIndices.map((rel) => (
                <Card
                  key={rel.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    backgroundColor: "rgba(30, 41, 59, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: accentColor,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/index/${rel.id}`)}
                    sx={{ p: 2, height: "100%" }}
                  >
                    <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Chip
                          label={rel.symbol}
                          size="small"
                          sx={{
                            fontWeight: 800,
                            backgroundColor: accentColor,
                            color: "#ffffff",
                            borderRadius: 1.5,
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 600 }}
                        >
                          {rel.category}
                        </Typography>
                      </Stack>

                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 800, color: "#f8fafc", mb: 0.5 }}
                      >
                        {rel.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.8rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {rel.summary}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Stack>
    </Container>
  );
}
