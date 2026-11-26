import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Chip, Paper, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { ExchangeLiveStatus, WorldExchange } from "../../types/exchange";

interface Props {
  exchanges: WorldExchange[];
  statuses: Map<string, ExchangeLiveStatus>;
  currentTime: Date;
}

export const ExchangeStatusTicker: React.FC<Props> = ({
  exchanges,
  statuses,
  currentTime,
}) => {
  const theme = useTheme();

  let openCount = 0;
  let preOrLunchCount = 0;
  let holidayCount = 0;
  let closedCount = 0;

  interface NextTransition {
    exchange: WorldExchange;
    status: ExchangeLiveStatus;
  }
  let nextTransition: NextTransition | null = null;

  for (const ex of exchanges) {
    const st = statuses.get(ex.id);
    if (!st) continue;

    if (st.status === "OPEN") {
      openCount++;
    } else if (
      st.status === "LUNCH" ||
      st.status === "PRE_MARKET" ||
      st.status === "POST_MARKET"
    ) {
      preOrLunchCount++;
    } else if (st.status === "HOLIDAY") {
      holidayCount++;
      closedCount++;
    } else {
      closedCount++;
    }

    if (st.minutesToNextEvent > 0) {
      if (
        !nextTransition ||
        st.minutesToNextEvent < nextTransition.status.minutesToNextEvent
      ) {
        nextTransition = { exchange: ex, status: st };
      }
    }
  }

  const utcTimeString = currentTime.toUTCString().slice(17, 25);
  const localTimeString = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5 },
        mb: 3,
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(18, 22, 28, 0.75)"
            : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2.5}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
      >
        {/* Left: Global Metrics */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 3 }}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          {/* Global Coverage Metric */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccountBalanceIcon
                sx={{ fontSize: 18, color: theme.palette.primary.main }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  letterSpacing: 0.8,
                }}
              >
                Tracked Markets
              </Typography>
            </Stack>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, mt: 0.2, fontFamily: "monospace" }}
            >
              {exchanges.length} Bourses
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              width: "1px",
              height: 36,
              bgcolor: theme.palette.divider,
            }}
          />

          {/* Session Breakdown Status Pills */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                textTransform: "uppercase",
                fontWeight: 700,
                letterSpacing: 0.8,
                display: "block",
                mb: 0.5,
              }}
            >
              Live Session Status
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              flexWrap="wrap"
            >
              <Chip
                size="small"
                label={`${openCount} Open`}
                sx={{
                  fontWeight: 700,
                  bgcolor: "rgba(0, 221, 148, 0.12)",
                  color: "#00DD94",
                  border: "1px solid rgba(0, 221, 148, 0.3)",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
              {preOrLunchCount > 0 && (
                <Chip
                  size="small"
                  label={`${preOrLunchCount} Lunch/Pre`}
                  sx={{
                    fontWeight: 700,
                    bgcolor: "rgba(255, 179, 0, 0.12)",
                    color: "#FFB300",
                    border: "1px solid rgba(255, 179, 0, 0.3)",
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              )}
              {holidayCount > 0 && (
                <Chip
                  size="small"
                  label={`${holidayCount} Holiday`}
                  sx={{
                    fontWeight: 700,
                    bgcolor: "rgba(239, 68, 68, 0.12)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              )}
              <Chip
                size="small"
                label={`${closedCount} Closed`}
                sx={{
                  fontWeight: 600,
                  bgcolor: "rgba(148, 163, 184, 0.08)",
                  color: "text.secondary",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </Stack>
          </Box>
        </Stack>

        {/* Right: Next Transition + Global Clocks */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2.5 }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          {nextTransition && (
            <Box
              sx={{
                px: 1.5,
                py: 0.8,
                borderRadius: 1.5,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.03)",
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  fontSize: "0.7rem",
                }}
              >
                Next Market Event:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {nextTransition.exchange.shortName}{" "}
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {nextTransition.status.nextEvent}
                </Box>
              </Typography>
            </Box>
          )}

          {/* World Clocks */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ textAlign: "right" }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <PublicIcon sx={{ fontSize: 13, color: "text.secondary" }} />
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  UTC
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", fontWeight: 700 }}
              >
                {utcTimeString}
              </Typography>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeIcon
                  sx={{ fontSize: 13, color: "text.secondary" }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  Your Time
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", fontWeight: 700 }}
              >
                {localTimeString}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
