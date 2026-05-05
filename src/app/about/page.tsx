'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import CountUp from '@/components/ui/CountUp';
import MagneticButton from '@/components/ui/MagneticButton';

const STATS = [
  { to: 10,  suffix: '+', label: 'Years' },
  { to: 120, suffix: '+', label: 'Originals' },
  { to: 70,  suffix: '+', label: 'Sold' },
];

const PROCESS = [
  { num: '01', title: 'Observation', body: 'Every piece begins by watching — light, texture, silence. Always something lived, never invented.' },
  { num: '02', title: 'Composition', body: 'Sketches narrow the feeling to essential form. Layers added slowly, intentionally — restraint as a discipline.' },
  { num: '03', title: 'Resolution',  body: 'A work is finished when nothing more needs to be said. Restraint is the last gesture.' },
];

/* ── thin ornamental divider ── */
function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '0 auto', width: 'fit-content' }}>
      <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--border)' }} />
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green-dk)', display: 'inline-block' }} />
      <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--border)' }} />
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell>

      {/* ── Hero: two-column ── */}
      <section style={{
        background: 'var(--cream)',
        padding: 'clamp(1.8rem, 5vw, 2.8rem) 1.5rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '1.2rem',
            alignItems: 'start',
            maxWidth: 520,
          }}
        >
          {/* Left: text */}
          <div>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.58rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--green-dk)', marginBottom: '0.75rem',
            }}>
              Where art meets feeling
            </p>
            <h1 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(2.4rem, 8vw, 3.4rem)',
              fontWeight: 300, color: 'var(--text)', lineHeight: 1.05,
              letterSpacing: '-0.01em', marginBottom: '0.5rem',
            }}>Jahnvi</h1>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.78rem',
              color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.2rem',
              fontStyle: 'italic',
            }}>
              Traditional Artist · MFA
            </p>
            <div style={{ width: 32, height: 1, background: 'var(--green-dk)', marginBottom: '0.7rem' }} />
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.6rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              The Artrobe · Indore
            </p>
          </div>

          {/* Right: portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 130,
              height: 168,
              borderRadius: 10,
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 8px 28px rgba(0,0,0,0.10)',
              flexShrink: 0,
            }}
          >
            <img
              src="/jahnvi.webp"
              alt="Jahnvi"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 12%', display: 'block' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <Reveal>
        <section style={{
          display: 'flex', background: 'var(--off-white)',
          borderBottom: '1px solid var(--border)',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center', padding: '1.3rem 0.5rem',
              borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 5vw, 1.9rem)', fontWeight: 400, color: 'var(--text)' }}>
                <CountUp to={s.to} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </section>
      </Reveal>

      {/* ── Vision statement ── */}
      <section style={{ padding: 'clamp(2.2rem, 7vw, 3rem) 1.5rem', textAlign: 'center' }}>
        <Reveal>
          <Divider />
        </Reveal>
        <Reveal delay={0.06}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.58rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--muted)', margin: '1.2rem auto 1rem',
          }}>About my vision</p>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.05rem, 3.8vw, 1.3rem)',
            fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.7,
            maxWidth: '38ch', margin: '0 auto 1.4rem',
          }}>
            My work is an exploration of emotion, texture, and silence. I am drawn to the idea that art doesn't need to be loud to be powerful — it can exist softly, yet leave a lasting impact.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <Divider />
        </Reveal>
      </section>

      {/* ── Bio ── */}
      <section style={{ padding: '0 1.5rem clamp(2rem, 6vw, 3rem)', background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <div style={{ paddingTop: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.58rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--muted)', marginBottom: '0.5rem',
            }}>
              <span style={{ display: 'inline-block', width: 20, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
              Artist bio
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(1.7rem, 6vw, 2.4rem)',
              fontWeight: 300, color: 'var(--text)',
              letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: '1.3rem',
            }}>
              Craft rooted in <em style={{ color: 'var(--green-dk)' }}>patience</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '0.9rem' }}>
              Jahnvi is a traditional artist with over 10 years of experience and a Master of Fine Arts. Her work focuses on detail, patience, and the quiet expression of emotions. She primarily works with traditional mediums, creating pieces that feel personal, refined, and timeless.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '0.9rem' }}>
              Jahnvi believes in creating art with intention. Each piece is developed slowly, with attention to every element, resulting in work that carries depth and a subtle presence.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.85 }}>
              Each piece I create is intuitive — allowing the layers, materials, and movement to guide me. Through balanced compositions I aim to create a sense of calm and connection. My art is not just meant to be seen, but to be felt — to become a part of someone's space and identity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: 'clamp(2.5rem, 8vw, 4rem) 1.5rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.58rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--green-dk)', marginBottom: '0.6rem',
          }}>The process</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 5.5vw, 2.2rem)',
            fontWeight: 300, color: 'var(--text)',
            lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '2rem', maxWidth: '24ch',
          }}>
            How a painting <em>arrives</em>.
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gap: '1.4rem' }}>
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: '46px 1fr', gap: '0.9rem',
                alignItems: 'start', borderTop: '1px solid var(--border)', paddingTop: '1.2rem',
              }}
            >
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.35rem', color: 'var(--green-dk)', fontWeight: 400 }}>{p.num}</div>
              <div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.35rem' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '50ch' }}>{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '0 1.5rem 3rem',
        display: 'flex', gap: '0.75rem', flexWrap: 'wrap',
      }}>
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
