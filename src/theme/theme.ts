import { createTheme, Theme } from "@mui/material/styles";

export type ThemeId =
  | "slate"
  | "ocean"
  | "emerald"
  | "amethyst"
  | "amber"
  | "rose"
  | "midnight"
  | "light";

export interface ThemePreset {
  id: ThemeId;
  name: string;
  shortName: string;
  tagline: string;
  type: "dark" | "light";
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  cardBg: string;
  cardHoverBg: string;
  subtleBg: string;
  border: string;
  text: {
    primary: string;
    secondary: string;
  };
  accentPreview: string;
  bgPreview: string;
  badgeLabel?: string;
}

export const THEME_PRESETS: Record<ThemeId, ThemePreset> = {
  slate: {
    id: "slate",
    name: "Slate Indigo",
    shortName: "Slate",
    tagline: "Default dark slate with vibrant indigo accents",
    type: "dark",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a855f7",
      light: "#c084fc",
      dark: "#7e22ce",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    cardBg: "rgba(30, 41, 59, 0.65)",
    cardHoverBg: "rgba(30, 41, 59, 0.9)",
    subtleBg: "rgba(30, 41, 59, 0.4)",
    border: "rgba(255, 255, 255, 0.08)",
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
    accentPreview: "#6366f1",
    bgPreview: "#0f172a",
    badgeLabel: "Default",
  },
  ocean: {
    id: "ocean",
    name: "Oceanic Cyan",
    shortName: "Ocean",
    tagline: "Deep maritime navy with energetic cyan highlights",
    type: "dark",
    primary: {
      main: "#06b6d4",
      light: "#22d3ee",
      dark: "#0891b2",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#ffffff",
    },
    background: {
      default: "#071524",
      paper: "#0e2438",
    },
    cardBg: "rgba(14, 36, 56, 0.65)",
    cardHoverBg: "rgba(14, 36, 56, 0.9)",
    subtleBg: "rgba(14, 36, 56, 0.4)",
    border: "rgba(6, 182, 212, 0.16)",
    text: {
      primary: "#f0fdfa",
      secondary: "#94a3b8",
    },
    accentPreview: "#06b6d4",
    bgPreview: "#071524",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Mint",
    shortName: "Emerald",
    tagline: "Deep alpine forest with sharp bull market green",
    type: "dark",
    primary: {
      main: "#10b981",
      light: "#34d399",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#14b8a6",
      light: "#2dd4bf",
      dark: "#0f766e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#041c14",
      paper: "#0a2e22",
    },
    cardBg: "rgba(10, 46, 34, 0.65)",
    cardHoverBg: "rgba(10, 46, 34, 0.9)",
    subtleBg: "rgba(10, 46, 34, 0.4)",
    border: "rgba(16, 185, 129, 0.16)",
    text: {
      primary: "#ecfdf5",
      secondary: "#a7f3d0",
    },
    accentPreview: "#10b981",
    bgPreview: "#041c14",
  },
  amethyst: {
    id: "amethyst",
    name: "Amethyst Violet",
    shortName: "Amethyst",
    tagline: "Nocturnal plum with electric violet glow",
    type: "dark",
    primary: {
      main: "#a855f7",
      light: "#c084fc",
      dark: "#7e22ce",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ec4899",
      light: "#f472b6",
      dark: "#be185d",
      contrastText: "#ffffff",
    },
    background: {
      default: "#130924",
      paper: "#21113b",
    },
    cardBg: "rgba(33, 17, 59, 0.65)",
    cardHoverBg: "rgba(33, 17, 59, 0.9)",
    subtleBg: "rgba(33, 17, 59, 0.4)",
    border: "rgba(168, 85, 247, 0.16)",
    text: {
      primary: "#faf5ff",
      secondary: "#d8b4fe",
    },
    accentPreview: "#a855f7",
    bgPreview: "#130924",
  },
  amber: {
    id: "amber",
    name: "Amber Gold",
    shortName: "Amber",
    tagline: "Warm obsidian with bullion gold & bronze",
    type: "dark",
    primary: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f97316",
      light: "#fb923c",
      dark: "#c2410c",
      contrastText: "#ffffff",
    },
    background: {
      default: "#17120a",
      paper: "#281e10",
    },
    cardBg: "rgba(40, 30, 16, 0.65)",
    cardHoverBg: "rgba(40, 30, 16, 0.9)",
    subtleBg: "rgba(40, 30, 16, 0.4)",
    border: "rgba(245, 158, 11, 0.16)",
    text: {
      primary: "#fffbeb",
      secondary: "#fcd34d",
    },
    accentPreview: "#f59e0b",
    bgPreview: "#17120a",
  },
  rose: {
    id: "rose",
    name: "Crimson Ruby",
    shortName: "Ruby",
    tagline: "Deep velvet wine with vivid neon ruby highlights",
    type: "dark",
    primary: {
      main: "#f43f5e",
      light: "#fb7185",
      dark: "#e11d48",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e11d48",
      light: "#f43f5e",
      dark: "#9f1239",
      contrastText: "#ffffff",
    },
    background: {
      default: "#190b12",
      paper: "#2c1220",
    },
    cardBg: "rgba(44, 18, 32, 0.65)",
    cardHoverBg: "rgba(44, 18, 32, 0.9)",
    subtleBg: "rgba(44, 18, 32, 0.4)",
    border: "rgba(244, 63, 94, 0.16)",
    text: {
      primary: "#fff1f2",
      secondary: "#fda4af",
    },
    accentPreview: "#f43f5e",
    bgPreview: "#190b12",
  },
  midnight: {
    id: "midnight",
    name: "Midnight OLED",
    shortName: "OLED",
    tagline: "True pitch black with high-contrast sky blue",
    type: "dark",
    primary: {
      main: "#38bdf8",
      light: "#7dd3fc",
      dark: "#0284c7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#818cf8",
      light: "#a5b4fc",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    background: {
      default: "#000000",
      paper: "#111111",
    },
    cardBg: "rgba(18, 18, 18, 0.8)",
    cardHoverBg: "rgba(28, 28, 28, 0.95)",
    subtleBg: "rgba(24, 24, 24, 0.55)",
    border: "rgba(255, 255, 255, 0.12)",
    text: {
      primary: "#ffffff",
      secondary: "#a1a1aa",
    },
    accentPreview: "#38bdf8",
    bgPreview: "#000000",
    badgeLabel: "OLED",
  },
  light: {
    id: "light",
    name: "Clean Light",
    shortName: "Light",
    tagline: "Crisp modern light workspace with bold indigo",
    type: "light",
    primary: {
      main: "#4f46e5",
      light: "#6366f1",
      dark: "#3730a3",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#7c3aed",
      light: "#8b5cf6",
      dark: "#5b21b6",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    cardBg: "rgba(255, 255, 255, 0.9)",
    cardHoverBg: "#ffffff",
    subtleBg: "rgba(241, 245, 249, 0.85)",
    border: "rgba(15, 23, 42, 0.12)",
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    accentPreview: "#4f46e5",
    bgPreview: "#f8fafc",
    badgeLabel: "Light",
  },
};

export const THEMES_LIST: ThemePreset[] = Object.values(THEME_PRESETS);

export const DEFAULT_THEME_ID: ThemeId = "slate";

export function applyThemeCssVariables(preset: ThemePreset): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--indices-bg-default", preset.background.default);
  root.style.setProperty("--indices-bg-paper", preset.background.paper);
  root.style.setProperty("--indices-card-bg", preset.cardBg);
  root.style.setProperty("--indices-card-hover-bg", preset.cardHoverBg);
  root.style.setProperty("--indices-subtle-bg", preset.subtleBg);
  root.style.setProperty("--indices-border", preset.border);
  root.style.setProperty("--indices-text-primary", preset.text.primary);
  root.style.setProperty("--indices-text-secondary", preset.text.secondary);
  root.style.setProperty("--indices-primary", preset.primary.main);
  root.style.setProperty("--indices-primary-light", preset.primary.light);
  root.style.setProperty("--indices-primary-dark", preset.primary.dark);
  root.style.setProperty("--indices-accent-preview", preset.accentPreview);
  root.style.colorScheme = preset.type;
}

export function buildTheme(preset: ThemePreset): Theme {
  return createTheme({
    palette: {
      mode: preset.type,
      primary: preset.primary,
      secondary: preset.secondary,
      background: preset.background,
      text: preset.text,
      divider: preset.border,
    },
    typography: {
      fontFamily:
        '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      h1: {
        fontWeight: 800,
      },
      h2: {
        fontWeight: 800,
      },
      h3: {
        fontWeight: 800,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: preset.background.default,
            color: preset.text.primary,
            minHeight: "100vh",
            margin: 0,
            transition: "background-color 0.25s ease, color 0.25s ease",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            fontFamily: "inherit",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: "inherit",
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: preset.cardBg,
            backdropFilter: "blur(12px)",
            border: `1px solid ${preset.border}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: preset.cardBg,
          },
        },
      },
    },
  });
}

export const theme = buildTheme(THEME_PRESETS[DEFAULT_THEME_ID]);
