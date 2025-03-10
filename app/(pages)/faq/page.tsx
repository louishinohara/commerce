"use client";

import { useEffect, useState } from "react";
import FAQSection from "./components/FAQSection"; // Adjust the import path if needed

// Define an interface for an FAQ item
interface FAQ {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqData, setFaqData] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/faq/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch FAQ data");
        }
        return response.json();
      })
      .then((data: FAQ[]) => {
        setFaqData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching FAQ data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!faqData || faqData.length === 0) return <p>No FAQ data found.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 pt-16 pb-32">
      <h1 className="text-5xl font-bold mb-6 text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h1>
      <FAQSection faqs={faqData} />
    </div>
  );
}
