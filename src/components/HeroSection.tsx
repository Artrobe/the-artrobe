'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';

interface Slide { img: string; title: string; }

interface Props {
  onViewCollection: () => void;
  heroImages: Slide[];
}

const SLIDE_DURATION = 6000;

const HEADLINE = [
  { words: ['Art', 'that', 'speaks'], italic: false },
  { words: ['without', 'words.'], italic: true },
];

export default function HeroSection({ onViewCollection, heroImages }: Props) {
  const reduce = useReducedMotion();
  const slides = heroImages.length ? heroImages : [{ img: '/artworks/soft-power.webp', title: '' }];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Preload every slide up front — otherwise each transition stalls while the
  // next image downloads, which is what makes the fade look broken.
  useEffect(() => {
    slides.forEach(sl => { const i = new Image(); i.src = sl.img; });
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1 || paused || reduce) return;
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(t);
  }, [slides.length, paused, reduce]);

  const go = (d: number) => { setPaused(true); setIdx(i => (i + d + slides.length) % slides.length); };
  const active = slides[idx];

  return (
    <section className="hero-split">

      {/* ── Copy ── */}
      <div className="hero-copy">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--sans)', fontSize: '0.66rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1.1rem',
          }}
        >
          Original art · Handcrafted · Paintings
        </motion.p>

        <h1
          style={{
            fontFamily: 'var(--serif)', fontWeight: 300,
            fontSize: 'clamp(2.6rem, 7vw, 5rem)', lineHeight: 1.02,
            letterSpacing: '-0.03em', color: 'var(--text)', margin: '0 0 1.2rem',
          }}
        >
          {/* Each word masked and lifted in sequence — the line assembles
              itself rather than arriving all at once. */}
          {HEADLINE.map((line, li) => (
            <span key={li} className="hero-line">
              {line.words.map((w, wi) => (
                <span className="hero-word-mask" key={w + wi}>
                  <motion.span
                    className="hero-word"
                    initial={reduce ? false : { y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + (li * line.words.length + wi) * 0.075,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={line.italic ? { fontStyle: 'italic', color: 'var(--green-dk)' } : undefined}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.16 }}
          style={{
            fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.98rem',
            lineHeight: 1.75, color: 'var(--muted)', maxWidth: '38ch', margin: '0 0 2rem',
          }}
        >
          Original paintings exploring form, stillness, and the quiet language of colour —
          each piece built by hand, layer over layer.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.24 }}
          style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}
        >
          <MagneticButton onClick={onViewCollection}>View collection →</MagneticButton>
        </motion.div>

        {/* current piece caption */}
        <AnimatePresence mode="wait">
          <motion.p
            key={active.title}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'var(--sans)', fontSize: '0.68rem', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--muted)', marginTop: '2.2rem',
            }}
          >
            Now showing — {active.title}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ── Artwork stage ── */}
      <div
        className="hero-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={active.img}
            src={active.img}
            alt={active.title}
            className="hero-art"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button className="hero-nav" style={{ left: 0 }} onClick={() => go(-1)} aria-label="Previous painting">‹</button>
            <button className="hero-nav" style={{ right: 0 }} onClick={() => go(1)} aria-label="Next painting">›</button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="hero-dots">
          {slides.map((s, i) => (
            <button
              key={s.img}
              className="hero-dot"
              data-on={i === idx ? '1' : '0'}
              onClick={() => { setPaused(true); setIdx(i); }}
              aria-label={`Show ${s.title}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
