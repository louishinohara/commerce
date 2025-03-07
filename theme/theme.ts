import { createTheme, ThemeOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    navbar: Palette["primary"]; // ✅ Extend MUI palette for navbar
  }
  interface PaletteOptions {
    navbar?: PaletteOptions["primary"];
  }
}

// Define the Dark Theme
export const darkTheme: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    navbar: {
      main: "#0A0A0A", // ✅ Darker navbar background
    },
    text: {
      primary: "#ffffff",
    },
  },
};

// Define the Light Theme
export const lightTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#121212", // Deep black for contrast
    },
    background: {
      default: "#F6F6F6", // ✅ Softer, warm off-white background
      paper: "#ECECEC", // ✅ Slightly darker off-white for cards/paper
    },
    navbar: {
      main: "#DADADA", // ✅ Softer gray, not too white but still light mode-friendly
    },
    text: {
      primary: "#1A1A1A", // ✅ Dark gray for readability
      secondary: "#4A4A4A", // ✅ Subtle gray for secondary text
    },
    divider: "#D0D0D0", // ✅ Light gray dividers for subtle separation
  },
};

// Function to Create Theme Dynamically
export const createCustomTheme = (mode: "light" | "dark") =>
  createTheme(mode === "dark" ? darkTheme : lightTheme);
