'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/',        label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function TopBar() {
  const path = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 'var(--nav-h)',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      background: 'var(--off-white)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.5rem',
    }}>
      <Link href="/" style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400, color: 'var(--text)', textDecoration: 'none', letterSpacing: '0.02em' }}>
        The Artrobe
      </Link>

      {isDesktop ? (
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily: 'var(--sans)', fontSize: '0.78rem',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: path === link.href ? 'var(--green-dk)' : 'var(--muted)',
              textDecoration: 'none',
              fontWeight: path === link.href ? 500 : 400,
              transition: 'color 0.2s',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : (
        <span style={{ fontFamily: 'var(--sans)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Menu ↓
        </span>
      )}
    </header>
  );
}
