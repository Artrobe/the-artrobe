import HomeClient from '@/components/HomeClient';
import { getArtworks } from '@/lib/airtable';
import { artworks as fallback } from '@/data/artworks';

export default async function HomePage() {
  let artworks = await getArtworks();
  if (!artworks.length) {
    artworks = fallback.map(a => ({
      id: a.id, title: a.title, medium: a.medium,
      year: a.year, price: a.price, tag: a.tag, img: a.img,
      story1: a.story.chapter1.body, story2: a.story.chapter2.body, story3: a.story.chapter3.body,
    }));
  }
  return <HomeClient artworks={artworks} />;
}
