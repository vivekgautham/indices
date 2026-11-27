import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
  Card,
  CardContent,
  Chip,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FlatEtfItem, MarketIndex } from "../../types";
import {
  flattenEtfsFromIndices,
  getEtfStrategyDescription,
  parseAumValue,
} from "../../utils/etfClassification";
import { getStockAnalysisEtfUrl } from "../../utils/stockAnalysis";
import { ProviderLogo } from "../ProviderLogo";

export interface EtfDirectoryViewProps {
  mode: "active" | "passive";
  indices: MarketIndex[];
}

export const EtfDirectoryView: React.FC<EtfDirectoryViewProps> = ({
  mode,
  indices,
}) => {
  const isActiveMode = mode === "active";

  // Flatten all ETFs and filter by active/passive mode
  const allModeEtfs = useMemo<FlatEtfItem[]>(() => {
    const list = flattenEtfsFromIndices(indices);
    return list.filter((e) => (isActiveMode ? e.isActive : !e.isActive));
  }, [indices, isActiveMode]);

  // Local filter & sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIssuer, setSelectedIssuer] = useState<string>("all");
  const [selectedAssetClass, setSelectedAssetClass] = useState<string>("all");
  const [sortField, setSortField] = useState<"default" | "aum" | "ticker" | "name" | "issuer">("default");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [visibleCount, setVisibleCount] = useState<number>(30);

  // Available issuers and counts
  const issuerCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allModeEtfs.length };
    for (const item of allModeEtfs) {
      counts[item.issuer] = (counts[item.issuer] || 0) + 1;
    }
    return counts;
  }, [allModeEtfs]);

  const topIssuers = useMemo(() => {
    return Object.keys(issuerCounts)
      .filter((k) => k !== "all")
      .sort((a, b) => issuerCounts[b] - issuerCounts[a]);
  }, [issuerCounts]);

  // Request column sort (used by table headers and sort select)
  const handleRequestSort = (field: "aum" | "ticker" | "name" | "issuer") => {
    if (sortField === field) {
      if (sortOrder === "desc") {
        setSortOrder("asc");
      } else {
        setSortField("default");
        setSortOrder("desc");
      }
    } else {
      setSortField(field);
      setSortOrder(field === "aum" ? "desc" : "asc");
    }
    setVisibleCount(30);
  };

  // Filtered and sorted ETF list
  const filteredEtfs = useMemo(() => {
    let list = allModeEtfs;

    if (selectedIssuer !== "all") {
      list = list.filter((e) => e.issuer === selectedIssuer);
    }

    if (selectedAssetClass !== "all") {
      list = list.filter((e) => {
        if (selectedAssetClass === "Equity") return e.assetClass === "Equity";
        if (selectedAssetClass === "Fixed Income")
          return e.assetClass === "Fixed Income";
        if (selectedAssetClass === "Real Estate")
          return /real estate|reit/i.test(e.category);
        if (selectedAssetClass === "International")
          return /developed|emerging|europe|asia|global/i.test(e.region);
        return true;
      });
    }

    const trimmed = searchTerm.trim().toLowerCase();
    if (trimmed) {
      const tokens = trimmed.split(/\s+/).filter(Boolean);
      list = list.filter((e) => {
        const searchable = [
          e.ticker,
          e.name,
          e.issuer,
          e.indexName,
          e.indexSymbol,
          e.category,
          e.region,
          e.assetClass,
          e.strategyNote || "",
        ]
          .join(" ")
          .toLowerCase();

        return tokens.every((token) => searchable.includes(token));
      });
    }

    if (sortField !== "default") {
      list = [...list].sort((a, b) => {
        if (sortField === "aum") {
          const aumA = parseAumValue(a.aum);
          const aumB = parseAumValue(b.aum);
          if (aumA !== aumB) {
            return sortOrder === "desc" ? aumB - aumA : aumA - aumB;
          }
          return a.ticker.localeCompare(b.ticker);
        }
        if (sortField === "ticker") {
          const comp = a.ticker.localeCompare(b.ticker);
          return sortOrder === "desc" ? -comp : comp;
        }
        if (sortField === "name") {
          const comp = a.name.localeCompare(b.name);
          return sortOrder === "desc" ? -comp : comp;
        }
        if (sortField === "issuer") {
          const comp = a.issuer.localeCompare(b.issuer);
          return sortOrder === "desc" ? -comp : comp;
        }
        return 0;
      });
    }

    return list;
  }, [allModeEtfs, selectedIssuer, selectedAssetClass, searchTerm, sortField, sortOrder]);

  const visibleEtfs = useMemo(() => {
    return filteredEtfs.slice(0, visibleCount);
  }, [filteredEtfs, visibleCount]);

  const hasMore = visibleCount < filteredEtfs.length;

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedIssuer("all");
    setSelectedAssetClass("all");
    setSortField("default");
    setSortOrder("desc");
    setVisibleCount(30);
  };

  const sortLabelSx = {
    color: "text.secondary !important",
    fontWeight: 800,
    fontSize: "0.78rem",
    "&.Mui-active": {
      color: (isActiveMode ? "#fbbf24" : "#00DD94") + " !important",
      "& .MuiTableSortLabel-icon": {
        color: (isActiveMode ? "#fbbf24" : "#00DD94") + " !important",
      },
    },
    "&:hover": {
      color: "text.primary !important",
    },
  };

  return (
    <Box sx={{ width: "100%", mt: 1 }}>
      {/* Spotlight KPI Header Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, sm: 2.75 },
          mb: 2.5,
          borderRadius: 3.5,
          background: isActiveMode
            ? "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(11, 26, 20, 0.85) 100%)"
            : "linear-gradient(135deg, rgba(0, 221, 148, 0.08) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(11, 26, 20, 0.85) 100%)",
          backdropFilter: "blur(16px)",
          borderColor: isActiveMode
            ? "rgba(245, 158, 11, 0.3)"
            : "rgba(0, 221, 148, 0.25)",
          boxShadow: "0 8px 32px -4px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={2}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 0.75 }}>
              <Chip
                icon={
                  isActiveMode ? (
                    <AutoAwesomeIcon sx={{ fontSize: "1rem !important" }} />
                  ) : (
                    <ShieldOutlinedIcon sx={{ fontSize: "1rem !important" }} />
                  )
                }
                label={isActiveMode ? "Actively Managed ETFs" : "Passive Index Tracking ETFs"}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.74rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  borderRadius: 1.75,
                  backgroundColor: isActiveMode
                    ? "rgba(245, 158, 11, 0.2)"
                    : "rgba(0, 221, 148, 0.2)",
                  color: isActiveMode ? "#fbbf24" : "#00DD94",
                  border: `1px solid ${isActiveMode ? "rgba(245, 158, 11, 0.4)" : "rgba(0, 221, 148, 0.4)"}`,
                }}
              />
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.78rem" }}
              >
                {allModeEtfs.length} funds cataloged
              </Typography>
            </Stack>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                letterSpacing: "-0.02em",
                mb: 0.75,
              }}
            >
              {isActiveMode
                ? "Active Factor & Systematic Benchmark Strategies"
                : "Passive Exchange-Traded Replication Funds"}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.88rem",
                maxWidth: 820,
                lineHeight: 1.55,
              }}
            >
              {isActiveMode
                ? "Actively managed exchange-traded funds (such as the Avantis factor suite, JPMorgan covered call strategies, and Vanguard active factor ETFs) employ systematic factor tilts, profitability screens, or option-overlay strategies. Each fund is benchmarked against an official prospectus benchmark index."
                : "Passive exchange-traded funds designed to directly track, replicate, and deliver the performance of underlying financial benchmarks from calculation agents like S&P Dow Jones, FTSE Russell, MSCI, Nasdaq, and Bloomberg."}
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
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2.5,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                minWidth: 90,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: isActiveMode ? "#f59e0b" : "#00DD94",
                }}
              >
                {allModeEtfs.length}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 600 }}>
                {isActiveMode ? "Active ETFs" : "Passive ETFs"}
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2.5,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                minWidth: 90,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, fontSize: "1.25rem", color: "text.primary" }}
              >
                {new Set(allModeEtfs.map((e) => e.indexId)).size}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 600 }}>
                Benchmarks
              </Typography>
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2.5,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                minWidth: 90,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, fontSize: "1.25rem", color: "#38bdf8" }}
              >
                {topIssuers.length}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", fontWeight: 600 }}>
                Sponsors
              </Typography>
            </Paper>
          </Stack>
        </Stack>
      </Paper>

      {/* Filter and Search Bar Controls */}
      <Stack spacing={1.5} sx={{ mb: 2.5 }}>
        {/* Search Bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.25}
          alignItems="center"
          sx={{ width: "100%" }}
        >
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
            <SearchIcon
              sx={{ color: "text.secondary", fontSize: 20, mr: 1, flexShrink: 0 }}
            />
            <InputBase
              fullWidth
              placeholder={
                isActiveMode
                  ? "Search Active ETFs by ticker (AVUV, AVUS, JEPI, VFMO), fund name, sponsor, or benchmark..."
                  : "Search Passive ETFs by ticker (VOO, SPY, QQQ, IWM, SCHD), fund name, sponsor, or benchmark..."
              }
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

          {/* Sort Selector, Reset Filters & View Mode Toggles */}
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
                minWidth: { xs: 160, sm: 200 },
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  borderRadius: 2.5,
                  backgroundColor: "rgba(30, 41, 59, 0.4)",
                  borderColor:
                    sortField !== "default"
                      ? isActiveMode
                        ? "rgba(245, 158, 11, 0.5)"
                        : "rgba(0, 221, 148, 0.5)"
                      : "rgba(255, 255, 255, 0.12)",
                  color: "text.primary",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: isActiveMode ? "rgba(245, 158, 11, 0.8)" : "primary.light",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: isActiveMode ? "#f59e0b" : "primary.main",
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: "text.secondary",
                },
              }}
            >
              <Select
                value={sortField === "default" ? "default" : `${sortField}-${sortOrder}`}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "default") {
                    setSortField("default");
                    setSortOrder("desc");
                  } else {
                    const [f, o] = val.split("-") as [
                      "aum" | "ticker" | "name" | "issuer",
                      "asc" | "desc",
                    ];
                    setSortField(f);
                    setSortOrder(o);
                  }
                  setVisibleCount(30);
                }}
                displayEmpty
                renderValue={(selected) => {
                  if (selected === "default") {
                    return (
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <SortIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <span>Sort: Default</span>
                      </Stack>
                    );
                  }
                  if (selected === "aum-desc") {
                    return (
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <TrendingUpIcon
                          sx={{ fontSize: 18, color: isActiveMode ? "#fbbf24" : "#00DD94" }}
                        />
                        <span
                          style={{
                            fontWeight: 700,
                            color: isActiveMode ? "#fbbf24" : "#00DD94",
                          }}
                        >
                          AUM: High to Low
                        </span>
                      </Stack>
                    );
                  }
                  if (selected === "aum-asc") {
                    return (
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <TrendingDownIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <span>AUM: Low to High</span>
                      </Stack>
                    );
                  }
                  if (selected === "ticker-asc") {
                    return (
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <SortByAlphaIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <span>Ticker: A to Z</span>
                      </Stack>
                    );
                  }
                  if (selected === "ticker-desc") {
                    return (
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <SortByAlphaIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <span>Ticker: Z to A</span>
                      </Stack>
                    );
                  }
                  if (selected === "name-asc") {
                    return (
                      <Stack direction="row" alignItems="center" spacing={0.75}>
                        <SortByAlphaIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                        <span>Name: A to Z</span>
                      </Stack>
                    );
                  }
                  return "Sort";
                }}
              >
                <MenuItem value="default">Default Order</MenuItem>
                <MenuItem value="aum-desc">AUM: High to Low (Largest First)</MenuItem>
                <MenuItem value="aum-asc">AUM: Low to High (Smallest First)</MenuItem>
                <MenuItem value="ticker-asc">Ticker: A to Z</MenuItem>
                <MenuItem value="ticker-desc">Ticker: Z to A</MenuItem>
                <MenuItem value="name-asc">Fund Name: A to Z</MenuItem>
              </Select>
            </FormControl>

            {(searchTerm ||
              selectedIssuer !== "all" ||
              selectedAssetClass !== "all" ||
              sortField !== "default") && (
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
                    color: "primary.light",
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
                <Tooltip title="Card View">
                  <ViewModuleIcon sx={{ fontSize: 20 }} />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        {/* Issuer / Sponsor Filter Chips Bar */}
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          gap={0.75}
          sx={{ width: "100%" }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.72rem", mr: 0.5 }}
          >
            Sponsor:
          </Typography>

          <Chip
            label={`All Sponsors (${allModeEtfs.length})`}
            size="small"
            clickable
            onClick={() => {
              setSelectedIssuer("all");
              setVisibleCount(30);
            }}
            variant={selectedIssuer === "all" ? "filled" : "outlined"}
            color={selectedIssuer === "all" ? "primary" : "default"}
            sx={{
              fontWeight: 700,
              fontSize: "0.72rem",
              borderRadius: 2,
              height: 26,
            }}
          />

          {topIssuers.map((issuer) => {
            const isSelected = selectedIssuer === issuer;
            return (
              <Chip
                key={issuer}
                label={`${issuer} (${issuerCounts[issuer]})`}
                size="small"
                clickable
                onClick={() => {
                  setSelectedIssuer(isSelected ? "all" : issuer);
                  setVisibleCount(30);
                }}
                variant={isSelected ? "filled" : "outlined"}
                color={isSelected ? "primary" : "default"}
                sx={{
                  fontWeight: 600,
                  fontSize: "0.72rem",
                  borderRadius: 2,
                  height: 26,
                  borderColor: isSelected ? "primary.main" : "rgba(255, 255, 255, 0.12)",
                  backgroundColor: isSelected
                    ? "primary.main"
                    : "rgba(30, 41, 59, 0.35)",
                  "&:hover": {
                    borderColor: "primary.light",
                  },
                }}
              />
            );
          })}
        </Stack>

        {/* Quick Asset Class Chips */}
        <Stack
          direction="row"
          alignItems="center"
          flexWrap="wrap"
          gap={0.75}
          sx={{ width: "100%" }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", fontWeight: 700, fontSize: "0.72rem", mr: 0.5 }}
          >
            Asset Class:
          </Typography>

          {["all", "Equity", "Fixed Income", "Real Estate", "International"].map((cls) => {
            const isSelected = selectedAssetClass === cls;
            return (
              <Chip
                key={cls}
                label={cls === "all" ? "All Asset Classes" : cls}
                size="small"
                clickable
                onClick={() => {
                  setSelectedAssetClass(cls);
                  setVisibleCount(30);
                }}
                variant={isSelected ? "filled" : "outlined"}
                sx={{
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  borderRadius: 1.5,
                  height: 24,
                  color: isSelected ? "primary.light" : "text.secondary",
                  borderColor: isSelected ? "primary.main" : "rgba(255, 255, 255, 0.08)",
                  backgroundColor: isSelected
                    ? "rgba(0, 221, 148, 0.12)"
                    : "transparent",
                  "&:hover": {
                    borderColor: "primary.light",
                  },
                }}
              />
            );
          })}

          {sortField !== "default" && (
            <Chip
              label={
                sortField === "aum"
                  ? `Sorted by AUM (${sortOrder === "desc" ? "High to Low" : "Low to High"})`
                  : sortField === "ticker"
                    ? `Sorted by Ticker (${sortOrder === "desc" ? "Z to A" : "A to Z"})`
                    : sortField === "name"
                      ? `Sorted by Name (${sortOrder === "desc" ? "Z to A" : "A to Z"})`
                      : `Sorted by Sponsor (${sortOrder === "desc" ? "Z to A" : "A to Z"})`
              }
              size="small"
              onDelete={() => {
                setSortField("default");
                setSortOrder("desc");
              }}
              sx={{
                height: 24,
                fontSize: "0.7rem",
                fontWeight: 700,
                borderRadius: 1.5,
                backgroundColor: isActiveMode
                  ? "rgba(245, 158, 11, 0.2)"
                  : "rgba(0, 221, 148, 0.15)",
                color: isActiveMode ? "#fbbf24" : "#00DD94",
                border: `1px solid ${isActiveMode ? "rgba(245, 158, 11, 0.4)" : "rgba(0, 221, 148, 0.3)"}`,
              }}
            />
          )}

          <Typography
            variant="caption"
            sx={{
              ml: "auto",
              color: "text.secondary",
              fontWeight: 700,
              fontSize: "0.76rem",
            }}
          >
            Showing {filteredEtfs.length} of {allModeEtfs.length} {isActiveMode ? "active" : "passive"} funds
          </Typography>
        </Stack>
      </Stack>

      {/* Main Content: Table or Card View */}
      {filteredEtfs.length === 0 ? (
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
            No matching {isActiveMode ? "Active" : "Passive"} ETFs found
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            Try adjusting your search keywords, clearing sponsor filters, or resetting filters.
          </Typography>
          <Button variant="contained" size="small" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </Paper>
      ) : viewMode === "table" ? (
        /* ================= Table View ================= */
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
          <Table sx={{ minWidth: 850 }} aria-label="etf directory table">
            <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.35)" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
                  <TableSortLabel
                    active={sortField === "ticker"}
                    direction={sortField === "ticker" ? sortOrder : "asc"}
                    onClick={() => handleRequestSort("ticker")}
                    sx={sortLabelSx}
                  >
                    ETF Ticker
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
                  <TableSortLabel
                    active={sortField === "name"}
                    direction={sortField === "name" ? sortOrder : "asc"}
                    onClick={() => handleRequestSort("name")}
                    sx={sortLabelSx}
                  >
                    Fund Name & Strategy
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
                  <TableSortLabel
                    active={sortField === "issuer"}
                    direction={sortField === "issuer" ? sortOrder : "asc"}
                    onClick={() => handleRequestSort("issuer")}
                    sx={sortLabelSx}
                  >
                    Sponsor
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
                  Tracked / Benchmark Index
                </TableCell>
                <TableCell sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
                  Category & Region
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, color: "text.secondary", fontSize: "0.78rem" }}>
                  <TableSortLabel
                    active={sortField === "aum"}
                    direction={sortField === "aum" ? sortOrder : "desc"}
                    onClick={() => handleRequestSort("aum")}
                    sx={{
                      ...sortLabelSx,
                      "& .MuiTableSortLabel-icon": {
                        order: 0,
                      },
                    }}
                  >
                    AUM
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleEtfs.map((etf) => {
                const url = getStockAnalysisEtfUrl(etf.ticker, etf.hasStockAnalysis);
                return (
                  <TableRow
                    key={`${etf.ticker}-${etf.indexId}`}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.15s ease",
                      "&:hover": {
                        backgroundColor: isActiveMode
                          ? "rgba(245, 158, 11, 0.05)"
                          : "rgba(0, 221, 148, 0.05)",
                      },
                    }}
                  >
                    {/* ETF Ticker & External StockAnalysis Link */}
                    <TableCell component="th" scope="row">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Box
                          component={url ? "a" : "div"}
                          {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 0.5,
                            textDecoration: "none",
                            px: 1.25,
                            py: 0.5,
                            borderRadius: 1.75,
                            backgroundColor: isActiveMode
                              ? "rgba(245, 158, 11, 0.15)"
                              : "rgba(0, 221, 148, 0.12)",
                            border: `1px solid ${
                              isActiveMode ? "rgba(245, 158, 11, 0.4)" : "rgba(0, 221, 148, 0.3)"
                            }`,
                            color: isActiveMode ? "#fbbf24" : "#00DD94",
                            fontWeight: 800,
                            fontSize: "0.86rem",
                            letterSpacing: "0.02em",
                            transition: "all 0.15s ease",
                            "&:hover": {
                              transform: "translateY(-1px)",
                              boxShadow: `0 4px 12px ${
                                isActiveMode ? "rgba(245, 158, 11, 0.3)" : "rgba(0, 221, 148, 0.3)"
                              }`,
                            },
                          }}
                        >
                          <span>{etf.ticker}</span>
                          {url && <OpenInNewIcon sx={{ fontSize: 13, opacity: 0.7 }} />}
                        </Box>

                        {isActiveMode ? (
                          <Chip
                            label="Active"
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: "0.62rem",
                              fontWeight: 800,
                              borderRadius: 1,
                              backgroundColor: "rgba(245, 158, 11, 0.2)",
                              color: "#f59e0b",
                              border: "1px solid rgba(245, 158, 11, 0.35)",
                            }}
                          />
                        ) : (
                          <Chip
                            label="Passive"
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: "0.62rem",
                              fontWeight: 700,
                              borderRadius: 1,
                              backgroundColor: "rgba(255, 255, 255, 0.06)",
                              color: "text.secondary",
                            }}
                          />
                        )}
                      </Stack>
                    </TableCell>

                    {/* ETF Name & Strategy */}
                    <TableCell sx={{ maxWidth: 320 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "text.primary",
                          fontSize: "0.85rem",
                          lineHeight: 1.35,
                          mb: 0.25,
                        }}
                      >
                        {etf.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.73rem",
                          lineHeight: 1.35,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {getEtfStrategyDescription(etf)}
                      </Typography>
                    </TableCell>

                    {/* Sponsor / Issuer */}
                    <TableCell>
                      <Chip
                        label={etf.issuer}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.73rem",
                          borderRadius: 1.5,
                          height: 24,
                          backgroundColor:
                            etf.issuer === "Avantis"
                              ? "rgba(16, 185, 129, 0.15)"
                              : etf.issuer.includes("Vanguard")
                                ? "rgba(185, 28, 28, 0.15)"
                                : etf.issuer.includes("iShares")
                                  ? "rgba(59, 130, 246, 0.15)"
                                  : etf.issuer.includes("SPDR")
                                    ? "rgba(234, 88, 12, 0.15)"
                                    : "rgba(255, 255, 255, 0.07)",
                          color:
                            etf.issuer === "Avantis"
                              ? "#34d399"
                              : etf.issuer.includes("Vanguard")
                                ? "#f87171"
                                : etf.issuer.includes("iShares")
                                  ? "#60a5fa"
                                  : etf.issuer.includes("SPDR")
                                    ? "#fb923c"
                                    : "text.primary",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      />
                    </TableCell>

                    {/* Tracked / Benchmark Index Link */}
                    <TableCell sx={{ maxWidth: 280 }}>
                      <Box
                        component={RouterLink}
                        to={`/index/${etf.indexId}`}
                        sx={{
                          textDecoration: "none",
                          display: "inline-block",
                          "&:hover .index-link-title": {
                            color: "primary.light",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.25 }}>
                          <ProviderLogo providerId={etf.indexProviderId} size={15} />
                          <Chip
                            label={etf.indexSymbol}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: "0.64rem",
                              fontWeight: 800,
                              borderRadius: 1,
                              backgroundColor: "rgba(255, 255, 255, 0.08)",
                              color: "text.secondary",
                            }}
                          />
                        </Stack>
                        <Typography
                          className="index-link-title"
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            color: "primary.light",
                            fontSize: "0.82rem",
                            lineHeight: 1.3,
                            transition: "color 0.15s ease",
                          }}
                        >
                          {etf.indexName}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Category & Region */}
                    <TableCell>
                      <Stack spacing={0.5} alignItems="flex-start">
                        <Chip
                          label={etf.category}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            borderRadius: 1,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            color: "text.secondary",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                          }}
                        />
                        <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem" }}>
                          {etf.region} • {etf.assetClass}
                        </Typography>
                      </Stack>
                    </TableCell>

                    {/* AUM */}
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 800,
                          color: "text.primary",
                          fontSize: "0.88rem",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {etf.aum || "N/A"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        /* ================= Card View ================= */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            },
            gap: 2,
          }}
        >
          {visibleEtfs.map((etf) => {
            const url = getStockAnalysisEtfUrl(etf.ticker, etf.hasStockAnalysis);
            return (
              <Card
                key={`${etf.ticker}-${etf.indexId}`}
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  backgroundColor: "rgba(15, 23, 42, 0.6)",
                  backdropFilter: "blur(12px)",
                  borderColor: isActiveMode
                    ? "rgba(245, 158, 11, 0.25)"
                    : "rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    borderColor: isActiveMode ? "#f59e0b" : "primary.main",
                    boxShadow: isActiveMode
                      ? "0 8px 24px -4px rgba(245, 158, 11, 0.25)"
                      : "0 8px 24px -4px rgba(0, 221, 148, 0.25)",
                  },
                }}
              >
                <CardContent sx={{ p: 2, pb: "16px !important" }}>
                  {/* Top Bar: Ticker Chip + Sponsor + AUM */}
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                      <Box
                        component={url ? "a" : "div"}
                        {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 0.5,
                          textDecoration: "none",
                          px: 1.25,
                          py: 0.35,
                          borderRadius: 1.5,
                          backgroundColor: isActiveMode
                            ? "rgba(245, 158, 11, 0.18)"
                            : "rgba(0, 221, 148, 0.15)",
                          border: `1px solid ${
                            isActiveMode ? "rgba(245, 158, 11, 0.45)" : "rgba(0, 221, 148, 0.35)"
                          }`,
                          color: isActiveMode ? "#fbbf24" : "#00DD94",
                          fontWeight: 800,
                          fontSize: "0.86rem",
                        }}
                      >
                        <span>{etf.ticker}</span>
                        {url && <OpenInNewIcon sx={{ fontSize: 12, opacity: 0.7 }} />}
                      </Box>

                      <Chip
                        label={etf.issuer}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          borderRadius: 1,
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          color: "text.secondary",
                        }}
                      />
                    </Stack>

                    <Typography variant="body2" sx={{ fontWeight: 800, color: "text.primary", fontSize: "0.85rem" }}>
                      {etf.aum || "N/A"}
                    </Typography>
                  </Stack>

                  {/* Fund Name */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 800,
                      fontSize: "0.92rem",
                      lineHeight: 1.35,
                      color: "text.primary",
                      mb: 1,
                      minHeight: 40,
                    }}
                  >
                    {etf.name}
                  </Typography>

                  {/* Strategy Note */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.78rem",
                      lineHeight: 1.45,
                      mb: 1.75,
                      minHeight: 48,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {getEtfStrategyDescription(etf)}
                  </Typography>

                  {/* Tracked Index Box */}
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 1.25,
                      borderRadius: 2,
                      backgroundColor: "rgba(0, 0, 0, 0.25)",
                      borderColor: "rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.03em",
                        display: "block",
                        mb: 0.5,
                      }}
                    >
                      {isActiveMode ? "Prospectus Benchmark Index:" : "Underlying Index:"}
                    </Typography>

                    <Box
                      component={RouterLink}
                      to={`/index/${etf.indexId}`}
                      sx={{
                        textDecoration: "none",
                        display: "block",
                        "&:hover .card-index-title": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mb: 0.25 }}>
                        <ProviderLogo providerId={etf.indexProviderId} size={14} />
                        <Chip
                          label={etf.indexSymbol}
                          size="small"
                          sx={{
                            height: 17,
                            fontSize: "0.62rem",
                            fontWeight: 800,
                            borderRadius: 0.75,
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            color: "text.secondary",
                          }}
                        />
                      </Stack>
                      <Typography
                        className="card-index-title"
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: "primary.light",
                          fontSize: "0.8rem",
                          lineHeight: 1.3,
                        }}
                      >
                        {etf.indexName}
                      </Typography>
                    </Box>
                  </Paper>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Show More Pagination Controls */}
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
            Showing {visibleEtfs.length} of {filteredEtfs.length} funds
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
              Show More ({filteredEtfs.length - visibleEtfs.length} remaining)...
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => setVisibleCount(filteredEtfs.length)}
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
              Show All ({filteredEtfs.length})
            </Button>
          </Stack>
        </Box>
      )}

      {!hasMore && filteredEtfs.length > 30 && (
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
  );
};

export default EtfDirectoryView;
