import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useId, useMemo, useRef, useState } from "react";
import {
  filterObservationsByRange,
  TimeRange,
} from "../../api/fredApi";
import { FredSeriesData } from "../../data/fredSeriesData";

export interface FredSeriesChartProps {
  series: FredSeriesData;
  initialRange?: TimeRange;
}

const RANGES: TimeRange[] = ["1M", "3M", "6M", "YTD", "1Y", "5Y", "MAX"];

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

export const FredSeriesChart: React.FC<FredSeriesChartProps> = ({
  series,
  initialRange = "1Y",
}) => {
  const theme = useTheme();
  const [selectedRange, setSelectedRange] = useState<TimeRange>(initialRange);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const chartGradId = useId();

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

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 280;
  const padding = { top: 20, right: 30, bottom: 30, left: 20 };
  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  // Coordinate mapping
  const valRange = max - min || 1;
  const coords = useMemo(() => {
    if (points.length < 2) return [];
    return points.map((p, idx) => {
      const x =
        padding.left + (idx / (points.length - 1)) * chartW;
      const y =
        padding.top + chartH - ((p[1] - min) / valRange) * chartH;
      return [x, y, p[0], p[1]] as [number, number, string, number];
    });
  }, [points, chartW, chartH, padding.left, padding.top, min, valRange]);

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
    const bottomY = padding.top + chartH;
    return `${pathD} L ${coords[coords.length - 1][0].toFixed(1)} ${bottomY} L ${coords[0][0].toFixed(1)} ${bottomY} Z`;
  }, [pathD, coords, padding.top, chartH]);

  // Hover detection
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || coords.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeX = (mouseX / rect.width) * svgWidth;

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

  // Grid reference lines (3 horizontal lines)
  const gridLines = useMemo(() => {
    const steps = [0.25, 0.5, 0.75];
    return steps.map((pct) => {
      const val = min + valRange * pct;
      const y = padding.top + chartH - pct * chartH;
      return { val, y };
    });
  }, [min, valRange, padding.top, chartH]);

  if (!series || !series.observations || series.observations.length === 0) {
    return (
      <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Skeleton variant="rectangular" height={260} />
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
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
              <Typography sx={{ fontSize: "1.4rem" }}>{series.icon}</Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.2rem", sm: "1.45rem" },
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
                  fontSize: "0.72rem",
                  height: 22,
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "primary.main",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                }}
              />
            </Stack>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.8rem" }}
            >
              {series.subcategory} • Source: {series.source} • Frequency: {series.frequency}
            </Typography>
          </Box>

          {/* Time Range Selector */}
          <ButtonGroup
            size="small"
            variant="outlined"
            aria-label="time range selector"
            sx={{
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.4))",
              borderRadius: 2,
              p: 0.3,
              alignSelf: { xs: "stretch", sm: "auto" },
              display: "flex",
              justifyContent: "space-between",
              "& .MuiButton-root": {
                border: "none",
                borderRadius: 1.5,
                fontWeight: 700,
                fontSize: "0.75rem",
                px: { xs: 1, sm: 1.5 },
                py: 0.5,
                color: "text.secondary",
                "&:hover": {
                  backgroundColor: "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.08))",
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
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            pb: 1.5,
            borderBottom: "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem" },
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatSeriesValue(displayedValue, series.format, series.decimals)}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Chip
              icon={
                hoverDiff >= 0 ? (
                  <TrendingUpIcon sx={{ fontSize: 16 }} />
                ) : (
                  <TrendingDownIcon sx={{ fontSize: 16 }} />
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
                fontSize: "0.82rem",
                height: 26,
                backgroundColor: hoverDiff >= 0 ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
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
        </Box>

        {/* SVG Interactive Chart Canvas */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 220, sm: 280 },
            cursor: "crosshair",
            userSelect: "none",
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
            style={{ width: "100%", height: "100%", display: "block" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id={chartGradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
                <stop offset="70%" stopColor={strokeColor} stopOpacity={0.08} />
                <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
              </linearGradient>
              <filter id={`glow-${chartGradId}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid Lines */}
            {gridLines.map((line, idx) => (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={line.y}
                  x2={svgWidth - padding.right}
                  y2={line.y}
                  stroke={theme.palette.divider}
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={svgWidth - padding.right + 6}
                  y={line.y + 4}
                  fill={theme.palette.text.secondary}
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {formatSeriesValue(line.val, series.format, series.decimals === 0 ? 0 : 1)}
                </text>
              </g>
            ))}

            {/* Filled Gradient Area */}
            <path d={areaD} fill={`url(#${chartGradId})`} />

            {/* Glowing Main Line */}
            <path
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${chartGradId})`}
            />

            {/* Hover Crosshair & Interactive Marker */}
            {activePoint && isHovering && (
              <g>
                <line
                  x1={activePoint[0]}
                  y1={padding.top}
                  x2={activePoint[0]}
                  y2={padding.top + chartH}
                  stroke={theme.palette.text.primary}
                  strokeDasharray="3 3"
                  strokeWidth="1.2"
                  opacity={0.65}
                />
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
                  strokeWidth="2.5"
                />
              </g>
            )}
          </svg>
        </Box>

        {/* Statistical Range Footer */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
            gap: 1.5,
            mt: 2.5,
            pt: 2,
            borderTop: "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 1.25,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Period Low
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(min, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.25,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Period High
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(max, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.25,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              Period Start ({startDate})
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(startValue, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1.25,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
              52-Week Range
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(series.low52, series.format, series.decimals)} – {formatSeriesValue(series.high52, series.format, series.decimals)}
            </Typography>
          </Paper>
        </Box>

        {/* Economic & Market Significance Note */}
        <Box
          sx={{
            mt: 2,
            p: 1.75,
            borderRadius: 2.5,
            backgroundColor: "var(--indices-subtle-bg, rgba(99, 102, 241, 0.06))",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 800,
              color: "primary.light",
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 0.5,
            }}
          >
            Macroeconomic Significance & Investor Context
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
            {series.marketSignificance} {series.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
