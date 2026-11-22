import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppVersionBadge from "./AppVersionBadge";
import CopyrightBadge from "./CopyrightBadge";

interface SiteFooterProps {
  sx?: object;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ sx = {} }) => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 6, sm: 8 },
        pt: 3,
        pb: { xs: 4, sm: 5 },
        borderTop: "1px solid var(--indices-border, rgba(255, 255, 255, 0.08))",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        width: "100%",
        ...sx,
      }}
    >
      {/* Bottom Left: Copyright Badge, App Version Badge & Descriptive Text */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={{ xs: 1, sm: 1.5 }}
        flexWrap="wrap"
      >
        <CopyrightBadge />
        <AppVersionBadge />
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            opacity: 0.8,
          }}
        >
          Market Benchmark Index Directory
        </Typography>
      </Stack>

      {/* Sitewide Navigation Links for SEO Link Equity */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
        sx={{
          fontSize: "0.78rem",
          fontWeight: 600,
        }}
      >
        <Typography
          component={RouterLink}
          to="/indices"
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            fontSize: "0.78rem",
            fontWeight: 600,
            "&:hover": { color: "#00DD94" },
          }}
        >
          Indices
        </Typography>
        <Typography
          component={RouterLink}
          to="/tracker"
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            fontSize: "0.78rem",
            fontWeight: 600,
            "&:hover": { color: "#00DD94" },
          }}
        >
          Tracker
        </Typography>
        <Typography
          component={RouterLink}
          to="/events"
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            fontSize: "0.78rem",
            fontWeight: 600,
            "&:hover": { color: "#00DD94" },
          }}
        >
          Events Calendar
        </Typography>
        <Typography
          component={RouterLink}
          to="/markets"
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            fontSize: "0.78rem",
            fontWeight: 600,
            "&:hover": { color: "#00DD94" },
          }}
        >
          Markets
        </Typography>
        <Typography
          component={RouterLink}
          to="/terms"
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            fontSize: "0.78rem",
            fontWeight: 600,
            "&:hover": { color: "#00DD94" },
          }}
        >
          Terms of Use
        </Typography>
      </Stack>

      {/* Bottom Right: Scroll to Top */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          alignSelf: { xs: "flex-start", sm: "auto" },
        }}
      >
        <Button
          size="small"
          onClick={handleScrollTop}
          endIcon={<KeyboardArrowUpIcon sx={{ fontSize: 18 }} />}
          sx={{
            fontSize: "0.75rem",
            color: "text.secondary",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              color: "text.primary",
              backgroundColor:
                "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.05))",
            },
          }}
        >
          Back to Top
        </Button>
      </Stack>
    </Box>
  );
};

export default SiteFooter;
