// components/layout/footer/FooterTopSection.tsx
import FooterColumns from "./components/FooterColumns";
import FooterLogoAndSubscribe from "./components/FooterLogoAndSubscribe";

export default function FooterTopSection({
  columns,
}: {
  columns: { title: string; menu: { title: string; path: string }[] }[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-8 py-12 md:px-12 lg:px-16">
      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-row gap-8">
        {/* Left column: Company info, Title, and Subscribe Form */}
        <div className="md:w-1/3">
          <FooterLogoAndSubscribe />
        </div>
        {/* Right column: Footer Columns */}
        <div className="md:w-2/3">
          <FooterColumns columns={columns} />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col md:hidden gap-8">
        <FooterLogoAndSubscribe />
        <FooterColumns columns={columns} />
      </div>
    </div>
  );
}
