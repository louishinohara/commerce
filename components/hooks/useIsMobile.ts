import { useEffect, useState } from "react";

/**
 * Custom hook to detect if the screen size is mobile.
 * Returns `true` if the screen width is below 768px.
 */
export default function useIsMobile(breakpoint: number = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);

        checkScreenSize(); // Run on mount
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, [breakpoint]);

    return isMobile;
}
