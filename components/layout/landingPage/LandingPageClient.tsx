"use client";

import { usePathname } from "next/navigation";
import LandingPage from "./LandingPage";

export default function LandingPageClient() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return isHomePage ? <LandingPage /> : null;
}
