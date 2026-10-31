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
  Typography,
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
    isActive: (pathname) => pathname === "/" || pathname === "",
  },
  {
    id: "tracker",
    label: "Benchmark Tracker",
    to: "/tracker",
    icon: <ShowChartIcon sx={{ fontSize: 18 }} />,
    badge: { label: "Live", color: "success" },
    isActive: (pathname) =>
      pathname.startsWith("/tracker") || pathname.startsWith("/benchmark-tracker"),
  },
];

export const AppNavbar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();

  const shareItem = useMemo(() => {
    const fullPath = `${location.pathname}${location.search}`;
    if (
      location.pathname.startsWith("/tracker") ||
      location.pathname.startsWith("/benchmark-tracker")
    ) {
      return {
        title: "FRED Benchmark Tracker | U.S. Equity & Macroeconomic Indexes",
        text: "Explore live and historical charts for major US equity benchmarks from FRED.",
        path: fullPath,
      };
    }
    if (location.pathname.startsWith("/index/")) {
      return {
        title: document.title || "Market Benchmark Index Profile | Market Indices",
        text: "Explore market benchmark index details, tracking ETFs, and methodologies.",
        path: fullPath,
      };
    }
    return {
      title: "Market Indices Explorer | Global Benchmark Catalog & ETF Trackers",
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
        borderBottom: "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
        color: "text.primary",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 1.5, sm: 3 } }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 58, sm: 64 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* Left: Brand Logo & Title */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              py: 0.5,
              "&:hover .brand-text": {
                opacity: 0.9,
              },
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)",
                border: "1px solid rgba(99, 102, 241, 0.35)",
                boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
              }}
            >
              📊
            </Box>
            <Box>
              <Typography
                className="brand-text"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.05rem", sm: "1.2rem" },
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                }}
              >
                Indices
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

          {/* Center: Morningstar-Style Global Navigation Tabs */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.5, sm: 1 }}
            sx={{
              overflowX: "auto",
              py: 0.5,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(location.pathname);
              return (
                <Button
                  key={item.id}
                  component={Link}
                  to={item.to}
                  startIcon={item.icon}
                  sx={{
                    position: "relative",
                    textTransform: "none",
                    fontWeight: active ? 800 : 600,
                    fontSize: { xs: "0.78rem", sm: "0.85rem" },
                    letterSpacing: "-0.01em",
                    px: { xs: 1.2, sm: 1.8 },
                    py: { xs: 0.6, sm: 0.8 },
                    borderRadius: 2,
                    color: active ? "text.primary" : "text.secondary",
                    backgroundColor: active
                      ? "var(--indices-subtle-bg, rgba(99, 102, 241, 0.12))"
                      : "transparent",
                    border: "1px solid",
                    borderColor: active
                      ? "rgba(99, 102, 241, 0.35)"
                      : "transparent",
                    transition: "all 0.18s ease-in-out",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      color: "text.primary",
                      backgroundColor: "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.06))",
                      borderColor: active
                        ? "rgba(99, 102, 241, 0.5)"
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
          >
            <ShareButton
              item={shareItem}
              label="Share View"
              variant="outlined"
              size="small"
              tooltip="Share current page or filtered view"
              sx={{
                borderRadius: 2,
                px: { xs: 1.2, sm: 1.5 },
                py: 0.45,
                fontWeight: 700,
                fontSize: "0.78rem",
                textTransform: "none",
                borderColor: "var(--indices-border, rgba(255, 255, 255, 0.15))",
                backgroundColor: "var(--indices-subtle-bg, rgba(30, 41, 59, 0.4))",
                color: "text.primary",
                "&:hover": {
                  backgroundColor: "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.8))",
                  borderColor: "primary.light",
                },
              }}
            />
            <ThemeSelector />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppNavbar;
