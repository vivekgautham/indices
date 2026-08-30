import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { PROVIDERS_LIST } from "../data/providersData";
import { ProviderId } from "../types";

interface ProviderPresetBarProps {
  selectedProvider: ProviderId | "all";
  onSelectProvider: (providerId: ProviderId | "all") => void;
  indexCounts: Record<string, number>;
}

export const ProviderPresetBar: React.FC<ProviderPresetBarProps> = ({
  selectedProvider,
  onSelectProvider,
  indexCounts,
}) => {
  return (
    <Box sx={{ width: "100%", my: 1.5 }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={{ xs: 1, sm: 1.5 }}
      >
        <Chip
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <span>🌐</span>
              <Typography
                component="span"
                sx={{
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  fontFamily: "inherit",
                }}
              >
                All Providers
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
          onClick={() => onSelectProvider("all")}
          color={selectedProvider === "all" ? "primary" : "default"}
          variant={selectedProvider === "all" ? "filled" : "outlined"}
          sx={{
            py: 2.3,
            px: 0.8,
            borderRadius: 3,
            borderColor:
              selectedProvider === "all"
                ? "primary.main"
                : "rgba(255, 255, 255, 0.12)",
            backgroundColor:
              selectedProvider === "all"
                ? "primary.main"
                : "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor:
                selectedProvider === "all"
                  ? "primary.dark"
                  : "rgba(30, 41, 59, 0.9)",
              transform: "translateY(-2px)",
            },
          }}
        />

        {PROVIDERS_LIST.map((provider) => {
          const isSelected = selectedProvider === provider.id;
          const count = indexCounts[provider.id] || 0;

          return (
            <Chip
              key={provider.id}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: provider.accentColor,
                      boxShadow: isSelected
                        ? `0 0 10px ${provider.accentColor}`
                        : "none",
                    }}
                  />
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.88rem",
                      fontFamily: "inherit",
                      color: isSelected ? "#ffffff" : "text.primary",
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
                py: 2.3,
                px: 1,
                borderRadius: 3,
                border: "1.5px solid",
                borderColor: isSelected
                  ? provider.accentColor
                  : "rgba(255, 255, 255, 0.12)",
                backgroundColor: isSelected
                  ? provider.accentColor
                  : "rgba(30, 41, 59, 0.6)",
                boxShadow: isSelected
                  ? `0 0 20px ${provider.accentColor}55`
                  : "none",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isSelected
                    ? provider.accentColor
                    : "rgba(30, 41, 59, 0.9)",
                  borderColor: provider.accentColor,
                  transform: "translateY(-2px)",
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
