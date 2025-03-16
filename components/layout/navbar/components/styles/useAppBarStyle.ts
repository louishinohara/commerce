"use client";

import { keyframes, SxProps, Theme } from "@mui/system";

interface UseNavbarStylesProps {
  isMobile: boolean;
  menuOpen: boolean;
  cartOpen: boolean;
  atTop: boolean;
  visible: boolean;
}

const slideInFromLeft = keyframes`
  0%   { background-position: 200% center; }
  100% { background-position: 0% center;   }
`;

const slideInFromRight = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 0% center;     }
`;

/**
 * Returns an object (like `sx`) containing the final AppBar styling,
 * so you can apply it directly in `<AppBar sx={...}>`.
 */
export function useNavbarStyles({
  isMobile,
  menuOpen,
  cartOpen,
  atTop,
  visible,
}: UseNavbarStylesProps): SxProps<Theme> {
  let backgroundGradient: string | undefined;
  let animation: string | undefined;

  // Mobile animations
  if (isMobile) {
    if (menuOpen) {
      backgroundGradient = "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)";
      animation = `${slideInFromLeft} 1.2s ease-in-out forwards`;
    } else if (cartOpen) {
      backgroundGradient = "linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)";
      animation = `${slideInFromRight} 1.2s ease-in-out forwards`;
    }
  }

  // If atTop => transparent; else => black
  const fallbackBgColor = atTop ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.8)";

  return {
    position: "fixed",
    transition: `
      transform 0.6s ease-in-out,
      background-color 0.6s ease-in-out,
      backdrop-filter 0.6s ease-in-out,
      box-shadow 0.6s ease-in-out
    `,
    transform: visible ? "translateY(0)" : "translateY(-100%)",
    background: backgroundGradient || fallbackBgColor,
    backgroundSize: (menuOpen || cartOpen) && isMobile ? "200% 100%" : undefined,
    backgroundPosition:
      isMobile && menuOpen
        ? "200% center"
        : isMobile && cartOpen
        ? "-200% center"
        : undefined,
    animation: animation || "none",

    // If menu/cart is open on mobile => no blur/box-shadow
    // If desktop + atTop => no blur, else blur
    backdropFilter: isMobile && (menuOpen || cartOpen)
      ? "none"
      : atTop
      ? "none"
      : "blur(8px)",
    boxShadow:
      isMobile && (menuOpen || cartOpen)
        ? "none"
        : atTop
        ? "none"
        : "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderBottom:
      isMobile && (menuOpen || cartOpen)
        ? "none"
        : atTop
        ? "none"
        : "1px solid rgba(255, 255, 255, 0.08)",
    minHeight: "48px",
  };
}
