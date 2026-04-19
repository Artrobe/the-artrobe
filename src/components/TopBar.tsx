'use client';
import Link from 'next/link';

export default function TopBar() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 'var(--nav-h)',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      background: 'var(--off-white)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.25rem',
    }}>
      <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--text)', textDecoration: 'none', letterSpacing: '0.02em' }}>
        The Artrobe
      </Link>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1.1rem' }} aria-label="Menu">
        ☰
      </button>
    </header>
  );
}
