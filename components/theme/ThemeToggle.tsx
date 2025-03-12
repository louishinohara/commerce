"use client";

import { Brightness4, Brightness7 } from "@mui/icons-material"; // MUI Icons
import { IconButton } from "@mui/material";
import { useColorMode } from "theme/ThemeProvider"; // ✅ Hook to toggle dark/light mode
import { useThemeMode } from "theme/useThemeMode";

export default function ThemeToggle() {
  const { toggleColorMode } = useColorMode();
  const isDarkMode = useThemeMode();
  const shouldUse = false;

  return (
    <>
      {
        shouldUse &&
        <IconButton
          onClick={toggleColorMode}
          size="small"
          sx={{
            transition: "transform 0.2s ease-in-out",
            "&:hover": { transform: "scale(1.1)" }
          }}
        >
          {isDarkMode ? <Brightness7 fontSize="small" /> : <Brightness4 fontSize="small" />}
        </IconButton>
      }</>

  );
}
