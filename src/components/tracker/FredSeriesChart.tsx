import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LayersIcon from "@mui/icons-material/Layers";
import TimelineIcon from "@mui/icons-material/Timeline";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useId, useMemo, useRef, useState } from "react";
import { filterObservationsByRange, TimeRange } from "../../api/fredApi";
import { FredSeriesData } from "../../data/fredSeriesData";

export interface FredSeriesChartProps {
  series: FredSeriesData;
  initialRange?: TimeRange;
}

const RANGES: TimeRange[] = ["5D", "1M", "3M", "6M", "YTD", "1Y", "5Y", "MAX"];

export function formatSeriesValue(
  value: number,
  format: "currency" | "percent" | "number" | "index",
  decimals: number = 2,
): string {
  if (value === undefined || value === null || isNaN(value)) return "—";

  if (format === "percent") {
    return `${value.toFixed(decimals)}%`;
  }
  if (format === "currency") {
    return `$${value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  }
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatAxisValue(
  value: number,
  format: "currency" | "percent" | "number" | "index",
): string {
  if (value === undefined || value === null || isNaN(value)) return "";
  if (format === "percent") {
    return `${value.toFixed(1)}%`;
  }
  if (value >= 1000) {
    return Math.round(value).toLocaleString("en-US");
  }
  return value.toFixed(1);
}

export interface BigDropEvent {
  index: number;
  date: string;
  price: number;
  prevPrice: number;
  change: number;
  changePct: number;
  x: number;
  y: number;
  dma50?: number;
  dma200?: number;
}

export const FredSeriesChart: React.FC<FredSeriesChartProps> = ({
  series,
  initialRange = "1Y",
}) => {
  const theme = useTheme();
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialRange);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Indicators toggle states (default: active for maximum informative value)
  const [show50Dma, setShow50Dma] = useState<boolean>(true);
  const [show200Dma, setShow200Dma] = useState<boolean>(true);
  const [showBigDrops, setShowBigDrops] = useState<boolean>(true);
  const [showDropPanel, setShowDropPanel] = useState<boolean>(true);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement>(null);
  const chartGradId = useId();

  // Full technical indicators computed across all historical observations
  const technicals = useMemo(() => {
    if (!series || !series.observations || series.observations.length === 0) {
      return {
        dma50: new Map<string, number>(),
        dma200: new Map<string, number>(),
        dailyStats: new Map<
          string,
          { change: number; changePct: number; prevValue: number }
        >(),
        hasEnough50: false,
        hasEnough200: false,
      };
    }

    // Ensure observations are sorted chronologically
    const obs = [...series.observations].sort((a, b) =>
      a[0].localeCompare(b[0]),
    );
    const n = obs.length;
    const dma50 = new Map<string, number>();
    const dma200 = new Map<string, number>();
    const dailyStats = new Map<
      string,
      { change: number; changePct: number; prevValue: number }
    >();

    let sum50 = 0;
    let sum200 = 0;

    for (let i = 0; i < n; i++) {
      const date = obs[i][0];
      const val = obs[i][1];

      // Calculate period/daily return against previous recorded observation
      if (i > 0) {
        const prev = obs[i - 1][1];
        const chg = Number((val - prev).toFixed(4));
        const chgPct =
          prev !== 0 ? Number(((chg / prev) * 100).toFixed(2)) : 0;
        dailyStats.set(date, {
          change: chg,
          changePct: chgPct,
          prevValue: prev,
        });
      }

      // Rolling 50 DMA
      sum50 += val;
      if (i >= 50) {
        sum50 -= obs[i - 50][1];
      }
      if (i >= 49) {
        dma50.set(date, Number((sum50 / 50).toFixed(4)));
      }

      // Rolling 200 DMA
      sum200 += val;
      if (i >= 200) {
        sum200 -= obs[i - 200][1];
      }
      if (i >= 199) {
        dma200.set(date, Number((sum200 / 200).toFixed(4)));
      }
    }

    return {
      dma50,
      dma200,
      dailyStats,
      hasEnough50: obs.length >= 50,
      hasEnough200: obs.length >= 200,
    };
  }, [series]);

  // Compute stats for the selected time range
  const rangeStats = useMemo(() => {
    return filterObservationsByRange(series.observations, selectedRange);
  }, [series.observations, selectedRange]);

  const {
    points,
    startValue,
    endValue,
    startDate,
    endDate,
    change,
    changePct,
    min,
    max,
  } = rangeStats;

  const isPositive = change >= 0;
  const strokeColor = isPositive ? "#10b981" : "#ef4444";
  const glowColor = isPositive
    ? "rgba(16, 185, 129, 0.28)"
    : "rgba(239, 68, 68, 0.28)";

  // Plot dimensions for SVG coordinates (enhanced height for multiple indicators)
  const plotW = 800;
  const plotH = 260;
  const padding = { top: 14, right: 8, bottom: 12, left: 8 };
  const chartW = plotW - padding.left - padding.right;
  const chartH = plotH - padding.top - padding.bottom;

  // Compute effective min and max including visible DMA overlays so lines never clip
  const { chartMin, valRange } = useMemo(() => {
    let mMin = min;
    let mMax = max;

    if (show50Dma && technicals.hasEnough50) {
      for (const p of points) {
        const d50 = technicals.dma50.get(p[0]);
        if (d50 !== undefined) {
          if (d50 < mMin) mMin = d50;
          if (d50 > mMax) mMax = d50;
        }
      }
    }

    if (show200Dma && technicals.hasEnough200) {
      for (const p of points) {
        const d200 = technicals.dma200.get(p[0]);
        if (d200 !== undefined) {
          if (d200 < mMin) mMin = d200;
          if (d200 > mMax) mMax = d200;
        }
      }
    }

    const rangeDiff = mMax - mMin || 1;
    const pad = rangeDiff * 0.035;
    const cMin = mMin - pad;
    const cMax = mMax + pad;
    return {
      chartMin: cMin,
      chartMax: cMax,
      valRange: cMax - cMin || 1,
    };
  }, [min, max, points, show50Dma, show200Dma, technicals]);

  // Coordinate mapping for primary price points
  const coords = useMemo(() => {
    if (points.length < 2) return [];
    return points.map((p, idx) => {
      const x = padding.left + (idx / (points.length - 1)) * chartW;
      const y = padding.top + chartH - ((p[1] - chartMin) / valRange) * chartH;
      return [x, y, p[0], p[1]] as [number, number, string, number];
    });
  }, [points, chartW, chartH, padding.left, padding.top, chartMin, valRange]);

  const pathD = useMemo(() => {
    if (coords.length < 2) return "";
    return coords.reduce(
      (acc, curr, idx) =>
        `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`,
      "",
    );
  }, [coords]);

  const areaD = useMemo(() => {
    if (coords.length < 2) return "";
    const bottomY = plotH;
    return `${pathD} L ${coords[coords.length - 1][0].toFixed(1)} ${bottomY} L ${coords[0][0].toFixed(1)} ${bottomY} Z`;
  }, [pathD, coords, plotH]);

  // 50 DMA SVG path coordinates
  const dma50Coords = useMemo(() => {
    if (!show50Dma || points.length < 2) return [];
    const res: [number, number, string, number][] = [];
    points.forEach((p, idx) => {
      const d50 = technicals.dma50.get(p[0]);
      if (d50 !== undefined) {
        const x = padding.left + (idx / (points.length - 1)) * chartW;
        const y =
          padding.top + chartH - ((d50 - chartMin) / valRange) * chartH;
        res.push([x, y, p[0], d50]);
      }
    });
    return res;
  }, [
    show50Dma,
    points,
    technicals.dma50,
    padding.left,
    padding.top,
    chartW,
    chartH,
    chartMin,
    valRange,
  ]);

  const dma50PathD = useMemo(() => {
    if (dma50Coords.length < 2) return "";
    return dma50Coords.reduce(
      (acc, curr, idx) =>
        `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`,
      "",
    );
  }, [dma50Coords]);

  // 200 DMA SVG path coordinates
  const dma200Coords = useMemo(() => {
    if (!show200Dma || points.length < 2) return [];
    const res: [number, number, string, number][] = [];
    points.forEach((p, idx) => {
      const d200 = technicals.dma200.get(p[0]);
      if (d200 !== undefined) {
        const x = padding.left + (idx / (points.length - 1)) * chartW;
        const y =
          padding.top + chartH - ((d200 - chartMin) / valRange) * chartH;
        res.push([x, y, p[0], d200]);
      }
    });
    return res;
  }, [
    show200Dma,
    points,
    technicals.dma200,
    padding.left,
    padding.top,
    chartW,
    chartH,
    chartMin,
    valRange,
  ]);

  const dma200PathD = useMemo(() => {
    if (dma200Coords.length < 2) return "";
    return dma200Coords.reduce(
      (acc, curr, idx) =>
        `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(1)} ${curr[1].toFixed(1)}`,
      "",
    );
  }, [dma200Coords]);

  // Identify Big Drop days in the currently viewed time window
  const bigDropEvents = useMemo(() => {
    if (coords.length < 2) return [];
    const drops: BigDropEvent[] = [];
    const isYield = series.format === "percent";

    coords.forEach((coord, idx) => {
      const date = coord[2];
      const price = coord[3];
      const stats = technicals.dailyStats.get(date);
      if (!stats) return;

      // Drop threshold: <= -1.5% for general indices or <= -0.08 / <= -1.5% for bond yields
      const isDrop = isYield
        ? stats.change <= -0.08 || stats.changePct <= -1.5
        : stats.changePct <= -1.5;

      if (isDrop) {
        drops.push({
          index: idx,
          date,
          price,
          prevPrice: stats.prevValue,
          change: stats.change,
          changePct: stats.changePct,
          x: coord[0],
          y: coord[1],
          dma50: technicals.dma50.get(date),
          dma200: technicals.dma200.get(date),
        });
      }
    });

    return drops;
  }, [coords, series.format, technicals]);

  // Hover detection
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement>,
  ) => {
    if (!svgRef.current || coords.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeX = (mouseX / rect.width) * plotW;

    // Find nearest point
    let nearestIdx = 0;
    let minDiff = Infinity;
    for (let i = 0; i < coords.length; i++) {
      const diff = Math.abs(coords[i][0] - relativeX);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIdx = i;
      }
    }
    setHoverIndex(nearestIdx);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const activePoint =
    hoverIndex !== null && coords[hoverIndex]
      ? coords[hoverIndex]
      : coords.length > 0
        ? coords[coords.length - 1]
        : null;

  const displayedValue = activePoint ? activePoint[3] : endValue;
  const displayedDate = activePoint ? activePoint[2] : endDate;
  const isHovering = hoverIndex !== null;

  // Comparison to start
  const hoverDiff = activePoint ? activePoint[3] - startValue : change;
  const hoverDiffPct =
    startValue !== 0 ? (hoverDiff / startValue) * 100 : changePct;

  // Technical values at active/hovered inspection point
  const hoverDate = activePoint ? activePoint[2] : series.latestDate;
  const hoverDma50 = technicals.dma50.get(hoverDate);
  const hoverDma200 = technicals.dma200.get(hoverDate);
  const hoverDailyStats = technicals.dailyStats.get(hoverDate);
  const activeBigDrop = activePoint
    ? bigDropEvents.find((d) => d.date === activePoint[2])
    : undefined;

  // Y-coordinates of active DMA markers for crosshair visualization
  const hoverDma50Y =
    hoverDma50 !== undefined
      ? padding.top + chartH - ((hoverDma50 - chartMin) / valRange) * chartH
      : null;

  const hoverDma200Y =
    hoverDma200 !== undefined
      ? padding.top + chartH - ((hoverDma200 - chartMin) / valRange) * chartH
      : null;

  // Latest DMA values for header chips
  const latestDma50 = technicals.dma50.get(series.latestDate);
  const latestDma200 = technicals.dma200.get(series.latestDate);

  // Structural Trend Posture (Golden Cross / Death Cross)
  const trendSignal = useMemo(() => {
    if (latestDma50 === undefined || latestDma200 === undefined) return null;
    const isGolden = latestDma50 >= latestDma200;
    const isAbove50 = series.latestValue >= latestDma50;
    const isAbove200 = series.latestValue >= latestDma200;

    if (isGolden && isAbove50 && isAbove200) {
      return {
        label: "Bullish: Golden Cross (Above 50 & 200 DMA)",
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.14)",
        border: "rgba(16, 185, 129, 0.35)",
        icon: <AutoGraphIcon sx={{ fontSize: 13 }} />,
      };
    }
    if (isGolden && !isAbove50 && isAbove200) {
      return {
        label: "Pullback: Golden Cross (Testing 50 DMA)",
        color: "#f59e0b",
        bg: "rgba(245, 158, 11, 0.14)",
        border: "rgba(245, 158, 11, 0.35)",
        icon: <TimelineIcon sx={{ fontSize: 13 }} />,
      };
    }
    if (!isGolden && !isAbove50 && !isAbove200) {
      return {
        label: "Bearish: Death Cross (Below Both DMAs)",
        color: "#ef4444",
        bg: "rgba(239, 68, 68, 0.14)",
        border: "rgba(239, 68, 68, 0.35)",
        icon: <TrendingDownIcon sx={{ fontSize: 13 }} />,
      };
    }
    if (!isGolden) {
      return {
        label: "Caution: Death Cross Regime (50 < 200 DMA)",
        color: "#f87171",
        bg: "rgba(239, 68, 68, 0.12)",
        border: "rgba(239, 68, 68, 0.28)",
        icon: <WarningAmberIcon sx={{ fontSize: 13 }} />,
      };
    }
    return {
      label: "Golden Cross Regime (50 > 200 DMA)",
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.12)",
      border: "rgba(16, 185, 129, 0.28)",
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 13 }} />,
    };
  }, [latestDma50, latestDma200, series.latestValue]);

  // Grid reference lines on the right axis
  const gridLines = useMemo(() => {
    const steps = [0.15, 0.4, 0.65, 0.9];
    return steps.map((pct) => {
      const val = chartMin + valRange * pct;
      const y = padding.top + chartH - pct * chartH;
      return { val, y };
    });
  }, [chartMin, valRange, padding.top, chartH]);

  // Date ticks along the bottom axis
  const dateTicks = useMemo(() => {
    if (coords.length < 2) return [];
    if (coords.length <= 7) {
      return coords.map((c) => ({
        x: c[0],
        label: c[2].slice(5), // "MM-DD" e.g. "10-29"
      }));
    }
    const count = 5;
    const ticks = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.min(
        Math.floor((i / (count - 1)) * (coords.length - 1)),
        coords.length - 1,
      );
      ticks.push({
        x: coords[idx][0],
        label: coords[idx][2].slice(2), // "YY-MM-DD"
      });
    }
    return ticks;
  }, [coords]);

  // Handle snap inspection to a specific drop day
  const handleSelectDropDay = (index: number) => {
    setHoverIndex(index);
    if (svgRef.current) {
      svgRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  if (!series || !series.observations || series.observations.length === 0) {
    return (
      <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Skeleton variant="rectangular" height={280} />
      </Card>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3.5,
        borderColor: "var(--indices-border, rgba(255, 255, 255, 0.12))",
        backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.5))",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Top Header & Range Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 0.5 }}
            >
              <Typography sx={{ fontSize: "1.25rem" }}>
                {series.icon}
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.1rem", sm: "1.3rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                {series.name}
              </Typography>
              <Chip
                label={series.id}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  height: 20,
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "primary.main",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                }}
              />
            </Stack>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
              {series.subcategory} • Source: {series.source} • Frequency:{" "}
              {series.frequency}
            </Typography>
          </Box>

          {/* Time Range Selector */}
          <ButtonGroup
            size="small"
            variant="outlined"
            aria-label="time range selector"
            sx={{
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.4))",
              borderRadius: 2,
              p: 0.3,
              alignSelf: { xs: "stretch", sm: "auto" },
              display: "flex",
              justifyContent: "space-between",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
              "& .MuiButton-root": {
                border: "none",
                borderRadius: 1.5,
                fontWeight: 700,
                fontSize: "0.72rem",
                px: { xs: 0.7, sm: 1.25 },
                py: 0.35,
                minWidth: { xs: "auto", sm: 36 },
                flexShrink: 0,
                color: "text.secondary",
                "&:hover": {
                  backgroundColor:
                    "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.08))",
                  color: "text.primary",
                },
                "&.active": {
                  backgroundColor: "primary.main",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(79, 70, 229, 0.4)",
                },
              },
            }}
          >
            {RANGES.map((rng) => (
              <Button
                key={rng}
                className={selectedRange === rng ? "active" : ""}
                onClick={() => setSelectedRange(rng)}
              >
                {rng}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>

        {/* Real-time Pricing Summary Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 1.5,
            pb: 1.5,
            borderBottom:
              "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <Stack
            direction="row"
            alignItems="baseline"
            spacing={{ xs: 1.5, sm: 2 }}
            flexWrap="wrap"
          >
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.35rem", sm: "1.7rem" },
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(
                displayedValue,
                series.format,
                series.decimals,
              )}
            </Typography>

            <Chip
              icon={
                hoverDiff >= 0 ? (
                  <TrendingUpIcon sx={{ fontSize: 15 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 15 }} />
                )
              }
              label={`${hoverDiff >= 0 ? "+" : ""}${formatSeriesValue(
                hoverDiff,
                series.format,
                series.decimals,
              )} (${hoverDiff >= 0 ? "+" : ""}${hoverDiffPct.toFixed(2)}%)`}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: "0.75rem",
                height: 24,
                backgroundColor:
                  hoverDiff >= 0
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(239, 68, 68, 0.15)",
                color: hoverDiff >= 0 ? "#10b981" : "#ef4444",
                border: `1px solid ${hoverDiff >= 0 ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
              }}
            />

            <Typography
              variant="caption"
              sx={{
                color: isHovering ? "primary.light" : "text.secondary",
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 13 }} />
              {displayedDate} {isHovering && "(Hover Inspection)"}
            </Typography>
          </Stack>

          {/* Golden/Death Cross Signal Pill */}
          {trendSignal && (
            <Chip
              icon={trendSignal.icon}
              label={trendSignal.label}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: "0.7rem",
                height: 24,
                backgroundColor: trendSignal.bg,
                color: trendSignal.color,
                border: `1px solid ${trendSignal.border}`,
              }}
            />
          )}
        </Box>

        {/* Technical Indicators Control Toolbar & Live Overlays Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1.5,
            mb: 2,
            p: { xs: 1, sm: 1.2 },
            borderRadius: 2,
            backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.45))",
            border: "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          {/* Indicator Toggles */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "text.secondary",
                fontSize: "0.68rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mr: 0.5,
              }}
            >
              <LayersIcon sx={{ fontSize: 14 }} /> Indicators:
            </Typography>

            {/* 50 DMA Toggle */}
            <Tooltip
              title={
                technicals.hasEnough50
                  ? "50-Day Simple Moving Average (Intermediate Momentum)"
                  : "Insufficient historical data (< 50 trading days)"
              }
              arrow
            >
              <span>
                <Chip
                  clickable={technicals.hasEnough50}
                  disabled={!technicals.hasEnough50}
                  onClick={() => setShow50Dma((prev) => !prev)}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                      }}
                    >
                      <Box
                        sx={{
                          width: 14,
                          height: 3,
                          borderRadius: 1,
                          backgroundColor: "#f59e0b",
                        }}
                      />
                      <span>50 DMA</span>
                      {latestDma50 !== undefined && (
                        <span style={{ opacity: 0.9, fontSize: "0.68rem" }}>
                          ({formatSeriesValue(
                            latestDma50,
                            series.format,
                            series.decimals,
                          )})
                        </span>
                      )}
                    </Box>
                  }
                  size="small"
                  variant={show50Dma ? "filled" : "outlined"}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: 26,
                    backgroundColor: show50Dma
                      ? "rgba(245, 158, 11, 0.18)"
                      : "transparent",
                    color: show50Dma ? "#fbbf24" : "text.secondary",
                    borderColor: show50Dma
                      ? "#f59e0b"
                      : "rgba(255, 255, 255, 0.15)",
                    "&:hover": {
                      backgroundColor: show50Dma
                        ? "rgba(245, 158, 11, 0.28)"
                        : "rgba(255, 255, 255, 0.06)",
                    },
                  }}
                />
              </span>
            </Tooltip>

            {/* 200 DMA Toggle */}
            <Tooltip
              title={
                technicals.hasEnough200
                  ? "200-Day Simple Moving Average (Long-Term Structural Trend)"
                  : "Insufficient historical data (< 200 trading days)"
              }
              arrow
            >
              <span>
                <Chip
                  clickable={technicals.hasEnough200}
                  disabled={!technicals.hasEnough200}
                  onClick={() => setShow200Dma((prev) => !prev)}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                      }}
                    >
                      <Box
                        sx={{
                          width: 14,
                          height: 3,
                          borderRadius: 1,
                          backgroundColor: "#a855f7",
                        }}
                      />
                      <span>200 DMA</span>
                      {latestDma200 !== undefined && (
                        <span style={{ opacity: 0.9, fontSize: "0.68rem" }}>
                          ({formatSeriesValue(
                            latestDma200,
                            series.format,
                            series.decimals,
                          )})
                        </span>
                      )}
                    </Box>
                  }
                  size="small"
                  variant={show200Dma ? "filled" : "outlined"}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    height: 26,
                    backgroundColor: show200Dma
                      ? "rgba(168, 85, 247, 0.18)"
                      : "transparent",
                    color: show200Dma ? "#c084fc" : "text.secondary",
                    borderColor: show200Dma
                      ? "#a855f7"
                      : "rgba(255, 255, 255, 0.15)",
                    "&:hover": {
                      backgroundColor: show200Dma
                        ? "rgba(168, 85, 247, 0.28)"
                        : "rgba(255, 255, 255, 0.06)",
                    },
                  }}
                />
              </span>
            </Tooltip>

            {/* Big Drops Toggle */}
            <Tooltip
              title="Show days with single-day decline of ≥ 1.5% in the selected range"
              arrow
            >
              <Chip
                clickable
                onClick={() => setShowBigDrops((prev) => !prev)}
                icon={
                  <WarningAmberIcon
                    sx={{
                      fontSize: "14px !important",
                      color: showBigDrops ? "#ef4444" : "inherit",
                    }}
                  />
                }
                label={`Big Drops (${bigDropEvents.length})`}
                size="small"
                variant={showBigDrops ? "filled" : "outlined"}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  height: 26,
                  backgroundColor: showBigDrops
                    ? "rgba(239, 68, 68, 0.18)"
                    : "transparent",
                  color: showBigDrops ? "#f87171" : "text.secondary",
                  borderColor: showBigDrops
                    ? "#ef4444"
                    : "rgba(255, 255, 255, 0.15)",
                  "&:hover": {
                    backgroundColor: showBigDrops
                      ? "rgba(239, 68, 68, 0.28)"
                      : "rgba(255, 255, 255, 0.06)",
                  },
                }}
              />
            </Tooltip>
          </Stack>

          {/* Quick Info & Guide Toggle */}
          <Button
            size="small"
            startIcon={<InfoOutlinedIcon sx={{ fontSize: 14 }} />}
            onClick={() => setShowGuide((prev) => !prev)}
            sx={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "none",
              color: "text.secondary",
              py: 0.3,
              px: 1,
              borderRadius: 1.5,
              "&:hover": { color: "primary.light" },
            }}
          >
            {showGuide ? "Hide Guide" : "Indicator Guide"}
          </Button>
        </Box>

        {/* Collapsible Educational Guide */}
        <Collapse in={showGuide} sx={{ mb: 2 }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2.5,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              borderColor: "rgba(99, 102, 241, 0.25)",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                color: "primary.light",
                fontSize: "0.8rem",
                mb: 1,
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
              <InfoOutlinedIcon sx={{ fontSize: 16 }} />
              Understanding Technical Indicators &amp; Big Drop Signals
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(3, 1fr)",
                },
                gap: 2,
                fontSize: "0.75rem",
                color: "text.secondary",
                lineHeight: 1.5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#fbbf24",
                    fontSize: "0.74rem",
                    mb: 0.3,
                  }}
                >
                  🟠 50-Day Moving Average (50 DMA)
                </Typography>
                Reflects medium-term momentum over ~10 calendar weeks. Trading
                above indicates firm intermediate trend; slipping below signals
                near-term exhaustion or consolidation.
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#c084fc",
                    fontSize: "0.74rem",
                    mb: 0.3,
                  }}
                >
                  🟣 200-Day Moving Average (200 DMA)
                </Typography>
                The institutional gold standard for primary long-term market
                regimes. Benchmarks above the 200 DMA are in secular bull markets,
                while trading below warns of structural bear market headwinds.
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: "#f87171",
                    fontSize: "0.74rem",
                    mb: 0.3,
                  }}
                >
                  🔴 Big Drop Days (≥ 1.5% Decline)
                </Typography>
                Marks high-volume capitulation, geopolitical shocks, or macro
                repricing days. Often signal panic extremes, support retests, or
                dynamic dip-buying inflection points.
              </Box>
            </Box>
          </Paper>
        </Collapse>

        {/* Dynamic Inspection HUD Bar (Updates smoothly during mouse crosshair hover) */}
        {isHovering && (
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 1.5,
              py: 0.8,
              px: 1.5,
              borderRadius: 2,
              backgroundColor: activeBigDrop
                ? "rgba(239, 68, 68, 0.12)"
                : "rgba(99, 102, 241, 0.08)",
              borderColor: activeBigDrop
                ? "rgba(239, 68, 68, 0.35)"
                : "rgba(99, 102, 241, 0.25)",
            }}
          >
            {/* Hover Date */}
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.78rem",
                color: "text.primary",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 13, color: "primary.light" }} />
              {hoverDate}
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ height: 16, my: "auto" }} />

            {/* Price on Date */}
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.78rem",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Close:{" "}
              <strong>
                {formatSeriesValue(
                  displayedValue,
                  series.format,
                  series.decimals,
                )}
              </strong>
            </Typography>

            {/* Daily Return */}
            {hoverDailyStats && (
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  fontVariantNumeric: "tabular-nums",
                  color:
                    hoverDailyStats.change >= 0 ? "#10b981" : "#ef4444",
                }}
              >
                Day Return: {hoverDailyStats.change >= 0 ? "+" : ""}
                {hoverDailyStats.changePct.toFixed(2)}% (
                {hoverDailyStats.change >= 0 ? "+" : ""}
                {formatSeriesValue(
                  hoverDailyStats.change,
                  series.format,
                  series.decimals,
                )}
                )
              </Typography>
            )}

            {/* 50 DMA at Date */}
            {show50Dma && hoverDma50 !== undefined && (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  color: "#fbbf24",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                50 DMA:{" "}
                {formatSeriesValue(
                  hoverDma50,
                  series.format,
                  series.decimals,
                )}{" "}
                (
                {displayedValue >= hoverDma50 ? "+" : ""}
                {(
                  ((displayedValue - hoverDma50) / hoverDma50) *
                  100
                ).toFixed(1)}
                %)
              </Typography>
            )}

            {/* 200 DMA at Date */}
            {show200Dma && hoverDma200 !== undefined && (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  color: "#c084fc",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                200 DMA:{" "}
                {formatSeriesValue(
                  hoverDma200,
                  series.format,
                  series.decimals,
                )}{" "}
                (
                {displayedValue >= hoverDma200 ? "+" : ""}
                {(
                  ((displayedValue - hoverDma200) / hoverDma200) *
                  100
                ).toFixed(1)}
                %)
              </Typography>
            )}

            {/* Big Drop Alert Badge if this day was a severe selloff */}
            {activeBigDrop && (
              <Chip
                icon={<ArrowDownwardIcon sx={{ fontSize: "14px !important" }} />}
                label={`Big Drop Alert: ${activeBigDrop.changePct.toFixed(2)}%`}
                size="small"
                sx={{
                  height: 22,
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
                  ml: "auto",
                }}
              />
            )}
          </Paper>
        )}

        {/* Interactive Chart Canvas with Clean HTML Axis Overlays */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 220, sm: 275 },
            userSelect: "none",
          }}
        >
          {/* Plot Area Container */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 60,
              bottom: 24,
              cursor: "crosshair",
              borderRight: "1px solid",
              borderBottom: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              ref={svgRef}
              viewBox={`0 0 ${plotW} ${plotH}`}
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%", display: "block" }}
            >
              <defs>
                <linearGradient id={chartGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity={0.38} />
                  <stop
                    offset="70%"
                    stopColor={strokeColor}
                    stopOpacity={0.06}
                  />
                  <stop
                    offset="100%"
                    stopColor={strokeColor}
                    stopOpacity={0.0}
                  />
                </linearGradient>
                <filter
                  id={`glow-${chartGradId}`}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Horizontal Grid Lines */}
              {gridLines.map((line, idx) => (
                <line
                  key={idx}
                  x1={0}
                  y1={line.y}
                  x2={plotW}
                  y2={line.y}
                  stroke={theme.palette.divider}
                  strokeDasharray="3 3"
                  strokeWidth="0.8"
                  opacity={0.5}
                />
              ))}

              {/* Filled Gradient Area under Main Price */}
              <path d={areaD} fill={`url(#${chartGradId})`} />

              {/* 200 DMA Curve (Royal Violet) */}
              {show200Dma && dma200PathD && (
                <path
                  d={dma200PathD}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="2.0"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.88}
                />
              )}

              {/* 50 DMA Curve (Amber Gold) */}
              {show50Dma && dma50PathD && (
                <path
                  d={dma50PathD}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.0"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.92}
                />
              )}

              {/* Glowing Main Benchmark Price Line */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#glow-${chartGradId})`}
              />

              {/* Big Drop Event Markers on the Price Curve */}
              {showBigDrops &&
                bigDropEvents.map((drop) => {
                  const isCurrent =
                    activePoint && activePoint[2] === drop.date;
                  return (
                    <g
                      key={drop.date}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoverIndex(drop.index);
                      }}
                    >
                      {/* Pulse Halo */}
                      <circle
                        cx={drop.x}
                        cy={drop.y}
                        r={isCurrent ? 10 : 7}
                        fill="rgba(239, 68, 68, 0.28)"
                      />
                      {/* Core Indicator Circle */}
                      <circle
                        cx={drop.x}
                        cy={drop.y}
                        r={isCurrent ? 5.5 : 4}
                        fill="#ef4444"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      {/* Subtle downward marker triangle */}
                      <polygon
                        points={`${drop.x - 3.5},${drop.y - 8} ${drop.x + 3.5},${drop.y - 8} ${drop.x},${drop.y - 4}`}
                        fill="#ef4444"
                      />
                    </g>
                  );
                })}

              {/* Hover Crosshairs & Point Markers */}
              {activePoint && isHovering && (
                <g>
                  {/* Vertical Crosshair Line */}
                  <line
                    x1={activePoint[0]}
                    y1={0}
                    x2={activePoint[0]}
                    y2={plotH}
                    stroke={theme.palette.text.primary}
                    strokeDasharray="3 3"
                    strokeWidth="1.2"
                    opacity={0.65}
                  />

                  {/* Horizontal Crosshair Line to Right Axis */}
                  <line
                    x1={0}
                    y1={activePoint[1]}
                    x2={plotW}
                    y2={activePoint[1]}
                    stroke={theme.palette.text.primary}
                    strokeDasharray="3 3"
                    strokeWidth="1"
                    opacity={0.5}
                  />

                  {/* Marker Circle on 200 DMA */}
                  {show200Dma && hoverDma200Y !== null && (
                    <circle
                      cx={activePoint[0]}
                      cy={hoverDma200Y}
                      r="4.5"
                      fill="#a855f7"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Marker Circle on 50 DMA */}
                  {show50Dma && hoverDma50Y !== null && (
                    <circle
                      cx={activePoint[0]}
                      cy={hoverDma50Y}
                      r="4.5"
                      fill="#f59e0b"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Primary Marker Circles on Price Point */}
                  <circle
                    cx={activePoint[0]}
                    cy={activePoint[1]}
                    r="7"
                    fill={glowColor}
                  />
                  <circle
                    cx={activePoint[0]}
                    cy={activePoint[1]}
                    r="4.5"
                    fill="#ffffff"
                    stroke={strokeColor}
                    strokeWidth="2.2"
                  />
                </g>
              )}
            </svg>
          </Box>

          {/* Right Y-Axis HTML Overlay (Proper, Crisp Font) */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 24,
              width: 60,
              pointerEvents: "none",
            }}
          >
            {gridLines.map((line, idx) => (
              <Typography
                key={idx}
                sx={{
                  position: "absolute",
                  top: `${(line.y / plotH) * 100}%`,
                  transform: "translateY(-50%)",
                  left: 6,
                  color: "text.secondary",
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                  fontFamily:
                    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                }}
              >
                {formatAxisValue(line.val, series.format)}
              </Typography>
            ))}

            {/* Hover Dynamic Price Badge */}
            {activePoint && isHovering && (
              <Box
                sx={{
                  position: "absolute",
                  top: `${(activePoint[1] / plotH) * 100}%`,
                  transform: "translateY(-50%)",
                  left: 3,
                  right: 3,
                  backgroundColor: strokeColor,
                  color: "#ffffff",
                  borderRadius: "3px",
                  py: "2px",
                  px: "3px",
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1.2,
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.35)",
                  zIndex: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {formatAxisValue(activePoint[3], series.format)}
              </Box>
            )}
          </Box>

          {/* Bottom X-Axis HTML Overlay (Proper, Crisp Font) */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              right: 60,
              bottom: 0,
              height: 24,
              pointerEvents: "none",
            }}
          >
            {dateTicks.map((tick, idx) => {
              let transform = "translateX(-50%)";
              if (idx === 0) transform = "translateX(0%)";
              else if (idx === dateTicks.length - 1)
                transform = "translateX(-100%)";

              return (
                <Typography
                  key={idx}
                  sx={{
                    position: "absolute",
                    left: `${(tick.x / plotW) * 100}%`,
                    transform,
                    top: 5,
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                    lineHeight: 1,
                    fontFamily:
                      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tick.label}
                </Typography>
              );
            })}
          </Box>
        </Box>

        {/* Statistical Range Footer Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(4, 1fr)",
            },
            gap: 1.5,
            mt: 2.5,
            pt: 2,
            borderTop:
              "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              Period Low
            </Typography>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.88rem",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(min, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              Period High
            </Typography>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.88rem",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(max, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              Period Start ({startDate})
            </Typography>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: "0.88rem",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(startValue, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.2,
              borderRadius: 2,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.7rem",
              }}
            >
              52-Week Range
            </Typography>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.8rem",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatSeriesValue(series.low52, series.format, series.decimals)}{" "}
              –{" "}
              {formatSeriesValue(
                series.high52,
                series.format,
                series.decimals,
              )}
            </Typography>
          </Paper>
        </Box>

        {/* Significant Drop Days Panel (Actionable inspection of worst selloff sessions in period) */}
        <Box sx={{ mt: 2.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1.5,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <WarningAmberIcon sx={{ color: "#ef4444", fontSize: 18 }} />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Notable Selloff &amp; Big Drop Days ({bigDropEvents.length})
              </Typography>
              <Chip
                label="Decline ≥ 1.5%"
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  color: "#ef4444",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                }}
              />
            </Stack>

            <Button
              size="small"
              onClick={() => setShowDropPanel((prev) => !prev)}
              sx={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "none",
                color: "text.secondary",
              }}
            >
              {showDropPanel ? "Collapse" : "Expand"}
            </Button>
          </Box>

          <Collapse in={showDropPanel}>
            {bigDropEvents.length > 0 ? (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 1.5,
                }}
              >
                {[...bigDropEvents]
                  .sort((a, b) => a.changePct - b.changePct)
                  .slice(0, 9)
                  .map((drop) => {
                    const isSelected =
                      activePoint && activePoint[2] === drop.date;
                    const dropVs50 =
                      drop.dma50 !== undefined
                        ? drop.price >= drop.dma50
                          ? "Above 50 DMA"
                          : "Below 50 DMA"
                        : null;
                    const dropVs200 =
                      drop.dma200 !== undefined
                        ? drop.price >= drop.dma200
                          ? "Above 200 DMA"
                          : "Below 200 DMA"
                        : null;

                    return (
                      <Paper
                        key={drop.date}
                        variant="outlined"
                        onClick={() => handleSelectDropDay(drop.index)}
                        sx={{
                          p: 1.25,
                          borderRadius: 2.5,
                          cursor: "pointer",
                          backgroundColor: isSelected
                            ? "rgba(239, 68, 68, 0.14)"
                            : "var(--indices-subtle-bg, rgba(15, 23, 42, 0.35))",
                          borderColor: isSelected
                            ? "#ef4444"
                            : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                          transition:
                            "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            borderColor: "#ef4444",
                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 0.75 }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: "0.78rem",
                              color: isSelected
                                ? "#ffffff"
                                : "text.primary",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <CalendarTodayIcon
                              sx={{ fontSize: 13, color: "text.secondary" }}
                            />
                            {drop.date}
                          </Typography>
                          <Chip
                            label={`${drop.changePct.toFixed(2)}%`}
                            size="small"
                            sx={{
                              height: 20,
                              fontWeight: 800,
                              fontSize: "0.7rem",
                              backgroundColor: "rgba(239, 68, 68, 0.2)",
                              color: "#ef4444",
                              border: "1px solid rgba(239, 68, 68, 0.35)",
                            }}
                          />
                        </Stack>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="baseline"
                          sx={{ mb: 0.5 }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.7rem",
                            }}
                          >
                            Close:{" "}
                            <strong>
                              {formatSeriesValue(
                                drop.price,
                                series.format,
                                series.decimals,
                              )}
                            </strong>
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 700,
                              color: "#f87171",
                              fontSize: "0.7rem",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {formatSeriesValue(
                              drop.change,
                              series.format,
                              series.decimals,
                            )}
                          </Typography>
                        </Stack>

                        {/* Technical posture tags on drop date */}
                        <Stack
                          direction="row"
                          spacing={0.5}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          {dropVs50 && (
                            <Chip
                              label={dropVs50}
                              size="small"
                              sx={{
                                height: 16,
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                backgroundColor:
                                  dropVs50 === "Above 50 DMA"
                                    ? "rgba(245, 158, 11, 0.12)"
                                    : "rgba(239, 68, 68, 0.1)",
                                color:
                                  dropVs50 === "Above 50 DMA"
                                    ? "#fbbf24"
                                    : "#f87171",
                              }}
                            />
                          )}
                          {dropVs200 && (
                            <Chip
                              label={dropVs200}
                              size="small"
                              sx={{
                                height: 16,
                                fontSize: "0.62rem",
                                fontWeight: 700,
                                backgroundColor:
                                  dropVs200 === "Above 200 DMA"
                                    ? "rgba(168, 85, 247, 0.12)"
                                    : "rgba(239, 68, 68, 0.1)",
                                color:
                                  dropVs200 === "Above 200 DMA"
                                    ? "#c084fc"
                                    : "#f87171",
                              }}
                            />
                          )}
                        </Stack>
                      </Paper>
                    );
                  })}
              </Box>
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor:
                    "var(--indices-subtle-bg, rgba(15, 23, 42, 0.25))",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontSize: "0.78rem" }}
                >
                  ✨ No severe single-day drops (≥ 1.5%) were recorded in the{" "}
                  <strong>{selectedRange}</strong> time window. The benchmark
                  traded with low downside volatility.
                </Typography>
              </Paper>
            )}
          </Collapse>
        </Box>

        {/* Economic & Market Significance Note */}
        <Box
          sx={{
            mt: 2.5,
            p: 1.5,
            borderRadius: 2,
            backgroundColor:
              "var(--indices-subtle-bg, rgba(99, 102, 241, 0.06))",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "0.7rem",
              color: "primary.light",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 0.4,
            }}
          >
            Market Significance &amp; Investor Context
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "0.78rem",
              lineHeight: 1.55,
            }}
          >
            {series.marketSignificance} {series.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
