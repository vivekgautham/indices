import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PROVIDERS_DATA } from "../data/providersData";
import { MarketIndex } from "../types";

interface IndexCardProps {
  index: MarketIndex;
  onSelect?: (index: MarketIndex) => void;
}

export const IndexCard: React.FC<IndexCardProps> = ({ index, onSelect }) => {
  const navigate = useNavigate();
  const provider = PROVIDERS_DATA[index.providerId];
  const accentColor = provider?.accentColor || "#6366f1";

  const handleClick = () => {
    if (onSelect) {
      onSelect(index);
    } else {
      navigate(`/index/${index.id}`);
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(30, 41, 59, 0.6)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transition:
          "transform 0.22s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.22s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.22s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: accentColor,
          boxShadow: `0 12px 28px rgba(0, 0, 0, 0.4), 0 0 20px ${accentColor}22`,
        },
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
          p: 2.25,
        }}
      >
        <CardContent
          sx={{
            p: 0,
            "&:last-child": { pb: 0 },
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            gap: 1.75,
          }}
        >
          {/* Header Row: Symbol & Provider */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip
                label={index.symbol}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  backgroundColor: accentColor,
                  color: "#ffffff",
                  borderRadius: 1.5,
                  px: 0.25,
                }}
              />
              <Chip
                label={provider?.shortName || index.providerId.toUpperCase()}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: `${accentColor}55`,
                  color: accentColor,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  borderRadius: 1.5,
                  backgroundColor: `${accentColor}10`,
                }}
              />
            </Stack>

            <Chip
              label={index.category}
              size="small"
              sx={{
                fontSize: "0.68rem",
                fontWeight: 600,
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                color: "text.secondary",
                borderRadius: 1,
              }}
            />
          </Stack>

          {/* Index Title */}
          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 800,
                fontSize: "1.08rem",
                lineHeight: 1.3,
                color: "#f8fafc",
                mb: 0.5,
              }}
            >
              {index.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: "0.82rem",
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {index.summary}
            </Typography>
          </Box>

          {/* Key Quick Metrics Box */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              p: 1.25,
              borderRadius: 2,
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.68rem",
                  display: "block",
                }}
              >
                Constituents
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#f8fafc", fontSize: "0.82rem" }}
              >
                {typeof index.constituentsCount === "number"
                  ? index.constituentsCount.toLocaleString()
                  : index.constituentsCount}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.68rem",
                  display: "block",
                }}
              >
                Weighting
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: "#f8fafc",
                  fontSize: "0.82rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={index.weightingMethodology}
              >
                {index.weightingMethodology.split(" ")[0]}
              </Typography>
            </Box>
          </Box>

          {/* Tracking ETFs Row */}
          {index.trackingEtfs && index.trackingEtfs.length > 0 && (
            <Box sx={{ mt: "auto", pt: 0.5 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  display: "block",
                  mb: 0.5,
                }}
              >
                Top Tracking ETFs:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.6}>
                {index.trackingEtfs.slice(0, 3).map((etf) => (
                  <Chip
                    key={etf.ticker}
                    label={etf.ticker}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      backgroundColor: "rgba(99, 102, 241, 0.15)",
                      color: "primary.light",
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                      borderRadius: 1,
                      "& .MuiChip-label": { px: 0.6 },
                    }}
                  />
                ))}
                {index.trackingEtfs.length > 3 && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.68rem",
                      alignSelf: "center",
                    }}
                  >
                    +{index.trackingEtfs.length - 3} more
                  </Typography>
                )}
              </Stack>
            </Box>
          )}

          {/* Footer View Details cue */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              pt: 1,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              color: "text.secondary",
            }}
          >
            <Typography variant="caption" sx={{ fontSize: "0.7rem" }}>
              Since {index.launchYear} • {index.region}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: accentColor,
                  fontSize: "0.72rem",
                }}
              >
                Explore Details
              </Typography>
              <ArrowForwardIcon sx={{ fontSize: 13, color: accentColor }} />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
