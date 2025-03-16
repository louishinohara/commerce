"use client";

import { alpha, AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Cart from "components/cart/CartModal";
import useIsMobile from "components/hooks/useIsMobile";
import ThemeToggle from "components/theme/ThemeToggle";
import menuData from "../../../../lib/data/menu/data.json";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import SideMenuToggle from "./SideMenuToggle";
import { useNavbarStyles } from "./styles/useAppBarStyle"; // your separate style logic

interface PageData {
  title: string;
  path: string;
  isMobile?: boolean;
}

interface MenuData {
  pages: Record<string, PageData>;
  deskTopMenu: string[];
}

const typedMenuData: MenuData = menuData;

export default function NavbarClient({ companyName }: { companyName: string }) {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useIsMobile();

  // Desktop Menu Items
  const desktopItems = useMemo(() => {
    if (!typedMenuData || !typedMenuData.pages || !typedMenuData.deskTopMenu) {
      console.error("Invalid menu data:", typedMenuData);
      return [];
    }
    return typedMenuData.deskTopMenu
      .map((key) => typedMenuData.pages[key])
      .filter((item): item is PageData => item !== undefined && !item.isMobile);
  }, []);

  // Scroll logic remains the same
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggling the menu and cart
  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev || cartOpen) setCartOpen(false);
      return !prev;
    });
  };
  const toggleCart = () => {
    setCartOpen((prev) => {
      if (!prev || menuOpen) setMenuOpen(false);
      return !prev;
    });
  };

  // Grab your final <AppBar> styles from the custom logic
  const appBarSx = useNavbarStyles({
    isMobile,
    menuOpen,
    cartOpen,
    atTop,
    visible,
  });

  return (
    <>
      <AppBar position="fixed" sx={appBarSx}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            height: 48,
            paddingX: 2,
          }}
        >
          {/* LEFT SECTION: flex=1 so it stays on the left side */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flex: isMobile ? "unset" : 1,
              gap: isMobile ? 1 : 2,
            }}
          >
            {isMobile ? (
              <SideMenuToggle
                isMobile={isMobile}
                menuOpen={menuOpen}
                cartOpen={cartOpen}
                toggleMenu={toggleMenu}
              />
            ) : (
              desktopItems.map((item) => (
                <Link key={item.title} href={item.path} prefetch style={{ textDecoration: "none" }}>
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
                      "&:hover": { color: alpha(theme.palette.text.primary, 0.8) },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Link>
              ))
            )}
          </Box>

          <Box
            sx={{
              flex: isMobile ? "unset" : 1, // Remove flex on mobile, keep it on desktop
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "flex-start" : "center", // Align left on mobile, center on desktop
              width: isMobile ? "auto" : "100%", // Prevent flex shrinking on mobile
            }}
          >
            <Link href="/" prefetch style={{ textDecoration: "none" }} scroll={false}>
              <Typography
                variant="h6"
                sx={{
                  ml: isMobile ? 1 : 0,
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  fontSize: isMobile ? "1.1rem" : "1.7rem",
                  color: theme.palette.text.primary,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  "&:hover": { opacity: 0.8 },
                }}
              >
                {companyName}
              </Typography>
            </Link>
          </Box>

          {/* RIGHT SECTION: flex=1, justified to the right */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Search isMobile={isMobile} setMenuOpen={toggleMenu} />
            <Cart atTop={atTop} cartOpen={cartOpen} toggleCart={toggleCart} />
            {!isMobile && <ThemeToggle />}
          </Box>
        </Toolbar>
      </AppBar>

      <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} companyName={companyName} atTop={atTop} />
    </>
  );
}
