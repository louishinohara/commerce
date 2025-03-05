"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import LogoSquare from "components/logo-square";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import MobileMenu from "./mobile-menu";

// Lazy load CartModal to improve performance
const CartModal = dynamic(() => import("components/cart/modal"), { ssr: false });

export default function NavbarClient({ menu, companyName }: { menu: any; companyName: string }) {
    const [visible, setVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const lastScrollY = useRef(0); // Use ref to prevent unnecessary re-renders

    // Handle Navbar Visibility on Scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current && window.scrollY > 50) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Detect if the screen is mobile
    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);

        setTimeout(() => setHydrated(true), 150);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full bg-white dark:bg-neutral-900 z-50 
            shadow-[0px_4px_10px_rgba(0,0,0,0.06)] dark:shadow-[0px_4px_10px_rgba(255,255,255,0.06)]
            transition-transform duration-300
            ${visible ? "translate-y-0" : "-translate-y-full"}`}
        >
            <div className="py-2 lg:py-3 px-4 lg:px-6 flex items-center justify-between">
                {/* Left: Hamburger Menu (Mobile) or Logo (Desktop) */}
                <div className="relative w-10 h-10 flex items-center">
                    {isMobile ? (
                        <button onClick={() => setMenuOpen(true)} className="transition-transform duration-300 ease-in-out hover:scale-110">
                            <Bars3Icon className="h-6 w-6 text-black dark:text-white" />
                        </button>
                    ) : (
                        <Link href="/" prefetch={true} className="flex items-center gap-2">
                            <LogoSquare />
                        </Link>
                    )}
                </div>

                {/* Mobile View: Left-Aligned Company Name */}
                <div className="md:hidden flex-grow flex items-center justify-start pl-4">
                    <span className="text-base font-medium uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis">
                        {companyName}
                    </span>
                </div>

                {/* Desktop View: Centered Company Name */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
                    <span className="text-xl font-medium uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
                        {companyName}
                    </span>
                </div>

                {/* Right: Search & Cart */}
                <div className="flex items-center gap-2 justify-end w-full">
                    <Search isMobile={isMobile} />
                    <CartModal />
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobile && <MobileMenu menu={menu} isOpen={menuOpen} setIsOpen={setMenuOpen} />}
        </nav>
    );
}