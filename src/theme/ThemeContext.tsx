import { CssBaseline, ThemeProvider } from "@mui/material";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
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

function getInitialThemeId(): ThemeId {
  if (typeof window === "undefined") return DEFAULT_THEME_ID;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && THEME_PRESETS[saved]) {
      return saved;
    }
  } catch {
    // Ignore localStorage access errors
  }
  return DEFAULT_THEME_ID;
}

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeId, setThemeIdState] = useState<ThemeId>(getInitialThemeId);

  const activeTheme = useMemo(
    () => THEME_PRESETS[themeId] || THEME_PRESETS[DEFAULT_THEME_ID],
    [themeId],
  );

  const muiTheme = useMemo(() => buildTheme(activeTheme), [activeTheme]);

  const setThemeId = (id: ThemeId) => {
    if (THEME_PRESETS[id]) {
      setThemeIdState(id);
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // Ignore localStorage quota errors
      }
    }
  };

  useEffect(() => {
    applyThemeCssVariables(activeTheme);
  }, [activeTheme]);

  const contextValue = useMemo(
    () => ({
      themeId,
      activeTheme,
      setThemeId,
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
