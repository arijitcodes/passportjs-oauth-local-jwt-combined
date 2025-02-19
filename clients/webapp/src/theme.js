import { createTheme } from "@mui/material/styles";
import { useMemo, useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";

const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          text: {
            primary: mode === "dark" ? "#E0E0E0" : "#000000", // Lighter shade of gray for dark mode
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useThemeMode;
