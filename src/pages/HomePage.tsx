import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import { useFredData } from "../api/fredApi";
import { useProvidersData } from "../api/indicesApi";
import SiteFooter from "../components/layout/SiteFooter";
import { ProviderLogo } from "../components/ProviderLogo";
import { INDICES_DATA } from "../data/indicesData";

const TOTAL_INDICES = INDICES_DATA.length;

const PLATFORM_STATS = [
  { value: `${TOTAL_INDICES}+`, label: "Documented Indices", desc: "Equities, Fixed Income, Smart Beta" },
  { value: "17", label: "Global Providers", desc: "S&P, MSCI, FTSE, Nasdaq, STOXX" },
  { value: "$15T+", label: "Tracked ETF Assets", desc: "Replicated by US & UCITS Funds" },
  { value: "46", label: "Live Market Feeds", desc: "Daily prices, yields, sector sparklines" },
];

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: fredData } = useFredData();
  const { data: providers = [] } = useProvidersData();

  // Forward search queries (e.g., from browser omnibox or Google Sitelinks Search) to /indices?q=...
  useEffect(() => {
    const query =
      searchParams.get("q") ||
      searchParams.get("query") ||
      searchParams.get("search");
    if (query && query.trim()) {
      navigate(`/indices?q=${encodeURIComponent(query.trim())}`, {
        replace: true,
      });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    document.title = `MarketIndices.xyz – ${TOTAL_INDICES}+ Global Benchmark Indices & Tracking ETFs 📊`;
  }, []);

  // Top streaming ticker strip data
  const tickerItems = useMemo(() => {
    if (!fredData?.series) return [];
    const ids = [
      "SP500",
      "NASDAQ100",
      "RUI",
      "RUT",
      "DJIA",
      "DGS10",
      "FTSE_100",
      "NIKKEI_225",
      "NIFTY_50",
      "IBOVESPA",
      "TAIEX",
      "SMI",
    ];
    return ids
      .map((id) => fredData.series[id])
      .filter((s) => s && s.latestValue != null);
  }, [fredData]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Hero Section with Emerald / Midnight Glow */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 4, sm: 6, md: 8 },
          pb: { xs: 6, sm: 8, md: 10 },
          background:
            "radial-gradient(ellipse 80% 50% at 50% -15%, rgba(0, 221, 148, 0.15) 0%, rgba(5, 13, 10, 0) 75%), linear-gradient(180deg, #050d0a 0%, #071511 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems="center" textAlign="center">
            {/* Main Headline */}
            <Typography
              component="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.95rem", sm: "3.2rem", md: "4.1rem" },
                letterSpacing: "-0.035em",
                lineHeight: { xs: 1.15, sm: 1.1 },
                maxWidth: 960,
                color: "#ffffff",
              }}
            >
              The Open Directory for{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #00DD94 0%, #00F5FF 60%, #6366f1 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline",
                }}
              >
                Global Market Benchmarks
              </Box>{" "}
              &amp; Tracking ETFs
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", sm: "1.15rem", md: "1.25rem" },
                color: "text.secondary",
                maxWidth: 780,
                lineHeight: 1.6,
                fontWeight: 400,
                px: { xs: 0.5, sm: 0 },
              }}
            >
              Institutional-grade methodologies, factor screens, and ETF mappings
              covering <strong>{TOTAL_INDICES}+ indices</strong> across <strong>17 global providers</strong>.
              Compare float-adjusted market cap, constituent rules, and real-time sovereign yield curves in one unified interface.
            </Typography>

            {/* Dual Main CTA Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 1, width: { xs: "100%", sm: "auto" } }}
            >
              <Button
                component={RouterLink}
                to="/indices"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#00DD94",
                  color: "#050D0A",
                  fontWeight: 800,
                  fontSize: "1rem",
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1.4,
                  textTransform: "none",
                  boxShadow: "0 4px 20px rgba(0, 221, 148, 0.35)",
                  "&:hover": {
                    backgroundColor: "#00f0a0",
                    color: "#050D0A",
                    boxShadow: "0 6px 28px rgba(0, 221, 148, 0.5)",
                    "& .MuiSvgIcon-root": {
                      color: "#050D0A",
                    },
                  },
                }}
              >
                Browse All {TOTAL_INDICES}+ Indices
              </Button>
              <Button
                component={RouterLink}
                to="/tracker"
                variant="outlined"
                size="large"
                startIcon={<ShowChartIcon />}
                sx={{
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1.4,
                  textTransform: "none",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  "&:hover": {
                    borderColor: "#00DD94",
                    backgroundColor: "rgba(0, 221, 148, 0.08)",
                    color: "#00DD94",
                  },
                }}
              >
                Open Live Macro Tracker
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* 2. Rolling Market Benchmarks Ticker Strip */}
      {tickerItems.length > 0 && (
        <Box
          sx={{
            py: 1.25,
            backgroundColor: "#081210",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Pinned Benchmarks Label */}
          <Box
            sx={{
              flexShrink: 0,
              zIndex: 3,
              display: "flex",
              alignItems: "center",
              gap: 1,
              pl: { xs: 2, sm: 3 },
              pr: { xs: 1.5, sm: 2.5 },
              backgroundColor: "#081210",
              boxShadow: "16px 0 20px -4px #081210",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "#00DD94",
                boxShadow: "0 0 8px #00DD94",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: "#00DD94",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontSize: "0.72rem",
                whiteSpace: "nowrap",
              }}
            >
              Benchmarks:
            </Typography>
          </Box>

          {/* Rolling Ticker Marquee */}
          <Box
            sx={{
              display: "flex",
              overflow: "hidden",
              flex: 1,
              position: "relative",
              maskImage: "linear-gradient(to right, transparent, black 16px, black calc(100% - 24px), transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 16px, black calc(100% - 24px), transparent)",
              "&:hover .ticker-marquee-track": {
                animationPlayState: "paused",
              },
            }}
          >
            {[0, 1].map((copyIndex) => (
              <Box
                key={copyIndex}
                className="ticker-marquee-track"
                aria-hidden={copyIndex === 1 ? "true" : undefined}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  pr: 1.5,
                  flexShrink: 0,
                  willChange: "transform",
                  animation: "tickerRoll 42s linear infinite",
                  "@keyframes tickerRoll": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-100%)" },
                  },
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                }}
              >
                {tickerItems.map((s) => {
                  const isPositive = s.change >= 0;
                  return (
                    <Paper
                      key={`${copyIndex}-${s.id}`}
                      component={RouterLink}
                      to={`/tracker?series=${s.id}`}
                      variant="outlined"
                      sx={{
                        textDecoration: "none",
                        px: 1.5,
                        py: 0.6,
                        borderRadius: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1.2,
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                        "&:hover": {
                          backgroundColor: "rgba(0, 221, 148, 0.08)",
                          borderColor: "rgba(0, 221, 148, 0.4)",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "text.primary", whiteSpace: "nowrap" }}>
                        {s.shortName || s.name}
                      </Typography>
                      <Typography sx={{ fontSize: "0.78rem", fontWeight: 800, color: "#ffffff", whiteSpace: "nowrap" }}>
                        {s.format === "percent"
                          ? `${s.latestValue.toFixed(2)}%`
                          : s.latestValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: isPositive ? "#10b981" : "#ef4444",
                          display: "inline-flex",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isPositive ? "+" : ""}
                        {s.changePct.toFixed(2)}%
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* 3. Institutional Providers Showcase */}
      <Box sx={{ py: { xs: 6, sm: 8 }, backgroundColor: "#050D0A", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              width: "100%",
              mb: 4,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#00DD94",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textAlign: "center",
                display: "block",
                width: "100%",
                mb: 0.5,
              }}
            >
              Global Standards
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: "#ffffff",
                textAlign: "center",
                display: "block",
                width: "100%",
                mb: 1.5,
              }}
            >
              17 Premier Index Administrators Covered
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                maxWidth: 640,
                width: "100%",
                mx: "auto",
                textAlign: "center",
                display: "block",
              }}
            >
              Filter benchmarks by official sponsor and explore methodologies from the world’s leading index calculation agents.
            </Typography>
          </Box>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={1.2}>
            {providers.map((p) => (
              <Chip
                key={p.id}
                avatar={
                  <Box sx={{ ml: 0.5, display: "flex", alignItems: "center" }}>
                    <ProviderLogo providerId={p.id} size={18} />
                  </Box>
                }
                label={p.shortName || p.name}
                clickable
                component={RouterLink}
                to={`/indices?provider=${p.id}`}
                sx={{
                  py: 2.2,
                  px: 1,
                  borderRadius: 2.5,
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  color: "text.secondary",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 221, 148, 0.12)",
                    color: "#00DD94",
                    borderColor: "rgba(0, 221, 148, 0.35)",
                  },
                }}
              />
            ))}
          </Stack>
        </Container>
      </Box>

      {/* 5. Institutional Scale & Trust Metrics */}
      <Box sx={{ py: { xs: 5, sm: 6 }, backgroundColor: "#081511", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: { xs: 2.5, sm: 3 },
              textAlign: "center",
            }}
          >
            {PLATFORM_STATS.map((stat) => (
              <Box key={stat.label}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.75rem", sm: "2.4rem", md: "2.8rem" },
                    letterSpacing: "-0.03em",
                    color: "#00DD94",
                    lineHeight: 1,
                    mb: 0.75,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ fontWeight: 800, color: "#ffffff", fontSize: { xs: "0.88rem", sm: "0.95rem" }, mb: 0.2 }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontSize: { xs: "0.72rem", sm: "0.75rem" } }}>
                  {stat.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 6. Bottom Call to Action Card */}
      <Box sx={{ py: { xs: 5, sm: 8 }, backgroundColor: "#050D0A" }}>
        <Container maxWidth="md">
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 3, sm: 5, md: 6 },
              borderRadius: 4,
              textAlign: "center",
              background:
                "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(0, 221, 148, 0.2) 0%, rgba(15, 23, 42, 0.6) 80%)",
              borderColor: "rgba(0, 221, 148, 0.4)",
              boxShadow: "0 12px 40px rgba(0, 221, 148, 0.12)",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 900, color: "#ffffff", mb: 1.5, fontSize: { xs: "1.5rem", sm: "2.2rem" } }}>
              Ready to Explore Global Benchmarks?
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 540, mx: "auto", mb: 3.5, fontSize: { xs: "0.95rem", sm: "1.05rem" } }}>
              Dive into all {TOTAL_INDICES}+ equity, smart beta, and sovereign indices with full methodology criteria, fee metrics, and live ETF trackers.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
              <Button
                component={RouterLink}
                to="/indices"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: "#00DD94",
                  color: "#050D0A",
                  fontWeight: 800,
                  fontSize: "1rem",
                  borderRadius: 2.5,
                  px: 4,
                  py: 1.4,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#00f0a0",
                    color: "#050D0A",
                    "& .MuiSvgIcon-root": {
                      color: "#050D0A",
                    },
                  },
                }}
              >
                Launch Indices Directory
              </Button>
              <Button
                component={RouterLink}
                to="/tracker"
                variant="outlined"
                size="large"
                startIcon={<ShowChartIcon />}
                sx={{
                  color: "#ffffff",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: 2.5,
                  px: 3.5,
                  py: 1.4,
                  textTransform: "none",
                  "&:hover": { borderColor: "#00DD94", color: "#00DD94" },
                }}
              >
                Live Benchmark Tracker
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Container maxWidth="lg">
        <SiteFooter />
      </Container>
    </Box>
  );
}
