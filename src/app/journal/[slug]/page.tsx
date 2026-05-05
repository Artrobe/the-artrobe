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
  return <JournalPostClient post={post} />;
}
