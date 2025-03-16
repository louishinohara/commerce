"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { createCustomTheme } from "./theme";

// Theme Context
const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "dark" as "light" | "dark",
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export default function ThemeContextProvider({ children }: { children: ReactNode }) {
  // Default to dark mode
  const [mode, setMode] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "dark"; // Default to dark
    }
    return "dark"; 
  });

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    setMode(storedTheme || "dark"); // Default to dark mode
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("theme", newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode] // Dependency added to ensure it updates correctly
  );

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  if (!hydrated) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
