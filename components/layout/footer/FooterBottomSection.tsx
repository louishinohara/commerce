import FooterSocialIcons from "./FooterSocialIcons";

export default function FooterBottomSection({
  companyName,
  displayYear,
  sizeInRem = 0.8,
}: {
  companyName: string;
  displayYear: string | number;
  sizeInRem?: number;
}) {
  return (
    <div className="border-t border-gray-600 py-4 text-xs text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between gap-3 px-8 md:px-12 lg:px-16">
        <p className="font-light tracking-tight whitespace-nowrap">
          &copy; {displayYear} {companyName}
        </p>
        <FooterSocialIcons sizeInRem={sizeInRem} />
      </div>
    </div>
  );
}