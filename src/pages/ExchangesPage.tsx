import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearIcon from "@mui/icons-material/Clear";
import GridViewIcon from "@mui/icons-material/GridView";
import PieChartIcon from "@mui/icons-material/PieChart";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";
import TableRowsIcon from "@mui/icons-material/TableRows";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExchangeCard } from "../components/exchanges/ExchangeCard";
import { ExchangeDetailDrawer } from "../components/exchanges/ExchangeDetailDrawer";
import { ExchangeStatusTicker } from "../components/exchanges/ExchangeStatusTicker";
import { ExchangeTable } from "../components/exchanges/ExchangeTable";
import SiteFooter from "../components/layout/SiteFooter";
import { CountryMarketCapTable } from "../components/markets/CountryMarketCapTable";
import { COUNTRY_MARKET_CAP_DATA } from "../data/countryMarketCapData";
import { WORLD_EXCHANGES } from "../data/exchangesData";
import {
  ExchangeLiveStatus,
  ExchangeRegion,
  MarketSessionStatus,
  WorldExchange,
} from "../types/exchange";
import { getExchangeLiveStatus } from "../utils/marketHours";

export default function ExchangesPage() {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  // Subtab navigation state ("sessions" vs "capitalization")
  const currentTabParam = searchParams.get("tab");
  const activeTab: "sessions" | "capitalization" =
    currentTabParam === "capitalization" || currentTabParam === "market-cap"
      ? "capitalization"
      : "sessions";

  const handleTabChange = (newTab: "sessions" | "capitalization") => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newTab === "sessions") {
        next.delete("tab");
      } else {
        next.set("tab", "capitalization");
      }
      return next;
    });
  };

  // Real-time clock updating every second
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<ExchangeRegion | "All">(
    "All",
  );
  const [openOnly, setOpenOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Selected exchange for detail drawer
  const [selectedExchange, setSelectedExchange] =
    useState<WorldExchange | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Compute live statuses for all exchanges based on currentTime
  const exchangeStatuses = useMemo(() => {
    const map = new Map<string, ExchangeLiveStatus>();
    WORLD_EXCHANGES.forEach((ex) => {
      map.set(ex.id, getExchangeLiveStatus(ex, currentTime));
    });
    return map;
  }, [currentTime]);

  const openCount = useMemo(() => {
    let count = 0;
    exchangeStatuses.forEach((status) => {
      if (status.status === "OPEN") {
        count += 1;
      }
    });
    return count;
  }, [exchangeStatuses]);

  // Filtering and sorting (Open exchanges first, then by global rank)
  const filteredExchanges = useMemo(() => {
    const list = WORLD_EXCHANGES.filter((ex) => {
      const status = exchangeStatuses.get(ex.id);

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = ex.name.toLowerCase().includes(query);
        const matchesShort = ex.shortName.toLowerCase().includes(query);
        const matchesMic = ex.mic.toLowerCase().includes(query);
        const matchesCountry = ex.country.toLowerCase().includes(query);
        const matchesCity = ex.city.toLowerCase().includes(query);
        if (
          !matchesName &&
          !matchesShort &&
          !matchesMic &&
          !matchesCountry &&
          !matchesCity
        ) {
          return false;
        }
      }

      // Region match
      if (selectedRegion !== "All" && ex.region !== selectedRegion) {
        return false;
      }

      // Open only match
      if (openOnly && status?.status !== "OPEN") {
        return false;
      }

      return true;
    });

    const getStatusPriority = (status?: MarketSessionStatus) => {
      if (status === "OPEN") return 0;
      if (status === "LUNCH") return 1;
      if (status === "PRE_MARKET" || status === "POST_MARKET") return 2;
      return 3;
    };

    return list.sort((a, b) => {
      const aPriority = getStatusPriority(exchangeStatuses.get(a.id)?.status);
      const bPriority = getStatusPriority(exchangeStatuses.get(b.id)?.status);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      return a.globalRank - b.globalRank;
    });
  }, [searchQuery, selectedRegion, openOnly, exchangeStatuses]);

  const handleSelectExchange = (ex: WorldExchange) => {
    setSelectedExchange(ex);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const selectedExchangeStatus = selectedExchange
    ? exchangeStatuses.get(selectedExchange.id) || null
    : null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 2.5, md: 3.5 }, flex: 1 }}>
        {/* Dashboard Actions Bar / Main Navigation Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            mb: { xs: 2, sm: 2.5 },
          }}
        >
          {/* Main Navigation Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, val) => handleTabChange(val)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: 40,
              maxWidth: "100%",
              width: { xs: "100%", md: "auto" },
              backgroundColor: "rgba(15, 23, 42, 0.45)",
              p: 0.5,
              borderRadius: 3,
              border:
                "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
              "& .MuiTabs-scroller": {
                overflowX: "auto !important",
              },
              "& .MuiTabs-flexContainer": {
                gap: { xs: 0.5, sm: 0.75 },
              },
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTab-root": {
                minHeight: 32,
                minWidth: "unset",
                py: 0.6,
                px: { xs: 1.25, sm: 2 },
                fontSize: { xs: "0.74rem", sm: "0.82rem" },
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2.5,
                color: "text.secondary",
                flexShrink: 0,
                whiteSpace: "nowrap",
                transition: "all 0.15s ease-in-out",
                "&.Mui-selected": {
                  color: "#fff",
                  backgroundColor: "rgba(99, 102, 241, 0.25)",
                  border: "1px solid rgba(99, 102, 241, 0.5)",
                },
              },
            }}
          >
            <Tab
              icon={<AccessTimeIcon sx={{ fontSize: { xs: 15, sm: 16 } }} />}
              iconPosition="start"
              label={
                <span>
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    {`Trading Sessions (${WORLD_EXCHANGES.length})`}
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    {`Sessions (${WORLD_EXCHANGES.length})`}
                  </Box>
                </span>
              }
              value="sessions"
            />
            <Tab
              icon={<PieChartIcon sx={{ fontSize: { xs: 15, sm: 16 } }} />}
              iconPosition="start"
              label={
                <span>
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    {`Market Capitalization (${COUNTRY_MARKET_CAP_DATA.countriesCount})`}
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
                    {`Market Cap (${COUNTRY_MARKET_CAP_DATA.countriesCount})`}
                  </Box>
                </span>
              }
              value="capitalization"
            />
          </Tabs>

          {/* Quick Summary Badge */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              width: { xs: "100%", md: "auto" },
              justifyContent: { xs: "flex-end", md: "flex-start" },
            }}
          >
            {activeTab === "sessions" ? (
              <Chip
                icon={
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      bgcolor: "#10b981",
                      boxShadow: "0 0 8px #10b981",
                      ml: 0.5,
                    }}
                  />
                }
                label={`${openCount} Exchanges Open`}
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 0.5,
                  py: 0.4,
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "#10b981",
                  bgcolor: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                }}
              />
            ) : (
              <Chip
                label={`Top 30 Cap: ${COUNTRY_MARKET_CAP_DATA.top30TotalFormatted}`}
                size="small"
                sx={{
                  borderRadius: 2,
                  px: 0.5,
                  py: 0.4,
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  color: "#6366f1",
                  bgcolor: "rgba(99, 102, 241, 0.08)",
                  border: "1px solid rgba(99, 102, 241, 0.25)",
                }}
              />
            )}
          </Box>
        </Box>

        {/* Page Title & Subtitle */}
        <Box sx={{ mb: { xs: 2, sm: 2.5 } }}>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            mb={0.75}
            flexWrap="wrap"
          >
            <PublicIcon
              sx={{ fontSize: { xs: 26, sm: 30 }, color: theme.palette.primary.main }}
            />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", sm: "2rem" } }}>
              {activeTab === "capitalization"
                ? "Global Market Capitalization"
                : "World Exchanges & Markets"}
            </Typography>
            <Chip
              label="Top 30 Global"
              size="small"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                bgcolor: "rgba(0, 221, 148, 0.1)",
                border: "1px solid rgba(0, 221, 148, 0.25)",
              }}
            />
          </Stack>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 840, fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
          >
            {activeTab === "capitalization"
              ? "Total public equity market capitalization of the top 30 countries worldwide, national market share, tracked companies, and primary exchanges."
              : "Real-time session status, countdown timers, and trading hours for the top 30 world stock, derivatives, and commodities exchanges."}
          </Typography>
        </Box>

        {/* Tab Content */}
        {activeTab === "capitalization" ? (
          <CountryMarketCapTable />
        ) : (
          <>
            {/* Command Center Status Ticker */}
            <ExchangeStatusTicker
              exchanges={WORLD_EXCHANGES}
              statuses={exchangeStatuses}
              currentTime={currentTime}
            />

            {/* Control & Filter Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 2.5,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(18, 24, 32, 0.6)"
                : "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Stack spacing={2}>
            {/* Full-Width Search Bar */}
            <OutlinedInput
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exchange name, MIC (e.g. XNYS), city, or country..."
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: "text.secondary", fontSize: 20, mr: 0.5 }}
                  />
                </InputAdornment>
              }
              endAdornment={
                searchQuery ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setSearchQuery("")}
                      sx={{ color: "text.secondary", p: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }
              sx={{
                width: "100%",
                borderRadius: 2,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.02)",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              }}
            />

            {/* Filter Controls Row: Region Tabs + Open Filter + View Mode Switcher */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", md: "center" }}
              justifyContent="space-between"
            >
              {/* Region Tabs */}
              <Tabs
                value={selectedRegion}
                onChange={(_, val) => setSelectedRegion(val)}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  minHeight: 36,
                  "& .MuiTabs-scroller": {
                    overflowX: "auto !important",
                  },
                  "& .MuiTab-root": {
                    minHeight: 36,
                    minWidth: "unset",
                    py: 0.5,
                    px: { xs: 1.25, sm: 1.75 },
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: { xs: "0.75rem", sm: "0.82rem" },
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  },
                }}
              >
                <Tab label="All Regions (30)" value="All" />
                <Tab label="Americas (8)" value="Americas" />
                <Tab label="EMEA (11)" value="EMEA" />
                <Tab label="APAC (11)" value="APAC" />
              </Tabs>

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent={{ xs: "space-between", md: "flex-end" }}
              >
                {/* Open Only Filter Toggle */}
                <Button
                  variant={openOnly ? "contained" : "outlined"}
                  onClick={() => setOpenOnly(!openOnly)}
                  size="small"
                  startIcon={
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        bgcolor: openOnly ? "#000" : "#00DD94",
                      }}
                    />
                  }
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 2,
                    borderColor: openOnly
                      ? "transparent"
                      : "rgba(0, 221, 148, 0.4)",
                    color: openOnly ? "#000" : "text.primary",
                    bgcolor: openOnly
                      ? theme.palette.primary.main
                      : "transparent",
                    "&:hover": {
                      bgcolor: openOnly
                        ? theme.palette.primary.dark
                        : "rgba(0, 221, 148, 0.08)",
                    },
                  }}
                >
                  Open Now
                </Button>

                {/* View Mode Switcher */}
                <ButtonGroup
                  size="small"
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.04)"
                        : "rgba(0, 0, 0, 0.04)",
                    borderRadius: 2,
                    p: 0.4,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <Button
                    onClick={() => setViewMode("grid")}
                    variant={viewMode === "grid" ? "contained" : "text"}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 1.5,
                      minWidth: 70,
                      boxShadow: "none",
                      bgcolor:
                        viewMode === "grid"
                          ? theme.palette.primary.main
                          : "transparent",
                      color: viewMode === "grid" ? "#000" : "text.secondary",
                      "&:hover": {
                        bgcolor:
                          viewMode === "grid"
                            ? theme.palette.primary.dark
                            : "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                    startIcon={<GridViewIcon sx={{ fontSize: 16 }} />}
                  >
                    Grid
                  </Button>
                  <Button
                    onClick={() => setViewMode("table")}
                    variant={viewMode === "table" ? "contained" : "text"}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 1.5,
                      minWidth: 70,
                      boxShadow: "none",
                      bgcolor:
                        viewMode === "table"
                          ? theme.palette.primary.main
                          : "transparent",
                      color: viewMode === "table" ? "#000" : "text.secondary",
                      "&:hover": {
                        bgcolor:
                          viewMode === "table"
                            ? theme.palette.primary.dark
                            : "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                    startIcon={<TableRowsIcon sx={{ fontSize: 16 }} />}
                  >
                    Table
                  </Button>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Stack>
        </Paper>

        {/* Results Counter */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Showing {filteredExchanges.length} of {WORLD_EXCHANGES.length}{" "}
            Exchanges
          </Typography>
        </Stack>

        {/* Empty State */}
        {filteredExchanges.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              border: `1px dashed ${theme.palette.divider}`,
              bgcolor: "transparent",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              No exchanges match your criteria
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 2.5 }}
            >
              Try clearing the search query or adjusting active filters.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("All");
                setOpenOnly(false);
              }}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Reset Filters
            </Button>
          </Paper>
        )}

        {/* Grid View */}
        {viewMode === "grid" && filteredExchanges.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              },
              gap: 2.5,
            }}
          >
            {filteredExchanges.map((ex) => {
              const status = exchangeStatuses.get(ex.id);
              if (!status) return null;
              return (
                <ExchangeCard
                  key={ex.id}
                  exchange={ex}
                  status={status}
                  onSelect={handleSelectExchange}
                />
              );
            })}
          </Box>
        )}

        {/* Table View */}
        {viewMode === "table" && filteredExchanges.length > 0 && (
          <ExchangeTable
            exchanges={filteredExchanges}
            statuses={exchangeStatuses}
            onSelect={handleSelectExchange}
          />
        )}
          </>
        )}

        {/* Slide-Over Detail Drawer */}
        <ExchangeDetailDrawer
          exchange={selectedExchange}
          status={selectedExchangeStatus}
          open={drawerOpen}
          onClose={handleCloseDrawer}
        />
      </Container>

      {/* Footer */}
      <SiteFooter />
    </Box>
  );
}
