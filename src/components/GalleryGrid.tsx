'use client';
import type { Artwork } from '@/lib/airtable';

interface Props {
  artworks: Artwork[];
  onOpenStory: (id: string) => void;
}

const gradients = [
  'linear-gradient(135deg, #d4e8d0 0%, #e8ddd0 50%, #c8dac4 100%)',
  'linear-gradient(135deg, #c8dac4 0%, #e8d5c4 50%, #d4cbb8 100%)',
  'linear-gradient(135deg, #e0d8c8 0%, #c8d8c0 50%, #d8ccc0 100%)',
];

const shapes = ['tall', 'sq', 'wide', 'tall', 'sq', 'wide'];

export default function GalleryGrid({ artworks, onOpenStory }: Props) {
  return (
    <div style={{ padding: '1.5rem 1rem', columns: '2', gap: '0.75rem' }}>
      {artworks.map((art, i) => (
        <div key={art.id} onClick={() => onOpenStory(art.id)}
          style={{ breakInside: 'avoid', marginBottom: '0.75rem', cursor: 'pointer' }}>
          <div style={{ borderRadius: '8px', overflow: 'hidden', background: gradients[i % 3] }}>
            <img src={art.img} alt={art.title} style={{
              width: '100%',
              aspectRatio: shapes[i % 6] === 'tall' ? '3/4' : shapes[i % 6] === 'wide' ? '4/3' : '1/1',
              objectFit: 'cover', display: 'block', background: gradients[i % 3],
            }} />
          </div>
          <div style={{ padding: '0.5rem 0.2rem' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '0.88rem', color: 'var(--text)', marginBottom: '1px' }}>{art.title}</p>
            {art.price > 0 && <p style={{ fontFamily: 'var(--sans)', fontSize: '0.62rem', color: 'var(--muted)' }}>₹{art.price.toLocaleString('en-IN')}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
