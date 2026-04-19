'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/',        label: 'Home',    icon: '⌂' },
  { href: '/gallery', label: 'Gallery', icon: '⊞' },
  { href: '/about',   label: 'About',   icon: '◯' },
  { href: '/contact', label: 'Contact', icon: '✉' },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      height: 'var(--bottom-nav-h)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      background: 'var(--off-white)',
      borderTop: '1px solid var(--border)',
    }}>
      {tabs.map(tab => {
        const active = path === tab.href;
        return (
          <Link key={tab.href} href={tab.href} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '3px',
            textDecoration: 'none',
            color: active ? 'var(--green-dk)' : 'var(--muted)',
            fontSize: '0.6rem', fontFamily: 'var(--sans)',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}>
            <span style={{ fontSize: '1.1rem' }}>{tab.icon}</span>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
