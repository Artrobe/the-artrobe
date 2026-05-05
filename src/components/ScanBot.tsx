'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScanBot() {
  const [showBubble, setShowBubble] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Auto-show bubble after 2.5s, hide after 7s, repeat every 30s
    const first = setTimeout(() => setShowBubble(true), 2500);
    const hide  = setTimeout(() => setShowBubble(false), 7500);
    const interval = setInterval(() => {
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 5000);
    }, 30000);
    return () => { clearTimeout(first); clearTimeout(hide); clearInterval(interval); };
  }, []);

  if (pathname === '/scan' || pathname === '/contact') return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(var(--bottom-nav-h) + 1rem)',
      right: '1.5rem',
      zIndex: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '0.55rem',
    }}>

      {/* Auto notification bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.button
            initial={{ opacity: 0, x: 18, scale: 0.88 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 14, scale: 0.9 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => { setShowBubble(false); router.push('/scan'); }}
            style={{
              background: 'var(--cream)',
              border: '1px solid var(--border)',
              borderRadius: '2rem',
              padding: '0.52rem 1rem',
              fontFamily: 'var(--sans)',
              fontSize: '0.78rem',
              color: 'var(--text)',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>🏠</span>
            Wanna scan your wall?
            <span style={{ color: 'var(--green-dk)', fontWeight: 600 }}>→</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Glow ring */}
      <motion.div
        animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 10 }}
        style={{
          position: 'absolute', right: 0, bottom: 0,
          width: 52, height: 52, borderRadius: '50%',
          border: '2px solid var(--green)',
          pointerEvents: 'none',
        }}
      />

      {/* 📸 button — clicks go straight to /scan */}
      <motion.button
        onClick={() => { setShowBubble(false); router.push('/scan'); }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 10 }}
        style={{
          width: 52, height: 52, borderRadius: '50%',
          background: 'var(--green)', color: '#fff',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
          boxShadow: '0 8px 24px rgba(110,158,102,0.35)',
          fontFamily: 'var(--sans)',
          flexShrink: 0,
        }}
      >
        📸
      </motion.button>
    </div>
  );
}
