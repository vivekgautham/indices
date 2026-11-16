import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { ExchangeLiveStatus, WorldExchange } from "../../types/exchange";
import { getStatusColorConfig } from "../../utils/marketHours";

interface Props {
  exchange: WorldExchange;
  status: ExchangeLiveStatus;
  onSelect: (exchange: WorldExchange) => void;
}

export const ExchangeCard: React.FC<Props> = ({
  exchange,
  status,
  onSelect,
}) => {
  const theme = useTheme();
  const colorConfig = getStatusColorConfig(status.status);

  // Asset class color mapping
  const getAssetBadgeColor = (asset: string) => {
    switch (asset) {
      case "Equities":
        return theme.palette.mode === "dark" ? "#60a5fa" : "#2563eb";
      case "Derivatives":
        return "#f59e0b";
      case "Commodities":
        return "#10b981";
      case "Fixed Income":
        return "#8b5cf6";
      case "ETFs":
        return "#ec4899";
      case "FX":
        return "#06b6d4";
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2.5,
        border: `1px solid ${status.isRegularOpen ? colorConfig.border : theme.palette.divider}`,
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(18, 24, 32, 0.7)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px -3px rgba(0, 221, 148, 0.15)"
              : "0 10px 25px -5px rgba(0, 0, 0, 0.08)",
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <CardActionArea
        onClick={() => onSelect(exchange)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          p: 2.2,
          justifyContent: "flex-start",
        }}
      >
        <CardContent sx={{ p: 0, width: "100%", flex: 1 }}>
          {/* Top Row: Flag + MIC + Global Rank */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1.5}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ fontSize: "1.4rem", lineHeight: 1 }}>
                {exchange.flag}
              </Typography>
              <Chip
                label={exchange.mic}
                size="small"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  height: 22,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.06)",
                }}
              />
            </Stack>

            <Chip
              label={`#${exchange.globalRank}`}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: "0.72rem",
                height: 22,
                color: theme.palette.primary.main,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(0, 221, 148, 0.1)"
                    : "rgba(0, 221, 148, 0.15)",
                border: "1px solid rgba(0, 221, 148, 0.25)",
              }}
            />
          </Stack>

          {/* Exchange Name & City */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.05rem",
              lineHeight: 1.3,
              mb: 0.3,
            }}
          >
            {exchange.name}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              mb: 2,
            }}
          >
            {exchange.city}, {exchange.country} • {exchange.region}
          </Typography>

          {/* Prominent Live Status Badge with Countdown */}
          <Box
            sx={{
              p: 1.2,
              borderRadius: 2,
              bgcolor: colorConfig.badgeBg,
              border: `1px solid ${colorConfig.border}`,
              mb: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    bgcolor: colorConfig.dotColor,
                    boxShadow: status.isRegularOpen
                      ? `0 0 8px ${colorConfig.dotColor}`
                      : "none",
                    animation: status.isRegularOpen
                      ? "pulse 2s infinite ease-in-out"
                      : "none",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(0.95)", opacity: 0.8 },
                      "50%": { transform: "scale(1.2)", opacity: 1 },
                      "100%": { transform: "scale(0.95)", opacity: 0.8 },
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    color: colorConfig.badgeColor,
                    textTransform: "uppercase",
                  }}
                >
                  {status.statusLabel}
                </Typography>
              </Stack>

              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: colorConfig.badgeColor,
                }}
              >
                {status.nextEvent}
              </Typography>
            </Stack>
          </Box>

          {/* Trading Hours Schedule Summary */}
          <Box
            sx={{
              p: 1.2,
              borderRadius: 1.8,
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.03)",
              border: `1px solid ${theme.palette.divider}`,
              mb: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={0.3}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  letterSpacing: 0.5,
                }}
              >
                Local Trading Hours
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontFamily: "monospace",
                  color: "text.primary",
                }}
              >
                {exchange.regularHours.open} - {exchange.regularHours.close}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.68rem",
                }}
              >
                Your Timezone
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "monospace",
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                }}
              >
                {status.userLocalOpenTime} - {status.userLocalCloseTime}
              </Typography>
            </Stack>
          </Box>

          {/* Traded Asset Classes */}
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
              {exchange.assetClasses.map((asset) => (
                <Chip
                  key={asset}
                  label={asset}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.66rem",
                    fontWeight: 600,
                    color: getAssetBadgeColor(asset),
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(0, 0, 0, 0.04)",
                    border: `1px solid ${
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.08)"
                    }`,
                    "& .MuiChip-label": { px: 0.8 },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Bottom Footer: Local Clock & Details Link */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pt={1.5}
            sx={{
              borderTop: `1px solid ${theme.palette.divider}`,
              mt: "auto",
            }}
          >
            <Stack direction="row" spacing={0.6} alignItems="center">
              <AccessTimeIcon sx={{ fontSize: 13, color: "text.secondary" }} />
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "monospace",
                  color: "text.secondary",
                  fontWeight: 600,
                }}
              >
                {status.currentLocalTime} {exchange.timezoneAbbr}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={0.2} alignItems="center">
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  fontSize: "0.72rem",
                }}
              >
                Schedule
              </Typography>
              <ChevronRightIcon
                sx={{ fontSize: 16, color: theme.palette.primary.main }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
