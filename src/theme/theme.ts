import { createTheme, Theme } from "@mui/material/styles";

export type ThemeId = "kalshi";

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
    name: "Kalshi Dark",
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
};

export const THEMES_LIST: ThemePreset[] = Object.values(THEME_PRESETS);

export const DEFAULT_THEME_ID: ThemeId = "kalshi";

const DEFAULT_FONT =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export function applyThemeCssVariables(preset: ThemePreset): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--indices-font-family", DEFAULT_FONT);
  document.body.style.fontFamily = DEFAULT_FONT;

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
      fontFamily: DEFAULT_FONT,
      h1: {
        fontWeight: 800,
        fontFamily: DEFAULT_FONT,
      },
      h2: {
        fontWeight: 800,
        fontFamily: DEFAULT_FONT,
      },
      h3: {
        fontWeight: 800,
        fontFamily: DEFAULT_FONT,
      },
      h4: {
        fontWeight: 700,
        fontFamily: DEFAULT_FONT,
      },
      h5: {
        fontWeight: 700,
        fontFamily: DEFAULT_FONT,
      },
      h6: {
        fontWeight: 600,
        fontFamily: DEFAULT_FONT,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
        fontFamily: DEFAULT_FONT,
      },
      body1: {
        fontFamily: DEFAULT_FONT,
      },
      body2: {
        fontFamily: DEFAULT_FONT,
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
            fontFamily: DEFAULT_FONT,
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
            fontFamily: DEFAULT_FONT,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: DEFAULT_FONT,
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
