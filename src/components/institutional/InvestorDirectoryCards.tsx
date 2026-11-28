import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { InstitutionalInvestor13F } from "../../types/institutional13F";

interface InvestorDirectoryCardsProps {
  investors: InstitutionalInvestor13F[];
  onSelectInvestor: (investor: InstitutionalInvestor13F) => void;
}

const CATEGORY_CHIP_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  hedge_fund: { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.35)" },
  asset_manager: { bg: "rgba(0, 221, 148, 0.15)", text: "#00DD94", border: "rgba(0, 221, 148, 0.35)" },
  family_office: { bg: "rgba(139, 92, 246, 0.15)", text: "#a78bfa", border: "rgba(139, 92, 246, 0.35)" },
  activist: { bg: "rgba(239, 68, 68, 0.15)", text: "#f87171", border: "rgba(239, 68, 68, 0.35)" },
  pension_sovereign: { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa", border: "rgba(59, 130, 246, 0.35)" },
  tech_growth: { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6", border: "rgba(236, 72, 153, 0.35)" },
};

function formatCategoryLabel(cat: string): string {
  switch (cat) {
    case "hedge_fund": return "Hedge Fund";
    case "asset_manager": return "Asset Manager";
    case "family_office": return "Family Office";
    case "activist": return "Activist";
    case "pension_sovereign": return "Sovereign / Pension";
    case "tech_growth": return "Growth Tech";
    default: return cat;
  }
}

export const InvestorDirectoryCards: React.FC<InvestorDirectoryCardsProps> = ({
  investors,
  onSelectInvestor,
}) => {
  return (
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
      {investors.map((inv) => {
        const catColor = CATEGORY_CHIP_COLORS[inv.category] || {
          bg: "rgba(255, 255, 255, 0.08)",
          text: "text.secondary",
          border: "rgba(255, 255, 255, 0.12)",
        };
        const top3 = inv.topHoldings.slice(0, 3);

        return (
          <Card
            key={inv.id}
            variant="outlined"
            onClick={() => onSelectInvestor(inv)}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 3,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: "#00DD94",
                boxShadow: "0 8px 24px -4px rgba(0, 221, 148, 0.25)",
              },
            }}
          >
            <CardContent sx={{ p: 2, pb: "16px !important" }}>
              {/* Top Header: Avatar + Firm Name + AUM */}
              <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
                <Stack direction="row" alignItems="center" spacing={1.25}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: "rgba(0, 221, 148, 0.12)",
                      border: "1px solid rgba(0, 221, 148, 0.3)",
                      color: "#00DD94",
                      fontWeight: 800,
                      fontSize: "0.85rem",
                    }}
                  >
                    {inv.avatarInitials || inv.name.slice(0, 2).toUpperCase()}
                  </Avatar>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 800,
                        color: "text.primary",
                        fontSize: "0.88rem",
                        lineHeight: 1.25,
                        maxWidth: 160,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {inv.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.72rem", display: "block" }}>
                      {inv.manager}
                    </Typography>
                  </Box>
                </Stack>

                <Paper
                  variant="outlined"
                  sx={{
                    px: 1.25,
                    py: 0.35,
                    borderRadius: 1.5,
                    backgroundColor: "rgba(0, 221, 148, 0.12)",
                    borderColor: "rgba(0, 221, 148, 0.3)",
                    textAlign: "right",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 800, color: "#00DD94", fontSize: "0.84rem", display: "block" }}>
                    {inv.portfolioValue}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.62rem" }}>
                    13F AUM
                  </Typography>
                </Paper>
              </Stack>

              {/* Archetype & Concentration Pills */}
              <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 1.5 }}>
                <Chip
                  label={formatCategoryLabel(inv.category)}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.64rem",
                    fontWeight: 700,
                    borderRadius: 1,
                    backgroundColor: catColor.bg,
                    color: catColor.text,
                    border: `1px solid ${catColor.border}`,
                  }}
                />

                <Typography variant="caption" sx={{ color: "text.secondary", fontSize: "0.7rem", ml: "auto" }}>
                  Top 10: <span style={{ fontWeight: 700, color: "text.primary" }}>{inv.top10ConcentrationPct}%</span>
                </Typography>
              </Stack>

              {/* Description Snippet */}
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.76rem",
                  lineHeight: 1.4,
                  mb: 1.5,
                  minHeight: 42,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {inv.description}
              </Typography>

              {/* Top Holdings Box */}
              <Paper
                variant="outlined"
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.25)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  mb: 1.25,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.66rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    display: "block",
                    mb: 0.75,
                  }}
                >
                  Key Holdings:
                </Typography>

                <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                  {top3.map((h, i) => (
                    <Chip
                      key={`${h.ticker}-${i}`}
                      label={`${h.ticker} ${h.portfolioWeight}%`}
                      size="small"
                      sx={{
                        height: 19,
                        fontSize: "0.64rem",
                        fontWeight: 700,
                        borderRadius: 1,
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        color: "text.primary",
                      }}
                    />
                  ))}
                </Stack>
              </Paper>

              {/* Card Footer: CIK Link & Action */}
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ pt: 0.5 }}>
                <Tooltip title="View SEC EDGAR Form 13F-HR">
                  <Box
                    component="a"
                    href={inv.secFilingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      textDecoration: "none",
                      color: "text.secondary",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      "&:hover": { color: "#00DD94" },
                    }}
                  >
                    <span>CIK {inv.cik}</span>
                    <LaunchIcon sx={{ fontSize: 11 }} />
                  </Box>
                </Tooltip>

                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: "#00DD94", fontSize: "0.76rem", fontWeight: 700 }}>
                  <span>Portfolio</span>
                  <ArrowForwardIcon sx={{ fontSize: 13 }} />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
