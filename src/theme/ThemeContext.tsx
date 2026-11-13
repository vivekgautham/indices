import { CssBaseline, ThemeProvider } from "@mui/material";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  applyThemeCssVariables,
  buildTheme,
  DEFAULT_THEME_ID,
  THEME_PRESETS,
  THEMES_LIST,
  ThemeId,
  ThemePreset,
} from "./theme";

interface ThemeContextValue {
  themeId: ThemeId;
  activeTheme: ThemePreset;
  setThemeId: (id: ThemeId) => void;
  availableThemes: ThemePreset[];
}

const STORAGE_KEY = "indices-theme-id";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Always default to Kalshi Dark theme
  const themeId: ThemeId = DEFAULT_THEME_ID;
  const activeTheme = THEME_PRESETS[DEFAULT_THEME_ID];
  const muiTheme = useMemo(() => buildTheme(activeTheme), [activeTheme]);

  useEffect(() => {
    // Clear any stale cached theme preference from older versions
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore localStorage access errors
    }
    applyThemeCssVariables(activeTheme);
  }, [activeTheme]);

  const contextValue = useMemo(
    () => ({
      themeId,
      activeTheme,
      setThemeId: () => {},
      availableThemes: THEMES_LIST,
    }),
    [themeId, activeTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useColorTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
}
