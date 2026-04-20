export interface Artwork {
  id: string;
  title: string;
  medium: string;
  year: number;
  price: number;
  tag: string;
  img: string;
  story1: string;
  story2: string;
  story3: string;
}

export async function getArtworks(): Promise<Artwork[]> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE || 'Table 1';

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'force-cache',
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
    img: r.fields['Image'] || '',
    story1: r.fields['Story1'] || '',
    story2: r.fields['Story2'] || '',
    story3: r.fields['Story3'] || '',
  }));
}
