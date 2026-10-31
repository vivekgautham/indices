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

export const FredSeriesChart: React.FC<FredSeriesChartProps> = ({
  series,
  initialRange = "5D",
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

  // Plot dimensions for SVG coordinates
  const plotW = 800;
  const plotH = 240;
  const padding = { top: 12, right: 8, bottom: 10, left: 8 };
  const chartW = plotW - padding.left - padding.right;
  const chartH = plotH - padding.top - padding.bottom;

  // Coordinate mapping
  const valRange = max - min || 1;
  const coords = useMemo(() => {
    if (points.length < 2) return [];
    return points.map((p, idx) => {
      const x = padding.left + (idx / (points.length - 1)) * chartW;
      const y = padding.top + chartH - ((p[1] - min) / valRange) * chartH;
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
    const bottomY = plotH;
    return `${pathD} L ${coords[coords.length - 1][0].toFixed(1)} ${bottomY} L ${coords[0][0].toFixed(1)} ${bottomY} Z`;
  }, [pathD, coords, plotH]);

  // Hover detection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => {
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

  // Grid reference lines on the right axis
  const gridLines = useMemo(() => {
    const steps = [0.15, 0.4, 0.65, 0.9];
    return steps.map((pct) => {
      const val = min + valRange * pct;
      const y = padding.top + chartH - pct * chartH;
      return { val, y };
    });
  }, [min, valRange, padding.top, chartH]);

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
              <Typography sx={{ fontSize: "1.25rem" }}>{series.icon}</Typography>
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
                fontSize: "0.72rem",
                px: { xs: 0.8, sm: 1.25 },
                py: 0.35,
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
              fontSize: { xs: "1.35rem", sm: "1.65rem" },
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

        {/* Interactive Chart Canvas with Clean HTML Axis Overlays */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 200, sm: 250 },
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

              {/* Filled Gradient Area */}
              <path d={areaD} fill={`url(#${chartGradId})`} />

              {/* Glowing Main Line */}
              <path
                d={pathD}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#glow-${chartGradId})`}
              />

              {/* Hover Crosshairs */}
              {activePoint && isHovering && (
                <g>
                  {/* Vertical Crosshair */}
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

                  {/* Horizontal Crosshair to Right Axis */}
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

                  {/* Marker Circles on Data Point */}
                  <circle
                    cx={activePoint[0]}
                    cy={activePoint[1]}
                    r="6.5"
                    fill={glowColor}
                  />
                  <circle
                    cx={activePoint[0]}
                    cy={activePoint[1]}
                    r="4"
                    fill="#ffffff"
                    stroke={strokeColor}
                    strokeWidth="2"
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
                  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
              else if (idx === dateTicks.length - 1) transform = "translateX(-100%)";

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
                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tick.label}
                </Typography>
              );
            })}
          </Box>
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
              p: 1,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.7rem" }}>
              Period Low
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "0.88rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(min, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.7rem" }}>
              Period High
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "0.88rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(max, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.7rem" }}>
              Period Start ({startDate})
            </Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "0.88rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(startValue, series.format, series.decimals)}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 1,
              borderRadius: 2,
              backgroundColor: "var(--indices-subtle-bg, rgba(15, 23, 42, 0.3))",
            }}
          >
            <Typography sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.7rem" }}>
              52-Week Range
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", fontVariantNumeric: "tabular-nums" }}>
              {formatSeriesValue(series.low52, series.format, series.decimals)} – {formatSeriesValue(series.high52, series.format, series.decimals)}
            </Typography>
          </Paper>
        </Box>

        {/* Economic & Market Significance Note */}
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: "var(--indices-subtle-bg, rgba(99, 102, 241, 0.06))",
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
          <Typography sx={{ color: "text.secondary", fontSize: "0.78rem", lineHeight: 1.55 }}>
            {series.marketSignificance} {series.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
