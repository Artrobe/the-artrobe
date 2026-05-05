export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  price: number;
  tag: string;
  img: string;
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

  const data = await res.json();

  return data.records.map((r: any) => ({
    id: r.id,
    title: r.fields['Title'] || '',
    medium: r.fields['Medium'] || '',
    year: r.fields['Year'] || new Date().getFullYear(),
    price: r.fields['Price'] || 0,
    tag: r.fields['Tag'] || '',
    img: Array.isArray(r.fields['Image'])
      ? (r.fields['Image'][0]?.url || '')
      : (r.fields['Image'] || ''),
    story1: r.fields['Story1'] || '',
    story2: r.fields['Story2'] || '',
    story3: r.fields['Story3'] || '',
    story4: r.fields['Story4'] || '',
    story5: r.fields['Story5'] || '',
    chapter1Heading: r.fields['Chapter1Heading'] || '',
    chapter2Heading: r.fields['Chapter2Heading'] || '',
    chapter3Heading: r.fields['Chapter3Heading'] || '',
    chapter4Heading: r.fields['Chapter4Heading'] || '',
    chapter5Heading: r.fields['Chapter5Heading'] || '',
  }));
}

interface FallbackInput {
  id: string;
  title: string;
  medium: string;
  year: number;
  price: number;
  tag: string;
  img: string;
  imgAspect?: string;
  dimensions?: string;
  style?: string;
  story: {
    chapter1: { heading: string; body: string };
    chapter2: { heading: string; body: string };
    chapter3: { heading: string; body: string };
    chapter4: { heading: string; body: string };
    chapter5: { heading: string; body: string };
  };
}

export function fallbackToArtwork(a: FallbackInput): Artwork {
  return {
    id: a.id, title: a.title, medium: a.medium, year: a.year,
    price: a.price, tag: a.tag, img: a.img,
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
