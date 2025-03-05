"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect } from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";
import Search from "./Search"; // Use the new search component

export default function MobileMenu({
  menu,
  isOpen,
  setIsOpen,
}: {
  menu: Menu[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const closeMobileMenu = () => setIsOpen(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <Transition show={isOpen}>
      <Dialog onClose={closeMobileMenu} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-[.5px]"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100 backdrop-blur-[.5px]"
          leaveTo="opacity-0 backdrop-blur-none"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* Mobile Menu Panel */}
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="translate-x-[-100%]"
          enterTo="translate-x-0"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-[-100%]"
        >
          <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white dark:bg-black">
            {/* Header with Search and Close Button */}
            <div className="relative flex items-center w-full p-4 border-b border-neutral-200 dark:border-neutral-800">
              {/* Full-Width Search Bar */}
              <div className="flex-grow">
                <Search alwaysExpanded hideIcon />
              </div>

              {/* Close Button at Top Right */}
              <button
                className="absolute right-4 top-4 h-10 w-10 flex items-center justify-center text-black dark:text-white"
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col items-center w-full py-4 px-6">
              {menu.length ? (
                <ul className="w-full text-center">
                  {menu.map((item: Menu) => (
                    <li
                      className="py-3 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                      key={item.title}
                    >
                      <Link href={item.path} prefetch={true} onClick={closeMobileMenu}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
