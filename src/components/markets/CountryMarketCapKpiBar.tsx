import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { COUNTRY_MARKET_CAP_DATA } from "../../data/countryMarketCapData";

export const CountryMarketCapKpiBar: React.FC = () => {
  const data = COUNTRY_MARKET_CAP_DATA;
  const trillionClubCount = data.countries.filter(
    (c) => c.marketCapUsd >= 1e12
  ).length;
  const totalCompanies = data.countries.reduce(
    (acc, c) => acc + c.companiesCount,
    0
  );
  const topCountry = data.countries[0];

  const kpis = [
    {
      label: "Top 30 Market Cap",
      value: data.top30TotalFormatted,
      subtext: "Aggregated national equities",
      icon: <PublicIcon sx={{ fontSize: 18, color: "#6366f1" }} />,
      color: "#6366f1",
      bgColor: "rgba(99, 102, 241, 0.08)",
      borderColor: "rgba(99, 102, 241, 0.25)",
    },
    {
      label: "Largest Equity Market",
      value: `${topCountry?.flag} ${topCountry?.formattedMarketCap}`,
      subtext: `${topCountry?.country} (${topCountry?.shareOfGlobalPct}% share)`,
      icon: <EmojiEventsIcon sx={{ fontSize: 18, color: "#f59e0b" }} />,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.08)",
      borderColor: "rgba(245, 158, 11, 0.25)",
    },
    {
      label: "$1 Trillion+ Club",
      value: `${trillionClubCount} Countries`,
      subtext: "Nations with > $1T equity cap",
      icon: <AccountBalanceIcon sx={{ fontSize: 18, color: "#10b981" }} />,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.08)",
      borderColor: "rgba(16, 185, 129, 0.25)",
    },
    {
      label: "Tracked Listed Firms",
      value: totalCompanies.toLocaleString(),
      subtext: "Public corporations in Top 30",
      icon: <BusinessIcon sx={{ fontSize: 18, color: "#06b6d4" }} />,
      color: "#06b6d4",
      bgColor: "rgba(6, 182, 212, 0.08)",
      borderColor: "rgba(6, 182, 212, 0.25)",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 1.5,
        mb: 2.5,
      }}
    >
      {kpis.map((kpi, idx) => (
        <Paper
          key={idx}
          variant="outlined"
          sx={{
            p: 1.5,
            borderRadius: 2.5,
            bgcolor: kpi.bgColor,
            borderColor: kpi.borderColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 0.75,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: 700,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {kpi.label}
            </Typography>
            {kpi.icon}
          </Box>
          <Typography
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.3rem" },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 0.3,
            }}
          >
            {kpi.value}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.72rem",
              fontWeight: 500,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {kpi.subtext}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};
