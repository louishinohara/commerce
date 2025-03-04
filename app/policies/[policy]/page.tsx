import Footer from 'components/layout/footer/Footer';
import Prose from "components/prose";
import { getPage } from "lib/shopify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Generates metadata for the policy page.
 */
export async function generateMetadata(
  context: { params: { policy: string } }
): Promise<Metadata> {
  // Await the params object itself before using its properties.
  const params = await Promise.resolve(context.params);
  
  // Check if the policy exists; if not, return a 404.
  if (!params || !params.policy) return notFound();
  
  // Retrieve the page data using the awaited policy parameter.
  const page = await getPage(params.policy);
  if (!page) return notFound();
  
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

/**
 * Renders the policy page.
 */
export default async function PolicyPage(
  context: { params: { policy: string } }
) {
  // Await the params object itself before using its properties.
  const params = await Promise.resolve(context.params);
  
  // Check if the policy exists; if not, return a 404.
  if (!params || !params.policy) return notFound();
  
  // Retrieve the page data using the awaited policy parameter.
  const page = await getPage(params.policy);
  if (!page) return notFound();
  
  return (
    <>
      <div className="max-w-3xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 xl:px-48 py-16">
        <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white">
          {page.title}
        </h1>
        <Prose
          className="mb-10 text-gray-700 dark:text-gray-300 leading-relaxed"
          html={page.body}
        />
        <p className="text-sm italic text-gray-500 dark:text-gray-400">
          {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(page.updatedAt))}.`}
        </p>
      </div>
      <Footer />
    </>
  );
}
