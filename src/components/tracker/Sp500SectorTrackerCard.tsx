import BarChartIcon from "@mui/icons-material/BarChart";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PieChartIcon from "@mui/icons-material/PieChart";
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
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  SP500_SECTORS,
  Sp500SectorCombined,
  Sp500SectorMarketData,
} from "../../data/sp500SectorsData";
import { getStockAnalysisEtfUrl } from "../../utils/stockAnalysis";

export interface Sp500SectorTrackerCardProps {
  sectors?: Record<string, Sp500SectorMarketData>;
  updatedAt?: string;
}

function formatMarketDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

type SortOption = "weight" | "performance" | "name";

export const Sp500SectorTrackerCard: React.FC<Sp500SectorTrackerCardProps> = ({
  sectors = {},
  updatedAt,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>("weight");
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  const [hoveredPieSectorId, setHoveredPieSectorId] = useState<string | null>(
    null,
  );

  // Determine latest market date across sector observations
  const latestMarketDate = useMemo(() => {
    for (const s of Object.values(sectors)) {
      if (s?.latestDate) return s.latestDate;
    }
    return undefined;
  }, [sectors]);

  const formattedMarketDate = useMemo(
    () => formatMarketDate(latestMarketDate),
    [latestMarketDate],
  );

  // Merge static definitions with live/fetched market data
  const combinedSectors: Sp500SectorCombined[] = useMemo(() => {
    return SP500_SECTORS.map((def) => ({
      ...def,
      marketData: sectors[def.id],
    }));
  }, [sectors]);

  // Sorted sectors
  const displayedSectors = useMemo(() => {
    return [...combinedSectors].sort((a, b) => {
      if (sortBy === "performance") {
        const changeA = a.marketData?.changePct ?? 0;
        const changeB = b.marketData?.changePct ?? 0;
        return changeB - changeA;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      // Default: weight descending
      return b.weight - a.weight;
    });
  }, [combinedSectors, sortBy]);

  // Overall KPIs: Top gainer, top laggard, and top-3 weight concentration
  const kpis = useMemo(() => {
    const sortedByReturn = [...combinedSectors].sort((a, b) => {
      const aRet = a.marketData?.changePct ?? 0;
      const bRet = b.marketData?.changePct ?? 0;
      return bRet - aRet;
    });

    const topGainer = sortedByReturn[0];
    const topLaggard = sortedByReturn[sortedByReturn.length - 1];

    const sortedByWeight = [...combinedSectors].sort(
      (a, b) => b.weight - a.weight,
    );
    const top3Weight = sortedByWeight
      .slice(0, 3)
      .reduce((acc, curr) => acc + curr.weight, 0);

    return { topGainer, topLaggard, top3Weight, sortedByWeight };
  }, [combinedSectors]);

  // Pre-calculate geometric paths for the Pie/Donut Chart
  const pieSlices = useMemo(() => {
    const total =
      kpis.sortedByWeight.reduce((acc, s) => acc + s.weight, 0) || 100;
    let currentAngle = -90;
    const cx = 160;
    const cy = 160;
    const outerR = 135;
    const innerR = 82;

    return kpis.sortedByWeight.map((sec) => {
      const sweep = (sec.weight / total) * 360;
      const isHovered = hoveredPieSectorId === sec.id;
      const R = isHovered ? outerR + 6 : outerR;
      const r = innerR;

      const startRad = (currentAngle * Math.PI) / 180;
      const endRad = ((currentAngle + sweep) * Math.PI) / 180;

      const x1 = cx + R * Math.cos(startRad);
      const y1 = cy + R * Math.sin(startRad);
      const x2 = cx + R * Math.cos(endRad);
      const y2 = cy + R * Math.sin(endRad);

      const x3 = cx + r * Math.cos(endRad);
      const y3 = cy + r * Math.sin(endRad);
      const x4 = cx + r * Math.cos(startRad);
      const y4 = cy + r * Math.sin(startRad);

      const largeArc = sweep > 180 ? 1 : 0;
      const pathD = `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${R} ${R} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${r} ${r} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;

      currentAngle += sweep;
      return {
        sec,
        pathD,
        isHovered,
      };
    });
  }, [kpis.sortedByWeight, hoveredPieSectorId]);

  const activeHoveredSector = useMemo(() => {
    if (!hoveredPieSectorId) return null;
    return combinedSectors.find((s) => s.id === hoveredPieSectorId) || null;
  }, [hoveredPieSectorId, combinedSectors]);

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
        {/* Header: Title, Group Filters & Sort Options */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          gap={2}
          sx={{ mb: 2.5 }}
        >
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
              sx={{ mb: 0.5 }}
            >
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
                <span>🏢</span>
                S&amp;P 500 Sector Composition Tracker
              </Typography>

              <Chip
                label="11 GICS Sectors"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  backgroundColor: "rgba(99, 102, 241, 0.15)",
                  color: "primary.main",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                }}
              />

              {formattedMarketDate && (
                <Chip
                  label={`Close: ${formattedMarketDate}`}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    color: "#10b981",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                />
              )}
            </Stack>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: "0.82rem" }}
            >
              Weights, daily performance as of{" "}
              <strong style={{ color: "inherit" }}>
                {formattedMarketDate || "latest market close"}
              </strong>
              {updatedAt && (
                <span>
                  {" "}
                  • Synced: {new Date(updatedAt).toLocaleDateString()}
                </span>
              )}
              , and tracking SPDR ETFs for the 11 S&amp;P 500 industry sectors.
            </Typography>
          </Box>

          {/* Sort Controls */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.25}
            flexWrap="wrap"
          >
            <ButtonGroup
              size="small"
              variant="outlined"
              aria-label="Sector sort options"
              sx={{
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                borderRadius: 2,
                "& .MuiButton-root": {
                  px: 1,
                  py: 0.35,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  borderColor:
                    "var(--indices-border, rgba(255, 255, 255, 0.12))",
                  color: "text.secondary",
                  "&.active": {
                    color: "#ffffff",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    borderColor: "#10b981",
                  },
                },
              }}
            >
              <Button
                className={sortBy === "weight" ? "active" : ""}
                onClick={() => setSortBy("weight")}
              >
                Weight
              </Button>
              <Button
                className={sortBy === "performance" ? "active" : ""}
                onClick={() => setSortBy("performance")}
              >
                Return %
              </Button>
              <Button
                className={sortBy === "name" ? "active" : ""}
                onClick={() => setSortBy("name")}
              >
                A-Z
              </Button>
            </ButtonGroup>
          </Stack>
        </Stack>

        {/* Visual S&P 500 Sector Allocation: Pie Chart / Stacked Bar */}
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={1}
            sx={{ mb: 1.25 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  letterSpacing: "-0.01em",
                }}
              >
                🥧 S&amp;P 500 Market Cap Proportional Allocation
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  fontSize: "0.74rem",
                }}
              >
                (Top 3 ={" "}
                <strong style={{ color: "#ffffff" }}>
                  {kpis.top3Weight.toFixed(1)}%
                </strong>{" "}
                of Index)
              </Typography>
            </Stack>

            {/* View Switcher: Pie vs Bar */}
            <ButtonGroup
              size="small"
              variant="outlined"
              aria-label="Allocation chart format"
              sx={{
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                borderRadius: 2,
                "& .MuiButton-root": {
                  px: 1,
                  py: 0.3,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  borderColor:
                    "var(--indices-border, rgba(255, 255, 255, 0.12))",
                  color: "text.secondary",
                  "&.active": {
                    color: "#ffffff",
                    backgroundColor: "rgba(99, 102, 241, 0.25)",
                    borderColor: "primary.main",
                  },
                },
              }}
            >
              <Button
                className={chartType === "pie" ? "active" : ""}
                onClick={() => setChartType("pie")}
                startIcon={<PieChartIcon sx={{ fontSize: 14 }} />}
              >
                Pie Chart
              </Button>
              <Button
                className={chartType === "bar" ? "active" : ""}
                onClick={() => setChartType("bar")}
                startIcon={<BarChartIcon sx={{ fontSize: 14 }} />}
              >
                Stacked Bar
              </Button>
            </ButtonGroup>
          </Stack>

          {/* Conditional rendering: Pie Chart or Stacked Bar */}
          {chartType === "pie" ? (
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 1.5, sm: 2.5 },
                borderRadius: 3,
                backgroundColor: "rgba(15, 23, 42, 0.5)",
                borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
              }}
            >
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems="center"
                justifyContent="center"
                spacing={{ xs: 2.5, md: 4 }}
              >
                {/* Interactive SVG Pie/Donut Chart */}
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: 260, sm: 300, md: 320 },
                    height: { xs: 260, sm: 300, md: 320 },
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseLeave={() => setHoveredPieSectorId(null)}
                >
                  <svg
                    viewBox="0 0 320 320"
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "visible",
                    }}
                  >
                    <g>
                      {pieSlices.map(({ sec, pathD, isHovered }) => {
                        const isDimmed =
                          hoveredPieSectorId !== null && !isHovered;

                        return (
                          <path
                            key={sec.id}
                            d={pathD}
                            fill={sec.color}
                            stroke="rgba(15, 23, 42, 0.85)"
                            strokeWidth={2}
                            opacity={isDimmed ? 0.35 : 0.95}
                            style={{
                              cursor: "pointer",
                              transition:
                                "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s, filter 0.2s",
                              filter: isHovered
                                ? `drop-shadow(0 0 8px ${sec.color}99)`
                                : undefined,
                            }}
                            onMouseEnter={() => setHoveredPieSectorId(sec.id)}
                          />
                        );
                      })}
                    </g>
                  </svg>

                  {/* Center Donut Overlay Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      width: { xs: 130, sm: 150 },
                      height: { xs: 130, sm: 150 },
                      borderRadius: "50%",
                      backgroundColor: "rgba(15, 23, 42, 0.92)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(8px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      p: 1,
                      pointerEvents: "none",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    {activeHoveredSector ? (
                      <>
                        <Typography sx={{ fontSize: "1.2rem", lineHeight: 1 }}>
                          {activeHoveredSector.icon}
                        </Typography>
                        <Typography
                          variant="caption"
                          noWrap
                          sx={{
                            fontWeight: 800,
                            fontSize: "0.78rem",
                            maxWidth: 130,
                            mt: 0.3,
                          }}
                        >
                          {activeHoveredSector.shortName}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: "1.25rem",
                            color: activeHoveredSector.color,
                            lineHeight: 1.1,
                            my: 0.2,
                          }}
                        >
                          {activeHoveredSector.weight}%
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                          }}
                        >
                          {activeHoveredSector.ticker} •{" "}
                          <span
                            style={{
                              color:
                                (activeHoveredSector.marketData?.changePct ??
                                  0) >= 0
                                  ? "#10b981"
                                  : "#ef4444",
                            }}
                          >
                            {(activeHoveredSector.marketData?.changePct ?? 0) >=
                            0
                              ? "+"
                              : ""}
                            {activeHoveredSector.marketData?.changePct.toFixed(
                              2,
                            )}
                            %
                          </span>
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          S&amp;P 500
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 900,
                            fontSize: "1.3rem",
                            letterSpacing: "-0.02em",
                            my: 0.2,
                          }}
                        >
                          100%
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "primary.light",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                          }}
                        >
                          11 GICS Sectors
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>

                {/* Interactive Legend Grid */}
                <Box sx={{ flex: 1, width: "100%" }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                      },
                      gap: 0.75,
                    }}
                  >
                    {kpis.sortedByWeight.map((sec) => {
                      const isHovered = hoveredPieSectorId === sec.id;
                      const isDimmed =
                        hoveredPieSectorId !== null && !isHovered;
                      const changePct = sec.marketData?.changePct ?? 0;
                      const isPositive = changePct >= 0;

                      return (
                        <Paper
                          key={sec.id}
                          variant="outlined"
                          onMouseEnter={() => setHoveredPieSectorId(sec.id)}
                          onMouseLeave={() => setHoveredPieSectorId(null)}
                          sx={{
                            p: 0.8,
                            px: 1.25,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            cursor: "pointer",
                            transition:
                              "background-color 0.15s, border-color 0.15s, opacity 0.15s",
                            backgroundColor: isHovered
                              ? "rgba(99, 102, 241, 0.15)"
                              : "rgba(15, 23, 42, 0.4)",
                            borderColor: isHovered
                              ? sec.color
                              : "var(--indices-border, rgba(255, 255, 255, 0.08))",
                            opacity: isDimmed ? 0.4 : 1,
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            sx={{ minWidth: 0 }}
                          >
                            <Box
                              sx={{
                                width: 9,
                                height: 9,
                                borderRadius: "50%",
                                backgroundColor: sec.color,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="caption"
                              noWrap
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.76rem",
                                color: isHovered ? "#ffffff" : "text.primary",
                              }}
                            >
                              {sec.shortName}
                            </Typography>
                            <Chip
                              label={sec.ticker}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: "0.65rem",
                                fontWeight: 800,
                                px: 0.25,
                                backgroundColor: "rgba(255, 255, 255, 0.06)",
                              }}
                            />
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            <Typography
                              sx={{
                                fontWeight: 800,
                                fontSize: "0.76rem",
                                color: sec.color,
                              }}
                            >
                              {sec.weight}%
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                color: isPositive ? "#10b981" : "#ef4444",
                                minWidth: 44,
                                textAlign: "right",
                              }}
                            >
                              {isPositive ? "+" : ""}
                              {changePct.toFixed(1)}%
                            </Typography>
                          </Stack>
                        </Paper>
                      );
                    })}
                  </Box>
                </Box>
              </Stack>
            </Paper>
          ) : (
            /* Stacked Proportional Bar */
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: 24,
                borderRadius: 2,
                overflow: "hidden",
                border:
                  "1px solid var(--indices-border, rgba(255, 255, 255, 0.15))",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
              }}
            >
              {kpis.sortedByWeight.map((sec) => (
                <Tooltip
                  key={sec.id}
                  title={`${sec.name} (${sec.ticker}): ${sec.weight}% of S&P 500`}
                  arrow
                >
                  <Box
                    sx={{
                      width: `${sec.weight}%`,
                      height: "100%",
                      backgroundColor: sec.color,
                      transition: "opacity 0.2s, transform 0.2s",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      opacity: 0.95,
                      "&:hover": {
                        opacity: 1,
                        filter: "brightness(1.2)",
                      },
                    }}
                  >
                    {sec.weight >= 8 && (
                      <Typography
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          color: "#0f172a",
                          whiteSpace: "nowrap",
                          px: 0.5,
                        }}
                      >
                        {sec.ticker} {sec.weight}%
                      </Typography>
                    )}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          )}
        </Box>

        {/* Highlight KPI Summary Banners */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 1.5,
            mb: 2.5,
          }}
        >
          {kpis.topGainer && (
            <Paper
              variant="outlined"
              sx={{
                p: 1.25,
                borderRadius: 2.5,
                borderColor: "rgba(16, 185, 129, 0.3)",
                backgroundColor: "rgba(16, 185, 129, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#10b981",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                  }}
                >
                  🚀 Leading Sector Today
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 800, fontSize: "0.85rem" }}
                >
                  {kpis.topGainer.icon} {kpis.topGainer.name} (
                  {kpis.topGainer.ticker})
                </Typography>
              </Box>
              <Typography
                sx={{ color: "#10b981", fontWeight: 800, fontSize: "0.9rem" }}
              >
                {(kpis.topGainer.marketData?.changePct ?? 0) >= 0 ? "+" : ""}
                {kpis.topGainer.marketData?.changePct.toFixed(2)}%
              </Typography>
            </Paper>
          )}

          {kpis.topLaggard && (
            <Paper
              variant="outlined"
              sx={{
                p: 1.25,
                borderRadius: 2.5,
                borderColor: "rgba(239, 68, 68, 0.3)",
                backgroundColor: "rgba(239, 68, 68, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#ef4444",
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                  }}
                >
                  📉 Lagging Sector Today
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 800, fontSize: "0.85rem" }}
                >
                  {kpis.topLaggard.icon} {kpis.topLaggard.name} (
                  {kpis.topLaggard.ticker})
                </Typography>
              </Box>
              <Typography
                sx={{ color: "#ef4444", fontWeight: 800, fontSize: "0.9rem" }}
              >
                {(kpis.topLaggard.marketData?.changePct ?? 0) >= 0 ? "+" : ""}
                {kpis.topLaggard.marketData?.changePct.toFixed(2)}%
              </Typography>
            </Paper>
          )}

          <Paper
            variant="outlined"
            sx={{
              p: 1.25,
              borderRadius: 2.5,
              borderColor: "rgba(99, 102, 241, 0.3)",
              backgroundColor: "rgba(99, 102, 241, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "primary.light",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                }}
              >
                ⚖️ S&amp;P 500 Concentration
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 800, fontSize: "0.85rem" }}
              >
                Top 3 (Tech, Fin, Health)
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "primary.light",
                fontWeight: 800,
                fontSize: "0.9rem",
              }}
            >
              {kpis.top3Weight.toFixed(1)}% Weight
            </Typography>
          </Paper>
        </Box>

        {/* Sectors Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 1.5,
          }}
        >
          {displayedSectors.map((sec) => {
            const m = sec.marketData;
            const changePct = m?.changePct ?? 0;
            const isPositive = changePct >= 0;
            const etfUrl = getStockAnalysisEtfUrl(sec.ticker);

            return (
              <Box key={sec.id}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2.5,
                    backgroundColor:
                      "var(--indices-card-bg, rgba(15, 23, 42, 0.4))",
                    borderColor:
                      "var(--indices-border, rgba(255, 255, 255, 0.08))",
                    borderLeft: `4px solid ${sec.color}`,
                    transition: "transform 0.15s, border-color 0.15s",
                    "&:hover": {
                      borderColor: sec.color,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {/* Top Row: Icon, Name & S&P 500 Weight */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={0.75}
                      sx={{ minWidth: 0 }}
                    >
                      <Typography sx={{ fontSize: "1.1rem" }}>
                        {sec.icon}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        noWrap
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.86rem",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {sec.shortName}
                      </Typography>
                    </Stack>

                    <Chip
                      label={`${sec.weight}%`}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        height: 20,
                        backgroundColor: `${sec.color}22`,
                        color: sec.color,
                        border: `1px solid ${sec.color}44`,
                      }}
                    />
                  </Stack>

                  {/* Price & Daily Return Row */}
                  <Stack
                    direction="row"
                    alignItems="baseline"
                    justifyContent="space-between"
                    sx={{ mb: 1 }}
                  >
                    <Stack direction="row" alignItems="baseline" spacing={0.75}>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "1.05rem",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {m?.price ? `$${m.price.toFixed(2)}` : "--"}
                      </Typography>
                      {m?.change !== undefined && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: isPositive ? "#10b981" : "#ef4444",
                            fontWeight: 700,
                            fontSize: "0.74rem",
                          }}
                        >
                          {isPositive ? "+" : ""}
                          {m.change.toFixed(2)}
                        </Typography>
                      )}
                    </Stack>

                    <Chip
                      icon={
                        isPositive ? (
                          <TrendingUpIcon
                            sx={{
                              fontSize: "14px !important",
                              color: "#10b981 !important",
                            }}
                          />
                        ) : (
                          <TrendingDownIcon
                            sx={{
                              fontSize: "14px !important",
                              color: "#ef4444 !important",
                            }}
                          />
                        )
                      }
                      label={`${isPositive ? "+" : ""}${changePct.toFixed(2)}%`}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.72rem",
                        height: 22,
                        backgroundColor: isPositive
                          ? "rgba(16, 185, 129, 0.12)"
                          : "rgba(239, 68, 68, 0.12)",
                        color: isPositive ? "#10b981" : "#ef4444",
                        border: isPositive
                          ? "1px solid rgba(16, 185, 129, 0.3)"
                          : "1px solid rgba(239, 68, 68, 0.3)",
                      }}
                    />
                  </Stack>

                  {/* Mini Sparkline SVG if available */}
                  {m?.sparkline && m.sparkline.length > 2 && (
                    <Box sx={{ my: 0.5 }}>
                      <SectorMiniSparkline
                        points={m.sparkline}
                        color={isPositive ? "#10b981" : "#ef4444"}
                      />
                    </Box>
                  )}

                  {/* Top Holdings Anchors */}
                  <Box sx={{ mt: "auto", pt: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        display: "block",
                        mb: 0.4,
                      }}
                    >
                      Top Holdings ({sec.topHoldingsWeight}):
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.72rem",
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {sec.topHoldings.join(" • ")}
                    </Typography>
                  </Box>

                  {/* Footer Action Links: ETF Ticker & Index Profile */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      mt: 1.25,
                      pt: 0.75,
                      borderTop:
                        "1px dashed var(--indices-border, rgba(255, 255, 255, 0.08))",
                    }}
                  >
                    <Tooltip title={`View ${sec.ticker} ETF on StockAnalysis`}>
                      <Chip
                        label={sec.ticker}
                        size="small"
                        component="a"
                        href={etfUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        clickable
                        icon={
                          <OpenInNewIcon
                            sx={{
                              fontSize: "12px !important",
                              color: "inherit",
                            }}
                          />
                        }
                        sx={{
                          height: 20,
                          fontSize: "0.68rem",
                          fontWeight: 800,
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          color: "text.primary",
                          border:
                            "1px solid var(--indices-border, rgba(255, 255, 255, 0.15))",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.12)",
                          },
                        }}
                      />
                    </Tooltip>

                    {sec.relatedIndexId ? (
                      <Button
                        component={Link}
                        to={`/index/${sec.relatedIndexId}`}
                        size="small"
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          p: 0,
                          minWidth: 0,
                          color: "primary.light",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Index Profile →
                      </Button>
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{ color: "text.disabled", fontSize: "0.66rem" }}
                      >
                        S&amp;P Select Sector
                      </Typography>
                    )}
                  </Stack>
                </Paper>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

/**
 * Lightweight SVG sparkline for sector cards
 */
function SectorMiniSparkline({
  points,
  color,
}: {
  points: number[];
  color: string;
}) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const width = 160;
  const height = 26;
  const pad = 2;

  const d = points
    .map((val, idx) => {
      const x = pad + (idx / (points.length - 1)) * (width - pad * 2);
      const y = height - pad - ((val - min) / range) * (height - pad * 2);
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      style={{
        width: "100%",
        height: 26,
        overflow: "visible",
        display: "block",
      }}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
