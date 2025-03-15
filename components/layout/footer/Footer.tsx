import navData from "../../../lib/data/menu/data.json";
import FooterBottomSection from "./FooterBottomSection";
import FooterTopSection from "./FooterTopSection";

// Define TypeScript interfaces
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

// Process and format footer data
const getFormattedNavData = (data: NavData) => {
  if (!data || !data.footerMenu || !data.pages) {
    console.error("Invalid footer data format:", data);
    return null;
  }

  return {
    columns: data.footerMenu.map((section) => ({
      title: section.title,
      menu: section.menu
        .map((key) => data.pages[key]) // Replace key with actual data
        .filter((item) => item !== undefined) // Ensure only valid items are included
        .sort((a, b) => a.title.localeCompare(b.title)) // Sort alphabetically by title
    }))
  };
};

export default function Footer() {
  const formattedNavData = getFormattedNavData(navData);

  if (!formattedNavData) return null; // Prevent rendering if data isn't valid

  return (
    <footer className="bg-black text-white">
      {/* Upper portion of the footer: logo, subscribe, menu columns, social icons */}
      <FooterTopSection columns={formattedNavData.columns} />

      {/* Bottom portion of the footer: copyright */}
      <FooterBottomSection
        companyName={process.env.NEXT_PUBLIC_COMPANY_NAME || process.env.SITE_NAME || ""}
        displayYear={new Date().getFullYear()}
      />
    </footer>
  );
}
