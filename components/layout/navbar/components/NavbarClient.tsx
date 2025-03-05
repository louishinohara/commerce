"use client";

import CartModal from "components/cart/modal";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import Search from "./Search";
import SearchSkeleton from "./SearchSkeleton";
import MobileMenu from "./mobile-menu";

export default function NavbarClient({ menu, companyName }: { menu: any; companyName: string }) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white dark:bg-neutral-900 z-50 shadow-md border-b border-neutral-200 dark:border-neutral-700 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="py-2 lg:py-3 px-4 lg:px-6">
        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between">
          <div className="flex items-center justify-start w-10">
            <Suspense fallback={null}>
              <MobileMenu menu={menu} />
            </Suspense>
          </div>

          <div className="flex-grow flex justify-center">
            <span className="text-sm font-medium uppercase tracking-widest">
              {companyName}
            </span>
          </div>

          <div className="flex items-center justify-end w-10">
            <CartModal />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-3 items-center">
            <div className="flex items-center">
              <Link href="/" prefetch={true} className="flex items-center gap-2">
              </Link>
            </div>

            <div className="flex justify-center">
              <span className="text-sm font-medium uppercase tracking-widest">
                {companyName}
              </span>
            </div>

            <div className="flex items-center justify-end gap-4">
              <Suspense fallback={<SearchSkeleton />}>
                <Search />
              </Suspense>
              <CartModal />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
