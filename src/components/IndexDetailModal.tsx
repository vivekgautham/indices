import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { PROVIDERS_DATA } from "../data/providersData";
import { MarketIndex } from "../types";

interface IndexDetailModalProps {
  index: MarketIndex | null;
  open: boolean;
  onClose: () => void;
}

export const IndexDetailModal: React.FC<IndexDetailModalProps> = ({
  index,
  open,
  onClose,
}) => {
  if (!index) return null;

  const provider = PROVIDERS_DATA[index.providerId];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          backgroundColor: "#0f172a",
          backgroundImage:
            "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          border: `1.5px solid ${provider?.accentColor || "#6366f1"}44`,
          boxShadow: `0 24px 48px rgba(0, 0, 0, 0.6), 0 0 30px ${provider?.accentColor || "#6366f1"}22`,
          color: "#f8fafc",
          p: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          pb: 1,
        }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 0.75 }}
          >
            <Chip
              label={index.symbol}
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: "0.82rem",
                backgroundColor: provider?.accentColor || "primary.main",
                color: "#ffffff",
                borderRadius: 1.5,
              }}
            />
            {index.altSymbols && index.altSymbols.length > 0 && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                Alt: {index.altSymbols.join(", ")}
              </Typography>
            )}
            <Chip
              label={provider?.shortName || index.providerId.toUpperCase()}
              size="small"
              variant="outlined"
              sx={{
                borderColor: `${provider?.accentColor}66`,
                color: provider?.accentColor,
                fontWeight: 700,
                fontSize: "0.72rem",
                borderRadius: 1.5,
              }}
            />
          </Stack>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
            {index.name}
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "text.secondary",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            "&:hover": {
              color: "#ffffff",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          {/* Summary */}
          <Typography
            variant="body1"
            sx={{ color: "#e2e8f0", lineHeight: 1.65 }}
          >
            {index.description || index.summary}
          </Typography>

          {/* Key Specifications Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" },
              gap: 2,
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(30, 41, 59, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                👥 Constituents
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "#f8fafc" }}
              >
                {typeof index.constituentsCount === "number"
                  ? index.constituentsCount.toLocaleString()
                  : index.constituentsCount}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                ⚖️ Weighting
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#f8fafc", mt: 0.5 }}
              >
                {index.weightingMethodology}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                🔄 Rebalance
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#f8fafc", mt: 0.5 }}
              >
                {index.rebalanceFrequency}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block" }}
              >
                🚀 Launch Year
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: 800, color: "#f8fafc" }}
              >
                {index.launchYear}
              </Typography>
            </Box>
          </Box>

          {/* Tracking ETFs */}
          {index.trackingEtfs && index.trackingEtfs.length > 0 && (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: 1.5,
                }}
              >
                📦 Popular Tracking ETFs & Benchmark Funds
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1.25}>
                {index.trackingEtfs.map((etf) => (
                  <Box
                    key={etf.ticker}
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
                      backgroundColor: "rgba(15, 23, 42, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      minWidth: 160,
                      flexGrow: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Chip
                        label={etf.ticker}
                        size="small"
                        sx={{
                          fontWeight: 800,
                          backgroundColor: "rgba(99, 102, 241, 0.2)",
                          color: "primary.light",
                          borderRadius: 1,
                        }}
                      />
                      {etf.aum && (
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", fontWeight: 700 }}
                        >
                          {etf.aum}
                        </Typography>
                      )}
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mt: 0.75, color: "#f8fafc" }}
                    >
                      {etf.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Key Characteristics & Eligibility */}
          {index.eligibilityCriteria &&
            index.eligibilityCriteria.length > 0 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "text.secondary",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    mb: 1,
                  }}
                >
                  📋 Inclusion & Eligibility Criteria
                </Typography>
                <Stack spacing={0.75}>
                  {index.eligibilityCriteria.map((crit, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                        color: "#cbd5e1",
                        fontSize: "0.88rem",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{ color: provider?.accentColor || "primary.main" }}
                      >
                        •
                      </Box>
                      <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                        {crit}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}

          {index.keyCharacteristics && index.keyCharacteristics.length > 0 && (
            <Box>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 800,
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  mb: 1,
                }}
              >
                ⭐ Key Benchmark Characteristics
              </Typography>
              <Stack spacing={0.75}>
                {index.keyCharacteristics.map((char, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1,
                      color: "#cbd5e1",
                      fontSize: "0.88rem",
                    }}
                  >
                    <Box component="span" sx={{ color: "primary.light" }}>
                      ✓
                    </Box>
                    <Typography variant="body2" sx={{ color: "#cbd5e1" }}>
                      {char}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Tags */}
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {index.tags.map((tag) => (
              <Chip
                key={tag}
                label={`# ${tag}`}
                size="small"
                sx={{
                  borderRadius: 1.5,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  color: "text.secondary",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                }}
              />
            ))}
          </Stack>

          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

          {/* Footer Actions */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {index.officialUrl ? (
              <Button
                variant="outlined"
                href={index.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                sx={{
                  borderColor: `${provider?.accentColor}66`,
                  color: provider?.accentColor,
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: provider?.accentColor,
                    backgroundColor: `${provider?.accentColor}15`,
                  },
                }}
              >
                Official Index Methodology & Factsheet
              </Button>
            ) : (
              <Box />
            )}

            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                backgroundColor: provider?.accentColor || "primary.main",
                "&:hover": {
                  filter: "brightness(1.15)",
                },
              }}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
