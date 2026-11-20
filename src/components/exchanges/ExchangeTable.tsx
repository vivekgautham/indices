import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  ExchangeLiveStatus,
  MarketSessionStatus,
  WorldExchange,
} from "../../types/exchange";
import { getStatusColorConfig } from "../../utils/marketHours";

interface Props {
  exchanges: WorldExchange[];
  statuses: Map<string, ExchangeLiveStatus>;
  onSelect: (exchange: WorldExchange) => void;
}

type SortField = "rank" | "name" | "status";
type SortOrder = "asc" | "desc";

export const ExchangeTable: React.FC<Props> = ({
  exchanges,
  statuses,
  onSelect,
}) => {
  const theme = useTheme();
  const [sortField, setSortField] = useState<SortField>("status");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedExchanges = useMemo(() => {
    return [...exchanges].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "rank":
          comparison = a.globalRank - b.globalRank;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "status": {
          const stA = statuses.get(a.id)?.status;
          const stB = statuses.get(b.id)?.status;
          const getStatusPriority = (s?: MarketSessionStatus) => {
            if (s === "OPEN") return 0;
            if (s === "LUNCH") return 1;
            if (s === "PRE_MARKET" || s === "POST_MARKET") return 2;
            return 3;
          };
          const pA = getStatusPriority(stA);
          const pB = getStatusPriority(stB);
          if (pA !== pB) {
            comparison = pA - pB;
          } else {
            comparison = a.globalRank - b.globalRank;
          }
          break;
        }
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [exchanges, sortField, sortOrder, statuses]);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(18, 24, 32, 0.7)"
            : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.02)"
                  : "rgba(0, 0, 0, 0.02)",
            }}
          >
            <TableCell sx={{ fontWeight: 700, width: 80 }}>
              <TableSortLabel
                active={sortField === "rank"}
                direction={sortOrder}
                onClick={() => handleSort("rank")}
              >
                Rank
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              <TableSortLabel
                active={sortField === "name"}
                direction={sortOrder}
                onClick={() => handleSort("name")}
              >
                Exchange
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Region</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              <TableSortLabel
                active={sortField === "status"}
                direction={sortOrder}
                onClick={() => handleSort("status")}
              >
                Live Status & Countdown
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Local Time</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Trading Hours</TableCell>

            <TableCell sx={{ fontWeight: 700 }}>Traded Assets</TableCell>

            <TableCell align="center" sx={{ fontWeight: 700 }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedExchanges.map((ex) => {
            const st = statuses.get(ex.id);
            if (!st) return null;
            const colorConfig = getStatusColorConfig(st.status);

            return (
              <TableRow
                key={ex.id}
                hover
                onClick={() => onSelect(ex)}
                sx={{
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {/* Rank */}
                <TableCell>
                  <Chip
                    label={`#${ex.globalRank}`}
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
                      border: "1px solid rgba(0, 221, 148, 0.2)",
                    }}
                  />
                </TableCell>

                {/* Exchange Name & MIC */}
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Typography sx={{ fontSize: "1.3rem", lineHeight: 1 }}>
                      {ex.flag}
                    </Typography>
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 700, color: "text.primary" }}
                        >
                          {ex.name}
                        </Typography>
                        <Chip
                          label={ex.mic}
                          size="small"
                          sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: "0.68rem",
                            height: 20,
                            bgcolor:
                              theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.05)"
                                : "rgba(0, 0, 0, 0.05)",
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {ex.city}, {ex.country}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Region */}
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {ex.region}
                  </Typography>
                </TableCell>

                {/* Live Status & Countdown */}
                <TableCell>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: colorConfig.dotColor,
                        boxShadow: st.isRegularOpen
                          ? `0 0 6px ${colorConfig.dotColor}`
                          : "none",
                      }}
                    />
                    <Chip
                      size="small"
                      label={st.statusLabel}
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        height: 22,
                        bgcolor: colorConfig.badgeBg,
                        color: colorConfig.badgeColor,
                        border: `1px solid ${colorConfig.border}`,
                        textTransform: "uppercase",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        fontFamily: "monospace",
                        color: "text.secondary",
                      }}
                    >
                      {st.nextEvent}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Local Time */}
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTimeIcon
                      sx={{ fontSize: 13, color: "text.secondary" }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                      }}
                    >
                      {st.currentLocalTime}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {ex.timezoneAbbr}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Regular Hours (Local & Converted) */}
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", fontSize: "0.8rem" }}
                  >
                    {ex.regularHours.open} - {ex.regularHours.close}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block" }}
                  >
                    Your time: {st.userLocalOpenTime} - {st.userLocalCloseTime}
                  </Typography>
                </TableCell>

                {/* Traded Assets */}
                <TableCell>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    flexWrap="wrap"
                    sx={{ maxWidth: 220 }}
                  >
                    {ex.assetClasses.map((asset) => (
                      <Chip
                        key={asset}
                        label={asset}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.05)"
                              : "rgba(0, 0, 0, 0.05)",
                          "& .MuiChip-label": { px: 0.6 },
                        }}
                      />
                    ))}
                  </Stack>
                </TableCell>

                {/* Action */}
                <TableCell align="center">
                  <Tooltip title="View Session Schedule & Details">
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <ChevronRightIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
