import React, { createContext, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import useThemeMode from "../theme";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const { theme, toggleTheme } = useThemeMode();

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
