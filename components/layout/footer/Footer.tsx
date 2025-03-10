"use client";

import { useEffect, useState } from "react";
import FooterBottomSection from "./FooterBottomSection";
import FooterTopSection from "./FooterTopSection";

const { NEXT_PUBLIC_COMPANY_NAME, SITE_NAME } = process.env;

export default function Footer() {
  const [navData, setNavData] = useState<{ columns: { title: string; menu: { title: string; path: string }[] }[] } | null>(null);

  useEffect(() => {
    fetch("/data/footer/data.json")
      .then((res) => res.json())
      .then((data) => setNavData(data))
      .catch((error) => console.error("Error fetching navigation data:", error));
  }, []);

  if (!navData || !navData.columns) return null; // Prevent rendering if data isn't loaded

  return (
    <footer className="bg-black text-white">
      {/* Upper portion of the footer: logo, subscribe, menu columns, social icons */}
      <FooterTopSection columns={navData.columns} />

      {/* Bottom portion of the footer: copyright */}
      <FooterBottomSection
        companyName={NEXT_PUBLIC_COMPANY_NAME || SITE_NAME || ""}
        displayYear={new Date().getFullYear()}
      />
    </footer>
  );
}
