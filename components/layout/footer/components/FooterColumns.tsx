import { Suspense } from "react";

export default function FooterColumns({
  columns,
}: {
  columns: { title: string; menu: { title: string; path: string }[] }[];
}) {
  // Sort columns alphabetically for desktop
  const sortedColumnsAlphabetically = [...columns].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Sort columns reverse alphabetically for mobile
  const sortedColumnsReverseAlphabetically = [...columns].sort((a, b) =>
    b.title.localeCompare(a.title)
  );

  return (
    <div className="flex flex-col md:flex-row md:justify-end gap-6 md:gap-10 items-center md:items-start text-center md:text-left">
      {/* Mobile: 2-column grid with reverse alphabetical order */}
      <div className="grid grid-cols-2 gap-6 w-full md:hidden">
        {sortedColumnsReverseAlphabetically.map((col) => (
          <div
            key={col.title}
            className="flex flex-col items-start space-y-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300">
              {col.title}
            </h3>
            <Suspense fallback={<div className="h-4 w-20 animate-pulse bg-gray-400" />}>
              <FooterMenu menu={col.menu} />
            </Suspense>
          </div>
        ))}
      </div>

      {/* Desktop: Flex layout with alphabetical order */}
      <div className="hidden md:flex md:flex-row md:gap-10">
        {sortedColumnsAlphabetically.map((col) => (
          <div
            key={col.title}
            className="flex flex-col items-start space-y-3"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-300">
              {col.title}
            </h3>
            <Suspense fallback={<div className="h-4 w-20 animate-pulse bg-gray-400" />}>
              <FooterMenu menu={col.menu} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterMenu({ menu }: { menu: { title: string; path: string }[] }) {
  return (
    <ul className="flex flex-col items-start space-y-2">
      {menu.map((item) => (
        <li key={item.title}>
          <a href={item.path} className="text-gray-400 hover:text-white transition-colors text-xs">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}