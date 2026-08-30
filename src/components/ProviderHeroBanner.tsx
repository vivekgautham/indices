import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IndexProvider } from "../types";

interface ProviderHeroBannerProps {
  provider?: IndexProvider;
  totalIndicesCount: number;
}

export const ProviderHeroBanner: React.FC<ProviderHeroBannerProps> = ({
  provider,
  totalIndicesCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!provider) {
    return (
      <Card
        variant="outlined"
        sx={{
          mb: 3,
          p: { xs: 2, sm: 2.5 },
          borderRadius: 3.5,
          background:
            "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "#f8fafc" }}
              >
                All Major Index Providers
              </Typography>
              <Chip
                label={`${totalIndicesCount} Famous Benchmarks`}
                color="primary"
                size="small"
                variant="outlined"
                sx={{ fontWeight: 700, borderRadius: 1.5 }}
              />
            </Stack>
            <Collapse in={isExpanded}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", maxWidth: 850, mt: 1 }}
              >
                Browsing all flagship benchmarks across S&P Dow Jones, FTSE
                Russell, MSCI, NASDAQ, and CRSP. Select any preset provider chip
                above to focus on their specific index family.
              </Typography>
            </Collapse>
          </Box>

          <Tooltip
            title={isExpanded ? "Collapse banner" : "Expand banner"}
            arrow
          >
            <IconButton
              size="small"
              onClick={() => setIsExpanded((prev) => !prev)}
              sx={{
                color: "text.secondary",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 2,
                p: 0.75,
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Card>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 3.5,
        p: { xs: 2, sm: 2.75 },
        borderRadius: 3.5,
        background: `linear-gradient(135deg, ${provider.badgeBg} 0%, rgba(15, 23, 42, 0.9) 100%)`,
        backdropFilter: "blur(16px)",
        border: `1.5px solid ${provider.accentColor}33`,
        boxShadow: `0 8px 32px ${provider.accentColor}15`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Decorative background glow */}
      <Box
        sx={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: provider.accentColor,
          opacity: 0.08,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <Stack spacing={isExpanded ? 2 : 0}>
        {/* Header Bar: Title, Tagline, Actions */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={1.5}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.25}
              sx={{ mb: 0.25 }}
            >
              <Chip
                label={provider.shortName}
                size="small"
                sx={{
                  backgroundColor: provider.accentColor,
                  color: "#ffffff",
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  borderRadius: 1.5,
                }}
              />
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: 800,
                  color: "#f8fafc",
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                {provider.name}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontWeight: 500,
                fontSize: "0.85rem",
              }}
            >
              {provider.tagline}
            </Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
              sx={{
                borderColor: `${provider.accentColor}66`,
                color: "#f8fafc",
                backgroundColor: `${provider.accentColor}11`,
                fontWeight: 700,
                fontSize: "0.75rem",
                borderRadius: 2,
                px: 1.75,
                py: 0.5,
                "&:hover": {
                  borderColor: provider.accentColor,
                  backgroundColor: `${provider.accentColor}22`,
                },
              }}
            >
              Website
            </Button>

            <Tooltip
              title={
                isExpanded
                  ? `Collapse ${provider.shortName} overview`
                  : `Expand ${provider.shortName} overview`
              }
              arrow
            >
              <Button
                variant="outlined"
                size="small"
                onClick={() => setIsExpanded((prev) => !prev)}
                endIcon={
                  isExpanded ? (
                    <ExpandLessIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 16 }} />
                  )
                }
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "text.secondary",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  borderRadius: 2,
                  px: 1.5,
                  py: 0.5,
                  "&:hover": {
                    borderColor: provider.accentColor,
                    color: "#ffffff",
                    backgroundColor: `${provider.accentColor}15`,
                  },
                }}
              >
                {isExpanded ? "Collapse" : "Details"}
              </Button>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Collapsible Body Section */}
        <Collapse in={isExpanded} timeout="auto">
          <Stack spacing={2} sx={{ pt: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(248, 250, 252, 0.88)",
                lineHeight: 1.6,
                fontSize: "0.88rem",
              }}
            >
              {provider.description}
            </Typography>

            {/* Quick specs grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 1.5,
                pt: 1.5,
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  🏢 Headquarters
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#f8fafc" }}
                >
                  {provider.headquarters}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  🏛️ History / Founded
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: "#f8fafc" }}
                >
                  {provider.founded}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  🤝 Primary ETF Partners
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "#f8fafc",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={provider.keyEtfPartners.join(", ")}
                >
                  {provider.keyEtfPartners.join(", ")}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block" }}
                >
                  📊 Market Footprint
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: provider.accentColor,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={provider.marketShareSummary}
                >
                  {provider.marketShareSummary}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
};
