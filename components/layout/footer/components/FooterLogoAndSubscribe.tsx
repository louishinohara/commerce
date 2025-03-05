// components/layout/footer/FooterLogoAndSubscribe.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function FooterLogoAndSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        throw new Error("Subscription failed");
      }
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
        {/* Company Name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="uppercase font-semibold tracking-normal text-lg whitespace-nowrap overflow-hidden text-ellipsis">
            {process.env.NEXT_PUBLIC_COMPANY_NAME}
          </span>
        </Link>
        {/* Title/SubTitle above the subscribe form */}
        <div className="mt-3 w-full">
          <h2 className="mb-1 text-sm font-semibold text-gray-400">
            Stay updated with exclusive deals!
          </h2>
        </div>
        {/* Subscribe Form directly under the title */}
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex flex-col items-center md:items-start w-full"
        >
          <div className="w-full md:max-w-md flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          {status === "success" && (
            <p className="mt-2 text-green-500 text-xs">Subscription successful!</p>
          )}
          {status === "error" && (
            <p className="mt-2 text-red-500 text-xs">Subscription failed. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
