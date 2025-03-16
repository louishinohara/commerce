import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Footer from 'components/layout/footer/Footer';
import Prose from 'components/prose';
import { getPage } from 'lib/shopify';

// 1) Force dynamic so Netlify doesn't try to generate [page].html
export const dynamic = 'force-dynamic';

// 2) Make params a Promise (as your environment expects)
export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await props.params;  // ✅ Await the promise

  const pageData = await getPage(page);
  if (!pageData) return notFound();

  return {
    title: pageData.seo?.title || pageData.title,
    description: pageData.seo?.description || pageData.bodySummary,
    openGraph: {
      publishedTime: pageData.createdAt,
      modifiedTime: pageData.updatedAt,
      type: 'article',
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  // 3) Await the promise
  const { page } = await props.params;

  const pageData = await getPage(page);
  if (!pageData) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{pageData.title}</h1>
      <Prose className="mb-8" html={pageData.body} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(new Date(pageData.updatedAt))}.`}
      </p>
      <Footer />
    </>
  );
}
