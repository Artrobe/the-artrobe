'use client';
import { motion } from 'framer-motion';
import type { Artwork } from '@/lib/airtable';
import Reveal from '@/components/ui/Reveal';

interface Props {
  artworks: Artwork[];
  onOpenStory: (id: string) => void;
}

export default function FeaturedWorks({ artworks, onOpenStory }: Props) {
  return (
    <section style={{ padding: '2.6rem 1.25rem 1rem' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.3rem' }}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--muted)',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
            Featured Works
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', color: 'var(--green-dk)', letterSpacing: '0.06em' }}>
            Tap to read →
          </p>
        </div>
      </Reveal>

      <div style={{
        display: 'flex', gap: '0.9rem', overflowX: 'auto',
        paddingBottom: '0.5rem', scrollSnapType: 'x mandatory',
        scrollPadding: '0 1.25rem',
      }}>
        {artworks.map((art, i) => (
          <motion.button
            key={art.id}
            onClick={() => onOpenStory(art.id)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            style={{
              flex: '0 0 180px', scrollSnapAlign: 'start',
              cursor: 'pointer', border: 'none', background: 'transparent',
              padding: 0, textAlign: 'left', touchAction: 'manipulation',
            }}
          >
            <div style={{
              borderRadius: 12, overflow: 'hidden', marginBottom: '0.7rem',
              background: 'linear-gradient(135deg, #c8dac4 0%, #e8d5c4 50%, #d4cbb8 100%)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.05)',
            }}>
              <motion.img
                src={art.img} alt={art.title}
                loading="lazy"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block',
                  background: 'linear-gradient(135deg, #c8dac4 0%, #e8d5c4 50%, #d4cbb8 100%)',
                }}
              />
            </div>
            {art.tag && (
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.55rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: art.tag === 'Sold' ? 'var(--muted)' : 'var(--green-dk)',
                marginBottom: 4,
              }}>{art.tag}</p>
            )}
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.05rem', color: 'var(--text)', marginBottom: 2, lineHeight: 1.2 }}>{art.title}</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.66rem', color: 'var(--muted)', marginBottom: 4 }}>{art.medium} · {art.year}</p>
            {art.price > 0 && (
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--text)', fontWeight: 500 }}>
                ₹{art.price.toLocaleString('en-IN')}
              </p>
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
