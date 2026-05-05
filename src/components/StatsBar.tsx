'use client';
import CountUp from '@/components/ui/CountUp';
import Reveal from '@/components/ui/Reveal';

const stats = [
  { value: 120, suffix: '+', label: 'Originals' },
  { value: 10,  suffix: '',  label: 'Years' },
  { value: 70,  suffix: '+', label: 'Sold' },
];

export default function StatsBar() {
  return (
    <Reveal as="section">
      <section style={{
        display: 'flex', background: 'var(--cream)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            flex: 1, textAlign: 'center',
            padding: '1.4rem 0.5rem',
            borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 5vw, 2rem)', fontWeight: 400, color: 'var(--text)', letterSpacing: '-0.01em' }}>
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </section>
    </Reveal>
  );
}
