import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { ConsensusHolding } from "../../types/institutional13F";
import { getStockAnalysisEtfUrl } from "../../utils/stockAnalysis";

interface SmartMoneyConsensusViewProps {
  consensusHoldings: ConsensusHolding[];
}

function renderSentimentBadge(sentiment: ConsensusHolding["sentiment"]) {
  if (sentiment === "strong_buy") {
    return (
      <Tooltip title="Substantial institutional net buying and new position initiations in recent filings">
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: "12px !important" }} />}
          label="HEAVY ACCUMULATION"
          size="small"
          sx={{
            height: 20,
            fontSize: "0.62rem",
            fontWeight: 800,
            backgroundColor: "rgba(0, 221, 148, 0.2)",
            color: "#00DD94",
            border: "1px solid rgba(0, 221, 148, 0.4)",
          }}
        />
      </Tooltip>
    );
  }
  if (sentiment === "buy") {
    return (
      <Tooltip title="Net positive institutional additions across multiple funds">
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: "12px !important" }} />}
          label="NET BUY"
          size="small"
          sx={{
            height: 20,
            fontSize: "0.62rem",
            fontWeight: 800,
            backgroundColor: "rgba(59, 130, 246, 0.2)",
            color: "#60a5fa",
            border: "1px solid rgba(59, 130, 246, 0.4)",
          }}
        />
      </Tooltip>
    );
  }
  if (sentiment === "trim") {
    return (
      <Tooltip title="Modest position trimming or profit taking in latest quarter">
        <Chip
          icon={<TrendingDownIcon sx={{ fontSize: "12px !important" }} />}
          label="MODEST TRIM"
          size="small"
          sx={{
            height: 20,
            fontSize: "0.62rem",
            fontWeight: 700,
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            color: "#fbbf24",
            border: "1px solid rgba(245, 158, 11, 0.35)",
          }}
        />
      </Tooltip>
    );
  }
  return (
    <Chip
      icon={<TrendingFlatIcon sx={{ fontSize: "12px !important" }} />}
      label="NEUTRAL / HELD"
      size="small"
      sx={{
        height: 20,
        fontSize: "0.62rem",
        fontWeight: 700,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "text.secondary",
      }}
    />
  );
}

function formatDollar(val: number): string {
  if (val >= 1e12) return `$${(val / 1e12).toFixed(2)} T`;
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)} B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(0)} M`;
  return `$${val.toLocaleString()}`;
}

export const SmartMoneyConsensusView: React.FC<SmartMoneyConsensusViewProps> = ({
  consensusHoldings,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Intro Header */}
      <Paper
        variant="outlined"
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 3,
          backgroundColor: "rgba(11, 26, 20, 0.7)",
          borderColor: "rgba(0, 221, 148, 0.25)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <AutoAwesomeIcon sx={{ color: "#00DD94", fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary" }}>
            The Institutional Top 25: Smart Money Consensus
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: 900, lineHeight: 1.5 }}>
          Aggregated across the Top 100 institutional managers (Vanguard, BlackRock, Berkshire Hathaway, Citadel, Bridgewater, etc.).
          Ranked by total institutional capital invested and breadth of institutional ownership.
        </Typography>
      </Paper>

      {/* Consensus Table */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: 3.5,
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          overflowX: "auto",
          "& .MuiTableCell-root": {
            borderColor: "rgba(255, 255, 255, 0.07)",
            py: 1.5,
            px: { xs: 1.5, sm: 2 },
          },
        }}
      >
        <Table sx={{ minWidth: 880 }} aria-label="smart money consensus table">
          <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem", width: 60 }}>
                Rank
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
                Company & Ticker
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
                Sector
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
                Funds Holding
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
                Total Invested
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
                Avg Weight
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
                Prominent Fund Holders
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
                Institutional Trend
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {consensusHoldings.map((stock) => {
              const url = getStockAnalysisEtfUrl(stock.ticker, true);
              return (
                <TableRow
                  key={stock.ticker}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "rgba(0, 221, 148, 0.05)" },
                  }}
                >
                  {/* Rank */}
                  <TableCell>
                    <Chip
                      label={`#${stock.rank}`}
                      size="small"
                      sx={{
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        height: 22,
                        backgroundColor: stock.rank <= 3 ? "rgba(245, 158, 11, 0.2)" : "rgba(255, 255, 255, 0.06)",
                        color: stock.rank <= 3 ? "#fbbf24" : "text.secondary",
                        border: stock.rank <= 3 ? "1px solid rgba(245, 158, 11, 0.4)" : "none",
                      }}
                    />
                  </TableCell>

                  {/* Ticker & Name */}
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.25}>
                      <Box
                        component={url ? "a" : "div"}
                        {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.25,
                          textDecoration: "none",
                          px: 1.25,
                          py: 0.35,
                          borderRadius: 1.5,
                          backgroundColor: "rgba(0, 221, 148, 0.12)",
                          border: "1px solid rgba(0, 221, 148, 0.3)",
                          color: "#00DD94",
                          fontWeight: 800,
                          fontSize: "0.86rem",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        <span>{stock.ticker}</span>
                        {url && <OpenInNewIcon sx={{ fontSize: 11, opacity: 0.7 }} />}
                      </Box>

                      <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.85rem" }}>
                        {stock.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Sector */}
                  <TableCell>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, fontSize: "0.76rem" }}>
                      {stock.sector}
                    </Typography>
                  </TableCell>

                  {/* Funds Holding */}
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary", fontSize: "0.88rem" }}>
                      {stock.holdersCount} <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.75rem" }}>/ 100</span>
                    </Typography>
                  </TableCell>

                  {/* Total Invested */}
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#00DD94", fontSize: "0.9rem" }}>
                      {formatDollar(stock.totalValue)}
                    </Typography>
                  </TableCell>

                  {/* Avg Weight */}
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.82rem" }}>
                      {stock.avgWeightPct}%
                    </Typography>
                  </TableCell>

                  {/* Prominent Holders */}
                  <TableCell sx={{ maxWidth: 220 }}>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                      {stock.topFunds.slice(0, 3).map((fund, idx) => (
                        <Chip
                          key={`${fund}-${idx}`}
                          label={fund}
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "0.62rem",
                            fontWeight: 600,
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            color: "text.secondary",
                          }}
                        />
                      ))}
                    </Stack>
                  </TableCell>

                  {/* Sentiment */}
                  <TableCell align="right">
                    {renderSentimentBadge(stock.sentiment)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
