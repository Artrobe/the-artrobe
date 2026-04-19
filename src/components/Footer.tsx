export default function Footer() {
  return (
    <footer style={{
      background: 'var(--cream)', borderTop: '1px solid var(--border)',
      padding: '2.5rem 1.25rem',
      display: 'grid', gap: '1.8rem',
    }}>
      <div>
        <p style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.4rem' }}>The Artrobe</p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '32ch' }}>
          A creative studio exploring form, stillness, and the quiet language of colour.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.6rem' }}>Navigate</p>
          {['Home', 'Gallery', 'About', 'Contact'].map(p => (
            <p key={p} style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.3rem' }}>{p}</p>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.6rem' }}>Connect</p>
          {['Instagram', 'Pinterest', 'Email'].map(s => (
            <p key={s} style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.3rem' }}>{s}</p>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
        © {new Date().getFullYear()} The Artrobe. All rights reserved.
      </p>
    </footer>
  );
}
