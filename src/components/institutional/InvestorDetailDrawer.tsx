import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { InstitutionalInvestor13F, PositionChangeStatus } from "../../types/institutional13F";
import { getStockAnalysisEtfUrl } from "../../utils/stockAnalysis";

interface InvestorDetailDrawerProps {
  investor: InstitutionalInvestor13F | null;
  open: boolean;
  onClose: () => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  hedge_fund: { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.35)" },
  asset_manager: { bg: "rgba(0, 221, 148, 0.15)", text: "#00DD94", border: "rgba(0, 221, 148, 0.35)" },
  family_office: { bg: "rgba(139, 92, 246, 0.15)", text: "#a78bfa", border: "rgba(139, 92, 246, 0.35)" },
  activist: { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171", border: "rgba(239, 68, 68, 0.35)" },
  pension_sovereign: { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.35)" },
  tech_growth: { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6", border: "rgba(236, 72, 153, 0.35)" },
};

function formatCategoryLabel(cat: string): string {
  switch (cat) {
    case "hedge_fund": return "Hedge Fund / Quant";
    case "asset_manager": return "Mega Asset Manager";
    case "family_office": return "Family Office / Value";
    case "activist": return "Activist / Catalyst";
    case "pension_sovereign": return "Sovereign / Pension";
    case "tech_growth": return "Tech & Growth";
    default: return cat;
  }
}

function renderRankBadge(rank: number) {
  let bg = "rgba(255, 255, 255, 0.08)";
  let text = "rgba(255, 255, 255, 0.7)";
  let border = "rgba(255, 255, 255, 0.15)";

  if (rank === 1) {
    bg = "rgba(245, 158, 11, 0.2)";
    text = "#fbbf24";
    border = "rgba(245, 158, 11, 0.4)";
  } else if (rank === 2) {
    bg = "rgba(148, 163, 184, 0.2)";
    text = "#cbd5e1";
    border = "rgba(148, 163, 184, 0.4)";
  } else if (rank === 3) {
    bg = "rgba(217, 119, 6, 0.2)";
    text = "#f59e0b";
    border = "rgba(217, 119, 6, 0.4)";
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        borderRadius: "50%",
        backgroundColor: bg,
        color: text,
        border: `1px solid ${border}`,
        fontWeight: 800,
        fontSize: "0.68rem",
      }}
    >
      #{rank}
    </Box>
  );
}

function renderChangeBadge(status: PositionChangeStatus, changePct?: number) {
  if (status === "new") {
    return (
      <Chip
        label="NEW STAKE"
        size="small"
        sx={{
          height: 20,
          fontSize: "0.64rem",
          fontWeight: 800,
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          color: "#34d399",
          border: "1px solid rgba(16, 185, 129, 0.4)",
        }}
      />
    );
  }
  if (status === "increased") {
    return (
      <Tooltip title={`Increased shares by ${changePct ? `+${changePct}%` : "position addition"}`}>
        <Chip
          icon={<TrendingUpIcon sx={{ fontSize: "12px !important" }} />}
          label={changePct ? `+${changePct}%` : "INCREASED"}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.64rem",
            fontWeight: 800,
            backgroundColor: "rgba(0, 221, 148, 0.15)",
            color: "#00DD94",
            border: "1px solid rgba(0, 221, 148, 0.3)",
          }}
        />
      </Tooltip>
    );
  }
  if (status === "reduced") {
    return (
      <Tooltip title={`Trimmed shares by ${changePct ? `${changePct}%` : "position reduction"}`}>
        <Chip
          icon={<TrendingDownIcon sx={{ fontSize: "12px !important" }} />}
          label={changePct ? `${changePct}%` : "TRIMMED"}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.64rem",
            fontWeight: 800,
            backgroundColor: "rgba(245, 158, 11, 0.15)",
            color: "#fbbf24",
            border: "1px solid rgba(245, 158, 11, 0.3)",
          }}
        />
      </Tooltip>
    );
  }
  return (
    <Chip
      icon={<TrendingFlatIcon sx={{ fontSize: "12px !important" }} />}
      label="UNMODIFIED"
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
  if (val >= 1e9) return `$${(val / 1e9).toFixed(2)} B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)} M`;
  return `$${val.toLocaleString()}`;
}

export const InvestorDetailDrawer: React.FC<InvestorDetailDrawerProps> = ({
  investor,
  open,
  onClose,
}) => {
  const top10Stats = useMemo(() => {
    if (!investor) return { totalVal: 0, maxWeight: 10 };
    const totalVal = investor.topHoldings.reduce((sum, h) => sum + h.value, 0);
    const maxWeight = Math.max(...investor.topHoldings.map((h) => h.portfolioWeight), 1);
    return { totalVal, maxWeight };
  }, [investor]);

  if (!investor) return null;

  const catStyle = CATEGORY_COLORS[investor.category] || {
    bg: "rgba(255, 255, 255, 0.08)",
    text: "text.primary",
    border: "rgba(255, 255, 255, 0.15)",
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 640, md: 740 },
          backgroundColor: "#08130F",
          backgroundImage: "linear-gradient(180deg, rgba(11, 26, 20, 0.95) 0%, rgba(5, 13, 10, 0.98) 100%)",
          color: "text.primary",
          borderLeft: "1px solid rgba(0, 221, 148, 0.2)",
          boxShadow: "-8px 0 40px rgba(0, 0, 0, 0.7)",
          p: { xs: 2, sm: 3 },
          overflowY: "auto",
        },
      }}
    >
      {/* Header Close & CIK Pill */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5 }}>
          <Chip
            icon={<ShieldOutlinedIcon sx={{ fontSize: "14px !important" }} />}
            label={`SEC CIK ${investor.cik}`}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              color: "text.secondary",
            }}
          />
          <Chip
            label={formatCategoryLabel(investor.category)}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              backgroundColor: catStyle.bg,
              color: catStyle.text,
              border: `1px solid ${catStyle.border}`,
            }}
          />
        </Stack>

        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close details"
          sx={{
            color: "text.secondary",
            "&:hover": { color: "text.primary", backgroundColor: "rgba(255, 255, 255, 0.08)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      {/* Main Firm Info Banner */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2.5 }}>
        <Avatar
          sx={{
            width: 56,
            height: 56,
            backgroundColor: "rgba(0, 221, 148, 0.15)",
            border: "1.5px solid rgba(0, 221, 148, 0.4)",
            color: "#00DD94",
            fontWeight: 800,
            fontSize: "1.2rem",
          }}
        >
          {investor.avatarInitials || investor.name.slice(0, 2).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.01em", lineHeight: 1.25 }}>
            {investor.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.25, fontWeight: 600 }}>
            Managed by <span style={{ color: "#00DD94" }}>{investor.manager}</span>
            {investor.cityState ? ` • ${investor.cityState}` : ""}
          </Typography>
        </Box>
      </Stack>

      {/* Key Metric Highlights Box */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2.5,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
          gap: 1.5,
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
            13F Portfolio Value
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#00DD94", fontSize: "1.1rem" }}>
            {investor.portfolioValue}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
            Top 10 Concentration
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", fontSize: "1.1rem" }}>
            {investor.top10ConcentrationPct}%
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
            Report Period
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#38bdf8", fontSize: "1.1rem" }}>
            {investor.reportPeriod}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600, display: "block" }}>
            Filing Date
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "text.secondary", fontSize: "0.95rem", mt: 0.25 }}>
            {investor.filingDate}
          </Typography>
        </Box>
      </Paper>

      {/* Description / Strategy Note */}
      {investor.description && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.secondary", textTransform: "uppercase", fontSize: "0.72rem", letterSpacing: "0.04em", mb: 0.75 }}>
            Investment Strategy & Mandate
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.86rem", lineHeight: 1.55 }}>
            {investor.description}
          </Typography>
        </Box>
      )}

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", mb: 2.5 }} />

      {/* Holdings Section Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1, flexWrap: "wrap", gap: 1 }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
            Top 10 Holdings ({investor.topHoldings.length} Positions)
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {investor.top10ConcentrationPct}% of total portfolio • Combined value: {formatDollar(top10Stats.totalVal)}
          </Typography>
        </Box>

        <Button
          component="a"
          href={investor.secFilingUrl}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          endIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
          sx={{
            textTransform: "none",
            fontSize: "0.76rem",
            color: "#00DD94",
            fontWeight: 700,
            backgroundColor: "rgba(0, 221, 148, 0.08)",
            border: "1px solid rgba(0, 221, 148, 0.25)",
            "&:hover": { backgroundColor: "rgba(0, 221, 148, 0.16)", textDecoration: "none" },
          }}
        >
          View Full 13F on SEC EDGAR
        </Button>
      </Stack>

      {/* Top 10 Concentration Bar */}
      <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
            Top 10 Portfolio Weight vs Remaining
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 800, color: "#00DD94" }}>
            {investor.top10ConcentrationPct}% in Top 10 • {Math.max(0, Number((100 - investor.top10ConcentrationPct).toFixed(1)))}% other ({Math.max(0, investor.holdingsCount - investor.topHoldings.length)} stocks)
          </Typography>
        </Stack>
        <Box sx={{ width: "100%", height: 6, borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.08)", overflow: "hidden", display: "flex" }}>
          <Box sx={{ width: `${Math.min(100, investor.top10ConcentrationPct)}%`, height: "100%", backgroundColor: "#00DD94" }} />
          <Box sx={{ width: `${Math.max(0, 100 - investor.top10ConcentrationPct)}%`, height: "100%", backgroundColor: "rgba(255, 255, 255, 0.15)" }} />
        </Box>
      </Box>

      {/* Top 10 Holdings Table */}
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{
          borderRadius: 2.5,
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          borderColor: "rgba(255, 255, 255, 0.07)",
          mb: 3,
        }}
      >
        <Table size="small">
          <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.72rem", width: 44 }}>
                #
              </TableCell>
              <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.72rem" }}>
                Ticker & Company
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.72rem" }}>
                Market Value
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.72rem", minWidth: 120 }}>
                Weight (% of Fund)
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.72rem" }}>
                Quarterly Move
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investor.topHoldings.map((h, i) => {
              const url = getStockAnalysisEtfUrl(h.ticker, true);
              const rank = i + 1;
              const relativeBarPct = top10Stats.maxWeight > 0 ? (h.portfolioWeight / top10Stats.maxWeight) * 100 : 0;

              return (
                <TableRow
                  key={`${h.ticker}-${i}`}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "rgba(0, 221, 148, 0.04)" },
                  }}
                >
                  {/* Rank Column */}
                  <TableCell sx={{ py: 1.2 }}>
                    {renderRankBadge(rank)}
                  </TableCell>

                  {/* Ticker & Company */}
                  <TableCell sx={{ py: 1.2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        component={url ? "a" : "div"}
                        {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.25,
                          textDecoration: "none",
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          backgroundColor: "rgba(0, 221, 148, 0.12)",
                          color: "#00DD94",
                          fontWeight: 800,
                          fontSize: "0.78rem",
                          border: "1px solid rgba(0, 221, 148, 0.25)",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        <span>{h.ticker}</span>
                        {url && <OpenInNewIcon sx={{ fontSize: 10, opacity: 0.7 }} />}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          color: "text.primary",
                          maxWidth: { xs: 120, sm: 180, md: 220 },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Market Value & Shares */}
                  <TableCell align="right" sx={{ py: 1.2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: "0.82rem", color: "text.primary" }}>
                      {formatDollar(h.value)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.68rem" }}>
                      {h.shares.toLocaleString()} shs
                    </Typography>
                  </TableCell>

                  {/* Portfolio Weight & Visual Bar */}
                  <TableCell align="right" sx={{ py: 1.2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, fontSize: "0.86rem", color: "#00DD94" }}>
                      {h.portfolioWeight}%
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: 90,
                        ml: "auto",
                        mt: 0.4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          width: `${Math.min(100, Math.max(3, relativeBarPct))}%`,
                          height: "100%",
                          borderRadius: 2,
                          backgroundColor: "#00DD94",
                        }}
                      />
                    </Box>
                  </TableCell>

                  {/* Quarterly Move Badge */}
                  <TableCell align="right" sx={{ py: 1.2 }}>
                    {renderChangeBadge(h.changeStatus, h.changePct)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {/* Table Footer: Top 10 Combined Summary */}
          <TableFooter sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
            <TableRow>
              <TableCell colSpan={2} sx={{ fontWeight: 800, color: "text.primary", fontSize: "0.78rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                Top 10 Holdings Combined
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 800, color: "text.primary", fontSize: "0.82rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                {formatDollar(top10Stats.totalVal)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 900, color: "#00DD94", fontSize: "0.88rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                {investor.top10ConcentrationPct}%
              </TableCell>
              <TableCell align="right" sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <Chip
                  label={`${investor.topHoldings.length} POSITIONS`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.62rem",
                    fontWeight: 800,
                    backgroundColor: "rgba(0, 221, 148, 0.12)",
                    color: "#00DD94",
                    border: "1px solid rgba(0, 221, 148, 0.3)",
                  }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Footer Outbound SEC Link Action */}
      <Box sx={{ mt: "auto", pt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          component="a"
          href={investor.secFilingUrl}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<LaunchIcon />}
          sx={{
            py: 1,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "0.85rem",
            textTransform: "none",
            borderColor: "rgba(0, 221, 148, 0.4)",
            color: "#00DD94",
            backgroundColor: "rgba(0, 221, 148, 0.08)",
            "&:hover": {
              borderColor: "#00DD94",
              backgroundColor: "rgba(0, 221, 148, 0.15)",
            },
          }}
        >
          Open Form 13F-HR on Official SEC EDGAR System
        </Button>
      </Box>
    </Drawer>
  );
};
