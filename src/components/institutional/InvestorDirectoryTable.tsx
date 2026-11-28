import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Avatar,
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
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { InstitutionalInvestor13F } from "../../types/institutional13F";

export type InvestorSortField = "value" | "name" | "manager" | "concentration" | "filingDate";
export type SortOrder = "asc" | "desc";

interface InvestorDirectoryTableProps {
  investors: InstitutionalInvestor13F[];
  sortField: InvestorSortField;
  sortOrder: SortOrder;
  onRequestSort: (field: InvestorSortField) => void;
  onSelectInvestor: (investor: InstitutionalInvestor13F) => void;
}

const CATEGORY_CHIP_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  hedge_fund: { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.35)" },
  asset_manager: { bg: "rgba(0, 221, 148, 0.15)", text: "#00DD94", border: "rgba(0, 221, 148, 0.35)" },
  family_office: { bg: "rgba(139, 92, 246, 0.15)", text: "#a78bfa", border: "rgba(139, 92, 246, 0.35)" },
  activist: { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171", border: "rgba(239, 68, 68, 0.35)" },
  pension_sovereign: { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.35)" },
  tech_growth: { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6", border: "rgba(236, 72, 153, 0.35)" },
};

function formatCategoryLabel(cat: string): string {
  switch (cat) {
    case "hedge_fund": return "Hedge Fund";
    case "asset_manager": return "Asset Manager";
    case "family_office": return "Family Office";
    case "activist": return "Activist";
    case "pension_sovereign": return "Sovereign / Pension";
    case "tech_growth": return "Growth Tech";
    default: return cat;
  }
}

export const InvestorDirectoryTable: React.FC<InvestorDirectoryTableProps> = ({
  investors,
  sortField,
  sortOrder,
  onRequestSort,
  onSelectInvestor,
}) => {
  const sortLabelSx = {
    color: "text.secondary !important",
    fontWeight: 800,
    fontSize: "0.76rem",
    "&.Mui-active": {
      color: "#00DD94 !important",
      "& .MuiTableSortLabel-icon": {
        color: "#00DD94 !important",
      },
    },
    "&:hover": {
      color: "text.primary !important",
    },
  };

  return (
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
      <Table sx={{ minWidth: 920 }} aria-label="13f institutional investor directory table">
        <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
              <TableSortLabel
                active={sortField === "name"}
                direction={sortField === "name" ? sortOrder : "asc"}
                onClick={() => onRequestSort("name")}
                sx={sortLabelSx}
              >
                Institutional Manager & Firm
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
              <TableSortLabel
                active={sortField === "manager"}
                direction={sortField === "manager" ? sortOrder : "asc"}
                onClick={() => onRequestSort("manager")}
                sx={sortLabelSx}
              >
                Key Person / Founder
              </TableSortLabel>
            </TableCell>

            <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
              Archetype
            </TableCell>

            <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
              Top Holdings (Concentration Preview)
            </TableCell>

            <TableCell align="center" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
              <TableSortLabel
                active={sortField === "concentration"}
                direction={sortField === "concentration" ? sortOrder : "desc"}
                onClick={() => onRequestSort("concentration")}
                sx={sortLabelSx}
              >
                Top 10 Weight
              </TableSortLabel>
            </TableCell>

            <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem" }}>
              <TableSortLabel
                active={sortField === "value"}
                direction={sortField === "value" ? sortOrder : "desc"}
                onClick={() => onRequestSort("value")}
                sx={{
                  ...sortLabelSx,
                  "& .MuiTableSortLabel-icon": { order: 0 },
                }}
              >
                13F Value (AUM)
              </TableSortLabel>
            </TableCell>

            <TableCell align="center" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.76rem", width: 50 }}>
              Details
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {investors.map((inv) => {
            const catColor = CATEGORY_CHIP_COLORS[inv.category] || {
              bg: "rgba(255, 255, 255, 0.08)",
              text: "text.secondary",
              border: "rgba(255, 255, 255, 0.12)",
            };
            const top3 = inv.topHoldings.slice(0, 3);

            return (
              <TableRow
                key={inv.id}
                hover
                onClick={() => onSelectInvestor(inv)}
                sx={{
                  cursor: "pointer",
                  "&:last-child td, &:last-child th": { border: 0 },
                  transition: "background-color 0.15s ease",
                  "&:hover": {
                    backgroundColor: "rgba(0, 221, 148, 0.05)",
                  },
                }}
              >
                {/* Firm Name + Avatar + CIK */}
                <TableCell component="th" scope="row">
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        width: 36,
                        height: 36,
                        backgroundColor: "rgba(0, 221, 148, 0.12)",
                        border: "1px solid rgba(0, 221, 148, 0.3)",
                        color: "#00DD94",
                        fontWeight: 800,
                        fontSize: "0.8rem",
                      }}
                    >
                      {inv.avatarInitials || inv.name.slice(0, 2).toUpperCase()}
                    </Avatar>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "text.primary",
                          fontSize: "0.88rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {inv.name}
                      </Typography>

                      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.25 }}>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
                          CIK: {inv.cik}
                        </Typography>
                        <Tooltip title="Open official SEC EDGAR repository for this manager">
                          <Box
                            component="a"
                            href={inv.secFilingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              color: "text.secondary",
                              "&:hover": { color: "#00DD94" },
                            }}
                          >
                            <LaunchIcon sx={{ fontSize: 11 }} />
                          </Box>
                        </Tooltip>
                      </Stack>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Manager / Founder */}
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", fontSize: "0.84rem" }}>
                    {inv.manager}
                  </Typography>
                  {inv.cityState && (
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", display: "block" }}>
                      {inv.cityState}
                    </Typography>
                  )}
                </TableCell>

                {/* Category Chip */}
                <TableCell>
                  <Chip
                    label={formatCategoryLabel(inv.category)}
                    size="small"
                    sx={{
                      height: 22,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      borderRadius: 1.5,
                      backgroundColor: catColor.bg,
                      color: catColor.text,
                      border: `1px solid ${catColor.border}`,
                    }}
                  />
                </TableCell>

                {/* Top 3 Holdings Preview Chips */}
                <TableCell sx={{ maxWidth: 300 }}>
                  <Stack direction="row" spacing={0.75} flexWrap="wrap" gap={0.5}>
                    {top3.map((h, i) => (
                      <Chip
                        key={`${h.ticker}-${i}`}
                        label={`${h.ticker} (${h.portfolioWeight}%)`}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.66rem",
                          fontWeight: 700,
                          borderRadius: 1,
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          color: "text.primary",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      />
                    ))}
                    {inv.topHoldings.length > 3 && (
                      <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.68rem", alignSelf: "center" }}>
                        +{inv.topHoldings.length - 3} more
                      </Typography>
                    )}
                  </Stack>
                </TableCell>

                {/* Top 10 Concentration */}
                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary", fontSize: "0.85rem" }}>
                    {inv.top10ConcentrationPct}%
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.68rem" }}>
                    {inv.holdingsCount} stocks
                  </Typography>
                </TableCell>

                {/* Portfolio Value (AUM) */}
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 800,
                      color: "#00DD94",
                      fontSize: "0.94rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {inv.portfolioValue}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.68rem" }}>
                    {inv.reportPeriod}
                  </Typography>
                </TableCell>

                {/* Open Action Arrow */}
                <TableCell align="center">
                  <ArrowForwardIcon sx={{ fontSize: 16, color: "text.secondary", opacity: 0.6 }} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
