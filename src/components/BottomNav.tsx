'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { waEnquiry } from '@/data/social';
import { track } from '@/lib/analytics';

// No "Home" tab: the logo in the top bar already goes home, and the slot is
// better spent on the WhatsApp CTA.
const tabs = [
  { href: '/gallery',  label: 'Gallery',  icon: GridIcon },
  { href: '/workshop', label: 'Workshop', icon: PaletteIcon },
  { href: '/journal',  label: 'Journal',  icon: BookIcon },
  { href: '/about',    label: 'About',    icon: CircleIcon },
];

const WA_MSG = 'Hi! I have a question about The Artrobe.';

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

      {/* WhatsApp CTA occupies the freed slot */}
      <a
        href={waEnquiry(WA_MSG)}
        target="_blank"
        rel="noreferrer"
        className="bnav-wa"
        aria-label="Chat on WhatsApp"
        onClick={() => track('whatsapp_click', { source: 'bottom_nav' })}
      >
        <span className="bnav-wa-icon">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17-.35.22-.65.07a8.13 8.13 0 0 1-2.39-1.47 9 9 0 0 1-1.66-2.06c-.17-.3 0-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53s-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35Z"/>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23a8.24 8.24 0 0 1 0 16.46Z"/>
          </svg>
        </span>
        WhatsApp
      </a>
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
function PaletteIcon({ active }: { active: boolean }) {
  const c = active ? 'var(--green-dk)' : 'currentColor';
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 100 20 2 2 0 002-2 2 2 0 00-.5-1.3 2 2 0 01-.5-1.3 2 2 0 012-2H17a5 5 0 005-5c0-4.4-4.5-8-10-8z" />
      <circle cx="7.5" cy="10.5" r="1" fill={c} stroke="none" />
      <circle cx="12" cy="7.5" r="1" fill={c} stroke="none" />
      <circle cx="16.5" cy="10.5" r="1" fill={c} stroke="none" />
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
