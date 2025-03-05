"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search({ alwaysExpanded = false, autoFocus = false }: { alwaysExpanded?: boolean; autoFocus?: boolean }) {
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState(alwaysExpanded);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when the search bar expands
  useEffect(() => {
    if ((expanded || autoFocus) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [expanded, autoFocus]);

  // Close search when clicking outside (only if not always expanded)
  useEffect(() => {
    if (alwaysExpanded) return;

    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    }

    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, alwaysExpanded]);

  return (
    <Form action="/search" className="relative flex items-center transition-all duration-300">
      {/* Search Icon Button (Only show if not always expanded) */}
      {!alwaysExpanded && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition-all dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
          <MagnifyingGlassIcon className="w-5 h-5 text-white dark:text-neutral-400" />
        </button>
      )}

      {/* Expanding Search Input */}
      <div
        className={`absolute right-0 transition-all duration-300 ease-in-out ${
          expanded || alwaysExpanded ? "w-64 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <input
          ref={inputRef}
          key={searchParams?.get("q")}
          type="text"
          name="q"
          placeholder="Search for products..."
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
          className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400 focus:outline-none"
        />
      </div>
    </Form>
  );
}
