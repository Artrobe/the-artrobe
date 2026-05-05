'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';
import MagneticButton from '@/components/ui/MagneticButton';

const PROCESS = [
  { num: '01', title: 'Observation', body: 'Every piece begins by watching — light, texture, silence. Always something lived, never invented.' },
  { num: '02', title: 'Composition', body: 'Sketches narrow the feeling to essential form. Layers added slowly, intentionally — restraint as a discipline.' },
  { num: '03', title: 'Resolution',  body: 'A work is finished when nothing more needs to be said. Restraint is the last gesture.' },
];

const STATS = [
  { to: 120, suffix: '+', label: 'Originals' },
  { to: 10,  suffix: '',  label: 'Years' },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <PageShell>
      <div
        ref={heroRef}
        style={{
          position: 'relative', height: 'clamp(360px, 60vw, 480px)', overflow: 'hidden',
          background: 'linear-gradient(135deg, #c5d8c2 0%, #d8ccbc 60%, #a8c5a0 100%)',
        }}
      >
        <motion.img
          src="https://picsum.photos/seed/artrobe-about/1200/900"
          alt=""
          style={{ y: yImg, width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(42,42,42,0.55), transparent 60%)' }} />
      </div>

      <div style={{ padding: 'clamp(2rem, 6vw, 3rem) 1.25rem 1rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '0.4rem',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
            About the studio
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(2.1rem, 7vw, 3rem)',
            fontWeight: 300, color: 'var(--text)',
            letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '1.2rem',
          }}>
            The <em style={{ color: 'var(--green-dk)' }}>Artrobe</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.1rem' }}>
            The Artrobe is a creative studio rooted in the belief that art should feel like a second skin — intimate, personal, and quietly transformative.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '1.1rem' }}>
            Each piece begins with observation — the way morning light changes the colour of a wall, the stillness between two breaths, the soft geometry of nature. These moments are gathered and translated onto canvas in acrylic, oil, watercolour, and mixed media.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.85 }}>
            Based in Indore. Every work is original, signed, and shipped with a certificate of authenticity.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <section style={{ display: 'flex', background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center', padding: '1.4rem 0.5rem',
              borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 5vw, 2rem)', fontWeight: 400, color: 'var(--text)' }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </section>
      </Reveal>

      <section style={{ padding: 'clamp(3rem, 8vw, 4.5rem) 1.25rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--green-dk)', marginBottom: '0.6rem',
          }}>The process</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.7rem, 6vw, 2.2rem)',
            fontWeight: 300, color: 'var(--text)',
            lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '2rem', maxWidth: '24ch',
          }}>
            How a painting <em>arrives</em>.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: '50px 1fr', gap: '1rem',
                alignItems: 'start', borderTop: '1px solid var(--border)', paddingTop: '1.25rem',
              }}
            >
              <div style={{
                fontFamily: 'var(--serif)', fontSize: '1.4rem',
                color: 'var(--green-dk)', fontWeight: 400, letterSpacing: '-0.01em',
              }}>{p.num}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.4rem' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '52ch' }}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{
        margin: '0 1.25rem 2.5rem',
        padding: 'clamp(1.5rem, 5vw, 2rem)',
        background: 'var(--cream)',
        borderRadius: 14, border: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <span style={{
          position: 'absolute', top: '-0.5rem', left: '0.75rem',
          fontFamily: 'var(--serif)', fontSize: '5rem',
          color: 'rgba(110,158,102,0.18)', fontWeight: 300, lineHeight: 1,
        }}>“</span>
        <Reveal>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)',
            fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.55,
            position: 'relative', zIndex: 2,
          }}>
            Every piece begins with observation — the way morning light changes the colour of a wall.
          </p>
        </Reveal>
      </section>

      <section style={{ padding: '0 1.25rem 3rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <Link href="/gallery" style={{ textDecoration: 'none' }}>
          <MagneticButton style={{
            background: 'var(--green)', color: 'var(--text)',
            border: 'none', borderRadius: '2rem',
            padding: '0.85rem 1.7rem',
            fontFamily: 'var(--sans)', fontSize: '0.74rem',
            fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>See the Collection →</MagneticButton>
        </Link>
        <Link href="/contact" style={{ textDecoration: 'none' }}>
          <MagneticButton style={{
            background: 'transparent', color: 'var(--text)',
            border: '1px solid var(--text)', borderRadius: '2rem',
            padding: '0.85rem 1.6rem',
            fontFamily: 'var(--sans)', fontSize: '0.74rem',
            fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>Commission a Piece</MagneticButton>
        </Link>
      </section>
    </PageShell>
  );
}
