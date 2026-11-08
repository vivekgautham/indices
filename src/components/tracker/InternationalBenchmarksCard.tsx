import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PublicIcon from "@mui/icons-material/Public";
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
import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FredSeriesData } from "../../data/fredSeriesData";
import { formatSeriesValue } from "./FredSeriesChart";

export interface InternationalBenchmarksCardProps {
  seriesList: FredSeriesData[];
  selectedSeriesId: string;
  onSelectSeries: (seriesId: string) => void;
  updatedAt?: string;
}

type RegionFilter = "all" | "Europe" | "Asia-Pacific" | "Americas" | "Global";

export const InternationalBenchmarksCard: React.FC<
  InternationalBenchmarksCardProps
> = ({ seriesList, selectedSeriesId, onSelectSeries, updatedAt }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("all");

  // Filter series based on region
  const filteredSeries = useMemo(() => {
    if (selectedRegion === "all") return seriesList;
    if (selectedRegion === "Global") {
      return seriesList.filter(
        (s) =>
          s.region === "Global Developed" || s.region === "Emerging Markets",
      );
    }
    return seriesList.filter((s) => s.region === selectedRegion);
  }, [seriesList, selectedRegion]);

  // Market overview statistics
  const stats = useMemo(() => {
    if (!seriesList.length) return null;
    let gainers = 0;
    let decliners = 0;
    let topGainer: FredSeriesData | null = null;
    let topLaggard: FredSeriesData | null = null;
    let sumChangePct = 0;

    for (const s of seriesList) {
      sumChangePct += s.changePct;
      if (s.change >= 0) {
        gainers++;
      } else {
        decliners++;
      }
      if (!topGainer || s.changePct > topGainer.changePct) {
        topGainer = s;
      }
      if (!topLaggard || s.changePct < topLaggard.changePct) {
        topLaggard = s;
      }
    }

    const avgChangePct = sumChangePct / seriesList.length;

    return {
      total: seriesList.length,
      gainers,
      decliners,
      topGainer,
      topLaggard,
      avgChangePct,
    };
  }, [seriesList]);

  // Regional counts
  const regionCounts = useMemo(() => {
    const counts = {
      all: seriesList.length,
      Europe: 0,
      "Asia-Pacific": 0,
      Americas: 0,
      Global: 0,
    };
    for (const s of seriesList) {
      if (s.region === "Europe") counts.Europe++;
      else if (s.region === "Asia-Pacific") counts["Asia-Pacific"]++;
      else if (s.region === "Americas") counts.Americas++;
      else if (
        s.region === "Global Developed" ||
        s.region === "Emerging Markets"
      ) {
        counts.Global++;
      }
    }
    return counts;
  }, [seriesList]);

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
        {/* Card Header */}
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
                icon={<PublicIcon sx={{ fontSize: "15px !important" }} />}
                label="Global Markets"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  backgroundColor: "rgba(14, 165, 233, 0.15)",
                  color: "#0ea5e9",
                  border: "1px solid rgba(14, 165, 233, 0.35)",
                }}
              />
              {updatedAt && (
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontSize: "0.76rem" }}
                >
                  Daily Closes • Updated:{" "}
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
              International Benchmarks &amp; Global Overview
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.3, fontSize: "0.82rem" }}
            >
              Real-time daily performance across major European, Asia-Pacific,
              and Americas equity markets and global factor benchmarks.
            </Typography>
          </Box>

          {/* Quick Summary Strip */}
          {stats && (
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
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.68rem",
                    display: "block",
                  }}
                >
                  Breadth
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 800, fontSize: "0.8rem" }}
                >
                  <span style={{ color: "#10b981" }}>{stats.gainers} ▲</span> /{" "}
                  <span style={{ color: "#ef4444" }}>{stats.decliners} ▼</span>
                </Typography>
              </Box>

              <Box
                sx={{
                  width: "1px",
                  height: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />

              {stats.topGainer && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.68rem",
                      display: "block",
                    }}
                  >
                    Top Leader
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      color: "#10b981",
                    }}
                  >
                    {stats.topGainer.shortName} (+
                    {stats.topGainer.changePct.toFixed(2)}%)
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

              {stats.topLaggard && (
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.68rem",
                      display: "block",
                    }}
                  >
                    Top Laggard
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.8rem",
                      color: "#ef4444",
                    }}
                  >
                    {stats.topLaggard.shortName} (
                    {stats.topLaggard.changePct.toFixed(2)}%)
                  </Typography>
                </Box>
              )}
            </Paper>
          )}
        </Box>

        {/* Region Filter Tabs */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 2.5,
          }}
        >
          <Tabs
            value={selectedRegion}
            onChange={(_, val) => setSelectedRegion(val)}
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
            <Tab label={`All Regions (${regionCounts.all})`} value="all" />
            <Tab label={`Europe (${regionCounts.Europe})`} value="Europe" />
            <Tab
              label={`Asia-Pacific (${regionCounts["Asia-Pacific"]})`}
              value="Asia-Pacific"
            />
            <Tab
              label={`Americas (${regionCounts.Americas})`}
              value="Americas"
            />
            <Tab
              label={`Global Proxies (${regionCounts.Global})`}
              value="Global"
            />
          </Tabs>
        </Box>

        {/* International Benchmarks Grid */}
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

            // 52-Week Range Percentage calculation
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
                {/* Top Row: Country / Flag & Badge */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography sx={{ fontSize: "1.4rem", lineHeight: 1 }}>
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
                          {item.country || item.region}
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

                    {item.currency && (
                      <Chip
                        label={item.currency}
                        size="small"
                        sx={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          height: 20,
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          color: "text.secondary",
                        }}
                      />
                    )}
                  </Box>

                  {/* Subcategory */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      display: "block",
                      fontSize: "0.74rem",
                      mb: 1.5,
                    }}
                  >
                    {item.subcategory}
                  </Typography>

                  {/* Latest Value and 1-Day Return */}
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
                        fontSize: "1.25rem",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {formatSeriesValue(item.latestValue, item.format, 2)}
                    </Typography>

                    <Chip
                      size="small"
                      icon={
                        isPositive ? (
                          <TrendingUpIcon
                            sx={{ fontSize: "14px !important" }}
                          />
                        ) : (
                          <TrendingDownIcon
                            sx={{ fontSize: "14px !important" }}
                          />
                        )
                      }
                      label={`${isPositive ? "+" : ""}${item.changePct.toFixed(2)}%`}
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.75rem",
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
                          52W L: {formatSeriesValue(item.low52, item.format, 0)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "text.secondary",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                          }}
                        >
                          52W H:{" "}
                          {formatSeriesValue(item.high52, item.format, 0)}
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
                                "linear-gradient(90deg, #3b82f6 0%, #10b981 100%)",
                            },
                          }}
                        />
                      </Tooltip>
                    </Box>
                  )}

                  {/* Tracking ETFs */}
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

                {/* Bottom Actions: View Chart & Catalog Profile */}
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
