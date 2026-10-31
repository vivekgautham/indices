import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { FredSeriesData } from "../../data/fredSeriesData";
import { formatSeriesValue } from "./FredSeriesChart";
import { FredSparkline } from "./FredSparkline";

export interface FredSeriesCardProps {
  series: FredSeriesData;
  isSelected?: boolean;
  onSelect?: (series: FredSeriesData) => void;
}

export const FredSeriesCard: React.FC<FredSeriesCardProps> = ({
  series,
  isSelected = false,
  onSelect,
}) => {
  const isPositive = series.change >= 0;
  const changeColor = isPositive ? "#10b981" : "#ef4444";
  const changeBg = isPositive
    ? "rgba(16, 185, 129, 0.12)"
    : "rgba(239, 68, 68, 0.12)";

  // Compute 52-week position percentage (0 to 100)
  const range52 = series.high52 - series.low52;
  const pos52 =
    range52 > 0
      ? Math.max(0, Math.min(100, ((series.latestValue - series.low52) / range52) * 100))
      : 50;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.22s ease",
        borderColor: isSelected
          ? "primary.main"
          : "var(--indices-border, rgba(255, 255, 255, 0.12))",
        backgroundColor: isSelected
          ? "var(--indices-card-hover-bg, rgba(99, 102, 241, 0.08))"
          : "var(--indices-card-bg, rgba(30, 41, 59, 0.5))",
        boxShadow: isSelected
          ? "0 0 0 2px rgba(99, 102, 241, 0.35), 0 8px 24px rgba(0, 0, 0, 0.12)"
          : "0 2px 8px rgba(0, 0, 0, 0.04)",
        "&:hover": {
          borderColor: isSelected ? "primary.main" : "primary.light",
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <CardActionArea
        onClick={() => onSelect?.(series)}
        sx={{
          p: { xs: 1.75, sm: 2.25 },
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          {/* Header Row: Icon, Title, and Frequency Badge */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
            sx={{ mb: 1.25 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontSize: "1.25rem", lineHeight: 1 }}>
                {series.icon}
              </Typography>
              <Box>
                <Typography
                  variant="subtitle1"
                  component="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    lineHeight: 1.2,
                    color: "text.primary",
                  }}
                >
                  {series.shortName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.72rem",
                    display: "block",
                  }}
                >
                  FRED: {series.id}
                </Typography>
              </Box>
            </Box>

            <Chip
              label={series.frequency}
              size="small"
              sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                height: 20,
                backgroundColor: "var(--indices-subtle-bg, rgba(255, 255, 255, 0.06))",
                color: "text.secondary",
              }}
            />
          </Stack>

          {/* Pricing Row with Value and Sparkline */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              my: 1.5,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.45rem", sm: "1.65rem" },
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatSeriesValue(
                  series.latestValue,
                  series.format,
                  series.decimals,
                )}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.5 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.3,
                    px: 0.75,
                    py: 0.2,
                    borderRadius: 1.2,
                    backgroundColor: changeBg,
                    color: changeColor,
                    fontWeight: 800,
                    fontSize: "0.72rem",
                  }}
                >
                  {isPositive ? (
                    <TrendingUpIcon sx={{ fontSize: 13 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 13 }} />
                  )}
                  <span>
                    {isPositive ? "+" : ""}
                    {formatSeriesValue(series.change, series.format, series.decimals)}
                  </span>
                  <span>({isPositive ? "+" : ""}{series.changePct.toFixed(2)}%)</span>
                </Box>
              </Stack>
            </Box>

            {/* Sparkline Graphic */}
            <FredSparkline
              data={series.observations}
              width={95}
              height={36}
            />
          </Box>

          {/* 52-Week Range Bar */}
          <Box sx={{ mt: 1.5, mb: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "0.68rem", color: "text.secondary" }}
              >
                52W L: {formatSeriesValue(series.low52, series.format, series.decimals)}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "0.68rem", color: "text.secondary" }}
              >
                52W H: {formatSeriesValue(series.high52, series.format, series.decimals)}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={pos52}
              sx={{
                height: 5,
                borderRadius: 2.5,
                backgroundColor: "var(--indices-subtle-bg, rgba(255, 255, 255, 0.08))",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 2.5,
                  backgroundColor: series.badgeColor || "primary.main",
                },
              }}
            />
          </Box>

          {/* Footer Metadata: Related ETFs & Index Link */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.5,
              pt: 1,
              borderTop: "1px solid var(--indices-border, rgba(255, 255, 255, 0.06))",
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontSize: "0.7rem", color: "text.secondary" }}
            >
              As of {series.latestDate}
            </Typography>

            <Stack direction="row" spacing={0.5} alignItems="center">
              {series.trackingEtfs && series.trackingEtfs.length > 0 && (
                <Tooltip title={`Tracked by ETFs: ${series.trackingEtfs.join(", ")}`}>
                  <Chip
                    label={series.trackingEtfs.slice(0, 2).join(", ") + (series.trackingEtfs.length > 2 ? ` +${series.trackingEtfs.length - 2}` : "")}
                    size="small"
                    sx={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      height: 18,
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "#10b981",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                    }}
                  />
                </Tooltip>
              )}

              {series.relatedIndexId && (
                <Tooltip title="View full index profile in catalog">
                  <Box
                    component={Link}
                    to={`/index/${series.relatedIndexId}`}
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      color: "primary.light",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    <OpenInNewIcon sx={{ fontSize: 13 }} />
                  </Box>
                </Tooltip>
              )}
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
