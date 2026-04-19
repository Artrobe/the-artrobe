'use client';
import { featuredArtworks } from '@/data/artworks';

interface Props {
  onOpenStory: (id: string) => void;
}

export default function FeaturedWorks({ onOpenStory }: Props) {
  return (
    <section style={{ padding: '2rem 1.25rem' }}>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.2rem' }}>
        Featured Works
      </p>
      <div style={{ display: 'flex', gap: '0.9rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollSnapType: 'x mandatory' }}>
        {featuredArtworks.map(art => (
          <div key={art.id}
            onClick={() => onOpenStory(art.id)}
            style={{ flex: '0 0 160px', scrollSnapAlign: 'start', cursor: 'pointer' }}>
            <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '0.6rem',
              background: 'linear-gradient(135deg, #c8dac4 0%, #e8d5c4 50%, #d4cbb8 100%)' }}>
              <img src={art.img} alt={art.title} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block',
                background: 'linear-gradient(135deg, #c8dac4 0%, #e8d5c4 50%, #d4cbb8 100%)' }} />
            </div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', color: 'var(--text)', marginBottom: '2px' }}>{art.title}</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', color: 'var(--muted)', marginBottom: '3px' }}>{art.medium} · {art.year}</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--text)', fontWeight: 500 }}>₹{art.price.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
