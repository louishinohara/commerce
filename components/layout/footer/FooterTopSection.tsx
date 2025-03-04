import Link from "next/link";
import { Suspense } from "react";

const { COMPANY_NAME } = process.env;

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
        <HeaderAndSubscribeMobile />
        <FooterColumns columns={columns} />
      </div>
    </div>
  );
}

/* 
  FooterLogoAndSubscribe Component for Desktop 
  (Company info, then title/subtitle, then subscribe form)
*/
function FooterLogoAndSubscribe() {
  return (
    <div className="w-full px-4">
      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
        {/* Company Name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="uppercase font-semibold tracking-normal text-lg whitespace-nowrap overflow-hidden text-ellipsis">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Title/SubTitle above the subscribe form */}
        <div className="mt-3 w-full">
          <h2 className="mb-1 text-sm font-semibold text-gray-400">
            Stay updated with exclusive deals!
          </h2>
        </div>

        {/* Subscribe Form directly under the title */}
        <div className="mt-2 flex flex-col items-center md:items-start w-full">
          <div className="w-full md:max-w-md flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-base text-gray-300 bg-[#222] border border-[#444] rounded-lg 
                         focus:outline-none focus:ring-1 focus:ring-[#666] placeholder-gray-500 transition-all"
            />
            <button
              type="submit"
              className="w-full px-5 py-2 text-base font-medium text-gray-200 bg-[#3b3b3b] rounded-lg 
                         hover:bg-[#4a4a4a] focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  For Mobile, we combine the header and subscribe form using the same ordering as Desktop.
*/
function HeaderAndSubscribeMobile() {
  return (
    <div className="w-full px-4">
      <div className="flex flex-col items-center text-center w-full">
        {/* Company Name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="uppercase font-semibold tracking-normal text-lg whitespace-nowrap overflow-hidden text-ellipsis">
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Title/SubTitle above the subscribe form */}
        <div className="mt-3 w-full">
          <h2 className="mb-1 text-sm font-semibold text-gray-400">
            Stay updated with exclusive deals!
          </h2>
        </div>

        {/* Subscribe Form directly under the title */}
        <div className="mt-2 flex flex-col items-center w-full">
          <div className="w-full flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-base text-gray-300 bg-[#222] border border-[#444] rounded-lg 
                         focus:outline-none focus:ring-1 focus:ring-[#666] placeholder-gray-500 transition-all"
            />
            <button
              type="submit"
              className="w-full px-5 py-2 text-base font-medium text-gray-200 bg-[#3b3b3b] rounded-lg 
                         hover:bg-[#4a4a4a] focus:outline-none focus:ring-1 focus:ring-gray-600 transition-all cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterColumns({
  columns,
}: {
  columns: { title: string; menu: { title: string; path: string }[] }[];
}) {
  return (
    <div className="flex flex-col md:flex-row md:justify-end gap-6 md:gap-10 items-center md:items-start text-center md:text-left px-4">
      {columns.map((col) => (
        <div
          key={col.title}
          className="w-full md:w-auto flex flex-col items-center md:items-start space-y-3"
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
  );
}

function FooterMenu({ menu }: { menu: { title: string; path: string }[] }) {
  return (
    <ul className="flex flex-col items-center md:items-start space-y-2">
      {menu.map((item) => (
        <li key={item.title}>
          <a
            href={item.path}
            className="text-gray-400 hover:text-white transition-colors text-xs"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
