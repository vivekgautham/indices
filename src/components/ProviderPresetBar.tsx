import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Chip,
  Collapse,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ProviderId } from "../types";
import {
  isOtherProvider,
  MAJOR_PROVIDERS,
  OTHER_PROVIDERS,
} from "../utils/providerClassification";
import { ProviderLogo } from "./ProviderLogo";

interface ProviderPresetBarProps {
  selectedProvider: ProviderId | "others" | "all";
  onSelectProvider: (providerId: ProviderId | "others" | "all") => void;
  indexCounts: Record<string, number>;
}

export const ProviderPresetBar: React.FC<ProviderPresetBarProps> = ({
  selectedProvider,
  onSelectProvider,
  indexCounts,
}) => {
  const isInsideOthers =
    selectedProvider === "others" || isOtherProvider(selectedProvider);
  const [isOthersExpanded, setIsOthersExpanded] = useState<boolean>(isInsideOthers);

  // Automatically expand smaller providers drawer if user navigated to one directly (e.g. from URL or bookmark)
  useEffect(() => {
    if (isInsideOthers) {
      setIsOthersExpanded(true);
    }
  }, [isInsideOthers]);

  const handleOthersClick = () => {
    if (selectedProvider === "others") {
      // Toggle collapse state when already on others
      setIsOthersExpanded((prev) => !prev);
    } else {
      // Open drawer and select others view
      setIsOthersExpanded(true);
      onSelectProvider("others");
    }
  };

  const isOthersActive =
    selectedProvider === "others" || isOtherProvider(selectedProvider);
  const othersTotalCount = indexCounts["others"] || 0;

  return (
    <Box sx={{ width: "100%", my: 1.5 }}>
      {/* Top Row: All, Major Providers (>=10 indices), and Others chip */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          py: 0.5,
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.12) transparent",
          "&::-webkit-scrollbar": {
            height: 3,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderRadius: 3,
          },
          "&:hover::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255, 255, 255, 0.25)",
          },
        }}
      >
        <Stack
          direction="row"
          flexWrap="nowrap"
          alignItems="center"
          gap={{ xs: 0.8, sm: 1.2 }}
          sx={{
            m: "auto",
            minWidth: "max-content",
            px: { xs: 0.5, sm: 1 },
          }}
        >
          {/* All Chip */}
          <Chip
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <ProviderLogo providerId="all" size={18} />
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                  }}
                >
                  All
                </Typography>
                <Box
                  component="span"
                  sx={{
                    fontSize: "0.72rem",
                    px: 0.7,
                    py: 0.1,
                    borderRadius: 1,
                    backgroundColor:
                      selectedProvider === "all"
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(255, 255, 255, 0.08)",
                    fontWeight: 800,
                  }}
                >
                  {indexCounts["all"] || 0}
                </Box>
              </Box>
            }
            clickable
            onClick={() => {
              setIsOthersExpanded(false);
              onSelectProvider("all");
            }}
            color={selectedProvider === "all" ? "primary" : "default"}
            variant={selectedProvider === "all" ? "filled" : "outlined"}
            sx={{
              flexShrink: 0,
              py: { xs: 1.8, sm: 2.1 },
              px: 0.8,
              borderRadius: 3,
              borderColor:
                selectedProvider === "all"
                  ? "primary.main"
                  : "var(--indices-border, rgba(255, 255, 255, 0.12))",
              backgroundColor:
                selectedProvider === "all"
                  ? "primary.main"
                  : "var(--indices-card-bg, rgba(30, 41, 59, 0.6))",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  selectedProvider === "all"
                    ? "primary.dark"
                    : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.9))",
                transform: "translateY(-2px)",
              },
            }}
          />

          {/* Major Providers (>= 10 indices: S&P, FTSE Russell, MSCI, CRSP, ICE) */}
          {MAJOR_PROVIDERS.map((provider) => {
            const isSelected = selectedProvider === provider.id;
            const count = indexCounts[provider.id] || 0;

            return (
              <Chip
                key={provider.id}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    <ProviderLogo providerId={provider.id} size={18} />
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        fontFamily: "inherit",
                        color: isSelected ? "#ffffff" : "text.primary",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {provider.shortName}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.72rem",
                        px: 0.7,
                        py: 0.1,
                        borderRadius: 1,
                        backgroundColor: isSelected
                          ? "rgba(255, 255, 255, 0.25)"
                          : "rgba(255, 255, 255, 0.08)",
                        color: isSelected ? "#ffffff" : "text.secondary",
                        fontWeight: 800,
                      }}
                    >
                      {count}
                    </Box>
                  </Box>
                }
                clickable
                onClick={() => {
                  setIsOthersExpanded(false);
                  onSelectProvider(provider.id);
                }}
                sx={{
                  flexShrink: 0,
                  py: { xs: 1.8, sm: 2.1 },
                  px: 0.9,
                  borderRadius: 3,
                  border: "1.5px solid",
                  borderColor: isSelected
                    ? provider.accentColor
                    : "var(--indices-border, rgba(255, 255, 255, 0.12))",
                  backgroundColor: isSelected
                    ? provider.accentColor
                    : "var(--indices-card-bg, rgba(30, 41, 59, 0.6))",
                  boxShadow: isSelected
                    ? `0 0 20px ${provider.accentColor}55`
                    : "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? provider.accentColor
                      : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.9))",
                    borderColor: provider.accentColor,
                    transform: "translateY(-2px)",
                  },
                }}
              />
            );
          })}

          {/* "Others" Chip: rolls up providers with <10 indices (Bloomberg, Nasdaq, MarketVector) */}
          <Tooltip
            title="Smaller benchmark providers (<10 indices: Bloomberg, Nasdaq, MarketVector)"
            arrow
          >
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 18,
                      height: 18,
                      borderRadius: "22%",
                      backgroundColor: isOthersActive
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(255, 255, 255, 0.12)",
                      color: "#ffffff",
                    }}
                  >
                    <MoreHorizIcon sx={{ fontSize: 14 }} />
                  </Box>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      fontFamily: "inherit",
                      color: isOthersActive ? "#ffffff" : "text.primary",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Others
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      fontSize: "0.72rem",
                      px: 0.7,
                      py: 0.1,
                      borderRadius: 1,
                      backgroundColor: isOthersActive
                        ? "rgba(255, 255, 255, 0.25)"
                        : "rgba(255, 255, 255, 0.08)",
                      color: isOthersActive ? "#ffffff" : "text.secondary",
                      fontWeight: 800,
                    }}
                  >
                    {othersTotalCount}
                  </Box>
                  {isOthersExpanded ? (
                    <ExpandLessIcon
                      sx={{
                        fontSize: 18,
                        ml: -0.2,
                        color: isOthersActive ? "#ffffff" : "text.secondary",
                      }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{
                        fontSize: 18,
                        ml: -0.2,
                        color: isOthersActive ? "#ffffff" : "text.secondary",
                      }}
                    />
                  )}
                </Box>
              }
              clickable
              onClick={handleOthersClick}
              sx={{
                flexShrink: 0,
                py: { xs: 1.8, sm: 2.1 },
                px: 0.9,
                borderRadius: 3,
                border: "1.5px solid",
                borderColor: isOthersActive
                  ? "#8b5cf6"
                  : "var(--indices-border, rgba(255, 255, 255, 0.12))",
                backgroundColor: isOthersActive
                  ? "#8b5cf6"
                  : "var(--indices-card-bg, rgba(30, 41, 59, 0.6))",
                boxShadow: isOthersActive
                  ? "0 0 20px rgba(139, 92, 246, 0.45)"
                  : "none",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isOthersActive
                    ? "#7c3aed"
                    : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.9))",
                  borderColor: "#8b5cf6",
                  transform: "translateY(-2px)",
                },
              }}
            />
          </Tooltip>
        </Stack>
      </Box>

      {/* Bottom Sub-Row: When clicking on 'Others', show the smaller providers (<10 indices) */}
      <Collapse in={isOthersExpanded} timeout={250} unmountOnExit={false}>
        <Box
          sx={{
            mt: 1.25,
            mx: "auto",
            maxWidth: 820,
            p: { xs: 1.25, sm: 1.5 },
            borderRadius: 3,
            backgroundColor: "var(--indices-card-bg, rgba(30, 41, 59, 0.55))",
            border: "1.5px dashed var(--indices-border, rgba(139, 92, 246, 0.35))",
            backdropFilter: "blur(12px)",
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.25)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1, px: 0.5 }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "text.secondary",
                fontSize: "0.75rem",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: 0.6,
              }}
            >
              <Box component="span" sx={{ fontSize: "0.95rem" }}>
                🏷️
              </Box>
              Smaller Providers (&lt;10 indices):
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontSize: "0.7rem",
                display: { xs: "none", sm: "block" },
              }}
            >
              Click a provider to focus or select &quot;All Others&quot;
            </Typography>
          </Stack>

          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent={{ xs: "flex-start", sm: "center" }}
            gap={{ xs: 0.8, sm: 1.2 }}
            sx={{ width: "100%" }}
          >
            {/* "All Others" Chip */}
            <Chip
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap",
                    }}
                  >
                    All Others
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      fontSize: "0.72rem",
                      px: 0.7,
                      py: 0.1,
                      borderRadius: 1,
                      backgroundColor:
                        selectedProvider === "others"
                          ? "rgba(255, 255, 255, 0.25)"
                          : "rgba(255, 255, 255, 0.08)",
                      fontWeight: 800,
                    }}
                  >
                    {othersTotalCount}
                  </Box>
                </Box>
              }
              clickable
              onClick={() => onSelectProvider("others")}
              sx={{
                flexShrink: 0,
                py: { xs: 1.6, sm: 1.9 },
                px: 0.8,
                borderRadius: 2.5,
                border: "1.5px solid",
                borderColor:
                  selectedProvider === "others"
                    ? "#8b5cf6"
                    : "var(--indices-border, rgba(255, 255, 255, 0.12))",
                backgroundColor:
                  selectedProvider === "others"
                    ? "#8b5cf6"
                    : "var(--indices-card-bg, rgba(30, 41, 59, 0.6))",
                color: selectedProvider === "others" ? "#ffffff" : "text.primary",
                boxShadow:
                  selectedProvider === "others"
                    ? "0 0 16px rgba(139, 92, 246, 0.45)"
                    : "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    selectedProvider === "others"
                      ? "#7c3aed"
                      : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.9))",
                  transform: "translateY(-1px)",
                },
              }}
            />

            {/* Individual Smaller Providers (Bloomberg, Nasdaq, MarketVector) */}
            {OTHER_PROVIDERS.map((provider) => {
              const isSelected = selectedProvider === provider.id;
              const count = indexCounts[provider.id] || 0;

              return (
                <Chip
                  key={provider.id}
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <ProviderLogo providerId={provider.id} size={16} />
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          fontFamily: "inherit",
                          color: isSelected ? "#ffffff" : "text.primary",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {provider.shortName}
                      </Typography>
                      <Box
                        component="span"
                        sx={{
                          fontSize: "0.72rem",
                          px: 0.7,
                          py: 0.1,
                          borderRadius: 1,
                          backgroundColor: isSelected
                            ? "rgba(255, 255, 255, 0.25)"
                            : "rgba(255, 255, 255, 0.08)",
                          color: isSelected ? "#ffffff" : "text.secondary",
                          fontWeight: 800,
                        }}
                      >
                        {count}
                      </Box>
                    </Box>
                  }
                  clickable
                  onClick={() => onSelectProvider(provider.id)}
                  sx={{
                    flexShrink: 0,
                    py: { xs: 1.6, sm: 1.9 },
                    px: 0.8,
                    borderRadius: 2.5,
                    border: "1.5px solid",
                    borderColor: isSelected
                      ? provider.accentColor
                      : "var(--indices-border, rgba(255, 255, 255, 0.12))",
                    backgroundColor: isSelected
                      ? provider.accentColor
                      : "var(--indices-card-bg, rgba(30, 41, 59, 0.6))",
                    boxShadow: isSelected
                      ? `0 0 16px ${provider.accentColor}55`
                      : "none",
                    backdropFilter: "blur(8px)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? provider.accentColor
                        : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.9))",
                      borderColor: provider.accentColor,
                      transform: "translateY(-1px)",
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
