import { createTheme, Theme } from "@mui/material/styles";

export type ThemeId = "kalshi" | "kalshi-light" | "wsj" | "clean-light";

export interface ThemePreset {
  id: ThemeId;
  name: string;
  shortName: string;
  tagline: string;
  type: "dark" | "light";
  fontFamily?: string;
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
  navbarBg?: string;
  text: {
    primary: string;
    secondary: string;
  };
  accentPreview: string;
  bgPreview: string;
  badgeLabel?: string;
}

export const THEME_PRESETS: Record<ThemeId, ThemePreset> = {
  kalshi: {
    id: "kalshi",
    name: "Kalshi",
    shortName: "Kalshi",
    tagline: "Kalshi dark exchange canvas with vibrant trading green",
    type: "dark",
    primary: {
      main: "#00DD94",
      light: "#34e5aa",
      dark: "#00b67a",
      contrastText: "#050D0A",
    },
    secondary: {
      main: "#00b67a",
      light: "#34d399",
      dark: "#014737",
      contrastText: "#ffffff",
    },
    background: {
      default: "#050D0A",
      paper: "#0B1A14",
    },
    cardBg: "rgba(11, 26, 20, 0.72)",
    cardHoverBg: "rgba(16, 36, 28, 0.92)",
    subtleBg: "rgba(0, 221, 148, 0.08)",
    border: "rgba(0, 221, 148, 0.16)",
    navbarBg: "rgba(5, 13, 10, 0.88)",
    text: {
      primary: "#ffffff",
      secondary: "#8fa399",
    },
    accentPreview: "#00DD94",
    bgPreview: "#050D0A",
    badgeLabel: "Kalshi",
  },
  "kalshi-light": {
    id: "kalshi-light",
    name: "Kalshi Light",
    shortName: "Kalshi Light",
    tagline: "Clean light canvas with Kalshi emerald accents",
    type: "light",
    primary: {
      main: "#00B67A",
      light: "#26c990",
      dark: "#014737",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#014737",
      light: "#00b67a",
      dark: "#00281e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F5F7F4",
      paper: "#ffffff",
    },
    cardBg: "rgba(255, 255, 255, 0.95)",
    cardHoverBg: "#ffffff",
    subtleBg: "rgba(0, 182, 122, 0.08)",
    border: "rgba(1, 71, 55, 0.12)",
    navbarBg: "rgba(245, 247, 244, 0.92)",
    text: {
      primary: "#050D0A",
      secondary: "#4b5563",
    },
    accentPreview: "#00B67A",
    bgPreview: "#F5F7F4",
    badgeLabel: "Light",
  },
  wsj: {
    id: "wsj",
    name: "WSJ Editorial",
    shortName: "WSJ",
    tagline: "The Wall Street Journal black & white newsprint with serif type",
    type: "light",
    fontFamily:
      '"Exchange", "Escrow", "Newsreader", "Retina", Georgia, "Times New Roman", serif',
    primary: {
      main: "#111111",
      light: "#333333",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#333333",
      light: "#555555",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    cardBg: "#ffffff",
    cardHoverBg: "#fbfbfb",
    subtleBg: "rgba(0, 0, 0, 0.04)",
    border: "#e5e5e5",
    navbarBg: "rgba(255, 255, 255, 0.96)",
    text: {
      primary: "#111111",
      secondary: "#555555",
    },
    accentPreview: "#111111",
    bgPreview: "#ffffff",
    badgeLabel: "WSJ",
  },
  "clean-light": {
    id: "clean-light",
    name: "Clean Light",
    shortName: "Clean Light",
    tagline: "Crisp modern daylight with classic slate & indigo",
    type: "light",
    primary: {
      main: "#4338ca",
      light: "#6366f1",
      dark: "#312e81",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0284c7",
      light: "#38bdf8",
      dark: "#0369a1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    cardBg: "rgba(255, 255, 255, 0.95)",
    cardHoverBg: "#ffffff",
    subtleBg: "rgba(241, 245, 249, 0.85)",
    border: "rgba(15, 23, 42, 0.12)",
    navbarBg: "rgba(248, 250, 252, 0.92)",
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    accentPreview: "#4338ca",
    bgPreview: "#f8fafc",
    badgeLabel: "Light",
  },
};

export const THEMES_LIST: ThemePreset[] = Object.values(THEME_PRESETS);

export const DEFAULT_THEME_ID: ThemeId = "kalshi";

const DEFAULT_FONT =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export function applyThemeCssVariables(preset: ThemePreset): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const fontFamily = preset.fontFamily || DEFAULT_FONT;
  root.style.setProperty("--indices-font-family", fontFamily);
  document.body.style.fontFamily = fontFamily;

  root.style.setProperty("--indices-bg-default", preset.background.default);
  root.style.setProperty("--indices-bg-paper", preset.background.paper);
  root.style.setProperty("--indices-card-bg", preset.cardBg);
  root.style.setProperty("--indices-card-hover-bg", preset.cardHoverBg);
  root.style.setProperty("--indices-subtle-bg", preset.subtleBg);
  root.style.setProperty("--indices-border", preset.border);
  root.style.setProperty(
    "--indices-navbar-bg",
    preset.navbarBg ||
      (preset.type === "dark"
        ? "rgba(5, 13, 10, 0.88)"
        : "rgba(255, 255, 255, 0.92)"),
  );
  root.style.setProperty("--indices-text-primary", preset.text.primary);
  root.style.setProperty("--indices-text-secondary", preset.text.secondary);
  root.style.setProperty("--indices-primary", preset.primary.main);
  root.style.setProperty("--indices-primary-light", preset.primary.light);
  root.style.setProperty("--indices-primary-dark", preset.primary.dark);
  root.style.setProperty("--indices-accent-preview", preset.accentPreview);
  root.style.colorScheme = preset.type;
}

export function buildTheme(preset: ThemePreset): Theme {
  const fontFamily = preset.fontFamily || DEFAULT_FONT;
  const isWsj = preset.id === "wsj";

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
      fontFamily,
      h1: {
        fontWeight: isWsj ? 700 : 800,
        fontFamily,
        letterSpacing: isWsj ? "-0.025em" : undefined,
      },
      h2: {
        fontWeight: isWsj ? 700 : 800,
        fontFamily,
        letterSpacing: isWsj ? "-0.02em" : undefined,
      },
      h3: {
        fontWeight: isWsj ? 700 : 800,
        fontFamily,
        letterSpacing: isWsj ? "-0.015em" : undefined,
      },
      h4: {
        fontWeight: 700,
        fontFamily,
      },
      h5: {
        fontWeight: 700,
        fontFamily,
      },
      h6: {
        fontWeight: 600,
        fontFamily,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        fontFamily,
      },
      body1: {
        fontFamily,
      },
      body2: {
        fontFamily,
      },
    },
    shape: {
      borderRadius: isWsj ? 6 : 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: preset.background.default,
            color: preset.text.primary,
            fontFamily,
            minHeight: "100vh",
            margin: 0,
            transition: "background-color 0.25s ease, color 0.25s ease",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: isWsj ? 4 : 10,
            fontFamily,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily,
            fontWeight: 600,
            borderRadius: isWsj ? 4 : undefined,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: preset.cardBg,
            backdropFilter: isWsj ? "none" : "blur(12px)",
            border: `1px solid ${preset.border}`,
            boxShadow: isWsj ? "0 1px 3px rgba(0, 0, 0, 0.05)" : undefined,
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
