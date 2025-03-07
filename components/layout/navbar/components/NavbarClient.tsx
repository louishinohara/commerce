"use client";

import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from "@mui/material";
import LogoSquare from "components/logo-square";
import ThemeToggle from "components/theme/ThemeToggle";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeMode } from "theme/useThemeMode";
import MobileMenu from "./MobileMenu";
import Search from "./Search";

// Lazy load CartModal
const CartModal = dynamic(() => import("components/cart/modal"), { ssr: false });

export default function NavbarClient({ menu, companyName }: { menu: any; companyName: string }) {
    const [visible, setVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const theme = useTheme();
    const isDarkMode = useThemeMode();

    // Handle Navbar Visibility on Scroll
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            setVisible(window.scrollY <= 50 || window.scrollY < document.documentElement.scrollTop);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Detect if the screen is mobile
    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
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
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setMenuOpen(true)}
                                sx={{
                                    transition: "transform 0.2s",
                                    "&:hover": { transform: "scale(1.1)" },
                                }}
                            >
                                <MenuIcon fontSize="small" />
                            </IconButton>
                        ) : (
                            <Link href="/" prefetch={true} style={{ display: "flex", alignItems: "center" }}>
                                <LogoSquare />
                            </Link>
                        )}
                    </Box>

                    {/* Center Section: Company Name (✅ Centered on Desktop) */}
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
                            flexGrow: isMobile ? 0 : 1, // ✅ Center the name in web view
                            textAlign: isMobile ? "left" : "center", // ✅ Center align for desktop
                            marginLeft: isMobile ? "-4px" : "0", // ✅ Reduce gap between menu icon & name
                        }}
                    >
                        {companyName}
                    </Typography>

                    {/* Right Section: Search, Cart, Theme Toggle (✅ Flex-End & Tight Spacing) */}
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0}>
                        <Search isMobile={isMobile} setMenuOpen={setMenuOpen} />
                        <CartModal />
                        {!isMobile && <ThemeToggle />}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* ✅ Drawer is always mounted but visibility is controlled by `open` */}
            <MobileMenu menu={menu} isOpen={menuOpen} setIsOpen={setMenuOpen} companyName={companyName} />
        </>
    );
}
