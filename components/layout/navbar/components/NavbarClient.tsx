"use client";

import { AppBar, Box, Toolbar, Typography, useTheme } from "@mui/material";
import useIsMobile from "components/hooks/useIsMobile";
import ThemeToggle from "components/theme/ThemeToggle";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
import SideMenuToggle from "./SideMenuToggle";

// Lazy load CartModal
const CartModal = dynamic(() => import("components/cart/modal"), { ssr: false });

export default function NavbarClient({ menu, companyName }: { menu: any; companyName: string }) {
    const [visible, setVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useIsMobile();


    const menuItems = [
        // Primary Navigation
        { title: "Home", path: "/", category: "primary", isMobile: false },
        { title: "New Arrivals", path: "/new-arrivals", category: "primary", isMobile: false },
        { title: "Lighting", path: "/lighting", category: "primary", isMobile: true },
        { title: "Diffusers", path: "/diffusers", category: "primary", isMobile: true },

        // Secondary Navigation
        { title: "About Us", path: "/about", category: "secondary", isMobile: true },
        { title: "Contact Us", path: "/contact", category: "secondary", isMobile: true },
        { title: "Track Order", path: "/track-your-order", category: "secondary", isMobile: true },
    ];


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
                    minHeight: "48px",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "48px",
                        height: "48px",
                        paddingX: 2, // Add some padding on both sides
                    }}
                >
                    {/* Left Section: Logo or Menu */}
                    <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
                        {isMobile ? (
                            <SideMenuToggle isMobile={isMobile} setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
                        ) : (
                            <>
                                {menuItems.map((item) =>
                                    !item.isMobile ? ( 
                                        <Link
                                            key={item.title}
                                            href={item.path}
                                            prefetch={true}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: theme.palette.text.primary,
                                                    textTransform: "uppercase",
                                                    fontWeight: "medium",
                                                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                                                    letterSpacing: "0.08em",
                                                    marginX: 0.3,
                                                    lineHeight: 1,
                                                    display: "flex",
                                                    alignItems: "center", // Ensure vertical centering
                                                    height: "100%", // Make it take full height
                                                    "&:hover": { opacity: 0.8 },
                                                }}
                                            >
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    ) : null
                                )}
                            </>

                        )}
                    </Box>

                    {/* Center Section: Company Name */}
                    <Link href="/" prefetch={true} style={{ textDecoration: "none" }}>
                        <Box
                            display="flex"
                            alignItems="center" // Vertically center company name
                            justifyContent={isMobile ? "flex-start" : "center"}
                            flexGrow={isMobile ? 0 : 1}
                            height="100%"
                            minHeight="inherit" // ✅ Ensures it inherits parent's height
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "medium",
                                    letterSpacing: "0.12em",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    fontSize: isMobile ? "1.2rem" : "1.4rem",
                                    lineHeight: 1.2, // ✅ Adjusted line-height to prevent cutting
                                    display: "flex", // ✅ Ensures proper vertical centering
                                    alignItems: "center", // ✅ Aligns text inside the Typography
                                    color: theme.palette.text.primary,
                                    textAlign: isMobile ? "left" : "center",
                                    cursor: "pointer",
                                    "&:hover": { opacity: 0.8 },
                                }}
                            >
                                {companyName}
                            </Typography>
                        </Box>
                    </Link>
                    {/* Right Section: Search, Cart, Theme Toggle */}
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0}>
                        <Search isMobile={isMobile} setMenuOpen={setMenuOpen} />
                        <CartModal />
                        {!isMobile && <ThemeToggle />}
                    </Box>
                </Toolbar>
            </AppBar>

            <MobileMenu menu={menu} isOpen={menuOpen} setIsOpen={setMenuOpen} companyName={companyName} menuItems={menuItems} />
        </>
    );
}
