import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplayIcon from "@mui/icons-material/Replay";
import SearchIcon from "@mui/icons-material/Search";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InvestorDirectoryCards } from "../components/institutional/InvestorDirectoryCards";
import {
  InvestorDirectoryTable,
  InvestorSortField,
  SortOrder,
} from "../components/institutional/InvestorDirectoryTable";
import { SmartMoneyConsensusView } from "../components/institutional/SmartMoneyConsensusView";
import { SiteFooter } from "../components/layout/SiteFooter";
import {
  FILING_SEASON_INFO,
  SMART_MONEY_CONSENSUS_TOP_25,
  TOP_100_INSTITUTIONAL_INVESTORS,
} from "../data/institutional13FData";

type ActiveSubTab = "directory" | "consensus";

export const InstitutionalHoldings13FPage: React.FC = () => {
  // Set SEO page title
  useEffect(() => {
    document.title =
      "Top 100 Institutional 13F Filings & Smart Money Portfolios | Market Indices";
  }, []);

  const navigate = useNavigate();
  const [activeSubTab, setActiveSubTab] = useState<ActiveSubTab>("directory");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortField, setSortField] = useState<InvestorSortField>("value");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [visibleCount, setVisibleCount] = useState<number>(30);

  // Filtered and sorted investors
  const filteredInvestors = useMemo(() => {
    let list = TOP_100_INSTITUTIONAL_INVESTORS;

    if (selectedCategory !== "all") {
      list = list.filter((inv) => inv.category === selectedCategory);
    }

    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      const tokens = trimmed.split(/\s+/).filter(Boolean);
      list = list.filter((inv) => {
        const searchable = [
          inv.name,
          inv.manager,
          inv.cik,
          inv.category,
          inv.cityState || "",
          ...inv.topHoldings.map((h) => `${h.ticker} ${h.name}`),
        ]
          .join(" ")
          .toLowerCase();

        return tokens.every((token) => searchable.includes(token));
      });
    }

    // Sort
    list = [...list].sort((a, b) => {
      if (sortField === "value") {
        return sortOrder === "desc"
          ? b.portfolioValueNum - a.portfolioValueNum
          : a.portfolioValueNum - b.portfolioValueNum;
      }
      if (sortField === "name") {
        const comp = a.name.localeCompare(b.name);
        return sortOrder === "desc" ? -comp : comp;
      }
      if (sortField === "manager") {
        const comp = a.manager.localeCompare(b.manager);
        return sortOrder === "desc" ? -comp : comp;
      }
      if (sortField === "concentration") {
        return sortOrder === "desc"
          ? b.top10ConcentrationPct - a.top10ConcentrationPct
          : a.top10ConcentrationPct - b.top10ConcentrationPct;
      }
      if (sortField === "filingDate") {
        const comp = a.filingDate.localeCompare(b.filingDate);
        return sortOrder === "desc" ? -comp : comp;
      }
      return 0;
    });

    return list;
  }, [searchTerm, selectedCategory, sortField, sortOrder]);

  const visibleInvestors = useMemo(() => {
    return filteredInvestors.slice(0, visibleCount);
  }, [filteredInvestors, visibleCount]);

  const hasMore = visibleCount < filteredInvestors.length;

  const handleRequestSort = (field: InvestorSortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortField(field);
      setSortOrder(field === "value" || field === "concentration" ? "desc" : "asc");
    }
    setVisibleCount(30);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortField("value");
    setSortOrder("desc");
    setVisibleCount(30);
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: TOP_100_INSTITUTIONAL_INVESTORS.length };
    for (const inv of TOP_100_INSTITUTIONAL_INVESTORS) {
      counts[inv.category] = (counts[inv.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <Container maxWidth="xl" sx={{ pt: { xs: 2.5, sm: 3.5 }, pb: 8 }}>
      {/* Spotlight KPI Header Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2.25, sm: 3 },
          mb: 3,
          borderRadius: 3.5,
          background:
            "linear-gradient(135deg, rgba(0, 221, 148, 0.08) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(11, 26, 20, 0.9) 100%)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(0, 221, 148, 0.28)",
          boxShadow: "0 8px 32px -4px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={2.5}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1 }}>
              <Chip
                icon={<ShieldOutlinedIcon sx={{ fontSize: "1rem !important" }} />}
                label="SEC Form 13F-HR Disclosures"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.74rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  borderRadius: 1.75,
                  backgroundColor: "rgba(0, 221, 148, 0.2)",
                  color: "#00DD94",
                  border: "1px solid rgba(0, 221, 148, 0.4)",
                }}
              />
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.78rem" }}>
                100 Institutional Managers
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: { xs: "1.45rem", sm: "1.85rem" },
                letterSpacing: "-0.02em",
                mb: 0.75,
              }}
            >
              13F Institutional Investor Filings & Smart Money Portfolios
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.9rem",
                maxWidth: 820,
                lineHeight: 1.55,
              }}
            >
              Quarterly equity holdings and portfolio weightings of the world&apos;s 100 premier institutional managers, hedge funds, sovereign entities, and activist investors under SEC Rule 13f-1.
            </Typography>
          </Box>

          {/* Quick Stat Pill Highlights */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              flexShrink: 0,
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "space-between", md: "flex-end" },
              flexWrap: "wrap",
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2.5,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                minWidth: 95,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#00DD94" }}>
                {FILING_SEASON_INFO.totalCapitalTracked}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 600 }}>
                Capital Tracked
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2.5,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                minWidth: 90,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.2rem", color: "text.primary" }}>
                {FILING_SEASON_INFO.activeFilersCount}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 600 }}>
                Managers
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2.5,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                minWidth: 90,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.2rem", color: "#38bdf8" }}>
                {FILING_SEASON_INFO.currentQuarter}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 600 }}>
                Filing Period
              </Typography>
            </Paper>
          </Stack>
        </Stack>
      </Paper>

      {/* Primary Subtab Switcher */}
      <Tabs
        value={activeSubTab}
        onChange={(_, val) => setActiveSubTab(val)}
        sx={{
          mb: 3,
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.92rem",
            color: "text.secondary",
            minHeight: 48,
            px: 2.5,
            "&.Mui-selected": {
              color: "#00DD94",
            },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#00DD94",
            height: 3,
            borderRadius: "3px 3px 0 0",
          },
        }}
      >
        <Tab
          value="directory"
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccountBalanceIcon sx={{ fontSize: 18 }} />
              <span>Top 100 Investors Directory</span>
            </Stack>
          }
        />
        <Tab
          value="consensus"
          label={
            <Stack direction="row" alignItems="center" spacing={1}>
              <AutoAwesomeIcon sx={{ fontSize: 18 }} />
              <span>Smart Money Consensus (Top 25)</span>
            </Stack>
          }
        />
      </Tabs>

      {/* ================= Subtab 1: Directory ================= */}
      {activeSubTab === "directory" && (
        <Box>
          {/* Controls Bar: Search, Sort, Reset, View Mode */}
          <Stack spacing={1.5} sx={{ mb: 2.5 }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              {/* Search Bar */}
              <Box
                sx={{
                  flex: 1,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  minHeight: 50,
                  px: 2,
                  borderRadius: 3,
                  backgroundColor: "rgba(11, 26, 20, 0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(0, 221, 148, 0.22)",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.4)",
                  "&:hover": {
                    borderColor: "rgba(0, 221, 148, 0.48)",
                  },
                  "&:focus-within": {
                    borderColor: "#00DD94",
                    boxShadow: "0 0 0 1px #00DD94, 0 0 24px rgba(0, 221, 148, 0.25)",
                  },
                }}
              >
                <SearchIcon sx={{ color: "text.secondary", fontSize: 20, mr: 1, flexShrink: 0 }} />
                <InputBase
                  fullWidth
                  placeholder="Search Top 100 investors by firm (Berkshire, Citadel), manager (Buffett, Dalio), ticker held (AAPL, NVDA), or CIK..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(30);
                  }}
                  sx={{ fontSize: "0.92rem", color: "text.primary" }}
                />
                {searchTerm && (
                  <IconButton
                    size="small"
                    onClick={() => setSearchTerm("")}
                    sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Sort Selector, Reset & View Mode */}
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                sx={{
                  alignSelf: { xs: "stretch", sm: "center" },
                  justifyContent: { xs: "space-between", sm: "flex-end" },
                  gap: { xs: 1, sm: 0 },
                }}
              >
                {/* Sort Selector Dropdown */}
                <FormControl
                  size="small"
                  sx={{
                    minWidth: { xs: 155, sm: 195 },
                    "& .MuiOutlinedInput-root": {
                      height: 48,
                      borderRadius: 2.5,
                      backgroundColor: "rgba(30, 41, 59, 0.4)",
                      borderColor:
                        sortField !== "value"
                          ? "rgba(0, 221, 148, 0.5)"
                          : "rgba(255, 255, 255, 0.12)",
                      color: "text.primary",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.light",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00DD94",
                      },
                    },
                  }}
                >
                  <Select
                    value={`${sortField}-${sortOrder}`}
                    onChange={(e) => {
                      const [f, o] = e.target.value.split("-") as [InvestorSortField, SortOrder];
                      setSortField(f);
                      setSortOrder(o);
                      setVisibleCount(30);
                    }}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected === "value-desc") {
                        return (
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <TrendingUpIcon sx={{ fontSize: 18, color: "#00DD94" }} />
                            <span style={{ fontWeight: 700, color: "#00DD94" }}>AUM: High to Low</span>
                          </Stack>
                        );
                      }
                      if (selected === "value-asc") {
                        return (
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <TrendingDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            <span>AUM: Low to High</span>
                          </Stack>
                        );
                      }
                      if (selected === "concentration-desc") {
                        return (
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <SortIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            <span>Top 10 Weight</span>
                          </Stack>
                        );
                      }
                      if (selected === "name-asc") {
                        return (
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <SortByAlphaIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            <span>Firm Name: A-Z</span>
                          </Stack>
                        );
                      }
                      if (selected === "manager-asc") {
                        return (
                          <Stack direction="row" alignItems="center" spacing={0.75}>
                            <SortByAlphaIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                            <span>Manager: A-Z</span>
                          </Stack>
                        );
                      }
                      return "Sort";
                    }}
                  >
                    <MenuItem value="value-desc">Portfolio Value: High to Low (Largest First)</MenuItem>
                    <MenuItem value="value-asc">Portfolio Value: Low to High</MenuItem>
                    <MenuItem value="concentration-desc">Top 10 Concentration (Most Concentrated)</MenuItem>
                    <MenuItem value="name-asc">Firm Name: A to Z</MenuItem>
                    <MenuItem value="manager-asc">Manager / Founder: A to Z</MenuItem>
                  </Select>
                </FormControl>

                {/* Reset Filters */}
                {(searchTerm || selectedCategory !== "all" || sortField !== "value") && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ReplayIcon sx={{ fontSize: 15 }} />}
                    onClick={handleResetFilters}
                    sx={{
                      height: 48,
                      px: 2,
                      borderRadius: 2.5,
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      borderColor: "rgba(255, 255, 255, 0.15)",
                      color: "text.secondary",
                      backgroundColor: "rgba(30, 41, 59, 0.4)",
                      "&:hover": {
                        borderColor: "primary.main",
                        color: "text.primary",
                      },
                    }}
                  >
                    Reset
                  </Button>
                )}

                {/* Table vs Card View Toggle */}
                <ToggleButtonGroup
                  value={viewMode}
                  exclusive
                  onChange={(_, val) => {
                    if (val) setViewMode(val);
                  }}
                  size="small"
                  sx={{
                    height: 48,
                    borderRadius: 2.5,
                    backgroundColor: "rgba(30, 41, 59, 0.4)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    "& .MuiToggleButton-root": {
                      px: 1.5,
                      color: "text.secondary",
                      borderColor: "transparent",
                      "&.Mui-selected": {
                        color: "#00DD94",
                        backgroundColor: "rgba(0, 221, 148, 0.18)",
                      },
                    },
                  }}
                >
                  <ToggleButton value="table" aria-label="table view">
                    <Tooltip title="Table View">
                      <ViewListIcon sx={{ fontSize: 20 }} />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="card" aria-label="card view">
                    <Tooltip title="Card Grid View">
                      <ViewModuleIcon sx={{ fontSize: 20 }} />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>

            {/* Category Filter Chips Bar */}
            <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.75} sx={{ width: "100%" }}>
              <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.72rem", mr: 0.5 }}>
                Archetype:
              </Typography>

              {[
                { id: "all", label: `All Managers (${TOP_100_INSTITUTIONAL_INVESTORS.length})` },
                { id: "asset_manager", label: `Mega Asset Managers (${categoryCounts.asset_manager || 0})` },
                { id: "hedge_fund", label: `Hedge Funds / Quant (${categoryCounts.hedge_fund || 0})` },
                { id: "family_office", label: `Family Offices / Value (${categoryCounts.family_office || 0})` },
                { id: "activist", label: `Activist / Catalyst (${categoryCounts.activist || 0})` },
                { id: "tech_growth", label: `Tech & Growth (${categoryCounts.tech_growth || 0})` },
                { id: "pension_sovereign", label: `Sovereign & Pensions (${categoryCounts.pension_sovereign || 0})` },
              ].map((c) => {
                const isSelected = selectedCategory === c.id;
                return (
                  <Chip
                    key={c.id}
                    label={c.label}
                    size="small"
                    clickable
                    onClick={() => {
                      setSelectedCategory(c.id);
                      setVisibleCount(30);
                    }}
                    variant={isSelected ? "filled" : "outlined"}
                    color={isSelected ? "primary" : "default"}
                    sx={{
                      fontWeight: isSelected ? 700 : 600,
                      fontSize: "0.72rem",
                      borderRadius: 2,
                      height: 26,
                      borderColor: isSelected ? "primary.main" : "rgba(255, 255, 255, 0.12)",
                      backgroundColor: isSelected ? "primary.main" : "rgba(30, 41, 59, 0.35)",
                    }}
                  />
                );
              })}

              <Typography variant="caption" sx={{ ml: "auto", color: "text.secondary", fontWeight: 700, fontSize: "0.76rem" }}>
                Showing {filteredInvestors.length} of {TOP_100_INSTITUTIONAL_INVESTORS.length} institutions
              </Typography>
            </Stack>
          </Stack>

          {/* Directory Content: Table or Cards */}
          {filteredInvestors.length === 0 ? (
            <Paper
              variant="outlined"
              sx={{
                py: 8,
                px: 2,
                textAlign: "center",
                borderRadius: 3,
                backgroundColor: "rgba(30, 41, 59, 0.3)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              <Typography variant="h6" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
                No matching institutional investors found
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                Try adjusting your search query, selecting &apos;All Managers&apos;, or resetting filters.
              </Typography>
              <Button variant="contained" size="small" onClick={handleResetFilters}>
                Reset Filters
              </Button>
            </Paper>
          ) : viewMode === "table" ? (
            <InvestorDirectoryTable
              investors={visibleInvestors}
              sortField={sortField}
              sortOrder={sortOrder}
              onRequestSort={handleRequestSort}
              onSelectInvestor={(inv) => navigate(`/13f/${inv.id}`)}
            />
          ) : (
            <InvestorDirectoryCards
              investors={visibleInvestors}
              onSelectInvestor={(inv) => navigate(`/13f/${inv.id}`)}
            />
          )}

          {/* Pagination Controls */}
          {hasMore && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 4,
                mb: 2,
                gap: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", fontWeight: 600 }}>
                Showing {visibleInvestors.length} of {filteredInvestors.length} institutional managers
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => setVisibleCount((prev) => prev + 30)}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 3,
                    py: 0.85,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  Show More ({filteredInvestors.length - visibleInvestors.length} remaining)...
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  onClick={() => setVisibleCount(filteredInvestors.length)}
                  sx={{
                    px: 2.5,
                    py: 0.85,
                    borderRadius: 2.5,
                    fontWeight: 600,
                    textTransform: "none",
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    color: "text.secondary",
                  }}
                >
                  Show All ({filteredInvestors.length})
                </Button>
              </Stack>
            </Box>
          )}

          {!hasMore && filteredInvestors.length > 30 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
              <Button
                variant="text"
                size="small"
                startIcon={<ExpandLessIcon />}
                onClick={() => {
                  setVisibleCount(30);
                  window.scrollTo({ top: 200, behavior: "smooth" });
                }}
                sx={{ color: "text.secondary", textTransform: "none" }}
              >
                Show Less (Collapse to 30)
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* ================= Subtab 2: Consensus ================= */}
      {activeSubTab === "consensus" && (
        <SmartMoneyConsensusView consensusHoldings={SMART_MONEY_CONSENSUS_TOP_25} />
      )}

      {/* Site Footer */}
      <SiteFooter />
    </Container>
  );
};

export default InstitutionalHoldings13FPage;
