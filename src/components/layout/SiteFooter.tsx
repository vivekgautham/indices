import GitHubIcon from "@mui/icons-material/GitHub";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { REPO_URL } from "../../constants/version";
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
      {/* Bottom Left: Copyright Badge & Descriptive Text */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={{ xs: 1, sm: 2 }}
      >
        <CopyrightBadge />
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            opacity: 0.8,
          }}
        >
          Market Benchmark Index Directory • Educational & Informational Reference
        </Typography>
      </Stack>

      {/* Bottom Right: Quick Links / Scroll to Top */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={{
          alignSelf: { xs: "flex-start", sm: "auto" },
        }}
      >
        <Button
          component="a"
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          startIcon={<GitHubIcon sx={{ fontSize: 16 }} />}
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
          Source Code
        </Button>

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
