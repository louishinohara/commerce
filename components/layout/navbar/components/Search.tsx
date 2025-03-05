"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search({
  alwaysExpanded = false,
  autoFocus = false,
  hideIcon = false,
  isMobile = false
}: {
  alwaysExpanded?: boolean;
  autoFocus?: boolean;
  hideIcon?: boolean;
  isMobile?: boolean;
}) {
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(alwaysExpanded);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when the search bar expands
  useEffect(() => {
    if ((expanded || autoFocus) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded, autoFocus]);

  // Close search when clicking outside (only if not alwaysExpanded and icon is visible)
  useEffect(() => {
    if (alwaysExpanded || hideIcon) return;

    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, alwaysExpanded, hideIcon]);

  return (
    <Form action="/search" className="relative flex w-full max-w-[180px] transition-all duration-300">
      <div className="flex items-center justify-end w-full relative">
        {/* Search Input (Only Exists When Expanded) */}
        {expanded && (
          <input
            ref={inputRef}
            key={searchParams?.get("q")}
            type="text"
            name="q"
            placeholder="Search..."
            autoComplete="off"
            defaultValue={searchParams?.get("q") || ""}
            className="text-md w-40 px-3 py-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded-full focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 focus:outline-none transition-all duration-300"
            onBlur={() => setExpanded(false)}
          />
        )}

        {/* Search Icon (Forces Right Alignment) */}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className={`cursor-pointer flex items-center justify-end w-10 h-10 rounded-full ml-auto transition-all duration-300 ${expanded
            ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            : "bg-transparent"
            }`}
        >
          <MagnifyingGlassIcon
            className={clsx('h-5 w-5 transition-all ease-in-out hover:scale-110')}
          />
        </button>
      </div>
    </Form>
  );
}
