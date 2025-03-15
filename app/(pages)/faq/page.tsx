"use client";

import { useMemo } from "react";
import faqData from "../../../lib/data/faq/data.json"; // Updated import
import FAQSection from "./components/FAQSection";

// Define an interface for an FAQ item
interface FAQ {
  question: string;
  answer: string;
}

export default function FAQPage() {
  // Memoize FAQ data for performance
  const faqs = useMemo(() => faqData as FAQ[], []);

  if (!faqs || faqs.length === 0) return <p>No FAQ data found.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-16 pb-32">
      <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h1>
      <FAQSection faqs={faqs} />
    </div>
  );
}
