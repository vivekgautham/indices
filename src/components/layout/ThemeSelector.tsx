import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import {
  Box,
  ButtonBase,
  Chip,
  Divider,
  Popover,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ThemeId, ThemePreset } from "../../theme/theme";
import { useColorTheme } from "../../theme/ThemeContext";

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  compact = false,
}) => {
  const { themeId, activeTheme, setThemeId, availableThemes } = useColorTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectTheme = (id: ThemeId) => {
    setThemeId(id);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "theme-selector-popover" : undefined;

  return (
    <>
      <Tooltip
        title="Change color theme"
        arrow
        placement="bottom-end"
        disableHoverListener={open}
      >
        <ButtonBase
          aria-describedby={popoverId}
          aria-label={`Current theme: ${activeTheme.name}. Click to change color theme.`}
          onClick={handleClick}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: { xs: 0.6, sm: 0.8 },
            color: open ? "primary.light" : "text.secondary",
            px: { xs: 0.9, sm: 1.2 },
            py: 0.35,
            borderRadius: "8px",
            border: "1px solid",
            borderColor: open
              ? "primary.main"
              : "var(--indices-border, rgba(255, 255, 255, 0.1))",
            backgroundColor: open
              ? "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.8))"
              : "var(--indices-subtle-bg, rgba(30, 41, 59, 0.4))",
            backdropFilter: "blur(8px)",
            fontSize: "0.74rem",
            fontWeight: 600,
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              color: "primary.light",
              borderColor: "primary.light",
              backgroundColor:
                "var(--indices-card-hover-bg, rgba(30, 41, 59, 0.7))",
              transform: "translateY(-1px)",
            },
          }}
        >
          <PaletteOutlinedIcon
            sx={{
              fontSize: 15,
              color: activeTheme.primary.main,
            }}
          />

          {/* Theme Color Preview Swatch */}
          <Box
            sx={{
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${activeTheme.bgPreview} 50%, ${activeTheme.accentPreview} 50%)`,
              border: `1.5px solid ${activeTheme.primary.main}`,
              boxShadow: `0 0 6px ${activeTheme.accentPreview}55`,
              flexShrink: 0,
            }}
          />

          {/* Theme Label */}
          {!compact && (
            <Typography
              component="span"
              sx={{
                fontSize: "0.74rem",
                fontWeight: 600,
                fontFamily: "inherit",
                display: { xs: "none", sm: "inline" },
                color: "inherit",
              }}
            >
              {activeTheme.shortName}
            </Typography>
          )}

          <KeyboardArrowDownIcon
            sx={{
              fontSize: 14,
              opacity: 0.7,
              transition: "transform 0.2s ease",
              transform: open ? "rotate(180deg)" : "none",
            }}
          />
        </ButtonBase>
      </Tooltip>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: { xs: 290, sm: 330 },
              maxHeight: "85vh",
              overflowY: "auto",
              borderRadius: 3,
              p: 1.5,
              backgroundColor: "var(--indices-card-bg, #1e293b)",
              backdropFilter: "blur(20px)",
              border:
                "1px solid var(--indices-border, rgba(255, 255, 255, 0.12))",
              boxShadow:
                "0 20px 48px rgba(0, 0, 0, 0.55), 0 0 1px rgba(255, 255, 255, 0.2)",
            },
          },
        }}
      >
        {/* Popover Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 0.75, pb: 1 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <PaletteOutlinedIcon
              sx={{ fontSize: 18, color: activeTheme.primary.main }}
            />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 800, fontSize: "0.85rem", letterSpacing: -0.2 }}
            >
              Color Theme
            </Typography>
          </Stack>
          <Chip
            label={`${availableThemes.length} themes`}
            size="small"
            sx={{
              fontSize: "0.68rem",
              fontWeight: 700,
              height: 20,
              backgroundColor:
                "var(--indices-subtle-bg, rgba(255, 255, 255, 0.08))",
              color: "text.secondary",
              borderRadius: 1,
            }}
          />
        </Stack>

        <Divider
          sx={{
            mb: 1,
            borderColor: "var(--indices-border, rgba(255, 255, 255, 0.08))",
          }}
        />

        {/* Theme Options List */}
        <Stack spacing={0.6}>
          {availableThemes.map((preset: ThemePreset) => {
            const isSelected = preset.id === themeId;

            return (
              <ButtonBase
                key={preset.id}
                onClick={() => handleSelectTheme(preset.id)}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 1,
                  borderRadius: 2,
                  textAlign: "left",
                  border: "1px solid",
                  borderColor: isSelected ? preset.primary.main : "transparent",
                  backgroundColor: isSelected
                    ? "var(--indices-subtle-bg, rgba(255, 255, 255, 0.08))"
                    : "transparent",
                  transition: "all 0.18s ease-in-out",
                  "&:hover": {
                    backgroundColor:
                      "var(--indices-card-hover-bg, rgba(255, 255, 255, 0.05))",
                    borderColor: isSelected
                      ? preset.primary.main
                      : "var(--indices-border, rgba(255, 255, 255, 0.15))",
                    transform: "translateX(2px)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.25}
                  sx={{ minWidth: 0, flexGrow: 1 }}
                >
                  {/* Theme Swatch */}
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${preset.bgPreview} 50%, ${preset.accentPreview} 50%)`,
                      border: "2px solid",
                      borderColor: isSelected
                        ? preset.primary.main
                        : "var(--indices-border, rgba(255, 255, 255, 0.2))",
                      boxShadow: isSelected
                        ? `0 0 10px ${preset.accentPreview}66`
                        : "none",
                      flexShrink: 0,
                    }}
                  />

                  {/* Theme Details */}
                  <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: isSelected ? 800 : 600,
                          fontSize: "0.82rem",
                          color: isSelected ? "text.primary" : "text.primary",
                          fontFamily: "inherit",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {preset.name}
                      </Typography>

                      {preset.badgeLabel && (
                        <Chip
                          label={preset.badgeLabel}
                          size="small"
                          sx={{
                            height: 16,
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            borderRadius: 0.75,
                            backgroundColor:
                              preset.badgeLabel === "Light"
                                ? "rgba(79, 70, 229, 0.15)"
                                : preset.badgeLabel === "OLED"
                                  ? "rgba(56, 189, 248, 0.15)"
                                  : "rgba(99, 102, 241, 0.15)",
                            color:
                              preset.badgeLabel === "Light"
                                ? "#6366f1"
                                : preset.badgeLabel === "OLED"
                                  ? "#38bdf8"
                                  : "#818cf8",
                            "& .MuiChip-label": { px: 0.6 },
                          }}
                        />
                      )}
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontSize: "0.68rem",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {preset.tagline}
                    </Typography>
                  </Box>
                </Stack>

                {/* Selected Indicator */}
                {isSelected && (
                  <Box
                    sx={{
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: preset.primary.main,
                      color: preset.primary.contrastText,
                      boxShadow: `0 0 8px ${preset.accentPreview}88`,
                      flexShrink: 0,
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 13, strokeWidth: 1.5 }} />
                  </Box>
                )}
              </ButtonBase>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
};

export default ThemeSelector;
