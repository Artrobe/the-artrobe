'use client';
import Reveal from '@/components/ui/Reveal';

const SHOTS = [
  { src: '/clients/mercedes-backdrop.webp', alt: 'Finished texture artwork held before the Mercedes-Benz backdrop' },
  { src: '/clients/mercedes-group.webp', alt: 'Workshop participants with their finished pieces' },
  { src: '/clients/mercedes-participant.webp', alt: 'A participant holding her completed coastal texture piece' },
  { src: '/clients/mercedes-tables.webp', alt: 'Participants working at the texture art tables' },
];

export default function ClientWork() {
  return (
    <section style={{
      padding: 'clamp(3.5rem, 9vw, 6rem) 1.25rem',
      background: 'var(--cream)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.68rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.8rem',
          }}>
            Corporate & Brand Work
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(1.9rem, 5.5vw, 3.2rem)', lineHeight: 1.08,
            letterSpacing: '-0.02em', margin: '0 0 1rem', maxWidth: '20ch',
          }}>
            A texture art workshop for <em style={{ color: 'var(--green-dk)' }}>Mercedes-Benz</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{
            fontFamily: 'var(--sans)', fontWeight: 300, fontSize: '0.95rem',
            lineHeight: 1.75, color: 'var(--muted)', maxWidth: '54ch',
            margin: '0 0 clamp(2rem, 5vw, 3rem)',
          }}>
            The Artrobe ran a hands-on coastal texture session for Mercedes-Benz guests,
            hosted with Landmark Cars. Every guest left with a finished piece of their own —
            materials, instruction, and the full process, start to signature.
          </p>
        </Reveal>

        <div style={{
          display: 'grid', gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        }}>
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 0.08}>
              <figure style={{
                margin: 0, borderRadius: 6, overflow: 'hidden',
                border: '1px solid var(--border)', background: '#fff',
                aspectRatio: '1', display: 'flex',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src} alt={s.alt} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--muted)',
            marginTop: '1.5rem', fontStyle: 'italic',
          }}>
            Available for corporate sessions, team events, and private groups.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
