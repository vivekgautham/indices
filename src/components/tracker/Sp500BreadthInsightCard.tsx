import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FredSeriesData } from "../../data/fredSeriesData";

export type BreadthTimeRange = "5D" | "1M" | "3M" | "YTD" | "1Y";

export interface Sp500BreadthInsightCardProps {
  sp500: FredSeriesData;
  sp500ew: FredSeriesData;
  onSelectSeries?: (seriesId: string) => void;
}

const BREADTH_RANGES: { id: BreadthTimeRange; label: string }[] = [
  { id: "5D", label: "5D" },
  { id: "1M", label: "1M" },
  { id: "3M", label: "3M" },
  { id: "YTD", label: "YTD" },
  { id: "1Y", label: "1Y" },
];

export const Sp500BreadthInsightCard: React.FC<Sp500BreadthInsightCardProps> = ({
  sp500,
  sp500ew,
  onSelectSeries,
}) => {
  const [selectedRange, setSelectedRange] = useState<BreadthTimeRange>("1Y");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const chartId = useId();

  // Align dates between SP500 and SP500EW
  const alignedPairs = useMemo(() => {
    if (!sp500?.observations || !sp500ew?.observations) return [];
    const spewMap = new Map(sp500ew.observations);
    const pairs: { date: string; sp: number; spew: number }[] = [];

    for (const [date, spVal] of sp500.observations) {
      const spewVal = spewMap.get(date);
      if (spewVal !== undefined) {
        pairs.push({ date, sp: spVal, spew: spewVal });
      }
    }
    return pairs;
  }, [sp500, sp500ew]);

  // Filter aligned observations for the selected time range
  const filteredSlice = useMemo(() => {
    if (alignedPairs.length === 0) return [];
    const latestDate = new Date(alignedPairs[alignedPairs.length - 1].date);
    let cutoff: Date;

    switch (selectedRange) {
      case "5D":
        cutoff = new Date(latestDate);
        cutoff.setDate(cutoff.getDate() - 7);
        break;
      case "1M":
        cutoff = new Date(latestDate);
        cutoff.setMonth(cutoff.getMonth() - 1);
        break;
      case "3M":
        cutoff = new Date(latestDate);
        cutoff.setMonth(cutoff.getMonth() - 3);
        break;
      case "YTD":
        cutoff = new Date(latestDate.getFullYear(), 0, 1);
        break;
      case "1Y":
      default:
        cutoff = new Date(latestDate);
        cutoff.setFullYear(cutoff.getFullYear() - 1);
        break;
    }

    const cutoffStr = cutoff.toISOString().split("T")[0];
    const slice =
      selectedRange === "5D"
        ? alignedPairs.slice(-5)
        : alignedPairs.filter((p) => p.date >= cutoffStr);

    return slice.length > 0 ? slice : alignedPairs.slice(-21);
  }, [alignedPairs, selectedRange]);

  // Calculate normalized performance from baseline (0.00% on start date)
  const normalizedData = useMemo(() => {
    if (filteredSlice.length === 0) {
      return {
        points: [],
        capReturn: 0,
        eqReturn: 0,
        spread: 0,
        startDate: "",
        endDate: "",
        minPct: 0,
        maxPct: 0,
      };
    }

    const baseSp = filteredSlice[0].sp || 1;
    const baseSpew = filteredSlice[0].spew || 1;

    const points = filteredSlice.map((item) => {
      const spPct = ((item.sp - baseSp) / baseSp) * 100;
      const spewPct = ((item.spew - baseSpew) / baseSpew) * 100;
      return {
        date: item.date,
        spRaw: item.sp,
        spewRaw: item.spew,
        spPct,
        spewPct,
        spreadPct: spewPct - spPct,
      };
    });

    const last = points[points.length - 1];
    const capReturn = last.spPct;
    const eqReturn = last.spewPct;
    const spread = eqReturn - capReturn;

    const allPcts = points.flatMap((p) => [p.spPct, p.spewPct]);
    const minPct = Math.min(...allPcts);
    const maxPct = Math.max(...allPcts);

    return {
      points,
      capReturn,
      eqReturn,
      spread,
      startDate: points[0].date,
      endDate: last.date,
      minPct,
      maxPct,
    };
  }, [filteredSlice]);

  const { points, capReturn, eqReturn, spread, minPct, maxPct } = normalizedData;

  // Breadth Regime Classification
  const isBroadening = spread > 0.3;
  const isNarrowing = spread < -0.3;

  const regimeTitle = isBroadening
    ? "Market Broadening (Healthy Expansion)"
    : isNarrowing
      ? "Market Narrowing (Mega-Cap Concentration)"
      : "Balanced Market Breadth";

  const regimeColor = isBroadening
    ? "#10b981"
    : isNarrowing
      ? "#f59e0b"
      : "#3b82f6";

  const regimeBg = isBroadening
    ? "rgba(16, 185, 129, 0.12)"
    : isNarrowing
      ? "rgba(245, 158, 11, 0.12)"
      : "rgba(59, 130, 246, 0.12)";

  const regimeBorder = isBroadening
    ? "rgba(16, 185, 129, 0.35)"
    : isNarrowing
      ? "rgba(245, 158, 11, 0.35)"
      : "rgba(59, 130, 246, 0.35)";

  // SVG Chart Geometry
  const plotW = 750;
  const plotH = 220;
  const padding = { top: 18, right: 12, bottom: 20, left: 12 };
  const chartW = plotW - padding.left - padding.right;
  const chartH = plotH - padding.top - padding.bottom;

  // Add 10% breathing room to Y-axis range
  const rawRange = maxPct - minPct || 1;
  const yPadding = rawRange * 0.1;
  const yMin = minPct - yPadding;
  const yMax = maxPct + yPadding;
  const yRange = yMax - yMin || 1;

  const zeroY = padding.top + chartH - ((0 - yMin) / yRange) * chartH;

  const coords = useMemo(() => {
    if (points.length < 2) return [];
    return points.map((p, idx) => {
      const x = padding.left + (idx / (points.length - 1)) * chartW;
      const spY = padding.top + chartH - ((p.spPct - yMin) / yRange) * chartH;
      const spewY = padding.top + chartH - ((p.spewPct - yMin) / yRange) * chartH;
      return { x, spY, spewY, ...p };
    });
  }, [points, chartW, chartH, padding.left, padding.top, yMin, yRange]);

  // SVG Paths
  const capPathD = useMemo(() => {
    if (coords.length < 2) return "";
    return coords.reduce(
      (acc, c, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${c.x.toFixed(1)},${c.spY.toFixed(1)}`,
      "",
    );
  }, [coords]);

  const eqPathD = useMemo(() => {
    if (coords.length < 2) return "";
    return coords.reduce(
      (acc, c, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${c.x.toFixed(1)},${c.spewY.toFixed(1)}`,
      "",
    );
  }, [coords]);

  // Shaded differential area between Equal-Weight and Cap-Weight
  const diffAreaD = useMemo(() => {
    if (coords.length < 2) return "";
    // Forward along Equal Weight line
    let path = coords.reduce(
      (acc, c, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${c.x.toFixed(1)},${c.spewY.toFixed(1)}`,
      "",
    );
    // Backward along Cap Weight line
    for (let i = coords.length - 1; i >= 0; i--) {
      path += ` L ${coords[i].x.toFixed(1)},${coords[i].spY.toFixed(1)}`;
    }
    path += " Z";
    return path;
  }, [coords]);

  // Mouse hover tracking
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || coords.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * plotW;
    const clampedX = Math.max(padding.left, Math.min(plotW - padding.right, relX));
    const ratio = (clampedX - padding.left) / chartW;
    const idx = Math.round(ratio * (coords.length - 1));
    setHoverIndex(Math.max(0, Math.min(coords.length - 1, idx)));
  };

  const activeHover = hoverIndex !== null && coords[hoverIndex] ? coords[hoverIndex] : null;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3.5,
        border: "1px solid var(--indices-border, rgba(255, 255, 255, 0.12))",
        backgroundColor: "var(--indices-card-bg, rgba(15, 23, 42, 0.6))",
        backdropFilter: "blur(14px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header: Title, Regime Chip & Time Range Selector */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          gap={2}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" sx={{ mb: 0.5 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  letterSpacing: "-0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span>⚖️</span>
                Market Breadth Barometer: Cap-Weight vs. Equal-Weight S&amp;P 500
              </Typography>

              <Chip
                icon={
                  isBroadening ? (
                    <TrendingUpIcon sx={{ fontSize: 16, color: `${regimeColor} !important` }} />
                  ) : isNarrowing ? (
                    <TrendingDownIcon sx={{ fontSize: 16, color: `${regimeColor} !important` }} />
                  ) : undefined
                }
                label={regimeTitle}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  color: regimeColor,
                  backgroundColor: regimeBg,
                  borderColor: regimeBorder,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  py: 0.25,
                }}
              />
            </Stack>

            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.82rem" }}>
              Compares the traditional market-cap S&amp;P 500 (top-heavy mega-caps) against the Equal Weight S&amp;P 500 (median stock breadth).
            </Typography>
          </Box>

          {/* Time Range Horizon Toggle */}
          <ButtonGroup
            size="small"
            variant="outlined"
            aria-label="Breadth timeframe toggle"
            sx={{
              backgroundColor: "rgba(15, 23, 42, 0.5)",
              borderRadius: 2,
              "& .MuiButton-root": {
                px: 1.25,
                py: 0.4,
                fontSize: "0.74rem",
                fontWeight: 700,
                borderColor: "var(--indices-border, rgba(255, 255, 255, 0.12))",
                color: "text.secondary",
                "&.active": {
                  color: "#ffffff",
                  backgroundColor: "rgba(99, 102, 241, 0.25)",
                  borderColor: "primary.main",
                },
              },
            }}
          >
            {BREADTH_RANGES.map((r) => (
              <Button
                key={r.id}
                className={selectedRange === r.id ? "active" : ""}
                onClick={() => {
                  setSelectedRange(r.id);
                  setHoverIndex(null);
                }}
              >
                {r.label}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>

        {/* KPI Performance Comparison Bar */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 1.5,
            mb: 2.5,
          }}
        >
          {/* S&P 500 Cap-Weight Card */}
          <Paper
            variant="outlined"
            onClick={() => onSelectSeries?.("SP500")}
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              cursor: onSelectSeries ? "pointer" : "default",
              backgroundColor: "var(--indices-subtle-bg, rgba(30, 41, 59, 0.35))",
              borderColor: "rgba(139, 92, 246, 0.3)",
              transition: "border-color 0.2s ease, transform 0.15s ease",
              "&:hover": onSelectSeries ? { borderColor: "#8b5cf6", transform: "translateY(-1px)" } : {},
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
              <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.74rem" }}>
                📈 S&amp;P 500 (Cap-Weight)
              </Typography>
              <Chip
                label="SPY / VOO"
                size="small"
                sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700, backgroundColor: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}
              />
            </Stack>
            <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: capReturn >= 0 ? "#10b981" : "#ef4444" }}>
              {capReturn >= 0 ? "+" : ""}
              {capReturn.toFixed(2)}%
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
              {selectedRange} Return • Top 10 = ~35% weight
            </Typography>
          </Paper>

          {/* S&P 500 Equal-Weight Card */}
          <Paper
            variant="outlined"
            onClick={() => onSelectSeries?.("SP500EW")}
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              cursor: onSelectSeries ? "pointer" : "default",
              backgroundColor: "var(--indices-subtle-bg, rgba(30, 41, 59, 0.35))",
              borderColor: "rgba(16, 185, 129, 0.35)",
              transition: "border-color 0.2s ease, transform 0.15s ease",
              "&:hover": onSelectSeries ? { borderColor: "#10b981", transform: "translateY(-1px)" } : {},
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
              <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.74rem" }}>
                ⚖️ S&amp;P 500 (Equal-Weight)
              </Typography>
              <Chip
                label="RSP"
                size="small"
                sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700, backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}
              />
            </Stack>
            <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: eqReturn >= 0 ? "#10b981" : "#ef4444" }}>
              {eqReturn >= 0 ? "+" : ""}
              {eqReturn.toFixed(2)}%
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
              {selectedRange} Return • 0.2% per stock (500 stocks)
            </Typography>
          </Paper>

          {/* Breadth Spread Differential */}
          <Paper
            variant="outlined"
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              backgroundColor: regimeBg,
              borderColor: regimeBorder,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
              <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.74rem" }}>
                📊 Breadth Spread (Equal − Cap)
              </Typography>
              <Chip
                label={isBroadening ? "Broadening" : isNarrowing ? "Narrowing" : "Balanced"}
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  backgroundColor: regimeColor,
                  color: "#ffffff",
                }}
              />
            </Stack>
            <Typography sx={{ fontWeight: 800, fontSize: "1.15rem", color: regimeColor }}>
              {spread >= 0 ? "+" : ""}
              {spread.toFixed(2)}%
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
              {isBroadening
                ? "Equal-Weight outperforming by " + Math.abs(spread).toFixed(2) + "%"
                : isNarrowing
                  ? "Cap-Weight outperforming by " + Math.abs(spread).toFixed(2) + "%"
                  : "Both moving in lockstep"}
            </Typography>
          </Paper>
        </Box>

        {/* Visual Breadth Meter Gauge Bar */}
        <Box sx={{ mb: 3, px: 0.5 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
            <Typography sx={{ fontSize: "0.72rem", color: "#f59e0b", fontWeight: 700 }}>
              ← Narrowing (Mega-Cap Tech Led)
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: "text.secondary", fontWeight: 700 }}>
              Balanced (0%)
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: "#10b981", fontWeight: 700 }}>
              Broadening (Median Stock Led) →
            </Typography>
          </Stack>

          <Box
            sx={{
              position: "relative",
              height: 10,
              borderRadius: 5,
              background: "linear-gradient(90deg, #ef4444 0%, #f59e0b 35%, #3b82f6 50%, #10b981 65%, #059669 100%)",
              opacity: 0.85,
            }}
          >
            {/* Center zero marker */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: -2,
                bottom: -2,
                width: 2,
                backgroundColor: "#ffffff",
                zIndex: 1,
              }}
            />
            {/* Pointer for current spread (-6% to +6% mapped to 0% to 100%) */}
            {(() => {
              const clampedSpread = Math.max(-6, Math.min(6, spread));
              const pointerPct = ((clampedSpread + 6) / 12) * 100;
              return (
                <Box
                  sx={{
                    position: "absolute",
                    left: `${pointerPct}%`,
                    top: -4,
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    border: `3px solid ${regimeColor}`,
                    boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                    zIndex: 2,
                  }}
                />
              );
            })()}
          </Box>
        </Box>

        {/* Interactive Dual Normalized Performance Chart */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            p: 1.5,
            backgroundColor: "rgba(10, 15, 29, 0.7)",
            border: "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
            mb: 2.5,
          }}
        >
          {/* Chart Header & Legend */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            sx={{ mb: 1.5, px: 0.5 }}
          >
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Stack direction="row" spacing={0.75} alignItems="center">
                <Box sx={{ width: 14, height: 3, borderRadius: 1.5, backgroundColor: "#8b5cf6" }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary" }}>
                  S&amp;P 500 Cap-Weight (VOO/SPY)
                </Typography>
              </Stack>
              <Stack direction="row" spacing={0.75} alignItems="center">
                <Box sx={{ width: 14, height: 3, borderRadius: 1.5, backgroundColor: "#10b981" }} />
                <Typography sx={{ fontSize: "0.76rem", fontWeight: 700, color: "text.secondary" }}>
                  S&amp;P 500 Equal-Weight (RSP)
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.72rem" }}>
              Re-based to 0.00% on {normalizedData.startDate}
            </Typography>
          </Stack>

          {/* SVG Chart Element */}
          <Box sx={{ width: "100%", height: 230, position: "relative" }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${plotW} ${plotH}`}
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ width: "100%", height: "100%", overflow: "visible", cursor: "crosshair" }}
            >
              <defs>
                <linearGradient id={`${chartId}-broadenGrad`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id={`${chartId}-narrowGrad`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Zero Baseline */}
              {zeroY >= padding.top && zeroY <= padding.top + chartH && (
                <line
                  x1={padding.left}
                  y1={zeroY}
                  x2={plotW - padding.right}
                  y2={zeroY}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              )}

              {/* Shaded differential fill */}
              {diffAreaD && (
                <path
                  d={diffAreaD}
                  fill={isBroadening ? `url(#${chartId}-broadenGrad)` : `url(#${chartId}-narrowGrad)`}
                />
              )}

              {/* S&P 500 Cap-Weight Path (Purple) */}
              {capPathD && (
                <path
                  d={capPathD}
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* S&P 500 Equal-Weight Path (Emerald) */}
              {eqPathD && (
                <path
                  d={eqPathD}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Crosshair & Hover Markers */}
              {activeHover && (
                <g>
                  {/* Vertical Crosshair Line */}
                  <line
                    x1={activeHover.x}
                    y1={padding.top}
                    x2={activeHover.x}
                    y2={padding.top + chartH}
                    stroke="rgba(255, 255, 255, 0.35)"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />
                  {/* Cap Dot */}
                  <circle
                    cx={activeHover.x}
                    cy={activeHover.spY}
                    r="4.5"
                    fill="#8b5cf6"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  {/* Equal Dot */}
                  <circle
                    cx={activeHover.x}
                    cy={activeHover.spewY}
                    r="4.5"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              )}
            </svg>

            {/* Hover Tooltip Overlay */}
            {activeHover && (
              <Paper
                elevation={6}
                sx={{
                  position: "absolute",
                  top: 10,
                  left: activeHover.x > plotW / 2 ? "auto" : activeHover.x * 0.9 + 20,
                  right: activeHover.x > plotW / 2 ? plotW - activeHover.x + 20 : "auto",
                  pointerEvents: "none",
                  py: 1,
                  px: 1.5,
                  borderRadius: 2,
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                  zIndex: 10,
                }}
              >
                <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: "text.secondary", mb: 0.5 }}>
                  📅 {activeHover.date}
                </Typography>
                <Stack spacing={0.3}>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography sx={{ fontSize: "0.76rem", color: "#a78bfa", fontWeight: 600 }}>
                      Cap-Weight:
                    </Typography>
                    <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: activeHover.spPct >= 0 ? "#10b981" : "#ef4444" }}>
                      {activeHover.spPct >= 0 ? "+" : ""}{activeHover.spPct.toFixed(2)}%
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Typography sx={{ fontSize: "0.76rem", color: "#34d399", fontWeight: 600 }}>
                      Equal-Weight:
                    </Typography>
                    <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: activeHover.spewPct >= 0 ? "#10b981" : "#ef4444" }}>
                      {activeHover.spewPct >= 0 ? "+" : ""}{activeHover.spewPct.toFixed(2)}%
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ pt: 0.5, borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <Typography sx={{ fontSize: "0.74rem", fontWeight: 700, color: "text.primary" }}>
                      Spread:
                    </Typography>
                    <Typography sx={{ fontSize: "0.76rem", fontWeight: 800, color: activeHover.spreadPct >= 0 ? "#10b981" : "#f59e0b" }}>
                      {activeHover.spreadPct >= 0 ? "+" : ""}{activeHover.spreadPct.toFixed(2)}%
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Institutional Market Regime Insights (3 Columns) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 1.5,
          }}
        >
          {/* Card 1: What is Market Broadening / Narrowing */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2.5,
              backgroundColor: "rgba(30, 41, 59, 0.25)",
              borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, fontSize: "0.82rem", mb: 0.75, display: "flex", alignItems: "center", gap: 0.75 }}
            >
              <span>🌊</span>
              {isBroadening ? "Current Regime: Broadening" : isNarrowing ? "Current Regime: Narrowing" : "Current Regime: Neutral"}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.76rem", lineHeight: 1.55 }}>
              {isBroadening
                ? "Equal-Weight is outpacing Cap-Weight, indicating that gains are expanding beyond mega-cap tech into cyclical sectors (industrials, financials, materials, and healthcare). Market breadth is expanding constructively."
                : isNarrowing
                  ? "Cap-Weight is outperforming Equal-Weight, indicating that market returns are heavily concentrated in the top mega-cap tech titans while the median constituent lags. Historically signals top-heavy breadth fragility."
                  : "Both versions are moving in lockstep, signifying balanced participation across large-cap and mid-tier S&P 500 constituents."}
            </Typography>
          </Paper>

          {/* Card 2: Concentration Asymmetry */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2.5,
              backgroundColor: "rgba(30, 41, 59, 0.25)",
              borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, fontSize: "0.82rem", mb: 0.75, display: "flex", alignItems: "center", gap: 0.75 }}
            >
              <span>🏛️</span>
              Concentration Asymmetry
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.76rem", lineHeight: 1.55 }}>
              In Cap-Weighted S&amp;P 500, the <strong>top 10 companies</strong> command over <strong>35%</strong> of the total index weight. In Equal-Weight, every company is strictly rebalanced to exactly <strong>0.20%</strong> each quarter, eliminating single-stock concentration risk.
            </Typography>
          </Paper>

          {/* Card 3: Actionable Implementation */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2.5,
              backgroundColor: "rgba(30, 41, 59, 0.25)",
              borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, fontSize: "0.82rem", mb: 0.75, display: "flex", alignItems: "center", gap: 0.75 }}
              >
                <span>💡</span>
                Portfolio Takeaway &amp; ETFs
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.76rem", lineHeight: 1.55, mb: 1.5 }}>
                Investors use <strong>RSP</strong> (Invesco S&amp;P 500 Equal Weight ETF) to harvest cyclical value, smaller-cap premium, and mitigate mega-cap tech drawdown risks versus traditional <strong>VOO / SPY</strong>.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/index/sp-500-equal-weight"
              size="small"
              variant="outlined"
              endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
              sx={{
                borderRadius: 2,
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "none",
                borderColor: "rgba(16, 185, 129, 0.4)",
                color: "#10b981",
                alignSelf: "flex-start",
                "&:hover": {
                  borderColor: "#10b981",
                  backgroundColor: "rgba(16, 185, 129, 0.08)",
                },
              }}
            >
              View S&amp;P 500 Equal Weight Profile
            </Button>
          </Paper>
        </Box>
      </CardContent>
    </Card>
  );
};
