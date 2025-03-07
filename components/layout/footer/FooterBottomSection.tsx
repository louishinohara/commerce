// components/layout/footer/FooterBottomSection.tsx
import FooterSocialIcons from "./FooterSocialIcons";

export default function FooterBottomSection({
  companyName,
  displayYear,
  sizeInRem = 0.8,
}: {
  companyName: string;
  displayYear: string | number;
  sizeInRem?: number; // ✅ Optional size parameter
}) {
  return (
    <div className="border-t border-gray-800 py-4 text-xs text-gray-500">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between gap-3 px-8 md:px-12 lg:px-16">
        <p className="font-light tracking-tight whitespace-nowrap">
          &copy; {displayYear} {companyName}
        </p>
        <FooterSocialIcons sizeInRem={sizeInRem} /> {/* ✅ Pass size prop */}
      </div>
    </div>
  );
}
