'use client';

interface Props {
  onViewCollection: () => void;
}

export default function HeroSection({ onViewCollection }: Props) {
  return (
    <section style={{
      position: 'relative', width: '100%',
      height: 'calc(100svh - var(--nav-h) - var(--bottom-nav-h))',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #c5d8c2 0%, #d8ccbc 50%, #a8c5a0 100%)',
    }}>
      <img
        src="https://picsum.photos/seed/still1/800/1000"
        alt=""
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          background: 'linear-gradient(160deg, #c5d8c2 0%, #d8ccbc 50%, #a8c5a0 100%)' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(42,42,42,0.55) 0%, transparent 60%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '1.5rem', right: '1.5rem',
      }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', marginBottom: '0.5rem' }}>
          Original Art · Handcrafted
        </p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.2rem, 7vw, 3.2rem)', fontWeight: 300, color: '#fff', lineHeight: 1.1, marginBottom: '0.6rem' }}>
          Where art finds its <em>robe</em>
        </h1>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.4rem', maxWidth: '28ch' }}>
          Original paintings exploring form, stillness, and the quiet language of colour.
        </p>
        <button onClick={onViewCollection} style={{
          background: 'var(--green)', color: 'var(--text)',
          border: 'none', borderRadius: '2rem',
          padding: '0.7rem 1.6rem',
          fontFamily: 'var(--sans)', fontSize: '0.78rem',
          fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          View Collection
        </button>
      </div>
    </section>
  );
}
