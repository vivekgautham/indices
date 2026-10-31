import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyIcon from "@mui/icons-material/Key";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getInitialFredDataset,
  getStoredFredApiKey,
  useFredData,
} from "../api/fredApi";
import AppVersionBadge from "../components/layout/AppVersionBadge";
import SiteFooter from "../components/layout/SiteFooter";
import ThemeSelector from "../components/layout/ThemeSelector";
import ShareButton from "../components/ShareButton";
import { FredApiKeyDialog } from "../components/tracker/FredApiKeyDialog";
import {
  formatSeriesValue,
  FredSeriesChart,
} from "../components/tracker/FredSeriesChart";

export default function BenchmarkTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: fredData, refetch, isFetching } = useFredData();

  const urlSeries = searchParams.get("series") || "SP500";
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>(urlSeries);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(Boolean(getStoredFredApiKey()));
  }, [apiKeyDialogOpen]);

  // Set document title
  useEffect(() => {
    document.title =
      "Benchmark Tracker | S&P 500, NASDAQ 100, Dow Jones, Russell 1000, VIX | Market Indices Explorer";
  }, []);

  // Synchronize state with URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedSeriesId && selectedSeriesId !== "SP500") {
      params.set("series", selectedSeriesId);
    } else {
      params.delete("series");
    }

    const currentStr = searchParams.toString();
    const newStr = params.toString();
    if (currentStr !== newStr) {
      setSearchParams(params, { replace: true });
    }
  }, [selectedSeriesId, searchParams, setSearchParams]);

  const dataset = fredData || getInitialFredDataset();

  // Active series for the featured top chart
  const activeSeries = useMemo(() => {
    return dataset.series[selectedSeriesId] || dataset.series.SP500 || dataset.seriesList[0];
  }, [dataset, selectedSeriesId]);

  // Key KPI summary metrics across major equity benchmarks
  const kpiSummary = useMemo(() => {
    const sp = dataset.series.SP500;
    const ndx = dataset.series.NASDAQ100;
    const nasdaqCom = dataset.series.NASDAQCOM;
    const djia = dataset.series.DJIA;
    const rui = dataset.series.RUI;
    const vix = dataset.series.VIXCLS;

    return { sp, ndx, nasdaqCom, djia, rui, vix };
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
        {/* Top Header Navigation Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 2.5,
              fontWeight: 700,
              fontSize: "0.8rem",
              px: 1.75,
              py: 0.6,
              borderColor: "var(--indices-border, rgba(255, 255, 255, 0.15))",
              backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.4))",
              color: "text.primary",
              "&:hover": {
                backgroundColor: "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.8))",
                borderColor: "primary.light",
              },
            }}
          >
            All Market Indices Catalog
          </Button>

          {/* Right Header Controls */}
          <Stack direction="row" spacing={{ xs: 0.75, sm: 1.25 }} alignItems="center" flexWrap="wrap">
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
                  borderColor: hasApiKey ? "#10b981" : "var(--indices-border, rgba(255, 255, 255, 0.15))",
                  color: hasApiKey ? "#10b981" : "text.secondary",
                  backgroundColor: hasApiKey ? "rgba(16, 185, 129, 0.08)" : undefined,
                }}
              >
                {hasApiKey ? "FRED Key Active" : "API Key"}
              </Button>
            </Tooltip>

            <Tooltip title="Refresh FRED Observations">
              <IconButton
                size="small"
                onClick={() => refetch()}
                disabled={isFetching}
                sx={{
                  borderRadius: 2,
                  border: "1px solid var(--indices-border, rgba(255, 255, 255, 0.15))",
                  backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.4))",
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

            <ShareButton
              item={{
                title: "FRED Benchmark Tracker | U.S. Equity & Macroeconomic Indexes",
                text: "Explore live and historical charts for major US equity benchmarks, Treasury yield curves, inflation, and macroeconomic indicators from FRED.",
                path: "/tracker",
              }}
              variant="outlined"
              size="small"
              label="Share Tracker"
              tooltip="Share Benchmark Tracker"
              sx={{
                borderRadius: 2,
                px: 1.5,
                py: 0.4,
              }}
            />

            <ThemeSelector />
            <AppVersionBadge />
          </Stack>
        </Box>

        {/* Hero Banner Header */}
        <Box
          component="header"
          sx={{
            mb: 3,
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3.5,
            background:
              "linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(124, 58, 237, 0.06) 50%, rgba(236, 72, 153, 0.04) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.22)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Stack spacing={1.5} sx={{ maxWidth: 900 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
              <Chip
                label="FRED® Live Data"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  height: 22,
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  color: "#10b981",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                }}
              />
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.78rem" }}>
                Federal Reserve Bank of St. Louis • Updated: {new Date(dataset.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.75rem", sm: "2.4rem" },
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              Benchmark Tracker
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.92rem", sm: "1.05rem" },
                lineHeight: 1.6,
              }}
            >
              Real-time barometer tracking <strong>S&amp;P 500</strong>,{" "}
              <strong>NASDAQ 100</strong>, <strong>Nasdaq Composite</strong>,{" "}
              <strong>Dow Jones</strong>, <strong>Russell 1000</strong>, and{" "}
              <strong>CBOE VIX</strong>. Click any benchmark above to inspect its detailed
              performance graph.
            </Typography>
          </Stack>

          {/* Quick Benchmark Bar: Major U.S. Equity Benchmarks */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(6, 1fr)",
              },
              gap: 1.25,
              mt: 3,
            }}
          >
            {kpiSummary.sp && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("SP500")}
                sx={{
                  p: 1.25,
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
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  S&amp;P 500
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {formatSeriesValue(kpiSummary.sp.latestValue, "number", 2)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: kpiSummary.sp.change >= 0 ? "#10b981" : "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {kpiSummary.sp.change >= 0 ? "+" : ""}
                  {kpiSummary.sp.changePct.toFixed(2)}%
                </Typography>
              </Paper>
            )}

            {kpiSummary.ndx && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("NASDAQ100")}
                sx={{
                  p: 1.25,
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
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  NASDAQ 100
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {formatSeriesValue(kpiSummary.ndx.latestValue, "number", 2)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: kpiSummary.ndx.change >= 0 ? "#10b981" : "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {kpiSummary.ndx.change >= 0 ? "+" : ""}
                  {kpiSummary.ndx.changePct.toFixed(2)}%
                </Typography>
              </Paper>
            )}

            {kpiSummary.nasdaqCom && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("NASDAQCOM")}
                sx={{
                  p: 1.25,
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
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  Nasdaq Composite
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {formatSeriesValue(kpiSummary.nasdaqCom.latestValue, "number", 2)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: kpiSummary.nasdaqCom.change >= 0 ? "#10b981" : "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {kpiSummary.nasdaqCom.change >= 0 ? "+" : ""}
                  {kpiSummary.nasdaqCom.changePct.toFixed(2)}%
                </Typography>
              </Paper>
            )}

            {kpiSummary.djia && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("DJIA")}
                sx={{
                  p: 1.25,
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
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  Dow Jones
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {formatSeriesValue(kpiSummary.djia.latestValue, "number", 2)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: kpiSummary.djia.change >= 0 ? "#10b981" : "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {kpiSummary.djia.change >= 0 ? "+" : ""}
                  {kpiSummary.djia.changePct.toFixed(2)}%
                </Typography>
              </Paper>
            )}

            {kpiSummary.rui && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("RUI")}
                sx={{
                  p: 1.25,
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
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  Russell 1000
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {formatSeriesValue(kpiSummary.rui.latestValue, "number", 2)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: kpiSummary.rui.change >= 0 ? "#10b981" : "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {kpiSummary.rui.change >= 0 ? "+" : ""}
                  {kpiSummary.rui.changePct.toFixed(2)}%
                </Typography>
              </Paper>
            )}

            {kpiSummary.vix && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("VIXCLS")}
                sx={{
                  p: 1.25,
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
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  VIX Volatility
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {kpiSummary.vix.latestValue.toFixed(2)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: kpiSummary.vix.latestValue > 20 ? "#ef4444" : "#10b981",
                    fontWeight: 700,
                  }}
                >
                  {kpiSummary.vix.change >= 0 ? "+" : ""}
                  {kpiSummary.vix.change.toFixed(2)} pts
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Featured Interactive Benchmark Chart */}
        <Box sx={{ mb: 4 }}>
          <FredSeriesChart series={activeSeries} initialRange="5D" />
        </Box>
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
