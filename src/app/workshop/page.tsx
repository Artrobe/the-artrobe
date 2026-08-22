'use client';
import { motion } from 'framer-motion';
import PageShell from '@/components/ui/PageShell';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/data/social';

const TEXTURE_PIECES = [
  { src: '/artworks/ocean-shore-round-thumb.webp', alt: 'Round textured canvas of a shoreline with sand and shells' },
  { src: '/artworks/cobalt-wave-round-thumb.webp', alt: 'Round canvas with a cobalt impasto wave' },
  { src: '/artworks/sea-shore-texture-thumb.webp', alt: 'Textured relief of surf meeting sand' },
  { src: '/artworks/pearl-blossom-thumb.webp', alt: 'Textured blossom in white and gold with pearl detail' },
];

const ART_TOOLS = ['🎨', '🖌️', '✂️', '🖼', '✨', '🪡', '🖍️', '🎭'];

export default function WorkshopPage() {
  return (
    <PageShell>
      <section
        style={{
          minHeight: 'calc(100vh - var(--nav-h) - var(--bottom-nav-h))',
          background: 'linear-gradient(160deg, #1e2e1c 0%, #2e3e2a 40%, #3d4e38 100%)',
          padding: 'clamp(4rem, 12vw, 7rem) 1.25rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {ART_TOOLS.map((emoji, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.18, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
            style={{
              position: 'absolute', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              top: `${10 + (i * 11) % 70}%`,
              left: `${5 + (i * 13) % 90}%`,
              pointerEvents: 'none', userSelect: 'none',
              filter: 'grayscale(0.3)',
            }}
          >
            {emoji}
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2, maxWidth: '520px' }}
        >
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.62rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--green)', marginBottom: '1rem',
          }}>
            ✦ Texture Art Workshop ✦
          </p>

          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.6rem, 9vw, 4.2rem)',
            fontWeight: 300, color: '#F7F5EF',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: '1.2rem',
          }}>
            Coming Soon
          </h1>

          <p style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
            fontStyle: 'italic', color: 'rgba(247,245,239,0.75)',
            lineHeight: 1.7, marginBottom: '0.8rem',
          }}>
            The workshop has been postponed — a new date will be announced soon.
          </p>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.9rem',
            color: 'rgba(247,245,239,0.5)', lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}>
            Follow along for the updated date, venue, and registration details.
          </p>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--green)', color: '#1a2e18',
                padding: '0.9rem 2rem', borderRadius: '6px',
                fontFamily: 'var(--sans)', fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
                textDecoration: 'none', display: 'inline-block',
                boxShadow: '0 8px 28px rgba(168,197,160,0.35)',
              }}
            >
              Follow @{INSTAGRAM_HANDLE}
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ── What we make: texture pieces ── */}
      <section style={{
        padding: 'clamp(3.5rem, 9vw, 6rem) 1.25rem',
        background: 'var(--off-white)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.68rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.8rem',
          }}>
            From the studio
          </p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(1.8rem, 5vw, 3rem)', lineHeight: 1.1,
            letterSpacing: '-0.02em', margin: '0 0 clamp(1.8rem, 4vw, 2.8rem)',
            maxWidth: '18ch',
          }}>
            The kind of work you&apos;ll make.
          </h2>

          <div style={{
            display: 'grid', gap: '1.25rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          }}>
            {TEXTURE_PIECES.map((t, i) => (
              <motion.figure
                key={t.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  margin: 0, background: '#fff', border: '1px solid var(--border)',
                  borderRadius: '4px', overflow: 'hidden',
                }}
              >
                <div style={{ aspectRatio: '1', background: 'var(--cream)', overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.src}
                    alt={t.alt}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
