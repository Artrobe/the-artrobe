import HomeClient from '@/components/HomeClient';
import { getArtworks, fallbackToArtwork } from '@/lib/airtable';
import { artworks as fallback } from '@/data/artworks';
import { getPostSummaries } from '@/lib/journal';

export default async function HomePage() {
  let artworks = await getArtworks();
  if (!artworks.length || artworks.every(a => !a.img)) artworks = fallback.map(fallbackToArtwork);
  const posts = getPostSummaries();
  return <HomeClient artworks={artworks} posts={posts} />;
}
