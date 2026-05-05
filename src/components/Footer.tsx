'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NAV = [
  { href: '/',         label: 'Home' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/journal',  label: 'Journal' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

const SOCIAL = [
  { id: 'ig', href: 'https://www.instagram.com/the.artrobe?igsh=MTV2Y3F6Zmh3NzAzaQ%3D%3D&utm_source=qr' },
  { id: 'pt', href: 'https://pinterest.com/' },
  { id: 'yt', href: 'https://youtube.com/' },
  { id: 'be', href: 'https://behance.net/' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--cream)', borderTop: '1px solid var(--border)',
      padding: '3rem 1.25rem 2rem',
      display: 'grid', gap: '1.8rem',
    }}>
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '0.6rem' }}>
          <span aria-hidden style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--green-lt), var(--green-dk))',
            boxShadow: '0 0 0 3px rgba(168,197,160,0.18)',
          }} />
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text)' }}>The Artrobe</p>
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '36ch' }}>
          Original art · Handcrafted · Indore, India. A creative studio exploring form, stillness, and the quiet language of colour.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.7rem' }}>Navigate</p>
          {NAV.map(n => (
            <Link
              key={n.href} href={n.href}
              style={{
                display: 'block', textDecoration: 'none',
                fontFamily: 'var(--sans)', fontSize: '0.84rem',
                color: 'var(--text)', marginBottom: '0.35rem', fontWeight: 400,
              }}
            >{n.label}</Link>
          ))}
        </div>
        <div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.7rem' }}>Connect</p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.84rem', color: 'var(--text)', marginBottom: '0.35rem' }}>
            <a href="mailto:theartrobe12@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>theartrobe12@gmail.com</a>
          </p>
          <div style={{ display: 'flex', gap: 6, marginTop: '0.6rem' }}>
            {SOCIAL.map(s => (
              <motion.a
                key={s.id}
                href={s.href}
                target="_blank" rel="noreferrer"
                whileHover={{ y: -2, backgroundColor: 'var(--green-lt)' }}
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--off-white)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--sans)', fontSize: '0.6rem',
                  color: 'var(--text)', textDecoration: 'none', textTransform: 'lowercase',
                }}
              >{s.id}</motion.a>
            ))}
          </div>
        </div>
      </div>

      <p style={{
        fontFamily: 'var(--sans)', fontSize: '0.65rem', color: 'var(--muted)',
        borderTop: '1px solid var(--border)', paddingTop: '1.1rem',
      }}>
        © {new Date().getFullYear()} The Artrobe. All rights reserved.
      </p>
    </footer>
  );
}
