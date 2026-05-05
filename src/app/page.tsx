import HomeClient from '@/components/HomeClient';
import { getArtworks, fallbackToArtwork } from '@/lib/airtable';
import { artworks as fallback } from '@/data/artworks';

export default async function HomePage() {
  let artworks = await getArtworks();
  if (!artworks.length || artworks.every(a => !a.img)) artworks = fallback.map(fallbackToArtwork);
  return <HomeClient artworks={artworks} />;
}
