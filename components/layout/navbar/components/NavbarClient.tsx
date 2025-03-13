"use client";

import { alpha, AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import CartModal from "components/cart/components/CartModal";
import useIsMobile from "components/hooks/useIsMobile";
import ThemeToggle from "components/theme/ThemeToggle";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import SideMenuToggle from "./SideMenuToggle";

/**
 * Dynamically import the cart modal to avoid SSR issues
 */
// -- NEW: Define interfaces matching your JSON structure --
interface PageData {
  title: string;
  path: string;
  isMobile: boolean;
}

interface MenuData {
  pages: Record<string, PageData>;
  deskTopMenu: string[];    // <-- new array for Desktop usage
  primaryMenu: string[];
  secondaryMenu: string[];
  footerMenu: {
    title: string;
    menu: string[];
  }[];
}

/**
 * NavbarClient component:
 * - Uses scroll detection to show/hide the nav bar.
 * - Splits the toolbar into three flex boxes (left, center, right).
 * - Shifts center content (logo) to the left when search is open.
 */
export default function NavbarClient({ companyName }: { companyName: string }) {
  // Visibility state of the navbar
  const [visible, setVisible] = useState(true);
  // Whether the user is at the top of the page
  const [atTop, setAtTop] = useState(true);
  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [desktopItems, setDesktopItems] = useState<PageData[]>([]);

  const theme = useTheme();
  const isMobile = useIsMobile();

  // -- NEW: Fetch menu data from JSON for the desktop items --
  useEffect(() => {
    fetch("/data/menu/data.json")
      .then((res) => res.json())
      .then((data: MenuData) => {
        if (!data || !data.pages || !data.deskTopMenu) {
          console.error("Invalid menu data:", data);
          return;
        }

        // Map the 'deskTopMenu' array to actual PageData objects
        const fetchedDesktopItems = data.deskTopMenu
          .map((key) => data.pages[key])
          .filter((item): item is PageData => item !== undefined && !item.isMobile);

        setDesktopItems(fetchedDesktopItems);
      })
      .catch((error) => console.error("Error fetching desktop menu:", error));
  }, []);

  // Scroll logic to show/hide navbar
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const scrollThreshold = 5; // Number of pixels to scroll before we update

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = currentScrollY - lastScrollY;

          // Only update state if the user scrolls more than our threshold
          if (Math.abs(scrollDiff) > scrollThreshold) {
            const isScrollingUp = scrollDiff < 0;
            // Check if the page is at the very top
            setAtTop(currentScrollY <= 30);

            setVisible(currentScrollY === 0 || isScrollingUp || currentScrollY < 30);

            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    setAtTop(window.scrollY === 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev || cartOpen) {
        setCartOpen(false); // Close cart when opening menu
      }
      return !prev;
    });
  };

  const toggleCart = () => {
    setCartOpen((prev) => {
      if (!prev || menuOpen) {
        setMenuOpen(false); // Close menu when opening cart
      }
      return !prev;
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          transition:
            "transform 0.6s ease-in-out, background-color 0.6s ease-in-out, backdrop-filter 0.6s ease-in-out, box-shadow 0.6s ease-in-out",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          backgroundColor: atTop
            ? "rgba(0, 0, 0, 0)"
            : alpha(theme.palette.background.default, 0.93),
          backdropFilter: atTop ? "none" : "blur(8px)",
          boxShadow: atTop ? "none" : "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderBottom: atTop ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
          minHeight: "48px",
          backgroundImage: atTop ? "none" : undefined
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            height: 48,
            paddingX: 2
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flex: isMobile ? 0 : 1,
              gap: isMobile ? 1 : 2
            }}
          >
            {isMobile ? (
              <SideMenuToggle isMobile={isMobile} menuOpen={menuOpen} cartOpen={cartOpen} toggleMenu={toggleMenu} />
            ) : (
              // Desktop menu
              <>
                {desktopItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.path}
                    prefetch={true}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: theme.palette.text.primary,
                        fontWeight: "medium",
                        fontSize: "0.875rem",
                        letterSpacing: "0.08em",
                        marginX: 0.6,
                        position: "relative",
                        transition: "color 0.2s ease-in-out",
                        "&:hover": {
                          color: alpha(theme.palette.text.primary, 0.8),
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: "50%",
                          bottom: "-3px",
                          width: "0%",
                          height: "2px",
                          backgroundColor: alpha(theme.palette.text.primary, 0.6),
                          transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
                        },
                        "&:hover::after": {
                          width: "100%",
                          left: "0%",
                        },
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                ))}
              </>
            )}
          </Box>

          {/* Center Section (Company name) */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              transition: "flex 0.4s ease-in-out",
              pl: isMobile ? 1 : 0
            }}
          >
            <Link
              href="/"
              prefetch={true}
              style={{ textDecoration: "none" }}
              scroll={false}
            >
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontSize: isMobile ? "1.1rem" : "1.7rem",
                  color: theme.palette.text.primary,
                  "&:hover": { opacity: 0.8 }
                }}
              >
                {companyName}
              </Typography>
            </Link>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 0
            }}
          >
            <Search isMobile={isMobile} setMenuOpen={setMenuOpen} />
            <CartModal atTop={atTop} cartOpen={cartOpen} toggleCart={toggleCart} />
            {!isMobile && <ThemeToggle />}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer menu */}
      <MobileMenu
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
        companyName={companyName}
        atTop={atTop}
      />
    </>
  );
}
