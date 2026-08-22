'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/workshop', label: 'Workshop' },
  { href: '/journal',  label: 'Journal' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export default function TopBar() {
  const path = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 'var(--nav-h)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: scrolled ? 'rgba(247,245,239,0.85)' : 'var(--off-white)',
        backdropFilter: scrolled ? 'blur(14px) saturate(120%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(120%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.5rem',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400,
          color: 'var(--text)', textDecoration: 'none', letterSpacing: '0.02em',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}
      >
        <span aria-hidden style={{
          width: 22, height: 22, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--green-lt), var(--green-dk))',
          boxShadow: '0 0 0 3px rgba(168,197,160,0.18)',
        }} />
        The Artrobe
      </Link>

      {isDesktop ? (
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map(link => {
            const active = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--sans)', fontSize: '0.74rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: active ? 'var(--green-dk)' : 'var(--muted)',
                  textDecoration: 'none',
                  fontWeight: active ? 500 : 400,
                  paddingBottom: 4,
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="topnav-underline"
                    style={{
                      position: 'absolute', left: 0, right: 0, bottom: 0,
                      height: 2, background: 'var(--green-dk)',
                      borderRadius: 1,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      ) : (
        // Mobile: the bottom nav has no Home tab, so put the way back here.
        // On the home page itself there is nowhere to go — show the label.
        path === '/' ? (
          <span style={{
            fontFamily: 'var(--sans)', fontSize: '0.62rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--muted)',
          }}>
            Home
          </span>
        ) : (
          <Link
            href="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              fontFamily: 'var(--sans)', fontSize: '0.62rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--green-dk)', textDecoration: 'none',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3.5 11.2 12 4l8.5 7.2M6 10v9h12v-9" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Home
          </Link>
        )
      )}
    </motion.header>
  );
}
