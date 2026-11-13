import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import KeyIcon from "@mui/icons-material/Key";
import PublicIcon from "@mui/icons-material/Public";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getInitialFredDataset,
  getStoredFredApiKey,
  useFredData,
} from "../api/fredApi";
import SiteFooter from "../components/layout/SiteFooter";
import { FredApiKeyDialog } from "../components/tracker/FredApiKeyDialog";
import {
  formatSeriesValue,
  FredSeriesChart,
} from "../components/tracker/FredSeriesChart";
import { InternationalBenchmarksCard } from "../components/tracker/InternationalBenchmarksCard";
import { Sp500BreadthInsightCard } from "../components/tracker/Sp500BreadthInsightCard";
import { Sp500SectorTrackerCard } from "../components/tracker/Sp500SectorTrackerCard";
import { TreasuryYieldCurveCard } from "../components/tracker/TreasuryYieldCurveCard";

export default function BenchmarkTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: fredData, refetch, isFetching } = useFredData();

  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  const dataset = fredData || getInitialFredDataset();

  const seriesParam = searchParams.get("series");
  const tabParam = searchParams.get("tab");

  // Automatically determine if the selected series is international or bond
  const isSelectedInternational = useMemo(() => {
    return (
      seriesParam != null &&
      dataset.internationalSeries.some((s) => s.id === seriesParam)
    );
  }, [seriesParam, dataset.internationalSeries]);

  const isSelectedBond = useMemo(() => {
    return (
      seriesParam != null &&
      dataset.bondSeries.some((s) => s.id === seriesParam)
    );
  }, [seriesParam, dataset.bondSeries]);

  const activeTab: "us" | "international" | "bonds" =
    tabParam === "international"
      ? "international"
      : tabParam === "bonds"
        ? "bonds"
        : isSelectedInternational
          ? "international"
          : isSelectedBond
            ? "bonds"
            : "us";

  const selectedSeriesId =
    seriesParam ||
    (activeTab === "international"
      ? "FTSE_100"
      : activeTab === "bonds"
        ? "DGS10"
        : "SP500");

  const handleTabChange = (newTab: "us" | "international" | "bonds") => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (newTab === "international") {
          next.set("tab", "international");
          const isIntl = dataset.internationalSeries.some(
            (s) => s.id === selectedSeriesId,
          );
          if (!isIntl) {
            next.set("series", "FTSE_100");
          }
        } else if (newTab === "bonds") {
          next.set("tab", "bonds");
          const isBond = dataset.bondSeries.some(
            (s) => s.id === selectedSeriesId,
          );
          if (!isBond) {
            next.set("series", "DGS10");
          }
        } else {
          next.delete("tab");
          const isUS = dataset.equitySeries.some(
            (s) => s.id === selectedSeriesId,
          );
          if (!isUS) {
            next.delete("series");
          }
        }
        return next;
      },
      { replace: true },
    );
  };

  const handleSelectSeries = (seriesId: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const isIntl = dataset.internationalSeries.some((s) => s.id === seriesId);
        const isBond = dataset.bondSeries.some((s) => s.id === seriesId);

        if (isIntl) {
          next.set("tab", "international");
          next.set("series", seriesId);
        } else if (isBond) {
          next.set("tab", "bonds");
          next.set("series", seriesId);
        } else {
          if (activeTab !== "us") {
            next.delete("tab");
          }
          if (!seriesId || seriesId === "SP500") {
            next.delete("series");
          } else {
            next.set("series", seriesId);
          }
        }
        if (next.toString() === prev.toString()) {
          return prev;
        }
        return next;
      },
      { replace: true },
    );
  };

  useEffect(() => {
    setHasApiKey(Boolean(getStoredFredApiKey()));
  }, [apiKeyDialogOpen]);

  // Set document title
  useEffect(() => {
    document.title =
      activeTab === "international"
        ? "International Benchmarks | FTSE 100, Nikkei 225, DAX, Euro Stoxx 50 | Market Indices Explorer"
        : activeTab === "bonds"
          ? "U.S. Treasury Yields & Bond Benchmarks | 10-Year, 2-Year, Yield Curve, TIPS, AGG | Market Indices Explorer"
          : "Benchmark Tracker | S&P 500, NASDAQ 100, Dow Jones, Russell 1000, VIX | Market Indices Explorer";
  }, [activeTab]);

  // Active series for the featured top chart
  const activeSeries = useMemo(() => {
    return (
      dataset.series[selectedSeriesId] ||
      (activeTab === "international"
        ? dataset.series.FTSE_100 || dataset.internationalSeries[0]
        : activeTab === "bonds"
          ? dataset.series.DGS10 || dataset.bondSeries[0]
          : dataset.series.SP500 || dataset.seriesList[0])
    );
  }, [dataset, selectedSeriesId, activeTab]);

  // Key KPI summary metrics across major US equity benchmarks
  const usKpiSummary = useMemo(() => {
    const sp = dataset.series.SP500;
    const spew = dataset.series.SP500EW;
    const ndx = dataset.series.NASDAQ100;
    const nasdaqCom = dataset.series.NASDAQCOM;
    const djia = dataset.series.DJIA;
    const rui = dataset.series.RUI;
    const vix = dataset.series.VIXCLS;

    return { sp, spew, ndx, nasdaqCom, djia, rui, vix };
  }, [dataset]);

  // International Quick KPI benchmarks
  const intlKpiSummary = useMemo(() => {
    const ids = [
      "FTSE_100",
      "NIKKEI_225",
      "DAX_40",
      "EURO_STOXX_50",
      "CAC_40",
      "HANG_SENG",
      "TSX_COMPOSITE",
      "NIFTY_50",
      "MSCI_EAFE",
      "MSCI_EM",
    ];
    return ids.map((id) => dataset.series[id]).filter(Boolean);
  }, [dataset]);

  // Treasury Yield & Bond Quick KPI benchmarks
  const bondKpiSummary = useMemo(() => {
    const ids = [
      "DGS3MO",
      "DGS2",
      "DGS5",
      "DGS10",
      "DGS30",
      "T10Y2Y",
      "T10Y3M",
      "DFII10",
      "FEDFUNDS",
      "BAMLH0A0HYM2",
    ];
    return ids.map((id) => dataset.series[id]).filter(Boolean);
  }, [dataset]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          flex: 1,
          py: { xs: 2, sm: 3 },
          px: { xs: 1.5, sm: 3 },
        }}
      >
        {/* Dashboard Actions Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            mb: { xs: 1.5, sm: 2 },
          }}
        >
          {/* Main Benchmark Navigation Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, val) => handleTabChange(val)}
            sx={{
              minHeight: 40,
              backgroundColor: "rgba(15, 23, 42, 0.45)",
              p: 0.5,
              borderRadius: 3,
              border:
                "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                minHeight: 32,
                py: 0.6,
                px: { xs: 1.25, sm: 2 },
                fontSize: { xs: "0.76rem", sm: "0.82rem" },
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2.5,
                color: "text.secondary",
                transition: "all 0.15s ease-in-out",
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor: "rgba(99, 102, 241, 0.25)",
                  border: "1px solid rgba(99, 102, 241, 0.5)",
                },
              },
            }}
          >
            <Tab
              icon={<ShowChartIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label="U.S. Benchmarks"
              value="us"
            />
            <Tab
              icon={<PublicIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label={`International Benchmarks (${dataset.internationalSeries.length})`}
              value="international"
            />
            <Tab
              icon={<AccountBalanceIcon sx={{ fontSize: 16 }} />}
              iconPosition="start"
              label={`U.S. Treasury Yields & Bonds (${dataset.bondSeries.length})`}
              value="bonds"
            />
          </Tabs>

          {/* Action buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
            <Tooltip title="Configure St. Louis Fed FRED API Key (Optional)">
              <Button
                variant="outlined"
                size="small"
                onClick={() => setApiKeyDialogOpen(true)}
                startIcon={<KeyIcon sx={{ fontSize: 15 }} />}
                sx={{
                  borderRadius: 2,
                  px: 1.25,
                  py: 0.4,
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  borderColor: hasApiKey
                    ? "#10b981"
                    : "var(--indices-border, rgba(255, 255, 255, 0.15))",
                  color: hasApiKey ? "#10b981" : "text.secondary",
                  backgroundColor: hasApiKey
                    ? "rgba(16, 185, 129, 0.08)"
                    : undefined,
                }}
              >
                {hasApiKey ? "FRED Key Active" : "API Key"}
              </Button>
            </Tooltip>

            <Tooltip title="Refresh Observations">
              <IconButton
                size="small"
                onClick={() => refetch()}
                disabled={isFetching}
                sx={{
                  borderRadius: 2,
                  border:
                    "1px solid var(--indices-border, rgba(255, 255, 255, 0.15))",
                  backgroundColor:
                    "var(--indices-card-bg, rgba(30, 41, 59, 0.4))",
                  p: 0.75,
                }}
              >
                {isFetching ? (
                  <CircularProgress size={16} />
                ) : (
                  <RefreshIcon sx={{ fontSize: 16 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Hero Banner Header */}
        <Box
          component="header"
          sx={{
            mb: 3,
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3.5,
            background:
              activeTab === "bonds"
                ? "linear-gradient(135deg, rgba(99, 102, 241, 0.14) 0%, rgba(16, 185, 129, 0.08) 50%, rgba(245, 158, 11, 0.04) 100%)"
                : activeTab === "international"
                  ? "linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(16, 185, 129, 0.04) 100%)"
                  : "linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(124, 58, 237, 0.06) 50%, rgba(236, 72, 153, 0.04) 100%)",
            border:
              activeTab === "bonds"
                ? "1px solid rgba(99, 102, 241, 0.28)"
                : activeTab === "international"
                  ? "1px solid rgba(14, 165, 233, 0.25)"
                  : "1px solid rgba(99, 102, 241, 0.22)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Stack spacing={1.5} sx={{ maxWidth: 920 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                flexWrap: "wrap",
              }}
            >
              <Chip
                label={
                  activeTab === "bonds"
                    ? "Federal Reserve (FRED®) & U.S. Treasury"
                    : activeTab === "international"
                      ? "Global Equity Closes"
                      : "FRED® Market Data (T-1)"
                }
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  height: 22,
                  backgroundColor:
                    activeTab === "bonds"
                      ? "rgba(99, 102, 241, 0.15)"
                      : activeTab === "international"
                        ? "rgba(14, 165, 233, 0.15)"
                        : "rgba(16, 185, 129, 0.15)",
                  color:
                    activeTab === "bonds"
                      ? "#818cf8"
                      : activeTab === "international"
                        ? "#0ea5e9"
                        : "#10b981",
                  border:
                    activeTab === "bonds"
                      ? "1px solid rgba(99, 102, 241, 0.35)"
                      : activeTab === "international"
                        ? "1px solid rgba(14, 165, 233, 0.35)"
                        : "1px solid rgba(16, 185, 129, 0.35)",
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontSize: "0.78rem" }}
              >
                {activeTab === "international"
                  ? "Global Financial Exchanges & Index Providers"
                  : "Federal Reserve Bank of St. Louis"}
                {" • Updated: "}
                {new Date(dataset.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.35rem", sm: "1.75rem" },
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              {activeTab === "bonds"
                ? "U.S. Treasury Yields & Bond Benchmarks"
                : activeTab === "international"
                  ? "International Benchmark Tracker"
                  : "Benchmark Tracker"}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.82rem", sm: "0.9rem" },
                lineHeight: 1.55,
              }}
            >
              {activeTab === "bonds" ? (
                <>
                  Daily sovereign yield curve (<strong>3M</strong>, <strong>2Y</strong>,{" "}
                  <strong>5Y</strong>, <strong>10Y</strong>, <strong>30Y</strong>),
                  recession-warning yield spreads (<strong>10Y - 2Y</strong>,{" "}
                  <strong>10Y - 3M</strong>), 10-year real yields (<strong>TIPS</strong>),
                  and institutional fixed-income proxies (<strong>AGG</strong>,{" "}
                  <strong>TLT</strong>, <strong>LQD</strong>, <strong>HYG</strong>,{" "}
                  <strong>TIP</strong>). Click any rate to inspect its 5-year interactive graph.
                </>
              ) : activeTab === "international" ? (
                <>
                  Daily performance and 5-year interactive charts across premier
                  global equity benchmarks: <strong>FTSE 100 🇬🇧</strong>,{" "}
                  <strong>Nikkei 225 🇯🇵</strong>, <strong>DAX 40 🇩🇪</strong>,{" "}
                  <strong>Euro Stoxx 50 🇪🇺</strong>, <strong>CAC 40 🇫🇷</strong>,{" "}
                  <strong>Hang Seng 🇭🇰</strong>, <strong>TSX Composite 🇨🇦</strong>,{" "}
                  <strong>Nifty 50 🇮🇳</strong>, and global factor benchmarks.
                </>
              ) : (
                <>
                  Daily barometer tracking <strong>S&amp;P 500</strong>,{" "}
                  <strong>S&amp;P 500 Equal Weight</strong>,{" "}
                  <strong>NASDAQ 100</strong>, <strong>Nasdaq Composite</strong>,{" "}
                  <strong>Dow Jones</strong>, <strong>Russell 1000</strong>, and{" "}
                  <strong>CBOE VIX</strong>. Click any benchmark to inspect its
                  detailed performance graph.
                </>
              )}
            </Typography>
          </Stack>

          {/* Quick Benchmark Bar */}
          {activeTab === "us" ? (
            /* U.S. Quick Benchmark Bar */
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(4, 1fr)",
                  md: "repeat(7, 1fr)",
                },
                gap: 1,
                mt: 2.5,
              }}
            >
              {usKpiSummary.sp && (
                <Paper
                  variant="outlined"
                  onClick={() => handleSelectSeries("SP500")}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedSeriesId === "SP500"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      selectedSeriesId === "SP500"
                        ? "primary.main"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    S&amp;P 500
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                  >
                    {formatSeriesValue(usKpiSummary.sp.latestValue, "number", 2)}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        usKpiSummary.sp.change >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {usKpiSummary.sp.change >= 0 ? "+" : ""}
                    {usKpiSummary.sp.changePct.toFixed(2)}%
                  </Typography>
                </Paper>
              )}

              {usKpiSummary.spew && (
                <Paper
                  variant="outlined"
                  onClick={() => handleSelectSeries("SP500EW")}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedSeriesId === "SP500EW"
                        ? "rgba(16, 185, 129, 0.15)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      selectedSeriesId === "SP500EW"
                        ? "#10b981"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    "&:hover": { borderColor: "#10b981" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    S&amp;P 500 Equal Wt
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                  >
                    {formatSeriesValue(
                      usKpiSummary.spew.latestValue,
                      "number",
                      2,
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        usKpiSummary.spew.change >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {usKpiSummary.spew.change >= 0 ? "+" : ""}
                    {usKpiSummary.spew.changePct.toFixed(2)}%
                  </Typography>
                </Paper>
              )}

              {usKpiSummary.ndx && (
                <Paper
                  variant="outlined"
                  onClick={() => handleSelectSeries("NASDAQ100")}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedSeriesId === "NASDAQ100"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      selectedSeriesId === "NASDAQ100"
                        ? "primary.main"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    NASDAQ 100
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                  >
                    {formatSeriesValue(
                      usKpiSummary.ndx.latestValue,
                      "number",
                      2,
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        usKpiSummary.ndx.change >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {usKpiSummary.ndx.change >= 0 ? "+" : ""}
                    {usKpiSummary.ndx.changePct.toFixed(2)}%
                  </Typography>
                </Paper>
              )}

              {usKpiSummary.nasdaqCom && (
                <Paper
                  variant="outlined"
                  onClick={() => handleSelectSeries("NASDAQCOM")}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedSeriesId === "NASDAQCOM"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      selectedSeriesId === "NASDAQCOM"
                        ? "primary.main"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    Nasdaq Composite
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                  >
                    {formatSeriesValue(
                      usKpiSummary.nasdaqCom.latestValue,
                      "number",
                      2,
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        usKpiSummary.nasdaqCom.change >= 0
                          ? "#10b981"
                          : "#ef4444",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {usKpiSummary.nasdaqCom.change >= 0 ? "+" : ""}
                    {usKpiSummary.nasdaqCom.changePct.toFixed(2)}%
                  </Typography>
                </Paper>
              )}

              {usKpiSummary.djia && (
                <Paper
                  variant="outlined"
                  onClick={() => handleSelectSeries("DJIA")}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedSeriesId === "DJIA"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      selectedSeriesId === "DJIA"
                        ? "primary.main"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    Dow Jones
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                  >
                    {formatSeriesValue(
                      usKpiSummary.djia.latestValue,
                      "number",
                      2,
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        usKpiSummary.djia.change >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {usKpiSummary.djia.change >= 0 ? "+" : ""}
                    {usKpiSummary.djia.changePct.toFixed(2)}%
                  </Typography>
                </Paper>
              )}

              {usKpiSummary.rui && (
                <Paper
                  variant="outlined"
                  onClick={() => handleSelectSeries("RUI")}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedSeriesId === "RUI"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      selectedSeriesId === "RUI"
                        ? "primary.main"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    Russell 1000
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                  >
                    {formatSeriesValue(
                      usKpiSummary.rui.latestValue,
                      "number",
                      2,
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        usKpiSummary.rui.change >= 0 ? "#10b981" : "#ef4444",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {usKpiSummary.rui.change >= 0 ? "+" : ""}
                    {usKpiSummary.rui.changePct.toFixed(2)}%
                  </Typography>
                </Paper>
              )}

              {usKpiSummary.vix && (
                <Paper
                  variant="outlined"
                  onClick={() => handleSelectSeries("VIXCLS")}
                  sx={{
                    gridColumn: { xs: "span 2", sm: "auto" },
                    p: 1,
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor:
                      selectedSeriesId === "VIXCLS"
                        ? "rgba(99, 102, 241, 0.15)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      selectedSeriesId === "VIXCLS"
                        ? "primary.main"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    "&:hover": { borderColor: "primary.light" },
                  }}
                >
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    VIX Volatility
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                  >
                    {usKpiSummary.vix.latestValue.toFixed(2)}
                  </Typography>
                  <Typography
                    sx={{
                      color:
                        usKpiSummary.vix.latestValue > 20
                          ? "#ef4444"
                          : "#10b981",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                    }}
                  >
                    {usKpiSummary.vix.change >= 0 ? "+" : ""}
                    {usKpiSummary.vix.change.toFixed(2)} pts
                  </Typography>
                </Paper>
              )}
            </Box>
          ) : activeTab === "international" ? (
            /* International Quick Benchmark Bar */
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(5, 1fr)",
                },
                gap: 1,
                mt: 2.5,
              }}
            >
              {intlKpiSummary.map((item) => {
                const isSelected = selectedSeriesId === item.id;
                const isPositive = item.change >= 0;

                return (
                  <Paper
                    key={item.id}
                    variant="outlined"
                    onClick={() => handleSelectSeries(item.id)}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      cursor: "pointer",
                      backgroundColor: isSelected
                        ? "rgba(14, 165, 233, 0.16)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                      borderColor: isSelected
                        ? "#0ea5e9"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                      transition: "all 0.15s ease",
                      "&:hover": { borderColor: "#0ea5e9" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 0.2,
                      }}
                    >
                      <Typography sx={{ fontSize: "0.95rem", lineHeight: 1 }}>
                        {item.icon}
                      </Typography>
                      <Typography
                        noWrap
                        sx={{
                          color: "text.secondary",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                        }}
                      >
                        {item.shortName}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                    >
                      {formatSeriesValue(item.latestValue, item.format, 2)}
                    </Typography>
                    <Typography
                      sx={{
                        color: isPositive ? "#10b981" : "#ef4444",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                      }}
                    >
                      {isPositive ? "+" : ""}
                      {item.changePct.toFixed(2)}%
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          ) : (
            /* U.S. Treasury Yields & Bonds Quick Benchmark Bar */
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(5, 1fr)",
                },
                gap: 1,
                mt: 2.5,
              }}
            >
              {bondKpiSummary.map((item) => {
                const isSelected = selectedSeriesId === item.id;
                const isPositive = item.change >= 0;

                return (
                  <Paper
                    key={item.id}
                    variant="outlined"
                    onClick={() => handleSelectSeries(item.id)}
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      cursor: "pointer",
                      backgroundColor: isSelected
                        ? "rgba(99, 102, 241, 0.18)"
                        : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                      borderColor: isSelected
                        ? "#818cf8"
                        : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                      transition: "all 0.15s ease",
                      "&:hover": { borderColor: "#818cf8" },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 0.2,
                      }}
                    >
                      <Typography sx={{ fontSize: "0.95rem", lineHeight: 1 }}>
                        {item.icon}
                      </Typography>
                      <Typography
                        noWrap
                        sx={{
                          color: "text.secondary",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                        }}
                      >
                        {item.shortName}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ fontWeight: 800, fontSize: "0.92rem", my: 0.1 }}
                    >
                      {formatSeriesValue(item.latestValue, item.format, 2)}
                    </Typography>
                    <Typography
                      sx={{
                        color: isPositive ? "#10b981" : "#ef4444",
                        fontWeight: 700,
                        fontSize: "0.72rem",
                      }}
                    >
                      {item.format === "percent"
                        ? `${isPositive ? "+" : ""}${(item.change * 100).toFixed(0)} bps (${isPositive ? "+" : ""}${item.change.toFixed(2)}%)`
                        : `${isPositive ? "+" : ""}${item.changePct.toFixed(2)}%`}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          )}
        </Box>

        {/* Featured Interactive Benchmark Chart */}
        <Box sx={{ mb: 3.5 }}>
          <FredSeriesChart series={activeSeries} initialRange="5D" />
        </Box>

        {/* Tab-Specific Content */}
        {activeTab === "us" ? (
          <>
            {/* S&P 500 Market Breadth & Concentration Insight Card */}
            {dataset.series.SP500 && dataset.series.SP500EW && (
              <Box sx={{ mb: 4 }}>
                <Sp500BreadthInsightCard
                  sp500={dataset.series.SP500}
                  sp500ew={dataset.series.SP500EW}
                  onSelectSeries={handleSelectSeries}
                />
              </Box>
            )}

            {/* S&P 500 Sector Composition & Rotation Tracker (Active when S&P 500 is selected) */}
            {selectedSeriesId === "SP500" && (
              <Box sx={{ mb: 4 }}>
                <Sp500SectorTrackerCard
                  sectors={dataset.sectors}
                  updatedAt={dataset.updatedAt}
                />
              </Box>
            )}
          </>
        ) : activeTab === "international" ? (
          /* International Benchmarks & Regional Overview Section */
          <Box sx={{ mb: 4 }}>
            <InternationalBenchmarksCard
              seriesList={dataset.internationalSeries}
              selectedSeriesId={selectedSeriesId}
              onSelectSeries={handleSelectSeries}
              updatedAt={dataset.updatedAt}
            />
          </Box>
        ) : (
          /* U.S. Treasury Yields & Bond Benchmarks Section */
          <Box sx={{ mb: 4 }}>
            <TreasuryYieldCurveCard
              seriesList={dataset.bondSeries}
              selectedSeriesId={selectedSeriesId}
              onSelectSeries={handleSelectSeries}
              updatedAt={dataset.updatedAt}
            />
          </Box>
        )}
      </Container>

      {/* API Key Modal Dialog */}
      <FredApiKeyDialog
        open={apiKeyDialogOpen}
        onClose={() => setApiKeyDialogOpen(false)}
        onSaved={() => refetch()}
      />

      <SiteFooter />
    </Box>
  );
}
