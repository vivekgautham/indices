import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import LaunchIcon from "@mui/icons-material/Launch";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Alert,
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { SiteFooter } from "../components/layout/SiteFooter";
import ShareButton from "../components/ShareButton";
import { TOP_100_INSTITUTIONAL_INVESTORS } from "../data/institutional13FData";
import { PositionChangeStatus } from "../types/institutional13F";
import { getStockAnalysisEtfUrl } from "../utils/stockAnalysis";

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
    bg = "rgba(245, 158, 11, 0.25)";
    text = "#fbbf24";
    border = "rgba(245, 158, 11, 0.5)";
  } else if (rank === 2) {
    bg = "rgba(148, 163, 184, 0.25)";
    text = "#cbd5e1";
    border = "rgba(148, 163, 184, 0.5)";
  } else if (rank === 3) {
    bg = "rgba(217, 119, 6, 0.25)";
    text = "#f59e0b";
    border = "rgba(217, 119, 6, 0.5)";
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        borderRadius: "50%",
        backgroundColor: bg,
        color: text,
        border: `1px solid ${border}`,
        fontWeight: 800,
        fontSize: "0.72rem",
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
          height: 22,
          fontSize: "0.66rem",
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
          icon={<TrendingUpIcon sx={{ fontSize: "13px !important" }} />}
          label={changePct ? `+${changePct}%` : "INCREASED"}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.66rem",
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
          icon={<TrendingDownIcon sx={{ fontSize: "13px !important" }} />}
          label={changePct ? `${changePct}%` : "TRIMMED"}
          size="small"
          sx={{
            height: 22,
            fontSize: "0.66rem",
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
      icon={<TrendingFlatIcon sx={{ fontSize: "13px !important" }} />}
      label="UNMODIFIED"
      size="small"
      sx={{
        height: 22,
        fontSize: "0.64rem",
        fontWeight: 700,
        backgroundColor: "rgba(255, 255, 255, 0.06)",
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

type SortField = "rank" | "ticker" | "name" | "value" | "weight" | "change";
type SortOrder = "asc" | "desc";

export const InvestorDetailPage: React.FC = () => {
  const { investorId = "" } = useParams<{ investorId: string }>();

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Lookup investor
  const investor = useMemo(() => {
    const target = investorId.trim().toLowerCase();
    return TOP_100_INSTITUTIONAL_INVESTORS.find(
      (inv) => inv.id.toLowerCase() === target || inv.cik.toLowerCase() === target
    );
  }, [investorId]);

  // Scroll to top when investor changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [investorId]);

  // Set document title
  useEffect(() => {
    if (investor) {
      document.title = `${investor.name} (${investor.manager}) 13F Portfolio Holdings & Stock Picks | MarketIndices`;
    } else {
      document.title = "Institutional Investor Not Found | MarketIndices";
    }
  }, [investor]);

  // Filter & sort holdings
  const filteredHoldings = useMemo(() => {
    if (!investor) return [];
    let list = investor.topHoldings.map((h, i) => ({ ...h, originalRank: i + 1 }));

    // Text search (ticker or company name)
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (h) => h.ticker.toLowerCase().includes(q) || h.name.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      list = list.filter((h) => h.changeStatus === statusFilter);
    }

    // Sort
    list.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "rank":
          comparison = a.originalRank - b.originalRank;
          break;
        case "ticker":
          comparison = a.ticker.localeCompare(b.ticker);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "value":
          comparison = a.value - b.value;
          break;
        case "weight":
          comparison = a.portfolioWeight - b.portfolioWeight;
          break;
        case "change":
          comparison = (a.changePct || 0) - (b.changePct || 0);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return list;
  }, [investor, searchQuery, statusFilter, sortField, sortOrder]);

  // Calculations for filtered subset
  const subsetStats = useMemo(() => {
    const totalVal = filteredHoldings.reduce((sum, h) => sum + h.value, 0);
    const totalWeight = Number(
      filteredHoldings.reduce((sum, h) => sum + h.portfolioWeight, 0).toFixed(2)
    );
    const maxWeight = investor
      ? Math.max(...investor.topHoldings.map((h) => h.portfolioWeight), 1)
      : 1;
    return { totalVal, totalWeight, maxWeight };
  }, [filteredHoldings, investor]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder(field === "rank" ? "asc" : "desc");
    }
  };

  if (!investor) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
          }}
        >
          <AccountBalanceIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            Institutional Investor Not Found
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
            The requested institutional fund &quot;{investorId}&quot; could not be located in our verified directory.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/13f"
            startIcon={<ArrowBackIcon />}
            sx={{
              backgroundColor: "#00DD94",
              color: "#050D0A",
              fontWeight: 800,
              "&:hover": { backgroundColor: "#00c483" },
            }}
          >
            Back to 13F Institutional Directory
          </Button>
        </Paper>
      </Container>
    );
  }

  const catStyle = CATEGORY_COLORS[investor.category] || {
    bg: "rgba(255, 255, 255, 0.08)",
    text: "text.primary",
    border: "rgba(255, 255, 255, 0.15)",
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Breadcrumb Navigation & Action Bar */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 2.5 }}
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/13f" underline="hover" color="inherit">
            13F Filings
          </Link>
          <Typography color="text.primary" sx={{ fontWeight: 700, fontSize: "0.85rem" }}>
            {investor.name}
          </Typography>
        </Breadcrumbs>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            component={RouterLink}
            to="/13f"
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.8rem",
              borderRadius: 2,
              borderColor: "rgba(255, 255, 255, 0.15)",
              color: "text.primary",
              "&:hover": { borderColor: "#00DD94", backgroundColor: "rgba(0, 221, 148, 0.05)" },
            }}
          >
            All 100 Funds
          </Button>

          <ShareButton
            item={{
              title: `${investor.name} 13F Portfolio Holdings`,
              path: `/13f/${investor.id}`,
              text: `Explore ${investor.name}'s latest SEC Form 13F holdings, top stock picks, and concentration reported by ${investor.manager}.`,
            }}
          />
        </Stack>
      </Stack>

      {/* Main Fund Hero Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          mb: 3.5,
          borderRadius: 3,
          backgroundColor: "rgba(11, 26, 20, 0.6)",
          backgroundImage: "linear-gradient(135deg, rgba(0, 221, 148, 0.06) 0%, rgba(5, 13, 10, 0.9) 100%)",
          borderColor: "rgba(0, 221, 148, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)",
        }}
      >
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems={{ xs: "flex-start", md: "center" }} justifyContent="space-between">
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Avatar
              sx={{
                width: { xs: 64, sm: 72 },
                height: { xs: 64, sm: 72 },
                backgroundColor: "rgba(0, 221, 148, 0.15)",
                border: "2px solid rgba(0, 221, 148, 0.4)",
                color: "#00DD94",
                fontWeight: 900,
                fontSize: { xs: "1.4rem", sm: "1.6rem" },
              }}
            >
              {investor.avatarInitials || investor.name.slice(0, 2).toUpperCase()}
            </Avatar>

            <Box>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, flexWrap: "wrap", gap: 0.5 }}>
                <Chip
                  label={formatCategoryLabel(investor.category)}
                  size="small"
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.72rem",
                    backgroundColor: catStyle.bg,
                    color: catStyle.text,
                    border: `1px solid ${catStyle.border}`,
                  }}
                />
                <Chip
                  icon={<ShieldOutlinedIcon sx={{ fontSize: "13px !important" }} />}
                  label={`SEC CIK ${investor.cik}`}
                  size="small"
                  component="a"
                  href={investor.secFilingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  clickable
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    backgroundColor: "rgba(255, 255, 255, 0.07)",
                    color: "text.secondary",
                    "&:hover": { color: "#00DD94" },
                  }}
                />
              </Stack>

              <Typography variant="h4" sx={{ fontWeight: 900, color: "text.primary", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                {investor.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mt: 0.5, fontWeight: 600 }}>
                Lead Portfolio Manager: <span style={{ color: "#00DD94", fontWeight: 700 }}>{investor.manager}</span>
                {investor.cityState ? ` • ${investor.cityState}` : ""}
              </Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            component="a"
            href={investor.secFilingUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<LaunchIcon />}
            sx={{
              py: 1.25,
              px: 2.5,
              borderRadius: 2.5,
              fontWeight: 800,
              fontSize: "0.86rem",
              textTransform: "none",
              color: "#050D0A",
              backgroundColor: "#00DD94",
              boxShadow: "0 4px 14px rgba(0, 221, 148, 0.3)",
              "&:hover": { backgroundColor: "#00c483" },
              alignSelf: { xs: "stretch", md: "center" },
            }}
          >
            Open Official 13F-HR on SEC EDGAR
          </Button>
        </Stack>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)", my: 2.5 }} />

        {/* 5 Financial Metric Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" },
            gap: 2,
          }}
        >
          <Paper
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.06)", textAlign: "center" }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
              Total 13F Portfolio AUM
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#00DD94", mt: 0.25 }}>
              {investor.portfolioValue}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.06)", textAlign: "center" }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
              Total SEC Holdings
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary", mt: 0.25 }}>
              {investor.holdingsCount.toLocaleString()}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.06)", textAlign: "center" }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
              Top 10 Concentration
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 900, color: "#38bdf8", mt: 0.25 }}>
              {investor.top10ConcentrationPct}%
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.06)", textAlign: "center" }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
              Filing Report Period
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary", mt: 0.25 }}>
              {investor.reportPeriod}
            </Typography>
          </Paper>

          <Paper
            variant="outlined"
            sx={{ p: 1.75, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.3)", borderColor: "rgba(255, 255, 255, 0.06)", textAlign: "center" }}
          >
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, display: "block" }}>
              Filing Date
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "text.secondary", mt: 0.25 }}>
              {investor.filingDate}
            </Typography>
          </Paper>
        </Box>

        {/* Strategy Description */}
        {investor.description && (
          <Box sx={{ mt: 2.5, p: 2, borderRadius: 2, backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <Typography variant="caption" sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#00DD94", display: "block", mb: 0.5 }}>
              Investment Strategy & Mandate
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, fontSize: "0.88rem" }}>
              {investor.description}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Holdings Section */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
          backgroundColor: "rgba(15, 23, 42, 0.5)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.25)",
          mb: 4,
        }}
      >
        {/* Section Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={1.5}
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, color: "text.primary" }}>
              Reported Portfolio Holdings
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.84rem" }}>
              Displaying {filteredHoldings.length} of {investor.topHoldings.length} reported positions • Combined Value: {formatDollar(subsetStats.totalVal)} ({subsetStats.totalWeight}% of portfolio)
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
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "#00DD94",
              backgroundColor: "rgba(0, 221, 148, 0.08)",
              border: "1px solid rgba(0, 221, 148, 0.25)",
              "&:hover": { backgroundColor: "rgba(0, 221, 148, 0.16)" },
            }}
          >
            View Complete 13F on SEC EDGAR
          </Button>
        </Stack>

        {/* Top 10 Concentration Bar */}
        <Box sx={{ mb: 2.5, p: 1.75, borderRadius: 2, backgroundColor: "rgba(0, 0, 0, 0.25)", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.75 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
              Portfolio Weight Distribution
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: "#00DD94" }}>
              {investor.top10ConcentrationPct}% in Top 10 • {Math.max(0, Number((100 - investor.top10ConcentrationPct).toFixed(1)))}% other ({Math.max(0, investor.holdingsCount - 10)} positions)
            </Typography>
          </Stack>
          <Box sx={{ width: "100%", height: 7, borderRadius: 3.5, backgroundColor: "rgba(255, 255, 255, 0.08)", overflow: "hidden", display: "flex" }}>
            <Box sx={{ width: `${Math.min(100, investor.top10ConcentrationPct)}%`, height: "100%", backgroundColor: "#00DD94" }} />
            <Box sx={{ width: `${Math.max(0, 100 - investor.top10ConcentrationPct)}%`, height: "100%", backgroundColor: "rgba(255, 255, 255, 0.18)" }} />
          </Box>
        </Box>

        {/* Search Bar & Action Filter Toolbar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2.5 }}
        >
          {/* Ticker & Company Search Bar */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search by Ticker or Company name (e.g. AAPL, NVDA, Microsoft)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#00DD94", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery("")} sx={{ color: "text.secondary" }}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                borderRadius: 2,
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                color: "text.primary",
                fontSize: "0.88rem",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
                "&:hover fieldset": { borderColor: "#00DD94" },
                "&.Mui-focused fieldset": { borderColor: "#00DD94" },
              },
            }}
            sx={{ maxWidth: { xs: "100%", sm: 460 } }}
          />

          {/* Quick Filter Status Chips */}
          <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap", gap: 0.75 }}>
            {[
              { id: "all", label: `All (${investor.topHoldings.length})` },
              { id: "increased", label: "Increased" },
              { id: "new", label: "New Stakes" },
              { id: "reduced", label: "Trimmed" },
              { id: "unmodified", label: "Unmodified" },
            ].map((f) => {
              const active = statusFilter === f.id;
              return (
                <Chip
                  key={f.id}
                  label={f.label}
                  size="small"
                  onClick={() => setStatusFilter(f.id)}
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.72rem",
                    cursor: "pointer",
                    backgroundColor: active ? "#00DD94" : "rgba(255, 255, 255, 0.06)",
                    color: active ? "#050D0A" : "text.secondary",
                    border: `1px solid ${active ? "#00DD94" : "rgba(255, 255, 255, 0.12)"}`,
                    "&:hover": {
                      backgroundColor: active ? "#00c483" : "rgba(255, 255, 255, 0.12)",
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Stack>

        {/* Holdings Table */}
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{
            borderRadius: 2.5,
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            overflowX: "auto",
          }}
        >
          <Table size="medium">
            <TableHead sx={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.74rem", width: 50 }}>
                  <TableSortLabel
                    active={sortField === "rank"}
                    direction={sortField === "rank" ? sortOrder : "asc"}
                    onClick={() => handleSort("rank")}
                  >
                    #
                  </TableSortLabel>
                </TableCell>

                <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.74rem" }}>
                  <TableSortLabel
                    active={sortField === "ticker"}
                    direction={sortField === "ticker" ? sortOrder : "asc"}
                    onClick={() => handleSort("ticker")}
                  >
                    Ticker & Company
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.74rem" }}>
                  <TableSortLabel
                    active={sortField === "value"}
                    direction={sortField === "value" ? sortOrder : "desc"}
                    onClick={() => handleSort("value")}
                  >
                    Market Value ($)
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.74rem", minWidth: 150 }}>
                  <TableSortLabel
                    active={sortField === "weight"}
                    direction={sortField === "weight" ? sortOrder : "desc"}
                    onClick={() => handleSort("weight")}
                  >
                    Portfolio Weight (%)
                  </TableSortLabel>
                </TableCell>

                <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.74rem" }}>
                  <TableSortLabel
                    active={sortField === "change"}
                    direction={sortField === "change" ? sortOrder : "desc"}
                    onClick={() => handleSort("change")}
                  >
                    Quarterly Action
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredHoldings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 6, textAlign: "center" }}>
                    <Typography variant="body1" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
                      No holdings match your search &quot;{searchQuery}&quot;
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>
                      Try searching by another ticker symbol (e.g. AAPL, MSFT, NVDA) or clear your filter.
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                      }}
                      sx={{ textTransform: "none", color: "#00DD94", borderColor: "#00DD94" }}
                    >
                      Clear Filters
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                filteredHoldings.map((h) => {
                  const url = getStockAnalysisEtfUrl(h.ticker, true);
                  const relativeBarPct =
                    subsetStats.maxWeight > 0 ? (h.portfolioWeight / subsetStats.maxWeight) * 100 : 0;

                  return (
                    <TableRow
                      key={`${h.ticker}-${h.originalRank}`}
                      hover
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "rgba(0, 221, 148, 0.04)" },
                      }}
                    >
                      {/* Rank */}
                      <TableCell sx={{ py: 1.5 }}>
                        {renderRankBadge(h.originalRank)}
                      </TableCell>

                      {/* Ticker & Company */}
                      <TableCell sx={{ py: 1.5 }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Box
                            component={url ? "a" : "div"}
                            {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.3,
                              textDecoration: "none",
                              px: 1.2,
                              py: 0.35,
                              borderRadius: 1.25,
                              backgroundColor: "rgba(0, 221, 148, 0.12)",
                              color: "#00DD94",
                              fontWeight: 800,
                              fontSize: "0.82rem",
                              border: "1px solid rgba(0, 221, 148, 0.3)",
                              "&:hover": { textDecoration: "underline", backgroundColor: "rgba(0, 221, 148, 0.2)" },
                            }}
                          >
                            <span>{h.ticker}</span>
                            {url && <OpenInNewIcon sx={{ fontSize: 11, opacity: 0.7 }} />}
                          </Box>

                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 800, fontSize: "0.88rem", color: "text.primary" }}>
                              {h.name}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Market Value & Shares */}
                      <TableCell align="right" sx={{ py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, fontSize: "0.88rem", color: "text.primary" }}>
                          {formatDollar(h.value)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.72rem" }}>
                          {h.shares.toLocaleString()} shares
                        </Typography>
                      </TableCell>

                      {/* Portfolio Weight & Proportional Bar */}
                      <TableCell align="right" sx={{ py: 1.5 }}>
                        <Typography variant="body2" sx={{ fontWeight: 900, fontSize: "0.92rem", color: "#00DD94" }}>
                          {h.portfolioWeight}%
                        </Typography>
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: 110,
                            ml: "auto",
                            mt: 0.5,
                            height: 5,
                            borderRadius: 2.5,
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: `${Math.min(100, Math.max(3, relativeBarPct))}%`,
                              height: "100%",
                              borderRadius: 2.5,
                              backgroundColor: "#00DD94",
                            }}
                          />
                        </Box>
                      </TableCell>

                      {/* Quarterly Action Badge */}
                      <TableCell align="right" sx={{ py: 1.5 }}>
                        {renderChangeBadge(h.changeStatus, h.changePct)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>

            {/* Table Footer: Combined Sum of Displayed Positions */}
            {filteredHoldings.length > 0 && (
              <TableFooter sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: 900, color: "text.primary", fontSize: "0.84rem", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
                    Combined Filtered Holdings ({filteredHoldings.length} Positions)
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900, color: "text.primary", fontSize: "0.88rem", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
                    {formatDollar(subsetStats.totalVal)}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900, color: "#00DD94", fontSize: "0.94rem", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
                    {subsetStats.totalWeight}%
                  </TableCell>
                  <TableCell align="right" sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
                    <Chip
                      label={`${filteredHoldings.length} DISPLAYED`}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: "0.64rem",
                        fontWeight: 800,
                        backgroundColor: "rgba(0, 221, 148, 0.12)",
                        color: "#00DD94",
                        border: "1px solid rgba(0, 221, 148, 0.3)",
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </TableContainer>
      </Paper>

      {/* Institutional SEC Regulatory Notice Card */}
      <Alert
        severity="info"
        variant="outlined"
        sx={{
          mb: 4,
          borderRadius: 2.5,
          backgroundColor: "rgba(0, 221, 148, 0.04)",
          borderColor: "rgba(0, 221, 148, 0.2)",
          color: "text.secondary",
          fontSize: "0.82rem",
          "& .MuiAlert-icon": { color: "#00DD94" },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5, fontSize: "0.86rem" }}>
          About SEC Form 13F Filings &amp; Data Integrity
        </Typography>
        Institutional investment managers managing over $100 million in Section 13(f) securities are mandated by the U.S. Securities &amp; Exchange Commission (SEC) to file Form 13F within 45 days after the close of each calendar quarter. Reported holdings represent long U.S. equity positions, options (calls/puts), and ADRs. Short positions and foreign non-ADR securities are not required to be reported under 13F rules. All links point directly to {investor.name}&apos;s authenticated SEC EDGAR CIK record ({investor.cik}).
      </Alert>

      {/* Site Footer */}
      <SiteFooter />
    </Container>
  );
};

export default InvestorDetailPage;
