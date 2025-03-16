import Footer from "components/layout/footer/Footer";
import Prose from "components/prose";
import { getAllPolicies } from "lib/shopify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Generates metadata for the policy page.
 */
export async function generateMetadata(props: {
  params: Promise<{ policy: string }>;
}): Promise<Metadata> {
  // 1) Await the promise:
  const { policy } = await props.params;

  if (!policy) return notFound();

  // 2) Fetch your policies
  const policies = await getAllPolicies();
  const page = policies.find((p) => p.handle === policy);

  if (!page) return notFound();

  return {
    title: page.title,
    description: page.body.substring(0, 160),
    openGraph: {
      type: "article",
    },
  };
}

/**
 * Renders the policy page.
 */
export default async function PolicyPage(props: {
  params: Promise<{ policy: string }>;
}) {
  // 1) Await the promise:
  const { policy } = await props.params;

  if (!policy) return notFound();

  // 2) Fetch your policies
  const policies = await getAllPolicies();
  const page = policies.find((p) => p.handle === policy);

  if (!page) return notFound();

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16">
        <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          {page.title}
        </h1>
        <Prose
          className="mb-10 text-gray-700 dark:text-gray-300 leading-relaxed"
          html={page.body}
        />
      </div>
      <Footer />
    </>
  );
}
