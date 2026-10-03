import CopyrightIcon from "@mui/icons-material/Copyright";
import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import { APP_AUTHOR, COPYRIGHT_YEAR, REPO_URL } from "../../constants/version";

interface CopyrightBadgeProps {
  compact?: boolean;
}

export const CopyrightBadge: React.FC<CopyrightBadgeProps> = ({
  compact = false,
}) => {
  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.5 }}>
          <Box sx={{ fontWeight: 700, fontSize: "0.75rem" }}>
            © {COPYRIGHT_YEAR} {APP_AUTHOR}
          </Box>
          <Box
            sx={{
              color: "text.secondary",
              fontSize: "0.68rem",
              mt: 0.25,
            }}
          >
            MIT License • Open Source
          </Box>
        </Box>
      }
      arrow
      placement="top-start"
    >
      <Box
        component="a"
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          color: "text.secondary",
          opacity: 0.8,
          transition: "all 0.2s ease-in-out",
          px: 1,
          py: 0.35,
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
          backgroundColor: "var(--indices-subtle-bg, rgba(30, 41, 59, 0.35))",
          backdropFilter: "blur(8px)",
          fontSize: "0.74rem",
          fontWeight: 600,
          textDecoration: "none",
          cursor: "pointer",
          userSelect: "none",
          "&:hover": {
            opacity: 1,
            color: "primary.light",
            borderColor: "primary.main",
            backgroundColor:
              "var(--indices-card-hover-bg, rgba(99, 102, 241, 0.1))",
            transform: "translateY(-1px)",
          },
        }}
      >
        <CopyrightIcon sx={{ fontSize: 13, mr: 0.4 }} />
        <Typography
          component="span"
          sx={{
            fontSize: "0.74rem",
            fontWeight: 600,
            fontFamily: "inherit",
            lineHeight: 1,
          }}
        >
          {COPYRIGHT_YEAR}
          {!compact && (
            <Box
              component="span"
              sx={{
                display: { xs: "none", sm: "inline" },
                ml: 0.5,
              }}
            >
              {APP_AUTHOR}
            </Box>
          )}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export default CopyrightBadge;
