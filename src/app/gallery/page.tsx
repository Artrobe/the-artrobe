import GalleryClient from '@/components/GalleryClient';
import { getArtworks, fallbackToArtwork } from '@/lib/airtable';
import { artworks as fallback } from '@/data/artworks';

export default async function GalleryPage() {
  let artworks = await getArtworks();
  if (!artworks.length) artworks = fallback.map(fallbackToArtwork);
  return <GalleryClient artworks={artworks} />;
}
