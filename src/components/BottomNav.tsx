'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const tabs = [
  { href: '/',        label: 'Home',    icon: HomeIcon },
  { href: '/gallery', label: 'Gallery', icon: GridIcon },
  { href: '/journal', label: 'Journal', icon: BookIcon },
  { href: '/about',   label: 'About',   icon: CircleIcon },
  { href: '/contact', label: 'Contact', icon: MailIcon },
];

export default function BottomNav() {
  const path = usePathname();

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      height: 'var(--bottom-nav-h)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      background: 'rgba(247,245,239,0.92)',
      backdropFilter: 'blur(14px) saturate(120%)',
      WebkitBackdropFilter: 'blur(14px) saturate(120%)',
      borderTop: '1px solid var(--border)',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(tab => {
        const active = path === tab.href;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              textDecoration: 'none',
              color: active ? 'var(--green-dk)' : 'var(--muted)',
              fontSize: '0.58rem', fontFamily: 'var(--sans)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              fontWeight: active ? 500 : 400,
              position: 'relative',
            }}
          >
            <motion.span
              animate={{ scale: active ? 1.12 : 1, y: active ? -1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ display: 'inline-flex' }}
            >
              <Icon active={active} />
            </motion.span>
            {tab.label}
            {active && (
              <motion.span
                layoutId="bnav-dot"
                style={{
                  position: 'absolute', bottom: 6,
                  width: 4, height: 4, borderRadius: '50%',
                  background: 'var(--green-dk)',
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--green-dk)' : 'currentColor';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" />
    </svg>
  );
}
function GridIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--green-dk)' : 'currentColor';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  );
}
function BookIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--green-dk)' : 'currentColor';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h7a3 3 0 013 3v13a2 2 0 00-2-2H4z" />
      <path d="M20 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z" />
    </svg>
  );
}
function CircleIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--green-dk)' : 'currentColor';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function MailIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--green-dk)' : 'currentColor';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}
