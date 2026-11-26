import CloseIcon from "@mui/icons-material/Close";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LaunchIcon from "@mui/icons-material/Launch";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  Box,
  Button,
  Chip,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { GLOBAL_MARKET_HOLIDAYS } from "../../data/globalMarketHolidays";
import { ExchangeLiveStatus, WorldExchange } from "../../types/exchange";
import {
  getStatusColorConfig,
  timeStringToMinutes,
} from "../../utils/marketHours";

interface Props {
  exchange: WorldExchange | null;
  status: ExchangeLiveStatus | null;
  open: boolean;
  onClose: () => void;
}

export const ExchangeDetailDrawer: React.FC<Props> = ({
  exchange,
  status,
  open,
  onClose,
}) => {
  const theme = useTheme();

  if (!exchange || !status) return null;

  const colorConfig = getStatusColorConfig(status.status);

  // Compute position on 24h timeline (0 to 1440 minutes)
  const currentMinutes = status.currentLocalTime
    ? timeStringToMinutes(status.currentLocalTime.slice(0, 5))
    : 0;
  const currentTimelinePercent = Math.min(
    100,
    Math.max(0, (currentMinutes / 1440) * 100),
  );

  const openMinutes = timeStringToMinutes(exchange.regularHours.open);
  const closeMinutes = timeStringToMinutes(exchange.regularHours.close);
  const openPercent = (openMinutes / 1440) * 100;
  const durationPercent = ((closeMinutes - openMinutes) / 1440) * 100;

  let lunchPercent = 0;
  let lunchStartPercent = 0;
  if (exchange.lunchBreak) {
    const lStart = timeStringToMinutes(exchange.lunchBreak.start);
    const lEnd = timeStringToMinutes(exchange.lunchBreak.end);
    lunchStartPercent = (lStart / 1440) * 100;
    lunchPercent = ((lEnd - lStart) / 1440) * 100;
  }

  // Filter upcoming holidays for this exchange (including today)
  const todayIso = new Date().toISOString().split("T")[0];
  const upcomingHolidays = exchange.holidayCalendarExchange
    ? GLOBAL_MARKET_HOLIDAYS.filter(
        (h) =>
          h.exchange.includes(exchange.holidayCalendarExchange!) &&
          h.date >= todayIso,
      ).slice(0, 4)
    : [];

  const tradingDaysLabel =
    exchange.tradingDays.includes(0) && exchange.tradingDays.includes(4)
      ? "Sunday – Thursday"
      : "Monday – Friday";

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 480, md: 540 },
          p: { xs: 2.5, sm: 3.5 },
          bgcolor: theme.palette.mode === "dark" ? "#0D1117" : "#FFFFFF",
          backgroundImage: "none",
        },
      }}
    >
      {/* Top Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2.5}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography sx={{ fontSize: "2rem", lineHeight: 1 }}>
            {exchange.flag}
          </Typography>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                {exchange.shortName}
              </Typography>
              <Chip
                label={exchange.mic}
                size="small"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.08)",
                }}
              />
              <Chip
                label={`Global #${exchange.globalRank}`}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.72rem",
                  color: theme.palette.primary.main,
                  bgcolor: "rgba(0, 221, 148, 0.1)",
                  border: "1px solid rgba(0, 221, 148, 0.25)",
                }}
              />
            </Stack>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mt: 0.2 }}
            >
              {exchange.city}, {exchange.country} • {exchange.region}
            </Typography>
          </Box>
        </Stack>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* Official Name */}
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
        {exchange.name}
      </Typography>

      {/* Description */}
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", lineHeight: 1.6, mb: 2.5 }}
      >
        {exchange.description}
      </Typography>

      {/* Live Status Banner */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2.5,
          bgcolor: colorConfig.badgeBg,
          border: `1px solid ${colorConfig.border}`,
          mb: 3,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: colorConfig.dotColor,
                boxShadow: status.isRegularOpen
                  ? `0 0 10px ${colorConfig.dotColor}`
                  : "none",
              }}
            />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  color: colorConfig.badgeColor,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                {status.statusLabel}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {status.holidayName && status.status === "HOLIDAY"
                  ? `Market Holiday • ${status.holidayName}`
                  : "Session Countdown"}
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontFamily: "monospace",
              color: colorConfig.badgeColor,
            }}
          >
            {status.nextEvent}
          </Typography>
        </Stack>
      </Box>

      {/* Key Metric Grid */}
      <Stack direction="row" spacing={2} mb={3}>
        <Box
          sx={{
            flex: 1,
            p: 1.8,
            borderRadius: 2,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(0, 0, 0, 0.03)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Timezone Standard
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, fontFamily: "monospace", mt: 0.3 }}
          >
            {exchange.timezoneAbbr}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 1.8,
            borderRadius: 2,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(0, 0, 0, 0.03)",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Listed Securities
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, fontFamily: "monospace", mt: 0.3 }}
          >
            {exchange.listedCompaniesCount.toLocaleString()}+
          </Typography>
        </Box>
      </Stack>

      {/* 24-Hour Session Timeline */}
      <Box sx={{ mb: 3.5 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontSize: "0.78rem",
            color: "text.secondary",
          }}
        >
          24-Hour Trading Cycle (Local Time: {exchange.timezoneAbbr})
        </Typography>

        {/* Visual Timeline Bar */}
        <Box
          sx={{
            position: "relative",
            height: 24,
            borderRadius: 1.5,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(0, 0, 0, 0.06)",
            overflow: "hidden",
            mb: 1,
          }}
        >
          {/* Regular Trading Hours block */}
          <Box
            sx={{
              position: "absolute",
              left: `${openPercent}%`,
              width: `${durationPercent}%`,
              top: 0,
              bottom: 0,
              bgcolor: "rgba(0, 221, 148, 0.25)",
              borderLeft: "2px solid #00DD94",
              borderRight: "2px solid #00DD94",
            }}
          />

          {/* Lunch Break block if applicable */}
          {exchange.lunchBreak && (
            <Box
              sx={{
                position: "absolute",
                left: `${lunchStartPercent}%`,
                width: `${lunchPercent}%`,
                top: 0,
                bottom: 0,
                bgcolor: "rgba(255, 179, 0, 0.35)",
              }}
            />
          )}

          {/* Current Local Time Marker */}
          <Box
            sx={{
              position: "absolute",
              left: `${currentTimelinePercent}%`,
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: "#ffffff",
              boxShadow: "0 0 6px #ffffff",
              zIndex: 2,
            }}
          />
        </Box>

        {/* Timeline Axis Labels */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            color: "text.secondary",
            fontSize: "0.72rem",
            fontFamily: "monospace",
          }}
        >
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>24:00</span>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          mt={1.5}
          flexWrap="wrap"
          sx={{ fontSize: "0.75rem", color: "text.secondary" }}
        >
          <Stack direction="row" spacing={0.6} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "#00DD94",
                borderRadius: 0.5,
              }}
            />
            <span>
              Regular Session ({exchange.regularHours.open} -{" "}
              {exchange.regularHours.close})
            </span>
          </Stack>
          {exchange.lunchBreak && (
            <Stack direction="row" spacing={0.6} alignItems="center">
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: "#FFB300",
                  borderRadius: 0.5,
                }}
              />
              <span>
                Lunch ({exchange.lunchBreak.start} - {exchange.lunchBreak.end})
              </span>
            </Stack>
          )}
          <Stack direction="row" spacing={0.6} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                bgcolor: "#ffffff",
                borderRadius: 0.5,
              }}
            />
            <span>Current ({status.currentLocalTime.slice(0, 5)})</span>
          </Stack>
        </Stack>
      </Box>

      {/* Trading Session Breakdown Table */}
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.02)"
              : "rgba(0, 0, 0, 0.02)",
          border: `1px solid ${theme.palette.divider}`,
          mb: 3,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            color: "text.secondary",
            display: "block",
            mb: 1.5,
          }}
        >
          Schedule & Timezone Conversion
        </Typography>

        <Stack spacing={1.2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Active Trading Days
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {tradingDaysLabel}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Exchange Local Hours
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, fontFamily: "monospace" }}
            >
              {exchange.regularHours.open} – {exchange.regularHours.close} (
              {exchange.timezoneAbbr})
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Your Local Hours
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontFamily: "monospace",
                color: theme.palette.primary.main,
              }}
            >
              {status.userLocalOpenTime} – {status.userLocalCloseTime}
            </Typography>
          </Stack>

          {exchange.lunchBreak && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Lunch Break
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontFamily: "monospace" }}
              >
                {exchange.lunchBreak.start} – {exchange.lunchBreak.end}
              </Typography>
            </Stack>
          )}

          {exchange.preMarket && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Pre-Market Session
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, fontFamily: "monospace" }}
              >
                {exchange.preMarket.open} – {exchange.preMarket.close}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>

      {/* Traded Asset Classes */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            color: "text.secondary",
            display: "block",
            mb: 1,
          }}
        >
          Traded Asset Classes
        </Typography>
        <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
          {exchange.assetClasses.map((asset) => (
            <Chip
              key={asset}
              label={asset}
              size="small"
              sx={{
                fontWeight: 700,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(0, 0, 0, 0.06)",
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Flagship Indices */}
      {exchange.flagshipIndices.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <ShowChartIcon
              sx={{ fontSize: 16, color: theme.palette.primary.main }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              Benchmark Indices
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
            {exchange.flagshipIndices.map((idx) => {
              if (idx.indexId) {
                return (
                  <Chip
                    key={idx.name}
                    label={idx.name}
                    size="small"
                    component={RouterLink}
                    to={`/index/${idx.indexId}`}
                    clickable
                    sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      border: "1px solid rgba(0, 221, 148, 0.3)",
                      bgcolor: "rgba(0, 221, 148, 0.08)",
                      "&:hover": {
                        bgcolor: "rgba(0, 221, 148, 0.18)",
                      },
                    }}
                  />
                );
              }
              return (
                <Chip
                  key={idx.name}
                  label={idx.name}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(0, 0, 0, 0.04)",
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      )}

      {/* Upcoming Holidays */}
      {upcomingHolidays.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Stack direction="row" spacing={0.8} alignItems="center">
              <EventBusyIcon sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "text.secondary",
                }}
              >
                Upcoming Holidays
              </Typography>
            </Stack>

            <Button
              component={RouterLink}
              to="/events"
              size="small"
              sx={{
                fontSize: "0.72rem",
                textTransform: "none",
                p: 0,
                minWidth: "auto",
              }}
            >
              All Events &rarr;
            </Button>
          </Stack>

          <Stack spacing={0.8}>
            {upcomingHolidays.map((holiday, i) => (
              <Stack
                key={i}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  py: 0.8,
                  px: 1.2,
                  borderRadius: 1.5,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.02)"
                      : "rgba(0, 0, 0, 0.02)",
                  fontSize: "0.82rem",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {holiday.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ fontFamily: "monospace", color: "text.secondary" }}
                >
                  {holiday.date}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      )}

      {/* Footer Website Link */}
      <Box
        sx={{
          mt: "auto",
          pt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button
          variant="outlined"
          fullWidth
          href={exchange.website}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<LaunchIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 2,
            borderColor: theme.palette.divider,
            color: "text.primary",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            },
          }}
        >
          Official {exchange.shortName} Website
        </Button>
      </Box>
    </Drawer>
  );
};
