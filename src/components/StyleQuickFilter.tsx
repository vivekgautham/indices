import BoltIcon from "@mui/icons-material/Bolt";
import DiamondIcon from "@mui/icons-material/Diamond";
import LayersIcon from "@mui/icons-material/Layers";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { StyleFilter } from "../utils/styleFilter";

export interface StyleQuickFilterProps {
  selectedStyle: StyleFilter;
  onSelectStyle: (style: StyleFilter) => void;
  styleCounts: {
    all: number;
    growth: number;
    value: number;
    factor: number;
  };
}

export const StyleQuickFilter: React.FC<StyleQuickFilterProps> = ({
  selectedStyle,
  onSelectStyle,
  styleCounts,
}) => {
  const options: {
    id: StyleFilter;
    label: string;
    icon: React.ReactNode;
    count: number;
    activeColor: string;
    activeBg: string;
    badgeBg: string;
  }[] = [
    {
      id: "all",
      label: "All Styles",
      icon: <LayersIcon sx={{ fontSize: 16 }} />,
      count: styleCounts.all,
      activeColor: "primary.main",
      activeBg: "primary.main",
      badgeBg:
        selectedStyle === "all"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(255, 255, 255, 0.08)",
    },
    {
      id: "growth",
      label: "Growth Indices",
      icon: <TrendingUpIcon sx={{ fontSize: 16 }} />,
      count: styleCounts.growth,
      activeColor: "#10b981",
      activeBg: "#10b981",
      badgeBg:
        selectedStyle === "growth"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(16, 185, 129, 0.15)",
    },
    {
      id: "value",
      label: "Value Indices",
      icon: <DiamondIcon sx={{ fontSize: 16 }} />,
      count: styleCounts.value,
      activeColor: "#8b5cf6",
      activeBg: "#8b5cf6",
      badgeBg:
        selectedStyle === "value"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(139, 92, 246, 0.15)",
    },
    {
      id: "factor",
      label: "Factor / Smart Beta",
      icon: <BoltIcon sx={{ fontSize: 16 }} />,
      count: styleCounts.factor,
      activeColor: "#f59e0b",
      activeBg: "#f59e0b",
      badgeBg:
        selectedStyle === "factor"
          ? "rgba(255, 255, 255, 0.25)"
          : "rgba(245, 158, 11, 0.15)",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 0.5,
        mb: 0.5,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap={{ xs: 0.75, sm: 1.25 }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            fontWeight: 700,
            mr: 0.25,
            display: { xs: "none", sm: "inline-block" },
          }}
        >
          Style Filters:
        </Typography>

        {options.map((opt) => {
          const isSelected = selectedStyle === opt.id;
          return (
            <Chip
              key={opt.id}
              clickable
              onClick={() => {
                if (isSelected && opt.id !== "all") {
                  onSelectStyle("all");
                } else {
                  onSelectStyle(opt.id);
                }
              }}
              label={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                    color: isSelected ? "#fff" : "inherit",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: isSelected ? "#fff" : opt.activeColor,
                    }}
                  >
                    {opt.icon}
                  </Box>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      fontFamily: "inherit",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt.label}
                  </Typography>
                  <Box
                    component="span"
                    sx={{
                      fontSize: "0.7rem",
                      px: 0.6,
                      py: 0.1,
                      borderRadius: 1,
                      backgroundColor: opt.badgeBg,
                      color: isSelected ? "#fff" : "text.secondary",
                      fontWeight: 800,
                    }}
                  >
                    {opt.count}
                  </Box>
                </Box>
              }
              variant={isSelected ? "filled" : "outlined"}
              sx={{
                py: { xs: 1.5, sm: 1.8 },
                px: 0.5,
                borderRadius: 2.5,
                borderColor: isSelected
                  ? opt.activeColor
                  : "var(--indices-border, rgba(255, 255, 255, 0.12))",
                backgroundColor: isSelected
                  ? opt.activeBg
                  : "var(--indices-card-bg, rgba(30, 41, 59, 0.5))",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: isSelected
                    ? opt.activeBg
                    : "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.85))",
                  borderColor: opt.activeColor,
                  transform: "translateY(-1px)",
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
