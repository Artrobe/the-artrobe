'use client';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MagneticButton from '@/components/ui/MagneticButton';

interface Slide { img: string; title: string; }

interface Props {
  onViewCollection: () => void;
  heroImages: Slide[];
}

const SLIDE_DURATION = 5000;
const words = ['Art', 'That', 'Speaks', 'Without'];

export default function HeroSection({ onViewCollection, heroImages }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yImg  = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const slides = heroImages.length ? heroImages : [{ img: '/artworks/soft-power.webp', title: '' }];
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  const prev = () => { setPaused(true); setIdx(i => (i - 1 + slides.length) % slides.length); };
  const next = () => { setPaused(true); setIdx(i => (i + 1) % slides.length); };

  return (
    <section
      ref={ref}
      style={{
        position: 'relative', width: '100%',
        height: 'calc(100svh - var(--nav-h) - var(--bottom-nav-h))',
        minHeight: 540,
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #c5d8c2 0%, #d8ccbc 50%, #a8c5a0 100%)',
      }}
    >
      {/* Slideshow images */}
      <motion.div style={{ y: yImg, position: 'absolute', inset: 0, scale: 1.08 }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={slides[idx].img}
            src={slides[idx].img}
            alt={slides[idx].title}
            initial={{ opacity: mounted ? 0 : 1, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', display: 'block',
            }}
          />
        </AnimatePresence>
      </motion.div>

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(42,42,42,0.65) 0%, rgba(42,42,42,0.04) 55%, rgba(42,42,42,0.18) 100%)',
      }} />

      {/* Desktop prev/next arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous painting"
            style={{
              display: 'none',
              position: 'absolute', left: '1.5rem', top: '50%',
              transform: 'translateY(-50%)', zIndex: 4,
              background: 'rgba(247,245,239,0.15)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.22)', borderRadius: '50%',
              width: 44, height: 44, cursor: 'pointer',
              color: '#fff', fontSize: '1.1rem',
              alignItems: 'center', justifyContent: 'center',
            }}
            className="hero-arrow"
          >‹</button>
          <button
            onClick={next}
            aria-label="Next painting"
            style={{
              display: 'none',
              position: 'absolute', right: '1.5rem', top: '50%',
              transform: 'translateY(-50%)', zIndex: 4,
              background: 'rgba(247,245,239,0.15)', backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.22)', borderRadius: '50%',
              width: 44, height: 44, cursor: 'pointer',
              color: '#fff', fontSize: '1.1rem',
              alignItems: 'center', justifyContent: 'center',
            }}
            className="hero-arrow"
          >›</button>
        </>
      )}

      {/* Text content */}
      <motion.div
        style={{
          y: yText, opacity,
          position: 'absolute', bottom: '3rem', left: '1.5rem', right: '1.5rem',
          maxWidth: 720, zIndex: 3,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            fontFamily: 'var(--sans)', fontSize: '0.66rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', marginBottom: '0.7rem',
          }}
        >
          <span style={{ display: 'inline-block', width: 24, height: 1, background: 'rgba(255,255,255,0.6)', verticalAlign: 'middle', marginRight: 10 }} />
          Original Art · Handcrafted
        </motion.p>

        <h1 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 8vw, 4.2rem)',
          fontWeight: 300, color: '#fff', lineHeight: 1.05, marginBottom: '0.9rem',
          letterSpacing: '-0.01em',
        }}>
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'inline-block', marginRight: '0.32em' }}
            >{w}</motion.span>
          ))}
          <motion.em
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 + words.length * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'inline-block', fontStyle: 'italic', color: 'var(--green-lt)' }}
          >Words</motion.em>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          style={{
            fontFamily: 'var(--sans)', fontSize: '0.92rem', color: 'rgba(255,255,255,0.85)',
            marginBottom: '1.6rem', maxWidth: '34ch', lineHeight: 1.55,
          }}
        >
          Original paintings exploring form, stillness, and the quiet language of colour.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}
        >
          <MagneticButton
            onClick={onViewCollection}
            style={{
              background: 'var(--green)', color: 'var(--text)',
              border: 'none', borderRadius: '2rem',
              padding: '0.85rem 1.8rem',
              fontFamily: 'var(--sans)', fontSize: '0.78rem',
              fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', boxShadow: '0 8px 28px rgba(0,0,0,0.18)',
            }}
          >View Collection →</MagneticButton>
          <MagneticButton
            onClick={() => document.getElementById('about-teaser')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.5)', borderRadius: '2rem',
              padding: '0.85rem 1.5rem',
              fontFamily: 'var(--sans)', fontSize: '0.78rem',
              fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >The Studio</MagneticButton>
        </motion.div>
      </motion.div>

      {/* Studio open badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        style={{
          position: 'absolute', top: '1.2rem', right: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: 'rgba(255,255,255,0.65)', fontSize: '0.62rem',
          letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'var(--sans)',
          zIndex: 3,
        }}
      >
        <span style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--green-lt)',
          boxShadow: '0 0 0 4px rgba(212,232,208,0.18)',
          animation: 'pulse 2.4s ease-in-out infinite',
        }} />
        Studio open
      </motion.div>

      {/* Bottom-right: painting title + dot indicators */}
      {slides.length > 1 && (
        <div style={{
          position: 'absolute', bottom: '1.6rem', right: '1.5rem',
          zIndex: 3, display: 'flex', flexDirection: 'column',
          alignItems: 'flex-end', gap: '0.5rem',
        }}>
          {/* Current painting title — desktop only via CSS class */}
          <AnimatePresence mode="wait">
            <motion.p
              key={slides[idx].title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="hero-slide-title"
              style={{
                fontFamily: 'var(--serif)', fontSize: '0.88rem', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em',
              }}
            >{slides[idx].title}</motion.p>
          </AnimatePresence>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPaused(true); setIdx(i); }}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === idx ? 22 : 7, height: 7,
                  borderRadius: 4, border: 'none', padding: 0, cursor: 'pointer',
                  background: i === idx ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.35)',
                  transition: 'width 0.35s ease, background 0.35s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
