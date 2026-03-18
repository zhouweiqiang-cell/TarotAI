import React, { createContext, useContext, useMemo } from 'react';
import { getColors, getSuitColors } from '../constants/theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ theme, children }) {
  const value = useMemo(() => ({
    theme,
    colors: getColors(theme),
    suitColors: getSuitColors(theme),
    isDune: theme === 'dune',
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Fallback for components rendered outside provider (shouldn't happen)
    const colors = getColors('cosmic');
    return { theme: 'cosmic', colors, suitColors: getSuitColors('cosmic'), isDune: false };
  }
  return ctx;
}
