"use client";

import { useEffect, useState } from "react";
import FooterBottomSection from "./FooterBottomSection";
import FooterTopSection from "./FooterTopSection";

interface PageData {
  title: string;
  path: string;
}

interface FooterMenu {
  title: string;
  menu: string[];
}

interface NavData {
  pages: Record<string, PageData>;
  footerMenu: FooterMenu[];
}

export default function Footer() {
  const [navData, setNavData] = useState<{ columns: { title: string; menu: PageData[] }[] } | null>(null);

  useEffect(() => {
    fetch("/data/menu/data.json")
      .then((res) => res.json())
      .then((data: NavData) => {
        if (!data || !data.footerMenu || !data.pages) {
          console.error("Invalid footer data format:", data);
          return;
        }

        // Convert menu keys to full menu objects, ensuring valid keys exist
        const formattedColumns = data.footerMenu.map((section) => ({
          title: section.title,
          menu: section.menu
            .map((key) => data.pages[key]) // Replace key with actual data
            .filter((item) => item !== undefined) // Ensure only valid items are included
            .sort((a, b) => a.title.localeCompare(b.title)) // Sort alphabetically by title
        }));

        setNavData({ columns: formattedColumns });
      })
      .catch((error) => console.error("Error fetching navigation data:", error));
  }, []);

  if (!navData) return null; // Prevent rendering if data isn't loaded

  return (
    <footer className="bg-black text-white">
      {/* Upper portion of the footer: logo, subscribe, menu columns, social icons */}
      <FooterTopSection columns={navData.columns} />

      {/* Bottom portion of the footer: copyright */}
      <FooterBottomSection
        companyName={process.env.NEXT_PUBLIC_COMPANY_NAME || process.env.SITE_NAME || ""}
        displayYear={new Date().getFullYear()}
      />
    </footer>
  );
}
