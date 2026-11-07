import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ShareButton from "../ShareButton";
import ThemeSelector from "./ThemeSelector";

export interface NavItem {
  id: string;
  label: string;
  to: string;
  icon: React.ReactNode;
  badge?: {
    label: string;
    color?: "default" | "primary" | "secondary" | "success" | "warning";
  };
  isActive: (pathname: string) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    to: "/",
    icon: <HomeOutlinedIcon sx={{ fontSize: 18 }} />,
    isActive: (pathname) =>
      pathname === "/" || pathname === "" || pathname.startsWith("/index/"),
  },
  {
    id: "tracker",
    label: "Benchmark Tracker",
    to: "/tracker",
    icon: <ShowChartIcon sx={{ fontSize: 18 }} />,
    isActive: (pathname) =>
      pathname.startsWith("/tracker") ||
      pathname.startsWith("/benchmark-tracker"),
  },
];

export const AppNavbar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const shareItem = useMemo(() => {
    const fullPath = `${location.pathname}${location.search}`;
    if (
      location.pathname.startsWith("/tracker") ||
      location.pathname.startsWith("/benchmark-tracker")
    ) {
      return {
        title: "FRED Benchmark Tracker | U.S. Equity & Macroeconomic Indexes",
        text: "Explore daily and historical charts for major US equity benchmarks from FRED.",
        path: fullPath,
      };
    }
    if (location.pathname.startsWith("/index/")) {
      return {
        title:
          document.title || "Market Benchmark Index Profile | Market Indices",
        text: "Explore market benchmark index details, tracking ETFs, and methodologies.",
        path: fullPath,
      };
    }
    return {
      title:
        "Market Indices Explorer | Global Benchmark Catalog & ETF Trackers",
      text: "Explore and compare global market benchmark indices, tracking ETFs, and constituent methodologies.",
      path: fullPath,
    };
  }, [location.pathname, location.search]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        backdropFilter: "blur(14px)",
        backgroundColor: "var(--indices-navbar-bg, rgba(15, 23, 42, 0.88))",
        borderBottom:
          "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
        color: "text.primary",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 54, sm: 60, md: 64 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* Left: Brand Logo & Title with Exploratory Tooltip */}
          <Tooltip
            title="Explore the world's premier benchmark providers and their iconic market indices, tracking ETFs, constituent criteria, and weighting methodologies."
            arrow
            placement="bottom-start"
            enterDelay={250}
          >
            <Box
              component={Link}
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 1.25 },
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                py: 0.5,
                flexShrink: 0,
                "&:hover .brand-text": {
                  opacity: 0.9,
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: 30, sm: 34 },
                  height: { xs: 30, sm: 34 },
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}33 0%, ${theme.palette.secondary.main}33 100%)`,
                  border: `1px solid ${theme.palette.primary.main}55`,
                  boxShadow: `0 2px 8px ${theme.palette.primary.main}33`,
                  flexShrink: 0,
                }}
              >
                📊
              </Box>
              <Box>
                <Typography
                  className="brand-text"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1rem", sm: "1.2rem" },
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.75,
                    whiteSpace: "nowrap",
                  }}
                >
                  Market Indices
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: "0.68rem",
                    color: "text.secondary",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    mt: 0.2,
                  }}
                >
                  Global Benchmark Catalog
                </Typography>
              </Box>
            </Box>
          </Tooltip>

          {/* Center (Desktop md+ only): Morningstar-Style Global Navigation Tabs */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              display: { xs: "none", md: "flex" },
              py: 0.5,
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(location.pathname);
              return (
                <Button
                  key={item.id}
                  component={Link}
                  to={item.to}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  startIcon={item.icon}
                  sx={{
                    position: "relative",
                    textTransform: "none",
                    fontWeight: active ? 800 : 600,
                    fontSize: "0.85rem",
                    letterSpacing: "-0.01em",
                    px: 1.8,
                    py: 0.8,
                    borderRadius: 2,
                    color: active ? "text.primary" : "text.secondary",
                    backgroundColor: active
                      ? "var(--indices-subtle-bg, rgba(0, 221, 148, 0.12))"
                      : "transparent",
                    border: "1px solid",
                    borderColor: active
                      ? `${theme.palette.primary.main}55`
                      : "transparent",
                    transition: "all 0.18s ease-in-out",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      color: "text.primary",
                      backgroundColor:
                        "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.06))",
                      borderColor: active
                        ? theme.palette.primary.main
                        : "var(--indices-border, rgba(255, 255, 255, 0.1))",
                    },
                    "&::after": active
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: -2,
                          left: "20%",
                          right: "20%",
                          height: "2.5px",
                          borderRadius: "3px 3px 0 0",
                          backgroundColor: theme.palette.primary.main,
                          boxShadow: `0 0 8px ${theme.palette.primary.main}`,
                        }
                      : {},
                  }}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Chip
                      label={item.badge.label}
                      size="small"
                      color={item.badge.color}
                      sx={{
                        ml: 0.75,
                        height: 16,
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        px: 0.2,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        "& .MuiChip-label": {
                          px: 0.6,
                        },
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Stack>

          {/* Right: Share View Button & Theme Selector */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.75, sm: 1.25 }}
            sx={{ flexShrink: 0 }}
          >
            <ShareButton
              item={shareItem}
              label={isSmUp ? "Share View" : "Share"}
              variant="outlined"
              size="small"
              tooltip="Share current page or filtered view"
              sx={{
                borderRadius: 2,
                px: { xs: 1, sm: 1.5 },
                py: 0.45,
                fontWeight: 700,
                fontSize: { xs: "0.74rem", sm: "0.78rem" },
                textTransform: "none",
                borderColor: "var(--indices-border, rgba(255, 255, 255, 0.15))",
                backgroundColor:
                  "var(--indices-subtle-bg, rgba(30, 41, 59, 0.4))",
                color: "text.primary",
                "&:hover": {
                  backgroundColor:
                    "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.8))",
                  borderColor: "primary.light",
                },
              }}
            />
            <ThemeSelector />
          </Stack>
        </Toolbar>

        {/* Mobile / Tablet (< md): Sleek Dedicated Segmented Navigation Bar */}
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            pb: 1.25,
            pt: 0.25,
            width: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: 480,
              mx: "auto",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0.75,
              p: 0.5,
              borderRadius: 2.5,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(255, 255, 255, 0.04))",
              border:
                "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(location.pathname);
              return (
                <Button
                  key={item.id}
                  component={Link}
                  to={item.to}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  startIcon={item.icon}
                  sx={{
                    position: "relative",
                    textTransform: "none",
                    fontWeight: active ? 800 : 600,
                    fontSize: { xs: "0.78rem", sm: "0.82rem" },
                    letterSpacing: "-0.01em",
                    py: 0.7,
                    px: { xs: 1, sm: 1.5 },
                    borderRadius: 2,
                    justifyContent: "center",
                    color: active ? "text.primary" : "text.secondary",
                    backgroundColor: active
                      ? "var(--indices-card-hover-bg, rgba(0, 221, 148, 0.14))"
                      : "transparent",
                    border: "1px solid",
                    borderColor: active
                      ? `${theme.palette.primary.main}66`
                      : "transparent",
                    boxShadow: active
                      ? `0 2px 8px ${theme.palette.primary.main}25`
                      : "none",
                    transition: "all 0.18s ease-in-out",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      color: "text.primary",
                      backgroundColor:
                        "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.08))",
                    },
                  }}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Chip
                      label={item.badge.label}
                      size="small"
                      color={item.badge.color}
                      sx={{
                        ml: 0.75,
                        height: 16,
                        fontSize: "0.62rem",
                        fontWeight: 800,
                        px: 0.2,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
};

export default AppNavbar;
