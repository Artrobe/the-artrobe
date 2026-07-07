import type { RawArtwork } from '@/data/artworks';

export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  price: number;
  tag: string;
  img: string;
  thumb?: string;
  imgAspect?: string;
  dimensions?: string;
  style?: string;
  story1: string;
  story2: string;
  story3: string;
  story4: string;
  story5: string;
  chapter1Heading?: string;
  chapter2Heading?: string;
  chapter3Heading?: string;
  chapter4Heading?: string;
  chapter5Heading?: string;
}

interface AirtableRecord {
  id: string;
  fields: Record<string, string | number | { url?: string }[] | undefined>;
}

export async function getArtworks(): Promise<Artwork[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE || 'Table 1';

  if (!token || !baseId) return [];

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error('Airtable fetch failed:', await res.text());
    return [];
  }

  const data: { records: AirtableRecord[] } = await res.json();

  const str = (v: AirtableRecord['fields'][string]): string =>
    typeof v === 'string' ? v : '';

  return data.records.map((r) => {
    const image = r.fields['Image'];
    return {
      id: r.id,
      title: str(r.fields['Title']),
      medium: str(r.fields['Medium']),
      year: typeof r.fields['Year'] === 'number' ? r.fields['Year'] : new Date().getFullYear(),
      price: typeof r.fields['Price'] === 'number' ? r.fields['Price'] : 0,
      tag: str(r.fields['Tag']),
      img: Array.isArray(image) ? (image[0]?.url || '') : str(image),
      story1: str(r.fields['Story1']),
      story2: str(r.fields['Story2']),
      story3: str(r.fields['Story3']),
      story4: str(r.fields['Story4']),
      story5: str(r.fields['Story5']),
      chapter1Heading: str(r.fields['Chapter1Heading']),
      chapter2Heading: str(r.fields['Chapter2Heading']),
      chapter3Heading: str(r.fields['Chapter3Heading']),
      chapter4Heading: str(r.fields['Chapter4Heading']),
      chapter5Heading: str(r.fields['Chapter5Heading']),
    };
  });
}

export function fallbackToArtwork(a: RawArtwork): Artwork {
  return {
    id: a.id, title: a.title, medium: a.medium, year: a.year,
    price: a.price, tag: a.tag, img: a.img,
    thumb: a.img.replace(/\.webp$/, '-thumb.webp'),
    imgAspect: a.imgAspect, dimensions: a.dimensions, style: a.style,
    story1: a.story.chapter1.body, story2: a.story.chapter2.body,
    story3: a.story.chapter3.body, story4: a.story.chapter4.body,
    story5: a.story.chapter5.body,
    chapter1Heading: a.story.chapter1.heading,
    chapter2Heading: a.story.chapter2.heading,
    chapter3Heading: a.story.chapter3.heading,
    chapter4Heading: a.story.chapter4.heading,
    chapter5Heading: a.story.chapter5.heading,
  };
}
