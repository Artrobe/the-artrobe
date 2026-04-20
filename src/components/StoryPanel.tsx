'use client';
import { useEffect, useRef } from 'react';
import type { Artwork } from '@/lib/airtable';

interface Props {
  artworkId: string | null;
  artworks: Artwork[];
  onClose: () => void;
}

export default function StoryPanel({ artworkId, artworks, onClose }: Props) {
  const art = artworks.find(a => a.id === artworkId) ?? artworks[0];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (artworkId && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [artworkId]);

  if (!artworkId || !art) return null;

  const chapters = [art.story1, art.story2, art.story3].filter(Boolean);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'var(--off-white)',
      transform: 'translateY(0)',
      transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
    }}>
      <button onClick={onClose} style={{
        position: 'fixed', top: '1rem', right: '1rem', zIndex: 600,
        background: 'rgba(247,245,239,0.9)', border: '1px solid var(--border)',
        borderRadius: '50%', width: '36px', height: '36px',
        cursor: 'pointer', fontSize: '1rem', color: 'var(--muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>✕</button>

      <div ref={scrollRef} className="story-scroll" style={{ height: '100svh', overflowY: 'scroll' }}>
        {/* Hero image */}
        <div className="story-chapter" style={{ height: '100svh', position: 'relative',
          background: 'linear-gradient(135deg, #c8dac4 0%, #e0d0bc 50%, #a8c5a0 100%)' }}>
          <img src={art.img} alt={art.title} style={{
            width: '100%', height: '100%', objectFit: 'cover',
            background: 'linear-gradient(135deg, #c8dac4 0%, #e0d0bc 50%, #a8c5a0 100%)',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,42,42,0.6) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: '3rem', left: '1.5rem', right: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '0.4rem' }}>
              {art.medium} · {art.year}
            </p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '2.2rem', fontWeight: 300, color: '#fff', marginBottom: '0.5rem' }}>{art.title}</h2>
            {art.price > 0 && <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)' }}>₹{art.price.toLocaleString('en-IN')}</p>}
          </div>
          <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll to explore ↓
          </div>
        </div>

        {/* Story chapters */}
        {chapters.map((text, i) => (
          <div key={i} className="story-chapter" style={{
            minHeight: '100svh', display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: '4rem 1.75rem',
            background: i % 2 === 0 ? 'var(--off-white)' : 'var(--cream)',
            borderTop: '1px solid var(--border)',
          }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-dk)', marginBottom: '1rem' }}>
              Chapter {i + 1}
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '38ch' }}>{text}</p>
          </div>
        ))}

        {/* CTA */}
        <div style={{ padding: '3rem 1.75rem', textAlign: 'center', background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 300, color: 'var(--text)', marginBottom: '1.5rem' }}>
            Interested in this piece?
          </p>
          <button style={{
            background: 'var(--green)', color: 'var(--text)', border: 'none',
            borderRadius: '2rem', padding: '0.8rem 2rem',
            fontFamily: 'var(--sans)', fontSize: '0.78rem',
            fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
          }}>Enquire Now</button>
        </div>
      </div>
    </div>
  );
}
