'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Artwork } from '@/lib/airtable';
import MagneticButton from '@/components/ui/MagneticButton';

interface Props {
  artworkId: string | null;
  artworks: Artwork[];
  onClose: () => void;
}

const defaultHeadings = ['Origin', 'Form', 'Process', 'Colour', 'What Remains'];

export default function StoryPanel({ artworkId, artworks, onClose }: Props) {
  const art = artworks.find(a => a.id === artworkId);
  const reduce = useReducedMotion();
  const open = !!(artworkId && art);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        width: '100vw', overflow: 'hidden',
        background: 'var(--off-white)',
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: reduce
          ? 'opacity 0.3s ease'
          : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: reduce ? (open ? 1 : 0) : 1,
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <AnimatePresence>
        {open && (
          <StoryContent
            key={artworkId!}
            art={art!}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Mounts fresh on every open — guarantees scrollTop = 0 on Android
function StoryContent({ art, onClose }: { art: Artwork; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollLocked, setScrollLocked] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      setScrollLocked(false);
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const chapters = [
    { body: art.story1, heading: art.chapter1Heading || defaultHeadings[0] },
    { body: art.story2, heading: art.chapter2Heading || defaultHeadings[1] },
    { body: art.story3, heading: art.chapter3Heading || defaultHeadings[2] },
    { body: art.story4, heading: art.chapter4Heading || defaultHeadings[3] },
    { body: art.story5, heading: art.chapter5Heading || defaultHeadings[4] },
  ].filter(c => c.body);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* position:fixed works correctly here — outer panel is at viewport origin when open */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'fixed', top: '1rem', right: '1rem', zIndex: 600,
          background: 'rgba(247,245,239,0.9)', border: '1px solid var(--border)',
          borderRadius: '50%', width: 40, height: 40,
          cursor: 'pointer', fontSize: '1.05rem', color: 'var(--muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)',
        }}
      >✕</button>

      <ChapterRail count={chapters.length} containerRef={scrollRef} />

      {/* Fresh node on every open — no accumulated scrollTop from gallery fling */}
      <div
        ref={scrollRef}
        className="story-scroll"
        style={{
          height: '100dvh',
          width: '100vw',
          overflowY: scrollLocked ? 'hidden' : 'auto',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* Hero */}
        <section className="story-chapter" style={{
          width: '100vw',
          minHeight: '100dvh',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #c8dac4 0%, #e0d0bc 50%, #a8c5a0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '4rem',
          paddingBottom: '1.5rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          gap: '1.5rem',
          overflow: 'hidden',
        }}>
          <div style={{
            flex: '0 0 auto',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 18px 44px rgba(42,42,42,0.20)',
          }}>
            <motion.img
              src={art.img} alt={art.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45 }}
              style={{
                display: 'block',
                width: '90vw',
                height: 'auto',
                maxHeight: 'calc(100dvh - 14rem)',
              }}
            />
          </div>

          <div style={{
            width: '100%',
            maxWidth: '100vw',
            boxSizing: 'border-box',
            padding: '0 1rem',
            textAlign: 'center',
            flexShrink: 0,
          }}>
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{
                fontFamily: 'var(--sans)', fontSize: '0.6rem',
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: '0.4rem',
              }}
            >
              {art.medium}{art.dimensions ? ` · ${art.dimensions}` : ''} · {art.year}{art.style ? ` · ${art.style}` : ''}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.5rem, 5.5vw, 2.2rem)',
                fontWeight: 300, color: 'var(--text)',
                lineHeight: 1.15, letterSpacing: '-0.01em',
                margin: 0,
              }}
            >{art.title}</motion.h2>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              style={{
                marginTop: '0.85rem',
                color: 'var(--muted)', fontSize: '0.56rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}
            >
              <span>Scroll the story</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                style={{ fontSize: '0.85rem' }}
              >↓</motion.span>
            </motion.div>
          </div>
        </section>

        {/* Story chapters */}
        {chapters.map((c, i, all) => (
          <div
            key={i}
            className="story-chapter"
            style={{
              minHeight: '100dvh',
              width: '100vw',
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '4.5rem',
              paddingBottom: '4.5rem',
              paddingLeft: '1.75rem',
              paddingRight: '1.75rem',
              background: i % 2 === 0 ? 'var(--off-white)' : 'var(--cream)',
              borderTop: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{
              position: 'absolute', top: '2rem', left: '1.75rem',
              fontFamily: 'var(--serif)', fontSize: '4rem', fontWeight: 300,
              color: 'rgba(110,158,102,0.18)', lineHeight: 1, letterSpacing: '-0.02em',
            }}>{String(i + 1).padStart(2, '0')}</span>

            <div style={{ maxWidth: 540, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.6rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--green-dk)', marginBottom: '0.9rem',
              }}>
                Chapter {i + 1} of {all.length}
              </p>
              <h3 style={{
                fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                fontWeight: 300, color: 'var(--text)', marginBottom: '1.1rem',
                lineHeight: 1.2, letterSpacing: '-0.01em',
              }}>{c.heading}</h3>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.95rem',
                color: 'var(--muted)', lineHeight: 1.85, maxWidth: '42ch',
              }}>{c.body}</p>
            </div>
          </div>
        ))}

        {/* Enquire CTA */}
        <div style={{
          width: '100vw', boxSizing: 'border-box',
          padding: '4rem 1.75rem', textAlign: 'center',
          background: 'var(--cream)', borderTop: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ root: scrollRef, once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 5vw, 1.9rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '1.6rem', lineHeight: 1.3 }}
          >
            Interested in <em>{art.title}</em>?
          </motion.p>
          <MagneticButton
            onClick={() => {
              const subject = encodeURIComponent(`Enquiry · ${art.title}`);
              const body = encodeURIComponent(`Hello,\n\nI'm interested in "${art.title}" (${art.medium}, ${art.year}). Please share details on availability and shipping.\n\nThanks.`);
              window.location.href = `mailto:theartrobe12@gmail.com?subject=${subject}&body=${body}`;
            }}
            style={{
              background: 'var(--green)', color: 'var(--text)', border: 'none',
              borderRadius: '2rem', padding: '0.95rem 2.2rem',
              fontFamily: 'var(--sans)', fontSize: '0.78rem',
              fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', boxShadow: '0 8px 22px rgba(110,158,102,0.25)',
            }}
          >Enquire Now →</MagneticButton>
          <p style={{ marginTop: '1rem', fontFamily: 'var(--sans)', fontSize: '0.72rem', color: 'var(--muted)' }}>
            Reply within 48 hours · theartrobe12@gmail.com
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ChapterRail({ count, containerRef }: { count: number; containerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div style={{
      position: 'fixed', top: '50%', right: '1rem',
      transform: 'translateY(-50%)', zIndex: 600,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      {Array.from({ length: count + 1 }).map((_, i) => (
        <button
          key={i}
          aria-label={`Jump to chapter ${i}`}
          onClick={() => {
            const el = containerRef.current;
            if (!el) return;
            const chapters = el.querySelectorAll<HTMLElement>('.story-chapter');
            chapters[i]?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            width: 4, height: 22, borderRadius: 2, border: 'none',
            background: 'rgba(110,158,102,0.35)', cursor: 'pointer',
            padding: 0,
          }}
        />
      ))}
    </div>
  );
}
