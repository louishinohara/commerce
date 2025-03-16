import type { Metadata } from 'next';

import Footer from 'components/layout/footer/Footer';
import Prose from 'components/prose';
import { getPage } from 'lib/shopify';
import { notFound } from 'next/navigation';

// ✅ Ensure Netlify doesn't expect a static .html file
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { page: string } }): Promise<Metadata> {
  // ❌ FIX: `params` is NOT a Promise, remove `await`
  const page = await getPage(params.page);
  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: 'article'
    }
  };
}

export default async function Page({ params }: { params: { page: string } }) {
  // ❌ FIX: `params` is NOT a Promise, remove `await`
  const page = await getPage(params.page);
  if (!page) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
      <Prose className="mb-8" html={page.body} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(page.updatedAt))}.`}
      </p>
      <Footer />
    </>
  );
}
