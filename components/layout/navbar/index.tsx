import CartModal from 'components/cart/modal';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import Search from './components/Search';
import SearchSkeleton from './components/SearchSkeleton';
import MobileMenu from './components/mobile-menu';

const { NEXT_PUBLIC_COMPANY_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="p-4 lg:px-6">
      {/* Mobile Layout */}
      <div className="flex md:hidden items-center justify-between">
        <div>
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        {/* Logo */}
        <Link href="/" prefetch={true} className="flex items-center gap-2">
          <LogoSquare />
        </Link>
        {/* Cart */}
        <div className="flex items-center gap-4">
          <CartModal />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 items-center">
          {/* Left Column: Logo */}
          <div className="flex items-center">
            <Link href="/" prefetch={true} className="flex items-center gap-2">
              <LogoSquare />
            </Link>
          </div>
          {/* Center Column: Company Name */}
          <div className="flex justify-center">
            <span className="text-sm font-medium uppercase tracking-widest">
              {NEXT_PUBLIC_COMPANY_NAME}
            </span>
          </div>
          {/* Right Column: Expandable Search and Cart */}
          <div className="flex items-center justify-end gap-4">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
