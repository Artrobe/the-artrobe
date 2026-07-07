import { getArtworks, fallbackToArtwork } from '@/lib/airtable';
import { artworks as fallback } from '@/data/artworks';
import ArtworkDetail from '@/components/ArtworkDetail';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { artworks: fb } = await import('@/data/artworks');
  return fb.map(a => ({ id: a.id }));
}

export default async function ArtworkPage({ params }: { params: { id: string } }) {
  let artworks = await getArtworks();
  if (!artworks.length || artworks.every(a => !a.img)) artworks = fallback.map(fallbackToArtwork);
  const art = artworks.find(a => a.id === params.id);
  if (!art) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VisualArtwork',
    name: art.title,
    artform: art.medium,
    artMedium: art.medium,
    dateCreated: String(art.year),
    image: `https://theartrobe.in${art.img}`,
    url: `https://theartrobe.in/gallery/${art.id}`,
    creator: {
      '@type': 'Person',
      name: 'Jahnvi',
    },
    ...(art.style ? { genre: art.style } : {}),
    ...(art.dimensions ? { width: art.dimensions, height: art.dimensions } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtworkDetail art={art} />
    </>
  );
}
