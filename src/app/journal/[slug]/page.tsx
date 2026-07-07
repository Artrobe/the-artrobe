import { notFound } from 'next/navigation';
import { getAllSlugs, getPost } from '@/lib/journal';
import JournalPostClient from '@/components/JournalPostClient';

export function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return { title: 'Journal — The Artrobe' };
  return { title: `${post.title} · The Artrobe`, description: post.excerpt };
}

export default function JournalPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    url: `https://theartrobe.in/journal/${post.slug}`,
    author: {
      '@type': 'Person',
      name: 'Jahnvi',
      url: 'https://theartrobe.in',
    },
    ...(post.cover ? { image: `https://theartrobe.in${post.cover}` } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalPostClient post={post} />
    </>
  );
}
