import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * Custom hook to get the current theme mode ("light" or "dark").
 */
export function useThemeMode(): "light" | "dark" {
  const theme = useTheme();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // If the theme mode is explicitly set, return it.
  // Otherwise, fall back to system preference.
  return theme.palette.mode ?? (prefersDarkMode ? "dark" : "light");
}
