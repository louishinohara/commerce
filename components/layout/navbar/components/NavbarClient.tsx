"use client";

import { alpha, AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";
import Link from "next/link";
import { useEffect, useState } from "react";

import CartModal from "components/cart/components/CartModal";
import useIsMobile from "components/hooks/useIsMobile";
import ThemeToggle from "components/theme/ThemeToggle";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import SideMenuToggle from "./SideMenuToggle";

interface PageData {
  title: string;
  path: string;
  isMobile: boolean;
}

interface MenuData {
  pages: Record<string, PageData>;
  deskTopMenu: string[];
  primaryMenu: string[];
  secondaryMenu: string[];
  footerMenu: {
    title: string;
    menu: string[];
  }[];
}

/* 
  Keyframes for a slower, more visible animation:
  - slideInFromLeft: background moves from 200% → 0% (left-to-right fill).
  - slideInFromRight: background moves from -200% → 0% (right-to-left fill).
*/
const slideInFromLeft = keyframes`
  0%   { background-position: 200% center; }
  100% { background-position: 0% center;   }
`;

const slideInFromRight = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 0% center;     }
`;

export default function NavbarClient({ companyName }: { companyName: string }) {
  // Navbar visibility & scroll logic
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);

  // Menu & Cart toggles
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Desktop menu items from JSON
  const [desktopItems, setDesktopItems] = useState<PageData[]>([]);

  const theme = useTheme();
  const isMobile = useIsMobile();

  /*
    Fetch menu data for desktop:
    - Maps 'deskTopMenu' keys to PageData objects in 'pages'
    - Filters out any that are "isMobile"
  */
  useEffect(() => {
    fetch("/data/menu/data.json")
      .then((res) => res.json())
      .then((data: MenuData) => {
        if (!data || !data.pages || !data.deskTopMenu) {
          console.error("Invalid menu data:", data);
          return;
        }
        const fetchedDesktopItems = data.deskTopMenu
          .map((key) => data.pages[key])
          .filter((item): item is PageData => item !== undefined && !item.isMobile);

        setDesktopItems(fetchedDesktopItems);
      })
      .catch((error) => console.error("Error fetching desktop menu:", error));
  }, []);

  /*
    Scroll logic:
    - Show/hide navbar on scroll
    - Track if user is at the top of the page
  */
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let ticking = false;
    const scrollThreshold = 5;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDiff = currentScrollY - lastScrollY;

          if (Math.abs(scrollDiff) > scrollThreshold) {
            const isScrollingUp = scrollDiff < 0;
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

  // Toggle menu: close cart if opening menu
  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev || cartOpen) setCartOpen(false);
      return !prev;
    });
  };

  // Toggle cart: close menu if opening cart
  const toggleCart = () => {
    setCartOpen((prev) => {
      if (!prev || menuOpen) setMenuOpen(false);
      return !prev;
    });
  };

  /*
    Determine final navbar background:

    1) Desktop:
       - If atTop => transparent
       - Else => rgba(0, 0, 0, 0.8)
       - (cartOpen does NOT force darker background if atTop)

    2) Mobile:
       - If menuOpen => animate left→right with rgba(0,0,0,0.8)
       - If cartOpen => animate right→left with rgba(0,0,0,0.8)
       - Else => if atTop => transparent, else => rgba(0,0,0,0.8)
  */

  // If we're on mobile and a drawer is open, animate:
  let backgroundGradient: string | undefined;
  let animation: string | undefined;

  if (isMobile) {
    if (menuOpen) {
      backgroundGradient = "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)";
      animation = `${slideInFromLeft} 1.2s ease-in-out forwards`; // Slower animation
    } else if (cartOpen) {
      backgroundGradient = "linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.8) 100%)";
      animation = `${slideInFromRight} 1.2s ease-in-out forwards`; // Slower animation
    }
  }

  // Desktop fallback or mobile fallback if drawers not open
  // If atTop on desktop => transparent, else => black
  // If atTop on mobile => transparent, else => black
  const fallbackBgColor = atTop ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.8)";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          // Smooth transitions for motion
          transition: `
            transform 0.6s ease-in-out,
            background-color 0.6s ease-in-out,
            backdrop-filter 0.6s ease-in-out,
            box-shadow 0.6s ease-in-out
          `,
          transform: visible ? "translateY(0)" : "translateY(-100%)",

          // If gradient is defined (mobile + open drawer), use it; else fallback color
          background: backgroundGradient || fallbackBgColor,
          backgroundSize: (menuOpen || cartOpen) && isMobile ? "200% 100%" : undefined,
          backgroundPosition:
            menuOpen && isMobile
              ? "200% center"
              : cartOpen && isMobile
              ? "-200% center"
              : undefined,
          animation: animation || "none",

          // If menu/cart is open on mobile => remove blur/box-shadow
          // If desktop atTop => no blur, else blur; same for box-shadow
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
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            height: 48,
            paddingX: 2,
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flex: isMobile ? 0 : 1,
              gap: isMobile ? 1 : 2,
            }}
          >
            {/* Mobile Menu Toggle / Desktop Nav Links */}
            {isMobile ? (
              <SideMenuToggle
                isMobile={isMobile}
                menuOpen={menuOpen}
                cartOpen={cartOpen}
                toggleMenu={toggleMenu}
              />
            ) : (
              desktopItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  prefetch
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
              ))
            )}
          </Box>

          {/* Center Section (Company Name / Logo) */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              transition: "flex 0.4s ease-in-out",
              pl: isMobile ? 1 : 0,
            }}
          >
            <Link
              href="/"
              prefetch
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
                  "&:hover": { opacity: 0.8 },
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
              gap: 0,
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
