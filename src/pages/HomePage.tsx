import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFredData } from "../api/fredApi";
import { useProvidersData } from "../api/indicesApi";
import { AppLogo } from "../components/common/AppLogo";
import SiteFooter from "../components/layout/SiteFooter";
import { ProviderLogo } from "../components/ProviderLogo";
import { APP_VERSION } from "../constants/version";

const POPULAR_QUERIES = [
  { label: "S&P 500", query: "S&P 500" },
  { label: "Nasdaq 100", query: "Nasdaq 100" },
  { label: "Russell 2000", query: "Russell 2000" },
  { label: "Semiconductors", query: "Semiconductor" },
  { label: "Dividend Growth", query: "Dividend Growth" },
  { label: "Momentum", query: "Momentum" },
  { label: "India / Nifty", query: "Nifty" },
  { label: "Treasuries", query: "Treasury" },
];

const FEATURED_BENCHMARKS = [
  {
    symbol: "SPX",
    name: "S&P 500 Index",
    category: "U.S. Large-Cap",
    provider: "S&P Dow Jones",
    flag: "🇺🇸",
    route: "/index/sp-500",
    description: "The premier benchmark for U.S. equities, tracking 500 corporate champions.",
    etfs: ["SPY", "VOO", "IVV"],
    seriesId: "SP500",
    accent: "#8b5cf6",
  },
  {
    symbol: "NDX",
    name: "NASDAQ-100 Index",
    category: "Tech & Innovation",
    provider: "Nasdaq",
    flag: "🇺🇸",
    route: "/index/nasdaq-100",
    description: "Top 100 non-financial tech titans driving cloud, semiconductors, and AI.",
    etfs: ["QQQ", "QQQM"],
    seriesId: "NASDAQ100",
    accent: "#06b6d4",
  },
  {
    symbol: "RUT",
    name: "Russell 2000 Index",
    category: "U.S. Small-Cap",
    provider: "FTSE Russell",
    flag: "🇺🇸",
    route: "/index/russell-2000",
    description: "The world's leading benchmark for small-cap equity funds and active factor tilts.",
    etfs: ["IWM", "VTWO"],
    seriesId: "RUT",
    accent: "#10b981",
  },
  {
    symbol: "NIFTY 50",
    name: "NIFTY 50 Index",
    category: "Emerging Markets",
    provider: "NSE Indices",
    flag: "🇮🇳",
    route: "/index/nifty-50",
    description: "India's flagship blue-chip benchmark covering 13 core economic sectors.",
    etfs: ["INDA", "INDY"],
    seriesId: "NIFTY_50",
    accent: "#f59e0b",
  },
  {
    symbol: "N225",
    name: "Nikkei 225 Stock Average",
    category: "Asia-Pacific Developed",
    provider: "Nikkei / JPX",
    flag: "🇯🇵",
    route: "/index/nikkei-225",
    description: "Japan's iconic price-weighted barometer tracking 225 premier Tokyo blue chips.",
    etfs: ["EWJ"],
    seriesId: "NIKKEI_225",
    accent: "#e11d48",
  },
  {
    symbol: "10Y YIELD",
    name: "10-Year Treasury Yield",
    category: "Sovereign Benchmark Rate",
    provider: "U.S. Treasury",
    flag: "🏛️",
    route: "/tracker",
    description: "The global financial system's benchmark risk-free reference rate and mortgage anchor.",
    etfs: ["IEF", "TLT"],
    seriesId: "DGS10",
    accent: "#38bdf8",
  },
];

const PLATFORM_STATS = [
  { value: "179+", label: "Documented Indices", desc: "Equities, Fixed Income, Smart Beta" },
  { value: "17", label: "Global Providers", desc: "S&P, MSCI, FTSE, Nasdaq, STOXX" },
  { value: "$15T+", label: "Tracked ETF Assets", desc: "Replicated by US & UCITS Funds" },
  { value: "46", label: "Live Market Feeds", desc: "Daily prices, yields, sector sparklines" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState("");
  const { data: fredData } = useFredData();
  const { data: providers = [] } = useProvidersData();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/indices?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate("/indices");
    }
  };

  // Top streaming ticker strip data
  const tickerItems = useMemo(() => {
    if (!fredData?.series) return [];
    const ids = [
      "SP500",
      "NASDAQ100",
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
                fontSize: { xs: "2.3rem", sm: "3.4rem", md: "4.1rem" },
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
                fontSize: { xs: "1rem", sm: "1.18rem", md: "1.25rem" },
                color: "text.secondary",
                maxWidth: 780,
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Institutional-grade methodologies, factor screens, and ETF mappings
              covering <strong>179+ indices</strong> across <strong>17 global providers</strong>.
              Compare float-adjusted market cap, constituent rules, and real-time sovereign yield curves in one unified interface.
            </Typography>

            {/* Interactive Search Box */}
            <Box
              component="form"
              onSubmit={handleSearchSubmit}
              sx={{
                width: "100%",
                maxWidth: 680,
                mt: 1.5,
              }}
            >
              <TextField
                fullWidth
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search by index, ticker, provider, or factor (e.g., S&P 500, QQQ, Avantis, Momentum)..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#00DD94", fontSize: 24, ml: 0.5 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#00DD94",
                          color: "#050D0A",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          borderRadius: 2,
                          px: 2.2,
                          py: 0.8,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#00f0a0",
                          },
                        }}
                      >
                        Explore
                      </Button>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 3,
                    backgroundColor: "rgba(15, 23, 42, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0, 221, 148, 0.35)",
                    boxShadow: "0 8px 32px rgba(0, 221, 148, 0.12)",
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                    color: "#ffffff",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 221, 148, 0.6)",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 24px rgba(0, 221, 148, 0.3)",
                      borderColor: "#00DD94",
                    },
                  },
                }}
              />

              {/* Popular Query Shortcut Chips */}
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                gap={0.8}
                sx={{ mt: 1.5 }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 700, mr: 0.5 }}
                >
                  Popular:
                </Typography>
                {POPULAR_QUERIES.map((q) => (
                  <Chip
                    key={q.label}
                    label={q.label}
                    size="small"
                    clickable
                    onClick={() => navigate(`/indices?q=${encodeURIComponent(q.query)}`)}
                    sx={{
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      borderRadius: 1.5,
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: "text.secondary",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 221, 148, 0.12)",
                        color: "#00DD94",
                        borderColor: "rgba(0, 221, 148, 0.3)",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Dual Main CTA Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
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
                    boxShadow: "0 6px 28px rgba(0, 221, 148, 0.5)",
                  },
                }}
              >
                Browse All 179+ Indices
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

      {/* 2. Live Market Ticker Streaming Strip */}
      {tickerItems.length > 0 && (
        <Box
          sx={{
            py: 1.5,
            px: 2,
            backgroundColor: "#081210",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Container maxWidth={false}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: "max-content" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#00DD94",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mr: 1,
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
                Live Benchmarks:
              </Typography>

              {tickerItems.map((s) => {
                const isPositive = s.change >= 0;
                return (
                  <Paper
                    key={s.id}
                    component={RouterLink}
                    to="/tracker"
                    variant="outlined"
                    sx={{
                      textDecoration: "none",
                      px: 1.5,
                      py: 0.6,
                      borderRadius: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      transition: "all 0.15s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0, 221, 148, 0.08)",
                        borderColor: "rgba(0, 221, 148, 0.4)",
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, color: "text.primary" }}>
                      {s.shortName || s.name}
                    </Typography>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 800, color: "#ffffff" }}>
                      {s.format === "percent"
                        ? `${s.latestValue.toFixed(2)}%`
                        : s.latestValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: isPositive ? "#10b981" : "#ef4444",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isPositive ? "+" : ""}
                      {s.changePct.toFixed(2)}%
                    </Typography>
                  </Paper>
                );
              })}
            </Stack>
          </Container>
        </Box>
      )}

      {/* 3. The Three Core Pillars of Market Indices */}
      <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, backgroundColor: "#050D0A" }}>
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" alignItems="center" sx={{ mb: 6 }}>
            <Typography
              variant="overline"
              sx={{ color: "#00DD94", fontWeight: 800, letterSpacing: "0.08em", fontSize: "0.8rem" }}
            >
              Why Market Indices
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
                letterSpacing: "-0.025em",
                color: "#ffffff",
              }}
            >
              Open Financial Infrastructure for Modern Investors
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 680, fontSize: "1.05rem" }}>
              Most financial portals hide index methodology inside paid terminals. We provide open, structured access to the formulas driving passive investing.
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {/* Pillar 1 */}
            <Card
              sx={{
                borderRadius: 3.5,
                backgroundColor: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(0, 221, 148, 0.5)",
                  boxShadow: "0 12px 32px rgba(0, 221, 148, 0.12)",
                },
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    backgroundColor: "rgba(0, 221, 148, 0.14)",
                    color: "#00DD94",
                    mb: 2.5,
                    border: "1px solid rgba(0, 221, 148, 0.3)",
                  }}
                >
                  🔬
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: "#ffffff" }}>
                  Constituent &amp; Factor Transparency
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.6, mb: 2 }}>
                  Inspect how each benchmark is selected, weighted, and reconstituted. Screen by Momentum, Quality, Value, High Dividend, Equal Weight, or Sector tilts.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/indices?category=themes"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: "#00DD94", fontWeight: 700, p: 0, textTransform: "none" }}
                >
                  Explore Factor Tilts
                </Button>
              </CardContent>
            </Card>

            {/* Pillar 2 */}
            <Card
              sx={{
                borderRadius: 3.5,
                backgroundColor: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(56, 189, 248, 0.5)",
                  boxShadow: "0 12px 32px rgba(56, 189, 248, 0.12)",
                },
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    backgroundColor: "rgba(56, 189, 248, 0.14)",
                    color: "#38bdf8",
                    mb: 2.5,
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                  }}
                >
                  ⚡
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: "#ffffff" }}>
                  Institutional ETF Replication Mapping
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.6, mb: 2 }}>
                  Never guess which fund tracks which index. Instantly view passive US ETFs, European UCITS listings (15% tax treaties), active prospectus benchmarks, and AUM totals.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/indices"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: "#38bdf8", fontWeight: 700, p: 0, textTransform: "none" }}
                >
                  View 330+ Tracked ETFs
                </Button>
              </CardContent>
            </Card>

            {/* Pillar 3 */}
            <Card
              sx={{
                borderRadius: 3.5,
                backgroundColor: "rgba(15, 23, 42, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "all 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "rgba(139, 92, 246, 0.5)",
                  boxShadow: "0 12px 32px rgba(139, 92, 246, 0.12)",
                },
              }}
            >
              <CardContent sx={{ p: 3.5 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.6rem",
                    backgroundColor: "rgba(139, 92, 246, 0.14)",
                    color: "#8b5cf6",
                    mb: 2.5,
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  📈
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: "#ffffff" }}>
                  Live Sovereign Yields &amp; Breadth
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.6, mb: 2 }}>
                  Stream real-time U.S. Treasury yield curves (3M to 30Y), 10Y-2Y recession indicators, Cap-Weight vs Equal-Weight breadth spreads, and 11 S&amp;P 500 industry sectors.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/tracker"
                  size="small"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: "#8b5cf6", fontWeight: 700, p: 0, textTransform: "none" }}
                >
                  Launch Live Tracker
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* 4. Featured Benchmarks Showcase */}
      <Box sx={{ py: { xs: 6, sm: 8 }, backgroundColor: "#06100c", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "flex-end" }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: "#00DD94", fontWeight: 800, letterSpacing: "0.08em" }}>
                Featured Market Barometers
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 900, color: "#ffffff", letterSpacing: "-0.02em" }}>
                The World’s Most Traded Benchmarks
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to="/indices"
              endIcon={<ArrowForwardIcon />}
              sx={{ color: "#00DD94", fontWeight: 700, textTransform: "none" }}
            >
              See All 179 Indices
            </Button>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
              gap: 2.5,
            }}
          >
            {FEATURED_BENCHMARKS.map((item) => {
              const liveMetric = fredData?.series?.[item.seriesId];
              const isPositive = liveMetric ? liveMetric.change >= 0 : true;

              return (
                <Paper
                  key={item.symbol}
                  component={RouterLink}
                  to={item.route}
                  variant="outlined"
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textDecoration: "none",
                    backgroundColor: "rgba(15, 23, 42, 0.5)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      borderColor: item.accent,
                      boxShadow: `0 8px 24px ${item.accent}22`,
                    },
                  }}
                >
                  <Box>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                      <Chip
                        label={`${item.flag} ${item.symbol}`}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.75rem",
                          backgroundColor: `${item.accent}22`,
                          color: item.accent,
                          border: `1px solid ${item.accent}44`,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                        {item.provider}
                      </Typography>
                    </Stack>

                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#ffffff", mb: 0.5, lineHeight: 1.25 }}>
                      {item.name}
                    </Typography>

                    <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.5, mb: 2 }}>
                      {item.description}
                    </Typography>
                  </Box>

                  <Box sx={{ pt: 1.5, borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                          ETFs: {item.etfs.join(", ")}
                        </Typography>
                      </Box>
                      {liveMetric && (
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 800,
                            color: isPositive ? "#10b981" : "#ef4444",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.25,
                          }}
                        >
                          {isPositive ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
                          {isPositive ? "+" : ""}
                          {liveMetric.changePct.toFixed(2)}%
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* 5. Institutional Providers Showcase */}
      <Box sx={{ py: { xs: 6, sm: 8 }, backgroundColor: "#050D0A", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <Container maxWidth="lg">
          <Stack spacing={2} textAlign="center" sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: "#00DD94", fontWeight: 800, letterSpacing: "0.08em" }}>
              Global Standards
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: "#ffffff" }}>
              17 Premier Index Administrators Covered
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 640, mx: "auto" }}>
              Filter benchmarks by official sponsor and explore methodologies from the world’s leading index calculation agents.
            </Typography>
          </Stack>

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

      {/* 6. Institutional Scale & Trust Metrics */}
      <Box sx={{ py: 6, backgroundColor: "#081511", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: 3,
              textAlign: "center",
            }}
          >
            {PLATFORM_STATS.map((stat) => (
              <Box key={stat.label}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "2rem", sm: "2.8rem" },
                    letterSpacing: "-0.03em",
                    color: "#00DD94",
                    lineHeight: 1,
                    mb: 0.75,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ fontWeight: 800, color: "#ffffff", fontSize: "0.95rem", mb: 0.2 }}>
                  {stat.label}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {stat.desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 7. Bottom Call to Action Card */}
      <Box sx={{ py: { xs: 6, sm: 8 }, backgroundColor: "#050D0A" }}>
        <Container maxWidth="md">
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 4,
              textAlign: "center",
              background:
                "radial-gradient(ellipse 90% 80% at 50% 0%, rgba(0, 221, 148, 0.2) 0%, rgba(15, 23, 42, 0.6) 80%)",
              borderColor: "rgba(0, 221, 148, 0.4)",
              boxShadow: "0 12px 40px rgba(0, 221, 148, 0.12)",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 900, color: "#ffffff", mb: 1.5, fontSize: { xs: "1.8rem", sm: "2.4rem" } }}>
              Ready to Explore Global Benchmarks?
            </Typography>
            <Typography sx={{ color: "text.secondary", maxWidth: 540, mx: "auto", mb: 3.5, fontSize: "1.05rem" }}>
              Dive into all 179+ equity, smart beta, and sovereign indices with full methodology criteria, fee metrics, and live ETF trackers.
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
                  "&:hover": { backgroundColor: "#00f0a0" },
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

          {/* Version Badge & Status at Bottom */}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Chip
              icon={<AppLogo size={16} showGlow={false} />}
              label={`v${APP_VERSION} • The Open Directory for Global Benchmarks`}
              size="small"
              sx={{
                px: 1.5,
                py: 0.35,
                fontWeight: 700,
                fontSize: "0.78rem",
                letterSpacing: "0.02em",
                borderRadius: 4,
                backgroundColor: "rgba(0, 221, 148, 0.08)",
                color: "#00DD94",
                border: "1px solid rgba(0, 221, 148, 0.25)",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <SiteFooter />
    </Box>
  );
}
