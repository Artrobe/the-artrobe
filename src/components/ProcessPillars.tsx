'use client';
import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';

const PILLARS = [
  { n: '01', title: 'Sourcing the Surface', body: 'Reclaimed textiles, raw canvas, salvaged wood — every piece starts with a material that already has a history.' },
  { n: '02', title: 'Texture & Ground', body: 'Layered mediums build the terrain. Grit, plaster, thread — the surface earns its depth before any colour lands.' },
  { n: '03', title: 'Colour in Layers', body: 'Pigment applied in translucent passes, each one allowed to dry and argue with the last.' },
  { n: '04', title: 'The Long Pause', body: 'Work rests on the wall for weeks. Most decisions are made looking, not painting.' },
  { n: '05', title: 'Finish & Seal', body: 'Hand-sanded edges, matte seal, signed on the reverse. Built to outlive the trend that inspired it.' },
];

export default function ProcessPillars() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      style={{
        padding: 'clamp(3.5rem, 10vw, 7rem) 1.25rem',
        borderTop: '1px solid var(--border)',
        background: 'var(--off-white)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.7rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.9rem',
          }}>
            The Practice
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontWeight: 400,
            fontSize: 'clamp(2rem, 6.5vw, 4.5rem)',
            lineHeight: 1.02, letterSpacing: '-0.02em',
            color: 'var(--text)', margin: '0 0 clamp(2rem, 5vw, 3.5rem)',
            maxWidth: '14ch',
          }}>
            Five stages, start to signature.
          </h2>
        </Reveal>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {PILLARS.map((p, i) => {
            const on = active === i;
            return (
              <Reveal as="li" key={p.n} delay={i * 0.07}>
                <div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: 'clamp(0.9rem, 3vw, 2.5rem)',
                    padding: 'clamp(1rem, 2.6vw, 1.75rem) 0',
                    borderBottom: '1px solid var(--border)',
                    cursor: 'default',
                    transition: 'padding-left 0.45s cubic-bezier(0.22,1,0.36,1)',
                    paddingLeft: on ? 'clamp(0.5rem, 1.5vw, 1.25rem)' : 0,
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--sans)', fontWeight: 500,
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: 'clamp(1.5rem, 5vw, 3.75rem)',
                    lineHeight: 1, flexShrink: 0,
                    width: 'clamp(2.2rem, 7vw, 5rem)',
                    color: on ? 'var(--green-dk)' : 'var(--green-lt)',
                    transition: 'color 0.45s ease',
                  }}>
                    {p.n}
                  </span>

                  <h3 style={{
                    fontFamily: 'var(--serif)', fontWeight: 400,
                    fontSize: 'clamp(1rem, 2.6vw, 1.6rem)',
                    lineHeight: 1.25, margin: 0, flexShrink: 0,
                    width: 'clamp(8rem, 26vw, 18rem)',
                    color: on ? 'var(--green-dk)' : 'var(--text)',
                    transition: 'color 0.45s ease',
                  }}>
                    {p.title}
                  </h3>

                  <p className="pillar-body" style={{
                    fontFamily: 'var(--sans)', fontWeight: 300,
                    fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)',
                    lineHeight: 1.6, color: 'var(--muted)',
                    margin: 0, maxWidth: '46ch',
                  }}>
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
