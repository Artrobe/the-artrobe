import { getPostSummaries } from '@/lib/journal';
import JournalListClient from '@/components/JournalListClient';

export const metadata = {
  title: 'Journal — The Artrobe',
  description: 'Notes from the studio. On colour, slowness, mistakes, and what it means to live with a painting.',
};

export default function JournalPage() {
  const posts = getPostSummaries();
  return <JournalListClient posts={posts} />;
}
