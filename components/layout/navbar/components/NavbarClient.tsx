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

/**
 * Dynamically import the cart modal to avoid SSR issues
 */
const CartModal = dynamic(() => import("components/cart/modal"), { ssr: false });

/**
 * NavbarClient component:
 * - Uses scroll detection to show/hide the nav bar.
 * - Smoothed out transitions with requestAnimationFrame and a small scroll threshold
 *   so the navbar isn't toggled on tiny scroll movements.
 */
export default function NavbarClient({ menu, companyName }: { menu: any; companyName: string }) {
    // Visibility state of the navbar
    const [visible, setVisible] = useState(true);
    // Whether the user is at the top of the page
    const [atTop, setAtTop] = useState(true);
    // Mobile menu state
    const [menuOpen, setMenuOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useIsMobile();

    // Define your menu items
    const menuItems = [
        { title: "Home", path: "/", category: "primary", isMobile: false },
        { title: "New Arrivals", path: "/new-arrivals", category: "primary", isMobile: false },
        { title: "Lighting", path: "/lighting", category: "primary", isMobile: true },
        { title: "Diffusers", path: "/diffusers", category: "primary", isMobile: true },
        { title: "About Us", path: "/about", category: "secondary", isMobile: true },
        { title: "Contact Us", path: "/contact", category: "secondary", isMobile: true },
        { title: "Track Order", path: "/track-your-order", category: "secondary", isMobile: true },
    ];

    useEffect(() => {
        if (typeof window === "undefined") return;

        let lastScrollY = window.scrollY;
        let ticking = false;
        const scrollThreshold = 5; // Number of pixels to scroll before we update

        const handleScroll = () => {
            // Use requestAnimationFrame to smooth out frequent scroll events
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    const scrollDiff = currentScrollY - lastScrollY;

                    // Only update state if the user scrolls more than our threshold
                    if (Math.abs(scrollDiff) > scrollThreshold) {
                        const isScrollingUp = scrollDiff < 0;

                        // Check if the page is at the very top
                        setAtTop(currentScrollY === 0);

                        /**
                         * Show navbar if:
                         * - we're at the top
                         * - scrolling up
                         * - scrolled less than 30px
                         * Otherwise hide it
                         */
                        setVisible(currentScrollY === 0 || isScrollingUp || currentScrollY < 30);

                        // Update lastScrollY for next iteration
                        lastScrollY = currentScrollY;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Set initial "atTop" on mount
        setAtTop(window.scrollY === 0);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {/**
             * We fix the AppBar at the top so it can slide up/down smoothly.
             * The `transform` property is toggled by the `visible` state.
             */}
            <AppBar
                position="fixed"
                sx={{
                    // Increase transition duration for extra smoothness
                    transition: "transform 0.6s ease-in-out, background-color 0.6s ease-in-out, backdrop-filter 0.6s ease-in-out, box-shadow 0.6s ease-in-out",
                    transform: visible ? "translateY(0)" : "translateY(-100%)",
                    backgroundColor: atTop ? "rgba(0, 0, 0, 0)" : theme.palette.background.default + "cc",
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
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "48px",
                        height: "48px",
                        paddingX: 2
                    }}
                >
                    {/* Left side: either SideMenuToggle (mobile) or nav links (desktop) */}
                    <Box display="flex" alignItems="center" gap={isMobile ? 1 : 2}>
                        {isMobile ? (
                            <SideMenuToggle isMobile={isMobile} setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
                        ) : (
                            <>
                                {menuItems.map((item) =>
                                    !item.isMobile ? (
                                        <Link key={item.title} href={item.path} prefetch={true} style={{ textDecoration: "none" }}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: theme.palette.text.primary,
                                                    textTransform: "uppercase",
                                                    fontWeight: "medium",
                                                    fontSize: "0.875rem",
                                                    letterSpacing: "0.08em",
                                                    marginX: 0.3,
                                                    lineHeight: 1,
                                                    "&:hover": { opacity: 0.8 }
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

                    {/* Center: Company name, linked to home */}
                    <Link href="/" prefetch={true} style={{ textDecoration: "none" }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent={isMobile ? "flex-start" : "center"}
                            flexGrow={isMobile ? 0 : 1}
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
                                    color: theme.palette.text.primary,
                                    "&:hover": { opacity: 0.8 }
                                }}
                            >
                                {companyName}
                            </Typography>
                        </Box>
                    </Link>

                    {/* Right side: Search, Cart, ThemeToggle */}
                    <Box display="flex" alignItems="center" justifyContent="flex-end" gap={0}>
                        <Search isMobile={isMobile} setMenuOpen={setMenuOpen} />
                        <CartModal />
                        {!isMobile && <ThemeToggle />}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile drawer menu */}
            <MobileMenu isOpen={menuOpen} setIsOpen={setMenuOpen} companyName={companyName} menuItems={menuItems} atTop={atTop} />
        </>
    );
}
