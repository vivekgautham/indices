import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyIcon from "@mui/icons-material/Key";
import RefreshIcon from "@mui/icons-material/Refresh";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
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
import { FredSeriesCard } from "../components/tracker/FredSeriesCard";
import {
  formatSeriesValue,
  FredSeriesChart,
} from "../components/tracker/FredSeriesChart";
import { FredSparkline } from "../components/tracker/FredSparkline";
import { FredCategory } from "../data/fredSeriesData";

export default function BenchmarkTrackerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: fredData, refetch, isFetching } = useFredData();

  const urlSeries = searchParams.get("series") || "SP500";
  const urlCategory = (searchParams.get("cat") as FredCategory | "all") || "equity";

  const [selectedCategory, setSelectedCategory] = useState<FredCategory | "all">(
    urlCategory,
  );
  const [selectedSeriesId, setSelectedSeriesId] = useState<string>(urlSeries);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(Boolean(getStoredFredApiKey()));
  }, [apiKeyDialogOpen]);

  // Set document title
  useEffect(() => {
    document.title =
      "FRED Benchmark Tracker | U.S. Equity & Macroeconomic Indexes | Market Indices Explorer";
  }, []);

  // Synchronize state with URL search parameters
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedSeriesId && selectedSeriesId !== "SP500") {
      params.set("series", selectedSeriesId);
    } else {
      params.delete("series");
    }

    if (selectedCategory !== "equity") {
      params.set("cat", selectedCategory);
    } else {
      params.delete("cat");
    }

    const currentStr = searchParams.toString();
    const newStr = params.toString();
    if (currentStr !== newStr) {
      setSearchParams(params, { replace: true });
    }
  }, [selectedSeriesId, selectedCategory, searchParams, setSearchParams]);

  const dataset = fredData || getInitialFredDataset();

  // Filter series list based on selected category tab
  const displayedSeries = useMemo(() => {
    if (selectedCategory === "equity") {
      return dataset.equitySeries;
    }
    if (selectedCategory === "macro") {
      return dataset.macroSeries;
    }
    return dataset.seriesList;
  }, [dataset, selectedCategory]);

  // Active series for the featured top chart
  const activeSeries = useMemo(() => {
    return dataset.series[selectedSeriesId] || dataset.series.SP500 || dataset.seriesList[0];
  }, [dataset, selectedSeriesId]);

  // Key KPI summary metrics across macro & equities
  const kpiSummary = useMemo(() => {
    const sp = dataset.series.SP500;
    const dgs10 = dataset.series.DGS10;
    const t10y2y = dataset.series.T10Y2Y;
    const cpi = dataset.series.CPIAUCSL;
    const unrate = dataset.series.UNRATE;
    const vix = dataset.series.VIXCLS;

    return { sp, dgs10, t10y2y, cpi, unrate, vix };
  }, [dataset]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: FredCategory | "all") => {
    setSelectedCategory(newValue);
    if (newValue === "macro" && activeSeries.category === "equity") {
      setSelectedSeriesId("DGS10");
    } else if (newValue === "equity" && activeSeries.category === "macro") {
      setSelectedSeriesId("SP500");
    }
  };

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
              tooltip="Share Benchmark Tracker dashboard"
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
              Benchmark Tracker Dashboard
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.92rem", sm: "1.05rem" },
                lineHeight: 1.6,
              }}
            >
              Institutional barometer monitoring <strong>Major U.S. Equity Benchmarks</strong> and{" "}
              <strong>Economic, Global &amp; Macro Indexes</strong> powered by official St. Louis
              Fed (FRED) series. Real-time updates, historical yields, recessions, and inflation.
            </Typography>
          </Stack>

          {/* Quick Macro KPI Bar */}
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
                  {kpiSummary.vix.latestValue > 20 ? "High Volatility" : "Calm / Steady"}
                </Typography>
              </Paper>
            )}

            {kpiSummary.dgs10 && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("DGS10")}
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor:
                    selectedSeriesId === "DGS10"
                      ? "rgba(99, 102, 241, 0.15)"
                      : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                  borderColor:
                    selectedSeriesId === "DGS10"
                      ? "primary.main"
                      : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                  "&:hover": { borderColor: "primary.light" },
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  10Y Treasury
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {kpiSummary.dgs10.latestValue.toFixed(2)}%
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  Risk-Free Anchor
                </Typography>
              </Paper>
            )}

            {kpiSummary.t10y2y && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("T10Y2Y")}
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor:
                    selectedSeriesId === "T10Y2Y"
                      ? "rgba(99, 102, 241, 0.15)"
                      : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                  borderColor:
                    selectedSeriesId === "T10Y2Y"
                      ? "primary.main"
                      : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                  "&:hover": { borderColor: "primary.light" },
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  Yield Curve (10Y-2Y)
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {kpiSummary.t10y2y.latestValue >= 0 ? "+" : ""}
                  {kpiSummary.t10y2y.latestValue.toFixed(2)}%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: kpiSummary.t10y2y.latestValue < 0 ? "#ef4444" : "#10b981",
                    fontWeight: 700,
                  }}
                >
                  {kpiSummary.t10y2y.latestValue < 0 ? "Inverted Curve" : "Normal Curve"}
                </Typography>
              </Paper>
            )}

            {kpiSummary.cpi && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("CPIAUCSL")}
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor:
                    selectedSeriesId === "CPIAUCSL"
                      ? "rgba(99, 102, 241, 0.15)"
                      : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                  borderColor:
                    selectedSeriesId === "CPIAUCSL"
                      ? "primary.main"
                      : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                  "&:hover": { borderColor: "primary.light" },
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  CPI Index Level
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {kpiSummary.cpi.latestValue.toFixed(1)}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  Urban Consumers
                </Typography>
              </Paper>
            )}

            {kpiSummary.unrate && (
              <Paper
                variant="outlined"
                onClick={() => setSelectedSeriesId("UNRATE")}
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  cursor: "pointer",
                  backgroundColor:
                    selectedSeriesId === "UNRATE"
                      ? "rgba(99, 102, 241, 0.15)"
                      : "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                  borderColor:
                    selectedSeriesId === "UNRATE"
                      ? "primary.main"
                      : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                  "&:hover": { borderColor: "primary.light" },
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
                  Unemployment
                </Typography>
                <Typography sx={{ fontWeight: 800, fontSize: "1.05rem" }}>
                  {kpiSummary.unrate.latestValue.toFixed(1)}%
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                  U3 Civilian Rate
                </Typography>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Featured Interactive Benchmark Chart */}
        <Box sx={{ mb: 4 }}>
          <FredSeriesChart series={activeSeries} />
        </Box>

        {/* Category Filter Tabs & View Mode Switcher */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
            borderBottom: "1px solid var(--indices-border, rgba(255, 255, 255, 0.1))",
            pb: 1,
          }}
        >
          <Tabs
            value={selectedCategory}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 700,
                fontSize: "0.95rem",
                minHeight: 44,
                px: 2,
              },
            }}
          >
            <Tab
              value="equity"
              label={
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <span>📈</span>
                  <span>Major U.S. Equity Benchmarks</span>
                  <Chip
                    label={dataset.equitySeries.length}
                    size="small"
                    sx={{ height: 20, fontSize: "0.7rem", fontWeight: 800 }}
                  />
                </Stack>
              }
            />
            <Tab
              value="macro"
              label={
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <span>🌐</span>
                  <span>Economic, Global &amp; Macro Indexes</span>
                  <Chip
                    label={dataset.macroSeries.length}
                    size="small"
                    sx={{ height: 20, fontSize: "0.7rem", fontWeight: 800 }}
                  />
                </Stack>
              }
            />
            <Tab
              value="all"
              label={
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <span>📊</span>
                  <span>All Series</span>
                  <Chip
                    label={dataset.seriesList.length}
                    size="small"
                    sx={{ height: 20, fontSize: "0.7rem", fontWeight: 800 }}
                  />
                </Stack>
              }
            />
          </Tabs>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, next) => next && setViewMode(next)}
            size="small"
            sx={{
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
              borderRadius: 2,
            }}
          >
            <ToggleButton value="cards" aria-label="cards view">
              <ViewModuleIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                Cards
              </Typography>
            </ToggleButton>
            <ToggleButton value="table" aria-label="table view">
              <TableViewIcon sx={{ fontSize: 18, mr: 0.5 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                Table
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Content: Cards Grid vs Table View */}
        {viewMode === "cards" ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {displayedSeries.map((s) => (
              <Box key={s.id} sx={{ minWidth: 0 }}>
                <FredSeriesCard
                  series={s}
                  isSelected={s.id === selectedSeriesId}
                  onSelect={(item) => setSelectedSeriesId(item.id)}
                />
              </Box>
            ))}
          </Box>
        ) : (
          /* Tabular View */
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
              borderRadius: 3,
              borderColor: "var(--indices-border, rgba(255, 255, 255, 0.12))",
              backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.5))",
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                  <TableCell sx={{ fontWeight: 800 }}>Benchmark Series</TableCell>
                  <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800 }}>
                    Latest Value
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800 }}>
                    Change
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800 }}>
                    1Y Sparkline
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 800 }}>
                    52W Range
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 800 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayedSeries.map((s) => {
                  const isPos = s.change >= 0;
                  return (
                    <TableRow
                      key={s.id}
                      hover
                      selected={s.id === selectedSeriesId}
                      onClick={() => setSelectedSeriesId(s.id)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography sx={{ fontSize: "1.1rem" }}>{s.icon}</Typography>
                          <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                              {s.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary", fontSize: "0.72rem" }}
                            >
                              FRED: {s.id} • {s.frequency}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={s.subcategory}
                          size="small"
                          sx={{ fontSize: "0.7rem", height: 22 }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, fontSize: "0.95rem" }}>
                        {formatSeriesValue(s.latestValue, s.format, s.decimals)}
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: isPos ? "#10b981" : "#ef4444",
                          }}
                        >
                          {isPos ? "+" : ""}
                          {formatSeriesValue(s.change, s.format, s.decimals)} ({isPos ? "+" : ""}
                          {s.changePct.toFixed(2)}%)
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <FredSparkline data={s.observations} width={80} height={28} />
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                        {formatSeriesValue(s.low52, s.format, s.decimals)} –{" "}
                        {formatSeriesValue(s.high52, s.format, s.decimals)}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          size="small"
                          variant={s.id === selectedSeriesId ? "contained" : "outlined"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSeriesId(s.id);
                          }}
                          startIcon={<ShowChartIcon sx={{ fontSize: 14 }} />}
                          sx={{ fontSize: "0.72rem", py: 0.2, textTransform: "none" }}
                        >
                          Chart
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
