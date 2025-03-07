"use client";

import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import useIsMobile from "components/hooks/useIsMobile";
import LogoSquare from "components/logo-square";
import ThemeToggle from "components/theme/ThemeToggle";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeMode } from "theme/useThemeMode";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import SideMenuToggle from "./SideMenuToggle";

// Lazy load CartModal
const CartModal = dynamic(() => import("components/cart/modal"), { ssr: false });

export default function NavbarClient({ menu, companyName }: { menu: any; companyName: string }) {
    const [visible, setVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isDarkMode = useThemeMode();
    const isMobile = useIsMobile();

    // Handle Navbar Visibility on Scroll
    useEffect(() => {
        if (typeof window === "undefined") return;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollingUp = currentScrollY < lastScrollY;

            // Show navbar when scrolling up or at the very top
            setVisible(isScrollingUp || currentScrollY === 0);

            lastScrollY = currentScrollY; // Update last scroll position
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    transition: "transform 0.3s ease-in-out",
                    transform: visible ? "translateY(0)" : "translateY(-100%)",
                    backgroundColor: theme.palette.background.default,
                    backdropFilter: "blur(8px)",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "56px" }}>
                    {/* Left Section: Logo or Hamburger Menu */}
                    <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
                        {isMobile ? (
                            <SideMenuToggle isMobile={isMobile} setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
                        ) : (
                            <Link href="/" prefetch={true} style={{ display: "flex", alignItems: "center" }}>
                                <LogoSquare />
                            </Link>
                        )}
                    </Box>

                    {/* Center Section: Company Name */}
                    <Link href="/" prefetch={true} style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                textTransform: "uppercase",
                                fontWeight: "medium",
                                letterSpacing: "0.12em",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                fontSize: isMobile ? "0.9rem" : "1.2rem",
                                color: theme.palette.text.primary,
                                flexGrow: isMobile ? 0 : 1,
                                textAlign: isMobile ? "left" : "center",
                                marginLeft: isMobile ? "-4px" : "0",
                                cursor: "pointer", // ✅ Makes it clear it's clickable
                                "&:hover": {
                                    opacity: 0.8, // ✅ Adds a subtle hover effect
                                }
                            }}
                        >
                            {companyName}
                        </Typography>
                    </Link>

                    {/* Right Section: Search, Cart, Theme Toggle */}
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0}>
                        <Search isMobile={isMobile} setMenuOpen={setMenuOpen} />
                        <CartModal />
                        {!isMobile && <ThemeToggle />}
                    </Box>
                </Toolbar>
            </AppBar>

            <MobileMenu menu={menu} isOpen={menuOpen} setIsOpen={setMenuOpen} companyName={companyName} />
        </>
    );
}