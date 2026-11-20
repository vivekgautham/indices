import ClearIcon from "@mui/icons-material/Clear";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import TableRowsIcon from "@mui/icons-material/TableRows";
import {
  Box,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  LinearProgress,
  OutlinedInput,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  COUNTRY_MARKET_CAP_DATA,
  CountryMarketCap,
  CountryRegion,
} from "../../data/countryMarketCapData";
import { CountryMarketCapKpiBar } from "./CountryMarketCapKpiBar";

export const CountryMarketCapTable: React.FC = () => {
  const theme = useTheme();
  const dataset = COUNTRY_MARKET_CAP_DATA;

  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<CountryRegion | "All">(
    "All"
  );
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");

  // Regional counts
  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: dataset.countries.length };
    dataset.countries.forEach((c) => {
      counts[c.region] = (counts[c.region] || 0) + 1;
    });
    return counts;
  }, [dataset]);

  // Filtered countries
  const filteredCountries = useMemo(() => {
    return dataset.countries.filter((item) => {
      // Region match
      if (selectedRegion !== "All" && item.region !== selectedRegion) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCountry = item.country.toLowerCase().includes(q);
        const matchesCode = item.countryCode.toLowerCase().includes(q);
        const matchesTopCo = item.topCompany.name.toLowerCase().includes(q);
        const matchesTicker = item.topCompany.ticker.toLowerCase().includes(q);
        const matchesExchanges = item.primaryExchanges.some((ex) =>
          ex.toLowerCase().includes(q)
        );
        if (
          !matchesCountry &&
          !matchesCode &&
          !matchesTopCo &&
          !matchesTicker &&
          !matchesExchanges
        ) {
          return false;
        }
      }

      return true;
    });
  }, [dataset, selectedRegion, searchQuery]);

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return { bg: "#f59e0b", text: "#000000" };
    if (rank === 2) return { bg: "#94a3b8", text: "#000000" };
    if (rank === 3) return { bg: "#b45309", text: "#ffffff" };
    return {
      bg: "var(--indices-card-bg, rgba(255, 255, 255, 0.06))",
      text: "inherit",
    };
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* KPI Cards Bar */}
      <CountryMarketCapKpiBar />

      {/* Control Toolbar */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: 2.5,
          borderRadius: 3,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(15, 23, 42, 0.6)"
              : "rgba(255, 255, 255, 0.8)",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack spacing={2}>
          {/* Search Bar */}
          <OutlinedInput
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search country, ISO code, flagship company (e.g. NVIDIA, TSMC, ASML), or exchange..."
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
            }}
          />

          {/* Region Tabs & View Switcher */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
          >
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
              <Tab
                label={`All Regions (${regionCounts.All || 30})`}
                value="All"
              />
              <Tab
                label={`Americas (${regionCounts.Americas || 0})`}
                value="Americas"
              />
              <Tab
                label={`Europe (${regionCounts.Europe || 0})`}
                value="Europe"
              />
              <Tab
                label={`Asia-Pacific (${regionCounts["Asia-Pacific"] || 0})`}
                value="Asia-Pacific"
              />
              <Tab
                label={`Middle East (${regionCounts["Middle East"] || 0})`}
                value="Middle East"
              />
              <Tab
                label={`Africa (${regionCounts.Africa || 0})`}
                value="Africa"
              />
            </Tabs>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent={{ xs: "space-between", md: "flex-end" }}
            >
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                Showing {filteredCountries.length} of 30 countries
              </Typography>

              <ButtonGroup size="small" variant="outlined">
                <IconButton
                  size="small"
                  onClick={() => setViewMode("table")}
                  sx={{
                    color:
                      viewMode === "table" ? "primary.main" : "text.secondary",
                    backgroundColor:
                      viewMode === "table"
                        ? "rgba(99, 102, 241, 0.12)"
                        : "transparent",
                    borderRadius: "6px 0 0 6px",
                    border: `1px solid ${theme.palette.divider}`,
                    p: 0.75,
                  }}
                  title="Table view"
                >
                  <TableRowsIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setViewMode("cards")}
                  sx={{
                    color:
                      viewMode === "cards" ? "primary.main" : "text.secondary",
                    backgroundColor:
                      viewMode === "cards"
                        ? "rgba(99, 102, 241, 0.12)"
                        : "transparent",
                    borderRadius: "0 6px 6px 0",
                    border: `1px solid ${theme.palette.divider}`,
                    borderLeft: "none",
                    p: 0.75,
                  }}
                  title="Card view"
                >
                  <GridViewIcon fontSize="small" />
                </IconButton>
              </ButtonGroup>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      {/* Main Content Area */}
      {viewMode === "table" ? (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(15, 23, 42, 0.4)"
                : "rgba(255, 255, 255, 0.6)",
            overflowX: "auto",
            mb: 2.5,
          }}
        >
          <Table size="medium">
            <TableHead>
              <TableRow sx={{ bgcolor: "rgba(255, 255, 255, 0.02)" }}>
                <TableCell sx={{ fontWeight: 800, width: 65, pl: 2.5 }}>
                  #
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Country</TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="right">
                  Market Capitalization
                </TableCell>
                <TableCell sx={{ fontWeight: 800, width: 200 }} align="left">
                  Share of Top 30
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }} align="center">
                  Companies
                </TableCell>
                <TableCell sx={{ fontWeight: 800 }}>Primary Exchanges</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCountries.map((item: CountryMarketCap) => {
                const badge = getRankBadgeColor(item.rank);

                return (
                  <TableRow
                    key={item.countryCode}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      transition: "background-color 0.15s ease",
                    }}
                  >
                    {/* Rank */}
                    <TableCell sx={{ pl: 2.5 }}>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          bgcolor: badge.bg,
                          color: badge.text,
                          fontWeight: 800,
                          fontSize: "0.8rem",
                          boxShadow:
                            item.rank <= 3
                              ? "0 2px 6px rgba(0,0,0,0.25)"
                              : "none",
                        }}
                      >
                        {item.rank}
                      </Box>
                    </TableCell>

                    {/* Country & Flag */}
                    <TableCell>
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Typography sx={{ fontSize: "1.4rem", lineHeight: 1 }}>
                          {item.flag}
                        </Typography>
                        <Box>
                          <Typography sx={{ fontWeight: 700, fontSize: "0.92rem" }}>
                            {item.country}
                          </Typography>
                          <Chip
                            label={item.region}
                            size="small"
                            sx={{
                              height: 18,
                              fontSize: "0.65rem",
                              fontWeight: 600,
                              bgcolor: "rgba(255, 255, 255, 0.05)",
                            }}
                          />
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* Market Cap */}
                    <TableCell align="right">
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: "0.98rem",
                          color: "text.primary",
                        }}
                      >
                        {item.formattedMarketCap}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", fontSize: "0.72rem" }}
                      >
                        USD ${(item.marketCapUsd / 1e12).toFixed(3)}T
                      </Typography>
                    </TableCell>

                    {/* Share % Progress */}
                    <TableCell align="left">
                      <Box sx={{ width: "100%", pr: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 700, fontSize: "0.8rem" }}
                          >
                            {item.shareOfGlobalPct.toFixed(2)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(100, item.shareOfGlobalPct * 1.8)}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(255, 255, 255, 0.08)",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                              bgcolor:
                                item.rank === 1
                                  ? "#6366f1"
                                  : item.rank <= 5
                                  ? "#3b82f6"
                                  : item.rank <= 10
                                  ? "#06b6d4"
                                  : "#10b981",
                            },
                          }}
                        />
                      </Box>
                    </TableCell>

                    {/* Companies Count */}
                    <TableCell align="center">
                      <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                        {item.companiesCount.toLocaleString()}
                      </Typography>
                    </TableCell>

                    {/* Primary Exchanges */}
                    <TableCell>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap">
                        {item.primaryExchanges.map((ex) => (
                          <Chip
                            key={ex}
                            label={ex}
                            size="small"
                            variant="outlined"
                            sx={{
                              fontSize: "0.68rem",
                              height: 20,
                              fontWeight: 600,
                              borderColor: theme.palette.divider,
                            }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        /* Grid Card View */
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 2.5,
          }}
        >
          {filteredCountries.map((item: CountryMarketCap) => {
            const badge = getRankBadgeColor(item.rank);

            return (
              <Card
                key={item.countryCode}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  borderColor: theme.palette.divider,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(15, 23, 42, 0.4)"
                      : "rgba(255, 255, 255, 0.8)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          bgcolor: badge.bg,
                          color: badge.text,
                          fontWeight: 800,
                          fontSize: "0.75rem",
                        }}
                      >
                        {item.rank}
                      </Box>
                      <Typography sx={{ fontSize: "1.4rem", lineHeight: 1 }}>
                        {item.flag}
                      </Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: "1rem" }}>
                        {item.country}
                      </Typography>
                    </Stack>
                    <Chip
                      label={item.region}
                      size="small"
                      sx={{
                        fontSize: "0.65rem",
                        height: 20,
                        fontWeight: 600,
                        bgcolor: "rgba(255, 255, 255, 0.05)",
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 1.5 }}>
                    <Typography
                      sx={{
                        fontSize: "1.3rem",
                        fontWeight: 800,
                        lineHeight: 1.2,
                      }}
                    >
                      {item.formattedMarketCap}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {item.shareOfGlobalPct.toFixed(2)}% of Top 30 |{" "}
                      {item.companiesCount.toLocaleString()} listed companies
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={Math.min(100, item.shareOfGlobalPct * 1.8)}
                    sx={{
                      height: 5,
                      borderRadius: 2.5,
                      mb: 1.75,
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 2.5,
                        bgcolor:
                          item.rank === 1
                            ? "#6366f1"
                            : item.rank <= 5
                            ? "#3b82f6"
                            : "#10b981",
                      },
                    }}
                  />

                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {item.primaryExchanges.map((ex) => (
                      <Chip
                        key={ex}
                        label={ex}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontSize: "0.65rem",
                          height: 18,
                          fontWeight: 500,
                          borderColor: theme.palette.divider,
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}

      {/* Footer Attribution Banner */}
      <Paper
        variant="outlined"
        sx={{
          p: 1.5,
          borderRadius: 2.5,
          borderColor: theme.palette.divider,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(15, 23, 42, 0.3)"
              : "rgba(255, 255, 255, 0.6)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Source:{" "}
          <Box
            component="a"
            href="https://companiesmarketcap.com/all-countries/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.light",
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            CompaniesMarketCap Country Aggregation
          </Box>{" "}
          • Aggregates total public equity market capitalization of national listed firms.
        </Typography>

        <Typography
          variant="caption"
          sx={{ color: "text.secondary", fontSize: "0.72rem" }}
        >
          Updated: {new Date(dataset.updatedAt).toLocaleDateString()}
        </Typography>
      </Paper>
    </Box>
  );
};
