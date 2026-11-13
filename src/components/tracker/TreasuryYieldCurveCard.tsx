import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useId, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FredSeriesData } from "../../data/fredSeriesData";
import { formatSeriesValue } from "./FredSeriesChart";

export interface TreasuryYieldCurveCardProps {
  seriesList: FredSeriesData[];
  selectedSeriesId: string;
  onSelectSeries: (seriesId: string) => void;
  updatedAt?: string;
}

type BondFilter = "all" | "curve" | "spreads" | "etfs";

export const TreasuryYieldCurveCard: React.FC<TreasuryYieldCurveCardProps> = ({
  seriesList,
  selectedSeriesId,
  onSelectSeries,
  updatedAt,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<BondFilter>("all");
  const [hoveredPoint, setHoveredPoint] = useState<{
    maturity: string;
    yieldVal: number;
    change: number;
    x: number;
    y: number;
  } | null>(null);

  const gradId = useId();

  // Find curve points
  const dgs3mo = seriesList.find((s) => s.id === "DGS3MO");
  const dgs2 = seriesList.find((s) => s.id === "DGS2");
  const dgs5 = seriesList.find((s) => s.id === "DGS5");
  const dgs10 = seriesList.find((s) => s.id === "DGS10");
  const dgs30 = seriesList.find((s) => s.id === "DGS30");
  const t10y2y = seriesList.find((s) => s.id === "T10Y2Y");
  const t10y3m = seriesList.find((s) => s.id === "T10Y3M");
  const dfii10 = seriesList.find((s) => s.id === "DFII10");
  const fedfunds = seriesList.find((s) => s.id === "FEDFUNDS");

  // Filter series based on sub-tabs
  const filteredSeries = useMemo(() => {
    if (selectedFilter === "curve") {
      return seriesList.filter((s) =>
        ["DGS3MO", "DGS2", "DGS5", "DGS10", "DGS30"].includes(s.id),
      );
    }
    if (selectedFilter === "spreads") {
      return seriesList.filter((s) =>
        ["T10Y2Y", "T10Y3M", "DFII10", "FEDFUNDS", "BAMLH0A0HYM2"].includes(
          s.id,
        ),
      );
    }
    if (selectedFilter === "etfs") {
      return seriesList.filter((s) =>
        ["AGG_BOND", "TLT_BOND", "LQD_BOND", "HYG_BOND", "TIP_BOND"].includes(
          s.id,
        ),
      );
    }
    return seriesList;
  }, [seriesList, selectedFilter]);

  // Curve points definition for SVG plot
  const curvePoints = useMemo(() => {
    const pts = [
      { id: "DGS3MO", label: "3M", series: dgs3mo },
      { id: "DGS2", label: "2Y", series: dgs2 },
      { id: "DGS5", label: "5Y", series: dgs5 },
      { id: "DGS10", label: "10Y", series: dgs10 },
      { id: "DGS30", label: "30Y", series: dgs30 },
    ].filter((p) => p.series && p.series.latestValue > 0);

    return pts;
  }, [dgs3mo, dgs2, dgs5, dgs10, dgs30]);

  // SVG dimensions for the Yield Curve visualizer
  const plotW = 760;
  const plotH = 180;
  const pad = { top: 25, right: 35, bottom: 35, left: 45 };
  const graphW = plotW - pad.left - pad.right;
  const graphH = plotH - pad.top - pad.bottom;

  const { minYield, maxYield, coords, pathD, areaD } = useMemo(() => {
    if (curvePoints.length === 0) {
      return { minYield: 0, maxYield: 6, coords: [], pathD: "", areaD: "" };
    }

    const yields = curvePoints.map((p) => p.series!.latestValue);
    const minRaw = Math.min(...yields);
    const maxRaw = Math.max(...yields);
    const minYield = Math.max(0, Math.floor((minRaw - 0.5) * 2) / 2);
    const maxYield = Math.ceil((maxRaw + 0.5) * 2) / 2;
    const yRange = maxYield - minYield || 1;

    const coords = curvePoints.map((p, idx) => {
      const x = pad.left + (idx / (curvePoints.length - 1)) * graphW;
      const y =
        pad.top + graphH - ((p.series!.latestValue - minYield) / yRange) * graphH;
      return {
        ...p,
        x,
        y,
        yieldVal: p.series!.latestValue,
        change: p.series!.change,
      };
    });

    const pathD = coords.reduce(
      (acc, curr, idx) =>
        `${acc} ${idx === 0 ? "M" : "L"} ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`,
      "",
    );

    const areaD = coords.length
      ? `${pathD} L ${coords[coords.length - 1].x.toFixed(1)} ${(pad.top + graphH).toFixed(1)} L ${coords[0].x.toFixed(1)} ${(pad.top + graphH).toFixed(1)} Z`
      : "";

    return { minYield, maxYield, coords, pathD, areaD };
  }, [curvePoints, graphW, graphH, pad.left, pad.top]);

  // Curve Slope / Inversion status
  const slope10y2y = t10y2y?.latestValue ?? (dgs10 && dgs2 ? dgs10.latestValue - dgs2.latestValue : 0);
  const isInverted = slope10y2y < 0;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3.5,
        backgroundColor: "var(--indices-card-bg, rgba(15, 23, 42, 0.45))",
        borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: 1.5,
            mb: 2.5,
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                mb: 0.5,
              }}
            >
              <Chip
                icon={<AccountBalanceIcon sx={{ fontSize: "15px !important" }} />}
                label="Sovereign Yield Curve"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "#818cf8",
                  border: "1px solid rgba(99, 102, 241, 0.35)",
                }}
              />
              <Chip
                label={
                  isInverted
                    ? "Curve Inverted (Recession Warning)"
                    : `Normal Upward Slope (+${(slope10y2y * 100).toFixed(0)} bps)`
                }
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  backgroundColor: isInverted
                    ? "rgba(239, 68, 68, 0.15)"
                    : "rgba(16, 185, 129, 0.15)",
                  color: isInverted ? "#ef4444" : "#10b981",
                  border: `1px solid ${isInverted ? "rgba(239, 68, 68, 0.35)" : "rgba(16, 185, 129, 0.35)"}`,
                }}
              />
              {updatedAt && (
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontSize: "0.76rem" }}
                >
                  Federal Reserve Board (FRED®) • Updated:{" "}
                  {new Date(updatedAt).toLocaleDateString()}
                </Typography>
              )}
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.15rem", sm: "1.35rem" },
                letterSpacing: "-0.02em",
              }}
            >
              U.S. Treasury Yields &amp; Bond Benchmarks
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.3, fontSize: "0.82rem" }}
            >
              Real-time sovereign yield curve structure, recession warning
              spreads, real yields (TIPS), and institutional bond index proxies.
            </Typography>
          </Box>

          {/* Quick Metrics Callout */}
          <Paper
            variant="outlined"
            sx={{
              p: 1.25,
              borderRadius: 2.5,
              backgroundColor: "rgba(30, 41, 59, 0.35)",
              borderColor: "rgba(255, 255, 255, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: { xs: 1.5, sm: 2 },
              flexWrap: "wrap",
            }}
          >
            {dgs10 && (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    display: "block",
                  }}
                >
                  10Y Risk-Free
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, fontSize: "0.86rem", color: "#10b981" }}
                >
                  {dgs10.latestValue.toFixed(2)}%
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                width: "1px",
                height: 24,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />

            {t10y2y && (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    display: "block",
                  }}
                >
                  10Y - 2Y Spread
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.86rem",
                    color: slope10y2y >= 0 ? "#10b981" : "#ef4444",
                  }}
                >
                  {slope10y2y >= 0 ? "+" : ""}
                  {(slope10y2y * 100).toFixed(0)} bps
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                width: "1px",
                height: 24,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />

            {t10y3m && (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    display: "block",
                  }}
                >
                  10Y - 3M Spread
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.86rem",
                    color: t10y3m.latestValue >= 0 ? "#10b981" : "#ef4444",
                  }}
                >
                  {t10y3m.latestValue >= 0 ? "+" : ""}
                  {(t10y3m.latestValue * 100).toFixed(0)} bps
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                width: "1px",
                height: 24,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />

            {dfii10 && (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    display: "block",
                  }}
                >
                  10Y Real Yield
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, fontSize: "0.86rem", color: "#ec4899" }}
                >
                  {dfii10.latestValue.toFixed(2)}%
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                width: "1px",
                height: 24,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />

            {fedfunds && (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    display: "block",
                  }}
                >
                  Fed Funds
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, fontSize: "0.86rem", color: "#6366f1" }}
                >
                  {fedfunds.latestValue.toFixed(2)}%
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Live Interactive Yield Curve Plot */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: "rgba(15, 23, 42, 0.55)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, fontSize: "0.84rem", letterSpacing: "0.02em" }}
            >
              U.S. TREASURY YIELD CURVE TERM STRUCTURE (3M → 30Y)
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.72rem" }}
            >
              Click any point to load interactive 5-year graph
            </Typography>
          </Box>

          <Box sx={{ width: "100%", height: { xs: 140, sm: 180 }, position: "relative" }}>
            <svg
              viewBox={`0 0 ${plotW} ${plotH}`}
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[minYield, (minYield + maxYield) / 2, maxYield].map((yVal, i) => {
                const y =
                  pad.top +
                  graphH -
                  ((yVal - minYield) / (maxYield - minYield || 1)) * graphH;
                return (
                  <g key={i}>
                    <line
                      x1={pad.left}
                      y1={y}
                      x2={pad.left + graphW}
                      y2={y}
                      stroke="rgba(255,255,255,0.08)"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={pad.left - 8}
                      y={y + 3}
                      fill="rgba(255,255,255,0.4)"
                      fontSize="10"
                      textAnchor="end"
                      fontWeight="600"
                    >
                      {yVal.toFixed(1)}%
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              {areaD && <path d={areaD} fill={`url(#${gradId})`} />}

              {/* Curve Line */}
              {pathD && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Interactive Point Nodes */}
              {coords.map((pt) => {
                const isSelected = selectedSeriesId === pt.id;
                const isHovered = hoveredPoint?.maturity === pt.label;

                return (
                  <g
                    key={pt.id}
                    onClick={() => onSelectSeries(pt.id)}
                    onMouseEnter={() =>
                      setHoveredPoint({
                        maturity: pt.label,
                        yieldVal: pt.yieldVal,
                        change: pt.change,
                        x: pt.x,
                        y: pt.y,
                      })
                    }
                    onMouseLeave={() => setHoveredPoint(null)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulsing ring if selected */}
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="10"
                        fill="none"
                        stroke="#818cf8"
                        strokeWidth="2"
                        strokeOpacity="0.5"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 7 : isSelected ? 6 : 5}
                      fill={isSelected ? "#ffffff" : "#6366f1"}
                      stroke="#818cf8"
                      strokeWidth="2"
                    />
                    {/* Maturity Label */}
                    <text
                      x={pt.x}
                      y={pad.top + graphH + 18}
                      fill={isSelected ? "#ffffff" : "rgba(255,255,255,0.6)"}
                      fontSize="11"
                      fontWeight={isSelected ? "800" : "700"}
                      textAnchor="middle"
                    >
                      {pt.label}
                    </text>
                    {/* Yield Label */}
                    <text
                      x={pt.x}
                      y={pt.y - 10}
                      fill={isSelected ? "#ffffff" : "#c7d2fe"}
                      fontSize="11"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {pt.yieldVal.toFixed(2)}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </Box>
        </Paper>

        {/* Filter Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 2.5,
          }}
        >
          <Tabs
            value={selectedFilter}
            onChange={(_, val) => setSelectedFilter(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 38,
              "& .MuiTab-root": {
                minHeight: 38,
                py: 0.5,
                px: 1.75,
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "none",
              },
            }}
          >
            <Tab label={`All Fixed Income (${seriesList.length})`} value="all" />
            <Tab label="Treasury Curve (5)" value="curve" />
            <Tab label="Spreads & Policy (5)" value="spreads" />
            <Tab label="Bond Index ETFs (5)" value="etfs" />
          </Tabs>
        </Box>

        {/* Grid of Rate & Bond Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          {filteredSeries.map((item) => {
            const isSelected = selectedSeriesId === item.id;
            const isPositive = item.change >= 0;

            // 52-week range calculation
            const rangeSpan = item.high52 - item.low52;
            const rangePct =
              rangeSpan > 0
                ? Math.min(
                    100,
                    Math.max(
                      0,
                      ((item.latestValue - item.low52) / rangeSpan) * 100,
                    ),
                  )
                : 50;

            return (
              <Card
                key={item.id}
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: isSelected
                    ? "rgba(99, 102, 241, 0.08)"
                    : "var(--indices-card-bg, rgba(30, 41, 59, 0.35))",
                  borderColor: isSelected
                    ? "primary.main"
                    : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                  borderWidth: isSelected ? 2 : 1,
                  transition: "all 0.18s ease-in-out",
                  "&:hover": {
                    borderColor: isSelected ? "primary.main" : "primary.light",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px -5px rgba(0, 0, 0, 0.25)",
                  },
                }}
              >
                <Box>
                  {/* Top Row: Icon & Subcategory */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: "1.3rem", lineHeight: 1 }}>
                        {item.icon}
                      </Typography>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            display: "block",
                          }}
                        >
                          {item.subcategory}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 800,
                            lineHeight: 1.2,
                            fontSize: "0.95rem",
                          }}
                        >
                          {item.shortName}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={item.units}
                      size="small"
                      sx={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        height: 20,
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        color: "text.secondary",
                      }}
                    />
                  </Box>

                  {/* Description snippet */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "0.72rem",
                      mb: 1.5,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.description}
                  </Typography>

                  {/* Value and 1-Day Return / Bps change */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      mb: 1.75,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        fontSize: "1.3rem",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {formatSeriesValue(item.latestValue, item.format, 2)}
                    </Typography>

                    <Chip
                      size="small"
                      icon={
                        isPositive ? (
                          <TrendingUpIcon sx={{ fontSize: "14px !important" }} />
                        ) : (
                          <TrendingDownIcon sx={{ fontSize: "14px !important" }} />
                        )
                      }
                      label={
                        item.format === "percent"
                          ? `${isPositive ? "+" : ""}${(item.change * 100).toFixed(0)} bps (${isPositive ? "+" : ""}${item.change.toFixed(2)}%)`
                          : `${isPositive ? "+" : ""}${item.changePct.toFixed(2)}%`
                      }
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        height: 24,
                        backgroundColor: isPositive
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(239, 68, 68, 0.15)",
                        color: isPositive ? "#10b981" : "#ef4444",
                        border: `1px solid ${isPositive ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
                      }}
                    />
                  </Box>

                  {/* 52-Week Range Bar */}
                  {item.high52 > 0 && (
                    <Box sx={{ mb: 1.75 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                          }}
                        >
                          52W L: {formatSeriesValue(item.low52, item.format, 2)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                          }}
                        >
                          52W H: {formatSeriesValue(item.high52, item.format, 2)}
                        </Typography>
                      </Box>
                      <Tooltip
                        title={`52-Week Range: ${formatSeriesValue(item.low52, item.format, 2)} - ${formatSeriesValue(item.high52, item.format, 2)} (Current at ${rangePct.toFixed(0)}%)`}
                        arrow
                      >
                        <LinearProgress
                          variant="determinate"
                          value={rangePct}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              background:
                                "linear-gradient(90deg, #6366f1 0%, #10b981 100%)",
                            },
                          }}
                        />
                      </Tooltip>
                    </Box>
                  )}

                  {/* Tracking / Proxy ETFs */}
                  {item.trackingEtfs && item.trackingEtfs.length > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        flexWrap: "wrap",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                        }}
                      >
                        ETFs:
                      </Typography>
                      {item.trackingEtfs.map((etf) => (
                        <Chip
                          key={etf}
                          label={etf}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            backgroundColor: "rgba(99, 102, 241, 0.12)",
                            color: "#818cf8",
                            border: "1px solid rgba(99, 102, 241, 0.25)",
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>

                {/* Bottom Actions */}
                <Box
                  sx={{
                    pt: 1.5,
                    borderTop:
                      "1px solid var(--indices-border, rgba(255, 255, 255, 0.06))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Button
                    size="small"
                    variant={isSelected ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => onSelectSeries(item.id)}
                    startIcon={<ShowChartIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      borderRadius: 2,
                      fontSize: "0.74rem",
                      fontWeight: 700,
                      textTransform: "none",
                      py: 0.4,
                      px: 1.25,
                      flex: 1,
                    }}
                  >
                    {isSelected ? "Active Chart" : "Inspect Chart"}
                  </Button>

                  {item.relatedIndexId && (
                    <Tooltip title="View full benchmark catalog profile & analytics">
                      <Button
                        component={RouterLink}
                        to={`/index/${item.relatedIndexId}`}
                        size="small"
                        variant="text"
                        endIcon={<ArrowForwardIcon sx={{ fontSize: 13 }} />}
                        sx={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          textTransform: "none",
                          color: "text.secondary",
                          py: 0.4,
                          px: 1,
                          "&:hover": { color: "primary.main" },
                        }}
                      >
                        Profile
                      </Button>
                    </Tooltip>
                  )}
                </Box>
              </Card>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
